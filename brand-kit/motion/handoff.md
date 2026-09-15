# Motion Video Handoff

## What This Is

A 30-second brand intro video for Duality Labs focused on AI automation for businesses. Target uses: website hero (AI/ML page), LinkedIn feed post, LinkedIn ads.

Style: white background, premium SaaS product demo aesthetic (Apple/Notion feel), blue accent (#0066FF), Inter + JetBrains Mono typography.

---

## Figma File

**File:** `Duality Labs — Motion Frames`  
**Key:** `wSiccxFsDVt1gnX4tMO2ry`  
**URL:** https://www.figma.com/design/wSiccxFsDVt1gnX4tMO2ry

### 8 Frames (all at 1920×1080, white background)

| Frame | Node ID | Duration | Description |
|---|---|---|---|
| 01 — Logo Reveal | 22:2 | 3–4s | Ψ symbol fades in on white with subtle blue wash |
| 02 — Logo Lockup | 22:5 | 3–4s | Dark horizontal logo + tagline |
| 03 — Command Input | 29:2 | 3–4s | Search bar: "Analyze Q1 sales reports and flag underperformers" + blue cursor + ENTER button |
| 04 — Agent Processing | 29:11 | 3–4s | Task card: 4 steps, step 3 active (blue highlight + progress bar) |
| 05 — Execution Pipeline | 30:2 | 3–4s | 6-step workflow, step 4 (Salesforce sync) active in blue |
| 06 — Actions Taken | 30:34 | 3–4s | Split panel: email sent on left, Salesforce AT RISK/FLAGGED records on right |
| 07 — Integrations | 31:2 | 3–4s | AGENT hub with dashed orbital ring, 8 tool chips (Salesforce, HubSpot, Gmail, Slack, Google Sheets, Notion, Zapier, OpenAI) |
| 08 — Outro | 22:9 | 3–4s | Dark logo + tagline + dualitylabs.ai |

### Frame 06 — Fixed
Meta text nodes (30:57, 30:62, 30:67) moved from x=1640 to x=1450 to fix edge clipping.

---

## Brand Assets

SVG sources: `public/logo/symbol-accent.svg`, `public/logo/logo-horizontal-dark.svg`

---

## After Effects MCP

**Repo:** `~/ProgrammingProjects/after-effects-mcp`  
**MCP config:** `duality-labs/.mcp.json` → `AfterEffectsMCP` server  
**Bridge script:** `/Applications/Adobe After Effects 2026/Scripts/ScriptUI Panels/mcp-bridge-auto.jsx`  
**Bridge comms:** file-based via `~/Documents/ae-mcp-bridge/ae_command.json`

### Setup (already done)
- Bridge installed and confirmed working — "Ready - Auto-run is ON" in AE panel
- `.mcp.json` written to project root
- AE must be open with `mcp-bridge-auto` panel visible for tools to work

---

## Next Steps for New Session

1. **Open After Effects** — open `mcp-bridge-auto` panel, confirm "Ready - Auto-run is ON"
2. **Start Claude Code** — `AfterEffectsMCP` loads from `.mcp.json` automatically
3. **Export frames from Figma** — use `get_screenshot` on all 8 node IDs (maxDimension=1920), download PNGs to `/tmp/`
4. **Import into AE** — import the 8 PNGs as footage
5. **Build the comp** — 1920×1080, 30s, 24fps
6. **Animate** — keyframe each scene per motion principles below
7. **Render** — MP4, 1080p, 24fps

---

## Motion Principles

- Ease-out curves only
- Fade-through-white transitions between scenes
- Elements reveal (fade/scale in) rather than fly in
- Hold key moments 1–2 seconds before cutting
- ~3–4 seconds per scene

---

## Brand Color Reference

| Token | Hex |
|---|---|
| Background | `#FFFFFF` |
| Card | `#F5F7FA` |
| Active card | `#EEF4FF` |
| Border | `#E1E6EB` |
| Text primary | `#0A0A0A` |
| Text secondary | `#6B7280` |
| Accent | `#0066FF` |
| Success | `#16A34A` |
| Danger | `#DC1414` |
| Warning | `#CE8F06` |
