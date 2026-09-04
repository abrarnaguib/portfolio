"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type TabLinkProps = ComponentProps<typeof Link> & {
  /** Permanently filled + swaying, not just on hover (e.g. the current route). */
  active?: boolean;
  size?: "sm" | "lg";
};

// next/link's <Link> parses `[...]` in an href as dynamic-route syntax and
// throws — even for an absolute external URL — which collides with the
// site's bracketed placeholder convention (e.g. "https://github.com/[your-
// handle]"). External destinations don't want Next's client-side routing or
// prefetch anyway, so they get a plain <a> instead; only internal hrefs go
// through <Link>.
function isExternalHref(href: TabLinkProps["href"]): boolean {
  return (
    typeof href === "string" &&
    (/^[a-z][a-z0-9+.-]*:\/\//i.test(href) ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:"))
  );
}

export function TabLink({
  active = false,
  size = "sm",
  className = "",
  children,
  href,
  ...rest
}: TabLinkProps) {
  const textSize = size === "lg" ? "text-2xl" : "text-lg";
  const pad = size === "lg" ? "px-6 py-3" : "px-4 py-2.5";
  const wrapperClassName = `group relative inline-block ${pad} ${className}`;

  const layers: ReactNode = (
    <>
      <span
        aria-hidden
        className={`tab-fill tab-fill-white tab-fill-reverse absolute inset-0 bg-paper ${active ? "is-active" : ""}`}
      />
      <span
        aria-hidden
        className={`tab-fill tab-fill-red absolute inset-0 bg-thief-red ${active ? "is-active" : ""}`}
      />
      <span
        className={`relative font-display ${textSize} uppercase tracking-wide transition-colors duration-200 ${
          active ? "text-ink" : "text-paper group-hover:text-ink group-focus-visible:text-ink"
        }`}
      >
        {children}
      </span>
    </>
  );

  if (isExternalHref(href)) {
    const isHttp = typeof href === "string" && href.startsWith("http");
    return (
      <a
        href={href as string}
        className={wrapperClassName}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {layers}
      </a>
    );
  }

  return (
    <Link {...rest} href={href} className={wrapperClassName}>
      {layers}
    </Link>
  );
}
