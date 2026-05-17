/** Logo assets for experience / education cards (resume-style marks). */
export const EXPERIENCE_LOGOS = {
  accenture: "/logos/accenture.png",
  aws: "/logos/aws.png",
  udacity: "/logos/udacity.png",
  walgreens: "/logos/walgreens.png",
  ethglobal: "/logos/ethglobal.png",
  zora: "/logos/zora.png",
  "city-colleges": "/logos/city-colleges.png",
} as const;

export type ExperienceLogoKey = keyof typeof EXPERIENCE_LOGOS;

/** Match company/title text to a logo key (first win). */
export function resolveExperienceLogo(
  company: string,
  title?: string
): ExperienceLogoKey | null {
  const c = company.toLowerCase();
  const t = (title ?? "").toLowerCase();

  if (c.includes("accenture")) return "accenture";
  if (c.includes("amazon")) return "aws";
  if (c.includes("udacity")) return "udacity";
  if (c.includes("walgreens")) return "walgreens";
  if (c.includes("city colleges")) return "city-colleges";
  if (c.includes("quincy")) return "zora";
  if (c.includes("nicosia") || t.includes("web3") || t.includes("defi")) {
    return "ethglobal";
  }

  return null;
}

export function experienceLogoSrc(key: ExperienceLogoKey): string {
  return EXPERIENCE_LOGOS[key];
}
