"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Panel } from "@/components/ui/Panel";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/projects";

/**
 * The rotate/lift wrapper sits *outside* Panel, not inside it — Panel's own
 * shadow span already carries a static rotate/translate (see Panel.tsx),
 * and animating that same property on that same element would just
 * replace it rather than combine with it. Rotating the whole card as one
 * rigid body from an ancestor element sidesteps that entirely: no property
 * on any single element is ever driven by two mechanisms at once.
 */
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  /** Position within the grid — staggers this card's entrance pop after the ones before it. */
  index?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    // tabIndex={-1} is load-bearing, not decorative: Framer Motion
    // auto-injects tabIndex="0" onto any element carrying whileTap that
    // isn't already a natively-interactive tag, assuming it's a custom
    // tappable control that needs keyboard reachability added. That
    // assumption is wrong here — the actual interactive element is the
    // <Link> one level down inside Panel, already natively focusable — so
    // without this override, tabbing through the page hit a second,
    // silent stop on this plain <div> (no role, no key handler, nothing
    // happens on Enter/Space) immediately before every card's real link.
    <motion.div
      whileHover={reduceMotion ? undefined : { rotate: -1.5, y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      tabIndex={-1}
    >
      <Panel
        as={Link}
        href={`/projects/${project.slug}`}
        cut={project.featured ? "lg" : "sm"}
        index={index}
        interactive
        className="p-6 block"
      >
        <div className="flex items-center gap-2 mb-3">
          <Tag>{project.status}</Tag>
          <span className="text-smoke text-xs">{project.timeframe}</span>
        </div>
        <h3 className="font-display text-3xl uppercase tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-paper/90 text-sm leading-relaxed">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </Panel>
    </motion.div>
  );
}
