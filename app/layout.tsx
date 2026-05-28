import type { Metadata } from "next";
import { Fira_Code, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/sections/Navbar";
import CraftMenuServer from "@/components/CraftMenuServer";
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
  title: "Kika - Design Engineer",
  description: "Portfolio for Kika, a design engineer and builder.",
  keywords: [
    "Kika",
    "Design Engineer",
    "Frontend Developer",
    "Solana",
    "Web3",
    "Next.js",
    "Portfolio",
    "React",
  ],
  authors: [{ name: "Kika" }],
  openGraph: {
    title: "Kika - Design Engineer",
    description: "Portfolio for Kika, a design engineer and builder.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kika - Full Stack Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} min-h-dvh overflow-x-hidden bg-background font-sans text-shade-primary antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 z-[-1] bg-grid-pattern" />
        <div
          className="pointer-events-none fixed inset-0 z-[-1]"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(0,255,255,0.06) 0%, transparent 70%)",
          }}
        />
        <Navbar />
        <CraftMenuServer />
        {children}
      </body>
    </html>
  );
}
