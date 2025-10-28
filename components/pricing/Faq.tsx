'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Quem pode se associar à ABPMC?',
    answer: 'Profissionais de Psicologia e áreas afins, estudantes de graduação e pós-graduação, além de instituições interessadas no desenvolvimento da Análise do Comportamento no Brasil.'
  },
  {
    question: 'Quais documentos são necessários?',
    answer: 'Para estudantes: comprovante de matrícula atualizado. Para profissionais: cópia do registro no conselho de classe (CRP ou similar). Para instituições: documentação legal da empresa.'
  },
  {
    question: 'Quando minha associação é ativada?',
    answer: 'Sua associação é ativada imediatamente após a confirmação do pagamento. Você receberá um e-mail com suas credenciais de acesso ao portal exclusivo em até 24 horas úteis.'
  },
  {
    question: 'Recebo nota fiscal?',
    answer: 'Sim! A nota fiscal é emitida automaticamente após a confirmação do pagamento e enviada para o e-mail cadastrado.'
  },
  {
    question: 'Como funciona a renovação?',
    answer: 'A anuidade é válida por 12 meses. Você receberá lembretes por e-mail 60, 30 e 15 dias antes do vencimento. A renovação pode ser feita diretamente no portal do associado.'
  },
  {
    question: 'Posso cancelar minha associação?',
    answer: 'Sim, você pode cancelar a qualquer momento através do portal do associado. Importante: não há reembolso proporcional do valor da anuidade conforme política da instituição.'
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartão de crédito (em até 12x), boleto bancário (à vista com 5% de desconto) e PIX (pagamento instantâneo).'
  },
  {
    question: 'Estudantes têm desconto especial?',
    answer: 'Sim! Oferecemos valores especiais para estudantes de graduação e pós-graduação. Além disso, estudantes que também são sócios SBP ou ACBS têm desconto adicional.'
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#0B2E47] text-center mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Tire suas dúvidas antes de se associar
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:border-[#01C2CE] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-[#0B2E47] pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-[#01C2CE] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Não encontrou o que procurava?
          </p>
          <a
            href="/contato"
            className="inline-flex items-center text-[#0099CC] hover:text-[#01C2CE] font-semibold transition-colors"
          >
            Entre em contato conosco
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
