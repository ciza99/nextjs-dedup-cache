// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { products } from "@/mocks";
import { createSchema, createYoga } from "graphql-yoga";

let layoutCouner = 0;
let productListCounter = 0;

let productCounters = new Map<string, number>(
  products.map((product) => [product.slug, 0]),
);

setInterval(() => {
  let total = Array.from(productCounters.values()).reduce(
    (acc, count) => acc + count,
    0,
  );

  total += layoutCouner;
  total += productListCounter;

  console.log("Total GraphQL requests:", total);
}, 5000);

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Product {
        slug: String!
      }
      type Query {
        layout: String
        products: [Product!]!
        product(slug: String!): Product
      }
    `,
    resolvers: {
      Query: {
        layout: () => {
          console.log("GrqphQL layout request", layoutCouner++);
          return "This is the `greetings` field of the root `Query` type";
        },
        products: () => {
          console.log("GrqphQL list products request", productListCounter++);
          return products;
        },
        product: (_, args: { slug: string }) => {
          const count = productCounters.get(args.slug);
          if (count === undefined)
            throw new Error(`Product ${args.slug} not found`);

          console.log(`GrqphQL ${args.slug} request`, count);
          productCounters.set(args.slug, count + 1);
          return products.find((product) => product.slug === args.slug);
        },
      },
    },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
