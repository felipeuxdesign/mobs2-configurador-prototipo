// T11 · a conferência lida do mock (decisão 53): as cinco linhas — Cercas, APN,
// Extended ID, Eventos e Leitor —, o que o cadastro manda em cada uma, o que
// diverge e o que ficou pra revisar em seguida. Nada de número digitado: a
// contagem, os valores e o arraste saem de M.cadeia, dos casos e do cadastro do par.
import { M } from '../../dados/mock.js'
import { regioesDoAtivo } from '../../dados/regioes.js'
import { RECEITAS } from '../../estado/receitas.js'
import { SEMENTES } from '../../estado/sementes.js'
import { T } from './textos.js'
import { BLOCOS_DO_SCRIPT, faltaReenviarDe, motivoDe, manutencaoDoCaso } from '../../estado/reenvio.js'
import { conteudoDo } from '../T09/cadeia.js'

export const REF = {
  naoReconhece: '01-estado-conteudo-que-o-app-nao-reconhece',
  confere: '02-momento-tudo-confere',
  // a conferência correndo, parada na linha dos Eventos (o pacote 5, lei 24)
  conferindo: '04-momento-conferindo',
  // a folha Outras ações, por cima da 00 (decisão 40)
  outras: '03-momento-outras-acoes',
  // o pacote 2 (decisão 53): reenviou um bloco, e os que dependem dele ficam pra revisar
  revisar: '05-estado-revisar-em-seguida',
  // o retorno do PM de 09/10: o Corrigir este bloco com dependente abre a folha de confirmação da T09
  confirmacao: '06-momento-folha-de-confirmacao',
}
export const CASO_DIFF = 'diff-divergente'            // a 00: as quatro que se comparam não batem (a semente)
export const CASO_INDICE = 'indice-nao-classificado'  // a 01: o conteúdo fora de todos os blocos
export const CASO_CONFERE = 'conferencia-confere'     // a 02: o par do herói, que confere (AC-17)
export const CASO_REENVIADAS = 'cercas-reenviadas'    // a 05: as cercas reenviadas numa manutenção

const { ordem, rotulos } = M.cadeia
// os blocos que a cadeia grava depois da limpeza: os 5 do Reenviar os 5 blocos
export const BLOCOS_DA_CADEIA = ordem.slice(1)
// as cinco linhas, na ordem do script (o retorno do PM de 09/10): Ativo, Cercas, Leitor, Eventos e
// Conexão — no Conferindo, no Tudo confere e no Não bate com o cadastro, qualquer que seja a ordem em
// que as divergências foram achadas · o Ativo compara o que o módulo traduz da CAN com o cadastro
export const LINHAS = BLOCOS_DO_SCRIPT
// as que se comparam: as cinco — o contador conta cinco blocos
export const COMPARADAS = LINHAS

// o rótulo de cada linha: o que o caso dá ao bloco (a Conexão é a Rede do módulo, a rodada 2 do
// retorno do PM), senão o da cadeia
const ROTULO_DO_CASO = Object.fromEntries(M.casos[CASO_DIFF].divergencias.filter((d) => d.rotulo).map((d) => [d.bloco, d.rotulo]))
export const rotuloDe = (b) => ROTULO_DO_CASO[b] ?? rotulos[b]

// o par do caso; o caso que não declara par mora no par da semente da tela (M2C-0438 + ONK-8Q90)
const SEMENTE = SEMENTES.T11.sessao
export const parDoCaso = (casoId) => {
  const c = M.casos[casoId]
  return c?.ativoId ? { ativoId: c.ativoId, moduloSerial: c.moduloSerial } : { ativoId: SEMENTE.ativoId, moduloSerial: SEMENTE.moduloSerial }
}
const divergentesDoCaso = (c) => c?.divergencias?.map((d) => d.bloco) ?? []

