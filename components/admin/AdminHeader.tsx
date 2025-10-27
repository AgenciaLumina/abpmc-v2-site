"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface AdminHeaderProps {
  session: Session;
}

export default function AdminHeader({ session }: AdminHeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 h-16 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Painel Administrativo
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              {session.user.nome}
            </p>
            <p className="text-xs text-gray-400">
              {session.user.role === "SUPERADMIN" ? "Super Admin" : "Admin"}
            </p>
          </div>

          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
            {session.user.nome.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="ml-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
