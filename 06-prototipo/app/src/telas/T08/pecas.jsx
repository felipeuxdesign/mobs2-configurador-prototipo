// As duas caixas do meio da T08, na caixa de poço do design system
// (cartoes/caixas.css). Nenhuma das duas tem linha no componentes.md (gate C0,
// T08 parte 3, e T08-V2): são peças desta tela, como os instrumentos da T03.
//   Garantia · a 00: o rótulo em lima e a frase do que fica, o traço lima
//              embaixo (Lei 1 · NADA SE PERDE é rótulo de prova)
//   Placar   · a 01 e a 02: o rótulo à esquerda e a contagem à direita, "5 de
//              12". Concluída, o rótulo e o traço de baixo acendem em lima: é
//              o veredito. É a forma do 'com contagem' da folha 4 sem o poço,
//              com rótulo de 11 e recheio de 14 — a unificação vai ao diretor.

export function Garantia({ rotulo, frase }) {
  return (
    <div className="t08-garantia ds-caixa-poco">
      <span className="t08-garantia-rotulo">{rotulo}</span>
      <p className="t08-garantia-frase">{frase}</p>
    </div>
  )
}

export function Placar({ rotulo, numero, unidade, veredito = false }) {
  return (
    <div className={`t08-placar ds-caixa-poco ${veredito ? 't08-placar-veredito' : ''}`}>
      <span className="t08-placar-rotulo">{rotulo}</span>
      <span className="t08-placar-numero">{`${numero} `}<span className="t08-placar-unidade">{unidade}</span></span>
    </div>
  )
}
