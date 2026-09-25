// T13 · a peça que só o nível do item desenha e que não tem linha no
// componentes.md (gate C0, T13 · 2): o instrumento do item automático
// reprovado. Montada com os primitivos do DS (Escala, a caixa de poço) — nada
// redesenhado. O visor da câmera do item manual, que era daqui, é o mesmo
// desenho da câmera da T10: virou uma peça só, ds/checklist/VisorCamera (o
// mundo real).
import { Escala } from '../../ds/index.js'
import './pecas.css'

// O instrumento do item reprovado (T13/09): o poço com o traço de baixo
// vermelho (a falha mora no elemento, Lei 2), o rótulo em vermelho, o número
// de 48 na tinta, a barra de 22 com a faixa esperada, as três marcas e a frase.
export function InstrumentoDoItem({ rotulo, valor, unidade, escala, legendas, frase }) {
  return (
    <div className="t13-instrumento ds-caixa-poco ds-caixa-falha">
      <span className="t13-instrumento-rotulo">{rotulo}</span>
      <span className="t13-instrumento-numero">{valor}{unidade && <span className="t13-instrumento-unidade">{unidade}</span>}</span>
      <Escala {...escala} tam="item" semLados falha />
      <div className="t13-instrumento-legendas">
        <span>{legendas.min}</span><span className="t13-instrumento-faixa">{legendas.faixa}</span><span>{legendas.max}</span>
      </div>
      {frase && <span className="t13-instrumento-frase">{frase}</span>}
    </div>
  )
}
