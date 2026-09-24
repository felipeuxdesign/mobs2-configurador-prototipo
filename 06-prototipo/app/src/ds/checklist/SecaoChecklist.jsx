// A seção do checklist no acordeão (folha 7, "a seção aberta inteira"): a
// cabeça é a CabecaSecao da família linhas (folha 4); aberta, o corpo com os
// cartões (GradeCartoes de CartaoValor ou CartaoFoto) sangra até a borda do
// cartão da lista. Recolhida, só a cabeça, com o chevron de avançar.
// Vive na Lista da família linhas. Tocar na cabeça abre ou fecha.
import { CabecaSecao } from '../linhas/index.js'
import './SecaoChecklist.css'

export function SecaoChecklist({ estado = 'aprovada', titulo, contagem, aberta = false, aoTocar, rotulo, children }) {
  return (
    <div className={`ds-secao ${aberta ? 'ds-secao-aberta' : ''}`}>
      <CabecaSecao estado={estado} titulo={titulo} contagem={contagem} aberta={aberta} aoTocar={aoTocar} rotulo={rotulo ?? `${titulo}, ${contagem}`} />
      {aberta && <div className="ds-secao-corpo">{children}</div>}
    </div>
  )
}
