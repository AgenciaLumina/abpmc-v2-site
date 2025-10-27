import fs from 'fs'
import path from 'path'

const STATIC_EXPORT_PATH = "/Volumes/Dock Station/abpmcdev/estatico/estatico-abpmc"
const PUBLIC_UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')
const REPORTS_DIR = path.join(process.cwd(), 'reports')

interface MediaManifest {
  [originalPath: string]: string // originalPath -> /uploads/...
}

async function copyDirectory(src: string, dest: string): Promise<void> {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function findUploadsDirectories(basePath: string): string[] {
  const uploadsPaths: string[] = []
  
  function searchRecursive(currentPath: string) {
    if (!fs.existsSync(currentPath)) return
    
    try {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true })
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const fullPath = path.join(currentPath, entry.name)
          
          // Procurar por diretórios wp-content/uploads
          if (entry.name === 'uploads' && currentPath.includes('wp-content')) {
            uploadsPaths.push(fullPath)
          } else if (entry.name === 'wp-content') {
            searchRecursive(fullPath)
          } else if (!entry.name.startsWith('.')) {
            searchRecursive(fullPath)
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Erro ao acessar diretório ${currentPath}:`, error)
    }
  }
  
  searchRecursive(basePath)
  return uploadsPaths
}

function generateMediaManifest(uploadsDir: string, publicUploadsDir: string): MediaManifest {
  const manifest: MediaManifest = {}
  
  function processDirectory(currentDir: string, relativePath: string = '') {
    if (!fs.existsSync(currentDir)) return
    
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      const relativeFilePath = path.join(relativePath, entry.name)
      
      if (entry.isDirectory()) {
        processDirectory(fullPath, relativeFilePath)
      } else {
        // Mapear caminho original para caminho público
        const originalPath = fullPath.replace(uploadsDir, '/wp-content/uploads')
        const publicPath = '/uploads/' + relativeFilePath.replace(/\\/g, '/')
        manifest[originalPath] = publicPath
      }
    }
  }
  
  processDirectory(uploadsDir)
  return manifest
}

async function main() {
  try {
    console.log('📁 Procurando diretórios de uploads...')
    
    if (!fs.existsSync(STATIC_EXPORT_PATH)) {
      console.error(`❌ Diretório de export estático não encontrado: ${STATIC_EXPORT_PATH}`)
      process.exit(1)
    }
    
    const uploadsPaths = findUploadsDirectories(STATIC_EXPORT_PATH)
    
    if (uploadsPaths.length === 0) {
      console.warn('⚠️  Nenhum diretório wp-content/uploads encontrado')
      return
    }
    
    console.log(`📂 Encontrados ${uploadsPaths.length} diretório(s) de uploads:`)
    uploadsPaths.forEach(p => console.log(`   - ${p}`))
    
    // Usar o primeiro diretório encontrado (ou combinar todos se necessário)
    const mainUploadsDir = uploadsPaths[0]
    
    console.log(`📋 Copiando arquivos de: ${mainUploadsDir}`)
    console.log(`📋 Para: ${PUBLIC_UPLOADS_DIR}`)
    
    // Copiar arquivos
    await copyDirectory(mainUploadsDir, PUBLIC_UPLOADS_DIR)
    
    // Gerar manifest
    const manifest = generateMediaManifest(mainUploadsDir, PUBLIC_UPLOADS_DIR)
    
    // Salvar manifest
    if (!fs.existsSync(REPORTS_DIR)) {
      fs.mkdirSync(REPORTS_DIR, { recursive: true })
    }
    
    const manifestPath = path.join(REPORTS_DIR, 'media-manifest.json')
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')
    
    console.log(`✅ Cópia concluída!`)
    console.log(`📊 Arquivos copiados: ${Object.keys(manifest).length}`)
    console.log(`📄 Manifest salvo: ${manifestPath}`)
    
    // Processar outros diretórios se existirem
    if (uploadsPaths.length > 1) {
      console.log(`\n📝 Processando diretórios adicionais...`)
      for (let i = 1; i < uploadsPaths.length; i++) {
        const additionalDir = uploadsPaths[i]
        console.log(`📂 Processando: ${additionalDir}`)
        
        const additionalManifest = generateMediaManifest(additionalDir, PUBLIC_UPLOADS_DIR)
        
        // Copiar apenas arquivos que não existem
        for (const [originalPath, publicPath] of Object.entries(additionalManifest)) {
          const sourcePath = originalPath.replace('/wp-content/uploads', additionalDir)
          const targetPath = path.join(process.cwd(), 'public', publicPath)
          
          if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
            const targetDir = path.dirname(targetPath)
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true })
            }
            fs.copyFileSync(sourcePath, targetPath)
            manifest[originalPath] = publicPath
          }
        }
      }
      
      // Atualizar manifest final
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')
      console.log(`📊 Total final de arquivos: ${Object.keys(manifest).length}`)
    }
    
  } catch (error) {
    console.error('❌ Erro durante a cópia de mídia:', error)
    process.exit(1)
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main()
}
