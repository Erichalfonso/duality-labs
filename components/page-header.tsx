interface PageHeaderProps {
  title: string
  description?: string
  tag?: string
}

export default function PageHeader({ title, description, tag }: PageHeaderProps) {
  return (
    <header className="relative py-20 border-b border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to" />

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        {tag && (
          <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
            {tag}
          </div>
        )}
        <h1 className="text-[clamp(36px,5vw,52px)] font-medium leading-[1.15] tracking-tight mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-text-secondary leading-relaxed max-w-[600px]">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
