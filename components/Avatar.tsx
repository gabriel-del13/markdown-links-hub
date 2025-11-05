interface AvatarProps {
  src?: string
  alt: string
  theme: string
}

export default function Avatar({ src, alt, theme }: AvatarProps) {
  if (!src) return null

  const isPhoto = theme === 'photo'
  const isCard = theme === 'card'

  return (
    <div className={`
      relative
      ${isCard ? 'w-32 h-32' : 'w-24 h-24'}
      ${isPhoto ? 'rounded-full ring-4 ring-white/30' : 'rounded-[var(--radius-lg)]'}
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
