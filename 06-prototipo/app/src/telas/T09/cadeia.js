// T09 · a cadeia lida do mock (M.cadeia): a ordem canônica dos seis passos, o
// rótulo de cada um, o conteúdo de cada bloco no par da faixa, a conta do envio
// (o espaço e as cercas, decisão 47) e os casos da tela — os dois que param a
// cadeia (bloco-recusado, queda-na-cadeia), as duas travas do envio
// (conteudo-nao-cabe, pool-esgotado) e a manutenção (modulo-ja-deste-ativo).
// Nada de número digitado: as contagens dos textos saem da ordem e do cadastro.
import { M } from '../../dados/mock.js'
import { ESTADOS } from '../../ds/index.js'
import { T } from './textos.js'

export const REF = {
  recusado: '01-estado-bloco-recusado',
  queda: '02-estado-queda-na-cadeia',
  recuperacao: '03-estado-recuperacao-ate-a-conexao-gravar',
  concluida: '04-momento-cadeia-concluida',
  antes: '05-momento-o-que-vai-ser-gravado',
  naoCabe: '06-estado-a-configuracao-nao-cabe',
  cercasDemais: '07-estado-cercas-demais-pro-modulo',
  escolher: '08-momento-manutencao-escolher-o-bloco',
  reenviando: '09-momento-manutencao-reenviando',
}
export const CASO_RECUSA = 'bloco-recusado'
export const CASO_QUEDA = 'queda-na-cadeia'
export const CASO_NAO_CABE = 'conteudo-nao-cabe'
export const CASO_POOL = 'pool-esgotado'

const { ordem: ORDEM, rotulos } = M.cadeia
export { ORDEM }
export const TOTAL = ORDEM.length
export const LIMPEZA = ORDEM[0]
// a Conexão é o bloco que segura a saída (HU-T09-10, G23)
export const CONEXAO = 'conexao'
export const rotuloDe = (bloco) => rotulos[bloco]
const ativoDe = (id) => M.ativos.find((a) => a.id === id)
export const placaDe = (ativoId) => ativoDe(ativoId)?.placa

// o quadro que a 00 desenha: Limpeza, Ativo e Cercas relidos, o Leitor gravando
export const QUADRO_00 = ORDEM.indexOf('leitor')

// o par módulo × ativo de um caso; o caso sem o módulo (pool-esgotado) usa o do
// cadastro do ativo (a-05 → M2C-0348)
export function parDoCaso(casoId) {
  const c = M.casos[casoId]
  return { ativoId: c.ativoId, moduloSerial: c.moduloSerial ?? ativoDe(c.ativoId)?.moduloSerial }
}

// onde o caso para a cadeia, e como: o módulo recusa o bloco, ou o link cai nele
export function paradaDoCaso(casoId) {
  if (casoId === CASO_RECUSA) return { bloco: M.casos[CASO_RECUSA].bloco, parou: 'recusa' }
  if (casoId === CASO_QUEDA) return { bloco: M.casos[CASO_QUEDA].noBloco, parou: 'queda' }
  return null
}

// o caso que vale pra cadeia deste par, se ainda não foi consumido nesta sessão
// (G21): o do par módulo × ativo da faixa (G28), como o pacote da T03
export function casoDoPar(par, consumidos) {
  return [CASO_RECUSA, CASO_QUEDA].find((k) => {
    const c = M.casos[k]
    return c.ativoId === par.ativoId && c.moduloSerial === par.moduloSerial && !consumidos.includes(k)
  }) ?? null
}

// ── o cadastro do par: o modelo do ativo, e a linha da matriz do módulo ──
const modeloDoAtivo = (ativoId) => M.modelosAtivo.find((m) => m.id === ativoDe(ativoId)?.modeloAtivoId)
function linhaDoModulo(serial) {
  const mod = M.modulos.find((m) => m.serial === serial)
  return mod ? M.matrizCapacidades.find((l) => l.modeloId === mod.modeloId && l.variante === mod.variante) : null
}

