// O movimento dos instrumentos (C12 · as peças do movimento, C12·15, 30, 31, 34,
// 36 e 40), na vitrine: cada espécime de movimento (src/vitrine/especimes/
// mov-instrumentos.jsx) é a peça tocável, com o que a tela fará. Em todos:
// a peça nasce parada (o quieto depois do abre e do Voltar ao começo, que a
// remonta), o que anda é só transform e opacity, e com reduzir nada anda e o
// processo segue no mesmo ritmo.
//   · a Escala que segue um processo (a baixa da T03, o prazo da T14): um trecho
//     linear por passo, no passo do ritmos.js, o marcador e o preenchido juntos
//   · a leitura que chega (T07): o marcador corre em 300, desacelerando; as
//     rodinhas do hodômetro rolam da casa 0, 300 cada, de 40 em 40, a unidade
//     primeiro; o check do sinal esmaece em 150
//   · a leitura que cai fora (T07/01): a borda vermelha (uma camada) e a causa
//     esmaecem em 150
//   · a barra do checklist (T13): a volta do item parte do que tinha e avança
//     em 300; o Finalizar completa em 300, e o veredito surge em 150
//   · o mostrador (T08): a pele acesa entra em 150; concluir não anima
//   · o semear (T10): a diferença encolhe e esmaece em 300, o tambor rola, e o
//     veredito (o confere, ou o não confere) entra em 150 no fim dos 300
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const trecho = (ms) => [
  { prop: 'transform', ms, curva: 'linear', em: 'ds-escala-agulha' },
  { prop: 'transform', ms, curva: 'linear', em: 'ds-escala-faixa' },
]
const rola = [
  { prop: 'transform', ms: 300, atraso: 0, em: 'ds-roda-fita', curva: C },
  { prop: 'transform', ms: 300, atraso: 200, em: 'ds-roda-fita', curva: C },
]
const sai = [
  { prop: 'transform', ms: 300, em: 'ds-regua-sai', curva: C },
  { prop: 'opacity', ms: 300, em: 'ds-regua-sai', curva: C },
]

