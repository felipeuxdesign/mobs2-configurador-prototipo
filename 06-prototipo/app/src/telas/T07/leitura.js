// T07 · a leitura da CAN, montada do mock (04-dados/mocks.js · sinaisCan do
// modelo do ativo da sessão). Nenhum número digitado: o lido, a faixa
// {min, max} (AC-07) e o rótulo curto vêm do mock; as regras, do tela.md.
//
// · O mapa por id (T07·4 b): em que peça vai cada sinal. Só o ma-01 tem
//   referência. O ma-02 e o ma-03 montam pelo mesmo mapa o que ele conhece;
//   o sinal que o mapa não conhece (o óleo, o horímetro) é lacuna.
// · A escala (T07·2 a, a regra escrita no tela.md): na leitura grande, a
//   faixa com 1,0 de cada lado; fora dela, a escala estica até o inteiro que
//   contém o lido. As marcas a cada 0,5, ou a cada 1 quando 0,5 daria mais de
//   10 divisões; as maiores nas bordas da faixa e no meio dela, quando o meio
//   cai numa marca. Na leitura pequena, 4 divisões com a maior no meio; a
//   escala é a própria faixa, ou a do mapa (satélites 0–12, combustível 0–100).
// · O veredito e a causa (C11.8, mocks.js): lido fora da faixa → 'veículo ou
//   cadastro'; sem leitura, sozinho no domínio → 'ligação'.
// · O caso (G21): no estado da coluna, o da receita; no fluxo, o do ativo da
//   sessão. Ele vale uma vez por sessão: o 'Ler novamente' o consome, e a
//   releitura traz de volta o nominal do que falhou — o que o caso lê e passa
//   (o hodômetro do ativo) é do veículo e fica.
import { M } from '../../dados/mock.js'
import { decimal } from '../../dados/formato.js'
import { RECEITAS } from '../../estado/receitas.js'

export const REF = {
  tela: '00-tela',
  fora: '01-estado-fora-da-faixa',
  semLeitura: '02-estado-sem-leitura',
  dominio: '03-estado-dominio-mudo', // fora do ciclo (T07·1 a): espera a referência do ma-02
}
const DOMINIO_MUDO = 'can-estatico-dominio'

// T07·4 (b) · a peça de cada sinal, pelo id, na ordem da tela
export const MAPA = {
  bateria: { peca: 'leitura' },
  hodometro: { peca: 'tambor' },
  temperatura: { peca: 'pequena' },
  satelites: { peca: 'pequena', escala: { min: 0, max: 12 } },   // T07·2: satélites 0–12
  nivel: { peca: 'pequena', escala: { min: 0, max: 100 } },      // T07·2: o combustível, 0–100 (o nível do tanque; o id segue nivel)
  ignicao: { peca: 'sinais' },
  posicao: { peca: 'sinais' },
}
const ORDEM = Object.keys(MAPA)

// T07·2 (a) · a regra da escala
const MARGEM = 1            // a faixa com 1,0 de cada lado
const PASSOS = [0.5, 1]     // as marcas a cada 0,5, ou a cada 1
const DIVISOES_MAX = 10     // …quando 0,5 daria mais de 10 divisões
const DIVISOES_PEQUENA = 4  // a leitura pequena: os quartos, com a maior no meio

// o caso de cada estado, pela receita (receitas.js)
export const casoDoEstado = (est) => RECEITAS[`T07/${est}`]?.casos?.[0] ?? null
// no fluxo, o caso estático do ativo da sessão (o domínio mudo fica fora do ciclo, T07·1 a)
export const casoDoAtivo = (ativoId) =>
  Object.keys(M.casos).find((k) => k.startsWith('can-estatico-') && k !== DOMINIO_MUDO && M.casos[k].ativoId === ativoId) ?? null

export const ativoDe = (id) => M.ativos.find((a) => a.id === id)

// "13,8 V" → { texto: '13,8', unidade: 'V', num: 13.8 } · "184.320 km" → 184320 · "ligada" → só o texto
function partes(lido) {
  if (lido == null) return { texto: null, unidade: null, num: null }
  const [texto, ...resto] = String(lido).split(' ')
  const num = Number(texto.replace(/\./g, '').replace(',', '.').replace('−', '-'))
  return { texto, unidade: resto.length ? resto.join(' ') : null, num: Number.isFinite(num) ? num : null }
}
const casasDe = (texto) => (String(texto ?? '').split(',')[1] ?? '').length
const dentro = (f, v) => v >= f.min && (f.max == null || v <= f.max)

function veredito(s, lido) {
  if (lido == null) return 'ausente'
  if (s.faixa) return dentro(s.faixa, partes(lido).num) ? 'ok' : 'fora'
  if (s.esperado == null) return 'ok'            // presença (C11.6): a CAN informou
  return lido === s.esperado ? 'ok' : 'fora'
}

