import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

interface LegacyHtmlProps {
  content: string
  className?: string
}

export default function LegacyHtml({ content, className = '' }: LegacyHtmlProps) {
  const sanitizeHtml = (html: string) => {
    try {
      const result = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeSanitize, {
          // Permitir tags comuns do WordPress
          tagNames: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'div', 'span',
            'strong', 'b', 'em', 'i', 'u',
            'a', 'img',
            'ul', 'ol', 'li',
            'blockquote', 'pre', 'code',
            'table', 'thead', 'tbody', 'tr', 'td', 'th',
            'figure', 'figcaption'
          ],
          attributes: {
            '*': ['class', 'id', 'style'],
            'a': ['href', 'title', 'target', 'rel'],
            'img': ['src', 'alt', 'title', 'width', 'height'],
            'table': ['border', 'cellpadding', 'cellspacing'],
            'td': ['colspan', 'rowspan'],
            'th': ['colspan', 'rowspan']
          }
        })
        .use(rehypeStringify)
        .processSync(html)
      
      return String(result)
    } catch (error) {
      console.error('Erro ao sanitizar HTML:', error)
      return '<p>Erro ao processar conteúdo</p>'
    }
  }

  // Processar links externos para adicionar target="_blank" e rel="noopener"
  const processExternalLinks = (html: string) => {
    return html.replace(
      /<a\s+([^>]*href=["']https?:\/\/[^"']*["'][^>]*)>/gi,
      (match, attrs) => {
        if (!attrs.includes('target=')) {
          attrs += ' target="_blank"'
        }
        if (!attrs.includes('rel=')) {
          attrs += ' rel="noopener noreferrer"'
        }
        return `<a ${attrs}>`
      }
    )
  }

  const sanitizedContent = sanitizeHtml(content)
  const processedContent = processExternalLinks(sanitizedContent)

  return (
    <div 
      className={`legacy-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}
