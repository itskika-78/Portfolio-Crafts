import type { Metadata } from "next";
import { Archivo_Black, Fira_Code, Inter } from "next/font/google";
import CraftMenuServer from "@/components/CraftMenuServer";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import CursorProvider from "@/providers/CursorProvider";
import ClientShell from "@/components/ClientShell";
import Frame from "@/components/chrome/Frame";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-fira-code",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kika — Full-Stack Developer for Web3, Games & Interfaces",
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
    title: "Kika — Full-Stack Developer for Web3, Games & Interfaces",
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
        className={`${inter.variable} ${firaCode.variable} ${archivoBlack.variable} font-sans`}
      >
        {/*
          Z-Index Stacking (bottom → top):
          0   → Light-rays canvas (fixed)
          10  → Main scroll content
          40  → Scroll progress rail
          55  → Edge blur
          60  → Viewport frame + header + bottom bar + HUD
          90  → Noise grain (::before pseudo, CSS)
          200 → Craft overlay
          300 → Preloader
          400 → Custom cursor
        */}
        <CursorProvider>
          <SmoothScrollProvider>
            <ClientShell>
              <Frame />
              <CraftMenuServer />
              {children}
            </ClientShell>
          </SmoothScrollProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
