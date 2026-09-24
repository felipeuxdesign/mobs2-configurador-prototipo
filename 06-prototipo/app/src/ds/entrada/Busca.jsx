// O campo de busca (folha 6, T02 e T06): um poço de 48 com a lupa e a dica,
// quando a lista é longa. A dica fica em --tinta-apagada; o que o técnico
// digita sai em --tinta. O nome pro leitor de tela é o `rotulo`, ou a própria
// dica.
// C4 (T02): a dica é texto por cima do campo vazio, no lugar do placeholder,
// pra ser texto da tela como na referência (a régua dos textos lê o texto, e
// o placeholder não é texto). Muda pro leitor: o nome já vai no aria-label.
import { Icone } from '../index.js'
import './Busca.css'

export function Busca({ dica, valor = '', aoMudar, rotulo }) {
  return (
    <label className="ds-busca">
      <Icone nome="busca" tam={18} cor="apagada" />
      <span className="ds-busca-lugar">
        <input
          className="ds-busca-entrada"
          type="text"
          enterKeyHint="search"
          aria-label={rotulo ?? dica}
          value={valor}
          onChange={aoMudar ? (e) => aoMudar(e.target.value) : undefined}
          readOnly={!aoMudar}
        />
        {!valor && <span className="ds-busca-dica" aria-hidden="true">{dica}</span>}
      </span>
    </label>
  )
}
