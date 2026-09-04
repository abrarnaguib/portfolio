"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Easing } from "framer-motion";
import { useEffect, useState } from "react";
import { TabLink } from "@/components/ui/TabLink";
import { Panel } from "@/components/ui/Panel";
import { ParticlePortrait } from "@/components/home/ParticlePortrait";
import { IMPACT_EVENT } from "@/components/layout/ScreenShakeRoot";

// Module-scope, not component state: resets only on an actual full page
// load (fresh JS evaluation), and stays true across client-side navigation
// within the same session — which is exactly the plan's "replay on a full
// load, not on every internal Link transition" rule (§5).
let hasBooted = false;

// ---- The title impact -----------------------------------------------
//
// Same shape/timeline as SectionTab (see SectionTab.tsx for the full
// technique breakdown: velocity-compressed strike, a genuine hit-stop
// hold, squash past rest, settle) — deliberately the *same* curve, not a
// different one, just scaled up: a bigger coil, a deeper squash, a longer
// duration. An earlier version had its own extra rebound segment on top
// of that (squash -> overshoot past 1 -> settle, one bounce too many),
// which read as springy rather than heavy. Matching SectionTab's simpler
// squash-then-settle shape at a larger magnitude reads as *more*
// powerful, not less — the size of the hit, not the number of bounces
// afterward, is what sells weight.
const TITLE_TIMES = [0, 0.16, 0.24, 0.5, 1];
const TITLE_EASE: Easing[] = ["circOut", "linear", "easeOut", "easeInOut"];
const TITLE_DURATION = 0.5;
const TITLE_DELAY = 0.08;
// The absolute moment (from the phase flip) hit-stop ends and the
// shockwave fires — shared so the screen-shake event fires at the exact
// instant the title actually lands.
const IMPACT_TIME = TITLE_DELAY + TITLE_TIMES[2] * TITLE_DURATION;

