// A leitura pequena (folha 5): meia largura, o número de 22 no alto, à
// direita do rótulo, a escala de 14 e uma linha embaixo — a faixa inteira
// (−40 a 120) ou o mínimo, quando a faixa é aberta pra cima. Vive na
// GradeLeituras, de duas colunas.
import { Escala } from './Escala.jsx'
import './caixas.css'
import './LeituraPequena.css'

export function LeituraPequena({ rotulo, valor, unidade, escala, legenda, corre = false }) {
  return (
    <div className="ds-leitura-pequena ds-inst-cartao">
      <div className="ds-leitura-pequena-cabeca">
        <span className="ds-inst-rotulo">{rotulo}</span>
        <span className="ds-leitura-pequena-valor">
          {valor}{unidade != null && <span className="ds-leitura-pequena-unidade">{unidade}</span>}
        </span>
      </div>
      <Escala {...escala} tam="pequena" corre={corre} />
      {legenda != null && <span className="ds-inst-legenda">{legenda}</span>}
    </div>
  )
}

// a grade das leituras de meia largura (e dos sinais liga-desliga): duas colunas
export function GradeLeituras({ children }) {
  return <div className="ds-grade-leituras">{children}</div>
}
