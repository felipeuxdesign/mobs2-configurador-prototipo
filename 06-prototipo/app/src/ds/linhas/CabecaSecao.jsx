// A cabeça da seção do checklist (folha 4): tocar abre ou recolhe (T13).
// É o acordeão: aberta mostra o chevron pra cima; recolhida, pro lado.
//
// titulo ('A · Identificação'), contagem ('4 de 4'), aberta,
// estado: 'aprovada' (check lima) · 'pendente' (círculo cinza) · 'reprovada' (X)
//   · 'aguarda' (C10 · T13/01–06, G11): o relógio em --marca-limite, a seção que
//   espera outra tela (E, o ciclo). No acordeão, o nome e a contagem não apagam.
// legenda (C10 · T13/01–06, G11): a linha de 12 embaixo do nome (F · não
//   bloqueia), na mesma cabeça de 44.
// rotulo: o nome pro leitor de tela (o texto visível, se faltar)
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Icone } from '../primitivos/Icone.jsx'
import './CabecaSecao.css'

const GLIFO = { aprovada: 'ok', pendente: 'espera', reprovada: 'xis', aguarda: 'relogio' }

export function CabecaSecao({ titulo, legenda, contagem, aberta = false, estado = 'pendente', aoTocar, rotulo, nomeGlifo, className = '' }) {
  return (
    <Tocavel className={`ds-cabeca-secao ${className}`} rotulo={rotulo} aoTocar={aoTocar} aria-expanded={aberta}>
      <Poco tam={30}>
        <Glifo estado={GLIFO[estado]} poco={30} nome={nomeGlifo} className={estado === 'pendente' || estado === 'aguarda' ? `ds-cabeca-secao-glifo-${estado}` : ''} />
      </Poco>
      {legenda == null
        ? <span className="ds-cabeca-secao-titulo">{titulo}</span>
        : (
          <span className="ds-cabeca-secao-texto">
            <span className="ds-cabeca-secao-titulo">{titulo}</span>
            <span className="ds-cabeca-secao-legenda">{legenda}</span>
          </span>
        )}
      <span className="ds-cabeca-secao-contagem">{contagem}</span>
      <Icone nome={aberta ? 'recolher' : 'avancar'} tam={16} cor="marca" />
    </Tocavel>
  )
}
