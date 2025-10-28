import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

interface SocioData {
  nome: string;
  email: string;
  curriculoLattes: string | null;
}

function extrairSociosDoHTML(html: string): SocioData[] {
  const socios: SocioData[] = [];
  
  // Regex para extrair os dados dos sócios do HTML
  const articleRegex = /<article[^>]*membership-listing[^>]*>[\s\S]*?<h3[^>]*post__title[^>]*>(.*?)<\/h3>[\s\S]*?<div[^>]*excerpt[^>]*>(.*?)<\/div>/g;
  
  let match;
  while ((match = articleRegex.exec(html)) !== null) {
    const nome = match[1].trim();
    const excerptContent = match[2];
    
    // Extrair email
    const emailMatch = excerptContent.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    const email = emailMatch ? emailMatch[1].trim() : "";
    
    // Extrair link do Lattes
    const lattesMatch = excerptContent.match(/href="(https?:\/\/lattes\.cnpq\.br\/[^"]+)"/);
    const curriculoLattes = lattesMatch ? lattesMatch[1] : null;
    
    if (nome && email) {
      socios.push({
        nome,
        email,
        curriculoLattes,
      });
    }
  }
  
  return socios;
}

async function importarSocios() {
  console.log("\n🚀 IMPORTAÇÃO DE SÓCIOS PARA PRODUÇÃO");
  console.log("=====================================\n");

  // Ler o arquivo HTML da pasta public
  const htmlPath = join(process.cwd(), "public", "socios", "socios.html");
  console.log(`📂 Lendo arquivo: ${htmlPath}\n`);
  
  const html = readFileSync(htmlPath, "utf-8");
  
  // Extrair sócios do HTML
  const sociosExtraidos = extrairSociosDoHTML(html);
  console.log(`📊 Total extraído do HTML: ${sociosExtraidos.length} sócios\n`);

  if (sociosExtraidos.length === 0) {
    console.log("❌ Nenhum sócio encontrado no HTML!");
    return;
  }

  // Senha padrão para novos sócios
  const senhaHash = await bcrypt.hash("MudarSenha@2025", 10);

  let novos = 0;
  let atualizados = 0;
  let erros = 0;

  console.log("🔄 Importando sócios...\n");

  for (const socioData of sociosExtraidos) {
    try {
      const socioExistente = await prisma.associado.findUnique({
        where: { email: socioData.email },
      });

      if (socioExistente) {
        // Atualizar apenas se necessário
        await prisma.associado.update({
          where: { email: socioData.email },
          data: {
            nome: socioData.nome,
            curriculoLattes: socioData.curriculoLattes,
            visivelNoSite: true,
          },
        });
        atualizados++;
      } else {
        // Criar novo sócio
        await prisma.associado.create({
          data: {
            nome: socioData.nome,
            email: socioData.email,
            senhaHash: senhaHash,
            curriculoLattes: socioData.curriculoLattes,
            status: "ATIVO",
            role: "ASSOCIADO",
            visivelNoSite: true,
            emailVerificado: false,
          },
        });
        novos++;
      }

      // Log a cada 50 sócios
      if ((novos + atualizados) % 50 === 0) {
        console.log(`   Processados: ${novos + atualizados}/${sociosExtraidos.length}`);
      }
    } catch (error: any) {
      console.error(`❌ Erro ao importar ${socioData.nome}: ${error.message}`);
      erros++;
    }
  }

  console.log("\n=====================================");
  console.log("✅ IMPORTAÇÃO CONCLUÍDA!");
  console.log(`📊 Novos sócios: ${novos}`);
  console.log(`🔄 Atualizados: ${atualizados}`);
  console.log(`❌ Erros: ${erros}`);
  console.log(`📈 Total processado: ${novos + atualizados}`);
  console.log("\n💡 Próximos passos:");
  console.log("   - Acesse: /socios");
  console.log("   - Senha padrão para novos sócios: MudarSenha@2025");
  console.log("\n✅ Script finalizado com sucesso!");
}

importarSocios()
  .catch((e) => {
    console.error("❌ Erro fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
