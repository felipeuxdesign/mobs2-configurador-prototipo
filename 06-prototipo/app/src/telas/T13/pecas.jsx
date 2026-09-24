// T13 · as duas peças que só o nível do item desenha e que não têm linha no
// componentes.md (gate C0, T13 · 2): o visor da câmera do item manual e o
// instrumento do item automático reprovado. Montadas com os primitivos do DS
// (Icone, Escala, a caixa de poço) — nada redesenhado.
import { Icone, Escala } from '../../ds/index.js'
import './pecas.css'

// O visor da câmera (T13/07, 08): o poço que cresce até o que vem embaixo, a
// câmera e a dica de enquadramento. Sem dica aprovada, só a câmera (G25).
export function VisorCamera({ dica }) {
  return (
    <div className="t13-visor ds-caixa-poco">
      <Icone nome="camera" cor="marca" className="t13-visor-camera" />
      {dica && <span className="t13-visor-dica">{dica}</span>}
    </div>
  )
}

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
