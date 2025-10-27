import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Documentos | ABPMC",
  description: "Documentos oficiais e materiais disponíveis para download da ABPMC.",
};

export default async function DocumentosPage() {
  // Buscar documentos do banco de dados (tipo DOWNLOAD e públicos ou para associados)
  const documentos = await prisma.conteudoRestrito.findMany({
    where: {
      tipo: "DOWNLOAD",
      ativo: true,
      OR: [
        { visivelApenas: "PUBLICO" },
        { visivelApenas: "ASSOCIADOS" },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <HeaderInterno titulo="Documentos" />
      <main className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <p className="text-lg text-[#444]">
            Abaixo estão os documentos oficiais e materiais disponíveis para download.
          </p>
          {documentos.length === 0 && (
            <p className="text-sm text-gray-500 mt-4">
              Nenhum documento disponível no momento. Use o painel admin para adicionar documentos.
            </p>
          )}
        </div>

        {/* BOX DE DOCUMENTOS */}
        {documentos.length > 0 && (
          <div className="max-w-5xl mx-auto space-y-6">
            {documentos.map((doc) => (
              <div
                key={doc.id}
                className="bg-white shadow-lg rounded-lg p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-[#222]">
                      {doc.titulo}
                    </h3>
                    {doc.visivelApenas === "ASSOCIADOS" && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Associados
                      </span>
                    )}
                  </div>
                  <p className="text-[#555] text-sm">{doc.corpo}</p>
                  {doc.categoria && (
                    <span className="inline-block mt-2 text-xs text-[#2b4e6d]">
                      {doc.categoria}
                    </span>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {doc.anexoUrl ? (
                    <a
                      href={doc.anexoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#2b4e6d] hover:bg-[#22949e] text-white px-5 py-3 rounded-md transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 384 512"
                      >
                        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                      </svg>
                      Baixar
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500">Arquivo não disponível</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
