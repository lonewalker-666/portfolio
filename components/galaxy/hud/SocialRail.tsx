import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { socialLinks, type SocialId } from "@/lib/galaxy/content";
import { MailGlyph, ResumeGlyph } from "./glyphs";

const VARIANTS: Record<SocialId, string> = {
  github: "g-social__link--bare",
  email: "g-social__link--rounded",
  linkedin: "",
  resume: "g-social__link--round",
};

function Glyph({ id }: { id: SocialId }) {
  if (id === "github") return <GithubIcon aria-hidden="true" />;
  if (id === "linkedin") return <LinkedinIcon aria-hidden="true" />;
  if (id === "email") return <MailGlyph />;
  return <ResumeGlyph />;
}

export default function SocialRail() {
  return (
    <ul className="g-social" aria-label="Social links">
      {socialLinks.map((link) => {
        const external = link.href.startsWith("http");
        return (
          <li key={link.id}>
            <a
              className={`g-social__link ${VARIANTS[link.id]}`}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <Glyph id={link.id} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
