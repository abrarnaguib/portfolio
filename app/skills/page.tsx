import type { Metadata } from "next";
import { SkillGroup } from "@/components/skills/SkillGroup";
import { SectionTab } from "@/components/ui/SectionTab";
import { skillGroups } from "@/content/skills";

export const metadata: Metadata = { title: "Skills" };

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionTab>Skills</SectionTab>
      <div className="space-y-8 max-w-2xl">
        {skillGroups.map((group) => (
          <SkillGroup key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
