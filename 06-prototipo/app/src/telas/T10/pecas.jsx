// T10 · as peças só desta tela.
// A câmera do app (T10/06, decisão 33): o quadro parado que a referência
// desenha, feito em código — o poço que cresce no que sobra, a câmera de 46 em
// --marca e a frase de enquadrar. É o mesmo desenho do visor do item manual da
// T13 (T13/07, VisorCamera, em telas/T13/pecas.jsx): as duas câmeras do app são
// uma peça só, que o design system ainda não lista (vai pro arquiteto).
import { Icone } from '../../ds/index.js'
import './pecas.css'

export function VisorCamera({ dica }) {
  return (
    <div className="t10-visor ds-caixa-poco">
      <Icone nome="camera" cor="marca" className="t10-visor-camera" />
      <span className="t10-visor-dica">{dica}</span>
    </div>
  )
}
