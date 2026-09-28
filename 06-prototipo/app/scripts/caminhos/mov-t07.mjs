// T07 · o movimento dos dados da CAN (02-telas/T07-dados-da-can/animacao.md; gate C12·30 e C12·31).
// A leitura corre na chegada da T06 — o ativo que o Usar este ativo acabou de confirmar —,
// depois da troca entre telas (150), e no Ler novamente: um sinal a cada 600 ms
// (RITMOS.leituraCanSinalMs), na ordem da tela. Cada sinal que chega:
//   · a leitura grande e as pequenas: o valor troca no lugar, e o marcador corre do
//     começo da escala até o valor, em 300, desacelerando (T07·1);
//   · o hodômetro: as rodinhas rolam da casa 0, 300 cada, de 40 em 40, a unidade
//     primeiro (T07·2);
//   · a contagem do cabeçalho troca no lugar, sem animar (T07·3);
//   · o sinal fora da faixa: a borda vermelha, por uma camada, e a causa esmaecem em
//     150; o lugar da causa abre direto (T07·4, G24);
//   · o liga-desliga: o valor troca no lugar, e o check esmaece em 150 (C12·30).
// O veredito espera a prova: o reprovado entra no cabeçalho com o sinal que falha, e
// o primário, apagado com o texto dele enquanto lê, acende por uma camada no fim (C12·8).
// O texto do primário que troca na frente de quem olha — o Configurar módulo que vira o
// Ler novamente com o sinal que falha, e o Ler novamente que volta ao Configurar módulo —
// esmaece no lugar, em 150, com o roxo direto (C12·23, o conserto de 27/09).
// Pelo menu, depois da T08, pela URL, pelo palco, na coluna e no print: a tela nasce
// lida, parada. Com reduzir movimento, o mesmo ritmo, e nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const TROCA = [{ prop: 'opacity', ms: 150, em: 'tela-miolo', curva: C }, { prop: 'opacity', ms: 150, em: 'ds-rodape', curva: C }]
const CORRE = { prop: 'transform', ms: 300, em: 'ds-escala-agulha', curva: C }
const ROLA = [
  { prop: 'transform', ms: 300, atraso: 0, em: 'ds-roda-fita', curva: C },
  { prop: 'transform', ms: 300, atraso: 40, em: 'ds-roda-fita', curva: C },
  { prop: 'transform', ms: 300, atraso: 200, em: 'ds-roda-fita', curva: C },
]
const CHECK = { prop: 'opacity', ms: 150, em: 'ds-icone-mini', curva: C }   // o check do sinal (ds-sinais-nasce)
const ACENDE = { prop: 'opacity', ms: 150, em: 'ds-primario-antes', curva: C }
const TEXTO = { prop: 'opacity', ms: 150, em: 'ds-primario-texto', curva: C }   // o texto do primário que troca no lugar (C12·23)
const BORDA = { prop: 'opacity', ms: 150, em: 'ds-leitura-borda', curva: C }
const CAUSA = { prop: 'opacity', ms: 150, em: 'ds-leitura-causa', curva: C }
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]   // C12·18
// o ritmo: 600 por sinal, medido a partir do passo de antes (a régua leva uns 20 a 60 ms em cada passo)
const SINAL = [480, 760]

// da lista da T06 (a semente: Várzea, o M2C-0417, sem ativo) até a confirmação do ônibus
const ATE_A_CONFIRMACAO = (placa) => [
  { abre: '?tela=T06' },
  { quieto: true },
  { marca: placa },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { dorme: 250 },
]

