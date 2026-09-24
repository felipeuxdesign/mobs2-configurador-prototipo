// A foto que prova (folha 7, T10): um componente, dois estados. Num poço, a
// miniatura de 44, o nome e a legenda que diz pra que ela serve, e a situação
// à direita. Aguarda: a câmera apagada. Tirada: a miniatura surge no lugar
// (opacidade, 150ms · T10 animacao.md) e a legenda diz onde mais ela vale.
import { Icone, Tocavel } from '../index.js'
import './FotoProva.css'

// `aoTocar` + `rotulo` (C9 · T10, G14): a referência desenha o cartão sem
// botão, e ele vira tocável inteiro, com o nome da ação ('Fotografar o
// painel') e o pressionado do Tocavel por cima, sem mudar nenhum pixel.
// Tirada a foto, o cartão continua o mesmo elemento (a miniatura surge por
// opacidade, sem remontar) e para de responder: o nome passa a ser o que ele
// diz. Sem aoTocar, é o div de antes.
export function FotoProva({ titulo, legenda, situacao, tirada = false, aoTocar, rotulo }) {
  const classe = `ds-foto ${tirada ? 'ds-foto-tirada' : ''}`
  const miolo = (
    <>
      <span className="ds-foto-miniatura" aria-hidden="true">
        <span className="ds-foto-camada ds-foto-camada-aguarda"><Icone nome="camera" cor="marca-limite" /></span>
        <span className="ds-foto-camada ds-foto-camada-tirada"><Icone nome="foto" cor="secundaria" /></span>
      </span>
      <span className="ds-foto-texto">
        <span className="ds-foto-titulo">{titulo}</span>
        <span className="ds-foto-legenda">{legenda}</span>
      </span>
      <span className="ds-foto-situacao">{situacao}</span>
    </>
  )
  if (aoTocar) return <Tocavel rotulo={tirada ? undefined : rotulo} aoTocar={aoTocar} desabilitado={tirada} className={classe}>{miolo}</Tocavel>
  return <div className={classe}>{miolo}</div>
}
