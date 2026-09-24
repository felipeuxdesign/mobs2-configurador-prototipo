// T13 · o checklist montado do mock e do estado único — funções puras, nenhum
// número digitado. Cada item lê a etapa que o produziu (as telas T05 a T10 e
// a T14 gravam em estado.etapas; a T13 grava o que ela resolve em
// etapas.checklist):
//   A · identificação  ← a sessão, a pré-checagem (T05) e o vínculo do ativo (T06)
//   B · montagem       ← as fotos e as ressalvas desta tela; o Painel herda a
//                        foto da calibração (T10, HU-T10-4)
//   C · hardware       ← a leitura da CAN (T07, T08; o caso do ativo, se não
//                        foi consumido) e a leitura nominal do módulo (AC-13)
//   D · configuração   ← a cadeia (T09) e a calibração (T10)
//   E · teste dinâmico ← o ciclo (T14); não se responde aqui (HU-T13-8)
//   F · servidor       ← a fila desta sessão (G22): só o que foi criado depois
//                        da abertura, pelos tipos da fila (AC-14)
// O que é um item resolvido (a regra do logica.md): o automático cuja fonte
// passa, o manual com foto (tirada ou herdada) ou com ressalva, e o que não se
// aplica. O que não bloqueia (F) conta no placar, mas não no 'Faltam'.
import { M } from '../../dados/mock.js'
import { milhar, decimal, caixaAlta } from '../../dados/formato.js'
import { RECEITAS } from '../../estado/receitas.js'
import { T } from './textos.js'

export const REF = {
  tela: '00-tela',
  A: '01-momento-a-identificacao-aberta',
  B: '02-momento-b-montagem-aberta',
  C: '03-momento-c-hardware-aberta',
  D: '04-momento-d-configuracao-aberta',
  E: '05-momento-e-teste-dinamico-aberta',
  F: '06-momento-f-servidor-aberta',
  responder: '07-momento-responder-item',
  naoConforme: '08-momento-nao-conforme-com-justificativa',
  reprovado: '09-estado-item-reprovado',
  secaoF: '10-estado-finalizar-com-a-secao-f-falhando',
  homologado: '11-momento-homologado',
}
export const SECAO_DO_MOMENTO = { [REF.A]: 'A', [REF.B]: 'B', [REF.C]: 'C', [REF.D]: 'D', [REF.E]: 'E', [REF.F]: 'F' }
export const MOMENTO_DA_SECAO = Object.fromEntries(Object.entries(SECAO_DO_MOMENTO).map(([m, s]) => [s, m]))

const CK = M.checklist
export const SECOES = CK.secoes
export const itensDa = (s) => CK.itens.filter((i) => i.secao === s)
export const itemDe = (id) => CK.itens.find((i) => i.id === id)
export const secaoDe = (id) => CK.secoes.find((s) => s.id === id)
export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial)
const modeloDe = (ativoId) => M.modelosAtivo.find((m) => m.id === ativoDe(ativoId)?.modeloAtivoId)
const grandezaDe = (id) => M.calibracao.grandezas.find((g) => g.id === id)
const sinalDe = (ativoId, id) => modeloDe(ativoId)?.sinaisCan.find((s) => s.id === id)
const HORA = M.HORA_NOMINAL

// o nome da seção no mapa e no acordeão ('A · Identificação'), e o rótulo de
// topo do nível do item ('B · INSTALAÇÃO FÍSICA', AC-11)
export const nomeDaSecao = (s) => T.secao(s.id, s.rotulo)
export const rotuloDoNivel = (s) => caixaAlta(T.secao(s.id, s.titulo))

// ── a versão composta da cadeia, dos blocos confirmados (a mesma conta da T09) ──
function versaoComposta(confirmados) {
  const { ordem, versoes } = M.cadeia
  return ordem.slice(0, confirmados).filter((b) => versoes[b]).map((b) => versoes[b]).join('.')
}

