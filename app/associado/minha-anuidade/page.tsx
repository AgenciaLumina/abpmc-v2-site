"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Plano {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  duracaoDias: number;
}

interface Transacao {
  id: number;
  valor: number;
  status: string;
  metodo: string;
  dataPagamento: string | null;
  createdAt: string;
  descricao: string;
}

export default function MinhaAnuidadePage() {
  const { data: session, status } = useSession();
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      // Buscar planos ativos
      const planosRes = await fetch("/api/planos");
      const planosData = await planosRes.json();
      setPlanos(planosData);

      // Buscar transações do associado
      const transacoesRes = await fetch("/api/transacoes");
      const transacoesData = await transacoesRes.json();
      setTransacoes(transacoesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRenovar = async (planoId: number) => {
    setProcessing(true);

    try {
      const res = await fetch("/api/mercadopago/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planoId }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirecionar para o Mercado Pago
        window.location.href = data.initPoint;
      } else {
        alert("Erro ao processar pagamento");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar pagamento");
    } finally {
      setProcessing(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22949e]"></div>
      </div>
    );
  }

  if (!session) {
    redirect("/associado/login");
  }

  const diasRestantes = session.user.vencimento
    ? Math.ceil(
        (new Date(session.user.vencimento).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#0B2E47]">
          Minha Anuidade
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie sua anuidade e histórico de pagamentos
        </p>
      </div>

      {/* Status Atual */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-[#0B2E47] mb-4">
          Status Atual
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  session.user.status === "ATIVO"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
              <p className="text-lg font-semibold text-gray-900">
                {session.user.status}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Vencimento</p>
            <p className="text-lg font-semibold text-gray-900">
              {session.user.vencimento
                ? new Date(session.user.vencimento).toLocaleDateString("pt-BR")
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Dias Restantes</p>
            <p
              className={`text-lg font-semibold ${
                diasRestantes && diasRestantes > 30
                  ? "text-green-600"
                  : diasRestantes && diasRestantes > 0
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {diasRestantes !== null ? diasRestantes : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Planos Disponíveis */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#0B2E47] mb-4">
          Renovar Anuidade
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planos.map((plano) => (
            <div
              key={plano.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#0B2E47] mb-2">
                {plano.nome}
              </h3>
              {plano.descricao && (
                <p className="text-sm text-gray-600 mb-4">
                  {plano.descricao}
                </p>
              )}
              <div className="mb-4">
                <p className="text-3xl font-bold text-[#22949e]">
                  R$ {plano.valor.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Válido por {plano.duracaoDias} dias
                </p>
              </div>
              <button
                onClick={() => handleRenovar(plano.id)}
                disabled={processing}
                className="w-full bg-gradient-to-r from-[#2b4e6d] to-[#22949e] text-white py-3 px-4 rounded-md hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Processando..." : "Renovar Agora"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Histórico de Pagamentos */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-[#0B2E47] mb-4">
          Histórico de Pagamentos
        </h2>

        {transacoes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Descrição
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Método
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Valor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transacoes.map((transacao) => (
                  <tr key={transacao.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {transacao.dataPagamento
                        ? new Date(transacao.dataPagamento).toLocaleDateString(
                            "pt-BR"
                          )
                        : new Date(transacao.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {transacao.descricao}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 capitalize">
                      {transacao.metodo}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      R$ {transacao.valor.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transacao.status === "APROVADO"
                            ? "bg-green-100 text-green-800"
                            : transacao.status === "PENDENTE"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transacao.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Nenhuma transação encontrada
          </p>
        )}
      </div>
    </>
  );
}
