import { Product as ProductType } from "@/mocks";

export const generateStaticParams = async () => {
  const products: ProductType[] = await fetch(
    "http://localhost:3000/api/products",
    {
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 5,
      },
    },
  ).then((res) => res.json());

  console.log("generateStaticParams", products);

  return products.map(({ slug }) => ({
    slug,
  }));
};

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({ params: { slug } }: Props) => {
  const product: ProductType = await fetch(
    `http://localhost:3000/api/products/${slug}`,
    {
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 5,
      },
    },
  ).then((res) => res.json());

  return product.slug;
};

export default async function Product({ params: { slug } }: Props) {
  const product: ProductType = await fetch(
    `http://localhost:3000/api/products/${slug}`,
    {
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 5,
      },
    },
  ).then((res) => res.json());

  return <div>{product.slug}</div>;
}
