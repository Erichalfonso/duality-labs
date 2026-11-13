'use client'

import { useState } from 'react'
import { CALENDLY_URL, type PlanDoc } from '@/lib/plan'
import { LADDER, buildRoadmap } from '@/lib/roadmap'

// One stylesheet for screen and print: on screen each page is a card, when saved as PDF each is a Letter page.
const CSS = `
.rm { --ink:#0A0A0A; --blue:#0066FF; --sky:#DCE8FF; --yellow:#FFD60A; --grey:#525252; --line:#E5E5E5; --soft:#F4F6FA; --navy:#0B1020; color:var(--ink); -webkit-print-color-adjust:exact; print-color-adjust:exact; }
.rm-page { position:relative; background:#fff; border:1px solid var(--line); border-radius:18px; padding:28px 20px 56px; margin-bottom:18px; overflow:hidden; }
.rm-runner { display:flex; justify-content:space-between; gap:12px; font-size:9.5px; letter-spacing:.08em; font-weight:700; text-transform:uppercase; margin-bottom:22px; }
.rm-runner b { color:var(--blue); }
.rm-foot { position:absolute; left:20px; right:20px; bottom:16px; display:flex; justify-content:space-between; border-top:1px solid var(--line); padding-top:8px; font-size:10px; font-weight:700; letter-spacing:.1em; }
.rm-dark { background:var(--navy); color:#fff; border-color:var(--navy); } .rm-dark .rm-foot { border-color:#2A3045; }
.rm-blue { background:var(--blue); color:#fff; border-color:var(--blue); } .rm-blue .rm-foot { border-color:#3D8BFF; }
.rm-psi { font-family:Georgia, serif; font-weight:700; }
.rm-mono { font-family:'JetBrains Mono', monospace; }
.rm-h1 { font-size:clamp(34px, 9vw, 54px); line-height:.95; font-weight:800; letter-spacing:-.03em; margin:0; text-transform:uppercase; }
.rm-h2 { font-size:20px; font-weight:800; letter-spacing:-.01em; margin:22px 0 10px; text-transform:uppercase; }
.rm-p { font-size:14px; line-height:1.7; margin:0 0 10px; }
.rm-accent { color:var(--blue); } .rm-dark .rm-accent { color:var(--yellow); }
.rm-tag { display:inline-block; background:var(--blue); color:#fff; font-weight:700; font-size:11px; padding:5px 10px; margin-bottom:12px; text-transform:uppercase; }
.rm-cover { padding:0; }
.rm-cover-top { background:var(--navy); color:#fff; text-align:center; padding:40px 20px 30px; }
.rm-cover-bar { height:22px; background:var(--blue); }
.rm-cover-body { text-align:center; padding:30px 20px 70px; }
.rm-ladder { display:flex; flex-direction:column-reverse; gap:8px; margin-top:18px; }
.rm-rung { display:flex; align-items:center; gap:12px; border:2px solid var(--line); border-radius:10px; padding:10px 12px; }
.rm-rung .n { font-family:'JetBrains Mono', monospace; font-weight:700; font-size:18px; width:24px; color:var(--grey); }
.rm-rung .t { font-weight:800; font-size:14px; text-transform:uppercase; }
.rm-rung .d { font-size:12px; color:var(--grey); }
.rm-rung.here { background:var(--blue); border-color:var(--blue); color:#fff; } .rm-rung.here .n, .rm-rung.here .d { color:var(--sky); }
.rm-rung.next { border-color:var(--blue); border-style:dashed; }
.rm-pill { margin-left:auto; font-family:'JetBrains Mono', monospace; font-size:9.5px; font-weight:700; padding:4px 7px; border-radius:4px; background:var(--yellow); color:var(--ink); white-space:nowrap; }
.rm-card { border:1px solid var(--line); border-radius:12px; padding:14px 16px; background:var(--soft); margin-top:14px; }
.rm-card h3 { margin:0 0 6px; font-size:11px; letter-spacing:.12em; text-transform:uppercase; font-family:'JetBrains Mono', monospace; color:var(--blue); }
.rm-titlebar { background:var(--ink); color:#fff; text-align:center; font-weight:800; font-size:clamp(22px, 6vw, 34px); padding:12px; text-transform:uppercase; }
.rm-titlebar span { color:#5C9BFF; }
.rm-table { width:100%; border-collapse:collapse; font-size:12px; }
.rm-table th { background:var(--ink); color:#fff; text-transform:uppercase; font-size:10px; letter-spacing:.06em; padding:8px; }
.rm-table td { border-bottom:1px solid var(--line); padding:8px; text-align:center; line-height:1.45; vertical-align:middle; }
.rm-table td.k { background:var(--blue); color:#fff; font-weight:800; text-align:left; font-size:10px; text-transform:uppercase; width:24%; }
.rm-table tr.meta td { text-align:left; }
.rm-table tr.bottom td { background:var(--ink); color:#fff; font-weight:700; }
.rm-flow { display:flex; flex-direction:column; gap:6px; margin:18px 0; }
.rm-box { border:2px solid var(--line); border-radius:10px; padding:10px; text-align:center; font-weight:800; font-size:14px; }
.rm-box small { display:block; font-weight:500; font-size:11px; color:var(--grey); }
.rm-box.ai { background:var(--blue); border-color:var(--blue); color:#fff; } .rm-box.ai small { color:var(--sky); }
.rm-box.you { background:var(--yellow); border-color:var(--yellow); }
.rm-arrow { text-align:center; font-weight:800; color:var(--blue); transform:rotate(90deg); }
.rm-steps { list-style:none; padding:0; margin:0; counter-reset:s; }
.rm-steps li { counter-increment:s; position:relative; padding-left:36px; margin-bottom:10px; font-size:14px; line-height:1.55; }
.rm-steps li::before { content:counter(s); position:absolute; left:0; top:0; width:24px; height:24px; border-radius:50%; background:var(--blue); color:#fff; font-family:'JetBrains Mono', monospace; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; }
.rm-cols { display:grid; grid-template-columns:1fr; gap:12px; }
.rm-list { list-style:none; padding:0; margin:0; } .rm-list li { font-size:13.5px; line-height:1.55; margin-bottom:6px; display:flex; gap:8px; }
.rm-big { background:var(--yellow); border-radius:12px; padding:16px; text-align:center; margin-top:14px; }
.rm-big .n { font-size:clamp(22px, 6vw, 32px); font-weight:800; }
.rm-chips { display:flex; flex-wrap:wrap; gap:8px; }
.rm-chip { background:var(--ink); color:#fff; font-size:12.5px; padding:7px 11px; }
.rm-chip.warn { background:#fff; color:var(--ink); border:2px solid var(--ink); }
.rm-timeline { margin:18px 0 0 10px; border-left:4px solid var(--blue); }
.rm-wk { position:relative; padding:0 0 20px 24px; }
.rm-wk::before { content:''; position:absolute; left:-13px; top:2px; width:18px; height:18px; border-radius:50%; background:#fff; border:4px solid var(--blue); }
.rm-wk .when { font-family:'JetBrains Mono', monospace; font-size:11px; font-weight:700; color:var(--blue); letter-spacing:.1em; }
.rm-wk .what { font-size:16px; font-weight:800; margin:2px 0 4px; }
.rm-check { display:flex; gap:12px; border-bottom:1px solid var(--line); padding:9px 0; font-size:13px; line-height:1.5; }
.rm-check .bx { width:17px; height:17px; flex:none; border:2px solid var(--ink); border-radius:4px; margin-top:2px; }
.rm-check b { display:block; }
.rm-dl { display:grid; grid-template-columns:1fr; gap:8px; }
.rm-dl div { border-bottom:1px solid var(--line); padding:8px 0; font-size:13px; line-height:1.5; }
.rm-dl b { display:block; font-size:12px; text-transform:uppercase; letter-spacing:.06em; }
.rm-cta { display:block; text-align:center; background:var(--blue); color:#fff; font-weight:800; text-transform:uppercase; padding:16px 24px; border-radius:999px; font-size:17px; text-decoration:none; }
.rm-actions { display:flex; gap:10px; margin-bottom:18px; }
.rm-actions button { flex:1; font-family:'JetBrains Mono', monospace; font-size:13px; border:2px solid rgba(10,10,10,.15); border-radius:999px; padding:12px; background:#fff; cursor:pointer; }
.rm-actions button:hover { border-color:var(--blue); }
.rm-glance { display:grid; grid-template-columns:1fr; gap:10px; text-align:left; margin:18px 0; }
.rm-glance div { border:1px solid var(--line); border-radius:12px; padding:14px 16px; }
.rm-glance .k { font-family:'JetBrains Mono', monospace; font-size:10px; letter-spacing:.14em; color:var(--blue); font-weight:700; text-transform:uppercase; border:none; padding:0; }
.rm-glance .v { font-size:18px; font-weight:800; border:none; padding:0; margin-top:4px; line-height:1.25; }
.rm-glance .s { font-size:12px; color:var(--grey); border:none; padding:0; margin-top:4px; }
.rm-glance .hot { background:var(--yellow); border-color:var(--yellow); }
.rm-toc { list-style:none; padding:0; margin:0; text-align:left; } .rm-toc li { display:flex; justify-content:space-between; border-bottom:1px dashed var(--line); padding:5px 0; font-size:13px; }
.rm-toc li span:last-child { font-family:'JetBrains Mono', monospace; color:var(--grey); }
.rm-sticky { position:fixed; left:0; right:0; bottom:0; z-index:10; padding:10px 16px; background:rgba(255,255,255,.95); border-top:1px solid var(--line); }
@media (min-width:640px) {
  .rm-page { padding:40px 44px 64px; } .rm-foot { left:44px; right:44px; }
  .rm-flow { flex-direction:row; } .rm-box { flex:1; display:flex; flex-direction:column; justify-content:center; } .rm-arrow { align-self:center; transform:none; }
  .rm-cols { grid-template-columns:1fr 1fr; } .rm-dl { grid-template-columns:1fr 1fr; column-gap:24px; } .rm-glance { grid-template-columns:1fr 1fr; }
  .rm-sticky { display:none; }
}
@media print {
  @page { size:Letter; margin:0; }
  body * { visibility:hidden; } .rm, .rm * { visibility:visible; }
  .rm { position:absolute; left:0; top:0; width:8.5in; }
  .rm-noprint, .rm-sticky { display:none !important; }
  .rm-page { width:8.5in; height:11in; margin:0; border:none; border-radius:0; padding:0.8in 0.65in 0.9in; page-break-after:always; break-after:page; display:flex; flex-direction:column; justify-content:flex-start; }
  .rm-page.rm-cover { padding:0; justify-content:flex-start; }
  .rm-cover-body { flex:1; display:flex; flex-direction:column; }
  .rm-page.rm-dark { justify-content:center; }
  .rm-cover-body { padding:.3in .65in .4in !important; }
  .rm-appx .rm-h1 { font-size:40px; } .rm-appx .rm-h2 { margin:16px 0 6px; font-size:17px; } .rm-appx .rm-dl div, .rm-appx .rm-check, .rm-appx .rm-list li { font-size:12px; padding-top:5px; padding-bottom:5px; }
  .rm-runner { position:absolute; top:.35in; left:.65in; right:.65in; }
  .rm-foot { left:.65in; right:.65in; bottom:.35in; }
  .rm-flow { flex-direction:row; } .rm-box { flex:1; display:flex; flex-direction:column; justify-content:center; } .rm-arrow { align-self:center; transform:none; }
  .rm-cols { grid-template-columns:1fr 1fr; } .rm-dl { grid-template-columns:1fr 1fr; column-gap:24px; } .rm-glance { grid-template-columns:1fr 1fr; }
}
`

