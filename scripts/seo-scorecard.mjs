#!/usr/bin/env node
// SEO + AEO scorecard for the live site. Same checks every run, so the score is comparable over time.
// Usage: node scripts/seo-scorecard.mjs [baseUrl]
// Writes reports/seo/<date>.json and appends a row to reports/seo/history.csv.
import fs from 'node:fs'

const BASE = (process.argv[2] || 'https://www.dualitylabs.ai').replace(/\/$/, '')
const AI_BOTS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']
const SECURITY_HEADERS = ['strict-transport-security', 'x-content-type-options', 'x-frame-options', 'referrer-policy']

const get = async (url, opts = {}) => {
  const res = await fetch(url, { redirect: opts.redirect || 'follow', headers: { 'user-agent': 'DualityLabs-SEO-Scorecard' } })
  return { status: res.status, headers: res.headers, text: opts.head ? '' : await res.text() }
}
const match = (html, re) => (html.match(re) || [])[1]?.trim() ?? ''
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')

function checkPage(url, status, html) {
  const title = decode(match(html, /<title>([^<]*)<\/title>/))
  const desc = decode(match(html, /<meta name="description" content="([^"]*)"/))
  const canonical = match(html, /<link rel="canonical" href="([^"]*)"/)
  const h1s = (html.match(/<h1[\s>]/g) || []).length
  const ldTypes = [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1])
  const words = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  const checks = {
    loads: status === 200,
    title_length: title.length >= 15 && title.length <= 65,
    description_length: desc.length >= 70 && desc.length <= 160,
    canonical_self: !!canonical && new URL(canonical).pathname.replace(/\/$/, '') === new URL(url).pathname.replace(/\/$/, ''),
    one_h1: h1s === 1,
    structured_data: ldTypes.length > 0,
    enough_content: words >= 300,
  }
  return { url, title, title_len: title.length, desc_len: desc.length, h1s, words, schema: [...new Set(ldTypes)], checks }
}

async function main() {
  const site = {}
  const robots = await get(`${BASE}/robots.txt`)
  site.robots_allows_ai_bots = robots.status === 200 && AI_BOTS.every((b) => robots.text.includes(b)) && !/Disallow:\s*\/\s*$/m.test(robots.text)
  site.llms_txt = (await get(`${BASE}/llms.txt`)).status === 200
  const sitemap = await get(`${BASE}/sitemap.xml`)
  // Sitemap lists production URLs; point them at BASE so a local or preview build can be scored too.
  const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => BASE + new URL(m[1]).pathname.replace(/^\/$/, ''))
  site.sitemap = sitemap.status === 200 && urls.length > 0
  const home = await get(BASE)
  site.security_headers = SECURITY_HEADERS.every((h) => home.headers.has(h))

  const pages = []
  for (const url of urls) {
    const r = await get(url, { redirect: 'manual' })
    pages.push(checkPage(url, r.status, r.text))
  }
  const allSchema = new Set(pages.flatMap((p) => p.schema))
  site.organization_schema = allSchema.has('Organization') || /"Organization"/.test(home.text)
  site.faq_schema = allSchema.has('FAQPage')
  site.sitemap_urls_all_200 = pages.every((p) => p.checks.loads)

  // Page checks are 60 points, averaged over every sitemap URL; site checks are 40.
  const pageKeys = Object.keys(pages[0]?.checks || {})
  const pagePct = pages.length ? pages.reduce((s, p) => s + Object.values(p.checks).filter(Boolean).length, 0) / (pages.length * pageKeys.length) : 0
  const siteKeys = Object.keys(site)
  const sitePct = Object.values(site).filter(Boolean).length / siteKeys.length
  const score = Math.round(pagePct * 60 + sitePct * 40)

  const failures = {}
  for (const p of pages) for (const [k, ok] of Object.entries(p.checks)) if (!ok) (failures[k] ||= []).push(p.url.replace(BASE, '') || '/')

  const date = new Date().toISOString().slice(0, 10)
  const report = { date, base: BASE, score, page_checks_pct: Math.round(pagePct * 100), site_checks: site, pages_checked: pages.length, failures, pages }
  fs.mkdirSync('reports/seo', { recursive: true })
  fs.writeFileSync(`reports/seo/${date}.json`, JSON.stringify(report, null, 2))
  const hist = 'reports/seo/history.csv'
  const prev = fs.existsSync(hist) ? fs.readFileSync(hist, 'utf8').trim().split('\n').slice(1).pop() : null
  if (!fs.existsSync(hist)) fs.writeFileSync(hist, 'date,score,pages,page_checks_pct\n')
  fs.appendFileSync(hist, `${date},${score},${pages.length},${report.page_checks_pct}\n`)

  const prevScore = prev ? Number(prev.split(',')[1]) : null
  console.log(`\nSEO/AEO score: ${score}/100${prevScore !== null ? `  (last run: ${prevScore}, ${score - prevScore >= 0 ? '+' : ''}${score - prevScore})` : ''}`)
  console.log(`Pages checked: ${pages.length}   Page checks passing: ${report.page_checks_pct}%\n`)
  console.log('Site checks:')
  for (const [k, ok] of Object.entries(site)) console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${k}`)
  console.log('\nPage check failures:')
  if (!Object.keys(failures).length) console.log('  none')
  for (const [k, list] of Object.entries(failures)) console.log(`  ${k} (${list.length}): ${list.join(', ')}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
