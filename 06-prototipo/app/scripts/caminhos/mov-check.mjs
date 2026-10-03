// C12 · as peças do movimento · o check (gate C12·7, 8, 9, 12, 13, 18, 23, 32, 35 e 44; a
// vitrine: src/vitrine/especimes/mov-check.jsx). Cada espécime abre parado — nada anima ao
// abrir —, e cada toque da bancada faz o que a tela fará:
// · a linha que conclui: o glifo novo esmaece no poço em 150 (o Glifo · esmaece), e o que
//   chega com a leitura — o valor, a causa — esmaece junto; o título e a cor trocam direto;
// · a linha com contagem, o elo da cadeia e o passo do encerramento: o mesmo glifo; o trilho
//   da cadeia acende de cima pra baixo em 300 (scaleY), e o do encerramento não;
// · a recusa da cadeia (C12·13, sem porta no palco): o xis e o aviso que surge, em 150;
// · o requisito da senha: a marca ganha o check, em 150, e a volta é igual;
// · o primário: o que acende por camada no diálogo com ciência (C12·8), o texto que troca
//   no lugar (C12·23), e o toque que o desabilita sem o roxo por cima (C12·18);
// · o veredito que espera a prova (C12·35, C12·44): a caixa neutra no lugar desde o começo,
//   a contagem acompanhando as linhas no ritmo de ritmos.js, e a palavra e a cor entrando
//   em 150 com a última linha.
// Com reduzir movimento, nada anima, e os processos seguem no mesmo ritmo.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const V = (id) => ({ abre: `?vitrine=1&especime=${id}` })
const GLIFO = { prop: 'opacity', ms: 150, em: 'ds-glifo', curva: C }
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const CHECKBOX_SOLTA = { prop: 'opacity', ms: 100, em: 'ds-checkbox', curva: C }   // o pressionado do checkbox solta em 100, como a linha (C12·17, G14 a · o conserto de 27/09)
const ROXO = { prop: 'opacity', em: 'ds-primario-desabilitado' }   // o roxo do pressionado por cima do desabilitado (C12·18)

