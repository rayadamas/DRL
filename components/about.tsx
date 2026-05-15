"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-3xl mx-auto px-4 scroll-mt-28 sm:mb-40"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="about"
    >
      <SectionHeading>About</SectionHeading>

      <div className="space-y-6 swiss-body text-swiss-text-secondary leading-relaxed text-center">
        <p>
          I&rsquo;m at my best when I&rsquo;m{" "}
          <span className="text-swiss-text font-medium">
            close to the problem,
          </span>
          &nbsp; in the room where the question is still half-formed, not three
          slides into the readout.
        </p>

        <p>
          Right now that means{" "}
          <span className="text-swiss-text font-medium">applied AI</span>:
          shipping agents and automations, retrieval systems on{" "}
          <span className="text-swiss-text font-medium">AWS Bedrock</span>, n8n
          workflows that survive contact with reality, and the prompt-engineering
          rigor I picked up authoring{" "}
          <span className="text-swiss-text font-medium">
            1,100+ training pairs
          </span>{" "}
          for Amazon&rsquo;s Project Neo. I work in{" "}
          <span className="text-swiss-text font-medium">
            Python and TypeScript
          </span>
          , and I&rsquo;m comfortable in the Solidity / web3 stack when the
          problem calls for it.
        </p>

        <p>
          The breadth on the r&eacute;sum&eacute; isn&rsquo;t padding, 
          it&rsquo;s pattern-matching across rooms. Retail floors, Accenture
          engagements (Macy&rsquo;s taxonomy, Walgreens program design,
          accessibility scans), enterprise NLP training, and BDR outbound. That
          mix is why I can sit with engineers, operators, and a CISO in the same
          week{" "}
          <span className="text-swiss-text font-medium">
            without translation tax
          </span>
          .
        </p>

        <p>
          I am also a certified audio engineer &amp; [DJ](https://www.mixcloud.com/djdiaray/), that thread stays in
          the margins on purpose.
        </p>
      </div>
    </motion.section>
  );
}
