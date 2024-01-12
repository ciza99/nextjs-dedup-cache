import { client } from "@/api";
import { ProductsListQuery } from "@/api/queries";
import { Product } from "@/mocks";
import { draftMode } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const { isEnabled } = draftMode();
  const { products } = await client.request<{ products: Product[] }>(
    ProductsListQuery,
    {
      isEnabled,
    },
  );

  return (
    <div className="flex flex-col">
      {products.map(({ slug }) => (
        <Link href={`/products/${slug}`} key={slug}>
          {slug}
        </Link>
      ))}
    </div>
  );
}
