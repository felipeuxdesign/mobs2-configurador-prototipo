// C12 · o movimento da T03 · Sincronizar (02-telas/T03-sincronizar/animacao.md; gate C12·4, 7,
// 12, 15, 16 e 18). A baixa é o processo declarado (G27, C12·16): no fluxo ela corre desde que
// a tela abre, um item por tique (4 s no total), e nada se move ao abrir — o primeiro tique vem
// 250 ms depois. Enquanto os ativos baixam, a barra dos ativos enche linear, um trecho por item,
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
const BARRA = [
  { prop: 'transform', ms: 250, curva: 'linear', em: 'ds-escala-agulha' },
  { prop: 'transform', ms: 250, curva: 'linear', em: 'ds-escala-faixa' },
]
const ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]
// o que a barra não pode animar: nada de largura nem posição (só transform)
const LAYOUT = [{ prop: 'width' }, { prop: 'left' }, { prop: 'height' }, { prop: 'top' }]

export default [
  // ── abre parada, em cada quadro: pelo print, pelo endereço e pela coluna ──
  { abre: '?tela=T03&print=1' },
  { ve: '9 de 16 no total' },
  { quieto: true },
  { dorme: 400 },
  { quieto: true },
  { ve: '9 de 16 no total' },                         // no print, a baixa para no quadro da 00
  { abre: '?tela=T03&momento=02-momento-concluido' },
  { ve: 'Pacote de hoje' },
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
  { quieto: true },
  { ve: 'Baixando o pacote' },
  // os três modelos baixam antes: a barra dos ativos fica parada no 0
  { ve: '2 de 16 no total', entre: [300, 800] },
  { quieto: true },
  // o terceiro fecha os modelos: o check deles nasce no poço, em 150 (C12·12), e a barra ainda não anda
  { ve: '3 de 16 no total', entre: [150, 350] },
  { anima: [CHECK], naoAnima: BARRA },
  // os ativos: cada item é um trecho linear de 250, com o marcador e o preenchido juntos
  { ve: '4 de 16 no total', entre: [150, 350] },
  { anima: BARRA, naoAnima: [...LAYOUT, CHECK] },
  { ve: '7 de 16 no total', entre: [600, 900] },
  { anima: BARRA, naoAnima: LAYOUT },
  { ve: '12 de 16 no total', entre: [1100, 1450] },
  // o décimo ativo: a barra chega ao fim no último trecho, e o check dos ativos nasce no poço
  { ve: '13 de 16 no total', entre: [150, 350] },
  { anima: [CHECK, ...BARRA] },
  // os cartões: a barra dos ativos já cheia, parada
  { ve: '15 de 16 no total', entre: [350, 650] },
  { naoAnima: [...BARRA, CHECK] },
  // T03·3 e a troca de fase (00 → 02): o conteúdo esmaece como entre telas, e o check do último nasce no poço
  { ve: 'Pacote de hoje', entre: [100, 450] },
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
  { quieto: true },
  // 00 → 01: o rodapé troca inteiro, e o conteúdo esmaece; o aviso vem dentro da troca, sem esmaecer de novo
  { ve: 'A BAIXA PAROU ONDE ESTAVA', entre: [800, 1700] },
  { anima: [MIOLO, RODAPE], naoAnima: [{ prop: 'opacity', em: 'ds-aviso' }] },
  { dorme: 300 },
  { quieto: true },
  // 01 → 00: o Reconectar segue de onde parou; o Baixando apagado não fica com o roxo (C12·18)
  { toca: 'Reconectar', anima: [MIOLO, RODAPE], naoAnima: ROXO },
  { ve: 'Baixando o pacote' },
  { ve: 'Pacote de hoje', ms: 6000, entre: [2500, 3600] },
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
  { ve: '4 de 16 no total', ms: 3000 },
  { quieto: true },
  { ve: '12 de 16 no total', entre: [1850, 2150] },
  { quieto: true },
  { ve: 'Pacote de hoje', entre: [850, 1250] },
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
