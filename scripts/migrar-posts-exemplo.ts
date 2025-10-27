import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Posts de exemplo extraídos do site antigo
const postsExemplo = [
  {
    title: "Comportamento em foco – Submissão e diretrizes para o Volume 18 da coleção",
    slug: "comportamento-em-foco-submissao-e-diretrizes-para-o-volume-18-da-colecao",
    excerpt: "Abertas as submissões para o próximo volume da coleção Comportamento em Foco.",
    html: `
      <p>A ABPMC convida pesquisadores e profissionais da Análise do Comportamento a submeterem trabalhos para o Volume 18 da coleção Comportamento em Foco.</p>
      <p>Esta é uma excelente oportunidade para divulgar pesquisas, reflexões teóricas e relatos de experiência em Análise do Comportamento.</p>
      <h2>Diretrizes para Submissão</h2>
      <p>Os trabalhos devem seguir as normas da ABNT e estar relacionados a temas da Análise do Comportamento.</p>
    `,
    publishedAt: new Date("2025-10-20"),
    category: "publicacoes",
  },
  {
    title: "Leia a Nota Técnica ABPMC nº 01/2025: Intervenções Baseadas em ABA para TEA",
    slug: "leia-a-nota-tecnica-abpmc-no-01-2025-intervencoes-baseadas-em-aba-para-tea",
    excerpt: "ABPMC publica nota técnica sobre intervenções baseadas em ABA para pessoas com TEA.",
    html: `
      <p>A ABPMC publicou a Nota Técnica nº 01/2025 que aborda as intervenções baseadas em Análise do Comportamento Aplicada (ABA) para pessoas com Transtorno do Espectro Autista (TEA).</p>
      <p>O documento esclarece conceitos fundamentais e orienta sobre práticas baseadas em evidências.</p>
      <h2>Principais Pontos</h2>
      <ul>
        <li>Definição de ABA e suas aplicações</li>
        <li>Evidências científicas</li>
        <li>Orientações para profissionais e famílias</li>
      </ul>
    `,
    publishedAt: new Date("2025-08-18"),
    category: "institucional",
  },
  {
    title: "XXXIV Encontro da ABPMC – II Congresso de Análise do Comportamento Infantil e da Adolescência",
    slug: "xxxiv-encontro-da-abpmc-ii-congresso-de-analise-do-comportamento-infantil-e-da-adolescencia",
    excerpt: "Confira as informações sobre o próximo encontro anual da ABPMC.",
    html: `
      <p>O XXXIV Encontro da ABPMC será realizado em conjunto com o II Congresso de Análise do Comportamento Infantil e da Adolescência.</p>
      <p>Este é o maior evento de Análise do Comportamento da América Latina, reunindo pesquisadores, profissionais e estudantes.</p>
      <h2>Programação</h2>
      <p>O evento contará com palestras internacionais, simpósios, mesas redondas, minicursos e apresentações de trabalhos.</p>
      <p>Inscrições em breve através do site oficial.</p>
    `,
    publishedAt: new Date("2025-08-18"),
    category: "eventos",
  },
  {
    title: "Resultado das eleições para Diretoria Executiva e Conselho Fiscal da ABPMC para o biênio 2025-2026",
    slug: "resultado-das-eleicoes-para-diretoria-executiva-e-conselho-fiscal-da-abpmc-para-o-bienio-2025-2026",
    excerpt: "Divulgado o resultado oficial das eleições para a nova diretoria da ABPMC.",
    html: `
      <p>A ABPMC divulga o resultado oficial das eleições para a Diretoria Executiva e Conselho Fiscal para o biênio 2025-2026.</p>
      <p>A nova gestão assume com o compromisso de fortalecer a associação e promover o desenvolvimento da Análise do Comportamento no Brasil.</p>
      <h2>Nova Diretoria</h2>
      <p>A composição completa da nova diretoria está disponível na página institucional.</p>
    `,
    publishedAt: new Date("2024-10-24"),
    category: "institucional",
  },
  {
    title: "Atualizacao da lista de profissionais acreditados e acreditados honorários",
    slug: "atualizacao-da-lista-de-profissionais-acreditados-e-acreditados-honorarios",
    excerpt: "Confira a lista atualizada de profissionais acreditados pela ABPMC.",
    html: `
      <p>A ABPMC atualiza periodicamente a lista de profissionais acreditados em Análise do Comportamento.</p>
      <p>A acreditação é um selo de qualidade que reconhece a formação e experiência dos profissionais na área.</p>
    `,
    publishedAt: new Date("2024-11-04"),
    category: "comunicados",
  },
];

async function migrarPosts() {
  console.log("\n📰 MIGRAÇÃO DE POSTS DE EXEMPLO");
  console.log("=".repeat(60));
  console.log(`📊 Total a processar: ${postsExemplo.length} posts\n`);
  
  let criados = 0;
  let existentes = 0;
  let erros = 0;
  
  for (const post of postsExemplo) {
    try {
      // Verificar se já existe
      const existe = await prisma.content.findUnique({
        where: { slug: post.slug },
      });
      
      if (existe) {
        console.log(`⏭️  Post "${post.title.substring(0, 50)}..." já existe`);
        existentes++;
        continue;
      }
      
      // Buscar categoria
      const categoria = await prisma.term.findUnique({
        where: { slug: post.category },
      });
      
      if (!categoria) {
        console.error(`❌ Categoria "${post.category}" não encontrada`);
        erros++;
        continue;
      }
      
      // Criar post
      await prisma.content.create({
        data: {
          type: "POST",
          title: post.title,
          slug: post.slug,
          html: post.html,
          excerpt: post.excerpt,
          status: "publish",
          publishedAt: post.publishedAt,
          author: "ABPMC",
          terms: {
            create: {
              termId: categoria.id,
            },
          },
        },
      });
      
      console.log(`✅ Post "${post.title.substring(0, 50)}..." criado`);
      criados++;
      
    } catch (error: any) {
      erros++;
      console.error(`❌ ERRO ao criar post: ${error.message}`);
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMO DA MIGRAÇÃO:");
  console.log("=".repeat(60));
  console.log(`✅ Posts criados: ${criados}`);
  console.log(`⏭️  Já existiam: ${existentes}`);
  console.log(`❌ Erros: ${erros}`);
  console.log(`📈 Total processado: ${criados + existentes + erros}/${postsExemplo.length}`);
  console.log("=".repeat(60));
  console.log(`\n🌐 Acesse: http://localhost:3000/noticias\n`);
}

migrarPosts()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Migração concluída!");
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("❌ Erro fatal:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
