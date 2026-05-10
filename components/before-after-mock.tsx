import type { MockKind } from '@/lib/case-studies'

function SpreadsheetMock() {
  const rows = Array.from({ length: 7 })
  return (
    <div className="absolute inset-0 bg-[#FAFAFA] p-2 sm:p-3 overflow-hidden">
      <div className="flex gap-1 mb-2">
        {['Zillow', 'Realtor', 'FB', 'Site'].map((t, i) => (
          <div
            key={i}
            className={`text-[7px] sm:text-[9px] font-mono px-1.5 py-0.5 rounded-t border border-b-0 ${
              i === 0
                ? 'bg-white border-border text-text'
                : 'bg-[#EFEFEF] border-border/60 text-text-secondary'
            }`}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="bg-white border border-border rounded-sm overflow-hidden">
        {rows.map((_, i) => (
          <div
            key={i}
            className={`grid grid-cols-5 border-b border-border/60 last:border-b-0 ${
              i === 0 ? 'bg-[#F4F4F4]' : ''
            }`}
          >
            {Array.from({ length: 5 }).map((_, j) => (
              <div
                key={j}
                className={`px-1 py-1 sm:py-1.5 border-r border-border/40 last:border-r-0 ${
                  (i === 2 && j === 1) || (i === 4 && j === 3)
                    ? 'bg-red-50'
                    : ''
                }`}
              >
                <div
                  className={`h-1 sm:h-1.5 rounded-sm ${
                    i === 0 ? 'bg-text/30' : 'bg-text/15'
                  }`}
                  style={{ width: `${50 + ((i * 7 + j * 13) % 40)}%` }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardMock() {
  return (
    <div className="absolute inset-0 bg-white p-3 sm:p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="h-1.5 sm:h-2 w-12 sm:w-20 bg-text/70 rounded-sm" />
        <div className="h-1.5 sm:h-2 w-6 sm:w-8 bg-accent/60 rounded-sm" />
      </div>
      <div className="bg-accent-light/60 border border-accent/20 rounded-md p-2 sm:p-4 mb-3 sm:mb-4">
        <div className="font-mono text-[8px] sm:text-[10px] text-accent/80 mb-1">
          RESPONSE TIME
        </div>
        <div className="font-mono text-[12px] sm:text-[18px] font-semibold text-accent">
          &lt; 60s
        </div>
      </div>
      <div className="flex items-end gap-1 sm:gap-1.5 h-7 sm:h-12">
        {[40, 65, 50, 80, 70, 95, 85].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-accent rounded-sm"
            style={{ height: `${h}%`, opacity: 0.65 + i * 0.05 }}
          />
        ))}
      </div>
    </div>
  )
}

function CsvMock() {
  return (
    <div className="absolute inset-0 bg-[#FAFAFA] p-2 sm:p-3 overflow-hidden flex flex-col gap-1.5 sm:gap-2">
      {/* Stack of CSV file icons */}
      {['orders_jan_export.csv', 'fulfillment_3pl.csv', 'payouts_q1.csv', 'refunds_pending.csv'].map(
        (name, i) => (
          <div
            key={i}
            className="bg-white border border-border rounded-sm flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5"
          >
            <div className="w-2 h-2.5 sm:w-2.5 sm:h-3 bg-text/30 rounded-sm" />
            <div className="font-mono text-[7px] sm:text-[9px] text-text-secondary truncate flex-1">
              {name}
            </div>
            {i === 1 && (
              <div className="font-mono text-[7px] sm:text-[8px] text-red-500/80">
                MISMATCH
              </div>
            )}
          </div>
        ),
      )}
      <div className="flex-1" />
      <div className="font-mono text-[7px] sm:text-[9px] text-text-secondary text-center">
        manually reconciled
      </div>
    </div>
  )
}

function PipelineMock() {
  const nodes = ['Shopify', '3PL', 'Stripe']
  return (
    <div className="absolute inset-0 bg-white p-3 sm:p-5 overflow-hidden flex flex-col">
      <div className="font-mono text-[8px] sm:text-[10px] text-accent/80 mb-2 sm:mb-3">
        ORDERS · LIVE PIPELINE
      </div>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center gap-1 sm:gap-2">
            <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-accent-light border border-accent/30 font-mono text-[7px] sm:text-[9px] text-accent">
              {n}
            </div>
            {i < nodes.length - 1 && (
              <div className="w-3 sm:w-5 h-px bg-accent/40 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rotate-45 border-r border-t border-accent/60" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-accent-light/40 border border-accent/15 rounded-md p-2 flex-1 flex flex-col justify-center">
        <div className="font-mono text-[8px] sm:text-[10px] text-accent/80 mb-1">
          RECONCILED
        </div>
        <div className="font-mono text-[14px] sm:text-[20px] font-semibold text-accent leading-none">
          2,387
        </div>
        <div className="font-mono text-[7px] sm:text-[9px] text-text-secondary mt-1">
          this month · 0 manual touches
        </div>
      </div>
    </div>
  )
}

function DocsStackMock() {
  const dashboards = ['GA4', 'CRM', 'Billing', 'Help', 'Notion']
  return (
    <div className="absolute inset-0 bg-[#FAFAFA] p-2 sm:p-3 overflow-hidden">
      <div className="flex flex-wrap gap-1 mb-2">
        {dashboards.map((d) => (
          <div
            key={d}
            className="px-1.5 py-0.5 bg-white border border-border rounded-sm font-mono text-[7px] sm:text-[9px] text-text-secondary"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="bg-white border border-border rounded-sm p-1.5 sm:p-2 space-y-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-1 sm:h-1.5 rounded-sm bg-text/15"
            style={{ width: `${60 + ((i * 11) % 35)}%` }}
          />
        ))}
        <div className="h-4 sm:h-6 bg-text/10 rounded-sm mt-1.5" />
        <div className="h-1 sm:h-1.5 w-1/2 bg-text/15 rounded-sm" />
      </div>
      <div className="font-mono text-[7px] sm:text-[9px] text-text-secondary text-center mt-1.5">
        copy / paste / format · 3 days
      </div>
    </div>
  )
}

function ReportMock() {
  return (
    <div className="absolute inset-0 bg-white p-2 sm:p-3 overflow-hidden">
      <div className="bg-white border border-border rounded-sm p-2 sm:p-3 h-full flex flex-col shadow-sm">
        <div className="flex items-center justify-between mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-border">
          <div className="h-1.5 sm:h-2 w-12 sm:w-16 bg-accent rounded-sm" />
          <div className="font-mono text-[7px] sm:text-[9px] text-text-secondary">
            Q1 · CLIENT
          </div>
        </div>
        <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
          <div className="h-1 sm:h-1.5 w-3/4 bg-text/60 rounded-sm" />
          <div className="h-1 sm:h-1.5 w-1/2 bg-text/30 rounded-sm" />
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <div className="bg-accent-light/60 rounded p-1.5 sm:p-2 flex flex-col justify-center">
            <div className="font-mono text-[10px] sm:text-[14px] font-semibold text-accent leading-none">
              +24%
            </div>
            <div className="font-mono text-[6px] sm:text-[8px] text-accent/70 mt-0.5">
              MoM
            </div>
          </div>
          <div className="bg-text/[0.04] rounded p-1.5 sm:p-2 flex flex-col justify-center">
            <div className="font-mono text-[10px] sm:text-[14px] font-semibold text-text leading-none">
              98%
            </div>
            <div className="font-mono text-[6px] sm:text-[8px] text-text-secondary mt-0.5">
              SLA
            </div>
          </div>
        </div>
        <div className="flex items-end gap-0.5 sm:gap-1 flex-1">
          {[30, 50, 40, 65, 55, 80, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-accent rounded-sm"
              style={{ height: `${h}%`, opacity: 0.6 + i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function BeforeFor({ kind }: { kind: MockKind }) {
  if (kind === 'spreadsheet-to-dashboard') return <SpreadsheetMock />
  if (kind === 'csv-to-pipeline') return <CsvMock />
  return <DocsStackMock />
}

function AfterFor({ kind }: { kind: MockKind }) {
  if (kind === 'spreadsheet-to-dashboard') return <DashboardMock />
  if (kind === 'csv-to-pipeline') return <PipelineMock />
  return <ReportMock />
}

export function BeforeAfterVisual({
  kind,
  beforeImg,
  afterImg,
}: {
  kind: MockKind
  beforeImg?: string | null
  afterImg?: string | null
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-3 items-center">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
            Before
          </div>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-md border border-border overflow-hidden">
          {beforeImg ? (
            <img
              src={beforeImg}
              alt="Before automation"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <BeforeFor kind={kind} />
          )}
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-center justify-center text-text-secondary">
        <div className="font-mono text-xs">→</div>
      </div>
      <div className="flex sm:hidden items-center gap-2 my-1">
        <div className="h-px flex-1 bg-border" />
        <div className="font-mono text-[10px] text-text-secondary">↓</div>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-accent">
            After
          </div>
          <div className="h-px flex-1 bg-accent/20" />
        </div>
        <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-md border border-border overflow-hidden">
          {afterImg ? (
            <img
              src={afterImg}
              alt="After automation"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <AfterFor kind={kind} />
          )}
        </div>
      </div>
    </div>
  )
}
