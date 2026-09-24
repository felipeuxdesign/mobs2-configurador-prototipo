// O campo (folha 6): o rótulo em cima e o poço de 54 (--campo) com o texto
// digitado em 17/600. Em foco, o rótulo e o traço de baixo viram lima (Lei 1:
// o campo em foco conta como escolhido) e o traço acende da esquerda pra
// direita (TracoFoco.css). `focado` fotografa o foco parado; no toque, o foco
// de verdade faz o mesmo. `oculto` é a senha escondida: os pontos com
// --ls-senha; sem ele, a senha visível (folha 6): o texto por extenso, com o
// espaçamento normal. Quando troca entre os dois, o texto esmaece no lugar, em
// --mov-rapido (animacao.md da T01); ao abrir, nada anima. `acao` é o botão só
// de ícone dentro do poço (o olho da senha, que vira o riscado).
import { useId, useRef } from 'react'
import './TracoFoco.css'
import './Campo.css'

export function Campo({ rotulo, valor = '', aoMudar, focado = false, oculto = false, acao, id, tipo = 'text', ...resto }) {
  const gerado = useId()
  const idCampo = id ?? gerado
  // a troca entre escondida e visível reinicia a animação trocando o nome dela (a e b),
  // sem remontar o campo — o foco e o cursor ficam onde estão
  const inicial = useRef(oculto); const mudou = useRef(false)
  if (inicial.current !== oculto) mudou.current = true
  const troca = mudou.current ? (oculto ? 'ds-troca-a' : 'ds-troca-b') : ''
  return (
    <div className={`ds-campo ${acao ? 'ds-campo-com-acao' : ''} ${focado ? 'ds-foco' : ''}`}>
      <label htmlFor={idCampo} className="ds-campo-rotulo">{rotulo}</label>
      <div className="ds-campo-poco ds-traco-foco">
        <input
          id={idCampo}
          className={`ds-campo-entrada ${oculto ? 'ds-campo-oculto' : ''} ${troca}`}
          type={oculto ? 'password' : tipo}
          value={valor}
          onChange={aoMudar ? (e) => aoMudar(e.target.value) : undefined}
          readOnly={!aoMudar}
          {...resto}
        />
        {acao && <span className="ds-campo-acao">{acao}</span>}
      </div>
    </div>
  )
}
