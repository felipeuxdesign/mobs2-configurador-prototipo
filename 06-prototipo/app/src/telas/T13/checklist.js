// T13 · o checklist montado do mock e do estado único — funções puras, nenhum
// número digitado. Cada item lê a etapa que o produziu (as telas T05 a T10 e
// a T14 gravam em estado.etapas; a T13 grava o que ela resolve em
// etapas.checklist):
//   A · identificação  ← a sessão, o diagnóstico do módulo (T07, etapas.preChecagem)
//                        e o vínculo do ativo (T06, etapas.ativo)
//   B · montagem       ← as fotos e as ressalvas desta tela; o Painel é foto a
//                        tirar, e só existe quando houve calibração (decisão 52, D4)
//   C · hardware       ← a leitura da CAN (T07, etapas.can; o caso do ativo, se
//                        não foi consumido) e a leitura nominal do módulo (AC-13)
//   D · configuração   ← a cadeia (T09, etapas.cadeia: o conteúdo de cada bloco,
//                        decisão 49), o Extended ID só leitura (decisão 45) e a
//                        calibração (T10, etapas.calibracao; o horímetro pulado
//                        diz 'não calibrado', sem bloquear — D1)
//   E · ciclo de testes← o ciclo (T14, etapas.ciclo); não se responde aqui (HU-T13-8)
//   F · servidor       ← a fila desta sessão (G22): só o que foi criado depois
//                        da abertura, pelos tipos da fila (AC-14)
// O que é um item resolvido (a regra do logica.md): o automático cuja fonte
// passa, o manual com foto ou com ressalva, e o que não se aplica (o horímetro
// pulado, D1, conta como resolvido). O que não bloqueia (F) conta no título, mas não no 'Faltam'.
//
// A entrega do checklist (decisão 34): cada item é uma linha da seção aberta,
// e tem seta só o que se toca (Lei 16) — a foto por fazer (a câmera do app), o
// automático que falta (a tela que resolve, pelo `origem` do mock) e o que
// reprovou (o nível do item, 09). O resto é leitura: o que o app conferiu, o
// feito, os passos da E, a F.
import { M } from '../../dados/mock.js'
import { milhar, decimal, caixaAlta } from '../../dados/formato.js'
import { RECEITAS } from '../../estado/receitas.js'
import { conteudoDo } from '../T09/cadeia.js'
import { T } from './textos.js'
import { T as T14 } from '../T14/textos.js'

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
  // a rodada 1 do retorno do PM: o fim é o checklist registrado, aguardando o autoteste (a homologação é da T16)
  registrado: '11-momento-aguardando-autoteste',
  comRessalva: '12-momento-b-com-ressalva',
  eResolvida: '13-momento-e-resolvida',
  semLocalizacao: '14-estado-aguardando-autoteste-sem-localizacao',
  problemaFotografado: '15-momento-problema-fotografado',
  secaoCReprovada: '16-estado-secao-c-com-item-reprovado',
  // o pacote 12 · as outras três falhas da C (a lista e o detalhe)
  secaoCGps: '21-estado-secao-c-com-gps-reprovado',
  gpsReprovado: '22-estado-gps-reprovado',
  secaoCEntradas: '23-estado-secao-c-com-entradas-reprovadas',
  entradasReprovadas: '24-estado-entradas-reprovadas',
  secaoCModem: '25-estado-secao-c-com-modem-reprovado',
  modemReprovado: '26-estado-modem-reprovado',
  // o pacote 13 · o detalhe relê o módulo ali mesmo: relendo (só de referência) e os quatro relidos
  relendo: '29-momento-relendo-o-modulo',
  alimentacaoRelida: '30-momento-alimentacao-relida',
  gpsRelido: '31-momento-gps-relido',
  entradasRelidas: '32-momento-entradas-relidas',
  modemRelido: '33-momento-modem-relido',
  // o pacote 23 · o reler que não resolve: o valor novo, ainda vermelho, e o xis com o que ainda falta
  alimentacaoNaoResolvida: '34-momento-alimentacao-nao-resolvida',
  gpsNaoResolvido: '35-momento-gps-nao-resolvido',
  entradasNaoResolvidas: '36-momento-entradas-nao-resolvidas',
  modemNaoResolvido: '37-momento-modem-nao-resolvido',
  // a rodada 1 do retorno do PM: a Seção D lida bloco a bloco (38) e o bip do leitor (39 a 42)
  dSendoLida: '38-momento-secao-d-sendo-lida',
  bipTocando: '39-momento-bip-tocando',
  bipEsperando: '40-momento-bip-esperando-resposta',
  bipOuvido: '41-momento-bip-ouvido',
  bipNaoOuvido: '42-momento-bip-nao-ouvido',
}
// o bip de cada quadro: tocando, esperando a resposta, ouvido, não ouvido
export const BIP_DO_MOMENTO = { [REF.bipTocando]: 'tocando', [REF.bipEsperando]: 'esperando', [REF.bipOuvido]: 'ouvi', [REF.bipNaoOuvido]: 'naoOuvi' }
export const MOMENTO_DO_BIP = Object.fromEntries(Object.entries(BIP_DO_MOMENTO).map(([m, b]) => [b, m]))
// quantos itens da D o 38 desenha lidos (Limpeza, Ativo e Cercas), com o Leitor lendo
export const D_NO_QUADRO_38 = 3
// a Seção C aberta com um item reprovado (a lista) e o detalhe dele, que vem logo
// depois na coluna (o pacote 11 e o 12: o `depoisDe` do índice)
export const LISTAS_DA_C = [REF.secaoCReprovada, REF.secaoCGps, REF.secaoCEntradas, REF.secaoCModem]
export const DETALHES_DA_C = [REF.reprovado, REF.gpsReprovado, REF.entradasReprovadas, REF.modemReprovado]
// o pacote 13 e o 23 · o quadro de cada item relido que deu certo (30 a 33) e do que não
// resolveu (34 a 37), e, pra cada quadro da releitura, o item, quantas releituras ele já
// teve (o mock em sequência: a 1ª ainda reprova, a 2ª passa) e o detalhe de onde ela parte —
// o caso que monta o mundo (o 29 é o da Alimentação, a primeira, o que a referência desenha)
export const RELIDO_DO_ITEM = { 'c-alimentacao': REF.alimentacaoRelida, 'c-gps': REF.gpsRelido, 'c-entradas': REF.entradasRelidas, 'c-modem': REF.modemRelido }
export const NAO_RESOLVIDO_DO_ITEM = { 'c-alimentacao': REF.alimentacaoNaoResolvida, 'c-gps': REF.gpsNaoResolvido, 'c-entradas': REF.entradasNaoResolvidas, 'c-modem': REF.modemNaoResolvido }
const doQuadro = (mapa, vezes) => Object.fromEntries(Object.entries(mapa).map(([id, m]) => [m, { item: id, vezes }]))
export const RELEITURA_DO_QUADRO = { [REF.relendo]: { item: 'c-alimentacao', vezes: 0 }, ...doQuadro(NAO_RESOLVIDO_DO_ITEM, 1), ...doQuadro(RELIDO_DO_ITEM, 2) }
export const ITEM_DA_RELEITURA = Object.fromEntries(Object.entries(RELEITURA_DO_QUADRO).map(([m, r]) => [m, r.item]))
const DETALHE_DO_ITEM = { 'c-alimentacao': REF.reprovado, 'c-gps': REF.gpsReprovado, 'c-entradas': REF.entradasReprovadas, 'c-modem': REF.modemReprovado }
export const detalheDaReleitura = (momento) => DETALHE_DO_ITEM[ITEM_DA_RELEITURA[momento]] ?? null
// o veredito do item relido que deu certo, ao lado do check (textos.md · 30 a 33)
// (a rodada 1: o GPS relido diz os satélites, que ficam como informação — *relido às · 9 satélites*)
export const VEREDITO_DO_RELIDO = { 'c-alimentacao': () => T.dentroDaFaixa, 'c-gps': (c) => T.satelites(c.leitura?.satelites ?? 0), 'c-entradas': () => T.conforme, 'c-modem': () => T.sinalBom }
// o pacote 10 · as cinco fotos da Montagem: o 07 é o Módulo, e cada item seguinte
// tem o seu quadro, com os de antes fotografados (17 a 20)
export const MOMENTO_DA_FOTO = {
  'b-antena': '17-momento-foto-da-antena',
  'b-chicote': '18-momento-foto-do-chicote',
  'b-leitor': '19-momento-foto-do-leitor',
  'b-painel-legivel': '20-momento-foto-do-painel',
}
export const FOTO_DO_MOMENTO = Object.fromEntries(Object.entries(MOMENTO_DA_FOTO).map(([id, m]) => [m, id]))
export const SECAO_DO_MOMENTO = {
  [REF.A]: 'A', [REF.B]: 'B', [REF.C]: 'C', [REF.D]: 'D', [REF.E]: 'E', [REF.F]: 'F', [REF.comRessalva]: 'B', [REF.eResolvida]: 'E',
  [REF.dSendoLida]: 'D', [REF.bipTocando]: 'E', [REF.bipEsperando]: 'E', [REF.bipOuvido]: 'E', [REF.bipNaoOuvido]: 'E',
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
// o modelo do módulo da sessão (VL06, VL08): a faixa de tensão do fio de alimentação (a rodada 1)
const modeloDoModulo = (serial) => M.modelos.find((m) => m.id === moduloDe(serial)?.modeloId)
const HORA = M.HORA_NOMINAL

// o nome da seção no cartão ('A · Identificação'), e o rótulo de topo do nível
// do item, em caixa alta: o nome curto vale em toda tela ('B · MONTAGEM', T13/07;
// 'C · HARDWARE', T13/09 · o pacote 10; a tabela com os nomes dos requisitos está
// na ficha da T13)
// (a E se chama Ciclo de testes nas referências e no textos.md; o mock ainda diz
// Teste dinâmico — o texto da referência, até o mock trocar, desvio nomeado)
const rotuloDa = (s) => T.rotuloDaSecao[s.id] ?? s.rotulo
export const nomeDaSecao = (s) => T.secao(s.id, rotuloDa(s))
export const rotuloDoNivel = (s) => caixaAlta(nomeDaSecao(s))

// o momento da seção aberta, pelo que ela mostra: a B com ressalva (12) e a E
// resolvida (13) têm quadro próprio; homologado, nenhuma seção aberta tem
// referência, e a URL sai do momento
export function momentoDaSecao(s, ck, homologada) {
  if (homologada) return null
  if (s === 'E' && ck.bip && MOMENTO_DO_BIP[ck.bip]) return MOMENTO_DO_BIP[ck.bip]
  if (s === 'B' && ck.porSecao.B.some((c) => c.estado === 'ressalva')) return REF.comRessalva
  if (s === 'E' && ck.secoes.find((x) => x.id === 'E').estado === 'aprovada') return REF.eResolvida
  return { A: REF.A, B: REF.B, C: REF.C, D: REF.D, E: REF.E, F: REF.F }[s]
}

// ── G21 · a semente da T13: o herói depois da calibração, antes do ciclo ──
// Pular pro checklist pelo palco monta só a sessão (sementes.js); o que as
// telas T05 a T10 gravariam no caminho vem daqui, pelo cadastro do par. Vale
// quando a sessão não passou pela T05 neste estado único (a pré-checagem não
// foi gravada): é o palco que semeou. No fluxo, cada etapa é a que a tela gravou.
function etapasDoCaminho(ativoId, moduloSerial) {
  const modelo = modeloDe(ativoId)
  // a calibração semeia o que o painel do ativo tem (sem o número, a T10 não semeia):
  // no herói, o hodômetro e o horímetro (T13/04). Sem nenhuma, não houve calibração
  const partidas = (M.calibracao.porModelo[modelo?.id]?.calibraveis ?? []).filter((g) => grandezaDe(g).natureza === 'partida' && M.calibracao.painel[ativoId]?.[g] != null)
  return {
    preChecagem: { daSemente: true },
    ativo: { ativoId, as: HORA },
    can: { lida: true },
    cadeia: { confirmados: M.cadeia.ordem.length },
    calibracao: partidas.length
      ? { ativoId, moduloSerial, concluida: true, semeadas: Object.fromEntries(partidas.map((g) => [g, { painel: M.calibracao.painel[ativoId][g], as: HORA }])) }
      : null,
  }
}
const daSemente = (etapas) => etapas.preChecagem == null

// o ciclo que a T14 grava quando os passos e o evento fecham (T14/05): o 13 aberto pela URL é
// o fluxo depois disso (G20), e a coluna do 10 e do 14 chega com ele · o cartão, conferido
export function cicloConcluido(ativoId, moduloSerial) {
  const doCiclo = itensDa('E').filter((i) => i.origem === 'ciclo')
  const passos = Object.fromEntries(doCiclo.map((i) => [i.id, 'aprovada']))
  return {
    ativoId, moduloSerial, passos, feitos: doCiclo.length, total: doCiclo.length,
    evento: 'conferido', tentativa: 1, cartao: null, concluido: true, fechado: false,
  }
}
// as fotos de B tiradas: o que bloqueia fechou (o 10, o 14 e o 11 pela URL)
const fotosDeB = () => Object.fromEntries(itensDa('B').map((i) => [i.id, HORA]))

// ── o mundo: a sessão, as etapas, a fila e os casos que valem ──
// No estado da coluna, o do caso da receita (G21): o 09 no a-02 do
// can-estatico-bateria (a alimentação do M2C-0301 abaixo da faixa · o 16, a Seção C
// aberta com ele), o 10 no a-09 do
// pronto-para-fechar (o ciclo completo, as fotos tiradas e o servidor que não
// respondeu), o 14 na sessão do herói homologada, com a localização negada
// (localizacao-negada é caso do celular, e não diz ativo). No fluxo, o estado único.
// As releituras (o pacote 13 e o 23, o Reler o módulo do detalhe): depois de N, os casos da C
// devolvem a N-ésima das `releituras` do mock (a 1ª ainda reprova, a 2ª passa) — a releitura lê
// o módulo inteiro, e todo item da C volta atualizado.
// A rodada 2 do retorno do PM: o Painel só entra quando houve calibração, e o ônibus do herói não
// calibra nada — a foto do Painel (o 20) é do caminhão coletor, o ativo da garagem que calibra (o
// KNB-5H39). Pelo endereço, o 20 abre na sessão dele, como a T16/01 abre no par da referência
const QUADRO_DO_PAINEL = '20-momento-foto-do-painel'
export function sessaoDoQuadro(unico, momento, semente) {
  if (momento !== QUADRO_DO_PAINEL) return unico
  const a = M.ativos.find((x) => x.uoId === semente.contexto.uoId && x.moduloSerial
    && (M.calibracao.porModelo[x.modeloAtivoId]?.calibraveis ?? []).some((g) => M.calibracao.painel[x.id]?.[g] != null))
  return a && unico.sessao?.ativoId !== a.id ? { ...unico, sessao: { ...semente.sessao, ativoId: a.id, moduloSerial: a.moduloSerial } } : unico
}
export function mundoDe({ unico, est, semente, releituras = 0 }) {
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
    // o 14: o Finalizar tocado, com a localização negada (HU-T13-7: o relatório vai sem ela) · o bip ouvido
    if (est === REF.semLocalizacao) registro = { ...registro, homologada: true, homologadaAs: HORA, bip: 'ouvi' }
    const semLocalizacao = caso.permissao === 'localizacao' && caso.resposta === 'negada'
    return { sessao, etapas, fila: [...M.filaSaida], casosConsumidos: [], registro, casos: [casoId], semLocalizacao, releituras }
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
    casos: [], semLocalizacao: false, releituras,
  }
}

