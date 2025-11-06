import type { Link } from '@/lib/types'
import type { ThemeTokens } from '@/lib/themes'
import { LinkIconComponent } from './icons/LinkIcons'

interface LinkCardProps {
  link: Link
  theme: string
  variant?: ThemeTokens['variant']
}

export default function LinkCard({ link, theme, variant }: LinkCardProps) {
  const isCard = theme === 'card'
  const isNeon = theme === 'neon'
  const linkStyle = variant?.linkStyle || 'default'
  const borderStyle = variant?.borderStyle || 'solid'
  const hasHoverScale = variant?.hasHoverScale !== false
  const hasGlassEffect = variant?.hasGlassEffect || false

  // Determine border classes
  const getBorderClasses = () => {
    if (borderStyle === 'none') return ''
    if (borderStyle === 'thick') return 'border-2'
    if (isNeon) return 'border-2 hover:shadow-[var(--glow)]'
    return 'border hover:border-[var(--accent)]'
  }

  // Determine glass effect classes
  const getGlassClasses = () => {
    if (hasGlassEffect) {
      return 'backdrop-blur-md bg-opacity-90'
    }
    return ''
  }

  // Determine hover scale classes
  const getScaleClasses = () => {
    if (!hasHoverScale) return ''
    return 'hover:scale-[1.02] active:scale-[0.98]'
  }

  // Determine shadow classes based on link style
  const getShadowClasses = () => {
    if (linkStyle === 'elevated') return 'shadow-[var(--shadow)] hover:shadow-lg'
    if (linkStyle === 'flat') return 'shadow-[var(--shadow)]'
    if (isNeon) return 'hover:shadow-[var(--glow)]'
    return ''
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative block w-full transition-all duration-200
        ${isCard ? 'p-5' : 'p-4'}
        ${getBorderClasses()}
        ${getShadowClasses()}
        ${getGlassClasses()}
        ${getScaleClasses()}
        rounded-[var(--radius-md)]
        bg-[var(--surface)]
        border-[var(--border)]
        focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]
      `}
      title={link.description || link.label}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        {link.icon && (
          <div className={`
            flex-shrink-0 flex items-center justify-center
            ${isCard ? 'w-12 h-12' : 'w-10 h-10'}
            rounded-[var(--radius-sm)]
            bg-[var(--bg)]
            text-[var(--accent)]
            group-hover:text-[var(--accent-hover)]
            transition-colors duration-200
          `}>
            <LinkIconComponent icon={link.icon} size={isCard ? 24 : 20} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`
              font-[var(--title-weight)]
              text-[var(--text)]
              ${isCard ? 'text-lg' : 'text-base'}
              truncate
              group-hover:text-[var(--accent)]
              transition-colors duration-200
            `}>
              {link.label}
            </h3>
            {link.badge && (
              <span className={`
                px-2.5 py-1 text-xs font-semibold rounded-full
                bg-[var(--accent)]
                text-[var(--accent-text)]
                flex-shrink-0
                shadow-sm
                group-hover:shadow-md
                transition-shadow duration-200
              `}>
                {link.badge}
              </span>
            )}
          </div>
          {link.description && (
            <p className="text-sm text-[var(--subtext)] mt-1 line-clamp-2">
              {link.description}
            </p>
          )}
        </div>

        {/* Arrow indicator */}
        <div className={`
          flex-shrink-0 text-[var(--subtext)]
          group-hover:text-[var(--accent)]
          group-hover:translate-x-2
          transition-all duration-300 ease-out
        `}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </a>
  )
}
