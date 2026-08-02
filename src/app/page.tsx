import Hero from "@/components/sections/Hero";
import ToolsMarquee from "@/components/sections/ToolsMarquee";
import StatsStrip from "@/components/sections/StatsStrip";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Leadership from "@/components/sections/Leadership";
import Sandbox from "@/components/sections/Sandbox";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ToolsMarquee />
      <StatsStrip />
      <Skills />
      <Projects />
      <Experience />
      <Leadership />
      <Sandbox />
      <Contact />
    </>
  );
}
