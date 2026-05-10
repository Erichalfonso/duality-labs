import { Lightning, Brain, Database, Code } from '@phosphor-icons/react/dist/ssr'

type Props = {
  slug: string
}

const iconProps = {
  size: 180,
  weight: 'fill' as const,
  'aria-hidden': true,
}

export function ServiceIcon({ slug }: Props) {
  switch (slug) {
    // AI Automation — solid lightning bolt (energy / autonomous run)
    case 'data-infrastructure':
      return <Lightning {...iconProps} />

    // Custom Software — Duality Labs symbol (Ψ)
    case 'custom-software':
      return (
        <svg
          width="180"
          height="180"
          viewBox="0 0 256 256"
          aria-hidden
        >
          <text
            x="128"
            y="188"
            textAnchor="middle"
            fontSize="240"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontWeight="700"
            fill="currentColor"
          >
            Ψ
          </text>
        </svg>
      )

    // Machine Learning — solid brain silhouette
    case 'ai-ml':
      return <Brain {...iconProps} />

    // Data Infrastructure — solid database cylinder
    case 'data-platform':
      return <Database {...iconProps} />

    // Web & App Development — code brackets (web + app)
    case 'web-app-dev':
      return <Code {...iconProps} />

    default:
      return null
  }
}
