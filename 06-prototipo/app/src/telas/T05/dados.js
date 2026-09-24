// A busca e a pré-checagem da T05, lidas do mock na hora de montar (G7).
// Nenhum número mora aqui: os módulos por perto, o meio, o modelo, a
// variante, o firmware, a matriz, o conteúdo e as cercas saem de M.
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'

// ── a busca (AC-06) ──
// os módulos por perto, na ordem da referência, o herói primeiro (gate P·C6)
export const porPerto = () => M.situacao.porPerto
export const HEROI = M.situacao.porPerto[0].serial
// o 02 · só um por perto: a busca em que só o herói responde (o primeiro da lista)
export const soOHeroi = () => M.situacao.porPerto.slice(0, 1)
export const meioDe = (serial) => M.situacao.porPerto.find((p) => p.serial === serial)?.meio ?? null

export const moduloDe = (serial) => M.modulos.find((m) => m.serial === serial) ?? null
export const cadastrado = (serial) => moduloDe(serial) != null
const modeloDe = (mod) => M.modelos.find((m) => m.id === mod.modeloId)
const matrizDe = (mod) => M.matrizCapacidades.find((r) => r.modeloId === mod.modeloId && r.variante === mod.variante) ?? null
const ativoDoModulo = (serial) => M.ativos.find((a) => a.moduloSerial === serial) ?? null

// 'VL06 · CAN-BT' (a linha da busca) · 'VL06 · CAN-BT · firmware 2.3.5' (o escolhido)
export const varianteNaLista = (serial) => { const m = moduloDe(serial); return `${modeloDe(m).nome} · ${m.variante}` }
export const detalheDoEscolhido = (serial) => `${varianteNaLista(serial)} · ${TX.firmwareNoDetalhe(moduloDe(serial).firmware)}`
export const firmwareDe = (serial) => moduloDe(serial).firmware

// ── a pré-checagem ──
// o que o cadastro diz do módulo conectado: o modelo, a matriz da variante, o
// ativo vinculado, o conteúdo que o modelo do ativo pede e as regiões de cerca dele
export function contextoDe(serial) {
  const modulo = moduloDe(serial)
  if (!modulo) return { serial, modulo: null }
  const ativo = ativoDoModulo(serial)
  const modeloAtivo = ativo && M.modelosAtivo.find((m) => m.id === ativo.modeloAtivoId)
  return {
    serial, modulo, modelo: modeloDe(modulo), matriz: matrizDe(modulo), ativo,
    conteudo: modeloAtivo?.conteudoRegistros ?? null,
    regioes: ativo ? M.cercas.regioes.filter((r) => r.ativoId === ativo.id).length : 0,
  }
}

// o cabeçalho sem faixa: serial · placa do ativo vinculado (ou 'fora do cadastro')
export const rotuloDeTopo = (c) => `${c.serial} · ${c.ativo ? c.ativo.placa : TX.foraDoCadastro}`
export const placaDe = (c) => c.ativo?.placa ?? null

const ok = (valor) => ({ estado: 'aprovada', valor })
const naoSeAplica = (valor) => ({ estado: 'nao-se-aplica', valor })
const reprova = (valor, causa) => ({ estado: 'reprovada', valor, causa })

// As onze checagens, na ordem da especificação (R-07). Cada uma dá o que o
// técnico lê quando ela termina. As regras são as do cadastro (o serial, o
// driver, a matriz, o conteúdo): o caminho feliz do herói aprova todas (05).
// Os casos que o cadastro não decide sozinho — o link que cai, o repouso, o
// canal aberto, as pendências, o pool de cercas, o modem sem rede — entram
// no C7, com os estados.
export const LINHAS = [
  { id: 'serial', avalia: (c, f) => (!c.modulo ? reprova(c.serial) : f.semDriver ? reprova(nomeDoModelo(c), TX.naoAtendido) : ok(nomeDoModelo(c))) },
  { id: 'firmware', avalia: (c, f) => (f.semCadastro ? naoSeAplica(TX.semCadastro) : f.firmwareFora ? reprova(c.modulo.firmware, TX.homologadas(c.matriz.firmwares)) : ok(c.modulo.firmware)) },
  { id: 'alimentacao', avalia: () => ok(TX.naFaixa) },
  { id: 'gps', avalia: () => ok(TX.antenaOk) },
  { id: 'entradas', avalia: (c, f) => (f.semCadastro ? naoSeAplica(TX.semCadastro) : ok(TX.conforme)) },
  { id: 'modem', avalia: () => ok(TX.naRede) },
  { id: 'can', avalia: (c) => (c.matriz && !c.matriz.can ? naoSeAplica(TX.semCan) : ok(TX.semErros)) },
  { id: 'espaco', avalia: (c, f) => (f.semCadastro ? naoSeAplica(TX.semCadastro) : f.firmwareFora ? naoSeAplica(TX.naoAvaliada)
    : c.conteudo > c.matriz.capacidadeRegistros ? reprova(TX.naoCabe, TX.registrosCabem(c.conteudo, c.matriz.capacidadeRegistros))
      : ok(TX.deTotal(c.conteudo, c.matriz.capacidadeRegistros))) },
  { id: 'cercas', avalia: (c, f) => (f.semCadastro ? naoSeAplica(TX.semCadastro) : f.firmwareFora ? naoSeAplica(TX.naoAvaliada)
    : ok(TX.deTotal(c.regioes, c.matriz.regioesMax))) },
  { id: 'destino', avalia: (c, f) => (f.semCadastro ? naoSeAplica(TX.semCadastro) : ok(TX.registrado)) },
  { id: 'canal', avalia: () => ok(TX.livre) },
].map((l) => ({ ...l, titulo: TX.linhas[l.id] }))

export const TOTAL = LINHAS.length
export const LINHA_FIRMWARE = LINHAS.findIndex((l) => l.id === 'firmware')

function nomeDoModelo(c) { return `${c.modelo.nome} ${c.modulo.variante}` }

// o que o cadastro decide antes de medir: fora do cadastro, sem driver (os
// dois travam o que depende do cadastro) e o firmware fora da matriz (trava o
// que depende do firmware)
export function faltas(c) {
  const semDriver = !!c.modulo && !c.modelo.driverV1
  const semCadastro = !c.modulo || semDriver
  const firmwareFora = !semCadastro && !!c.matriz && !c.matriz.firmwares.includes(c.modulo.firmware)
  return { semDriver, semCadastro, firmwareFora }
}

// o resultado de cada uma das onze, quando termina
export function resultados(c) {
  const f = faltas(c)
  return LINHAS.map((l) => ({ ...l.avalia(c, f), titulo: l.titulo, id: l.id }))
}

// a sessão que nasce na pré-checagem aprovada (logica.md, C6·2): o módulo, sem
// ativo ainda, aberta na hora nominal, com o meio em que a busca o achou
export const sessaoNova = (serial) => ({ moduloSerial: serial, ativoId: null, saude: 'ok', abertaAs: M.HORA_NOMINAL, meio: meioDe(serial) })

// a atualização do firmware (AC-19): o módulo do caso e o quadro que a 10 desenha
export const CASO_FIRMWARE = 'firmware-fora-matriz'
export const casoFirmware = () => M.casos[CASO_FIRMWARE]