export default [
  // ── abre parada: pela URL, em cada estado, no print ──
  { abre: '?tela=T07' },
  { quieto: true },
  { ve: '7 de 12' },
  { ve: '13,8' },
  { ouve: '184.320 km' },
  { dorme: 700 },
  { quieto: true },
  { ve: '7 de 12' },
  { abre: '?tela=T07&estado=01-estado-fora-da-faixa' },
  { quieto: true },
  { ve: '1 reprovado' },
  { dorme: 700 },
  { quieto: true },
  { abre: '?tela=T07&estado=02-estado-sem-leitura' },
  { quieto: true },
  { ve: 'sem leitura · ligação' },
  { dorme: 700 },
  { quieto: true },
  { abre: '?tela=T07&estado=03-estado-dominio-mudo' },
  { quieto: true },
  { dorme: 700 },
  { quieto: true },
  // no print, cada quadro de referência: nada se move
  ...['', '&estado=01-estado-fora-da-faixa', '&estado=02-estado-sem-leitura', '&estado=03-estado-dominio-mudo']
    .flatMap((e) => [{ abre: `?tela=T07${e}&print=1` }, { quieto: true }, { dorme: 700 }, { quieto: true }]),

  // ── a chegada da T06, tudo aprovado (o RKT-8H42): a troca, e os sete sinais no ritmo ──
  ...ATE_A_CONFIRMACAO('RKT-8H42'),
  { toca: 'Usar este ativo', anima: TROCA },
  { chega: 'T07', momento: null },
  // o quadro de começo (C12·31): o valor em traço, as rodinhas na casa 0, a contagem em 0, o primário apagado
  { ve: '0 de 12' },
  { ouve: '— km' },
  { naoVe: '13,8' },
  { desligado: 'Configurar módulo' },
  // a bateria: 150 da troca + 600
  { ve: '13,8', entre: [560, 860] },
  { anima: [CORRE] },
  { ve: '1 de 12' },
  // o hodômetro: as rodinhas rolam
  { ouve: '184.320 km', entre: SINAL },
  { anima: ROLA },
  { ve: '2 de 12' },
  // a temperatura, os satélites e o combustível: o marcador de cada uma corre
  { ve: '3 de 12', entre: SINAL },
  { anima: [CORRE] },
  { ve: '4 de 12', entre: SINAL },
  { anima: [CORRE] },
  { ve: '5 de 12', entre: SINAL },
  { anima: [CORRE] },
  // a ignição e a posição: o check esmaece
  { ve: 'ligada', entre: SINAL },
  { anima: [CHECK] },
  { ve: '6 de 12' },
  { desligado: 'Configurar módulo' },
  // a posição, o último: o check, e o primário acende por uma camada, com o mesmo texto
  { ve: 'fixa', entre: SINAL },
  { anima: [CHECK, ACENDE], naoAnima: [TEXTO] },
  { ve: '7 de 12' },
  { dorme: 400 },
  { quieto: true },
  { dorme: 700 },
  { quieto: true },   // acabou: nada mais chega
  { ve: '7 de 12' },
  // pelo menu, a leitura feita fica: nasce lida, parada
  { toca: 'Voltar ao menu', anima: [TROCA[0]] },   // o menu não tem rodapé
  { chega: 'T04' },
  { toca: 'Entendi' },                              // o aviso do acesso, na primeira chegada ao menu (T04/12)
  { dorme: 250 },
  { toca: 'Dados da CAN', anima: TROCA },
  { chega: 'T07' },
  { dorme: 250 },
  { quieto: true },
  { ve: '7 de 12' },
  { ve: '13,8' },
  { dorme: 700 },
  { quieto: true },
  // depois da T08: também nasce lida
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { dorme: 250 },
  { toca: 'Refazer leitura' },
  { chega: 'T08' },
  { toca: 'Refazer a leitura' },
  { chega: 'T08', momento: '02-momento-concluida', ms: 12000 },
  { dorme: 250 },
  { toca: 'Ver os dados da CAN', anima: TROCA },
  { chega: 'T07' },
  { dorme: 250 },
  { quieto: true },
  { ve: '7 de 12' },
  { dorme: 700 },
  { quieto: true },

  // ── a chegada da T06 com a bateria fora (o QJF-2C61): o reprovado entra com a prova ──
  ...ATE_A_CONFIRMACAO('QJF-2C61'),
  { toca: 'Usar este ativo', anima: TROCA },
  { chega: 'T07', momento: null },
  { ve: '0 de 12' },
  { naoVe: 'reprovado' },
  { desligado: 'Configurar módulo' },
  // a bateria chega fora: a borda vermelha e a causa esmaecem, o marcador corre, o cabeçalho diz o reprovado,
  // e o primário apagado troca o Configurar módulo pelo Ler novamente, o texto esmaecendo no lugar (C12·23)
  { ve: '1 reprovado', entre: [560, 860] },
  { anima: [BORDA, CAUSA, CORRE, TEXTO], naoAnima: [ACENDE] },
  { ve: 'veículo ou cadastro' },
  { desligado: 'Ler novamente' },
  { ve: 'ligada', ms: 6000 },
  { anima: [CHECK] },
  { ve: 'fixa', entre: SINAL },
  { anima: [CHECK, ACENDE] },
  { ve: '1 reprovado' },
  { dorme: 400 },
  { quieto: true },
  // Ler novamente: o quadro de começo de uma vez, e a leitura corre de novo, sem a troca (600 do toque)
  { toca: 'Ler novamente', anima: [TEXTO], naoAnima: [...SEM_ROXO, ACENDE] },   // o Configurar módulo apagado volta, o texto esmaecendo
  { ve: '0 de 12' },
  { naoVe: 'reprovado' },
  { naoVe: 'veículo ou cadastro' },
  { desligado: 'Configurar módulo' },
  { ve: '13,8', entre: [420, 700] },
  { anima: [CORRE] },
  { naoAnima: [BORDA] },
  { ve: '1 de 12' },
  { ouve: '201.115 km', entre: SINAL },   // o hodômetro do caso é do veículo, e fica (leitura.js)
  { anima: ROLA },
  { ve: 'fixa', ms: 6000 },
  { anima: [CHECK, ACENDE] },
  { ve: '7 de 12' },
  { dorme: 400 },
  { quieto: true },

  // ── o sinal que não chega (o PCX-9A17, os satélites): o reprovado entra no quarto ──
  ...ATE_A_CONFIRMACAO('PCX-9A17'),
  { toca: 'Usar este ativo', anima: TROCA },
  { chega: 'T07', momento: null },
  { ve: '3 de 12', ms: 4000 },
  { naoVe: 'reprovado' },
  { naoVe: 'sem leitura' },
  { ve: '1 reprovado', entre: SINAL },
  { ve: 'sem leitura · ligação' },
  { ve: 'fixa', ms: 4000 },
  { dorme: 400 },
  { quieto: true },

  // ── com reduzir movimento: o mesmo ritmo, e nada anda ──
  { reduzir: true },
  ...ATE_A_CONFIRMACAO('RKT-8H42'),
  { toca: 'Usar este ativo' },
  { chega: 'T07', momento: null },
  { quieto: true },
  { ve: '0 de 12' },
  { ve: '13,8', entre: [420, 700] },
  { quieto: true },
  { ouve: '184.320 km', entre: SINAL },
  // com reduzir, as rodinhas nascem com 0 ms e saem no animationend, um quadro depois (a peça, o Tambor): nada anda
  { dorme: 100 },
  { quieto: true },
  { ve: '3 de 12', entre: [380, 760] },
  { ve: '4 de 12', entre: SINAL },
  { ve: '5 de 12', entre: SINAL },
  { ve: 'ligada', entre: SINAL },
  { quieto: true },
  { ve: 'fixa', entre: SINAL },
  { quieto: true },
  { ve: '7 de 12' },
  { toca: 'Configurar módulo' },
  { chega: 'T09' },
  // o sinal fora da faixa (o QJF-2C61): a borda, a causa e o reprovado, direto, no mesmo ritmo
  ...ATE_A_CONFIRMACAO('QJF-2C61'),
  { toca: 'Usar este ativo' },
  { chega: 'T07', momento: null },
  { quieto: true },
  { ve: '1 reprovado', entre: [420, 700] },
  { ve: 'veículo ou cadastro' },
  { quieto: true },
  { ve: 'fixa', ms: 6000 },
  { quieto: true },
  { toca: 'Ler novamente' },
  { quieto: true },
  { ve: '0 de 12' },
  { ve: '13,8', entre: [420, 700] },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna, a volta ao fluxo e o pulo abrem parados ──
  { abre: '?tela=T07' },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Fora da faixa' },
  { chega: 'T07', estado: '01-estado-fora-da-faixa' },
  { quieto: true },
  { dorme: 700 },
  { quieto: true },
  { palco: 'Voltar ao fluxo' },
  { chega: 'T07', estado: null },
  { quieto: true },
  { dorme: 700 },
  { quieto: true },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T07' },
  { chega: 'T07' },
  { quieto: true },
  { ve: '7 de 12' },
  { dorme: 700 },
  { quieto: true },
]
