import codenameAstraImg from "../lib/sitepics/codename-astra.png";
import cosmicWeekTrackerImg from "../lib/sitepics/cosmic-week-tracker.png";
import aiSecurityScannerImg from "../lib/sitepics/ai-security-scanner-python.png";
import aiWorkflowN8nImg from "../lib/sitepics/ai-workflow-n8n.png";
import ragChatbotBedrockImg from "../lib/sitepics/rag-chatbot-bedrock.png";
import hyperlyzDemoImg from "../lib/sitepics/hyperlyz-demo.png";
import clausuraImg from "../lib/sitepics/clausura.png";
import solanaGameImg from "../lib/sitepics/Solana Gaming DeFi SDK.png";
import zorbImg from "../lib/sitepics/zorb.png";
import prismEchoImg from "../lib/sitepics/prism-echo.png";
import drlBioImg from "../lib/sitepics/drl-bio.png";
import fancyProjImg from "../lib/sitepics/fancy-proj.png";
import loudenDeskImg from "../lib/sitepics/louden-desk.png";
import granolaObsImg from "../lib/sitepics/granola-obs.png";
import pathfinderImg from "../lib/sitepics/pathfinder.png";
import type { StaticImageData } from "next/image";
import type { ExperienceLogoKey } from "./experience-logos";

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Portfolio", hash: "#portfolio" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Engage", hash: "#engage" },
  { name: "Experience", hash: "#experience" },
  { name: "Contact", hash: "#contact" },
] as const;

export type ExperienceItem = {
  title: string;
  company: string;
  /** Optional URL for the company/institution; renders the company line as a link. */
  companyUrl?: string;
  /** Optional logo override (otherwise inferred from company/title). */
  logo?: ExperienceLogoKey;
  date: string;
  description: string;
  type: "work" | "education";
  /** Industry tags for orientation (Gina / CV alignment). */
  industries?: readonly string[];
};

