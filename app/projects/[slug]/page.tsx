import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getProject, projects } from "@/content/projects";

// Required for `output: "export"` (turned on in next.config.ts as of
// Phase 6) — a fully static export has no server to render a dynamic
// route on demand, so every param this route can take has to be known
// and pre-rendered at build time. One entry per project in content/
// projects.ts; adding a project there automatically adds its detail
// page to the next static build, no route-level change needed.
export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getProject(slug)?.title ?? "Project" };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ProjectDetail project={project} />
    </div>
  );
}
