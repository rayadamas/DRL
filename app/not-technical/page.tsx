import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/section-heading";
import { CalendlyAssets, CalendlyButton } from "@/components/calendly";

export const metadata: Metadata = {
  title: "Not A Technical Problem",
  description:
    "Most stalled AI initiatives are not technical failures. They are business decisions nobody was assigned to make. Thirty minutes to find out which one yours is.",
  alternates: { canonical: "/not-technical" },
  openGraph: {
    type: "website",
    url: "https://drl.bio/not-technical",
    title: "Not A Technical Problem | Diamond Ray Louden",
    description:
      "Most stalled AI initiatives are not technical failures. They are business decisions nobody was assigned to make.",
    siteName: "drl.bio",
  },
  twitter: {
    card: "summary",
    title: "Not A Technical Problem | Diamond Ray Louden",
    description:
      "Most stalled AI initiatives are not technical failures. They are business decisions nobody was assigned to make.",
  },
};

const STALL = [
  "Budget approved",
  "Pilot demos well",
  "Nobody owns the output",
  "Policy written after the fact",
  "Usage quietly stops",
  "“Next year”",
];

const WHO = [
  "You have approved budget for AI tools, vendors, or consultants, and the return is still not on the page.",
  "A pilot demonstrated well and never shipped, and the reason has never been written down.",
  "You own operations or revenue at a company too big for spreadsheets and too small for an internal AI team.",
  "You run an MSP, and you are answering for a client stack you do not own.",
  "You have to approve what an agent is allowed to reach, and nobody has told you what it will actually touch.",
  "Two people doing the same job produce different quality, and your process cannot tell you why.",
  "You are the one who defends the decision in the room, with your name on it.",
];

const SURFACES = [
  {
    label: "Technical Discovery",
    body: "The stated problem and the real problem are rarely the same. A ticket-volume problem is usually an access-model problem, because the tickets are the only place the failure is visible. I find out which layer is broken before anyone commits to fixing the wrong one.",
  },
  {
    label: "AI and Workflow Design",
    body: "Anything running unattended has to handle its own failure, because silent failure is the expensive kind. You find out weeks later, when a reply never arrived. The specification and the failure path get designed first, then the automation.",
  },
  {
    label: "Sales Discovery and Pipeline",
    body: "A qualification bar that lives in one person's judgment does not survive that person leaving, and it cannot be audited or improved because nobody else can see it. I move it out of the judgment and into the system.",
  },
  {
    label: "CRM, Reporting and Process",
    body: "The dashboard is almost never the bottleneck. The consolidation feeding it is. Better reporting on an unsettled definition does not produce a better answer, it produces a confident wrong one faster, with a chart attached.",
  },
];

const NUMBERS = [
  { n: "10", label: "agents in production behind one orchestrator" },
  { n: "1,000+", label: "prompt and completion pairs authored into a 500K-prompt evaluation corpus" },
  { n: "4", label: "consulting engagements across four industries" },
  { n: "2018", label: "building at Quincy Labs since" },
];

const SEATS = [
  ["Ovation Point", "identity and access analysis"],
  ["The Defensible", "IAM assessments"],
  ["King & Company Capital", "presales engineering"],
  ["Diverse ICT", "sales engineering"],
  ["Quincy Labs", "co-founder, applied AI"],
];

const STACK = [
  "Python",
  "TypeScript",
  "AWS Bedrock",
  "n8n",
  "Entra ID and Conditional Access",
  "Intune",
  "ServiceNow",
  "HubSpot",
  "Microsoft Defender",
  "Microsoft Purview",
  "Salesforce (functional)",
  "Solidity",
];

const FAQ = [
  {
    q: "Is the call really free?",
    a: "Yes. Thirty minutes, no deck, and no pricing conversation unless you ask for one.",
  },
  {
    q: "What do I need to bring?",
    a: "What was bought or proposed, and who has to defend the result. That is enough to start.",
  },
  {
    q: "Do I need an AI project?",
    a: "No. Most of what I am describing predates AI. AI only made the cost of an unsettled definition arrive faster.",
  },
  {
    q: "Is this for my industry?",
    a: "The pattern holds across them. A retail pharmacy consent problem and a machine-learning annotation problem turned out to be the same problem wearing different clothes: nobody had agreed what a clean record looks like.",
  },
  {
    q: "What happens after?",
    a: "You leave with the decision written down and whose it is. If the next step is work I can do, I will say so. If it is not, I will tell you that too.",
  },
];

