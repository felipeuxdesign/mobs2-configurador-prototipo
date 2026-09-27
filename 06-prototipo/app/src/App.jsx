// O app — o que o técnico usaria. Separado do palco (06-prototipo/CLAUDE.md).
// Mostra a tela do estado único; num estado do palco, a tela montada pelo caso.
import { useLayoutEffect, useRef } from 'react'
import { useEstado } from './estado/estado.jsx'
import { useTeclado } from './estado/teclado.js'
import { EM_QUADRO } from './estado/quadro.js'
import { Rolagem, RaizDaTroca, esmaecerConteudo, emToque, consumirResposta } from './ds/index.js'
import { telaDe } from './telas/index.jsx'

export function App() {
  const { estado } = useEstado()
  const { id, momento, estado: est } = estado.tela
  const Tela = telaDe(id)
  const raiz = useRef(null)
  // o teclado nunca esconde o que importa (regra 10): o app encolhe até o que sobra acima dele
  useTeclado(raiz)
  // a troca entre telas (C12·2, C12·3 · src/ds/chrome/Troca.jsx): quando um toque leva a
  // outra tela, só o conteúdo da nova esmaece, em --mov-rapido; a barra, a tira e a faixa
  // trocam direto. O pulo do palco, o estado, a volta ao fluxo e o Recomeçar sobem a
  // geração, e a tela abre parada; o `ir` que só acerta o endereço fica na mesma tela; o
  // processo que leva sozinho a outra tela não é toque; no print, nada se move
  const antes = useRef({ id, geracao: estado.geracao })
  useLayoutEffect(() => {
    const a = antes.current
    antes.current = { id, geracao: estado.geracao }
    // a resposta de um toque que esperou o servidor (o Entrar do login) conta como o toque
    const doToque = consumirResposta() || emToque()
    if (EM_QUADRO || a.geracao !== estado.geracao || a.id === id || !doToque) return
    esmaecerConteudo(raiz.current)
  }, [id, estado.geracao])
  // a chave muda de tela em tela e a cada pulo do palco (a geração): a tela remonta
  // do zero, e o estado próprio dela não vaza de um pulo pro outro
  return (
    <RaizDaTroca raiz={raiz} parada={EM_QUADRO}>
      <div className="app" aria-label="App Configurador" ref={raiz}>
        <Tela key={`${id}·${estado.geracao}`} momento={momento} estado={est} />
        <Rolagem raiz={raiz} />
      </div>
    </RaizDaTroca>
  )
}
