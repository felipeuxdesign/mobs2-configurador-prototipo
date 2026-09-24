// A linha de opção (folha 6, usada na folha com opções da folha 2): o ícone
// num poço de 30, o que ela faz, o detalhe e o chevron pra onde leva. Linha de
// 72 (--linha-escolha), tocável inteira: no toque sobe pra --elevado (G14).
// As linhas moram no CartaoDeOpcoes, com a divisória entre elas. O cartão é a
// Lista da família linhas (revisão do C2: era o mesmo cartão desenhado de novo).
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Lista } from '../linhas/Lista.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Icone } from '../primitivos/Icone.jsx'
import './LinhaDeOpcao.css'

export function CartaoDeOpcoes({ children }) {
  return <Lista className="ds-cartao-opcoes">{children}</Lista>
}

// icone: um nome do Icone (reenviar, email, gestor…)
// desabilitado: a saída que ainda não vale (T01·3, o reenvio antes dos 60 s) —
// o mesmo desenho, sem o pressionado e sem o toque (Tocavel).
export function LinhaDeOpcao({ icone, titulo, detalhe, aoTocar, rotulo, forcaToque = false, desabilitado = false }) {
  return (
    <Tocavel className={`ds-linha-opcao ${forcaToque ? 'ds-forca-toque' : ''}`} rotulo={rotulo} aoTocar={aoTocar} desabilitado={desabilitado}>
      <Poco tam={30}><Icone nome={icone} tam={18} cor="secundaria" /></Poco>
      <span className="ds-linha-opcao-textos">
        <span className="ds-linha-opcao-titulo">{titulo}</span>
        <span className="ds-linha-opcao-detalhe">{detalhe}</span>
      </span>
      <Icone nome="avancar" tam={16} cor="apagada" />
    </Tocavel>
  )
}
