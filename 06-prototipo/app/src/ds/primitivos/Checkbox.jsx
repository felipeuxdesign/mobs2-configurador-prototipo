// O checkbox (folha 6): um componente, dois estados. É o marcador de escolha
// (o Quadrado, decisão 29) no poço de 24: o vazado de 11 no desmarcado e,
// marcado, o lima de 11 surge por cima (opacidade e escala 80%→100%, 150ms);
// desmarcar some igual (T01 e T13 animacao.md). Usado na T01, T06, T13.
import { Poco } from './Poco.jsx'
import { Quadrado } from './Marcador.jsx'
import './Checkbox.css'

export function Checkbox({ marcado = false, aoMudar, children, rotulo }) {
  const trocar = () => aoMudar?.(!marcado)
  return (
    <span
      role="checkbox"
      aria-checked={marcado}
      aria-label={rotulo}
      tabIndex={0}
      className={`ds-checkbox ${marcado ? 'ds-checkbox-marcado' : ''}`}
      onClick={trocar}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); trocar() } }}
    >
      <Poco tam={24}><Quadrado escolhido={marcado} /></Poco>
      <span className="ds-checkbox-texto">{children}</span>
    </span>
  )
}
