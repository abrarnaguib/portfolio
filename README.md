# Portfolio

A personal portfolio site — projects, academic achievements, and skills — built with a Persona 5–inspired visual and motion language: diagonal wipes, cut-corner panels, and kinetic typography.

**Live site:** https://abrarnaguib.github.io/portfolio/

## Stack

- [Next.js](https://nextjs.org) (App Router, static export)
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Build

```bash
npm run build
```

Produces a static export in `out/` — the same build GitHub Actions runs and deploys to Pages on every push to `main` (see `.github/workflows/deploy.yml`).

## Content

Projects, achievements, skills, contact links, and education history each live in their own typed data file under `content/`. Adding an entry is editing that file, not the page components — see the files in `content/` for the shape each one expects.

## Disclaimer

Claude Code (Anthropic) was used extensively throughout this project's planning, scaffolding, and implementation, working under my direction and review at every step.
