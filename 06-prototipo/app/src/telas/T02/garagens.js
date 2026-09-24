// As garagens da T02, lidas do mock na hora de montar (G7). Nenhum número nem
// nome mora aqui. São dois mundos da mesma empresa:
//  · o do herói: M.ucs, M.uos e o pacote de cada UO em M.pacotes — 3 garagens,
//    a idade e a hora do pacote (T02·6) e os ativos que ele traz (T02·5);
//  · o da lista longa: o caso `lista-longa-garagens` (a receita do estado 02),
//    com 9 garagens em 3 regiões, e em cada uma a cidade, a idade e a hora do
//    pacote e os ativos.
// A busca aparece quando o mundo tem mais garagens que o limiteSemBusca do caso
// (6), e filtra por nome ou cidade (entrega do design de 24/09, que muda o T02·7).
import { M } from '../../dados/mock.js'
import { RECEITAS } from '../../estado/receitas.js'
import { chaveDeBusca, idadeNaLinhaDaGaragem, passouDoBloqueio } from '../../dados/formato.js'

export const LISTA_LONGA = '02-estado-lista-longa-com-busca'
const casoDaListaLonga = () => M.casos[RECEITAS[`T02/${LISTA_LONGA}`].casos[0]]

// o limiar do vencido: o do pacote da UO no mock. A garagem que só o caso tem
// não tem pacote em M.pacotes, e lê o limiar que os três pacotes do mock
// declaram iguais (bloqueioDias 7, o "acima do limite de 7" do caso).
const bloqueioDe = (uoId) => (M.pacotes.find((p) => p.uoId === uoId) ?? M.pacotes[0]).limiares.bloqueioDias

function linha({ id, nome, cidade = '' }, dias, hora, ativos, bloqueioDias) {
  return {
    uo: { id, nome, cidade },
    detalhe: idadeNaLinhaDaGaragem(dias, hora, bloqueioDias),
    valor: `${ativos} ativos`,
    vencida: passouDoBloqueio(dias, bloqueioDias),
  }
}

const agrupar = (ucs, uos, daUo) => ucs.map((uc) => ({ uc, linhas: uos.filter((uo) => uo.ucId === uc.id).map(daUo) }))

const HEROI = agrupar(M.ucs, M.uos, (uo) => {
  const p = M.pacotes.find((x) => x.uoId === uo.id)
  return linha(uo, p.diasAtras, p.hora, p.contem.ativos, p.limiares.bloqueioDias)
})

const caso = casoDaListaLonga()
const LONGA = agrupar(caso.ucs, caso.uos, (uo) => linha(uo, uo.pacoteIdadeDias, uo.pacoteHora, uo.ativos, bloqueioDe(uo.id)))

/** os grupos do mundo que o quadro mostra: o do caso no estado 02, o do herói no resto */
export const gruposDo = (estado) => (estado === LISTA_LONGA ? LONGA : HEROI)

/** a busca aparece com mais garagens que o limite sem busca do caso (mais de 6) */
export const temBusca = (grupos) => grupos.reduce((n, g) => n + g.linhas.length, 0) > caso.limiteSemBusca

/** a busca: a linha fica se o texto está no nome da garagem ou na cidade dela,
 *  sem acento e sem caixa; o grupo sem linha some. O vazio fica sem frase: o
 *  textos.md não tem uma (T02·7, vai ao diretor desde o C4). */
export function filtrar(grupos, texto) {
  const q = chaveDeBusca(texto)
  if (!q) return grupos
  const acha = (l) => chaveDeBusca(l.uo.nome).includes(q) || chaveDeBusca(l.uo.cidade).includes(q)
  return grupos.map((g) => ({ ...g, linhas: g.linhas.filter(acha) })).filter((g) => g.linhas.length)
}
