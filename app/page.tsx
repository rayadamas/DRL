import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import PortfolioValue from "@/components/portfolio-value";
import Projects from "@/components/projects";
import Raci from "@/components/raci";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Intro />
      <About />
      <PortfolioValue />
      <Projects />
      <Skills />
      <Raci />
      <Experience />
      <Contact />
    </main>
  );
}
