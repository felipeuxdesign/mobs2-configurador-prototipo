// O app — o que o técnico usaria. Separado do palco (06-prototipo/CLAUDE.md).
// Mostra a tela do estado único; num estado do palco, a tela montada pelo caso.
import { useLayoutEffect, useRef } from 'react'
import { useEstado } from './estado/estado.jsx'
import { useTeclado } from './estado/teclado.js'
import { EM_QUADRO } from './estado/quadro.js'
import { Rolagem, RaizDaTroca, MundoDaBarra, esmaecerConteudo, emToque, consumirResposta } from './ds/index.js'
import { RECEITAS } from './estado/receitas.js'
import { telaDe } from './telas/index.jsx'

// A barra do sistema segue o mundo em duas coisas só (lei 22, o pacote 2 · MUDANCAS §10),
// e quem diz o mundo é o celular, num lugar só, lendo o estado único:
// · o Bluetooth — a sessão com o módulo conectado: nasce quando a conexão se completa
//   (a T05 grava a sessão no Conectar) e sai quando a sessão encerra — a T16 tira a sessão
//   do estado único ao fechar o passo 7, a Desconexão (D6); o módulo com o link caído
//   (saude 'falha') não está conectado. Num estado da coluna, vale o mundo do caso que o
//   monta (receitas.js), quando ele não tem módulo conectado: o link que caiu (T04/03), a
//   unidade sem instalação e a fila vazia, sem sessão (T12/02, T15/03 e 04), o autoteste,
//   que roda depois da Desconexão (T16/05), e a sessão interrompida de antes (T16/06)
// · sem rede — o aparelho sem internet (situacao.rede), ou o estado da coluna que um caso
//   sem rede monta (receitas.js): o login sem conexão (T01/14), a falha de rede do
//   Sincronizar (T03/01), o menu sem conexão (T04/15) e o servidor sem rede (T12/03)
// A tela que monta um mundo só dela num estado da coluna passa a propriedade à barra, e ela vence
const CASOS_SEM_REDE = ['sem-conexao-no-login', 'sync-falha-rede', 'sem-conexao-no-menu', 'instalacoes-sem-rede']
const CASOS_SEM_MODULO = ['link-perdido', 'instalacoes-vazia', 'fila-vazia', 'autoteste-falhando', 'sessao-interrompida']
export function mundoDaBarra(estado) {
  const { sessao, situacao, tela } = estado
  const receita = tela.estado ? RECEITAS[`${tela.id}/${tela.estado}`] : null
  const casos = receita ? [...(receita.casos ?? []), ...(receita.aditivo ? [receita.aditivo] : [])] : []
  return {
    bluetooth: !!sessao?.moduloSerial && sessao.saude !== 'falha' && !casos.some((c) => CASOS_SEM_MODULO.includes(c)),
    semRede: situacao.rede !== 'conectada' || casos.some((c) => CASOS_SEM_REDE.includes(c)),
  }
}

export function App() {
  const { estado } = useEstado()
  const { id, momento, estado: est } = estado.tela
  const Tela = telaDe(id)
  const raiz = useRef(null)
  const mundo = mundoDaBarra(estado)
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
      <MundoDaBarra.Provider value={mundo}>
        <div className="app" aria-label="App Configurador" ref={raiz}>
          <Tela key={`${id}·${estado.geracao}`} momento={momento} estado={est} />
          <Rolagem raiz={raiz} />
        </div>
      </MundoDaBarra.Provider>
    </RaizDaTroca>
  )
}
