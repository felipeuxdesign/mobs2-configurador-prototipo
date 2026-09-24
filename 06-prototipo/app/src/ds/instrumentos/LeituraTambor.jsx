// O hodômetro da T07 (folha 5 · tambor): a leitura sem faixa, em rolete.
// O rótulo e a nota do lado (o "sem faixa"), e o tambor de células com a
// unidade. Sem barra: não há faixa esperada (Lei 5).
import { Tambor } from './Tambor.jsx'
import './caixas.css'
import './LeituraTambor.css'

export function LeituraTambor({ rotulo, nota, valor, de, unidade, nome }) {
  return (
    <div className="ds-leitura-tambor ds-inst-cartao">
      <div className="ds-inst-cabeca">
        <span className="ds-inst-rotulo">{rotulo}</span>
        {nota != null && <span className="ds-inst-nota">{nota}</span>}
      </div>
      <Tambor pele="celulas" valor={valor} de={de} unidade={unidade} nome={nome} />
    </div>
  )
}
