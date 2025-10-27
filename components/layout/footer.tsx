"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-background-footer text-text-footer py-12 px-6 sm:px-10 mt-0">
      <div className="mx-auto max-w-container grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* esquerda */}
        <div className="space-y-2">
          <h2 className="font-extrabold text-lg">ABPMC</h2>
          <p className="text-sm">Associação Brasileira de Ciências do Comportamento</p>
        </div>

        {/* centro */}
        <nav aria-label="Rodapé – links úteis" className="space-y-2">
          <Link href="/quem-somos" className="block hover:text-link-footerHover">Quem somos</Link>
          <Link href="/transparencia" className="block hover:text-link-footerHover">Transparência</Link>
          <Link href="/documentos" className="block hover:text-link-footerHover">Documentos</Link>
          <Link href="/eventos" className="block hover:text-link-footerHover">Eventos</Link>
          <Link href="/contato" className="block hover:text-link-footerHover">Contato</Link>
        </nav>

        {/* direita */}
        <div className="text-sm text-right">
          <p>© ABPMC 2025. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{" "}
            <Link href="https://wwwagencialumina.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-link-footerHover">
              Lumina
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
