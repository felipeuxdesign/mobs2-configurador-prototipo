// A justificativa (folha 6, T13): o não conforme com o porquê. É o Checkbox
// (primitivo) com a opção e, quando marcado, o campo de texto longo embaixo —
// o estado só abre espaço pro que ele acrescenta (Lei 3).
import { Checkbox } from '../index.js'
import { CampoTexto } from './CampoTexto.jsx'
import './Justificativa.css'

export function Justificativa({ opcao, marcado = false, aoMarcar, rotulo, valor, aoEscrever, focado = false }) {
  return (
    <div className="ds-justificativa">
      <Checkbox marcado={marcado} aoMudar={aoMarcar}>{opcao}</Checkbox>
      {marcado && <CampoTexto rotulo={rotulo} valor={valor} aoMudar={aoEscrever} focado={focado} />}
    </div>
  )
}
