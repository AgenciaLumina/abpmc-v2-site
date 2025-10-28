'use client'

type Props = {
  onCTAClick: () => void
}

export default function ClosingCTA({ onCTAClick }: Props) {
  return (
    <>
      {/* Desktop/Tablet CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0B2E47] via-[#154A6F] to-[#0B2E47]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para fazer parte da ABPMC?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Junte-se à maior comunidade de profissionais e estudantes de Análise do Comportamento do Brasil
          </p>
          
          <button
            onClick={onCTAClick}
            className="bg-[#01C2CE] hover:bg-white text-white hover:text-[#0B2E47] font-bold text-lg px-12 py-5 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 inline-flex items-center"
          >
            Associar agora
            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="mt-6 text-sm text-gray-300">
            ✓ Sem taxa de adesão &nbsp; • &nbsp; ✓ Ativação imediata &nbsp; • &nbsp; ✓ Pagamento seguro
          </p>
        </div>
      </section>

      {/* Mobile Fixed Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-gray-200 shadow-2xl z-50">
        <button
          onClick={onCTAClick}
          className="w-full bg-[#01C2CE] hover:bg-[#0B2E47] text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center"
        >
          Associar agora
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <p className="text-xs text-center text-gray-500 mt-2">
          Ativação imediata após pagamento
        </p>
      </div>
    </>
  )
}
