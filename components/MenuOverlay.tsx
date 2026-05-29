"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useCursor } from "@/providers/CursorProvider";
import { profile } from "@/data/portfolio";

const navLinks = [
  { label: "Profile", href: "#profile", num: "01" },
  { label: "Experience", href: "#experience", num: "02" },
  { label: "Projects", href: "#projects", num: "03" },
  { label: "Showcase", href: "#showcase", num: "04" },
  { label: "Companies", href: "#companies", num: "05" },
  { label: "Contact", href: "#contact", num: "06" },
];

const featuredVideos = [
  { src: "/media/design-showcase/dynamicIsland.mp4", title: "Dynamic Island", desc: "Interactive UI concepts" },
  { src: "/media/design-showcase/Ringer.mp4", title: "Ringer Physics", desc: "Motion and physics studies" },
  { src: "/media/design-showcase/interfaceCraft.mp4", title: "Interface Craft", desc: "Sleek component design" },
];

const overlayVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      clipPath: { type: "spring" as const, stiffness: 70, damping: 15, mass: 0.5 },
      opacity: { duration: 0.2 },
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: {
      clipPath: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as number[] },
      staggerChildren: 0.04,
    },
  },
};

const linkVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
  exit: {
    y: "-110%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] as number[] },
  },
};

function NavLink({
  link,
  onClick,
}: {
  link: (typeof navLinks)[0];
  onClick: () => void;
}) {
  const { setCursorMode, resetCursor } = useCursor();
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
    setTimeout(() => {
      const target = document.querySelector(link.href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 400); // Wait for menu exit animation
  };

  return (
    <div className="overflow-hidden">
      <motion.a
        href={link.href}
        variants={linkVariants}
        className="group flex items-baseline gap-4 py-1"
        style={{ cursor: "none" }}
        onClick={handleClick}
        onMouseEnter={() => {
          setHovered(true);
          setCursorMode("link", "GO");
        }}
        onMouseLeave={() => {
          setHovered(false);
          resetCursor();
        }}
      >
        <span
          className="font-mono text-xs font-semibold"
          style={{ color: "#000000", opacity: 0.8 }}
        >
          {link.num}
        </span>
        <div className="relative overflow-hidden">
          {/* Main text */}
          <motion.span
            className="block font-sans font-medium"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#0a0a0f",
            }}
            animate={hovered ? { y: "-105%" } : { y: "0%" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            {link.label}
          </motion.span>
          {/* Duplicate — slides up on hover */}
          <motion.span
            className="absolute inset-0 block font-sans font-medium"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#0044cc", // High-contrast electric blue for white bg
              skewX: hovered ? -3 : 0,
            }}
            animate={hovered ? { y: "0%", skewX: -3 } : { y: "105%", skewX: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            {link.label}
          </motion.span>
        </div>
        {/* Neon dot */}
        <motion.span
          className="block h-2 w-2 rounded-full"
          style={{ background: "var(--color-background)" }}
          animate={
            hovered
              ? {
                  background: "#0044cc",
                  boxShadow: "0 0 8px rgba(0,68,204,0.6)",
                }
              : {
                  background: "var(--color-background)",
                  boxShadow: "none",
                }
          }
          transition={{ duration: 0.2 }}
        />
      </motion.a>
    </div>
  );
}

export default function MenuOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { setCursorMode, resetCursor } = useCursor();
  const [isDeckHovered, setIsDeckHovered] = useState(false);
  const [deckOrder, setDeckOrder] = useState([0, 1, 2]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isOpen || isDeckHovered) return;
    const interval = setInterval(() => {
      setDeckOrder((prev) => {
        const newOrder = [...prev];
        const top = newOrder.shift();
        newOrder.push(top!);
        return newOrder;
      });
    }, 2500); // Shuffle every 2.5 seconds
    return () => clearInterval(interval);
  }, [isOpen, isDeckHovered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0"
          style={{ zIndex: "var(--z-overlay)" }}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* White background panel */}
          <div
            className="absolute inset-0"
            style={{ background: "#f5f5f0" }}
          />

          {/* Perspective grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />


          {/* Close button */}
          <motion.button
            type="button"
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              background: "#0a0a0f",
              color: "#f5f5f0",
              cursor: "none",
            }}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            onClick={onClose}
            onMouseEnter={() => setCursorMode("link")}
            onMouseLeave={resetCursor}
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>

          {/* Navigation links */}
          {/* Main content split */}
          <div className="flex h-full w-full flex-col md:flex-row overflow-hidden">
            
            {/* Left side: Navigation links */}
            <div className="flex flex-1 flex-col justify-between px-[8vw] pb-12 pt-24 overflow-y-auto custom-scrollbar min-h-0">
              <div>
                <motion.p
                  className="mb-6 font-mono text-xs tracking-widest"
                  style={{ color: "rgba(0,0,0,0.35)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  NAVIGATION
                </motion.p>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} link={link} onClick={onClose} />
                  ))}
                </nav>
              </div>

              {/* Footer row */}
              <div className="mt-12 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm"
                  style={{ color: "#000000", cursor: "none" }}
                  onMouseEnter={() => setCursorMode("link")}
                  onMouseLeave={resetCursor}
                >
                  {profile.email}
                </a>
                <div className="flex gap-4 items-center">
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm uppercase tracking-wider font-semibold"
                    style={{ color: "#0a0a0f", cursor: "none", textDecoration: "underline" }}
                    onMouseEnter={() => setCursorMode("link")}
                    onMouseLeave={resetCursor}
                  >
                    Resume
                  </a>
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background: "#0a0a0f",
                      color: "#f5f5f0",
                      cursor: "none",
                    }}
                    onMouseEnter={() => setCursorMode("link")}
                    onMouseLeave={resetCursor}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background: "#0a0a0f",
                      color: "#f5f5f0",
                      cursor: "none",
                    }}
                    onMouseEnter={() => setCursorMode("link")}
                    onMouseLeave={resetCursor}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side: Featured / Showcase Deck */}
            <div className="flex flex-1 flex-col justify-center pl-10 pr-6 border-t md:border-t-0 md:border-l border-black/5 bg-black/5 py-12 md:py-0">
              <div className="flex items-center justify-between mb-8 md:mb-16">
                <motion.p
                  className="font-mono text-xs tracking-widest"
                  style={{ color: "rgba(0,0,0,0.8)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  FEATURED CRAFTS
                </motion.p>
              </div>
              
              <div 
                className="relative flex h-[300px] md:h-[450px] w-full items-center justify-center overflow-visible"
                onMouseEnter={() => setIsDeckHovered(true)}
                onMouseLeave={() => setIsDeckHovered(false)}
              >
                {featuredVideos.map((video, index) => {
                  const positionIndex = deckOrder.indexOf(index);
                  
                  // Calculate styles based on position and hover state
                  let x = 0;
                  let y = 0;
                  let rotate = 0;
                  let scale = 1;
                  let zIndex = 3 - positionIndex;
                  
                  if (isDeckHovered) {
                    // Fan out horizontally
                    const spread = isMobile ? 60 : 230;
                    if (index === 0) { x = -spread; rotate = -6; zIndex = 1; }
                    if (index === 1) { x = 0; rotate = 0; zIndex = 3; } // middle pops to front
                    if (index === 2) { x = spread; rotate = 6; zIndex = 2; }
                  } else {
                    // Stacked deck, positionIndex 0 is top
                    x = positionIndex * (isMobile ? 10 : 15);
                    y = positionIndex * (isMobile ? 10 : 15);
                    rotate = positionIndex * 4;
                    scale = 1 - (positionIndex * 0.05);
                  }

                  const cardClass = isMobile 
                    ? "absolute flex w-[260px] aspect-[4/3] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-white/20 bg-[#0a0a0f] shadow-2xl"
                    : "absolute flex w-[480px] aspect-[4/3] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-white/20 bg-[#0a0a0f] shadow-2xl";

                  return (
                    <motion.article 
                      key={video.title}
                      className={cardClass}
                      animate={{ x, y, rotate, scale, zIndex }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      onMouseEnter={() => setCursorMode("view")}
                      onMouseLeave={resetCursor}
                      onClick={() => { onClose(); window.dispatchEvent(new CustomEvent("open-craft-menu")); }}
                    >
                      <video src={video.src} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute bottom-6 left-6 z-10 text-left">
                        <h3 className="font-sans text-xl font-semibold text-white drop-shadow-md">{video.title}</h3>
                        <p className="mt-1 font-mono text-xs text-white/70 drop-shadow-sm">{video.desc}</p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
