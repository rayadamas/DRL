/** Logo assets for experience / education cards (resume-style marks). */
export const EXPERIENCE_LOGOS = {
  accenture: "/logos/accenture.png",
  aws: "/logos/aws.png",
  udacity: "/logos/udacity.png",
  walgreens: "/logos/walgreens.png",
  ethglobal: "/logos/ethglobal.png",
  zora: "/logos/zora.png",
  "city-colleges": "/logos/city-colleges.png",
  /** Drop PNGs into public/logos/ to activate these matches */
  maserati: "/logos/maserati.png",
  mondelez: "/logos/mondelez.png",
  firstbase: "/logos/firstbase.png",
  diverse: "/logos/diverse.png",
} as const;

export type ExperienceLogoKey = keyof typeof EXPERIENCE_LOGOS;

/** Logos that currently exist under public/logos/ (missing files fall back to icon). */
const AVAILABLE_LOGOS = new Set<ExperienceLogoKey>([
  "accenture",
  "aws",
  "udacity",
  "walgreens",
  "ethglobal",
  "zora",
  "city-colleges",
]);

/** Match company/title text to a logo key (first win). */
export function resolveExperienceLogo(company: string): ExperienceLogoKey | null {
  const c = company.toLowerCase();

  let key: ExperienceLogoKey | null = null;
  if (c.includes("accenture")) key = "accenture";
  else if (c.includes("amazon")) key = "aws";
  else if (c.includes("udacity")) key = "udacity";
  else if (c.includes("walgreens")) key = "walgreens";
  else if (c.includes("maserati")) key = "maserati";
  else if (c.includes("mondelez")) key = "mondelez";
  else if (c.includes("firstbase") || c.includes("appdirect")) key = "firstbase";
  else if (c.includes("diverse")) key = "diverse";
  else if (c.includes("city colleges")) key = "city-colleges";
  else if (c.includes("nicosia") || c.includes("berkeley")) key = "ethglobal";

  if (!key || !AVAILABLE_LOGOS.has(key)) return null;
  return key;
}

export function experienceLogoSrc(key: ExperienceLogoKey): string {
  return EXPERIENCE_LOGOS[key];
}
