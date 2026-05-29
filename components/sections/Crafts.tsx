"use client";

import { motion } from "framer-motion";
import { useCursor } from "@/providers/CursorProvider";

export default function Crafts() {
  const { setCursorMode, resetCursor } = useCursor();

  return (
    <section id="crafts" className="relative w-full py-32" style={{ background: "#f5f5f0" }}>
      <div className="container-app px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center justify-center text-center gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs font-semibold" style={{ color: "rgba(0,0,0,0.6)" }}>{"// creative_coding"}</span>
          
          <h2
            className="font-sans font-semibold leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.04em",
              color: "#0a0a0f",
            }}
          >
            Design Crafts
          </h2>

          <p
            className="max-w-2xl font-sans"
            style={{ color: "rgba(0,0,0,0.8)" }}
          >
            A collection of experimental UI components, WebGL shaders, and motion design studies. 
            These are playground pieces where I explore new animation concepts.
          </p>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider"
            style={{ cursor: "none", background: "#0a0a0f", color: "#f5f5f0" }}
            onClick={() => window.dispatchEvent(new CustomEvent("open-craft-menu"))}
            onMouseEnter={() => setCursorMode("link")}
            onMouseLeave={resetCursor}
          >
            Open Animation Playground
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 19L19 5M19 5H9M19 5v10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