/** Reverse chronological (newest first): current roles, then by end date. */
export const experiencesData: readonly ExperienceItem[] = [
  {
    title: "Sales Engineer",
    company: "Diverse ICT",
    date: "Jan 2026 - Present",
    description:
      "Turns vague client IT (information technology) pain into scoped, sellable work. Maps identity and access risk (shadow IT, over-permissioned accounts, policy drift) into clear recommendations a managed service provider (MSP) can staff, price, and defend at audit.",
    type: "work",
    industries: ["Enterprise IT / IAM", "Cybersecurity"],
  },
  {
    title: "Independent Client Manager",
    company: "Vino Louden Music · Chicago, IL",
    companyUrl: "https://vinolouden.com/",
    date: "Jan 2025 - Present",
    description:
      "Gives a performing artist a business backbone: a steady content calendar, one link hub, and lightweight customer relationship management (CRM) tracking, so fan attention turns into booked shows instead of just likes.",
    type: "work",
    industries: ["Creative / Music"],
  },
  {
    title: "Co-Founder · Applied AI (Artificial Intelligence) & Web3 Innovation",
    company: "Quincy Labs · Chicago, IL",
    companyUrl: "https://www.quincylabs.org/",
    date: "May 2018 - Present",
    description:
      "Builds the agent-driven products the lab ships, including a 10-agent outreach system that verifies every send before it goes out and an emergency-care app that gives first responders patient context in under 60 seconds. Bridges research, product framing, and go-to-market (GTM).",
    type: "work",
    industries: ["AI, Data & Automation", "Healthcare", "Web3 / FinTech"],
  },
  {
    title: "Business Development Specialist",
    company: "Firstbase",
    date: "Feb 2026 - May 2026",
    description:
      "Opened conversations with IT (information technology) and operations leaders by reading hiring signals that meant a device-provisioning crunch was coming, and handled single sign-on (SSO) and security objections early, so most pipeline reached a solutions engineer already qualified.",
    type: "work",
    industries: ["Enterprise IT / IAM", "SaaS"],
  },
  {
    title: "AWS AI Practitioner · Artificial Intelligence",
    company: "Udacity",
    date: "Mar 2026",
    description:
      "Hands-on fluency in Amazon Web Services (AWS) artificial intelligence (AI) services and responsible-use guardrails, so cloud machine learning (ML) recommendations come from real understanding, not vendor slides.",
    type: "education",
    industries: ["AI, Data & Automation"],
  },
  {
    title: "Sales Development Fellowship",
    company: "SV Academy · Chicago, IL",
    date: "Dec 2025 - May 2026",
    description:
      "A selective 250+ hour bootcamp covering discovery calls, disciplined prospecting, outbound email, and staying steady under rejection. These are the reps that make technical selling sound human.",
    type: "work",
    industries: ["Sales / GTM"],
  },
  {
    title: "Certificate of Completion · Artificial Intelligence",
    company: "Outskill",
    date: "Nov 2025 - Dec 2025",
    description:
      "A compressed, hands-on artificial intelligence (AI) program covering core concepts and current tooling. It's the foundation under the agent and retrieval work in the Projects section.",
    type: "education",
    industries: ["AI, Data & Automation"],
  },
  {
    title: "Certificate · Mastering web3",
    company: "The University of Nicosia · Digital Currency/Blockchain and Digital Assets MOOC",
    date: "Sep 2022 - Present",
    description:
      "Rigorous grounding in blockchain, digital currency, and digital assets through a massive open online course (MOOC). It's the background used to separate real Web3 utility from hype.",
    type: "education",
    industries: ["Web3 / FinTech"],
  },
  {
    title: "Business Development Representative",
    company: "re:WORK Training · Chicago, IL",
    date: "Jan 2025 - Nov 2025",
    description:
      "Grew qualified discovery calls for a nonprofit tech-sales accelerator from about 10 to 15 a month by prioritizing hiring signals over stated interest. Also moved partner tracking into HubSpot so the pipeline no longer lived in one person's head.",
    type: "work",
    industries: ["Sales / GTM", "Nonprofit"],
  },
  {
    title: "Production Team Member · ADPodcast",
    company: "Accenture · Chicago, IL",
    date: "Dec 2023 - Jan 2025",
    description:
      "Kept a global internal podcast shipping on schedule by owning coordination between hosts, editors, and stakeholders. The result was fewer last-minute scrambles and cleaner episodes.",
    type: "work",
    industries: ["Technology", "Media"],
  },
  {
    title: "Business Analyst",
    company: "Accenture · Chicago, IL",
    date: "Jan 2022 - Jan 2025",
    description:
      "Turned stakeholder needs into future-state designs across retail and e-commerce work, including consolidating 10 regional report formats into one leadership dashboard for Mondelez that saved about 8 hours a week.",
    type: "work",
    industries: ["Technology", "Retail & eCommerce"],
  },
  {
    title: "Commerce Analyst · QA Tester",
    company: "Accenture · Kent (Canada) e-commerce program",
    date: "Aug 2024 - Sep 2024",
    description:
      "Protected a storefront launch by testing search, checkout, and core shopping flows across staging environments, logging defects and confirming fixes with an offshore quality assurance (QA) team.",
    type: "work",
    industries: ["Retail & eCommerce", "Technology"],
  },
  {
    title: "Commerce Strategy Analyst",
    company: "Accenture · Macy’s transformation",
    date: "Jul 2024 - Sep 2024",
    description:
      "Cleaned up Macy's product taxonomy ahead of a major go-live by reconciling attributes and correcting AI-generated (artificial intelligence) tags, so shoppers could find products through search and filters.",
    type: "work",
    industries: ["Retail & eCommerce"],
  },
  {
    title: "NLP (Natural Language Processing) Training Contributor",
    company: "Amazon · Project Neo · via Accenture · Chicago, IL",
    date: "Mar 2023 - Jul 2024",
    description:
      "Authored 1,100+ prompt and response pairs for an enterprise large language model (LLM) and helped standardize the quality rubric, so reviews from different annotators could be compared.",
    type: "work",
    industries: ["AI, Data & Automation", "Technology"],
  },
  {
    title: "Accessibility Analyst",
    company: "Accenture · Chicago, IL",
    date: "Jul 2023 - Sep 2023",
    description:
      "Ran Web Content Accessibility Guidelines (WCAG) scans across client brand sites and turned the results into prioritized fix lists, pointing teams at the pages where gaps affected the most users.",
    type: "work",
    industries: ["Technology"],
  },
  {
    title: "Sales Support Practitioner",
    company: "Accenture · Chicago, IL",
    date: "Feb 2023 - Mar 2023",
    description:
      "Gave account teams a cleaner starting point by verifying existing client relationships and whether each client's systems were still on-premises or already in the cloud.",
    type: "work",
    industries: ["Technology", "Sales / GTM"],
  },
  {
    title: "Customer Preference Management (CPM)",
    company: "Walgreens Boots Alliance · via Accenture · Chicago, IL",
    date: "Sep 2022 - Jan 2023",
    description:
      "Protected customer consent data at a regulated pharmacy retailer by checking vendor onboarding against communication preferences and reconciling records where systems disagreed. Mistakes here mean regulatory exposure, not typos.",
    type: "work",
    industries: ["Healthcare", "Retail & eCommerce"],
  },
  {
    title: "Phonon Developer",
    company: "GridPlus · United States",
    date: "Aug 2022 - Nov 2022",
    description:
      "Contributed to Phonon, a hardware-secured way to move digital assets peer to peer without on-chain fees, focused on practical, privacy-aware transfer flows.",
    type: "work",
    industries: ["Web3 / FinTech"],
  },
  {
    title: "CRM (Customer Relationship Management) Analyst",
    company: "Maserati · via Accenture · Chicago, IL",
    date: "Jan 2022 - Aug 2022",
    description:
      "Refocused Maserati's customer follow-up on buyers nearing lease end, after segmentation showed lease timing predicted response better than demographics, and aligned teams on one shared reporting view.",
    type: "work",
    industries: ["Technology", "Automotive & Luxury CRM"],
  },
  {
    title: "DeFi MOOC · Computer Science",
    company: "University of California, Berkeley",
    date: "Sep 2021 - Dec 2021",
    description:
      "A massive open online course (MOOC) on how decentralized finance (DeFi) works under the hood: liquidity, lending protocols, and where it diverges from traditional settlement.",
    type: "education",
    industries: ["Web3 / FinTech"],
  },
  {
    title: "Billing Agent",
    company: "Luna Medical · Chicago, IL",
    date: "Sep 2019 - Mar 2020",
    description:
      "Kept cash moving on medical product orders by owning billing accuracy end to end and clearing order or payer issues before they stalled payment.",
    type: "work",
    industries: ["Healthcare"],
  },
  {
    title: "Operations Lead",
    company: "Saks OFF 5TH · Chicago, IL",
    date: "Mar 2016 - Jan 2019",
    description:
      "Led rotating departments through freight, replenishment, and online-order fulfillment, helping lift the store's local ranking and online sales against a sister store.",
    type: "work",
    industries: ["Retail & eCommerce"],
  },
  {
    title: "Operations Specialist",
    company: "Nordstrom Trunk Club · Chicago, IL",
    date: "Feb 2015 - Mar 2016",
    description:
      "Put new fulfillment metrics to work in a digital-first operation, tracking key performance indicators (KPIs) on the floor to sharpen repeat-sales strategy.",
    type: "work",
    industries: ["Retail & eCommerce"],
  },
  {
    title: "Advanced Certificate · Dental Assisting / Assistant",
    company: "City Colleges of Chicago · Wilbur Wright College",
    date: "2013 - 2015",
    description:
      "Clinical training in precision, sterilization, and patient care. It was early proof of doing well where details carry real consequences.",
    type: "education",
    industries: ["Healthcare"],
  },
];

