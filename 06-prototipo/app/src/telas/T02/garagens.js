// As unidades da T02, lidas do mock na hora de montar (G7). Nenhum número nem
// nome mora aqui. São dois mundos da mesma empresa:
//  · o do herói: M.ucs, M.uos e o pacote de cada UO em M.pacotes — 3 garagens,
//    a idade e a hora do pacote (T02·6) e os ativos que ele traz (T02·5);
//  · o da lista longa: o caso `lista-longa-garagens` (a receita do estado 02),
//    com 9 garagens em 3 regiões, cada uma com a cidade. O pacote de cada uma é
//    o de M.pacotes (as três que o herói também tem) ou o que o caso declara pra
//    ela (as outras seis, a otimização do design) — src/dados/garagens.js. A linha
//    diz a idade e a hora do pacote e os ativos que ele traz, como no herói.
// A busca aparece quando o mundo tem mais garagens que o limiteSemBusca do caso
// (6), e filtra por nome ou cidade (entrega do design de 24/09, que muda o T02·7).
import { M } from '../../dados/mock.js'
import { chaveDeBusca, idadeNaLinhaDaGaragem, passouDoBloqueio } from '../../dados/formato.js'
import { pacoteDaGaragem, mundoDaListaLonga } from '../../dados/garagens.js'
import { TX } from './textos.js'

export const LISTA_LONGA = '02-estado-lista-longa-com-busca'
// a busca sem resultado (a entrega de 25/09): um momento do mesmo caso, que abre pelo endereço
export const SEM_RESULTADO = '03-momento-busca-sem-resultado'
// a busca que acha outras garagens e esconde a escolhida (a otimização do design): o mesmo caso, pelo endereço
export const ESCONDE = '04-momento-busca-esconde-a-escolha'

// a linha da garagem: a idade e a hora do pacote dela, e os ativos que ele traz;
// vencida pelo limiar do próprio pacote (T02·6)
function linha({ id, nome, cidade = '' }) {
  const p = pacoteDaGaragem(id)
  return {
    uo: { id, nome, cidade },
    detalhe: idadeNaLinhaDaGaragem(p.diasAtras, p.hora, p.limiares.bloqueioDias),
    valor: TX.ativos(p.contem.ativos),
    vencida: passouDoBloqueio(p.diasAtras, p.limiares.bloqueioDias),
  }
}

const agrupar = (ucs, uos) => ucs.map((uc) => ({ uc, linhas: uos.filter((uo) => uo.ucId === uc.id).map(linha) }))

const HEROI = agrupar(M.ucs, M.uos)
const caso = mundoDaListaLonga()
const LONGA = agrupar(caso.ucs, caso.uos)

/** os grupos do mundo que o quadro mostra: o do caso no estado 02 e nos momentos 03 e 04, o do herói no resto */
export const gruposDo = (doCaso) => (doCaso ? LONGA : HEROI)

/** a busca aparece com mais garagens que o limite sem busca do caso (mais de 6) */
export const temBusca = (grupos) => grupos.reduce((n, g) => n + g.linhas.length, 0) > caso.limiteSemBusca

/** a busca: a linha fica se o texto está no nome da garagem ou na cidade dela,
 *  sem acento e sem caixa; o grupo sem linha some. Sem nenhuma, a tela diz o
 *  vazio declarado, com o termo no título (o momento 03, a entrega de 25/09). */
export function filtrar(grupos, texto) {
  const q = chaveDeBusca(texto)
  if (!q) return grupos
  const acha = (l) => chaveDeBusca(l.uo.nome).includes(q) || chaveDeBusca(l.uo.cidade).includes(q)
  return grupos.map((g) => ({ ...g, linhas: g.linhas.filter(acha) })).filter((g) => g.linhas.length)
}
