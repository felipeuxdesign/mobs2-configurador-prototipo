// T07 · as regras do diagnóstico do módulo, lidas do mock na hora de montar (G7).
// Nenhum número mora aqui: as sete linhas e a CAN saem de M.diagnostico; o
// serial, o modelo, a variante, o firmware e as versões homologadas, do cadastro
// (M.modulos, M.modelos, M.matrizCapacidades); a placa, do ativo que o cadastro
// prevê pro módulo (decisão 46); o que cada caso muda, de M.casos.
//
// · As sete linhas (M.diagnostico.modulo): o serial e o firmware vêm do cadastro
//   do módulo conectado; a alimentação, o GPS, as entradas, o modem e o SIM, do
//   `heroi` do mock — o único conjunto que ele tem, e o que as referências 02 a 05
//   repetem em outros módulos.
// · Só três coisas travam (tela.md, decisão 44), e são fatos do cadastro, que
//   valem toda vez que o módulo conecta: o serial fora do cadastro (02), o modelo
//   sem driver nesta versão (03) e o firmware fora da matriz (04). Com o serial
//   travado, o firmware e as entradas ficam sem cadastro, com o relógio apagado
//   (as referências 02 e 03).
// · O que o caso muda na linha dele, por cima do cadastro: o modem sem rede, que
//   prende a atualização do firmware (firmware-sem-rede-no-modulo, 05), e o modem
//   sem sinal, que só informa (modem-sem-sinal, 07, pela linha que o mock marca
//   com `informa`). Os da CAN mudam o sinal do caso: sem leitura (08) ou fora do
//   esperado (09).
// · No fluxo (D1, o gate do pacote 1): as travas acontecem pelo serial que
//   conectou; o modem sem sinal e os sinais da CAN caem no par do herói e abrem só
//   pela coluna. O módulo sem rede vale uma vez, até a conexão gravar (G21).
// · A atualização do firmware (D4): consumido o firmware-fora-matriz, o módulo
//   do caso passa a ter o firmware disponível (firmwareDisponivel).
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { RECEITAS } from '../../estado/receitas.js'
import { T } from './textos.js'

const D = M.diagnostico

// os momentos (estados.md): a CAN lida, o firmware atualizando, a CAN relendo
export const REF = {
  canLida: '01-momento-can-lida',
  atualizando: '06-momento-atualizando-o-firmware',
  relendo: '10-momento-relendo-a-can',
  lendo: '11-momento-lendo', // a leitura do módulo correndo (o pacote 5, lei 24)
}

// ── o módulo: as sete linhas ──
export const LINHAS = D.modulo
export const TOTAL = LINHAS.length
// o quadro que a 06 desenha: o serial lido, o firmware atualizando, as cinco seguintes esperando
export const LINHA_FIRMWARE = LINHAS.findIndex((l) => l.id === 'firmware')

// ── o cadastro ──
export const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial) ?? null
const modeloDe = (mod) => M.modelos.find((m) => m.id === mod.modeloId)
const matrizDe = (mod) => M.matrizCapacidades.find((r) => r.modeloId === mod.modeloId && r.variante === mod.variante) ?? null
export const ativoDe = (id) => M.ativos.find((a) => a.id === id) ?? null
// o ativo que o cadastro prevê pro módulo (decisão 46, errata: o moduloSerial do ativo é o módulo previsto)
export const ativoPrevisto = (serial) => M.ativos.find((a) => a.moduloSerial === serial) ?? null
// o meio em que a busca achou o módulo (M.situacao.porPerto); fora da busca, nenhum
export const meioDe = (serial) => M.situacao.porPerto.find((p) => p.serial === serial)?.meio ?? null

