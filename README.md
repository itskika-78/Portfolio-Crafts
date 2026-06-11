# Kika — Portfolio

Personal portfolio of **Kika** (@kika.skr) — a 15-year-old full-stack developer
building on Next.js, Solana, and the creative web.

Live at **[kika-skr.vercel.app](https://kika-skr.vercel.app/)**

## Design

A dark, cinematic, instrument-panel aesthetic:

- **Viewport frame** — a fixed hairline frame around the screen holding the
  header, live SOL/BTC/ETH market tickers, and HUD readouts (cursor, scroll,
  session time)
- **Hero** — floating 3D tech coins orbiting a centered statement, scattering
  and blurring away as you scroll
- **Volumetric backdrop** — canvas-rendered god-rays and drifting dust motes
  over pure black, with film grain on top
- **Case studies** — corner-bracketed media masks alternating left/right
- **Giant 3D wordmark** — an extruded white "KIKA" monument rising at the
  page's end
- **Craft overlay** — a bento gallery of motion design studies, each linking
  to its source
- Custom cursor, smooth Lenis scrolling, shutter-style preloader, and a cyan
  accent across the monochrome base

## Stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for scroll-linked and
  staggered animation
- [Lenis](https://lenis.darkroom.engineering/) smooth scroll
- Live prices from the public CoinGecko API (graceful static fallback)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run build` produces the production bundle. Media in
`Events Attended/` is synced into `public/media/` automatically before dev
and build by `scripts/sync-media.mjs`.
