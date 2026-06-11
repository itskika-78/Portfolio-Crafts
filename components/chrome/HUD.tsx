"use client";

import { useEffect, useRef, useState } from "react";

/* Live instrument readouts — cursor, scroll, session time, clicks */
export default function HUD() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [time, setTime] = useState(0);
  const start = useRef(Date.now());

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setCursor({ x: e.clientX, y: e.clientY });
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    const onClick = () => setClicks((c) => c + 1);
    const t = setInterval(
      () => setTime((Date.now() - start.current) / 1000),
      100
    );

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      clearInterval(t);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const cell = "flex justify-between gap-3";
  const label = { color: "var(--color-shade-mute)" };
  const value = { color: "var(--color-shade-secondary)" };

  return (
    <div
      className="u-label-xs hidden w-[210px] grid-cols-2 gap-x-5 gap-y-1 xl:grid"
      aria-hidden="true"
    >
      <div className={cell}>
        <span style={label}>CURSOR X:</span>
        <span style={value}>{cursor.x}</span>
      </div>
      <div className={cell}>
        <span style={label}>SCROLL:</span>
        <span style={value}>{scroll.toFixed(3)}</span>
      </div>
      <div className={cell}>
        <span style={label}>CURSOR Y:</span>
        <span style={value}>{cursor.y}</span>
      </div>
      <div className={cell}>
        <span style={label}>TIME:</span>
        <span style={value}>{time.toFixed(2)}</span>
      </div>
      <div className={cell}>
        <span style={label}>CLICKS:</span>
        <span style={value}>{clicks}</span>
      </div>
      <div className={cell}>
        <span style={label}>SYS:</span>
        <span style={{ color: "var(--color-brand-primary)" }}>OK</span>
      </div>
    </div>
  );
}
