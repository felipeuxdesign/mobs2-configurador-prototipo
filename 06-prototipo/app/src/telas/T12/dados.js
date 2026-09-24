// T12 · o que a tela lê do mock — funções puras, mesma entrada, mesma saída.
// · a lista: as instalações da garagem do contexto (pelo ativo), agrupadas por
//   idade pelo corte do AC-16 (T12·1 a, criteriosRegra.gruposIdade)
// · o veredito, o glifo e o tom de cada estado (T12·3 a)
// · o detalhe: as sete etapas da i-01, ou só as linhas que o resumo sustenta (T12·2 a)
// · o mundo de cada estado da coluna, pela receita (receitas.js)
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'

export const REF = {
  detalhe: '01-momento-detalhe-da-instalacao',
  vazia: '02-estado-nenhuma-instalacao',
  semRede: '03-estado-sem-rede',
}
const CASO_VAZIA = 'instalacoes-vazia'      // AC-21 · a consulta da garagem que volta vazia
const CASO_SEM_REDE = 'instalacoes-sem-rede' // a consulta anterior, declarada

export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
export const instalacaoDe = (id) => M.instalacoes.find((i) => i.id === id)

// mais nova primeiro: pelos dias e, no mesmo dia, pela hora (texto HH:MM compara em ordem)
const maisNova = (a, b) => a.diasAtras - b.diasAtras || (a.hora < b.hora ? 1 : a.hora > b.hora ? -1 : 0)

// as instalações da garagem: as dos ativos da UO (Várzea tem 5: i-01, i-02, i-06, i-08, i-10)
export function daGaragem(uoId) {
  return M.instalacoes.filter((i) => ativoDe(i.ativoId)?.uoId === uoId).slice().sort(maisNova)
}

// os grupos por idade (T12·1 a): até `hoje` é HOJE, até `ontem` é ONTEM, até
// `esteMesAte` é ESTE MÊS, e acima é MAIS DE UM MÊS. O corte é do diretor.
const GRUPOS = ['hoje', 'ontem', 'esteMes', 'maisDeUmMes']
function grupoDe(dias) {
  const g = M.criteriosRegra.gruposIdade
  if (dias <= g.hoje) return 'hoje'
  if (dias <= g.ontem) return 'ontem'
  if (dias <= g.esteMesAte) return 'esteMes'
  return 'maisDeUmMes'
}
export function agrupar(lista) {
  return GRUPOS.map((id) => ({ id, itens: lista.filter((i) => grupoDe(i.diasAtras) === id) })).filter((g) => g.itens.length > 0)
}

// o veredito pela natureza do estado (T12·3 a, folha 3): o glifo, o tom na linha
// da lista e o tom no cabeçalho do detalhe (o 'aprovada' em lima, T12/01)
const NATUREZA = {
  aprovada: { glifo: 'ok', tom: 'neutro', cabeca: 'veredito' },
  'aprovada-reprocessamento': { glifo: 'ok', tom: 'neutro', cabeca: 'veredito' },
  'aguardando-validacao': { glifo: 'relogio', tom: 'espera', cabeca: 'neutro' },
  'falha-recebimento-reconhecida': { glifo: 'xis', tom: 'falha', cabeca: 'falha' },
  reprovada: { glifo: 'xis', tom: 'falha', cabeca: 'falha' },
}
export function vereditoDe(i) {
  return { texto: TX.veredito[i.estado], ...NATUREZA[i.estado] }
}

// a linha de baixo da lista: o módulo e a hora, em HOJE e ONTEM; o módulo e há
// quantos dias, no resto — e aí em 12, como a referência desenha (G12, T12-V2)
export function detalheDaLinha(i) {
  const comHora = i.diasAtras <= M.criteriosRegra.gruposIdade.ontem
  return {
    texto: i.moduloSerial + TX.entre + (comHora ? i.hora : TX.haDias(i.diasAtras)),
    tam: comHora ? undefined : 'legenda',
  }
}

