"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        {" "}
        With a strong background in <span className="font-medium">business analysis, AI-driven strategy,
        and blockchain technology,</span> I thrive at the intersection of
        innovation and efficiency. My experience spans industries such as
        {" "}
        <span className="font-medium">
          retail, healthcare, CPG, and tech,
        </span>{" "}
        where I've optimized processes, developed AI prompt strategies, and 
        enhanced customer engagement. My <span className="underline">favorite</span> part about technology is its ability
        to streamline complex challenges into elegant, data-driven solutions.
        {" "}
        <span className="italic">My core expertise includes, </span>
        business operations analysis, blockchain/web3 analysis, AI prompt
        engineering, and technical writing.
        My core stack is
        {" "}
        <span className="font-medium">
          React, Next.js, JavaScript/TypeScript, and Solidity
        </span>.
        I am also familiar with Python and SQL. I am always
        looking to learn new things. I am currently studying for a{" "}
        <span className="font-medium">CCNA certification.</span>
        {" "}
        I am currently looking for a{" "}
        <span className="font-medium">full-time role</span> in tech sales.
      </p>
      <p>
        <span className="italic">I'm a quintessential generalist</span>, I enjoy analyzing
        the crypto markets, diving deep into esoteric topics, creating/listening music as I'm a certified Audio Engineer & a DJ, 
        watching anime, researching different types of subject matter, and skateboarding. I
        also enjoy <span className="font-medium">learning new things</span>. I
        am currently learning {" "}
        <span className="font-medium">how to be a better storyteller</span>.
      </p>
    </motion.section>
  );
}