"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { experience, highlights } from "@/data/portfolio";

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  return (
    <section id="experience" className="relative w-full">
      <div className="container-app relative border-x border-border-light px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border-light">
          <div className="mx-auto w-full max-w-5xl py-8 lg:py-12">
            <span className="bs-comment">{"// Cool Experience I have had"}</span>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal text-shade-primary sm:text-3xl">
              Experience
            </h2>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-8 py-10 md:py-14 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            <h3 className="section-label">Timeline</h3>
            <div className="flex flex-col border border-border-light">
              {experience.map((item, index) => (
                <article
                  key={`${item.company}-${item.period}`}
                  className="group grid gap-3 border-b border-border-light p-4 last:border-b-0 sm:grid-cols-[48px_minmax(0,1fr)]"
                >
                  <span className="font-mono text-xs text-brand-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="font-medium text-shade-primary transition-colors group-hover:text-brand-primary">
                        {item.role}
                      </h4>
                      <span className="font-mono text-xs text-shade-mute">{item.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-shade-tertiary">{item.company}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            <h3 className="section-label">Residencies / Fellowships</h3>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item, index) => (
                <article key={item.title} className="bs-card pixel-corners scan-line overflow-hidden">
                  <div className="relative aspect-[16/9] border-b border-border-light bg-card-foreground">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 360px, 33vw"
                      className="object-cover opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
                    <span className="absolute left-3 top-3 font-mono text-[10px] text-brand-primary">
                      UNIT {index + 1}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-shade-primary">{item.title}</h4>
                    <p className="mt-2 font-mono text-xs text-shade-tertiary">{item.period}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border-light" />
      </div>
    </section>
  );
}