export default function PlanDocument({ doc, link, onCall }: { doc: PlanDoc; link?: string | null; onCall?: () => void }) {
  const rm = buildRoadmap(doc)
  const [copied, setCopied] = useState(false)
  const pages = 9
  const stepLabel = `Step ${rm.step}: ${rm.rung.name}`

  const monthly = doc.hours === '20+' ? 'over 80' : doc.hours === 'Under 5' ? 'up to 20' : doc.hours.split('-').map((n) => Number(n) * 4).join(' to ')
  const helperShort = rm.helper.name.replace(/^The /, '')
  const firstWeek = rm.weeks[0]

  const copy = async () => {
    if (!link) return
    await navigator.clipboard?.writeText(link).catch(() => {})
    setCopied(true)
    window.gtag?.('event', 'roadmap_copy_link')
  }

  const Runner = () => (
    <div className="rm-runner"><span>AI Roadmap · <b>Step {rm.step}:</b> {rm.rung.name}</span><span>Prepared for {doc.firstName}</span></div>
  )
  const Foot = ({ n }: { n: number }) => (
    <div className="rm-foot"><span><span className="rm-psi">Ψ</span> DUALITY LABS</span><span>{n} / {pages}</span></div>
  )
  const Flow = ({ compact }: { compact?: boolean }) => (
    <div className="rm-flow">
      {(compact ? [rm.helper.flow[0], rm.helper.flow[1], rm.helper.flow[3]] : rm.helper.flow).map((box, i, all) => (
        <div key={box.label + i} style={{ display: 'contents' }}>
          <div className={`rm-box ${box.kind ?? ''}`}>
            {box.kind === 'ai' && <span className="rm-psi" style={{ fontSize: 18 }}>Ψ</span>}
            {box.label.charAt(0).toUpperCase() + box.label.slice(1)}
            {!compact && <small>{box.note}</small>}
          </div>
          {i < all.length - 1 && <div className="rm-arrow">→</div>}
        </div>
      ))}
    </div>
  )

  return (
    <article className="rm pb-24 sm:pb-0">
      <style>{CSS}</style>

      <div className="rm-actions rm-noprint">
        <button type="button" onClick={() => { window.gtag?.('event', 'roadmap_download_pdf'); window.print() }}>Download PDF</button>
        {link && <button type="button" onClick={copy}>{copied ? 'Link copied' : 'Copy link'}</button>}
      </div>

      {/* 1 Cover */}
      <section className="rm-page rm-cover">
        <div className="rm-cover-top">
          <div className="rm-mono" style={{ fontSize: 11, letterSpacing: '.2em', color: '#5C9BFF', marginBottom: 14 }}>PREPARED FOR {doc.firstName.toUpperCase()} · {doc.firmType.toUpperCase()}</div>
          <h1 className="rm-h1" style={{ fontSize: 'clamp(44px, 12vw, 76px)' }}>Your AI<br />Roadmap</h1>
          <p className="rm-p" style={{ maxWidth: 440, margin: '14px auto 0', color: '#C9D3E8' }}>Where your firm stands with AI today, the first job to hand off, and a 6-week plan to get there.</p>
        </div>
        <div className="rm-cover-bar" />
        <div className="rm-cover-body" style={{ padding: '26px 20px 70px' }}>
          <div className="rm-mono" style={{ fontSize: 11, letterSpacing: '.2em', color: 'var(--grey)' }}>YOUR PLAN AT A GLANCE</div>
          <div className="rm-glance">
            <div><div className="k">Where you are</div><div className="v">{stepLabel}</div><div className="s">of 5 steps on the AI Readiness Ladder</div></div>
            <div><div className="k">{rm.step === 0 ? 'Your first helper' : 'Your next helper'}</div><div className="v">{rm.helper.name.replace(/^The /, '').replace(/^./, (c) => c.toUpperCase())}</div><div className="s">{rm.helper.summary.split('. ')[0].replace(/\.*$/, '.')}</div></div>
            <div className="hot"><div className="k" style={{ color: 'var(--ink)' }}>Time on this today</div><div className="v">{doc.hours} hours a week</div><div className="s" style={{ color: 'var(--ink)' }}>That is {monthly} hours a month, from your answers.</div></div>
            <div className="hot"><div className="k" style={{ color: 'var(--ink)' }}>Time back · estimate</div><div className="v">About {rm.hoursBack}</div><div className="s" style={{ color: 'var(--ink)' }}>Your real number depends on your firm.</div></div>
          </div>
          <div style={{ textAlign: 'left', border: '2px solid var(--blue)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
            <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '.14em', color: 'var(--blue)', fontWeight: 700 }}>START THIS WEEK · {firstWeek.when.toUpperCase()}</div>
            <div style={{ fontWeight: 800, fontSize: 16, margin: '4px 0 2px' }}>{firstWeek.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.5 }}>{firstWeek.detail}</div>
          </div>
          <ul className="rm-toc">
            {[['Where you are on the ladder', 2], ['What holds you back, and how to move up', 3], [`How the ${helperShort} works`, 4], ['Your week, before and after', 5], ['Your 6-week roadmap', 6], ['Before you build: your rules', 7], ['Technical appendix', 8], ['Want us to build it?', 9]].map(([t, n]) => (
              <li key={t as string}><span>{t}</span><span>{String(n).padStart(2, '0')}</span></li>
            ))}
          </ul>
          <div style={{ marginTop: 'auto', paddingTop: 14, fontWeight: 800, letterSpacing: '.14em', fontSize: 15 }}><span className="rm-psi rm-accent" style={{ fontSize: 22 }}>Ψ</span>&nbsp; DUALITY LABS</div>
        </div>
      </section>

      {/* 2 You are here + what's next */}
      <section className="rm-page">
        <Runner />
        <h1 className="rm-h1">You are <span className="rm-accent">here</span></h1>
        <p className="rm-p" style={{ color: 'var(--grey)', marginTop: 10 }}>The AI Readiness Ladder for accounting firms. Five steps, from all manual to a back office that runs itself while you review.</p>
        <div className="rm-ladder">
          {LADDER.map((rung, i) => (
            <div key={rung.name} className={`rm-rung ${i === rm.step ? 'here' : i === rm.step + 1 ? 'next' : ''}`}>
              <div className="n">{i}</div>
              <div><div className="t">{rung.name}</div><div className="d">{rung.detail}</div></div>
              {i === rm.step && <span className="rm-pill">YOU ARE HERE</span>}
              {i === rm.step + 1 && <span className="rm-pill" style={{ background: 'var(--sky)' }}>NEXT STEP</span>}
            </div>
          ))}
        </div>
        <div className="rm-card"><h3>Why you are at step {rm.step}</h3><p className="rm-p" style={{ margin: 0 }}>{rm.whyHere}</p></div>
        {rm.nextRung && (
          <div className="rm-cols" style={{ marginTop: 14 }}>
            <div className="rm-card" style={{ marginTop: 0, background: 'var(--blue)', borderColor: 'var(--blue)', color: '#fff' }}><h3 style={{ color: '#fff' }}>Step {rm.step + 1}: what changes</h3><p className="rm-p" style={{ margin: 0 }}>{rm.next.changes}</p></div>
            <div className="rm-card" style={{ marginTop: 0, background: 'var(--blue)', borderColor: 'var(--blue)', color: '#fff' }}><h3 style={{ color: '#fff' }}>Then you graduate by</h3><p className="rm-p" style={{ margin: 0 }}>{rm.next.graduateBy.charAt(0).toUpperCase() + rm.next.graduateBy.slice(1)}</p></div>
          </div>
        )}
        <Foot n={2} />
      </section>

      {/* 3 Stage table */}
      <section className="rm-page">
        <Runner />
        <div className="rm-titlebar">Step {rm.step}: <span>{rm.rung.name}</span></div>
        <table className="rm-table">
          <tbody>
            <tr className="meta"><td className="k">Your firm</td><td colSpan={2}>{doc.firmType} · {doc.headcount === 'Just me' ? 'just you' : `${doc.headcount} people`}</td></tr>
            {doc.tools.length > 0 && <tr className="meta"><td className="k">Your tools</td><td colSpan={2}>{doc.tools.join(' · ')}</td></tr>}
            <tr className="meta"><td className="k">Biggest time sink</td><td colSpan={2}>{doc.task === 'Other' && doc.followUp ? doc.followUp : doc.task} · {doc.hours} hours a week</td></tr>
            <tr><th /><th>What holds you back</th><th>To move up</th></tr>
            {rm.table.map((row) => (
              <tr key={row.area}><td className="k">{row.area}</td><td>{row.holdsBack}</td><td>{row.toMoveUp}</td></tr>
            ))}
            <tr className="bottom"><td className="k"><i>Bottom line</i></td><td>{rm.bottomLine[0]}</td><td>{rm.bottomLine[1]}</td></tr>
          </tbody>
        </table>
        <div className="rm-card" style={{ marginTop: 22, background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>
          <h3 style={{ color: 'var(--yellow)' }}>Remember</h3>
          <p className="rm-p" style={{ margin: 0 }}>Don’t hand off everything at once. Pick one job, get it right, then add the next. That is how you climb the ladder.</p>
        </div>
        <Foot n={3} />
      </section>

      {/* 4 The helper */}
      <section className="rm-page">
        <Runner />
        <div><span className="rm-tag">{rm.step === 0 ? 'Your first helper' : 'Your next helper'}</span></div>
        <h1 className="rm-h1">{rm.helper.name.replace(/ helper$/, '')}<br /><span className="rm-accent">helper</span></h1>
        <p className="rm-p" style={{ fontSize: 15, marginTop: 12 }}>{rm.helper.summary}</p>
        <Flow />
        <h2 className="rm-h2">How it works</h2>
        <ol className="rm-steps">{rm.helper.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        <div className="rm-card"><h3>Why this task</h3><p className="rm-p" style={{ margin: 0 }}>{rm.helper.whyThis}</p></div>
        <Foot n={4} />
      </section>

      {/* 5 Before / after */}
      <section className="rm-page">
        <Runner />
        <h1 className="rm-h1">Your week,<br /><span className="rm-accent">before &amp; after</span></h1>
        <div className="rm-cols" style={{ marginTop: 22 }}>
          <div className="rm-card" style={{ marginTop: 0 }}><h3 style={{ color: 'var(--ink)' }}>Today</h3>
            <ul className="rm-list">{rm.before.map((s) => <li key={s}><span style={{ color: '#DC2626', fontWeight: 800 }}>✕</span>{s}</li>)}</ul></div>
          <div className="rm-card" style={{ marginTop: 0, background: 'var(--blue)', borderColor: 'var(--blue)', color: '#fff' }}><h3 style={{ color: '#fff' }}>With your helper</h3>
            <ul className="rm-list">{rm.after.map((s) => <li key={s}><span style={{ fontWeight: 800 }}>✓</span>{s}</li>)}</ul></div>
        </div>
        <div className="rm-big">
          <div className="rm-mono" style={{ fontSize: 11, letterSpacing: '.14em', fontWeight: 700 }}>TIME BACK · ESTIMATE</div>
          <div className="n">About {rm.hoursBack}</div>
          <div style={{ fontSize: 12 }}>Based on the {doc.hours} hours you told us. Your real number depends on your firm.</div>
        </div>
        <div className="rm-cols" style={{ marginTop: 6 }}>
          <div><h2 className="rm-h2">Signs it’s working</h2><ul className="rm-list">{rm.signs.map((x) => <li key={x}><span className="rm-accent" style={{ fontWeight: 800 }}>✓</span>{x}</li>)}</ul></div>
          <div><h2 className="rm-h2">Warning signs</h2><ul className="rm-list">{rm.warnings.map((x) => <li key={x}><span style={{ color: '#DC2626', fontWeight: 800 }}>!</span>{x}</li>)}</ul></div>
        </div>
        <h2 className="rm-h2">What stays with you</h2>
        <div className="rm-chips">{rm.staysWithYou.map((x) => <span key={x} className="rm-chip">{x}</span>)}</div>
        <p style={{ fontSize: 11, color: '#8A93A6', marginTop: 12 }}>The helper never signs off work, files anything or gives advice. A person always reviews.</p>
        <Foot n={5} />
      </section>

      {/* 6 Roadmap */}
      <section className="rm-page">
        <Runner />
        <h1 className="rm-h1">Your 6-week<br /><span className="rm-accent">roadmap</span></h1>
        <div className="rm-timeline">
          {rm.weeks.map((w) => (
            <div key={w.when} className="rm-wk"><div className="when">{w.when.toUpperCase()}</div><div className="what">{w.title}</div><p className="rm-p" style={{ margin: 0 }}>{w.detail}</p></div>
          ))}
        </div>
        <div className="rm-card"><h3>Building it yourself</h3><p className="rm-p" style={{ margin: 0 }}>{rm.buildYourself}</p></div>
        <Foot n={6} />
      </section>

      {/* 7 Checklist */}
      <section className="rm-page">
        <Runner />
        <h1 className="rm-h1">Before you<br /><span className="rm-accent">build</span></h1>
        <p className="rm-p" style={{ color: 'var(--grey)', marginTop: 12 }}>Answer these first. They are your rules, and the helper is only as good as they are. Most firms can do this in an hour.</p>
        <div>{rm.checklist.map((c) => <div key={c.question} className="rm-check"><div className="bx" /><div><b>{c.question}</b>{c.hint.charAt(0).toUpperCase() + c.hint.slice(1)}</div></div>)}</div>
        <Foot n={7} />
      </section>

      {/* 8 Technical appendix */}
      <section className="rm-page rm-appx">
        <Runner />
        <span className="rm-tag" style={{ background: 'var(--ink)', alignSelf: 'flex-start' }}>For your IT person or builder</span>
        <h1 className="rm-h1">Technical<br /><span className="rm-accent">appendix</span></h1>
        <p className="rm-p" style={{ color: 'var(--grey)', marginTop: 12 }}>What it takes to build the {rm.helper.name.replace(/^The /, '')} with your tools. Tool details are from each vendor’s own documentation as of November 2026. Check them again before you build.</p>
        <h2 className="rm-h2">The pieces</h2>
        <div className="rm-dl">{rm.appendix.pieces.map((p) => <div key={p.name}><b>{p.name}</b>{p.what.charAt(0).toUpperCase() + p.what.slice(1)}</div>)}</div>
        {rm.appendix.connections.length > 0 && (<>
          <h2 className="rm-h2">Connecting your tools</h2>
          <div className="rm-dl">{rm.appendix.connections.map((c) => <div key={c.tool}><b>{c.tool}</b>{c.how}</div>)}</div>
        </>)}
        <h2 className="rm-h2">Security choices</h2>
        <ul className="rm-list">{rm.appendix.security.map((s) => <li key={s}><span className="rm-accent" style={{ fontWeight: 800 }}>→</span>{s}</li>)}</ul>
        <h2 className="rm-h2">Questions to ask whoever builds it</h2>
        <div>{rm.appendix.askYourBuilder.map((q) => <div key={q} className="rm-check"><div className="bx" /><div>{q}</div></div>)}</div>
        <Foot n={8} />
      </section>

      {/* 10 Offer */}
      <section className="rm-page rm-dark">
        <div className="rm-runner"><span>AI Roadmap · <b style={{ color: '#5C9BFF' }}>Step {rm.step}:</b> {rm.rung.name}</span><span>Prepared for {doc.firstName}</span></div>
        <h1 className="rm-h1" style={{ textAlign: 'center' }}>Want us to<br /><span className="rm-accent">build this</span><br />for you?</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 520, margin: '28px auto 0' }}>
          <img src="/team/erich-avatar.jpg" alt="Erich Alfonso" width={72} height={72} style={{ borderRadius: '50%', flex: 'none' }} />
          <p className="rm-p" style={{ margin: 0 }}>“We’re building case studies right now. So we’ll build this exact {rm.helper.name.replace(/^The /, '')} for your firm at no cost. You just give us feedback and let us share the results.”<br /><b>Erich Alfonso</b>, Co-founder</p>
        </div>
        <div style={{ maxWidth: 520, margin: '22px auto 26px' }}>
          {['We do the setup, the connections and the rules.', 'It runs next to your team until you trust it.', 'You stay in control. Nothing is final without a person.'].map((s) => (
            <div key={s} className="rm-check" style={{ borderColor: '#2A3045' }}><span style={{ color: 'var(--yellow)', fontWeight: 800 }}>✓</span><div>{s}</div></div>
          ))}
        </div>
        <div style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
          <a className="rm-cta" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={onCall}>Book a 15-min call</a>
          <div className="rm-mono" style={{ fontSize: 11, color: '#8A93A6', marginTop: 10 }}>{CALENDLY_URL.replace('https://', '')}</div>
        </div>
        <Foot n={9} />
      </section>

      <div className="rm-sticky rm-noprint">
        <a className="rm-cta" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={onCall}>Book a 15-min call</a>
      </div>
    </article>
  )
}
