# /story — scoped instructions

Applies to everything under `app/story/` and `public/story/`. The root `CLAUDE.md` still applies (no explanatory
comments in source, React-compiler lint rules, `npm run lint` / `npm run typecheck`).

## 1. Scope and isolation

- Route: `/story` (Next.js 16 App Router, React 19, TypeScript, Tailwind v4, npm). There is **no git** here: never
  run git, never create `.git` or `.gitignore`. A wrong write cannot be undone.
- Allowed write paths, and nothing else:
  - `app/story/**` (route code; private folders `_components/`, `_scenes/`, `_motion/`, `_content/`, `_docs/`)
  - `public/story/**` (`characters/`, `illustrations/`, `video/`, `3d/`, `og/`, `manifest.json`)
  - new files in `.claude/agents/` and new folders in `.claude/skills/` created for this route
- Only add files. Check a path does not exist before writing; if it does, use a `story-` prefixed name. Never edit,
  move, rename or delete an existing file: root layout, `globals.css`, configs, `package.json`, lockfile, sitemap,
  existing `.claude/` files, `app/data/resume.ts` (import it read-only).
- `public/story/characters/source/` holds the supplied originals. Never modify them; derive copies elsewhere.
- No dependency installs, no manifest/lockfile changes, no `npm run build` without explicit approval.
- **Manual changes needed protocol:** anything that would touch an existing file (nav link, sitemap entry, a new
  dependency, a config change) is not done. Record it in the final report under "Manual changes needed" with the
  exact file and snippet, and ask.
- Baseline manifest: `%TEMP%\portfolio-story-baseline\baseline-manifest-v3.txt` (the original pre-/story
  snapshot plus the approved gsap/lenis install and the root `CLAUDE.md` import line). Verify with the
  `route-isolation-check` skill.
- Installed for this route: `gsap` 3.15.0, `@gsap/react` 2.1.2, `lenis` 1.3.27.

## 2. Vision

`/story` is an **alternate version of the owner's portfolio**, a sibling of `/` (the main site) and `/galaxy`: a
**guided tour of the portfolio and services**, with Kishore (the illustrated character) as the tour guide. Keep it
simple: few words per stop, strong animation and backgrounds; do not mention everything, link to `/` for full
detail. AI is a headline (Claude Code, RAG, vision and voice models, AI data analysis and report generation). No
"2 a.m. / night shift / client call" framing. Never name YES BANK. Every stop has one idea, one visual block, one
guide line, and a transition into the next stop. Plan: `_docs/story-arc.md`; copy: `_docs/copy.md`.
Content facts come from `app/data/resume.ts`; never invent employers, numbers or claims. Wording specific to this
version (e.g. "nearly 5 years") lives in `app/story/_content/`, never in the shared resume file.

## 3. Creative direction

- Tone: professional on the surface, sarcastic and funny underneath. Dry wit, never mean, never at the visitor's
  expense. A joke never replaces the information or weakens a call to action. See the `tone-and-copy` skill.
- Cast: one character, two looks, the guide's two hats. `blazer-lights` is the host (welcome, services, contact);
  `navy-night` is behind the scenes (about, AI work, experience, skills). Switching looks is a cross-fade.
- Never redesign the character: keep face, hair, proportions, palette, outfit details and accessories exactly as
  in the sources. Descriptions and alt text live in `public/story/manifest.json`.

## 4. References (patterns only)

Study before designing, record findings in `app/story/_docs/reference-notes.md` (`site-reference-analysis` skill):

- https://sintra.ai/ — character-led friendly UI, AI-employee personality, clean section rhythm
- https://cinematic-portfolio-sable.vercel.app/ — cinematic scroll transitions, hero reveals, pacing
- https://jsmastery.com/course/gsap-animations-course — ScrollTrigger, timelines, pinning, text splitting,
  parallax, scrub

Extract easing, timing, layout rhythm and scroll choreography. Never copy code, text or assets.

## 5. Stack and conventions

- GSAP + ScrollTrigger (+ `@gsap/react` `useGSAP`) and Lenis for smooth scroll, installed (versions above). Any
  further dependency is a manual change. Three.js / R3F / drei are already installed; use them only where depth carries the
  story (`3d-designer` decides, always with a 2D fallback).
- `app/story/page.tsx` is a server component exporting metadata; interactive scenes are client components in
  `_scenes/`. Animation logic lives in `_motion/` hooks, not inside markup.
- Lenis and ScrollTrigger are created inside the route's client root and fully torn down on unmount
  (`ctx.revert()`, `ScrollTrigger.getAll()` owned by this route killed, `lenis.destroy()`), so `/` and `/galaxy` are
  never affected.
- Styles: `app/story/story.module.css` and/or a `.story-*` class prefix under a root wrapper. The root layout
  applies `globals.css`, `html.dark` and `bg-bg text-ink` to the body; override inside the wrapper, never globally.
  Fonts load in `app/story/page.tsx` via `next/font`, scoped to the wrapper (as `/galaxy` does).
- The root layout renders a "Skip to content" link targeting `#main-content`: the story's `<main>` must carry
  `id="main-content"`.

## 6. Quality bars

- Performance: animate only `transform` and `opacity`; lazy-load heavy assets and video; WebP/AVIF images via
  `next/image`; no layout shift from pinning. Target Lighthouse 90+ on mobile.
- Accessibility: `prefers-reduced-motion` gets a static, fully readable version; keyboard order and focus states
  intact; contrast AA; alt text for every character image; a visible "Skip intro" control.
- SEO (owner decision: treat it like `/galaxy`): `/` stays the only indexed version. Do not set
  `alternates.canonical`, so `/story` inherits the root canonical pointing at `/`; no sitemap entry; no extra
  JSON-LD (the root layout's `Person` covers it). Set only `title`, `description` and Open Graph / Twitter
  (`url: "/story"`, images from `/story/og/`) so shared links get their own preview. Still: semantic HTML, exactly
  one `<h1>`, all text server-rendered and in the DOM before animation; animation may move or fade it but never
  gate it.

## 7. Agents and order of work

The main session orchestrates and runs independent agents in parallel.

1. Strategy and content: `creative-director` (story arc, scene list) → `content-writer` (copy, dialogue, script)
2. UX: `ux-ui-designer` (wireframes, tokens, scroll flow)
3. Assets, in parallel: `asset-creator` (character cutouts, poses), `graphic-designer` (backgrounds, icons, OG),
   `video-editor` (intro video), `3d-designer` (only if a scene needs depth)
4. Build: `web-developer-seo` (route, markup, metadata, performance) with `motion-engineer` (GSAP scenes)
5. QA and SEO: `qa-reviewer` (browsers, mobile, a11y, console, jank, isolation check); `creative-director`
   reviews consistency at every stage.

## 8. Definition of done (any scene or feature)

- Matches the scene brief: beat, character action, transition.
- Character unchanged from the sources; copy passes the `tone-and-copy` checklist.
- Works with reduced motion, keyboard only, and at 360 px, 768 px and 1440 px widths; no console errors.
- Only `transform`/`opacity` animated; no long tasks or visible jank on a 4× CPU-throttled run.
- `npm run lint` and `npm run typecheck` pass.
- Content is indexable with JavaScript disabled.
- **Isolation check passes:** only new files under allowed paths, and every baseline file hash is unchanged.
