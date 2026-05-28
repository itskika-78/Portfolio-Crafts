export const profile = {
  name: "Kika",
  handle: "@kika.skr",
  ageRole: "15 year old, Full-stack developer",
  role: "Full-stack developer",
  email: "kika@sendarcade.fun",
  bio:
    "Just a decentralized 15 year old.",
  github: "https://github.com/itskika-78?tab=repositories",
};

export const experience = [
  {
    role: "Frontend Lead",
    company: "sendarcade.fun",
    period: "February 2025 - November 2025",
  },
  {
    role: "Onchain Developer",
    company: "crossbar-inc.com",
    period: "April 2026 - Present",
  },
  {
    role: "Backend Developer",
    company: "Superteam Earn",
    period: "May 2026 - Present",
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

export const eventDetails: Record<string, { title: string; period: string }> = {
  "100xDevs": { title: "100xDevs", period: "Builders meetup" },
  athena: { title: "Athena Hacker House", period: "Nov 2025 - Present" },
  athena2: { title: "Athena Hacker House", period: "Nov 2025 - Present" },
  startupVillage: { title: "Startup Village 2026 Resident", period: "May 15 - May 25" },
  STIndia: { title: "Superteam India", period: "Solana ecosystem" },
  superdevs: { title: "Solana Superdevs Fellowship", period: "Sept - Dec" },
};

export const designShowcaseLinks: Record<string, string> = {
  dynamicIsland: "https://github.com/itskika-78/Craft---An-Animation-Playground/blob/main/Craft-main/components/DynamicIsland.tsx",
Ringer: "https://github.com/itskika-78/Craft---An-Animation-Playground/blob/main/Craft-main/components/shared/Ring.tsx",
  gooey: "https://github.com/itskika-78/Craft---An-Animation-Playground/blob/main/Craft-main/components/GooeyFilter.tsx",
  interfaceCraft: "https://github.com/itskika-78/Craft---An-Animation-Playground/blob/main/Craft-main/components/InterfaceCraft.tsx",
  smoothness: "https://github.com/itskika-78/Craft---An-Animation-Playground/blob/main/Craft-main/components/SmoothnessState.tsx",
  NavBar: "https://codepen.io/Kika-the-bold/pen/KwMZLxV?editors=1100",
  // Add more video-to-github mappings as needed
};

export const projects = [
  {
    title: "Solana Token Launchpad Backend",
    description:
      "A production-ready REST API service that powers token launchpad platforms on the Solana blockchain.",
    image: "/nfts-on-solana1.png",
    tags: ["Solana", "Prisma", "Node.js"],
    github: "https://github.com/itskika-78/solana-token-launchpad-backend",
  },
  {
    title: "Mini Solana Validator",
    description:
      "A high-performance, single-node, in-memory Solana-compatible JSON-RPC server implementation.",
    image: "/mini1.jpg",
    tags: ["Solana", "Open source", "Index"],
    github: "https://github.com/itskika-78/mini-solana-validator",
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
];
