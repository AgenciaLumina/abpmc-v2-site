import type { Metadata } from "next";
import HeaderInterno from "@/components/layout/HeaderInterno";

export const metadata: Metadata = {
  title: "Estatuto | ABPMC",
  description: "Consulte o estatuto da ABPMC.",
};

export default function EstatutoPage() {
  return (
    <>
      <HeaderInterno titulo="Estatuto" />
      <main className="bg-[#FEFEFE]">
        <section className="max-w-[1100px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="bg-white rounded-2xl shadow-md p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h2 className="text-[#021228] font-semibold text-[26px] md:text-[30px]">
                  Nosso estatuto
                </h2>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://dev.agencialumina.com.br/abpmc_dev/wp-content/uploads/2021/07/16191146039ca98ff56f73.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0B2E47] hover:bg-[#22949e] text-white px-6 py-3 rounded-full text-[15px] font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  <svg 
                    className="w-[16px] h-[16px]" 
                    fill="currentColor" 
                    viewBox="0 0 384 512"
                  >
                    <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                  </svg>
                  Clique aqui para fazer o Download
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
