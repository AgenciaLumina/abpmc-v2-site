"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/associado/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2E47] via-[#2b4e6d] to-[#22949e] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src="/images_estrutura/abpmc-logo-white-text.png" 
              alt="ABPMC Logo" 
              className="h-20 mx-auto"
            />
          </div>
          <h1 className="text-white text-3xl md:text-4xl font-semibold mb-2">
            Área do Associado
          </h1>
          <p className="text-white/80 text-lg">Acesse sua conta</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-[#0B2E47] mb-6 text-center">
            Bem-vindo de volta
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#22949e] focus:border-transparent outline-none transition"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#22949e] focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-[#22949e] focus:ring-[#22949e] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Lembrar-me
                </label>
              </div>

              <Link
                href="/associado/esqueci-senha"
                className="text-sm text-[#22949e] hover:text-[#0B2E47] transition"
              >
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#2b4e6d] to-[#22949e] text-white py-3 px-4 rounded-md hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Ainda não é associado?{" "}
              <Link
                href="/contato"
                className="text-[#22949e] hover:text-[#0B2E47] font-medium transition"
              >
                Entre em contato
              </Link>
            </p>
          </div>
        </div>

        {/* Voltar ao site */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-white/80 hover:text-white text-sm transition inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar ao site institucional
          </Link>
        </div>
      </div>
    </div>
  );
}
