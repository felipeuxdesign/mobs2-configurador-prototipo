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
// elas, e `scripts/testar-empresa.mjs` as prova no node. Os estados 05 e 06 abrem
// pela coluna e pelo endereço, parados e sem toque (palco.md). O momento 07 (a
// empresa escolhida, a última entrega) é o app vivo no mundo do caso: aberto pelo
// endereço, a Viação marcada; dali o técnico anda 07 → Ver as unidades → as
// unidades (o quadro do 06) → a escolhida (01) → Sincronizar → T03, e o mundo vai
// junto no estado único (contexto.empresas), até o menu: a folha de trocar de
// unidade ganha o Trocar de empresa (T04/14), que volta ao 07 com a atual marcada.
import { M } from '../../dados/mock.js'
import { RECEITAS } from '../../estado/receitas.js'
import { gruposDo } from './garagens.js'
import { TX } from './textos.js'

export const CASO_EMPRESAS = 'varias-empresas'
export const ESCOLHER_EMPRESA = '05-estado-escolher-a-empresa'
export const UNIDADES_DA_EMPRESA = '06-estado-unidades-com-trocar-empresa'
export const EMPRESA_ESCOLHIDA = '07-momento-empresa-escolhida'
export const UNIDADE_ESCOLHIDA = '01-momento-escolhida'

/** o estado da T02 que o caso varias-empresas monta (a receita dele) */
export const doCasoEmpresas = (est) => Boolean(est && RECEITAS[`T02/${est}`]?.casos?.includes(CASO_EMPRESAS))

/** as empresas do técnico, na ordem do caso */
export const empresas = () => M.casos[CASO_EMPRESAS].empresas
export const empresaDe = (id) => empresas().find((e) => e.id === id) ?? null

/** as unidades da empresa, agrupadas por UC: as do mundo do herói, na empresa
 *  dele; nas outras, nenhuma — o mock traz só a contagem (padrão (a), pro arquiteto) */
export const unidadesDa = (empresaId) => (empresaId === M.empresa.id ? gruposDo(false) : null)

/** o mundo das empresas no estado único: o técnico com mais de uma empresa, e a
 *  atual — a da unidade que ele escolheu. Nasce no Sincronizar do mundo do caso e
 *  vai junto até o menu (a T03 e a T04 guardam o contexto como está) */
export const mundoDasEmpresas = (atual) => ({ caso: CASO_EMPRESAS, atual })
export const temVariasEmpresas = (contexto) => contexto?.empresas?.caso === CASO_EMPRESAS

/** o app vivo no mundo das empresas: o 07 aberto pelo endereço, ou a T02 aberta no
 *  fluxo com o mundo no contexto (o Trocar de empresa do menu, o Voltar ao contexto
 *  da T03). Num estado da coluna, nunca: ele fica parado */
export const vivoNasEmpresas = (est, momento, contexto) => !est && (momento === EMPRESA_ESCOLHIDA || temVariasEmpresas(contexto))

/** o quadro de partida: o 05 sem nada escolhido; o 06 com as unidades da empresa do
 *  herói, a que a referência desenha, sem nada escolhido. No fluxo, com o mundo no
 *  contexto: sem unidade — o Trocar de empresa do menu —, a lista das empresas com a
 *  atual marcada (o 07); com a unidade — a T03 voltando ao contexto —, as unidades da
 *  atual, sem nada escolhido (o quadro do 06). O 07 pelo endereço: a Viação marcada */
export function inicioDoCaso(est, momento, contexto) {
  if (est === UNIDADES_DA_EMPRESA) return { passo: 'unidades', empresaId: M.empresa.id, uoId: null }
  if (est) return { passo: 'empresas', empresaId: null, uoId: null }
  if (temVariasEmpresas(contexto)) {
    const atual = contexto.empresas.atual
    return contexto.uoId ? { passo: 'unidades', empresaId: atual, uoId: null } : { passo: 'empresas', empresaId: atual, uoId: null }
  }
  if (momento === EMPRESA_ESCOLHIDA) return { passo: 'empresas', empresaId: M.empresa.id, uoId: null }
  return { passo: 'empresas', empresaId: null, uoId: null }
}

/** a URL do mundo vivo (G20): as empresas com uma escolhida é o 07; as unidades sem
 *  escolha não têm momento — o quadro é o do 06, um estado, que parado não anda —;
 *  a unidade escolhida é o 01, o momento de tocar numa unidade (as unidades são as do
 *  herói; o rodapé segue com o Trocar de empresa, padrão d) */
export function momentoDoCaso(q) {
  if (q.passo === 'empresas') return q.empresaId ? EMPRESA_ESCOLHIDA : null
  return q.uoId ? UNIDADE_ESCOLHIDA : null
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
/** Trocar de empresa: a lista das empresas com a atual marcada — o 07 (a resposta
 *  do arquiteto, 26/09: MUDA o padrão (b), que voltava ao 05 sem nada escolhido) */
export const trocarDeEmpresa = (q) => ({ passo: 'empresas', empresaId: q.empresaId, uoId: null })
/** o Sincronizar no mundo das empresas: a unidade, e o mundo junto, pro menu */
export const contextoDoCaso = (q, contexto, uoId) => ({ ...contexto, uoId, pacote: null, empresas: mundoDasEmpresas(q.empresaId) })

/** o voltar do Android (logica.md · O voltar do Android): nas unidades (o 06), o
 *  mesmo que o Trocar de empresa, a saída desenhada; nas empresas (05 e 07), nada —
 *  a tela não tem saída desenhada, como o 00 (padrão (c), que o arquiteto confirmou) */
export const voltarNoCaso = (q) => (q.passo === 'unidades' ? trocarDeEmpresa : null)
