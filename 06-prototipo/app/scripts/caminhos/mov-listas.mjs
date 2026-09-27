// C12 · as peças do movimento · as listas (gate C12·10, C12·20, C12·28 e C12·41; as peças:
// src/ds/linhas/Reorganiza.js, a Lista com `surge` e a LinhaEscolha; a vitrine:
// src/vitrine/especimes/mov-listas.jsx). Cada espécime e cada tela abrem parados — nada
// anima ao abrir —, e só se move o que ajuda o olho a seguir a lista:
// · a lista que se reorganiza (a T02 em miniatura, a lista longa do caso): digitar na busca
//   leva o layout direto pro fim; a unidade que fica desliza do lugar antigo ao novo por
//   transform, em 150; o grupo inteiro sobe junto quando o de cima some; o que sai esmaece
//   por cima (a cópia muda, ds-reorganiza-sai); o que volta esmaece no lugar; nenhuma altura
//   anima. A mudança que chega no meio de outra continua de onde a linha está;
// · a mesma peça na T06: a instrução sai, e o cartão inteiro sobe no lugar dela;
// · a fila que fecha o espaço (T15, sem porta: o envio não tem ritmo, C12·14);
// · a cascata da lista que a busca acha (T05/01): 150 cada, 80 entre elas, só quando a
//   busca acha; ao abrir, e no toque que marca, parada;
// · o marcador de escolha, no app, onde ele já mora: as unidades da T02 (a vencida também,
//   o conserto da C12·20), as empresas da T02/07, os módulos da T05/01 e os ônibus da T06.
// Com reduzir movimento, nada anima, e a lista vai direto pro fim.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const V = (id) => ({ abre: `?vitrine=1&especime=${id}` })
const desliza = (em) => ({ prop: 'transform', ms: 150, em, curva: C })
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const SAI = 'ds-reorganiza-sai'
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]   // o lima surge: opacidade e escala, em 150
// o que move o layout não anima nunca (a régua também acusa com ⚠ tudo fora de transform e opacity)
const LAYOUT = ['height', 'top', 'margin-top', 'margin-bottom', 'padding-top', 'max-height'].map((prop) => ({ prop }))
const cascata = [0, 80, 160, 240, 320].map((atraso) => ({ prop: 'opacity', ms: 150, atraso, em: 'ds-linha-modulo', curva: C }))
const BUSCA_T02 = 'Buscar unidade ou cidade'
const BUSCA_T06 = 'Buscar placa, frota ou módulo'

