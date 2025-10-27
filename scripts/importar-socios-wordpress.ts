import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as cheerio from "cheerio";

const prisma = new PrismaClient();

// HTML exportado do WordPress
const htmlWordpress = `
[SERÁ PREENCHIDO COM OS DADOS]
`;

interface SocioData {
  nome: string;
  email: string;
  curriculoLattes: string | null;
}

function extrairSocios(html: string): SocioData[] {
  const $ = cheerio.load(html);
  const socios: SocioData[] = [];

  $("article.membership-listing").each((_, element) => {
    const nome = $(element).find("h3.post__title").text().trim();
    const excerptText = $(element).find(".excerpt").text().trim();
    const lattesLink = $(element).find('a[href*="lattes.cnpq.br"]').attr("href");

    // Extrair email do texto (formato: "email@example.com | Currículo Lattes" ou apenas "email@example.com")
    let email = "";
    const emailMatch = excerptText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
    if (emailMatch) {
      email = emailMatch[1].trim();
    }

    if (nome && email) {
      socios.push({
        nome,
        email,
        curriculoLattes: lattesLink || null,
      });
    }
  });

  return socios;
}

async function importarSocios() {
  console.log("\n🚀 IMPORTAÇÃO DE SÓCIOS DO WORDPRESS");
  console.log("=====================================\n");

  const socios = extrairSocios(htmlWordpress);
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
        
        if ((i + 1) % 50 === 0) {
          console.log(`🔄 Progresso: ${i + 1}/${socios.length} (${novos} novos, ${atualizados} atualizados)`);
        }
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
        
        if ((i + 1) % 50 === 0) {
          console.log(`✨ Progresso: ${i + 1}/${socios.length} (${novos} novos, ${atualizados} atualizados)`);
        }
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
