/** Portfolio-influenced industry value (CV: modeled lifetime value). */
export const industryValueData = [
  { industry: "AI (Artificial Intelligence), Data & Automation", years: "8 yrs", value: "$2.9M" },
  { industry: "Web3 / FinTech", years: "11 yrs", value: "$2.2M" },
  { industry: "Retail & eCommerce", years: "5 yrs", value: "$1.9M" },
  {
    industry: "Enterprise IT (Information Technology) / IAM (Identity and Access Management)",
    years: "1.3 yrs",
    value: "$1.4M",
  },
  { industry: "Healthcare", years: "5 yrs", value: "$1.1M" },
  {
    industry: "Automotive & Luxury CRM (Customer Relationship Management)",
    years: "0.7 yr",
    value: "$500K",
  },
] as const;

export const industryValueTotal = "$10M";

export type Skill = {
  label: string;
  /** Spelled-out acronym, rendered after the label. */
  expansion?: string;
};

export type SkillGroup = {
  category: string;
  skills: readonly Skill[];
};

/** Skills grouped by CV-aligned competency (not a flat chip cloud). */
export const skillsByCompetency: readonly SkillGroup[] = [
  {
    category: "LLM (Large Language Model) & Agent Systems",
    skills: [
      { label: "AI Agents", expansion: "Artificial Intelligence" },
      { label: "MCPs", expansion: "Model Context Protocol servers" },
      { label: "RAG", expansion: "Retrieval-Augmented Generation" },
      { label: "Prompt Engineering" },
      { label: "Automation Workflows" },
      { label: "n8n" },
      { label: "Multi-agent orchestration" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { label: "Python" },
      { label: "TypeScript" },
      { label: "JavaScript" },
      { label: "SQL", expansion: "Structured Query Language" },
      { label: "Swift" },
      { label: "Solidity" },
    ],
  },
  {
    category: "Identity & Access",
    skills: [
      { label: "Entra ID" },
      { label: "Conditional Access" },
      { label: "Intune" },
      { label: "SSO", expansion: "Single Sign-On" },
      { label: "SAML", expansion: "Security Assertion Markup Language" },
      { label: "OAuth", expansion: "Open Authorization" },
      { label: "IAM", expansion: "Identity and Access Management" },
      { label: "PAM", expansion: "Privileged Access Management" },
      { label: "Okta" },
      { label: "Entitlement review" },
    ],
  },
  {
    category: "Governance & Risk",
    skills: [
      {
        label: "NIST CSF",
        expansion: "National Institute of Standards and Technology Cybersecurity Framework",
      },
      { label: "ISO 27001", expansion: "International Organization for Standardization" },
      { label: "SOC 2", expansion: "System and Organization Controls" },
      { label: "Zero Trust" },
      { label: "Responsible AI", expansion: "Artificial Intelligence" },
      {
        label: "HIPAA-aware architecture",
        expansion: "Health Insurance Portability and Accountability Act",
      },
      { label: "WCAG", expansion: "Web Content Accessibility Guidelines" },
    ],
  },
  {
    category: "Networking & Infrastructure",
    skills: [
      { label: "TCP/IP", expansion: "Transmission Control Protocol / Internet Protocol" },
      { label: "DNS", expansion: "Domain Name System" },
      { label: "DHCP", expansion: "Dynamic Host Configuration Protocol" },
      { label: "VLANs", expansion: "Virtual Local Area Networks" },
      { label: "Firewalls" },
      { label: "Docker" },
      { label: "Git" },
    ],
  },
  {
    category: "APIs (Application Programming Interfaces) & Integration",
    skills: [
      { label: "REST APIs", expansion: "Representational State Transfer" },
      { label: "Webhooks" },
      { label: "GraphQL" },
      { label: "Node.js" },
      { label: "Express" },
      { label: "Gmail API" },
    ],
  },
  {
    category: "Data & Evaluation",
    skills: [
      { label: "PostgreSQL" },
      { label: "DynamoDB" },
      { label: "Tableau" },
      { label: "Power BI", expansion: "Business Intelligence" },
      { label: "Model evaluation" },
      { label: "Technical Writing" },
    ],
  },
  {
    category: "Platforms",
    skills: [
      { label: "AWS", expansion: "Amazon Web Services" },
      { label: "AWS Bedrock" },
      { label: "AWS Lambda" },
      { label: "Amazon S3", expansion: "Simple Storage Service" },
      { label: "API Gateway" },
      { label: "ServiceNow" },
      { label: "Salesforce" },
      { label: "HubSpot" },
    ],
  },
  {
    category: "Development Environment",
    skills: [
      { label: "React" },
      { label: "Next.js" },
      { label: "Tailwind" },
      { label: "Claude Code" },
      { label: "Cursor" },
      { label: "HTML", expansion: "HyperText Markup Language" },
      { label: "CSS", expansion: "Cascading Style Sheets" },
    ],
  },
  {
    category: "Business & GTM (Go-To-Market)",
    skills: [
      { label: "LinkedIn Sales Navigator" },
      { label: "Apollo" },
      { label: "Salesloft" },
      { label: "Hubspot" },
      { label: "Jira" },
      { label: "Workfront" },
    ],
  },
  {
    category: "Delivery craft & Music",
    skills: [
      { label: "Obsidian PKM", expansion: "Personal Knowledge Management" },
      { label: "Notion" },
      { label: "Figma" },
      { label: "Audio Engineering" },
      { label: "Serato DJ Pro" },
      { label: "Adobe Audition" },
      { label: "rekordbox" },
      { label: "FL Studio" },
      { label: "Pro Tools" },
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

/** How Diamond engages - practice domains × RACI. */
export const raciData: readonly RaciRow[] = [
  {
    domain: "Pre-sales / Sales engineering",
    r: "Owns discovery & scoped requirements",
    a: "Owns technical recommendation quality",
    c: "SE (sales engineering) / client IT (information technology) stakeholders",
    i: "Account leadership",
  },
  {
    domain: "Identity & Access governance",
    r: "Surfaces access sprawl, SoD (separation of duties) conflicts, and CA (Conditional Access) policy drift",
    a: "Owns findings to remediation framing",
    c: "Client IAM (identity and access management) / security",
    i: "Audit / compliance owners",
  },
  {
    domain: "Applied AI (Artificial Intelligence) / Agents",
    r: "Builds agent / RAG (retrieval-augmented generation) / evaluation systems",
    a: "Owns production reliability bar",
    c: "Co-founders / build partners",
    i: "Investors / leadership",
  },
  {
    domain: "GTM (Go-To-Market) Automation",
    r: "Owns outreach orchestrator & routing",
    a: "Owns send integrity / logging",
    c: "Marketing / ops partners",
    i: "Pipeline stakeholders",
  },
] as const;

export const contactTopics = [
  "Pre-sales / sales engineering conversation",
  "Identity & access / security discovery",
  "Applied AI (artificial intelligence) / agents / RAG (retrieval-augmented generation)",
  "Partnership or collaboration",
  "Something else",
] as const;

export const CALENDLY_URL = "https://calendly.com/diamondray/30min";
