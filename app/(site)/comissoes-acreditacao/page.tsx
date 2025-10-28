import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comissão de Acreditação | ABPMC",
  description: "Saiba como enviar documentos e acompanhar seu processo de acreditação na ABPMC. Veja as orientações e regulamentos atualizados.",
};

export default function ComissaoAcreditacaoPage() {
  return (
    <>
      <HeaderInterno titulo="Comissão de Acreditação" />
      
      <main className="bg-white">
        {/* Conteúdo Principal */}
        <section className="py-20 px-6 md:px-16">
          <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
            
            <p><strong>Lembramos:</strong></p>
            
            <ol className="list-decimal list-inside space-y-4 ml-4">
              <li>
                Quem já iniciou envio de documentos pelo site e não finalizou todas as etapas do processo de pedido de análise comprobatória para acreditação, se entender pertinente, pode assim concluir e submeter, havendo necessidade de pagamento da taxa de análise.
              </li>

              <li>
                Quem entende que já concluiu solicitação e ainda não recebeu retorno, pedimos que entre em contato conosco em{" "}
                <a 
                  href="https://abpmc.org.br/contato" 
                  className="text-[#2b4e6d] underline hover:text-[#22949e] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  abpmc.org.br/contato
                </a>
                {" "}para identificar possíveis pendências.
              </li>

              <li>
                Antes de concluírem o pedido de análise de acreditação, pedimos atenção para leitura cuidadosa do artigo 23 do regulamento. O documento pode ser acessado em{" "}
                <a 
                  href="https://abpmc.org.br/comissoes-acreditacao/regulamento/" 
                  className="text-[#2b4e6d] underline hover:text-[#22949e] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  abpmc.org.br/comissoes-acreditacao/regulamento
                </a>.
              </li>

              <li>
                Dúvidas relativas à certificação envolvendo a temática do atendimento ao Autismo/TEA são de responsabilidade da Comissão de Desenvolvimento Atípico, devendo ser dirigidas para o e-mail{" "}
                <a 
                  href="mailto:abpmc_tea@abpmc.org.br" 
                  className="text-[#2b4e6d] underline hover:text-[#22949e] transition-colors"
                >
                  abpmc_tea@abpmc.org.br
                </a>.
              </li>
            </ol>

            {/* CTA para Login */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e8eef3] rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-semibold text-[#0B2E47] mb-3">
                  Solicite sua Acreditação
                </h3>
                <p className="text-[#5a6575] mb-6 max-w-2xl mx-auto">
                  Faça login na área do associado e acesse a opção "Acreditação" para iniciar ou acompanhar seu processo.
                </p>
                <Link
                  href="/auth/associado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#2b4e6d] hover:bg-[#22949e] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Acessar Área do Associado
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bloco Gradiente */}
        <section className="w-full bg-gradient-to-b from-[#0B2E47] to-[#163B56] py-[60px] text-center text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-4">Dúvidas sobre o processo?</h2>
            <p className="max-w-2xl mx-auto text-[#E8EEF3]">
              Nossa equipe está disponível para auxiliar no envio de documentos e esclarecimentos sobre o processo de acreditação.{" "}
              <a 
                href="https://abpmc.org.br/contato" 
                className="text-white underline hover:text-[#b6e6ff] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale conosco
              </a>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
