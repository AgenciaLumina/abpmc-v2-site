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
  console.log("\n🚀 IMPORTAÇÃO DE SÓCIOS DO WORDPRESS");
  console.log("=====================================\n");

  // Tentar ler o arquivo HTML
  let html = "";
  const possiveisCaminhos = [
    "/tmp/socios-wordpress.html",
    join(process.cwd(), "socios-wordpress.html"),
    join(process.cwd(), "scripts", "socios-wordpress.html"),
  ];

  for (const caminho of possiveisCaminhos) {
    try {
      html = readFileSync(caminho, "utf-8");
      console.log(`✅ Arquivo HTML encontrado: ${caminho}\n`);
      break;
    } catch (error) {
      // Continuar tentando
    }
  }

  if (!html) {
    console.log("❌ Arquivo HTML não encontrado!");
    console.log("\n📝 Como usar:");
    console.log("1. Salve o HTML dos sócios em um dos seguintes locais:");
    possiveisCaminhos.forEach(c => console.log(`   - ${c}`));
    console.log("2. Execute: npm run script scripts/importar-socios-html.ts\n");
    return;
  }

  const socios = extrairSociosDoHTML(html);
  console.log(`📊 Total extraído do HTML: ${socios.length} sócios\n`);

  if (socios.length === 0) {
    console.log("❌ Nenhum sócio foi extraído do HTML!");
    return;
  }

  let novos = 0;
  let atualizados = 0;
  let erros = 0;

  // Senha padrão para novos sócios
  const senhaTemporaria = "MudarSenha@2025";
  const senhaHash = await bcrypt.hash(senhaTemporaria, 10);

  for (let i = 0; i < socios.length; i++) {
    const socio = socios[i];

    try {
      // Verificar se já existe
      const existente = await prisma.associado.findUnique({
        where: { email: socio.email },
      });

      if (existente) {
        // Atualizar dados existentes
        await prisma.associado.update({
          where: { email: socio.email },
          data: {
            nome: socio.nome,
            curriculoLattes: socio.curriculoLattes,
            visivelNoSite: true,
          },
        });
        atualizados++;
      } else {
        // Criar novo sócio
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
        novos++;
      }

      if ((i + 1) % 50 === 0) {
        console.log(`⏳ Progresso: ${i + 1}/${socios.length} (${novos} novos, ${atualizados} atualizados)`);
      }
    } catch (error) {
      erros++;
      console.error(`❌ Erro ao processar ${socio.nome}:`, error);
    }
  }

  console.log("\n=====================================");
  console.log("✅ IMPORTAÇÃO CONCLUÍDA!");
  console.log(`📊 Novos sócios: ${novos}`);
  console.log(`🔄 Atualizados: ${atualizados}`);
  console.log(`❌ Erros: ${erros}`);
  console.log(`📈 Total processado: ${socios.length}`);
  console.log("\n💡 Próximos passos:");
  console.log("   - Acesse: http://localhost:3000/socios");
  console.log("   - Senha padrão para novos sócios: MudarSenha@2025");
}

importarSocios()
  .then(() => {
    console.log("\n✅ Script finalizado com sucesso!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Erro ao executar importação:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
