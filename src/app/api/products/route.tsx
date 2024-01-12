import { products } from "@/mocks";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = () => {
  console.log("GET /products");
  return NextResponse.json(products);
};