export default [
  // ── a linha que conclui (C12·7, C12·12, C12·29) ──
  V('mov-check-linha'),
  { quieto: true },
  { toca: 'bancada · avança', anima: [GLIFO] },                                    // o quadrado de agora entra no poço
  { dorme: 200 },
  { quieto: true },                                                                // acabou, nada fica vivo (C12·19)
  { toca: 'bancada · avança', anima: [GLIFO, esmaece('ds-checagem-valor')] },      // o check, com o valor lido
  { ve: 'VL06 FULL' },
  { dorme: 200 },
  { toca: 'bancada · avança', anima: [GLIFO, esmaece('ds-checagem-causa'), esmaece('ds-checagem-valor')] },   // a reprova: o xis, a causa e o valor
  { ve: 'homologadas 2.2.0 e 2.3.5' },
  { dorme: 200 },
  { toca: 'bancada · abre de novo', naoAnima: [{ prop: 'opacity' }] },             // aberta já lida: parada
  { quieto: true },
  { ve: 'homologadas 2.2.0 e 2.3.5' },

  // ── a linha com contagem (T03) ──
  V('mov-check-contagem'),
  { quieto: true },
  { toca: 'bancada · termina', anima: [GLIFO] },
  { ve: '10 de 10' },

  // ── a cadeia (T09): o elo relido e o trilho que acende; a recusa, com o aviso que surge (C12·13) ──
  V('mov-check-cadeia'),
  { quieto: true },
  { toca: 'bancada · relê', anima: [GLIFO, { prop: 'transform', ms: 300, em: 'ds-trilho', curva: C }] },
  { dorme: 350 },
  { quieto: true },
  { toca: 'bancada · recusa', anima: [GLIFO, esmaece('ds-aviso')] },
  { ve: 'A CADEIA PAROU' },
  { dorme: 200 },
  { quieto: true },

  // ── o encerramento (T16): o check do passo, sem o trilho que acende (C12·32) ──
  V('mov-check-encerramento'),
  { quieto: true },
  { toca: 'bancada · conclui', anima: [GLIFO], naoAnima: [{ prop: 'transform', em: 'ds-trilho' }] },

  // ── o requisito da senha (T01): a marca ganha o check e o texto clareia; a volta é igual (C12·6) ──
  V('mov-check-requisito'),
  { quieto: true },
  { toca: 'bancada · cumpre', anima: [esmaece('ds-requisito')] },
  { dorme: 200 },
  { toca: 'bancada · cumpre', anima: [esmaece('ds-requisito')] },

  // ── o primário que acende por camada (C12·8, T13·6): o Finalizar do diálogo com ciência ──
  V('mov-check-ciencia'),
  { quieto: true },
  { desligado: 'Finalizar instalação' },
  { toca: 'Estou ciente', anima: [esmaece('ds-quadrado'), esmaece('ds-primario-antes'), CHECKBOX_SOLTA] },
  { toca: 'Finalizar instalação', ms: 1000 },                                       // aceso: responde
  { dorme: 200 },
  { toca: 'Estou ciente', anima: [CHECKBOX_SOLTA], naoAnima: [ROXO, { prop: 'opacity', em: 'ds-primario-antes' }] },   // desmarcar: apaga direto
  { desligado: 'Finalizar instalação' },

  // ── o texto do primário que troca no lugar (C12·23, T02): o roxo troca direto, sem camada ──
  V('mov-check-primario-texto'),
  { quieto: true },
  { desligado: 'Escolha uma unidade' },
  { toca: 'Garagem Várzea', anima: [esmaece('ds-primario-texto')], naoAnima: [{ prop: 'opacity', em: 'ds-primario-antes' }] },
  { ve: 'Sincronizar Garagem Várzea' },
  { dorme: 200 },
  { toca: 'Garagem Ibura', anima: [esmaece('ds-primario-texto')] },
  { ve: 'Sincronizar Garagem Ibura' },

  // ── o botão que diz o que falta (C12·23 e C12·18, T13): o toque que desabilita não deixa o roxo por cima ──
  V('mov-check-primario-falta'),
  { quieto: true },
  { toca: 'Fotografar o problema', anima: [esmaece('ds-primario-texto')], naoAnima: [ROXO] },
  { desligado: 'Conte o que aconteceu' },
  { toca: 'bancada · conta', anima: [esmaece('ds-primario-texto')] },
  { ve: 'Salvar com ressalva' },

  // ── o veredito que espera a prova (T11/04, o pacote 5): a caixa diz CONFERINDO, a contagem, e a palavra na quinta ──
  V('mov-check-veredito'),
  { quieto: true },
  { ve: 'CONFERINDO' },                                                           // a caixa diz o que corre
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  { naoVe: '1 de 4' },                                                             // nada conta de zero
  { toca: 'bancada · confere' },
  { ve: '1 de 4', entre: [300, 650] },                                             // a primeira linha, aos 400
  { anima: [GLIFO] },
  { ve: 'conferindo' },                                                            // a linha da vez, com o quadrado de agora
  { ve: '3 de 4', entre: [1000, 1500] },                                           // a quarta linha: o Extended ID não conta (o pacote 2)
  { naoVe: 'NÃO BATE COM O CADASTRO' },
  { ve: 'NÃO BATE COM O CADASTRO', entre: [250, 600] },                            // a quinta: o veredito entra
  { anima: [esmaece('ds-aviso-titulo'), esmaece('ds-aviso-capa'), esmaece('ds-poco')] },  // a palavra, a cor do traço por camada, o poço com o xis
  { naoVe: 'CONFERINDO' },
  { ve: '4 de 4' },
  { dorme: 200 },
  { quieto: true },
  { toca: 'bancada · abre de novo', naoAnima: [{ prop: 'opacity' }] },             // nascida lida: o veredito, parado
  { quieto: true },
  { ve: 'NÃO BATE COM O CADASTRO' },

  // ── o veredito que confere (T11/02): o lima do traço por camada ──
  V('mov-check-veredito-confere'),
  { quieto: true },
  { toca: 'bancada · confere' },
  { ve: '1 de 4', entre: [300, 650] },
  { ve: 'CONFERE COM O CADASTRO', entre: [1400, 2100] },
  { anima: [esmaece('ds-aviso-titulo'), esmaece('ds-aviso-capa')] },
  { naoVe: 'igual à do cadastro' },

  // ── com reduzir movimento: nada anima, e os processos seguem no mesmo ritmo ──
  { reduzir: true },
  V('mov-check-linha'),
  { toca: 'bancada · avança' },
  { quieto: true },
  { toca: 'bancada · avança' },
  { quieto: true },
  V('mov-check-cadeia'),
  { toca: 'bancada · relê' },
  { quieto: true },
  { toca: 'bancada · recusa' },
  { quieto: true },
  V('mov-check-ciencia'),
  { toca: 'Estou ciente' },
  { quieto: true },
  V('mov-check-primario-falta'),
  { toca: 'Fotografar o problema', naoAnima: [ROXO] },
  { quieto: true },
  V('mov-check-veredito'),
  { toca: 'bancada · confere' },
  { ve: '1 de 4', entre: [300, 650] },
  { quieto: true },
  { ve: '3 de 4', entre: [1000, 1500] },
  { ve: 'NÃO BATE COM O CADASTRO', entre: [250, 600] },
  { quieto: true },
  { reduzir: false },
]
