# /story — Tour plan (v3)

Status: **draft for owner review**. Replaces v2 (the "one night / 2 a.m. / 10:00 client call" concept was dropped by
the owner on 2026-10-24).

## Direction (owner, 2026-10-24)

- `/story` is a **guided tour of the portfolio and services**, not a night-shift story. No 2 a.m., no 10:00 call, no
  night-shift framing.
- **Simple:** do not mention everything. Few words per stop, strong animation and backgrounds carry the experience.
  The full detail lives on the main site (`/`), linked from the tour.
- **AI is a headline:** AI-assisted engineering with Claude Code, RAG, vision and voice models, AI data analysis and
  report generation.
- **Never name YES BANK.** Describe it as "banking-partner integrations" if needed.
- Kept from earlier decisions: same details as `/galaxy` ("nearly 5 years", the 16 Galaxy skills, no Razorpay in
  skills); open to full-time roles and freelance projects; contact = email, LinkedIn, GitHub, contact form, resume
  PDF; client names (HilightMedia, Bubbl) and platform figures may appear; intro video is click-to-play with
  captions; SEO like `/galaxy` (inherits root canonical, no sitemap, no extra JSON-LD).

Owner-stated facts not in `resume.ts` (use as written, no invented metrics): experience with Claude Code; RAG; vision
and voice models; AI data analysis and report generation; Azure and Agno (Galaxy skills).

---

## The tour

Kishore is the **tour guide**. A small "tour pass" in the corner shows `Stop 3 / 8 · Services` and doubles as dot
navigation (buttons, keyboard reachable, jump to any stop). Each stop: one heading, one or two sentences, one visual
block (cards, timeline, grid), and one short guide line in a speech bubble. At most one dry aside per stop.

The two looks are the guide's two hats:

- `blazer-lights` — **the host**: welcomes, presents services, closes the deal. Warm fairy-light world.
- `navy-night` — **behind the scenes**: the work, the AI lab, the stack. Cool navy world with city lights.

Switching looks is a simple cross-fade with a 0.98 → 1 pop. Never two figures at once.