// ── G21 · a semente da T13: o herói depois da calibração, antes do ciclo ──
// Pular pro checklist pelo palco monta só a sessão (sementes.js); o que as
// telas T05 a T10 gravariam no caminho vem daqui, pelo cadastro do par. Vale
// quando a sessão não passou pela T05 neste estado único (a pré-checagem não
// foi gravada): é o palco que semeou. No fluxo, cada etapa é a que a tela gravou.
function etapasDoCaminho(ativoId, moduloSerial) {
  const modelo = modeloDe(ativoId)
  // a calibração só se o painel do ativo tem o número (sem ele, a T10 não semeia)
  const partida = M.calibracao.porModelo[modelo?.id]?.calibraveis.find((g) => grandezaDe(g).natureza === 'partida' && M.calibracao.painel[ativoId]?.[g] != null)
  return {
    preChecagem: { daSemente: true },
    ativo: { ativoId, vinculo: modelo?.chassiPelaCan ? 'chassi' : 'confirmacao', as: HORA },
    can: { lida: true },
    cadeia: { confirmados: M.cadeia.ordem.length, versaoGravada: versaoComposta(M.cadeia.ordem.length) },
    calibracao: partida
      ? { ativoId, moduloSerial, itemChecklist: M.calibracao.itemChecklist.id, foto: true, passo: partida, semeadas: { [partida]: { painel: M.calibracao.painel[ativoId][partida], as: HORA } } }
      : null,
  }
}
const daSemente = (etapas) => etapas.preChecagem == null

// ── o mundo: a sessão, as etapas, a fila e os casos que valem ──
// No estado da coluna, o do caso da receita (G21): o 09 no a-02 do
// can-estatico-isolado (a bateria abaixo do mínimo, na CAN), o 10 no a-09 do
// pronto-para-fechar (o ciclo completo, as fotos tiradas e o servidor que não
// respondeu). No fluxo, o estado único.
export function mundoDe({ unico, est, semente }) {
  const receita = est ? RECEITAS[`T13/${est}`] : null
  if (receita) {
    const casoId = receita.casos[0]
    const caso = M.casos[casoId]
    const a = ativoDe(caso.ativoId)
    const sessao = { ...semente.sessao, ativoId: a.id, moduloSerial: a.moduloSerial }
    const etapas = { ...etapasDoCaminho(a.id, a.moduloSerial) }
    let registro = registroVazio(a.id)
    if (est === REF.secaoF) {
      // o ciclo completo pro Finalizar acender, e as fotos de B tiradas: o que bloqueia fechou (o caso)
      etapas.ciclo = { completo: true }
      registro = { ...registro, fotos: Object.fromEntries(itensDa('B').filter((i) => !i.herda).map((i) => [i.id, HORA])) }
    }
    return { sessao, etapas, fila: [...M.filaSaida], casosConsumidos: [], registro, casos: [casoId] }
  }
  const sessao = unico.sessao?.ativoId ? unico.sessao : semente.sessao
  const proprias = unico.etapas
  const etapas = daSemente(proprias)
    ? { ...etapasDoCaminho(sessao.ativoId, sessao.moduloSerial), ...Object.fromEntries(Object.entries(proprias).filter(([, v]) => v != null)) }
    : proprias
  const guardado = proprias.checklist?.ativoId === sessao.ativoId ? proprias.checklist : null
  return {
    sessao, etapas, fila: [...M.filaSaida, ...unico.fila], casosConsumidos: unico.casosConsumidos,
    registro: guardado ? { ...registroVazio(sessao.ativoId), ...guardado } : registroVazio(sessao.ativoId),
    casos: [],
  }
}

// o que a T13 grava em etapas.checklist (logica.md · os contadores do menu)
export function registroVazio(ativoId) {
  return { ativoId, aberto: true, fotos: {}, ressalvas: {}, pendentes: null, homologada: false, homologadaAs: null, ciencia: null }
}

