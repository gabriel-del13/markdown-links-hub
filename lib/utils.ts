/**
 * Utility functions for the application
 */

/**
 * Get favicon URL for a domain
 */
export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
  } catch {
    return '/favicon.ico'
  }
}

/**
 * Extract domain from URL
 */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
  } catch {
    return false
  }
}

/**
 * Share link using Web Share API or fallback
 */
export async function shareLink(url: string, title: string): Promise<boolean> {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        url,
      })
      return true
    } else {
      // Fallback: copy to clipboard
      return await copyToClipboard(url)
    }
  } catch (error: any) {
    // User cancelled or error occurred
    if (error.name !== 'AbortError') {
      // Try fallback
      return await copyToClipboard(url)
    }
    return false
  }
}

/**
 * Get Open Graph preview data
 * Note: This is a client-side function that fetches OG data
 */
export async function getOpenGraphPreview(url: string): Promise<{
  title?: string
  description?: string
  image?: string
  siteName?: string
} | null> {
  try {
    // Use a CORS proxy to fetch OG data
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/html',
      },
    })
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    
    if (data.contents) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(data.contents, 'text/html')
      
      const getMetaContent = (property: string): string | undefined => {
        const meta = doc.querySelector(`meta[property="${property}"], meta[name="${property}"]`)
        return meta?.getAttribute('content') || undefined
      }
      
      const title = getMetaContent('og:title') || doc.querySelector('title')?.textContent || undefined
      const description = getMetaContent('og:description') || getMetaContent('description') || undefined
      const image = getMetaContent('og:image') || undefined
      const siteName = getMetaContent('og:site_name') || undefined
      
      // Only return if we have at least title or description
      if (title || description) {
        return {
          title,
          description,
          image,
          siteName,
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching OG preview:', error)
    return null
  }
}

/**
 * Track link click (localStorage-based)
 */
export function trackLinkClick(url: string): number {
  const key = `link_clicks_${btoa(url).replace(/[+/=]/g, '')}`
  const current = parseInt(localStorage.getItem(key) || '0', 10)
  const newCount = current + 1
  localStorage.setItem(key, newCount.toString())
  return newCount
}

/**
 * Get link click count
 */
export function getLinkClickCount(url: string): number {
  const key = `link_clicks_${btoa(url).replace(/[+/=]/g, '')}`
  return parseInt(localStorage.getItem(key) || '0', 10)
}

