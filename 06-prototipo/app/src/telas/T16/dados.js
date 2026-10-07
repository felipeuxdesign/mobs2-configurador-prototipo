// T16 · o que a sessão lê do mock: o passo 2 (o driver reinicia por comando ou
// pede o corte, T16·1), as 8 assertivas do encerramento com o valor lido
// (M.autotesteEncerramento, HU-T16-4), os blocos da cadeia, e os dois casos dos
// estados (autoteste-falhando, sessao-interrompida). Nada de número digitado: as
// contagens saem das listas do mock e da lista dos passos.
import { M } from '../../dados/mock.js'
import { milhar } from '../../dados/formato.js'
import { ESTADOS } from '../../ds/index.js'
import { conteudoDo } from '../T09/cadeia.js'
import { PASSOS, T } from './textos.js'

export const REF = {
  // a rodada 1 do retorno do PM: o reinício automático (01) e a conexão que cai nele (08); a
  // instalação homologada (02) e a homologação bloqueada (05)
  reiniciando: '01-momento-reiniciando-o-modulo',
  reconectando: '08-momento-reconectando-no-reinicio',
  encerrada: '02-momento-instalacao-homologada',
  semHomologar: '03-momento-encerrando-sem-homologar',
  encerradaSemHomologar: '04-momento-encerrada-sem-homologar',
  falhando: '05-estado-homologacao-bloqueada',
  interrompida: '06-estado-sessao-interrompida',
  autoteste: '07-momento-autoteste-correndo', // as assertivas acendendo, sem o veredito (o pacote 5, lei 24)
}
export const CASO_FALHA = 'autoteste-falhando'
export const CASO_INTERROMPIDA = 'sessao-interrompida'

// ── os passos ──
const indice = (id) => PASSOS.findIndex((p) => p.id === id)
export const REINICIO = indice('reinicio')     // o passo 2, o reinício automático
export const AUTOTESTE = indice('autoteste')   // o passo 8: ao fechar o 7, a tela passa pra Sessão encerrada (T16·4)
export const QUADRO_00 = indice('releitura')   // a 00: dois feitos, a releitura correndo
// os quatro que deixam o módulo seguro, e rodam sem homologar (os 4 passos da sessão abortada, G23)
export const SEGUROS = PASSOS.filter((p) => p.seguro)
export const QUADRO_03 = SEGUROS.findIndex((p) => p.id === 'canal') // a 03: o Repouso restaurado, o Canal correndo

