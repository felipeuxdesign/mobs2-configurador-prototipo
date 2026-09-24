// O vazio declarado (folha 4): quando não há nada, a tela diz o que isso
// significa — tracejado, título e uma frase, sem ícone (T12, T15).
import './caixas.css'
import './Vazio.css'

export function Vazio({ titulo, frase }) {
  return (
    <div className="ds-vazio ds-caixa-apagada">
      <span className="ds-vazio-titulo">{titulo}</span>
      {frase != null && <p className="ds-vazio-frase">{frase}</p>}
    </div>
  )
}
