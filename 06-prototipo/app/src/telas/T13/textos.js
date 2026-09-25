// T13 · os textos da tela, exatamente como no 02-telas/T13-checklist/textos.md.
// Onde o texto traz um dado (a contagem, a hora, o nome, o número, a placa),
// a moldura é daqui e o dado vem do mock ou do estado único, na hora de
// montar. Os nomes das seções ('A · Identificação') saem de M.checklist.secoes;
// os dos cartões, dos itens (em caixa alta); os títulos do nível do item, das
// perguntas; o título longo do nível do item, de secoes[].titulo (AC-11).
export const T = {
  encerrar: 'ENCERRAR',
  titulo: 'Checklist',
  de: (total) => `de ${total}`,
  contagem: (feitos, total) => `${feitos} de ${total}`,

  // o placar
  homologacao: 'HOMOLOGAÇÃO',
  homologada: 'HOMOLOGADA',
  conferidos: (feitos, total) => `${feitos} DE ${total} CONFERIDOS`,
  evidencias: (n, hora) => `${n} evidências · ${hora}`,

  // o mapa
  colunaSecao: 'SEÇÃO',
  colunaResolvido: 'RESOLVIDO',
  naoBloqueia: 'não bloqueia',
  secao: (id, nome) => `${id} · ${nome}`,

  // os valores dos cartões que são palavra (textos.md)
  confere: 'confere',
  feita: 'feita',
  semCerca: 'sem cerca',
  vazio: '—',
  subiram: 'subiram',
  sat: 'sat',
  dbm: 'dBm',

  // o rodapé
  faltam: (n) => `Faltam ${n} itens`,
  finalizar: 'Finalizar instalação',
  encerrarSessao: 'Encerrar sessão',
  voltarMenu: 'Voltar ao menu',
  voltarChecklist: 'Voltar ao checklist',

  // o nível do item
  depois: (pergunta) => `Depois: ${pergunta}`,
  naoConforme: 'Não conforme',
  pedeJustificativa: 'pede justificativa',
  justificativa: 'JUSTIFICATIVA',
  tirarFoto: 'Tirar foto',
  salvarComRessalva: 'Salvar com ressalva',
  // a câmera sem a permissão: nenhuma referência da T13 a desenha; o primário é
  // o da câmera da T10 (T10/11, textos.md), que vale igual pro checklist
  // (logica.md · O mundo real, e a regra 12 da lei de construir). A frase do
  // que falta não tem texto pro item do checklist: o visor fica só com a câmera
  // riscada (G25)
  abrirConfiguracoes: 'Abrir as configurações',

  // o item reprovado (09)
  lidoNaCan: 'LIDO NA CAN',
  faixa: (min, max) => `${min} — ${max}`,
  abaixo: (dif, unidade) => `${dif} ${unidade} abaixo do mínimo`,
  naoSeMarca: 'ISTO NÃO SE MARCA À MÃO',
  confiraAlimentacao: 'Confira a alimentação e refaça a leitura da CAN.',
  refazerCan: 'Refazer a leitura da CAN',

  // o diálogo da Seção F (10)
  secaoFNaoPassou: 'A Seção F não passou',
  registradaFalhando: 'A instalação fica registrada com ela falhando — e com o seu nome.',
  ciente: (nome, hora) => `Estou ciente · ${nome}, ${hora}`,
  cancelar: 'Cancelar',
}
