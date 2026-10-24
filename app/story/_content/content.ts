import { personal } from "@/app/data/resume";

export const hero = {
  giant: "Kishore",
  rest: "Kumar R",
  role: "Full-Stack Developer",
  tags: ["Full-Stack", "Payments", "SaaS", "AI & RAG"],
  cardA: "Designing reliable payment, SaaS and AI systems, from architecture to deployment.",
  cardB: ["Available for full-time & freelance", `${personal.location} · Remote`],
};

export const marquee = ["Full-Stack", "Payments", "SaaS Platforms", "AI Agents", "RAG", "Claude Code", "Vision + Voice", "Data & Reports"];

export const about = {
  labels: ["Full-stack", "Payments", "SaaS", "AI", "Cloud"],
  text: "I'm a full-stack developer with nearly 5 years of building backend-heavy, revenue-critical systems: payments, multi-tenant SaaS, logistics and e-learning. These days a lot of it ships with AI: RAG, vision and voice models, and Claude Code in my daily workflow.",
  badges: [personal.location, "Nearly 5 years"],
};

export const stats = [
  { value: 100, prefix: "", suffix: "+", label: "Operations staff using my FR8 tools every day" },
  { value: 500, prefix: "", suffix: "+", label: "Daily transactions on the Right 2 Pay platform" },
  { value: 80, prefix: "~", suffix: "%", label: "Faster video publishing at Mynerva" },
  { value: 10000, prefix: "", suffix: "+", label: "Payment records migrated, zero lost" },
];

export type CrewKey = "figma" | "claude" | "playwright" | "grafana";

export const crew: { key: CrewKey; name: string; role: string; text: string }[] = [
  {
    key: "figma",
    name: "Figma",
    role: "Design",
    text: "Screens, flows and prototypes agreed before a line of code is written.",
  },
  {
    key: "claude",
    name: "Claude Code",
    role: "Build",
    text: "AI pair engineer in my daily workflow: faster delivery, same code review discipline.",
  },
  {
    key: "playwright",
    name: "Playwright",
    role: "Test",
    text: "End-to-end browser tests that click through real user journeys before every release.",
  },
  {
    key: "grafana",
    name: "Grafana",
    role: "Observe",
    text: "Dashboards and alerts that show how production is doing, before users notice.",
  },
];

export const services = [
  { title: "Full-stack web apps", text: "React and Next.js front ends on Node.js back ends, from first commit to production." },
  { title: "Payments & fintech", text: "Payment flows built around idempotency, retries and reconciliation: UPI, AEPS, BBPS and DMT." },
  { title: "SaaS & multi-tenant platforms", text: "Tenant isolation, role-based access and white-label setups that onboard clients without code changes." },
  { title: "AI integration", text: "LLMs, RAG, and vision and voice models wired into real products, not just demos." },
  { title: "AI data analysis & reports", text: "Turning raw business data into analysis and generated reports people actually read." },
  { title: "Cloud & delivery", text: "Deployment on AWS and Azure with CI/CD, so releases stay boring." },
];

export type MockKind = "media" | "ledger" | "tenants" | "fleet";

export const work: {
  title: string;
  category: string;
  text: string;
  metric: string;
  stack: string[];
  mock: MockKind;
}[] = [
  {
    title: "Mynerva EdTech Platform",
    category: "EdTech",
    text: "Microservices e-learning platform covering courses, creators, monetisation, analytics, streaming and payments.",
    metric: "~80% faster video publishing",
    stack: ["Node.js", "React", "AWS", "MediaConvert", "HLS"],
    mock: "media",
  },
  {
    title: "Right 2 Pay Fintech Platform",
    category: "Fintech",
    text: "Low-bandwidth payment PWA for UPI, AEPS, BBPS and DMT, built from scratch as the sole full-stack developer.",
    metric: "500+ daily transactions on the platform",
    stack: ["Node.js", "Python", "PostgreSQL", "NPCI APIs"],
    mock: "ledger",
  },
  {
    title: "Multi-Tenant SaaS LMS",
    category: "SaaS",
    text: "One platform for music academies, tuition centres and karate classes: clients, staff, payments, payroll and attendance.",
    metric: "3 business domains, one codebase",
    stack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    mock: "tenants",
  },
  {
    title: "FR8 Logistics Platform",
    category: "Logistics",
    text: "A logistics freight application with load assignment, order matching and live driver workflows on web and mobile, plus internal HRM tools.",
    metric: "Load assignment, order matching and HRM in one platform",
    stack: ["React", "React Native", "Node.js"],
    mock: "fleet",
  },
];

export const experience = [
  {
    year: "2026",
    role: "Full-Stack Developer",
    company: "Freelance",
    dates: "May 2026 – Present",
    text: "A college application platform with payments, digital signage for HilightMedia, and a SaaS LMS for academies.",
  },
  {
    year: "2023",
    role: "Senior Software Engineer",
    company: "Mynerva",
    dates: "Jul 2023 – Apr 2026",
    text: "Owned an e-learning platform end to end: ~80% faster video publishing and a payment migration with zero data loss across 10,000+ records.",
  },
  {
    year: "2023",
    role: "Software Developer",
    company: "Right 2 Pay",
    dates: "Jan 2023 – Aug 2023",
    text: "Sole full-stack developer of a fintech payment platform built from scratch; cut manual reconciliation overhead by ~70%.",
  },
  {
    year: "2022",
    role: "Software Developer",
    company: "FR8",
    dates: "Mar 2022 – Nov 2022",
    text: "A logistics freight application: load assignment and order-matching workflows, plus internal HRM tools for attendance, leave and approvals, on React and React Native.",
  },
];

export const skills = [
  "TypeScript",
  "JavaScript",
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

export const aiSkills = new Set(["LLM Integration", "RAG", "Agno"]);

export const contact = {
  heading: "Full-time role or freelance project?",
  text: `Either way, I'd like to hear about it. Based in ${personal.location} and happy to work remotely.`,
  email: personal.email,
  linkedin: personal.links.linkedin,
  github: personal.links.github,
  resume: "/resume.pdf",
  formIntro: "Or drop a message here. Company is optional.",
};
