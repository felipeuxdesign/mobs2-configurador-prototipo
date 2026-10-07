// T16 · as legendas do encerramento (a entrega do design de 25/09 · a rodada 1 do retorno do PM:
// o reinício é automático, nunca pede o corte). Na sessão do herói, cada passo que corre diz o que
// faz, um a cada 600 ms (encerramentoPassoMs), até a Sessão encerrada: o 2, o reinício, diz
// *reiniciando* com a legenda dele, e o primário *Reiniciando o módulo…*. O 01 e o 08 se alcançam
// pelo endereço do momento (G20), parados, no par que a referência desenha (KNB-5H39 · M2C-0371):
// o reinício, e a conexão que caiu no meio dele, que o app reconecta sozinho.
const LEGENDA = {
  contadores: 'Grava os contadores e o estado no módulo, pra nada se perder no reinício.',
  reinicio: 'O módulo reinicia sozinho. Leva alguns segundos.',
  reconectando: 'A conexão caiu no reinício. O app reconecta sozinho.',
  releitura: 'Ele lê de volta a configuração que está no módulo. É isto que prova que ela sobreviveu ao reinício.',
  repouso: 'Devolve o módulo ao repouso que ele tinha antes da sessão.',
  canal: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.',
  registro: 'Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação.',
  desconexao: 'Solta o Bluetooth. O módulo fica livre pra outro aparelho.',
}
export default [
  // o 01 pelo endereço: o reinício, parado
  { abre: '?tela=T16&momento=01-momento-reiniciando-o-modulo' },
  { chega: 'T16', momento: '01-momento-reiniciando-o-modulo' },
  { ve: LEGENDA.reinicio, ms: 500 },
  { ve: 'reiniciando' },
  { ve: 'KNB-5H39' },
  { desligado: 'Reiniciando o módulo…' },
  { naoVe: 'é com você' },
  { tecla: 'Escape' },   // no encerramento, o voltar não faz nada
  { fica: 'T16', ms: 1300 },
  { ve: LEGENDA.reinicio },
  // o 08 pelo endereço: a conexão caiu no reinício, e o app reconecta sozinho — nunca falha
  { abre: '?tela=T16&momento=08-momento-reconectando-no-reinicio' },
  { chega: 'T16', momento: '08-momento-reconectando-no-reinicio' },
  { ve: LEGENDA.reconectando },
  { ve: 'reconectando' },
  { desligado: 'Reconectando…' },
  { naoVe: LEGENDA.reinicio },
  // o herói: os sete passos correm desde o 1, cada um com a sua legenda, um a cada 600 ms
  { abre: '?tela=T16' },
  { chega: 'T16', momento: null },
  { ve: LEGENDA.contadores },
  { desligado: 'Encerrando · não desconecte' },
  { ve: LEGENDA.reinicio, entre: [0, 1000] },
  { ve: 'reiniciando' },
  { desligado: 'Reiniciando o módulo…' },
  { naoVe: LEGENDA.contadores },
  { ve: LEGENDA.releitura, entre: [300, 1000] },
  { ve: 'de volta' },
  { desligado: 'Encerrando · não desconecte' },
  { naoVe: LEGENDA.reinicio },
  { ve: LEGENDA.repouso, entre: [300, 1000] },
  { naoVe: LEGENDA.releitura },
  { ve: LEGENDA.canal, entre: [300, 1000] },
  { ve: LEGENDA.registro, entre: [300, 1000] },
  { ve: LEGENDA.desconexao, entre: [300, 1000] },
  // fechado o sétimo, a Sessão encerrada, sem legenda de passo nenhum: o autoteste correndo (07,
  // o pacote 5), e a 02 quando a última assertiva chega
  { chega: 'T16', momento: '07-momento-autoteste-correndo', entre: [300, 1000] },
  { ve: 'Sessão encerrada' },
  { chega: 'T16', momento: '02-momento-instalacao-homologada', entre: [2400, 4000] },
  { naoVe: LEGENDA.desconexao },
  { ve: 'INSTALAÇÃO HOMOLOGADA' },
  { ve: 'Sem sessão de configuração' },
]
