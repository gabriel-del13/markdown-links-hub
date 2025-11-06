import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import { parseProfile } from '@/lib/parse'
import { getThemeTokens, generateCSSVariables } from '@/lib/themes'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Mi Perfil',
  description: 'Perfil de enlaces',
  icons: {
    icon: '/favicon.ico',
  },
}

// Read profile data for theme configuration
function getProfileTheme() {
  const profilePath = join(process.cwd(), 'content', 'profile.md')
  const fileContent = readFileSync(profilePath, 'utf-8')
  const { data } = parseProfile(fileContent)
  return {
    theme: data.theme,
    accentColor: data.accentColor,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, accentColor } = getProfileTheme()
  const tokens = getThemeTokens(theme, accentColor)
  const cssVars = generateCSSVariables(tokens)

  return (
    <html lang="es" data-theme={theme}>
      <body style={cssVars as React.CSSProperties}>{children}</body>
    </html>
  )
}
