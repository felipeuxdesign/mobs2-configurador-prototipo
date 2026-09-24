// O link dentro do conteúdo (folha 6, T01): a ação sobre o que está perto,
// sublinhada, 14/600 em --tinta-forte, com o traço em --marca-vazia. Desenho de
// 44; o toque tem 48, por uma área invisível em volta (Lei do toque de 48).
// No toque vira --tinta: duas camadas, a de cima entra por opacity e solta
// em 100ms, como o Link (movimento.md).
import './LinkConteudo.css'

export function LinkConteudo({ children, aoTocar, rotulo, forcaToque = false }) {
  return (
    <button type="button" className={`ds-link-conteudo ${forcaToque ? 'ds-forca-toque' : ''}`} aria-label={rotulo} onClick={aoTocar}>
      <span className="ds-link-conteudo-texto">{children}</span>
      <span className="ds-link-conteudo-toque" aria-hidden="true">{children}</span>
    </button>
  )
}
