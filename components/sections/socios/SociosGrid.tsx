"use client";

import { useState, useMemo, useEffect } from "react";

interface Socio {
  name: string;
  email: string;
  cv: string;
}

const tabs = [
  { label: "A–D", range: ["A", "B", "C", "D"] },
  { label: "E–H", range: ["E", "F", "G", "H"] },
  { label: "I–L", range: ["I", "J", "K", "L"] },
  { label: "M–P", range: ["M", "N", "O", "P"] },
  { label: "Q–T", range: ["Q", "R", "S", "T"] },
  { label: "U–Z", range: ["U", "V", "W", "X", "Y", "Z"] },
];

function normalize(str: string): string {
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function SociosGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");
  const [sociosData, setSociosData] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar sócios da API
  useEffect(() => {
    async function fetchSocios() {
      try {
        setLoading(true);
        const response = await fetch("/api/socios");
        if (!response.ok) throw new Error("Erro ao carregar sócios");
        const data = await response.json();
        setSociosData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }
    fetchSocios();
  }, []);

  const filteredSocios = useMemo(() => {
    const q = normalize(query);
    
    return sociosData.filter((m) => {
      if (q) {
        return normalize(m.name).includes(q) || normalize(m.email).includes(q);
      }
      const first = (m.name || "").trim().charAt(0).toUpperCase();
      return tabs[activeTab].range.includes(first);
    });
  }, [query, activeTab]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3E808D]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <p className="font-medium">Erro ao carregar sócios</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="abpmc-wrapper"
      style={
        {
          "--abpmc-primary": "#0F2C3A",
          "--abpmc-accent": "#3E808D",
        } as React.CSSProperties
      }
    >
      {/* Campo de busca */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Buscar por nome ou e-mail..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 border border-[#d6d6d6] rounded-[10px] outline-none text-base focus:ring-2 focus:ring-[#3E808D] focus:border-transparent"
        />
      </div>

      {/* Tabs alfabéticas */}
      <div
        role="tablist"
        aria-label="Grupos de sócios"
        className="flex flex-wrap gap-2 mb-4"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            onClick={() => {
              setActiveTab(index);
              setQuery(""); // Limpar busca ao trocar de aba
            }}
            className={`px-4 py-2 rounded-full font-semibold cursor-pointer transition-all ${
              activeTab === index
                ? "bg-[#3E808D] text-white border-[#3E808D]"
                : "bg-white text-[#0F2C3A] border border-[#d9e1e7] hover:bg-[#f5f7fa]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid de sócios */}
      {filteredSocios.length === 0 ? (
        <div className="p-3 bg-[#f5f7fa] border border-[#e6eaef] rounded-[10px] text-center text-[#535353]">
          Nenhum sócio encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSocios.map((socio, index) => (
            <div
              key={index}
              className="border border-[#e6eaef] rounded-[14px] p-4 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-[#0F2C3A] text-lg mb-2 leading-tight">
                {socio.name}
              </h3>
              <div className="text-sm text-[#535353] space-y-1">
                <div>
                  <span className="font-medium">E-mail: </span>
                  {socio.email ? (
                    <a
                      href={`mailto:${socio.email}`}
                      className="text-[#3E808D] hover:underline"
                    >
                      {socio.email}
                    </a>
                  ) : (
                    <span className="text-gray-400">não informado</span>
                  )}
                </div>
                <div>
                  <span className="font-medium">Currículo: </span>
                  {socio.cv ? (
                    <a
                      href={socio.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3E808D] hover:underline"
                    >
                      Lattes
                    </a>
                  ) : (
                    <span className="text-gray-400">não informado</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
