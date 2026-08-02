import { skills } from "@/lib/data/stats";
import { skillColor } from "@/lib/fx/languages";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillKey from "@/components/ui/SkillKey";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="skills"
        title="Keyboard Layout"
        description="Hover the keys to press them — every card simulates a physical keystroke."
      />
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 [perspective:700px]">
        {skills.map((skill) => (
          <SkillKey key={skill} label={skill} color={skillColor(skill)} />
        ))}
      </div>
    </section>
  );
}
