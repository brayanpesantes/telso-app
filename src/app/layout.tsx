import { Provider } from "@/components";
import { inter } from "@/config/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Telso | Shop",
    default: "Home - Telso | Shop",
  },
  description: "venta de productos de vestimentea para hombre y mujer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
