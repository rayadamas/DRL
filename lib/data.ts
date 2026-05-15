import hyperlyzDemoImg from "../lib/sitepics/hyperlyz-demo.png";
import clausuraImg from "../lib/sitepics/clausura.png";
import solanaGameImg from "../lib/sitepics/Solana Gaming DeFi SDK.png";
import zorbImg from "../lib/sitepics/zorb.png";
import brxImg from "../lib/sitepics/brx.png";
import mintingMelodiesImg from "../lib/sitepics/minting-melodies.png";
import web3rsvpImg from "../lib/sitepics/web3rsvp.png";
import sardaukarImg from "../lib/sitepics/sardaukar.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Experience Account Management Analyst",
    location: "Accenture",
    description:
      "I analyzed business processes, optimized AI prompt strategies, and support marketing and CRM initiatives for clients across healthcare, CPG, and tech industries.",
  },
  {
    title: "Technical Writer",
    location: "Amazon Project Neo(ACN)",
    description:
      "Developed and refined AI prompts to ensure consistent and accurate LLM outputs across varied topics. Drove peer review processes, providing guidance to pod teammates on optimizing prompt strategies.",
  },
  {
    title: "Customer Preference Management Analyst",
    location: "Walgreens Boots Alliance(ACN)",
    description:
      "Mapped out digital/physical touchpoints for customer preference data collection. Developed a central playbook for expanding preference management across new channels.",
  },
  {
    title: "CRM Apprentice",
    location: "Maserati(ACN)",
    description:
      "Audited existing CRM systems and recommended enhancements for improved process efficiency. Provided regular status reports and project documentation to ensure stakeholder alignment",
  },
  {
    title: "CPG Marketing & Commerce Advisory",
    location: "Mondelez(ACN)",
    description:
      "Partnered with cross-functional teams to analyze consumer data and streamline marketing campaigns. Leveraged AI-driven insights to optimize communication strategies",
  },
] as const;

export const projectsData = [
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
    tags: ["web3", "Typescript", "JavaScript", "Shell", "CSS"],
    imageUrl: clausuraImg,
  },
  {
    title: "Solana Flutter Defi SDK",
    description:
      "Wormhole bridge integrated into an NFT Dating mobile App, which is powered by the open-source Canoe-Flutter-DeFi SDK.",
    tags: ["Dart", "Kotlin", "Java", "Python", "CSS"],
    imageUrl: solanaGameImg,
  },
  {
    title: "Zorbz Data Visualizer",
    description:
      "An MVP data visualization tool using ZORB metadata and Zora's API to abstract blockchain data into visuals.",
    tags: ["p5.js", "JavaScript", "Typescript", "web3"],
    imageUrl: zorbImg,
  },
  {
    title: "BRX / Bricks",
    description:
      "A web3 platform for fractional real estate investing — own hassle-free shares of properties starting at $2,500 via the Bricks Deal Room.",
    tags: ["Next.js", "Solidity", "TypeScript", "web3", "DeFi"],
    imageUrl: brxImg,
  },
  {
    title: "KM Collection — Pinball Spring",
    description:
      "An NFT minting site for the 'Pinball Spring' collection, showcasing on-chain music and visual artwork.",
    tags: ["Next.js", "Solidity", "JavaScript", "web3", "NFT"],
    imageUrl: mintingMelodiesImg,
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
] as const;

export const skillsData = [
  // Frontend & Web Development
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Redux",

  // Backend & API Development
  "Node.js",
  "Express",
  "GraphQL",
  "PostgreSQL",
  "Django",

  // Blockchain & Web3
  "Solidity",
  "Ethereum",
  "Truffle",
  "Hardhat",
  "Foundry",
  "Thirdweb",
  "Blockchain Analysis",

  // AI & Data
  "Prompt Engineering",
  "Data Analysis",
  "Business Process Analysis",

  // DevOps & Tools
  "Git",
  "Docker",
  "AWS",
  "Workfront",
  "Jira",
  "MS Office Tools",

  // Business & Strategy
  "Business Model Strategy",
  "Business Operations Management",
  "Client & Account Management",
  "Technical Writing",
  "CRM Platforms",
] as const;
