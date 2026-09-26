// A empresa antes da unidade (logica.md · A empresa e a unidade; a otimização
// do design): o técnico com mais de uma empresa escolhe a empresa primeiro —
// `05` *Pra qual empresa hoje?* → `Ver as unidades` → `06` as unidades, com
// `Trocar de empresa` no rodapé → a unidade escolhida → `Sincronizar` → T03.
// Com uma empresa só (o herói), o passo não existe: `00` → `01`.
//
// O mundo é o do caso `varias-empresas` (a receita dos estados 05 e 06): as três
// empresas, cada uma com a contagem das unidades dela. O mock só traz as
// unidades de uma delas — a Viação Atlântico Sul, a empresa do herói (M.empresa),
// cujas unidades são as do mundo dele (M.ucs, M.uos, e o gate confere a
// contagem). Das outras duas, o caso traz só a contagem.
//
// Funções puras, sem React: a tela monta cada quadro e responde a cada toque com
// elas, e `scripts/testar-empresa.mjs` prova o caminho no node — os estados 05 e
// 06 abrem pela coluna e pelo endereço, parados e sem toque (palco.md), e nada
// no mock dá ao herói mais de uma empresa no fluxo.
import { M } from '../../dados/mock.js'
import { RECEITAS } from '../../estado/receitas.js'
import { gruposDo } from './garagens.js'
import { TX } from './textos.js'

export const CASO_EMPRESAS = 'varias-empresas'
export const ESCOLHER_EMPRESA = '05-estado-escolher-a-empresa'
export const UNIDADES_DA_EMPRESA = '06-estado-unidades-com-trocar-empresa'

/** o estado da T02 que o caso varias-empresas monta (a receita dele) */
export const doCasoEmpresas = (est) => Boolean(est && RECEITAS[`T02/${est}`]?.casos?.includes(CASO_EMPRESAS))

/** as empresas do técnico, na ordem do caso */
export const empresas = () => M.casos[CASO_EMPRESAS].empresas
export const empresaDe = (id) => empresas().find((e) => e.id === id) ?? null

/** as unidades da empresa, agrupadas por UC: as do mundo do herói, na empresa
 *  dele; nas outras, nenhuma — o mock traz só a contagem (padrão (a), pro arquiteto) */
export const unidadesDa = (empresaId) => (empresaId === M.empresa.id ? gruposDo(false) : null)

/** o quadro de partida de cada estado: o 05 sem nada escolhido; o 06 com as
 *  unidades da empresa do herói, a que a referência desenha, sem nada escolhido */
export function inicioDoCaso(est) {
  if (est === UNIDADES_DA_EMPRESA) return { passo: 'unidades', empresaId: M.empresa.id, uoId: null }
  return { passo: 'empresas', empresaId: null, uoId: null }
}

// ── o 05 · as empresas ──

/** o rótulo de topo: quantas empresas ('3 EMPRESAS') */
export const rotuloDasEmpresas = () => TX.empresas(empresas().length)
/** a linha de cada empresa: o nome, e quantas unidades ela tem */
export const linhasDasEmpresas = (q) => empresas().map((e) => ({
  id: e.id, nome: e.nome, detalhe: TX.unidades(e.unidades), escolhida: e.id === q.empresaId,
}))
/** o primário: apagado até escolher (Escolha uma empresa); escolhida, Ver as unidades.
 *  Com a empresa que o mock não traz as unidades, ele espera — desabilitado de
 *  verdade e em tinta apagada, como na busca que esconde a escolha (padrão (a)) */
export function primarioDasEmpresas(q) {
  if (!q.empresaId) return { texto: TX.escolhaEmpresa, desabilitado: true }
  return { texto: TX.verUnidades, desabilitado: !unidadesDa(q.empresaId) }
}
/** tocar numa empresa a escolhe (tocar de novo não desmarca, como nas unidades) */
export const escolherEmpresa = (q, id) => ({ ...q, empresaId: id })
/** Ver as unidades: o 06, com as unidades da empresa escolhida e nada escolhido */
export const verAsUnidades = (q) => (unidadesDa(q.empresaId) ? { passo: 'unidades', empresaId: q.empresaId, uoId: null } : q)

// ── o 06 · as unidades da empresa ──

/** o rótulo de topo: a empresa escolhida, como o da empresa do herói no 00 */
export const rotuloDaEmpresa = (q) => empresaDe(q.empresaId)?.nome ?? ''
/** tocar numa unidade a escolhe: o primário diz Sincronizar e o nome dela */
export const escolherUnidade = (q, uoId) => ({ ...q, uoId })
/** Trocar de empresa: o 05, como a referência desenha — nada escolhido (padrão (b)) */
export const trocarDeEmpresa = () => ({ passo: 'empresas', empresaId: null, uoId: null })

/** o voltar do Android (logica.md · O voltar do Android): no 06, o mesmo que o
 *  Trocar de empresa, a saída desenhada; no 05, nada — a tela não tem saída
 *  desenhada, como o 00 (padrão (c)) */
export const voltarNoCaso = (q) => (q.passo === 'unidades' ? trocarDeEmpresa : null)
