// A busca e a pré-checagem da T05, lidas do mock na hora de montar (G7).
// Nenhum número mora aqui: os módulos por perto, o meio, o modelo, a
// variante, o firmware, a matriz, o conteúdo e as cercas saem de M.
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'
import { milhar } from '../../dados/formato.js'

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

// o resultado de cada uma das onze, quando termina: a regra do cadastro e, por
// cima, o que o caso do mock muda na linha dele (C7 · NA_LINHA)
export function resultados(c, casos = []) {
  const f = faltas(c)
  const troca = Object.assign({}, ...casos.filter((k) => NA_LINHA[k]).map((k) => NA_LINHA[k](M.casos[k])))
  return LINHAS.map((l) => ({ ...(troca[l.id] ?? l.avalia(c, f)), titulo: l.titulo, id: l.id }))
}

// a sessão que nasce na pré-checagem aprovada (logica.md, C6·2): o módulo, sem
// ativo ainda, aberta na hora nominal, com o meio em que a busca o achou
export const sessaoNova = (serial) => ({ moduloSerial: serial, ativoId: null, saude: 'ok', abertaAs: M.HORA_NOMINAL, meio: meioDe(serial) })

// a atualização do firmware (AC-19): o módulo do caso e o quadro que a 10 desenha
export const CASO_FIRMWARE = 'firmware-fora-matriz'
export const casoFirmware = () => M.casos[CASO_FIRMWARE]

// ── C7 · os estados: o que cada caso do mock faz na conexão ──
// Os casos que a T05 lê (receitas.js). Cada um aponta um módulo: o serial do
// caso, ou o módulo do ativo dele (o pool esgotado só traz o ativo).
export const CASOS_T05 = [
  'serial-nao-cadastrado', 'modelo-sem-driver', 'firmware-fora-matriz', 'firmware-fora-sem-rede',
  'conteudo-nao-cabe', 'pool-esgotado', 'canal-aberto', 'modulo-com-pendencias',
  'link-perdido', 'modulo-em-repouso', 'conexao-falha',
]
export const CASO_BUSCA_VAZIA = 'busca-vazia'
export const CASO_CONEXAO = 'conexao-falha'
export const CASO_SEM_REDE = 'firmware-fora-sem-rede'
export const CASO_CANAL = 'canal-aberto'
// Os que acontecem uma vez (G21, casosConsumidos): a falha ao conectar, o link
// que cai, o módulo que dorme, o canal antigo que o app fecha e o módulo sem
// rede até a conexão gravar. O resto é fato do cadastro — o serial, o driver,
// a matriz, o conteúdo, as cercas e as pendências — e vale toda vez.
const UMA_VEZ = new Set([CASO_BUSCA_VAZIA, CASO_CONEXAO, 'link-perdido', 'modulo-em-repouso', CASO_CANAL, CASO_SEM_REDE])

export function serialDoCaso(id) {
  const c = M.casos[id]
  return c.moduloSerial ?? c.serial ?? (c.ativoId ? M.ativos.find((a) => a.id === c.ativoId)?.moduloSerial : null) ?? null
}
// os casos da T05 que valem agora pra um módulo, na sessão do estado único
export const casosDoModulo = (serial, consumidos = []) =>
  CASOS_T05.filter((k) => serialDoCaso(k) === serial && !(UMA_VEZ.has(k) && consumidos.includes(k)))

// '2026-03-03' → '03/03' (o dia e o mês, sem Intl)
const diaMes = (iso) => { const [, mes, dia] = iso.split('-'); return `${dia}/${mes}` }

// o que o caso muda na linha dele, por cima da regra do cadastro
const NA_LINHA = {
  // 09 · o modem do módulo sem rede (AC-20): a linha diz o que o caso lê
  [CASO_SEM_REDE]: (caso) => ({ modem: ok(caso.modem) }),
  // 12 · o pool esgotado: as regiões usadas contra o máximo, e a que não cabe
  'pool-esgotado': (caso) => ({ cercas: reprova(TX.deTotal(caso.regioesUsadas, caso.regioesMax), TX.regiaoNaoCabe(caso.regiaoSolicitada)) }),
  // 13 · o canal da sessão anterior, que o app fecha antes de começar: passa, com a nota do quando
  [CASO_CANAL]: (caso) => ({ canal: { ...ok(TX.fechado), nota: TX.abertoDesde(diaMes(caso.sessaoAnterior.data), caso.sessaoAnterior.hora) } }),
}

// onde a pré-checagem para (C7·2): o link que cai (14) e o módulo que dorme
// (15), na checagem do caso. A linha que parou diz o que houve; as seguintes esperam.
const PARA = {
  'link-perdido': () => ({ tipo: 'link', linha: { estado: 'parou', valor: TX.semResposta } }),
  'modulo-em-repouso': () => ({ tipo: 'repouso', linha: { estado: 'parou', tom: 'neutro', valor: TX.emRepouso } }),
}
export function paradaDe(casos) {
  const k = casos.find((id) => PARA[id])
  if (!k) return null
  const n = M.casos[k].naChecagem
  return { caso: k, n, indice: n - 1, ...PARA[k]() }
}

// a tira: as mensagens que o módulo guardou (13, modulo-com-pendencias) e a rede dele
export function leiturasDa(casos) {
  const p = casos.includes('modulo-com-pendencias') ? M.casos['modulo-com-pendencias'] : null
  return [
    p ? { rotulo: TX.mensagensPendentes, valor: milhar(p.mensagens), destaque: true, complemento: TX.deDiagnostico(milhar(p.diagnostico)) }
      : { rotulo: TX.mensagensPendentes, valor: TX.nenhuma },
    { rotulo: TX.redeDoModulo, valor: TX.conectada },
  ]
}

// 03 · a busca vazia: quanto durou (AC-18) e qual tentativa
export const buscaVazia = () => M.casos[CASO_BUSCA_VAZIA]
// 04 · a conexão que falha: o módulo do caso no lugar do escolhido (o do herói), os outros quatro por perto
export const serialDaFalha = () => M.casos[CASO_CONEXAO].moduloSerial
export const pertoComFalha = () => M.situacao.porPerto.map((p, i) => (i === 0 ? { serial: serialDaFalha() } : p))
