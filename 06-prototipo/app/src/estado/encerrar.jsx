// O ENCERRAR da faixa (decisão 36, logica.md · ENCERRAR), numa peça só pras
// telas com a faixa (T04 a T15): antes de homologar, ele pede confirmação — o
// diálogo *Encerrar sem homologar?* (T04/13) —, e depois de homologar vai
// direto, pros passos do encerramento da T16.
//   Continuar a instalação   o principal (D-51): fecha, e o técnico fica onde estava
//   Encerrar sem homologar   a sessão abortada da T16, os 4 passos (T16/03)
// O voltar do Android, com o diálogo aberto, fecha o diálogo, como o Continuar
// (O voltar do Android · numa folha ou num diálogo): ele vale antes do da tela
// (useVoltar · porCima). O movimento é o dos diálogos (movimento.md): o véu e a
// caixa esmaecem, e a caixa cresce de 98% a 100%, em 150ms; aberto pela URL ou
// no print, nasce aberto, parado.
//
// Onde ele abre: no menu, o momento 13 da T04, que tem endereço — a T04 passa
// `aberto` e quem abre e fecha (a URL segue o quadro, G20), e põe o `dialogo` no
// lugar dela por cima do menu, como o aviso do acesso. Nas outras telas, por
// cima da própria tela, onde o ENCERRAR foi tocado, sem endereço (a referência
// só desenha o do menu; a decisão padrão deste ciclo): o `sobre`, com o véu
// embaixo da barra do sistema, cobrindo a faixa, como a T04/13 desenha, e o que
// fica atrás dele inerte (G25) — nem o toque nem o leitor chegam lá.
//
// Os textos são os da T04/13 (02-telas/T04-menu/textos.md), os mesmos em toda tela.
import { useLayoutEffect, useRef, useState } from 'react'
import { Veu, Dialogo, Frase } from '../ds/index.js'
import { useEstado } from './estado.jsx'
import { useVoltar } from './voltar.js'
// a presença do diálogo (entra fechado e abre; sai fechando antes de desmontar) é a da T01
import { usePresenca } from '../telas/T01/presenca.js'
import './encerrar.css'

// a sessão abortada, os 4 passos (T16/03, G23)
export const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar'

const TX = {
  titulo: 'Encerrar sem homologar?',
  frase: 'A instalação ainda não foi homologada. O módulo fica seguro, e o que já foi gravado fica nele.',
  continuar: 'Continuar a instalação',
  semHomologar: 'Encerrar sem homologar',
}

// O que fica atrás do véu é inerte (G25): as irmãs do lugar por cima, na tela.
// Refeito a cada desenho, pra pegar o que a tela trocar embaixo dele.
function PorCimaDaTela({ children }) {
  const lugar = useRef(null)
  useLayoutEffect(() => {
    const el = lugar.current
    const atras = [...el.parentElement.children].filter((c) => c !== el && !c.hasAttribute('inert'))
    atras.forEach((c) => c.setAttribute('inert', ''))
    return () => atras.forEach((c) => c.removeAttribute('inert'))
  })
  return <div ref={lugar} className="encerrar-sobre">{children}</div>
}

// `aberto`, `aoAbrir` e `aoFechar`: quando quem abre é a URL (o 13 da T04).
// Sem eles, o diálogo mora na própria tela. `homologada`: quando a tela sabe
// antes do estado único (o registro da T13); sem ela, a do estado único.
export function useEncerrar({ aberto: pedido, aoAbrir, aoFechar, homologada } = {}) {
  const { estado, despachar } = useEstado()
  const [proprio, setProprio] = useState(false)
  const pelaUrl = pedido !== undefined
  const aberto = pelaUrl ? pedido : proprio
  const presenca = usePresenca(aberto)

  const fechar = () => (pelaUrl ? aoFechar() : setProprio(false))
  const semHomologar = () => despachar({ tipo: 'ir', tela: 'T16', momento: ENCERRAR_SEM_HOMOLOGAR })
  // depois de homologar, direto: os passos do encerramento (T16/00); antes, o diálogo
  const encerrar = () => {
    if (homologada ?? estado.etapas.checklist?.homologada) despachar({ tipo: 'ir', tela: 'T16' })
    else if (pelaUrl) aoAbrir()
    else setProprio(true)
  }
  useVoltar(aberto ? fechar : null, { porCima: true })

  const dialogo = presenca.montado ? (
    <Veu de="dialogo" visivel={presenca.visivel}>
      <Dialogo titulo={TX.titulo} primario={TX.continuar} aoPrimario={fechar}
        saida={TX.semHomologar} aoSair={semHomologar} margem={24} aberto={presenca.visivel}>
        <Frase>{TX.frase}</Frase>
      </Dialogo>
    </Veu>
  ) : null
  const sobre = dialogo && <PorCimaDaTela>{dialogo}</PorCimaDaTela>
  return { encerrar, aberto, montado: presenca.montado, fechar, dialogo, sobre }
}
