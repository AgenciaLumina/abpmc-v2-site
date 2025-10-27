export const metadata = {
  title: "Comissão de Ensino | ABPMC",
  description: "Informações sobre a Comissão de Ensino da ABPMC, suas funções e atividades na promoção da Análise do Comportamento.",
};

export default function ComissaoEnsinoPage() {
  return (
    <>
      {/* HERO PADRÃO INTERNAS */}
      <div
        className="relative w-full pt-[70px]"
        style={{
          backgroundImage: "url('/images_estrutura/header_internas.jpg'), linear-gradient(180deg, #0F3142 0%, #102A38 100%)",
          backgroundSize: "cover",
          backgroundPosition: "top right",
          backgroundColor: "#0F3142",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 100%)",
          }}
        />
        <div className="relative z-10 text-center px-6 py-20 md:py-28">
          <h1 className="text-[50px] font-bold text-white font-outfit leading-tight">
            Comissão de Ensino
          </h1>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-[#333] space-y-6 leading-relaxed">
          <p>
            A <strong>Comissão de Ensino</strong> da ABPMC é responsável por propor, desenvolver e avaliar diretrizes relacionadas à formação em Análise do Comportamento no Brasil, promovendo o diálogo entre instituições de ensino, docentes e profissionais da área.
          </p>

          <p>
            Suas atividades incluem a criação de parâmetros de qualidade para cursos de graduação e pós-graduação, incentivo à formação continuada, análise de metodologias de ensino e desenvolvimento de instrumentos de apoio pedagógico.
          </p>

          <p>
            A comissão também tem como papel acompanhar o panorama nacional da formação de novos analistas do comportamento, promovendo eventos, publicações e discussões que contribuam para o fortalecimento da área.
          </p>

          <p>
            O trabalho é realizado de forma colaborativa, buscando a integração entre ensino, pesquisa e prática profissional, de modo a garantir que o ensino da Análise do Comportamento no país se mantenha atualizado, ético e cientificamente fundamentado.
          </p>

          <p>
            Para contato com a Comissão de Ensino, envie um e-mail para:{" "}
            <a 
              href="mailto:ensino@abpmc.org.br" 
              className="text-[#2b4e6d] hover:text-[#22949e] font-medium transition"
            >
              ensino@abpmc.org.br
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