// Num estado da coluna, o mundo é o da receita (receitas.js, G21): os casos que
// ela diz, o primeiro dá o par. O 01 é o índice que o app não classifica, no par
// do diff-divergente: as quatro conferem, e o que sobra é o conteúdo fora de todos
// os blocos (`naoReconhecidos`, um por caso do índice, o 1 do 'a mais'). O 05 é o
// cercas-reenviadas, no par do herói: o bloco que o caso diz que foi reenviado
// (`reenviados`), e os que dependem dele pelo arraste. Fora de estado, null.
export function mundoDoEstado(est) {
  const casos = est != null ? RECEITAS[`T11/${est}`]?.casos : null
  if (!casos?.length) return null
  return {
    par: parDoCaso(casos[0]),
    divergem: casos.flatMap((c) => divergentesDoCaso(M.casos[c])),
    naoReconhecidos: casos.filter((c) => c === CASO_INDICE && M.casos[c]?.posicao != null).length,
    reenviados: casos.map((c) => M.casos[c]?.reenviado).filter(Boolean),
    // o que ficou para depois (o retorno do PM de 09/10): o leitor e os eventos do cercas-reenviadas
    falta: casos.flatMap((c) => manutencaoDoCaso(c)?.faltaReenviar ?? []),
  }
}
const mesmoPar = (a, b) => a.ativoId === b.ativoId && a.moduloSerial === b.moduloSerial
export const ativoDe = (ativoId) => M.ativos.find((a) => a.id === ativoId)

// A cadeia inteira concluída na sessão (T11·2): depois de regravar pela T09, o
// módulo tem o que o cadastro manda, e a T11 reaberta com a mesma sessão confere.
export const cadeiaConcluida = (etapas) => (etapas.cadeia?.confirmados ?? 0) >= ordem.length

// O que diverge no par: só o par do diff-divergente diverge, e só até a cadeia
// inteira ser regravada (T11·1, T11·2). Nos outros, nada diverge.
export function divergenciasDo(par, etapas) {
  if (cadeiaConcluida(etapas)) return []
  return mesmoPar(par, parDoCaso(CASO_DIFF)) ? divergentesDoCaso(M.casos[CASO_DIFF]) : []
}

// Os blocos reenviados um por vez, pela conferência (decisão 53, D2), na ordem em
// que foram: os que a conferência já guardou (etapas.conferencia.reenviados) e o
// que a T09 acabou de reenviar na cadeia curta (etapas.cadeia.reenviado, que a
// conferência limpa a cada pedido). Com a cadeia inteira regravada, nenhum conta.
export function reenviadosDa(etapas) {
  if (cadeiaConcluida(etapas)) return []
  const feitos = [...(etapas.conferencia?.reenviados ?? []), ...(etapas.manutencao?.reenviados ?? [])]
  const agora = etapas.cadeia?.reenviado
  return agora && !feitos.includes(agora) ? [...feitos, agora] : feitos
}
// o que ficou para depois numa manutenção (estado/reenvio.js): revisar em seguida, com quem arrastou
export const faltaDa = (etapas) => (cadeiaConcluida(etapas) ? [] : faltaReenviarDe(etapas))

// A situação de cada linha que se compara: 'confere', 'diverge' ou 'revisar'.
// Reenviar um bloco faz ele conferir. O arrastado nunca é reenviado sozinho (o retorno do PM de
// 09/10): a T09 pergunta por cada dependente, e o que o técnico deixa para depois (ou não decide)
// fica *revisar em seguida* aqui, com quem o arrastou (o porquê da linha, M.motivosDependente).
export function situacaoDas(divergem, reenviados, falta = []) {
  const s = Object.fromEntries(COMPARADAS.map((b) => [b, { estado: divergem.includes(b) ? 'diverge' : 'confere' }]))
  for (const r of reenviados) if (s[r]) s[r] = { estado: 'confere' }
  for (const f of falta) if (s[f.bloco]) s[f.bloco] = { estado: 'revisar', por: f.por }
  return s
}

// O que o módulo tem, bloco a bloco, no par que diverge: o noModulo do caso
// diff-divergente (a linha de cima do par, T11/00). Nos outros pares, nada.
export function moduloDo(par) {
  if (!mesmoPar(par, parDoCaso(CASO_DIFF))) return {}
  return Object.fromEntries(M.casos[CASO_DIFF].divergencias.map((d) => [d.bloco, d.noModulo]))
}

