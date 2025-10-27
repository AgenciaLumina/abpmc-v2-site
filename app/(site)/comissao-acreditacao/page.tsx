import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Comissão de Acreditação | ABPMC",
  description: "Informações atualizadas sobre o processo de acreditação e orientações aos associados da ABPMC.",
};

export default function ComissaoAcreditacaoPage() {
  return (
    <>
      <HeaderInterno titulo="Comissão de Acreditação" />
      <main className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Coluna Imagem */}
          <div className="w-full md:w-1/4">
            <img
              src="https://dev.agencialumina.com.br/abpmc_dev/wp-content/uploads/2025/10/acreditacao_abpmc.png"
              alt="Comissão de Acreditação ABPMC"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          {/* Coluna Texto */}
          <div className="w-full md:w-3/4 text-[#333] leading-relaxed space-y-5">
            <p>
              Os atuais membros da Comissão de Acreditação comunicam que todos pedidos de acreditação que foram submetidos plenamente, bem como os recursos requeridos, foram analisados e os solicitantes foram informados sobre o parecer.
            </p>
            <p>
              A comissão está recebendo novos pedidos de acreditação desde dezembro de 2022. Além disso, deixamos todos saberem que pretendemos disponibilizar muito em breve ações de divulgação do propósito da acreditação, sobre o processo de solicitação e gerar ocasiões para esclarecer possíveis dúvidas da comunidade.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-14 text-[#333]">
          <h2 className="text-2xl font-semibold text-[#0B2E47] mb-4">Lembramos:</h2>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              Quem já iniciou envio de documentos pelo site e não finalizou todas etapas do processo de pedido de análise comprobatória para acreditação, se entender pertinente, pode assim concluir e submeter, havendo necessidade de pagamento da taxa de análise.
            </li>
            <li>
              Quem entende que já concluiu solicitação e ainda não recebeu retorno, pedimos que entre em contato conosco pelo formulário em{" "}
              <a
                href="https://abpmc.org.br/contato"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2b4e6d] hover:text-[#22949e] font-medium transition-colors"
              >
                https://abpmc.org.br/contato
              </a>
              .
            </li>
            <li>
              Antes de concluírem o pedido de análise de acreditação, pedimos atenção para leitura cuidadosa do artigo 23 do regulamento (
              <a
                href="https://abpmc.org.br/comissoes-acreditacao/regulamento/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2b4e6d] hover:text-[#22949e] font-medium transition-colors"
              >
                ver regulamento
              </a>
              ). Sugerimos que chequem se concluiu envio de documentos para todos os incisos descritos neste artigo.
            </li>
            <li>
              Dúvidas relativas à certificação envolvendo a temática do atendimento ao Autismo/TEA são de responsabilidade da Comissão de Desenvolvimento Atípico, devendo as dúvidas serem dirigidas para o contato:{" "}
              <a
                href="mailto:abpmc_tea@abpmc.org.br"
                className="text-[#2b4e6d] hover:text-[#22949e] font-medium transition-colors"
              >
                abpmc_tea@abpmc.org.br
              </a>
              .
            </li>
          </ol>

          <div className="bg-[#F7F9FB] border border-gray-200 rounded-lg mt-10 p-6 text-center">
            <p className="text-lg font-semibold text-[#0B2E47]">
              Faça seu <span className="text-[#22949e]">LOGIN</span> e procure a opção{" "}
              <span className="text-[#22949e]">ACREDITAÇÃO</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