export default function NotTechnical() {
  return (
    <main className="flex w-full flex-col items-center px-4 pb-24 pt-4 sm:pt-6">
      <CalendlyAssets />
      {/* 01 MEET DIAMOND */}
      <section className="mb-24 w-full max-w-3xl sm:mb-32">
        <div className="mb-10 flex justify-center">
          <Image
            src="/Corporate headshot with cinematic amber gradient.png"
            alt="Diamond Ray Louden"
            width={1254}
            height={1254}
            sizes="(min-width: 640px) 384px, 288px"
            quality={90}
            priority
            className="aspect-square w-full max-w-[18rem] rounded-2xl border border-swiss-border object-cover shadow-lg sm:max-w-sm"
          />
        </div>
        <SectionHeading index={1}>Meet Diamond</SectionHeading>
        <div className="glass-panel swiss-body space-y-6 text-center leading-relaxed text-swiss-text-secondary">
          <p>
            I&rsquo;m Diamond, and I get called in when a technology decision has
            stalled and nobody in the room can say why.
          </p>
          <p>
            The hardest thing I have built was not a model. It was a{" "}
            <span className="font-medium text-swiss-text">
              specification narrow enough that a first responder could verify its
              output in under sixty seconds.
            </span>{" "}
            Model capability was never the constraint. The constraint was deciding
            what a correct answer looked like, in writing, before anyone built
            anything.
          </p>
          <p>
            That is the pattern in nearly every AI decision I am brought into. The
            technology works.{" "}
            <span className="font-medium text-swiss-text">
              The decision underneath it was never made.
            </span>
          </p>
          <p className="swiss-subheading pt-2 text-xl text-swiss-text">
            Let&rsquo;s talk.
          </p>
        </div>
      </section>

      {/* 02 THE STALL */}
      <section className="mb-24 w-full max-w-3xl sm:mb-32">
        <SectionHeading index={2}>The Stall</SectionHeading>
        <p className="swiss-subheading mb-10 text-center text-xl text-swiss-text sm:text-2xl">
          You know what the tool was supposed to do. The decision never got made.
        </p>

        <ol className="mb-10 flex flex-col items-stretch gap-0">
          {STALL.map((step, i) => (
            <li key={step} className="flex flex-col items-center">
              <div className="swiss-card w-full px-5 py-3 text-center">
                <span className="font-mono text-[11px] tracking-[0.2em] text-swiss-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="swiss-body ml-3 text-swiss-text">{step}</span>
              </div>
              {i < STALL.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="my-1 font-mono text-swiss-text-secondary/60"
                >
                  &darr;
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="swiss-body space-y-6 border-l-[3px] border-swiss-accent bg-swiss-card px-6 py-6 text-swiss-text-secondary">
          <p>
            Nothing in that sequence is a technical failure. Every step is a
            business decision that no one was assigned to make.
          </p>
          <p>
            Most teams do not need a better model. They need someone to{" "}
            <span className="font-medium text-swiss-text">
              settle the definition before the process gets built.
            </span>{" "}
            That is the whole job.
          </p>
        </div>
      </section>

      {/* 03 WHO IT'S FOR */}
      <section className="mb-24 w-full max-w-3xl sm:mb-32">
        <SectionHeading index={3}>Who It&rsquo;s For</SectionHeading>
        <p className="swiss-subheading mb-10 text-center text-xl text-swiss-text">
          This is for you if the technology is working and the result still is
          not.
        </p>
        <ul className="flex flex-col gap-3">
          {WHO.map((line) => (
            <li key={line} className="swiss-card flex gap-4 px-5 py-4">
              <span
                aria-hidden="true"
                className="mt-[2px] h-4 w-[3px] shrink-0 bg-swiss-accent"
              />
              <span className="swiss-body text-swiss-text-secondary">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 04 WHERE I WORK */}
      <section className="mb-24 w-full max-w-5xl sm:mb-32">
        <SectionHeading index={4}>Where I Work</SectionHeading>
        <p className="swiss-subheading mb-10 text-center text-xl text-swiss-text">
          Four places the decision usually goes missing.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SURFACES.map((s) => (
            <div key={s.label} className="swiss-card flex flex-col p-6">
              <h3 className="swiss-subheading mb-3 text-lg text-swiss-text">
                {s.label}
              </h3>
              <div className="mb-4 h-[2px] w-10 bg-swiss-accent" />
              <p className="swiss-body text-sm text-swiss-text-secondary">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 THE TEARDOWN */}
      <section className="mb-24 w-full max-w-3xl sm:mb-32">
        <SectionHeading index={5}>The Teardown</SectionHeading>
        <div className="swiss-card border-l-[3px] border-l-swiss-accent p-8">
          <p className="swiss-subheading mb-6 text-xl text-swiss-text">
            Before you hire anyone, including me.
          </p>
          <div className="swiss-body space-y-5 text-swiss-text-secondary">
            <p>
              Send me one initiative that stalled. I will take it apart in
              writing: what was actually being decided, who was never assigned to
              decide it, and which part of it was genuinely technical.
            </p>
            <p>
              Twenty minutes of your time. The writing is mine. You approve it
              before anything is published, with names removed, or it stays
              between us entirely. Your call, made after you have read it.
            </p>
          </div>
          <CalendlyButton
            note="Teardown: one initiative that stalled."
            eventName="not_technical_cta"
            eventProps={{ section: "teardown" }}
            className="mt-7 inline-block font-mono text-[12px] uppercase tracking-[0.2em] text-swiss-accent transition-colors hover:text-swiss-accent-hover"
          >
            Ask for a teardown &rarr;
          </CalendlyButton>
        </div>
      </section>

      {/* 06 THE TRANSLATOR IN THE MIDDLE */}
      <section className="mb-24 w-full max-w-5xl sm:mb-32">
        <SectionHeading index={6}>The Translator In The Middle</SectionHeading>
        <p className="swiss-heading mx-auto mb-10 max-w-2xl text-center text-2xl text-swiss-text sm:text-3xl">
          Between the people who build the systems and the leaders who answer for
          them.
        </p>

        <p className="glass-panel swiss-body mx-auto mb-12 max-w-3xl text-center text-swiss-text-secondary">
          I have sat on both sides of that line. Retail floors, four consulting
          engagements across automotive, retail pharmacy, technology and consumer
          goods, enterprise language-model evaluation, outbound sales, identity
          and access assessments, and my own agent systems running in production.
          The breadth is not padding, it is pattern matching across rooms. It is
          why I can sit with engineers, operators, and a CISO in the same meeting
          and keep one sentence true for all three.
        </p>

        <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {NUMBERS.map((item) => (
            <div key={item.n} className="swiss-card p-6 text-center">
              <div className="swiss-heading mb-2 text-3xl text-swiss-accent sm:text-4xl">
                {item.n}
              </div>
              <div className="swiss-body text-xs text-swiss-text-secondary">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel mb-12 flex flex-col gap-2">
          {SEATS.map(([name, role]) => (
            <div
              key={name}
              className="flex flex-col gap-1 border-b border-swiss-border py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="swiss-subheading text-swiss-text">{name}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-swiss-text-secondary">
                {role}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {STACK.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-swiss-border bg-swiss-card px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-swiss-text-secondary"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* 07 FAQ */}
      <section className="mb-24 w-full max-w-3xl sm:mb-32">
        <SectionHeading index={7}>FAQ</SectionHeading>
        <p className="swiss-subheading mb-10 text-center text-xl text-swiss-text">
          Quick answers before you book.
        </p>
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <details key={item.q} className="swiss-card group px-6 py-4">
              <summary className="swiss-subheading flex cursor-pointer list-none items-center justify-between gap-4 text-swiss-text">
                {item.q}
                <span
                  aria-hidden="true"
                  className="font-mono text-swiss-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="swiss-body mt-4 text-swiss-text-secondary">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 08 YOUR NEXT STEP */}
      <section className="w-full max-w-3xl">
        <SectionHeading index={8}>Your Next Step</SectionHeading>
        <div className="glass-panel swiss-body space-y-6 text-center text-swiss-text-secondary">
          <p>
            You do not need it figured out before the call. If you had it figured
            out, it would not have stalled.
          </p>
          <p className="swiss-heading pt-2 text-2xl text-swiss-text sm:text-3xl">
            Stop re-scoping the tool. Settle the decision.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <CalendlyButton
            note="Not a technical problem: a decision that stalled."
            eventName="not_technical_cta"
            eventProps={{ section: "next_step" }}
            className="rounded-full bg-swiss-accent px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-swiss-bg transition-colors hover:bg-swiss-accent-hover"
          >
            Book the thirty minutes &rarr;
          </CalendlyButton>
          <a
            href="mailto:diamond@drl.bio"
            className="glass-panel glass-panel--tight font-mono text-[11px] uppercase tracking-[0.18em] text-swiss-text-secondary transition-colors hover:text-swiss-text"
          >
            Or write to diamond@drl.bio
          </a>
        </div>
      </section>
    </main>
  );
}
