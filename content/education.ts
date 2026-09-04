export type EducationEntry = {
  institution: string;
  period: string;
  /** The institution's own website — the node links out here, not to any internal page. */
  href: string;
};

// Chronological, oldest first — mirrors reading order top-to-bottom on the
// vertical timeline next to the About panel.
export const education: EducationEntry[] = [
  {
    institution: "SOS Hermann Gmeiner College Dhaka",
    period: "2011–2023",
    href: "https://www.soshgcdhaka.edu.bd/",
  },
  {
    institution: "Islamic University of Technology",
    period: "2024–2028",
    href: "https://www.iutoic-dhaka.edu/",
  },
];
