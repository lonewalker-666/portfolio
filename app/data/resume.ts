export const personal = {
  name: "Kishore Kumar R",
  role: "Full-Stack Developer",
  tagline: "React · Node.js · TypeScript · AWS",
  yearsExperience: 4,
  location: "Chennai, India",
  email: "kishorekk54321@gmail.com",
  phone: "+91 8248741300",
  links: {
    linkedin: "https://www.linkedin.com/in/kishore-kumar-r-85a5b8224/",
    github: "https://github.com/lonewalker-666",
  },
  summary:
    "Full-Stack Developer with 4+ years of production experience building backend-heavy, revenue-critical systems across fintech, SaaS, and logistics. I specialize in Node.js, React, REST APIs, and microservices, with hands-on experience building payment systems, multi-tenant platforms, real-time applications, and asynchronous workflows. I enjoy taking ownership of systems end to end, from architecture and backend development to AWS deployment, while solving the practical challenges that come with real-world production environments.",
  status:
    "Open to new opportunities after completing my role at Mynerva (April 2026).",
};

export type Experience = {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
};

export const experience: Experience[] = [
  {
    company: "Freelancer",
    role: "Full-Stack Developer",
    duration: "May 2026 – Present",
    location: "Remote",
    description: [
      "Built a college application submission platform with an integrated payments backend, using Fastify, Prisma, Supabase, and Flutter.",
      "Developed a digital signage TV application for malls and restaurants to display advertisements for HilightMedia, along with an administration dashboard for controlling and monitoring campaigns.",
      "Built an LMS SaaS platform for music academies, tuition centres, and karate classes to manage clients, staff, payments, payroll, and attendance.",
    ],
    technologies: [
      "Fastify",
      "Prisma",
      "Supabase",
      "Flutter",
      "Next.js",
      "Node.js",
    ],
  },
  {
    company: "Mynerva",
    role: "Senior Software Engineer",
    duration: "Jul 2023 – Apr 2026",
    location: "Chennai, India",
    description: [
      "Owned end-to-end full-stack development of a microservices-based e-learning platform serving thousands of learners across course creation, creator onboarding, monetisation, analytics, and real-time communication.",
      "Designed and evolved backend services and asynchronous workflows supporting the platform's media processing and delivery lifecycle.",
      "Migrated the platform's video processing infrastructure from self-managed FFmpeg workloads to AWS Media Services, eliminating CPU saturation, reducing average video publish time by ~80%, and clearing persistent queue backlogs.",
      "Led the migration of the platform's payment infrastructure from CCAvenue to Razorpay, redesigning checkout flows and restructuring real-time data models with zero production data loss across 10,000+ existing transaction records.",
      "Designed canonical data models and backend APIs powering analytics dashboards for revenue, conversions, content performance, and user engagement.",
      "Architected a multi-tenant, white-labeled loyalty platform with tenant isolation, configurable reward tiers, menus, and access control, allowing enterprise clients to be onboarded without code changes.",
      "Centralized sales, revenue, leads, and product data into a unified backend layer supporting tier-based access control and cross-product analytics.",
      "Designed headless backend architecture for internal tools with IP-restricted access and RBAC to protect sensitive operational endpoints.",
      "Built an OCR capability for Bubbl, an NFC-based digital business card product, using Python, Flask, Ollama, and Llama 3.1 8B Instruct, hosted on Cloudflare.",
      "Provided technical leadership through system design reviews, code reviews across 5+ feature streams, and cross-team architectural alignment.",
    ],
    technologies: [
      "Node.js",
      "React",
      "PostgreSQL",
      "Prisma",
      "AWS",
      "AWS S3",
      "AWS Lambda",
      "AWS SQS",
      "AWS MediaConvert",
      "Razorpay",
      "Python",
      "Flask",
      "Ollama",
      "Llama 3.1",
      "RBAC",
      "Cloudflare",
    ],
  },
  {
    company: "Right 2 Pay",
    role: "Software Developer",
    duration: "Jan 2023 – Aug 2023",
    location: "Remote",
    description: [
      "Sole full-stack developer for a fintech PWA designed for low-bandwidth environments, responsible for building the payment platform and supporting backend infrastructure from scratch.",
      "Designed payment APIs around idempotency, retries, reconciliation, rollback handling, audit trails, and failure recovery to support reliable transaction processing.",
      "Built the platform's AEPS capabilities with biometric authentication using Mantra, Morpho, and Precision fingerprint devices with encrypted device-level validation.",
      "Developed DMT services covering beneficiary onboarding, verification, and NEFT transfers with partial-failure reconciliation across 3 partner bank integrations.",
      "Implemented UPI and BBPS payment workflows with asynchronous status polling, settlement tracking, and transaction auditing, reducing manual reconciliation overhead by ~70%.",
      "Built a Flask API for contract signing and digital invoices.",
      "Automated compliance and agreement document generation using Python, reducing manual onboarding paperwork from ~30 minutes to under 2 minutes per agent.",
    ],
    technologies: [
      "Node.js",
      "Express",
      "Python",
      "Flask",
      "PostgreSQL",
      "NPCI APIs",
      "AEPS",
      "UPI",
      "BBPS",
      "DMT",
      "NEFT",
      "Mantra SDK",
      "Morpho SDK",
      "Precision SDK",
    ],
  },
  {
    company: "FR8 (Logistics Platform)",
    role: "Software Developer",
    duration: "Mar 2022 – Nov 2022",
    location: "Chennai, India",
    description: [
      "Built production-grade internal systems for a B2B logistics platform used daily by 100+ operations staff across order matching, fleet management, and HR operations.",
      "Developed order-matching and truck-management dashboards supporting assignment workflows for hundreds of daily load requests.",
      "Built React web dashboards and React Native mobile applications supporting live driver workflows including route confirmation, load acceptance, and status updates.",
      "Delivered internal HR and operations applications covering attendance, leave management, resignation workflows, and salary-advance approvals.",
      "Implemented role-based access control and performance tracking so field agents, dispatchers, and managers accessed only relevant workflows and data.",
    ],
    technologies: [
      "React",
      "React Native",
      "Node.js",
      "JavaScript",
      "REST APIs",
      "RBAC",
    ],
  },
];

