"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { skillsByCompetency, type Skill } from "@/lib/product-data";
import { useSectionInView } from "@/lib/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const [selected, setSelected] = useState(0);
  const [openGroups, setOpenGroups] = useState<ReadonlySet<number>>(
    () => new Set([0]),
  );

  const toggleGroup = (index: number) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  const activeGroup = skillsByCompetency[selected];

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-24 max-w-5xl mx-auto px-4 scroll-mt-28 sm:mb-32 w-full"
    >
      <SectionHeading index={4}>Skills</SectionHeading>

      {/* Desktop: category rail + chips */}
      <div className="hidden md:grid grid-cols-[minmax(0,18rem)_minmax(0,1fr)] gap-6 rounded-2xl border border-swiss-border bg-swiss-card p-4">
        <ul className="flex flex-col gap-1" role="tablist" aria-label="Skill categories">
          {skillsByCompetency.map((group, index) => {
            const isActive = index === selected;
            return (
              <li key={group.category}>
                <button
                  type="button"
                  role="tab"
                  id={`skills-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="skills-panel"
                  onClick={() => setSelected(index)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-swiss-accent/15 text-swiss-text"
                      : "text-swiss-text-secondary hover:bg-swiss-text/5 hover:text-swiss-text"
                  }`}
                >
                  <span className="leading-snug">{group.category}</span>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      isActive ? "text-swiss-accent" : "text-swiss-text-secondary/70"
                    }`}
                  >
                    {group.skills.length}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${selected}`}
          className="min-h-[18rem] rounded-xl border border-swiss-border/60 bg-swiss-bg/40 p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="swiss-label text-swiss-accent mb-4">
                {activeGroup.category}
              </h3>
              <SkillChips skills={activeGroup.skills} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: accordion */}
      <ul className="md:hidden flex flex-col gap-2">
        {skillsByCompetency.map((group, index) => {
          const isOpen = openGroups.has(index);
          return (
            <li
              key={group.category}
              className="rounded-xl border border-swiss-border bg-swiss-card"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`skills-group-${index}`}
                onClick={() => toggleGroup(index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium"
              >
                <span>{group.category}</span>
                <span className="flex shrink-0 items-center gap-2 text-swiss-text-secondary">
                  <span className="font-mono text-xs tabular-nums">
                    {group.skills.length}
                  </span>
                  <HiChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180 text-swiss-accent" : ""}`}
                    aria-hidden
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`skills-group-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <SkillChips skills={group.skills} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SkillChips({ skills }: { skills: readonly Skill[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {skills.map((skill) => (
        <li
          key={skill.label}
          className="px-3.5 py-2 bg-swiss-card border border-swiss-border rounded-lg text-sm font-medium hover:border-swiss-accent hover:text-swiss-accent transition-all duration-300"
        >
          {skill.label}
          {skill.expansion ? (
            <span className="ml-1 text-xs font-normal text-swiss-text-secondary">
              ({skill.expansion})
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
