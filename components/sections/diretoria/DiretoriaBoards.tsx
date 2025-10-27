import { BOARDS, type Board } from "@/lib/diretoria.data";

function BoardCard({ board }: { board: Board }) {
  return (
    <article
      role="region"
      aria-label={`${board.title}${board.period ? ` — ${board.period}` : board.subtitle ? ` — ${board.subtitle}` : ""}`}
      className="bg-white rounded-3xl shadow-lg p-8 md:p-12 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {(board.subtitle || board.period) && (
        <p className="text-center text-sm md:text-[15px] font-semibold text-[#0B2E47]/80 mb-2 uppercase tracking-wide">
          {board.subtitle || board.period}
        </p>
      )}
      <h2 className="text-center text-[28px] md:text-[32px] font-semibold text-[#0B2E47] mb-8 md:mb-10">
        {board.title}
      </h2>
      <div className="grid md:grid-cols-2 gap-8 md:gap-14 text-[16px] leading-8">
        {board.members.map((column, colIndex) => (
          <ul key={colIndex} className="space-y-3">
            {column.map((member, memberIndex) => (
              <li key={memberIndex}>
                {member.name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </article>
  );
}

export default function DiretoriaBoards() {
  return (
    <section
      id="boards"
      aria-label="Estrutura de diretoria e conselhos"
      className="relative py-20 md:py-28 text-[#0B2E47]"
      style={{
        background: `
          radial-gradient(1200px 600px at 80% -10%, rgba(255,255,255,.08) 0%, rgba(255,255,255,0) 65%),
          radial-gradient(900px 500px at -10% 110%, rgba(255,255,255,.06) 0%, rgba(255,255,255,0) 60%),
          linear-gradient(135deg, #0B2E47 0%, #11384F 100%)
        `,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white bg-[#01C2CE]/90 text-[13px] font-semibold tracking-wider uppercase shadow-md backdrop-blur-sm animate-pulse">
            Linha do tempo
          </span>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 md:mt-14 grid gap-12">
          {BOARDS.map((board, index) => (
            <BoardCard key={index} board={board} />
          ))}
        </div>
      </div>

      {/* Decoração leve */}
      <div className="pointer-events-none absolute inset-0 opacity-[.12]">
        <div className="absolute right-[-60px] top-[-80px] w-[580px] h-[580px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-[-80px] bottom-[-100px] w-[460px] h-[460px] rounded-full bg-[#01C2CE]/10 blur-[100px]" />
      </div>
    </section>
  );
}