// ── C · a leitura: o lido do sinal pelo caso estático do ativo (se não foi
// consumido, G21) ou o nominal, como a T07 lê ──
function lidoDoSinal(mundo, id) {
  const { ativoId } = mundo.sessao
  const s = sinalDe(ativoId, id)
  if (!s) return null
  const casoId = Object.keys(M.casos).find((k) => k.startsWith('can-estatico-') && k !== 'can-estatico-dominio' && M.casos[k].ativoId === ativoId)
  const lidos = casoId && !mundo.casosConsumidos.includes(casoId) ? M.casos[casoId].lidos ?? {} : {}
  const lido = Object.prototype.hasOwnProperty.call(lidos, id) ? lidos[id] : s.lido
  return { sinal: s, lido }
}
// "13,8 V" → { texto: '13,8', unidade: 'V', num: 13.8 }
function partes(lido) {
  if (lido == null) return null
  const [texto, ...resto] = String(lido).split(' ')
  const num = Number(texto.replace(/\./g, '').replace(',', '.').replace('−', '-'))
  return { texto, unidade: resto.join(' ') || null, num, casas: (texto.split(',')[1] ?? '').length }
}
const dentro = (f, v) => v >= f.min && (f.max == null || v <= f.max)

// T13·5 (a) · a escala do cartão com barra, pela regra escrita no tela.md:
// a bateria com a faixa esperada entre 1/3 e 5/6 da barra (10–16 no herói),
// os satélites de 0 a 12 (a escala da T07), o modem com a faixa entre 1/6 e
// 5/6 (−110 a −50). As posições saem da conta, nunca do PNG.
export function escalaDo(id, faixa) {
  if (id === 'satelites') return { min: 0, max: 12 }
  const w = faixa.max - faixa.min
  if (id === 'bateria') return { min: faixa.min - (2 * w) / 3, max: faixa.max + w / 3 }
  if (id === 'modem') return { min: faixa.min - w / 4, max: faixa.max + w / 4 }
  return { min: faixa.min, max: faixa.max ?? faixa.min }
}

// ── o que cada seção lê ──
function passou(etapa) { return !!etapa && (etapa.daSemente || etapa.passaram === etapa.checagens) }
function confirmadosDaCadeia(etapas) { return etapas.cadeia?.confirmados ?? 0 }
function calibrada(mundo) { const c = mundo.etapas.calibracao; return !!c && c.ativoId === mundo.sessao.ativoId && Object.keys(c.semeadas ?? {}).length > 0 }
// E · o ciclo que a T14 gravou (etapas.ciclo), se é do ativo da sessão: cada
// passo pelo id do item da Seção E ('aprovada' · 'reprovada' · 'pendente')
function cicloDaSessao(mundo) {
  const c = mundo.etapas.ciclo
  return c && (!c.ativoId || c.ativoId === mundo.sessao.ativoId) ? c : null
}
function passoDoCiclo(mundo, item) {
  if (mundo.registro.homologada) return 'aprovada' // só se homologa com o ciclo feito
  const c = cicloDaSessao(mundo)
  if (!c) return 'pendente'
  if (c.completo) return 'aprovada' // o mundo do estado 10: o caso chega com o ciclo completo
  return c.passos?.[item.id] ?? 'pendente'
}
// F · a fila desta sessão (G22): os itens do ativo criados depois da abertura
function filaDaSessao(mundo) {
  const { ativoId, abertaAs } = mundo.sessao
  return mundo.fila.filter((f) => f.ativoId === ativoId && f.diasAtras === 0 && f.criadoAs >= abertaAs)
}
// F falha quando o servidor diz que não: o ativo que ficou sem resposta
// (pronto-para-fechar), o evento de teste que não chegou no prazo (T14/02: 'A
// Seção F reprova.') ou um item desta sessão que o servidor recusou
function secaoFFalhando(mundo) {
  const pf = M.casos['pronto-para-fechar']
  if (pf && pf.ativoId === mundo.sessao.ativoId && pf.recebimento === 'sem resposta') return true
  if (cicloDaSessao(mundo)?.evento === 'nao-chegou') return true
  return filaDaSessao(mundo).some((f) => /^erro/.test(f.estado))
}

// ── cada item: o estado e o que o cartão mostra ──
// estado: ok · ressalva · nsa (não se aplica) · pendente · aguarda · reprovado
const TRACO = new Set(['a-serial', 'a-firmware', 'a-ativo', 'd-cercas', 'f-plataforma']) // o traço embaixo do valor, onde a referência desenha
function cartao(item, c) {
  const traco = TRACO.has(item.id) ? 'traco' : undefined
  return { id: item.id, secao: item.secao, nome: caixaAlta(item.rotulo), medida: traco, ...c }
}
const espera = (item) => cartao(item, { estado: 'aguarda', valor: T.vazio, aguarda: true, medida: 'traco' })

