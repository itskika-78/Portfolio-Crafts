"use client";

import { useState, useEffect } from "react";
import LightRays from "@/components/canvas/LightRays";
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
      {/* Layer 0: volumetric light backdrop */}
      {mounted && <LightRays />}

      {/* Layer 10: main scrollable content */}
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

      {/* Layer 300: preloader */}
      {mounted && !preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Layer 400: custom cursor */}
      {mounted && <Cursor />}
    </>
  );
}
