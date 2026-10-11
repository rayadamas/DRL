/** Logo assets for experience / education cards (resume-style marks). */
export const EXPERIENCE_LOGOS = {
  accenture: "/logos/accenture.png",
  aws: "/logos/aws.png",
  udacity: "/logos/udacity.png",
  walgreens: "/logos/walgreens.png",
  diverse: "/logos/diverse.jpg",
  vino: "/logos/vino-louden.jpeg",
  quincy: "/logos/quincy-labs.jpeg",
  firstbase: "/logos/firstbase.jpg",
  "sv-academy": "/logos/sv-academy.jpg",
  rework: "/logos/rework.png",
  gridplus: "/logos/gridplus.jpg",
  luna: "/logos/luna-medical.jpg",
  saks: "/logos/saks.jpg",
  "trunk-club": "/logos/trunk-club.jpg",
} as const;

export type ExperienceLogoKey = keyof typeof EXPERIENCE_LOGOS;

/** Client brands are checked before Accenture so "via Accenture" roles show the client mark. */
const LOGO_MATCHES: readonly [string, ExperienceLogoKey][] = [
  ["amazon", "aws"],
  ["walgreens", "walgreens"],
  ["accenture", "accenture"],
  ["udacity", "udacity"],
  ["diverse", "diverse"],
  ["vino louden", "vino"],
  ["quincy", "quincy"],
  ["firstbase", "firstbase"],
  ["sv academy", "sv-academy"],
  ["re:work", "rework"],
  ["gridplus", "gridplus"],
  ["luna medical", "luna"],
  ["saks", "saks"],
  ["trunk club", "trunk-club"],
];

/** Match company text to a logo key (first win). */
export function resolveExperienceLogo(company: string): ExperienceLogoKey | null {
  const c = company.toLowerCase();
  return LOGO_MATCHES.find(([needle]) => c.includes(needle))?.[1] ?? null;
}

export function experienceLogoSrc(key: ExperienceLogoKey): string {
  return EXPERIENCE_LOGOS[key];
}
