# /story — AI asset prompt pack

Generate these in ChatGPT (image), Gemini or Midjourney, then save each file with the **exact name** into
`public/story/ai/`. The page checks for each file at build/dev time: until a file exists, its section uses a
built-in fallback, so you can add them one at a time.

**Always attach both reference images** when the tool allows it:
`public/story/characters/source/kishore-navy-night.jpg` and `public/story/characters/source/kishore-blazer-lights.jpg`.

Character lock (paste at the end of every prompt that shows Kishore):

> Keep the man exactly as in the reference images: same face, skin tone, hair, facial hair and build. Same
> illustrated style: semi-realistic digital painting with clean comic-style linework and warm cinematic lighting.
> Do not change his ethnicity, age or features. No text, no logos, no watermark.

Export: WebP or PNG, at the size given. If the tool only gives JPG/PNG, that's fine; keep the name and change only
the extension to `.png` or `.jpg`.

---

## 1. `hero-desk.webp` — 2560 × 1440 (16:9)
Used: full-bleed opening scene (like the cinematic portfolio's first frame).

> Cinematic wide shot of the man from the references (beige blazer look) sitting at a modern developer desk at
> night, facing the camera, smiling slightly. Behind him: three monitors with code and dark analytics dashboards
> glowing blue and amber, a big window showing palm trees and city lights in bokeh, warm fairy lights along a
> shelf, a small desk lamp. Moody teal-and-amber colour grade, shallow depth of field, lots of dark space on the
> left third for a big title. 16:9. [character lock]

## 2. `cutout-blazer.png` and `cutout-navy.png` — 1200 × 1600, transparent background
Used: the person cut out over the hero, About, and the closing scene. Placeholders made by local background removal
are in `public/story/characters/`; these replace them.

- **cutout-blazer** — "The man from the references in the beige blazer and black shirt, waist-up to mid-thigh,
  standing straight facing the camera, hands relaxed near the jacket buttons, confident slight smile. Fully
  transparent background (PNG with alpha), no shadow, clean hair edges. Portrait 3:4." [character lock]
- **cutout-navy** — "The man from the references in the navy shirt with rolled sleeves, waist-up to mid-thigh,
  standing relaxed, one hand in pocket, looking at the camera. Fully transparent background (PNG with alpha), no
  railing, no props, no shadow, clean curly-hair edges. Portrait 3:4." [character lock]

If your tool can't export transparency, generate on a plain pure-white background and tell me; I'll key it out.

## 3. `ai-crew-figma.webp`, `ai-crew-claude.webp`, `ai-crew-playwright.webp`, `ai-crew-grafana.webp` — 1024 × 1024
Used: "Meet my AI crew" cards (like Sintra's AI employees), one character per stage of end-to-end development:
design, build, test, observe. Generate all four in one chat so the style matches. Don't ask for the real product
logos (they are trademarks); the colours and props carry the idea.

Shared style line (add to each):

> Cute stylised 3D character render, Pixar-like, soft studio lighting, glossy materials, standing on a simple round
> pedestal, plain deep-navy (#0b1534) background with a soft rim light, centred, full body, 1:1. No text, no logos.

- **figma** (Design) — "A small designer robot holding a stylus and a floating glass panel with colourful UI
  wireframes and shapes, violet, pink and green accents."
- **claude** (Build) — "A friendly small robot software engineer wearing tiny headphones, typing on a floating
  holographic keyboard with glowing code lines around it, warm orange accents."
- **playwright** (Test) — "A small tester robot in a lab coat holding a magnifying glass over a floating browser
  window with green check marks, a tiny theatre mask pinned to its coat, green accents."
- **grafana** (Observe) — "A small operations robot with a radar dish antenna, surrounded by floating dashboard
  panels with line graphs and gauges, orange and yellow accents."

## 4. `impact-scene.webp` — 2560 × 1440 (16:9)
Used: closing "Let's talk" scene (like the cinematic portfolio's dark "IMPACT" frame).

> Dramatic dark cinematic scene: the man from the references (beige blazer look) standing in the centre, waist up,
> facing the camera with a calm confident smile. Dark background with drifting warm embers and soft smoke, faint
> glowing UI panels and code fragments floating far behind him, strong amber rim light from behind, teal fill.
> Lots of empty dark space on both sides for giant text. 16:9. [character lock]

## 5. `about-workspace.webp` — 1200 × 1500 (4:5)
Used: "Who I am" photo card.

> Portrait-format shot of the man from the references (navy shirt look) at a standing desk in a home studio at
> night: shelves with small plants and fairy lights, a monitor with code, palm silhouettes and city lights through a
> window. Relaxed, looking at the camera. Warm, cosy, cinematic. 4:5. [character lock]

## 6. `services-bg.webp` — 2560 × 1440 (optional)
Used: soft background behind the services cards.

> Abstract dark-navy background with smooth flowing light trails in amber and teal, subtle bokeh, very soft,
> low contrast, lots of empty space, no objects, no text. 16:9.

---

## After you add files

Tell me which ones you added. I'll check them in the page at desktop and phone sizes and compress them (target
under 350 KB each).
