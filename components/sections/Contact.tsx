"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  };

  return (
    <section id="contact" className="relative w-full">
      <div className="container-app relative border-x border-border-light px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border-light">
          <div className="mx-auto w-full max-w-5xl py-8 lg:py-12">
            <span className="bs-comment">{"// contact endpoint"}</span>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal text-shade-primary sm:text-3xl">
              Contact
            </h2>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bs-card pixel-corners always-on scan-line p-5 md:p-6"
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-mono text-xs text-brand-primary">
                  mailto:{profile.email}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-shade-primary">
                  {profile.name}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-shade-secondary">
                  Reach out through the public email listed on the portfolio.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  Send Email
                </a>
                <button type="button" onClick={copyEmail} className="btn-ghost">
                  {copied ? "Copied" : "Copy Email"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border-light" />
      </div>
    </section>
  );
}
