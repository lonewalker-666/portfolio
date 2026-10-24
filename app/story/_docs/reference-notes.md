# Reference notes (patterns only)

Study for `/story`, done with the `site-reference-analysis` skill. Patterns, numbers and feel only. No code, copy,
images, fonts or logos were taken, and nothing below should be read as permission to recreate a specific screen.

How it was observed: all three sites were loaded live in the desktop app's built-in browser at 1440x900 and 390x844,
scrolled in steps, screenshotted, and measured from the console (`getComputedStyle`, `getAnimations()`,
`ScrollTrigger.getAll()` where GSAP was exposed, sticky/pin-spacer geometry). Screenshots stayed in the app's
tool-results cache outside the project. Caveat: the browser pane was hidden for part of the session, so rAF-driven
intro tweens sometimes stalled mid-way (jsmastery hero headline). Scroll-linked values were sampled reliably; time-based
durations for JS tweens are estimates from screenshots taken 0.25–1 s apart, marked "est.".

Context from the owner: `/story` is the full portfolio told as a scroll story (intro, about, skills, experience
timeline, projects, education, contact), not a landing page. The "Take for /story" bullets favour patterns that carry
long, structured content through a cinematic scroll without losing pace.

---

## sintra.ai

- Visited: 2026-10-24, viewports: 1440x900, 390x844
- Stack seen: Webflow page, GSAP 3.15 + ScrollTrigger + SplitText loaded from a CDN, no smooth-scroll library. Native
  scroll. Page is about 23 viewport heights (20 800 px at 900 px tall; 23 900 px at phone width).
- Hero reveal: no text animation at all. The h1 (64 px / line-height 1.0, weight 500, 40 px on phone) is static and
  readable from the first paint. Motion comes from a full-bleed looping character video (about 6 s, autoplay, muted,
  `preload=metadata`) of the mascot waving in a rendered room, placed right of centre. Copy sits bottom-left on a
  bottom-up black gradient. On phone the character sits in the top 55 % and the headline overlaps the bottom of the
  video on the same gradient.
- Scroll choreography:

  | scroll range | element | behaviour | duration/feel |
  | --- | --- | --- | --- |
  | 0 – 1 vh | hero | plain scroll, video keeps looping | none |
  | ~1.8 – 3.2 vh | "pick your helper" carousel | horizontal row of character cards (340x600), each a short idle-blink loop; arrows/drag, no scroll-jacking | card hover colour 0.26 s `cubic-bezier(0.22,1,0.36,1)` |
  | ~4.3 – 5.2 vh | coloured feature cards | static grid, one card per character, each titled as a request to that character | none on scroll |
  | ~6 – 10 vh | "how it works" | CSS `position: sticky` phone (577 px, top 180 px) in a 3 600 px tall parent = **4 vh for 4 steps, one step per viewport**. One scrubbed ScrollTrigger (`top top` → `bottom top`, no pin, scrub true) only reports progress; the active step is switched in CSS | active step title grows 20.8 → 32 px and body expands (`max-height`), 0.52 s `cubic-bezier(0.2,0.7,0,0.98)`; opacity 0.36 s `cubic-bezier(0.22,0.61,0.36,1)`; phone screen swaps |
  | ~10 – 15 vh | benefit blocks | alternating half-and-half: device or character render on one side, 64 px headline + 20 px body on the other | plain scroll |
  | end | comparison table, logos, FAQ, CTA | plain document | none |

