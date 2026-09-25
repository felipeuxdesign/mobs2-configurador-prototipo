// A foto que prova (folha 7, T10 · a entrega do design de 25/09, decisão 33):
// um componente, dois estados, no cartão (o fundo e a borda da lista, o raio).
// · A tirar: o cartão tocável inteiro, com o nome da ação (o título) — a
//   câmera no poço de 44, o título, a legenda que diz pra que ela serve e a
//   seta. O pressionado é o do Tocavel, por cima, sem mudar nenhum pixel.
// · Tirada: o registro no lugar do cartão — o check lima no poço, o que ficou
//   feito e onde mais ela vale —, sem a seta e sem toque: não é botão pro
//   leitor de tela, é o que aconteceu (foto tirada fica tirada).
// O movimento do registro entrando (o check esmaecendo no poço, 150ms · T10
// animacao.md) é do C12.
import { Icone, Poco, Tocavel } from '../index.js'
import './FotoProva.css'

export function FotoProva({ titulo, legenda, tirada = false, aoTocar, rotulo }) {
  const texto = (
    <span className="ds-foto-texto">
      <span className="ds-foto-titulo">{titulo}</span>
      <span className="ds-foto-legenda">{legenda}</span>
    </span>
  )
  if (tirada) {
    return (
      <div className="ds-foto ds-foto-tirada">
        <Poco tam={44}><Icone nome="check" tam={20} cor="lima" /></Poco>
        {texto}
      </div>
    )
  }
  return (
    <Tocavel rotulo={rotulo ?? titulo} aoTocar={aoTocar} className="ds-foto">
      <Poco tam={44}><Icone nome="camera" tam={20} cor="secundaria" /></Poco>
      {texto}
      <Icone nome="avancar" tam={16} cor="apagada" />
    </Tocavel>
  )
}
