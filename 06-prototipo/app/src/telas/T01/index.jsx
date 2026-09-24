// T01 · Login. A tela abre no quadro do momento ou do estado que o palco
// pede (C4·2). Quando um toque leva a um momento com referência, a URL passa a
// dizê-lo, e a tela não remonta. Remonta só quando o pedido vem de fora — um
// estado aberto pela coluna, a volta ao fluxo, o painel pulando pra T01, o
// Recomeçar —, e abre no quadro que o pedido diz.
import { useCallback, useRef } from 'react'
import { useEstado } from '../../estado/estado.jsx'
import { Login } from './Login.jsx'

export default function T01({ momento, estado }) {
  const { estado: unico, despachar } = useEstado()
  const vista = useRef(unico.tela)   // o lugar que a tela já viu
  const pediu = useRef(false)        // a troca seguinte foi pedida pela própria tela
  const geracao = useRef(0)
  if (unico.tela !== vista.current) {
    if (!pediu.current) geracao.current += 1
    pediu.current = false
    vista.current = unico.tela
  }
  const irMomento = useCallback((m) => {
    pediu.current = true
    despachar({ tipo: 'ir', tela: 'T01', momento: m ?? null })
  }, [despachar])
  return <Login key={`${estado ?? 'fluxo'}·${geracao.current}`} momento={momento} estado={estado} irMomento={irMomento} />
}
