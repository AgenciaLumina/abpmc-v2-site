import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Contato | ABPMC",
  description: "Entre em contato com a ABPMC. Tire suas dúvidas, envie sugestões ou fale conosco.",
};

export default function ContatoPage() {
  return (
    <>
      <HeaderInterno titulo="Contato" />
      <main className="bg-[#fefefe] py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 items-start">
          
          {/* COLUNA ESQUERDA: INFORMAÇÕES */}
          <div className="w-full md:w-5/12 space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-[#0B2E47] uppercase tracking-wider">
                Fale Conosco
              </h2>
              <p className="text-[#333] text-lg mt-3 leading-relaxed">
                Tem dúvidas, sugestões ou quer entrar em contato com a ABPMC? Fale conosco pelos canais abaixo.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xl font-medium text-[#0B2E47]">Telefone</p>
                <p className="text-[#444]">+1 001 234 5678</p>
                <p className="text-[#777]">Atendimento de segunda a sexta, das 9h às 19h</p>
              </div>

              <div>
                <p className="text-xl font-medium text-[#0B2E47]">Endereço</p>
                <p className="text-[#444]">
                  990 Madison Ave, Midtown Manhattan, 2º andar, NY 10022
                </p>
              </div>

              <div>
                <p className="text-xl font-medium text-[#0B2E47]">E-mail</p>
                <p className="text-[#444]">info@dream-theme.com</p>
                <p className="text-[#777]">Envie sua mensagem a qualquer momento</p>
              </div>

              <div>
                <p className="text-xl font-medium text-[#0B2E47]">Recursos Humanos</p>
                <p className="text-[#444]">hr@dream-theme.com</p>
                <p className="text-[#777]">Envie seu currículo e faça parte do nosso time</p>
              </div>

              {/* Redes Sociais */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E5EEFF] hover:bg-[#0B2E47] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-[#0B2E47] hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E5EEFF] hover:bg-[#0B2E47] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-[#0B2E47] hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E5EEFF] hover:bg-[#0B2E47] transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-[#0B2E47] hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E5EEFF] hover:bg-[#0B2E47] transition-colors duration-300"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5 text-[#0B2E47] hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: FORMULÁRIO */}
          <div className="w-full md:w-7/12 bg-white shadow-lg rounded-2xl border border-gray-200 p-10">
            <h3 className="text-2xl font-semibold text-[#0B2E47] mb-3">
              Envie sua mensagem
            </h3>
            <p className="text-[#555] mb-8">
              Preencha o formulário abaixo e entraremos em contato o mais breve possível.
            </p>

            <form action="#" method="post" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                required
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B2E47] focus:border-[#0B2E47] outline-none transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B2E47] focus:border-[#0B2E47] outline-none transition-all"
              />
              <input
                type="text"
                name="orcamento"
                placeholder="Orçamento"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B2E47] focus:border-[#0B2E47] outline-none transition-all"
              />
              <input
                type="text"
                name="prazo"
                placeholder="Prazo"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B2E47] focus:border-[#0B2E47] outline-none transition-all"
              />
              <textarea
                name="mensagem"
                placeholder="Mensagem"
                rows={6}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#0B2E47] focus:border-[#0B2E47] outline-none md:col-span-2 transition-all"
              />
              <button
                type="submit"
                className="bg-[#0B2E47] hover:bg-[#22949e] text-white font-medium py-3 rounded-lg md:col-span-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
