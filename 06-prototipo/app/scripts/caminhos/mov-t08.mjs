// T08 · o movimento de refazer a leitura da CAN (02-telas/T08-refazer-leitura/animacao.md; gate C12·4,
// C12·11, C12·16, C12·18 e C12·20):
//   · a troca de quadro (C12·4): 00 → 01 no toque em Refazer a leitura, e 01 → 02 quando o último
//     sinal responde — o título, a caixa e o rodapé trocam inteiros, e o conteúdo esmaece em 150;
//   · os valores lidos não viram traço (C12·11): a 00 já está em traço, e nada se move no toque além
//     da troca;
//   · cada sinal que responde (C12·11): o mostrador acende, a pele por opacity em 150, e o valor troca
//     no lugar, um a cada 600 ms (RITMOS.releituraSinalMs);
//   · o placar da releitura (C12·20): o número troca no lugar, sem animar;
//   · o último sinal chega com a troca 01 → 02, e entra com ela: a pele não acende de novo por dentro;
//   · relendo, o ENCERRAR fica apagado (a lei 17) e troca de tinta direto.
// A tela abre parada pela URL e no print; a 01 aberta pela URL relê do começo (G27, C12·16), sem
// animar a entrada. Com reduzir, o mesmo ritmo, e nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const ACENDE = esmaece('ds-mostrador')
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]   // C12·18
const PLACAR_PARADO = [{ prop: 'opacity', em: 't08-placar' }, { prop: 'transform', em: 't08-placar' }]
const SINAL = [420, 780]
const M01 = '01-momento-relendo'
const M02 = '02-momento-concluida'
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]

export default [
  // ── abre parada: pela URL e no print ──
  { abre: '?tela=T08' },
  ...PARADA,
  { abre: `?tela=T08&momento=${M02}` },
  ...PARADA,
  { abre: `?tela=T08&momento=${M02}&print=1` },
  ...PARADA,
  { abre: `?tela=T08&momento=${M01}&print=1` },
  ...PARADA,
  { ve: '5 de 12' },
  { abre: '?tela=T08&print=1' },
  ...PARADA,
  // a 01 pela URL relê do começo (o processo declarado, G27), e a entrada fica parada
  { abre: `?tela=T08&momento=${M01}` },
  { quieto: true },
  { ve: '0 de 12' },
  { ve: '1 de 12', entre: [300, 780] },
  { anima: [ACENDE], naoAnima: PLACAR_PARADO },
  { chega: 'T08', momento: M02, ms: 9000 },
  { dorme: 400 },
  { quieto: true },

  // ── Refazer a leitura: a troca de quadro, e um sinal a cada 600 ──
  { abre: '?tela=T08' },
  { quieto: true },
  { toca: 'Refazer a leitura', anima: TROCA, naoAnima: [...SEM_ROXO, ACENDE] },   // nada vira traço (C12·11)
  { chega: 'T08', momento: M01 },
  { ve: 'Lendo a CAN' },
  { desligado: 'ENCERRAR' },
  { dorme: 250 },
  { quieto: true },
  { ve: '1 de 12', entre: [200, 600] },
  { anima: [ACENDE], naoAnima: [...PLACAR_PARADO, esmaece('tela-miolo')] },
  { ve: '2 de 12', entre: SINAL },
  { anima: [ACENDE], naoAnima: PLACAR_PARADO },
  { ve: '5 de 12', entre: [1400, 2100] },
  { anima: [ACENDE], naoAnima: PLACAR_PARADO },
  // o último responde: a troca de quadro pra Leitura refeita, pelo processo — o último mostrador entra com
  // ela, sem acender a pele uma segunda vez por dentro do esmaecer (a revisão de 27/09)
  { chega: 'T08', momento: M02, entre: [3800, 4700] },
  { anima: TROCA, naoAnima: [ACENDE] },
  { ve: 'Leitura refeita' },
  { ve: 'LEITURA REFEITA' },
  { dorme: 400 },
  { quieto: true },
  // Ver os dados da CAN: a T07 nasce lida, parada
  { toca: 'Ver os dados da CAN', anima: TROCA },
  { chega: 'T07' },
  { dorme: 250 },
  { quieto: true },
  { dorme: 700 },
  { quieto: true },

  // ── com reduzir movimento: o mesmo ritmo, e nada anda ──
  { reduzir: true },
  { abre: '?tela=T08' },
  { quieto: true },
  { toca: 'Refazer a leitura' },
  { quieto: true },
  { chega: 'T08', momento: M01 },
  { ve: '1 de 12', entre: [300, 780] },
  { quieto: true },
  { ve: '2 de 12', entre: SINAL },
  { quieto: true },
  { chega: 'T08', momento: M02, entre: [5000, 6400] },
  { quieto: true },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o pulo abre parado ──
  { abre: '?tela=T04' },
  { janela: [1440, 900] },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },
  { palco: 'T08' },
  { chega: 'T08' },
  ...PARADA,
]
