"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDown, BsArrowRight, BsCCircleFill, BsDiamond, BsDiamondFill, BsGithub, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <Image
              src="/IMG_2543.JPG"
              alt="Diamond Portrait"
              width={100}
              height={100}
              quality={95}
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>
          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            💎
          </motion.span>
        </div>
      </div>
      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">Howdy, I'm Diamond Ray Louden. </span><br />
        <span className="font-bold">I'm a</span>
        <span className="font-bold"> forward-thinking generalist who operates at the intersection
         of technology and culture</span> with about
        <span className="font-bold">{" "}11 years</span> of experience. I enjoy
        <span className="italic"> continously learning, growing, and helping whatever environment I find myself in</span>.
      </motion.h1>
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact"), setTimeOfLastClick(Date.now());
          }}
        >
            diamondlouden@gmail.com{" "}
          <BsDiamondFill className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>
        <a
          className="group bg-slate-50 text-black px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-slate-50/10 dark:text-slate-50"
          href="/diamond-louden-resume.pdf"
          download
        >
          Download My Resume{" "}
          <HiDownload className="opacity-70 group-hover:translate-y-1 transition" />
        </a>
        <a
          className="bg-[#0077b5] text-slate-50 p-4 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-slate-50 active:scale-105 transition cursor-pointer borderBlack dark:bg-slate-50/90 dark:text-[#0077b5]"
          href="https://www.linkedin.com/in/diamond-ray/"
          target="_blank"
        >
          <BsLinkedin />
        </a>
        <a
          className="bg-gray-950 text-slate-50 p-4 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-slate-50 active:scale-105 transition cursor-pointer borderBlack dark:bg-slate-50/90 dark:text-black/80"
          href="https://github.com/rayadamas"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}