'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownContentProps {
  content?: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!content || content.trim() === '') return null

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full px-4 py-3 text-left
          flex items-center justify-between
          rounded-[var(--radius-md)]
          bg-[var(--surface)]
          border border-[var(--border)]
          text-[var(--text)]
          hover:border-[var(--accent)]
          focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]
          transition-all duration-200
        `}
        aria-expanded={isExpanded}
      >
        <span className="font-medium">Más información</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isExpanded && (
        <div className={`
          mt-4 p-6
          rounded-[var(--radius-md)]
          bg-[var(--surface)]
          border border-[var(--border)]
          prose prose-sm max-w-none
          text-[var(--text)]
        `}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-[var(--text)]">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold mb-3 text-[var(--text)]">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">{children}</h3>,
              p: ({ children }) => <p className="mb-4 text-[var(--text)] leading-relaxed">{children}</p>,
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-[var(--text)]">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-[var(--text)]">{children}</ol>,
              li: ({ children }) => <li className="mb-2">{children}</li>,
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 rounded bg-[var(--bg)] text-[var(--accent)] text-sm font-mono">
                  {children}
                </code>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
