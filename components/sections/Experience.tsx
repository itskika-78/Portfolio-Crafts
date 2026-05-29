"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-24">
      <div className="container-app px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bs-comment">{"// const work_history = [...]"}</span>
          <h2
            className="mt-2 font-sans font-semibold leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.04em",
              color: "var(--color-shade-primary)",
            }}
          >
            Experience
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8 border-l border-border-light pl-6 lg:pl-10 relative">
          {/* Subtle line glow */}
          <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-primary/0 via-brand-primary/30 to-brand-primary/0" />

          {experience.map((item, index) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              className="relative"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Dot */}
              <div 
                className="absolute left-[-31px] lg:left-[-47px] top-1.5 h-3 w-3 rounded-full border border-background"
                style={{ background: "var(--color-brand-primary)", boxShadow: "0 0 12px rgba(0,255,255,0.4)" }}
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h3 className="font-sans text-xl font-semibold text-shade-primary">
                  {item.role}
                </h3>
                <span className="font-mono text-xs text-shade-tertiary">
                  {item.period}
                </span>
              </div>
              <p className="mt-2 font-mono text-sm text-brand-primary/80">
                @ {item.company}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
