// As garagens e o pacote de cada uma, num lugar só (G7: lidos do mock na hora
// de montar, nada copiado). São dois mundos da mesma empresa:
//  · o do herói: M.uos e o pacote de cada uma em M.pacotes (3 garagens);
//  · o da lista longa: as garagens que só o caso `lista-longa-garagens` tem
//    (6 das 9), cada uma com o pacote que o caso declara pra ela — a otimização
//    do design: "pra o Sincronizar funcionar em todas" (pac-uo-11 a pac-uo-16).
// A T02 lê daqui a idade da linha, a T03 baixa daqui o pacote, a T04 lê o
// nome da garagem do contexto, e a T06, o contador 'no pacote'.
import { M } from './mock.js'

export const CASO_LISTA_LONGA = 'lista-longa-garagens'
const caso = M.casos[CASO_LISTA_LONGA]

// O que o pacote do caso não declara. Os modelos de ativo e os cartões ele declara
// agora, no contem, como o do herói (a resposta do arquiteto de 26/09: os seis
// pacotes ganham modelos e cartões) — a T03 lê dali. Só a estimativa do servidor
// por item (a do "faltam ~N s") segue sem vir no pacote do caso: sai do que os
// três pacotes do mock declaram iguais (6 s). Se um dia eles divergirem, não há de
// onde ler: a tela para, em vez de inventar (desvio nomeado, pro arquiteto).
function igualNosPacotes(ler, nome) {
  const valores = [...new Set(M.pacotes.map(ler))]
  if (valores.length !== 1) throw new Error(`os pacotes do mock não declaram ${nome} iguais, e o pacote do caso ${CASO_LISTA_LONGA} não o declara`)
  return valores[0]
}

// o pacote do caso, na forma dos de M.pacotes: com a data (o `comData` do mock,
// pelos diasAtras) e a estimativa por item, que ele não declara
const doCaso = (p) => ({
  ...p,
  data: M.diasAntes(p.diasAtras),
  segPorItem: p.segPorItem ?? igualNosPacotes((x) => x.segPorItem, 'a estimativa por item'),
})
const PACOTES_DO_CASO = (caso.pacotes ?? []).map(doCaso)

/** a garagem, do mundo do herói ou do caso da lista longa */
export const garagemDe = (uoId) => M.uos.find((u) => u.id === uoId) ?? caso.uos.find((u) => u.id === uoId)

/** o pacote da garagem: o de M.pacotes, ou o que o caso declara pra garagem que só ele tem */
export const pacoteDaGaragem = (uoId) => M.pacotes.find((p) => p.uoId === uoId) ?? PACOTES_DO_CASO.find((p) => p.uoId === uoId)

/** as UCs e as garagens do caso da lista longa (o estado 02 e os momentos 03 e 04 da T02) */
export const mundoDaListaLonga = () => ({ ucs: caso.ucs, uos: caso.uos, limiteSemBusca: caso.limiteSemBusca })
