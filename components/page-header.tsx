interface PageHeaderProps {
  title: string
  description?: string
  tag?: string
}

export default function PageHeader({ title, description, tag }: PageHeaderProps) {
  return (
    <header className="relative py-12 sm:py-16 md:py-20 border-b border-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to" />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10">
        {tag && (
          <div className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-3 sm:mb-4">
            {tag}
          </div>
        )}
        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-medium leading-[1.15] tracking-tight mb-3 sm:mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-[600px]">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
