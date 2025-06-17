import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Auth App",
  description: "Simple Auth App required by TanMan manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
