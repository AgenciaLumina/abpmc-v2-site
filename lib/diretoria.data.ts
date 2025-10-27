export interface BoardMember {
  name: string;
}

export interface Board {
  title: string;
  subtitle?: string;
  period?: string;
  members: BoardMember[][];
}

export const INTRO_PARAGRAPHS = [
  "Há 23 anos a ABPMC vem exercendo papel fundamental na disseminação da Análise do Comportamento no país. Embora tenha nascido como uma associação de terapeutas, muito rapidamente transformou-se em uma instituição que representa a diversidade e a complexidade que compõem a abordagem, tanto no que se refere à produção de conhecimento quanto às diversas áreas de atuação dos analistas do comportamento.",
  "No período de existência da ABPMC, testemunhamos grande expansão da produção de conhecimento, bem como do reconhecimento da abordagem, em diferentes contextos e por instituições de grande relevância, o que traz perspectivas desafiadoras para a atual e as futuras gerações de analistas do comportamento no Brasil.",
  "O momento atual é de grande importância para a Análise do Comportamento. Instituições de alguns Estados já reconhecem a excelência da abordagem, recomendando-a como primeira escolha no ensino de crianças com desenvolvimento atípico. É crescente também o reconhecimento da terapia analítico-comportamental como tratamento efetivo por instituições de saúde mental.",
  "O contexto atual exige uma diretoria atuante, coesa e capaz de representar a diversidade da Análise do Comportamento brasileira e promover o avanço de nossa ciência em suas múltiplas dimensões. Contamos com o apoio de nossos sócios e amigos para cumprir essa missão."
];

export const BOARDS: Board[] = [
  {
    title: "Conselho Consultivo",
    subtitle: "Membros permanentes",
    members: [
      [
        { name: "Bernard Pimentel Rangé" },
        { name: "Claudia Kami Bastos Oshiro" },
        { name: "Denis Roberto Zamignani" },
        { name: "Felipe Lustosa Leite" },
        { name: "Hélio José Guilhardi" }
      ],
      [
        { name: "João Ilo Coelho Barbosa" },
        { name: "Maria Martha Hubner (em licença temporária do conselho)" },
        { name: "Maria Zilah Brandão" },
        { name: "Roberto Alves Banaco" },
        { name: "Wander Pereira da Silva" }
      ]
    ]
  },
  {
    title: "Conselho Consultivo",
    period: "Gestão 2023–2024",
    members: [
      [
        { name: "Dra. Ariene Coelho" },
        { name: "Esp. Rodrigo Fricate Morales" },
        { name: "Dra. Joana Singer" }
      ],
      [
        { name: "Dr. Olavo Galvão" },
        { name: "Dr. Sandro Iêgo" },
        { name: "Dra. Yara Kuperstein Ingberman" }
      ]
    ]
  },
  {
    title: "Diretoria Executiva",
    period: "Gestão 2023–2024",
    members: [
      [
        { name: "Giovana Munhoz da Rocha – Presidente" },
        { name: "Fernanda Calixto – Vice-presidente" },
        { name: "Thiago Vinicius Sávio – Primeiro secretário" }
      ],
      [
        { name: "Rodrigo Noia Mattos Montan – Segundo secretário" },
        { name: "Fernanda Chaves Pacheco – Primeira tesoureira" },
        { name: "Victoria Boni Albertazzi – Segunda tesoureira" }
      ]
    ]
  },
  {
    title: "Conselho Fiscal",
    members: [
      [
        { name: "Vera Regina Lignelli Otero" },
        { name: "Adriano Luís Alves Watanabe – suplente" }
      ],
      [
        { name: "Rafael Ernesto Arruda Santos" }
      ]
    ]
  }
];
