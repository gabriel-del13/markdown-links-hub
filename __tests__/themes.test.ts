import { getThemeTokens, darkenColor, generateCSSVariables } from '@/lib/themes'

describe('darkenColor', () => {
  it('should darken a HEX color by percentage', () => {
    const original = '#5B8CFF'
    const darkened = darkenColor(original, 10)

    // Darkened color should be different and darker
    expect(darkened).not.toBe(original)
    expect(darkened).toMatch(/^#[0-9A-F]{6}$/i)
  })

  it('should handle colors with # prefix', () => {
    const result = darkenColor('#FFFFFF', 50)
    expect(result).toMatch(/^#[0-9A-F]{6}$/i)
  })

  it('should handle 100% darkening (black)', () => {
    const result = darkenColor('#FFFFFF', 100)
    expect(result).toBe('#000000')
  })

  it('should not go below #000000', () => {
    const result = darkenColor('#111111', 50)
    expect(result).toMatch(/^#[0-9A-F]{6}$/i)
  })
})

describe('getThemeTokens', () => {
  it('should return tokens for light theme', () => {
    const tokens = getThemeTokens('light')
    expect(tokens.colors.background).toBe('#FFFFFF')
    expect(tokens.colors.text).toBe('#111111')
    expect(tokens.radii.md).toBe('16px')
  })

  it('should return tokens for dark theme', () => {
    const tokens = getThemeTokens('dark')
    expect(tokens.colors.background).toBe('#0B0B0C')
    expect(tokens.colors.text).toBe('#EDEDED')
  })

  it('should use custom accent color if provided', () => {
    const customAccent = '#FF5733'
    const tokens = getThemeTokens('light', customAccent)
    expect(tokens.colors.accent).toBe(customAccent)
  })

  it('should calculate accentHover from custom accent', () => {
    const customAccent = '#5B8CFF'
    const tokens = getThemeTokens('light', customAccent)
    expect(tokens.colors.accentHover).not.toBe(customAccent)
    expect(tokens.colors.accentHover).toMatch(/^#[0-9A-F]{6}$/i)
  })

  it('should return tokens for all theme types', () => {
    const themes = ['light', 'dark', 'gradient', 'minimal', 'neon', 'card', 'photo'] as const

    themes.forEach((theme) => {
      const tokens = getThemeTokens(theme)
      expect(tokens).toHaveProperty('colors')
      expect(tokens).toHaveProperty('radii')
      expect(tokens).toHaveProperty('spacing')
      expect(tokens).toHaveProperty('typography')
    })
  })

  it('should have glow effect for neon theme', () => {
    const tokens = getThemeTokens('neon')
    expect(tokens.effects?.glow).toBeDefined()
  })

  it('should have shadow effect for card theme', () => {
    const tokens = getThemeTokens('card')
    expect(tokens.effects?.shadow).toBeDefined()
  })

  it('should use mono font for minimal theme', () => {
    const tokens = getThemeTokens('minimal')
    expect(tokens.typography.useMono).toBe(true)
  })
})

describe('generateCSSVariables', () => {
  it('should generate CSS variables from tokens', () => {
    const tokens = getThemeTokens('light')
    const cssVars = generateCSSVariables(tokens)

    expect(cssVars).toHaveProperty('--bg')
    expect(cssVars).toHaveProperty('--text')
    expect(cssVars).toHaveProperty('--accent')
    expect(cssVars).toHaveProperty('--radius-md')
    expect(cssVars).toHaveProperty('--space-lg')
  })

  it('should convert numeric values to strings', () => {
    const tokens = getThemeTokens('light')
    const cssVars = generateCSSVariables(tokens)

    expect(typeof cssVars['--title-weight']).toBe('string')
    expect(cssVars['--title-weight']).toBe('700')
  })

  it('should handle missing effects gracefully', () => {
    const tokens = getThemeTokens('minimal')
    const cssVars = generateCSSVariables(tokens)

    expect(cssVars['--shadow']).toBeDefined()
    expect(cssVars['--glow']).toBeDefined()
  })
})