// ── o par da faixa ──
export const placaDe = (ativoId) => M.ativos.find((a) => a.id === ativoId)?.placa
export const moduloDoAtivo = (ativoId) => M.ativos.find((a) => a.id === ativoId)?.moduloSerial
const modeloDoModulo = (serial) => {
  const mod = M.modulos.find((m) => m.serial === serial)
  return mod ? M.modelos.find((m) => m.id === mod.modeloId) : null
}
// O 01 e o 08 (a rodada 1): a referência desenha o reinício no KNB-5H39 com o M2C-0371 — na
// garagem do contexto, o ônibus cujo módulo não reinicia por comando (o mock ainda diz
// reinicioPorComando) —, e o protótipo abre os dois nele, pelo endereço. No fluxo, todo reinício
// é automático, e o passo corre dentro do encerramento, sem quadro próprio
const reiniciaPorComando = (serial) => modeloDoModulo(serial)?.reinicioPorComando !== false
export function parDoReinicio(uoId) {
  const a = M.ativos.find((x) => x.uoId === uoId && x.moduloSerial && !reiniciaPorComando(x.moduloSerial))
  return a ? { ativoId: a.id, moduloSerial: a.moduloSerial } : null
}
// ── a cadeia do encerramento ──
// Com o checklist registrado: os passos 1 a 7 correm, um por vez (`k` é o que
// corre), cada um com a legenda dele embaixo do nome (o tela.md · a peça só mostra a
// legenda no passo que corre); o 8, o autoteste, é a tela seguinte (T16·4). O passo 2,
// o reinício, é automático (a rodada 1); com a conexão caída (`reconectando`), ele diz
// *reconectando* e a legenda da queda (a 08)
export function passosEncerrando(k, reconectando = false) {
  return PASSOS.map((p, i) => {
    if (i < k) return { estado: 'ok', nome: p.nome, situacao: p.feito ?? '' }
    if (i === k) {
      if (reconectando && i === REINICIO) return { estado: 'agora', nome: p.nome, situacao: T.reconectando.corre, legenda: T.reconectando.legenda }
      return { estado: 'agora', nome: p.nome, situacao: p.corre ?? '', legenda: p.legenda }
    }
    return { estado: 'espera', nome: p.nome, situacao: T.aindaNao }
  })
}
// Sem homologar: só os quatro seguros correm (`feitos` é quantos já fecharam),
// cada um com a legenda dele enquanto corre; os outros ficam pulados, com o
// traço solto da folha 5 no poço e o texto 'pulado' (a 03).
// São três estados, e não um (otimizacao300000000 · MUDANCAS §3): o 'não se
// aplica' é só da assertiva do autoteste que não vale pro ativo (a 02 e a 05,
// o círculo com o traço, em assertivas()); o 'pulado' é o passo que o encerrar
// sem homologar pula (a 03, aqui); e o traço '—' é o passo que ainda não chegou
// (a 00 e a 01, o 'espera').
export function passosAbortando(feitos) {
  return PASSOS.map((p) => {
    const j = SEGUROS.indexOf(p)
    if (j < 0) return { estado: 'pulado', nome: p.nome, situacao: T.pulado }
    if (j < feitos) return { estado: 'ok', nome: p.nome, situacao: p.feito }
    if (j === feitos) return { estado: 'agora', nome: p.nome, situacao: p.corre ?? '', legenda: p.legenda }
    return { estado: 'espera', nome: p.nome, situacao: T.aindaNao }
  })
}

// ── os blocos da cadeia (decisão 49 · o módulo não guarda versão): a prova da
// sessão encerrada conta os blocos relidos, da ordem canônica — '6 blocos'
const { ordem: ORDEM, rotulos: ROTULOS } = M.cadeia
export const blocosRelidos = () => T.blocos(ORDEM.length)
// o espécime mov-check da vitrine ainda importa pelo nome de antes: ele passa a dizer os 6
// blocos, e o nome sai quando a vitrine importar o blocosRelidos
export const versaoCompleta = blocosRelidos

// ── as sete assertivas do encerramento (M.autotesteEncerramento, a rodada 1 do retorno do PM),
// cada uma com o valor lido — nunca um OK agregado (HU-T16-4) ──
const ENC = M.autotesteEncerramento
// a 07 (o pacote 5): o autoteste parado no ID no cadastro — três prontas, a da vez conferindo
export const QUADRO_07 = ENC.findIndex((a) => a.id === 'id-cadastro')
export const TOTAL_ASSERTIVAS = ENC.length
const AINDA_NAO = ESTADOS.espera.nome

// o contador que voltou do reinício: o que está no painel do ônibus, que a
// calibração semeou (M.calibracao.painel), em cada grandeza que ele tem —
// no herói, 482.317 km · 9.640 h. Ônibus sem contador no mock: nada (null).
function contadores(ativoId) {
  const painel = M.calibracao.painel[ativoId]
  if (!painel) return null
  return M.calibracao.grandezas.filter((g) => painel[g.id] != null).map((g) => `${milhar(painel[g.id])} ${g.unidade}`).join(' · ')
}

// A falha do autoteste (HU-T16-5): no ativo do caso, a assertiva do
// noEncerramento volta com o valor lido do caso — no a-14, 'Contadores · 0 km'.
// No fluxo, ela vale pro par da faixa que é o do caso; no estado 05, pela receita.
function falhaDo(ativoId) {
  const c = M.casos[CASO_FALHA]
  return c && c.ativoId === ativoId ? c.noEncerramento : null
}

