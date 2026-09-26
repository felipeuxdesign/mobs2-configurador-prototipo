// T11 · os textos exatos (02-telas/T11-conferir-configuracao/textos.md). Onde o
// texto traz um dado — a contagem dos blocos e das divergências, as regiões, o
// intervalo, os blocos que a correção arrasta —, ele é montado do mock na hora
// e confere com o textos.md (G1, G8).
// O motivo escrito no caso indice-nao-classificado não é lido: a frase é a do
// textos.md, e a posição 7 é vocabulário que o técnico não lê (T11-V7, G9).
// O noModulo do diff-divergente passa a ser lido (a entrega do checklist): o
// par do bloco que não bate diz o que o módulo tem.
// A última entrega (decisão 40): as três ações nomeadas pelo efeito — Corrigir as
// N divergências, Reenviar os 5 blocos e Apenas registrar o diagnóstico —, a
// folha Outras ações, a versão ilegível e o arraste na legenda.

// o artigo de cada bloco, pra frase do arraste ('Corrigir as Cercas leva o
// Leitor e os Eventos junto.', T11/04): é a gramática do nome do bloco
const ARTIGO = { ativo: 'o', cercas: 'as', leitor: 'o', eventos: 'os', conexao: 'a' }
const comArtigo = (bloco, rotulo) => `${ARTIGO[bloco]} ${rotulo}`
const emLista = (itens) => (itens.length < 2 ? itens.join('') : `${itens.slice(0, -1).join(', ')} e ${itens[itens.length - 1]}`)

export const T = {
  titulo: 'Conferir configuração',
  encerrar: 'ENCERRAR',
  // o veredito, com a contagem à direita
  naoBate: 'NÃO BATE COM O CADASTRO',
  confere: 'CONFERE COM O CADASTRO',
  deTotal: (total) => `de ${total}`,
  // o 01: quantos conteúdos o app não reconhece, a mais que os blocos
  aMais: 'a mais',
  // o 04: a linha de condição embaixo do título (a versão não se lê, HU-T11-1)
  versaoIlegivel: 'a versão não pôde ser lida · conferido pelo conteúdo',
  // o par do bloco que não bate (a entrega do checklist, T11/00): o valor é do caso
  noModulo: (valor) => `no módulo · ${valor}`,
  noCadastro: (valor) => `no cadastro · ${valor}`,
  // o que o cadastro manda, bloco a bloco, no par que não tem caso: a frase é
  // daqui, o valor é do cadastro do par (as regiões do ativo, o preset de
  // eventos); o leitor sem fio é o meio da sessão
  regioes: (n) => `${n} regiões`,
  leitorSemFio: 'leitor sem fio',
  intervalo: (seg) => `intervalo ${seg} s`,
  redeAtual: 'rede do módulo atual',
  // o 01: o conteúdo fora de todos os blocos, e a legenda do reenviar
  naoReconhece: 'HÁ CONTEÚDO QUE O APP NÃO RECONHECE',
  foraDosBlocos: (blocos) => `Fora de todos os blocos. Reenviar os ${blocos} blocos limpa.`,
  preservaConexao: 'Reenviar preserva a conexão do módulo.',
  // o 04: a legenda do arraste — o bloco que a correção arrasta, e os que vão junto
  arraste: (bloco, rotulo, levados) => `Corrigir ${comArtigo(bloco, rotulo)} leva ${emLista(levados.map(([b, r]) => comArtigo(b, r)))} junto.`,
  // o rodapé do que não bate (decisão 40): o Corrigir e o link Outras ações
  corrigir: (n) => `Corrigir as ${n} divergências`,
  outrasAcoes: 'Outras ações',
  // as outras duas, cada uma com o efeito embaixo (a folha T11/03); no 01, o
  // Reenviar é o principal, e o Apenas registrar, o link
  reenviar: (blocos) => `Reenviar os ${blocos} blocos`,
  efeitoReenviar: 'a cadeia inteira, preservando a conexão',
  registrar: 'Apenas registrar o diagnóstico',
  efeitoRegistrar: 'nada é gravado · só o diagnóstico sobe',
  // o xis da folha, pro leitor de tela (o aria-label da T11/03)
  fechar: 'Fechar',
  // o 02: a versão lida e a saída
  versaoLida: 'VERSÃO LIDA NO MÓDULO',
  igualAoCadastro: 'igual à do cadastro, bloco a bloco',
  voltar: 'Voltar ao menu',
}
