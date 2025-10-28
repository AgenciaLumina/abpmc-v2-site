export type ColLink = { label: string; href: string; external?: boolean };
export type Column = { title: string; links: ColLink[] };
export type MegaGrid = { top: Column[]; bottom: Column[] };
export type DropdownItem = { label: string; href: string; subitems?: { label: string; href: string; external?: boolean }[]; external?: boolean };

export const MENU_ITEMS = [
  { type: "dropdown" as const, label: "INSTITUCIONAL", items: [
    { label: "Quem somos", href: "/quem-somos" },
    { label: "Diretoria", href: "/diretoria" },
    { 
      label: "Documentos", 
      href: "#",
      subitems: [
        { label: "Convocações", href: "/convocacoes" },
        { label: "Editais", href: "/editais" },
        { label: "Estatuto", href: "/estatuto" },
      ]
    },
    { label: "Transparência", href: "/transparencia" },
  ]},
  { type: "mega" as const, label: "A ABPMC" },
  { type: "link" as const, label: "ASSOCIE-SE", href: "/associe-se" },
  { type: "link" as const, label: "ACREDITAÇÃO", href: "/comissoes-acreditacao" },
  { type: "dropdown" as const, label: "COMISSÕES", items: [
    { label: "ABPMC História", href: "/comissao-abpmc-historia" },
    { label: "ABPMC Comunidade", href: "/comissao-abpmc-comunidade" },
    { label: "Acreditação", href: "/comissoes-acreditacao" },
    { label: "Assuntos Profissionais, Legais e Éticos", href: "/comissao-de-assuntos-profissionais-legais-e-eticos" },
    { label: "Comunicação", href: "/comissao-de-comunicacao" },
    { label: "Desenvolvimento Atípico", href: "/comissao-de-desenvolvimento-atipico" },
    { 
      label: "Editora", 
      href: "#",
      subitems: [
        { label: "Sobre", href: "/editora" },
        { label: "Anais do Encontro Brasileiro", href: "/anais-do-encontro-brasileiro" },
        { label: "Boletim Contexto", href: "https://boletimcontexto.wordpress.com/", external: true },
        { label: "Livros e cartilhas", href: "/livros-e-cartilhas" },
        { label: "Revista Brasileira de Terapia Comportamental e Cognitiva", href: "http://www.usp.br/rbtcc/index.php/RBTCC", external: true },
      ]
    },
    { label: "Estudantes", href: "/comissao-de-estudantes" },
    { label: "Jornadas e Eventos Regionais", href: "/comissao-de-jornadas-e-eventos-regionais" },
  ]},
  { type: "link" as const, label: "NOTÍCIAS", href: "/categoria/noticias" },
  { type: "link" as const, label: "CONTATO", href: "/contato" },
];

export const RIGHT_ICONS = [
  { label: "Login", href: "/auth/associado", icon: "login" }
];

export const ABPMC_MEGA: MegaGrid = {
  top: [
    { title: "Associação", links: [
      { label: "Associe-se", href: "/associe-se" },
      { label: "Sócios", href: "/socios" },
    ]},
    { title: "Afiliação", links: [
      { label: "Afilie-se", href: "/afilie-se" },
      { label: "Afiliados", href: "/afiliados" },
    ]},
    { title: "Documentos", links: [
      { label: "ABPMC-COVID19", href: "https://juntosabpmc.wordpress.com/", external: true },
      { label: "Comportamento em Foco", href: "/comportamento-em-foco" },
      { label: "Documentos da ABPMC", href: "/documentos-da-abpmc" },
    ]},
    { title: "Eventos", links: [
      { label: "Encontros Anuais", href: "/categoria/encontros-anuais" },
      { label: "Outros Eventos", href: "/categoria/eventos" },
    ]},
  ],
  bottom: [
    { title: "História", links: [
      { label: "Artigos históricos", href: "/categoria/artigos-historicos" },
      { label: "Documentos históricos", href: "/documentos-historicos" },
      { label: "Histórias e personagens", href: "/categoria/historias-e-personagens" },
    ]},
    { title: "Projetos", links: [
      { label: "Comunidade", href: "/projetos-comunidade" },
      { label: "Sustentabilidade", href: "/sustentabilidade" },
    ]},
    { title: "Imprensa", links: [
      { label: "Releases", href: "/releases" },
    ]},
  ],
};
