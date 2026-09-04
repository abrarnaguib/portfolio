"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A canvas particle field shaped like a photo, with dots pushed away from
 * the cursor and springing back when it moves on — the reference for this
 * (gazijarin.com's hero) samples a real headshot into a point cloud and
 * repels points near the mouse. Same physics here.
 *
 * The source is `/public/images/portfolio-pic.png` — a real photo,
 * background already removed (a genuine alpha channel, not a white fill),
 * so the exact same alpha-threshold sampling this component always used
 * works unchanged; only *what* gets sampled changed from a procedural
 * placeholder shape to this photo.
 *
 * Each particle renders as one of four small glyphs (star, asterisk,
 * exclamation mark, dot) in one of three colors (red, cyan, and the
 * panel's own grey) — a deliberately different texture from a plain dot
 * field, per the brief. Glyph + color are assigned once per particle at
 * sample time and never change, so the mix reads as a fixed texture
 * rather than flickering per frame.
 *
 * Everything here is a plain canvas + rAF loop, not Framer Motion — the
 * effect is per-particle, frame-by-frame physics driven by live cursor
 * position, which is what canvas/rAF is for; Framer Motion animates
 * *values*, not a few thousand independent points reacting to input.
 */

const PHOTO_SRC = "/images/portfolio-pic.png";

const GRID_SPACING = 5; // px between candidate sample points, before alpha-masking
const GLYPH_SIZE = 7; // px — font size the glyphs render at
const MOUSE_RADIUS = 55; // px — how close the cursor has to be to disturb a particle
const REPEL_STRENGTH = 900; // higher = harder push
const SPRING = 0.06; // pull back toward rest position
const FRICTION = 0.86; // velocity damping per frame
const IDLE_AMPLITUDE = 1.1; // subtle ambient drift when the cursor isn't nearby
const IDLE_SPEED = 0.0016;

const GLYPHS = ["★", "✳", "!", "•"];
// Mirrors --color-thief-red / --color-cyan / --color-smoke in globals.css.
// Canvas fillStyle can't read CSS custom properties directly, so these are
// the same values by hand — keep them in sync if those tokens ever move.
const COLORS = [
  { css: "rgba(220, 31, 46, 0.88)", weight: 0.5 }, // thief-red
  { css: "rgba(46, 224, 232, 0.85)", weight: 0.3 }, // cyan
  { css: "rgba(138, 129, 120, 0.85)", weight: 0.2 }, // smoke (the panel system's own grey)
];

function pickColor(): string {
  const r = Math.random();
  let acc = 0;
  for (const c of COLORS) {
    acc += c.weight;
    if (r < acc) return c.css;
  }
  return COLORS[0].css;
}

function pickGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

type Particle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
  glyph: string;
  color: string;
};

// Loaded once and cached at module scope — every mount (including a
// remount from client-side navigation back to "/") reuses the same
// decoded image instead of re-fetching it.
let cachedImage: HTMLImageElement | null = null;
let cachedImagePromise: Promise<HTMLImageElement> | null = null;

function loadPortraitImage(): Promise<HTMLImageElement> {
  if (cachedImage) return Promise.resolve(cachedImage);
  if (!cachedImagePromise) {
    cachedImagePromise = new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        cachedImage = img;
        resolve(img);
      };
      img.onerror = reject;
      img.src = PHOTO_SRC;
    });
  }
  return cachedImagePromise;
}

/** Draws `img` onto a `targetW`x`targetH` canvas with `object-fit: cover`
 *  framing — scaled up/cropped to fill the box exactly, same as the CSS
 *  property, so the sampled particles match what an <img> with the same
 *  treatment would visually show rather than a squashed/stretched photo. */
function drawCoverFitted(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  targetW: number,
  targetH: number
) {
  const imgRatio = img.width / img.height;
  const targetRatio = targetW / targetH;
  let drawW: number, drawH: number, offsetX: number, offsetY: number;
  if (imgRatio > targetRatio) {
    drawH = targetH;
    drawW = targetH * imgRatio;
    offsetX = (targetW - drawW) / 2;
    offsetY = 0;
  } else {
    drawW = targetW;
    drawH = targetW / imgRatio;
    offsetX = 0;
    offsetY = (targetH - drawH) / 2;
  }
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

export function ParticlePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let width = 0;
    let height = 0;
    let cancelled = false;

    // Both dimensions MUST be integers before they touch any canvas pixel
    // buffer. `getBoundingClientRect()` routinely returns fractional
    // widths (e.g. 312.796875), but assigning that straight to
    // `canvas.width` silently truncates it to an integer (the HTML spec
    // coerces the property via ToUint32) — the canvas's *real* row stride
    // ends up as that truncated integer, not the float. Indexing into
    // `ImageData` with the untruncated float (`y * cssW + x`) then drifts
    // further off the true row boundary as `y` grows, tearing the image
    // into horizontal bands. Rounding once and threading that same
    // integer through sampling and both canvases' buffer sizes keeps
    // every stride calculation here agreeing with the real buffer.
    function sampleParticles(cssW: number, cssH: number, img: HTMLImageElement) {
      const offscreen = document.createElement("canvas");
      offscreen.width = cssW;
      offscreen.height = cssH;
      const octx = offscreen.getContext("2d");
      if (!octx) return [];
      octx.clearRect(0, 0, cssW, cssH);
      drawCoverFitted(octx, img, cssW, cssH);
      const { data } = octx.getImageData(0, 0, cssW, cssH);

      const next: Particle[] = [];
      for (let y = 0; y < cssH; y += GRID_SPACING) {
        for (let x = 0; x < cssW; x += GRID_SPACING) {
          const alpha = data[(y * cssW + x) * 4 + 3];
          if (alpha > 128) {
            next.push({
              baseX: x,
              baseY: y,
              x,
              y,
              vx: 0,
              vy: 0,
              seed: Math.random() * Math.PI * 2,
              glyph: pickGlyph(),
              color: pickColor(),
            });
          }
        }
      }
      return next;
    }

    function setup(img: HTMLImageElement) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = sampleParticles(width, height, img);
      drawStatic();
    }

    function drawStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${GLYPH_SIZE}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.fillText(p.glyph, p.baseX, p.baseY);
      }
    }

    function tick(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${GLYPH_SIZE}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const p of particles) {
        const idleX = Math.sin(time * IDLE_SPEED + p.seed) * IDLE_AMPLITUDE;
        const idleY = Math.cos(time * IDLE_SPEED * 0.8 + p.seed) * IDLE_AMPLITUDE;
        const targetX = p.baseX + idleX;
        const targetY = p.baseY + idleY;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPEL_STRENGTH;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.0025;
          p.vy += Math.sin(angle) * force * 0.0025;
        }

        p.vx += (targetX - p.x) * SPRING;
        p.vy += (targetY - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.fillText(p.glyph, p.x, p.y);
      }
      raf = requestAnimationFrame(tick);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function handleResize(img: HTMLImageElement) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (raf) cancelAnimationFrame(raf);
        setup(img);
        if (!reduceMotion) raf = requestAnimationFrame(tick);
      }, 150);
    }

    let onResize: (() => void) | null = null;

    loadPortraitImage().then((img) => {
      if (cancelled) return;
      setup(img);

      if (!reduceMotion) {
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        raf = requestAnimationFrame(tick);
      }

      onResize = () => handleResize(img);
      window.addEventListener("resize", onResize);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="block h-full w-full"
    />
  );
}
