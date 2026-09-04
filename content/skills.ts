export type SkillGroupData = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroupData[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["C", "C++", "Java", "Python", "PostgreSQL"],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    items: ["CMake", "Raylib", "Dear ImGui", "OpenGL", "JavaFX"],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    items: ["VS Code", "Godot"],
  },
];
