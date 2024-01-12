import { client } from "@/api";
import { LayoutQuery } from "@/api/queries";
import { draftMode } from "next/headers";
import { ReactNode } from "react";

export default async function ProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isEnabled } = draftMode();
  await client.request(LayoutQuery, { isEnabled });

  return <>{children}</>;
}
