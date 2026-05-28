"use client";

import { motion } from "framer-motion";
import { companies } from "@/data/portfolio";

export default function Companies() {
  return (
    <section id="companies" className="relative w-full">
      <div className="container-app relative border-x border-border-light px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border-light">
          <div className="mx-auto w-full max-w-5xl py-8 lg:py-12">
            <span className="bs-comment">{"// Companies I have Contributed to"}</span>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal text-shade-primary sm:text-3xl">
              Companies
            </h2>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-4 py-10 md:grid-cols-2 md:py-14">
          {companies.map((company, index) => (
            <motion.article
              key={company.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.42,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bs-card pixel-corners scan-line p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-brand-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-shade-primary">
                    {company.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-shade-mute">contribution</span>
              </div>
              <p className="mt-5 text-sm leading-6 text-shade-secondary">
                {company.description}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border-light" />
      </div>
    </section>
  );
}
