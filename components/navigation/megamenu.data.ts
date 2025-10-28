export type MegaGroup = {
  title: string
  items: { label: string; href: string }[]
}

export const MEGA_MENU_GROUPS: MegaGroup[] = [
  { title: 'Associação', items: [
    { label: 'Associe-se', href: '/anuidades' },
    { label: 'Sócios', href: '/socios' },
  ]},
  { title: 'Afiliação', items: [
    { label: 'Afilie-se', href: '/pagina/afiliacao' },
    { label: 'Afiliados', href: '/pagina/afiliados' },
  ]},
  { title: 'Documentos', items: [
    { label: 'Abpmc Covid-19', href: '/pagina/covid19' },
    { label: 'Comportamento em Foco', href: '/comportamento-em-foco' },
    { label: 'Documentos da ABPMC', href: '/documentos' },
  ]},
  { title: 'Eventos', items: [
    { label: 'Encontros Anuais', href: '/encontros/historico' },
    { label: 'Outros Eventos', href: '/eventos' },
  ]},
  { title: 'História', items: [
    { label: 'Artigos históricos', href: '/pagina/artigos-historicos' },
    { label: 'Documentos históricos', href: '/pagina/documentos-historicos' },
    { label: 'Histórias e personagens', href: '/pagina/historias-personagens' },
  ]},
  { title: 'Projetos', items: [
    { label: 'Comunidade', href: '/abpmc-comunidade' },
    { label: 'Sustentabilidade', href: '/comissoes/sustentabilidade' },
  ]},
  { title: 'Imprensa', items: [
    { label: 'Release', href: '/pagina/release' },
  ]},
]

export type EditoraItem = { label: string; href: string }

export const EDITORA_ITEMS: EditoraItem[] = [
  { label: 'Sobre', href: '/editora' },
  { label: 'Anais do Encontro Brasileiro', href: '/editora/anais' },
  { label: 'Boletim Contexto', href: '/editora/boletim-contexto' },
  { label: 'Livros e cartilhas', href: '/editora/livros-cartilhas' },
  { label: 'Revista Brasileira de Terapia Comportamental e Cognitiva', href: '/editora/revista-brasileira' },
]
