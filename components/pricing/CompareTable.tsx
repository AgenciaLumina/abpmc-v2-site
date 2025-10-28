'use client'

import type { Plan } from './PlanCard'

type Props = {
  plans: Plan[]
  onSelectPlan: (planId: string) => void
}

const features = [
  'Acesso ao portal exclusivo',
  'Desconto em eventos',
  'Certificado de associado',
  'Revista RBTCC',
  'Boletim Contexto',
  'Networking profissional',
  'Área de membros',
  'Desconto em publicações',
  'Participação em comissões',
  'Votação em assembleias',
]

export default function CompareTable({ plans, onSelectPlan }: Props) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#0B2E47] text-center mb-12">
          Compare os planos
        </h2>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-[#0B2E47] to-[#154A6F]">
                <th className="py-6 px-6 text-left font-semibold text-[#01C2CE]">
                  Benefícios
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} className="py-6 px-6 text-center">
                    <div className="font-semibold mb-2 text-[#01C2CE]">{plan.titulo}</div>
                    <div className="text-sm font-normal text-white/90">R$ {plan.precoAnual}/ano</div>
                    <button
                      onClick={() => onSelectPlan(plan.id)}
                      className="mt-3 bg-white text-[#0B2E47] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#01C2CE] hover:text-white transition-colors"
                    >
                      Escolher
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-4 px-6 font-medium text-gray-700">{feature}</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-6 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td className="py-6 px-6"></td>
                {plans.map((plan) => (
                  <td key={plan.id} className="py-6 px-6 text-center">
                    <button
                      onClick={() => onSelectPlan(plan.id)}
                      className="bg-[#01C2CE] hover:bg-[#0B2E47] text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                    >
                      Escolher {plan.titulo}
                    </button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#0B2E47] mb-2">{plan.titulo}</h3>
              <div className="text-2xl font-bold text-[#0099CC] mb-4">
                R$ {plan.precoAnual}<span className="text-sm text-gray-500">/ano</span>
              </div>
              <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(plan.id)}
                className="w-full bg-[#01C2CE] hover:bg-[#0B2E47] text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Escolher {plan.titulo}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
