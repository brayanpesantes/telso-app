import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import { TopMenu } from "@/components/ui/top-menu";

export const metadata: Metadata = {
  title: "Telso | Shop",
  description: "venta de productos de vestimentea para hombre y mujer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