// o que a T13 grava em etapas.checklist (logica.md · os contadores do menu)
// · `homologada` (o nome de antes): o Finalizar tocado — desde a rodada 1 do retorno do PM, o
//   checklist registrado, aguardando o autoteste; quem homologa é a T16
// · `bip`: o teste do bip do leitor (a rodada 1) — null, 'ouvi' ou 'naoOuvi' · `justificativas`:
//   o que o técnico escreveu no item não conforme da E (o bip não ouvido, o cartão que não confere)
export function registroVazio(ativoId) {
  return { ativoId, aberto: true, fotos: {}, ressalvas: {}, pendentes: null, homologada: false, homologadaAs: null, ciencia: null, bip: null, justificativas: {} }
}

// o quadro que a URL pede (G20): o fluxo depois dos toques que levam lá — o 11,
// as fotos de B tiradas, o ciclo feito e o Finalizar tocado; o 12, o Módulo
// salvo com a ressalva de exemplo e a foto do problema (decisão 39); o 13, o
// ciclo que a T14 fechou
export function registroDoQuadro(momento, base, ck) {
  const r = base.registro
  if (momento === REF.registrado && !r.homologada) {
    const fotos = { ...r.fotos }
    for (const c of ck.porSecao.B) if (c.estado === 'pendente') fotos[c.id] = HORA
    return { ...r, fotos, homologada: true, homologadaAs: HORA, bip: r.bip ?? 'ouvi' }
  }
  // o 13 (a rodada 1): a E resolvida, com o bip ouvido · o 41 e o 42: o bip respondido; o 42 com o campo vazio
  if (momento === REF.eResolvida && !r.bip) return { ...r, bip: 'ouvi' }
  if (momento === REF.bipOuvido) return { ...r, bip: 'ouvi' }
  if (momento === REF.bipNaoOuvido) return { ...r, bip: 'naoOuvi' }
  if (momento === REF.comRessalva && !Object.keys(r.ressalvas).length) {
    const id = ck.porSecao.B.find((c) => c.estado === 'pendente')?.id
    if (id) return { ...r, ressalvas: { ...r.ressalvas, [id]: { justificativa: CK.exemploJustificativa, as: HORA, foto: HORA } } }
  }
  // o 17 ao 20 (o pacote 10): os itens da B antes do da vez, fotografados, como
  // o Tirar foto do item anterior os deixaria
  const daVez = FOTO_DO_MOMENTO[momento]
  if (daVez) {
    const lista = ck.porSecao.B; const i = lista.findIndex((c) => c.id === daVez)
    const fotos = { ...r.fotos }
    for (const c of lista.slice(0, i)) if (c.estado === 'pendente') fotos[c.id] = HORA
    return { ...r, fotos }
  }
  return r
}

