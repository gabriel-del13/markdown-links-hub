import type { ProfileData } from '@/lib/types'
import Avatar from './Avatar'
import SocialLinks from './SocialLinks'
import LinkCard from './LinkCard'
import MarkdownContent from './MarkdownContent'

interface ProfileProps {
  profile: ProfileData
  content?: string
}

export default function Profile({ profile, content }: ProfileProps) {
  const { name, handle, bio, avatar, theme, social, links, footer } = profile

  const isMinimal = theme === 'minimal'
  const isPhoto = theme === 'photo'
  const isCard = theme === 'card'

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="text-center mb-8 sm:mb-10">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <Avatar src={avatar} alt={name} theme={theme} />
        </div>

        {/* Name & Handle */}
        <h1 className={`
          text-3xl sm:text-4xl
          font-[var(--title-weight)]
          text-[var(--text)]
          mb-2
          ${isMinimal ? 'font-mono' : ''}
        `}>
          {name}
        </h1>

        <p className={`
          text-lg sm:text-xl
          text-[var(--subtext)]
          mb-4
          ${isMinimal ? 'font-mono' : ''}
        `}>
          {handle}
        </p>

        {/* Bio */}
        {bio && (
          <p className={`
            text-base sm:text-lg
            text-[var(--text)]
            max-w-md mx-auto
            leading-relaxed
            mb-6
          `}>
            {bio}
          </p>
        )}

        {/* Social Links */}
        {social && social.length > 0 && (
          <div className="mb-6">
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
            <LinkCard key={`${link.url}-${index}`} link={link} theme={theme} />
          ))}
        </nav>

        {/* Additional Content */}
        <MarkdownContent content={content} />
      </main>

      {/* Footer */}
      {footer && (
        <footer className="text-center mt-12 sm:mt-16">
          <p className="text-sm text-[var(--subtext)]">
            {footer}
          </p>
        </footer>
      )}
    </div>
  )
}
