import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import saudaukarBootcampImg from "../lib/sitepics/blockchain-developer-bootcamp-final-project_0.png";
import hyperlyzDemoImg from "../lib/sitepics/hyperlyz-demo.png";
import clausuraImg from "../lib/sitepics/clausura.png";
import solanaGameImg from "../lib/sitepics/solanasdk.png";
import zorbImg from "../lib/sitepics/zorb.png";

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
     "I analyzed business processes, optimize AI prompt strategies, and support marketing and CRM initiatives for clients across healthcare, CPG, and tech industries.",
   icon: React.createElement(""),
   date: "2022 - Present",
 },
 {
   title: "Technical Writer",
   location: "Amazon Project Neo",
   description:
     "Developed and refined AI prompts to ensure consistent and accurate LLM outputs across varied topics. Drove peer review processes, providing guidance to pod teammates on optimizing prompt strategies.",
   icon: React.createElement(""),
   date: "2022 - 2023",
 },
 {
   title: "Customer Preference Management Analyst",
   location: "Walgreens Boots Alliance",
   description:
     "Mapped out digital/physical touchpoints for customer preference data collection. Developed a central playbook for expanding preference management across new channels.",
   icon: React.createElement(""),
   date: "2022 - 2023",
 },
 {
   title: "CRM Apprentice",
   location: "Maserati",
   description:
     "Audited existing CRM systems and recommended enhancements for improved process efficiency. Provided regular status reports and project documentation to ensure stakeholder alignment",
   icon: React.createElement(""),
   date: "2022",
 },
 {
   title: "CPG Marketing & Commerce Advisory",
   location: "Mondelez",
   description:
     "Partnered with cross-functional teams to analyze consumer data and streamline marketing campaigns. Leveraged AI-driven insights to optimize communication strategies",
   icon: React.createElement(""),
   date: "2023",
 },
//  {
//    title: "Billing Agent",
//    location: "Luna Medical, Chicago, IL",
//    description:
//      "Reduced overdue invoices by 32%, recovering approximately $81K in outstanding payments.Streamlined billing workflows, improving efficiency and customer satisfaction by 11%",
//    icon: React.createElement(""),
//    date: "2019 - 2020",
//  },
] as const;


export const projectsData = [
//  {
//    title: "Sardaukar Bootcamp",
//    description:
//      'A decentralized app where users chant to the Maker, with data stored on Ethereum via a smart contract.',
//    tags: ["Solidity", "Ethereum", "Smart Contracts", "Next.js"],
//    imageUrl: saudaukarBootcampImg,
//  },
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
  "CRM Platforms"
] as const;