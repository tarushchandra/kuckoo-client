import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import mergeClasses from "@/utils/mergeClasses";
import RootLayoutProvider from "@/providers/layouts/root";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kuckoo - Connect, Share, Discover",
  description:
    "Join Kuckoo, the social media platform where authentic connections flourish...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mergeClasses(inter.className, "debug-screens")}>
        <RootLayoutProvider>{children}</RootLayoutProvider>
      </body>
    </html>
  );
}
