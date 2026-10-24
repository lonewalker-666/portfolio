import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowDown, ArrowUpRight, Bot, FileText, FlaskConical, Mail, PenTool, Sparkle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { CUTOUTS, aiAsset } from "../_content/assets";
import { about, aiSkills, contact, crew, experience, hero, marquee, services, skills, stats, work, type CrewKey } from "../_content/content";
import Mock from "./Mock";
import ThemeSwitch from "./ThemeSwitch";

const indian = new Intl.NumberFormat("en-IN");

const CREW_ICONS: Record<CrewKey, typeof Bot> = { figma: PenTool, claude: Bot, playwright: FlaskConical, grafana: Activity };
const CREW_GLOW: Record<CrewKey, string> = {
  figma: "rgba(162,89,255,0.55)",
  claude: "rgba(255,106,38,0.55)",
  playwright: "rgba(45,173,90,0.55)",
  grafana: "rgba(255,170,40,0.55)",
};

export function TopBar() {
  return (
    <header className="sx-bar">
      <div className="sx-wrap sx-bar__inner">
        <a className="sx-brand" href="#top" aria-label="Back to top">
          KK<span>.</span>
        </a>
        <nav className="sx-nav" aria-label="Sections">
          <a href="#about">About</a>
          <a href="#ai">Crew</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
        </nav>
        <div className="sx-bar__actions">
          <ThemeSwitch />
          <a className="sx-btn sx-btn--accent" href="#contact">
            Let&apos;s talk
          </a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  const scene = aiAsset("hero-desk");
  return (
    <section id="top" className="sx-hero" aria-labelledby="sx-hero-title">
      {scene ? (
        <div className="sx-hero__scene">
          <Image src={scene} alt="" fill preload sizes="100vw" />
        </div>
      ) : (
        <div className="sx-hero__grain" aria-hidden="true" />
      )}
      <div className="sx-hero__giant" aria-hidden="true">
        <span className="sx-in">{hero.giant}</span>
      </div>
      {scene ? null : (
        <div className="sx-hero__person">
          <div className="sx-in">
            <Image src={CUTOUTS.blazer.src} alt={CUTOUTS.blazer.alt} fill preload sizes="(max-width: 767px) 92vw, 620px" />
          </div>
        </div>
      )}
      <div className="sx-float sx-float--a">
        <p className="sx-in">{hero.cardA}</p>
      </div>
      <div className="sx-float sx-float--b">
        <p className="sx-in">
          <span className="sx-float__dot" aria-hidden="true" />
          {hero.cardB[0]}
          <small>{hero.cardB[1]}</small>
        </p>
      </div>
      <div className="sx-hero__content sx-wrap">
        <div className="sx-hero__low">
          <div>
            <h1 id="sx-hero-title">
              <span className="sx-hero__name">
                {hero.giant} {hero.rest}
              </span>
              <span className="sx-hero__role">{hero.role} · Payments, SaaS and AI</span>
            </h1>
            <ul className="sx-tags">
              {hero.tags.map((tag) => (
                <li key={tag} className="sx-tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="sx-hero__ctas">
            <a className="sx-btn sx-btn--solid" href="#work">
              View work <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className="sx-btn" href="#contact">
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>
      <span className="sx-scroll-cue" aria-hidden="true" />
    </section>
  );
}

export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <section className="sx-marquee" aria-label="What I work on">
      {["a", "b"].map((band) => (
        <div key={band} className={`sx-band__wrap sx-band__wrap--${band}`} aria-hidden={band === "b" ? "true" : undefined}>
          <div className="sx-band">
            {items.map((item, i) => (
              <span key={`${item}-${i}`}>
                {item}
                <Sparkle size={36} aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function About() {
  const photo = aiAsset("about-workspace");
  return (
    <section id="about" className="sx-about" aria-labelledby="sx-about-title">
      <div className="sx-wrap sx-about__grid">
        <div className={`sx-photo${photo ? "" : " sx-photo--cutout"}`}>
          <Image
            src={photo ?? CUTOUTS.navy.src}
            alt={photo ? "Kishore at a standing desk in a home studio at night." : CUTOUTS.navy.alt}
            fill
            sizes="(max-width: 1023px) 380px, 420px"
          />
          <span className="sx-photo__badge sx-photo__badge--1">{about.badges[0]}</span>
          <span className="sx-photo__badge sx-photo__badge--2">{about.badges[1]}</span>
        </div>
        <div>
          <p className="sx-eyebrow">Who I am</p>
          <h2 id="sx-about-title" className="sx-title" style={{ marginTop: 12 }}>
            About
          </h2>
          <ul className="sx-labels">
            {about.labels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
          <p className="sx-reveal">
            {about.text.split(" ").map((word, i) => (
              <span key={i} className="w">
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="sx-stats" aria-label="Numbers from the work">
      <div className="sx-wrap">
        <dl className="sx-stats__grid">
          {stats.map((stat) => (
            <div key={stat.label} className="sx-stat">
              <dt className="sx-stat__label" style={{ marginTop: 0, order: 2 }}>
                {stat.label}
              </dt>
              <dd
                className="sx-stat__value"
                data-value={stat.value}
                data-prefix={stat.prefix}
                data-suffix={stat.suffix}
              >
                {stat.prefix}
                {indian.format(stat.value)}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Crew() {
  return (
    <section id="ai" className="sx-crew" aria-labelledby="sx-crew-title">
      <div className="sx-wrap">
        <div className="sx-crew__head">
          <div>
            <p className="sx-eyebrow">End-to-end toolchain</p>
            <h2 id="sx-crew-title" className="sx-title" style={{ marginTop: 12 }}>
              Meet my AI crew
            </h2>
          </div>
          <p>The crew I ship with, from the first design to production monitoring: design, build, test and observe.</p>
        </div>
        <ul className="sx-crew__grid">
          {crew.map((member) => {
            const art = aiAsset(`ai-crew-${member.key}`);
            const Icon = CREW_ICONS[member.key];
            return (
              <li key={member.key} className="sx-bot">
                <div className="sx-bot__art" style={{ ["--glow" as string]: CREW_GLOW[member.key] }}>
                  {art ? (
                    <Image src={art} alt="" fill sizes="(max-width: 767px) 92vw, 300px" />
                  ) : (
                    <span className="sx-bot__orb">
                      <Icon size={56} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  )}
                </div>
                <div className="sx-bot__body">
                  <p className="sx-bot__role">{member.role}</p>
                  <h3>{member.name}</h3>
                  <p>{member.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="sx-services" aria-labelledby="sx-services-title">
      <div className="sx-wrap">
        <p className="sx-eyebrow">Services</p>
        <h2 id="sx-services-title" className="sx-title" style={{ marginTop: 12 }}>
          What I can build for you
        </h2>
        <ol className="sx-services__list">
          {services.map((service, i) => (
            <li key={service.title} className="sx-svc">
              <span className="sx-svc__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ArrowUpRight size={28} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className="sx-work" aria-labelledby="sx-work-title">
      <div className="sx-wrap">
        <div className="sx-work__head">
          <div>
            <p className="sx-eyebrow">Featured work</p>
            <h2 id="sx-work-title" className="sx-title" style={{ marginTop: 12 }}>
              Built and shipped
            </h2>
          </div>
          <Link href="/#projects">All projects on the full portfolio</Link>
        </div>
        {work.map((project, i) => (
          <article key={project.title} className="sx-panel" aria-labelledby={`sx-work-${i}`}>
            <span className="sx-panel__index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="sx-panel__cat">{project.category}</span>
              <h3 id={`sx-work-${i}`}>{project.title}</h3>
              <p>{project.text}</p>
              <p className="sx-panel__metric">{project.metric}</p>
              <ul className="sx-panel__stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Mock kind={project.mock} />
            <span className="sx-panel__shade" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="sx-exp" aria-labelledby="sx-exp-title">
      <span className="sx-exp__ghost" aria-hidden="true">
        Experience · Experience
      </span>
      <div className="sx-wrap">
        <p className="sx-eyebrow">Experience</p>
        <h2 id="sx-exp-title" className="sx-title" style={{ marginTop: 12 }}>
          Where I&apos;ve worked
        </h2>
        <ol className="sx-exp__list">
          <li aria-hidden="true" className="sx-exp__line" />
          {experience.map((job) => (
            <li key={job.company} className="sx-job">
              <span className="sx-job__year">{job.year}</span>
              <div>
                <h3>
                  {job.role}, {job.company}
                </h3>
                <p className="sx-job__meta">{job.dates}</p>
              </div>
              <p>{job.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="sx-skills" aria-labelledby="sx-skills-title">
      <div className="sx-wrap" style={{ textAlign: "center" }}>
        <p className="sx-eyebrow">Skills</p>
        <h2 id="sx-skills-title" className="sx-title" style={{ marginTop: 12 }}>
          The toolkit
        </h2>
        <ul className="sx-skills__cloud">
          {skills.map((skill, i) => (
            <li
              key={skill}
              className={`sx-chip ${aiSkills.has(skill) ? "sx-chip--ai" : `sx-chip--${i % 4}`}`}
              style={{ ["--r" as string]: `${((i * 37) % 9) - 4}deg` }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Finale() {
  const scene = aiAsset("impact-scene");
  return (
    <section id="contact" className="sx-finale" aria-labelledby="sx-contact-title">
      {scene ? (
        <div className="sx-finale__scene">
          <Image src={scene} alt="" fill sizes="100vw" />
        </div>
      ) : null}
      <span className="sx-finale__ghost" aria-hidden="true">
        Let&apos;s talk
      </span>
      {scene ? null : (
        <div className="sx-finale__person">
          <Image src={CUTOUTS.navy.src} alt="" fill sizes="(max-width: 1023px) 70vw, 520px" />
        </div>
      )}
      <div className="sx-wrap sx-finale__inner">
        <div className="sx-finale__copy" data-rise>
          <p className="sx-eyebrow">Contact</p>
          <h2 id="sx-contact-title" style={{ marginTop: 12 }}>
            {contact.heading}
          </h2>
          <p>{contact.text}</p>
          <div className="sx-finale__links">
            <a className="sx-btn sx-btn--accent" href={`mailto:${contact.email}`}>
              <Mail size={18} aria-hidden="true" /> Email me
            </a>
            <a className="sx-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon width={18} height={18} aria-hidden="true" /> LinkedIn
            </a>
            <a className="sx-btn" href={contact.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon width={18} height={18} aria-hidden="true" /> GitHub
            </a>
            <a className="sx-btn" href={contact.resume}>
              <FileText size={18} aria-hidden="true" /> Resume (PDF)
            </a>
          </div>
        </div>
        <div className="sx-form" data-rise>
          <p>{contact.formIntro}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
