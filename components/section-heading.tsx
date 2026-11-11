import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
  /** Chapter number shown as a small eyebrow, e.g. 2 renders "02 / About". */
  index?: number;
};

export default function SectionHeading({ children, index }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      {index !== undefined ? (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-swiss-text-secondary">
          <span className="text-swiss-accent">{String(index).padStart(2, "0")}</span>
          <span className="mx-2 opacity-50">/</span>
          {children}
        </p>
      ) : null}
      <h2 className="swiss-heading text-3xl sm:text-4xl text-center mb-3">
        {children}
      </h2>
      <div className="h-[2px] w-12 bg-swiss-accent" />
    </div>
  );
}
