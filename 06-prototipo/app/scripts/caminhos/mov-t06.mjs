// T06 · o movimento de selecionar o ativo (02-telas/T06-selecionar-ativo/animacao.md; gate C12·4,
// C12·8, C12·10, C12·18 e C12·20; o pacote 1, decisão 46):
//   · o marcador de escolha: tocar num ônibus, o quadrado lima surge (opacidade e escala, 150);
//     o que perde a marca faz o contrário (C12·20, a peça); o Usar este ativo, que passa a valer com
//     o mesmo texto, acende por uma camada (C12·8, como o Ver as unidades da T02 — a revisão de 27/09);
//   · a lista que a busca filtra: o que fica desliza pro lugar novo, o que sai esmaece por cima
//     (a cópia), o que volta esmaece no lugar, em 150 (C12·10, useReorganiza);
//   · a troca de quadro (C12·4): a lista que vira *Confirmar o vínculo*, e a volta, e a trava que
//     o leitor sem fio resolve (05 → 01), e a placa de outro pacote que a busca acha (a trava 04): o
//     conteúdo esmaece em 150, como entre telas, sem a lista andar por cima. Os dados do modelo chegam
//     com ele, e não esmaecem de novo por dentro;
//   · o vínculo confirmado: `Vincular o módulo` leva à T09, no que vai ser gravado (05) — a
//     instalação nova, o padrão (D1);
//   · o 10 e o 11, os avisos do vínculo, abrem só pela coluna, parados: o aviso chega com o quadro
//     (animacao.md, a nota no protótipo), e nada anda.
// A tela abre parada pela URL, em cada momento e estado, e no print. Com reduzir, nada anda.
// Com o pacote 1 saíram a confirmação manual do sem chassi (o 03, o KNB-5H39 com a caixa) e o
// pedido de correção (o 02 e o 07, o RDF-3R14 pela porta da Ibura); e a T06 passou a vir depois do
// diagnóstico: da T05, `Conectar ao …` abre a T07, e o `Selecionar ativo` dela, com as sete linhas
// passadas, abre a T06.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const TROCA = [{ prop: 'opacity', ms: 150, em: 'tela-miolo', curva: C }, { prop: 'opacity', ms: 150, em: 'ds-rodape', curva: C }]
const desliza = (em) => ({ prop: 'transform', ms: 150, em, curva: C })
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]
const ACENDE = esmaece('ds-primario-antes')
const SAI = 'ds-reorganiza-sai'
const LAYOUT = ['height', 'top', 'margin-top', 'margin-bottom', 'padding-top', 'max-height'].map((prop) => ({ prop }))
const BUSCA = 'Buscar placa, frota ou módulo'
const FICA = 'O M2C-0417 fica neste ativo, na Viação Atlântico Sul.'
// os dados do modelo e o aviso nascem com o quadro: nada esmaece de novo dentro dele
const DENTRO = [esmaece('ds-dados-modelo'), esmaece('ds-aviso')]

const PARADA = [{ quieto: true }, { dorme: 600 }, { quieto: true }]
const MOMENTOS = ['01-momento-confirmar-o-veiculo', '08-momento-busca-sem-resultado', '09-momento-busca-esconde-a-escolha']
const ESTADOS = ['04-estado-fora-do-pacote', '05-estado-conflito-de-pinos-resolvivel', '06-estado-conflito-de-pinos-sem-saida',
  '10-estado-modulo-em-outro-ativo', '11-estado-modulo-ja-deste-ativo']

