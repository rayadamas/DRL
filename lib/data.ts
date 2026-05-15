import hyperlyzDemoImg from "../lib/sitepics/hyperlyz-demo.png";
import clausuraImg from "../lib/sitepics/clausura.png";
import solanaGameImg from "../lib/sitepics/Solana Gaming DeFi SDK.png";
import zorbImg from "../lib/sitepics/zorb.png";
import web3rsvpImg from "../lib/sitepics/web3rsvp.png";
import sardaukarImg from "../lib/sitepics/sardaukar.png";
import type { StaticImageData } from "next/image";

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Experience", hash: "#experience" },
  { name: "Contact", hash: "#contact" },
] as const;

export type ExperienceItem = {
  title: string;
  company: string;
  date: string;
  description: string;
  type: "work" | "education";
};

export const experiencesData: readonly ExperienceItem[] = [
  {
    title: "Experience Account Management Analyst",
    company: "Accenture",
    date: "Feb 2022 — Present",
    description:
      "Runs Accenture programs spanning CRM, marketing tech, and applied AI—from discovery through rollout—for healthcare and CPG clients.",
    type: "work",
  },
  {
    title: "Technical Writer",
    company: "Amazon Project Neo (via Accenture)",
    date: "2024 · Client engagement",
    description:
      "Tightened AI writing playbooks—prompt patterns, QA rubrics, peer review—to keep Neo’s LLM-assisted output consistent across topic areas.",
    type: "work",
  },
  {
    title: "Customer Preference Management Analyst",
    company: "Walgreens Boots Alliance (via Accenture)",
    date: "2024 · Client engagement",
    description:
      "Charted omnichannel preference capture journeys and authored a playbook so every touchpoint ladders into reusable preference standards.",
    type: "work",
  },
  {
    title: "CRM Apprentice",
    company: "Maserati (via Accenture)",
    date: "2023 · Client engagement",
    description:
      "Reviewed regional CRM footprints, prioritized quick-win fixes for sales workflows, and briefed sponsors with actionable documentation.",
    type: "work",
  },
  {
    title: "CPG Marketing & Commerce Advisory",
    company: "Mondelez (via Accenture)",
    date: "2023 · Client engagement",
    description:
      "Turned shopper and performance signals into sharper briefs—aligning creatives, KPIs, and AI-assisted insight reads for smoother campaigns.",
    type: "work",
  },
  {
    title: "AWS AI Practitioner · Artificial Intelligence",
    company: "Udacity",
    date: "Mar 2026",
    description:
      "Udacity track aligned with AWS AI Practitioner—building fluency in cloud AI services, governance, and how those tools land in accountable delivery workflows.",
    type: "education",
  },
  {
    title: "Certificate of Completion · Artificial Intelligence",
    company: "Outskill",
    date: "Nov 2025 — Dec 2025",
    description:
      "Finished an intensive AI completion track focused on concepts, tooling literacy, and applied problem framing—not theory for its own sake.",
    type: "education",
  },
  {
    title: "Certificate · International Finance",
    company: "University of Nicosia",
    date: "Sep 2022 — Dec 2025",
    description:
      "Certificate path spanning global markets, institutions, and financial analysis—useful backbone for interpreting cross-border crypto and TradFi overlaps.",
    type: "education",
  },
  {
    title: "DeFi MOOC · Computer Science",
    company: "University of California, Berkeley",
    date: "Sep 2021 — Dec 2021",
    description:
      "Short-form Berkeley MOOC on decentralized finance primitives—liquidity models, protocols, and how they differ from centralized rails.",
    type: "education",
  },
  {
    title: "Advanced Certificate · Dental Assisting / Assistant",
    company: "City Colleges of Chicago · Wilbur Wright College",
    date: "2013 — 2015",
    description:
      "Clinical and administrative fundamentals in a credential program—early training in precision, protocols, and patient-facing professionalism.",
    type: "education",
  },
];

export type ProjectData = {
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: StaticImageData;
  link?: string;
};

export const projectsData: readonly ProjectData[] = [
  {
    title: "Hyperlyz Demo",
    description:
      "A demo showcasing Music NFTs via the ZORA API, allowing users to mint their own audio files.",
    tags: ["JavaScript", "HTML", "CSS", "web3"],
    imageUrl: hyperlyzDemoImg,
  },
  {
    title: "Clausura",
    description:
      "A modular, open-source music platform designed to help creators share, publish, and remix content.",
    tags: ["web3", "TypeScript", "JavaScript", "Shell", "CSS"],
    imageUrl: clausuraImg,
  },
  {
    title: "Solana Flutter DeFi SDK",
    description:
      "Wormhole bridge integrated into an NFT Dating mobile App, powered by the open-source Canoe-Flutter-DeFi SDK.",
    tags: ["Dart", "Kotlin", "Java", "Python", "CSS"],
    imageUrl: solanaGameImg,
  },
  {
    title: "Zorbz Data Visualizer",
    description:
      "An MVP data visualization tool using ZORB metadata and Zora's API to abstract blockchain data into visuals.",
    tags: ["p5.js", "JavaScript", "TypeScript", "web3"],
    imageUrl: zorbImg,
  },
  {
    title: "web3rsvp",
    description:
      "A metaverse events platform where users can discover, join, and create virtual events with their web3 frens.",
    tags: ["Next.js", "Solidity", "TypeScript", "The Graph", "web3"],
    imageUrl: web3rsvpImg,
  },
  {
    title: "Sardaukar Bootcamp",
    description:
      "A decentralized Dune-inspired app where users chant to the Maker, with each chant stored on Ethereum via a smart contract.",
    tags: ["Solidity", "Ethereum", "Smart Contracts", "Next.js"],
    imageUrl: sardaukarImg,
  },
];

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Redux",
  "Node.js",
  "Express",
  "GraphQL",
  "PostgreSQL",
  "Django",
  "Solidity",
  "Ethereum",
  "Truffle",
  "Hardhat",
  "Foundry",
  "Thirdweb",
  "Blockchain Analysis",
  "Prompt Engineering",
  "Data Analysis",
  "Business Process Analysis",
  "Git",
  "Docker",
  "AWS",
  "Workfront",
  "Jira",
  "MS Office Tools",
  "Business Model Strategy",
  "Business Operations Management",
  "Client & Account Management",
  "Technical Writing",
  "CRM Platforms",
] as const;
