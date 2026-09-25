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
// aplica. O que não bloqueia (F) conta no título, mas não no 'Faltam'.
//
// A entrega do checklist (decisão 34): cada item é uma linha da seção aberta,
// e tem seta só o que se toca (Lei 16) — a foto por fazer (a câmera do app), o
// automático que falta (a tela que resolve, pelo `origem` do mock) e o que
// reprovou (o nível do item, 09). O resto é leitura: o que o app conferiu, o
// feito, os passos da E, a F.
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
  comRessalva: '12-momento-b-com-ressalva',
  eResolvida: '13-momento-e-resolvida',
  semLocalizacao: '14-estado-homologado-sem-localizacao',
}
export const SECAO_DO_MOMENTO = {
  [REF.A]: 'A', [REF.B]: 'B', [REF.C]: 'C', [REF.D]: 'D', [REF.E]: 'E', [REF.F]: 'F', [REF.comRessalva]: 'B', [REF.eResolvida]: 'E',
}

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

// o nome da seção no cartão ('A · Identificação'), e o rótulo de topo do nível
// do item: o título longo na seção que o técnico faz ('B · INSTALAÇÃO FÍSICA',
// T13/07 e 08) e o nome curto na que o app confere ('C · HARDWARE', T13/09) —
// é o que as referências da entrega desenham (AC-11, pro arquiteto)
export const nomeDaSecao = (s) => T.secao(s.id, s.rotulo)
export const rotuloDoNivel = (s) => caixaAlta(T.secao(s.id, s.natureza === 'manual' ? s.titulo : s.rotulo))

// o momento da seção aberta, pelo que ela mostra: a B com ressalva (12) e a E
// resolvida (13) têm quadro próprio; homologado, nenhuma seção aberta tem
// referência, e a URL sai do momento
export function momentoDaSecao(s, ck, homologada) {
  if (homologada) return null
  if (s === 'B' && ck.porSecao.B.some((c) => c.estado === 'ressalva')) return REF.comRessalva
  if (s === 'E' && ck.secoes.find((x) => x.id === 'E').estado === 'aprovada') return REF.eResolvida
  return { A: REF.A, B: REF.B, C: REF.C, D: REF.D, E: REF.E, F: REF.F }[s]
}

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

// o ciclo que a T14 grava quando os cinco passos e o evento fecham (T14/05):
// o 13 aberto pela URL é o fluxo depois disso (G20), e a coluna do 10 e do 14 chega com ele
export function cicloConcluido(ativoId, moduloSerial) {
  const passos = Object.fromEntries(itensDa('E').map((i) => [i.id, 'aprovada']))
  return {
    ativoId, moduloSerial, passos, feitos: itensDa('E').length, total: itensDa('E').length,
    evento: 'conferido', tentativa: 1, cartao: null, correcao: null, concluido: true, fechado: false,
  }
}
// as fotos de B tiradas: o que bloqueia fechou (o 10, o 14 e o 11 pela URL)
const fotosDeB = () => Object.fromEntries(itensDa('B').filter((i) => !i.herda).map((i) => [i.id, HORA]))

// ── o mundo: a sessão, as etapas, a fila e os casos que valem ──
// No estado da coluna, o do caso da receita (G21): o 09 no a-02 do
// can-estatico-isolado (a bateria abaixo do mínimo, na CAN), o 10 no a-09 do
// pronto-para-fechar (o ciclo completo, as fotos tiradas e o servidor que não
// respondeu), o 14 na sessão do herói homologada, com a localização negada
// (localizacao-negada é caso do celular, e não diz ativo). No fluxo, o estado único.
export function mundoDe({ unico, est, semente }) {
  const receita = est ? RECEITAS[`T13/${est}`] : null
  if (receita) {
    const casoId = receita.casos[0]
    const caso = M.casos[casoId]
    const a = caso.ativoId ? ativoDe(caso.ativoId) : ativoDe(semente.sessao.ativoId)
    const sessao = { ...semente.sessao, ativoId: a.id, moduloSerial: a.moduloSerial }
    const etapas = { ...etapasDoCaminho(a.id, a.moduloSerial) }
    let registro = registroVazio(a.id)
    if (est === REF.secaoF || est === REF.semLocalizacao) {
      // o ciclo completo pro Finalizar acender, e as fotos de B tiradas: o que bloqueia fechou (o caso)
      etapas.ciclo = cicloConcluido(a.id, a.moduloSerial)
      registro = { ...registro, fotos: fotosDeB() }
    }
    // o 14: o Finalizar tocado, com a localização negada (HU-T13-7: o relatório vai sem ela)
    if (est === REF.semLocalizacao) registro = { ...registro, homologada: true, homologadaAs: HORA }
    const semLocalizacao = caso.permissao === 'localizacao' && caso.resposta === 'negada'
    return { sessao, etapas, fila: [...M.filaSaida], casosConsumidos: [], registro, casos: [casoId], semLocalizacao }
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
    casos: [], semLocalizacao: false,
  }
}

