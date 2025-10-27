import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

// Caminho do arquivo TXT
const TXT_PATH = "/Users/paulomedeiros/CascadeProjects/posts xml abpmc/lista_socios.txt";

interface SocioData {
  nome: string;
  email: string;
  curriculoLattes: string | null;
}

/**
 * Parseia uma linha do TXT
 * Formato: Nome — email — url_lattes
 */
function parseLine(line: string): SocioData | null {
  const parts = line.split(" — ").map(p => p.trim());
  
  if (parts.length < 2) {
    return null;
  }
  
  const nome = parts[0];
  const email = parts[1];
  const curriculoLattes = parts[2] && parts[2] !== "" ? parts[2] : null;
  
  if (!nome || !email) {
    return null;
  }
  
  return {
    nome,
    email,
    curriculoLattes,
  };
}

/**
 * Importa todos os sócios do arquivo TXT
 */
async function importarSociosTxt() {
  console.log("\n🚀 IMPORTAÇÃO DE SÓCIOS DO ARQUIVO TXT");
  console.log("=".repeat(70));
  
  // Ler arquivo
  const content = readFileSync(TXT_PATH, "utf-8");
  const lines = content.split("\n").filter(l => l.trim() !== "");
  
  console.log(`\n📄 Arquivo: ${TXT_PATH}`);
  console.log(`📊 Total de linhas: ${lines.length}\n`);
  
  let processados = 0;
  let criados = 0;
  let atualizados = 0;
  let erros = 0;
  
  // Senha padrão
  const senhaTemporaria = "MudarSenha@2025";
  const senhaHash = await bcrypt.hash(senhaTemporaria, 10);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const socio = parseLine(line);
    
    if (!socio) {
      console.log(`⚠️  Linha ${i + 1}: Formato inválido - "${line.substring(0, 50)}..."`);
      erros++;
      continue;
    }
    
    try {
      // Verificar se já existe
      const existente = await prisma.associado.findUnique({
        where: { email: socio.email },
      });
      
      if (existente) {
        // Atualizar
        await prisma.associado.update({
          where: { email: socio.email },
          data: {
            nome: socio.nome,
            curriculoLattes: socio.curriculoLattes,
            visivelNoSite: true,
            status: "ATIVO",
          },
        });
        atualizados++;
      } else {
        // Criar novo
        await prisma.associado.create({
          data: {
            nome: socio.nome,
            email: socio.email,
            senhaHash,
            curriculoLattes: socio.curriculoLattes,
            visivelNoSite: true,
            status: "ATIVO",
            emailVerificado: false,
            role: "ASSOCIADO",
          },
        });
        criados++;
        
        if (criados % 50 === 0) {
          console.log(`✨ ${criados} novos sócios criados...`);
        }
      }
      
      processados++;
      
    } catch (error: any) {
      erros++;
      console.error(`❌ Erro ao processar ${socio.nome}:`, error.message);
    }
  }
  
  console.log("\n" + "=".repeat(70));
  console.log("✅ IMPORTAÇÃO CONCLUÍDA!");
  console.log(`📊 Processados: ${processados} sócios`);
  console.log(`✨ Criados: ${criados} novos sócios`);
  console.log(`🔄 Atualizados: ${atualizados} sócios`);
  console.log(`❌ Erros: ${erros}`);
  console.log("=".repeat(70));
  
  // Verificar total no banco
  const totalBanco = await prisma.associado.count();
  const visiveis = await prisma.associado.count({
    where: { visivelNoSite: true },
  });
  
  console.log(`\n📈 Total no banco: ${totalBanco} sócios`);
  console.log(`👁️  Visíveis no site: ${visiveis} sócios\n`);
}

// Executar
importarSociosTxt()
  .then(() => {
    console.log("✅ Script finalizado com sucesso!\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Erro fatal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
