"use client";

import { motion } from "framer-motion";
import { Children, ReactNode } from "react";

/*
 * Splits string children into words and reveals them with a
 * staggered rise — inline nodes (icons, styled spans) are kept
 * as single units.
 */
export default function MotionText({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}) {
  const units: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      child.split(/\s+/).filter(Boolean).forEach((w) => units.push(w));
    } else if (child != null) {
      units.push(child);
    }
  });

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.035, delayChildren: delay } },
      }}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {unit}
          </motion.span>
          {" "}
        </span>
      ))}
    </MotionTag>
  );
}
