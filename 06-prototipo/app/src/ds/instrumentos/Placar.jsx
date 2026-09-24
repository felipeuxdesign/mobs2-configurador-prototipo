// O placar da homologação (folha 5, T13): a única barra que enche (Lei 6).
// O rótulo, a escala de 0 ao total com o preenchido do que já se conferiu
// e o marcador nele, e as três marcas embaixo — o meio em lima.
import { Escala } from './Escala.jsx'
import './caixas.css'
import './Placar.css'

export function Placar({ rotulo, feitos, total, legendas }) {
  return (
    <div className="ds-placar ds-inst-cartao">
      <span className="ds-inst-rotulo">{rotulo}</span>
      <Escala tam="placar" min={0} max={total} valor={feitos} faixa={{ de: 0, ate: feitos }} divisoes={4} fortes={[total / 2]} pctInteiro />
      <div className="ds-inst-legendas">
        <span>{legendas.inicio}</span><span className="ds-inst-legenda-lima">{legendas.meio}</span><span>{legendas.fim}</span>
      </div>
    </div>
  )
}
