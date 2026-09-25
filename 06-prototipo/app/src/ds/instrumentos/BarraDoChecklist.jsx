// A barra do checklist (folha 5, a entrega do checklist · decisão 34): a
// barra fina embaixo do título, no lugar do placar. O lima é o que já passou
// (Lei 6: o placar enche); o número fica no título, e a barra não repete ele
// pro leitor de tela. Um item passa: o lima avança até o novo total, por
// transform (scaleX), em --mov-lento (T13 animacao.md); a abertura não anima.
import './BarraDoChecklist.css'

export function BarraDoChecklist({ feitos, total, className = '' }) {
  const parte = total > 0 ? Math.min(1, Math.max(0, feitos / total)) : 0
  return (
    <div className={`ds-barra-ck ${className}`} aria-hidden="true">
      <span className="ds-barra-ck-passou" style={{ '--ds-barra-ck-parte': parte }} />
    </div>
  )
}
