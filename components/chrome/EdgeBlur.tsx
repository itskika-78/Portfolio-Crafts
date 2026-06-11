"use client";

/* Cinematic blur bands at the top and bottom viewport edges */
export default function EdgeBlur() {
  const common: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    height: "90px",
    pointerEvents: "none",
    backdropFilter: "blur(7px)",
    WebkitBackdropFilter: "blur(7px)",
  };

  return (
    <div style={{ zIndex: "var(--z-edge)" }} aria-hidden="true">
      <div
        style={{
          ...common,
          top: 0,
          maskImage: "linear-gradient(to bottom, black 20%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent)",
        }}
      />
      <div
        style={{
          ...common,
          bottom: 0,
          maskImage: "linear-gradient(to top, black 20%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 20%, transparent)",
        }}
      />
    </div>
  );
}
