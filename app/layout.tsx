import type { Metadata } from "next";
import { Fira_Code, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/sections/Navbar";
import CraftMenuServer from "@/components/CraftMenuServer";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CursorProvider from "@/providers/CursorProvider";
import ClientShell from "@/components/ClientShell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kika — Full-Stack Developer & Builder",
  description:
    "Portfolio of Kika, a 15-year-old full-stack developer specializing in Next.js, Solana, and creative coding. Building decentralized applications and immersive web experiences.",
  keywords: [
    "Kika",
    "Full-Stack Developer",
    "Solana",
    "Next.js",
    "Web3",
    "Creative Coding",
    "React",
    "Portfolio",
    "Design Engineer",
  ],
  authors: [{ name: "Kika" }],
  openGraph: {
    title: "Kika — Full-Stack Developer & Builder",
    description:
      "15-year-old full-stack developer. Next.js · Solana · Creative Coding.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kika — Full-Stack Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} font-sans`}
      >
        {/* 
          Z-Index Stacking (bottom → top):
          0   → WebGL Canvas (fixed, persistent)
          1   → Noise grain overlay (::before pseudo, CSS)
          10  → Main scroll content
          50  → Navbar + MenuOverlay
          100 → CraftMenu
          200 → Preloader
          300 → Custom Cursor
        */}
        <CursorProvider>
          <SmoothScrollProvider>
            <ClientShell>
              <Navbar />
              <CraftMenuServer />
              {children}
            </ClientShell>
          </SmoothScrollProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