// ── C · a leitura: o lido do sinal pelo caso estático do ativo (se não foi
// consumido, G21) ou o nominal, como a T07 lê · a alimentação, pelo caso do
// módulo da sessão que a declara (o pacote 10: o can-estatico-bateria baixa a
// alimentação do M2C-0301, e não mais a bateria da CAN), contra a faixa da
// bateria do modelo do ativo ──
// o caso depois de N Reler o módulo (o pacote 13 e o 23): o que a N-ésima releitura devolve, por
// cima · passada a lista, a última
function relidoDo(mundo, caso) {
  const lista = caso.releituras ?? []
  if (!mundo.releituras || !lista.length) return caso
  return { ...caso, ...lista[Math.min(mundo.releituras, lista.length) - 1] }
}
function alimentacaoDoCaso(mundo) {
  const { moduloSerial } = mundo.sessao
  const k = Object.keys(M.casos).find((x) => M.casos[x].alimentacao != null && M.casos[x].moduloSerial === moduloSerial)
  return k && !mundo.casosConsumidos.includes(k) ? relidoDo(mundo, M.casos[k]).alimentacao : null
}
// o pacote 12 · os casos da Seção C que só a coluna monta (o herói no fluxo não muda):
// o GPS fraco, a entrada que não bate e o modem sem sinal, no módulo da sessão
function casoDaC(mundo, campo) {
  const k = mundo.casos.find((x) => M.casos[x]?.[campo] != null && M.casos[x].moduloSerial === mundo.sessao.moduloSerial)
  return k ? relidoDo(mundo, M.casos[k]) : null
}
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
  // a alimentação (a rodada 1): a faixa do modelo do módulo, de 5 em 5 pra fora — 9 a 32 V na régua de 5 a 35
  if (id === 'alimentacao') {
    const min = Math.floor(faixa.min / 5) * 5; const max = Math.ceil(faixa.max / 5) * 5
    return { min: min === faixa.min ? min - 5 : min, max: max === faixa.max ? max + 5 : max, passo: 5 }
  }
  const w = faixa.max - faixa.min
  if (id === 'bateria') return { min: faixa.min - (2 * w) / 3, max: faixa.max + w / 3 }
  return { min: faixa.min, max: faixa.max ?? faixa.min }
}