// A leitura inteira do ativo: cada sinal com o lido e o veredito
export function ler(ativoId, casoId, consumido) {
  const ativo = ativoDe(ativoId)
  const modelo = M.modelosAtivo.find((m) => m.id === ativo.modeloAtivoId)
  const lidos = (casoId && M.casos[casoId].lidos) || {}
  const sinais = modelo.sinaisCan.map((s) => {
    if (s.fase !== 'estatico') return { ...s }
    const doCaso = Object.prototype.hasOwnProperty.call(lidos, s.id)
    let lido = doCaso ? lidos[s.id] : s.lido
    if (doCaso && consumido && veredito(s, lido) !== 'ok') lido = s.lido
    return { ...s, lido, veredito: veredito(s, lido) }
  })
  const estaticos = sinais.filter((s) => s.fase === 'estatico')
  // a causa do que não chegou: sozinho no domínio → ligação (C11.8)
  const semLeituraNoDominio = (d) => estaticos.filter((s) => s.dominio === d && s.veredito === 'ausente').length
  estaticos.forEach((s) => { if (s.veredito === 'ausente') s.sozinho = semLeituraNoDominio(s.dominio) === 1 })
  return {
    ativo,
    modelo,
    sinais,
    porId: Object.fromEntries(estaticos.map((s) => [s.id, s])),
    dinamicos: sinais.filter((s) => s.fase === 'dinamico'),
    total: sinais.length,
    passaram: estaticos.filter((s) => s.veredito === 'ok').length,
    reprovados: estaticos.filter((s) => s.veredito !== 'ok').length,
  }
}

// o que vai na tela, na ordem do mapa: a leitura grande, o tambor, as pequenas e os liga-desliga
export function pecas(leitura) {
  const ids = ORDEM.filter((id) => leitura.porId[id])
  return {
    leitura: ids.filter((id) => MAPA[id].peca === 'leitura').map((id) => leitura.porId[id]),
    tambor: ids.filter((id) => MAPA[id].peca === 'tambor').map((id) => leitura.porId[id]),
    pequenas: ids.filter((id) => MAPA[id].peca === 'pequena').map((id) => leitura.porId[id]),
    sinais: ids.filter((id) => MAPA[id].peca === 'sinais').map((id) => leitura.porId[id]),
  }
}

// ── a leitura grande: a escala pela regra, as legendas e a causa ──
export function leituraGrande(s, T) {
  const { texto, unidade, num } = partes(s.lido)
  const casas = casasDe(texto) // as casas do lido: '13,8' → 1, e as legendas saem '11,0', '12,0 — 15,0'
  const f = s.faixa
  let min = f.min - MARGEM, max = f.max + MARGEM
  if (num != null && num < min) min = Math.floor(num)
  if (num != null && num > max) max = Math.ceil(num)
  const passo = PASSOS.find((p) => (max - min) / p <= DIVISOES_MAX) ?? (max - min) / DIVISOES_MAX
  const divisoes = Math.round((max - min) / passo)
  const meio = (f.min + f.max) / 2
  const k = (meio - min) / passo
  const fortes = [f.min, f.max, ...(Math.abs(k - Math.round(k)) < 1e-9 ? [meio] : [])]
  const fora = s.veredito === 'fora'
  return {
    valor: texto,
    unidade,
    fora,
    causa: fora && num < f.min ? T.abaixo(decimal(f.min - num, casas), unidade) : undefined,
    escala: { min, max, valor: num, faixa: { de: f.min, ate: f.max }, divisoes, fortes },
    legendas: { min: decimal(min, casas), faixa: T.faixaDaLeitura(decimal(f.min, casas), decimal(f.max, casas)), max: decimal(max, casas) },
  }
}

// ── a leitura pequena: a faixa inteira, o mínimo ou sem faixa; ou sem leitura ──
export function leituraPequena(s, T) {
  if (s.veredito === 'ausente') return { valor: T.vazio, semLeitura: true, legenda: s.sozinho ? T.semLeitura : undefined }
  const { texto, unidade, num } = partes(s.lido)
  const f = s.faixa
  const de = f && f.max != null ? { min: f.min, max: f.max } : MAPA[s.id].escala
  const escala = {
    min: de.min, max: de.max, valor: num, pctInteiro: true,
    faixa: f ? { de: f.min, ate: f.max ?? undefined } : undefined,
    divisoes: DIVISOES_PEQUENA, fortes: [(de.min + de.max) / 2],
  }
  const legenda = !f ? T.legendaSemFaixa : f.max == null ? T.minimo(decimal(f.min)) : T.faixaFechada(decimal(f.min), decimal(f.max))
  return { valor: texto, unidade: unidade ?? undefined, escala, legenda }
}

// ── o tambor: o hodômetro, sem faixa ──
export function leituraTambor(s) {
  const { texto, unidade } = partes(s.lido)
  return { valor: texto, unidade }
}

// ── os liga-desliga: o fato e o check quando confere ──
export const ligaDesliga = (s) => ({ rotulo: s.rotulo, valor: s.lido, confere: s.veredito === 'ok' })
