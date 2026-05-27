import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blueshift Portfolio",
  description: "Futuristic Cyber Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} bg-background text-foreground antialiased`}>
        {/* Subtle dark futuristic grid pattern applied globally */}
        <div className="fixed inset-0 z-[-1] bg-grid-pattern bg-background"></div>
        {children}
      </body>
    </html>
  );
}
