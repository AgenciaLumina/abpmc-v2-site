const benefits = [
  { icon: '📚', title: 'Conteúdo Exclusivo', desc: 'Acesso a artigos, pesquisas e materiais' },
  { icon: '🎟️', title: 'Eventos com Desconto', desc: 'Descontos em encontros e congressos' },
  { icon: '🏆', title: 'Certificações', desc: 'Certificado de associado e acreditações' },
  { icon: '🤝', title: 'Rede de Especialistas', desc: 'Networking com profissionais da área' },
  { icon: '🔒', title: 'Área Restrita', desc: 'Portal exclusivo para associados' },
  { icon: '💼', title: 'Oportunidades', desc: 'Vagas e parcerias institucionais' },
]

export default function BenefitsStrip() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#0B2E47] to-[#154A6F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Por que se associar à ABPMC?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-200">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
