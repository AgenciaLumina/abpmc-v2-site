"use client";
import Link from "next/link";

export default function NoticiaCard({ titulo, categoria, data, link }: any) {
  return (
    <div className="bg-white shadow-lg shadow-gray-200/50 rounded-2xl p-10 min-h-[180px] flex flex-col md:flex-row justify-between md:items-center hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="flex-1 pr-6 mb-6 md:mb-0">
        <h3 className="text-[18px] font-semibold text-[#0B1220] leading-snug mb-3">
          {titulo}
        </h3>
        <p className="text-[16px] text-[#666] font-medium mt-2">
          <span className="text-[#01C2CE]">{categoria}</span>
          {" / "}
          {data}
        </p>
      </div>

      <div className="flex-shrink-0">
        <Link
          href={link}
          className="inline-flex items-center justify-center bg-[#2b4e6d] hover:bg-[#22949e] text-white text-[16px] font-medium rounded-full w-full md:w-[210px] h-[52px] transition-all font-outfit"
        >
          Clique aqui para ler mais
        </Link>
      </div>
    </div>
  );
}
