// T14 · o ciclo lido do mock (M.ciclo, M.casos, M.checklist, M.modelosAtivo):
// os passos do par, o prazo e os dois degraus do evento, a fila do módulo, e os
// três casos que a tela lê. A cadência (quanto vale um segundo de prazo, quando
// cada passo acende, quanto a fila leva pra drenar) é do ritmos.js (G4, T14·1).
// Nada de número digitado: contagens, horas e prazos saem daqui.
import { M } from '../../dados/mock.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'
import { T } from './textos.js'

export const REF = {
  antes: '01-momento-antes-do-disparo',
  estourado: '02-estado-prazo-estourado',
  segundaFalha: '09-estado-segunda-falha-do-evento',   // o pacote 12: o evento que não chega nas duas tentativas
  fora: '03-estado-dinamico-fora-do-esperado',
  identificador: '04-estado-identificador-divergente',
  concluido: '05-momento-ciclo-concluido',
  corrigida: '06-momento-correcao-solicitada',
  // o pacote 6: a vez da porta e a do cartão, quadros do meio do ciclo
  vezDaPorta: '07-momento-vez-da-porta',
  vezDoCartao: '08-momento-vez-do-cartao',
}
export const CASO_SEM_RESPOSTA = 'evento-sem-resposta'
// o pacote 12 (T14/09): o mesmo par, e a 2ª tentativa também estoura (`tentativasQueEstouram`)
// · padrão até o PM decidir · só pela coluna: no fluxo, o par segue o evento-sem-resposta
export const CASO_DE_NOVO = 'evento-nao-chega-de-novo'
// o pacote 2 (decisão 54): o 03 é a rotação zerada, o motor desligado com a
// ignição ligada — o can-fora-esperado (a velocidade em 0) saiu da T14: com o
// ônibus parado, a velocidade só entra com tacógrafo digital, e o a-02 não tem
export const CASO_MOTOR = 'motor-desligado-no-ciclo'
export const CASO_IDENTIFICADOR = 'identificador-divergente'
const CASO_PENDENCIAS = 'modulo-com-pendencias'

// a chave de um passo, pra ler o caso: o título sem acento e em caixa baixa —
// 'Rotação' → 'rotacao', o id do sinal da CAN que o passo prova (sinaisCan) e o
// `passo` do motor-desligado-no-ciclo
const chaveDe = (titulo) => titulo.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// os passos canônicos: os seis da Seção E do checklist, que são os da i-01
// (mocks.js, PASSOS_CICLO, decisão 54) — com o id do item, que é como o checklist os lê
const CANONICOS = M.checklist.itens.filter((i) => i.secao === 'E' && i.origem === 'ciclo')
  .map((i) => ({ id: i.id, titulo: i.pergunta, chave: chaveDe(i.pergunta) }))
// o passo da velocidade (D3 do pacote 2): entra depois da rotação, só quando o
// modelo do ativo tem tacógrafo digital (tacografoDigital). Nenhuma referência o
// desenha — o herói não tem —, e ele se monta pelo dado: o nome é o do sinal da
// CAN do modelo (sinaisCan, 'Velocidade'), e o id, fora da Seção E, é o do sinal
// com o prefixo dos passos ('e-velocidade'): o checklist tem 6 itens na E e não
// o lê (o que precisa do arquiteto, se a E ganhar a linha)
const SINAL_DO_TACOGRAFO = 'velocidade'
const DEPOIS_DE = 'rotacao'
export const ID_VELOCIDADE = `e-${SINAL_DO_TACOGRAFO}`

export const ativoDe = (id) => M.ativos.find((a) => a.id === id)
const modeloDe = (ativoId) => M.modelosAtivo.find((m) => m.id === ativoDe(ativoId)?.modeloAtivoId)

// os passos do par: os seis, e a velocidade depois da rotação com tacógrafo digital
export function passosDo(par) {
  const modelo = modeloDe(par.ativoId)
  if (!modelo?.tacografoDigital) return CANONICOS
  const sinal = modelo.sinaisCan?.find((s) => s.id === SINAL_DO_TACOGRAFO)
  if (!sinal) return CANONICOS
  const em = CANONICOS.findIndex((p) => p.chave === DEPOIS_DE) + 1
  const velocidade = { id: ID_VELOCIDADE, titulo: sinal.rotulo, chave: SINAL_DO_TACOGRAFO }
  return [...CANONICOS.slice(0, em), velocidade, ...CANONICOS.slice(em)]
}
// os passos do herói (o print, a vitrine): os seis
export const PASSOS = CANONICOS
export const PRAZO = M.ciclo.prazoEventoSeg
export const EVENTO = M.ciclo.evento

