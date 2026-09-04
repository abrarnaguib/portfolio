"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TabLink } from "@/components/ui/TabLink";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-smoke/20">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between gap-6 flex-wrap">
        <Link
          href="/"
          className="font-display text-xl uppercase tracking-wide text-paper"
        >
          Abrar Naguib
        </Link>

        <nav className="flex items-center gap-3 flex-wrap">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <TabLink
                key={href}
                href={href}
                active={isActive}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </TabLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