// O que o cadastro manda, bloco a bloco. No par do diff-divergente, o que o caso
// declara (o noCadastro); nos outros, o cadastro do próprio par (AC-17, G9): as
// regiões do ativo (decisão 50), a APN da conexão da empresa (decisão 51), o
// intervalo do preset de eventos do modelo e o meio da sessão. O leitor que não é
// sem fio não tem texto aprovado e fica sem valor (G25).
export function cadastroDo(par, sessao) {
  // o Ativo: o que o módulo traduz da CAN, em palavras do técnico (o retorno do PM de 09/10)
  const ativo = T.traduzACan(conteudoDo(par).ativo)
  if (mesmoPar(par, parDoCaso(CASO_DIFF))) {
    const c = M.casos[CASO_DIFF]
    return { ativo, ...Object.fromEntries((c.confere ?? []).map((d) => [d.bloco, d.valor])), ...Object.fromEntries(c.divergencias.map((d) => [d.bloco, d.noCadastro])) }
  }
  const modelo = M.modelosAtivo.find((m) => m.id === ativoDe(par.ativoId)?.modeloAtivoId)
  const preset = M.presetsEvento.find((p) => p.id === modelo?.presetEventoId)
  return {
    ativo,
    cercas: T.regioes(regioesDoAtivo(par.ativoId).length),
    conexao: T.redeDaMobs2,   // a rodada 2: a tela mostra o nome, nunca o endereço
    eventos: preset ? T.intervalo(preset.intervaloRastreamentoSeg) : null,
    leitor: sessao?.meio === 'sem-fio' ? T.leitorSemFio : null,
  }
}

// A conferência inteira, pronta pra desenhar: as cinco linhas, quantas não batem,
// quantas ficam pra revisar, e o próximo bloco a reenviar — o primeiro que
// diverge ou espera revisão, na ordem da cadeia (decisão 53: um bloco por vez).
// Cada linha leva o que a LinhaChecagem (variante conferencia) pede:
// · a que confere: o check e o valor do cadastro à direita;
// · a que diverge: o xis e o par embaixo do nome — no módulo, em vermelho; no cadastro;
// · a de revisar em seguida: o relógio e o par — 'revisar em seguida' e o porquê;
// · o Extended ID: o i, só leitura. Quando há par na tela (alguma diverge), ele
//   diz o que está no módulo e que é só leitura (T11/00); senão, o valor à direita.
export function conferenciaDo({ par, sessao, divergem, reenviados = [], falta = [], naoReconhecidos = 0 }) {
  const s = situacaoDas(divergem, reenviados, falta)
  const cadastro = cadastroDo(par, sessao)
  const modulo = moduloDo(par)
  const contam = (estado) => COMPARADAS.filter((b) => s[b].estado === estado).length
  const naoBatem = contam('diverge')
  const aRevisar = contam('revisar')
  const linhas = LINHAS.map((b) => {
    const titulo = rotuloDe(b)
    const { estado, por } = s[b]
    if (estado === 'diverge') return { id: b, titulo, estado: 'diverge', par: { modulo: T.noModulo(modulo[b]), cadastro: T.noCadastro(cadastro[b]) } }
    if (estado === 'revisar') return { id: b, titulo, estado: 'pendente', par: { modulo: T.revisarEmSeguida, cadastro: motivoDe(b, por) } }
    // a Conexão que confere diz o nome do cadastro, *a rede da Mobs2*; a que diverge, as duas coisas (o par)
    return { id: b, titulo, estado: 'aprovada', valor: b === 'conexao' ? T.redeDaMobs2 : cadastro[b] }
  })
  const proximo = ordem.find((b) => s[b] && s[b].estado !== 'confere')
  return {
    linhas, naoBatem, aRevisar, total: COMPARADAS.length,
    proximo: proximo ? { bloco: proximo, acao: s[proximo].estado === 'diverge' ? 'corrigir' : 'revisar' } : null,
    bate: naoBatem === 0 && aRevisar === 0 && naoReconhecidos === 0,
  }
}

// quantas das que se comparam a leitura já alcançou (o contador que acompanha as linhas)
// o quadro da 04 (o pacote 5 · o retorno do PM de 09/10): a conferência parada no Leitor — duas lidas, 2 de 5
export const QUADRO_04 = LINHAS.indexOf('leitor')
export const comparadasAte = (lidas) => LINHAS.slice(0, lidas).filter((b) => COMPARADAS.includes(b)).length

// O endereço do 02 monta o par que confere (G20, T11·1): a sessão do herói, com
// a garagem do ativo e o pacote dela, como a semente monta.
export function mundoQueConfere(sessao) {
  const par = parDoCaso(CASO_CONFERE)
  const uoId = ativoDe(par.ativoId).uoId
  const p = M.pacotes.find((x) => x.uoId === uoId)
  const meio = M.situacao.porPerto.find((x) => x.serial === par.moduloSerial)?.meio ?? sessao?.meio
  return {
    sessao: { ...sessao, ...par, meio },
    contexto: { uoId, pacote: { id: p.id, diasAtras: p.diasAtras, hora: p.hora } },
  }
}
