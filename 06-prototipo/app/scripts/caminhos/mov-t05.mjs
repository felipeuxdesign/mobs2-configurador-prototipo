// T05 · o movimento de conectar o módulo (02-telas/T05-conectar-modulo/animacao.md; gate C12·4,
// C12·9, C12·12, C12·14, C12·18, C12·20, C12·23, C12·24, C12·28, C12·29 e C12·41):
//   · o marcador de escolha (C12·20): tocar num módulo da lista, o quadrado lima surge; o primário
//     diz o serial dele, e o texto novo esmaece no lugar, com o roxo direto (C12·23, como a T02);
//   · a busca de novo (C12·41): da lista (01), o conteúdo esmaece pro quadro da busca (00) em 150;
//     aos 1,2 s (RITMOS.buscaMs), a lista volta — a frase e o rodapé esmaecem, e as cinco linhas
//     surgem em cascata, 150 cada, de 80 em 80 (C12·28). Do quadro da 00, o toque não troca o desenho;
//   · a troca de quadro (C12·4): conectar abre a pré-checagem, outra página; o Procurar outro
//     módulo volta pela busca de novo;
//   · a linha da pré-checagem (T05·3, T05·4): o quadrado de agora, e o check que nasce esmaece em
//     150, uma linha a cada 600 ms (C12·12);
//   · a reprova (T05·5, C12·29): o glifo, o valor e a causa trocam no lugar, esmaecendo em 150; a
//     parada: o aviso esmaece no topo (C12·9);
//   · a faixa (T05·6, C12·24): aprovada, ela desce em 200, por baixo da barra, que não se move, e o
//     miolo e a tira das leituras acompanham só por deslocamento; o Selecionar ativo, apagado com o
//     texto dele enquanto corre, acende por uma camada (C12·8); reprovada ou parada no caso, o
//     primário da saída acende com outro texto: o texto esmaece no lugar, e o roxo troca direto
//     (C12·23, a peça · o conserto de 27/09); o Acordar módulo que o apaga volta ao Selecionar
//     ativo do mesmo jeito, sem o roxo por cima (C12·18);
//   · entre quadros, só a troca esmaece: o texto do primário não esmaece de novo por dentro dela;
//   · o firmware (T05·7, C12·14): parado nos 62%, sem ritmo declarado.
// A tela abre parada pela URL, em cada momento e estado, e no print. Com reduzir, o mesmo ritmo, e
// nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em, extra = {}) => ({ prop: 'opacity', ms: 150, em, curva: C, ...extra })
const desliza = (em, ms = 150) => ({ prop: 'transform', ms, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]
const TEXTO = esmaece('ds-primario-texto')                 // o texto do primário que troca no lugar (C12·23)
const ACENDE = esmaece('ds-primario-antes')                // o primário que acende por uma camada (C12·8)
const CASCATA = [0, 80, 160, 240, 320].map((atraso) => esmaece('ds-linha-modulo', { atraso }))
const CHECK = esmaece('ds-glifo')
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]   // C12·18
const FAIXA = [desliza('ds-faixa ds-faixa-aberta', 200), desliza('tela-miolo', 200), desliza('ds-tira-leituras', 200)]
const PARADOS = [{ prop: 'opacity', em: 'ds-barra-sistema' }, { prop: 'transform', em: 'ds-barra-sistema' }, { prop: 'transform', em: 'ds-rodape' }]
const M01 = '01-momento-nenhum-escolhido'
const M05 = '05-momento-pre-checagem'

const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const MOMENTOS = [M01, '02-momento-um-encontrado', M05, '10-momento-atualizando-o-firmware']
const ESTADOS = [
  '03-estado-nenhum-encontrado', '04-estado-conexao-falhou', '06-estado-pre-checagem-serial-nao-cadastrado',
  '07-estado-pre-checagem-modelo-sem-driver', '08-estado-pre-checagem-firmware-fora-da-matriz', '09-estado-firmware-fora-sem-rede-no-modulo',
  '11-estado-pre-checagem-conteudo-nao-cabe', '12-estado-pre-checagem-pool-de-cercas-esgotado', '13-estado-pre-checagem-canal-aberto-e-pendencias',
  '14-estado-pre-checagem-link-perdido-na-6a', '15-estado-pre-checagem-modulo-em-repouso-na-9a', '16-estado-bluetooth-desligado', '17-estado-bluetooth-sem-permissao',
]

