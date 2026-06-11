"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCursor } from "@/providers/CursorProvider";

export interface MediaItem {
  title: string;
  src: string;
  type: "video";
  github?: string;
}

// Bento col-span per card index (3-column grid, 6 videos)
// Row 1: [0][1][2]
// Row 2: [3][4 wide x2]
// Row 3: [5 full x3]
function getBentoClass(index: number): string {
  if (index === 4) return "col-span-2";
  if (index === 5) return "col-span-2 md:col-span-3";
  return "col-span-1";
}

function CraftVideoCard({
  item,
  index,
  isOverlayOpen,
}: {
  item: MediaItem;
  index: number;
  isOverlayOpen: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const { setCursorMode, resetCursor } = useCursor();

  // Stagger autoplay when overlay opens
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isOverlayOpen) {
      const t = setTimeout(() => {
        video.play().catch(() => {});
      }, index * 90 + 250);
      return () => clearTimeout(t);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isOverlayOpen, index]);

  return (
    <motion.div
      className="relative h-full overflow-hidden"
      style={{
        background: "var(--color-card-solid)",
        border: "1px solid var(--color-border-light)",
        cursor: "none",
      }}
      initial={{ opacity: 0, scale: 0.94, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        borderColor: "rgba(0,255,255,0.4)",
        transition: { duration: 0.2 },
      }}
      onClick={() => {
        if (item.github) window.open(item.github, "_blank", "noopener,noreferrer");
      }}
      onHoverStart={() => {
        setHovered(true);
        setCursorMode("view", "SOURCE");
      }}
      onHoverEnd={() => {
        setHovered(false);
        resetCursor();
      }}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />

      {/* Subtle dark vignette always */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* GitHub hover overlay */}
      <AnimatePresence>
        {hovered && item.github && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: "backOut" }}
              className="flex flex-col items-center gap-2"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: "var(--color-brand-primary)" }}
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span
                className="u-label"
                style={{ color: "var(--color-brand-primary)" }}
              >
                VIEW SOURCE →
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-3.5 py-2.5">
        <p
          className="u-label-xs truncate"
          style={{ color: "var(--color-shade-secondary)" }}
        >
          {item.title}
        </p>
      </div>

      {/* Index badge */}
      <span
        className="u-label-xs absolute left-3 top-2.5"
        style={{ color: "var(--color-brand-primary)", opacity: 0.7 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export default function CraftMenuClient({ videos }: { videos: MediaItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setCursorMode, resetCursor } = useCursor();

  // Listen for open event dispatched from nav / case rows
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-craft-menu", handler);
    return () => window.removeEventListener("open-craft-menu", handler);
  }, []);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.body.classList.toggle("craft-open", isOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("craft-open");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 overflow-y-auto"
          style={{
            zIndex: "var(--z-craft)",
            background: "rgba(0,0,0,0.96)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 md:px-8"
            style={{
              background: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--color-border-light)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="u-label" style={{ color: "var(--color-shade-tertiary)" }}>
                CRAFT /
              </span>
              <span
                className="u-label"
                style={{ color: "var(--color-brand-primary)" }}
              >
                ANIMATION PLAYGROUND
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/itskika-78/Craft-Animation_Playground"
                target="_blank"
                rel="noopener noreferrer"
                className="frame-link"
                aria-label="View parent repo"
                onMouseEnter={() => setCursorMode("link")}
                onMouseLeave={resetCursor}
                style={{ cursor: "none" }}
              >
                VIEW REPO<sup>↗</sup>
              </a>

              <span
                className="u-label-xs hidden sm:block"
                style={{ color: "var(--color-shade-mute)" }}
              >
                ESC TO CLOSE
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="frame-link"
                aria-label="Close craft menu"
                onMouseEnter={() => setCursorMode("link")}
                onMouseLeave={resetCursor}
                style={{ cursor: "none" }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M2 2l11 11M13 2L2 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* ── Bento Grid ── */}
          <div className="relative z-[1] px-5 pb-10 pt-6 md:px-8">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="u-label-xs mb-5"
              style={{ color: "var(--color-shade-mute)" }}
            >
              CLICK ANY CARD TO OPEN SOURCE ON GITHUB →
            </motion.p>

            <div
              className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
              style={{ gridAutoRows: "220px" }}
            >
              {videos.map((video, i) => (
                <div key={video.src} className={getBentoClass(i)}>
                  <CraftVideoCard item={video} index={i} isOverlayOpen={isOpen} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
