import type { AvatarStyle } from '@/lib/themes'

interface AvatarProps {
  src?: string
  alt: string
  theme: string
  avatarStyle?: AvatarStyle
}

export default function Avatar({ src, alt, theme, avatarStyle = 'circle' }: AvatarProps) {
  if (!src) return null

  const isPhoto = theme === 'photo'
  const isCard = theme === 'card'

  // Determine shape classes
  const getShapeClasses = () => {
    switch (avatarStyle) {
      case 'circle':
        return 'rounded-full'
      case 'square':
        return 'rounded-[var(--radius-sm)]'
      case 'squircle':
        return 'rounded-[var(--radius-lg)]'
      default:
        return 'rounded-[var(--radius-lg)]'
    }
  }

  return (
    <div className={`
      relative
      ${isCard ? 'w-32 h-32' : 'w-24 h-24'}
      ${getShapeClasses()}
      ${isPhoto ? 'ring-4 ring-[var(--border)]' : ''}
      overflow-hidden
      ${isPhoto ? 'shadow-[var(--shadow)]' : 'shadow-md'}
      flex-shrink-0
    `}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  )
}
