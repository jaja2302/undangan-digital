import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Digital - Ahmad & Siti",
  description: "Undangan pernikahan digital dengan efek visual yang menakjubkan",
  keywords: "undangan digital, pernikahan, wedding invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}