// Every motion element below uses `initial={false}` and is driven purely by
// `phase` switching its `animate` target — never by the `initial` prop.
// That's deliberate, not a style choice: Framer Motion intentionally does
// NOT replay an initial->animate transition when hydrating server-rendered
// markup (the sane default for most components — nobody wants a flash of
// invisible content on every hard reload), which directly fights a "boot
// sequence that only plays on a real fresh load" goal. `initial={false}`
// sidesteps that entirely: the very first paint (server AND first client
// render) always shows the "visible" variant with zero risk of a
// server/client mismatch, since neither depends on `hasBooted`. The actual
// reveal happens later, driven by `phase` state that only ever changes
// post-mount — a genuine `animate`-target change well after hydration,
// which Framer Motion always animates for real, regardless of history.
type Phase = "visible" | "hidden";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    if (hasBooted || reduceMotion) return;
    // `hasBooted` is set *inside* the scheduled callback, not here — React
    // Strict Mode's dev-only double-invocation of effects (mount, cleanup,
    // mount again) means this effect body runs, gets torn down, then runs
    // again for the same real mount. The cleanup below correctly cancels
    // the first attempt's rAF before it fires; but if the flag were set
    // right here instead, that first (cancelled) attempt would still have
    // permanently marked "booted," and the second (real) invocation would
    // see it already true and refuse to reschedule anything — the trigger
    // gets cancelled and never rearmed, and the animation silently never
    // plays. Setting the flag only once the callback actually runs means a
    // cancelled attempt never counts as having happened.
    const raf1 = requestAnimationFrame(() => {
      hasBooted = true;
      // Snap to hidden first, then flip back to visible on the *next*
      // frame — two separate paints, not one, so the browser actually
      // shows the hidden frame instead of collapsing both into a no-op.
      setPhase("hidden");
      requestAnimationFrame(() => {
        setPhase("visible");
        // Fire the screen-wide shake at the exact instant the title's own
        // hit-stop ends — Nav and Footer are siblings of Hero, not
        // descendants, so a window event is how the reaction reaches them.
        window.setTimeout(() => {
          window.dispatchEvent(new Event(IMPACT_EVENT));
        }, IMPACT_TIME * 1000);
      });
    });
    return () => cancelAnimationFrame(raf1);
  }, [reduceMotion]);

  const isHidden = phase === "hidden"; // about to animate hidden -> visible
  const snap = { duration: 0 }; // instant hop into "hidden", no visible fade-out

  const eyebrowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  // reduceMotion collapses both variants to identical, static final values
  // rather than relying on the hasBooted-gated effect alone (which already
  // prevents `phase` from ever leaving "visible" when reduced motion is on)
  // — belt and suspenders specifically because these are keyframe *arrays*,
  // not single target values, and this is the one accessibility-critical
  // path where "probably resolves correctly" isn't good enough.
  const titleVariants = reduceMotion
    ? {
        hidden: { opacity: 1, scale: 1, y: 0, rotate: 0 },
        visible: { opacity: 1, scale: 1, y: 0, rotate: 0 },
      }
    : {
        hidden: { opacity: 0, scale: 1.5, y: -55, rotate: -6 },
        visible: {
          //          STRIKE  hold  squash  settle
          opacity: [1, 1, 1, 1, 1],
          scale: [1.28, 1.28, 0.8, 1.06, 1],
          y: [8, 8, 18, -6, 0],
          rotate: [1, 1, -2, 0.6, 0],
        },
      };
  const taglineVariants = eyebrowVariants;
  // Each CTA gets its own explicit delay instead of a parent
  // staggerChildren/delayChildren orchestration — that pattern requires a
  // transition object embedded in the *variant* (not just a direct
  // `transition` prop) to actually take effect, and a variant-embedded
  // transition replaces the direct prop rather than merging with it. Two
  // individually-delayed elements, matching the same direct-prop pattern
  // already used above, sidesteps that interaction entirely.
  const ctaVariants = eyebrowVariants;

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 grid gap-12 md:grid-cols-[minmax(0,1fr)_320px] md:items-center">
      <div>
        <motion.p
          initial={false}
          animate={phase}
          variants={eyebrowVariants}
          transition={isHidden ? snap : { duration: 0.35, ease: "easeOut" }}
          className="font-display text-thief-red-text tracking-widest text-sm uppercase mb-3"
        >
          Winner Takes It All
        </motion.p>

        <motion.h1
          initial={false}
          animate={phase}
          variants={titleVariants}
          transition={
            isHidden
              ? snap
              : { duration: TITLE_DURATION, delay: TITLE_DELAY, times: TITLE_TIMES, ease: TITLE_EASE }
          }
          className="font-display text-6xl sm:text-8xl uppercase tracking-tight leading-[0.9] drop-shadow-[6px_6px_0_var(--color-thief-red)]"
        >
          Abrar Naguib
        </motion.h1>

        <motion.p
          initial={false}
          animate={phase}
          variants={taglineVariants}
          transition={isHidden ? snap : { duration: 0.35, delay: 0.32, ease: "easeOut" }}
          className="mt-6 max-w-prose text-lg text-paper/90"
        >
            4th semester CSE undergrad on a journey to become
            an asset to the programming/developer community.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <motion.div
            initial={false}
            animate={phase}
            variants={ctaVariants}
            transition={isHidden ? snap : { duration: 0.3, delay: 0.44, ease: "easeOut" }}
          >
            <TabLink href="/projects" size="lg">
              View Projects
            </TabLink>
          </motion.div>
          <motion.div
            initial={false}
            animate={phase}
            variants={ctaVariants}
            transition={isHidden ? snap : { duration: 0.3, delay: 0.52, ease: "easeOut" }}
          >
            <TabLink href="/contact" size="lg">
              Get In Touch
            </TabLink>
          </motion.div>
        </div>
      </div>

      {/*
        The particle portrait — same cursor-repulsion physics as the
        gazijarin.com reference (see ParticlePortrait.tsx), restyled into
        the site's own red/cyan/panel-grey palette and framed with the
        shared Panel primitive (cut corner + swaying offset shadow) instead
        of a plain rectangle, so it reads as part of this site rather than
        a pasted-in widget. `p-0` + `overflow-hidden` so the canvas fills
        the panel edge-to-edge and gets cropped by its cut corner like
        anything else drawn inside one; `aspect-[4/5]` gives it a real
        height without depending on any ancestor's own height (see
        ScreenShakeRoot.tsx for why a percentage height here would be
        fragile).

        The inner `bg-ink` div matters, not just Panel's own default
        surface fill: one of the three particle colors *is* the panel's
        own surface grey (per the brief), and a surface-grey particle
        drawn over a surface-colored backdrop would be invisible — same
        color, zero contrast. Ink is close to black, dark enough that all
        three particle colors (red, cyan, and that grey) read clearly
        against it.
      */}
      <div className="mx-auto w-full max-w-xs md:order-first md:mx-0 md:max-w-none">
        <Panel cut="lg" className="p-0 block aspect-[4/5] overflow-hidden">
          <div className="h-full w-full bg-ink">
            <ParticlePortrait />
          </div>
        </Panel>
      </div>
    </div>
  );
}
