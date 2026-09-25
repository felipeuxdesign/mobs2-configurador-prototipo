// T16 · as legendas do encerramento no caminho do corte (a entrega do design de
// 25/09): na sessão do KNB-5H39 · M2C-0371, que não reinicia por comando, o
// passo 2 pede o corte com a legenda dele (T16·1, T16·7), e depois cada passo
// que corre diz o que faz, um a cada 600 ms (encerramentoPassoMs), até a Sessão
// encerrada. O herói, que reinicia por comando, está no heroi.mjs. O 01 se
// alcança pelo endereço do momento (G20).
const LEGENDA = {
  corte: 'Desligue e ligue a alimentação do módulo. Ele volta sozinho em alguns segundos.',
  releitura: 'Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício.',
  repouso: 'Devolve o módulo ao repouso que ele tinha antes da sessão.',
  canal: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.',
  registro: 'Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação.',
  desconexao: 'Solta o Bluetooth. O módulo fica livre pra outro aparelho.',
}
export default [
  { abre: '?tela=T16&momento=01-momento-pede-o-corte-de-alimentacao' },
  { chega: 'T16', momento: '01-momento-pede-o-corte-de-alimentacao' },
  // o passo 2 é com o técnico: a legenda do corte, e o primário esperando o módulo
  { ve: LEGENDA.corte, ms: 500 },
  { ve: 'é com você' },
  { ve: 'KNB-5H39' },
  { desligado: 'Aguardando o módulo voltar' },
  { tecla: 'Escape' },   // no encerramento, o voltar não faz nada
  // o módulo volta sozinho no ritmo do passo: a releitura corre, com a legenda dela
  { chega: 'T16', momento: null, entre: [0, 1000] },
  { ve: LEGENDA.releitura },
  { naoVe: LEGENDA.corte },
  { desligado: 'Encerrando · não desconecte' },
  // o 4 ao 7, cada um com a sua, um a cada 600 ms
  { ve: LEGENDA.repouso, entre: [300, 1000] },
  { naoVe: LEGENDA.releitura },
  { ve: LEGENDA.canal, entre: [300, 1000] },
  { ve: LEGENDA.registro, entre: [300, 1000] },
  { ve: LEGENDA.desconexao, entre: [300, 1000] },
  // fechado o sétimo, a Sessão encerrada, sem legenda de passo nenhum
  { chega: 'T16', momento: '02-momento-sessao-encerrada', entre: [300, 1000] },
  { ve: 'Sessão encerrada' },
  { naoVe: LEGENDA.desconexao },
  { ve: 'Sem sessão de configuração' },
]
