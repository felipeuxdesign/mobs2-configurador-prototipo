// T10 · o movimento da calibração (02-telas/T10-calibracao/animacao.md; gate C12·4, C12·8, C12·18,
// C12·22, C12·23, C12·33, C12·34 e C12·45), com a decisão 52 (pacote 2): sem a câmera e sem a foto,
// e o horímetro opcional:
//   · o campo do painel (T10·1, C12·45): o traço de foco acende por cima da borda, scaleX em 150, e
//     nenhum texto sai do lugar (marcaLugar / mesmoLugar);
//   · o primário diz o que falta (C12·23): o texto novo esmaece no lugar, em 150 — com a decisão 52,
//     o Digite o que o painel mostra vira o Semear assim que o número entra; o toque que o apaga
//     não deixa o roxo por cima (C12·18); o que acende no fim do semear acende com o texto do passo
//     seguinte, que esmaece no lugar, e o roxo direto, sem camada (C12·23, a peça · o conserto de 27/09);
//   · o passo seguinte é outro desenho (C12·4): no Calibrar o horímetro, o miolo e o rodapé
//     esmaecem em 150; o rodapé nasce com o quadro, e o texto dele não esmaece de novo por dentro;
//   · o semear (T10·3): Gravando no módulo… e Relendo…, 1 s + 1 s (RITMOS), linear — é o ritmo; no fim,
//     em sequência (a T10·4 do C0, C12·34 a): o tambor rola até o relido (300 por rodinha, 40 entre
//     elas, 500 no total, C12·33); quando ele para, a diferença encolhe e esmaece em 300 (T10·5,
//     C12·34); no fim dos 300, o veredito assenta — o confere entra na régua em 150, e no mesmo quadro
//     o poço acende, o alvo diz que cumpriu, o segmento fica feito e o primário acende (o texto novo esmaece);
//   · o Pular o horímetro (D1 do pacote 2): do semeado (01) e do passo do horímetro (08), a calibração
//     segue pro ciclo, a troca entre telas, e a etapa guarda o horímetro pulado.
// A tela abre parada pela URL, em cada momento e estado, no print e no palco. Com reduzir movimento,
// tudo direto, e o semear no mesmo ritmo.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const TRACO = { prop: 'transform', ms: 150, curva: C, em: 'ds-traco-foco' }
const TEXTO = esmaece('ds-primario-texto')
const ACENDE = esmaece('ds-primario-antes')
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }, { prop: 'opacity', em: 'ds-primario-antes' }]   // C12·18
const RODA = { prop: 'transform', ms: 300, em: 'ds-roda-fita', curva: C }
const ROLA = [{ ...RODA, atraso: 0 }, { ...RODA, atraso: 40 }, { ...RODA, atraso: 200 }]   // as seis do hodômetro
const SAI = [{ prop: 'transform', ms: 300, em: 'ds-regua-sai', curva: C }, { prop: 'opacity', ms: 300, em: 'ds-regua-sai', curva: C }]
const ENTRA = esmaece('ds-regua-entra')
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const M = {
  semeado: '01-momento-hodometro-semeado', digitado: '05-momento-hodometro-digitado',
  horimetro: '08-momento-horimetro', completa: '09-momento-calibracao-completa',
}
const ESTADOS = ['02-estado-rotacao-caminhao-coletor', '03-estado-ja-semeado', '04-estado-modulo-sem-pulsos',
  '10-estado-releitura-nao-confere']

