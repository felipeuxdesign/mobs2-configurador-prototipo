// T14 · os textos exatos (02-telas/T14-ciclo-dinamico/textos.md). Onde o texto
// traz um dado — a contagem, a fila do módulo, o prazo, a hora, o lido e o
// esperado do cartão —, ele é montado do mock na hora e confere com o textos.md
// (G1, G8). A frase da causa ('ligue o motor') é texto; o lido ('0 rpm') é do
// caso motor-desligado-no-ciclo (T14/03, decisão 54).
import { minSeg } from '../../dados/formato.js'

// o que o técnico faz pra o passo reprovado passar, pelo `passo` do caso (T14/03)
const O_QUE_FAZER = { rotacao: 'ligue o motor' }

export const T = {
  titulo: 'Ciclo de testes',
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
  // a frase do prazo estourado, numa linha (o pacote 2: T14/02)
  secaoF: 'A Seção F reprova · os passos continuam valendo.',
  // o bloco do evento
  evento: 'EVENTO DE TESTE',
  disparado: 'disparado pelo app',
  recebido: 'recebido no servidor',
  naoChegou: 'não chegou',
  campos: 'campos conferidos',
  conferidos: (campos) => `${campos} de ${campos}`,
  // os passos: a causa do passo que o motor desligado reprova, e o teste do cartão
  causaDoPasso: (caso) => `${caso.lido} · ${O_QUE_FAZER[caso.passo]}`,
  cartao: 'Cartão do motorista',
  leu: (cartao) => `leu ${cartao.lido} · o cadastro espera ${cartao.esperado}`,
  // o passo da vez (o pacote 6): a ação do técnico, pela chave do passo; o que não tem
  // texto aprovado (a velocidade do tacógrafo) fica só com o quadrado (G25)
  acao: { 're acionada': 'engate a ré', 'porta aberta': 'abra a porta', 'cartao do motorista': 'passe o cartão', 'ignicao desligada': 'desligue a ignição' },
  // o rodapé
  aguardandoEvento: 'Aguardando o evento',
  disparar: 'Disparar evento de teste',
  dispararOutro: 'Disparar outro evento',
  encerrarCiclo: 'Encerrar o ciclo',
  irAoChecklist: 'Ir para o checklist',
  voltarAoChecklist: 'Voltar ao checklist',
  voltarAoMenu: 'Voltar ao menu',
  solicitar: 'Solicitar correção de cadastro',
  solicitada: (hora) => `Correção solicitada às ${hora}`,
}