// as regiões que vão pro módulo (decisão 50: o app conta regiões): as do ativo em
// CERCAS.regioes — 4 no herói, nenhuma nos outros. No ativo do pool-esgotado, as
// que o caso diz que ele tem e a que ele pede, que fica de fora quando passa do
// limite (o caso fala a língua da pré-checagem de antes: regioesUsadas 4 e a
// regiaoSolicitada, o Terminal Cosme e Damião — 5 regiões, T09/07)
export function regioesDo(ativoId) {
  const pool = M.casos[CASO_POOL]
  if (pool?.ativoId === ativoId) return { total: pool.regioesUsadas + [pool.regiaoSolicitada].length, fora: pool.regiaoSolicitada }
  return { total: M.cercas.regioes.filter((r) => r.ativoId === ativoId).length, fora: null }
}

// O conteúdo de cada bloco no par (decisão 49, a errata do pacote 1: o do caso,
// nunca o do herói) — o mesmo vocabulário da conferência: o modelo do ativo, as
// regiões dele, o leitor pela variante do módulo (o ECO não tem sem fio: o leitor
// vai no fio branco, T09/06), o intervalo do preset de eventos do modelo e a APN
// da conexão da empresa (decisão 51). No herói, é o CADEIA.conteudo do mock.
export function conteudoDo(par) {
  const modelo = modeloDoAtivo(par.ativoId)
  const linha = linhaDoModulo(par.moduloSerial)
  const preset = M.presetsEvento.find((p) => p.id === modelo?.presetEventoId)
  return {
    ativo: modelo?.modelo,
    cercas: T.regioes(regioesDo(par.ativoId).total),
    leitor: linha?.semFio === false ? T.noFioBranco : T.semFio,
    eventos: preset ? T.intervalo(preset.intervaloRastreamentoSeg) : undefined,
    conexao: M.conexoes[0]?.apn,
  }
}

// O envio (decisão 47, HU-T09-2 e 4): o espaço calculado sobre o que vai ser
// gravado — os registros que o modelo do ativo pede contra os que a variante do
// módulo guarda — e as cercas contra o limite de regiões dela. É a regra; os
// casos só nomeiam onde ela aparece: o ma-01 pede 128 e o ECO guarda 96
// (conteudo-nao-cabe, T09/06); o a-05 tem 5 regiões, e o FULL guarda 4
// (pool-esgotado, T09/07). Sem linha na matriz (o módulo que trava no
// diagnóstico, e nunca chega aqui), nada trava.
export function envioDo(par) {
  const modelo = modeloDoAtivo(par.ativoId)
  const linha = linhaDoModulo(par.moduloSerial)
  const reg = regioesDo(par.ativoId)
  const registros = modelo?.conteudoRegistros
  const capacidade = linha?.capacidadeRegistros
  return {
    registros, capacidade, cabe: capacidade == null || registros <= capacidade,
    regioes: reg.total, regioesMax: linha?.regioesMax, fora: reg.fora,
    cercasCabem: linha == null || reg.total <= linha.regioesMax,
  }
}
// a trava do envio: o espaço primeiro (06), as cercas depois (07)
export const travaDo = (envio) => (!envio.cabe ? 'nao-cabe' : !envio.cercasCabem ? 'cercas-demais' : null)

// A manutenção (HU-T09-5, decisão 46): o modo vem do vínculo (etapas.ativo.modo,
// que a T06 grava), e o caso modulo-ja-deste-ativo o abre pela coluna da T06 (D1).
// Os blocos que se escolhem: os cinco depois da limpeza. Só as cercas têm texto
// aprovado pro reenvio (T.reenviar), e o 08 abre com elas escolhidas; os outros
// quatro ficam no lugar, inertes, até haver texto (G25)
export const emManutencao = (unico) => unico.etapas.ativo?.modo === 'manutencao'
export const BLOCOS_DA_MANUTENCAO = ORDEM.filter((b) => b !== LIMPEZA)
export const REENVIAVEIS = BLOCOS_DA_MANUTENCAO.filter((b) => T.reenviar[b])
export const BLOCO_DA_MANUTENCAO = REENVIAVEIS[0]
// a frase do que fica como está: os outros blocos, na ordem canônica
export const ficam = (bloco) => T.ficamComoEstao(BLOCOS_DA_MANUTENCAO.filter((b) => b !== bloco).map((b) => rotulos[b]))

