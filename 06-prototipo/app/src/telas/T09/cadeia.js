// T09 · a cadeia lida do mock (M.cadeia): a ordem canônica dos seis passos, o
// rótulo de cada um, a versão de cada bloco versionável, e os dois casos que
// param a cadeia (bloco-recusado, queda-na-cadeia). Nada de número digitado:
// as contagens dos textos saem da ordem.
import { M } from '../../dados/mock.js'
import { ESTADOS } from '../../ds/index.js'
import { T } from './textos.js'

export const REF = {
  recusado: '01-estado-bloco-recusado',
  queda: '02-estado-queda-na-cadeia',
  recuperacao: '03-estado-recuperacao-ate-a-conexao-gravar',
  concluida: '04-momento-cadeia-concluida',
}
export const CASO_RECUSA = 'bloco-recusado'
export const CASO_QUEDA = 'queda-na-cadeia'

const { ordem: ORDEM, rotulos, versoes } = M.cadeia
export { ORDEM }
export const TOTAL = ORDEM.length
// a Conexão é o bloco que segura a saída (HU-T09-9, G23)
export const CONEXAO = 'conexao'
export const rotuloDe = (bloco) => rotulos[bloco]
export const placaDe = (ativoId) => M.ativos.find((a) => a.id === ativoId)?.placa

// o quadro que a 00 desenha: Limpeza, Ativo e Cercas relidos, o Leitor gravando
export const QUADRO_00 = ORDEM.indexOf('leitor')

// o par módulo × ativo de um caso
export const parDoCaso = (casoId) => ({ ativoId: M.casos[casoId].ativoId, moduloSerial: M.casos[casoId].moduloSerial })

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

// a string posicional das versões relidas (HU-T09-8), na ordem canônica:
// A12.G07.L02.E05.C03 com os seis confirmados. A limpeza não tem versão.
export function versaoGravada(confirmados) {
  return ORDEM.slice(0, confirmados).filter((b) => versoes[b]).map((b) => versoes[b]).join('.')
}

// o valor do bloco confirmado: a versão relida, ou "feita" no que não tem versão
const valorFeito = (b) => versoes[b] ?? T.feita
// o nome pro leitor de tela segue o estado do dado (G15): o traço dos que ainda
// vão gravar diz "ainda não", não "não se aplica"; e o bloco em que a cadeia
// pausou diz "parou", seja o sem-sinal da queda (02, 03), seja a pausa de quem
// tentou sair (o valor é "pausado" nos dois), como o passo parado da T03
const AINDA_NAO = ESTADOS.espera.nome
const PAROU = ESTADOS.pausa.nome

// os seis elos do quadro, na ordem canônica. `fluxo`: { confirmados, fase, parou }
//   gravando    · os confirmados, o que corre (o quadrado de agora) e os que esperam, com a versão apagada (00)
//   recusado    · os confirmados, o recusado com a causa e os não alcançados (01)
//   pausado     · os confirmados, o que parou e os pendentes em traço (02)
//   recuperacao · o mesmo quadro parado, com a saída presa até a Conexão (03)
//   concluida   · os seis relidos (04)
export function elosDo({ confirmados: k, fase, parou }) {
  return ORDEM.map((b, i) => {
    const base = { nome: rotulos[b], descricao: T.descricao[b] }
    if (i < k) return { ...base, estado: 'ok', valor: valorFeito(b) }
    if (fase === 'gravando') return i === k ? { ...base, estado: 'agora', valor: T.gravando } : { ...base, estado: 'espera', valor: versoes[b] }
    if (i === k) {
      if (parou === 'recusa') return { ...base, estado: 'xis', valor: T.recusado, descricao: T.causa[b] ?? null }
      // o link caiu (02, 03) · ou o técnico tentou sair no meio (a recuperação no fluxo, G25)
      return { ...base, estado: parou === 'queda' ? 'sem-sinal-neutro' : 'pausa', valor: T.pausado, nomeGlifo: PAROU }
    }
    if (fase === 'recusado') return { nome: rotulos[b], estado: 'traco', descricao: T.naoAlcancado, nomeGlifo: AINDA_NAO }
    return { ...base, estado: 'traco', valor: T.pendente, nomeGlifo: AINDA_NAO }
  })
}
