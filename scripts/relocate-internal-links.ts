import fs from 'fs'
import path from 'path'
import { prisma } from '../lib/prisma'

const REPORTS_DIR = path.join(process.cwd(), 'reports')

interface LinkRewriteStats {
  totalContent: number
  contentUpdated: number
  totalReplacements: number
  postLinks: number
  pageLinks: number
  errorCount: number
  errors: string[]
}

async function buildSlugMaps() {
  const [posts, pages] = await Promise.all([
    prisma.content.findMany({
      where: { type: 'POST' },
      select: { slug: true, title: true }
    }),
    prisma.content.findMany({
      where: { type: 'PAGE' },
      select: { slug: true, title: true }
    })
  ])

  const postSlugs = new Set(posts.map(p => p.slug))
  const pageSlugs = new Set(pages.map(p => p.slug))

  return { postSlugs, pageSlugs }
}

function rewriteInternalLinks(html: string, postSlugs: Set<string>, pageSlugs: Set<string>): { newHtml: string; stats: { posts: number; pages: number; total: number } } {
  let newHtml = html
  const stats = { posts: 0, pages: 0, total: 0 }

  // Padrões para detectar links internos
  const patterns = [
    // Links absolutos com domínio
    {
      regex: /href=["']https?:\/\/[^\/\s"']+\/([^\/\s"'?#]+)(?:\/)?(?:\?[^"']*)?(?:#[^"']*)?["']/gi,
      type: 'absolute'
    },
    // Links relativos
    {
      regex: /href=["']\/([^\/\s"'?#]+)(?:\/)?(?:\?[^"']*)?(?:#[^"']*)?["']/gi,
      type: 'relative'
    },
    // Links com .html
    {
      regex: /href=["']([^"']*?)\.html(?:\?[^"']*)?(?:#[^"']*)?["']/gi,
      type: 'html'
    }
  ]

  for (const pattern of patterns) {
    newHtml = newHtml.replace(pattern.regex, (match, slug) => {
      // Limpar slug (remover query strings, hashes, etc.)
      let cleanSlug = slug
      if (cleanSlug.includes('?')) {
        cleanSlug = cleanSlug.split('?')[0]
      }
      if (cleanSlug.includes('#')) {
        cleanSlug = cleanSlug.split('#')[0]
      }
      if (cleanSlug.endsWith('.html')) {
        cleanSlug = cleanSlug.replace('.html', '')
      }
      if (cleanSlug.endsWith('/')) {
        cleanSlug = cleanSlug.slice(0, -1)
      }

      // Verificar se é um slug conhecido
      if (postSlugs.has(cleanSlug)) {
        stats.posts++
        stats.total++
        return match.replace(/href=["'][^"']*["']/, `href="/p/${cleanSlug}"`)
      } else if (pageSlugs.has(cleanSlug)) {
        stats.pages++
        stats.total++
        return match.replace(/href=["'][^"']*["']/, `href="/pagina/${cleanSlug}"`)
      }

      // Se não encontrou correspondência, manter original
      return match
    })
  }

  // Tratar casos especiais como home/index
  newHtml = newHtml.replace(
    /href=["'](?:https?:\/\/[^\/\s"']+)?\/(?:index\.html?|home\.html?|home)?\/?\s*["']/gi,
    'href="/"'
  )

  return { newHtml, stats }
}

async function updateInternalLinks(): Promise<LinkRewriteStats> {
  const stats: LinkRewriteStats = {
    totalContent: 0,
    contentUpdated: 0,
    totalReplacements: 0,
    postLinks: 0,
    pageLinks: 0,
    errorCount: 0,
    errors: []
  }

  try {
    console.log('🔍 Construindo mapas de slugs...')
    const { postSlugs, pageSlugs } = await buildSlugMaps()
    console.log(`📊 Posts: ${postSlugs.size}, Páginas: ${pageSlugs.size}`)

    // Buscar todo o conteúdo
    const contents = await prisma.content.findMany({
      select: {
        id: true,
        title: true,
        html: true
      }
    })

    stats.totalContent = contents.length
    console.log(`📄 Processando ${contents.length} itens de conteúdo...`)

    for (const content of contents) {
      try {
        const { newHtml, stats: linkStats } = rewriteInternalLinks(content.html, postSlugs, pageSlugs)

        if (linkStats.total > 0) {
          await prisma.content.update({
            where: { id: content.id },
            data: { html: newHtml }
          })

          stats.contentUpdated++
          stats.totalReplacements += linkStats.total
          stats.postLinks += linkStats.posts
          stats.pageLinks += linkStats.pages

          console.log(`🔗 "${content.title}": ${linkStats.total} links (${linkStats.posts} posts, ${linkStats.pages} páginas)`)
        }

      } catch (error) {
        stats.errorCount++
        stats.errors.push(`Erro ao processar "${content.title}": ${error}`)
        console.error(`❌ Erro ao processar "${content.title}":`, error)
      }
    }

  } catch (error) {
    stats.errorCount++
    stats.errors.push(`Erro geral: ${error}`)
    console.error('❌ Erro geral:', error)
  }

  return stats
}

async function generateReport(stats: LinkRewriteStats) {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true })
  }

  const reportPath = path.join(REPORTS_DIR, 'link-rewrite.log')

  let report = `# Relatório de Reescrita de Links Internos\n\n`
  report += `Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`
  report += `## Estatísticas\n\n`
  report += `- **Total de conteúdos processados**: ${stats.totalContent}\n`
  report += `- **Conteúdos atualizados**: ${stats.contentUpdated}\n`
  report += `- **Total de links reescritos**: ${stats.totalReplacements}\n`
  report += `- **Links para posts**: ${stats.postLinks}\n`
  report += `- **Links para páginas**: ${stats.pageLinks}\n`
  report += `- **Erros**: ${stats.errorCount}\n`

  if (stats.contentUpdated > 0) {
    report += `- **Taxa de atualização**: ${((stats.contentUpdated / stats.totalContent) * 100).toFixed(2)}%\n`
    report += `- **Média de links por conteúdo**: ${(stats.totalReplacements / stats.contentUpdated).toFixed(2)}\n`
  }

  report += `\n`

  if (stats.errors.length > 0) {
    report += `## Erros Encontrados\n\n`
    stats.errors.forEach(error => {
      report += `- ${error}\n`
    })
    report += `\n`
  }

  report += `## Padrões de Reescrita\n\n`
  report += `### Links para Posts\n`
  report += `- Convertidos para: \`/p/{slug}\`\n\n`
  report += `### Links para Páginas\n`
  report += `- Convertidos para: \`/pagina/{slug}\`\n\n`
  report += `### Casos Especiais\n`
  report += `- \`index.html\`, \`home.html\`, \`/home\` → \`/\`\n`
  report += `- Remoção de sufixos \`.html\`\n`
  report += `- Normalização de barras finais\n`

  fs.writeFileSync(reportPath, report, 'utf8')
  console.log(`📊 Relatório salvo: ${reportPath}`)
}

async function main() {
  try {
    console.log('🔄 Iniciando reescrita de links internos...')

    const stats = await updateInternalLinks()

    console.log('\n✅ Reescrita concluída!')
    console.log(`📊 Estatísticas:`)
    console.log(`   - Conteúdos processados: ${stats.totalContent}`)
    console.log(`   - Conteúdos atualizados: ${stats.contentUpdated}`)
    console.log(`   - Links reescritos: ${stats.totalReplacements}`)
    console.log(`   - Links para posts: ${stats.postLinks}`)
    console.log(`   - Links para páginas: ${stats.pageLinks}`)
    console.log(`   - Erros: ${stats.errorCount}`)

    await generateReport(stats)

    if (stats.errorCount > 0) {
      console.warn(`⚠️  ${stats.errorCount} erros encontrados. Verifique o relatório para detalhes.`)
    }

  } catch (error) {
    console.error('❌ Erro durante a reescrita:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main()
}
