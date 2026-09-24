// As peças só da T05 (tela.md, "Peças do design system"): o que a tela
// desenha e não tem linha no componentes.md. Montadas com o que o design
// system já tem (a caixa de poço, Lei 4), só com tokens.
import './pecas.css'

// 03 · o bloco do nenhum encontrado: a caixa de poço que cresce e ocupa o
// lugar da lista, centrada, com a marca tracejada em cima (o quadrado com o
// traço, muda pro leitor), o título e a frase. Não é o vazio declarado do
// componentes.md (tracejado, sem ícone): é peça desta tela.
export function VazioDaBusca({ titulo, frase }) {
  return (
    <div className="t05-vazio ds-caixa-poco">
      <span className="t05-vazio-marca" aria-hidden="true" />
      <span className="t05-vazio-titulo">{titulo}</span>
      <p className="t05-vazio-frase">{frase}</p>
    </div>
  )
}
