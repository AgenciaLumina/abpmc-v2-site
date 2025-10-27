"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface AssociadoHeaderProps {
  session: Session;
}

export default function AssociadoHeader({ session }: AssociadoHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#0B2E47]">
            Área do Associado
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {session.user.nome}
            </p>
            <p className="text-xs text-gray-500">{session.user.email}</p>
          </div>

          <div className="h-10 w-10 bg-gradient-to-br from-[#2b4e6d] to-[#22949e] rounded-full flex items-center justify-center text-white font-semibold">
            {session.user.nome.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="ml-2 px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
