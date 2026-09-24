// O link (folha 1): 48 de toque, 15/500 em --tinta-secundaria; no toque, vira
// --tinta. A cor não anima (só transform e opacity): são duas camadas, e a do
// toque entra por opacity e solta em 100ms (G14, G26).
import './Link.css'

// C4 · T03: quando o texto é uma frase, a camada do toque o repete por CSS
// (data-texto), e o texto do documento fica um só — o que o leitor e a régua
// dos textos leem. O desenho é o mesmo.
export function Link({ children, aoTocar, rotulo, desabilitado = false, className = '' }) {
  const frase = typeof children === 'string' ? children : undefined
  return (
    <button type="button" className={`ds-link ${className}`} aria-label={rotulo} disabled={desabilitado} onClick={aoTocar}>
      <span className="ds-link-texto">{children}</span>
      <span className="ds-link-toque" aria-hidden="true" data-texto={frase}>{frase == null ? children : null}</span>
    </button>
  )
}
