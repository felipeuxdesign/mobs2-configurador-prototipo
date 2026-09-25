// T13 · os textos da tela, exatamente como no 02-telas/T13-checklist/textos.md.
// Onde o texto traz um dado (a contagem, a hora, o nome, o número, a placa),
// a moldura é daqui e o dado vem do mock ou do estado único, na hora de
// montar. Os nomes das seções ('A · Identificação') saem de M.checklist.secoes;
// os dos itens, de M.checklist.itens (o rótulo); os títulos do nível do item,
// das perguntas; o rótulo de topo do nível do item, da seção (AC-11).
export const T = {
  encerrar: 'ENCERRAR',
  titulo: 'Checklist',
  de: (total) => `de ${total}`,
  secao: (id, nome) => `${id} · ${nome}`,

  // quem age, embaixo do nome da seção (a entrega do checklist, decisão 34)
  appConfere: 'o app confere sozinho',
  appConferiu: 'o app conferiu',
  voceFotografa: (n) => `você fotografa ${n} itens`,
  fotosTiradas: (n) => `${n} fotos tiradas`,
  voceFazCiclo: 'você faz o ciclo em movimento',
  cicloPassou: 'o ciclo passou',
  esperaServidor: 'espera o servidor · não bloqueia',
  servidorConfirmou: 'o servidor confirmou',

  // o veredito do homologado
  homologadaAs: (hora) => `Instalação homologada às ${hora}`,
  relatorioLeva: (n) => `o relatório leva ${n} evidências, o local e o seu nome`,
  semLocalizacao: 'o relatório vai sem localização',

  // os valores dos itens que são palavra (textos.md)
  confere: 'confere',
  conforme: 'conforme',
  sinalBom: 'sinal bom',
  satelites: (n) => `${n} satélites`,
  feita: 'feita',
  gravados: 'gravados',
  gravado: 'gravado',
  atual: 'atual',
  intervalo: (seg) => `intervalo ${seg} s`,
  aFazer: 'a fazer',
  esperaEnvio: 'espera o envio',
  vazio: '—',
  // B: a foto por fazer, a herdada da calibração e a ressalva com a causa
  fotoATirar: 'foto a tirar',
  fotografadoNaCalibracao: (hora) => `fotografado na calibração, às ${hora}`,
  comRessalva: (causa) => `com ressalva · ${causa}`,
  // E: a ação da seção, a única
  fazerCiclo: 'Fazer o ciclo dinâmico',
  osPassos: (n) => `os ${n} passos, com o ônibus em movimento`,
  // F depois de homologar: nenhuma referência da entrega desenha a F aberta
  // com o servidor confirmado; ficam as palavras do C10 (T13/06 de antes: 12
  // subiram · 31 de 31 · na fila), com o número do mock (G25, pro arquiteto)
  subiram: (n) => `${n} subiram`,
  semCerca: 'sem cerca',

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
