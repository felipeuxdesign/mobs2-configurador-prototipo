// T11 · o movimento da conferência (02-telas/T11-conferir-configuracao/animacao.md; gate C12·12,
// C12·29, C12·35 e G26/G27):
//   · conferindo (T11·2): a tela confere ao abrir, sobre o desenho do quadro a que chega — cada
//     bloco com o relógio no poço vira check ou xis, um a cada 400 ms (RITMOS.conferenciaLinhaMs);
//     o relógio só liga depois da troca entre telas (C12·35 b): pelo menu, o primeiro aos 550
//     (150 + 400); pelo endereço, aos 400;
//   · as linhas de conferência (T11·3): o glifo esmaece no poço em 150, e na 00 a linha do módulo
//     junto (C12·29); com reduzir, em ordem, no mesmo ritmo, sem o esmaecer (G26);
//   · o veredito (T11·1, C12·35 a, o retorno do diretor de 26/09): a caixa dele está no lugar desde
//     que a tela abre, neutra, com a contagem acompanhando as linhas (1 de 5 … 4 de 5, nada conta
//     de zero); na quinta, a palavra e a cor entram em 150 — a palavra por opacity, o cinza do traço
//     sai por uma camada, o xis esmaece no poço, e no 02 a legenda da prova no mesmo tique. Nada
//     muda de lugar nem de altura (o marcaLugar / mesmoLugar), e o veredito só fala no fim.
// Nascida lida — no print, num estado da coluna, na folha aberta pelo endereço —, parada. A folha
// Outras ações (lei 20) é do conferencia.mjs e do mov-porcima.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const GLIFO = esmaece('ds-glifo')
const MODULO = esmaece('ds-checagem-par-modulo')   // o que o módulo tem, na 00 (C12·29)
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const CHEGA_NAO_BATE = [esmaece('ds-aviso-titulo'), esmaece('ds-aviso-capa'), GLIFO]
const CHEGA_CONFERE = [esmaece('ds-aviso-titulo'), esmaece('ds-aviso-capa'), esmaece('ds-prova-legenda')]
const LINHA = [300, 560]   // 400 por linha, medido a partir do passo de antes
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const CONFERE = '02-momento-tudo-confere'
const OUTRAS = '03-momento-outras-acoes'
const ESTADOS = ['01-estado-conteudo-que-o-app-nao-reconhece', '04-estado-versao-ilegivel']

export default [
  // ── nascida lida, parada: no print, nos estados da coluna e na folha aberta pelo endereço ──
  ...['', `&momento=${CONFERE}`, `&momento=${OUTRAS}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T11${q}&print=1` }, ...PARADA]),
  { abre: '?tela=T11&print=1' },
  { ve: 'NÃO BATE COM O CADASTRO' },
  { ve: '5 de 5' },
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T11&estado=${e}` }, ...PARADA, { ve: 'NÃO BATE COM O CADASTRO' }]),
  { abre: `?tela=T11&momento=${OUTRAS}` },
  ...PARADA,
  { ve: 'NÃO BATE COM O CADASTRO' },

  // ── a 00 pelo endereço: a tela abre parada, e a conferência corre dali (G27) ──
  { abre: '?tela=T11' },
  { quieto: true },
  { marcaLugar: true },
  // a caixa do veredito já está no lugar, neutra: o lugar da palavra reservado, sem texto, e nada conta de zero
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  { naoVe: '1 de 5' },
  { naoOuve: 'NÃO BATE' },
  { ve: '1 de 5', entre: [100, 520] },                     // o primeiro bloco, aos 400 da montagem
  { anima: [GLIFO, MODULO] },                               // o xis no poço, e a linha do módulo junto
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  { ve: '2 de 5', entre: LINHA },
  { anima: [GLIFO, MODULO] },
  { ve: '3 de 5', entre: LINHA },
  { anima: [GLIFO, MODULO] },
  { ve: '4 de 5', entre: LINHA },
  { anima: [GLIFO, MODULO] },
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  // a quinta: o veredito entra no lugar — a palavra, a cor do traço por camada, o xis no poço
  { ve: 'NÃO BATE COM O CADASTRO', entre: LINHA },
  { anima: [...CHEGA_NAO_BATE, MODULO] },
  { ve: '5 de 5' },
  { ouve: 'falha' },
  { dorme: 250 },
  { quieto: true },
  { mesmoLugar: true },                                     // nada mudou de lugar nem de altura
  { ve: 'Corrigir as 5 divergências' },

  // ── o 02 pelo menu: a troca entre telas, e o relógio só depois dela (C12·35 b) ──
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { dorme: 250 },
  { toca: 'Conferir configuração', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T11', momento: CONFERE },
  { dorme: 300 },
  { quieto: true },                                         // a troca acabou, e o primeiro bloco ainda não
  { naoVe: 'CONFERE COM O CADASTRO' },
  { naoVe: 'igual à do cadastro' },
  { ve: '1 de 5', entre: [100, 400] },                      // aos 550 do toque: 150 da troca + 400
  { anima: [GLIFO] },
  { ve: '4 de 5', entre: [1000, 1400] },
  { naoVe: 'igual à do cadastro' },
  { ve: 'CONFERE COM O CADASTRO', entre: LINHA },
  { anima: CHEGA_CONFERE },                                 // o lima do traço por camada, e a legenda da prova no mesmo tique
  { ve: 'igual à do cadastro' },
  { dorme: 250 },
  { quieto: true },
  // a saída: a troca entre telas, de volta ao menu (o topo muda: só o miolo esmaece)
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },
  { chega: 'T04' },
  { dorme: 250 },

  // ── o 02 pelo endereço: o primeiro aos 400 ──
  { abre: `?tela=T11&momento=${CONFERE}` },
  { quieto: true },
  { marcaLugar: true },
  { ve: '1 de 5', entre: [100, 520] },
  { anima: [GLIFO] },
  { ve: 'CONFERE COM O CADASTRO', entre: [1300, 1800] },
  { anima: CHEGA_CONFERE },
  { dorme: 250 },
  { quieto: true },
  { mesmoLugar: true },

  // ── com reduzir movimento: em ordem, no mesmo ritmo, sem o esmaecer; a palavra e a cor entram direto ──
  { reduzir: true },
  { abre: '?tela=T11' },
  { quieto: true },
  { ve: '1 de 5', entre: [100, 520] },
  { quieto: true },
  { ve: '2 de 5', entre: LINHA },
  { quieto: true },
  { ve: '4 de 5', entre: [700, 1000] },
  { quieto: true },
  { ve: 'NÃO BATE COM O CADASTRO', entre: LINHA },
  { quieto: true },
  { ve: '5 de 5' },
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { toca: 'Conferir configuração' },
  { quieto: true },
  { chega: 'T11', momento: CONFERE },
  { ve: '1 de 5', entre: [200, 560] },
  { quieto: true },
  { ve: 'CONFERE COM O CADASTRO', entre: [1300, 1900] },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna abre parado; a volta ao fluxo e o pulo, a leitura dali ──
  { abre: '?tela=T11&print=1' },
  { abre: '?tela=T11' },
  { janela: [1440, 900] },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { dorme: 250 },
  { palco: 'Versão ilegível' },
  { chega: 'T11', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Conteúdo não reconhecido' },
  { chega: 'T11', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T11', estado: null },
  { quieto: true },
  { ve: '1 de 5', entre: [150, 560] },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { abre: '?tela=T04' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T11' },
  { chega: 'T11' },
  { quieto: true },
  { ve: '1 de 5', entre: [150, 560] },
]
