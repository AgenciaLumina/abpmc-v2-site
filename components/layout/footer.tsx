"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2E47] border-t border-[#0B2E47]">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 text-[#E4F2FF]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-12">
          
          {/* Coluna 1: Institucional */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base uppercase tracking-wide mb-4">
              Institucional
            </h3>
            <nav className="space-y-2.5">
              <Link href="/pagina/quem-somos" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Quem somos
              </Link>
              <Link href="/diretoria" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Diretoria
              </Link>
              <Link href="/pagina/transparencia" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Transparência
              </Link>
              <Link href="/estatuto" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Estatuto
              </Link>
              <Link href="/documentos" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Documentos
              </Link>
            </nav>
          </div>

          {/* Coluna 2: Associação */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base uppercase tracking-wide mb-4">
              Associação
            </h3>
            <nav className="space-y-2.5">
              <Link href="/anuidades" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Associe-se
              </Link>
              <Link href="/socios" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Sócios
              </Link>
              <Link href="/acreditacao" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Acreditação
              </Link>
              <Link href="/pagina/afiliacao" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Afiliação
              </Link>
            </nav>
          </div>

          {/* Coluna 3: Eventos */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base uppercase tracking-wide mb-4">
              Eventos
            </h3>
            <nav className="space-y-2.5">
              <Link href="/encontros/historico" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Encontros Anuais
              </Link>
              <Link href="/eventos" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Outros Eventos
              </Link>
              <Link href="/comissoes/jornadas-eventos-regionais" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Jornadas Regionais
              </Link>
            </nav>
          </div>

          {/* Coluna 4: Conteúdo */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base uppercase tracking-wide mb-4">
              Conteúdo
            </h3>
            <nav className="space-y-2.5">
              <Link href="/noticias" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Notícias
              </Link>
              <Link href="/comportamento-em-foco" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Comportamento em Foco
              </Link>
              <Link href="/publicacoes" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Publicações
              </Link>
              <Link href="/editora" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Editora
              </Link>
            </nav>
          </div>

          {/* Coluna 5: Comissões */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base uppercase tracking-wide mb-4">
              Comissões
            </h3>
            <nav className="space-y-2.5">
              <Link href="/abpmc-comunidade" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                ABPMC Comunidade
              </Link>
              <Link href="/comissoes/acreditacao" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Acreditação
              </Link>
              <Link href="/comissoes/etica" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Ética
              </Link>
              <Link href="/comissoes/sustentabilidade" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Sustentabilidade
              </Link>
            </nav>
          </div>

          {/* Coluna 6: Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base uppercase tracking-wide mb-4">
              Legal
            </h3>
            <nav className="space-y-2.5">
              <Link href="/pagina/politica-privacidade" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/pagina/termos-uso" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Termos de Uso
              </Link>
              <Link href="/pagina/cookies" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Cookies
              </Link>
              <Link href="/contato" className="block text-sm text-[#B8D9FF] hover:text-white transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="border-t border-gray-300 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>
              © {currentYear} Copyright ABPMC - Associação Brasileira de Psicologia e Medicina Comportamental. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-2">
              <span>Desenvolvido por</span>
              <Link 
                href="https://agencialumina.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#01C2CE] hover:text-[#0B2E47] font-semibold transition-colors"
              >
                Agência Lumina
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-[#01C2CE] hover:bg-[#0B2E47] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Voltar ao topo"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}
