export const profile = {
  name: "Kika",
  handle: "@kika.skr",
  ageRole: "15 year old, Full-stack developer",
  role: "Full-stack developer",
  email: "kika@sendarcade.fun",
  bio: "Just a decentralized 15 year old.",
  github: "https://github.com/itskika-78?tab=repositories",
  twitter: "https://x.com/itskika_78",
  resume: "/resume.pdf",
  quote: "I build software that is technically rigorous and visually extraordinary",
};

export const nav = [
  { label: "CV", href: "https://github.com/itskika-78", external: true },
  { label: "GITHUB", href: "https://github.com/itskika-78?tab=repositories", external: true },
  { label: "CRAFT", href: "#craft", external: false },
  { label: "X", href: "https://x.com/itskika_78", external: true },
  { label: "MAIL", href: "mailto:kika@sendarcade.fun", external: true },
];

export const heroTags = ["Next.js", "Solana", "Web3", "Creative coding", "Games"];

export const specializeTags = [
  "Freelance",
  "Open source",
  "Remote work",
  "Personal projects",
];

export const experience = [
  {
    role: "Frontend Lead",
    company: "sendarcade.fun",
    period: "February 2025 - November 2025",
    years: "2025",
    blurb:
      "Led the frontend of an onchain arcade on Solana — shipped production interfaces for web3 gaming where every interaction settles on the chain.",
  },
  {
    role: "Onchain Developer",
    company: "crossbar-inc.com",
    period: "April 2026 - Present",
    years: "2026 — NOW",
    blurb:
      "Building onchain programs and the infrastructure around them: indexing, RPC plumbing, and the interfaces that make them usable.",
  },
  {
    role: "Backend Developer",
    company: "Superteam Earn",
    period: "May 2026 - Present",
    years: "2026 — NOW",
    blurb:
      "Backend work for the Solana ecosystem's bounty and earnings platform — APIs that move real value for real builders.",
  },
];

export const highlights = [
  {
    title: "Startup Village 2026 Resident",
    period: "May 15 - May 25 2026",
    image: "/media/events-attended/startupVillage.webp",
  },
  {
    title: "Solana Superdevs Fellowship",
    period: "March 2026",
    image: "/media/events-attended/superdevs.webp",
  },
  {
    title: "Athena Hacker House",
    period: "Nov 2025",
    image: "/media/events-attended/athena2.webp",
  },
];

export const skills = [
  {
    name: "Next.js & React",
    blurb: "App-router architectures, server components, and interfaces that feel instant.",
  },
  {
    name: "Solana",
    blurb: "Programs, token tooling, validators, and RPC infrastructure on the chain that doesn't sleep.",
  },
  {
    name: "TypeScript & Node",
    blurb: "Typed end-to-end — production REST APIs, indexers, and backend services.",
  },
  {
    name: "Creative Coding",
    blurb: "WebGL, GLSL shaders, and canvas work that pushes the browser's limits.",
  },
  {
    name: "Motion & Interface Craft",
    blurb: "Framer Motion studies, micro-interactions, and high-fidelity interface prototypes.",
  },
  {
    name: "Prisma & Data",
    blurb: "Schema design, migrations, and query layers that stay fast under load.",
  },
  {
    name: "Tailwind CSS",
    blurb: "Design systems expressed as utilities — consistent, themeable, shippable.",
  },
];

export const eventDetails: Record<string, { title: string; period: string }> = {
  "100xDevs": { title: "100xDevs", period: "Builders meetup" },
  athena: { title: "Athena Hacker House", period: "Nov 2025 - Present" },
  athena2: { title: "Athena Hacker House", period: "Nov 2025 - Present" },
  startupVillage: { title: "Startup Village 2026 Resident", period: "May 15 - May 25" },
  STIndia: { title: "Superteam India", period: "Solana ecosystem" },
  superdevs: { title: "Solana Superdevs Fellowship", period: "Sept - Dec" },
};

export const designShowcaseLinks: Record<string, string> = {
  dynamicIsland: "https://github.com/itskika-78/Craft-Animation_Playground/blob/main/components/DynamicIsland.tsx",
  Ringer: "https://github.com/itskika-78/Craft-Animation_Playground/blob/main/components/shared/Ring.tsx",
  gooey: "https://github.com/itskika-78/Craft-Animation_Playground/blob/main/components/GooeyFilter.tsx",
  interfaceCraft: "https://github.com/itskika-78/Craft-Animation_Playground/blob/main/components/InterfaceCraft.tsx",
  smoothness: "https://github.com/itskika-78/Craft-Animation_Playground/blob/main/components/SmoothnessState.tsx",
  NavBar: "https://codepen.io/Kika-the-bold/pen/KwMZLxV?editors=1100",
};

export const cases = [
  {
    id: "launchpad",
    title: "Solana Token Launchpad Backend",
    tags: ["Solana", "Prisma", "Node.js"],
    description:
      "A production-ready REST API service that powers token launchpad platforms on the Solana blockchain — minting, metadata, and market plumbing behind one clean interface.",
    media: { type: "image" as const, src: "/nfts-on-solana1.png" },
    link: "https://github.com/itskika-78/solana-token-launchpad-backend",
    linkLabel: "VIEW CASE",
  },
  {
    id: "validator",
    title: "Mini Solana Validator",
    tags: ["Solana", "Open source", "Infra"],
    description:
      "A high-performance, single-node, in-memory Solana-compatible JSON-RPC server implementation — the chain, distilled to its moving parts.",
    media: { type: "image" as const, src: "/mini1.jpg" },
    link: "https://github.com/itskika-78/mini-solana-validator",
    linkLabel: "VIEW CASE",
  },
  {
    id: "craft",
    title: "Interface & Motion Craft",
    tags: ["Framer Motion", "WebGL", "Micro-interactions"],
    description:
      "An ongoing library of experimental UI components, shaders, and motion design studies — dynamic islands, gooey filters, and interfaces that feel alive.",
    media: { type: "video" as const, src: "/media/design-showcase/interfaceCraft.mp4" },
    link: "#craft",
    linkLabel: "OPEN GALLERY",
  },
  {
    id: "ringer",
    title: "Animation Playground",
    tags: ["Creative coding", "React", "Open source"],
    description:
      "Spring physics, rings, and smoothness states — a public playground where every animation ships with its source.",
    media: { type: "video" as const, src: "/media/design-showcase/Ringer.mp4" },
    link: "https://github.com/itskika-78/Craft-Animation_Playground",
    linkLabel: "VIEW CASE",
  },
];

export const companies = [
  {
    name: "Sendarcade",
    description: "A web3 gaming platform that is like an onchain casino built on Solana.",
  },
  {
    name: "MilkyWay Trail",
    description: "An indie game dev company based in Canada.",
  },
  {
    name: "Turbo.computer",
    description: "A game engine that runs completely in the git bash terminal.",
  },
  {
    name: "SpawnPoint",
    description:
      "A web3 cloud gaming platform that allows users to play games on the cloud while earning rewards in the form of NFTs and tokens.",
  },
  {
    name: "Superteam",
    description: "The Solana ecosystem's builder collective.",
  },
];

/* fallback values shown until live prices load */
export const tickerFallback = [
  { id: "solana", symbol: "SOL", price: 152.34, change: 2.18 },
  { id: "bitcoin", symbol: "BTC", price: 63478.33, change: -1.96 },
  { id: "ethereum", symbol: "ETH", price: 3415.12, change: 0.64 },
];
