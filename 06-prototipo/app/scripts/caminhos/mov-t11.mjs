// T11 · o movimento da conferência (02-telas/T11-conferir-configuracao/animacao.md; gate C12·12,
// C12·29, C12·35 e G26/G27):
//   · conferindo (T11·2): a tela confere ao abrir, sobre o desenho do quadro a que chega — cada
//     linha com o relógio no poço vira o glifo dela, uma a cada 400 ms (RITMOS.conferenciaLinhaMs);
//     o relógio só liga depois da troca entre telas (C12·35 b): pelo menu, o primeiro aos 550
//     (150 + 400); pelo endereço, aos 400;
//   · as linhas de conferência (T11·3): o glifo esmaece no poço em 150, e na 00 a linha do módulo
//     junto (C12·29); com reduzir, em ordem, no mesmo ritmo, sem o esmaecer (G26);
//   · o veredito (T11·1, C12·35 a, o retorno do diretor de 26/09): a caixa dele está no lugar desde
//     que a tela abre, neutra, com a contagem acompanhando as quatro que se comparam (1 de 4 … 3 de 4,
//     nada conta de zero · a rodada 2 do retorno do PM: o Extended ID saiu, e são quatro linhas);
//     na quarta linha, a palavra e a cor entram em 150 — a palavra por opacity, o cinza do traço sai
//     por uma camada, o xis esmaece no poço (a versão lida no módulo saiu do 02). Nada muda de lugar
//     nem de altura (o marcaLugar / mesmoLugar), e o veredito só fala no fim.
// Nascida lida — no print, num estado da coluna, na folha aberta pelo endereço —, parada. A folha
// Outras ações (lei 20) é do conferencia.mjs e do mov-porcima.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const GLIFO = esmaece('ds-glifo')
const MODULO = esmaece('ds-checagem-par-modulo')   // o que o módulo tem, na 00 (C12·29)
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const CHEGA_NAO_BATE = [esmaece('ds-aviso-titulo'), esmaece('ds-aviso-capa'), GLIFO]
const CHEGA_CONFERE = [esmaece('ds-aviso-titulo'), esmaece('ds-aviso-capa')]
const LINHA = [300, 560]   // 400 por linha, medido a partir do passo de antes
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const CONFERE = '02-momento-tudo-confere'
const OUTRAS = '03-momento-outras-acoes'
const ESTADOS = ['01-estado-conteudo-que-o-app-nao-reconhece', '05-estado-revisar-em-seguida']

