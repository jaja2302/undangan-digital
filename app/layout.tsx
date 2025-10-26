import type { Metadata } from "next";
import "./globals.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GlobalMusicPlayer } from "@/components/GlobalMusicPlayer";

// Default metadata
export const metadata: Metadata = {
  title: "Undangan Digital - Jaja & Elsa",
  description:
    "Undangan pernikahan digital dengan efek visual yang menakjubkan",
  keywords: "undangan digital, pernikahan, wedding invitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="w-full overflow-x-hidden">
      <body className="antialiased w-full overflow-x-hidden">
        <div className="relative min-h-screen w-full overflow-x-hidden">
          <BackgroundBeams />
          <div className="relative z-10 w-full">{children}</div>
          <GlobalMusicPlayer />
        </div>
      </body>
    </html>
  );
}
