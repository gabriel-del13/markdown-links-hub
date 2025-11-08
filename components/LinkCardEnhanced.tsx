'use client'

import { useState } from 'react'
import type { Link } from '@/lib/types'
import type { ThemeTokens } from '@/lib/themes'
import { LinkIconComponent } from './icons/LinkIcons'
import {
  getFaviconUrl,
  getDomain,
  copyToClipboard,
  shareLink,
} from '@/lib/utils'

interface LinkCardEnhancedProps {
  link: Link
  theme: string
  variant?: ThemeTokens['variant']
}

export default function LinkCardEnhanced({ link, theme, variant }: LinkCardEnhancedProps) {
  const [copied, setCopied] = useState(false)
  const [sharing, setSharing] = useState(false)

  const isCard = theme === 'card'
  const isNeon = theme === 'neon'
  const linkStyle = variant?.linkStyle || 'default'
  const borderStyle = variant?.borderStyle || 'solid'
  const hasHoverScale = variant?.hasHoverScale !== false
  const hasGlassEffect = variant?.hasGlassEffect || false

  // Handle copy link
  const handleCopyLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const success = await copyToClipboard(link.url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Handle share link
  const handleShareLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setSharing(true)
    await shareLink(link.url, link.label)
    setSharing(false)
  }

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

  // Determine shadow classes
  const getShadowClasses = () => {
    if (linkStyle === 'elevated') return 'shadow-[var(--shadow)] hover:shadow-lg'
    if (linkStyle === 'flat') return 'shadow-[var(--shadow)]'
    if (isNeon) return 'hover:shadow-[var(--glow)]'
    return ''
  }

  const faviconUrl = getFaviconUrl(link.url)
  const domain = getDomain(link.url)

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
          {/* Favicon or Icon */}
          <div className="flex-shrink-0 relative">
            <div className={`${isCard ? 'w-12 h-12' : 'w-10 h-10'} flex items-center justify-center`}>
              <img
                src={faviconUrl}
                alt={`${domain} favicon`}
                className={`${isCard ? 'w-6 h-6' : 'w-5 h-5'} rounded`}
                onError={(e) => {
                  // Hide favicon if it fails, show icon instead
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const iconContainer = target.parentElement?.querySelector('.icon-fallback') as HTMLElement
                  if (iconContainer) {
                    iconContainer.style.display = 'flex'
                  }
                }}
              />
              {link.icon && (
                <div
                  className={`
                    hidden icon-fallback flex-shrink-0 items-center justify-center
                    ${isCard ? 'w-12 h-12' : 'w-10 h-10'}
                    rounded-[var(--radius-sm)]
                    bg-[var(--bg)]
                    text-[var(--accent)]
                    group-hover:text-[var(--accent-hover)]
                    transition-colors duration-200
                    absolute top-0 left-0
                  `}
                >
                  <LinkIconComponent icon={link.icon} size={isCard ? 24 : 20} />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={`
                  font-[var(--title-weight)]
                  text-[var(--text)]
                  ${isCard ? 'text-lg' : 'text-base'}
                  truncate
                  group-hover:text-[var(--accent)]
                  transition-colors duration-200
                `}
              >
                {link.label}
              </h3>
              {link.badge && (
                <span
                  className={`
                    px-2.5 py-1 text-xs font-semibold rounded-full
                    bg-[var(--accent)]
                    text-[var(--accent-text)]
                    flex-shrink-0
                    shadow-sm
                    group-hover:shadow-md
                    transition-shadow duration-200
                  `}
                >
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

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Copy button */}
            <button
              onClick={handleCopyLink}
              className={`
                p-2 rounded-[var(--radius-sm)]
                bg-[var(--bg)]
                text-[var(--subtext)]
                hover:text-[var(--accent)]
                hover:bg-[var(--surface)]
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
              `}
              title={copied ? 'Copiado!' : 'Copiar enlace'}
              aria-label={copied ? 'Copiado!' : 'Copiar enlace'}
            >
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>

            {/* Share button */}
            <button
              onClick={handleShareLink}
              className={`
                p-2 rounded-[var(--radius-sm)]
                bg-[var(--bg)]
                text-[var(--subtext)]
                hover:text-[var(--accent)]
                hover:bg-[var(--surface)]
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
              `}
              title="Compartir enlace"
              aria-label="Compartir enlace"
              disabled={sharing}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </div>

          {/* Arrow indicator */}
          <div
            className={`
              flex-shrink-0 text-[var(--subtext)]
              group-hover:text-[var(--accent)]
              group-hover:translate-x-2
              transition-all duration-300 ease-out
            `}
          >
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

