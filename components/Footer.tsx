import { Download, Mail, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Container from "@/components/Container";
import { personal } from "@/app/data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <a href="#hero" className="flex items-center gap-2 font-display font-semibold">
          <Terminal size={16} className="text-signal" />
          <span>KK/</span>
        </a>

        <div className="flex items-center gap-4 text-muted">
          <a href={personal.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-signal transition-colors">
            <GithubIcon className="h-4 w-4" />
          </a>
          <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-signal transition-colors">
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a href={`mailto:${personal.email}`} aria-label="Email" className="hover:text-signal transition-colors">
            <Mail size={16} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs hover:text-signal transition-colors"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {personal.name}
        </p>
      </Container>
    </footer>
  );
}
