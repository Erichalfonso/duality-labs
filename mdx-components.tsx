import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-medium mb-6 mt-8 tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-medium mb-4 mt-8 tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mb-3 mt-6 tracking-tight">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base text-text-secondary leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-accent-light text-accent px-2 py-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-bg-secondary p-4 rounded-lg overflow-x-auto mb-4 border border-border">
        {children}
      </pre>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-text-secondary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-text-secondary">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-text-secondary">
        {children}
      </blockquote>
    ),
    ...components,
  }
}