// ── o que cada seção lê ──
function passou(etapa) { return !!etapa && (etapa.daSemente || etapa.passaram === etapa.checagens) }
function confirmadosDaCadeia(etapas) { return etapas.cadeia?.confirmados ?? 0 }
// houve calibração na sessão: a T10 semeou ao menos uma grandeza neste ativo
function calibracaoDa(mundo) { const c = mundo.etapas.calibracao; return c && c.ativoId === mundo.sessao.ativoId ? c : null }
function calibrada(mundo) { return Object.keys(calibracaoDa(mundo)?.semeadas ?? {}).length > 0 }
// a grandeza pulada (D1): a T10 a marcou em `puladas`, ou a calibração concluiu sem
// semear a que o modelo tem como opcional (o Pular o horímetro, decisão 52)
function pulada(mundo, g) {
  const c = calibracaoDa(mundo)
  if (!c || c.semeadas?.[g]) return false
  if ((c.puladas ?? []).includes(g)) return true
  const opcionais = M.calibracao.porModelo[modeloDe(mundo.sessao.ativoId)?.id]?.opcionais ?? []
  return !!c.concluida && opcionais.includes(g)
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
// F falha quando o servidor diz que não: o ativo que ficou sem resposta
// (pronto-para-fechar), o evento de teste que não chegou no prazo (T14/02: 'A
// Seção F reprova.') ou um item desta sessão que o servidor recusou
function secaoFFalhando(mundo) {
  const pf = M.casos['pronto-para-fechar']
  if (pf && pf.ativoId === mundo.sessao.ativoId && pf.recebimento === 'sem resposta') return true
  return cicloDaSessao(mundo)?.evento === 'nao-chegou'
}

// ── cada item: o estado, o tipo da linha e o que ela diz ──
// estado: ok · ressalva · nsa (não se aplica) · pendente · aguarda · reprovado
// tipo: leitura (sem seta) · tocar (com seta, e o destino) · feito · ressalva
// destino: { tela } (a tela que resolve) · 'item' (a câmera do app, 07) · 'reprovado' (o 09)
const base = (item, c) => ({ id: item.id, secao: item.secao, nome: item.rotulo, tipo: 'leitura', ...c })
const lido = (item, valor, leitura) => base(item, { estado: 'ok', valor, ...(leitura ? { leitura } : {}) })
const LINHA_DO_DIAGNOSTICO = (id) => M.diagnostico.modulo.find((l) => l.id === id)
const MODEM_NA_REDE = LINHA_DO_DIAGNOSTICO('modem').heroi
const naoSeAplica = (item) => base(item, { estado: 'nsa', valor: T.vazio, apagado: true })
// o automático que falta leva à tela que resolve, pelo `origem` do mock (a entrega do checklist)
const TELA_DA_ORIGEM = { conectar: 'T05', ativo: 'T06', can: 'T07', configurar: 'T09', calibracao: 'T10' }
const ICONE_DA_ORIGEM = { conectar: 'conectar', ativo: 'ativo', can: 'refazer', configurar: 'configurar', calibracao: 'calibracao' }
function falta(item) {
  const tela = TELA_DA_ORIGEM[item.origem]
  if (!tela) return base(item, { estado: 'aguarda', valor: T.vazio, apagado: true })
  return base(item, { estado: 'pendente', tipo: 'tocar', icone: ICONE_DA_ORIGEM[item.origem], legenda: T.aFazer, destino: { tela } })
}
// o que reprovou: com a leitura, a linha de leitura com o valor em vermelho e a
// seta, que abre o nível do item (09 · a 16, o pacote 10: item automático
// reprovado ganha a seta; passou, é leitura, sem seta); sem ela, a tela que resolve
function reprovou(item, valor, leitura) {
  if (leitura) return base(item, { estado: 'reprovado', valor, leitura, destino: 'reprovado' })
  return base(item, { estado: 'reprovado', tipo: 'tocar', legenda: valor, destino: { tela: TELA_DA_ORIGEM[item.origem] } })
}

// A · três itens: o chassi saiu (decisão 46)
function itemA(mundo, item) {
  const { sessao, etapas } = mundo
  const conectado = passou(etapas.preChecagem)
  const vinculado = etapas.ativo?.ativoId === sessao.ativoId
  if (item.id === 'a-serial') return conectado ? lido(item, sessao.moduloSerial) : falta(item)
  if (item.id === 'a-firmware') return conectado ? lido(item, moduloDe(sessao.moduloSerial)?.firmware) : falta(item)
  // o pacote de sincronização (a rodada 1): o da unidade da sessão, com a data e a hora dele
  if (item.id === 'a-pacote') {
    const p = M.pacotes.find((x) => x.uoId === (mundo.uoId ?? M.contextoAtivo.uoId))
    return p ? lido(item, T.dataDoPacote(p.data, p.hora)) : falta(item)
  }
  return vinculado ? lido(item, ativoDe(sessao.ativoId)?.placa) : falta(item)
}

// a causa da ressalva, na linha: a primeira oração da justificativa, com a
// minúscula no começo ('Suporte trincado; fixei…' → 'suporte trincado', T13/12)
export function causaDa(justificativa) {
  const [primeira] = String(justificativa ?? '').split(/[;.—]/)
  const t = primeira.trim()
  return t ? t.charAt(0).toLowerCase() + t.slice(1) : null
}

// B · o Painel é foto a tirar, como os outros quatro (decisão 52); sem calibração na
// sessão ele nem aparece (D4 · itensDeB)
function itemB(mundo, item) {
  const { registro } = mundo
  const b = (c) => base(item, { tipo: 'feito', pergunta: item.pergunta, ...c })
  // sem leitor no ônibus, não se aplica (o mock): o traço, sem frase (G25)
  if (item.condicao === 'leitor' && !modeloDe(mundo.sessao.ativoId)?.leitor) return b({ estado: 'nsa' })
  const ressalva = registro.ressalvas[item.id]
  if (ressalva) { const causa = causaDa(ressalva.justificativa); return b({ estado: 'ressalva', tipo: 'ressalva', legenda: causa ? T.comRessalva(causa) : undefined }) }
  // a foto tirada aqui: o check, e nenhum texto aprovado diz de onde ela veio (G25)
  if (registro.fotos[item.id]) return b({ estado: 'ok' })
  return b({ estado: 'pendente', tipo: 'tocar', icone: 'camera', legenda: T.fotoATirar, destino: 'item' })
}

function itemC(mundo, item) {
  const { etapas } = mundo
  const L = M.leituraNominalModulo
  // a alimentação (a rodada 1 do retorno do PM): a tensão que o módulo lê no fio de alimentação,
  // contra a faixa do modelo do módulo (o VL06, 9,0 a 32,0 V) · o herói, a do diagnóstico (24,3 V)
  if (item.id === 'c-alimentacao') {
    if (!passou(etapas.preChecagem)) return falta(item)
    const ft = modeloDoModulo(mundo.sessao.moduloSerial)?.faixaTensao
    if (!ft) return naoSeAplica(item)
    const p = partes(alimentacaoDoCaso(mundo) ?? LINHA_DO_DIAGNOSTICO('alimentacao').heroi)
    if (!p || !Number.isFinite(p.num)) return reprovou(item, T.vazio, null)
    const sinal = { id: 'alimentacao', faixa: { min: ft[0], max: ft[1] } }
    const valor = [p.texto, p.unidade].filter(Boolean).join(' ')
    return dentro(sinal.faixa, p.num) ? lido(item, valor, { sinal, ...p }) : reprovou(item, valor, { sinal, ...p })
  }
  // o GPS (a rodada 1): o critério é a antena — conectada, em curto ou desconectada —, e os satélites
  // ficam como informação · o herói, conectada, com os satélites do diagnóstico
  if (item.id === 'c-gps') {
    if (!passou(etapas.preChecagem)) return falta(item)
    const caso = casoDaC(mundo, 'antena')
    const antena = caso?.antena ?? T.antenaConectada
    const satelites = caso?.satelites ?? partes(LINHA_DO_DIAGNOSTICO('gps').heroi.split('·').pop().trim()).num
    const leitura = { texto: antena, frase: T.satelites(satelites), satelites, ainda: T.ainda(antena) }
    return antena === T.antenaConectada ? lido(item, T.antena(antena), leitura) : reprovou(item, T.antena(antena), leitura)
  }
  if (item.id === 'c-entradas') {
    if (etapas.ativo?.ativoId !== mundo.sessao.ativoId) return falta(item)
    // a entrada que não bate (o pacote 12): o que o módulo leu e o esperado, sem régua
    const caso = casoDaC(mundo, 'entradas')
    if (caso) {
      const [entrada] = Object.keys(caso.entradas).filter((k) => k !== 'esperado')
      const valor = T.entradaLida(T.entradas[entrada], caso.entradas[entrada])
      // relida e batendo com o esperado (o pacote 13, 32): conforme, e o detalhe diz o lido
      if (caso.entradas[entrada] === caso.entradas.esperado) return lido(item, T.conforme, { texto: valor })
      return reprovou(item, valor, { texto: valor, frase: T.esperadoDaEntrada(caso.entradas.esperado), ainda: T.entradaAinda(T.entradas[entrada], caso.entradas[entrada]) })
    }
    return L.entradasUsadas <= L.entradasTotal ? lido(item, T.conforme) : reprovou(item, `${L.entradasUsadas} ${T.de(L.entradasTotal)}`, null)
  }
  // o modem e o sinal: a palavra, sem o dBm (a entrega do checklist, T13-N5)
  if (!passou(etapas.preChecagem)) return falta(item)
  // o modem sem sinal (o pacote 12, o caso da T07/07): a palavra e o porquê, sem régua
  const modem = casoDaC(mundo, 'modem')
  // relido na rede (o pacote 13, 33): o que o diagnóstico lê no módulo que está bem (o `heroi` da T07)
  if (modem && modem.modem === MODEM_NA_REDE) return lido(item, T.sinalBom, { texto: modem.modem })
  if (modem) return reprovou(item, modem.modem, { texto: modem.modem, frase: T.semAlcance, ainda: T.ainda(modem.modem) })
  return dentro(L.modemFaixa, L.modemDbm) ? lido(item, T.sinalBom) : reprovou(item, T.vazio, null)
}

// D · o que a cadeia gravou, pelo conteúdo de cada bloco (decisão 49 — o módulo não
// guarda versão; as mesmas palavras da T09 e da T11, conteudoDo): as cercas em
// regiões, a APN, os eventos e o leitor; a tradução da CAN, gravada · o Extended ID,
// só leitura (decisão 45), o que está no módulo — sem cartões, D5 · a calibração:
// o valor de partida que pôs no módulo (o do painel), ou, pulado, 'não calibrado' (D1)
function itemD(mundo, item) {
  // a rodada 1 do retorno do PM: uma linha por bloco, cada uma confere · depois, o autoteste do
  // próprio módulo, o canal de programação protegido e o ID que confere com o cadastro
  const { etapas } = mundo
  const conf = confirmadosDaCadeia(etapas)
  const { ordem } = M.cadeia
  const gravou = (bloco) => conf > ordem.indexOf(bloco)
  const [tipo, alvo] = String(item.fonte).split(':')
  if (tipo === 'bloco') return gravou(alvo) ? lido(item, T.confere) : falta(item)
  if (item.fonte === 'autoteste-modulo') return passou(etapas.preChecagem) ? lido(item, T.confere) : falta(item)
  if (item.fonte === 'canal') return gravou('conexao') ? lido(item, item.valor) : falta(item)
  return gravou('conexao') ? lido(item, T.confere) : falta(item)
}

// E · leitura só: o passo aprovado diz 'confere'; o que falta, 'a fazer'. A
// ação da seção é uma só, o Fazer o ciclo de testes (T13·4, HU-T13-8)
function itemE(mundo, item) {
  // o bip do leitor (a rodada 1): respondido aqui, com o Testar bip — ouvido confere; não ouvido
  // é não conforme, com o campo do que aconteceu
  if (item.fonte === 'bip') {
    const bip = mundo.registro.bip
    if (bip === 'ouvi') return base(item, { estado: 'ok', valor: T.ouvi, bip })
    if (bip === 'naoOuvi') return base(item, { estado: 'naoConforme', valor: T.naoOuvi, bip })
    return base(item, { estado: 'pendente', bip: null })
  }
  const passo = passoDoCiclo(mundo, item)
  if (passo === 'aprovada') return lido(item, T.confere)
  // o cartão que o técnico disse que não confere (T14/10): não conforme, com a justificativa aqui
  if (passo === 'reprovada' && cicloDaSessao(mundo)?.cartao?.resposta === 'reprovada') {
    return base(item, { estado: 'naoConforme', valor: T.naoConfere, cartao: true })
  }
  // *a fazer* em --tinta (a rodada 1: as referências acenderam o que o técnico ainda faz)
  return base(item, { estado: passo === 'reprovada' ? 'reprovado' : 'pendente', valor: T.aFazer })
}

// F · leitura só, sem ação: espera o servidor. Homologado, o relatório está na
// fila e ela confere (G22); nenhuma referência desenha os itens assim, e ficam
// os valores do C10, com o número do mock
function itemF(mundo, item) {
  // a rodada 1 do retorno do PM: a posição e o evento de teste — esperando, confere ou não chegou ·
  // como as referências desenham, o servidor confirma depois do Finalizar (a 11: *o servidor
  // confirmou*); antes, esperando, mesmo com o ciclo feito (a 13); o prazo estourado, não chegou
  if (secaoFFalhando(mundo)) return base(item, { estado: 'reprovado', valor: T.naoChegou })
  return mundo.registro.homologada ? lido(item, T.confere) : base(item, { estado: 'aguarda', valor: T.esperando, apagado: true })
}

// quem age, embaixo do nome da seção (a entrega do checklist, decisão 34): o
// que o app confere, o que o técnico fotografa, o ciclo, o servidor. Com 1, o
// singular (a resposta do arquiteto de 26/09: *você fotografa 1 item*, *1 foto
// tirada*). O que ele fotografa conta os itens da seção, não os que faltam (o
// pacote 3, a T13/12: com o Módulo salvo com ressalva, *você fotografa 5 itens*).
// As fotos tiradas contam o item fotografado aqui e o salvo com a
// ressalva, que tem a foto do problema (decisão 39);
// sem nenhuma, a linha fica sem ela (G25)
function quemAgeDa(s, itens, homologada) {
  const feitos = itens.filter(resolvido).length
  if (s.natureza === 'automatico') return itens.some((c) => c.estado === 'lendo' || (c.estado === 'aguarda' && c.lendo)) ? T.lendoDoModulo : homologada ? T.appConferiu : T.appConfere
  if (s.natureza === 'manual') {
    if (itens.some((c) => c.estado === 'pendente')) return T.voceFotografa(itens.length)
    const fotos = itens.filter((c) => c.estado === 'ok' || c.estado === 'ressalva').length
    return fotos ? T.fotosTiradas(fotos) : null
  }
  if (s.natureza === 'dinamico') return feitos === itens.length ? T.cicloPassou : T.voceFazCiclo
  return feitos === itens.length ? T.servidorConfirmou : T.esperaServidor
}

// ── o checklist inteiro: os itens, as seções, a contagem e o que falta ──
// o não conforme da E (o bip não ouvido, o cartão que não confere · a rodada 1) está respondido:
// conta como feito, com o xis e o que aconteceu, e não reprova a seção
export const resolvido = (c) => c.estado === 'ok' || c.estado === 'ressalva' || c.estado === 'nsa' || c.estado === 'naoConforme'
// os itens de B que existem nesta sessão: o Painel só quando houve calibração (D4 —
// sem ela, a B tem 4, e o total, 30)
export const itensDeB = (mundo) => itensDa('B').filter((i) => i.condicao !== 'calibracao' || calibrada(mundo))
// a rodada 1 do retorno do PM: cada item só quando se aplica — o leitor, o buzzer dele, a rotação
// na CAN do modelo do ativo, e as pendências só com o ID reescrito (nenhuma sessão do mock reescreve)
const CONDICAO = {
  leitor: (mundo) => !!modeloDe(mundo.sessao.ativoId)?.leitor,
  buzzer: (mundo) => !!modeloDe(mundo.sessao.ativoId)?.leitor?.buzzer,
  rotacao: (mundo) => !!modeloDe(mundo.sessao.ativoId)?.sinaisCan?.some((x) => x.id === 'rotacao'),
  reescritaId: () => false,
}
const seAplica = (mundo, i) => !i.condicao || !CONDICAO[i.condicao] || CONDICAO[i.condicao](mundo)
const itensDaSessao = (mundo, s) => (s === 'B' ? itensDeB(mundo) : itensDa(s).filter((i) => seAplica(mundo, i)))
// quantos passos o ciclo da T14 tem nesta sessão (a ação da E: *até 4 passos*)
const passosDoCiclo = (mundo) => itensDaSessao(mundo, 'E').filter((i) => i.origem === 'ciclo').length
export function checklist(mundo) {
  const porSecao = {}
  for (const s of ['A', 'B', 'C', 'D', 'E', 'F']) {
    porSecao[s] = itensDaSessao(mundo, s).map((item) => (
      s === 'A' ? itemA(mundo, item) : s === 'B' ? itemB(mundo, item) : s === 'C' ? itemC(mundo, item) : s === 'D' ? itemD(mundo, item)
        : s === 'E' ? itemE(mundo, item) : itemF(mundo, item)
    ))
  }
  // a Seção D lida bloco a bloco ao abrir o checklist (a rodada 1, T13/38): `dLidos` diz quantos já
  // chegaram — o seguinte está lendo, e os outros esperam; null, todos lidos
  if (mundo.dLidos != null) {
    porSecao.D = porSecao.D.map((c, i) => (c.estado !== 'ok' || i < mundo.dLidos ? c
      : i === mundo.dLidos ? { ...c, estado: 'lendo', valor: T.lendo, leitura: undefined }
        : { ...c, estado: 'aguarda', valor: T.vazio, apagado: true, lendo: true }))
  }
  const total = Object.values(porSecao).flat().length
  const homologada = !!mundo.registro.homologada
  const secoes = SECOES.map((s) => {
    const itens = porSecao[s.id]
    const feitos = itens.filter(resolvido).length
    let estado
    if (itens.some((c) => c.estado === 'reprovado')) estado = 'reprovada'
    else if (itens.some((c) => c.estado === 'lendo' || c.lendo)) estado = 'lendo'
    else if (feitos === itens.length) estado = 'aprovada'
    else estado = s.natureza === 'servidor' ? 'aguarda' : 'pendente'
    // a E tem uma ação só, enquanto falta passo do ciclo: Fazer o ciclo de testes → T14
    const faltaPasso = itens.some((c) => c.estado !== 'ok' && c.estado !== 'naoConforme' && itemDe(c.id).origem === 'ciclo')
    const acao = s.natureza === 'dinamico' && faltaPasso
      ? { nome: T.fazerCiclo, legenda: T.osPassos(passosDoCiclo(mundo)), icone: 'ciclo', destino: { tela: 'T14' } }
      : null
    return { ...s, itens, feitos, total: itens.length, estado, quemAge: quemAgeDa(s, itens, homologada), acao }
  })
  const todos = secoes.flatMap((s) => s.itens)
  const feitos = todos.filter(resolvido).length
  const faltam = secoes.filter((s) => s.bloqueia).reduce((n, s) => n + s.total - s.feitos, 0)
  // o contador do menu (T04·2): B e E, os que o técnico resolve, ainda por resolver
  const pendentesDoMenu = secoes.filter((s) => s.natureza === 'manual' || s.natureza === 'dinamico').reduce((n, s) => n + s.total - s.feitos, 0)
  // o Finalizar desligado diz por quê (a rodada 1 do retorno do PM): a D ainda sendo lida, um item
  // automático reprovado (a seção dele), ou quantos obrigatórios faltam
  const lendo = secoes.find((x) => x.estado === 'lendo' && x.natureza === 'automatico')
  const comReprovado = secoes.find((x) => x.bloqueia && x.natureza === 'automatico' && x.estado === 'reprovada')
  const motivo = lendo ? T.secaoSendoLida(lendo.id) : comReprovado ? T.secaoComReprovado(comReprovado.id) : faltam > 0 ? T.faltam(faltam) : null
  const bloqueiam = faltam + (lendo || comReprovado ? 1 : 0)
  // o bip (a rodada 1): o momento da E aberta segue o estado dele
  const bip = porSecao.E.find((c) => itemDe(c.id).fonte === 'bip')?.bip ?? null
  return { secoes, porSecao, feitos, total, faltam, bloqueiam, motivo, pendentesDoMenu, falhandoF: secaoFFalhando(mundo), bip }
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
  // o que não é número (o pacote 12 · as entradas e o modem): o valor escrito e o porquê, sem régua
  // `ainda`: o que ainda falta, na frase do não resolvido (o pacote 23, 34 a 37)
  if (!c.leitura.sinal) return { texto: c.leitura.texto, frase: c.leitura.frase, ainda: c.leitura.ainda }
  const { sinal, texto, unidade, num, casas } = c.leitura
  const f = sinal.faixa
  const e = escalaDo(sinal.id, f)
  const dif = num < f.min ? f.min - num : null
  // os satélites (o pacote 12, T13/22): a faixa aberta pra cima, *6 ou mais*, e a
  // frase sem a unidade, *2 abaixo do mínimo* · as divisões, de 2 em 2 (a régua de 6)
  const contagem = sinal.id === 'satelites'
  return {
    valor: texto, unidade,
    escala: { min: e.min, max: e.max, valor: num, faixa: { de: f.min, ate: f.max ?? e.max }, divisoes: contagem ? (e.max - e.min) / 2 : e.passo ? (e.max - e.min) / e.passo : Math.round(e.max - e.min), fortes: [f.min, f.max ?? e.max] },
    legendas: { min: decimal(e.min, casas), faixa: f.max == null ? T.ouMais(decimal(f.min, casas)) : T.faixa(decimal(f.min, casas), decimal(f.max, casas)), max: decimal(e.max, casas) },
    frase: dif != null ? T.abaixo(decimal(dif, casas), contagem ? null : unidade) : null,
    ainda: dif != null ? T.ainda(T.abaixo(decimal(dif, casas), contagem ? null : unidade)) : null,
  }
}

// ── o que o Finalizar gera (HU-T13-7): o relatório da instalação na fila,
// criado agora (14:30), o que a Seção F desta sessão lê (G22) ──
export function filaDoFinalizar(mundo) {
  const { ativoId } = mundo.sessao
  // as evidências e o checklist (os tipos da fila do mock · a fila de envio é da T15, a rodada 1)
  const tipos = M.tiposFila.filter((t) => /^(Evidências|Checklist)/.test(t.tipo)).map((t) => t.tipo)
  return tipos.map((tipo, i) => ({
    id: `sessao-${ativoId}-${i + 1}`, tipo, ativoId, diasAtras: 0, data: M.diasAntes(0), criadoAs: HORA, estado: 'na-fila',
  }))
}
