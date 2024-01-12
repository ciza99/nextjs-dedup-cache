import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("http://localhost:3000/api/graphql", {
  fetch: async (input, init) =>
    fetch(input, {
      ...init,
      next: {
        revalidate: 5,
      },
    }),
  headers: {
    Authorization: "Bearer ...",
  },
});
