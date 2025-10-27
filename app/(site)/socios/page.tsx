"use client";

import { useState, useEffect } from "react";
import HeaderInterno from "@/components/layout/HeaderInterno";

interface Socio {
  id: number;
  nome: string;
  email: string;
  curriculoLattes?: string | null;
}

type TabRange = {
  label: string;
  letters: string[];
};

const TABS: TabRange[] = [
  { label: "A–D", letters: ["A", "B", "C", "D"] },
  { label: "E–H", letters: ["E", "F", "G", "H"] },
  { label: "I–L", letters: ["I", "J", "K", "L"] },
  { label: "M–P", letters: ["M", "N", "O", "P"] },
  { label: "Q–T", letters: ["Q", "R", "S", "T"] },
  { label: "U–Z", letters: ["U", "V", "W", "X", "Y", "Z"] },
];

export default function SociosPage() {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [filteredSocios, setFilteredSocios] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/socios")
      .then((res) => res.json())
      .then((data) => {
        const sociosOrdenados = (data.socios || []).sort((a: Socio, b: Socio) =>
          a.nome.localeCompare(b.nome, "pt-BR")
        );
        setSocios(sociosOrdenados);
        setFilteredSocios(sociosOrdenados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar sócios:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterSocios();
  }, [activeTab, searchQuery, socios]);

  const normalize = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filterSocios = () => {
    let filtered = socios;

    if (searchQuery.trim()) {
      const query = normalize(searchQuery);
      filtered = filtered.filter(
        (socio) =>
          normalize(socio.nome).includes(query) ||
          normalize(socio.email).includes(query)
      );
    } else {
      const currentTab = TABS[activeTab];
      filtered = filtered.filter((socio) => {
        const firstLetter = socio.nome.charAt(0).toUpperCase();
        return currentTab.letters.includes(firstLetter);
      });
    }

    setFilteredSocios(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderInterno titulo="Sócios ABPMC" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <input
              type="search"
              placeholder="Buscar por nome ou e-mail..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#3E808D] focus:border-transparent text-base"
            />
          </div>

          {!searchQuery && (
            <div className="flex flex-wrap gap-2 mb-6">
              {TABS.map((tab, index) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    activeTab === index
                      ? "bg-[#3E808D] text-white border-[#3E808D]"
                      : "bg-white text-[#0F2C3A] border border-gray-300 hover:border-[#3E808D]"
                  }`}
                  aria-selected={activeTab === index}
                  role="tab"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSocios.map((socio) => (
              <div
                key={socio.id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-[#0F2C3A] mb-3">
                  {socio.nome}
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">E-mail:</span>{" "}
                    <a
                      href={`mailto:${socio.email}`}
                      className="text-[#3E808D] hover:underline"
                    >
                      {socio.email}
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Currículo:</span>{" "}
                    {socio.curriculoLattes ? (
                      <a
                        href={socio.curriculoLattes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3E808D] hover:underline"
                      >
                        Currículo Lattes
                      </a>
                    ) : (
                      <span className="text-gray-400">não informado</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredSocios.length === 0 && (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
              <p className="text-gray-500 text-lg">
                {searchQuery
                  ? "Nenhum sócio encontrado com esse termo."
                  : "Nenhum sócio nesta letra."}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
