// O campo de busca (folha 6, T02 e T06): um poço de 48 com a lupa e a dica,
// quando a lista é longa. A dica é o placeholder, em --tinta-apagada; o que o
// técnico digita sai em --tinta. O nome pro leitor de tela é o `rotulo`, ou
// a própria dica.
import { Icone } from '../index.js'
import './Busca.css'

export function Busca({ dica, valor = '', aoMudar, rotulo }) {
  return (
    <label className="ds-busca">
      <Icone nome="busca" tam={18} cor="apagada" />
      <input
        className="ds-busca-entrada"
        type="text"
        enterKeyHint="search"
        placeholder={dica}
        aria-label={rotulo ?? dica}
        value={valor}
        onChange={aoMudar ? (e) => aoMudar(e.target.value) : undefined}
        readOnly={!aoMudar}
      />
    </label>
  )
}
