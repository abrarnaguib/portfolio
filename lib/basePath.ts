// Single source of truth for the GitHub Pages project-site prefix
// (https://<user>.github.io/portfolio/, not the domain root).
//
// Next's `basePath` config (next.config.ts) auto-prepends this for
// next/link hrefs and for statically-imported images, but NOT for
// next/image given a plain string `src` — confirmed against the built
// output: with `images.unoptimized: true`, the emitted <img> keeps the
// bare "/images/..." path. Any hand-written "/..." URL (content data,
// manual <img>, raw `Image()` loads) needs this prepended explicitly.
export const BASE_PATH = "/portfolio";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
