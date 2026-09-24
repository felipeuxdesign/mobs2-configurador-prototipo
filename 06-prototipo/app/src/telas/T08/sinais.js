// O que a T08 lê do mock — funções puras. Nenhum número digitado: os sinais,
// os valores e as unidades saem de M (G8, G9).
import { M } from '../../dados/mock.js'

// os sinais do ativo da sessão: o modelo dele diz quais são (sinaisCan)
export function sinaisDoAtivo(ativoId) {
  const ativo = M.ativos.find((a) => a.id === ativoId)
  const modelo = ativo && M.modelosAtivo.find((m) => m.id === ativo.modeloAtivoId)
  return { ativo, sinais: sinaisEmOrdem(modelo?.sinaisCan ?? []) }
}

// T08·1 (a) — a ordem da grade: a dos domínios do mock (M.dominiosCan) e,
// dentro do domínio, o estático antes do dinâmico; no mais, a ordem do
// sinaisCan. No herói, o Motor põe a Temperatura antes da Rotação, como as
// três referências desenham (T08-A5). A regra está no logica.md.
export function sinaisEmOrdem(sinais) {
  const dominio = (s) => M.dominiosCan.indexOf(s.dominio)
  const fase = (s) => (s.fase === 'estatico' ? 0 : 1)
  return sinais
    .map((s, i) => ({ s, i }))
    .sort((a, b) => dominio(a.s) - dominio(b.s) || fase(a.s) - fase(b.s) || a.i - b.i)
    .map((x) => x.s)
}

// o caso estático do ativo da sessão, o mesmo que a T07 lê no fluxo: o mock
// diz que os casos sobrescrevem o nominal por ativo (mocks.js, SINAIS_CAN).
// O domínio mudo fica fora, como na T07 (T07·1 a).
const DOMINIO_MUDO = 'can-estatico-dominio'
export const casoDoAtivo = (ativoId) =>
  Object.keys(M.casos).find((k) => k.startsWith('can-estatico-') && k !== DOMINIO_MUDO && M.casos[k].ativoId === ativoId) ?? null

// o lido do caso passa? a mesma conta da T07: na faixa {min, max}, presente
// quando o esperado é null (presença, C11.6), ou igual ao esperado
function passa(s, lido) {
  if (lido == null) return false
  if (s.faixa) {
    const n = Number(String(lido).split(' ')[0].replace(/\./g, '').replace(',', '.').replace('−', '-'))
    return Number.isFinite(n) && n >= s.faixa.min && (s.faixa.max == null || n <= s.faixa.max)
  }
  return s.esperado == null || lido === s.esperado
}

// a leitura que volta: `lidoDinamico` no dinâmico; no estático, o `lido` do
// caso do ativo quando ele passa (o hodômetro do a-02, do a-03 e do a-09, o
// mesmo que a T07 lê e a T10 calibra), e o `lido` nominal no mais. A releitura
// é leitura nova: o caso vale uma vez por sessão (G21), e a falha que ele
// trazia dá lugar ao nominal, como no 'Ler novamente' da T07 (T07·5 a).
export function leituraDe(s, ativoId) {
  if (s.fase === 'dinamico') return s.lidoDinamico
  const caso = casoDoAtivo(ativoId)
  const lidos = (caso && M.casos[caso].lidos) || {}
  if (Object.prototype.hasOwnProperty.call(lidos, s.id) && passa(s, lidos[s.id])) return lidos[s.id]
  return s.lido
}

// "184.320 km" → { valor: "184.320", unidade: "km" } · "ligada" → { valor: "ligada" }:
// a unidade vai junto do número, menor (Lei 10), como as referências 01 e 02 desenham
export function valorEUnidade(texto) {
  const m = /^([−-]?[\d.,]+) (.+)$/.exec(texto ?? '')
  return m ? { valor: m[1], unidade: m[2] } : { valor: texto }
}
