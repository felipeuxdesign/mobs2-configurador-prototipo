// T14 · o ciclo lido do mock (M.ciclo, M.casos, M.checklist): os passos
// canônicos, o prazo e os dois degraus do evento, a fila do módulo, e os três
// casos que a tela lê. A cadência (quanto vale um segundo de prazo, quando cada
// passo acende, quanto a fila leva pra drenar) é do ritmos.js (G4, T14·1).
// Nada de número digitado: contagens, horas e prazos saem daqui.
import { M } from '../../dados/mock.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'

export const REF = {
  antes: '01-momento-antes-do-disparo',
  estourado: '02-estado-prazo-estourado',
  fora: '03-estado-dinamico-fora-do-esperado',
  identificador: '04-estado-identificador-divergente',
  concluido: '05-momento-ciclo-concluido',
  corrigida: '06-momento-correcao-solicitada',
}
export const CASO_SEM_RESPOSTA = 'evento-sem-resposta'
export const CASO_FORA = 'can-fora-esperado'
export const CASO_IDENTIFICADOR = 'identificador-divergente'
const CASO_PENDENCIAS = 'modulo-com-pendencias'

// os passos canônicos: os cinco da Seção E do checklist, que são os da i-01
// (mocks.js, PASSOS_CICLO) — com o id do item, que é como o checklist os lê
export const PASSOS = M.checklist.itens.filter((i) => i.secao === 'E' && i.origem === 'ciclo').map((i) => ({ id: i.id, titulo: i.pergunta }))
export const PRAZO = M.ciclo.prazoEventoSeg
export const EVENTO = M.ciclo.evento

// o tique do prazo: 1 s real vale RITMOS.prazoFator s de prazo, então um segundo
// de prazo passa a cada 250 ms. O processo inteiro anda nesse tique.
export const TIQUE_MS = 1000 / RITMOS.prazoFator
// o passo k (1 a 5) acende a k × cicloPassoMs do disparo (T14·1): os três que
// a semente não traz, a +9, +12 e +15 s — no tique do prazo, 36, 48 e 60
export const tiqueDoPasso = (i) => ((i + 1) * RITMOS.cicloPassoMs) / TIQUE_MS
// o quadro da 00: o instante antes de o evento chegar (120 − 24 = 96, o 1:36)
export const QUADRO_00 = EVENTO.recebidoAosSeg
// o quadro da 05: o último passo aceso, com o evento já conferido
export const QUADRO_05 = Math.max(tiqueDoPasso(PASSOS.length - 1), EVENTO.conferidoAosSeg + 1)

// a hora em que o servidor recebeu: o disparo é às 14:30 em ponto (a hora do protótipo)
export const horaDoRecebido = () => `${M.HORA_NOMINAL}:${String(EVENTO.recebidoAosSeg).padStart(2, '0')}`

export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
// o par módulo × ativo da sessão; sem sessão, o da semente (o herói)
export const parDaSessao = (s) => {
  const x = s?.ativoId ? s : SEMENTES.T14.sessao
  return { ativoId: x.ativoId, moduloSerial: x.moduloSerial }
}
// o par de um caso: o módulo é o do caso, ou o do ativo no cadastro
export const parDoCaso = (k) => {
  const c = M.casos[k]
  return { ativoId: c.ativoId, moduloSerial: c.moduloSerial ?? ativoDe(c.ativoId).moduloSerial }
}

// o cartão do caso identificador-divergente: o que o leitor leu (exemplos) e o
// que o cadastro espera (o cartão, em M.identificadores)
function cartaoDoCaso() {
  const c = M.casos[CASO_IDENTIFICADOR]
  const ex = c.exemplos.find((e) => e.cartaoId === c.cartaoId)
  const cartao = M.identificadores.cartoes.find((x) => x.id === c.cartaoId)
  return { cartaoId: c.cartaoId, lido: ex.lido, esperado: cartao.codigoEsperado }
}

// os casos que valem neste par (o da faixa, G28). O sinal fora do esperado e o
// cartão que não bate são fato do veículo e do cadastro: valem toda vez. O evento
// sem resposta vale uma vez por sessão (G21): a 1ª tentativa estoura, a 2ª confirma.
// A linha do teste do cartão só entra com o caso de identificador (T14·3).
export function casosDoPar(par, consumidos = []) {
  const bate = (k) => {
    const c = M.casos[k]
    return c.ativoId === par.ativoId && (c.moduloSerial == null || c.moduloSerial === par.moduloSerial)
  }
  return {
    semResposta: bate(CASO_SEM_RESPOSTA) && !consumidos.includes(CASO_SEM_RESPOSTA),
    fora: bate(CASO_FORA) ? M.casos[CASO_FORA] : null,
    cartao: bate(CASO_IDENTIFICADOR) ? cartaoDoCaso() : null,
  }
}

// a fila guardada no módulo, que drena antes do disparo: a de todo módulo, ou a
// do modulo-com-pendencias quando o serial da sessão é o dele (mocks.js, C20)
export function filaDoModulo(serial) {
  const p = M.casos[CASO_PENDENCIAS]
  return p.moduloSerial === serial ? { mensagens: p.mensagens, diagnostico: p.diagnostico } : M.ciclo.mensagensGuardadas
}

// o veredito de um passo quando ele acontece: reprovado se é o passo que o sinal
// do caso prova (M.ciclo.passoDoSinal, AC-10), aprovado nos outros
export const veredito = (i, fora) => (fora && M.ciclo.passoDoSinal[fora.sinal] === PASSOS[i].titulo ? 'reprovada' : 'aprovada')

// os passos na entrada: os que a semente traz feitos (T14·1), e o resto por fazer
export const passosNaEntrada = (fora) => PASSOS.map((_, i) => (i < RITMOS.cicloPassosNaEntrada ? veredito(i, fora) : 'pendente'))
// todos os passos feitos (o 02 e o 05)
export const passosFeitos = (fora) => PASSOS.map((_, i) => veredito(i, fora))
// os passos gravados em etapas.ciclo (pelo id do item), na ordem canônica
export const passosDoRegistro = (reg) => PASSOS.map((p) => reg.passos?.[p.id] ?? 'pendente')
