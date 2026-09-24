// O cartão que pede ação (folha 6, T06 e T15): o erro que precisa do
// técnico. O mesmo poço do bloco escolhido, com o traço vermelho; em cima o
// X e o rótulo em vermelho, no meio o que falhou e por quê, embaixo a ação —
// o botão secundário. O X é o glifo de falha solto ao lado do rótulo, em 22.
import { Glifo } from '../index.js'
import { BotaoSecundario } from './BotaoSecundario.jsx'
import './CartaoAcao.css'

export function CartaoAcao({ rotulo, titulo, descricao, acao, aoAgir, rotuloAcao }) {
  return (
    <div className="ds-cartao-acao">
      <div className="ds-cartao-acao-cabeca">
        <Glifo estado="xis" className="ds-cartao-acao-glifo" />
        <span className="ds-cartao-acao-rotulo">{rotulo}</span>
      </div>
      <div className="ds-cartao-acao-corpo">
        <span className="ds-cartao-acao-titulo">{titulo}</span>
        <span className="ds-cartao-acao-descricao">{descricao}</span>
      </div>
      <BotaoSecundario aoTocar={aoAgir} rotulo={rotuloAcao}>{acao}</BotaoSecundario>
    </div>
  )
}
