# Kishore Kumar R — Portfolio

A premium developer portfolio built with **Next.js, TypeScript, Tailwind CSS, and Framer Motion**.

The portfolio showcases my production experience across **fintech, EdTech, SaaS, logistics, cloud infrastructure, payment systems, video processing, and AI experimentation**.

## Live Portfolio

[View Live Portfolio](https://portfolio-eight-cyan-bcmtc3awoy.vercel.app/)

## About

I'm Kishore Kumar R, a Full-Stack Engineer with 4+ years of production experience building backend-heavy systems across fintech, EdTech, SaaS, and logistics.

My primary focus is Node.js, TypeScript, React, PostgreSQL, AWS, microservices, payment systems, asynchronous processing, and backend architecture.

I also work with Python and explore LLM-based applications, RAG, and AI-assisted workflows.

## Tech Stack

- **Next.js 16**
- **TypeScript**
- **React**
- **Tailwind CSS v4**
- **Framer Motion**
- **Zod**
- **Resend**
- **Lucide React**
- **Vercel**

## Features

- Responsive portfolio design
- Dark and light themes
- Animated interactions
- Experience timeline
- Project showcase
- Technical skills and toolbox
- Engineering metrics
- Resume download
- Contact form
- SEO metadata
- JSON-LD structured data
- Accessibility support
- Reduced-motion support
- Responsive layouts across desktop, tablet, and mobile

## Project Structure

```text
app/
├── api/contact/route.ts
├── data/resume.ts
├── layout.tsx
├── page.tsx
├── sitemap.ts
└── robots.ts

components/
├── ContactForm.tsx
├── ExperienceTimeline.tsx
├── Toast.tsx
├── icons.tsx
└── ...

data/
└── experience.json

lib/
├── utils.ts
└── validation.ts

public/
└── resume.pdf
```

## Content Management

Portfolio content is centralized in `app/data/resume.ts`.

This contains structured information for:

- About
- Skills
- Experience
- Projects
- Education
- Certifications
- Contact information

Additional freelance or contract experience is maintained in `data/experience.json`.

The experience timeline combines the relevant data at render time.

### Updating Content

For resume-based information, update `app/data/resume.ts`.

For additional freelance or contract work, update `data/experience.json`.

To update the downloadable resume, replace `public/resume.pdf`.

## Getting Started

Install the dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Then open:

`http://localhost:3000`

## Environment Variables

The contact form uses Resend for email delivery.

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

`RESEND_API_KEY` is required for the contact form.

`CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` are optional and have application-level defaults.

## Contact Form

The contact form is implemented through a Next.js API route and includes:

- Client-side validation
- Server-side validation
- Honeypot spam protection
- Basic rate limiting
- Server-side email delivery
- Reply-to handling for visitor emails

The Resend API key is never exposed to the client.

## Accessibility

The portfolio includes:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible form labels
- Inline validation
- Skip-to-content navigation
- Reduced-motion support
- Responsive layouts
- Accessible interactive controls

## SEO

The portfolio includes:

- Page metadata
- Open Graph metadata
- JSON-LD structured data
- Sitemap generation
- Robots configuration
- Semantic HTML
- Descriptive page content

## Resume

The downloadable resume is available at:

`/resume.pdf`

The source file is:

`public/resume.pdf`

To update the resume, replace the PDF and update the structured information in `app/data/resume.ts`.

## Deployment

The portfolio is deployed using **Vercel**.

### Deploy with Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy.

Vercel automatically detects the Next.js application and handles the build and deployment process.

## Local Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

## Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create the production build
npm start        # Start the production server
npm run lint     # Run ESLint
```

## Design Philosophy

The portfolio uses a **Ledger-inspired visual language** focused on engineering systems, payments, infrastructure, and production software.

The project section focuses on the systems built and the engineering problems solved, while the technology stacks identify the tools used to build them.

The goal is to communicate **technical ownership, production experience, and engineering depth** rather than simply presenting a list of technologies.

## Links

- **Portfolio:** [View Portfolio](https://portfolio-eight-cyan-bcmtc3awoy.vercel.app/)
- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/r-kishore-kumar-85a5b8224)
- **GitHub:** [GitHub Profile](https://github.com/lonewalker-666)