// ── o detalhe ──
// a linha embaixo da placa: a de hoje como a referência desenha ('M2C-0417 · hoje,
// 11:47 · Rafael Vieira'); as outras não têm texto aprovado pro 'quando' ('ontem,
// 16:05' não existe no textos.md), então repetem a linha de baixo da lista, que é
// texto aprovado ('M2C-0312 · 16:05', 'M2C-0362 · há 9 dias') — G25, revisão C11
// quem instalou: só a instalação com a história inteira no aparelho (as etapas) é
// do técnico logado — a de hoje, a do herói. As outras chegam do servidor só com o
// resumo, que não diz quem instalou: sem nome (T12-V5, sem inventar autor)
export function linhaDoDetalhe(i, tecnico) {
  if (i.diasAtras > M.criteriosRegra.gruposIdade.hoje) return detalheDaLinha(i).texto
  const partes = [i.moduloSerial, TX.hoje(i.hora)]
  if (i.etapas) partes.push(tecnico)
  return partes.join(TX.entre)
}

const par = (s) => s.split('/').map(Number) // '6/6' → [6, 6]
const contagem = (titulo, feito, total, extra = {}) => ({ titulo, valor: TX.deN(feito, total), ok: feito === total, ...extra })

// as linhas do detalhe (T12·2 a): as sete etapas da i-01, lidas das etapas; nas
// outras, só as quatro que o resumo sustenta — nada se inventa
export function linhasDoDetalhe(i) {
  const E = TX.etapas
  const e = i.etapas
  if (e) {
    const relidos = e.cadeia.filter((b) => b.readBack === 'confirmado').length
    return [
      contagem(E.preChecagem, e.preChecagem.passaram, e.preChecagem.checagens),
      { titulo: E.configuracao, valor: TX.blocosRelidos(relidos), ok: relidos === e.cadeia.length },
      { titulo: E.calibracao, valor: e.calibracao.foto ? TX.comFoto(e.calibracao.grandeza) : e.calibracao.grandeza, ok: true },
      contagem(E.ciclo, e.cicloDinamico.confirmados, e.cicloDinamico.passos.length),
      contagem(E.checklist, e.checklist.concluidos, e.checklist.itens),
      contagem(E.autoteste, e.autoteste.passaram, e.autoteste.assertivas),
      { titulo: E.recebimento, valor: TX.confirmadoAs(e.recebimento.hora), ok: e.recebimento.confirmado },
    ]
  }
  const r = i.resumo
  const [bf, bt] = par(r.blocos), [cf, ct] = par(r.checklist), [af, at] = par(r.autoteste)
  // o recebimento do resumo diz o valor e, depois do travessão, o porquê
  // ('não confirmado — falha reconhecida pelo técnico'): fica o valor; o porquê
  // é o veredito que o cabeçalho já diz (Lei 12), e não cabe na linha de 50
  const [recebido] = r.recebimento.split(' — ')
  return [
    bf === bt ? { titulo: E.configuracao, valor: TX.blocosRelidos(bf), ok: true } : contagem(E.configuracao, bf, bt),
    contagem(E.checklist, cf, ct),
    // a assertiva que falhou (i-05) embaixo do nome, como a causa da reprovada
    contagem(E.autoteste, af, at, af < at && r.assertivaFalhou ? { causa: r.assertivaFalhou } : {}),
    { titulo: E.recebimento, valor: recebido, ok: i.estado !== 'falha-recebimento-reconhecida' },
  ]
}

// ── o mundo de cada estado da coluna, pela receita (receitas.js) ──
// · a 02: a consulta do caso, que volta vazia, e sem sessão (AC-21)
// · a 03: a mesma lista da garagem, como a última consulta, com a hora do caso
// · no fluxo: a garagem do contexto; sem rede no aparelho, a última consulta
export function mundoDe(est, unico) {
  const uoId = unico.contexto.uoId ?? M.contextoAtivo.uoId
  if (est === REF.vazia) {
    const c = M.casos[CASO_VAZIA]
    return { sessao: c.sessao, lista: M.instalacoes.filter((i) => c.instalacaoIds.includes(i.id)), consultaDas: null }
  }
  const semRede = est === REF.semRede || unico.situacao.rede !== 'conectada'
  return { sessao: unico.sessao, lista: daGaragem(uoId), consultaDas: semRede ? M.casos[CASO_SEM_REDE].consultadoAs : null }
}
