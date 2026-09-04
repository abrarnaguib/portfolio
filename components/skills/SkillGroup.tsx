import { Tag } from "@/components/ui/Tag";
import type { SkillGroupData } from "@/content/skills";

export function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <div>
      <p className="font-display text-sm uppercase tracking-widest text-thief-red-text mb-3">
        {group.label}
      </p>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
}
