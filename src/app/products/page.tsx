import { Product } from "@/mocks";
import Link from "next/link";

export default async function Products() {
  const products: Product[] = await fetch(
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

  return products.map(({ slug }) => (
    <Link key={slug} href={`products/${slug}`} prefetch={true}>
      {slug}
    </Link>
  ));
}
