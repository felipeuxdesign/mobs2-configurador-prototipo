// C12 · o movimento da T03 · Sincronizar (02-telas/T03-sincronizar/animacao.md; gate C12·4, 7,
// 12, 15, 16 e 18). A baixa é o processo declarado (G27, C12·16): no fluxo ela corre desde que
// a tela abre, um item por tique (4 s no total: no herói, 31 itens, um a cada ~129 ms), e nada se
// move ao abrir — o primeiro tique vem um passo depois. Os cinco grupos do pacote (decisão 45), os
// ativos primeiro: enquanto eles baixam, a barra dos ativos enche linear, um trecho por item,
// com o marcador junto, só por transform (C12·15 a, a Escala com `segue`); a contagem troca no
// lugar. O check de cada conteúdo que termina nasce no poço, por opacity, em 150 (C12·7 e
// C12·12, a LinhaContagem). A fase é o quadro (C12·4 a, G26): a baixa que termina (00 → 02), a
// que para (00 → 01) e o Reconectar (01 → 00) esmaecem o conteúdo em 150, como entre telas. O
// Reconectar que vira o Baixando apagado solta o roxo de uma vez (C12·18). Com reduzir
// movimento, nada anda, e a baixa leva os mesmos 4 s. Pela URL, no palco, num estado e no
// print, a tela abre parada.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const MIOLO = { prop: 'opacity', ms: 150, curva: C, em: 'tela-miolo' }
const RODAPE = { prop: 'opacity', ms: 150, curva: C, em: 'ds-rodape' }
const CHECK = { prop: 'opacity', ms: 150, curva: C, em: 'ds-glifo' }
// o passo da baixa na Várzea: 4000 ÷ 31 ≈ 129 ms (o caminho confere a duração arredondada)
const BARRA = [
  { prop: 'transform', ms: 129, curva: 'linear', em: 'ds-escala-agulha' },
  { prop: 'transform', ms: 129, curva: 'linear', em: 'ds-escala-faixa' },
]
// no Pátio Caruaru (23 itens), o passo é outro: só a propriedade e onde
const BARRA_CARUARU = [{ prop: 'transform', curva: 'linear', em: 'ds-escala-agulha' }, { prop: 'transform', curva: 'linear', em: 'ds-escala-faixa' }]
const ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]
// o que a barra não pode animar: nada de largura nem posição (só transform)
const LAYOUT = [{ prop: 'width' }, { prop: 'left' }, { prop: 'height' }, { prop: 'top' }]

