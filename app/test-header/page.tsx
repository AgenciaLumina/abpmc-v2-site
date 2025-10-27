import HeaderInterno from "@/components/layout/HeaderInterno";

export default function TestHeaderPage() {
  return (
    <>
      <HeaderInterno titulo="Teste de Header" />
      <main className="max-w-[1280px] mx-auto px-6 py-20 bg-white">
        <h1 className="text-4xl font-bold mb-4">Página de Teste</h1>
        <p className="text-lg mb-4">Se você está vendo isso, o header está funcionando!</p>
        <div className="bg-blue-500 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Conteúdo Visível</h2>
          <p>Este é um teste para verificar se o conteúdo está renderizando corretamente.</p>
        </div>
      </main>
    </>
  );
}
