import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse'

// Caminhos dos arquivos CSV (com espaços)
const CSV_POSTS_PATH = "/Volumes/Dock Station/abpmcdev/estatico/Posts-Export-2025-October-26-1200.csv"
const CSV_PAGES_PATH = "/Volumes/Dock Station/abpmcdev/estatico/Paginas-Export-2025-October-26-1201.csv"
const REPORTS_DIR = path.join(process.cwd(), 'reports')

interface CSVInspection {
  filename: string
  totalRows: number
  columns: string[]
  sampleRows: any[]
  mappings: {
    title?: string
    slug?: string
    content?: string
    date?: string
    status?: string
    type?: string
    excerpt?: string
  }
}

async function inspectCSV(filePath: string): Promise<CSVInspection> {
  return new Promise((resolve, reject) => {
    const results: any[] = []
    let headers: string[] = []
    
    fs.createReadStream(filePath)
      .pipe(parse({ 
        columns: true,
        skip_empty_lines: true,
        trim: true
      }))
      .on('data', (data) => {
        if (headers.length === 0) {
          headers = Object.keys(data)
        }
        results.push(data)
      })
      .on('end', () => {
        // Detectar mapeamentos típicos do WordPress
        const mappings: any = {}
        
        headers.forEach(col => {
          const lower = col.toLowerCase()
          if (lower.includes('title')) mappings.title = col
          if (lower.includes('slug') || lower === 'post_name') mappings.slug = col
          if (lower.includes('content')) mappings.content = col
          if (lower.includes('date')) mappings.date = col
          if (lower.includes('status')) mappings.status = col
          if (lower.includes('type')) mappings.type = col
          if (lower.includes('excerpt')) mappings.excerpt = col
        })

        resolve({
          filename: path.basename(filePath),
          totalRows: results.length,
          columns: headers,
          sampleRows: results.slice(0, 3), // Primeiras 3 linhas como amostra
          mappings
        })
      })
      .on('error', reject)
  })
}

async function generateReport(inspections: CSVInspection[]) {
  // Criar diretório de reports se não existir
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true })
  }

  const reportPath = path.join(REPORTS_DIR, 'csv-inspection.md')
  
  let report = `# Relatório de Inspeção dos CSVs\n\n`
  report += `Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`

  for (const inspection of inspections) {
    report += `## ${inspection.filename}\n\n`
    report += `- **Total de registros**: ${inspection.totalRows}\n`
    report += `- **Colunas encontradas**: ${inspection.columns.length}\n\n`
    
    report += `### Colunas Detectadas\n\n`
    inspection.columns.forEach(col => {
      report += `- \`${col}\`\n`
    })
    
    report += `\n### Mapeamentos Sugeridos\n\n`
    Object.entries(inspection.mappings).forEach(([key, value]) => {
      report += `- **${key}**: \`${value}\`\n`
    })
    
    report += `\n### Amostra de Dados\n\n`
    if (inspection.sampleRows.length > 0) {
      const firstRow = inspection.sampleRows[0]
      Object.entries(firstRow).slice(0, 5).forEach(([key, value]) => {
        const truncatedValue = String(value).length > 100 
          ? String(value).substring(0, 100) + '...' 
          : String(value)
        report += `- **${key}**: ${truncatedValue}\n`
      })
    }
    
    report += `\n---\n\n`
  }

  fs.writeFileSync(reportPath, report, 'utf8')
  console.log(`✅ Relatório gerado: ${reportPath}`)
}

async function main() {
  try {
    console.log('🔍 Inspecionando arquivos CSV...')
    
    const inspections: CSVInspection[] = []
    
    // Verificar se os arquivos existem
    if (fs.existsSync(CSV_POSTS_PATH)) {
      console.log(`📄 Inspecionando: ${CSV_POSTS_PATH}`)
      inspections.push(await inspectCSV(CSV_POSTS_PATH))
    } else {
      console.warn(`⚠️  Arquivo não encontrado: ${CSV_POSTS_PATH}`)
    }
    
    if (fs.existsSync(CSV_PAGES_PATH)) {
      console.log(`📄 Inspecionando: ${CSV_PAGES_PATH}`)
      inspections.push(await inspectCSV(CSV_PAGES_PATH))
    } else {
      console.warn(`⚠️  Arquivo não encontrado: ${CSV_PAGES_PATH}`)
    }
    
    if (inspections.length > 0) {
      await generateReport(inspections)
      console.log('✅ Inspeção concluída!')
    } else {
      console.error('❌ Nenhum arquivo CSV encontrado para inspeção')
      process.exit(1)
    }
    
  } catch (error) {
    console.error('❌ Erro durante a inspeção:', error)
    process.exit(1)
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main()
}
