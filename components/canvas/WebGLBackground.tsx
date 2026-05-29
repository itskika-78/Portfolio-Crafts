"use client";

import { useEffect, useRef } from "react";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const velocityRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastScrollRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // capture as non-null for use inside nested functions
    const c: HTMLCanvasElement = canvas;
    const g: CanvasRenderingContext2D = ctx;

    // Resize handler
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track scroll velocity
    const handleScroll = () => {
      const current = window.scrollY;
      velocityRef.current = current - lastScrollRef.current;
      lastScrollRef.current = current;
      scrollRef.current = current;
    };

    // Track mouse
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });

    // Plane definition for spiral
    interface Plane {
      angle: number;
      z: number;
      w: number;
      h: number;
    }

    const PLANE_COUNT = 22;
    const planes: Plane[] = Array.from({ length: PLANE_COUNT }, (_, i) => ({
      angle: (i / PLANE_COUNT) * Math.PI * 2 * 3, // 3 full spiral turns
      z: i * 0.55,
      w: 220,
      h: 130,
    }));

    // Draw a single plane as a perspective-projected rectangle
    function drawPlane(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      plane: Plane,
      scroll: number,
      vel: number,
      t: number,
      mx: number,
      my: number
    ) {
      const fov = 600;
      const angle = plane.angle + scroll * 0.0008 + t * 0.12;
      const zDepth = plane.z - (scroll * 0.003) % (PLANE_COUNT * 0.55);

      // Recycle planes that go past camera
      const z = ((zDepth % (PLANE_COUNT * 0.55)) + PLANE_COUNT * 0.55) % (PLANE_COUNT * 0.55);
      const depth = z + 2;
      if (depth <= 0.1) return;

      const spiralX = Math.cos(angle) * 260;
      const spiralY = Math.sin(angle) * 120;

      // Mouse parallax
      const px = spiralX + mx * 40 * (1 / depth);
      const py = spiralY + my * 25 * (1 / depth);

      // Perspective projection
      const scale = fov / (fov + depth * 60);
      const screenX = cx + px * scale;
      const screenY = cy + py * scale;

      const pw = plane.w * scale;
      const ph = plane.h * scale;

      // Velocity warp — stretch vertically
      const velWarp = Math.min(Math.abs(vel) * 0.04, 3);
      const stretchedH = ph + velWarp * ph * 0.6;

      // Depth-based opacity
      const depthFade = Math.max(0, 1 - depth / (PLANE_COUNT * 0.45));
      if (depthFade < 0.01) return;

      const alpha = depthFade * 0.72;

      // Draw card background
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(screenX, screenY);

      // Slight rotation based on angle
      const tilt = Math.sin(angle) * 0.12;
      ctx.rotate(tilt);

      // Dark card body
      const gradient = ctx.createLinearGradient(-pw / 2, -stretchedH / 2, pw / 2, stretchedH / 2);
      gradient.addColorStop(0, `rgba(8, 8, 20, ${0.85 * alpha})`);
      gradient.addColorStop(1, `rgba(4, 4, 12, ${0.85 * alpha})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(-pw / 2, -stretchedH / 2, pw, stretchedH);

      // Neon cyan border
      const borderAlpha = depthFade * 0.7;
      ctx.strokeStyle = `rgba(0, 255, 255, ${borderAlpha})`;
      ctx.lineWidth = Math.max(0.5, scale * 1.2);
      ctx.strokeRect(-pw / 2, -stretchedH / 2, pw, stretchedH);

      // Border glow (wider, dimmer stroke)
      ctx.strokeStyle = `rgba(0, 255, 255, ${borderAlpha * 0.3})`;
      ctx.lineWidth = Math.max(1, scale * 4);
      ctx.strokeRect(-pw / 2, -stretchedH / 2, pw, stretchedH);

      // Interior scan lines
      ctx.strokeStyle = `rgba(0, 255, 255, ${depthFade * 0.06})`;
      ctx.lineWidth = 0.5;
      const lineCount = Math.floor(stretchedH / 12);
      for (let l = 0; l < lineCount; l++) {
        const ly = -stretchedH / 2 + (l / lineCount) * stretchedH;
        ctx.beginPath();
        ctx.moveTo(-pw / 2, ly);
        ctx.lineTo(pw / 2, ly);
        ctx.stroke();
      }

      // Corner dots
      const dotSize = Math.max(1, scale * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${depthFade * 0.8})`;
      [
        [-pw / 2, -stretchedH / 2],
        [pw / 2, -stretchedH / 2],
        [-pw / 2, stretchedH / 2],
        [pw / 2, stretchedH / 2],
      ].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(dx, dy, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }

    let lastTime = 0;
    function animate(timestamp: number) {
      const dt = timestamp - lastTime;
      lastTime = timestamp;
      timeRef.current += dt * 0.001;

      // Decay velocity
      velocityRef.current *= 0.85;

      const W = c.width;
      const H = c.height;
      const cx = W / 2;
      const cy = H / 2;

      // Clear with very slight trail for motion blur feel
      g.fillStyle = "rgba(5, 5, 8, 0.92)";
      g.fillRect(0, 0, W, H);

      // Sort planes by depth (back to front)
      const scroll = scrollRef.current;
      const vel = velocityRef.current;
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw planes sorted by depth
      const indexed = planes.map((p) => {
        const zDepth = p.z - (scroll * 0.003) % (PLANE_COUNT * 0.55);
        const z = ((zDepth % (PLANE_COUNT * 0.55)) + PLANE_COUNT * 0.55) % (PLANE_COUNT * 0.55);
        return { plane: p, depth: z };
      });
      indexed.sort((a, b) => b.depth - a.depth);

      indexed.forEach(({ plane }) => {
        drawPlane(g, cx, cy, plane, scroll, vel, t, mx, my);
      });

      // Central ambient glow
      const glowRadius = 200 + Math.sin(t * 0.5) * 30;
      const glow = g.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
      glow.addColorStop(0, "rgba(0, 255, 255, 0.025)");
      glow.addColorStop(1, "rgba(0, 255, 255, 0)");
      g.fillStyle = glow;
      g.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
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
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
