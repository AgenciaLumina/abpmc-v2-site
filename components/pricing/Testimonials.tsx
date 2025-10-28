const testimonials = [
  {
    name: 'Dr. Carlos Silva',
    role: 'Psicólogo Clínico',
    avatar: '👨‍⚕️',
    text: 'Ser associado da ABPMC transformou minha prática profissional. O acesso a conteúdos exclusivos e o networking com outros profissionais são inestimáveis.'
  },
  {
    name: 'Maria Santos',
    role: 'Estudante de Pós-Graduação',
    avatar: '👩‍🎓',
    text: 'Como estudante, os descontos em eventos e o acesso à comunidade científica me ajudaram muito na minha formação acadêmica e profissional.'
  },
  {
    name: 'Prof. João Oliveira',
    role: 'Docente Universitário',
    avatar: '👨‍🏫',
    text: 'A ABPMC é referência nacional em Análise do Comportamento. Estar associado significa fazer parte da construção dessa ciência no Brasil.'
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#0B2E47] text-center mb-4">
          O que nossos associados dizem
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Junte-se a centenas de profissionais e estudantes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="text-5xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-bold text-[#0B2E47]">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="mt-6 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
          <div className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-sm text-gray-600 font-semibold">+40 anos de história</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-sm text-gray-600 font-semibold">+2.000 associados</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-sm text-gray-600 font-semibold">+1.000 publicações</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🎓</div>
            <p className="text-sm text-gray-600 font-semibold">+50 eventos/ano</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">Formas de pagamento aceitas:</p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">💳 Cartão de Crédito</span>
            <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">📄 Boleto</span>
            <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">🔲 PIX</span>
          </div>
        </div>
      </div>
    </section>
  )
}
