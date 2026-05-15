import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      <h2 className="swiss-heading text-3xl sm:text-4xl text-center mb-3">
        {children}
      </h2>
      <div className="h-[2px] w-12 bg-swiss-accent" />
    </div>
  );
}