// o valor do bloco confirmado: o conteúdo relido, ou "feita" na limpeza
const valorFeito = (b, conteudo) => (b === LIMPEZA ? T.feita : conteudo[b])
// o nome pro leitor de tela segue o estado do dado (G15): o traço e o relógio dos
// que ainda vão gravar dizem "ainda não", não "não se aplica"; e o bloco em que a
// cadeia pausou diz "parou", seja o sem-sinal da queda (02, 03), seja a pausa de
// quem tentou sair (o valor é "pausado" nos dois), como o passo parado da T03
const AINDA_NAO = ESTADOS.espera.nome
const PAROU = ESTADOS.pausa.nome

// os seis elos do quadro, na ordem canônica. `fluxo`: { confirmados, fase, parou }
//   antes       · o que vai ser gravado: o relógio em cada elo, a limpeza em primeiro e o
//                 conteúdo nos outros (05); com as cercas demais, o elo delas falha (07)
//   gravando    · os confirmados, o que corre (o quadrado de agora) e os que esperam, com o conteúdo apagado (00)
//   recusado    · os confirmados, o recusado com a causa e os não alcançados (01)
//   pausado     · os confirmados, o que parou e os pendentes em traço (02)
//   recuperacao · o mesmo quadro parado, com a saída presa até a Conexão (03)
//   concluida   · os seis relidos (04)
export function elosDo({ confirmados: k, fase, parou }, conteudo, envio) {
  return ORDEM.map((b, i) => {
    const base = { nome: rotulos[b], descricao: T.descricao[b] }
    if (fase === 'antes') {
      if (b === 'cercas' && envio && !envio.cercasCabem) {
        return { ...base, estado: 'xis', valor: T.cercasNaoCabem, descricao: T.cercasDemais(envio.regioes, envio.regioesMax, envio.fora) }
      }
      return { ...base, estado: 'relogio', valor: b === LIMPEZA ? T.primeiro : conteudo[b], nomeGlifo: AINDA_NAO }
    }
    if (i < k) return { ...base, estado: 'ok', valor: valorFeito(b, conteudo) }
    if (fase === 'gravando') return i === k ? { ...base, estado: 'agora', valor: T.gravando } : { ...base, estado: 'espera', valor: conteudo[b] }
    if (i === k) {
      if (parou === 'recusa') return { ...base, estado: 'xis', valor: T.recusado, descricao: T.causa[b] ?? null }
      // o link caiu (02, 03) · ou o técnico tentou sair no meio (a recuperação no fluxo, G25)
      return { ...base, estado: parou === 'queda' ? 'sem-sinal-neutro' : 'pausa', valor: T.pausado, nomeGlifo: PAROU }
    }
    if (fase === 'recusado') return { nome: rotulos[b], estado: 'traco', descricao: T.naoAlcancado, nomeGlifo: AINDA_NAO }
    return { ...base, estado: 'traco', valor: T.pendente, nomeGlifo: AINDA_NAO }
  })
}

// A cadeia curta da manutenção (09): a limpeza só do bloco escolhido, e o bloco.
// `confirmados` de 0 a 2: a 09 é o quadro de 1 — a limpeza feita, as cercas gravando
export const CURTA = 2
export function elosDaCurta(k, bloco, conteudo) {
  return [LIMPEZA, bloco].map((b, i) => {
    const base = { nome: rotulos[b], descricao: b === LIMPEZA ? T.limpezaSo[bloco] : T.descricao[b] }
    if (i < k) return { ...base, estado: 'ok', valor: valorFeito(b, conteudo) }
    if (i === k) return { ...base, estado: 'agora', valor: T.gravando }
    return { ...base, estado: 'espera', valor: conteudo[b] }
  })
}
