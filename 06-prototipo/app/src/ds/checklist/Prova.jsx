// A prova (folha 7): o que o módulo devolveu, num poço com o traço lima
// embaixo — é veredito (Lei 1). O rótulo em lima, a versão e a frase que
// diz como se provou. tipo 'cadeia' (T09, a versão gravada e relida) ou
// 'sessao' (T16, o que sobreviveu ao reinício, a versão maior).
// `legendaMuda` (a entrega do checklist · T11/02, a decisão do diretor de 25/09):
// a legenda que espera a última linha da conferência fica muda pro leitor, como o
// veredito; quem monta a esconde por CSS. Sem ela, nada muda.
import './Prova.css'

export function Prova({ tipo = 'cadeia', rotulo, versao, legenda, legendaMuda = false, className = '', style }) {
  return (
    <div className={`ds-prova ds-prova-${tipo} ${className}`} style={style}>
      <span className="ds-prova-rotulo">{rotulo}</span>
      <span className="ds-prova-versao">{versao}</span>
      <span className="ds-prova-legenda" aria-hidden={legendaMuda ? 'true' : undefined}>{legenda}</span>
    </div>
  )
}
