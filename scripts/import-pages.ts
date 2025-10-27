import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'
import { prisma } from '../lib/prisma'

const CSV_PAGES_PATH = "/Volumes/Dock Station/abpmcdev/estatico/Paginas-Export-2025-October-26-1201.csv"
const REPORTS_DIR = path.join(process.cwd(), 'reports')

interface ImportStats {
  total: number
  imported: number
  updated: number
  errors: number
  errorDetails: string[]
}

function normalizeSlug(slug: string): string {
  if (!slug) return ''
  
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function ensureUniqueSlug(baseSlug: string, existingSlugs: Set<string>): string {
  let slug = baseSlug
  let counter = 1
  
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  existingSlugs.add(slug)
  return slug
}

async function importPages(): Promise<ImportStats> {
  const stats: ImportStats = {
    total: 0,
    imported: 0,
    updated: 0,
    errors: 0,
    errorDetails: []
  }

  return new Promise((resolve, reject) => {
    const results: any[] = []
    
    if (!fs.existsSync(CSV_PAGES_PATH)) {
      reject(new Error(`Arquivo não encontrado: ${CSV_PAGES_PATH}`))
      return
    }

    fs.createReadStream(CSV_PAGES_PATH)
      .pipe(parse({ 
        columns: true,
        skip_empty_lines: true,
        trim: true
      }))
      .on('data', (data) => {
        results.push(data)
      })
      .on('end', async () => {
        stats.total = results.length
        const existingSlugs = new Set<string>()

        for (const row of results) {
          try {
            // Mapear campos do CSV
            const title = row.Title || row.title || ''
            const content = row.Content || row.content || ''
            const excerpt = row.Excerpt || row.excerpt || null
            const status = row.Status || row.status || 'publish'
            const slug = row.Slug || row.slug || row.post_name || normalizeSlug(title)
            const dateStr = row.Date || row.date || row.post_date
            const author = row['Author Username'] || row.author || null

            if (!title || !content) {
              stats.errors++
              stats.errorDetails.push(`Linha ${stats.total - results.length + results.indexOf(row) + 1}: Título ou conteúdo vazio`)
              continue
            }

            const normalizedSlug = normalizeSlug(slug)
            if (!normalizedSlug) {
              stats.errors++
              stats.errorDetails.push(`Linha ${stats.total - results.length + results.indexOf(row) + 1}: Não foi possível gerar slug para "${title}"`)
              continue
            }

            const uniqueSlug = ensureUniqueSlug(normalizedSlug, existingSlugs)

            // Processar data
            let createdAt = new Date()
            let publishedAt: Date | null = null
            
            if (dateStr) {
              const parsedDate = new Date(dateStr)
              if (!isNaN(parsedDate.getTime())) {
                createdAt = parsedDate
                if (status === 'publish') {
                  publishedAt = parsedDate
                }
              }
            }

            // Upsert no banco
            const existingPage = await prisma.content.findUnique({
              where: { slug: uniqueSlug }
            })

            if (existingPage) {
              await prisma.content.update({
                where: { slug: uniqueSlug },
                data: {
                  title,
                  html: content,
                  excerpt,
                  status,
                  updatedAt: new Date(),
                  publishedAt,
                  author,
                  type: 'PAGE'
                }
              })
              stats.updated++
            } else {
              await prisma.content.create({
                data: {
                  type: 'PAGE',
                  title,
                  slug: uniqueSlug,
                  html: content,
                  excerpt,
                  status,
                  createdAt,
                  publishedAt,
                  author
                }
              })
              stats.imported++
            }

          } catch (error) {
            stats.errors++
            stats.errorDetails.push(`Erro ao processar linha ${stats.total - results.length + results.indexOf(row) + 1}: ${error}`)
          }
        }

        resolve(stats)
      })
      .on('error', reject)
  })
}

async function generateReport(stats: ImportStats) {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true })
  }

  const reportPath = path.join(REPORTS_DIR, 'import-pages.log')
  
  let report = `# Relatório de Importação - Páginas\n\n`
  report += `Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`
  report += `## Estatísticas\n\n`
  report += `- **Total de registros processados**: ${stats.total}\n`
  report += `- **Páginas importadas**: ${stats.imported}\n`
  report += `- **Páginas atualizadas**: ${stats.updated}\n`
  report += `- **Erros**: ${stats.errors}\n`
  report += `- **Taxa de sucesso**: ${((stats.imported + stats.updated) / stats.total * 100).toFixed(2)}%\n\n`

  if (stats.errorDetails.length > 0) {
    report += `## Detalhes dos Erros\n\n`
    stats.errorDetails.forEach(error => {
      report += `- ${error}\n`
    })
  }

  fs.writeFileSync(reportPath, report, 'utf8')
  console.log(`📊 Relatório salvo: ${reportPath}`)
}

async function main() {
  try {
    console.log('📄 Iniciando importação de páginas...')
    console.log(`📂 Arquivo: ${CSV_PAGES_PATH}`)
    
    const stats = await importPages()
    
    console.log('\n✅ Importação concluída!')
    console.log(`📊 Estatísticas:`)
    console.log(`   - Total: ${stats.total}`)
    console.log(`   - Importadas: ${stats.imported}`)
    console.log(`   - Atualizadas: ${stats.updated}`)
    console.log(`   - Erros: ${stats.errors}`)
    console.log(`   - Taxa de sucesso: ${((stats.imported + stats.updated) / stats.total * 100).toFixed(2)}%`)
    
    await generateReport(stats)
    
    if (stats.errors > 0) {
      console.warn(`⚠️  ${stats.errors} erros encontrados. Verifique o relatório para detalhes.`)
    }
    
  } catch (error) {
    console.error('❌ Erro durante a importação:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main()
}
