import fs from 'fs'
import path from 'path'
import { prisma } from '../lib/prisma'

const REPORTS_DIR = path.join(process.cwd(), 'reports')

interface RewriteStats {
  totalContent: number
  contentUpdated: number
  totalReplacements: number
  errorCount: number
  errors: string[]
}

function rewriteMediaUrls(html: string): { newHtml: string; replacements: number } {
  let replacements = 0
  
  // Padrões para detectar URLs de wp-content/uploads
  const patterns = [
    // URLs absolutas com domínio
    /https?:\/\/[^\/\s"']+\/wp-content\/uploads\/([^"'\s>]+)/gi,
    // URLs absolutas sem domínio
    /\/wp-content\/uploads\/([^"'\s>]+)/gi,
    // URLs relativas
    /wp-content\/uploads\/([^"'\s>]+)/gi
  ]
  
  let newHtml = html
  
  for (const pattern of patterns) {
    newHtml = newHtml.replace(pattern, (match, filePath) => {
      replacements++
      return `/uploads/${filePath}`
    })
  }
  
  return { newHtml, replacements }
}

async function updateContentMedia(): Promise<RewriteStats> {
  const stats: RewriteStats = {
    totalContent: 0,
    contentUpdated: 0,
    totalReplacements: 0,
    errorCount: 0,
    errors: []
  }
  
  try {
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
        const { newHtml, replacements } = rewriteMediaUrls(content.html)
        
        if (replacements > 0) {
          await prisma.content.update({
            where: { id: content.id },
            data: { html: newHtml }
          })
          
          stats.contentUpdated++
          stats.totalReplacements += replacements
          
          console.log(`✏️  "${content.title}": ${replacements} substituições`)
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

async function generateReport(stats: RewriteStats) {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true })
  }

  const reportPath = path.join(REPORTS_DIR, 'media-rewrite.log')
  
  let report = `# Relatório de Reescrita de Links de Mídia\n\n`
  report += `Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`
  report += `## Estatísticas\n\n`
  report += `- **Total de conteúdos processados**: ${stats.totalContent}\n`
  report += `- **Conteúdos atualizados**: ${stats.contentUpdated}\n`
  report += `- **Total de substituições**: ${stats.totalReplacements}\n`
  report += `- **Erros**: ${stats.errorCount}\n`
  
  if (stats.contentUpdated > 0) {
    report += `- **Taxa de atualização**: ${((stats.contentUpdated / stats.totalContent) * 100).toFixed(2)}%\n`
    report += `- **Média de substituições por conteúdo**: ${(stats.totalReplacements / stats.contentUpdated).toFixed(2)}\n`
  }
  
  report += `\n`

  if (stats.errors.length > 0) {
    report += `## Erros Encontrados\n\n`
    stats.errors.forEach(error => {
      report += `- ${error}\n`
    })
    report += `\n`
  }
  
  report += `## Padrões Reescritos\n\n`
  report += `Os seguintes padrões foram convertidos para \`/uploads/...\`:\n\n`
  report += `- \`https://dominio.com/wp-content/uploads/...\`\n`
  report += `- \`/wp-content/uploads/...\`\n`
  report += `- \`wp-content/uploads/...\`\n`

  fs.writeFileSync(reportPath, report, 'utf8')
  console.log(`📊 Relatório salvo: ${reportPath}`)
}

async function main() {
  try {
    console.log('🔄 Iniciando reescrita de links de mídia no HTML...')
    
    const stats = await updateContentMedia()
    
    console.log('\n✅ Reescrita concluída!')
    console.log(`📊 Estatísticas:`)
    console.log(`   - Conteúdos processados: ${stats.totalContent}`)
    console.log(`   - Conteúdos atualizados: ${stats.contentUpdated}`)
    console.log(`   - Total de substituições: ${stats.totalReplacements}`)
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
