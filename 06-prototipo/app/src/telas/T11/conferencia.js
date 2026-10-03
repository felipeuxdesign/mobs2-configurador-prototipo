// T11 · a conferência lida do mock (decisão 53): as cinco linhas — Cercas, APN,
// Extended ID, Eventos e Leitor —, o que o cadastro manda em cada uma, o que
// diverge e o que ficou pra revisar em seguida. Nada de número digitado: a
// contagem, os valores e o arraste saem de M.cadeia, dos casos e do cadastro do par.
import { M } from '../../dados/mock.js'
import { regioesDoAtivo } from '../../dados/regioes.js'
import { RECEITAS } from '../../estado/receitas.js'
import { SEMENTES } from '../../estado/sementes.js'
import { T } from './textos.js'

export const REF = {
  naoReconhece: '01-estado-conteudo-que-o-app-nao-reconhece',
  confere: '02-momento-tudo-confere',
  // a conferência correndo, parada na linha dos Eventos (o pacote 5, lei 24)
  conferindo: '04-momento-conferindo',
  // a folha Outras ações, por cima da 00 (decisão 40)
  outras: '03-momento-outras-acoes',
  // o pacote 2 (decisão 53): reenviou um bloco, e os que dependem dele ficam pra revisar
  revisar: '05-estado-revisar-em-seguida',
}
export const CASO_DIFF = 'diff-divergente'            // a 00: as quatro que se comparam não batem (a semente)
export const CASO_INDICE = 'indice-nao-classificado'  // a 01: o conteúdo fora de todos os blocos
export const CASO_CONFERE = 'conferencia-confere'     // a 02: o par do herói, que confere (AC-17)
export const CASO_REENVIADAS = 'cercas-reenviadas'    // a 05: as cercas reenviadas numa manutenção

const { ordem, rotulos, arraste } = M.cadeia
// os blocos que a cadeia grava depois da limpeza: os 5 do Reenviar os 5 blocos
export const BLOCOS_DA_CADEIA = ordem.slice(1)
// O Extended ID (decisão 45 e 53): os cartões e iButtons que estão no módulo. É
// só leitura — o app não grava cartões —, não é bloco da cadeia e não se compara
export const EXTENDED_ID = 'extendedId'
// as cinco linhas, na ordem da decisão 53 e das cinco referências (a ordem de
// leitura; a de correção é a da cadeia, M.cadeia.ordem)
export const LINHAS = ['cercas', 'conexao', EXTENDED_ID, 'eventos', 'leitor']
// as que se comparam: as quatro que a cadeia grava — o contador conta só elas
export const COMPARADAS = LINHAS.filter((b) => ordem.includes(b))

// o rótulo de cada linha: o que o caso dá ao bloco (a Conexão é a APN, decisão
// 51), senão o da cadeia; o Extended ID, o do textos.md
const ROTULO_DO_CASO = Object.fromEntries(M.casos[CASO_DIFF].divergencias.filter((d) => d.rotulo).map((d) => [d.bloco, d.rotulo]))
export const rotuloDe = (b) => (b === EXTENDED_ID ? T.extendedId : ROTULO_DO_CASO[b] ?? rotulos[b])

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
  const feitos = etapas.conferencia?.reenviados ?? []
  const agora = etapas.cadeia?.reenviado
  return agora ? [...feitos, agora] : feitos
}

// A situação de cada linha que se compara: 'confere', 'diverge' ou 'revisar'.
// Reenviar um bloco faz ele conferir, e marca pra revisar em seguida os que
// dependem dele — o arraste do mock (M.cadeia.arraste: as cercas levam o leitor
// e os eventos), na ordem em que foram reenviados. O que já está marcado guarda
// quem o marcou (o porquê da linha).
export function situacaoDas(divergem, reenviados) {
  const s = Object.fromEntries(COMPARADAS.map((b) => [b, { estado: divergem.includes(b) ? 'diverge' : 'confere' }]))
  for (const r of reenviados) {
    if (s[r]) s[r] = { estado: 'confere' }
    for (const d of arraste[r] ?? []) if (s[d] && s[d].estado !== 'revisar') s[d] = { estado: 'revisar', por: r }
  }
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
  if (mesmoPar(par, parDoCaso(CASO_DIFF))) {
    return Object.fromEntries(M.casos[CASO_DIFF].divergencias.map((d) => [d.bloco, d.noCadastro]))
  }
  const modelo = M.modelosAtivo.find((m) => m.id === ativoDe(par.ativoId)?.modeloAtivoId)
  const preset = M.presetsEvento.find((p) => p.id === modelo?.presetEventoId)
  return {
    cercas: T.regioes(regioesDoAtivo(par.ativoId).length),
    conexao: M.conexoes[0]?.apn ?? null,
    eventos: preset ? T.intervalo(preset.intervaloRastreamentoSeg) : null,
    leitor: sessao?.meio === 'sem-fio' ? T.leitorSemFio : null,
  }
}

// O Extended ID que está no módulo: o do cadastro do módulo, se o mock declarar;
// senão, o único declarado, o do diff-divergente — o mesmo que a 02 e a 05
// desenham no herói (como o item D da T13 lê)
export function extendedIdDo(par) {
  return M.modulos.find((m) => m.serial === par.moduloSerial)?.extendedId ?? M.casos[CASO_DIFF].extendedId ?? { cartoes: 0, ibuttons: 0 }
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
export function conferenciaDo({ par, sessao, divergem, reenviados = [], naoReconhecidos = 0 }) {
  const s = situacaoDas(divergem, reenviados)
  const cadastro = cadastroDo(par, sessao)
  const modulo = moduloDo(par)
  const xid = extendedIdDo(par)
  const contam = (estado) => COMPARADAS.filter((b) => s[b].estado === estado).length
  const naoBatem = contam('diverge')
  const aRevisar = contam('revisar')
  const linhas = LINHAS.map((b) => {
    const titulo = rotuloDe(b)
    if (b === EXTENDED_ID) {
      return naoBatem > 0
        ? { id: b, titulo, estado: 'informa', par: { modulo: T.extendedIdNoModulo(xid.cartoes, xid.ibuttons), cadastro: T.soLeitura } }
        : { id: b, titulo, estado: 'informa', valor: T.extendedIdValor(xid.cartoes, xid.ibuttons) }
    }
    const { estado, por } = s[b]
    if (estado === 'diverge') return { id: b, titulo, estado: 'diverge', par: { modulo: T.noModulo(modulo[b]), cadastro: T.noCadastro(cadastro[b]) } }
    if (estado === 'revisar') return { id: b, titulo, estado: 'pendente', par: { modulo: T.revisarEmSeguida, cadastro: T.porque[`${b}:${por}`] } }
    return { id: b, titulo, estado: 'aprovada', valor: cadastro[b] }
  })
  const proximo = ordem.find((b) => s[b] && s[b].estado !== 'confere')
  return {
    linhas, naoBatem, aRevisar, total: COMPARADAS.length,
    proximo: proximo ? { bloco: proximo, acao: s[proximo].estado === 'diverge' ? 'corrigir' : 'revisar' } : null,
    bate: naoBatem === 0 && aRevisar === 0 && naoReconhecidos === 0,
  }
}

// quantas das que se comparam a leitura já alcançou (o contador que acompanha as linhas)
// o quadro da 04 (o pacote 5): a conferência parada nos Eventos — três lidas, 2 de 4
export const QUADRO_04 = LINHAS.indexOf('eventos')
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
