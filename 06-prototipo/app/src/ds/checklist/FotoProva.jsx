// A foto que prova (folha 7, T10): um componente, dois estados. Num poço, a
// miniatura de 44, o nome e a legenda que diz pra que ela serve, e a situação
// à direita. Aguarda: a câmera apagada. Tirada: a miniatura surge no lugar
// (opacidade, 150ms · T10 animacao.md) e a legenda diz onde mais ela vale.
import { Icone } from '../index.js'
import './FotoProva.css'

export function FotoProva({ titulo, legenda, situacao, tirada = false }) {
  return (
    <div className={`ds-foto ${tirada ? 'ds-foto-tirada' : ''}`}>
      <span className="ds-foto-miniatura" aria-hidden="true">
        <span className="ds-foto-camada ds-foto-camada-aguarda"><Icone nome="camera" cor="marca-limite" /></span>
        <span className="ds-foto-camada ds-foto-camada-tirada"><Icone nome="foto" cor="secundaria" /></span>
      </span>
      <span className="ds-foto-texto">
        <span className="ds-foto-titulo">{titulo}</span>
        <span className="ds-foto-legenda">{legenda}</span>
      </span>
      <span className="ds-foto-situacao">{situacao}</span>
    </div>
  )
}
