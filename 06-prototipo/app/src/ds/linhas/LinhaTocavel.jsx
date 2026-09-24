// A linha tocável solta (folha 1): o estado de toque de toda linha — normal
// e pressionado (R-12). Sem hover; o pressionado entra no toque e solta em 100ms.
//
// titulo, valor, estado (o glifo do Glifo no poço de 26; 'espera' por padrão),
// aoTocar, rotulo (o nome pro leitor de tela; o texto visível, se faltar),
// forcaToque: fotografa o pressionado parado (ds-forca-toque)
import { useState } from 'react'
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaTocavel.css'

// variante (C8 · T06/02, G11): 'padrao' (a folha 1) ou 'acao' — a linha de
// ação solta, de 50 e sem poço: o que se pede em 14/600 e, à direita, o que
// acompanha em 12 apagado (T06/02 'anexa os dois', T13/07 'pede justificativa')
//
// registrado (T06/07, G11): a linha de ação depois do toque vira o registro do
// pedido, no mesmo cartão de 50 — não é mais tocável (nem botão pro leitor de
// tela): o glifo `estado` no poço de 24 e, empilhados, o que ficou feito
// (titulo, 15/600) e o que acontece agora (valor, 12 secundário). Quando a
// linha vira o registro na frente de quem olha, o conteúdo novo esmaece em
// 150ms (T06 animacao.md); aberta já registrada (a URL, o print), aparece parada.
export function LinhaTocavel({ titulo, valor, estado = 'espera', nomeGlifo, aoTocar, rotulo, desabilitado = false, forcaToque = false, variante = 'padrao', registrado = false, className = '' }) {
  const acao = variante === 'acao'
  // o que a linha era na última vez: só a troca pro registro esmaece, nunca a abertura
  const [antes, setAntes] = useState(registrado)
  const [trocou, setTrocou] = useState(false)
  if (antes !== registrado) { setAntes(registrado); setTrocou(registrado) }
  if (acao && registrado) {
    return (
      <div role="status" className={`ds-linha-tocavel ds-linha-tocavel-acao ds-linha-tocavel-registro ${trocou ? 'ds-linha-tocavel-registro-entra' : ''} ${className}`}>
        <Poco tam={24}><Glifo estado={estado} poco={24} nome={nomeGlifo} /></Poco>
        <span className="ds-linha-tocavel-registro-texto">
          <span className="ds-linha-tocavel-registro-titulo">{titulo}</span>
          {valor != null && <span className="ds-linha-tocavel-registro-valor">{valor}</span>}
        </span>
      </div>
    )
  }
  return (
    <Tocavel className={`ds-linha-tocavel ${acao ? 'ds-linha-tocavel-acao' : ''} ${forcaToque ? 'ds-forca-toque' : ''} ${className}`} rotulo={rotulo} aoTocar={aoTocar} desabilitado={desabilitado}>
      {!acao && <Poco tam={26}><Glifo estado={estado} poco={26} nome={nomeGlifo} /></Poco>}
      <span className="ds-linha-tocavel-titulo">{titulo}</span>
      {valor != null && <span className="ds-linha-tocavel-valor">{valor}</span>}
    </Tocavel>
  )
}
