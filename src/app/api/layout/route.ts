import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  console.log("GET /layout");

  return NextResponse.json({ time: new Date().toISOString() });
};
