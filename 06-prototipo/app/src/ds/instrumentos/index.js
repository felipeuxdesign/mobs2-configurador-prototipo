// A família dos instrumentos (folhas 5 e 8): a escala, o tambor e a roda de
// dígito (G29, o valor em poço da calibração), o fato declarado, a cadeia, o
// encerramento, o segmentado, a pré-condição, o prazo, a barra do checklist
// (que saiu no lugar do placar, na entrega do checklist) e as peças da
// calibração. As leituras da CAN (a leitura, a pequena, a grade, o
// tambor de células e os sinais) saíram com a T07 antiga, no pacote 1.
export { Escala } from './Escala.jsx'
export { RodaDigito, FITA, passos } from './RodaDigito.jsx'
export { Tambor } from './Tambor.jsx'
export { Declarado } from './Declarado.jsx'
export { Trilho } from './Trilho.jsx'
export { Cadeia } from './Cadeia.jsx'
export { Encerramento } from './Encerramento.jsx'
export { Segmentado } from './Segmentado.jsx'
export { Precondicao } from './Precondicao.jsx'
export { Prazo } from './Prazo.jsx'
export { BarraDoChecklist } from './BarraDoChecklist.jsx'
export { ValorEmPoco, ReguaDiferenca, ValorAlvo } from './Calibracao.jsx'
