// O link (folha 1): 48 de toque, 15/500 em --tinta-secundaria; no toque, vira
// --tinta. A cor não anima (só transform e opacity): são duas camadas, e a do
// toque entra por opacity e solta em 100ms (G14, G26).
import { useState } from 'react'
import { Glifo } from './Glifo.jsx'
import './Link.css'

// C4 · T03: quando o texto é uma frase, a camada do toque o repete por CSS
// (data-texto), e o texto do documento fica um só — o que o leitor e a régua
// dos textos leem. O desenho é o mesmo.
//
// C10 · T14/06 (G11): `registrado` — o link depois do toque vira o registro do
// pedido, no mesmo lugar e do mesmo tamanho (os 48): não é mais tocável (nem
// botão pro leitor de tela, é um aviso de status), e mostra o glifo `estado` (o
// relógio, de 14) e o que ficou feito, os dois em --tinta-apagada, a 8 um do
// outro. Como a linha de ação registrada da T06: quando vira na frente de quem
// olha, o conteúdo esmaece em 150ms; aberto já registrado, aparece parado.
export function Link({ children, aoTocar, rotulo, desabilitado = false, registrado = false, estado = 'relogio', nomeGlifo, className = '' }) {
  // o que o link era na última vez: só a troca pro registro esmaece, nunca a abertura
  const [antes, setAntes] = useState(registrado)
  const [trocou, setTrocou] = useState(false)
  if (antes !== registrado) { setAntes(registrado); setTrocou(registrado) }
  if (registrado) {
    return (
      <span role="status" className={`ds-link ds-link-registro ${trocou ? 'ds-link-registro-entra' : ''} ${className}`}>
        <Glifo estado={estado} poco={24} nome={nomeGlifo} />
        <span className="ds-link-registro-texto">{children}</span>
      </span>
    )
  }
  const frase = typeof children === 'string' ? children : undefined
  return (
    <button type="button" className={`ds-link ${className}`} aria-label={rotulo} disabled={desabilitado} onClick={aoTocar}>
      <span className="ds-link-texto">{children}</span>
      <span className="ds-link-toque" aria-hidden="true" data-texto={frase}>{frase == null ? children : null}</span>
    </button>
  )
}
