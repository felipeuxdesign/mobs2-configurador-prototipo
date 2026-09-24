// O checkbox (folha 6): um componente, dois estados. O poço de 24 vazio, e,
// marcado, o quadrado lima de 10 surge no poço (opacidade e escala 80%→100%,
// 150ms); desmarcar some igual (T01 e T13 animacao.md). Usado na T01, T06, T13.
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
      <span className="ds-checkbox-poco"><span className="ds-checkbox-quadrado" /></span>
      <span className="ds-checkbox-texto">{children}</span>
    </span>
  )
}