export function assertivas(ativoId) {
  const falha = falhaDo(ativoId)
  return ENC.map((a) => {
    const base = { id: a.id, titulo: a.rotulo }
    if (falha && falha.assertiva === a.id) return { ...base, estado: 'reprovada', valor: falha.lido }
    // o reset de leitura (a rodada 1): só quando foi usado; senão, não se aplica, com o motivo — e
    // não conta como aprovada
    if (a.condicional) return { ...base, estado: 'nao-se-aplica', glifo: 'traco-circulo', valor: T.naoSeAplica, porque: a.motivo }
    // o evento do cartão não bloqueia (R1): depende do servidor — pendente, confere em até 24 h
    if (a.bloqueia === false) return { ...base, estado: 'ainda-nao', glifo: 'relogio', nomeGlifo: AINDA_NAO, valor: a.valor, porque: a.nota }
    if (a.fonte === 'versao') return { ...base, estado: 'aprovada', valor: T.confere }
    if (a.fonte === 'contador') {
      // revisão C11: sem o contador lido, a assertiva não aprova — espera, com o
      // traço, como a 'ainda não' da folha 4. Nunca o check sem o valor lido
      // (HU-T16-4; mocks.js: 'nunca verde por omissão'), e nunca número inventado.
      const lido = contadores(ativoId)
      return lido ? { ...base, estado: 'aprovada', valor: lido } : { ...base, estado: 'ainda-nao', valor: T.aindaNao }
    }
    return { ...base, estado: 'aprovada', valor: a.valor } // o fato é o próprio estado do módulo: confere, fechado, restaurado
  })
}
// os três contadores separados (a rodada 1): aprovadas, não se aplicam e pendentes — das que já
// acenderam; cada um só quando tem alguma · nunca *7 de 8*
export function contadoresDas(lista) {
  const n = (e) => lista.filter((a) => a.estado === e).length
  return [
    { n: n('aprovada'), texto: T.aprovadas(n('aprovada')) },
    { n: n('nao-se-aplica'), texto: T.naoSeAplicam(n('nao-se-aplica')) },
    { n: n('ainda-nao'), texto: T.pendentes(n('ainda-nao')) },
  ].filter((c) => c.n > 0)
}
// a causa de cada assertiva que pode reprovar: só a dos contadores tem texto aprovado
export const CAUSA = { contadores: T.causaContadores }

// ── a sessão interrompida (06): os seis blocos da T09 no desenho da cadeia do
// encerramento; os confirmados feitos, o seguinte parado e o resto esperando ──
// Os confirmados mostram o conteúdo do bloco no par do caso, o mesmo da T09
// (decisão 49 · o do caso, nunca o do herói: o QAH-1M67 tem as 4 regiões da
// garagem dele, a uo-02 — o pacote 3, D1); a limpeza, 'feita'. A legenda do bloco que parou diz o
// que já foi gravado, montada dos confirmados do caso, sem a limpeza: 'o ativo e
// as cercas já estão gravados' (só o ativo e as cercas têm a forma com artigo no
// textos.md; outro bloco, sem texto, fica de fora — G25)
const LIMPEZA = ORDEM[0]
export function interrompida() {
  const c = M.casos[CASO_INTERROMPIDA]
  const quando = c.diasAtras === 0 ? T.hoje : null // o caso é de hoje; outra idade não tem texto aprovado (G25)
  const conteudo = conteudoDo({ ativoId: c.ativoId, moduloSerial: c.moduloSerial })
  const gravados = ORDEM.slice(0, c.confirmados).filter((b) => b !== LIMPEZA && T.comArtigo[b]).map((b) => T.comArtigo[b])
  const blocos = ORDEM.map((b, i) => {
    if (i < c.confirmados) return { estado: 'ok', nome: ROTULOS[b], situacao: b === LIMPEZA ? T.confereBloco : conteudo[b] }
    if (i === c.confirmados) return { estado: 'pausa', nome: ROTULOS[b], situacao: T.parouAqui, legenda: gravados.length > 1 ? T.jaGravados(gravados) : undefined }
    return { estado: 'espera', nome: ROTULOS[b], situacao: T.aindaNao }
  })
  return {
    caso: c,
    confirmados: c.confirmados,
    total: ORDEM.length,
    subtitulo: quando ? T.iniciada(placaDe(c.ativoId), c.moduloSerial, quando, c.iniciadaAs) : `${placaDe(c.ativoId)} · ${c.moduloSerial}`,
    blocos,
  }
}
