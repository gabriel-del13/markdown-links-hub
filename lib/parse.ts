import matter from 'gray-matter'
import type {
  ParsedProfile,
  ProfileData,
  ValidationError,
  ThemeName,
  SocialType,
  LinkIcon,
} from './types'

const VALID_THEMES: ThemeName[] = [
  'light',
  'dark',
  'gradient',
  'minimal',
  'neon',
  'card',
  'photo',
]

const VALID_SOCIAL_TYPES: SocialType[] = [
  'x',
  'instagram',
  'linkedin',
  'github',
  'tiktok',
  'youtube',
  'website',
  'email',
  'whatsapp',
  'telegram',
]

const VALID_LINK_ICONS: LinkIcon[] = [
  'link',
  'star',
  'sparkles',
  'book',
  'play',
  'code',
  'calendar',
]

/**
 * Validates color string (HEX or named CSS color)
 */
export function isValidColor(color: string): boolean {
  // HEX validation: #RGB or #RRGGBB
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (hexRegex.test(color)) return true

  // Allow named CSS colors for flexibility
  const namedColors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange',
    'black', 'white', 'gray', 'grey', 'cyan', 'magenta'
  ]
  return namedColors.includes(color.toLowerCase())
}

/**
 * Normalizes URL by adding https:// protocol if missing
 */
export function normalizeUrl(url: string): string {
  if (!url) return ''
  const trimmed = url.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return trimmed
  }
  return `https://${trimmed}`
}

/**
 * Validates profile data schema
 */
export function validateProfileData(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push({ field: 'name', message: 'Field "name" is required and must be a non-empty string' })
  }

  if (!data.handle || typeof data.handle !== 'string' || data.handle.trim() === '') {
    errors.push({ field: 'handle', message: 'Field "handle" is required and must be a non-empty string' })
  }

  if (!data.links || !Array.isArray(data.links) || data.links.length === 0) {
    errors.push({ field: 'links', message: 'Field "links" is required and must be a non-empty array' })
  } else {
    // Validate each link
    data.links.forEach((link: any, index: number) => {
      if (!link.label || typeof link.label !== 'string') {
        errors.push({
          field: `links[${index}].label`,
          message: `Link at index ${index} must have a "label" string`,
        })
      }
      if (!link.url || typeof link.url !== 'string') {
        errors.push({
          field: `links[${index}].url`,
          message: `Link at index ${index} must have a "url" string`,
        })
      }
      if (link.icon && !VALID_LINK_ICONS.includes(link.icon)) {
        errors.push({
          field: `links[${index}].icon`,
          message: `Link icon "${link.icon}" is not valid. Valid icons: ${VALID_LINK_ICONS.join(', ')}`,
        })
      }
    })
  }

  // Optional but validated fields
  if (data.theme && !VALID_THEMES.includes(data.theme)) {
    errors.push({
      field: 'theme',
      message: `Theme "${data.theme}" is not valid. Valid themes: ${VALID_THEMES.join(', ')}`,
    })
  }

  if (data.accentColor && !isValidColor(data.accentColor)) {
    errors.push({
      field: 'accentColor',
      message: `accentColor "${data.accentColor}" is not a valid color (use HEX format like #5B8CFF)`,
    })
  }

  if (data.social && Array.isArray(data.social)) {
    data.social.forEach((social: any, index: number) => {
      if (!social.type || !VALID_SOCIAL_TYPES.includes(social.type)) {
        errors.push({
          field: `social[${index}].type`,
          message: `Social type "${social.type}" is not valid. Valid types: ${VALID_SOCIAL_TYPES.join(', ')}`,
        })
      }
      if (!social.url || typeof social.url !== 'string') {
        errors.push({
          field: `social[${index}].url`,
          message: `Social at index ${index} must have a "url" string`,
        })
      }
    })
  }

  return errors
}

/**
 * Normalizes profile data by fixing URLs and removing duplicates
 */
export function normalizeProfileData(data: ProfileData): ProfileData {
  const normalized = { ...data }

  // Normalize link URLs
  if (normalized.links) {
    normalized.links = normalized.links.map((link) => ({
      ...link,
      url: normalizeUrl(link.url),
    }))
  }

  // Normalize and deduplicate social URLs
  if (normalized.social) {
    const seen = new Set<string>()
    normalized.social = normalized.social
      .map((social) => ({
        ...social,
        url: normalizeUrl(social.url),
      }))
      .filter((social) => {
        if (seen.has(social.type)) {
          return false // Remove duplicate
        }
        seen.add(social.type)
        return true
      })
  }

  // Set default theme if not provided
  if (!normalized.theme) {
    normalized.theme = 'light'
  }

  return normalized
}

/**
 * Parses markdown file with front-matter and validates schema
 */
export function parseProfile(markdownContent: string): ParsedProfile {
  // Parse front-matter
  const { data, content } = matter(markdownContent)

  // Validate schema
  const errors = validateProfileData(data)
  if (errors.length > 0) {
    const errorMessages = errors.map((e) => `  - ${e.field}: ${e.message}`).join('\n')
    throw new Error(
      `Profile validation failed with ${errors.length} error(s):\n${errorMessages}`
    )
  }

  // Normalize data
  const normalizedData = normalizeProfileData(data as ProfileData)

  return {
    data: normalizedData,
    content: content.trim() || undefined,
  }
}