export default [
  // ── abre parada: no print, pela URL em cada momento e em cada estado da coluna ──
  ...['', ...Object.values(M).map((m) => `&momento=${m}`), ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T10${q}&print=1` }, ...PARADA]),
  ...['', ...Object.values(M).map((m) => `&momento=${m}`), ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T10${q}` }, ...PARADA]),
  { abre: `?tela=T10&momento=${M.digitado}` },
  { quieto: true },
  { ve: 'Semear o hodômetro' },                                    // o número digitado basta (decisão 52)
  { naoVe: 'Fotografar o painel' },

  // ── o campo do painel (T10·1): o traço acende por cima da borda, e nada sai do lugar ──
  { abre: '?tela=T10' },
  { quieto: true },
  { marcaLugar: true },
  { foca: 'O PAINEL MOSTRA', teclado: 'numerico' },
  { anima: [TRACO] },
  { mesmoLugar: true },
  // o primário diz o que falta: com o número, o Semear acende (decisão 52) e o texto novo esmaece no lugar (C12·23)
  { digita: '482317', em: 'O PAINEL MOSTRA' },
  { anima: [TEXTO] },
  { ve: 'Semear o hodômetro' },
  { chega: 'T10', momento: M.digitado },
  { dorme: 250 },
  { quieto: true },

  // ── o semear (T10·3 a T10·5) ──
  // o toque apaga o primário sem o roxo por cima, e o texto novo esmaece no lugar
  { toca: 'Semear o hodômetro', anima: [TEXTO], naoAnima: SEM_ROXO },
  { desligado: 'Gravando no módulo…' },
  { desligado: 'Voltar ao menu' },
  { desligado: 'ENCERRAR' },
  { dorme: 250 },
  { quieto: true },
  { desligado: 'Relendo…', entre: [550, 950] },                   // 1 s de gravação, linear: é o ritmo
  { anima: [TEXTO] },
  { dorme: 250 },
  { quieto: true },
  // a releitura chega (1 s de releitura): em sequência (T10·4 a, C12·34 a) — primeiro o tambor, e a régua
  // ainda com a diferença; o veredito ainda não
  { chega: 'T10', momento: M.semeado, entre: [550, 950] },
  { anima: ROLA, naoAnima: [...SAI, ACENDE, ENTRA, ...TROCA] },   // o endereço que passa ao 01 não é troca
  { desligado: 'Relendo…' },
  { desligado: 'ENCERRAR' },
  { ve: 'diferença de 297.997 km' },
  { dorme: 300 },
  { anima: [{ ...RODA, atraso: 200 }], naoAnima: [...SAI, ENTRA] },   // aos ~350: a última rodinha rola, e a régua espera
  // o tambor parou (500): a diferença encolhe e esmaece em 300, e o veredito ainda não
  { dorme: 250 },
  { anima: SAI, naoAnima: [RODA, ACENDE, ENTRA] },
  { naoVe: 'O MÓDULO CONTA AGORA', ms: 100 },
  // no fim dos 300 (aos 800), o veredito assenta: o confere na régua, o poço aceso, o alvo cumprido, o primário que acende
  { ve: 'O MÓDULO CONTA AGORA', entre: [60, 330] },
  { anima: [ENTRA, TEXTO], naoAnima: [ACENDE] },
  { ve: 'relido às 14:30 · confere com o painel' },
  { ve: 'o mesmo que o módulo agora conta' },
  { ve: '482.317' },
  { dorme: 400 },
  { quieto: true },                                               // o tambor acabou (500), e nada fica vivo
  // o passo seguinte (C12·4): o título, o miolo e o rodapé trocam inteiros
  { toca: 'Calibrar o horímetro', anima: TROCA, naoAnima: [TEXTO, ACENDE, RODA] },   // o poço do passo novo nasce parado
  { chega: 'T10', momento: M.horimetro },
  { ve: 'Opcional · o último passo' },
  { dorme: 250 },
  { quieto: true },

  // ── o horímetro, até a calibração completa ──
  { ve: 'Opcional · o último passo' },
  { ve: 'Pular o horímetro' },
  { digita: '9640', em: 'O PAINEL MOSTRA' },
  { anima: [TEXTO] },
  { dorme: 250 },
  { toca: 'Semear o horímetro', anima: [TEXTO], naoAnima: SEM_ROXO },
  { desligado: 'Pular o horímetro' },                              // o semear não para: o link do passo, apagado
  { chega: 'T10', momento: M.completa, entre: [1700, 2400] },
  { anima: [{ ...RODA, atraso: 0 }], naoAnima: [...SAI, ACENDE] },   // o tambor primeiro (4 rodinhas, 420), e a régua depois
  { naoVe: 'Calibração completa', ms: 100 },
  { ve: 'Calibração completa', entre: [520, 900] },               // a legenda assenta junto com o veredito, no fim da régua (~720)
  { anima: [ENTRA, TEXTO], naoAnima: [ACENDE] },
  { ve: '9.640' },
  { ve: 'Voltar ao menu' },
  { dorme: 400 },
  { quieto: true },
  // a calibração completa aponta o ciclo: a troca entre telas
  { toca: 'Fazer o ciclo de testes', anima: TROCA },
  { chega: 'T14' },

  // ── o Pular o horímetro (D1): do semeado e do passo do horímetro, segue pro ciclo ──
  { abre: `?tela=T10&momento=${M.semeado}` },
  { quieto: true },
  { toca: 'Pular o horímetro', anima: TROCA },
  { chega: 'T14' },
  { abre: `?tela=T10&momento=${M.horimetro}` },
  { quieto: true },
  { toca: 'Pular o horímetro', anima: TROCA },
  { chega: 'T14' },

  // ── com reduzir movimento: tudo direto, e o semear no mesmo ritmo ──
  { reduzir: true },
  { abre: '?tela=T10' },
  { quieto: true },
  { foca: 'O PAINEL MOSTRA' },
  { quieto: true },
  { digita: '482317', em: 'O PAINEL MOSTRA' },
  { quieto: true },
  { toca: 'Semear o hodômetro' },
  { quieto: true },
  { desligado: 'Relendo…', entre: [800, 1300] },
  { quieto: true },
  { chega: 'T10', momento: M.semeado, entre: [800, 1300] },
  { quieto: true },
  { ve: 'O MÓDULO CONTA AGORA', entre: [0, 300] },               // o veredito assenta logo
  { quieto: true },
  { toca: 'Calibrar o horímetro' },
  { quieto: true },
  { chega: 'T10', momento: M.horimetro },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna, a volta ao fluxo e o pulo abrem parados ──
  { abre: '?tela=T10' },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Releitura não confere' },
  { chega: 'T10', estado: ESTADOS[3] },
  ...PARADA,
  { palco: 'Já semeado' },
  { chega: 'T10', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T10', estado: null },
  ...PARADA,
  { abre: '?tela=T04' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T10' },
  { chega: 'T10' },
  ...PARADA,
]
