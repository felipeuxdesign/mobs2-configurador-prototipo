// O que a T04 lê do mock e do estado único — funções puras, sem texto de
// interface além do que o textos.md traz com o dado dentro. Nenhum número
// digitado: toda contagem sai de M (G8, G9).
import { M } from '../../dados/mock.js'
import { caixaAlta, pacotePassouDoBloqueio, idadeNaLinhaDaGaragem } from '../../dados/formato.js'
import { filaDoMundo } from '../../estado/fila.js'
import { garagemDe } from '../../dados/garagens.js'

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
  encerrar: '13-momento-encerrar-antes-de-homologar',
  empresa: '14-estado-folha-trocar-de-unidade-com-empresa',
}

// o que está por cima do menu em cada referência: a folha da conta, o
// diálogo de sair, a folha da unidade (também a com o Trocar de empresa, 14),
// o diálogo de trocar, as folhas do módulo e do ativo que a sessão prendeu
// (HU-T16-2) e o diálogo do ENCERRAR antes de homologar (13, decisão 36)
export const SOBRE = {
  [REF.conta]: 'conta', [REF.sair]: 'sair', [REF.garagem]: 'garagem',
  [REF.envio]: 'garagem', [REF.trocar]: 'trocar', [REF.empresa]: 'garagem',
  [REF.modulo]: 'modulo', [REF.ativo]: 'ativo', [REF.encerrar]: 'encerrar',
}
export const MOMENTO_DA_FOLHA = { conta: REF.conta, sair: REF.sair, garagem: REF.garagem, modulo: REF.modulo, ativo: REF.ativo, encerrar: REF.encerrar }
// as folhas sobem do pé (os diálogos, não); as do módulo e do ativo abrem
// embaixo da faixa, que fica acesa em cima do véu (T04/10, 11)
export const FOLHAS = ['conta', 'garagem', 'modulo', 'ativo']
export const SOB_A_FAIXA = ['modulo', 'ativo']

const ativo = (id) => M.ativos.find((a) => a.id === id)
export const placaDe = (id) => ativo(id)?.placa
// a garagem do contexto: também a que só o caso da lista longa tem, depois de o
// técnico sincronizar o pacote dela (a T02 e a T03, a otimização do design)
export const uoDe = garagemDe

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
  // a T13 grava a conta a cada item resolvido (etapas.checklist.pendentes); sem ela, os itens de B e E
  if (etapa?.pendentes != null) return etapa.pendentes
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
// limiares do próprio pacote (mocks.js · pacote de sincronização). A vencida
// diz só a causa, como na T02 e pela mesma função: "pacote vencido há 8 dias",
// sem o limite e sem a ação (a entrega do checklist, T04/07 e 08)
export function garagens() {
  return M.uos.map((uo) => {
    const p = M.pacotes.find((x) => x.uoId === uo.id)
    const idade = p.diasAtras === 1 ? `carregado ontem, ${p.hora}` : `carregado há ${p.diasAtras} dias`
    const vencida = pacotePassouDoBloqueio(p) // a mesma regra da T02 (C4 · T02·6)
    return { id: uo.id, nome: uo.nome, ativos: p.contem.ativos, vencida,
      pacote: vencida ? idadeNaLinhaDaGaragem(p.diasAtras, p.hora, p.limiares.bloqueioDias) : idade }
  })
}

// A empresa antes da unidade (decisão 37, logica.md · A empresa e a unidade):
// com mais de uma empresa (o caso varias-empresas), a folha de trocar de
// unidade tem o Trocar de empresa no fim (T04/14). O mundo do caso só existe
// no estado da coluna: nada no mock dá ao herói mais de uma empresa no fluxo
// (como na T02, T02/empresas.js), e o 14 abre pela coluna e pelo endereço,
// parado e sem toque. O que o toque faz se prova no node, nestas funções, as
// mesmas que a tela usa (scripts/testar-trocar-empresa.mjs).
export const CASO_EMPRESAS = 'varias-empresas'
export function temVariasEmpresas(unico, est) {
  const doCaso = Boolean(M.casos[CASO_EMPRESAS]?.empresas?.length > 1)
  return est ? est === REF.empresa && doCaso : false
}

// Trocar, de unidade ou de empresa: o alvo do diálogo de trocar (o 09) é
// { uoId } ou { empresa: true }. Com a sessão aberta, a mesma confirmação (a
// sessão encerra antes, sem homologar · HU-T02-3); sem ela, direto pro destino.
//   de unidade · a sincronização da unidade nova (T03)
//   de empresa · a T02, que com mais de uma empresa abre na lista delas (T02/05,
//                a ordem: 05 → 06 → 01), sem unidade no contexto
export const TROCA_DE_EMPRESA = { empresa: true }
export function destinoDaTroca(alvo) {
  return alvo.empresa
    ? { tela: 'T02', contexto: { uoId: null, pacote: null } }
    : { tela: 'T03', contexto: { uoId: alvo.uoId, pacote: null } }
}
// o toque: com a sessão aberta, o diálogo (confirma); sem ela, o destino (vai)
export const depoisDoTrocar = (sessao, alvo) => (sessao ? { confirma: alvo } : { vai: destinoDaTroca(alvo) })
