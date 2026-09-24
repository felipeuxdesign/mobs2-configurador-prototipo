// T14 · os textos exatos (02-telas/T14-ciclo-dinamico/textos.md). Onde o texto
// traz um dado — a contagem, a fila do módulo, o prazo, a hora, o lido e o
// esperado do cartão —, ele é montado do mock na hora e confere com o textos.md
// (G1, G8). A frase da causa ('devia passar de zero') é texto, não o `esperado`
// escrito no caso can-fora-esperado (T14-A8, G9).
import { minSeg, porExtenso } from '../../dados/formato.js'

// o que cada sinal dinâmico devia fazer, na causa do passo reprovado (T14/03)
const DEVIA = { velocidade: 'devia passar de zero' }

export const T = {
  titulo: 'Ciclo dinâmico',
  encerrar: 'ENCERRAR',
  dePassos: (total) => `de ${total} passos`,
  // o prazo do evento
  prazo: 'PRAZO DO EVENTO',
  chegouEm: 'O EVENTO CHEGOU EM',
  filaDrenando: 'FILA DRENANDO',
  filaDrenada: 'FILA DRENADA',
  limite: (seg) => `limite ${minSeg(seg)}`,
  disparadoAs: (hora) => `disparado ${hora}`,
  filaSaindo: (fila) => `${fila.mensagens} mensagens e ${fila.diagnostico} de diagnóstico saindo do módulo`,
  secaoF: 'A Seção F reprova.',
  continuamValendo: (passos) => `Os ${porExtenso(passos)} passos do veículo continuam valendo.`,
  // o bloco do evento
  evento: 'EVENTO DE TESTE',
  disparado: 'disparado pelo app',
  recebido: 'recebido no servidor',
  naoChegou: 'não chegou',
  campos: 'campos conferidos',
  conferidos: (campos) => `${campos} de ${campos}`,
  // os passos: a causa do sinal fora do esperado, e o teste do cartão
  causaDoSinal: (caso) => `${caso.sinal} ${caso.lido} · ${DEVIA[caso.sinal]}`,
  cartao: 'Cartão do motorista',
  leu: (cartao) => `leu ${cartao.lido} · o cadastro espera ${cartao.esperado}`,
  // o rodapé
  esperaFila: 'Espera a fila do módulo drenar',
  disparar: 'Disparar evento de teste',
  dispararOutro: 'Disparar outro evento',
  encerrarCiclo: 'Encerrar o ciclo',
  irAoChecklist: 'Ir para o checklist',
  voltarAoChecklist: 'Voltar ao checklist',
  voltarAoMenu: 'Voltar ao menu',
  solicitar: 'Solicitar correção de cadastro',
  solicitada: (hora) => `Correção solicitada às ${hora}`,
}
