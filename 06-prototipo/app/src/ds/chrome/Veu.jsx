// O véu (folha 2, por cima da tela): o fundo escuro atrás da folha e do
// diálogo. Ocupa o que sobra embaixo do topo (flex-grow) e põe a folha no pé
// ou o diálogo no meio. Esmaece junto: com a folha entra em 200ms, com o
// diálogo em 150ms, e sai em 150ms (movimento.md). A barra do sistema escurece
// junto pelo `veu` dela.
import './Veu.css'

// de: 'folha' (no pé) · 'dialogo' (no meio)
export function Veu({ de = 'folha', visivel = true, children }) {
  return <div className={`ds-veu ds-veu-${de} ${visivel ? '' : 'ds-veu-oculto'}`}>{children}</div>
}