function itemA(mundo, item) {
  const { sessao, etapas } = mundo
  const conectado = passou(etapas.preChecagem)
  const vinculado = etapas.ativo?.ativoId === sessao.ativoId
  if (item.id === 'a-serial') return conectado ? cartao(item, { estado: 'ok', valor: sessao.moduloSerial }) : espera(item)
  if (item.id === 'a-firmware') return conectado ? cartao(item, { estado: 'ok', valor: moduloDe(sessao.moduloSerial)?.firmware }) : espera(item)
  if (item.id === 'a-ativo') return vinculado ? cartao(item, { estado: 'ok', valor: ativoDe(sessao.ativoId)?.placa }) : espera(item)
  return vinculado ? cartao(item, { estado: 'ok', valor: T.confere }) : espera(item) // o chassi: pela CAN ou confirmado (T06)
}

function itemB(mundo, item) {
  const { registro, etapas } = mundo
  const base = { pergunta: item.pergunta }
  if (item.condicao === 'leitor' && !modeloDe(mundo.sessao.ativoId)?.leitor) return cartao(item, { ...base, estado: 'nsa' })
  if (item.herda === 'calibracao') {
    if (!calibrada(mundo)) return cartao(item, { ...base, estado: 'nsa' }) // sem calibração na sessão, não se aplica (o mock)
    if (etapas.calibracao.foto) return cartao(item, { ...base, estado: 'ok', herdado: true })
  }
  if (registro.ressalvas[item.id]) return cartao(item, { ...base, estado: 'ressalva' })
  if (registro.fotos[item.id]) return cartao(item, { ...base, estado: 'ok' })
  return cartao(item, { ...base, estado: 'pendente' })
}

function barra(id, faixa, num) {
  const e = escalaDo(id, faixa)
  return { min: e.min, max: e.max, faixa: [faixa.min, faixa.max ?? e.max], valor: num }
}
function itemC(mundo, item) {
  const { etapas } = mundo
  const L = M.leituraNominalModulo
  if (item.id === 'c-alimentacao' || item.id === 'c-gps') {
    if (!etapas.can?.lida) return espera(item)
    const r = lidoDoSinal(mundo, item.id === 'c-alimentacao' ? 'bateria' : 'satelites')
    if (!r) return cartao(item, { estado: 'nsa', valor: T.vazio, aguarda: true, medida: 'traco' })
    const p = partes(r.lido)
    if (!p || !Number.isFinite(p.num)) return cartao(item, { estado: 'reprovado', valor: T.vazio, medida: 'traco' })
    const f = r.sinal.faixa
    const ok = dentro(f, p.num)
    return cartao(item, {
      estado: ok ? 'ok' : 'reprovado', valor: p.texto, unidade: item.id === 'c-gps' ? T.sat : p.unidade,
      medida: barra(r.sinal.id, f, p.num), leitura: { sinal: r.sinal, ...p },
    })
  }
  if (item.id === 'c-entradas') {
    if (etapas.ativo?.ativoId !== mundo.sessao.ativoId) return espera(item)
    return cartao(item, { estado: L.entradasUsadas <= L.entradasTotal ? 'ok' : 'reprovado', valor: String(L.entradasUsadas), unidade: T.de(L.entradasTotal) })
  }
  // o modem e o sinal
  if (!passou(etapas.preChecagem)) return espera(item)
  return cartao(item, {
    estado: dentro(L.modemFaixa, L.modemDbm) ? 'ok' : 'reprovado', valor: decimal(L.modemDbm), unidade: T.dbm,
    medida: barra('modem', L.modemFaixa, L.modemDbm),
  })
}

