# /story — Copy deck (v2, guided tour)

Status: **draft for owner review**. Replaces v1 (night-shift concept dropped). Follows `story-arc.md` v3.

Rules: first person in Kishore's voice; short; at most one dry aside per stop (in the guide line); no jokes in
buttons, form text or alt text; never name YES BANK; never use the phone number; no numbers that are not in
`resume.ts`. Indian English spelling in new copy.

---

## Tour pass (persistent, top corner)

`Stop {n} / 8 · {name}` — names: Welcome, About, Services, AI work, Experience, Projects, Skills, Contact. Rendered as
a `<nav aria-label="Tour">` of 8 buttons; the visible label shows the current stop.

---

## 1. `welcome`

**H1:** Kishore Kumar R, Full-Stack Developer building payment systems, SaaS platforms and AI-powered products

**Line:** Nearly 5 years of shipping production software from Chennai, India. Grab a seat; the tour takes about a
minute.

**Guide:** "Hi, I'm Kishore. I'll be your guide. No gift shop, I promise."

**Buttons:** Start the tour (→ `#about`) · Play intro (plays the video in place) · Skip to contact (→ `#contact`)

**Alt (blazer-lights):** "Illustrated Kishore in a beige blazer over a black shirt, standing in front of palm fronds
strung with warm fairy lights."

---

## 2. `about`

**H2:** About

**Text:** I build backend-heavy, revenue-critical systems across fintech, SaaS, logistics and e-learning, and own them
end to end, from architecture to deployment. Lately, a lot of that work has AI in it.

**Chips:** Chennai, India · Nearly 5 years in production · Open to full-time & freelance

**Small line:** Bachelor of Computer Application, Apollo Arts and Science College, Madras University (2018 – 2021)

**Guide:** "Short version: I make the parts that have to keep working."

**Alt (navy-night):** "Illustrated Kishore in a navy button-up shirt, leaning on a railing with city lights behind."

---

## 3. `services`

**H2:** Services

**Intro:** What I can build for your team or your business.

| H3 | One line |
| --- | --- |
| Full-stack web apps | React and Next.js front ends on Node.js back ends, from first commit to production. |
| Payments & fintech | Payment flows built around idempotency, retries and reconciliation: UPI, AEPS, BBPS and DMT. |
| SaaS & multi-tenant platforms | Tenant isolation, role-based access and white-label setups that onboard clients without code changes. |
| AI integration | LLMs, RAG, and vision and voice models wired into real products, not just demos. |
| AI data analysis & reports | Turning raw business data into analysis and generated reports people actually read. |
| Cloud & delivery | Deployment on AWS and Azure with CI/CD, so releases stay boring. |

**Guide:** "Pick one, or the combo meal."

---

## 4. `ai-lab`

**H2:** AI work

**Intro:** AI is part of how I build and part of what I build.

**Capabilities (H3 + line):**

1. **Claude Code** — AI-assisted engineering in my daily workflow: faster delivery, same code review discipline.
2. **RAG** — Retrieval-augmented generation that answers from your own documents and data.
3. **Vision + voice models** — Products that can read images and documents, and listen and talk back.
4. **Data analysis & report generation** — Using AI to analyse data and generate structured reports automatically.

**Proof (small cards, from `resume.ts`):**

- **Bubbl OCR** — Turned physical business cards into structured digital data with Llama 3.1 8B Instruct via Ollama.
- **GPT clone** — A ChatGPT-style app running on a locally hosted gpt-oss:20b model.
- **AI teacher research** — Evaluated voice, vision, persona and RAG approaches for LLM-based educational agents.

**Guide:** "Yes, the AI reviews my code. No, it doesn't get the final say."

---

## 5. `experience`

**H2:** Experience

**Timeline (H3: role, company · dates — one line):**

1. **Software Developer, FR8** · Mar 2022 – Nov 2022 — Internal logistics systems used daily by 100+ operations
   staff, on React and React Native.
2. **Software Developer, Right 2 Pay** · Jan 2023 – Aug 2023 — Sole full-stack developer of a fintech payment
   platform built from scratch; cut manual reconciliation overhead by about 70%.
