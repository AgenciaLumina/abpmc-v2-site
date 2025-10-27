import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Acreditação | ABPMC",
  description: "Informações sobre o processo de acreditação profissional da ABPMC.",
};

export default function AcreditacaoPage() {
  return (
    <>
      <HeaderInterno titulo="Acreditação" />
      <main className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#0B2E47] mb-6">
            Comissão de Acreditação
          </h2>
          <p className="text-[#444] leading-relaxed mb-8">
            A Comissão de Acreditação da ABPMC é responsável por estabelecer e manter os critérios para o reconhecimento da prática profissional de analistas do comportamento no Brasil.
            Seu objetivo é assegurar a qualidade, a ética e a competência profissional na área da Análise do Comportamento.
          </p>

          <h3 className="text-2xl font-semibold text-[#0B2E47] mb-4">
            Objetivos do Processo
          </h3>
          <ul className="list-disc ml-6 text-[#444] mb-10 space-y-2">
            <li>Certificar profissionais conforme padrões internacionais da área.</li>
            <li>Promover práticas baseadas em evidências e supervisão qualificada.</li>
            <li>Fortalecer a representatividade da ABPMC junto a órgãos de regulação e instituições acadêmicas.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-[#0B2E47] mb-4">
            Documentação e Requisitos
          </h3>
          <p className="text-[#444] mb-8">
            O processo de acreditação exige o envio de documentação comprobatória, histórico de formação, certificações e experiência prática supervisionada.
            Consulte o manual completo abaixo:
          </p>

          {/* BOX DE DOWNLOAD */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-8 mb-10 hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-[#222] mb-3">
              Manual de Acreditação Profissional
            </h4>
            <p className="text-[#555] mb-5">
              Leia o documento completo com todos os critérios e formulários necessários.
            </p>
            <a
              href="/downloads/manual-acreditacao.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#2b4e6d] hover:bg-[#22949e] text-white px-5 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
              </svg>
              Baixar Manual PDF
            </a>
          </div>

          <h3 className="text-2xl font-semibold text-[#0B2E47] mb-4">
            Contato da Comissão
          </h3>
          <p className="text-[#444] leading-relaxed">
            Para dúvidas relacionadas ao processo de acreditação, entre em contato com a comissão pelo e-mail:
            <br />
            <a
              href="mailto:acreditacao@abpmc.org.br"
              className="text-[#2b4e6d] hover:text-[#22949e] font-medium transition-colors"
            >
              acreditacao@abpmc.org.br
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
