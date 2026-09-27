// Os sinais liga-desliga (folha 5): o fato e o check, sem barra (Lei 5 ·
// exceção). Cada sinal numa linha — o nome à esquerda, o que se leu à
// direita com o check lima solto (Lei 4 · exceção declarada da T07) —, com a
// divisória entre elas. Vive na GradeLeituras, como a leitura pequena.
// O movimento (T07, C12·30): montar não anima. O sinal que chega depois (o
// valor troca no lugar) traz o check, que esmaece no lugar em --mov-rapido,
// como todo check que nasce. Com reduzir, aparece.
import { Fragment, useState } from 'react'
import { Icone } from '../index.js'
import './caixas.css'
import './Sinais.css'

export function Sinais({ sinais }) {
  // os checks que já estavam na tela; o que chega depois de montar esmaece
  const conferem = sinais.filter((s) => s.confere).map((s) => s.rotulo).join('|')
  const [visto, setVisto] = useState({ conferem, nascem: [] })
  if (visto.conferem !== conferem) {
    const antes = visto.conferem.split('|')
    setVisto({ conferem, nascem: sinais.filter((s) => s.confere && !antes.includes(s.rotulo)).map((s) => s.rotulo) })
  }
  return (
    <div className="ds-sinais ds-inst-cartao">
      {sinais.map((s, i) => (
        <Fragment key={s.rotulo}>
          {i > 0 && <span className="ds-sinais-divisoria" />}
          <div className="ds-sinais-linha">
            <span className="ds-sinais-rotulo">{s.rotulo}</span>
            <span className="ds-sinais-lido">
              <span className="ds-sinais-valor">{s.valor}</span>
              {s.confere && <Icone nome="check-mini" tam={12} cor="lima" className={visto.nascem.includes(s.rotulo) ? 'ds-sinais-nasce' : ''} />}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
