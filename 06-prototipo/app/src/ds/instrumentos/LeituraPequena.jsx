// A leitura pequena (folha 5): meia largura, o número de 22 no alto, à
// direita do rótulo, a escala de 14 e uma linha embaixo — a faixa com máximo
// (−40 a 120, numa escala que vai a 150, a leitura com máximo) ou o mínimo,
// quando a faixa é aberta pra cima. Vive na
// GradeLeituras, de duas colunas.
import { Escala } from './Escala.jsx'
import './caixas.css'
import './LeituraPequena.css'

// C8 · T07 (G11) · `semLeitura`: o sinal não chegou (T07/02). A falha mora no
// cartão (Lei 2): a borda vermelha, o traço vermelho no lugar do número, o
// poço vazio com o traço no meio e a causa em vermelho no lugar da legenda.
// O desenho é o mesmo; muda o que ele diz (Lei 3).
// `corre` (C12·30): a leitura que chega depois de montar leva o marcador de
// onde estava até o valor, em --mov-lento (a Escala); montar não anima.
export function LeituraPequena({ rotulo, valor, unidade, escala, legenda, corre = false, semLeitura = false }) {
  return (
    <div className={`ds-leitura-pequena ds-inst-cartao ${semLeitura ? 'ds-leitura-pequena-sem-leitura' : ''}`}>
      <div className="ds-leitura-pequena-cabeca">
        <span className="ds-inst-rotulo">{rotulo}</span>
        <span className="ds-leitura-pequena-valor">
          {valor}{unidade != null && <span className="ds-leitura-pequena-unidade">{unidade}</span>}
        </span>
      </div>
      {semLeitura ? <Escala tam="pequena" vazia /> : <Escala {...escala} tam="pequena" corre={corre} />}
      {legenda != null && <span className="ds-inst-legenda">{legenda}</span>}
    </div>
  )
}

// a grade das leituras de meia largura (e dos sinais liga-desliga): duas
// colunas. `folga`: o espaço entre os cartões — 12 na folha 5, 10 na T07 (G11 · C8, T07-V5).
export function GradeLeituras({ folga = 12, children }) {
  return <div className={`ds-grade-leituras ${folga === 10 ? 'ds-grade-leituras-10' : ''}`}>{children}</div>
}