// o que a T13 grava em etapas.checklist (logica.md · os contadores do menu)
export function registroVazio(ativoId) {
  return { ativoId, aberto: true, fotos: {}, ressalvas: {}, pendentes: null, homologada: false, homologadaAs: null, ciencia: null }
}

// o quadro que a URL pede (G20): o fluxo depois dos toques que levam lá — o 11,
// as fotos de B tiradas, o ciclo feito e o Finalizar tocado; o 12, o Módulo
// salvo com a ressalva de exemplo; o 13, o ciclo que a T14 fechou
export function registroDoQuadro(momento, base, ck) {
  const r = base.registro
  if (momento === REF.homologado && !r.homologada) {
    const fotos = { ...r.fotos }
    for (const c of ck.porSecao.B) if (c.estado === 'pendente') fotos[c.id] = HORA
    return { ...r, fotos, homologada: true, homologadaAs: HORA }
  }
  if (momento === REF.comRessalva && !Object.keys(r.ressalvas).length) {
    const id = ck.porSecao.B.find((c) => c.estado === 'pendente')?.id
    if (id) return { ...r, ressalvas: { ...r.ressalvas, [id]: { justificativa: CK.exemploJustificativa, as: HORA } } }
  }
  return r
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

// T13·5 · a escala do instrumento do item reprovado (09), pela regra escrita no
// tela.md: a bateria com a faixa esperada entre 1/3 e 5/6 da barra (10–16 no
// herói), os satélites de 0 a 12 (a escala da T07). As posições saem da conta.
export function escalaDo(id, faixa) {
  if (id === 'satelites') return { min: 0, max: 12 }
  const w = faixa.max - faixa.min
  if (id === 'bateria') return { min: faixa.min - (2 * w) / 3, max: faixa.max + w / 3 }
  return { min: faixa.min, max: faixa.max ?? faixa.min }
}

// ── o que cada seção lê ──
function passou(etapa) { return !!etapa && (etapa.daSemente || etapa.passaram === etapa.checagens) }
function confirmadosDaCadeia(etapas) { return etapas.cadeia?.confirmados ?? 0 }
function calibrada(mundo) { const c = mundo.etapas.calibracao; return !!c && c.ativoId === mundo.sessao.ativoId && Object.keys(c.semeadas ?? {}).length > 0 }
// a hora da foto do painel, a da calibração (o relógio parado, G9)
function horaDaFotoDoPainel(mundo) {
  const f = Object.values(mundo.etapas.calibracao?.fotos ?? {})[0]
  return f?.as ?? HORA
}
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
  if (c.completo || c.concluido) return 'aprovada'
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

// ── cada item: o estado, o tipo da linha e o que ela diz ──
// estado: ok · ressalva · nsa (não se aplica) · pendente · aguarda · reprovado
// tipo: leitura (sem seta) · tocar (com seta, e o destino) · feito · ressalva
// destino: { tela } (a tela que resolve) · 'item' (a câmera do app, 07) · 'reprovado' (o 09)
const base = (item, c) => ({ id: item.id, secao: item.secao, nome: item.rotulo, tipo: 'leitura', ...c })
const lido = (item, valor) => base(item, { estado: 'ok', valor })
const naoSeAplica = (item) => base(item, { estado: 'nsa', valor: T.vazio, apagado: true })
// o automático que falta leva à tela que resolve, pelo `origem` do mock (a entrega do checklist)
const TELA_DA_ORIGEM = { conectar: 'T05', ativo: 'T06', can: 'T08', configurar: 'T09', calibracao: 'T10' }
const ICONE_DA_ORIGEM = { conectar: 'conectar', ativo: 'ativo', can: 'refazer', configurar: 'configurar', calibracao: 'calibracao' }
function falta(item) {
  const tela = TELA_DA_ORIGEM[item.origem]
  if (!tela) return base(item, { estado: 'aguarda', valor: T.vazio, apagado: true })
  return base(item, { estado: 'pendente', tipo: 'tocar', icone: ICONE_DA_ORIGEM[item.origem], legenda: T.aFazer, destino: { tela } })
}
// o que reprovou: com a leitura, o nível do item (09); sem ela, a tela que resolve
function reprovou(item, legenda, leitura) {
  return base(item, { estado: 'reprovado', tipo: 'tocar', legenda, leitura, destino: leitura ? 'reprovado' : { tela: TELA_DA_ORIGEM[item.origem] } })
}

function itemA(mundo, item) {
  const { sessao, etapas } = mundo
  const conectado = passou(etapas.preChecagem)
  const vinculado = etapas.ativo?.ativoId === sessao.ativoId
  if (item.id === 'a-serial') return conectado ? lido(item, sessao.moduloSerial) : falta(item)
  if (item.id === 'a-firmware') return conectado ? lido(item, moduloDe(sessao.moduloSerial)?.firmware) : falta(item)
  if (item.id === 'a-ativo') return vinculado ? lido(item, ativoDe(sessao.ativoId)?.placa) : falta(item)
  return vinculado ? lido(item, T.confere) : falta(item) // o chassi: pela CAN ou confirmado (T06)
}

// a causa da ressalva, na linha: a primeira oração da justificativa, com a
// minúscula no começo ('Suporte trincado; fixei…' → 'suporte trincado', T13/12)
export function causaDa(justificativa) {
  const [primeira] = String(justificativa ?? '').split(/[;.—]/)
  const t = primeira.trim()
  return t ? t.charAt(0).toLowerCase() + t.slice(1) : null
}

function itemB(mundo, item) {
  const { registro, etapas } = mundo
  const b = (c) => base(item, { tipo: 'feito', pergunta: item.pergunta, ...c })
  // sem leitor no ônibus, ou sem calibração na sessão, não se aplica (o mock): o traço, sem frase (G25)
  if (item.condicao === 'leitor' && !modeloDe(mundo.sessao.ativoId)?.leitor) return b({ estado: 'nsa' })
  if (item.herda === 'calibracao') {
    if (!calibrada(mundo)) return b({ estado: 'nsa' })
    if (etapas.calibracao.foto) return b({ estado: 'ok', herdado: true, legenda: T.fotografadoNaCalibracao(horaDaFotoDoPainel(mundo)) })
  }
  const ressalva = registro.ressalvas[item.id]
  if (ressalva) { const causa = causaDa(ressalva.justificativa); return b({ estado: 'ressalva', tipo: 'ressalva', legenda: causa ? T.comRessalva(causa) : undefined }) }
  // a foto tirada aqui: o check, e nenhum texto aprovado diz de onde ela veio (G25)
  if (registro.fotos[item.id]) return b({ estado: 'ok' })
  return b({ estado: 'pendente', tipo: 'tocar', icone: 'camera', legenda: T.fotoATirar, destino: 'item' })
}

function itemC(mundo, item) {
  const { etapas } = mundo
  const L = M.leituraNominalModulo
  if (item.id === 'c-alimentacao' || item.id === 'c-gps') {
    if (!etapas.can?.lida) return falta(item)
    const r = lidoDoSinal(mundo, item.id === 'c-alimentacao' ? 'bateria' : 'satelites')
    if (!r) return naoSeAplica(item)
    const p = partes(r.lido)
    if (!p || !Number.isFinite(p.num)) return reprovou(item, T.vazio, null)
    const valor = item.id === 'c-gps' ? T.satelites(p.texto) : [p.texto, p.unidade].filter(Boolean).join(' ')
    return dentro(r.sinal.faixa, p.num) ? lido(item, valor) : reprovou(item, valor, { sinal: r.sinal, ...p })
  }
  if (item.id === 'c-entradas') {
    if (etapas.ativo?.ativoId !== mundo.sessao.ativoId) return falta(item)
    return L.entradasUsadas <= L.entradasTotal ? lido(item, T.conforme) : reprovou(item, `${L.entradasUsadas} ${T.de(L.entradasTotal)}`, null)
  }
  // o modem e o sinal: a palavra, sem o dBm (a entrega do checklist, T13-N5)
  if (!passou(etapas.preChecagem)) return falta(item)
  return dentro(L.modemFaixa, L.modemDbm) ? lido(item, T.sinalBom) : reprovou(item, T.vazio, null)
}

function itemD(mundo, item) {
  const { sessao, etapas } = mundo
  const conf = confirmadosDaCadeia(etapas)
  const { ordem, versoes } = M.cadeia
  const gravou = (bloco) => conf > ordem.indexOf(bloco)
  const modelo = modeloDe(sessao.ativoId)
  const [tipo, alvo] = String(item.fonte).split(':')
  if (tipo === 'bloco') {
    if (!gravou(alvo)) return falta(item)
    if (alvo === 'limpeza') return lido(item, T.feita)
    if (alvo === 'ativo') return lido(item, modelo?.traducaoCan ?? versoes.ativo)
    if (alvo === 'cercas') {
      const regioes = M.cercas.regioes.filter((r) => r.ativoId === sessao.ativoId).length
      return lido(item, regioes ? versoes.cercas : T.semCerca)
    }
    if (alvo === 'leitor') return lido(item, T.gravados)
    if (alvo === 'eventos') {
      const preset = M.presetsEvento.find((p) => p.id === modelo?.presetEventoId)
      return lido(item, preset ? T.intervalo(preset.intervaloRastreamentoSeg) : versoes.eventos)
    }
    if (alvo === 'conexao') return lido(item, T.atual)
    return lido(item, versoes[alvo])
  }
  if (item.fonte === 'servidor') return gravou('conexao') ? lido(item, T.gravado) : falta(item)
  if (item.fonte === 'versao') {
    // a versão gravada inteira (G9)
    return conf >= ordem.length ? lido(item, etapas.cadeia.versaoGravada ?? versaoComposta(conf)) : falta(item)
  }
  // cal:<grandeza> · o valor de partida que a calibração da sessão pôs no módulo: o do painel
  const g = alvo
  if (!M.calibracao.porModelo[modelo?.id]?.calibraveis.includes(g)) return naoSeAplica(item)
  const painel = M.calibracao.painel[sessao.ativoId]?.[g]
  if (!calibrada(mundo) || painel == null) return falta(item)
  return lido(item, `${milhar(painel)} ${grandezaDe(g).unidade}`)
}

// E · leitura só: o passo aprovado diz 'confere'; o que falta, 'a fazer'. A
// ação da seção é uma só, o Fazer o ciclo dinâmico (T13·4, HU-T13-8)
function itemE(mundo, item) {
  const passo = passoDoCiclo(mundo, item)
  if (passo === 'aprovada') return lido(item, T.confere)
  return base(item, { estado: passo === 'reprovada' ? 'reprovado' : 'pendente', valor: T.aFazer, apagado: true })
}

// F · leitura só, sem ação: espera o servidor. Homologado, o relatório está na
// fila e ela confere (G22); nenhuma referência desenha os itens assim, e ficam
// os valores do C10, com o número do mock
function itemF(mundo, item, total, feitosSemF) {
  if (secaoFFalhando(mundo)) return base(item, { estado: 'reprovado', valor: T.vazio, apagado: true })
  const fila = filaDaSessao(mundo)
  const doTipo = (fonte) => fila.filter((f) => `fila:${f.tipo}` === fonte)
  const subiu = doTipo(itemDe('f-evidencias').fonte).length > 0
  const esperando = base(item, { estado: 'aguarda', valor: T.esperaEnvio, apagado: true })
  if (item.id === 'f-evidencias') return subiu ? lido(item, T.subiram(CK.evidencias)) : esperando
  if (item.id === 'f-checklist') return doTipo(item.fonte).length ? lido(item, `${feitosSemF} ${T.de(total)}`) : esperando
  // o ID na plataforma: confirma quando a evidência subir (autotesteEncerramento)
  const plataforma = M.autotesteEncerramento.find((a) => a.fonte === 'plataforma')
  return subiu ? lido(item, plataforma.valor) : esperando
}

// quem age, embaixo do nome da seção (a entrega do checklist, decisão 34): o
// que o app confere, o que o técnico fotografa, o ciclo, o servidor. Com 1, o
// plural do textos.md não existe, e a linha fica sem ela (G25, como o 'Faltam')
function quemAgeDa(s, itens, homologada) {
  const feitos = itens.filter(resolvido).length
  if (s.natureza === 'automatico') return homologada ? T.appConferiu : T.appConfere
  if (s.natureza === 'manual') {
    const aTirar = itens.filter((c) => c.estado === 'pendente').length
    if (aTirar) return aTirar > 1 ? T.voceFotografa(aTirar) : null
    const fotos = itens.filter((c) => c.estado === 'ok').length
    return fotos > 1 ? T.fotosTiradas(fotos) : null
  }
  if (s.natureza === 'dinamico') return feitos === itens.length ? T.cicloPassou : T.voceFazCiclo
  return feitos === itens.length ? T.servidorConfirmou : T.esperaServidor
}

// ── o checklist inteiro: os itens, as seções, a contagem e o que falta ──
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
  const homologada = !!mundo.registro.homologada
  const secoes = SECOES.map((s) => {
    const itens = porSecao[s.id]
    const feitos = itens.filter(resolvido).length
    let estado
    if (itens.some((c) => c.estado === 'reprovado')) estado = 'reprovada'
    else if (feitos === itens.length) estado = 'aprovada'
    else estado = s.natureza === 'servidor' ? 'aguarda' : 'pendente'
    // a E tem uma ação só, enquanto falta passo: Fazer o ciclo dinâmico → T14
    const acao = s.natureza === 'dinamico' && feitos < itens.length
      ? { nome: T.fazerCiclo, legenda: T.osPassos(itens.length), icone: 'ciclo', destino: { tela: 'T14' } }
      : null
    return { ...s, itens, feitos, total: itens.length, estado, quemAge: quemAgeDa(s, itens, homologada), acao }
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