export default [
  // ── a baixa da T03 (C12·15): 10 itens de 250, a barra dos ativos
  { abre: '?vitrine=1&especime=mov-escala-baixa' },
  { quieto: true },
  { toca: 'Correr a baixa' },
  { dorme: 300 },                                  // o primeiro passo chegou aos 250
  { anima: trecho(250) },
  { dorme: 500 },
  { anima: trecho(250) },                          // o trecho seguinte, com o anterior ainda andando no fim
  { ve: '10 de 10', entre: [1400, 1900] },         // 2500 do toque
  { dorme: 400 },
  { quieto: true },
  // ── o prazo da T14 (C12·40): um trecho linear por tique de 250, de 2:00 a 1:36
  { abre: '?vitrine=1&especime=mov-prazo-drena' },
  { quieto: true },
  { toca: 'Disparar evento de teste' },
  { dorme: 300 },
  { anima: trecho(250) },
  { ve: '1:36', entre: [5400, 6000] },             // 24 tiques, 6000 do toque
  { dorme: 400 },
  { quieto: true },

  // ── a leitura que chega (T07, C12·30 e 31)
  { abre: '?vitrine=1&especime=mov-leitura-chega' },
  { quieto: true },
  { toca: 'Ler novamente', anima: [
    { prop: 'transform', ms: 300, curva: C, em: 'ds-escala-agulha' },
    ...rola,
    { prop: 'opacity', ms: 150, curva: C, em: 'ds-icone ds-icone-mini' }, // o check do sinal (ds-sinais-nasce)
  ] },
  { ve: '13,8' },
  { dorme: 600 },
  { quieto: true },
  { toca: 'Voltar ao começo' },                    // remonta no quadro de começo: parada
  { quieto: true },
  // ── a leitura que cai fora (T07/01)
  { abre: '?vitrine=1&especime=mov-leitura-fora' },
  { quieto: true },
  { toca: 'Ler a bateria fora', anima: [
    { prop: 'opacity', ms: 150, curva: C, em: 'ds-leitura-borda' },   // a camada da borda vermelha
    { prop: 'opacity', ms: 150, curva: C, em: 'ds-leitura-causa' },
    { prop: 'transform', ms: 300, curva: C, em: 'ds-escala-agulha' },
  ] },
  { ve: '1,1 V abaixo do mínimo' },
  { dorme: 400 },
  { quieto: true },

  // ── a barra do checklist (T13, C12·36)
  { abre: '?vitrine=1&especime=mov-barra-checklist' },
  { quieto: true },
  { toca: 'Voltar ao checklist', anima: [{ prop: 'transform', ms: 300, curva: C, em: 'ds-barra-ck-passou' }] },
  { ve: '23 de 31' },
  { dorme: 400 },
  { quieto: true },
  { toca: 'Finalizar instalação', anima: [
    { prop: 'transform', ms: 300, curva: C, em: 'ds-barra-ck-passou' },
    { prop: 'opacity', ms: 150, curva: C, em: 'ds-veredito-ck' },
  ] },
  { dorme: 400 },
  { quieto: true },
  { toca: 'Voltar ao começo' },
  { quieto: true },

  // ── o mostrador (T08): a pele acesa entra por opacity; concluir não anima
  { abre: '?vitrine=1&especime=mov-mostrador' },
  { quieto: true },
  { toca: 'Refazer a leitura', anima: [{ prop: 'opacity', ms: 150, curva: C, em: 'ds-mostrador' }] },
  { dorme: 300 },
  { toca: 'Concluir a releitura' },
  { quieto: true },

  // ── o semear (T10, C12·34): o confere, e o não confere
  { abre: '?vitrine=1&especime=mov-semear' },
  { quieto: true },
  { toca: 'Semear o hodômetro', anima: [...sai, ...rola] },
  { dorme: 320 },
  { anima: [{ prop: 'opacity', ms: 150, curva: C, em: 'ds-regua-entra' }] },
  { ve: 'relido às 14:30 · confere com o painel' },
  { dorme: 400 },
  { quieto: true },
  { toca: 'Voltar ao começo' },
  { quieto: true },
  { toca: 'Semear com a releitura errada', anima: [...sai, ...rola] },
  { dorme: 320 },
  { anima: [{ prop: 'opacity', ms: 150, curva: C, em: 'ds-regua-entra' }] },
  { ve: 'não confere · 500 m a menos que o painel' },
  { dorme: 400 },
  { quieto: true },

  // ── com reduzir: nada anda, e os processos seguem no mesmo ritmo
  { reduzir: true },
  { abre: '?vitrine=1&especime=mov-escala-baixa' },
  { toca: 'Correr a baixa' },
  { dorme: 300 },
  { quieto: true },
  { ve: '10 de 10', entre: [1900, 2400] },
  { abre: '?vitrine=1&especime=mov-prazo-drena' },
  { toca: 'Disparar evento de teste' },
  { dorme: 300 },
  { quieto: true },
  { ve: '1:36', entre: [5400, 6000] },
  { abre: '?vitrine=1&especime=mov-leitura-chega' },
  { toca: 'Ler novamente' },
  { quieto: true },
  { ve: '13,8' },
  { abre: '?vitrine=1&especime=mov-leitura-fora' },
  { toca: 'Ler a bateria fora' },
  { quieto: true },
  { ve: '1,1 V abaixo do mínimo' },
  { abre: '?vitrine=1&especime=mov-barra-checklist' },
  { toca: 'Voltar ao checklist' },
  { quieto: true },
  { toca: 'Finalizar instalação' },
  { quieto: true },
  { abre: '?vitrine=1&especime=mov-mostrador' },
  { toca: 'Refazer a leitura' },
  { quieto: true },
  { abre: '?vitrine=1&especime=mov-semear' },
  { toca: 'Semear o hodômetro' },
  { quieto: true },
  { ve: 'relido às 14:30 · confere com o painel' },
  { reduzir: false },
]
