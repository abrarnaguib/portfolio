import { Panel } from "@/components/ui/Panel";
import { SectionTab } from "@/components/ui/SectionTab";
import { Tag } from "@/components/ui/Tag";

/**
 * Scratch route — not part of the site's nav, not linked from anywhere.
 * Exists purely to eyeball the design tokens (§5 of the build plan) against
 * real rendering before any real page gets built on top of them.
 * Delete or gate this behind dev-only once the real pages exist.
 */

const swatches = [
  { name: "ink", hex: "#161311", cls: "bg-ink border border-smoke/40" },
  { name: "paper", hex: "#f4efe6", cls: "bg-paper" },
  { name: "thief-red", hex: "#dc1f2e", cls: "bg-thief-red" },
  { name: "thief-red-dim", hex: "#7a1017", cls: "bg-thief-red-dim" },
  { name: "thief-red-text", hex: "#f3595e", cls: "bg-thief-red-text" },
  { name: "gold", hex: "#c9a24b", cls: "bg-gold" },
  { name: "smoke", hex: "#8a8178", cls: "bg-smoke" },
  { name: "cyan", hex: "#2ee0e8", cls: "bg-cyan" },
];

export default function StyleGuidePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 space-y-24">
      <header>
        <p className="font-display text-thief-red-text tracking-widest text-sm uppercase mb-2">
          Phase 1 — Design Tokens
        </p>
        <h1 className="font-display text-6xl sm:text-7xl uppercase tracking-tight leading-none drop-shadow-[4px_4px_0_var(--color-thief-red)]">
          Style Guide
        </h1>
        <p className="mt-6 max-w-prose text-smoke">
          Scratch page. Not a real site route — just the palette, type, and
          the <code className="text-paper">Panel</code> primitive rendered
          against each other so the system can be judged before any real
          page gets built on it.
        </p>
      </header>

      {/* Color */}
      <section>
        <SectionTab>Color</SectionTab>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {swatches.map((s) => (
            <div key={s.name}>
              <div
                className={`h-20 clip-corner drop-shadow-[4px_4px_0_var(--color-ink)] ${s.cls}`}
              />
              <p className="mt-3 font-display uppercase tracking-wide text-sm">
                {s.name}
              </p>
              <p className="text-smoke text-sm tabular-nums">{s.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Type */}
      <section>
        <SectionTab>Type</SectionTab>

        <div className="space-y-8">
          <div>
            <p className="text-smoke text-sm uppercase tracking-widest mb-2">
              Display — Bebas Neue
            </p>
            <p className="font-display text-6xl sm:text-8xl uppercase leading-[0.9] tracking-tight">
              Take Your Heart
            </p>
          </div>

          <div>
            <p className="text-smoke text-sm uppercase tracking-widest mb-2">
              Body — Inter
            </p>
            <p className="max-w-prose text-lg leading-relaxed">
              This is the body face — the one doing the actual reading, kept
              deliberately quiet so the display face is the only voice
              shouting. [Placeholder paragraph — swapped for real bio/project
              copy in Phase 7.]
            </p>
          </div>

          <div>
            <p className="text-smoke text-sm uppercase tracking-widest mb-2">
              Tabular numerals
            </p>
            <p className="font-display text-3xl tabular-nums">
              04 / 08 SEMESTERS &nbsp;·&nbsp; 2026
            </p>
          </div>
        </div>
      </section>

      {/* Panel */}
      <section>
        <SectionTab>Panel</SectionTab>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
          <Panel cut="sm" index={0} className="p-8">
            <Tag>cut=&quot;sm&quot;</Tag>
            <h3 className="font-display text-4xl uppercase tracking-tight mt-3 mb-2">
              Default Cut
            </h3>
            <p className="text-paper/90 text-base leading-snug">
              One corner cut, hard red shadow block behind it — this is what
              most cards on the site use.
            </p>
          </Panel>

          <Panel cut="lg" tone="accent" index={1} className="p-8">
            <Tag>tone=&quot;accent&quot;</Tag>
            <h3 className="font-display text-4xl uppercase tracking-tight mt-3 mb-2">
              Inverse Pairing
            </h3>
            <p className="text-ink text-base leading-snug">
              Red card, black shadow — reserved for the one moment on a page
              that should read as the loudest thing on it.
            </p>
          </Panel>

          <Panel cut="both" index={2} className="p-8">
            <Tag>cut=&quot;both&quot;</Tag>
            <h3 className="font-display text-4xl uppercase tracking-tight mt-3 mb-2">
              In Motion
            </h3>
            <p className="text-paper/90 text-base leading-snug">
              Opposite corners cut — for elements that should read as moving
              rather than sitting still.
            </p>
          </Panel>

          <Panel cut="none" index={3} className="p-8">
            <Tag>cut=&quot;none&quot;</Tag>
            <h3 className="font-display text-4xl uppercase tracking-tight mt-3 mb-2">
              Dense Lists
            </h3>
            <p className="text-paper/90 text-base leading-snug">
              Square corners, shadow only — for repeated rows where a cut
              corner would turn into visual noise at volume.
            </p>
          </Panel>
        </div>
      </section>
    </main>
  );
}
