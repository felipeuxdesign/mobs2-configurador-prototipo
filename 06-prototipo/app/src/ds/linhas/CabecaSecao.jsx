// A cabeça da seção do checklist (folha 4): tocar abre ou recolhe (T13).
// É o acordeão: aberta mostra o chevron pra cima; recolhida, pro lado.
//
// titulo ('A · Identificação'), contagem ('4 de 4'), aberta,
// estado: 'aprovada' (check lima) · 'pendente' (círculo cinza) · 'reprovada' (X)
// rotulo: o nome pro leitor de tela (o texto visível, se faltar)
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Icone } from '../primitivos/Icone.jsx'
import './CabecaSecao.css'

const GLIFO = { aprovada: 'ok', pendente: 'espera', reprovada: 'xis' }

export function CabecaSecao({ titulo, contagem, aberta = false, estado = 'pendente', aoTocar, rotulo, nomeGlifo, className = '' }) {
  return (
    <Tocavel className={`ds-cabeca-secao ${className}`} rotulo={rotulo} aoTocar={aoTocar} aria-expanded={aberta}>
      <Poco tam={30}>
        <Glifo estado={GLIFO[estado]} poco={30} nome={nomeGlifo} className={estado === 'pendente' ? 'ds-cabeca-secao-glifo-pendente' : ''} />
      </Poco>
      <span className="ds-cabeca-secao-titulo">{titulo}</span>
      <span className="ds-cabeca-secao-contagem">{contagem}</span>
      <Icone nome={aberta ? 'recolher' : 'avancar'} tam={16} cor="marca" />
    </Tocavel>
  )
}
