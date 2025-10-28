export type ColLink = { label: string; href: string };
export type Column = { title: string; links: ColLink[] };
export type MegaGrid = { top: Column[]; bottom: Column[] };
export type DropdownItem = { label: string; href: string; subitems?: { label: string; href: string }[] };

export const MENU_ITEMS = [
  { type: "dropdown" as const, label: "INSTITUCIONAL", items: [
    { label: "Quem somos", href: "/pagina/quem-somos" },
    { label: "Diretoria", href: "/diretoria" },
    { label: "Documentos", href: "/documentos" },
    { label: "Transparência", href: "/pagina/transparencia" },
  ]},
  { type: "mega" as const, label: "A ABPMC" },
  { type: "link" as const, label: "ASSOCIE-SE", href: "/anuidades" },
  { type: "link" as const, label: "ACREDITAÇÃO", href: "/acreditacao" },
  { type: "dropdown" as const, label: "COMISSÕES", items: [
    { label: "ABPMC História", href: "/pagina/abpmc-historia" },
    { label: "ABPMC Comunidade", href: "/abpmc-comunidade" },
    { label: "Acreditação", href: "/comissoes/acreditacao" },
    { label: "Assuntos Profissionais, Legais e Éticos", href: "/pagina/assuntos-profissionais" },
    { label: "Comunicação", href: "/pagina/comunicacao" },
    { label: "Desenvolvimento Atípico", href: "/pagina/desenvolvimento-atipico" },
    { 
      label: "Editora", 
      href: "/editora",
      subitems: [
        { label: "Sobre", href: "/editora" },
        { label: "Anais do Encontro Brasileiro", href: "/editora/anais" },
        { label: "Boletim Contexto", href: "/editora/boletim-contexto" },
        { label: "Livros e cartilhas", href: "/editora/livros-cartilhas" },
        { label: "Revista Brasileira de Terapia Comportamental e Cognitiva", href: "/editora/revista-rbtcc" },
      ]
    },
    { label: "Estudantes", href: "/pagina/estudantes" },
    { label: "Jornadas e Eventos Regionais", href: "/comissoes/jornadas-eventos-regionais" },
  ]},
  { type: "link" as const, label: "NOTÍCIAS", href: "/noticias" },
  { type: "link" as const, label: "CONTATO", href: "/contato" },
];

export const RIGHT_ICONS = [
  { label: "Login", href: "/login", icon: "login" }
];

export const ABPMC_MEGA: MegaGrid = {
  top: [
    { title: "Associação", links: [
      { label: "Associe-se", href: "/anuidades" },
      { label: "Sócios", href: "/socios" },
    ]},
    { title: "Afiliação", links: [
      { label: "Afilie-se", href: "/pagina/afiliacao" },
      { label: "Afiliados", href: "/pagina/afiliados" },
    ]},
    { title: "Documentos", links: [
      { label: "Abpmc Covid-19", href: "/pagina/covid19" },
      { label: "Comportamento em Foco", href: "/comportamento-em-foco" },
      { label: "Documentos da ABPMC", href: "/documentos" },
    ]},
    { title: "Eventos", links: [
      { label: "Encontros Anuais", href: "/encontros/historico" },
      { label: "Outros Eventos", href: "/eventos" },
    ]},
  ],
  bottom: [
    { title: "História", links: [
      { label: "Artigos históricos", href: "/pagina/artigos-historicos" },
      { label: "Documentos históricos", href: "/pagina/documentos-historicos" },
      { label: "Histórias e personagens", href: "/pagina/historias-personagens" },
    ]},
    { title: "Projetos", links: [
      { label: "Comunidade", href: "/abpmc-comunidade" },
      { label: "Sustentabilidade", href: "/comissoes/sustentabilidade" },
    ]},
    { title: "Imprensa", links: [
      { label: "Release", href: "/pagina/release" },
    ]},
  ],
};
