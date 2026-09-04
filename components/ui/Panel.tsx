"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Easing } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type PanelCut = "sm" | "lg" | "both" | "none";
type PanelTone = "surface" | "accent";

const cutClass: Record<PanelCut, string> = {
  sm: "clip-corner",
  lg: "clip-corner-lg",
  both: "clip-corner-both",
  none: "",
};

// The card fill and the shadow-layer fill, per tone — a dark card throws a
// red shadow, a red card throws a black one.
const toneClass: Record<PanelTone, string> = {
  surface: "bg-surface text-paper",
  accent: "bg-thief-red text-ink",
};

const shadowToneClass: Record<PanelTone, string> = {
  surface: "bg-thief-red",
  accent: "bg-ink",
};

// Same impact family as Hero's title and SectionTab (velocity-compressed
// strike, a small overshoot past rest, settle) — no hit-stop hold here,
// deliberately: that reads as a deliberate pause on one prominent element,
// but a whole grid of cards each freezing individually would just read as
// stutter. A quick, staggered "pop, pop, pop" carries the same energy
// without it.
const POP_TIMES = [0, 0.35, 0.7, 1];
const POP_EASE: Easing[] = ["circOut", "easeOut", "easeInOut"];
const POP_DURATION = 0.34;
// Lands after SectionTab's own strike (delay 0.16s) has landed, so the
// page reads top-to-bottom: heading hits, then cards pop in under it.
const POP_BASE_DELAY = 0.28;
const POP_STAGGER = 0.07;

type PanelOwnProps<T extends ElementType> = {
  /** Element/component to render as — defaults to a plain div. */
  as?: T;
  /** Which corner(s) get the angled cut. */
  cut?: PanelCut;
  /** Dark card w/ red shadow (default), or red card w/ black shadow. */
  tone?: PanelTone;
  /** Position within a list — staggers this card's entrance after the ones before it. Omit for a standalone panel. */
  index?: number;
  /** Whether this panel navigates somewhere (rendered `as` a link) — gates the hover white-box sweep, which only makes sense as a "this is clickable" cue. Plain informational panels keep just the permanent shadow. */
  interactive?: boolean;
  className?: string;
};

type PanelProps<T extends ElementType> = PanelOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PanelOwnProps<T>>;

/**
 * The shared "cut corner, offset shadow card" container almost every
 * P5-style surface on the site is built from — cards, the hero frame, nav
 * tabs, etc. One primitive here keeps every angled corner on the site
 * consistent instead of each component hand-rolling its own clip-path.
 *
 * The shadow is a real second element, not a `filter: drop-shadow` — same
 * cut-corner shape, same tone-contrasting color, offset behind the card and
 * given a slight independent rotation, like the layered duplicate-title
 * effect on the hero text but with a plain color fill instead of glyphs.
 * `drop-shadow` can only offset+blur the card's own silhouette; it can't
 * rotate that copy independently, which is the whole point of the tilt.
 *
 * `h-full` on both the wrapper and Tag matters in a grid: when one card in
 * a row is taller than its sibling (e.g. an achievement with a "Details"
 * link vs. one without), CSS Grid's default align-items:stretch stretches
 * the wrapper to match the row's tallest item. The shadow layer already
 * tracks the wrapper via inset-0, so without `h-full` on Tag too, the
 * *visible* card stays its own shorter natural height while the shadow
 * behind it stretches to the taller row height — the two decouple and the
 * shadow balloons past the card. `h-full` on Tag keeps them in lockstep.
 * It's a no-op outside a stretching grid/flex context (percentage height
 * against an auto-height ancestor resolves to auto), so standalone panels
 * are unaffected.
 *
 * Both shadow layers sway gently and permanently (same continuous
 * translateX-oscillation technique as the nav tabs' tab-sway-red/white in
 * globals.css, just re-scaled to the panel's own offset/rotate/skew) — a
 * plain informational card still reads as "alive," not just the ones with
 * a hover reveal on top of it.
 *
 * `interactive` additionally renders a second box (white, mirrored
 * offset/rotate from the always-on shadow, see .panel-hover-fill in
 * globals.css) that sweeps in left-to-right on hover — reserved for panels
 * that actually go somewhere (ProjectCard), not plain informational ones
 * (AchievementEntry, the about-page bio, style guide) where a "this is
 * clickable" cue would be misleading. It layers on top of whatever tilt an
 * ancestor already applies (ProjectCard's whileHover rotate/lift wrapper,
 * e.g.), not replacing it: that tilt lives on a separate ancestor element,
 * this lives on its own sibling span, so neither mechanism ever drives the
 * same element's `transform`.
 *
 * The entrance pop plays on every mount (no phase-state machinery like
 * Hero needs) — a Panel remounting fresh on client-side navigation, which
 * is the primary path through the site, isn't subject to the hydration-
 * skip behavior that forced Hero's extra complexity. A direct/hard load of
 * a non-home page simply shows the final state immediately instead, which
 * is an acceptable trade rather than machinery every card would otherwise
 * carry.
 */
export function Panel<T extends ElementType = "div">({
  as,
  cut = "sm",
  tone = "surface",
  index = 0,
  interactive = false,
  className = "",
  children,
  ...rest
}: PanelProps<T>) {
  const Tag = as ?? "div";
  const reduceMotion = useReducedMotion();

  const animate = reduceMotion
    ? { opacity: 1, scale: 1, y: 0 }
    : {
        //         STRIKE  settle-back  rest
        opacity: [0, 1, 1, 1],
        scale: [0.86, 1.05, 0.985, 1],
        y: [18, -2, 1, 0],
      };
  const transition = reduceMotion
    ? { duration: 0 }
    : {
        duration: POP_DURATION,
        delay: POP_BASE_DELAY + index * POP_STAGGER,
        times: POP_TIMES,
        ease: POP_EASE,
      };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.86, y: 18 }}
      animate={animate}
      transition={transition}
      className={`relative inline-block h-full ${interactive ? "group" : ""}`}
    >
      {interactive && (
        <span
          aria-hidden
          className={`panel-hover-fill absolute inset-0 -z-10 rotate-4 -translate-x-3.5 translate-y-3.5 skew-x-12 bg-paper ${cutClass[cut]}`}
        />
      )}
      <span
        aria-hidden
        className={`panel-shadow absolute inset-0 -z-10 -rotate-2 translate-x-3.5 translate-y-3.5 skew-x-3 ${shadowToneClass[tone]} ${cutClass[cut]}`}
      />
      <Tag
        className={`relative h-full ${toneClass[tone]} ${cutClass[cut]} ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
