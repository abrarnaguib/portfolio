import Image from "next/image";
import { Panel } from "@/components/ui/Panel";
import { Tag } from "@/components/ui/Tag";
import type { Achievement } from "@/content/achievements";

export function AchievementEntry({
  achievement,
  index = 0,
}: {
  achievement: Achievement;
  /** Position within the grid — staggers this card's entrance pop after the ones before it. */
  index?: number;
}) {
  return (
    <Panel cut="sm" index={index} className="p-6">
      {/*
        The image bleeds to the card's own top/left/right edges (negative
        margins cancel the p-6 padding on those three sides only, so the
        text below keeps its normal padding) rather than sitting in its
        own separately-framed box — Panel's Tag already carries the cut
        corner as a clip-path directly on itself, so anything drawn inside
        it, including an edge-bleeding image, is automatically cropped to
        that same shape for free. That's the "proper frame": the card's
        own frame, not a second one nested inside it.
      */}
      {achievement.image && (
        <div className="relative -mx-6 -mt-6 mb-4 aspect-video">
          <Image
            src={achievement.image}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <Tag>{achievement.category}</Tag>
        <span className="text-smoke text-xs">{achievement.timeframe}</span>
      </div>
      <h3 className="font-display text-2xl uppercase tracking-tight mb-2">
        {achievement.title}
      </h3>
      <p className="text-paper/90 text-sm leading-relaxed">
        {achievement.description}
      </p>
      {achievement.links && achievement.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {achievement.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-block text-thief-red-text underline underline-offset-4 text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </Panel>
  );
}
