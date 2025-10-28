'use client'

import { useState } from 'react'
import type { Metadata } from "next"
import { useRouter } from 'next/navigation'
import PricingTabs, { type PersonaType } from '@/components/pricing/PricingTabs'
import PlanCard, { type Plan } from '@/components/pricing/PlanCard'
import BenefitsStrip from '@/components/pricing/BenefitsStrip'
import Faq from '@/components/pricing/Faq'
import ClosingCTA from '@/components/pricing/ClosingCTA'

// Dados dos planos
const allPlans: Plan[] = [
  {
    id: 'estudante-grad',
    titulo: 'Estudante Graduação',
    subtitulo: 'Para estudantes de graduação',
    precoAnual: 165,
    precoParcelado: 13.75,
    destaque: false,
    beneficios: [
      'Acesso ao portal exclusivo',
      'Desconto de 50% em eventos',
      'Certificado de associado',
      'Acesso à Revista RBTCC',
      'Boletim Contexto mensal',
      'Networking com profissionais'
    ],
    publicoAlvo: 'estudante'
  },
  {
    id: 'estudante-pos',
    titulo: 'Estudante Pós-Graduação',
    subtitulo: 'Para pós-graduandos e recém-formados',
    precoAnual: 285,
    precoParcelado: 23.75,
    destaque: true,
    beneficios: [
      'Todos os benefícios do plano anterior',
      'Participação em comissões',
      'Desconto adicional em publicações',
      'Acesso prioritário a eventos',
      'Mentoria profissional',
      'Certificações especiais'
    ],
    publicoAlvo: 'estudante'
  },
  {
    id: 'profissional',
    titulo: 'Profissional',
    subtitulo: 'Para profissionais atuantes',
    precoAnual: 410,
    precoParcelado: 34.17,
    destaque: true,
    beneficios: [
      'Acesso completo ao portal',
      'Desconto em todos os eventos',
      'Votação em assembleias',
      'Participação em comissões',
      'Certificações profissionais',
      'Área exclusiva de membros',
      'Networking premium',
      'Publicações com desconto'
    ],
    publicoAlvo: 'profissional'
  },
  {
    id: 'profissional-benfeitor',
    titulo: 'Profissional Benfeitor',
    subtitulo: 'Apoie a ABPMC com benefícios extras',
    precoAnual: 875,
    precoParcelado: 72.92,
    economia: 200,
    destaque: false,
    beneficios: [
      'Todos os benefícios do plano Profissional',
      'Reconhecimento especial em eventos',
      'Acesso antecipado a conteúdos',
      'Consultoria personalizada',
      'Participação em grupos exclusivos',
      'Certificado de Benfeitor'
    ],
    publicoAlvo: 'profissional'
  },
  {
    id: 'institucional',
    titulo: 'Pessoa Jurídica',
    subtitulo: 'Para instituições de ensino e clínicas',
    precoAnual: 1200,
    precoParcelado: 100,
    economia: 500,
    destaque: true,
    beneficios: [
      'Até 5 credenciais de acesso',
      'Logo da instituição no site ABPMC',
      'Desconto corporativo em eventos',
      'Participação em comissões',
      'Divulgação de vagas',
      'Parcerias institucionais',
      'Certificado institucional',
      'Relatórios personalizados'
    ],
    publicoAlvo: 'instituicao'
  }
]

export default function AnuidadesPage() {
  const router = useRouter()
  const [activePersona, setActivePersona] = useState<PersonaType>('profissional')
  
  const filteredPlans = allPlans.filter(plan => plan.publicoAlvo === activePersona)

  const handleSelectPlan = (planId: string) => {
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        items: [{ item_id: planId }]
      })
    }
    router.push(`/checkout?plan=${planId}`)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B2E47] via-[#154A6F] to-[#0B2E47] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Associe-se hoje e desbloqueie
            <span className="block text-[#01C2CE]">benefícios exclusivos</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Planos para profissionais, estudantes e instituições com acesso imediato a conteúdo, eventos e rede de especialistas
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-[#01C2CE] mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sem taxa de adesão</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-[#01C2CE] mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Ativação imediata</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-[#01C2CE] mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cancelamento flexível</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <PricingTabs 
            activePersona={activePersona}
            onPersonaChange={setActivePersona}
          />

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsStrip />

      {/* FAQ */}
      <Faq />

      {/* Closing CTA */}
      <ClosingCTA onCTAClick={() => handleSelectPlan(filteredPlans.find(p => p.destaque)?.id || filteredPlans[0].id)} />
    </main>
  )
}