export default [
  // ── nascida lida, parada: no print, nos estados da coluna e na folha aberta pelo endereço ──
  ...['', `&momento=${CONFERE}`, `&momento=${OUTRAS}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T11${q}&print=1` }, ...PARADA]),
  { abre: '?tela=T11&print=1' },
  { ve: 'NÃO BATE COM O CADASTRO' },
  { ve: '4 de 4' },
  { abre: `?tela=T11&estado=${ESTADOS[0]}` }, ...PARADA, { ve: 'NÃO BATE COM O CADASTRO' },
  { abre: `?tela=T11&estado=${ESTADOS[1]}` }, ...PARADA, { ve: 'REVISAR EM SEGUIDA' },
  { abre: `?tela=T11&momento=${OUTRAS}` },
  ...PARADA,
  { ve: 'NÃO BATE COM O CADASTRO' },

  // ── a 00 pelo endereço: a tela abre parada, e a conferência corre dali (G27) ──
  { abre: '?tela=T11' },
  { quieto: true },
  { marcaLugar: true },
  // a caixa do veredito já está no lugar, neutra: o lugar da palavra reservado, sem texto, e nada conta de zero
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  { naoVe: '1 de 4' },
  { naoOuve: 'NÃO BATE' },
  // a rodada 2: as ações já estão lá enquanto lê, desligadas, com a frase que diz quando liberam (a 04)
  { ve: 'As ações liberam quando a leitura terminar.' },
  { desligado: 'Voltar ao menu' },
  { ve: '1 de 4', entre: [100, 520] },                     // as cercas, aos 400 da montagem
  { anima: [GLIFO, MODULO] },                               // o xis no poço, e a linha do módulo junto
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  { ve: '2 de 4', entre: LINHA },                           // a rede do módulo
  { anima: [GLIFO, MODULO] },
  { ve: '3 de 4', entre: LINHA },                           // os eventos, 400 depois dela
  { anima: [GLIFO, MODULO] },
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  // a quarta linha, o leitor: o veredito entra no lugar — a palavra, a cor do traço por camada, o xis no poço
  { ve: 'NÃO BATE COM O CADASTRO', entre: LINHA },
  { anima: [...CHEGA_NAO_BATE, MODULO] },
  { ve: '4 de 4' },
  { ouve: 'falha' },
  { dorme: 250 },
  { quieto: true },
  { mesmoLugar: true },                                     // nada mudou de lugar nem de altura
  { ve: 'Corrigir este bloco' },                            // a rodada 2: a ação mora na linha
  { naoVe: 'As ações liberam quando a leitura terminar.' },

  // ── o 02 pelo menu: a troca entre telas, e o relógio só depois dela (C12·35 b) ──
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { dorme: 250 },
  { toca: 'Conferir configuração', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T11', momento: CONFERE },
  { dorme: 300 },
  { quieto: true },                                         // a troca acabou, e o primeiro bloco ainda não
  { naoVe: 'CONFERE COM O CADASTRO' },
  { ve: '1 de 4', entre: [100, 400] },                      // aos 550 do toque: 150 da troca + 400
  { anima: [GLIFO] },
  { ve: '3 de 4', entre: [650, 1000] },                     // a terceira linha (a rodada 2: sem o Extended ID)
  { ve: 'CONFERE COM O CADASTRO', entre: LINHA },
  { anima: CHEGA_CONFERE },                                 // o lima do traço por camada
  { naoVe: 'igual à do cadastro' },                         // a versão lida no módulo saiu (o pacote 2)
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
  { ve: '1 de 4', entre: [100, 520] },
  { anima: [GLIFO] },
  { ve: 'CONFERE COM O CADASTRO', entre: [950, 1450] },
  { anima: CHEGA_CONFERE },
  { dorme: 250 },
  { quieto: true },
  { mesmoLugar: true },

  // ── com reduzir movimento: em ordem, no mesmo ritmo, sem o esmaecer; a palavra e a cor entram direto ──
  { reduzir: true },
  { abre: '?tela=T11' },
  { quieto: true },
  { ve: '1 de 4', entre: [100, 520] },
  { quieto: true },
  { ve: '2 de 4', entre: LINHA },
  { quieto: true },
  { ve: '3 de 4', entre: LINHA },
  { quieto: true },
  { ve: 'NÃO BATE COM O CADASTRO', entre: LINHA },
  { quieto: true },
  { ve: '4 de 4' },
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { toca: 'Conferir configuração' },
  { quieto: true },
  { chega: 'T11', momento: CONFERE },
  { ve: '1 de 4', entre: [200, 560] },
  { quieto: true },
  { ve: 'CONFERE COM O CADASTRO', entre: [950, 1550] },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna abre parado; a volta ao fluxo e o pulo, a leitura dali ──
  { abre: '?tela=T11&print=1' },
  { abre: '?tela=T11' },
  { janela: [1440, 900] },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { dorme: 250 },
  { palco: 'Revisar em seguida' },
  { chega: 'T11', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Conteúdo não reconhecido' },
  { chega: 'T11', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T11', estado: null },
  { quieto: true },
  { ve: '1 de 4', entre: [150, 560] },
  { ve: 'NÃO BATE COM O CADASTRO', ms: 5000 },
  { abre: '?tela=T04' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T11' },
  { chega: 'T11' },
  { quieto: true },
  { ve: '1 de 4', entre: [150, 560] },
]