export default [
  // ── abre parada, em cada quadro: pelo print, pelo endereço e pela coluna ──
  { abre: '?tela=T03&print=1' },
  { ve: '6 de 31 no total' },
  { ve: 'faltam ~40 s' },
  { quieto: true },
  { dorme: 400 },
  { quieto: true },
  { ve: '6 de 31 no total' },                         // no print, a baixa para no quadro da 00
  { abre: '?tela=T03&momento=02-momento-concluido' },
  { ve: 'Pacote de hoje' },
  { ve: 'de 31' },
  { quieto: true },
  { abre: '?tela=T03&estado=01-estado-falha-de-rede' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA' },
  { quieto: true },
  { abre: '?tela=T03&estado=03-estado-pacote-de-4-dias' },
  { ve: 'PACOTE DE 4 DIAS' },
  { quieto: true },
  { abre: '?tela=T03&estado=04-estado-pacote-vencido' },
  { ve: 'ENQUANTO NÃO SINCRONIZAR' },
  { quieto: true },

  // ── T03·1 e T03·2 · a baixa correndo, pela URL: abre parada, e o primeiro tique vem depois ──
  { abre: '?tela=T03' },
  { ve: 'Baixando o pacote' },
  // os ativos baixam primeiro: cada item é um trecho linear de ~129, com o marcador e o preenchido juntos
  { ve: '2 de 31 no total', ms: 1000 },
  { anima: BARRA, naoAnima: [...LAYOUT, CHECK] },
  { ve: '6 de 31 no total', entre: [350, 700] },
  { anima: BARRA, naoAnima: LAYOUT },
  // o décimo ativo: a barra chega ao fim no último trecho, e o check dos ativos nasce no poço
  { ve: '10 de 31 no total', entre: [350, 700] },
  { anima: [CHECK, ...BARRA] },
  // as conexões (2): a barra dos ativos já cheia, parada, e o check delas nasce no poço, em 150 (C12·12)
  { ve: '12 de 31 no total', entre: [150, 420] },
  { anima: [CHECK], naoAnima: BARRA },
  // os modelos de ativo (3)
  { ve: '15 de 31 no total', entre: [250, 550] },
  { anima: [CHECK], naoAnima: BARRA },
  // os eventos (12): no meio deles, nada anima
  { ve: '20 de 31 no total', entre: [500, 800] },
  { naoAnima: [...BARRA, CHECK] },
  { ve: '27 de 31 no total', entre: [750, 1100] },
  { anima: [CHECK], naoAnima: BARRA },
  // as cercas (4) · T03·3 e a troca de fase (00 → 02): o conteúdo esmaece como entre telas, e o check do último nasce no poço
  { ve: 'Pacote de hoje', entre: [350, 700] },
  { anima: [MIOLO, RODAPE, CHECK] },
  { chega: 'T03', momento: '02-momento-concluido' },
  { dorme: 300 },
  { quieto: true },
  // do concluído ao menu: a troca entre telas (o menu não tem rodapé)
  { toca: 'Ir para o menu', anima: [MIOLO] },
  { chega: 'T04' },

  // ── a baixa que para ao vivo (o caso sync-falha-rede: a primeira do Pátio Caruaru) ──
  { abre: '?tela=T02' },
  { marca: 'Pátio Caruaru' },
  { dorme: 200 },
  { toca: 'Sincronizar Pátio Caruaru', anima: [MIOLO, RODAPE] },   // a troca entre telas
  { chega: 'T03' },
  { dorme: 200 },
  // os ativos de Caruaru baixam primeiro: a barra anda, só por transform
  { anima: BARRA_CARUARU, naoAnima: LAYOUT },
  // 00 → 01: a baixa cai no 4º item (3 de 6 ativos); o rodapé troca inteiro, e o conteúdo esmaece; o aviso vem dentro da troca, sem esmaecer de novo
  { ve: 'A BAIXA PAROU ONDE ESTAVA', entre: [200, 1400] },
  { anima: [MIOLO, RODAPE], naoAnima: [{ prop: 'opacity', em: 'ds-aviso' }] },
  { dorme: 300 },
  { quieto: true },
  // 01 → 00: o Reconectar segue de onde parou; o Baixando apagado não fica com o roxo (C12·18)
  { toca: 'Reconectar', anima: [MIOLO, RODAPE], naoAnima: ROXO },
  { ve: 'Baixando o pacote' },
  { ve: 'Pacote de hoje', ms: 6000, entre: [2900, 4100] },   // os 20 que faltam, a ~174 ms (4000 ÷ 23)
  { anima: [MIOLO, RODAPE, CHECK] },
  { dorme: 300 },
  { quieto: true },
  // a falha de novo, e o Voltar ao contexto: a troca entre telas
  { abre: '?tela=T02' },
  { marca: 'Pátio Caruaru' },
  { toca: 'Sincronizar Pátio Caruaru' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 3000 },
  { dorme: 300 },
  { toca: 'Voltar ao contexto', anima: [MIOLO, RODAPE] },
  { chega: 'T02' },

  // ── com reduzir movimento: nada anda, e a baixa leva os mesmos 4 s ──
  { reduzir: true },
  { abre: '?tela=T03' },
  { quieto: true },
  { ve: '4 de 31 no total', ms: 3000 },
  { quieto: true },
  { ve: '20 de 31 no total', entre: [1900, 2250] },   // 16 passos de ~129
  { quieto: true },
  { ve: 'Pacote de hoje', entre: [1250, 1650] },      // os 11 do fim
  { quieto: true },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { quieto: true },
  { abre: '?tela=T02' },
  { marca: 'Pátio Caruaru' },
  { toca: 'Sincronizar Pátio Caruaru' },
  { chega: 'T03' },
  { quieto: true },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 3000 },
  { quieto: true },
  { toca: 'Reconectar' },
  { quieto: true },
  { ve: 'Pacote de hoje', ms: 6000 },
  { quieto: true },
  { reduzir: false },
]
