// T16 · o movimento da sessão (02-telas/T16-sessao/animacao.md; gate C12·4, C12·8, C12·9, C12·12,
// C12·23, C12·25, C12·32, C12·38 e C12·44):
//   · o passo do encerramento (T16·1, C12·12): o check do passo que fecha e o quadrado do que começa
//     esmaecem no poço em 150, um passo a cada 600 ms (RITMOS.encerramentoPassoMs); o trilho troca
//     direto, não acende (C12·32); a legenda que passa ao passo que corre esmaece no lugar, e o
//     espaço muda direto (C12·9);
//   · o corte (01): o texto do primário apagado troca no lugar (C12·23);
//   · a passagem pra Sessão encerrada, e pra encerrada sem homologar (C12·4): o conteúdo esmaece em
//     150, como entre telas, pelo processo; a faixa aberta sobe em 200 por baixo da barra e revela a
//     sem sessão (T16·3, C12·25), e nada do miolo desliza;
//   · a assertiva do autoteste (T16·2, C12·12): o glifo e o valor lido esmaecem em 150, uma a cada
//     400 ms (RITMOS.autotesteAssertivaMs); com reduzir, em ordem, no mesmo ritmo (C12·38);
//   · o autoteste correndo (07, o pacote 5): sem veredito — a contagem ao lado do título, a da vez
//     com o quadrado de agora e *lendo*, o Voltar ao menu desligado; na última, o quadro troca pro
//     fim (02): o conteúdo e o rodapé esmaecem, como entre telas (C12·4), e nada desliza;
//   · entre quadros, só a troca esmaece: o rodapé nasce com o quadro.
// A tela abre parada pela URL (o 02 e o 04, que já acabaram), em cada estado e no print; o 00, o 01
// e o 03 pela URL correm desde o passo deles (G27, C12·16), sem animar a entrada.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const CHECK = esmaece('ds-glifo')
// o passo que fecha: o check lima no poço; e o quadrado de agora do que começa, que também esmaece (a
// peça, C12·20) — separados, pra um não passar pelo outro
const FECHOU = esmaece('ds-glifo-cor-lima')
const COMECA = esmaece('ds-glifo-agora')
const LEGENDA = esmaece('ds-encerramento-legenda')
const VALOR = esmaece('ds-checagem-valor')
const TEXTO = esmaece('ds-primario-texto')                 // o texto do primário que troca no lugar (C12·23)
const FAIXA_SOBE = { prop: 'transform', ms: 200, em: 'ds-faixa-aberta', curva: C }
const TRILHO = [{ prop: 'transform', em: 'ds-trilho' }]    // o trilho da T16 não acende (C12·32)
const NADA_DESLIZA = [{ prop: 'transform', em: 'tela-miolo' }, { prop: 'transform', em: 'ds-encerramento' }]
const PASSO = [420, 780]
const PRIMEIRO = [100, 780]   // o primeiro passo depois do abre: a régua já gastou parte dele
const ASSERTIVA = [250, 550]
const M01 = '01-momento-pede-o-corte-de-alimentacao'
const M02 = '02-momento-sessao-encerrada'
const M03 = '03-momento-encerrando-sem-homologar'
const M04 = '04-momento-encerrada-sem-homologar'
const M07 = '07-momento-autoteste-correndo'
const ESTADOS = ['05-estado-assertiva-falhando', '06-estado-sessao-interrompida']
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]

