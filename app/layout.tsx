import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScreenShakeRoot } from "@/components/layout/ScreenShakeRoot";
import "./globals.css";

// Display face — locked per the build plan. next/font/google downloads and
// self-hosts this at build time, so nothing calls out to Google Fonts at
// runtime (satisfies the "no CDN dependency" requirement without hand-rolling
// @font-face + woff2 files).
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Abrar Naguib — Portfolio",
    template: "%s — Abrar Naguib",
  },
  description: "Computer Science & Engineering Undergraduate",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-ink text-paper font-body">
        <ScreenShakeRoot>
          <Nav />
          {/*
            Background illustration — scoped to main only (Nav and Footer
            stay plain), so it lives inside main rather than as a
            viewport-wide layer behind everything. `main` is already
            `relative`; `absolute inset-0` on the image wrapper fills
            exactly main's own rendered box, which — in this flex-column,
            flex-1 layout — is precisely "the screen minus Nav and Footer",
            and grows with it on pages taller than the viewport instead of
            staying pinned while content scrolls past a fixed backdrop.
          */}
          <main className="relative flex-1">
            <div aria-hidden className="absolute inset-0 -z-10">
              <Image
                src="/images/hobekicity.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-ink/55" />
            </div>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ScreenShakeRoot>
      </body>
    </html>
  );
}
