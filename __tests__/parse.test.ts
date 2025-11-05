import { parseProfile, normalizeUrl, isValidColor, validateProfileData } from '@/lib/parse'

describe('normalizeUrl', () => {
  it('should add https:// to URLs without protocol', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com')
    expect(normalizeUrl('www.example.com')).toBe('https://www.example.com')
  })

  it('should keep URLs with protocol unchanged', () => {
    expect(normalizeUrl('https://example.com')).toBe('https://example.com')
    expect(normalizeUrl('http://example.com')).toBe('http://example.com')
  })

  it('should keep special protocols unchanged', () => {
    expect(normalizeUrl('mailto:test@example.com')).toBe('mailto:test@example.com')
    expect(normalizeUrl('tel:+1234567890')).toBe('tel:+1234567890')
  })

  it('should handle empty or whitespace', () => {
    expect(normalizeUrl('')).toBe('')
    expect(normalizeUrl('   ')).toBe('')
  })
})

describe('isValidColor', () => {
  it('should validate HEX colors correctly', () => {
    expect(isValidColor('#FFF')).toBe(true)
    expect(isValidColor('#FFFFFF')).toBe(true)
    expect(isValidColor('#5B8CFF')).toBe(true)
    expect(isValidColor('#abc')).toBe(true)
  })

  it('should reject invalid HEX colors', () => {
    expect(isValidColor('FFF')).toBe(false)
    expect(isValidColor('#GGGGGG')).toBe(false)
    expect(isValidColor('#12345')).toBe(false)
  })

  it('should validate named CSS colors', () => {
    expect(isValidColor('red')).toBe(true)
    expect(isValidColor('blue')).toBe(true)
    expect(isValidColor('black')).toBe(true)
  })
})

describe('validateProfileData', () => {
  const validProfile = {
    name: 'Test User',
    handle: '@testuser',
    theme: 'light',
    links: [
      { label: 'Website', url: 'https://example.com' },
    ],
  }

  it('should pass validation for valid profile', () => {
    const errors = validateProfileData(validProfile)
    expect(errors).toHaveLength(0)
  })

  it('should fail when name is missing', () => {
    const invalidProfile = { ...validProfile, name: '' }
    const errors = validateProfileData(invalidProfile)
    expect(errors).toContainEqual(
      expect.objectContaining({ field: 'name' })
    )
  })

  it('should fail when handle is missing', () => {
    const invalidProfile = { ...validProfile, handle: '' }
    const errors = validateProfileData(invalidProfile)
    expect(errors).toContainEqual(
      expect.objectContaining({ field: 'handle' })
    )
  })

  it('should fail when links array is empty', () => {
    const invalidProfile = { ...validProfile, links: [] }
    const errors = validateProfileData(invalidProfile)
    expect(errors).toContainEqual(
      expect.objectContaining({ field: 'links' })
    )
  })

  it('should fail when theme is invalid', () => {
    const invalidProfile = { ...validProfile, theme: 'invalid-theme' }
    const errors = validateProfileData(invalidProfile)
    expect(errors).toContainEqual(
      expect.objectContaining({ field: 'theme' })
    )
  })

  it('should fail when accentColor is invalid', () => {
    const invalidProfile = { ...validProfile, accentColor: 'not-a-color' }
    const errors = validateProfileData(invalidProfile)
    expect(errors).toContainEqual(
      expect.objectContaining({ field: 'accentColor' })
    )
  })

  it('should validate link icons', () => {
    const invalidProfile = {
      ...validProfile,
      links: [{ label: 'Test', url: 'https://test.com', icon: 'invalid-icon' }],
    }
    const errors = validateProfileData(invalidProfile)
    expect(errors).toContainEqual(
      expect.objectContaining({ field: expect.stringContaining('links[0].icon') })
    )
  })

  it('should validate social types', () => {
    const invalidProfile = {
      ...validProfile,
      social: [{ type: 'invalid-social', url: 'https://test.com' }],
    }
    const errors = validateProfileData(invalidProfile)
    expect(errors).toContainEqual(
      expect.objectContaining({ field: expect.stringContaining('social[0].type') })
    )
  })
})

describe('parseProfile', () => {
  const validMarkdown = `---
name: "Test User"
handle: "@test"
theme: "light"
links:
  - label: "Website"
    url: "example.com"
---

# Extra content
This is some extra content.
`

  it('should parse valid markdown with front-matter', () => {
    const result = parseProfile(validMarkdown)
    expect(result.data.name).toBe('Test User')
    expect(result.data.handle).toBe('@test')
    expect(result.data.theme).toBe('light')
    expect(result.data.links).toHaveLength(1)
    expect(result.content).toContain('Extra content')
  })

  it('should normalize URLs in links', () => {
    const result = parseProfile(validMarkdown)
    expect(result.data.links[0].url).toBe('https://example.com')
  })

  it('should throw error for invalid profile', () => {
    const invalidMarkdown = `---
name: ""
handle: "@test"
---`
    expect(() => parseProfile(invalidMarkdown)).toThrow('Profile validation failed')
  })

  it('should set default theme if not provided', () => {
    const markdownWithoutTheme = `---
name: "Test User"
handle: "@test"
links:
  - label: "Website"
    url: "https://example.com"
---`
    const result = parseProfile(markdownWithoutTheme)
    expect(result.data.theme).toBe('light')
  })

  it('should deduplicate social links', () => {
    const markdownWithDuplicates = `---
name: "Test User"
handle: "@test"
social:
  - type: "github"
    url: "https://github.com/user1"
  - type: "github"
    url: "https://github.com/user2"
links:
  - label: "Website"
    url: "https://example.com"
---`
    const result = parseProfile(markdownWithDuplicates)
    expect(result.data.social).toHaveLength(1)
    expect(result.data.social![0].url).toBe('https://github.com/user1')
  })
})
