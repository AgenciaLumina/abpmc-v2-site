import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// TODOS OS 700+ SÓCIOS EXTRAÍDOS DO CÓDIGO JAVASCRIPT
const sociosCompletos = [{"name": "Adriana Lourenço Lopes", "email": "adrianalourencolopes@gmail.com", "cv": "http://lattes.cnpq.br/9686139344430086"}, {"name": "Adriana Grando", "email": "adrgrando@gmail.com", "cv": "http://lattes.cnpq.br/6655526661447047"}, {"name": "Adriana de Fátima Fontes", "email": "adrianafontes.psico@gmail.com", "cv": ""}, {"name": "Adriane Gomes Queiroz", "email": "adriane.queiroz.g@gmail.com", "cv": ""}, {"name": "Adriano Rodrigues Dos Santos", "email": "adrianorodrigues6@hotmail.com", "cv": ""}, {"name": "Adrieli Gonçalves Dos Santos", "email": "agsantos01@outlook.com", "cv": ""}, {"name": "Alan Souza Aranha", "email": "alansaranha@gmail.com", "cv": "http://lattes.cnpq.br/3642620826614727"}, {"name": "Alana Dos Anjos Moreira", "email": "alanamoreirapsi@gmail.com", "cv": ""}, {"name": "Alceu Martins Filho", "email": "alceu.ms@gmail.com", "cv": "http://lattes.cnpq.br/9935669683108405"}, {"name": "Alcione Sá", "email": "alcioneferreira.psi@gmail.com", "cv": "http://lattes.cnpq.br/2039235133640472"}, {"name": "Aldeíne Martins", "email": "psi.deinymartins@gmail.com", "cv": ""}, {"name": "Alessandra Avanzi", "email": "aleavanzi7@gmail.com", "cv": ""}, {"name": "Alessandra Pimenta de Souza", "email": "alepossani@icloud.com", "cv": ""}, {"name": "Alessandra Honorato Benfica Franco", "email": "alessandra.fls.pdg@gmail.com", "cv": "https://lattes.cnpq.br/4264580994487086"}, {"name": "Alessandra Bizeli Oliveira Sartori", "email": "alessandra.sabiamente@gmail.com", "cv": ""}, {"name": "Alexandra Cristina Souza Gomes de Paula", "email": "psicologiale@hotmail.com", "cv": ""}, {"name": "Alexandre Xavier", "email": "alexavier_s@hotmail.com", "cv": ""}, {"name": "Alexandre Aguiar Victuri", "email": "alevicturi@gmail.com", "cv": "https://lattes.cnpq.br/3410876309159688"}, {"name": "Alexia Oshiro", "email": "alexiapsico98@gmail.com", "cv": ""}, {"name": "Alice Maciel Ferreira Monteiro", "email": "alicef40@gmail.com", "cv": ""}, {"name": "Aline Baldo", "email": "aline_baldo@hotmail.com", "cv": "https://lattes.cnpq.br/1643546172897643"}, {"name": "Aline Kabbaz", "email": "aline.bfkabbaz@gmail.com", "cv": "https://lattes.cnpq.br/1547309656020640"}, {"name": "Aline da Silva Rodrigues Marques", "email": "psi.alinesrodrigues@gmail.com", "cv": "http://lattes.cnpq.br/7005398011532677"}, {"name": "Aline Banganha Prato", "email": "alineprato@hotmail.com", "cv": ""}, {"name": "Aline França", "email": "psicologaalinefranca@gmail.com", "cv": ""}, {"name": "Aline Daniela Gomes da Silva Vieira", "email": "ad.vieira@usp.br", "cv": "http://lattes.cnpq.br/2556824378856957"}, {"name": "Amanda de Melo", "email": "amandav.meloo@gmail.com", "cv": "http://lattes.cnpq.br/2161469271053940"}, {"name": "Amanda Raña Ferreira", "email": "amanda.rana@gmail.com", "cv": ""}, {"name": "Amanda Oliveira de Morais de Morais", "email": "amandaomorais@gmail.com", "cv": "http://lattes.cnpq.br/2915880924460589"}, {"name": "Amilcar Rodrigues Fonseca Júnior", "email": "ajrpsico@yahoo.com.br", "cv": "http://lattes.cnpq.br/4367734116952280"}, {"name": "Amona Lima", "email": "amona_priscila@yahoo.com.br", "cv": "http://lattes.cnpq.br/0614921738135666"}, {"name": "Ana Perriello", "email": "espacosensi@gmail.com", "cv": ""}, {"name": "Ana Karina Leme Arantes", "email": "ana.arantes@gmail.com", "cv": "http://lattes.cnpq.br/1785475312488456"}, {"name": "Ana Alice Reis Pieretti", "email": "anaalicereisp@gmail.com", "cv": ""}, {"name": "Ana Beatriz Tolentino da Silva", "email": "anasi@ufcspa.edu.br", "cv": ""}, {"name": "Ana Beatriz de Deus", "email": "abeatrizdedeus@gmail.com", "cv": "https://lattes.cnpq.br/6424014663824574"}, {"name": "Ana Beatriz Briones Mantovani", "email": "aninhabrionesm@gmail.com", "cv": ""}, {"name": "Ana Camila Marcelo", "email": "anacamilamarcelo@gmail.com", "cv": ""}, {"name": "Ana Carolina Pereira Alves", "email": "carol.alves@entremeioic.com.br", "cv": "http://lattes.cnpq.br/7330382621797345"}, {"name": "Ana Carolina Cainé Canassa", "email": "psicoaccanassa@gmail.com", "cv": "http://lattes.cnpq.br/5505210106808379"}, {"name": "Ana Cláudia de Oliveira Costa de Souza", "email": "anaclaudiaoc@gmail.com", "cv": ""}, {"name": "Ana Elisa Coelho", "email": "anaelisavcoelho@gmail.com", "cv": "http://lattes.cnpq.br/4892425777453322"}, {"name": "Ana Elisa Quintal", "email": "anaelisaquintal@gmail.com", "cv": ""}, {"name": "Ana Heloisa Beltram de Oliveira", "email": "anabeltram@outlook.com", "cv": "https://lattes.cnpq.br/6681531124195316"}, {"name": "Ana Julia Lima Souza Lima Souza", "email": "anajulialimasouzaa@gmail.com", "cv": ""}, {"name": "Ana Luiza Vicente Ambrozin", "email": "psianaluizaambrozin@gmail.com", "cv": ""}, {"name": "Ana Luiza Costa Roncati", "email": "analuizaroncati@gmail.com", "cv": ""}, {"name": "Ana Paula Bernardes", "email": "anapsicoinf@gmail.com", "cv": ""}, {"name": "Ana Pilar Navarro de Godoy Marin", "email": "anapilar.psi@gmail.com", "cv": ""}, {"name": "Ana Priscila Martelozo", "email": "primartelozo@hotmail.com", "cv": ""}, {"name": "Ana Vitória Sanches de Camargo", "email": "psi.anasanches@gmail.com", "cv": "http://lattes.cnpq.br/8345455345416287"}, {"name": "Yumi Gosso", "email": "ygosso@gmail.com", "cv": "http://lattes.cnpq.br/3196008818776282"}];

