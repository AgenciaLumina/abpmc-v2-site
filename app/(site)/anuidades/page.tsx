import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Anuidades | ABPMC",
  description: "Tabela de anuidades e categorias de associação da ABPMC para o ano de 2025.",
};

const anuidades = [
  {
    categoria: "Estudante de Graduação (Cotas/PROUNI/FIES) – Anuidade 2025",
    periodo: "16/06/2025 e 31/12/2025",
    valor: "R$ 165,00",
  },
  {
    categoria: "Estudante de Graduação (Cotas/PROUNI/FIES) e sócio SBP ou ACBS (capítulo Brasil)",
    periodo: "16/06/2025 e 31/12/2025",
    valor: "R$ 82,50",
  },
  {
    categoria: "Estudante de Graduação e também sócio SBP ou ACBS (capítulo Brasil)",
    periodo: "16/06/2025 e 31/12/2025",
    valor: "R$ 100,00",
  },
  {
    categoria: "Estudante de Pós Graduação e/ou Recém Formado (até 2 anos)",
    periodo: "16/06/2025 e 31/12/2025",
    valor: "R$ 285,00",
  },
  {
    categoria: "Estudante de Pós Graduação e/ou Recém Formado (até 2 anos) e sócio SBP ou ACBS (capítulo Brasil)",
    periodo: "16/06/2025 e 31/12/2025",
    valor: "R$ 142,00",
  },
  {
    categoria: "Profissional – Anuidade 2025",
    periodo: "16/06/2025 e 31/12/2025",
    valor: "R$ 410,00",
  },
  {
    categoria: "Profissional Benfeitor – Anuidade 2025",
    periodo: "16/06/2025 e 31/12/2025",
    valor: "R$ 875,00",
  },
  {
    categoria: "Profissional e também sócio SBP ou ACBS (capítulo Brasil)",
    periodo: "16/06/2025 e 31/12/2025",
    valor: "R$ 205,00",
  },
];

export default function AnuidadesPage() {
  return (
    <>
      <HeaderInterno titulo="Anuidades" />
      <main className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Introdução */}
          <p className="text-lg text-[#535353] mb-10 leading-relaxed">
            Para associar-se, acesse seu portal do usuário clicando em <strong>"Login"</strong> no menu acima.
            <br />
            <strong>Não há reembolso de valor de anuidade.</strong>
          </p>

          {/* Tabela Desktop */}
          <div className="hidden md:block">
            {/* Cabeçalho */}
            <div className="grid grid-cols-3 bg-[#3A4E6A] text-white font-semibold py-4 px-6 rounded-t-lg">
              <div className="text-left">Categoria do Associado</div>
              <div className="text-center">Anuidade Paga Entre</div>
              <div className="text-right">Valor</div>
            </div>

            {/* Linhas Alternadas */}
            <div className="border border-gray-300 divide-y divide-gray-200">
              {anuidades.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 py-4 px-6 ${
                    index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"
                  } ${index === anuidades.length - 1 ? "rounded-b-lg" : ""}`}
                >
                  <div className="text-left">{item.categoria}</div>
                  <div className="text-center">{item.periodo}</div>
                  <div className="text-right font-semibold">{item.valor}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela Mobile */}
          <div className="md:hidden space-y-4">
            {anuidades.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-3">
                  <div className="text-xs font-semibold text-[#3A4E6A] uppercase mb-1">
                    Categoria
                  </div>
                  <div className="text-[15px] text-[#535353]">{item.categoria}</div>
                </div>
                <div className="mb-3">
                  <div className="text-xs font-semibold text-[#3A4E6A] uppercase mb-1">
                    Período
                  </div>
                  <div className="text-[15px] text-[#535353]">{item.periodo}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#3A4E6A] uppercase mb-1">
                    Valor
                  </div>
                  <div className="text-[16px] font-bold text-[#535353]">{item.valor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
