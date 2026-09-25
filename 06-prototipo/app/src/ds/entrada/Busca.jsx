// O campo de busca (folha 6, T02 e T06): um poço de 48 com a lupa e a dica,
// quando a lista é longa. A dica fica em --tinta-apagada; o que o técnico
// digita sai em --tinta. O nome pro leitor de tela é o `rotulo`, ou a própria
// dica.
// C4 (T02): a dica é texto por cima do campo vazio, no lugar do placeholder,
// pra ser texto da tela como na referência (a régua dos textos lê o texto, e
// o placeholder não é texto). Muda pro leitor: o nome já vai no aria-label.
// A entrega de 25/09 (T02/03, T06/08): em foco, o traço de baixo vira 2 de lima,
// como o campo focado (TracoFoco.css) — no toque, o foco de verdade; `focado`
// fotografa o foco parado, no quadro da busca sem resultado.
import { Icone } from '../index.js'
import './TracoFoco.css'
import './Busca.css'

export function Busca({ dica, valor = '', aoMudar, rotulo, focado = false }) {
  return (
    <label className={`ds-busca ds-traco-foco ${focado ? 'ds-foco' : ''}`}>
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
