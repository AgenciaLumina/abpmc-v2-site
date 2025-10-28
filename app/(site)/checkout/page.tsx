'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    categoria: 'estudante',
    metodoPagamento: 'cartao'
  })
  const [loadingCep, setLoadingCep] = useState(false)
  const [cepError, setCepError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '')
    
    if (cepLimpo.length !== 8) {
      setCepError('CEP deve ter 8 dígitos')
      return
    }

    setLoadingCep(true)
    setCepError('')

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await response.json()

      if (data.erro) {
        setCepError('CEP não encontrado')
        setLoadingCep(false)
        return
      }

      setFormData(prev => ({
        ...prev,
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        complemento: data.complemento || prev.complemento
      }))

      setCepError('')
    } catch (error) {
      setCepError('Erro ao buscar CEP')
    } finally {
      setLoadingCep(false)
    }
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
    setFormData(prev => ({ ...prev, cep: valor }))

    const cepLimpo = valor.replace(/\D/g, '')
    if (cepLimpo.length === 8) {
      buscarCep(cepLimpo)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dados do checkout:', formData)
    // Aqui você implementaria a integração com o gateway de pagamento
  }

  const precos = {
    estudante: 150.00,
    profissional: 350.00,
    senior: 500.00,
    institucional: 1200.00
  }

  return (
    <div className="min-h-screen bg-[#1f2937] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20">
        <div className="mb-8">
          <Link href="/anuidades" className="text-[#0099CC] hover:text-[#01C2CE] text-sm">
            ← Voltar para Anuidades
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">Checkout - Associação ABPMC</h1>
          <p className="text-[#0099CC] mt-2">Complete seus dados para finalizar a associação</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {/* Dados Pessoais */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0B2E47] mb-6 border-b pb-3">
                  Dados Pessoais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPF *
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      required
                      value={formData.cpf}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="000.000.000-00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria de Associação *
                    </label>
                    <select
                      name="categoria"
                      required
                      value={formData.categoria}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                    >
                      <option value="estudante">Estudante - R$ 150,00</option>
                      <option value="profissional">Profissional - R$ 350,00</option>
                      <option value="senior">Sênior - R$ 500,00</option>
                      <option value="institucional">Institucional - R$ 1.200,00</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0B2E47] mb-6 border-b pb-3">
                  Endereço
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CEP * {loadingCep && <span className="text-[#01C2CE] text-xs ml-2">🔄 Buscando...</span>}
                    </label>
                    <input
                      type="text"
                      name="cep"
                      required
                      value={formData.cep}
                      onChange={handleCepChange}
                      maxLength={9}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition ${
                        cepError ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="00000-000"
                    />
                    {cepError && <p className="text-red-500 text-xs mt-1">{cepError}</p>}
                    {!cepError && !loadingCep && formData.cep.replace(/\D/g, '').length === 8 && (
                      <p className="text-green-600 text-xs mt-1">✓ Endereço preenchido automaticamente</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço *
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      required
                      value={formData.endereco}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="Rua, Avenida..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número *
                    </label>
                    <input
                      type="text"
                      name="numero"
                      required
                      value={formData.numero}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complemento
                    </label>
                    <input
                      type="text"
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="Apto, Sala..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      name="bairro"
                      required
                      value={formData.bairro}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="Centro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      required
                      value={formData.cidade}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                      placeholder="São Paulo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      name="estado"
                      required
                      value={formData.estado}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#01C2CE] focus:border-transparent outline-none transition"
                    >
                      <option value="">Selecione</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pagamento */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0B2E47] mb-6 border-b pb-3">
                  Pagamento
                </h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#01C2CE] transition">
                    <input
                      type="radio"
                      name="metodoPagamento"
                      value="cartao"
                      checked={formData.metodoPagamento === 'cartao'}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#01C2CE] focus:ring-[#01C2CE]"
                    />
                    <div className="ml-4">
                      <span className="text-lg font-medium text-gray-900">Cartão de Crédito</span>
                      <p className="text-sm text-gray-500">Pagamento em até 12x</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#01C2CE] transition">
                    <input
                      type="radio"
                      name="metodoPagamento"
                      value="boleto"
                      checked={formData.metodoPagamento === 'boleto'}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#01C2CE] focus:ring-[#01C2CE]"
                    />
                    <div className="ml-4">
                      <span className="text-lg font-medium text-gray-900">Boleto Bancário</span>
                      <p className="text-sm text-gray-500">À vista com desconto de 5%</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#01C2CE] transition">
                    <input
                      type="radio"
                      name="metodoPagamento"
                      value="pix"
                      checked={formData.metodoPagamento === 'pix'}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#01C2CE] focus:ring-[#01C2CE]"
                    />
                    <div className="ml-4">
                      <span className="text-lg font-medium text-gray-900">PIX</span>
                      <p className="text-sm text-gray-500">Pagamento instantâneo</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#01C2CE] hover:bg-[#0B2E47] text-white font-semibold py-4 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Finalizar Associação
              </button>
            </form>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-[#0B2E47] mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#0099CC]">Categoria:</span>
                  <span className="font-medium text-gray-900 capitalize">{formData.categoria}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#0099CC]">Valor:</span>
                  <span className="font-medium text-gray-900">
                    R$ {precos[formData.categoria as keyof typeof precos].toFixed(2)}
                  </span>
                </div>

                {formData.metodoPagamento === 'boleto' && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <span>Desconto (5%):</span>
                      <span>- R$ {(precos[formData.categoria as keyof typeof precos] * 0.05).toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-[#0B2E47]">
                  <span>Total:</span>
                  <span>
                    R$ {(formData.metodoPagamento === 'boleto' 
                      ? precos[formData.categoria as keyof typeof precos] * 0.95 
                      : precos[formData.categoria as keyof typeof precos]
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-[#0B2E47] mb-2">Benefícios da Associação</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#01C2CE] mr-2">✓</span>
                    <span>Acesso a todos os eventos ABPMC</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#01C2CE] mr-2">✓</span>
                    <span>Descontos em publicações</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#01C2CE] mr-2">✓</span>
                    <span>Certificado de associado</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#01C2CE] mr-2">✓</span>
                    <span>Networking com profissionais</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>🔒 Pagamento 100% seguro</p>
                <p className="mt-1">Seus dados estão protegidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
