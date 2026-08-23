import { Mail, Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import { personal } from "@/app/data/resume";

const DETAILS = [
  { icon: Mail, label: personal.email, href: `mailto:${personal.email}` },
  { icon: Phone, label: personal.phone, href: `tel:${personal.phone.replace(/\s+/g, "")}` },
  { icon: MapPin, label: personal.location, href: undefined },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border">
      <Container>
        <SectionTitle
          index="07"
          label="Contact"
          title="Let's build something that has to work"
          description="Open to full-time opportunities and select freelance work. If you have a project or role in mind, I'd be happy to hear about it."
        />

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            {DETAILS.map((d) => {
              const content = (
                <div className="flex my-5 items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-signal/50">
                  <d.icon size={16} className="text-signal" />
                  <span className="text-sm">{d.label}</span>
                </div>
              );
              return d.href ? (
                <a key={d.label} href={d.href}>
                  {content}
                </a>
              ) : (
                <div key={d.label}>{content}</div>
              );
            })}

            <div className="flex gap-3 pt-2">
              <a
                href={personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted hover:border-signal hover:text-signal transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted hover:border-signal hover:text-signal transition-colors"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
