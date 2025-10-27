import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { name: 'Início', href: '/' },
  { name: 'Posts', href: '/p' },
  { name: 'Páginas', href: '/paginas' },
  { name: 'Quem Somos', href: '/pagina/quem-somos' },
  { name: 'Eventos', href: '/pagina/eventos' },
  { name: 'História', href: '/pagina/historias-e-personagens' },
  { name: 'Contato', href: '/pagina/contact' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-outfit text-xl font-bold text-primary-900">
              ABPMC
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button variant="primary" size="sm" asChild>
              <Link href="/pagina/socios">Seja Sócio</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900">
            <span className="sr-only">Abrir menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </Container>
    </header>
  );
}
