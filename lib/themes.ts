import type { ThemeName } from './types'

export interface ThemeTokens {
  colors: {
    background: string
    surface: string
    text: string
    subtext: string
    accent: string
    accentHover: string
    border: string
  }
  radii: {
    xs: string
    sm: string
    md: string
    lg: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  typography: {
    titleWeight: number
    bodyWeight: number
    useMono?: boolean
  }
  effects?: {
    shadow?: string
    glow?: string
  }
}

/**
 * Darkens a HEX color by a given percentage
 */
export function darkenColor(hex: string, percent: number): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '')

  // Parse RGB
  let r = parseInt(cleanHex.substring(0, 2), 16)
  let g = parseInt(cleanHex.substring(2, 4), 16)
  let b = parseInt(cleanHex.substring(4, 6), 16)

  // Darken
  r = Math.max(0, Math.floor(r * (1 - percent / 100)))
  g = Math.max(0, Math.floor(g * (1 - percent / 100)))
  b = Math.max(0, Math.floor(b * (1 - percent / 100)))

  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Gets theme tokens for a given theme name
 */
export function getThemeTokens(
  themeName: ThemeName,
  accentColor?: string
): ThemeTokens {
  const themes: Record<ThemeName, ThemeTokens> = {
    light: {
      colors: {
        background: '#FFFFFF',
        surface: '#F8F9FA',
        text: '#111111',
        subtext: '#6B7280',
        accent: accentColor || '#5B8CFF',
        accentHover: accentColor ? darkenColor(accentColor, 10) : '#4A7AE8',
        border: '#E5E7EB',
      },
      radii: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      typography: {
        titleWeight: 700,
        bodyWeight: 400,
      },
      effects: {
        shadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      },
    },

    dark: {
      colors: {
        background: '#0B0B0C',
        surface: '#1A1A1B',
        text: '#EDEDED',
        subtext: '#9CA3AF',
        accent: accentColor || '#5B8CFF',
        accentHover: accentColor ? darkenColor(accentColor, 8) : '#4A7AE8',
        border: '#2D2D2E',
      },
      radii: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      typography: {
        titleWeight: 700,
        bodyWeight: 400,
      },
      effects: {
        shadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      },
    },

    gradient: {
      colors: {
        background: 'linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)',
        surface: '#FFFFFF',
        text: '#1F2937',
        subtext: '#6B7280',
        accent: accentColor || '#6366F1',
        accentHover: accentColor ? darkenColor(accentColor, 10) : '#4F46E5',
        border: '#E0E7FF',
      },
      radii: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      typography: {
        titleWeight: 700,
        bodyWeight: 400,
      },
      effects: {
        shadow: '0 1px 2px rgba(99, 102, 241, 0.1)',
      },
    },

    minimal: {
      colors: {
        background: '#F7F7F8',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        subtext: '#666666',
        accent: accentColor || '#000000',
        accentHover: accentColor ? darkenColor(accentColor, 12) : '#333333',
        border: '#E0E0E0',
      },
      radii: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      typography: {
        titleWeight: 600,
        bodyWeight: 400,
        useMono: true,
      },
    },

    neon: {
      colors: {
        background: '#0D0F13',
        surface: '#1A1D24',
        text: '#FFFFFF',
        subtext: '#A0AEC0',
        accent: accentColor || '#00FFF0',
        accentHover: accentColor ? darkenColor(accentColor, 15) : '#00CCC1',
        border: '#2D3748',
      },
      radii: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      typography: {
        titleWeight: 700,
        bodyWeight: 400,
      },
      effects: {
        glow: `0 0 20px ${accentColor ? `${accentColor}40` : '#00FFF040'}`,
      },
    },

    card: {
      colors: {
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#111827',
        subtext: '#6B7280',
        accent: accentColor || '#8B5CF6',
        accentHover: accentColor ? darkenColor(accentColor, 10) : '#7C3AED',
        border: '#E5E7EB',
      },
      radii: {
        xs: '8px',
        sm: '12px',
        md: '20px',
        lg: '28px',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '20px',
        lg: '28px',
        xl: '40px',
      },
      typography: {
        titleWeight: 700,
        bodyWeight: 400,
      },
      effects: {
        shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },

    photo: {
      colors: {
        background: '#000000',
        surface: 'rgba(255, 255, 255, 0.1)',
        text: '#FFFFFF',
        subtext: '#D1D5DB',
        accent: accentColor || '#F59E0B',
        accentHover: accentColor ? darkenColor(accentColor, 10) : '#D97706',
        border: 'rgba(255, 255, 255, 0.2)',
      },
      radii: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '50%',
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      typography: {
        titleWeight: 700,
        bodyWeight: 400,
      },
      effects: {
        shadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
      },
    },
  }

  return themes[themeName]
}

/**
 * Generates CSS variables string from theme tokens
 */
export function generateCSSVariables(tokens: ThemeTokens): Record<string, string> {
  return {
    '--bg': tokens.colors.background,
    '--surface': tokens.colors.surface,
    '--text': tokens.colors.text,
    '--subtext': tokens.colors.subtext,
    '--accent': tokens.colors.accent,
    '--accent-hover': tokens.colors.accentHover,
    '--border': tokens.colors.border,
    '--radius-xs': tokens.radii.xs,
    '--radius-sm': tokens.radii.sm,
    '--radius-md': tokens.radii.md,
    '--radius-lg': tokens.radii.lg,
    '--space-xs': tokens.spacing.xs,
    '--space-sm': tokens.spacing.sm,
    '--space-md': tokens.spacing.md,
    '--space-lg': tokens.spacing.lg,
    '--space-xl': tokens.spacing.xl,
    '--title-weight': tokens.typography.titleWeight.toString(),
    '--body-weight': tokens.typography.bodyWeight.toString(),
    '--shadow': tokens.effects?.shadow || 'none',
    '--glow': tokens.effects?.glow || 'none',
  }
}
