// O campo de busca (folha 6, T02 e T06): um poço de 48 com a lupa e a dica,
// quando a lista é longa. A dica fica em --tinta-apagada; o que o técnico
// digita sai em --tinta. O nome pro leitor de tela é o `rotulo`, ou a própria
// dica.
// C4 (T02): a dica é texto por cima do campo vazio, no lugar do placeholder,
// pra ser texto da tela como na referência (a régua dos textos lê o texto, e
// o placeholder não é texto). Muda pro leitor: o nome já vai no aria-label.
// A entrega de 25/09 (T02/03, T06/08): em foco, o traço de baixo vira 2 de lima,
// como o campo focado (TracoFoco.css) — no toque, o foco do próprio campo
// (foco.js, C12·21); `focado` é o foco que a tela diz, no quadro da busca sem
// resultado.
import { Icone } from '../index.js'
import { useFocoDoCampo } from './foco.js'
import './TracoFoco.css'
import './Busca.css'

// `icone` e `tamIcone`: a busca do país da T01/22 desenha a lupa dela, de 16 e traço 2 (o par do jogo)
export function Busca({ dica, valor = '', aoMudar, rotulo, focado = false, icone = 'busca', tamIcone = 18 }) {
  const foco = useFocoDoCampo(focado)
  return (
    <label className={`ds-busca ds-traco-foco ${foco.aceso ? 'ds-foco' : ''}`}>
      <Icone nome={icone} tam={tamIcone} cor="apagada" />
      <span className="ds-busca-lugar">
        <input
          className="ds-busca-entrada"
          type="text"
          enterKeyHint="search"
          aria-label={rotulo ?? dica}
          value={valor}
          onChange={aoMudar ? (e) => aoMudar(e.target.value) : undefined}
          readOnly={!aoMudar}
          onFocus={foco.aoFocar}
          onBlur={foco.aoSair}
        />
        {!valor && <span className="ds-busca-dica" aria-hidden="true">{dica}</span>}
      </span>
    </label>
  )
}
