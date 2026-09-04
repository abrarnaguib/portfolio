"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Easing } from "framer-motion";
import type { ReactNode } from "react";

// Same impact family as Hero's title (see Hero.tsx for the full reasoning:
// velocity compression, a genuine hit-stop hold, squash past rest, then a
// rebound) — toned down since this is a recurring page heading, not the one
// big entrance moment a whole site gets once, and with no screen shake (that
// stays reserved for Hero; a shake on every page heading would fight itself
// against a card grid's own entrance right below it). No phase-state
// machinery here, unlike Hero — this doesn't need to skip repeats, since a
// SectionTab remounting fresh on every navigation (via PageTransition's
// AnimatePresence swapping pages) is exactly when it *should* play. It
// simply won't animate on a hard/direct load of a non-home page — Framer
// Motion doesn't replay initial->animate on hydration, and that's a fine
// trade rather than the extra machinery Hero needed to force it.
const IMPACT_TIMES = [0, 0.16, 0.24, 0.5, 1];
const IMPACT_EASE: Easing[] = ["circOut", "linear", "easeOut", "easeInOut"];
// Delayed enough that most of the motion is still visible once the (now
// ~0.4s) route wipe has cleared, rather than playing out entirely while
// still hidden behind it.
const IMPACT_DELAY = 0.16;

/**
 * Angled tab with upright text — the section-label treatment used across the
 * site instead of a plain heading + border-b divider. Same mechanics as the
 * active nav item (see globals.css: .tab-fill / .tab-fill-red /
 * .tab-fill-white) — a mirrored white layer swaying opposite the red one —
 * always in the "active" state, since rendering a SectionTab at all means
 * you're already on that page.
 */
export function SectionTab({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  // reduceMotion renders a completely static target (no arrays at all)
  // rather than trusting that initial={false} resolves a keyframe array to
  // its final value on its own — not worth guessing on the one path
  // accessibility actually depends on.
  const animate = reduceMotion
    ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
    : {
        //         STRIKE  hold  squash  settle
        opacity: [1, 1, 1, 1, 1],
        scale: [1.22, 1.22, 0.92, 1.03, 1],
        y: [-2, -2, 4, -1, 0],
        rotate: [0.4, 0.4, -0.8, 0.25, 0],
      };
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.34, delay: IMPACT_DELAY, times: IMPACT_TIMES, ease: IMPACT_EASE };

  return (
    <motion.h2
      initial={
        reduceMotion ? false : { opacity: 0, scale: 1.28, y: -20, rotate: -4 }
      }
      animate={animate}
      transition={transition}
      className="relative inline-block px-5 py-1.5 mb-8"
    >
      <span aria-hidden className="tab-fill tab-fill-white tab-fill-reverse is-active absolute inset-0 bg-paper" />
      <span aria-hidden className="tab-fill tab-fill-red is-active absolute inset-0 bg-thief-red" />
      <span className="relative font-display text-2xl uppercase tracking-wide text-ink">
        {children}
      </span>
    </motion.h2>
  );
}
