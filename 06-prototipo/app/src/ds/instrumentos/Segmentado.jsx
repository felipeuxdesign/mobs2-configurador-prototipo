// O segmentado (folha 5): um segmento por passo. O cabeçalho do passo — o
// rótulo e o contador (o número em branco, o total apagado) —, os segmentos
// e, embaixo, o que vem depois. O segmento do passo atual é branco e mais
// alto; o feito é lima apagado (--lima-feito); o pendente, a borda.
// `segmentos`: um por passo, 'atual' · 'feito' · 'pendente'.
import './Segmentado.css'

export function Segmentado({ rotulo, contagem, total, segmentos, legenda }) {
  return (
    <div className="ds-segmentado">
      <div className="ds-segmentado-cabeca">
        <span className="ds-segmentado-rotulo">{rotulo}</span>
        <span className="ds-segmentado-contador">{contagem} <span className="ds-segmentado-total">{total}</span></span>
      </div>
      <div className="ds-segmentado-segmentos" aria-hidden="true">
        {segmentos.map((s, i) => <span key={i} className={`ds-segmento ds-segmento-${s}`} />)}
      </div>
      {legenda != null && <span className="ds-segmentado-legenda">{legenda}</span>}
    </div>
  )
}
