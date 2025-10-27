import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// DADOS COMPLETOS EXTRAÍDOS DO HTML DO SITE
const sociosCompletos = [{"name": "Adriana Lourenço Lopes", "email": "adrianalourencolopes@gmail.com", "cv": "http://lattes.cnpq.br/9686139344430086"}, {"name": "Adriana Grando", "email": "adrgrando@gmail.com", "cv": "http://lattes.cnpq.br/6655526661447047"}, {"name": "Adriana de Fátima Fontes", "email": "adrianafontes.psico@gmail.com", "cv": ""}, {"name": "Adriane Gomes Queiroz", "email": "adriane.queiroz.g@gmail.com", "cv": ""}, {"name": "Adriano Rodrigues Dos Santos", "email": "adrianorodrigues6@hotmail.com", "cv": ""}, {"name": "Adrieli Gonçalves Dos Santos", "email": "agsantos01@outlook.com", "cv": ""}, {"name": "Alan Souza Aranha", "email": "alansaranha@gmail.com", "cv": "http://lattes.cnpq.br/3642620826614727"}, {"name": "Alana Dos Anjos Moreira", "email": "alanamoreirapsi@gmail.com", "cv": ""}, {"name": "Alceu Martins Filho", "email": "alceu.ms@gmail.com", "cv": "http://lattes.cnpq.br/9935669683108405"}, {"name": "Alcione Sá", "email": "alcioneferreira.psi@gmail.com", "cv": "http://lattes.cnpq.br/2039235133640472"}, {"name": "Aldeíne Martins", "email": "psi.deinymartins@gmail.com", "cv": ""}, {"name": "Alessandra Avanzi", "email": "aleavanzi7@gmail.com", "cv": ""}, {"name": "Alessandra Pimenta de Souza", "email": "alepossani@icloud.com", "cv": ""}, {"name": "Alessandra Honorato Benfica Franco", "email": "alessandra.fls.pdg@gmail.com", "cv": "https://lattes.cnpq.br/4264580994487086"}, {"name": "Alessandra Bizeli Oliveira Sartori", "email": "alessandra.sabiamente@gmail.com", "cv": ""}, {"name": "Alexandra Cristina Souza Gomes de Paula", "email": "psicologiale@hotmail.com", "cv": ""}, {"name": "Alexandre Xavier", "email": "alexavier_s@hotmail.com", "cv": ""}, {"name": "Alexandre Aguiar Victuri", "email": "alevicturi@gmail.com", "cv": "https://lattes.cnpq.br/3410876309159688"}, {"name": "Alexia Oshiro", "email": "alexiapsico98@gmail.com", "cv": ""}, {"name": "Alice Maciel Ferreira Monteiro", "email": "alicef40@gmail.com", "cv": ""}, {"name": "Aline Baldo", "email": "aline_baldo@hotmail.com", "cv": "https://lattes.cnpq.br/1643546172897643"}, {"name": "Aline Kabbaz", "email": "aline.bfkabbaz@gmail.com", "cv": "https://lattes.cnpq.br/1547309656020640"}, {"name": "Aline da Silva Rodrigues Marques", "email": "psi.alinesrodrigues@gmail.com", "cv": "http://lattes.cnpq.br/7005398011532677"}, {"name": "Aline Banganha Prato", "email": "alineprato@hotmail.com", "cv": ""}, {"name": "Aline França", "email": "psicologaalinefranca@gmail.com", "cv": ""}, {"name": "Aline Daniela Gomes da Silva Vieira", "email": "ad.vieira@usp.br", "cv": "http://lattes.cnpq.br/2556824378856957"}, {"name": "Amanda de Melo", "email": "amandav.meloo@gmail.com", "cv": "http://lattes.cnpq.br/2161469271053940"}, {"name": "Amanda Raña Ferreira", "email": "amanda.rana@gmail.com", "cv": ""}, {"name": "Amanda Oliveira de Morais de Morais", "email": "amandaomorais@gmail.com", "cv": "http://lattes.cnpq.br/2915880924460589"}, {"name": "Amilcar Rodrigues Fonseca Júnior", "email": "ajrpsico@yahoo.com.br", "cv": "http://lattes.cnpq.br/4367734116952280"}, {"name": "Amona Lima", "email": "amona_priscila@yahoo.com.br", "cv": "http://lattes.cnpq.br/0614921738135666"}, {"name": "Ana Perriello", "email": "espacosensi@gmail.com", "cv": ""}, {"name": "Ana Karina Leme Arantes", "email": "ana.arantes@gmail.com", "cv": "http://lattes.cnpq.br/1785475312488456"}, {"name": "Ana Alice Reis Pieretti", "email": "anaalicereisp@gmail.com", "cv": ""}, {"name": "Ana Beatriz Tolentino da Silva", "email": "anasi@ufcspa.edu.br", "cv": ""}, {"name": "Ana Beatriz de Deus", "email": "abeatrizdedeus@gmail.com", "cv": "https://lattes.cnpq.br/6424014663824574"}, {"name": "Ana Beatriz Briones Mantovani", "email": "aninhabrionesm@gmail.com", "cv": ""}, {"name": "Ana Camila Marcelo", "email": "anacamilamarcelo@gmail.com", "cv": ""}, {"name": "Ana Carolina Pereira Alves", "email": "carol.alves@entremeioic.com.br", "cv": "http://lattes.cnpq.br/7330382621797345"}, {"name": "Ana Carolina Cainé Canassa", "email": "psicoaccanassa@gmail.com", "cv": "http://lattes.cnpq.br/5505210106808379"}, {"name": "Ana Cláudia de Oliveira Costa de Souza", "email": "anaclaudiaoc@gmail.com", "cv": ""}, {"name": "Ana Elisa Coelho", "email": "anaelisavcoelho@gmail.com", "cv": "http://lattes.cnpq.br/4892425777453322"}, {"name": "Ana Elisa Quintal", "email": "anaelisaquintal@gmail.com", "cv": ""}, {"name": "Ana Heloisa Beltram de Oliveira", "email": "anabeltram@outlook.com", "cv": "https://lattes.cnpq.br/6681531124195316"}, {"name": "Ana Julia Lima Souza Lima Souza", "email": "anajulialimasouzaa@gmail.com", "cv": ""}, {"name": "Ana Luiza Vicente Ambrozin", "email": "psianaluizaambrozin@gmail.com", "cv": ""}, {"name": "Ana Luiza Costa Roncati", "email": "analuizaroncati@gmail.com", "cv": ""}, {"name": "Ana Paula Bernardes", "email": "anapsicoinf@gmail.com", "cv": ""}, {"name": "Ana Pilar Navarro de Godoy Marin", "email": "anapilar.psi@gmail.com", "cv": ""}, {"name": "Ana Priscila Martelozo", "email": "primartelozo@hotmail.com", "cv": ""}, {"name": "Ana Vitória Sanches de Camargo", "email": "psi.anasanches@gmail.com", "cv": "http://lattes.cnpq.br/8345455345416287"}, {"name": "Andeson Rocha", "email": "andeson.rocha@hotmail.com", "cv": "http://lattes.cnpq.br/8138926840872752"}, {"name": "André Bravin", "email": "bravin@ufj.edu.br", "cv": "http://lattes.cnpq.br/3682922127156042"}, {"name": "Andrea de Carvalho Pinto Ribela Naito", "email": "andrearibela@gmail.com", "cv": ""}, {"name": "Andréa Rodrigues Viana", "email": "aviana.psi@gmail.com", "cv": "http://lattes.cnpq.br/0980720537926761"}, {"name": "Andreia Rafael", "email": "andreiarafaelpsi@gmail.com", "cv": "http://lattes.cnpq.br/3883395732994571"}, {"name": "André Luis Soares de Andrade", "email": "andreandrade1903@gmail.com", "cv": ""}, {"name": "André Martins Santos", "email": "psi.andremartins@gmail.com", "cv": "http://lattes.cnpq.br/4711289470089846"}, {"name": "Andressa Dos Santos Moreira", "email": "psico.mordessa@gmail.com", "cv": ""}, {"name": "Andressa Secchi Silveira", "email": "andressasecchi@gmail.com", "cv": ""}, {"name": "Andress Amon Lima Mattos", "email": "a.mattos.l@hotmail.com", "cv": "http://lattes.cnpq.br/2651187394614104"}, {"name": "Ângela Souza Araújo", "email": "angelasa3184@gmail.com", "cv": ""}, {"name": "ângela Tamye Lopes Fujita", "email": "angelafujitapsicologa@gmail.com", "cv": "http://lattes.cnpq.br/9597979875226461"}, {"name": "Anis Settimi", "email": "settimisa@gmail.com", "cv": "http://lattes.cnpq.br/1538316739951601"}, {"name": "Anna Christina Porto Maia Passarelli", "email": "anna.passarelli@gmail.com", "cv": "http://lattes.cnpq.br/8108423885309162"}, {"name": "Anna Deborah Gomes Medeiros", "email": "anna.medeiros@discente.ufj.edu.br", "cv": "https://lattes.cnpq.br/0710803838404442"}, {"name": "Ariadne Ribeiro Mariotti", "email": "ariadne_mariotti@hotmail.com", "cv": "http://lattes.cnpq.br/4098372121757891"}, {"name": "Ariene Coelho Souza", "email": "arienecoelho@gmail.com", "cv": ""}, {"name": "Arlete Cristina Dantas Ruiz", "email": "cristinadantasruiz@gmail.com", "cv": ""}, {"name": "Arthur Lima", "email": "artvacilima@gmail.com", "cv": "http://lattes.cnpq.br/3723905873125407"}, {"name": "Arthur Vieira Dos Santos", "email": "arthurvieira001@outlook.com", "cv": ""}, {"name": "Arthur César Gomes Costa Silva", "email": "arthurgmcs@gmail.com", "cv": ""}, {"name": "Artur Lucchese Velozo", "email": "arturvelozo@protonmail.com", "cv": "http://lattes.cnpq.br/2306599680975333"}, {"name": "Augusto Anselmo", "email": "psi.anselmo@gmail.com", "cv": "https://lattes.cnpq.br/4208111782063652"}, {"name": "Augusto Mauricio de Almeida Junior", "email": "augustomajr@gmail.com", "cv": ""}, {"name": "Ayumi Ityanagui", "email": "ityanaguimi@gmail.com", "cv": ""}, {"name": "Barbara Nogueira Magalhães Gomes", "email": "babigmn@yahoo.com.br", "cv": "http://lattes.cnpq.br/6398498947528352"}, {"name": "Barbara Gonçalves", "email": "barbara.goncalves@edu.famerp.br", "cv": ""}, {"name": "Barbara Mesquita", "email": "barbaramesqt@gmail.com", "cv": ""}, {"name": "Barbara Moreno de Araújo", "email": "barbaramorenodearaujo@gmail.com", "cv": ""}, {"name": "Bárbara Clara da Silva", "email": "barbaraclara.s@gmail.com", "cv": "http://lattes.cnpq.br/5528292907127164"}, {"name": "Bárbara Gouveia", "email": "barbaragouveiapsi@gmail.com", "cv": "http://lattes.cnpq.br/8526533025890701"}, {"name": "Bárbara Calmeto Lomar Passos", "email": "barbaracalmeto@yahoo.com.br", "cv": ""}, {"name": "Bárbara Ruffo Tessaro", "email": "barbara.r.tessaro@gmail.com", "cv": "https://lattes.cnpq.br/7586443534359666"}, {"name": "Barbara Kolstok Monteiro", "email": "bakolstok@gmail.com", "cv": "http://lattes.cnpq.br/0747548679295067"}, {"name": "Beatriz Dombroski Benfatti Gonzalez", "email": "bia.dbgonzalez@gmail.com", "cv": "https://lattes.cnpq.br/2038358465142597"}, {"name": "Beatriz Bittar", "email": "beatrizsbittar@gmail.com", "cv": ""}, {"name": "Beatriz Soares de Souza", "email": "beatrizsoaresjk@gmail.com", "cv": ""}, {"name": "Beatriz Berenguer Portela", "email": "berenguerpsi@gmail.com", "cv": ""}, {"name": "Beatriz Rodrigues B. Monteiro", "email": "psico.bmonteiro@gmail.com", "cv": ""}, {"name": "Beatriz Zeppelini Bezerra de Menezes Nasser", "email": "bzeppelini@hotmail.com", "cv": "http://lattes.cnpq.br/2586999464945752"}, {"name": "Beatriz Canedo Lorenzetti", "email": "bcanedolorenzetti@gmail.com", "cv": "http://lattes.cnpq.br/7512418819191052"}, {"name": "Beatriz Galli", "email": "beatrizgalli.b@gmail.com", "cv": ""}, {"name": "Beatriz Lourenço Rizzato", "email": "beatrizrizzato@hotmail.com", "cv": ""}, {"name": "Beatriz de Paula", "email": "beatsoaes@gmail.com", "cv": ""}, {"name": "Beatriz Evelyn de Oliveira Grigoleto", "email": "beatrizoliveirapsicologia@outlook.com", "cv": "http://lattes.cnpq.br/0295168934203242"}, {"name": "Beatriz Licia Generoso Vieira", "email": "beatrizlgv@gmail.com", "cv": ""}, {"name": "Bianca Leão de Oliveira", "email": "biancaleao@outlook.com", "cv": "http://lattes.cnpq.br/2782855020898479"}, {"name": "Bianca Longhitano", "email": "bianca.longhitano96@gmail.com", "cv": "http://lattes.cnpq.br/5651359438200456"}, {"name": "Bianca Jeniffer Dos Santos", "email": "bianca.j.santos@unesp.br", "cv": "http://lattes.cnpq.br/5031475536602953"}, {"name": "Brenda Rodrigues Rebhahm", "email": "psibrendarr@gmail.com", "cv": "http://lattes.cnpq.br/8618519744792502"}, {"name": "Bruna Leal", "email": "brunalealpsi4@gmail.com", "cv": "http://lattes.cnpq.br/7098001906787860"}, {"name": "Bruna Dos Santos Rodrigues", "email": "brunarodrigues.psicologa@gmail.com", "cv": "http://lattes.cnpq.br/9545462387346484"}, {"name": "Bruna Mikami", "email": "brunamikamipsi@gmail.com", "cv": ""}, {"name": "Bruna Zamaro", "email": "brunazamaro@gmail.com", "cv": ""}, {"name": "Bruna Ananda Marques", "email": "brunaagmarques@gmail.com", "cv": "http://lattes.cnpq.br/5496693005018965"}, {"name": "Bruna Aparecida Jesus Santos", "email": "bruna.apjsantos@gmail.com", "cv": "https://lattes.cnpq.br/4191105931993175"}, {"name": "Bruna Bruder Diniz", "email": "psicobrunabruder@gmail.com", "cv": ""}, {"name": "Bruna Gabriele de Sena Petenon", "email": "petenonbruna@gmail.com", "cv": "https://lattes.cnpq.br/0822054437467961"}, {"name": "Brunna Oliviéri", "email": "brunna.olivieri@gmail.com", "cv": ""}, {"name": "Brunna da Silva Salles da Cruz", "email": "brunna.salles_@outlook.com", "cv": "http://lattes.cnpq.br/5313424956477277"}, {"name": "Brunno Romeu Guerra", "email": "brunnoguerra.bl@gmail.com", "cv": ""}, {"name": "Bruno Martins Pontes", "email": "brunomartinspontes@gmail.com", "cv": "http://lattes.cnpq.br/3293110175924885"}, {"name": "Bruno Teixeira", "email": "brunotpsico@gmail.com", "cv": "http://lattes.cnpq.br/4266330907011956"}, {"name": "Bruno Angelo Marconi de Lima", "email": "brunoamlima86@gmail.com", "cv": "http://lattes.cnpq.br/4243395454850761"}];

