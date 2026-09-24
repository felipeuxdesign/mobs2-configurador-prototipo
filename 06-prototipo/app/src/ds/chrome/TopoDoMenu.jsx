// O topo do menu inteiro (folha 2): a tira de contexto e a faixa do menu
// juntas, sobre o fundo --poco da tira, com o separador embaixo. Quem monta
// passa a TiraDeContexto e a Faixa (lugar 'menu') como filhos.
import './TopoDoMenu.css'

export function TopoDoMenu({ children }) {
  return <div className="ds-topo-menu">{children}</div>
}
