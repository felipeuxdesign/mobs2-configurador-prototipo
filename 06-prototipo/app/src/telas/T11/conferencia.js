// T11 · a conferência lida do mock: os blocos que se comparam, o que o cadastro
// manda em cada um, e o que diverge. Nada de número digitado: a contagem, a
// versão e os valores saem de M.cadeia, dos casos e do cadastro do par.
import { M } from '../../dados/mock.js'
import { RECEITAS } from '../../estado/receitas.js'
import { SEMENTES } from '../../estado/sementes.js'
import { T } from './textos.js'

export const REF = {
  naoReconhece: '01-estado-conteudo-que-o-app-nao-reconhece',
  confere: '02-momento-tudo-confere',
  // a última entrega (decisão 40): a folha Outras ações, por cima da 00
  outras: '03-momento-outras-acoes',
  ilegivel: '04-estado-versao-ilegivel',
}
export const CASO_DIFF = 'diff-divergente'            // a 00: os cinco blocos não batem (a semente)
export const CASO_INDICE = 'indice-nao-classificado'  // a 01: o conteúdo fora de todos os blocos
export const CASO_CONFERE = 'conferencia-confere'     // a 02: o par do herói, que confere (AC-17)
export const CASO_ILEGIVEL = 'versao-ilegivel'        // a 04: a versão não se lê, e o diff roda por conteúdo

const { ordem, rotulos, versoes, arraste } = M.cadeia
// as linhas: a cadeia sem a limpeza, que não guarda nada pra comparar — os
// cinco blocos versionados, na ordem canônica
export const BLOCOS = ordem.filter((b) => versoes[b])
export const rotuloDe = (bloco) => rotulos[bloco]
// a versão que o módulo devolve quando tudo confere: a do cadastro, bloco a bloco
export const VERSAO_DO_CADASTRO = BLOCOS.map((b) => versoes[b]).join('.')

// o par do caso; o caso que não declara par (o versao-ilegivel) mora no par da
// semente da tela, o M2C-0438 + ONK-8Q90, como a T11/04 desenha
const SEMENTE = SEMENTES.T11.sessao
export const parDoCaso = (casoId) => {
  const c = M.casos[casoId]
  return c?.ativoId ? { ativoId: c.ativoId, moduloSerial: c.moduloSerial } : { ativoId: SEMENTE.ativoId, moduloSerial: SEMENTE.moduloSerial }
}
// os blocos que o caso diz que divergem: o diff-divergente os traz com o par
// (divergencias[].bloco); o versao-ilegivel, só os nomes (divergentes)
const divergentesDoCaso = (c) => c?.divergencias?.map((d) => d.bloco) ?? c?.divergentes ?? []

// Num estado da coluna, o mundo é o da receita (receitas.js, G21): os casos que
// ela diz, o primeiro por baixo. O 01 é o índice que o app não classifica, no
// par dele (o mesmo do diff-divergente): os cinco blocos conferem, e o que sobra
// é o conteúdo fora de todos eles (a entrega do checklist). O 04 é a versão que
// não se lê (a última entrega): o diff roda por conteúdo, e o caso diz os
// blocos que não batem. Fora de estado, null.
// `naoReconhecidos`: quantos conteúdos fora dos blocos — um por caso do índice
// não classificado, com a posição dele na memória (o 1 do 'a mais', T11/01).
// `versaoIlegivel`: a versão lida no módulo é nula (ausente, truncada ou num
// formato desconhecido, HU-T11-1), e a linha de condição avisa embaixo do título.
export function mundoDoEstado(est) {
  const casos = est != null ? RECEITAS[`T11/${est}`]?.casos : null
  if (!casos?.length) return null
  return {
    par: parDoCaso(casos[0]),
    divergem: casos.flatMap((c) => divergentesDoCaso(M.casos[c])),
    naoReconhecidos: casos.filter((c) => c === CASO_INDICE && M.casos[c]?.posicao != null).length,
    versaoIlegivel: casos.some((c) => M.casos[c] && 'versaoLida' in M.casos[c] && M.casos[c].versaoLida == null),
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
  return mesmoPar(par, parDoCaso(CASO_DIFF)) ? divergentesDoCaso(M.casos[CASO_DIFF]) : []
}

// O arraste (HU-T11-4, a última entrega · T11/04): corrigir um bloco regrava os
// que dependem dele, na ordem da cadeia (M.cadeia.arraste). A legenda mostra o
// arraste quando a correção leva junto um bloco que confere — corrigir regrava
// mais do que o que diverge: o primeiro bloco que diverge e arrasta um desses, e
// tudo o que ele arrasta. Com os cinco divergindo (a 00), nada a mais: sem legenda.
export function arrasteDe(divergem) {
  const bloco = BLOCOS.find((b) => divergem.includes(b) && (arraste[b] ?? []).some((x) => !divergem.includes(x)))
  return bloco ? { bloco, levados: BLOCOS.filter((x) => arraste[bloco].includes(x)) } : null
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
// sem fio não tem texto aprovado e fica sem valor (G25). A tradução é o nome
// dela no modelo, como a T11/02 escreve (urbano v3, a última entrega); o
// "tradução frota v2" dos outros quadros é a frase do caso.
export function cadastroDo(par, sessao) {
  if (mesmoPar(par, parDoCaso(CASO_DIFF))) {
    return Object.fromEntries(M.casos[CASO_DIFF].divergencias.map((d) => [d.bloco, d.noCadastro]))
  }
  const ativo = ativoDe(par.ativoId)
  const modelo = M.modelosAtivo.find((m) => m.id === ativo?.modeloAtivoId)
  const preset = M.presetsEvento.find((p) => p.id === modelo?.presetEventoId)
  return {
    ativo: modelo ? modelo.traducaoCan : null,
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
