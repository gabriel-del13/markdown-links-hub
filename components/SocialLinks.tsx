import type { Social } from '@/lib/types'
import { SocialIconComponent, getSocialLabel } from './icons/SocialIcons'

interface SocialLinksProps {
  social: Social[]
}

export default function SocialLinks({ social }: SocialLinksProps) {
  if (!social || social.length === 0) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-3" role="list">
      {social.map((item, index) => (
        <a
          key={`${item.type}-${index}`}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group
            flex items-center justify-center
            w-11 h-11
            rounded-full
            bg-[var(--surface)]
            border border-[var(--border)]
            text-[var(--text)]
            hover:bg-[var(--accent)]
            hover:text-[var(--accent-text)]
            hover:border-[var(--accent)]
            hover:scale-110
            hover:rotate-6
            hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]
            transition-all duration-300 ease-out
            active:scale-95
            active:rotate-0
          `}
          aria-label={getSocialLabel(item.type)}
          title={getSocialLabel(item.type)}
          role="listitem"
        >
          <SocialIconComponent type={item.type} size={20} />
        </a>
      ))}
    </div>
  )
}
