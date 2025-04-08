import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Generated by create next app",
  title: "Lista de Pagantes | REG Tropuê ❤️💛",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <body className={`font-["Outfit"] antialiased`}>{children}</body>
    </html>
  );
}
