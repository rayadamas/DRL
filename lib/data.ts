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

/** Reverse chronological (newest first): current roles, then by end date. */
export const experiencesData: readonly ExperienceItem[] = [
  {
    title: "Independent Client Manager",
    company: "Vino Louden Music · Chicago, IL · vinolouden.com",
    date: "Jan 2025 — Present",
    description:
      "Runs digital presence and outreach for a performing artist—content rhythm, Linktree and social channels, and lightweight CRM-style tracking so engagement turns into booked conversations.",
    type: "work",
  },
  {
    title: "Founder",
    company: "Quincy Labs · Chicago, IL",
    date: "May 2022 — Present",
    description:
      "Independent lab at the intersection of AI infrastructure, on-chain systems, and applied life sciences—shipping serious R&D (including TRACE, a sickle-cell–focused causal reasoning tool) while pushing multi-agent orchestration, edge inference, and protocol-level design.",
    type: "work",
  },
  {
    title: "Business Development Specialist",
    company: "Firstbase",
    date: "Feb 2026 — May 2026",
    description:
      "Focused on global equipment-lifecycle and hybrid-workplace wins—account research, CISO/VP-level conversations, and outbound that highlights retrieval rates, day-one readiness, and fewer IT headaches.",
    type: "work",
  },
  {
    title: "AWS AI Practitioner · Artificial Intelligence",
    company: "Udacity",
    date: "Mar 2026",
    description:
      "Nanodegree-style path toward AWS AI Practitioner fluency—services, responsible use, and mapping cloud ML to how teams actually ship.",
    type: "education",
  },
  {
    title: "Sales Development Fellowship",
    company: "SV Academy · Chicago, IL",
    date: "Dec 2025 — Jan 2026",
    description:
      "Competitive SDR prep—250+ hours on conversational selling, disciplined prospecting, email craft, and EQ under rejection, coached by SVA methodology and alumni mentors.",
    type: "work",
  },
  {
    title: "Certificate of Completion · Artificial Intelligence",
    company: "Outskill",
    date: "Nov 2025 — Dec 2025",
    description:
      "Short, high-intensity AI certificate—core concepts, tooling literacy, and applied exercises rather than slide-deck theory.",
    type: "education",
  },
  {
    title: "Certificate · International Finance",
    company: "University of Nicosia",
    date: "Sep 2022 — Dec 2025",
    description:
      "Long-form certificate across international markets and financial analysis—context that pairs well with cross-border and digital-asset themes.",
    type: "education",
  },
  {
    title: "Business Development Representative",
    company: "RE:WORK TRAINING · Chicago, IL",
    date: "Jan 2025 — Nov 2025",
    description:
      "Nonprofit BDR work through the Get This Work bootcamp—outbound and inbound for tech sales training, donors, and corporate partners; qualified pipeline, demos, CRM hygiene, and tight alignment with sales and marketing goals.",
    type: "work",
  },
  {
    title: "Production Team Member · ADPodcast",
    company: "Accenture · Chicago, IL",
    date: "Dec 2023 — Jan 2025",
    description:
      "Supported end-to-end podcast operations for a global show—scheduling, host and editor coordination, quality bar, and clearer internal comms so episodes shipped on time with less rework.",
    type: "work",
  },
  {
    title: "Business Analyst",
    company: "Accenture · Chicago, IL",
    date: "Jan 2022 — Jan 2025",
    description:
      "Mapped processes and business models to modern tech, turned stakeholder needs into future-state designs, and partnered across teams on delivery—strong lens on e-commerce and digital marketplace strategy.",
    type: "work",
  },
  {
    title: "Commerce Analyst · QA Tester",
    company: "Accenture · Kent (Canada) e-commerce program",
    date: "Aug 2024 — Sep 2024",
    description:
      "Manual storefront testing (flows, search, checkout, basic security signals) across Magento staging tiers; logged defects, verified fixes, and coordinated with offshore QA peers across CST/CET.",
    type: "work",
  },
  {
    title: "Commerce Strategy Analyst",
    company: "Accenture · Macy’s transformation",
    date: "Jul 2024 — Sep 2024",
    description:
      "Taxonomy and facet work ahead of a major go-live—attribute reconciliation, L3/L4 mapping, Google Console sequencing sheets, and QC on AI-generated tags with bulk overrides when merchandising needed cleaner shopper language.",
    type: "work",
  },
  {
    title: "NLP Training Contributor",
    company: "Amazon · Project Neo (via Accenture) · Chicago, IL",
    date: "Mar 2023 — Jul 2024",
    description:
      "Large-scale prompt/completion authoring for an enterprise language model—1,100+ pairs across nine task types, reusable templates, strict QA gates, and automation ideas that pushed team throughput toward ~40 prompts per FTE per day.",
    type: "work",
  },
  {
    title: "Accessibility Analyst",
    company: "Accenture · Chicago, IL",
    date: "Jul 2023 — Sep 2023",
    description:
      "Deque Axe–driven WCAG 2.1 AA scans across assigned brand sites—exported structured findings, flagged high-impact pages, and fed a growing accessibility data lane for remediation follow-up.",
    type: "work",
  },
  {
    title: "Sales Support Practitioner",
    company: "Accenture · Chicago, IL",
    date: "Feb 2023 — Mar 2023",
    description:
      "Account intel pass—validated existing Accenture relationships and whether client stacks still lived on-prem or had already moved cloudward.",
    type: "work",
  },
  {
    title: "Customer Preference Management (CPM)",
    company: "Walgreens Boots Alliance · via Accenture · Chicago, IL",
    date: "Sep 2022 — Jan 2023",
    description:
      "Structured program design lens—current state, requirements, future-state options, synthesized research, status reporting, and clear handrails for stakeholder decisions.",
    type: "work",
  },
  {
    title: "Phonon Developer",
    company: "GridPlus · United States",
    date: "Aug 2022 — Nov 2022",
    description:
      "Worked on Phonon’s off-chain asset movement model—hardware-secured flows and protocol concepts aimed at practical, privacy-aware peer value transfer.",
    type: "work",
  },
  {
    title: "Apprentice Program · North America",
    company: "Accenture · Chicago, IL",
    date: "Jan 2022 — Aug 2022",
    description:
      "Foundational consulting apprenticeship—analyze organizations, stitch business models to tech, interviews and synthesis, and crisp definitions of customer requirements and target outcomes.",
    type: "work",
  },
  {
    title: "DeFi MOOC · Computer Science",
    company: "University of California, Berkeley",
    date: "Sep 2021 — Dec 2021",
    description:
      "Berkeley MOOC coverage of DeFi mechanics—liquidity primitives, protocols, and how decentralized markets diverge from traditional settlement rails.",
    type: "education",
  },
  {
    title: "Billing Agent",
    company: "Luna Medical · Chicago, IL",
    date: "Sep 2019 — Mar 2020",
    description:
      "Owned billing throughput for medical product orders—invoices, clean documentation, ERP-style data entry, and cross-team fixes when orders or payer questions stalled cash.",
    type: "work",
  },
  {
    title: "Operations Lead",
    company: "Saks OFF 5TH · Chicago, IL",
    date: "Mar 2016 — Jan 2019",
    description:
      "Rotating department leadership—inbound/outbound freight discipline, replenishment rhythms, forecasting with the team, and web-fulfillment coordination that materially lifted local ranking and online attach versus a same-parent competitor.",
    type: "work",
  },
  {
    title: "Operations Specialist",
    company: "Nordstrom Trunk Club · Chicago, IL",
    date: "Feb 2015 — Mar 2016",
    description:
      "Digital-first fulfillment and refurbishment workflows—tablet KPI tracking, inbound processing, and using new metrics feeds to tighten repeat-sales strategy.",
    type: "work",
  },
  {
    title: "Advanced Certificate · Dental Assisting / Assistant",
    company: "City Colleges of Chicago · Wilbur Wright College",
    date: "2013 — 2015",
    description:
      "Credential-backed clinical and administrative training—precision, sterilization protocols, and professional patient interaction at the front line of care.",
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
