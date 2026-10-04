// O que a T15 lê do mock e do estado único — funções puras. Nenhum número,
// placa ou hora digitado: tudo sai de M (G8, G9) e do relógio do protótipo,
// M.HORA_NOMINAL, por aritmética de minutos (sem Date nem Intl).
import { M } from '../../dados/mock.js'
import { decimal } from '../../dados/formato.js'
import { RECEITAS } from '../../estado/receitas.js'
import { comoEsta, itemDeCorrecao } from '../../estado/fila.js'
import { T } from './textos.js'

// os nomes das referências (02-telas/T15-fila-de-saida/referencias)
export const REF = {
  semErro: '01-estado-sem-erro',
  doisErros: '02-estado-dois-erros',
  vazia: '03-estado-fila-vazia',
  secaoF: '04-estado-secao-f-em-re-checagem',
  correcao: '05-estado-correcao-na-fila',
}

// G21 · a semente da 00: a seleção [f-10, f-02, f-08] — a fila do aparelho na
// semente, com a recusa do servidor. A fila é do aparelho, e não da unidade
// (decisão 42, HU-T01-4): os itens podem ser de qualquer unidade, e a faixa e o
// contexto são os da semente (a Várzea do herói) sem contradição — o T15-A2
// fechou. Mora aqui porque o sementes.js não é deste ciclo de tela; o gate
// confere que ela é a fila da uo-02 (P·C11 · T15), que é de onde os três vêm.
export const SELECAO_DA_SEMENTE = ['f-10', 'f-02', 'f-08']

const itemDoMock = (id) => M.filaSaida.find((f) => f.id === id)
const ativo = (id) => M.ativos.find((a) => a.id === id)
export const placaDe = (id) => ativo(id)?.placa
// AC-14 · o rótulo curto do tipo (tiposFila); o tipo sem rótulo curto fica como vem
export const rotuloCurto = (tipo) => M.tiposFila?.find((t) => t.tipo === tipo)?.rotuloCurto ?? tipo

// O quadro de cada estado da coluna, pela receita (receitas.js): o recorte do
// caso (o aditivo fila-sem-erro e fila-dois-erros; o fila-vazia, do design desde
// a última entrega, com o 14:02) e, quando a receita traz a secaoF, a Seção F em
// re-checagem. O 04 é a tela do 03 mais a Seção F (T15/04: 'Nada esperando
// envio' e a re-checagem). O recorte aparece inteiro, e não só o topo que a
// referência mostra (decisão 42): no 01, os cinco itens.
export function quadroDoEstado(est) {
  const r = RECEITAS[`T15/${est}`]
  if (!r) return null
  // o 05 (o pacote 12): a fila do 01 com o pedido de correção do caso identificador-divergente,
  // criado na hora do pedido (correcaoSolicitada) — no topo da lista, o mais novo
  if (est === REF.correcao) {
    const c = M.casos[r.casos[0]]
    const base = M.casos['fila-sem-erro'].itens.map(itemDoMock)
    return { itens: [...base, itemDeCorrecao(c.ativoId, c.correcaoSolicitada)], ultimoEnvioAs: null, semSessao: false, secaoF: null }
  }
  const comSecaoF = (r.dados ?? []).includes('secaoF')
  const caso = M.casos[r.aditivo ?? r.casos?.[0]]
  if (!caso) return null
  return {
    itens: caso.itens.map(itemDoMock),
    ultimoEnvioAs: caso.ultimoEnvioAs ?? null,
    semSessao: caso.sessao === null,
    secaoF: comSecaoF && M.secaoF?.emRecheck ? M.secaoF : null,
  }
}

// No fluxo, a fila que a tela mostra: a do aparelho (decisão 42) — a seleção da
// semente mais tudo o que a sessão criou (estado único, `fila`), de qualquer
// unidade, cada item como está: o erro que o técnico reenviou volta pra fila
// (estado/fila.js, `reenviados`). A Seção F não aparece: a 00 não a desenha, e
// ela entra pela coluna (04).
export function quadroDoFluxo(unico) {
  const itens = [...SELECAO_DA_SEMENTE.map(itemDoMock), ...(unico.fila ?? [])].map((f) => comoEsta(f, unico.reenviados))
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

// o dia do item de mais de um dia, do `data` do mock (AAAA-MM-DD), sem Date:
// o f-08, de 2 dias, é '10/03' (a resposta do arquiteto de 26/09)
const diaMes = (data) => { const [, mes, dia] = data.split('-'); return { dia, mes } }
// a linha da lista: o que é, de quem e em que pé está, e quando — recebido
// hoje, a hora; ontem, 'ontem' com a hora; antes, o dia e a hora ('10/03, 10:05')
export function linhaDaLista(f) {
  const placa = placaDe(f.ativoId)
  if (f.estado === 'recebida') {
    const dias = diasDe(f)
    const quando = dias === 0 ? confirmadoDe(f) : dias === 1 ? T.ontem(confirmadoDe(f))
      : f.data ? T.naData(diaMes(f.data), confirmadoDe(f)) : T.haDias(dias)
    return { estado: 'ok', nomeGlifo: 'feito', titulo: rotuloCurto(f.tipo), legenda: T.recebida(placa), quando }
  }
  // na fila: há quanto tempo está parado, de criadoAs até as 14:30 (mocks.js · fila de saída)
  const parado = minutos(M.HORA_NOMINAL) - minutos(criadoDe(f))
  const quando = diasDe(f) === 0 ? (parado === 0 ? T.agora : T.haMin(parado)) : T.haDias(diasDe(f))
  return { estado: 'espera', titulo: rotuloCurto(f.tipo), legenda: T.naFila(placa), quando }
}

// a Seção F em re-checagem (04): o ativo, o que falta e a janela (AC-15)
export function linhaDaRechecagem(secaoF) {
  return { titulo: placaDe(secaoF.ativoId), legenda: T.recebimentoPendente, prazo: T.confereEm(M.criteriosRegra.recheckHoras) }
}
