// O que a T15 lê do mock e do estado único — funções puras. Nenhum número,
// placa ou hora digitado: tudo sai de M (G8, G9) e do relógio do protótipo,
// M.HORA_NOMINAL, por aritmética de minutos (sem Date nem Intl).
import { M } from '../../dados/mock.js'
import { decimal } from '../../dados/formato.js'
import { RECEITAS } from '../../estado/receitas.js'
import { comoEsta } from '../../estado/fila.js'
import { T } from './textos.js'

// os nomes das referências (02-telas/T15-fila-de-saida/referencias)
export const REF = {
  semErro: '01-estado-sem-erro',
  doisErros: '02-estado-dois-erros',
  vazia: '03-estado-fila-vazia',
  secaoF: '04-estado-secao-f-em-re-checagem',
}

// G21 · a semente da 00: a seleção [f-10, f-02, f-08] — a fila inteira da
// Ibura, com a recusa do servidor. Mora aqui porque o sementes.js não é deste
// ciclo de tela; o gate confere que ela é a fila da uo-02 (P·C11 · T15). A
// faixa e o contexto são os da semente (a Várzea do herói): a mistura é o
// T15-A2, com o diretor.
export const SELECAO_DA_SEMENTE = ['f-10', 'f-02', 'f-08']

const itemDoMock = (id) => M.filaSaida.find((f) => f.id === id)
const ativo = (id) => M.ativos.find((a) => a.id === id)
export const placaDe = (id) => ativo(id)?.placa
// AC-14 · o rótulo curto do tipo (tiposFila); o tipo sem rótulo curto fica como vem
export const rotuloCurto = (tipo) => M.tiposFila?.find((t) => t.tipo === tipo)?.rotuloCurto ?? tipo

// O quadro de cada estado da coluna, pela receita (receitas.js): o recorte do
// caso aditivo (fila-sem-erro, fila-dois-erros, fila-vazia) e, quando a
// receita traz a secaoF, a Seção F em re-checagem. O 04 é a tela do 03 mais a
// Seção F (T15/04: 'Nada esperando envio' e a re-checagem): a receita dele diz
// só `secaoF`, e a fila é a vazia do 03.
export function quadroDoEstado(est) {
  const r = RECEITAS[`T15/${est}`]
  if (!r) return null
  const comSecaoF = (r.dados ?? []).includes('secaoF')
  const caso = M.casos[r.aditivo ?? (comSecaoF ? 'fila-vazia' : null)]
  if (!caso) return null
  return {
    itens: caso.itens.map(itemDoMock),
    ultimoEnvioAs: caso.ultimoEnvioAs ?? null,
    semSessao: caso.sessao === null,
    secaoF: comSecaoF && M.secaoF?.emRecheck ? M.secaoF : null,
  }
}

// No fluxo, a fila que a tela mostra: a seleção da semente mais o que a sessão
// criou (estado único, `fila`) na garagem ativa, cada item como está — o erro
// que o técnico reenviou volta pra fila (estado/fila.js, `reenviados`). A
// Seção F não aparece: a 00 não a desenha, e ela entra pela coluna (04).
export function quadroDoFluxo(unico) {
  const uo = unico.contexto.uoId ?? M.contextoAtivo.uoId
  const daSessao = (unico.fila ?? []).filter((f) => ativo(f.ativoId)?.uoId === uo)
  const itens = [...SELECAO_DA_SEMENTE.map(itemDoMock), ...daSessao].map((f) => comoEsta(f, unico.reenviados))
  return { itens, ultimoEnvioAs: null, semSessao: false, secaoF: null }
}

// Os três grupos da tela: os erros vão pro cartão do topo — a recusa, que
// pede a mão do técnico, antes do erro de rede, que reenvia sozinho (02); sem
// erro, o cartão leva o que sobe agora (01); a lista embaixo leva o que está
// na fila e depois o que já foi recebido, do mais novo pro mais velho. O
// contador conta todos os itens mostrados, pendentes e recebidos (T15·2 a).
const ORDEM_DO_ERRO = { 'erro-recusa': 0, 'erro-rede': 1 }
const minutos = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m }
// o mais novo primeiro: menos dias atrás e, no mesmo dia, a hora mais tarde — a de
// entrar na fila, pra quem espera, e a de confirmação, pra quem foi recebido
// (o item que a sessão criou nasce hoje, às 14:30, se não disser outra coisa)
const diasDe = (f) => f.diasAtras ?? 0
const criadoDe = (f) => f.criadoAs ?? M.HORA_NOMINAL
const confirmadoDe = (f) => f.confirmadoAs ?? M.HORA_NOMINAL
const maisNovo = (a, b) => (diasDe(a.f) - diasDe(b.f)) || (minutos(b.hora) - minutos(a.hora))
export function grupos(itens) {
  const erros = itens.filter((f) => f.estado in ORDEM_DO_ERRO).sort((a, b) => ORDEM_DO_ERRO[a.estado] - ORDEM_DO_ERRO[b.estado])
  const enviando = itens.find((f) => f.estado === 'enviando') ?? null
  const comHora = (f, hora) => ({ f, hora })
  const naFila = itens.filter((f) => f.estado === 'na-fila').map((f) => comHora(f, criadoDe(f))).sort(maisNovo)
  const recebidas = itens.filter((f) => f.estado === 'recebida').map((f) => comHora(f, confirmadoDe(f))).sort(maisNovo)
  return { total: itens.length, erros, enviando, lista: [...naFila, ...recebidas].map((x) => x.f) }
}

// o título de um item: o rótulo curto e a placa ('Evidências · KJC-7N23')
export const tituloDoItem = (f) => `${rotuloCurto(f.tipo)}${T.entre}${placaDe(f.ativoId)}`

// T15·1 (a) · a causa da recusa: o prefixo só com mais de um erro no cartão (estados.md)
export const causaDaRecusa = (f, nErros) => (nErros > 1 ? T.recusou(f.motivo) : f.motivo)
export const causaDaRede = (f) => T.semRede(f.tentativas, f.proximaTentativaAs)

// o item que sobe agora: o progresso e o tamanho, com a vírgula sem Intl
export const tamanhoDoEnvio = (f) => T.deTamanho(decimal(f.tamanhoMb, 1))

// a linha da lista: o que é, de quem e em que pé está, e quando
export function linhaDaLista(f) {
  const placa = placaDe(f.ativoId)
  if (f.estado === 'recebida') {
    const dias = diasDe(f)
    const quando = dias === 0 ? confirmadoDe(f) : dias === 1 ? T.ontem(confirmadoDe(f)) : T.haDias(dias)
    return { estado: 'ok', nomeGlifo: 'feito', titulo: rotuloCurto(f.tipo), legenda: T.recebida(placa), quando }
  }
  // na fila: há quanto tempo está parado, de criadoAs até as 14:30 (mocks.js · fila de saída)
  const quando = diasDe(f) === 0 ? T.haMin(minutos(M.HORA_NOMINAL) - minutos(criadoDe(f))) : T.haDias(diasDe(f))
  return { estado: 'espera', titulo: rotuloCurto(f.tipo), legenda: T.naFila(placa), quando }
}

// a Seção F em re-checagem (04): o ativo, o que falta e a janela (AC-15)
export function linhaDaRechecagem(secaoF) {
  return { titulo: placaDe(secaoF.ativoId), legenda: T.recebimentoPendente, prazo: T.confereEm(M.criteriosRegra.recheckHoras) }
}
