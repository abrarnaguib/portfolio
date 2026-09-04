import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionTab } from "@/components/ui/SectionTab";
import { getFeaturedProjects, getOtherProjects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const rest = getOtherProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionTab>Projects</SectionTab>

      {featured.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-14 py-4 mb-10">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            // Index continues from featured.length so the whole page pops
            // in as one continuous top-to-bottom cascade, not two separate
            // resets.
            <ProjectCard key={project.slug} project={project} index={featured.length + i} />
          ))}
        </div>
      )}
    </div>
  );
}
