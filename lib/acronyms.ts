/** Expansions for acronyms that appear in short tag chips. */
export const ACRONYMS: Record<string, string> = {
  AI: "Artificial Intelligence",
  AWS: "Amazon Web Services",
  CRM: "Customer Relationship Management",
  CSS: "Cascading Style Sheets",
  GTM: "Go-To-Market",
  HTML: "HyperText Markup Language",
  IAM: "Identity and Access Management",
  IT: "Information Technology",
  RAG: "Retrieval-Augmented Generation",
  S3: "Simple Storage Service",
  SaaS: "Software as a Service",
};

/** Tooltip text listing expansions for any known acronyms in a tag, or undefined. */
export function acronymTooltip(tag: string): string | undefined {
  const found = Array.from(
    new Set(tag.split(/[^A-Za-z0-9]+/).filter((word) => word in ACRONYMS)),
  );
  if (found.length === 0) return undefined;
  return found.map((word) => `${word}: ${ACRONYMS[word]}`).join(" · ");
}
