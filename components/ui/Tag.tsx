import type { ReactNode } from "react";

/** Small opaque label chip — tech tags, status tags. Reads on any background,
 * unlike plain colored text, since it carries its own opaque fill. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block bg-ink px-2.5 py-1 font-display text-sm uppercase tracking-wide text-thief-red-text">
      {children}
    </span>
  );
}