export default [
  // ── a lista que se reorganiza (C12·10 · T02): a lista longa, com a busca ──
  V('mov-listas-unidades'),
  { quieto: true },
  { ve: 'Garagem Várzea' },
  // Olin: a Olinda (a quarta da RMR) sobe dentro do cartão; o que sai — as de cima, a
  // Camaragibe e os dois grupos de baixo — esmaece por cima
  { digita: 'Olin', em: BUSCA_T02 },
  { anima: [desliza('ds-escolha'), esmaece(SAI)], naoAnima: LAYOUT },
  { ve: 'Garagem Olinda' },
  { dorme: 250 },
  { quieto: true },                                                    // acabou: nada fica vivo, nem a cópia
  { naoVe: 'Garagem Várzea' },
  { naoVe: 'AGRESTE' },
  // tocar marca: o quadrado lima surge, e a lista não anda
  { toca: 'Garagem Olinda', anima: MARCA, naoAnima: [{ prop: 'transform', em: 'ds-escolha' }] },
  { ve: 'Sincronizar Garagem Olinda' },
  { dorme: 200 },
  // a busca que volta a achar tudo: a Olinda desce pro lugar dela, e o que volta esmaece no lugar
  { toca: 'bancada · limpa a busca', anima: [desliza('ds-escolha'), esmaece('ds-escolha'), esmaece('t02-grupo')], naoAnima: LAYOUT },
  { ve: 'AGRESTE' },
  { dorme: 250 },
  { quieto: true },
  // Caruaru: o grupo do Agreste sobe inteiro, com o Pátio Caruaru, e a Gravatá sai de dentro do cartão
  { digita: 'Caruaru', em: BUSCA_T02 },
  { anima: [desliza('t02-grupo'), esmaece(SAI)], naoAnima: LAYOUT },
  { ve: 'Pátio Caruaru' },
  { dorme: 250 },
  { quieto: true },
  // a vencida também se escolhe, e o lima dela surge como em toda escolha (o conserto da C12·20)
  { toca: 'Pátio Caruaru', anima: MARCA },
  { ve: 'Sincronizar Pátio Caruaru' },
  { dorme: 200 },
  // a busca que não acha nada: o grupo sai por cima, e o vazio esmaece no lugar
  { digita: 'Recreio', em: BUSCA_T02 },
  { anima: [esmaece(SAI), esmaece('ds-vazio')], naoAnima: LAYOUT },
  { ve: 'Nada com “Recreio”' },
  { desligado: 'Escolha uma unidade' },
  { dorme: 250 },
  { quieto: true },
  // a mudança que chega no meio de outra: continua de onde está, e no fim nada fica vivo
  { toca: 'bancada · limpa a busca' },
  { digita: 'Garagem', em: BUSCA_T02 },
  { digita: 'Olin', em: BUSCA_T02 },
  { anima: [desliza('ds-escolha')], naoAnima: LAYOUT },
  { dorme: 300 },
  { quieto: true },
  { ve: 'Garagem Olinda' },
  { naoVe: 'Garagem Ibura' },
  // aberta de novo, já com a lista inteira: parada
  V('mov-listas-unidades'),
  { quieto: true },

  // ── a mesma peça na T06: a instrução sai, e o cartão sobe no lugar dela ──
  V('mov-listas-onibus'),
  { quieto: true },
  { digita: 'PCX', em: BUSCA_T06 },
  { anima: [desliza('ds-lista'), desliza('ds-linha-onibus'), esmaece(SAI)], naoAnima: LAYOUT },
  { ve: 'PCX-9A17' },
  { naoVe: 'Escolha o veículo que está na sua frente.' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'PCX-9A17', anima: MARCA },
  { toca: 'bancada · limpa a busca', anima: [desliza('ds-lista'), desliza('ds-linha-onibus'), esmaece('t06-instrucao'), esmaece('ds-linha-onibus')], naoAnima: LAYOUT },
  { ve: 'Escolha o veículo que está na sua frente.' },
  { dorme: 250 },
  { quieto: true },
  // a placa que não existe: o cartão inteiro sai por cima, e o vazio esmaece no lugar
  { digita: 'ABC-1234', em: BUSCA_T06 },
  { anima: [esmaece(SAI), esmaece('ds-vazio')], naoAnima: LAYOUT },
  { ve: 'Nada com “ABC-1234”' },
  { dorme: 250 },
  { quieto: true },

  // ── a fila que fecha o espaço (C12·10 · T15): a linha sai por cima, e as de baixo sobem ──
  V('mov-listas-fila'),
  { quieto: true },
  { toca: 'bancada · o primeiro da fila sobe', anima: [esmaece(SAI), desliza('ds-linha-fila')], naoAnima: LAYOUT },
  { dorme: 250 },
  { quieto: true },

  // ── a cascata (C12·28, C12·41 · T05/01): só quando a busca acha ──
  V('mov-listas-cascata'),
  { quieto: true },                                                    // ao abrir, a lista já está lá
  { toca: 'bancada · a busca acha', anima: cascata, naoAnima: LAYOUT },
  { ve: 'M2C-0417' },
  { dorme: 600 },
  { quieto: true },                                                    // a última termina aos 470: nada fica vivo
  // o toque que marca não repete a cascata (o pressionado solta em 100; a cascata é de 150)
  { toca: 'M2C-0417', anima: MARCA, naoAnima: [{ prop: 'opacity', ms: 150, em: 'ds-linha-modulo' }] },
  { dorme: 200 },
  { toca: 'bancada · abre de novo', naoAnima: [{ prop: 'opacity', ms: 150, em: 'ds-linha-modulo' }] },
  { quieto: true },

  // ── o marcador de escolha, no app (C12·20): as unidades da T02, a vencida também ──
  { abre: '?tela=T02' },
  { quieto: true },
  { toca: 'Garagem Várzea', anima: MARCA },
  { ve: 'Sincronizar Garagem Várzea' },
  { dorme: 200 },
  { toca: 'Pátio Caruaru', anima: [...MARCA, esmaece('ds-quadrado')] },   // o lima surge na vencida, e o da Várzea sai
  { ve: 'Sincronizar Pátio Caruaru' },
  { dorme: 200 },
  { toca: 'Garagem Ibura', anima: [...MARCA, esmaece('ds-quadrado')] },   // a vencida perde a marca: o mesmo ao contrário
  { ve: 'Sincronizar Garagem Ibura' },
  { dorme: 200 },
  { quieto: true },
  // as empresas (T02/07): aberta com a Viação marcada, parada; tocar outra, o lima surge
  { abre: '?tela=T02&momento=07-momento-empresa-escolhida' },
  { quieto: true },
  { toca: 'Transportes Capibaribe', anima: [...MARCA, esmaece('ds-quadrado')] },
  { dorme: 200 },
  // os módulos da T05/01 e os ônibus da T06
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { quieto: true },
  { toca: 'M2C-0417', anima: MARCA },
  { ve: 'Conectar ao M2C-0417' },
  { abre: '?tela=T06' },
  { quieto: true },
  { toca: 'RKT-8H42', anima: MARCA },

  // ── com reduzir movimento: nada anima, e a lista vai direto pro fim ──
  { reduzir: true },
  { abre: '?tela=T02' },
  { quieto: true },
  { toca: 'Pátio Caruaru' },
  { quieto: true },
  { ve: 'Sincronizar Pátio Caruaru' },
  V('mov-listas-unidades'),
  { digita: 'Olin', em: BUSCA_T02 },
  { quieto: true },
  { ve: 'Garagem Olinda' },
  { naoVe: 'Garagem Várzea' },
  { toca: 'bancada · limpa a busca' },
  { quieto: true },
  { ve: 'Garagem Várzea' },
  V('mov-listas-onibus'),
  { digita: 'PCX', em: BUSCA_T06 },
  { quieto: true },
  V('mov-listas-fila'),
  { toca: 'bancada · o primeiro da fila sobe' },
  { quieto: true },
  V('mov-listas-cascata'),
  { toca: 'bancada · a busca acha' },
  { quieto: true },                                                    // as linhas aparecem juntas
  { ve: 'M2C-0417' },
  { reduzir: false },
]
