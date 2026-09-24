// A tira de contexto (folha 2): só no menu — a garagem, que abre a troca, e a
// conta, que abre a folha da conta. Os dois botões têm 44 de desenho e 48 de
// toque, por uma área invisível em volta (G14). No toque, a garagem vai pra
// --tinta (duas camadas) e o avatar apaga, como o só-ícone.
import { Icone } from '../primitivos/Icone.jsx'
import { Avatar } from './Avatar.jsx'
import { Camadas } from './Camadas.jsx'
import './TiraDeContexto.css'

export function TiraDeContexto({ garagem, aoTrocarGaragem, rotuloGaragem, iniciais, rotuloConta, aoAbrirConta }) {
  return (
    <div className="ds-tira-contexto">
      <button type="button" className="ds-tira-contexto-garagem ds-com-camadas" aria-label={rotuloGaragem} aria-haspopup="dialog" onClick={aoTrocarGaragem}>
        <Camadas className="ds-tira-contexto-garagem-texto">{garagem}</Camadas>
        <Icone nome="abrir" tam={14} cor="marca-limite" />
      </button>
      <button type="button" className="ds-tira-contexto-conta" aria-label={rotuloConta} aria-haspopup="dialog" onClick={aoAbrirConta}>
        <Avatar iniciais={iniciais} tam="tira" />
      </button>
    </div>
  )
}
