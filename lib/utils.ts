/**
 * Utility functions for the application
 */

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

