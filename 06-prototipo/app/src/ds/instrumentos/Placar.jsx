// O placar da homologação (folha 5, T13): a única barra que enche (Lei 6).
// O rótulo, a escala de 0 ao total com o preenchido do que já se conferiu
// e o marcador nele, e as três marcas embaixo — o meio em lima.
// veredito (C10 · T13/11, G11): o placar que fechou — o rótulo em lima (o
// veredito, Lei 1) e, na mesma linha, a `meta` à direita ('12 evidências ·
// 14:30'), na linha de base. A cabeça fica 2 mais alta, como a referência
// desenha (T13-V1). Sem ele, o placar em curso da folha 5.
import { Escala } from './Escala.jsx'
import './caixas.css'
import './Placar.css'

export function Placar({ rotulo, feitos, total, legendas, veredito = false, meta }) {
  return (
    <div className="ds-placar ds-inst-cartao">
      {veredito
        ? (
          <div className="ds-placar-cabeca">
            <span className="ds-inst-rotulo ds-placar-veredito">{rotulo}</span>
            {meta != null && <span className="ds-inst-legenda">{meta}</span>}
          </div>
        )
        : <span className="ds-inst-rotulo">{rotulo}</span>}
      <Escala tam="placar" min={0} max={total} valor={feitos} faixa={{ de: 0, ate: feitos }} divisoes={4} fortes={[total / 2]} pctInteiro />
      <div className="ds-inst-legendas">
        <span>{legendas.inicio}</span><span className="ds-inst-legenda-lima">{legendas.meio}</span><span>{legendas.fim}</span>
      </div>
    </div>
  )
}
