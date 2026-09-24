// O aviso (folha 4, Lei 7 e R-08): um formato só — poço, rótulo, uma frase —
// em quatro usos: falha, aviso, processo parado e com contagem. A falha acende
// o traço vermelho embaixo e o rótulo em vermelho (Lei 2); o aviso neutro é o
// mesmo desenho, cinza, sem traço. Com contagem, o número vai à direita, com a
// unidade junto (Lei 10). O glifo é o de estado da folha 3, pelo nome.
import { Poco, Glifo } from '../index.js'
import './caixas.css'
import './Aviso.css'

export function Aviso({ tom = 'falha', glifo = 'xis', poco = 26, nomeGlifo, titulo, frase, numero, unidade }) {
  const falha = tom === 'falha'
  return (
    <div className={`ds-aviso ds-caixa-poco ${falha ? 'ds-caixa-falha ds-aviso-falha' : ''}`}>
      <Poco tam={poco}><Glifo estado={glifo} poco={poco} nome={nomeGlifo} /></Poco>
      <span className="ds-aviso-texto">
        <span className="ds-aviso-titulo">{titulo}</span>
        {frase != null && <span className="ds-aviso-frase">{frase}</span>}
      </span>
      {numero != null && (
        <span className="ds-aviso-numero">{numero} {unidade != null && <span className="ds-aviso-unidade">{unidade}</span>}</span>
      )}
    </div>
  )
}