export type KeySystem = {
  name: string;
  summary: string;
  stack: string[];
};

export const keySystems: KeySystem[] = [
  {
    name: "Mynerva EdTech Platform",
    summary:
      "Microservices-based e-learning platform supporting course management, creator onboarding, monetisation, analytics, media processing, and real-time communication.",
    stack: [
      "Node.js",
      "React",
      "PostgreSQL",
      "Prisma",
      "AWS",
      "S3",
      "Lambda",
      "SQS",
      "MediaConvert",
      "Razorpay",
    ],
  },
  {
    name: "Right 2 Pay Fintech Platform",
    summary:
      "Low-bandwidth fintech PWA supporting digital payments, money transfers, biometric authentication, transaction processing, reconciliation, and settlement workflows.",
    stack: [
      "Node.js",
      "Express",
      "Python",
      "Flask",
      "PostgreSQL",
      "NPCI APIs",
      "AEPS",
      "UPI",
      "BBPS",
      "DMT",
    ],
  },
  {
    name: "Bubbl Digital Business Card Platform",
    summary:
      "NFC-based digital business card product with digital identity and business-card management capabilities, including an AI-assisted OCR workflow for converting physical business cards into digital information.",
    stack: ["Python", "Flask", "Ollama", "Llama 3.1 8B Instruct", "Cloudflare"],
  },
  {
    name: "FR8 Logistics Platform",
    summary:
      "B2B logistics platform supporting order matching, fleet management, driver workflows, operations dashboards, and internal HR systems.",
    stack: ["React", "React Native", "Node.js", "REST APIs", "RBAC"],
  },
  {
    name: "Multi-Tenant SaaS LMS",
    summary:
      "Learning management platform for music academies, tuition centres, and karate classes with tenant-scoped administration and operational workflows.",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    name: "College Application Platform",
    summary:
      "College application submission platform with application workflows and an integrated payments backend.",
    stack: ["Fastify", "Prisma", "Supabase", "Flutter"],
  },
  {
    name: "TV Digital Signage Platform",
    summary:
      "Digital signage platform for malls and restaurants with a TV application for advertisement playback and an administration dashboard for campaign management and monitoring.",
    stack: ["Next.js", "Node.js"],
  },
  {
    name: "GPT Clone Project",
    summary:
      "Personal conversational AI application built around a locally hosted large language model with a ChatGPT-style user interface.",
    stack: ["Ollama", "gpt-oss:20b", "TypeScript", "React", "Python"],
  },
];

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python"],
  },
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Redux",
      "React-Query",
      "Context API",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      "Node.js",
      "Express",
      "Fastify",
      "REST API Design",
      "Microservices Architecture",
      "Async Workflows",
      "WebSockets",
    ],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    category: "ORM / Data Access",
    skills: ["Prisma", "Sequelize", "Drizzle"],
  },
  {
    category: "Cloud & Infra",
    skills: [
      "AWS EC2",
      "AWS S3",
      "AWS RDS",
      "AWS Lambda",
      "AWS MediaConvert",
      "AWS SQS",
      "NGINX",
      "Linux",
      "Cloudflare",
    ],
  },
  {
    category: "CI / CD",
    skills: [
      "AWS CodePipeline",
      "GitHub",
      "GitHub Actions",
      "GitHub Workflows",
      "GitHub Projects Management",
      "Deployment Automation",
    ],
  },
  {
    category: "Payments & Fintech",
    skills: [
      "Razorpay",
      "Stripe",
      "UPI",
      "BBPS",
      "AEPS",
      "NPCI",
      "DMT",
      "Transaction Reconciliation",
      "Idempotent APIs",
    ],
  },
  {
    category: "AI / Exploratory",
    skills: [
      "LLM Integration",
      "Retrieval-Augmented Generation (RAG)",
      "Ollama",
      "System Feasibility Evaluation",
    ],
  },
];

