// O primário (folha 1): 56 de alto, roxo com o texto lima (Lei 1 e 8).
// Pressionado: o roxo clareia e afunda 2%. Desabilitado: sem roxo, diz o que
// está acontecendo. Um por tela.
import './Primario.css'

export function Primario({ children, aoTocar, desabilitado = false, rotulo, forcaToque = false }) {
  return (
    <button
      type="button"
      className={`ds-primario ${desabilitado ? 'ds-primario-desabilitado' : ''} ${forcaToque ? 'ds-forca-toque' : ''}`}
      disabled={desabilitado}
      aria-label={rotulo}
      onClick={desabilitado ? undefined : aoTocar}
    >
      <span className="ds-primario-texto">{children}</span>
    </button>
  )
}
