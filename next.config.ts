import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/basePath";

// Static export — GitHub Pages (the eventual host, per the build plan §9)
// serves flat files with no Node server behind it, so `next build` has to
// produce a fully static `out/` directory rather than relying on
// server-rendering at request time. Turned on now (Phase 6, local
// verification) rather than waiting for Phase 8's actual deploy, so any
// export-only issue (a route that can't be statically rendered, next/image
// needing its optimizer server, etc.) surfaces while there's no live URL
// riding on it yet.
// GitHub Pages serves this as a project site at
// https://<user>.github.io/portfolio/, not the domain root, so every
// generated path (JS/CSS chunks, next/link hrefs) needs the "/portfolio"
// prefix baked in or the deployed site 404s on everything but the
// homepage. (next/image string srcs and any hand-written "/..." path still
// need BASE_PATH prepended by hand — see lib/basePath.ts.)
const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  // next/image's built-in optimizer resizes/re-encodes images through a
  // server route — there is no server in a static export, so every image
  // has to ship as-is instead.
  images: { unoptimized: true },
};

export default nextConfig;
