import { contactChannels } from "@/content/contact";

export function Footer() {
  return (
    <footer className="border-t border-smoke/20 mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-8 flex items-center justify-between gap-6 flex-wrap text-sm">
        <p className="text-smoke">
          © {new Date().getFullYear()} Abrar Naguib. Built with Next.js.
        </p>
        <div className="flex items-center gap-5">
          {contactChannels.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-smoke hover:text-thief-red-text transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
