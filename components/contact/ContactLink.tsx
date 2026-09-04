import { TabLink } from "@/components/ui/TabLink";
import type { ContactChannel } from "@/content/contact";

export function ContactLink({ channel }: { channel: ContactChannel }) {
  return (
    <TabLink href={channel.href} size="lg">
      {channel.label}
    </TabLink>
  );
}
