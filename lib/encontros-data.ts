export interface Encontro {
  numero: string;
  numeroRomano: string;
  ano: string;
  tema: string;
  local: string;
  data: string;
  participantes?: string;
  anaisUrl?: string | null;
  descricao?: string;
}

export const encontros: Encontro[] = [
  {
    numero: "1",
    numeroRomano: "I",
    ano: "1992",
    tema: "I Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "UERJ, Rio de Janeiro - RJ",
    data: "20 a 22 de novembro de 1992",
    participantes: "~150",
    anaisUrl: null,
    descricao: "O primeiro encontro marcou o início da ABPMC como espaço de integração da comunidade de Análise do Comportamento no Brasil.",
  },
  {
    numero: "2",
    numeroRomano: "II",
    ano: "1993",
    tema: "II Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "Campinas - SP",
    data: "1993",
    participantes: "~200",
    anaisUrl: null,
  },
  {
    numero: "3",
    numeroRomano: "III",
    ano: "1994",
    tema: "III Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "Campinas - SP",
    data: "1994",
    anaisUrl: null,
  },
  {
    numero: "4",
    numeroRomano: "IV",
    ano: "1995",
    tema: "IV Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "Campinas - SP",
    data: "1995",
    anaisUrl: null,
  },
  {
    numero: "5",
    numeroRomano: "V",
    ano: "1996",
    tema: "V Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "São Paulo - SP",
    data: "1996",
    anaisUrl: null,
  },
  {
    numero: "6",
    numeroRomano: "VI",
    ano: "1997",
    tema: "VI Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "Santos - SP",
    data: "Setembro de 1997",
    anaisUrl: null,
    descricao: "Neste encontro foi realizada uma homenagem a Roberto Banaco pelos monitores do evento.",
  },
  {
    numero: "7",
    numeroRomano: "VII",
    ano: "1998",
    tema: "VII Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "Campinas - SP",
    data: "1998",
    anaisUrl: null,
  },
  {
    numero: "8",
    numeroRomano: "VIII",
    ano: "1999",
    tema: "VIII Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "Águas de Lindóia - SP",
    data: "1999",
    anaisUrl: null,
  },
  {
    numero: "9",
    numeroRomano: "IX",
    ano: "2000",
    tema: "IX Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "Campinas - SP",
    data: "2000",
    anaisUrl: null,
  },
  {
    numero: "10",
    numeroRomano: "X",
    ano: "2001",
    tema: "X Encontro Brasileiro de Psicoterapia e Medicina Comportamental",
    local: "Campinas - SP",
    data: "2001",
    anaisUrl: null,
  },
  {
    numero: "20",
    numeroRomano: "XX",
    ano: "2011",
    tema: "XX Encontro Brasileiro de Psicologia e Medicina Comportamental",
    local: "Curitiba - PR",
    data: "Agosto de 2011",
    anaisUrl: "https://abpmc.org.br/anais-do-encontro-brasileiro/",
  },
  {
    numero: "30",
    numeroRomano: "XXX",
    ano: "2021",
    tema: "XXX Encontro Anual da ABPMC",
    local: "Online (devido à pandemia COVID-19)",
    data: "2021",
    anaisUrl: "https://abpmc.org.br/anais-do-encontro-brasileiro/",
  },
  {
    numero: "33",
    numeroRomano: "XXXIII",
    ano: "2024",
    tema: "XXXIII Encontro da ABPMC e I Congresso de Análise do Comportamento Infantil e da Adolescência",
    local: "Fortaleza - CE",
    data: "2024",
    participantes: "~1500",
    anaisUrl: "https://abpmc.org.br/anais-do-encontro-brasileiro/",
  },
  {
    numero: "34",
    numeroRomano: "XXXIV",
    ano: "2025",
    tema: "XXXIV Encontro da ABPMC – II Congresso de Análise do Comportamento Infantil e da Adolescência",
    local: "Goiânia - GO",
    data: "2025",
    participantes: "Estimado: 2000+",
    anaisUrl: null,
    descricao: "O maior evento de Análise do Comportamento da América Latina.",
  },
];

// Função para buscar encontro por ano
export function getEncontroByAno(ano: string): Encontro | undefined {
  return encontros.find((e) => e.ano === ano);
}

// Função para buscar encontro por número
export function getEncontroByNumero(numero: string): Encontro | undefined {
  return encontros.find((e) => e.numero === numero);
}

// Função para buscar todos os encontros
export function getAllEncontros(): Encontro[] {
  return encontros.sort((a, b) => parseInt(b.ano) - parseInt(a.ano)); // Ordem decrescente
}

// Função para buscar encontros recentes
export function getRecentEncontros(limit: number = 5): Encontro[] {
  return getAllEncontros().slice(0, limit);
}
