// O prazo (folha 5 · cronômetro e prazo cheio, T14): o tempo drena (Lei 6).
// O cabeçalho (o rótulo e a nota da fila), o tempo que resta em 62, a escala
// de 0 ao limite com o preenchido do que resta e o marcador nele, as duas
// marcas embaixo e, se houver, a frase do que está acontecendo.
// `restante` e `limite` em segundos; `tempo` é o texto do número (1:36).
import { Escala } from './Escala.jsx'
import './caixas.css'
import './Prazo.css'

// C10 · T14 (G11), duas propriedades nomeadas; sem elas, o prazo é o de sempre:
// · `falha` — o prazo estourou (T14/02): o número em vermelho. Sem o que resta,
//   a escala fica sem o preenchido, com o marcador no zero.
// · `detalhe` como lista — as frases do que o estado quer dizer, uma por linha,
//   na entrelinha da legenda ('A Seção F reprova.' e 'Os cinco passos…', T14/02).
export function Prazo({ rotulo, nota, tempo, restante, limite, legendas, detalhe, falha = false }) {
  return (
    <div className={`ds-prazo ds-inst-cartao ${falha ? 'ds-prazo-falha' : ''}`}>
      <div className="ds-inst-cabeca">
        <span className="ds-inst-rotulo">{rotulo}</span>
        {nota != null && <span className="ds-inst-nota">{nota}</span>}
      </div>
      <div className="ds-prazo-numero"><span className="ds-prazo-tempo">{tempo}</span></div>
      <Escala tam="prazo" min={0} max={limite} valor={restante} faixa={restante > 0 ? { de: 0, ate: restante } : null} divisoes={4} fortes={[limite / 2]} />
      <div className="ds-inst-legendas"><span>{legendas.inicio}</span><span>{legendas.fim}</span></div>
      {detalhe != null && (Array.isArray(detalhe)
        ? <span className="ds-prazo-detalhe ds-prazo-frases">{detalhe.map((f) => <span key={f}>{f}</span>)}</span>
        : <span className="ds-prazo-detalhe">{detalhe}</span>)}
    </div>
  )
}
