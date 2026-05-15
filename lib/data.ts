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
    date: "Present",
    description:
      "Analyzed business processes, optimized AI prompt strategies, and supported marketing and CRM initiatives for clients across healthcare, CPG, and tech industries.",
    type: "work",
  },
  {
    title: "Technical Writer",
    company: "Amazon Project Neo (ACN)",
    date: "Recent",
    description:
      "Developed and refined AI prompts to ensure consistent and accurate LLM outputs across varied topics. Drove peer review processes, providing guidance to pod teammates on optimizing prompt strategies.",
    type: "work",
  },
  {
    title: "Customer Preference Management Analyst",
    company: "Walgreens Boots Alliance (ACN)",
    date: "Recent",
    description:
      "Mapped digital and physical touchpoints for customer preference data collection. Developed a central playbook for expanding preference management across new channels.",
    type: "work",
  },
  {
    title: "CRM Apprentice",
    company: "Maserati (ACN)",
    date: "Recent",
    description:
      "Audited existing CRM systems and recommended enhancements for improved process efficiency. Provided regular status reports and project documentation to ensure stakeholder alignment.",
    type: "work",
  },
  {
    title: "CPG Marketing & Commerce Advisory",
    company: "Mondelez (ACN)",
    date: "Recent",
    description:
      "Partnered with cross-functional teams to analyze consumer data and streamline marketing campaigns. Leveraged AI-driven insights to optimize communication strategies.",
    type: "work",
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
