// A conta do pacote da T03, lida do mock na hora de montar (G7). Nenhum
// número mora aqui: a ordem da baixa, o ritmo, a estimativa, a versão e a
// idade saem de M.pacotes, M.uos, M.casos e de ritmos.js.
import { M } from '../../dados/mock.js'
import { RITMOS } from '../../estado/ritmos.js'

export const uoDe = (uoId) => M.uos.find((u) => u.id === uoId)
export const pacoteDaUo = (uoId) => M.pacotes.find((p) => p.uoId === uoId)
export const pacotePorId = (id) => M.pacotes.find((p) => p.id === id)

// O caso da falha de rede (G21): a primeira sincronização deste pacote cai
// no item `falhaNoTick` — os de antes ficam baixados, ele não.
export const CASO_FALHA = 'sync-falha-rede'
export const casoFalha = () => M.casos[CASO_FALHA]

// As receitas dos estados da idade (receitas.js: `pacotes`): o pacote que
// avisa (entre avisoDias e bloqueioDias, T03·3 → pac-uo-02) e o que bloqueia
// (passou de bloqueioDias → pac-uo-03).
export const avisa = (p) => p.diasAtras >= p.limiares.avisoDias && p.diasAtras <= p.limiares.bloqueioDias
export const bloqueia = (p) => p.diasAtras > p.limiares.bloqueioDias
export const pacoteQueAvisa = () => M.pacotes.find(avisa)
export const pacoteQueBloqueia = () => M.pacotes.find(bloqueia)

// A ordem da baixa (T03·1): Modelos → Ativos → Cartões. A lista mostra
// Ativos, Modelos de ativo e Cartões, nessa ordem, como a referência.
const ORDEM_BAIXA = ['modelosAtivo', 'ativos', 'cartoes']
export const ORDEM_LISTA = ['ativos', 'modelosAtivo', 'cartoes']

export const totalDe = (p) => ORDEM_BAIXA.reduce((s, k) => s + p.contem[k], 0)

// um tick é um item: o ritmo de 4 s dividido pelo total do pacote (250 ms em Várzea)
export const tickMs = (p) => RITMOS.sincronizacaoTotalMs / totalDe(p)

// quanto de cada conteúdo já baixou com `baixados` itens, e em que pé está:
// 'ok' baixou tudo · 'agora' é o que baixa · 'espera' ainda não começou
export function conteudos(p, baixados) {
  let resto = baixados
  const feito = {}
  for (const k of ORDEM_BAIXA) { feito[k] = Math.min(resto, p.contem[k]); resto -= feito[k] }
  const agora = ORDEM_BAIXA.find((k) => feito[k] < p.contem[k])
  return Object.fromEntries(ORDEM_BAIXA.map((k) => [k, {
    feito: feito[k], de: p.contem[k],
    estado: feito[k] === p.contem[k] ? 'ok' : k === agora ? 'agora' : 'espera',
  }]))
}

// "faltam ~N s": o que falta × a estimativa do servidor por item, na dezena (7 × 6 = 42 → 40)
export const faltamSeg = (p, baixados) => Math.round(((totalDe(p) - baixados) * p.segPorItem) / 10) * 10

// A versão do pacote (T03·2 b): 'pct-' + a UO sem hífen + '-' + a data do pacote
export const versao = (uoId, data) => 'pct-' + uoId.replace('-', '') + '-' + data

// 2026-03-11 → 11/03
export const diaMes = (data) => { const [, m, d] = data.split('-'); return d + '/' + m }

// O pacote novo, baixado agora (T03·7): de hoje, na hora nominal
export const HOJE = M.diasAntes(0)
export const pacoteNovo = (p) => ({ id: p.id, diasAtras: 0, hora: M.HORA_NOMINAL, versao: versao(p.uoId, HOJE) })

// A régua da idade (T03·4): de 0 a bloqueioDias + 1, o limite em bloqueioDias
export const fimDaIdade = (p) => p.limiares.bloqueioDias + 1