// ── os casos ──
export const CASO_FIRMWARE = 'firmware-fora-matriz'
export const CASO_SEM_REDE = 'firmware-sem-rede-no-modulo'
// o módulo de um caso: o serial dele, o do caso de base, ou o do ativo dele
export function serialDoCaso(id) {
  const c = M.casos[id]
  if (!c) return null
  if (c.base) return serialDoCaso(c.base)
  return c.moduloSerial ?? c.serial ?? ativoDe(c.ativoId)?.moduloSerial ?? null
}
// o caso de cada estado da coluna, pela receita (receitas.js)
export const casosDoEstado = (est) => RECEITAS[`T07/${est}`]?.casos ?? null
// os casos do módulo que valem agora no fluxo: só o módulo sem rede, até a
// conexão gravar — e nunca depois de o firmware atualizar (G21)
export const casosDoModulo = (serial, consumidos = []) =>
  [CASO_SEM_REDE].filter((k) => serialDoCaso(k) === serial && !consumidos.includes(k) && !consumidos.includes(M.casos[k].base))

// o que o cadastro diz do módulo conectado: o modelo, a matriz da variante, o
// ativo previsto e o firmware de agora (o disponível, depois da atualização)
export function contextoDe(serial, consumidos = []) {
  const modulo = moduloDe(serial)
  const previsto = ativoPrevisto(serial)
  if (!modulo) return { serial, modulo: null, previsto }
  const atualizado = consumidos.includes(CASO_FIRMWARE) && serialDoCaso(CASO_FIRMWARE) === serial
  return {
    serial, modulo, modelo: modeloDe(modulo), matriz: matrizDe(modulo), previsto,
    firmware: atualizado ? M.casos[CASO_FIRMWARE].firmwareDisponivel : modulo.firmware,
  }
}

// o rótulo de cima do título, sem a faixa: o serial e a placa do ativo previsto
// (03 a 06); fora do cadastro, só o serial (02 · o pacote 3: o topo só identifica
// o módulo, e a trava fica com o aviso); o módulo do cadastro sem ativo previsto,
// que nenhuma referência desenha, diz 'sem ativo', como a faixa
export const rotuloDeTopo = (c) => (!c.modulo ? c.serial : `${c.serial} · ${c.previsto ? c.previsto.placa : T.semAtivo}`)

// o que o cadastro decide antes de ler: fora do cadastro e sem driver travam o
// que depende do cadastro; o firmware fora da matriz trava o firmware
export function faltas(c) {
  const semDriver = !!c.modulo && !c.modelo.driverV1
  const semCadastro = !c.modulo || semDriver
  const firmwareFora = !semCadastro && !!c.matriz && !c.matriz.firmwares.includes(c.firmware)
  return { semDriver, semCadastro, firmwareFora }
}

const ok = (valor) => ({ estado: 'aprovada', valor })
const reprova = (valor, causa) => ({ estado: 'reprovada', valor, causa })
// o que o serial travado deixa sem cadastro: o relógio apagado, com o valor escrito (02, 03)
const semCadastro = () => ({ estado: 'ainda-nao', valor: T.semCadastro, glifo: 'relogio' })
const informa = (valor, causa) => ({ estado: 'informa', valor, causa })
export const nomeDoModelo = (c) => `${c.modelo.nome} ${c.modulo.variante}`

// o pacote 3 · o aviso que abre a trava sem saída escrita, como as travas da T09: o
// serial fora do cadastro (02) e o modelo sem suporte (03). O firmware (04, 05) não
// o leva: ele já se explica, e o aviso deixaria menos de 20 de folga (MUDANCAS §1)
export function avisoDaTrava(c) {
  const f = faltas(c)
  if (!c.modulo) return { titulo: T.serialForaDoCadastro, frase: T.pecaAoGestor(c.serial) }
  if (f.semDriver) return { titulo: T.modeloSemSuporteTitulo, frase: T.appNaoConfigura(nomeDoModelo(c)) }
  return null
}

// a regra do cadastro em cada linha; as outras dizem o que o módulo leu (o heroi do mock)
const REGRA = {
  serial: (c, f) => (!c.modulo ? reprova(c.serial, T.naoEstaNoCadastro) : f.semDriver ? reprova(nomeDoModelo(c), T.modeloSemSuporte) : ok(nomeDoModelo(c))),
  firmware: (c, f) => (f.semCadastro ? semCadastro() : f.firmwareFora ? reprova(c.firmware, T.homologadas(c.matriz.firmwares)) : ok(c.firmware)),
  entradas: (c, f, l) => (f.semCadastro ? semCadastro() : ok(l.heroi)),
}
const lido = (c, f, l) => ok(l.heroi)

