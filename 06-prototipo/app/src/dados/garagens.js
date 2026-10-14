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

// As garagens das outras duas empresas do herói (o diretor, 14/10): cada uma é espelho de uma
// garagem da Viação — o mesmo pacote, os mesmos ônibus e os mesmos casos, só com outro nome
// (M.empresas[].garagens). No contexto, o id é o da espelho (tudo o que lê pacote e ônibus
// segue igual), e o contexto guarda a garagem escolhida (`unidade`), pelo nome dela.
const ESPELHADAS = M.empresas.flatMap((e) => (e.garagens ?? []).map((g) => ({ ...g, empresaId: e.id })))

/** a garagem, do mundo do herói, do caso da lista longa ou das outras empresas */
export const garagemDe = (uoId) => M.uos.find((u) => u.id === uoId) ?? caso.uos.find((u) => u.id === uoId) ?? ESPELHADAS.find((u) => u.id === uoId)

/** a garagem da Viação cujos dados ela usa: a espelho, ou ela mesma */
export const espelhoDe = (uoId) => ESPELHADAS.find((u) => u.id === uoId)?.espelho ?? uoId

/** as garagens de uma das outras empresas (nenhuma, pra Viação: ela tem M.uos) */
export const garagensDaEmpresa = (empresaId) => ESPELHADAS.filter((g) => g.empresaId === empresaId)

/** o pacote da garagem: o de M.pacotes, ou o que o caso declara pra garagem que só ele tem; a espelhada, o da espelho */
export const pacoteDaGaragem = (uoId) => M.pacotes.find((p) => p.uoId === espelhoDe(uoId)) ?? PACOTES_DO_CASO.find((p) => p.uoId === uoId)

/** o contexto que a garagem escolhida monta: o id da espelho e, na espelhada, a garagem escolhida (o nome dela) */
export const contextoDaGaragem = (uoId) => ({ uoId: espelhoDe(uoId), unidade: espelhoDe(uoId) !== uoId ? { id: uoId, nome: garagemDe(uoId).nome } : null })

/** o nome da garagem do contexto: o da escolhida, se for espelhada; senão o da própria garagem */
export const nomeDaGaragem = (contexto, uoId) => (contexto?.unidade && espelhoDe(contexto.unidade.id) === uoId ? contexto.unidade.nome : garagemDe(uoId)?.nome)

/** as UCs e as garagens do caso da lista longa (o estado 02 e os momentos 03 e 04 da T02) */
export const mundoDaListaLonga = () => ({ ucs: caso.ucs, uos: caso.uos, limiteSemBusca: caso.limiteSemBusca })