export default [
  // ── abre parada: pela URL, em cada momento e em cada estado, e no print ──
  { abre: '?tela=T06' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T06&momento=${m}` }, { chega: 'T06', momento: m }, ...PARADA]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T06&estado=${e}` }, ...PARADA]),
  // no print, cada quadro de referência: nada se move
  { abre: '?tela=T06&print=1' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T06&momento=${m}&print=1` }, ...PARADA]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T06&estado=${e}&print=1` }, ...PARADA]),

  // ── os avisos do vínculo (10, 11): parados, com o aviso no quadro, e o app sem toque (o palco) ──
  { abre: '?tela=T06&estado=10-estado-modulo-em-outro-ativo' },
  { ve: 'O M2C-0417 ESTÁ NO QTM-5S79' },
  { ve: 'O M2C-0417 passa a ficar neste ativo, na Viação Atlântico Sul.' },
  { ve: 'Desvincular e vincular aqui' },
  { quieto: true },
  { abre: '?tela=T06&estado=11-estado-modulo-ja-deste-ativo' },
  { ve: 'O M2C-0417 JÁ É DESTE ATIVO' },
  { ve: 'O vínculo já existe — nada muda nele.' },
  { ve: 'Seguir pra manutenção' },
  { quieto: true },

  // ── o marcador (C12·20) e a lista que filtra (C12·10) ──
  { abre: '?tela=T06' },
  { quieto: true },
  { desligado: 'Usar este ativo' },
  { toca: 'RKT-8H42', anima: [...MARCA, ACENDE] },   // o primário passa a valer: acende por uma camada
  { dorme: 250 },
  { toca: 'QJF-2C61', anima: [...MARCA, esmaece('ds-quadrado')], naoAnima: [ACENDE] },   // a que perde a marca: o mesmo ao contrário; o primário já vale
  { dorme: 250 },
  { quieto: true },
  // a busca que esconde o marcado (o 09): o PCX-9A17 sobe, o que sai esmaece por cima, a instrução sai
  { digita: 'PCX', em: BUSCA },
  { anima: [desliza('ds-lista'), desliza('ds-linha-onibus'), esmaece(SAI)], naoAnima: [...LAYOUT, ACENDE] },   // o primário apaga direto
  { chega: 'T06', momento: '09-momento-busca-esconde-a-escolha' },
  { desligado: 'Usar este ativo' },
  { dorme: 250 },
  { quieto: true },
  // a busca que devolve o marcado: ele volta esmaecendo no lugar, e o primário acende de novo, por uma camada
  { digita: 'QJF', em: BUSCA },
  { anima: [esmaece('ds-linha-onibus'), ACENDE], naoAnima: LAYOUT },
  { chega: 'T06', momento: null },
  { dorme: 250 },
  { quieto: true },
  // a busca que não acha (o 08): o cartão sai por cima, e o vazio esmaece no lugar
  { digita: 'ABC-1234', em: BUSCA },
  { anima: [esmaece(SAI), esmaece('ds-vazio')], naoAnima: LAYOUT },
  { chega: 'T06', momento: '08-momento-busca-sem-resultado' },
  { ve: 'Nada com “ABC-1234”' },
  { dorme: 250 },
  { quieto: true },

  // ── a troca de quadro (C12·4): a lista que vira *Confirmar o vínculo*, com os dados do modelo ──
  { abre: '?tela=T06' },
  { toca: 'RKT-8H42' },
  { dorme: 250 },
  { toca: 'Usar este ativo', anima: TROCA, naoAnima: [desliza('ds-linha-onibus'), esmaece(SAI), ...DENTRO] },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'Confirmar o vínculo' },
  { ve: 'OF-1621 · ônibus urbano' },
  { ve: FICA },
  { naoVe: 'CHASSI' },
  { dorme: 250 },
  { quieto: true },
  // a volta: o mesmo movimento
  { toca: 'Escolher outro', anima: TROCA },
  { chega: 'T06', momento: null },
  { dorme: 250 },
  { quieto: true },
  // a placa de outro pacote (o PGE-6K41, da Ibura) abre a trava 04 pela troca de quadro, sem a lista andar por cima
  { digita: 'PGE-6K41', em: BUSCA },
  { anima: TROCA, naoAnima: [desliza('ds-linha-onibus'), esmaece(SAI), ...LAYOUT] },
  { ve: 'FORA DO PACOTE DESTA UO' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Escolher outro', anima: TROCA },
  { dorme: 250 },
  { quieto: true },

  // ── o vínculo confirmado: Vincular o módulo → T09, no que vai ser gravado (05) ──
  { abre: '?tela=T06' },
  { toca: 'RKT-8H42' },
  { dorme: 250 },
  { toca: 'Usar este ativo', anima: TROCA },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },

  // ── a trava que o leitor sem fio resolve (05 → 01): pela sessão do M2C-0335, com cabo ──
  // da T05, a conexão abre o diagnóstico (T07), e o Selecionar ativo dele abre a T06
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { toca: 'M2C-0335' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0335' },
  { chega: 'T07' },
  { toca: 'Selecionar ativo', ms: 15000 },
  { chega: 'T06', momento: null },
  { toca: 'KHT-4B08' },
  { dorme: 250 },
  { toca: 'Usar este ativo', anima: TROCA },
  { ve: 'CONFLITO NO FIO BRANCO' },
  // a régua rola a lista até o KHT-4B08 pra tocar, e a lista que vira a trava volta a rolagem
  // a 0: o indicador de rolagem (R-15) aparece e some depois de --rolagem-espera (900) e do
  // esmaecer dele (300); fora ele, nada anda
  { dorme: 1300 },
  { quieto: true },
  { toca: 'Usar leitor sem fio', anima: TROCA, naoAnima: DENTRO },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: 'O M2C-0335 fica neste ativo, na Viação Atlântico Sul.' },
  { dorme: 250 },
  { quieto: true },

  // ── com reduzir movimento: nada anda ──
  { reduzir: true },
  { abre: '?tela=T06' },
  { quieto: true },
  { toca: 'RKT-8H42' },
  { quieto: true },
  { digita: 'PGE-6K41', em: BUSCA },
  { ve: 'FORA DO PACOTE DESTA UO' },
  { quieto: true },
  { toca: 'Escolher outro' },
  { quieto: true },
  { abre: '?tela=T06' },
  { toca: 'RKT-8H42' },
  { quieto: true },
  { digita: 'PCX', em: BUSCA },
  { quieto: true },
  { chega: 'T06', momento: '09-momento-busca-esconde-a-escolha' },
  { digita: 'RKT', em: BUSCA },
  { quieto: true },
  { chega: 'T06', momento: null },
  { toca: 'Usar este ativo' },
  { quieto: true },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { ve: FICA },
  { toca: 'Escolher outro' },
  { quieto: true },
  { chega: 'T06', momento: null },
  // a trava que o leitor sem fio resolve, direto
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { toca: 'M2C-0335' },
  { toca: 'Conectar ao M2C-0335' },
  { chega: 'T07' },
  { toca: 'Selecionar ativo', ms: 15000 },
  { chega: 'T06', momento: null },
  { toca: 'KHT-4B08' },
  { toca: 'Usar este ativo' },
  { ve: 'CONFLITO NO FIO BRANCO' },
  { quieto: true },
  { toca: 'Usar leitor sem fio' },
  { ve: 'O M2C-0335 fica neste ativo, na Viação Atlântico Sul.' },
  { quieto: true },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { reduzir: false },
]
