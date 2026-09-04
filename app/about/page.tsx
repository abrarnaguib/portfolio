import type { Metadata } from "next";
import { Panel } from "@/components/ui/Panel";
import { SectionTab } from "@/components/ui/SectionTab";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionTab>About</SectionTab>
      <div className="mt-2">
        <Panel cut="lg" className="p-8 max-w-2xl">
          <p className="font-display text-3xl uppercase tracking-tight mb-3">
            CSE Undergrad — 4th Semester
          </p>
          <p className="text-paper/90 leading-relaxed">
            Hi, I&apos;m a Computer Science & Engineering undergraduate
            at Islamic University of Technology, Gazipur - a passionate problem solver and computer graphics,
            game programming, and ML/AI enthusiast; solving problems and
            building games and interactive applications. On a mission to
            become a skilled developer and a cherished figure in the
            programming community.
          </p>
        </Panel>
      </div>
    </div>
  );
}
