import Link from "next/link";

export default function BloqueadoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Ícone */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full mb-6">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Conta Bloqueada
        </h1>

        {/* Mensagem */}
        <div className="bg-red-800/50 rounded-lg p-6 mb-8">
          <p className="text-red-100 text-lg mb-4">
            Sua conta foi temporariamente bloqueada.
          </p>
          <p className="text-red-200 text-sm">
            Entre em contato com o suporte da ABPMC para mais informações sobre o desbloqueio da sua conta.
          </p>
        </div>

        {/* Ações */}
        <div className="space-y-4">
          <Link
            href="/contato"
            className="block w-full bg-white text-red-900 py-3 px-6 rounded-lg font-medium hover:bg-red-50 transition"
          >
            Entrar em Contato
          </Link>
          
          <Link
            href="/"
            className="block w-full text-white border border-white/30 py-3 px-6 rounded-lg font-medium hover:bg-white/10 transition"
          >
            Voltar ao Site
          </Link>
        </div>
      </div>
    </div>
  );
}
