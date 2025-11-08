import type { ProfileData } from '@/lib/types'
import type { ThemeTokens } from '@/lib/themes'
import Avatar from './Avatar'
import SocialLinks from './SocialLinks'
import LinkCardEnhanced from './LinkCardEnhanced'
import MarkdownContent from './MarkdownContent'

interface ProfileProps {
  profile: ProfileData
  content?: string
  tokens: ThemeTokens
}

export default function Profile({ profile, content, tokens }: ProfileProps) {
  const { name, handle, bio, avatar, theme, social, links, footer } = profile

  const isMinimal = theme === 'minimal'
  const isPhoto = theme === 'photo'
  const isCard = theme === 'card'
  const isGradient = theme === 'gradient'
  const variant = tokens.variant

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="text-center mb-8 sm:mb-10">
        {/* Avatar */}
        <div className="flex justify-center mb-6 animate-fade-in opacity-0">
          <Avatar src={avatar} alt={name} theme={theme} avatarStyle={variant?.avatarStyle} />
        </div>

        {/* Name & Handle */}
        <h1 className={`
          text-3xl sm:text-4xl
          font-[var(--title-weight)]
          mb-2
          animate-fade-in stagger-1 opacity-0
          ${isMinimal ? 'font-mono' : ''}
          ${isGradient ? 'text-white' : 'text-[var(--text)]'}
        `}>
          {name}
        </h1>

        <p className={`
          text-lg sm:text-xl
          mb-4
          animate-fade-in stagger-2 opacity-0
          ${isMinimal ? 'font-mono' : ''}
          ${isGradient ? 'text-white/85' : 'text-[var(--subtext)]'}
        `}>
          {handle}
        </p>

        {/* Bio */}
        {bio && (
          <p className={`
            text-base sm:text-lg
            max-w-md mx-auto
            leading-relaxed
            mb-6
            animate-fade-in stagger-3 opacity-0
            ${isGradient ? 'text-white' : 'text-[var(--text)]'}
          `}>
            {bio}
          </p>
        )}

        {/* Social Links */}
        {social && social.length > 0 && (
          <div className="mb-6 animate-fade-in stagger-4 opacity-0">
            <SocialLinks social={social} />
          </div>
        )}

        {/* Divider for minimal theme */}
        {isMinimal && (
          <div className="w-full h-px bg-[var(--border)] my-8" />
        )}
      </header>

      {/* Links Section */}
      <main>
        <nav aria-label="Enlaces principales" className="space-y-3 sm:space-y-4">
          {links.map((link, index) => (
            <LinkCardEnhanced key={`${link.url}-${index}`} link={link} theme={theme} variant={variant} />
          ))}
        </nav>

        {/* Additional Content */}
        <MarkdownContent content={content} />
      </main>

      {/* Footer */}
      {footer && (
        <footer className="text-center mt-12 sm:mt-16">
          <p className={`text-sm ${isGradient ? 'text-white/70' : 'text-[var(--subtext)]'}`}>
            {footer}
          </p>
        </footer>
      )}
    </div>
  )
}
