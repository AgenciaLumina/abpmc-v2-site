import { INTRO_PARAGRAPHS } from "@/lib/diretoria.data";

export default function DiretoriaIntro() {
  return (
    <section id="intro" className="bg-white">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="space-y-6 md:space-y-8 text-[18px] leading-[1.9] text-[#1E1E1E]">
          {INTRO_PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className={index === INTRO_PARAGRAPHS.length - 1 ? "mb-0" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
