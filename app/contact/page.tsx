import type { Metadata } from "next";
import { ContactLink } from "@/components/contact/ContactLink";
import { SectionTab } from "@/components/ui/SectionTab";
import { contactChannels } from "@/content/contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionTab>Contact</SectionTab>
      <p className="max-w-prose text-paper/90 mb-8">
        Best way to reach me is email — GitHub and LinkedIn below too.
      </p>
      <div className="flex flex-wrap gap-4">
        {contactChannels.map((channel) => (
          <ContactLink key={channel.label} channel={channel} />
        ))}
      </div>
    </div>
  );
}
