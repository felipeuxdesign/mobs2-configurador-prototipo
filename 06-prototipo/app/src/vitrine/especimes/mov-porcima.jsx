// O movimento · o registro sem resto (gate C12·19): o pedido que vira o registro no mesmo lugar —
// a linha de ação (T06/02 → 07) e o link do rodapé (T14/04 → 06). No toque, o conteúdo novo
// esmaece em --mov-rapido, sem preenchimento: acabou, a animação não fica viva (o `quieto` da
// régua passa logo depois). Aberto já registrado, parado. Nenhum dos dois toques se alcança no
// palco sem o mundo do chassi divergente (T06) ou do ciclo que falha (T14): por isso a vitrine
// (C12·13). O resto do que vem por cima — a folha, o diálogo, a troca no mesmo véu, o arraste e
// o foco — se prova no app (scripts/caminhos/mov-porcima.mjs). Os textos são os do textos.js da
// T14 (os mesmos do textos.md da T06) e a hora é a do mock: nada escrito aqui.
import { useState } from 'react'
import { LinhaTocavel, Link } from '../../ds/index.js'
import { M } from '../../dados/mock.js'
import { T as T14 } from '../../telas/T14/textos.js'

function EspecimeDaLinha() {
  const [pedido, setPedido] = useState(false)
  return pedido
    ? <LinhaTocavel variante="acao" registrado estado="relogio" titulo={T14.solicitada(M.HORA_NOMINAL)} />
    : <LinhaTocavel variante="acao" titulo={T14.solicitar} aoTocar={() => setPedido(true)} />
}

function EspecimeDoLink() {
  const [pedido, setPedido] = useState(false)
  return <Link registrado={pedido} aoTocar={() => setPedido(true)}>{pedido ? T14.solicitada(M.HORA_NOMINAL) : T14.solicitar}</Link>
}

export const especimes = [
  { id: 'mov-registro-linha', folha: 4, semBancada: true, rotulo: 'o pedido que vira registro · a linha',
    legenda: 'toque no Solicitar · o registro esmaece em 150, e nada fica animando depois',
    render: () => <EspecimeDaLinha /> },
  { id: 'mov-registro-link', folha: 1, semBancada: true, rotulo: 'o pedido que vira registro · o link',
    legenda: 'toque no Solicitar · o registro esmaece em 150, e nada fica animando depois',
    render: () => <EspecimeDoLink /> },
]
