import type { Metadata } from "next";
import { AchievementEntry } from "@/components/achievements/AchievementEntry";
import { SectionTab } from "@/components/ui/SectionTab";
import { achievements } from "@/content/achievements";

export const metadata: Metadata = { title: "Achievements" };

export default function AchievementsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionTab>Achievements</SectionTab>
      <div className="grid sm:grid-cols-2 gap-14 py-4">
        {achievements.map((achievement, i) => (
          <AchievementEntry key={achievement.id} achievement={achievement} index={i} />
        ))}
      </div>
    </div>
  );
}