3. **Senior Software Engineer, Mynerva** · Jul 2023 – Apr 2026 — Owned an e-learning platform end to end: about 80%
   faster video publishing and a payment migration with zero data loss across 10,000+ records.
4. **Full-Stack Developer, Freelance** · May 2026 – Present — A college application platform with payments, digital
   signage for HilightMedia, and a SaaS LMS for academies.

**Link:** Full experience on the main portfolio (→ `/#experience`)

**Guide:** "Every job left the systems running better than it found them. Mostly quieter, too."

---

## 6. `projects`

**H2:** Selected projects · counter `01 / 06`

| H3 | Category | One line | Metric |
| --- | --- | --- | --- |
| Mynerva EdTech Platform | EdTech | Microservices e-learning platform with media processing, streaming and payments. | ~80% faster video publishing |
| Right 2 Pay Fintech Platform | Fintech | Low-bandwidth payment PWA for UPI, AEPS, BBPS and DMT. | 500+ daily transactions (platform) |
| Multi-Tenant SaaS LMS | SaaS | One platform for music academies, tuition centres and karate classes. | 3 business domains |
| Bubbl Digital Business Cards | Product | NFC digital identity with AI-assisted OCR for paper cards. | NFC business & access cards |
| FR8 Logistics Platform | Logistics | Order matching, fleet and driver workflows across a nationwide network. | 20,00,000+ loads fulfilled (platform) |
| TV Digital Signage Platform | Advertising | Ad playback on TVs in malls and restaurants, with a campaign dashboard. | TV playback + campaign management |

**Link:** See every project on the full portfolio (→ `/#projects`)

**Guide:** none (the cards are the show).

---

## 7. `skills`

**H2:** Skills

**Grid (16 tiles, exact Galaxy order, 4 per row):**

| | | | |
| --- | --- | --- | --- |
| TypeScript | JavaScript | Python | React |
| Next.js | Node.js | Express | PostgreSQL |
| MongoDB | Redis | Prisma | AWS |
| Azure | LLM Integration | RAG | Agno |

**Guide:** "Sixteen tiles. The terminal still does the heavy lifting."

**Alt (navy-night):** "Illustrated Kishore in a navy shirt, leaning on the railing beside the skills grid."

---

## 8. `contact`

**H2:** Contact

**Text:** Hiring for a full-time role or scoping a freelance project? Either way, I'd like to hear about it. Based in
Chennai, India, and happy to work remotely.

**Buttons:** Email me (primary, `mailto:kishorekk54321@gmail.com`) · LinkedIn · GitHub · Resume (PDF, `/resume.pdf`)

**Form intro:** Or send a message here. Company is optional.
(The form is the existing `ContactForm`, imported unchanged; its labels and messages are not edited.)

**Guide:** "End of the tour. This is where you'd normally tip the guide; an email works too."

**Alt (blazer-lights):** "Illustrated Kishore in a beige blazer, smiling, in front of warm fairy lights."

**Footer:** Full portfolio (`/`) · Galaxy version (`/galaxy`)

---

## Metadata

| Field | Text |
| --- | --- |
| `title` | A Guided Tour (renders "A Guided Tour — Kishore Kumar R") |
| `description` | A quick guided tour of Kishore Kumar R's work: full-stack and payment systems, SaaS platforms, AI with RAG, vision and voice, and services on offer. |
| `openGraph.title` | Kishore Kumar R — a guided tour of my work and services |
| `openGraph.description` | Full-stack, payments, SaaS and AI work in a one-minute tour. Open to full-time roles and freelance projects. |

## Microcopy

- Play intro / Pause intro · captions on by default
- Skip intro · Skip to contact
- Tour pass button labels: "Go to stop {n}: {name}"
- Reduced motion note: none (the page simply renders static)

## Copy checklist

- [x] No YES BANK, no 2 a.m. / 10:00 / night-shift framing, no phone number
- [x] Skills = the 16 Galaxy skills; no Razorpay or individual AWS services in skills or services
- [x] Numbers only from `resume.ts` (~70%, ~80%, 10,000+, 100+, 500+, 20,00,000+, 3 domains); platform figures labelled
- [x] Owner-stated AI items worded without invented metrics
- [x] One aside per stop at most, only in guide lines; buttons and alt text plain
- [x] One H1; H2 per stop
