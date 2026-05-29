"use client";

import { useState, useEffect } from "react";
import WebGLBackground from "@/components/canvas/WebGLBackground";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Layer 0: Canvas 2D Background (always fixed) */}
      {mounted && <WebGLBackground />}

      {/* Layer 10: Main scrollable content */}
      <div
        id="main-scroll-wrapper"
        className="relative"
        style={{
          zIndex: "var(--z-content)" as string,
          minHeight: "100dvh",
          overflowY: preloaderDone ? "auto" : "hidden",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>

      {/* Layer 200: Preloader */}
      {mounted && !preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Layer 300: Custom Cursor */}
      {mounted && <Cursor />}
    </>
  );
}