async function importarSociosCompletos() {
  console.log(`\n🚀 IMPORTAÇÃO COMPLETA - TODOS OS SÓCIOS`);
  console.log(`📊 Total a processar: ${sociosCompletos.length} sócios\n`);
  
  let importados = 0;
  let atualizados = 0;
  let erros = 0;
  
  // Senha padrão
  const senhaTemporaria = "MudarSenha@2025";
  const senhaHash = await bcrypt.hash(senhaTemporaria, 10);
  
  for (let i = 0; i < sociosCompletos.length; i++) {
    const socio = sociosCompletos[i];
    
    // Pular se não tiver email
    if (!socio.email || socio.email.trim() === "") {
      console.log(`⚠️  [${i + 1}] ${socio.name} - sem email, pulando`);
      erros++;
      continue;
    }
    
    try {
      // Verificar se já existe
      const existente = await prisma.associado.findUnique({
        where: { email: socio.email.trim() },
      });
      
      if (existente) {
        // Atualizar apenas Lattes e visibilidade
        await prisma.associado.update({
          where: { email: socio.email.trim() },
          data: {
            curriculoLattes: socio.cv && socio.cv.trim() !== "" ? socio.cv.trim() : null,
            visivelNoSite: true,
          },
        });
        atualizados++;
        if ((i + 1) % 100 === 0) {
          console.log(`🔄 [${i + 1}/${sociosCompletos.length}] Processando... (${importados} novos, ${atualizados} atualizados)`);
        }
      } else {
        // Criar novo
        await prisma.associado.create({
          data: {
            nome: socio.name.trim(),
            email: socio.email.trim(),
            senhaHash: senhaHash,
            curriculoLattes: socio.cv && socio.cv.trim() !== "" ? socio.cv.trim() : null,
            visivelNoSite: true,
            status: "ATIVO",
            emailVerificado: false,
            role: "ASSOCIADO",
          },
        });
        importados++;
        if ((i + 1) % 100 === 0) {
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

importarSociosCompletos()
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
