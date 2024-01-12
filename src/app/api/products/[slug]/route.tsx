import { products } from "@/mocks";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = (_: Request, { params }: { params: { slug: string } }) => {
  console.log(`GET /products/[${params.slug}]`);
  const product = products.find((product) => product.slug === params.slug);
  return NextResponse.json(product);
};
