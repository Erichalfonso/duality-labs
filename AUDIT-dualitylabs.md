# Duality Labs — AEO Audit

**Date:** 2026-05-22
**Site:** https://www.dualitylabs.ai
**Repo:** github.com/Erichalfonso/duality-labs (commit reviewed: `master` at clone time)
**Lens:** `AEO-PLAYBOOK.md` — synthesized from the Ahrefs AI SEO Course (12 lessons, Sam Oh, late 2025 / early 2026)
**Stack:** Next.js 16 App Router · MDX · Tailwind · Vercel · Cloudflare-free (Vercel-served)

---

## Executive Summary

Duality Labs' **technical AEO foundation is in the top 5% of sites I'd review.** Robots.txt explicitly allows every major AI crawler. The site server-side renders by default (no JS-rendering trap that hides ChatGPT). Schema markup is comprehensive — Organization, LocalBusiness, Service, Article, BreadcrumbList, Person. An `llms.txt` already exists. The fundamentals are not the problem.

**Where you're losing AI visibility is in content strategy and format.** The course says 43.8% of ChatGPT's citations are listicles, freshness is a top-3 signal (89.7% of ChatGPT's top cited pages updated in 2025, 76% within 30 days), and YouTube has the *strongest single correlation with ChatGPT visibility* (0.737) of any factor Ahrefs measured. Right now Duality Labs:

- Publishes long-form guides only — no listicles, no comparison/vs pages, no original-data posts.
- Has **two anchor blog posts (welcome, building-ai-agents) that are ~16 months stale** and would be quick freshness wins.
- Has **zero YouTube presence** — the single biggest correlated lever.
- Surfaces its proprietary builds ("Ad Ops Agent", "Music asset pipeline") in case studies but **doesn't name them as branded entities** — so LLMs flatten them into generic descriptions and forget the brand.
- Has **no third-party editorial mentions** (the #1 correlated signal: 0.7 with AIO citations) — no presence on G2/Clutch listicles, no founder bylines on industry publications, no founder presence on Reddit threads AI is already citing.

**The 90-day path to materially better AI visibility doesn't require rewriting the site.** It requires (1) adding three listicle/comparison blog posts, (2) refreshing the two stale posts with meaningful updates and a real `dateModified`, (3) shipping 4–6 short YouTube videos targeting *search-hit* topics, and (4) two outreach plays to get into the listicles AI already cites for "best AI agency Miami" and "best AI automation agency for SMBs."

---

## Part 1 — Strengths (what's working — keep doing it)

These items are already correct against the playbook. **Don't break them.**

| # | What | Playbook reference | Evidence |
|---|---|---|---|
| 1 | **robots.txt explicitly allows AI bots** (GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, cohere-ai) | Playbook Part 8.1 — the #1 technical lever; 5.9% of sites accidentally block AI | `app/robots.ts` and live `/robots.txt` confirmed |
| 2 | **Prerendered HTML, not JS-shell** — Next.js 16 App Router with default server components | Playbook Part 8.2 — ChatGPT's crawler doesn't execute JS | Live response header: `X-Nextjs-Prerender: 1` |
| 3 | **Organization + LocalBusiness + ProfessionalService schema** with founders, address, services | Playbook Part 8.5 — schema doesn't hurt and helps AI parse entities | `app/layout.tsx` lines 37–67 |
| 4 | **Service schema + BreadcrumbList** on every service page | Same | `app/services/ai-ml/page.tsx` lines 17–35 |
| 5 | **Article schema** on every blog post and case study | Same | `app/blog/[slug]/page.tsx` lines 61–85; `app/case-studies/[slug]/page.tsx` lines 33–66 |
| 6 | **Person schema for founders** on About page | Helps AI tie Erich + Alejandro to Duality Labs as entities | `app/about/page.tsx` lines 15–33 |
| 7 | **Canonical URLs everywhere** | Prevents duplicate-content confusion | Every page sets `metadata.alternates.canonical` |
| 8 | **Comprehensive sitemap** with `lastModified`, `priority`, `changeFrequency` | Standard SEO/AEO hygiene | `app/sitemap.ts` |
| 9 | **`llms.txt` is in place** and well-structured (markdown, brand summary, services, work, links) | Playbook Part 8 — "won't hurt, low priority right now" | `public/llms.txt` |
| 10 | **MDX with frontmatter** (title, description, date, author, tags, published) gives AI clean entity signals | Helps with article parsing | `content/posts/*.mdx` |
| 11 | **Case study structure is entity-rich** — explicit `capabilities`, `engineering challenges`, `tech stack`, `testimonial`, `metric` | Playbook Part 5 — entity-rich writing principle | `lib/case-studies.ts` schema, lines 21–48 |
| 12 | **Hero is a single declarative H1 with the value prop**, not branded fluff | Playbook Part 5 — BLUF | `components/hero.tsx` line 13 — *"We build the software, AI, and data systems your business runs on."* |

---

## Part 2 — Critical Findings (ranked by impact × effort)

Six findings prioritized by AEO impact. Each maps to a playbook section.

### Finding 1 — Zero listicle / comparison content

**Severity:** 🟥 Critical
**Playbook reference:** Part 5 (Content That Gets Cited) — 43.8% of ChatGPT citations are listicles. Best-of, comparison, and data-driven content map directly to how people query AI.

**Current state:** All six blog posts are long-form essays. The closest is `build-vs-buy-ai-solutions.mdx` (a framework, not a comparison table).

**Why this is the biggest miss:** AI systems pull from listicles to build consensus. *"If your brand is mentioned across multiple lists, that's multiple sources recommending you and AI picks up on that."* When a prospect prompts ChatGPT with "best AI automation agency for a 30-person SaaS company," ChatGPT does query fanout into 9–11 sub-queries, most of which are listicle/comparison-shaped. If you're not in any listicles (yours or third-party), you can't be cited.

**See also:** Finding 5 (third-party mentions) — these compound.

---

### Finding 2 — Two anchor blog posts are 16+ months stale

**Severity:** 🟥 Critical
**Playbook reference:** Part 5.2 — *"ChatGPT's top cited pages: 89.7% updated in 2025; 76% refreshed in the last 30 days. If your content hasn't been touched in 6 months, you're already at a disadvantage."*

**Current state:**
- `welcome-to-blog.mdx` — date `2025-01-15` (no update). Thin content. The first thing AI sees.
- `building-ai-agents.mdx` — date `2025-01-20` (no update). This is your strongest content asset — solid framework, code example, real numbers. But stale.
- All other posts are Feb–March 2026.

Worse, `app/blog/[slug]/page.tsx` line 68 sets `dateModified: post.date` — so even if you update the file, the `dateModified` schema field doesn't change. You're invisible to the freshness signal even when you do work.

**Why this matters:** ChatGPT actively prefers fresh content. `building-ai-agents` is your most "AI-cite-able" post in tone and structure — it's the one ChatGPT is most likely to pull from when someone asks "how to build AI agents that actually work" — but staleness will sink it.

---

### Finding 3 — Zero YouTube presence

**Severity:** 🟥 Critical
**Playbook reference:** Part 7 — *"YouTube is the most-cited domain in Google AI Overviews. YouTube mentions have a 0.737 correlation with ChatGPT visibility — the strongest correlation of any factor we studied. GPT-4 was trained on over 1 million hours of YouTube transcripts."*

**Current state:** No YouTube channel in any metadata, footer, or schema. No video content of any kind.

**Why this matters:** Of all the levers in the course, YouTube is the one that compounds fastest because (a) Google AI Overviews cite it most, (b) AI Mode cites it most, (c) GPT-4 was *trained on its transcripts*, and (d) the bar for "ranking-worthy" videos is much lower than "ranking-worthy" blog posts.

**The course's specific play:** Target *search hits, not viral hits.* Topics where YouTube videos already rank top-3 in Google for your niche keywords. For Duality Labs that would be things like *"how to build an AI agent"*, *"LLM fine-tuning tutorial"*, *"AI for real estate investing"*, *"build vs buy AI"*.

---

### Finding 4 — Proprietary work isn't branded as entities

**Severity:** 🟧 High
**Playbook reference:** Part 5 — *"LLMs have a tendency to flatten originality. If you come up with an original concept or framework, and you're the only one talking about it, AI will often absorb the idea without crediting you. The way around this is to label your ideas with your brand name. Define it explicitly, distribute it widely."*

**Current state:** Your case studies describe real shipped systems (great!) but name them generically:
- "Autonomous Meta Ads agent" → no proprietary name
- "11-module NEMT operations platform" → no name
- "Music asset pipeline" → no name
- "Autonomous trading agent" → no name
- *llms.txt* lists them by description, not by brand

**Why this matters:** When ChatGPT is asked *"what tools are used for autonomous ad management?"* it pattern-matches to **named** tools (Smartly.io, Madgicx, Revealbot). A "Duality Ad Ops Engine" is more likely to be cited than a generic description.

You also have no proprietary frameworks. The course explicitly says: *"Define it explicitly, distribute it widely across your blog, social, Reddit. The more places it shows up with your name attached, the harder it is for AI to flatten it into generic knowledge."*

---

### Finding 5 — No third-party editorial mentions (the highest-correlated signal)

**Severity:** 🟧 High
**Playbook reference:** Part 6 — *"Branded mentions on highly-linked pages have a 0.7 correlation with appearing in Google AI Overviews — stronger than backlinks, DR, or referring domains."*

**Current state:** I can't audit off-site from the repo alone, but indicators on-site suggest there's no active outreach:
- Footer/about lists only LinkedIn.
- No "As featured in" / "Press" component.
- No press kit at `/press` or `/media`.
- Case studies have no inbound links from third-party listicles.

**Why this matters:** This is the #1 correlated lever in the entire course. You can write the best blog post in the world and it won't get cited if nobody links to or mentions Duality Labs from a Tier 1 source. The strategic moves here are off-site, not in the repo.

---

### Finding 6 — Blog posts don't lead with the answer (BLUF violation)

**Severity:** 🟨 Medium
**Playbook reference:** Part 5 — *"Start every section with the answer, not the backstory. Humans scan in an F-pattern; LLMs weigh the beginning and end of a passage more heavily than the middle."*

**Current state:**
- `building-ai-agents.mdx` opens with: *"Over the past year, we have built and deployed AI automation systems..."* — backstory before answer.
- `ai-transforming-real-estate.mdx`: *"The industry is changing faster than most professionals realize..."* — vague hook.
- `what-is-llm-fine-tuning.mdx` actually does BLUF reasonably well: *"Pre-trained LLMs are trained on massive datasets..."* gets to the answer fast.

**Why this matters:** AI chunks content. If your answer is in paragraph three, the chunk that ends up in ChatGPT's response might be the throat-clearing intro. Lead with the conclusion in *both* the intro paragraph and the first sentence of every H2 section.

---

## Part 3 — Other Findings (lower priority but worth fixing)

### Finding 7 — No FAQ schema on service pages

`components/faq.tsx` renders FAQs as a UI component but doesn't emit `FAQPage` JSON-LD. Adding schema lets AI extract Q→A pairs structurally. Trivial fix — wrap the FAQ list in a JSON-LD script alongside the existing service schema.

### Finding 8 — `/case-studies` index page doesn't exist but is in the breadcrumb schema

`app/case-studies/[slug]/page.tsx` line 63 emits a breadcrumb pointing to `https://www.dualitylabs.ai/case-studies` — but there's no `app/case-studies/page.tsx`. Currently a 404. **The playbook explicitly calls this out:** AI sends users to 404s 2.87× more often than Google. If ChatGPT cites the breadcrumb URL, you have a hallucinated-URL situation that's actually your fault. Either build the index page (recommended — it consolidates your case studies into a listicle, which is also Finding 1 partial fix) or remove from breadcrumb schema.

### Finding 9 — Sitemap doesn't include `/case-studies` index

If you build the index page, add it to sitemap. (Currently only individual case studies are listed.)

### Finding 10 — Author is "Duality Labs Team" on every post

Course recommends naming people (entity richness, E-E-A-T). Attribute posts to "Erich Alfonso" or "Alejandro Alfonso" specifically. Add author bio component with credentials ("CS & Mathematics, co-founder Duality Labs"). Person schema you already have on the About page becomes citable across posts.

### Finding 11 — No original data / stats from Duality Labs

The course says *"data-driven content with original stats gets cited heavily because AI loves citing specific numbers."* Your case studies *have* specific numbers (300+ decisions, 190 alerts, 11 modules, 6 n8n workflows, $0.05/request) but they're locked inside individual case study pages. Surface them on the homepage in a "Duality Labs by the numbers" or "What we've shipped" data block — AI will cite that block.

### Finding 12 — No self-reported attribution on contact

Per the repo's own `MEMORY.md`, the contact form is `mailto:`. There's no "How did you hear about us?" field. Course says this is the #1 most-overlooked measurement signal — 5–10× undercount without it. When you upgrade to Resend/Formspree/HubSpot, add the question with options for ChatGPT, Perplexity, AI Assistant, Google AI Overview, etc.

### Finding 13 — Topic coverage gaps

Apply the 6-dimension gap analysis (Playbook Part 3). Specifically:

| Gap | Missing topics for Duality Labs |
|---|---|
| **Topic** | "AI agency vs hiring in-house," "AI consulting vs no-code automation," "AI MVP development cost," "RAG vs fine-tuning decision," "How to evaluate an AI development agency" |
| **Format** | No listicles, no vs/comparison pages, no original-data report, no YouTube |
| **Web mentions** | Not on G2, Clutch, Built In, Designrush, or any "Best AI development agencies in 2026" listicle |
| **Demand** | No content for branded "Duality Labs review", "Duality Labs vs [competitor]" queries (they don't exist yet — these are future-state) |

### Finding 14 — README claims Next.js 14 (it's 16)

`README.md` line 36. Cosmetic but the README is indexed.

---

## Part 4 — Recommendations: Fix / Build / Influence

The course's prioritization framework. **Start at the top of each column.**

### FIX (improve what exists) — week 1

| Action | Effort | Impact | Maps to |
|---|---|---|---|
| **Refresh `building-ai-agents.mdx`** with meaningful updates: 2026 framework names, current model references (Claude 4.7, GPT-5), new code example, 2–3 new sub-sections. Update file `date` AND track real `dateModified`. | 3–4 hrs writing | **High** — your strongest existing asset, currently stale | Finding 2 |
| **Refresh `welcome-to-blog.mdx`** OR delete it. It's thin and stale; either expand into a "What we're doing in 2026" annual roadmap post, or remove it from the published list. | 1 hr | Medium | Finding 2 |
| **Add a real `dateModified` field** to blog frontmatter. Update `app/blog/[slug]/page.tsx` line 68 to use `post.dateModified ?? post.date`. Update `lib/blog.ts` types. | 30 min | Enables all freshness work | Finding 2 |
| **Build `/case-studies` index page** as a listicle. H1: "Production AI & Software Systems We've Shipped." Lists 4 case studies with metric + industry + 2-line summary + link. Add to sitemap. Add `ItemList` schema. | 2 hrs | Fixes 404 + adds first listicle | Findings 1, 8, 9 |
| **Add FAQ JSON-LD** to service pages. The FAQs already exist in the component data — just wrap them in a `FAQPage` schema script alongside the existing service schema. | 30 min per service page (3 total = 90 min) | High — FAQs are highly cite-able | Finding 7 |
| **Rewrite blog post intros to BLUF.** Lead with the answer in the first sentence. Same for first sentence of each H2. | 2–3 hrs across 6 posts | Medium-High — affects every chunk AI extracts | Finding 6 |
| **Attribute posts to Erich or Alejandro** specifically (where they're the actual author). Add an author bio component shown at the top of each post (photo + credentials + LinkedIn). | 1–2 hrs | Medium — E-E-A-T signal | Finding 10 |
| **Update README's "Next.js 14" → "Next.js 16"** | 1 min | Cosmetic | Finding 14 |
| **Name proprietary builds** in case studies and llms.txt. "Ad Ops Agent" → "Duality Ad Ops Engine" (or your preferred branded name). Update `lib/case-studies.ts` `buildName` field, llms.txt work section, and any mentions in blog posts. | 2 hrs | High — branded entities get remembered | Finding 4 |

### BUILD (new content / pages) — month 1

| Action | Effort | Impact | Maps to |
|---|---|---|---|
| **3 listicle posts** targeting high-AI-citation queries: <br>1. "Best AI Agent Frameworks for Production in 2026" (LangChain, LlamaIndex, CrewAI, Autogen, vs custom — Duality's stance) <br>2. "Best Tools for LLM Fine-Tuning in 2026" (OpenAI fine-tuning, Anthropic, Together, Modal, custom — with cost/use case breakdown) <br>3. "Best Workflow Automation Tools for 2026: n8n vs Zapier vs Make vs Custom" | 6–10 hrs each | **Very high** — directly addresses Finding 1, the #1 content gap | Finding 1 |
| **2 comparison/vs posts:** <br>1. "Custom AI Development vs Hiring an In-House Engineer: A Cost & Speed Comparison" (this is your actual sales pitch — turn it into the canonical answer AI cites) <br>2. "RAG vs Fine-Tuning: When to Use Each (with Real Examples)" | 4–6 hrs each | Very high | Finding 1, 13 |
| **1 original-data post:** "What We Learned Shipping 4 Autonomous AI Agents to Production" — pull every concrete number from your case studies into one piece. ROAS targets hit, decisions logged, latency numbers, cost-per-action. AI loves original numbers. | 4 hrs | High — citable stats become Duality Labs' "claim to fame" | Finding 11 |
| **1 "Duality Labs Framework" post:** Define a named framework you use ("The Duality 4-Phase AI Implementation Method" or similar). Define it explicitly. Then mention it in every case study and blog post going forward. | 3 hrs | Medium-High — long-game brand association | Finding 4 |
| **Launch YouTube channel** with 4–6 starter videos targeting *search-hit* topics: <br>• "How to build an AI agent in 2026 (full walkthrough)" <br>• "RAG vs Fine-tuning explained in 5 minutes" <br>• "What our autonomous Meta Ads agent actually does (case study)" <br>• "Build vs buy AI: the actual decision framework" <br>• "How to automate your business with AI (no hype)" <br>Each video: keyword in title, keyword spoken aloud, timestamps for chapters, real summary in description with target keyword in first 2 lines. | 2–3 days per video for a starter quality bar; can batch-record | **Highest single lever** per the course | Finding 3 |
| **Add a "By the Numbers" component** on the homepage above the case studies preview. Hardcoded stats: "4 production AI systems shipped • 300+ autonomous decisions logged • 11-module HIPAA platform • $XXk in annual operator time saved." | 2 hrs build + 30 min data | Medium-High | Finding 11 |
| **Add "How did you hear about us?" to the contact form.** Requires moving off `mailto:` to Formspree/Resend. Self-reported AI attribution is irreplaceable. | 2–3 hrs (mostly the form upgrade) | Long-term measurement gold | Finding 12 |

### INFLUENCE (off-site, the highest-correlated signal) — quarter 1

| Action | Effort | Impact | Maps to |
|---|---|---|---|
| **Get on 3 "Best AI development agencies" listicles.** Targets: Clutch (free profile), G2 (free profile), Built In Miami, Designrush. These are exactly the Tier 1 / listicle pages AI cites. | 3–5 hrs over a week (mostly forms + screenshots) | **Highest correlated lever in the course** | Finding 5 |
| **Pitch 1–2 founder bylines on industry publications.** Targets: SaaStr, Indie Hackers, Founder Reports, Tech Miami. Topic angle: practical AI-agent lessons from production (you have the case studies to back it). | ~5–8 hrs per piece (draft + pitch + back-and-forth) | High — Tier 1 mentions per playbook | Finding 5 |
| **Reddit presence.** Identify 3–4 threads per week on r/AIAgents, r/MachineLearning, r/SaaS, r/SmallBusiness where the question is genuinely in your wheelhouse. Contribute real answers (no spam). Use the Brand Radar process: Site Explorer → reddit.com → organic keywords ranking top-5 → include filter for "AI agent" / "LLM fine-tuning" / "AI automation." | 1 hr / week, ongoing | High — Reddit is one of ChatGPT's most-cited sources | Finding 5 |
| **One Founder LinkedIn newsletter** posting weekly case study highlights with named builds ("How we built the Duality Ad Ops Engine"). LinkedIn pages are indexed and cited. | 1 hr / week | Medium | Finding 4, 5 |

---

## Part 5 — Implementation Plan

### This Week (10–12 hrs total)
1. **Refresh `building-ai-agents.mdx`** + add `dateModified` field to blog (4 hrs).
2. **Build `/case-studies` index page** as listicle, add to sitemap, fix breadcrumb 404 (2 hrs).
3. **Add FAQ JSON-LD** to 3 service pages (1.5 hrs).
4. **Rewrite blog intros to BLUF** across 6 posts (2 hrs).
5. **Rename builds in `lib/case-studies.ts`** with proprietary names + update llms.txt (2 hrs).
6. **README typo fix** (1 min).

### This Month (~30 hrs)
- Three listicle posts (Best AI Agent Frameworks / Fine-Tuning Tools / Workflow Automation).
- Two comparison posts (Custom vs in-house / RAG vs Fine-Tuning).
- One original-data post ("What we learned shipping 4 AI agents").
- Launch YouTube channel with first 2 videos.
- Add "How did you hear about us?" + upgrade contact form.

### This Quarter (~50 hrs)
- 4 more YouTube videos (6 total starter library).
- 3 listicle profile submissions (Clutch, G2, Built In).
- 1 founder byline pitched and published.
- Add Erich/Alejandro author bios to all blog posts.
- Define and publish "Duality [Framework Name]."
- Establish monthly Brand Radar check (or equivalent — manual checks via ChatGPT/Perplexity prompts for "best AI automation agency for [your ICP]").

### Ongoing rhythm
- **Weekly:** 1 Reddit comment in your space; 1 LinkedIn post.
- **Monthly:** Refresh 1 sleeper post with real updates; review which pages got AI traffic (when GA is set up for it); check for AI-referrer 404s.
- **Quarterly:** Rerun the 6-dimension gap analysis; publish 1 named-framework post or 1 original-data report.

---

## Part 6 — What I Did NOT Recommend

Worth being explicit, since the course mentions all of these:

- **Don't prioritize `llms.txt` work** — already in place, no major LLM provider officially supports it as of Q2 2026. Don't spend more time here until that changes.
- **Don't add schema for the sake of schema** — you already have the right ones. Schema correlation with AI citation is mixed per Ahrefs.
- **Don't rewrite for "AI" — write for humans.** The course is explicit: there is no special AI format. Good content for humans = good content for AI.
- **Don't chase Cloudflare's "Block AI bots" toggle.** You're on Vercel, not Cloudflare. You're already clean here.
- **Don't write 3,000-word posts to "rank better."** Correlation between word count and AI citation = 0.04. Several of your existing posts are already long enough. Optimize structure, not length.
- **Don't lean heavily on Ahrefs Brand Radar** unless you're going to pay for the tool. The course is built around it but you can approximate with manual ChatGPT/Perplexity audits (search your brand and competitors monthly).

---

## Appendix A — Playbook Cross-Reference

| Audit finding | Playbook section |
|---|---|
| Finding 1 (listicles) | Part 5 §"Format matters"; Part 4 §"Where AI hasn't touched yet" |
| Finding 2 (staleness) | Part 5 §"Freshness matters a lot"; Part 10 §"This-week checklist" |
| Finding 3 (YouTube) | Part 7 (entire section) |
| Finding 4 (branded entities) | Part 5 §"Label your original ideas with your brand" |
| Finding 5 (third-party mentions) | Part 6 (Tier 1 mentions); the "10 Highest-Leverage Levers" #2 |
| Finding 6 (BLUF) | Part 5 §"BLUF" |
| Finding 7 (FAQ schema) | Part 8.5 |
| Finding 8 (case-studies 404) | Part 8.6 |
| Finding 10 (named authors) | Part 5 §"Entity-rich writing" |
| Finding 11 (original data) | Part 5 §"data-driven content with original stats" |
| Finding 12 (self-attribution) | Part 9.3 (the third pillar) |
| Finding 13 (topic coverage) | Part 3 (6-dimension gap analysis) |

---

*This audit was generated by applying the AEO playbook synthesized from the Ahrefs AI SEO Course (12 lessons, 87 min of instruction) to the duality-labs repo. The playbook lives at `../AEO-PLAYBOOK.md` and the source transcripts at `../transcripts/`.*
