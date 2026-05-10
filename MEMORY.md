# Duality Labs — Session Memory

## Project
Duality Labs marketing site (https://www.dualitylabs.ai). Next.js 16 (App Router) + Tailwind 3.4 + Phosphor + Lucide icon libraries. Repo: github.com/Erichalfonso/duality-labs.

This working copy is at `C:\Users\aleja\Desktop\WebPolish\duality-labs` — a clone, not the user's main working tree. Local commits are NOT pushed by default.

## What was accomplished (sessions on 2026-05-08 → 2026-05-10)

Full homepage redesign and information-architecture overhaul.

**Homepage flow now:** Hero → TrustedBy carousel → "Our Services" cards → "Where our systems run" industry cards → "How We Work" 3-phase section → combined CTA + contact form → Footer.

**New components built:**
- `components/results.tsx` — 5 service cards (3-on-top + 2-on-bottom centered at lg+) with watermark icons
- `components/trusted-by.tsx` — auto-scrolling brand logo marquee, 9 logos
- `components/case-studies-preview.tsx` — 4 industry cards (industry as hero, metric as attribution)
- `components/how-we-work.tsx` — 3 phases (Plan / Build / Ship), no durations
- `components/service-icons.tsx` — Phosphor `fill` icons + custom Ψ for Custom Software card
- `components/before-after-mock.tsx` — CSS-mocked before/after visuals; exports `BeforeAfterVisual` and `ShippedVisual` (after-only thumbnail)
- `components/service-case-studies.tsx` — drops case studies onto each service page
- `components/cta.tsx` — REWRITTEN to combine Calendly book button + contact form

**New routes built:**
- `app/case-studies/[slug]/page.tsx` — dynamic case study detail page (header, before/after, body, testimonial, related cases, CTA)
- `app/work/page.tsx` — portfolio gallery (visual thumbnails of shipped builds, tech stack pills)

**Data files:**
- `lib/services.ts` — 5 service cards (AI Automation, Custom Software, Machine Learning, Data Infrastructure, Web & App Development) with `result` + `benefit` copy
- `lib/case-studies.ts` — 4 case studies with `buildName`, `buildType`, `buildSummary`, `techStack`, `relatedServices`, full `body`, `testimonial`, `meta`. **Most content is drafted by Claude** — see "Pending" below.

**Navigation updated:** `Home → Work → Blog → About + [Get in touch]`. Old "Services" tab removed. `/services` route still alive (sitemap demoted from priority 0.9 → 0.7) for SEO and homepage card deep-links.

**Brand assets:** local SVGs added at `public/logos/brands/` for Google Cloud (real path data from Wikipedia commons), OpenAI (real path data), Monday.com (3 vertical bars), GoHighLevel (placeholder approximation — needs real SVG).

**Two new icon libraries installed:** `lucide-react` and `@phosphor-icons/react`. Service watermarks use Phosphor `fill` weight for solid silhouettes.

## Current branch state
`master` is **2 commits ahead of origin/master**. Both are local-only — not pushed.
- `8d3c1cb` Redesign homepage with results-driven services and case studies
- `e2044da` Add /work portfolio page and reorient cards around industries

## Pending — User next session

The user (Erich) plans to **write 4 real case studies** to replace Claude's drafts:
- **2 case studies** for "Media, Music & Advertising" — currently 1 draft (`media-rights-management`, music-label-specific)
- **1 case study** for "Finance & Investing" — currently 1 draft (`finance-compliance-reporting`, wealth-management-specific)
- **1 case study** for "Transportation & Logistics" — currently 1 draft (`logistics-dispatch-routing`, freight-carrier-specific)

The MSP case study card stays on the homepage but **no real case study yet** — keep the existing `msp-ticket-triage` draft as a placeholder for now.

Editing happens in `lib/case-studies.ts`. Each entry has these fields to populate: `slug`, `industry`, `metric`, `metricLabel`, `headline`, `preview`, `body[]`, `mock`, `relatedServices`, `buildName`, `buildType`, `buildSummary`, `techStack[]`, `testimonial`, `meta`.

## Known issues / not blockers

- **Service page H1s don't match homepage card names.** Homepage card "AI Automation" → page H1 still says "Data Infrastructure & Automation Services." Same for "Machine Learning" → "AI & Machine Learning Systems." Need to rename H1s, page metadata, and FAQ phrasing in `app/services/ai-ml/page.tsx`, `app/services/data-infrastructure/page.tsx`. URLs stay the same.
- **No dedicated `/services/<slug>` page for the new "Data Infrastructure" card** (slug `data-platform`). The card currently links to `/services` (the index) via the optional `href` field. Either build a stub page or keep linking to the index.
- **GoHighLevel logo at `public/logos/brands/gohighlevel.svg`** is Claude's placeholder (two ascending chevrons). User to replace with the real SVG from GHL's brand page.
- **Contact form uses `mailto:`** (opens user's email client, sends to `ops@dualitylabs.ai`). Functional but limited — no submission tracking, no spam protection. To upgrade: Resend / Formspree / HubSpot Forms.
- **`npm audit` reports 4 vulnerabilities** (2 moderate, 2 high) — surfaced during lucide-react and phosphor-icons installs. Likely transitive deps. Run `npm audit` to inspect; may be fixable with `npm audit fix`.

## How to ship to live (user's stated workflow)
- Don't push to `master` directly — that auto-deploys to live site
- Push to a branch (e.g., `homepage-redesign`); Vercel auto-creates a preview URL on the branch
- User reviews preview, then merges branch → master via GitHub UI to deploy to live

User has approved local-first review pattern: don't commit until they say so, don't push without explicit authorization for the specific push.

## Quick commands
- Start dev server: `cd C:\Users\aleja\Desktop\WebPolish\duality-labs && npm run dev` → http://localhost:3000
- Show via ngrok: `ngrok http 3000` (auth token already configured per past session)
- View brother-share URL inspector while ngrok is running: http://localhost:4040
