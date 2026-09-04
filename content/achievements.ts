import { withBasePath } from "@/lib/basePath";

export type AchievementCategory =
  | "academic"
  | "research"
  | "competition"
  | "publication";

export type Achievement = {
  id: string;
  title: string;
  category: AchievementCategory;
  timeframe: string;
  description: string;
  /**
   * Zero or more related links (a profile, a writeup, a certificate) —
   * an array rather than one optional link, matching Project.links,
   * since some achievements genuinely point to more than one place
   * (e.g. two separate competitive-programming profiles).
   */
  links?: { label: string; href: string }[];
  /** Optional photo/certificate image, shown at the top of the card (see AchievementEntry.tsx). Path under /public. */
  image?: string;
};

export const achievements: Achievement[] = [
  {
    id: "university-physics-competition-2025",
    title: "University Physics Competition — Silver Medal",
    category: "competition",
    timeframe: "2025 · 3rd Semester",
    description:
      "Won silver as part of a three-person team at the 2025 University Physics Competition, IUT — with Md Niamul Al Zihan and Shaheen Rahman Dibya, faculty-sponsored by Syed Rifat Raiyan.",
    image: withBasePath("/images/university-physics-competition.jpeg"),
  },
  {
    id: "competitive-programming",
    title: "Competitive Programming",
    category: "competition",
    timeframe: "Ongoing",
    description:
      "Pupil-rated on Codeforces, with 650+ problems solved combined across Codeforces and LeetCode.",
    links: [
      { label: "Codeforces", href: "https://codeforces.com/profile/ans0041" },
      { label: "LeetCode", href: "https://leetcode.com/u/ans0041/" },
    ],
  },
  {
    id: "iut-excellence-award-2026",
    title: "IUT Excellence Award",
    category: "academic",
    timeframe: "2026",
    description:
      "Received the IUT Excellence Award at the Islamic University of Technology's 2026 ceremony, recognizing outstanding academic standing.",
    image: withBasePath("/images/iut-excellence-award.jpeg"),
  },
];
