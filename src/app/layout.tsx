import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { draftMode } from "next/headers";
import { client } from "@/api";
import { LayoutQuery } from "@/api/queries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();
  await client.request(LayoutQuery, { isEnabled });

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
