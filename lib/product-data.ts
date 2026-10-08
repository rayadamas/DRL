/** Portfolio-influenced industry value (CV: modeled lifetime value). */
export const industryValueData = [
  { industry: "AI, Data & Automation", years: "8 yrs", value: "$2.9M" },
  { industry: "Web3 / FinTech", years: "11 yrs", value: "$2.2M" },
  { industry: "Retail & eCommerce", years: "5 yrs", value: "$1.9M" },
  { industry: "Enterprise IT / IAM", years: "1.3 yrs", value: "$1.4M" },
  { industry: "Healthcare", years: "5 yrs", value: "$1.1M" },
  { industry: "Automotive & Luxury CRM", years: "0.7 yr", value: "$500K" },
] as const;

export const industryValueTotal = "$10M";

export type SkillGroup = {
  category: string;
  skills: readonly string[];
};

/** Skills grouped by CV-aligned competency (not a flat chip cloud). */
export const skillsByCompetency: readonly SkillGroup[] = [
  {
    category: "LLM & Agent Systems",
    skills: [
      "AI Agents",
      "MCPs",
      "RAG",
      "Prompt Engineering",
      "Automation Workflows",
      "n8n",
      "Multi-agent orchestration",
    ],
  },
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Swift", "Solidity"],
  },
  {
    category: "Identity & Access",
    skills: [
      "Entra ID",
      "Conditional Access",
      "Intune",
      "SSO / SAML / OAuth",
      "IAM / PAM",
      "Okta",
      "Entitlement review",
    ],
  },
  {
    category: "Governance & Risk",
    skills: [
      "NIST CSF",
      "ISO 27001",
      "SOC 2",
      "Zero Trust",
      "Responsible AI",
      "HIPAA-aware architecture",
      "Web Accessibility (WCAG)",
    ],
  },
  {
    category: "Networking & Infrastructure",
    skills: [
      "TCP/IP",
      "DNS / DHCP",
      "VLANs",
      "Firewalls",
      "Docker",
      "Git",
    ],
  },
  {
    category: "APIs & Integration",
    skills: [
      "REST APIs",
      "Webhooks",
      "GraphQL",
      "Node.js",
      "Express",
      "Gmail API",
    ],
  },
  {
    category: "Data & Evaluation",
    skills: [
      "PostgreSQL",
      "DynamoDB",
      "Tableau",
      "Power BI",
      "Model evaluation",
      "Technical Writing",
    ],
  },
  {
    category: "Platforms",
    skills: [
      "AWS",
      "AWS Bedrock",
      "AWS Lambda",
      "Amazon S3",
      "API Gateway",
      "ServiceNow",
      "Salesforce",
      "HubSpot",
    ],
  },
  {
    category: "Development Environment",
    skills: [
      "React",
      "Next.js",
      "Tailwind",
      "Claude Code",
      "Cursor",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Business & GTM",
    skills: [
      "LinkedIn Sales Navigator",
      "Apollo",
      "Salesloft",
      "Hubspot",
      "Jira",
      "Workfront",
    ],
  },
  {
    category: "Delivery craft & Music",
    skills: [
      "Obsidian (PKM)",
      "Notion",
      "Figma",
      "Audio Engineering",
      "Serato DJ Pro",
      "FL Studio",
    ],
  },
] as const;

export type RaciRow = {
  domain: string;
  r: string;
  a: string;
  c: string;
  i: string;
};

/** How Diamond engages — practice domains × RACI. */
export const raciData: readonly RaciRow[] = [
  {
    domain: "Pre-sales / Sales engineering",
    r: "Owns discovery & scoped requirements",
    a: "Owns technical recommendation quality",
    c: "SE / client IT stakeholders",
    i: "Account leadership",
  },
  {
    domain: "Identity & access governance",
    r: "Surfaces sprawl, SoD, CA drift",
    a: "Owns findings → remediation framing",
    c: "Client IAM / security",
    i: "Audit / compliance owners",
  },
  {
    domain: "Applied AI / agents",
    r: "Builds agent / RAG / eval systems",
    a: "Owns production reliability bar",
    c: "Co-founders / build partners",
    i: "Investors / leadership",
  },
  {
    domain: "GTM automation",
    r: "Owns outreach orchestrator & routing",
    a: "Owns send integrity / logging",
    c: "Marketing / ops partners",
    i: "Pipeline stakeholders",
  },
] as const;

export const contactTopics = [
  "Pre-sales / sales engineering conversation",
  "Identity & access / security discovery",
  "Applied AI / agents / RAG",
  "Partnership or collaboration",
  "Something else",
] as const;

export const CALENDLY_URL = "https://calendly.com/diamondray/30min";
