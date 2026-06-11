"use client";

import { useEffect, useRef } from "react";

/*
 * Volumetric studio backdrop: soft god-rays falling from above
 * and slowly drifting dust motes. Pure 2D canvas, original work.
 */
interface Mote {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  tw: number; // twinkle phase
}

export default function LightRays() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = canvas;
    const g = ctx;

    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.6 : 0.85;

    const resize = () => {
      c.width = window.innerWidth * scale;
      c.height = window.innerHeight * scale;
      c.style.width = "100%";
      c.style.height = "100%";
    };
    resize();
    window.addEventListener("resize", resize);

    const MOTES = isMobile ? 60 : 160;
    const motes: Mote[] = Array.from({ length: MOTES }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: Math.random() * 0.00018 + 0.00004,
      a: Math.random() * 0.5 + 0.1,
      tw: Math.random() * Math.PI * 2,
    }));

    // ray definitions: x position (0-1 across top), spread, drift speed
    const RAYS = [
      { x: 0.32, w: 0.055, sway: 0.018, speed: 0.00021, a: 0.10 },
      { x: 0.42, w: 0.10, sway: 0.025, speed: 0.00016, a: 0.13 },
      { x: 0.52, w: 0.07, sway: 0.02, speed: 0.00027, a: 0.11 },
      { x: 0.62, w: 0.12, sway: 0.03, speed: 0.00013, a: 0.09 },
      { x: 0.72, w: 0.06, sway: 0.022, speed: 0.00024, a: 0.07 },
    ];

    let t = 0;
    let last = 0;

    function frame(ts: number) {
      const dt = Math.min(ts - last, 50);
      last = ts;
      t += dt;

      const W = c.width;
      const H = c.height;

      g.clearRect(0, 0, W, H);

      // god-rays: trapezoids from a point above the top edge
      g.globalCompositeOperation = "lighter";
      for (const ray of RAYS) {
        const sway = Math.sin(t * ray.speed) * ray.sway;
        const topX = (ray.x + sway) * W;
        const topW = ray.w * W * 0.25;
        const botW = ray.w * W * 2.6;
        const botX = topX + sway * W * 1.8;
        const reach = H * (0.72 + 0.05 * Math.sin(t * ray.speed * 1.7));

        const grad = g.createLinearGradient(topX, -40, botX, reach);
        grad.addColorStop(0, `rgba(255,255,255,${ray.a})`);
        grad.addColorStop(0.55, `rgba(255,255,255,${ray.a * 0.32})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        g.fillStyle = grad;
        g.beginPath();
        g.moveTo(topX - topW, -40);
        g.lineTo(topX + topW, -40);
        g.lineTo(botX + botW, reach);
        g.lineTo(botX - botW, reach);
        g.closePath();
        g.fill();
      }
      g.globalCompositeOperation = "source-over";

      // dust motes
      for (const m of motes) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.tw += dt * 0.0011;
        if (m.y > 1.02) {
          m.y = -0.02;
          m.x = Math.random();
        }
        if (m.x > 1.02) m.x = -0.02;
        if (m.x < -0.02) m.x = 1.02;

        const twinkle = 0.55 + 0.45 * Math.sin(m.tw);
        g.fillStyle = `rgba(255,255,255,${m.a * twinkle * 0.5})`;
        g.beginPath();
        g.arc(m.x * W, m.y * H, m.r, 0, Math.PI * 2);
        g.fill();
      }

      // faint floor pools of light
      const pool = g.createRadialGradient(
        W * 0.45, H * 0.96, 0,
        W * 0.45, H * 0.96, W * 0.18
      );
      pool.addColorStop(0, "rgba(255,255,255,0.05)");
      pool.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = pool;
      g.fillRect(0, H * 0.8, W, H * 0.2);

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: "var(--z-rays)",
        pointerEvents: "none",
        display: "block",
        opacity: 0.85,
      }}
    />
  );
}