| # | Stop id | Heading (H1/H2) | Look | Visual block | Scroll |
| --- | --- | --- | --- | --- | --- |
| 1 | `welcome` | H1: name, role, one line | blazer-lights | hero + "Start the tour" | 1 vh |
| 2 | `about` | About | navy-night | 2-sentence intro + 3 fact chips | 1 vh |
| 3 | `services` | Services | blazer-lights | 6 service cards | 1.5 vh |
| 4 | `ai-lab` | AI work | navy-night | 4 capability tiles + 3 proof items | 1.5 vh, pinned |
| 5 | `experience` | Experience | navy-night | 4-stop timeline, one line each | 1.5 vh |
| 6 | `projects` | Selected projects | none (cards only) | 6 cards on a horizontal track | 2 vh, pinned (desktop) |
| 7 | `skills` | Skills | navy-night | 4 × 4 grid (Galaxy's 16) | 1 vh |
| 8 | `contact` | Contact | blazer-lights | CTAs + contact form | 1.5 vh |

Total ≈ 11 vh. No pin longer than 2 vh (from the reference notes).

### Stop details

1. **welcome** — Name, "Full-Stack Developer" (the `resume.ts` role) with an AI-forward line, Chennai, nearly 5 years. Guide waves the visitor in
   (head tilt + nod; arms do not move). Buttons: "Start the tour" (scrolls to stop 2), "Play intro" (click-to-play
   video), "Skip to contact". Transition: curtain slide into stop 2.
2. **about** — Who Kishore is in two sentences (backend-heavy, revenue-critical systems; fintech, SaaS, logistics,
   e-learning; now AI). Chips: Chennai, India · Nearly 5 years · Open to full-time & freelance. Education as one
   small line (BCA, Madras University, 2018 – 2021).
3. **services** — Six cards: full-stack web apps; payments & fintech; SaaS & multi-tenant platforms; AI integration
   (LLMs, RAG, vision & voice); AI data analysis & reports; cloud & delivery (AWS, Azure). Cards stagger in;
   guide nods as the last lands.
4. **ai-lab** — Pinned. Four capability tiles light up one at a time: Claude Code (AI-assisted engineering), RAG,
   vision + voice models, data analysis & report generation. Then three proof items from `resume.ts`: Bubbl OCR
   (Llama 3.1 8B via Ollama), GPT clone on a local gpt-oss:20b, AI teacher feasibility research (voice, vision,
   persona, RAG). Background: animated node network.
5. **experience** — Timeline draws left to right (top to bottom on phones). Four stops, oldest first, one line and
   one highlight each: FR8 (2022), Right 2 Pay (2023), Mynerva (2023 – 2026), Freelance (2026 – now). No YES BANK.
6. **projects** — Six cards: Mynerva EdTech, Right 2 Pay, Multi-Tenant SaaS LMS, Bubbl, FR8 Logistics, TV Digital
   Signage. Each: title, category, one line, metric. "01 / 06" counter. Link "See every project on the full
   portfolio" → `/#projects`. (GPT clone and AI teacher already appear in stop 4; the college platform in stop 5.)
7. **skills** — The 16 Galaxy skills, tiles stagger in row by row; brow raise when the AI row lands.
8. **contact** — "Full-time role or freelance project — let's talk." Email (primary), LinkedIn, GitHub, Resume (PDF),
   then the existing contact form. Footer: "Full portfolio" (`/`), "Galaxy version" (`/galaxy`).

---

## Backgrounds and animation

One fixed backdrop behind all stops, built from stacked layers so changes are opacity/transform only:

- **Sky gradient layers:** one per world (warm fairy-light amber → deep navy). Cross-fade by opacity as stops change.
- **Parallax depth (3 layers):** far palm silhouettes, mid bokeh lights (warm in host stops, city blue/amber in
  behind-the-scenes stops), near soft floor glow. Scroll-scrubbed `yPercent` at different rates.
- **Drifting particles:** slow fairy-light specks (CSS transforms, ≤ 40 elements, paused when off-screen and under
  reduced motion).
- **AI lab overlay:** thin animated node network (SVG lines drawing in, nodes pulsing) only on stop 4.
- Palette from the source art: navy, beige, palm green, fairy-light yellow, warm skin-tone neutrals.

Motion per stop (from the reference notes): headings rise and fade in (0.5 s, `power3.out`), cards stagger 0.08 s,
timeline line scrubs `scaleX` 0 → 1 with dots popping (`back.out`), projects on a pinned horizontal track, curtain
slide between stops 1→2, 4→5 and 7→8 only. Character: idle breathe + sway always; one head tilt or nod per stop.

Reduced motion: no pins, no parallax, no particles, no smooth scroll; every stop static and fully visible.
Phones: no horizontal track (vertical stack), timeline vertical, character smaller and above the text.

---

## Intro video (click to play)

About 15 s, silent with captions, poster with a play button in stop 1; never autoplays. A quick trailer of the tour:
host welcome → services cards flash → AI lab network → projects track → "Start the tour". Script in
`video-script.md`.

---

## Character assets needed

Same feasibility rules as before (only transform cut-out layers of the two sources; no new likeness, no flipping,
no arm movement):

- Both looks: full cutout (navy-night including the railing segment under the arm), `head` layer with neck pivot,
  brows layer.
- Motions: idle breathe/sway, head tilt ±4°, nod, brow raise. Overlays: watch glint (navy), earbud glow and
  lapel-pin glint (blazer).
- Never mix details between looks; never cover text or CTAs; never pretend to point at UI.

---

## Heading spine

One H1 (stop 1). H2 per stop: About · Services · AI work · Experience · Selected projects · Skills · Contact. H3 per
service card, AI capability, role and project. Inherits root canonical; no sitemap, no extra JSON-LD.
