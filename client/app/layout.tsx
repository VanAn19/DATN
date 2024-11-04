import type { Metadata } from "next";
import "../styles/globals.scss";
import Providers from "../redux/Provider";

export const metadata: Metadata = {
  title: "Dao Trọng Bình",
  description: "Dao Trọng Bình",
  icons: {
    icon: '/images/logo.svg'
  }
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
