// A linha tocável solta (folha 1): o estado de toque de toda linha — normal
// e pressionado (R-12). Sem hover; o pressionado entra no toque e solta em 100ms.
//
// titulo, valor, estado (o glifo do Glifo no poço de 26; 'espera' por padrão),
// aoTocar, rotulo (o nome pro leitor de tela; o texto visível, se faltar),
// forcaToque: fotografa o pressionado parado (ds-forca-toque)
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaTocavel.css'

// variante (C8 · T06/02, G11): 'padrao' (a folha 1) ou 'acao' — a linha de
// ação solta, de 50 e sem poço: o que se pede em 14/600 e, à direita, o que
// acompanha em 12 apagado (T06/02 'anexa os dois', T13/07 'pede justificativa')
export function LinhaTocavel({ titulo, valor, estado = 'espera', nomeGlifo, aoTocar, rotulo, desabilitado = false, forcaToque = false, variante = 'padrao', className = '' }) {
  const acao = variante === 'acao'
  return (
    <Tocavel className={`ds-linha-tocavel ${acao ? 'ds-linha-tocavel-acao' : ''} ${forcaToque ? 'ds-forca-toque' : ''} ${className}`} rotulo={rotulo} aoTocar={aoTocar} desabilitado={desabilitado}>
      {!acao && <Poco tam={26}><Glifo estado={estado} poco={26} nome={nomeGlifo} /></Poco>}
      <span className="ds-linha-tocavel-titulo">{titulo}</span>
      {valor != null && <span className="ds-linha-tocavel-valor">{valor}</span>}
    </Tocavel>
  )
}