function itemD(mundo, item) {
  const { sessao, etapas } = mundo
  const conf = confirmadosDaCadeia(etapas)
  const { ordem, versoes, leituraFinal } = M.cadeia
  const gravou = (bloco) => conf > ordem.indexOf(bloco)
  const [tipo, alvo] = String(item.fonte).split(':')
  if (tipo === 'bloco') {
    if (!gravou(alvo)) return espera(item)
    if (alvo === 'limpeza') return cartao(item, { estado: 'ok', valor: T.feita })
    if (alvo === 'cercas') {
      const regioes = M.cercas.regioes.filter((r) => r.ativoId === sessao.ativoId).length
      return cartao(item, { estado: 'ok', valor: regioes ? versoes.cercas : T.semCerca })
    }
    if (alvo === 'leitor') {
      const { cartoes, indicesAlocados } = M.identificadores
      return cartao(item, { estado: 'ok', valor: String(cartoes.length), unidade: T.de(indicesAlocados.length) })
    }
    if (alvo === 'conexao') {
      const [valor, ...resto] = leituraFinal.redeDoModulo.split(' ')
      return cartao(item, { estado: 'ok', valor, unidade: resto.join(' ') || undefined, unidadeTexto: true })
    }
    return cartao(item, { estado: 'ok', valor: versoes[alvo] })
  }
  if (item.fonte === 'servidor') return gravou('conexao') ? cartao(item, { estado: 'ok', valor: leituraFinal.servidor }) : espera(item)
  if (item.fonte === 'versao') {
    // T13·1 (a): a versão gravada inteira, no cartão das duas colunas (G9)
    return conf >= ordem.length ? cartao(item, { estado: 'ok', valor: etapas.cadeia.versaoGravada ?? versaoComposta(conf), larga: true }) : { ...espera(item), larga: true }
  }
  // cal:<grandeza> · o valor de partida que a calibração da sessão pôs no módulo: o do painel
  const g = alvo
  const modelo = modeloDe(sessao.ativoId)
  if (!M.calibracao.porModelo[modelo?.id]?.calibraveis.includes(g)) return cartao(item, { estado: 'nsa', valor: T.vazio, aguarda: true, medida: 'traco' })
  const painel = M.calibracao.painel[sessao.ativoId]?.[g]
  if (!calibrada(mundo) || painel == null) return espera(item)
  return cartao(item, { estado: 'ok', valor: milhar(painel), unidade: grandezaDe(g).unidade })
}

// T13·4: o passo que falta (ou que reprovou) abre a T14, onde ele se refaz
function itemE(mundo, item) {
  const passo = passoDoCiclo(mundo, item)
  if (passo === 'aprovada') return cartao(item, { estado: 'ok', valor: T.confere })
  return { ...espera(item), estado: passo === 'reprovada' ? 'reprovado' : 'aguarda', naT14: true }
}

function itemF(mundo, item, total, feitosSemF) {
  const falhando = secaoFFalhando(mundo)
  const fila = filaDaSessao(mundo)
  const doTipo = (fonte) => fila.filter((f) => `fila:${f.tipo}` === fonte)
  const evidencias = doTipo(itemDe('f-evidencias').fonte)
  if (falhando) return { ...espera(item), estado: 'reprovado' }
  if (item.id === 'f-evidencias') {
    return evidencias.length ? cartao(item, { estado: 'ok', valor: String(CK.evidencias), unidade: T.subiram, unidadeTexto: true }) : espera(item)
  }
  if (item.id === 'f-checklist') {
    return doTipo(item.fonte).length ? cartao(item, { estado: 'ok', valor: String(feitosSemF), unidade: T.de(total) }) : espera(item)
  }
  // o ID na plataforma: confirma quando a evidência subir (autotesteEncerramento)
  const plataforma = M.autotesteEncerramento.find((a) => a.fonte === 'plataforma')
  return evidencias.length ? cartao(item, { estado: 'ok', valor: plataforma.valor }) : espera(item)
}

