export type ContactChannel = {
  label: string;
  href: string;
};

// Single source of truth for contact links — read by both the footer
// (every page) and the /contact page itself, so there's one place to swap
// in real details during the Phase 7 content pass.
export const contactChannels: ContactChannel[] = [
  { label: "Email", href: "mailto:abrarnaguib@gmail.com" },
  { label: "GitHub", href: "https://github.com/abrarnaguib" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abrar-naguib-192a84265/" },
];
