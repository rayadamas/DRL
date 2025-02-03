"use client";

import React from "react";
import dynamic from "next/dynamic";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

const Chrono = dynamic(() => import("react-chrono").then((mod) => mod.Chrono), {
  ssr: false,
});

type Theme = "light" | "dark";

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <Chrono
        mode="VERTICAL_ALTERNATING"
        theme={{ primary: "gray", secondary: "white", cardTitle: "black" }}
      >
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <h3 className="font-semibold capitalize text-black">
              {item.title}
            </h3>
            <p className="font-normal !mt-0 dark:text-black">{item.location}</p>
            <p className="!mt-1 !font-normal text-gray-700">
              {item.description}
            </p>
          </React.Fragment>
        ))}
      </Chrono>
    </section>
  );
}
