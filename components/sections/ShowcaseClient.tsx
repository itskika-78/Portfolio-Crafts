"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export type MediaItem = {
  title: string;
  period?: string;
  src: string;
  type: "image" | "video";
  github?: string;
};

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (item.type === "video" && item.github) {
      window.open(item.github, "_blank");
    }
  };

  return (
    <motion.article
      ref={cardRef}
      className="bs-card pixel-corners scan-line group relative shrink-0 cursor-pointer overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      whileHover={item.type === "video" ? { scale: 1.05, zIndex: 10 } : { scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border-light bg-card-foreground w-[320px] sm:w-[360px]">
        {item.type === "video" ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={item.src}
            muted
            playsInline
          />
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="360px"
            className="object-cover opacity-80 grayscale transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100 group-hover:grayscale-0"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <span className="absolute left-3 top-3 font-mono text-[10px] text-brand-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="p-4">
        <h3 className="truncate text-sm font-medium text-shade-primary">{item.title}</h3>
        {item.period ? (
          <p className="mt-2 font-mono text-xs text-shade-tertiary">{item.period}</p>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function ShowcaseClient({
  designVideos,
  eventMedia,
}: {
  designVideos: MediaItem[];
  eventMedia: MediaItem[];
}) {

  return (
    <section id="showcase" className="relative w-full">
      <div className="container-app relative border-x border-border-light px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border-light">
          <div className="mx-auto w-full max-w-5xl py-8 lg:py-12">
            <span className="bs-comment">{"// media archive"}</span>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal text-shade-primary sm:text-3xl">
              Showcase
            </h2>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 py-10 md:py-14">
          
          {/* Design Showcase Slider */}
          <div className="flex flex-col gap-4">
            <h3 className="section-label">Design Showcase</h3>
            <div className="-mx-4 overflow-x-auto px-4 pb-4 custom-scrollbar">
              <div className="flex min-w-max gap-3 pt-2">
                {designVideos.map((item, index) => (
                  <MediaCard key={`${item.src}-${item.title}`} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Events Attended Slider */}
          <div className="flex flex-col gap-4">
            <h3 className="section-label">Events Attended</h3>
            <div className="-mx-4 overflow-x-auto px-4 pb-4 custom-scrollbar">
              <div className="flex min-w-max gap-3 pt-2">
                {eventMedia.map((item, index) => (
                  <MediaCard key={`${item.src}-${item.title}`} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border-light" />
      </div>
    </section>
  );
}
