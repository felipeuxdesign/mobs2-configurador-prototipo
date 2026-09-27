// A foto que prova (folha 7, T10 · a entrega do design de 25/09, decisão 33):
// um componente, dois estados, no cartão (o fundo e a borda da lista, o raio).
// · A tirar: o cartão tocável inteiro, com o nome da ação (o título) — a
//   câmera no poço de 44, o título, a legenda que diz pra que ela serve e a
//   seta. O pressionado é o do Tocavel, por cima, sem mudar nenhum pixel.
// · Tirada: o registro no lugar do cartão — o check lima no poço, o que ficou
//   feito e onde mais ela vale —, sem a seta e sem toque: não é botão pro
//   leitor de tela, é o que aconteceu (foto tirada fica tirada).
// C12·42 · o registro que nasce de um toque não tem movimento próprio: ele entra
// com o que já esmaece em volta dele, nos mesmos 150, e nada esmaece duas vezes —
// na T10, a troca de quadro da volta da câmera (C12·4); na T13/15, a lista que se
// reorganiza, que esmaece o que é novo no miolo (C12·10). Aberto, parado.
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
