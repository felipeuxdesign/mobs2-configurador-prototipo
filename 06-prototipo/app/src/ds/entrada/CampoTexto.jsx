// O campo de texto longo (folha 6, a justificativa da T13): o rótulo de bloco
// em cima e o poço que cresce com o que o técnico escreve, a partir de 48.
// O foco é o do Campo: rótulo e traço de baixo em lima, o traço acendendo da
// esquerda pra direita (TracoFoco.css). O poço não muda de altura no foco: o
// traço de 2 come o recheio de baixo que o de 1 deixava.
import { useId } from 'react'
import './TracoFoco.css'
import './CampoTexto.css'

export function CampoTexto({ rotulo, valor = '', aoMudar, focado = false, id }) {
  const gerado = useId()
  const idCampo = id ?? gerado
  return (
    <div className={`ds-campo-texto ${focado ? 'ds-foco' : ''}`}>
      <label htmlFor={idCampo} className="ds-campo-texto-rotulo">{rotulo}</label>
      <div className="ds-campo-texto-poco ds-traco-foco">
        <textarea
          id={idCampo}
          className="ds-campo-texto-entrada"
          rows={1}
          value={valor}
          onChange={aoMudar ? (e) => aoMudar(e.target.value) : undefined}
          readOnly={!aoMudar}
        />
      </div>
    </div>
  )
}
