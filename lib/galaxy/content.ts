import { education, experience, personal, projects } from "@/app/data/resume";

export const interfaceCopy = {
  contact: "Contact me",
  kicker: "A message from Earth",
  greeting: "Hello fellow galaxy member",
  aboutTitle: "About me",
  projectsTitle: "My projects",
  skillsTitle: "My skills",
  skillsSubtitle: "Here is a list of some of my skills",
  experienceTitle: "My work experience",
  clickToOpen: ["Click", "To open"] as const,
  press: "Press",
  scroll: "Scroll",
  swipe: "Swipe",
};

function firstSentences(text: string, maxLength: number) {
  const sentences = text.match(/[\s\S]*?[.!?](?=\s+[A-Z]|\s*$)\s*/g) ?? [text];
  let result = "";
  for (const sentence of sentences) {
    if (result && (result + sentence).length > maxLength) break;
    result += sentence;
  }
  return result.trim();
}

const summary = personal.summary.replace("4+ years", "nearly 5 years");

export const intro = {
  firstName: personal.name.split(" ")[0],
  role: personal.role,
  about: firstSentences(summary, 340),
};

export const about = {
  role: personal.role,
  facts: [personal.location, "Nearly 5 years in production"],
  summary,
  status: personal.status,
  education: education.map((item) => `${item.degree} · ${item.institution} · ${item.duration}`),
};

export type GalaxyProject = {
  title: string;
  description: string;
  metric?: string;
  stack: string[];
  github?: string;
  demo?: string;
};

export const galaxyProjects: GalaxyProject[] = projects.map((project) => ({
  title: project.title,
  description: project.description,
  metric: project.metric,
  stack: project.stack.slice(0, 6),
  github: project.github,
  demo: project.demo,
}));

export type GalaxyExperience = {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
};

export const galaxyExperience: GalaxyExperience[] = experience.map((entry) => ({
  company: entry.company,
  role: entry.role,
  duration: entry.duration,
  location: entry.location,
  highlights: entry.description,
}));

const FEATURED_SKILLS = [
  "TypeScript",
  "JavaScript (ES6+)",
  "Python",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "AWS",
  "Azure",
  "LLM Integration",
  "RAG",
  "Agno",
];

export const featuredSkills = FEATURED_SKILLS.map((skill) =>
  skill === "JavaScript (ES6+)" ? "JavaScript" : skill,
);

export const socialLinks = [
  { id: "github", label: "GitHub", href: personal.links.github },
  { id: "linkedin", label: "LinkedIn", href: personal.links.linkedin },
  { id: "email", label: "Email", href: `mailto:${personal.email}` },
  { id: "resume", label: "Resume", href: "/resume.pdf" },
] as const;

export type SocialId = (typeof socialLinks)[number]["id"];