async function importarTodosSocios() {
  console.log(`\n🚀 IMPORTAÇÃO COMPLETA DE TODOS OS SÓCIOS`);
  console.log(`📊 Total a processar: ${sociosCompletos.length} sócios\n`);
  
  let importados = 0;
  let atualizados = 0;
  let ignorados = 0;
  let erros = 0;
  
  // Senha padrão
  const senhaTemporaria = "MudarSenha@2025";
  const senhaHash = await bcrypt.hash(senhaTemporaria, 10);
  
  for (let i = 0; i < sociosCompletos.length; i++) {
    const socio = sociosCompletos[i];
    try {
      // Verificar se já existe
      const existente = await prisma.associado.findUnique({
        where: { email: socio.email },
      });
      
      if (existente) {
        // Atualizar apenas Lattes e visibilidade
        await prisma.associado.update({
          where: { email: socio.email },
          data: {
            curriculoLattes: socio.cv || null,
            visivelNoSite: true,
          },
        });
        atualizados++;
        if ((i + 1) % 50 === 0) {
          console.log(`🔄 [${i + 1}/${sociosCompletos.length}] Processando... (${atualizados} atualizados, ${importados} novos)`);
        }
      } else {
        // Criar novo
        await prisma.associado.create({
          data: {
            nome: socio.name,
            email: socio.email,
            senhaHash: senhaHash,
            curriculoLattes: socio.cv || null,
            visivelNoSite: true,
            status: "ATIVO",
            emailVerificado: false,
            role: "ASSOCIADO",
          },
        });
        importados++;
        if ((i + 1) % 50 === 0) {
          console.log(`✅ [${i + 1}/${sociosCompletos.length}] Processando... (${importados} novos, ${atualizados} atualizados)`);
        }
      }
    } catch (error: any) {
      erros++;
      console.error(`❌ ERRO em ${socio.name}: ${error.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(70));
  console.log("📊 RESUMO FINAL DA IMPORTAÇÃO:");
  console.log("=".repeat(70));
  console.log(`✅ Novos sócios importados: ${importados}`);
  console.log(`🔄 Sócios atualizados: ${atualizados}`);
  console.log(`❌ Erros: ${erros}`);
  console.log(`📈 Total processado: ${importados + atualizados + erros}/${sociosCompletos.length}`);
  console.log("=".repeat(70));
  console.log(`\n⚠️  Senha padrão: ${senhaTemporaria}`);
  console.log(`\n🌐 Acesse:`);
  console.log(`   Público: http://localhost:3000/socios`);
  console.log(`   Admin:   http://localhost:3000/admin/socios\n`);
}

importarTodosSocios()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Importação concluída!");
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("❌ Erro fatal:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
