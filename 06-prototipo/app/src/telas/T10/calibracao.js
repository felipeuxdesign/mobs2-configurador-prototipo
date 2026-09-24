// T10 · o que a calibração lê do mock (04-dados/mocks.js · calibracao), na hora
// de montar. Funções puras; nenhum número digitado.
//
// · As grandezas do par (T10·1, HU-T10-8): as calibráveis são o cadastro do
//   modelo do ativo (porModelo), na ordem dele; o módulo sem leitura de pulsos
//   (matrizCapacidades.pulsos false) derruba as de ajuste — rotação e
//   velocidade, que o módulo calcula dos pulsos (o comentário do mock) — com o
//   motivo `motivoSemPulsos`.
// · O que não se aplica (T10·5): os indisponíveis do cadastro e os derrubados
//   pelo módulo, na ordem das grandezas do mock. O rótulo perde o 'NESTE
//   MODELO' quando algum motivo vem do módulo (a regra está no estados.md).
// · Os números: o módulo conta bruto ÷ fatorEnvio; o painel é `painel`; a
//   diferença, painel − módulo; o 'semeado há N dias' só com 1 dia ou mais
//   (G22: o 0 do herói é desta sessão).
// · A releitura (HU-T10-5): o módulo devolve o semeado + `desvio`, na unidade
//   do reporte; confere quando o desvio cabe em granularidade + decorrido. O
//   número relido, de volta na unidade da tela, é o que o poço mostra.
// · O mundo de cada estado da coluna (receitas.js): o par ativo × módulo que o
//   dado da receita aponta, com a sessão dele na faixa.
import { M } from '../../dados/mock.js'
import { RECEITAS } from '../../estado/receitas.js'

export const REF = {
  tela: '00-tela',
  semeado: '01-momento-hodometro-semeado',
  coletor: '02-estado-rotacao-caminhao-coletor',
  jaSemeado: '03-estado-ja-semeado',
  semPulsos: '04-estado-modulo-sem-pulsos',
}

const C = M.calibracao
export const grandezaDe = (id) => C.grandezas.find((g) => g.id === id)
export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial)
function lePulsos(serial) {
  const m = moduloDe(serial)
  const linha = m && M.matrizCapacidades.find((r) => r.modeloId === m.modeloId && r.variante === m.variante)
  return linha ? linha.pulsos : true
}

// as grandezas do par ativo × módulo: as que se calibram e as que não se aplicam
export function grandezasDoPar(ativoId, moduloSerial) {
  const a = ativoDe(ativoId)
  const pm = a && C.porModelo[a.modeloAtivoId]
  if (!pm) return { calibraveis: [], naoSeAplicam: [], doModulo: false }
  const derrubadas = lePulsos(moduloSerial) ? [] : pm.calibraveis.filter((g) => grandezaDe(g).natureza === 'ajuste')
  const motivo = {}
  for (const i of pm.indisponiveis) motivo[i.grandeza] = { motivo: i.motivo, doModulo: false }
  for (const g of derrubadas) motivo[g] = { motivo: C.motivoSemPulsos, doModulo: true }
  const naoSeAplicam = C.grandezas.filter((g) => motivo[g.id]).map((g) => ({ id: g.id, nome: g.rotulo, ...motivo[g.id] }))
  return {
    calibraveis: pm.calibraveis.filter((g) => !derrubadas.includes(g)),
    naoSeAplicam,
    doModulo: naoSeAplicam.some((l) => l.doModulo),
  }
}

// o que o módulo conta, na unidade da tela (bruto ÷ fatorEnvio) · null sem dado
export function moduloConta(ativoId, g) {
  const b = C.bruto[ativoId]?.[g]; const f = grandezaDe(g).fatorEnvio
  return b == null || !f ? null : Math.floor(b / f)
}
// o que o painel mostra · null sem dado (as de ajuste o técnico digita)
export const painelMostra = (ativoId, g) => C.painel[ativoId]?.[g] ?? null
// há quantos dias foi semeado · null quando nunca, ou quando foi nesta sessão (G22)
export function semeadoHa(ativoId, g) {
  const d = C.ultimas[ativoId]?.[g]
  return d != null && d >= 1 ? d : null
}

// a releitura depois de semear: o número que o módulo devolve e se confere
export function releitura(ativoId, g) {
  const painel = painelMostra(ativoId, g); const t = C.tolerancia[g]
  if (painel == null || !t) return null
  const devolvido = painel * t.porUnidade + t.desvio
  return { valor: Math.floor(devolvido / t.porUnidade), confere: t.desvio <= t.granularidade + t.decorrido }
}

// a seção do checklist em que a foto do painel também vale (HU-T10-4)
export const secaoDaFoto = () => C.itemChecklist.secao

// ── o mundo de cada estado (receitas.js): o ativo que o dado da receita aponta ──
export function mundoDoEstado(est, uoId) {
  const receita = RECEITAS[`T10/${est}`]
  if (!receita) return null
  const daUo = M.ativos.filter((a) => a.uoId === uoId && a.moduloSerial)
  let ativo = null
  if (est === REF.coletor) {
    // calibracao.porModelo · o modelo calibra rotação e velocidade: o primeiro ônibus dele na garagem, com o módulo que lê pulsos
    ativo = daUo.find((a) => grandezasDoPar(a.id, a.moduloSerial).calibraveis[0] && grandezaDe(grandezasDoPar(a.id, a.moduloSerial).calibraveis[0]).natureza === 'ajuste')
  } else if (est === REF.jaSemeado) {
    // calibracao.ultimas · o hodômetro já foi semeado antes: o primeiro ônibus da garagem semeado há 1 dia ou mais
    ativo = daUo.find((a) => semeadoHa(a.id, 'hodometro') != null)
  } else if (est === REF.semPulsos) {
    // o caso do modelo sem a grandeza (grandeza-indisponivel) + calibracao.bruto: o ativo desse modelo cujo módulo não lê pulsos
    const caso = M.casos[receita.casos[0]]
    ativo = Object.keys(C.bruto).map(ativoDe).find((a) => a.modeloAtivoId === caso.modeloAtivoId && !lePulsos(a.moduloSerial))
  }
  if (!ativo) return null
  const { calibraveis } = grandezasDoPar(ativo.id, ativo.moduloSerial)
  // T10·1 (a): a 03 abre com o passo atual no hodômetro, fiel à referência; as outras, na ordem do cadastro
  const ordem = est === REF.jaSemeado ? ['hodometro', ...calibraveis.filter((g) => g !== 'hodometro')] : calibraveis
  return { ativoId: ativo.id, moduloSerial: ativo.moduloSerial, ordem }
}