export default [
  // ── abre parada: pela URL, em cada momento e em cada estado, e no print ──
  { abre: '?tela=T05' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T05&momento=${m}` }, ...PARADA]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T05&estado=${e}` }, ...PARADA]),
  // no print, cada quadro de referência: nada se move
  { abre: '?tela=T05&print=1' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T05&momento=${m}&print=1` }, ...PARADA]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T05&estado=${e}&print=1` }, ...PARADA]),
  // o firmware (T05·7): sem ritmo declarado, fica nos 62%
  { abre: '?tela=T05&momento=10-momento-atualizando-o-firmware' },
  { dorme: 2500 },
  { ve: 'atualizando · 62%' },
  { quieto: true },

  // ── a lista (01): marcar, e o primário diz o serial ──
  { abre: `?tela=T05&momento=${M01}` },
  { quieto: true },
  { desligado: 'Conectar' },
  { toca: 'M2C-0417', anima: [...MARCA, TEXTO], naoAnima: [esmaece('ds-linha-modulo')] },   // marcar não repete a cascata
  { ve: 'Conectar ao M2C-0417' },
  { dorme: 250 },
  { toca: 'M2C-0394', anima: [...MARCA, esmaece('ds-quadrado'), TEXTO] },   // a que perde a marca: o mesmo ao contrário
  { ve: 'Conectar ao M2C-0394' },
  { dorme: 250 },
  { quieto: true },

  // ── a busca de novo (C12·41): 01 → o quadro da 00 → 01, com a cascata ──
  { toca: 'Procurar de novo', anima: TROCA, naoAnima: [TEXTO] },   // entre quadros, só a troca
  { chega: 'T05', momento: null },
  { ve: 'ESCOLHIDO' },
  { dorme: 250 },
  { quieto: true },   // o quadro da busca fica parado na tela
  { chega: 'T05', momento: M01, entre: [700, 1150] },
  { anima: [...TROCA, ...CASCATA], naoAnima: [TEXTO] },
  { desligado: 'Conectar' },   // volta sem nada escolhido
  { dorme: 600 },
  { quieto: true },
  // do quadro da 00 (a tela), o toque não troca o desenho: só a volta da lista esmaece, com a cascata
  { abre: '?tela=T05' },
  { quieto: true },
  { toca: 'Procurar de novo', naoAnima: [esmaece('tela-miolo')] },
  { chega: 'T05', momento: M01, entre: [1050, 1400] },
  { anima: [...TROCA, ...CASCATA] },
  { dorme: 600 },
  { quieto: true },

  // ── conectar: a troca de quadro, e a pré-checagem no ritmo de 600, com o check que nasce ──
  { toca: 'M2C-0417' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0417', anima: TROCA, naoAnima: SEM_ROXO },
  { chega: 'T05', momento: M05 },
  { desligado: 'Selecionar ativo' },
  { ve: 'VL06 CAN-BT', entre: [420, 760] },
  { anima: [CHECK] },
  { ve: '2 de 11', entre: [480, 760] },
  { anima: [CHECK] },
  { desligado: 'Selecionar ativo' },
  // a última linha passa e a pré-checagem aprova: a faixa desce, o miolo acompanha, e o primário acende
  { ve: 'ENCERRAR', entre: [4500, 6200] },
  { anima: [...FAIXA, ACENDE], naoAnima: [...PARADOS, TEXTO] },   // com o mesmo texto, só a camada (C12·8)
  { ve: '11 de 11' },
  { dorme: 400 },
  { quieto: true },
  { toca: 'Selecionar ativo', anima: TROCA },
  { chega: 'T06' },

  // ── a reprova (o M2C-0394, o 11): o glifo, o valor e a causa esmaecem no lugar ──
  { abre: `?tela=T05&momento=${M01}` },
  { toca: 'M2C-0394' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0394', anima: TROCA },
  { ve: 'não cabe', ms: 9000 },
  { anima: [esmaece('ds-checagem-causa'), esmaece('ds-checagem-valor'), CHECK] },
  // a última linha: a pré-checagem termina reprovada, e o Procurar outro módulo acende com outro texto:
  // o texto esmaece no lugar, e o roxo troca direto, sem camada (C12·23, o conserto de 27/09)
  { ve: 'Procurar outro módulo', entre: [1000, 2200] },
  { anima: [CHECK, TEXTO], naoAnima: [ACENDE] },
  { ve: '9 de 11' },
  { dorme: 400 },
  { quieto: true },
  { naoVe: 'ENCERRAR' },
  // Procurar outro módulo: a pré-checagem troca pro quadro da busca, e a lista volta em cascata
  { toca: 'Procurar outro módulo', anima: TROCA, naoAnima: [TEXTO] },
  { chega: 'T05', momento: null },
  { chega: 'T05', momento: M01, entre: [700, 1400] },
  { anima: [...TROCA, ...CASCATA], naoAnima: [TEXTO] },
  { dorme: 600 },
  { quieto: true },

  // ── a parada (o M2C-0335, o 15): o aviso esmaece no topo; Acordar segue dali ──
  { toca: 'M2C-0335' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0335', anima: TROCA },
  { ve: 'MÓDULO EM REPOUSO', entre: [0, 9000] },
  { anima: [esmaece('ds-aviso'), TEXTO], naoAnima: [ACENDE] },   // o aviso no topo, e o Acordar módulo acende com o texto novo esmaecendo (C12·23)
  { ve: '8 de 11' },
  { dorme: 400 },
  { quieto: true },
  { toca: 'Acordar módulo', anima: [TEXTO], naoAnima: [...SEM_ROXO, ACENDE, esmaece('tela-miolo')] },   // a mesma página: só a peça — o Selecionar ativo apagado, o texto esmaecendo
  { naoVe: 'MÓDULO EM REPOUSO' },
  { ve: 'ENCERRAR', entre: [1000, 2600] },
  { anima: [...FAIXA, ACENDE] },
  { dorme: 400 },
  { quieto: true },

  // ── com reduzir movimento: o mesmo ritmo, e nada anda ──
  { reduzir: true },
  { abre: `?tela=T05&momento=${M01}` },
  { quieto: true },
  { toca: 'M2C-0417' },
  { quieto: true },
  { toca: 'Procurar de novo' },
  { quieto: true },
  { chega: 'T05', momento: null },
  { chega: 'T05', momento: M01, entre: [700, 1250] },
  { quieto: true },
  { toca: 'M2C-0335' },
  { toca: 'Conectar ao M2C-0335' },
  { quieto: true },
  { ve: 'VL06 CAN-BT', entre: [420, 760] },
  { quieto: true },
  { ve: 'MÓDULO EM REPOUSO', ms: 9000 },
  { quieto: true },
  { toca: 'Acordar módulo' },
  { ve: 'ENCERRAR', entre: [1000, 2600] },
  { quieto: true },
  // a reprova: o glifo, a causa e o primário da saída, direto, no mesmo ritmo
  { abre: `?tela=T05&momento=${M01}` },
  { toca: 'M2C-0394' },
  { toca: 'Conectar ao M2C-0394' },
  { quieto: true },
  { ve: 'não cabe', ms: 9000 },
  { quieto: true },
  { ve: 'Procurar outro módulo', entre: [1000, 2200] },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: '?tela=T05' },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Em repouso' },
  { chega: 'T05', estado: '15-estado-pre-checagem-modulo-em-repouso-na-9a' },
  ...PARADA,
  { palco: 'Conteúdo não cabe' },
  { chega: 'T05', estado: '11-estado-pre-checagem-conteudo-nao-cabe' },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T05', estado: null },
  ...PARADA,
]
