// A justificativa (folha 6, T13): o não conforme com o porquê. É o Checkbox
// (primitivo) com a opção e, quando marcado, o campo de texto longo embaixo —
// o estado só abre espaço pro que ele acrescenta (Lei 3).
// A última entrega (decisão 39, folha 6, T13/07, 08 e 15): o não conforme é
// uma caixa nas duas telas do item — antes, um cartão virava a caixa no toque.
// A caixa tem o título e a linha de baixo (`legenda`: *marque e conte o que
// aconteceu*, desmarcada; *conte embaixo o que aconteceu*, marcada — quem monta
// passa a do estado), e o rótulo do campo é *O QUE ACONTECEU* (era
// JUSTIFICATIVA): os textos vêm da tela, do textos.md.
import { Checkbox } from '../index.js'
import { CampoTexto } from './CampoTexto.jsx'
import './Justificativa.css'

export function Justificativa({ opcao, legenda, marcado = false, aoMarcar, rotulo, valor, aoEscrever, focado = false }) {
  return (
    <div className="ds-justificativa">
      <Checkbox marcado={marcado} aoMudar={aoMarcar} legenda={legenda}>{opcao}</Checkbox>
      {marcado && <CampoTexto rotulo={rotulo} valor={valor} aoMudar={aoEscrever} focado={focado} />}
    </div>
  )
}
