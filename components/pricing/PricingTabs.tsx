'use client'

import { useState } from 'react'

export type PersonaType = 'profissional' | 'estudante' | 'instituicao'

type Props = {
  onPersonaChange: (persona: PersonaType) => void
  activePersona: PersonaType
}

const personas = [
  { id: 'profissional' as PersonaType, label: 'Profissional', icon: '👨‍💼' },
  { id: 'estudante' as PersonaType, label: 'Estudante', icon: '🎓' },
  { id: 'instituicao' as PersonaType, label: 'Pessoa Jurídica', icon: '🏢' },
]

export default function PricingTabs({ onPersonaChange, activePersona }: Props) {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-gray-100 rounded-xl p-1.5 shadow-sm">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onPersonaChange(persona.id)}
            className={`
              px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
              ${activePersona === persona.id
                ? 'bg-white text-[#0B2E47] shadow-md'
                : 'text-gray-600 hover:text-[#0B2E47]'
              }
            `}
          >
            <span className="mr-2">{persona.icon}</span>
            {persona.label}
          </button>
        ))}
      </div>
    </div>
  )
}
