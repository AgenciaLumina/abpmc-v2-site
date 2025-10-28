'use client'

import Link from 'next/link'

export type Plan = {
  id: string
  titulo: string
  subtitulo: string
  precoAnual: number
  precoParcelado: number
  economia?: number
  destaque: boolean
  beneficios: string[]
  publicoAlvo: string
}

type Props = {
  plan: Plan
  onSelectPlan: (planId: string) => void
}

export default function PlanCard({ plan, onSelectPlan }: Props) {
  return (
    <div className={`
      relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl
      ${plan.destaque 
        ? 'border-[#01C2CE] shadow-xl scale-105' 
        : 'border-gray-200 hover:border-[#01C2CE]'
      }
    `}>
      {/* Badge de Destaque */}
      {plan.destaque && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#01C2CE] to-[#0099CC] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            ⭐ Mais escolhido
          </span>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#0B2E47] mb-2">
          {plan.titulo}
        </h3>
        <p className="text-sm text-gray-600">
          {plan.subtitulo}
        </p>
      </div>

      {/* Preço */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-5xl font-bold text-[#0B2E47]">
            R$ {plan.precoAnual}
          </span>
          <span className="text-gray-500">/ano</span>
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          ou 12x de <span className="font-semibold text-[#0099CC]">R$ {plan.precoParcelado}</span>
        </div>

        {plan.economia && (
          <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            Economize R$ {plan.economia} por ano
          </div>
        )}
      </div>

      {/* CTAs */}
      <div className="space-y-3 mb-8">
        <button
          onClick={() => onSelectPlan(plan.id)}
          className="w-full bg-[#01C2CE] hover:bg-[#0B2E47] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Associar agora
        </button>
        <Link
          href={`#beneficios-${plan.id}`}
          className="block w-full text-center text-[#0099CC] hover:text-[#01C2CE] font-semibold py-3 transition-colors"
        >
          Ver todos os benefícios →
        </Link>
      </div>

      {/* Benefícios */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-[#0B2E47] mb-4 flex items-center">
          <span className="mr-2">✓</span> O que está incluído:
        </h4>
        <ul className="space-y-3">
          {plan.beneficios.map((beneficio, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <svg className="w-5 h-5 text-[#01C2CE] mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {beneficio}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500 text-center">
        ⚡ Ativação imediata após confirmação do pagamento
      </div>
    </div>
  )
}