// o que o caso muda na linha dele: a linha que o mock marca com `informa`, e o
// modem do módulo sem rede (o caso diz modemSemRede)
const linhaQueInforma = (k) => LINHAS.find((l) => l.informa === k)?.id
const NA_LINHA = {
  'modem-sem-sinal': (caso, k) => ({ [linhaQueInforma(k)]: informa(caso.modem, T.daPraSeguir) }),
  [CASO_SEM_REDE]: (caso) => (caso.modemSemRede ? { modem: informa(T.semRede, T.semElaNaoAtualiza) } : {}),
}

// o resultado de cada uma das sete, quando termina
export function resultados(c, casos = []) {
  const f = faltas(c)
  const troca = Object.assign({}, ...casos.filter((k) => NA_LINHA[k]).map((k) => NA_LINHA[k](M.casos[k], k)))
  return LINHAS.map((l) => ({ id: l.id, titulo: l.rotulo, ...(troca[l.id] ?? (REGRA[l.id] ?? lido)(c, f, l)) }))
}

// ── a CAN ──
// a lista do modelo do ativo: o mock declara a do ma-01 (M.diagnostico.can), a
// única que uma referência desenha; outro modelo não tem lista (a lacuna, nomeada)
export const sinaisDoModelo = (modeloAtivoId) => (modeloAtivoId === D.can.modeloAtivoId ? D.can.sinais : null)
export const tituloDaCan = (ativo) => T.aCanDo(caixaAlta(M.modelosAtivo.find((m) => m.id === ativo.modeloAtivoId).nome))
export const CAN_AGUARDA = D.canAguarda
// o quadro que a 10 desenha: a rotação, a velocidade e o hodômetro lidos, a temperatura lendo
// o quadro da 11 (o pacote 5): a leitura do módulo parada na quinta linha, as
// Entradas digitais — quatro prontas, a da vez com o quadrado e *lendo* (4 de 7)
export const QUADRO_11 = D.modulo.findIndex((l) => l.id === 'entradas')
export const QUADRO_10 = D.can.sinais.findIndex((s) => s.id === 'temperatura')

// o que o caso muda no sinal dele
export const NA_CAN = {
  'can-estatico-ausente': (caso) => ({ [caso.sinal]: reprova(T.vazio, T.semLeitura(caso.motivo)) }),
  'can-estatico-isolado': (caso) => ({ [caso.sinal]: reprova(caso.lido, T.foraDoEsperado(caso.esperado)) }),
}
export function leituraDaCan(sinais, casos = []) {
  const troca = Object.assign({}, ...casos.filter((k) => NA_CAN[k]).map((k) => NA_CAN[k](M.casos[k])))
  return sinais.map((s) => ({ id: s.id, titulo: s.rotulo, ...(troca[s.id] ?? ok(s.lido)) }))
}

// D2 · a CAN lida: com o bloco do ativo gravado (a cadeia passou dele), ou na
// manutenção, em que o bloco do ativo já está no módulo depois do vínculo (o
// modo, onde a T06 o grava: etapas.ativo.modo ou sessao.modo), ou já lida aqui
// pro mesmo ativo
const BLOCO_DO_ATIVO = M.cadeia.ordem.indexOf('ativo') + 1
export function canLidaNoFluxo(unico) {
  const s = unico.sessao
  if (!s?.ativoId) return false
  const e = unico.etapas
  const gravou = (e.cadeia?.confirmados ?? 0) >= BLOCO_DO_ATIVO
  const manutencao = (e.ativo?.modo ?? s.modo) === 'manutencao' && e.ativo?.ativoId === s.ativoId
  const lida = !!e.can?.lida && e.can.ativoId === s.ativoId
  return gravou || manutencao || lida
}

// a sessão do módulo que o diagnóstico aprovou, quando ela não é a do estado
// único (o 06 aberto pela URL, que é o M2C-0451): a de antes, com o módulo dele
export const sessaoDo = (serial, antes) => ({
  ...(antes ?? { saude: 'ok', abertaAs: M.HORA_NOMINAL }), moduloSerial: serial, ativoId: null, meio: meioDe(serial) ?? antes?.meio ?? null,
})
