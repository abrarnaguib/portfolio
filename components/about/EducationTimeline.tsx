import { education } from "@/content/education";

/**
 * A vertical rail beside the About panel — one round node per institution,
 * connected by a single line, each node linking straight out to that
 * institution's own site. Deliberately its own standalone element next to
 * the panel rather than crammed inside it, so the panel keeps the exact
 * width/padding it already has (see AboutPage: it sits in a flex row with
 * `shrink-0` on the panel's wrapper for that reason).
 */
export function EducationTimeline() {
  return (
    <ol className="relative flex flex-col gap-10 pl-8">
      <div
        aria-hidden
        className="absolute left-[5px] top-2 bottom-2 w-px bg-smoke/40"
      />
      {education.map((entry) => (
        <li key={entry.institution} className="relative">
          <span
            aria-hidden
            className="absolute -left-8 top-1 h-3 w-3 rounded-full border-2 border-thief-red bg-ink"
          />
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
          >
            <p className="font-display text-lg uppercase leading-snug tracking-tight text-paper transition-colors group-hover:text-thief-red-text">
              {entry.institution}
            </p>
            <p className="mt-1 text-smoke text-sm">{entry.period}</p>
          </a>
        </li>
      ))}
    </ol>
  );
}