- Rhythm: content container 1 280 px (narrow blocks 1 024 px) inside a 72 px side gutter (19.5 px on phone);
  section padding 128 px top. Body copy 17–21 px, line-height ~1.4, max text width 768 px (cards 308 px). Type scale
  64 / 48 / 40 / 30 / 20.8 / 17 px (roughly 1.33 steps). Black page, white headings, grey (#a3a3a3) secondary text,
  one saturated accent per card.
- Character use: characters are the product's personalities. Each has a name, a job title and a one-paragraph
  personality; the character always sits *above or beside* its copy, never behind it, with generous dark space around
  it (character ~45 % of the card height). Idle loops (blink, small wave) make them feel alive without scroll work.
  Copy speaks to the character by name ("X, do this for me"), which carries the personality more than the art does.
- Take for /story:
  - **Sticky device + stepped list, one step per viewport** for the *experience timeline* or *how I build*: the
    character (or a screen it holds) stays sticky on one side while 4–5 roles/steps scroll on the other; the active
    item enlarges and expands its detail with a fast-out ease (~0.5 s). Inactive items stay visible as a compact list,
    so the whole timeline is always scannable.
  - **Static, readable hero with motion in the art, not the text.** Server-rendered h1 + intro, the character idles
    (CSS/transform-only breathing or blink) beside it. Protects LCP and the no-JS/indexable requirement.
  - **Character card = picture on top, name/role/one-liner below** for the *two looks* (`navy-night` vs
    `blazer-lights`) introduced as two "modes" with a job title and a dry one-line bio each.
  - **Copy addressed to the character** ("Kishore, make the payments reconcile") as section titles for project
    beats; it carries the sarcastic voice without long paragraphs.
- Avoid: autoplaying video per card (14 videos on the page, heavy on mobile data and CPU; our budget wants
  images/transform loops); the heavy third-party tag load; carousels that hide most items off-screen for content that
  must be indexable and scannable (skills, roles).

---

## cinematic-portfolio-sable.vercel.app

- Visited: 2026-10-24, viewports: 1440x900, 390x844
- Stack seen: Next.js (Turbopack build), CSS modules, no global GSAP/ScrollTrigger or smooth-scroll class exposed;
  scroll-linked values update per frame, so a JS motion library drives them. `html` and `body` are
  `overflow: hidden`; a full-height `<main>` is the scroll container (9 vh total: 8 100 px at 900 px tall). No
  `prefers-reduced-motion` rules found in its stylesheets.
- Hero reveal: a full-screen loader overlay (name in small tracked caps + one "Start" button) gates the page; it fades
  out in about 0.8–1 s after the click and is removed. Behind it a 10 s talking-head video plays (a second copy of the
  same clip as a 28 px-blurred, 1.12-scaled, 50 %-opacity backdrop), then the page auto-scrolls to the hero when the
  clip ends. Hero: warm gradient, cut-out portrait right of centre, 108 px display name left (45 px on phone), a row of
  pill chips, small stat tiles bottom-left, and two frosted "callout" cards floating next to the face.
- Scroll choreography (desktop, main scrollTop, 1 vh = 900 px):

  | scroll range | element | behaviour | duration/feel |
  | --- | --- | --- | --- |
  | 0 – 1 vh | intro video → hero | sticky sections stacked with rising z-index: hero slides up *over* the pinned intro (curtain) | scrubbed, linear with scroll |
  | 1 – 2 vh | hero → about | about curtains over hero | scrubbed |
  | ~1.5 vh | about photo column | x −50 px → 0, opacity 0 → 1, plays once when ~50 % in view | est. 0.6–0.8 s, ease-out |
  | ~1.75 – 2.3 vh | about social icons | y 20 px → 0 + fade, staggered | est. 0.08–0.1 s stagger |
  | 2 vh + | about marquee | skills ticker, CSS loop, 18 s linear, infinite | constant |
  | 3 – 4 vh | featured projects | pinned 1 vh; horizontal track translates 0 → −1 440 px (one slide per 0.5 vh with two slides); slide background scales 1.04 → 1.0; slide content enters y 30 → 0 + fade, exits y −40 + 6 px blur | scrubbed; content fades are short (est. 0.4 s) |
  | 4 – 5 vh | experience timeline | normal-scroll section; a horizontal "snake" line draws `scaleX 0 → 1`, numbered dots pop `scale 0 → 1` (slight overshoot to 1.07–1.1), cards rise y 28 → 0 + fade | scrubbed line; dots/cards est. 0.5 s with stagger |
  | 5 – 6 vh | featured work list | label/heading flip up from `rotateX ~40–50°` → 0 with fade; divider `scaleX 0 → 1` | scrubbed over ~0.5 vh |
  | 6 – 8 vh | closing (sticky 2 vh) | numbered work rows → full-height portrait with big stats; image slides x 0 → 389 px and fades; overlay fades; then contact/CTA frame with portrait centred between a left bio column and a right headline + CTA | scrubbed |

- Rhythm: every scene is exactly one viewport, so pacing is metronomic (roughly one idea per 900 px of scroll). 72 px
  side gutter; experience cards 292 px wide on a 335 px column pitch (4 roles side by side). Display type 108 / 96 /
  79 / 64 px vs body 16–18 px: huge contrast, very little mid-size type. Micro-interactions (hover colour/opacity)
  0.2–0.35 s `ease`.
- Character use: one real person throughout, cut out and placed **centre or right of centre**, with copy split into
  a left column (name, role, bio) and a right column (headline, stats, CTA). Callout cards hover next to the face like
  speech bubbles. The portrait is reused in different crops and treatments (bright hero, desaturated stats screen,
  dark footer) to mark acts of the story.
- Take for /story:
  - **Curtain stack for act breaks**: each act (intro → about → skills …) is a sticky 100 vh panel and the next
    slides over it; only `transform` moves, no layout shift. Reserve it for 3–4 act transitions, not every section.
  - **Horizontal pinned track for projects**: pin ~1 vh per project (we have more projects, so cap pin length or
    group them), background scale 1.04 → 1 and copy rise/fade per slide; numbered "01 / 0N" counter so the visitor
    knows how much is left.
  - **Drawn timeline line + popping dots + rising cards** for the experience timeline: line scrubs with scroll, each
    role's dot pops with a slight overshoot (`back.out`-like) and its card rises 28 px. Vertical rail on phone.
  - **Speech-bubble callouts beside the character** for the dry asides (one bubble per scene, anchored near the
    face), and **a closing frame with the character centred between bio and CTA** for the contact ending.
  - **Same character, different treatment per act** (bright, desaturated, dark) matches our two looks: `navy-night`
    for builder/night acts, `blazer-lights` for the client-facing acts and the contact ending.
- Avoid: the click-to-start gate and auto-scroll after a 10 s video (blocks content, bad for LCP, and a
  "Skip intro" control is mandatory for us); hijacking scroll into an `overflow: hidden` body with a custom scroller
  (breaks anchor links, keyboard paging and find-in-page); on phone the 4-role timeline is squeezed into a 100 vh
  section with its own nested scroll area (771 px box, 1 687 px content) which traps the thumb; no reduced-motion
  handling; giant pixel-heavy PNGs at `q=100`.

---

## jsmastery.com/course/gsap-animations-course

- Visited: 2026-10-24, viewports: 1440x900, 390x844
- Stack seen: Lenis smooth scroll (`html.lenis`), GSAP bundled (not global), ScrollTrigger pins visible as
  `.pin-spacer`s, SplitText-style line masks on headings. 5 `prefers-reduced-motion` rules in its CSS. Page ~25 vh.
- Technique list (from the course curriculum, paraphrased): easing families (power for everyday, sine for floaty,
  back for personality, bounce/elastic for impact, expo for speed); core tween methods (to / from / fromTo / set /
  stagger); timelines with position parameters, labels, overlaps and play/pause/reverse control; ScrollTrigger basics,
  scrub and pinning; a capstone that sequences full-screen videos and character "chapters" on scroll; case studies on
  layered scroll transitions, hero product reveals and accessibility.
- Hero reveal: headline split into lines, each line inside an overflow-clipped wrapper and pushed down 100 % (72 px),
  then raised in sequence (line-mask reveal; est. 0.8–1 s per line, ~0.1–0.15 s stagger). The split lines carry
  `aria-hidden`. Below it four tilted, colour-blocked topic cards fan out and straighten into a 4-column row as you
  scroll; a rotating sticker badge wiggles on a 0.5 s CSS loop.
- Scroll choreography:

  | scroll range | element | behaviour | duration/feel |
  | --- | --- | --- | --- |
  | 0 – 0.6 vh | topic cards | rotated/offset fan → straight row | scrubbed |
  | ~2.5 – 4.5 vh | long paragraph (~140 words) | pinned at top 180 px for ~2 vh (spacer 2 268 px for a 468 px block); words go opacity 0 → 1 in reading order with a soft 3-word leading edge (0.4 / 0.7 / 0.9); a few key words get a highlight pill | scrubbed, linear |
  | ~6 – 9 vh | showreel video | pinned 2 vh (spacer 2 700 px); video scales 0.75 → 1.0 to full-bleed | scrubbed |
  | ~10 – 11.5 vh | "what you'll be able to do" | 4 big uppercase rows, each with 3 tag chips; a preview image sits beside the active row | hover/scroll-in |
  | ~14 – 17 vh | 3 stack cards | each card ~810 px pins with no spacing; the next card slides over and the previous one shrinks to ~0.87 → 0.75, tilts −3° → −5° and fades to 0; big outlined index "01 / 02 / 03" in the corner | scrubbed |
  | ~17.5 vh | roadmap | 112 px heading with line-mask reveal; numbered accordion rows (01–09) with a plus icon | toggle |
  | end | instructor, testimonials marquee (30 s / 60 s linear loops), pricing, FAQ, CTA | plain scroll | — |

- Rhythm: warm off-white page, single bold display face, headings 60–112 px, cards with big radius and saturated
  fills, lots of vertical air (~150–200 px between blocks). On phone the paragraph pin and showreel pin are dropped;
  only the stack cards stay pinned (matchMedia split), h1 drops to 30 px.
- Character use: none (instructor photo only). The cards act as the "characters": each topic has a colour, a label
  chip and an illustration.
- Take for /story:
  - **Scrubbed word-by-word reading reveal, pinned ~2 vh**, for one short "about me" monologue. The text is in the
    DOM at full contrast for no-JS/reduced motion; only the opacity of word spans is animated. Keep it under ~60 words
    or it drags.
  - **Stacking cards (shrink + tilt + fade the one underneath)** for *projects* or *education*: a numbered card per
    item, pinned with no extra spacing so pacing stays one card per viewport.
  - **Big rows + tag chips** for the *skills* scene: 4–6 skill groups as large rows, each with chips for the
    individual tools; the character (or a prop) beside the active row instead of a photo preview. Scannable, indexable,
    cheap.
  - **matchMedia split**: drop the heavy pins on phones and keep one signature pin per act; respect
    `prefers-reduced-motion` with a static layout.
  - **Line-mask headline reveal** for scene titles only (short, once per scene, ~0.8 s `power3.out`-like with
    ~0.1 s line stagger).
- Avoid: line-split headings that hide the real text behind `aria-hidden` and depend on JS to become visible (in our
  hidden-pane session the hero headline stayed half-revealed); the 2 vh showreel video pin (heavy media, nothing to
  read); infinite wiggle/marquee loops near reading text; sales-page urgency tone.

---

## Cross-site summary for /story

- **Budget the scroll**: references spend about one viewport per idea (cinematic: 9 vh for the whole site; sintra:
  4 vh for 4 steps; jsmastery: ~2 vh per signature pin). For a full portfolio, plan roughly 1 vh per beat, at most
  2 vh for any single pin, and one signature pin per act, with plain scroll between pins so long lists stay fast.
- **Two kinds of motion**: scrubbed for spatial story moves (curtains, tracks, timeline line, card stacks) and
  play-once short tweens (0.4–0.6 s, fast-out ease, 0.06–0.1 s stagger) for content entering. Hover/UI feedback stays
  0.2–0.3 s.
- **Ease vocabulary observed**: fast-out `cubic-bezier(0.22,1,0.36,1)` and `(0.2,0.7,0,0.98)` for UI; linear for
  scrubs and marquees; slight overshoot for timeline dots. Map to GSAP `expo.out` / `power3.out` for entries,
  `none` for scrubs, `back.out(1.4)`-ish for pops, `sine.inOut` for idle character breathing.
- **Content stays readable**: sintra's static hero is the model; text is never gated by an intro, a click or a
  successful JS run.
- **Long content handling**: stepped sticky list (timeline), horizontal track with counter (projects), stack cards
  (projects/education), big rows + chips (skills), numbered accordion (education/certifications detail), closing frame
  with character between bio and CTA (contact).
