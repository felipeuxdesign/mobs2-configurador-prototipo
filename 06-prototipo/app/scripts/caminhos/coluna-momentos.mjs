// Os momentos difíceis de pegar ao vivo, na coluna (o diretor, 14/10 · palco.md): a Seção E resolvida
// e a foto do painel do caminhão (T13), o reinício e o reconectando (T16) e o conferindo (T11) abrem
// parados pela coluna, no quadro da fotografia, e voltam ao fluxo
export default [
  { abre: '?tela=T13' }, { janela: [1440, 900] }, { dorme: 800 },
  { palco: 'Seção E resolvida' }, { chega: 'T13', estado: '13-momento-e-resolvida' }, { ve: 'o ciclo passou' }, { dorme: 1200 }, { quieto: true },
  { palco: 'Caminhão · a foto do painel' }, { chega: 'T13', estado: '20-momento-foto-do-painel' }, { ve: 'KNB-5H39' }, { dorme: 1200 }, { quieto: true },
  { palco: 'Voltar ao fluxo' }, { chega: 'T13', estado: null },
  { abre: '?tela=T16' }, { dorme: 800 },
  { palco: 'Reiniciando o módulo' }, { chega: 'T16', estado: '01-momento-reiniciando-o-modulo' }, { dorme: 3000 }, { chega: 'T16', estado: '01-momento-reiniciando-o-modulo' },
  { palco: 'Reconectando no reinício' }, { chega: 'T16', estado: '08-momento-reconectando-no-reinicio' }, { dorme: 3000 }, { chega: 'T16', estado: '08-momento-reconectando-no-reinicio' },
  { palco: 'Voltar ao fluxo' }, { chega: 'T16', estado: null },
  { abre: '?tela=T11' }, { dorme: 800 },
  { palco: 'Conferindo' }, { chega: 'T11', estado: '04-momento-conferindo' }, { dorme: 3000 }, { ve: 'CONFERINDO' }, { quieto: true },
  { palco: 'Voltar ao fluxo' }, { chega: 'T11', estado: null },
]
