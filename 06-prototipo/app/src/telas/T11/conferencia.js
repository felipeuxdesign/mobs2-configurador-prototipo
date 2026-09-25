// T11 · a conferência lida do mock: os blocos que se comparam, o que o cadastro
// manda em cada um, e o que diverge. Nada de número digitado: a contagem, a
// versão e os valores saem de M.cadeia, dos casos e do cadastro do par.
import { M } from '../../dados/mock.js'
import { RECEITAS } from '../../estado/receitas.js'
import { T } from './textos.js'

export const REF = {
  naoReconhece: '01-estado-conteudo-que-o-app-nao-reconhece',
  confere: '02-momento-tudo-confere',
}
export const CASO_DIFF = 'diff-divergente'            // a 00: os cinco blocos não batem (a semente)
export const CASO_INDICE = 'indice-nao-classificado'  // a 01: o conteúdo fora de todos os blocos
export const CASO_CONFERE = 'conferencia-confere'     // a 02: o par do herói, que confere (AC-17)

const { ordem, rotulos, versoes } = M.cadeia
// as linhas: a cadeia sem a limpeza, que não guarda nada pra comparar — os
// cinco blocos versionados, na ordem canônica
export const BLOCOS = ordem.filter((b) => versoes[b])
export const rotuloDe = (bloco) => rotulos[bloco]
// a versão que o módulo devolve quando tudo confere: a do cadastro, bloco a bloco
export const VERSAO_DO_CADASTRO = BLOCOS.map((b) => versoes[b]).join('.')

export const parDoCaso = (casoId) => ({ ativoId: M.casos[casoId].ativoId, moduloSerial: M.casos[casoId].moduloSerial })

// Num estado da coluna, o mundo é o da receita (receitas.js, G21): os casos que
// ela diz, o primeiro por baixo. O 01 é o índice que o app não classifica, no
// par dele (o mesmo do diff-divergente): os cinco blocos conferem, e o que sobra
// é o conteúdo fora de todos eles (a entrega do checklist). Fora de estado, null.
// `naoReconhecidos`: quantos conteúdos fora dos blocos — um por caso do índice
// não classificado, com a posição dele na memória (o 1 do 'a mais', T11/01).
export function mundoDoEstado(est) {
  const casos = est != null ? RECEITAS[`T11/${est}`]?.casos : null
  if (!casos?.length) return null
  return {
    par: parDoCaso(casos[0]),
    divergem: casos.flatMap((c) => M.casos[c]?.divergencias?.map((d) => d.bloco) ?? []),
    naoReconhecidos: casos.filter((c) => c === CASO_INDICE && M.casos[c]?.posicao != null).length,
  }
}
const mesmoPar = (a, b) => a.ativoId === b.ativoId && a.moduloSerial === b.moduloSerial
export const ativoDe = (ativoId) => M.ativos.find((a) => a.id === ativoId)

// A cadeia concluída na sessão (T11·2): depois de regravar pela T09, o módulo
// tem o que o cadastro manda, e a T11 reaberta com a mesma sessão confere.
export const cadeiaConcluida = (etapas) => (etapas.cadeia?.confirmados ?? 0) >= ordem.length

// O que diverge no par: só o par do diff-divergente diverge, e só até a cadeia
// ser regravada (T11·1, T11·2). Nos outros, nada diverge.
export function divergenciasDo(par, etapas) {
  if (cadeiaConcluida(etapas)) return []
  const caso = M.casos[CASO_DIFF]
  return mesmoPar(par, parDoCaso(CASO_DIFF)) ? caso.divergencias.map((d) => d.bloco) : []
}

// O que o módulo tem, bloco a bloco, no par que diverge: o noModulo do caso
// diff-divergente, a linha de cima do par (a entrega do checklist, T11/00). Nos
// outros pares, nada: o que o módulo tem é o que o cadastro manda.
export function moduloDo(par) {
  if (!mesmoPar(par, parDoCaso(CASO_DIFF))) return {}
  return Object.fromEntries(M.casos[CASO_DIFF].divergencias.map((d) => [d.bloco, d.noModulo]))
}

// O que o cadastro manda, bloco a bloco. No par de um caso, o que o caso
// declara (o noCadastro do diff-divergente); nos outros, o cadastro do próprio
// par (AC-17, G9): a tradução do modelo, as regiões do ativo, o meio da sessão,
// o intervalo do preset de eventos e a rede do módulo atual. O leitor que não é
// sem fio não tem texto aprovado e fica sem valor (G25).
export function cadastroDo(par, sessao) {
  if (mesmoPar(par, parDoCaso(CASO_DIFF))) {
    return Object.fromEntries(M.casos[CASO_DIFF].divergencias.map((d) => [d.bloco, d.noCadastro]))
  }
  const ativo = ativoDe(par.ativoId)
  const modelo = M.modelosAtivo.find((m) => m.id === ativo?.modeloAtivoId)
  const preset = M.presetsEvento.find((p) => p.id === modelo?.presetEventoId)
  return {
    ativo: modelo ? T.traducao(modelo.traducaoCan) : null,
    cercas: T.regioes(M.cercas.regioes.filter((r) => r.ativoId === par.ativoId).length),
    leitor: sessao?.meio === 'sem-fio' ? T.leitorSemFio : null,
    eventos: preset ? T.intervalo(preset.intervaloRastreamentoSeg) : null,
    conexao: T.redeAtual,
  }
}

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
