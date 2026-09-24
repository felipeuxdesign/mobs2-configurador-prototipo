// As peças só da T01: desenhadas nas referências dela e sem linha no
// componentes.md (gate C0, T01 · 2). Montadas com o que o design system já
// tem — o Tocavel, a caixa de poço, o Icone, o traço de foco — e medidas
// contra as referências. A unificação com as peças das folhas vai ao diretor.
import { Tocavel, Icone, ESTADOS } from '../../ds/index.js'
import '../../ds/cartoes/caixas.css'
import '../../ds/entrada/TracoFoco.css'

// O cartão do canal (02): o poço alto que cresce até a sobra, o rótulo e o
// contato centrados. O escolhido acende o traço e o rótulo em lima; o tamanho
// do contato é do canal — 26 no telefone, 18 no e-mail (T01·5).
export function CartaoCanal({ rotulo, contato, tipo, escolhido = false, aoTocar }) {
  return (
    <Tocavel role="radio" aria-checked={escolhido} aoTocar={aoTocar}
      className={`t01-canal ds-caixa-poco ${escolhido ? 't01-canal-escolhido' : ''}`}>
      <span className="t01-canal-rotulo">{rotulo}</span>
      <span className={`t01-canal-contato t01-canal-contato-${tipo}`}>{contato}</span>
    </Tocavel>
  )
}

// O cartão do código (03, 05, 06, 07): o prazo que resta ou as tentativas.
// `falha` acende o traço vermelho embaixo e o rótulo (a falha mora no
// elemento, Lei 2); `numeroFalha` pinta só o número (o expirado, 06).
export function CartaoDoCodigo({ rotulo, numero, frase, falha = false, numeroFalha = false }) {
  return (
    <div className={`t01-cartao-codigo ds-caixa-poco ${falha ? 'ds-caixa-falha t01-cartao-codigo-falha' : ''}`}>
      <span className="t01-cartao-codigo-rotulo">{rotulo}</span>
      <span className={`t01-cartao-codigo-numero ${numeroFalha ? 't01-cartao-codigo-numero-falha' : ''}`}>{numero}</span>
      {frase != null && <span className="t01-cartao-codigo-frase">{frase}</span>}
    </div>
  )
}

// A linha do código conferido (08): o check solto (Lei 4, a exceção dos
// requisitos da senha), o que foi conferido e o código.
export function LinhaConferido({ texto, valor }) {
  return (
    <div className="t01-conferido-lugar">
      <div className="t01-conferido">
        <span className="t01-conferido-marca" role="img" aria-label={ESTADOS.ok.nome}>
          <Icone nome="check" tam={16} cor="lima" />
        </span>
        <span className="t01-conferido-texto">{texto}</span>
        <span className="t01-conferido-valor">{valor}</span>
      </div>
    </div>
  )
}

// O campo da senha nova (08): sem rótulo e sem olho, o texto à vista em
// 20/700, o traço de foco do campo (TracoFoco.css). Pro leitor, o nome é o
// título que já se vê (G15, M17).
export function CampoSenhaNova({ valor, aoMudar, rotuladoPor }) {
  return (
    <div className="t01-senha-nova-lugar ds-foco">
      <div className="t01-senha-nova ds-caixa-poco ds-traco-foco">
        <input className="t01-senha-nova-entrada" type="text" value={valor} aria-labelledby={rotuladoPor}
          onChange={(e) => aoMudar(e.target.value)} autoComplete="new-password" autoCapitalize="none" spellCheck={false} />
      </div>
    </div>
  )
}
