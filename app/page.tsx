import { readFileSync } from 'fs'
import { join } from 'path'
import { parseProfile } from '@/lib/parse'
import Profile from '@/components/Profile'
import type { Metadata } from 'next'

// This forces static generation
export const dynamic = 'force-static'

// Read profile data
function getProfileData() {
  const profilePath = join(process.cwd(), 'content', 'profile.md')
  const fileContent = readFileSync(profilePath, 'utf-8')
  return parseProfile(fileContent)
}

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const { data } = getProfileData()

  return {
    title: `${data.name} | ${data.handle}`,
    description: data.bio || `Enlaces de ${data.name}`,
    openGraph: {
      title: `${data.name} | ${data.handle}`,
      description: data.bio || `Enlaces de ${data.name}`,
      type: 'profile',
      images: data.avatar ? [{ url: data.avatar, width: 400, height: 400 }] : [],
    },
    twitter: {
      card: 'summary',
      title: `${data.name} | ${data.handle}`,
      description: data.bio || `Enlaces de ${data.name}`,
      images: data.avatar ? [data.avatar] : [],
    },
  }
}

export default function HomePage() {
  const { data, content } = getProfileData()

  return <Profile profile={data} content={content} />
}
