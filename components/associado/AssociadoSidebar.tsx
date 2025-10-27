"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

interface AssociadoSidebarProps {
  session: Session;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/associado/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Minha Anuidade",
    href: "/associado/minha-anuidade",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    name: "Minha Conta",
    href: "/associado/minha-conta",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: "Conteúdos",
    href: "/associado/conteudos",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: "Downloads",
    href: "/associado/downloads",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
  },
];

export default function AssociadoSidebar({ session }: AssociadoSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="bg-gradient-to-b from-[#0B2E47] to-[#2b4e6d] w-64 min-h-screen fixed left-0 top-0 text-white">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-white">A</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">ABPMC</h1>
            <p className="text-xs text-white/70">Portal do Associado</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Status da Anuidade */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-xs text-white/70 mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${
              session.user.status === "ATIVO" ? "bg-green-400" : "bg-red-400"
            }`} />
            <span className="text-sm font-medium">
              {session.user.status === "ATIVO" ? "Ativo" : "Inativo"}
            </span>
          </div>
          {session.user.vencimento && (
            <p className="text-xs text-white/70 mt-2">
              Vence em:{" "}
              {new Date(session.user.vencimento).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
