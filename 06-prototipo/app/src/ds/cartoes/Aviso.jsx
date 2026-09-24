// O aviso (folha 4, Lei 7 e R-08): um formato só — poço, rótulo, uma frase —
// em quatro usos: falha, aviso, processo parado e com contagem. A falha acende
// o traço vermelho embaixo e o rótulo em vermelho (Lei 2); o aviso neutro é o
// mesmo desenho, cinza, sem traço. Com contagem, o número vai à direita, com a
// unidade junto (Lei 10). O glifo é o de estado da folha 3, pelo nome.
// `semPoco`: a exceção da Lei 7 — o aviso da folha de trocar de garagem
// (T04/08) é só o rótulo e a frase, com 12 em volta e a frase a 1,4 (G11).
import { Poco, Glifo } from '../index.js'
import './caixas.css'
import './Aviso.css'

// `mudo` (C4 · T03, G15; padrão desde o fechamento do C4): o glifo do aviso fica mudo pro leitor — o rótulo e a
// frase já dizem o que houve. Desligado, nada muda.
export function Aviso({ tom = 'falha', glifo = 'xis', poco = 26, nomeGlifo, titulo, frase, numero, unidade, semPoco = false, mudo = true }) {
  const falha = tom === 'falha'
  return (
    <div className={`ds-aviso ds-caixa-poco ${falha ? 'ds-caixa-falha ds-aviso-falha' : ''} ${semPoco ? 'ds-aviso-sem-poco' : ''}`}>
      {!semPoco && <Poco tam={poco} aria-hidden={mudo ? 'true' : undefined}><Glifo estado={glifo} poco={poco} nome={nomeGlifo} /></Poco>}
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