export default [
  // ── abre parada: pela URL, o que já acabou, e cada estado; no print, cada quadro ──
  { abre: `?tela=T16&momento=${M02}` },
  ...PARADA,
  { ve: 'A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO' },
  { abre: `?tela=T16&momento=${M04}` },
  ...PARADA,
  // a 07 pela URL: parada nos Pontos de cerca
  { abre: `?tela=T16&momento=${M07}` },
  ...PARADA,
  { ve: '4 de 8' },
  { ve: 'lendo' },
  { naoVe: 'A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO' },
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T16&estado=${e}` }, ...PARADA]),
  ...['', `&momento=${M01}`, `&momento=${M02}`, `&momento=${M03}`, `&momento=${M04}`, `&momento=${M07}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T16${q}&print=1` }, ...PARADA]),

  // ── os sete passos, desde o passo 1 (G27): a entrada fica parada ──
  { abre: '?tela=T16' },
  { quieto: true },
  { ve: '1 de 8' },
  { desligado: 'Encerrando · não desconecte' },
  // o passo 1 fecha: o check esmaece, e o 2 começa, por comando, sem legenda (T16·7)
  { ve: '2 de 8', entre: PRIMEIRO },
  { anima: [FECHOU, COMECA], naoAnima: [...TRILHO, LEGENDA] },
  // o 2 fecha, e a legenda passa à releitura: esmaece no lugar, e nada desliza (C12·9)
  { ve: '3 de 8', entre: PASSO },
  { anima: [FECHOU, COMECA, LEGENDA], naoAnima: [...TRILHO, ...NADA_DESLIZA] },
  { ve: '4 de 8', entre: PASSO },
  { anima: [FECHOU, COMECA, LEGENDA], naoAnima: TRILHO },
  { dorme: 250 },
  { quieto: true },
  // a sessão fecha: o conteúdo esmaece pra Sessão encerrada, pelo processo, e a faixa aberta sobe
  { ve: 'Sessão encerrada', entre: [1800, 3000] },
  { anima: [...TROCA, FAIXA_SOBE], naoAnima: NADA_DESLIZA },
  { chega: 'T16', momento: M07 },
  { ve: 'Sem sessão de configuração' },
  // o autoteste correndo (07): sem o veredito, e o Voltar ao menu no lugar, desligado
  { naoVe: 'A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO' },
  { desligado: 'Voltar ao menu' },
  { dorme: 150 },
  // cada assertiva: o glifo e o valor esmaecem; a contagem sobe ao lado do título
  { ve: '1 de 8', entre: [100, 550] },
  { anima: [CHECK, VALOR], naoAnima: [esmaece('tela-miolo')] },
  { ve: '2 de 8', entre: ASSERTIVA },
  { anima: [CHECK, VALOR] },
  { ve: '7 de 8', entre: [1700, 2300] },
  { anima: [CHECK, VALOR] },
  // a oitava: o quadro troca pro fim (02) — a prova e o Voltar ao menu aceso vêm com ele (C12·4)
  { ve: 'A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO', entre: ASSERTIVA },
  { anima: TROCA, naoAnima: NADA_DESLIZA },
  { chega: 'T16', momento: M02 },
  { dorme: 300 },
  { quieto: true },
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },   // o menu não tem rodapé
  { chega: 'T04' },

  // ── o corte (01): o texto do primário apagado troca no lugar; o 3 ganha a legenda ──
  { abre: `?tela=T16&momento=${M01}` },
  { quieto: true },
  { desligado: 'Aguardando o módulo voltar' },
  { ve: 'é com você' },
  { desligado: 'Encerrando · não desconecte', entre: PRIMEIRO },
  { anima: [TEXTO, FECHOU, COMECA, LEGENDA], naoAnima: [esmaece('tela-miolo'), ...TRILHO] },
  { chega: 'T16', momento: null },

  // ── os 4 passos sem homologar (03 → 04): o check e a legenda; a troca pra encerrada sem homologar ──
  { abre: `?tela=T16&momento=${M03}` },
  { quieto: true },
  { ve: '0 de 4' },
  { ve: '1 de 4', entre: PRIMEIRO },
  { anima: [FECHOU, COMECA, LEGENDA], naoAnima: TRILHO },
  { ve: '2 de 4', entre: PASSO },
  { anima: [FECHOU, COMECA, LEGENDA] },
  { chega: 'T16', momento: M04, entre: [900, 1600] },
  { anima: [...TROCA, FAIXA_SOBE], naoAnima: NADA_DESLIZA },
  { ve: 'SEM HOMOLOGAR' },
  { dorme: 300 },
  { quieto: true },
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },   // o menu não tem rodapé
  { chega: 'T04' },

  // ── com reduzir movimento: o mesmo ritmo, em ordem, e nada anda (C12·38) ──
  { reduzir: true },
  { abre: '?tela=T16' },
  { quieto: true },
  { ve: '2 de 8', entre: PRIMEIRO },
  { quieto: true },
  { ve: '3 de 8', entre: PASSO },
  { quieto: true },
  { ve: 'Sessão encerrada', entre: [2000, 3100] },
  { quieto: true },
  { desligado: 'Voltar ao menu' },
  { ve: '1 de 8', entre: [100, 550] },
  { quieto: true },
  { ve: '2 de 8', entre: ASSERTIVA },
  { quieto: true },
  { toca: 'Voltar ao menu', entre: [2000, 3000] },
  { chega: 'T04' },
  { quieto: true },
  { abre: `?tela=T16&momento=${M01}` },
  { desligado: 'Encerrando · não desconecte', entre: PRIMEIRO },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: `?tela=T16&momento=${M02}` },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Assertiva falhando' },
  { chega: 'T16', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Sessão interrompida' },
  { chega: 'T16', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T16', estado: null },
  ...PARADA,
]
