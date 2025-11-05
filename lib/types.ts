// Type definitions for profile schema

export type SocialType =
  | 'x'
  | 'instagram'
  | 'linkedin'
  | 'github'
  | 'tiktok'
  | 'youtube'
  | 'website'
  | 'email'
  | 'whatsapp'
  | 'telegram'

export type LinkIcon =
  | 'link'
  | 'star'
  | 'sparkles'
  | 'book'
  | 'play'
  | 'code'
  | 'calendar'

export type ThemeName =
  | 'light'
  | 'dark'
  | 'gradient'
  | 'minimal'
  | 'neon'
  | 'card'
  | 'photo'

export interface Social {
  type: SocialType
  url: string
}

export interface Link {
  label: string
  url: string
  icon?: LinkIcon
  badge?: string
  description?: string
}

export interface ProfileData {
  name: string
  handle: string
  bio?: string
  avatar?: string
  theme: ThemeName
  accentColor?: string
  social?: Social[]
  links: Link[]
  footer?: string
}

export interface ParsedProfile {
  data: ProfileData
  content?: string
}

export interface ValidationError {
  field: string
  message: string
}
