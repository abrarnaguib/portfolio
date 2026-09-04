"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Route transition — two diagonal bands (one leading, one trailing by a
 * short stagger) sweep across the full viewport from one of four
 * directions, overlap enough to fully cover it mid-sweep, then continue
 * off the far edge. The new page's content is already mounted underneath
 * and fades in while covered, so the DOM swap itself is never visible —
 * only the sweep is, and the reveal happens progressively as the bands
 * clear.
 *
 * The wipe plays once *per route*, not once for the whole session: the
 * first time you land on a given page it plays, and revisiting that same
 * page later in the session is a plain cross-fade instead — but landing on
 * a page you haven't been to yet always gets the full wipe, regardless of
 * how many other pages you've already visited. A full page reload resets
 * which routes count as "already seen" (ordinary React state does this for
 * free — a fresh load is a fresh component instance). The direction is
 * still picked at random from four candidates (left/right/top/bottom
 * sweeps, each diagonally cut) each time the wipe plays.
 *
 * `pointer-events-none` on the overlay matters — without it, the (much
 * wider than viewport) band elements would eat clicks near the screen
 * edges even fully swept away, since their layout box still extends past
 * what's visible.
 */
const BAND_DURATION = 0.38; // was 0.6 — noticeably snappier
const BAND_TIMES = [0, 0.34, 0.52, 1];
const BAND_STAGGER = 0.045;

type Direction = "left" | "right" | "top" | "bottom";
const DIRECTIONS: Direction[] = ["left", "right", "top", "bottom"];

const DIRECTION_CONFIG: Record<
  Direction,
  { clip: string; axis: "x" | "y"; from: string; boxStyle: CSSProperties }
> = {
  left: {
    clip: "clip-band",
    axis: "x",
    from: "-150vw",
    boxStyle: { left: "-50vw", width: "200vw", top: 0, bottom: 0 },
  },
  right: {
    clip: "clip-band",
    axis: "x",
    from: "150vw",
    boxStyle: { left: "-50vw", width: "200vw", top: 0, bottom: 0 },
  },
  top: {
    clip: "clip-band-v",
    axis: "y",
    from: "-150vh",
    boxStyle: { top: "-50vh", height: "200vh", left: 0, right: 0 },
  },
  bottom: {
    clip: "clip-band-v",
    axis: "y",
    from: "150vh",
    boxStyle: { top: "-50vh", height: "200vh", left: 0, right: 0 },
  },
};

function pickDirection(): Direction {
  return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
}

function WipeBand({ color, delay, direction }: { color: string; delay: number; direction: Direction }) {
  const cfg = DIRECTION_CONFIG[direction];
  const to = cfg.from.startsWith("-") ? cfg.from.slice(1) : `-${cfg.from}`;
  const keyframes = { [cfg.axis]: [cfg.from, "0vw", "0vw", to] };
  return (
    <motion.div
      className={`absolute ${cfg.clip} ${color}`}
      style={cfg.boxStyle}
      initial={{ [cfg.axis]: cfg.from }}
      animate={keyframes}
      transition={{
        duration: BAND_DURATION,
        times: BAND_TIMES,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // The wipe overlay is gated to client-only rendering. This component is
  // server-rendered for the initial HTML too, and pickDirection() calls
  // Math.random() — the server and the client each get their own random
  // value, so the SSR-rendered band's direction (class names, inline
  // style) and what the client renders on hydration can genuinely
  // disagree, which is a real hydration mismatch, not a cosmetic one
  // (confirmed by a React hydration-mismatch warning during testing). The
  // fix isn't to make the randomness deterministic — it's that the very
  // first page load never needs a wipe at all (there's no previous page
  // to transition from), so the server simply never renders this markup,
  // and `mounted` only flips true after hydration completes, client-side.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Deferred into a rAF rather than called directly — React's linter
    // flags a synchronous setState call in an effect body as a potential
    // cascading-render footgun (same rule Hero.tsx works around).
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Direction + "should this navigation show the wipe" are both derived
  // synchronously during render, not in an effect — this is React's own
  // documented pattern for "derive new state when a value changes,
  // without a flash of the old value first" (see: You Might Not Need An
  // Effect → adjusting state on prop change). Comparing against the
  // previous render's stored pathname and calling setState conditionally,
  // right here, triggers an immediate re-render before anything paints,
  // so the correct values are already picked by the time this component's
  // output ever reaches the screen. `showWipe` itself is stored *in* state
  // (not recomputed as a local variable at render time) because that
  // synchronous re-render discards this render's own output — only the
  // state that gets committed is what ever actually paints.
  //
  // `visited` tracks real state (not a module-level mutable flag, unlike
  // Hero's hasBooted) deliberately — PageTransition itself never unmounts
  // across a session the way Hero remounts on every visit to "/", so
  // ordinary useState is both sufficient and safer here: no risk of
  // Strict Mode's double-render racing a mutation against a read, because
  // there's no external mutation happening at all.
  const [state, setState] = useState<{
    pathname: string;
    direction: Direction;
    visited: ReadonlySet<string>;
    showWipe: boolean;
  }>(() => ({
    pathname,
    direction: pickDirection(),
    visited: new Set([pathname]), // the very first page load doesn't need a wipe either — nothing to transition from
    showWipe: false,
  }));
  if (state.pathname !== pathname) {
    const isFirstVisitToThisRoute = !state.visited.has(pathname);
    setState({
      pathname,
      direction: pickDirection(),
      visited: isFirstVisitToThisRoute
        ? new Set(state.visited).add(pathname)
        : state.visited,
      showWipe: isFirstVisitToThisRoute,
    });
  }
  const direction = state.direction;
  const showWipe = state.showWipe;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} initial={false} exit={{ opacity: 0 }} transition={{ duration: 0.06 }}>
        {mounted && !reduceMotion && showWipe && (
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          >
            <WipeBand color="bg-ink" delay={0} direction={direction} />
            <WipeBand color="bg-thief-red" delay={BAND_STAGGER} direction={direction} />
          </div>
        )}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            // The wipe-timed delay only matters while bands are actually
            // covering the content; every navigation after the first one
            // is just a quick, undelayed cross-fade.
            duration: showWipe ? 0.16 : 0.18,
            delay: reduceMotion || !showWipe ? 0 : BAND_DURATION * 0.37,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
