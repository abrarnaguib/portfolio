import { Panel } from "@/components/ui/Panel";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/projects";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Tag>{project.status}</Tag>
          <span className="text-smoke text-sm">{project.timeframe}</span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl uppercase tracking-tight drop-shadow-[5px_5px_0_var(--color-thief-red)]">
          {project.title}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-paper/90">{project.summary}</p>
      </div>

      <Panel cut="lg" className="p-10 max-w-2xl">
        <p className="font-display text-sm uppercase tracking-widest text-thief-red-text mb-3">
          Role
        </p>
        <p className="text-paper/90 mb-8">{project.role}</p>

        <p className="font-display text-sm uppercase tracking-widest text-thief-red-text mb-3">
          Stack
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>

        {project.body && (
          <>
            <p className="font-display text-sm uppercase tracking-widest text-thief-red-text mb-3">
              Write-up
            </p>
            <p className="text-paper/90 leading-relaxed mb-8">{project.body}</p>
          </>
        )}

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-thief-red-text underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </Panel>

      {/*
        Standout technical points get their own small Panel each instead
        of another paragraph in the write-up above — the same "one card,
        one idea" treatment the achievements grid uses, for the specific
        bits worth a reader's eye landing on individually rather than
        being buried mid-paragraph.
      */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="grid gap-18 py-4 sm:grid-cols-2 max-w-3xl">
          {project.highlights.map((highlight, i) => (
            <Panel key={highlight.title} cut="sm" index={i} className="p-7">
              <p className="font-display text-lg uppercase tracking-tight text-thief-red-text mb-3">
                {highlight.title}
              </p>
              <p className="text-paper/90 text-sm leading-relaxed">
                {highlight.description}
              </p>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
