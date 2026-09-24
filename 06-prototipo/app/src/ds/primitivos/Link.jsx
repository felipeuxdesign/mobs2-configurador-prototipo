// O link (folha 1): 48 de toque, 15/500 em --tinta-secundaria; no toque, vira
// --tinta. A cor não anima (só transform e opacity): são duas camadas, e a do
// toque entra por opacity e solta em 100ms (G14, G26).
import './Link.css'

export function Link({ children, aoTocar, rotulo, desabilitado = false, className = '' }) {
  return (
    <button type="button" className={`ds-link ${className}`} aria-label={rotulo} disabled={desabilitado} onClick={aoTocar}>
      <span className="ds-link-texto">{children}</span>
      <span className="ds-link-toque" aria-hidden="true">{children}</span>
    </button>
  )
}
