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
  // o nome da E nas referências do pacote 2 (T13/00 a 06, 11 a 14): Ciclo de testes. O
  // mock ainda diz Teste dinâmico (checklist.secoes, rótulo e título) — vale o texto da
  // referência, até o mock trocar (desvio nomeado, pro arquiteto)
  rotuloDaSecao: { E: 'Ciclo de testes' },

  // quem age, embaixo do nome da seção (a entrega do checklist, decisão 34)
  appConfere: 'o app confere sozinho',
  appConferiu: 'o app conferiu',
  // no singular, com 1 (a resposta do arquiteto de 26/09: *1 item*, *1 foto tirada*)
  voceFotografa: (n) => (n === 1 ? 'você fotografa 1 item' : `você fotografa ${n} itens`),
  fotosTiradas: (n) => (n === 1 ? '1 foto tirada' : `${n} fotos tiradas`),
  voceFazCiclo: 'você faz o ciclo parado',
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
  gravada: 'gravada',
  gravado: 'gravado',
  // D · o Extended ID, só leitura (decisão 45): o que está no módulo (T13/04, '3 cartões ·
  // 1 iButton'); sem nenhum, só informando, e não é divergência (D5)
  extendedId: (cartoes, ibuttons) => {
    if (!cartoes && !ibuttons) return 'nenhum cartão no módulo'
    const partes = []
    if (cartoes) partes.push(cartoes === 1 ? '1 cartão' : `${cartoes} cartões`)
    if (ibuttons) partes.push(ibuttons === 1 ? '1 iButton' : `${ibuttons} iButtons`)
    return partes.join(' · ')
  },
  // D · o horímetro pulado na calibração (D1): resolvido, sem bloquear
  naoCalibrado: 'não calibrado',
  aFazer: 'a fazer',
  esperaEnvio: 'espera o envio',
  vazio: '—',
  // B: a foto por fazer (o Painel também, decisão 52) e a ressalva com a causa
  fotoATirar: 'foto a tirar',
  comRessalva: (causa) => `com ressalva · ${causa}`,
  // E: a ação da seção, a única
  fazerCiclo: 'Fazer o ciclo de testes',
  osPassos: (n) => `os ${n} passos, com o ônibus parado`,
  // F depois de homologar: nenhuma referência da entrega desenha a F aberta
  // com o servidor confirmado; ficam as palavras do C10 (T13/06 de antes: 12
  // subiram · 31 de 31 · na fila), com o número do mock (G25, pro arquiteto)
  subiram: (n) => `${n} subiram`,

  // o rodapé
  // no singular, *1 item*, com o verbo junto (o singular do `Faltam N itens`: proposta do protótipo, pro arquiteto)
  faltam: (n) => (n === 1 ? 'Falta 1 item' : `Faltam ${n} itens`),
  finalizar: 'Finalizar instalação',
  encerrarSessao: 'Encerrar sessão',
  voltarMenu: 'Voltar ao menu',
  voltarChecklist: 'Voltar ao checklist',

  // o nível do item
  depois: (pergunta) => `Depois: ${pergunta}`,
  // a caixa do não conforme, nas duas telas do item (decisão 39, T13/07, 08 e 15)
  naoConforme: 'Não está conforme',
  marqueEConte: 'marque e conte o que aconteceu',
  conteEmbaixo: 'conte embaixo o que aconteceu',
  oQueAconteceu: 'O QUE ACONTECEU',
  tirarFoto: 'Tirar foto',
  // o não conforme exige a foto do problema (decisão 39): o quadro, o registro e o botão que diz o que falta
  enquadreProblema: 'Enquadre o problema',
  fotografarProblema: 'Fotografar o problema',
  problemaFotografado: (hora) => `Problema fotografado às ${hora}`,
  vaiComARessalva: 'vai junto com a ressalva, pro gestor',
  // sem o texto, apagado: nenhuma referência o desenha, e o texto é o do tela.md e do logica.md (decisão 39)
  conteOQueAconteceu: 'Conte o que aconteceu',
  salvarComRessalva: 'Salvar com ressalva',
  // a câmera sem a permissão: nenhuma referência da T13 a desenha; o primário é
  // o da câmera da T10 (T10/11, textos.md), que vale igual pro checklist
  // (logica.md · O mundo real, e a regra 12 da lei de construir). A frase do
  // que falta não tem texto pro item do checklist: o visor fica só com a câmera
  // riscada (G25)
  abrirConfiguracoes: 'Abrir as configurações',

  // o item reprovado (09)
  lidoNoModulo: 'LIDO NO MÓDULO',
  faixa: (min, max) => `${min} — ${max}`,
  abaixo: (dif, unidade) => `${dif} ${unidade} abaixo do mínimo`,
  // o pacote 11: o que conferir, como a conexão que falha na T05/04 (sai o 'isto não se marca à mão')
  oQueConferir: 'O QUE CONFERIR',
  conferirAlimentacao: [
    { titulo: '1 · Bateria do ônibus', texto: '— carga e terminais' },
    { titulo: '2 · Cabo de alimentação', texto: '— encaixe firme' },
    { titulo: '3 · Ponto de ligação', texto: '— direto na bateria, sem queda' },
  ],
  // leva à T07, o Diagnóstico do módulo, que relê o módulo e a CAN
  refazerDiagnostico: 'Refazer o diagnóstico',

  // o diálogo da Seção F (10)
  secaoFNaoPassou: 'A Seção F não passou',
  registradaFalhando: 'A instalação fica registrada com ela falhando — e com o seu nome.',
  ciente: (nome, hora) => `Estou ciente · ${nome}, ${hora}`,
  cancelar: 'Cancelar',
}
