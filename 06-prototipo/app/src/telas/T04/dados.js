// O que a T04 lê do mock e do estado único — funções puras, sem texto de
// interface além do que o textos.md traz com o dado dentro. Nenhum número
// digitado: toda contagem sai de M (G8, G9).
import { M } from '../../dados/mock.js'
import { caixaAlta, pacotePassouDoBloqueio } from '../../dados/formato.js'
import { filaDoMundo } from '../../estado/fila.js'

// os nomes das referências (02-telas/T04-menu/referencias)
export const REF = {
  semModulo: '01-momento-sem-modulo',
  semAtivo: '02-momento-modulo-sem-ativo',
  falha: '03-estado-faixa-modulo-com-falha',
  checklist: '04-estado-checklist-pendente',
  conta: '05-momento-folha-conta',
  sair: '06-momento-folha-conta-sair-com-sessao-aberta',
  garagem: '07-momento-folha-trocar-de-garagem',
  envio: '08-estado-folha-trocar-de-garagem-envio-em-andamento',
  trocar: '09-estado-folha-trocar-de-garagem-com-modulo-conectado',
  modulo: '10-momento-folha-modulo-conectado',
  ativo: '11-momento-folha-ativo-da-sessao',
  acesso: '12-estado-acesso-vencendo',
}

// o que está por cima do menu em cada referência: a folha da conta, o
// diálogo de sair, a folha da garagem, o diálogo de trocar, e as folhas do
// módulo e do ativo que a sessão prendeu (HU-T16-2)
export const SOBRE = {
  [REF.conta]: 'conta', [REF.sair]: 'sair', [REF.garagem]: 'garagem',
  [REF.envio]: 'garagem', [REF.trocar]: 'trocar',
  [REF.modulo]: 'modulo', [REF.ativo]: 'ativo',
}
export const MOMENTO_DA_FOLHA = { conta: REF.conta, sair: REF.sair, garagem: REF.garagem, modulo: REF.modulo, ativo: REF.ativo }
// as folhas sobem do pé (os diálogos, não); as do módulo e do ativo abrem
// embaixo da faixa, que fica acesa em cima do véu (T04/10, 11)
export const FOLHAS = ['conta', 'garagem', 'modulo', 'ativo']
export const SOB_A_FAIXA = ['modulo', 'ativo']

const ativo = (id) => M.ativos.find((a) => a.id === id)
export const placaDe = (id) => ativo(id)?.placa
export const uoDe = (id) => M.uos.find((u) => u.id === id)

// O que a sessão prendeu, pro cartão da folha (T04/10, 11): a identidade e as
// linhas do detalhe, do mock. As palavras em volta do dado (firmware, frota,
// chassi) são as do textos.md.
// o módulo: 'VL06 · CAN-BT · firmware 2.3.5'
export function moduloPreso(serial) {
  const m = M.modulos.find((x) => x.serial === serial)
  if (!m) return { identidade: serial, detalhes: [] }
  const modelo = M.modelos.find((x) => x.id === m.modeloId)
  return { identidade: serial, detalhes: [`${modelo.nome} · ${m.variante} · firmware ${m.firmware}`] }
}
// o ativo: 'frota 1003 · Ônibus urbano OF-1621' e 'chassi 9BM384067GB120401'
export function ativoPreso(id) {
  const a = ativo(id)
  if (!a) return { identidade: undefined, detalhes: [] }
  const modelo = M.modelosAtivo.find((x) => x.id === a.modeloAtivoId)
  return { identidade: a.placa, detalhes: [`frota ${a.frota} · ${modelo.nome}`, `chassi ${a.chassi}`] }
}

// as iniciais do técnico: a primeira letra do primeiro e do último nome
export function iniciais(nome) {
  const p = nome.trim().split(/\s+/)
  return caixaAlta(p[0][0] + (p.length > 1 ? p[p.length - 1][0] : ''))
}

// a fila inteira: a do mock mais o que a sessão criou (estado único)
// — e o erro que o técnico reenviou na T15 já de volta na fila (estado/fila.js)
export const filaToda = (unico) => filaDoMundo(unico)

// T04·1 (b) · o contador do menu: o que ainda não chegou, só da garagem ativa
export function pendentesDaGaragem(fila, uoId) {
  return fila.filter((f) => f.estado !== 'recebida' && ativo(f.ativoId)?.uoId === uoId).length
}
// T04·1 (b) · o diálogo de sair: o que está na fila, de todas as garagens
export const naFila = (fila) => fila.filter((f) => f.estado === 'na-fila').length
// o que está subindo agora (T04/08)
export const enviando = (fila) => fila.filter((f) => f.estado === 'enviando').length

// T04·2 (b) · o contador do checklist: os itens que o técnico resolve na mão
// ou no veículo (as seções manuais e a dinâmica — B e E, a conta da T13/00)
export function checklistPendentes(etapa) {
  if (etapa?.homologada) return 0
  const secoes = new Set(M.checklist.secoes.filter((s) => s.natureza === 'manual' || s.natureza === 'dinamico').map((s) => s.id))
  return M.checklist.itens.filter((i) => secoes.has(i.secao)).length
}

// o prazo da sessão de acesso (M.situacao.sessaoAcesso): o que resta de quanto
export function prazoDoAcesso(acesso) {
  return { restam: acesso.validadeDias - acesso.abertaDiasAtras, total: acesso.validadeDias }
}
// o aviso do acesso vencendo (T04/12): do dia do aviso (avisoNoDia) até o
// último dia da validade, o que resta; fora disso, nada (null)
export function avisoDoAcesso(acesso) {
  const noAviso = acesso.abertaDiasAtras >= acesso.avisoNoDia && acesso.abertaDiasAtras < acesso.validadeDias
  return noAviso ? prazoDoAcesso(acesso) : null
}

// as garagens da folha, cada uma com o pacote dela (M.pacotes): a idade, se
// passou do limite e quantos ativos ele traz. A idade deriva na tela, pelos
// limiares do próprio pacote (mocks.js · pacote de sincronização).
export function garagens() {
  return M.uos.map((uo) => {
    const p = M.pacotes.find((x) => x.uoId === uo.id)
    const limite = p.limiares.bloqueioDias
    const idade = p.diasAtras === 1 ? `carregado ontem, ${p.hora}` : `carregado há ${p.diasAtras} dias`
    const vencida = pacotePassouDoBloqueio(p) // a mesma regra da T02 (C4 · T02·6)
    return { id: uo.id, nome: uo.nome, ativos: p.contem.ativos, vencida, pacote: vencida ? `${idade} · o limite é ${limite}` : idade }
  })
}
