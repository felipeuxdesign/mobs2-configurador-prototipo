// A folha (folha 2): sobe do rodapé, com o puxador e o X. O painel
// --fundo-faixa com borda de cima --borda-poco, recheio 18 em cima e 32 no pé
// (nada visível a menos de 32 do pé). O X tem 44 de desenho e 48 de toque
// (SoIcone). `minima`: a folha da conta abre com 430 no mínimo (T04/05) — a
// de opções (T01/04) não tem (G11). Abre subindo (translateY 100% → 0) em
// 200ms e fecha em 150ms (movimento.md); dentro do Veu (de 'folha').
// Pro leitor (G15): é um diálogo modal, e o nome é o título que já se vê.
// `folga`: o espaço entre os blocos — 14 na da conta, 12 na de trocar de
// garagem (T04/07, G11). `subtitulo`: a frase de 13 embaixo do título, que só
// a de trocar de garagem tem (T04/07).
import { useId } from 'react'
import { SoIcone } from '../primitivos/SoIcone.jsx'
import './Folha.css'

export function Folha({ titulo, subtitulo, aoFechar, rotuloFechar, minima = false, folga = 14, aberta = true, children }) {
  const id = useId()
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={id} className={`ds-folha ${minima ? 'ds-folha-minima' : ''} ${folga === 12 ? 'ds-folha-folga-12' : ''} ${aberta ? '' : 'ds-folha-fechada'}`}>
      <div className="ds-folha-puxador" aria-hidden="true"><span /></div>
      <div className="ds-folha-cabeca">
        <h2 id={id} className="ds-folha-titulo">{titulo}</h2>
        <span className="ds-folha-fechar">
          <SoIcone icone="fechar" tam={20} cor="secundaria" rotulo={rotuloFechar} aoTocar={aoFechar} />
        </span>
      </div>
      {subtitulo != null && <p className="ds-folha-subtitulo">{subtitulo}</p>}
      {children}
    </div>
  )
}
