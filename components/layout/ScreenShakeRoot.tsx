"use client";

import { useAnimate, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import type { ReactNode } from "react";

// Fired by Hero (or anything else that wants a screen-wide reaction) at
// the exact instant its own hit-stop ends. A plain window event, not a
// prop or context — the whole point is that Nav and Footer are Hero's
// *siblings* in the tree (both children of <body>, same as <main>), not
// its descendants, so nothing about React's normal data flow reaches them
// from inside Hero. An event is the least-coupled way to say "something
// hit hard, everyone react" without Hero needing to know who's listening.
export const IMPACT_EVENT = "site-impact";

// Small and decaying — the same shake amplitude/timing regardless of what
// triggered it, so Nav, the page content, and Footer all move together as
// one rigid sheet instead of by different amounts. That's what actually
// reads as "the screen shook," rather than "the title wobbled."
const SHAKE_DURATION = 0.28;
const SHAKE_TIMES = [0, 0.16, 0.34, 0.52, 0.7, 0.85, 1];
const SHAKE_X = [0, 7, -6, 4, -2, 1, 0];
const SHAKE_Y = [0, -4, 3, -2, 1, 0, 0];

export function ScreenShakeRoot({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    function handleImpact() {
      animate(
        scope.current,
        { x: SHAKE_X, y: SHAKE_Y },
        { duration: SHAKE_DURATION, times: SHAKE_TIMES, ease: "easeOut" }
      );
    }
    window.addEventListener(IMPACT_EVENT, handleImpact);
    return () => window.removeEventListener(IMPACT_EVENT, handleImpact);
  }, [animate, scope, reduceMotion]);

  // Matches <body>'s own flex layout — this wrapper sits between body and
  // Nav/main/Footer, so it has to pass that layout through rather than
  // collapsing them into a single flex item (which would break main's
  // flex-1 growth and push Footer up against the content).
  //
  // `min-h-screen` (viewport units), not `min-h-full` (a percentage) — this
  // div is the sole flex item inside body's own column flex context, and
  // column-direction flex containers don't stretch a child's height
  // (stretch is a cross-axis default; height is the *main* axis here).
  // So this div's height came only from its own `min-height` property or
  // its content, whichever was taller. A percentage `min-height` needs its
  // parent (body) to have a *definite* height to resolve against — but
  // body only sets `min-height` too, not `height`, which per spec doesn't
  // count as "specified explicitly". In practice that meant this div (and
  // therefore main's flex-1) never reliably filled the viewport on
  // short-content pages, so Footer ended up sitting at a different height
  // on every page instead of pinned to the bottom. `min-h-screen` sidesteps
  // the whole percentage chain — 100vh is always resolvable directly
  // against the viewport, no matter what any ancestor's own height is.
  return <div ref={scope} className="min-h-screen flex flex-col">{children}</div>;
}
