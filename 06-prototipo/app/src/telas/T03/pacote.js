// A conta do pacote da T03, lida do mock na hora de montar (G7). Nenhum
// número mora aqui: a ordem da baixa, o ritmo, a estimativa, a versão e a
// idade saem de M.pacotes, M.uos, M.casos e de ritmos.js. A unidade que só o
// caso lista-longa-garagens tem (a otimização do design) baixa o pacote que o
// caso declara pra ela: os ativos, a idade, a hora e a versão são os dele
// (src/dados/garagens.js, com o que ele não declara).
import { M } from '../../dados/mock.js'
import { RITMOS } from '../../estado/ritmos.js'
import { garagemDe, pacoteDaGaragem } from '../../dados/garagens.js'

export const uoDe = garagemDe
export const pacoteDaUo = pacoteDaGaragem
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

// Os cinco grupos do pacote (decisão 45), contados do `contem` dele: Ativos,
// Conexões, Modelos de ativo, Eventos e Cercas — a lista, nessa ordem, como a
// referência. A ordem da baixa (T03·1) é a da lista: os ativos baixam primeiro,
// como a 00 e a 01 desenham (6 de 10, e o resto em —); a dos outros quatro
// nenhuma referência desenha, e segue a da lista (padrão, pro arquiteto).
export const ORDEM_LISTA = ['ativos', 'conexoes', 'modelosAtivo', 'eventos', 'cercas']
const ORDEM_BAIXA = ORDEM_LISTA

export const totalDe = (p) => ORDEM_BAIXA.reduce((s, k) => s + p.contem[k], 0)

// um tick é um item: o ritmo de 4 s dividido pelo total do pacote (4000 ÷ 31 ≈ 129 ms em Várzea)
export const tickMs = (p) => RITMOS.sincronizacaoTotalMs / totalDe(p)

// quanto de cada conteúdo já baixou com `baixados` itens, e em que pé está:
// 'ok' baixou tudo · 'agora' é o que baixa · 'espera' ainda não começou.
// O pé de cada grupo é o lugar dele na ordem: os de antes do que baixa já
// baixaram, os de depois esperam — também o grupo que o pacote traz vazio (as
// cercas de Ibura e de Caruaru, 0), que só fica pronto quando a baixa passa por ele
export function conteudos(p, baixados) {
  let resto = baixados
  const feito = {}
  for (const k of ORDEM_BAIXA) { feito[k] = Math.min(resto, p.contem[k]); resto -= feito[k] }
  const agora = ORDEM_BAIXA.findIndex((k) => feito[k] < p.contem[k])
  const ate = agora < 0 ? ORDEM_BAIXA.length : agora
  return Object.fromEntries(ORDEM_BAIXA.map((k, i) => [k, {
    feito: feito[k], de: p.contem[k],
    estado: i < ate ? 'ok' : i === ate ? 'agora' : 'espera',
  }]))
}

// "faltam ~N s": o que falta × a estimativa do servidor por item, na dezena (na 00, 25 × 1,6 = 40)
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