// o tique do prazo: 1 s real vale RITMOS.prazoFator s de prazo, então um segundo
// de prazo passa a cada 250 ms. O processo inteiro anda nesse tique.
export const TIQUE_MS = 1000 / RITMOS.prazoFator
// o passo k (1 a 6) acende a k × cicloPassoMs do disparo (T14·1): os quatro que
// a semente não traz, a +9, +12, +15 e +18 s — no tique do prazo, 36, 48, 60 e 72
// (com a velocidade, sete passos: o último a +21 s)
export const tiqueDoPasso = (i) => ((i + 1) * RITMOS.cicloPassoMs) / TIQUE_MS
// o quadro da 00: o instante antes de o evento chegar (120 − 24 = 96, o 1:36)
export const QUADRO_00 = EVENTO.recebidoAosSeg
// o quadro da 05: o último passo aceso, com o evento já conferido
export const quadro05 = (passos) => Math.max(tiqueDoPasso(passos.length - 1), EVENTO.conferidoAosSeg + 1)

// a hora em que o servidor recebeu: o disparo é às 14:30 em ponto (a hora do protótipo)
export const horaDoRecebido = () => `${M.HORA_NOMINAL}:${String(EVENTO.recebidoAosSeg).padStart(2, '0')}`

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

// os casos que valem neste par (o da faixa, G28). O motor desligado e o cartão
// que não bate são fato do veículo e do cadastro: valem toda vez. O evento sem
// resposta vale uma vez por sessão (G21): a 1ª tentativa estoura, a 2ª confirma.
export function casosDoPar(par, consumidos = []) {
  const bate = (k) => {
    const c = M.casos[k]
    return c.ativoId === par.ativoId && (c.moduloSerial == null || c.moduloSerial === par.moduloSerial)
  }
  return {
    semResposta: bate(CASO_SEM_RESPOSTA) && !consumidos.includes(CASO_SEM_RESPOSTA),
    motor: bate(CASO_MOTOR) ? M.casos[CASO_MOTOR] : null,
    cartao: bate(CASO_IDENTIFICADOR) ? cartaoDoCaso() : null,
  }
}

// a fila guardada no módulo, que drena antes do disparo: a de todo módulo, ou a
// do modulo-com-pendencias quando o serial da sessão é o dele (mocks.js, C20)
export function filaDoModulo(serial) {
  const p = M.casos[CASO_PENDENCIAS]
  return p.moduloSerial === serial ? { mensagens: p.mensagens, diagnostico: p.diagnostico } : M.ciclo.mensagensGuardadas
}

// o passo do cartão é o Cartão do motorista (T14/04): com o caso de identificador, ele reprova
const ehCartao = (p) => p.titulo === T.cartao
// o veredito de um passo quando ele acontece: reprovado no passo que o motor
// desligado prova (a rotação, `passo` do caso) e no cartão que não bate; aprovado nos outros
export function veredito(p, casos) {
  if (casos.motor && p.chave === casos.motor.passo) return 'reprovada'
  if (casos.cartao && ehCartao(p)) return 'reprovada'
  return 'aprovada'
}
// a causa embaixo do passo reprovado: '0 rpm · ligue o motor' (03) ou o lido e o esperado do cartão (04)
export function causaDo(p, casos) {
  if (casos.motor && p.chave === casos.motor.passo) return T.causaDoPasso(casos.motor)
  if (casos.cartao && ehCartao(p)) return T.leu(casos.cartao)
  return undefined
}

// os passos num tique do prazo: os que a semente traz feitos (T14·1), os que já
// aconteceram, e o resto por fazer. O cartão do caso de identificador reprova na vez
// dele, depois da ré e da porta (o pacote 6: a 04 e a 06 na ordem certa)
export const passosAte = (passos, casos, tique) => passos.map((p, i) =>
  (i < RITMOS.cicloPassosNaEntrada || tique >= tiqueDoPasso(i) ? veredito(p, casos) : 'pendente'))
export const passosNaEntrada = (passos, casos) => passosAte(passos, casos, 0)
// o tique em que um passo acontece, pela chave (a 04, a 06, a 07 e a 08 param ali)
export const tiqueDe = (passos, chave) => tiqueDoPasso(passos.findIndex((p) => p.chave === chave))
// a T14/01 desenha a fila com 45% por sair (o quadro do meio da drenagem, o pacote 6)
export const FILA_NO_QUADRO_01 = 0.45
export const CHAVE = { re: 're acionada', porta: 'porta aberta', cartao: 'cartao do motorista' }
// O passo da vez (o pacote 6, a T14 na gramática do poço): o primeiro por fazer, depois do
// disparo, com o quadrado de agora e a ação do técnico; antes do disparo e na falha do motor
// (o ciclo não anda sem ele), nenhum
export function passoDaVez(passos, casos, disparado) {
  if (!disparado || (casos.motor && passos.includes('reprovada'))) return -1
  return passos.indexOf('pendente')
}
// todos os passos feitos (o 02 e o 05)
export const passosFeitos = (passos, casos) => passos.map((p) => veredito(p, casos))
// os passos gravados em etapas.ciclo (pelo id), na ordem do par
export const passosDoRegistro = (reg, passos) => passos.map((p) => reg.passos?.[p.id] ?? 'pendente')