export type EducationItem = {
  institution: string;
  degree: string;
  duration: string;
};

export const education: EducationItem[] = [
  {
    institution: "Apollo Arts and Science College, Madras University",
    degree: "Bachelor of Computer Application",
    duration: "2018 – 2021",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

export const certifications: Certification[] = [];

export type Project = {
  title: string;
  description: string;
  stack: string[];
  category: string;
  github?: string;
  demo?: string;
  metric?: string;
};

export const projects: Project[] = [
  {
    title: "Mynerva EdTech Platform",
    description:
      "Microservices-based e-learning platform covering course creation, creator onboarding, monetisation, analytics, real-time communication, media processing, and payments. Designed and owned backend services, AWS infrastructure, hybrid FFmpeg and MediaConvert video processing, HLS streaming, asynchronous workflows, and payment infrastructure.",
    stack: [
      "Node.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Express",
      "MySQL",
      "MongoDB",
      "Sequelize",
      "AWS",
      "EC2",
      "S3",
      "RDS",
      "Lambda",
      "SQS",
      "MediaConvert",
      "CloudFront",
      "IAM",
      "Razorpay",
      "FFmpeg",
      "HLS",
      "SSE",
      "WebSockets",
      "REST APIs",
      "Microservices",
      "NGINX",
      "GitHub Actions",
    ],
    category: "EdTech",
    metric: "~80% faster video publishing · Hybrid FFmpeg + MediaConvert",
  },

  {
    title: "Right 2 Pay Fintech Platform",
    description:
      "Fintech PWA designed for low-bandwidth environments, supporting wallet operations, UPI, AEPS, BBPS, DMT, bulk payments, and transaction workflows. Designed and owned payment processing, transaction state management, reconciliation, settlement tracking, retry handling, biometric authentication, and banking-partner integrations with YES BANK within the NPCI payment ecosystem.",
    stack: [
      "Node.js",
      "Express",
      "Python",
      "Flask",
      "JavaScript",
      "PostgreSQL",
      "YES BANK",
      "NPCI",
      "UPI",
      "AEPS",
      "BBPS",
      "DMT",
      "NEFT",
      "Bulk Payments",
      "Wallet Systems",
      "Razorpay",
      "Mantra SDK",
      "Morpho SDK",
      "Precision SDK",
      "REST APIs",
    ],
    category: "Fintech",
    metric: "500+ daily transactions · Multi-rail payment platform",
  },

  {
    title: "Bubbl Digital Business Card & Access Platform",

    description:
      "NFC-based digital identity platform for creating, managing, and sharing digital business cards and access cards. Worked across the web platform and backend services, including card management, digital profiles, NFC-based interactions, and an AI-assisted OCR workflow for converting physical business cards into structured digital information.",

    stack: [
      "Node.js",
      "Python",
      "Flask",
      "React",
      "Next.js",
      "TypeScript",
      "MySQL",
      "NFC",
      "Ollama",
      "Llama 3.1 8B Instruct",
      "Cloudflare",
      "AWS Elastic Beanstalk",
      "AWS CodePipeline",
      "TailwindCSS",
      "REST APIs",
    ],

    category: "Product",

    metric: "NFC Digital Identity · Business & Access Cards",
  },

  {
    title: "FR8 Logistics Platform",
    description:
      "B2B logistics platform supporting order matching, fleet management, driver workflows, operations dashboards, and internal HR systems. Worked on web and mobile workflows across a nationwide logistics network.",
    stack: [
      "React",
      "React Native",
      "Node.js",
      "GraphQL",
      "TypeScript",
      "PostgreSQL",
      "AWS",
    ],
    category: "Logistics",
    metric: "20,00,000+ loads fulfilled · 1,250+ daily shipments",
  },

  {
    title: "Multi-Tenant SaaS LMS",
    description:
      "Multi-tenant learning management platform for music academies, tuition centres, and karate classes covering client management, staff management, payments, payroll, and attendance. Designed tenant-based architecture with tenant-scoped workflows, authentication, authorization, and access control.",
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "REST APIs",
    ],
    category: "SaaS",
    metric: "Multi-tenant architecture · 3 business domains",
  },

  {
    title: "College Application Platform",
    description:
      "College application submission platform supporting application workflows and an integrated payments backend for processing application-related transactions.",
    stack: [
      "Fastify",
      "Node.js",
      "TypeScript",
      "Prisma",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
    ],
    category: "EdTech",
    metric: "End-to-end application workflow · Integrated payments",
  },

  {
    title: "TV Digital Signage Platform",
    description:
      "Digital signage platform developed for malls and restaurants, consisting of a TV application for advertisement playback and an administration dashboard for managing and monitoring campaigns.",
    stack: ["Next.js", "React", "Node.js", "TypeScript", "REST APIs"],
    category: "Advertising",
    metric: "TV playback + campaign management platform",
  },

  {
    title: "GPT Clone Project",
    description:
      "Personal conversational AI application with a ChatGPT-style interface backed by a locally hosted large language model.",
    stack: [
      "React",
      "TypeScript",
      "JavaScript",
      "Python",
      "Ollama",
      "gpt-oss:20b",
    ],
    category: "AI",
    metric: "Local LLM inference · gpt-oss:20b",
  },

  {
    title: "AI Teacher Cloning — Feasibility Research",
    description:
      "Independent research evaluating voice, vision, persona, and retrieval-augmented approaches for building LLM-based educational agents.",
    stack: ["Python", "RAG", "LLM APIs"],
    category: "AI",
    metric: "Voice + vision + RAG feasibility study",
  },
];
