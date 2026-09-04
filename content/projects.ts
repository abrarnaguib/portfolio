export type ProjectStatus = "shipped" | "in-progress" | "archived";

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  /** One-liner for the card. */
  summary: string;
  role: string;
  stack: string[];
  /** e.g. "Spring 2026" — free text, not a Date, since precision doesn't matter here. */
  timeframe: string;
  links: { label: string; href: string }[];
  /** Long-form case-study copy for the detail page. Optional — not every entry needs one. */
  body?: string;
  /**
   * Standout technical points worth their own callout instead of being
   * folded into the body prose — rendered as their own small Panels on
   * the detail page (see ProjectDetail.tsx). Optional, same reasoning as
   * `body`: not every project has something that earns a dedicated
   * highlight.
   */
  highlights?: { title: string; description: string }[];
  /** Surfaces in the top row on /projects; false just means further down the same grid. */
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "dynamics-engine",
    title: "Dynamics Engine",
    status: "in-progress",
    summary:
      "An N-pendulum chain simulator with real Lagrangian mechanics, built in JavaFX — grab, fling, and scrub through up to 60 coupled pendulums in real time.",
    role: "Programmer, UI/UX Designer",
    stack: ["Java", "JavaFX", "Maven", "FXML"],
    timeframe: "4th Semester",
    links: [
      { label: "GitHub", href: "https://github.com/Neuromancer3301/Dynamics-Engine" },
    ],
    body: "A university Visual Programming project that went well past the assignment brief: a chain of up to 60 pendulums, simulated with genuine Lagrangian mechanics rather than a simplified textbook model, that you can grab a bob from and fling mid-simulation. Three swappable integrators (RK4, Symplectic Euler, Velocity Verlet) sit behind the same scene so their behavior can be compared directly, and a butterfly-effect mode runs fifty near-identical pendulum chains side by side to make chaotic divergence visible instead of theoretical. A roughly 30-second scrub-back buffer means a missed moment doesn't mean restarting the whole simulation.",
    highlights: [
      {
        title: "Physics you can trust",
        description:
          "Real mass-matrix coupling, not a simplified approximation — energy drift stays under 0.5% across 10 simulated seconds, verified against a 28-test suite checked against closed-form solutions.",
      },
      {
        title: "A real-time viewport",
        description:
          "A fixed 2ms physics thread hands off immutable state snapshots to the JavaFX render thread lock-free, so the viewport stays at ~60fps and never blocks on the simulation — direct GraphicsContext drawing across six graph modes, including phase portraits and Poincaré sections.",
      },
      {
        title: "Built to be used, not just demoed",
        description:
          "Light/dark theming, colorblind-safe palettes, and a reduced-motion mode ship alongside the simulation itself — accessibility as part of the engine, not an afterthought bolted on.",
      },
    ],
    featured: true,
  },
  {
    slug: "project-amta",
    title: "Project AMTA",
    status: "archived",
    summary:
      "A wholesale order-management system connecting retailers and dealers, built around a hand-rolled inverted-index search engine and a custom file-based database.",
    role: "Programmer, UI/UX Designer",
    stack: ["C++", "CMake", "Dear ImGui"],
    timeframe: "3rd Semester",
    links: [
      { label: "GitHub", href: "https://github.com/abrarnaguib/Project-AMTA" },
    ],
    body: "A retailer/dealer order-management system covering the full loop: role-based accounts for retailers, dealers, and admins; a dealer-managed product catalog with stock tracking; a multi-step order workflow (pending → accepted or rejected → completed); and a review system once an order closes. None of it leans on an off-the-shelf database or search library — both were built from scratch specifically to understand what those tools are actually doing underneath.",
    highlights: [
      {
        title: "A search engine, not a filter",
        description:
          "A dedicated SearchEngine class backed by a hand-built inverted index — tokenized product search with filtering, the same core structure a real search engine uses, built to understand it rather than import it.",
      },
      {
        title: "A database with no DBMS",
        description:
          "Users, products, orders, and notifications persist through a custom file-based store with its own serialization — no SQLite, no external engine, just a from-scratch answer to \"how would you actually store this.\"",
      },
    ],
    featured: true,
  },
  {
    slug: "raycast-arcade",
    title: "Raycast Arcade",
    status: "archived",
    summary:
      "A raycasting engine rendering a 3D level from a 2D map in C, wrapped around a small bundle of arcade mini-games.",
    role: "Programmer, Level Designer",
    stack: ["C", "Raylib", "GLFW", "CMake"],
    timeframe: "2nd Semester",
    links: [
      { label: "GitHub", href: "https://github.com/abrarnaguib/AnotherTSAPP_TEST" },
    ],
    body: "A hand-rolled raycaster — the classic technique of projecting a 2D map into a first-person 3D view, the same family of trick that powered early first-person games — built in C with Raylib, then used as the rendering backbone for a small collection of bundled mini-games (a rhythm mode, a snake-style puzzle, a spaceship mode, and a roulette game) sharing one engine and one level board.",
    highlights: [
      {
        title: "Raycasting from scratch",
        description:
          "A 2D map projected into a real-time 3D level board, built without a 3D graphics library doing the heavy lifting — the raycaster itself is the renderer.",
      },
      {
        title: "One engine, several games",
        description:
          "Four distinct mini-games (rhythm, puzzle, space, roulette) built on the same shared rendering and level board, rather than four separate one-off demos.",
      },
    ],
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getOtherProjects(): Project[] {
  return projects.filter((p) => !p.featured);
}