export type ProjectRole = "creator" | "collaborator";

export type ProjectData = {
  /** Stable key when titles might repeat later */
  id?: string;
  title: string;
  description: string;
  tags: readonly string[];
  imageUrl: StaticImageData;
  /** Primary outbound link (GitHub repo or external URL); omit for linkless cards */
  link?: string;
  /** Optional live site / demo / secondary link */
  liveLink?: string;
  /** Optional grid span for featured bento tiles (e.g. `sm:col-span-2 lg:col-span-8`) */
  spanClass?: string;
  /**
   * Optional Tailwind `object-position` utility for the tile background image
   * (e.g. `object-top` for tall doc-cover style images, `object-center` for
   * landscape screenshots). Defaults to `object-[center_40%]`.
   */
  imagePosition?: string;
  /** Creator of the work vs collaborator / co-founder contribution */
  role: ProjectRole;
  /** Industry tags for orientation */
  industries: readonly string[];
};

export const projectsData: readonly ProjectData[] = [
  {
    id: "codename-astra",
    title: "Codename Astra",
    description:
      "Astrology that remembers you: a chat-first AI (artificial intelligence) companion with live sky context, a journal, and social loops. Co-founder role focused on Web3 innovation, community, and go-to-market framing.",
    tags: ["AI", "Consumer", "Web3"],
    imageUrl: codenameAstraImg,
    liveLink: "https://project-astra-web.vercel.app/",
    role: "collaborator",
    industries: ["AI, Data & Automation", "Web3 / FinTech", "Consumer"],
    spanClass: "sm:col-span-2 lg:col-span-8",
    imagePosition: "object-right",
  },
  {
    id: "cosmic-week-tracker",
    title: "Cosmic Week Tracker and Mood Guide",
    description:
      "PartyRock app that blends astronomy, numerology, and mood with moon phase data, Personal Day numbers, and transit-style insights.",
    tags: ["PartyRock", "Python", "Numerology", "Astronomy"],
    imageUrl: cosmicWeekTrackerImg,
    link: "https://partyrock.aws/u/diaraylouden/d7rzs7WNA/Cosmic-Week-Tracker-and-Mood-Guide",
    spanClass: "sm:col-span-1 lg:col-span-4",
    imagePosition: "object-[center_30%]",
    role: "creator",
    industries: ["AI, Data & Automation", "Consumer"],
  },
  {
    id: "pathfinder",
    title: "Pathfinder",
    description:
      "Conversational intake that learns what someone wants before anyone pitches. Handles hesitation with the P.U.S.H. framework, and every recommendation traces back to something the person said. No build step, no dependencies.",
    tags: ["JavaScript", "Conversational UX", "Sales Enablement"],
    imageUrl: pathfinderImg,
    imagePosition: "object-left-top",
    role: "creator",
    industries: ["AI, Data & Automation", "Sales / GTM"],
    spanClass: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: "prism-echo",
    title: "Prism Echo",
    description:
      "Browser-local portrait studio that grows color-separated after-images from one photo. Uploads stay on-device: no remote processing, no analytics.",
    tags: ["JavaScript", "Canvas", "Creative"],
    imageUrl: prismEchoImg,
    liveLink: "https://rayadamas.github.io/prism-echo/",
    imagePosition: "object-top",
    role: "creator",
    industries: ["Creative / Music", "Consumer"],
    spanClass: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: "drl-bio",
    title: "drl.bio",
    description:
      "Personal portfolio in React, Next.js, and TypeScript: applied AI (artificial intelligence) work, experience, and how I engage.",
    tags: ["React", "Next.js", "TypeScript"],
    imageUrl: drlBioImg,
    link: "https://github.com/rayadamas/DRL",
    imagePosition: "object-top",
    role: "creator",
    industries: ["Technology"],
    spanClass: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: "fancy-proj",
    title: "fancy_proj",
    description:
      "Self-rescheduling commit bot. Increments a counter, commits, pushes, then picks a random time to run itself again tomorrow. Running since 2025-01-17.",
    tags: ["Python", "Automation", "Git"],
    imageUrl: fancyProjImg,
    imagePosition: "object-left-top",
    role: "creator",
    industries: ["AI, Data & Automation"],
    spanClass: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: "louden-desk",
    title: "Louden Desk",
    description:
      "Mission-control dashboard built from an Obsidian vault. Frozen snapshot, no backend: meetings, notes, and outreach as one glance plus deeper panels.",
    tags: ["JavaScript", "Obsidian", "Visualization"],
    imageUrl: loudenDeskImg,
    liveLink: "https://rayadamas.github.io/louden-desk",
    imagePosition: "object-left-top",
    role: "creator",
    industries: ["AI, Data & Automation"],
    spanClass: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: "granola-obs",
    title: "GranolaOBS",
    description:
      "Syncs Granola meeting notes into Obsidian: official API (application programming interface) plus a local sync script, so transcripts land in the vault without a dashboard.",
    tags: ["Python", "Obsidian", "Automation"],
    imageUrl: granolaObsImg,
    link: "https://github.com/rayadamas/GranolaOBS",
    imagePosition: "object-top",
    role: "creator",
    industries: ["AI, Data & Automation"],
    spanClass: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: "ai-security-scanner-python",
    title: "AI Security Scanner for Python",
    description:
      "NextWork portfolio walkthrough documenting an AI-assisted (artificial intelligence) security audit flow for Python codebases.",
    tags: ["Python", "Security", "AI"],
    imageUrl: aiSecurityScannerImg,
    link: "https://learn.nextwork.org/loving_cyan_zealous_bacuri/docs/ai-security-audit",
    imagePosition: "object-center",
    role: "creator",
    industries: ["Enterprise IT / IAM", "AI, Data & Automation"],
  },
  {
    id: "ai-workflow-n8n",
    title: "Building an AI Workflow",
    description:
      "Automations that connect conversational triggers, an AI (artificial intelligence) agent with tools, GPT-4o, and Google Calendar event creation.",
    tags: ["n8n", "Automation", "ChatGPT", "Google Calendar"],
    imageUrl: aiWorkflowN8nImg,
    link: "https://www.linkedin.com/in/diamond-ray/overlay/Project/1598639861/treasury/?profileId=ACoAACisl5MBN-KAGXvghmVe7bc9SFbeu8a7d8c&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_projects_details%3BqKzRXSnJRyu%2FPUM2wv4Z9Q%3D%3D",
    imagePosition: "object-top",
    role: "creator",
    industries: ["AI, Data & Automation"],
  },
  {
    id: "rag-chatbot-bedrock",
    title: "Set Up a RAG Chatbot in Bedrock",
    description:
      "Serverless retrieval-augmented generation (RAG) chat on Amazon Web Services (AWS) Bedrock with cited answers, backed by document storage on Amazon S3 (Simple Storage Service) and Lambda.",
    tags: ["AWS", "Bedrock", "RAG", "Lambda", "S3"],
    imageUrl: ragChatbotBedrockImg,
    link: "https://www.linkedin.com/in/diamond-ray/overlay/Project/1598919489/treasury/?profileId=ACoAACisl5MBN-KAGXvghmVe7bc9SFbeu8a7d8c&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_projects_details%3B21Bun5bCSYWT9QBkcutcJA%3D%3D",
    imagePosition: "object-top",
    role: "creator",
    industries: ["AI, Data & Automation"],
  },
  {
    title: "Hyperlyz Demo",
    description:
      "A demo showcasing music NFTs (non-fungible tokens) via the ZORA API (application programming interface), allowing users to mint their own audio files.",
    tags: ["JavaScript", "HTML", "CSS", "web3"],
    imageUrl: hyperlyzDemoImg,
    link: "https://github.com/rayadamas/hyperlyz_demo",
    liveLink: "https://hyperlyz.vercel.app",
    role: "creator",
    industries: ["Web3 / FinTech", "Creative / Music"],
  },
  {
    title: "Clausura",
    description:
      "A modular, open-source music platform designed to help creators share, publish, and remix content.",
    tags: ["web3", "TypeScript", "JavaScript", "Shell", "CSS"],
    imageUrl: clausuraImg,
    link: "https://github.com/rayadamas/Clausura",
    liveLink: "https://clausura.vercel.app/about",
    role: "creator",
    industries: ["Web3 / FinTech", "Creative / Music"],
  },
  {
    title: "Solana Flutter DeFi SDK",
    description:
      "Wormhole bridge integrated into an NFT (non-fungible token) dating mobile app, powered by the open-source Canoe-Flutter decentralized finance (DeFi) software development kit (SDK).",
    tags: ["Dart", "Kotlin", "Java", "Python", "CSS"],
    imageUrl: solanaGameImg,
    link: "https://github.com/rayadamas/Solana-Flutter-DeFi-SDK",
    role: "collaborator",
    industries: ["Web3 / FinTech"],
  },
  {
    title: "Zorbz Data Visualizer",
    description:
      "A minimum viable product (MVP) data visualization tool using ZORB metadata and Zora's API (application programming interface) to abstract blockchain data into visuals.",
    tags: ["p5.js", "JavaScript", "TypeScript", "web3"],
    imageUrl: zorbImg,
    link: "https://github.com/rayadamas/zorb-visualizer",
    role: "creator",
    industries: ["Web3 / FinTech"],
  },
];
