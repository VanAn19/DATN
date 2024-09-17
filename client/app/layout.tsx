import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Providers from "../redux/Provider";

export const metadata: Metadata = {
  title: "Dao Trọng Bình",
  description: "Dao Trọng Bình",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
