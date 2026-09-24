// O app — o que o técnico usaria. Separado do palco (06-prototipo/CLAUDE.md).
// Mostra a tela do estado único; num estado do palco, a tela montada pelo caso.
import { useRef } from 'react'
import { useEstado } from './estado/estado.jsx'
import { Rolagem } from './ds/index.js'
import { telaDe } from './telas/index.jsx'

export function App() {
  const { estado } = useEstado()
  const { id, momento, estado: est } = estado.tela
  const Tela = telaDe(id)
  const raiz = useRef(null)
  // a chave muda de tela em tela e a cada pulo do palco (a geração): a tela remonta
  // do zero, e o estado próprio dela não vaza de um pulo pro outro
  return (
    <div className="app" aria-label="App Configurador" ref={raiz}>
      <Tela key={`${id}·${estado.geracao}`} momento={momento} estado={est} />
      <Rolagem raiz={raiz} />
    </div>
  )
}