// ── o checklist inteiro: os itens, as seções, o placar e o que falta ──
export const resolvido = (c) => c.estado === 'ok' || c.estado === 'ressalva' || c.estado === 'nsa'
export function checklist(mundo) {
  const porSecao = {}
  for (const s of ['A', 'B', 'C', 'D', 'E']) {
    porSecao[s] = itensDa(s).map((item) => (
      s === 'A' ? itemA(mundo, item) : s === 'B' ? itemB(mundo, item) : s === 'C' ? itemC(mundo, item) : s === 'D' ? itemD(mundo, item) : itemE(mundo, item)
    ))
  }
  const total = CK.itens.length
  const semF = Object.values(porSecao).flat()
  // o checklist que sobe (f-checklist) leva o que estava resolvido e a própria Seção F
  const fItens = itensDa('F')
  const feitosAntes = semF.filter(resolvido).length
  porSecao.F = fItens.map((item) => itemF(mundo, item, total, feitosAntes + fItens.length))
  const secoes = SECOES.map((s) => {
    const itens = porSecao[s.id]
    const feitos = itens.filter(resolvido).length
    let estado
    if (itens.some((c) => c.estado === 'reprovado')) estado = 'reprovada'
    else if (feitos === itens.length) estado = 'aprovada'
    else estado = s.natureza === 'manual' ? 'pendente' : 'aguarda'
    return { ...s, itens, feitos, total: itens.length, estado }
  })
  const todos = secoes.flatMap((s) => s.itens)
  const feitos = todos.filter(resolvido).length
  const faltam = secoes.filter((s) => s.bloqueia).reduce((n, s) => n + s.total - s.feitos, 0)
  // o contador do menu (T04·2): B e E, os que o técnico resolve, ainda por resolver
  const pendentesDoMenu = secoes.filter((s) => s.natureza === 'manual' || s.natureza === 'dinamico').reduce((n, s) => n + s.total - s.feitos, 0)
  return { secoes, porSecao, feitos, total, faltam, pendentesDoMenu, falhandoF: secaoFFalhando(mundo) }
}

// ── o nível do item manual (07, 08): a posição, os segmentos e o que vem depois ──
export function nivelDoItem(ck, id) {
  const item = itemDe(id)
  const secao = ck.secoes.find((s) => s.id === item.secao)
  const i = secao.itens.findIndex((c) => c.id === id)
  const segmentos = secao.itens.map((c, k) => {
    if (k === i) return c.estado === 'reprovado' ? 'atual-falha' : 'atual'
    return resolvido(c) ? 'feito' : 'pendente'
  })
  const seguinte = secao.itens.slice(i + 1).find((c) => !resolvido(c))
  return { item, secao, posicao: i + 1, total: secao.total, segmentos, depois: seguinte ? itemDe(seguinte.id).pergunta : null }
}
// o primeiro manual por resolver (o 07 e o 08 abertos pela URL ou pelo palco)
export const primeiroPendente = (ck, s = 'B') => ck.porSecao[s].find((c) => c.estado === 'pendente')?.id ?? itensDa(s)[0].id
// o próximo por resolver depois de um, na ordem da seção (o 'Depois:')
export const proximoPendente = (ck, id) => {
  const s = itemDe(id).secao; const lista = ck.porSecao[s]; const i = lista.findIndex((c) => c.id === id)
  return [...lista.slice(i + 1), ...lista.slice(0, i)].find((c) => c.estado === 'pendente')?.id ?? null
}

// ── o item reprovado (09): o instrumento pela regra da T13·5 e a frase ──
export function instrumentoDoItem(c) {
  const { sinal, texto, unidade, num, casas } = c.leitura
  const f = sinal.faixa
  const e = escalaDo(sinal.id, f)
  const dif = num < f.min ? f.min - num : null
  return {
    valor: texto, unidade,
    escala: { min: e.min, max: e.max, valor: num, faixa: { de: f.min, ate: f.max ?? e.max }, divisoes: Math.round(e.max - e.min), fortes: [f.min, f.max ?? e.max] },
    legendas: { min: decimal(e.min, casas), faixa: T.faixa(decimal(f.min, casas), decimal(f.max, casas)), max: decimal(e.max, casas) },
    frase: dif != null ? T.abaixo(decimal(dif, casas), unidade) : null,
  }
}

// ── o que o Finalizar gera (HU-T13-7): o relatório da instalação na fila,
// criado agora (14:30), o que a Seção F desta sessão lê (G22) ──
export function filaDoFinalizar(mundo) {
  const { ativoId } = mundo.sessao
  const tipos = ['f-evidencias', 'f-checklist'].map((id) => itemDe(id).fonte.replace(/^fila:/, ''))
  return tipos.map((tipo, i) => ({
    id: `sessao-${ativoId}-${i + 1}`, tipo, ativoId, diasAtras: 0, data: M.diasAntes(0), criadoAs: HORA, estado: 'na-fila',
  }))
}
