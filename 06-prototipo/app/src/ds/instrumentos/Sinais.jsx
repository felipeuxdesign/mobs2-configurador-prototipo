// Os sinais liga-desliga (folha 5): o fato e o check, sem barra (Lei 5 ·
// exceção). Cada sinal numa linha — o nome à esquerda, o que se leu à
// direita com o check lima solto (Lei 4 · exceção declarada da T07) —, com a
// divisória entre elas. Vive na GradeLeituras, como a leitura pequena.
import { Fragment } from 'react'
import { Icone } from '../index.js'
import './caixas.css'
import './Sinais.css'

export function Sinais({ sinais }) {
  return (
    <div className="ds-sinais ds-inst-cartao">
      {sinais.map((s, i) => (
        <Fragment key={s.rotulo}>
          {i > 0 && <span className="ds-sinais-divisoria" />}
          <div className="ds-sinais-linha">
            <span className="ds-sinais-rotulo">{s.rotulo}</span>
            <span className="ds-sinais-lido">
              <span className="ds-sinais-valor">{s.valor}</span>
              {s.confere && <Icone nome="check-mini" tam={12} cor="lima" />}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
