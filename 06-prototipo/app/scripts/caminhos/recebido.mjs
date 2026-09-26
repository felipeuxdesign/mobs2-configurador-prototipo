// T12 · o que o servidor recebeu (a última entrega, decisão 41): o detalhe da
// instalação mostra os três critérios, cada um com o veredito e o porquê numa
// linha, antes da instalação. A i-01 (RKT-8H42) lê o recebimento dela: 3
// posições em 1 min 12 s, o teste em 24 s, 1 viagem de 3 km. As outras do mock
// não têm recebimento: o veredito vem da regra dos três critérios
// (criteriosRegra.porEstado), sem o porquê — a PCX-9A17, aguardando o gestor,
// com os três conformes; a RVM-1E54, da falha reconhecida, com os três
// ausentes. O recebimento deixou de ser a sétima etapa. Os estados 04 e 05
// abrem pela coluna, parados: a PCX-9A17 com o recebimento do caso, e o
// status geral 'aguardando validação'.
export default [
  { abre: '?tela=T12&momento=01-momento-detalhe-da-instalacao' },
  { chega: 'T12', momento: '01-momento-detalhe-da-instalacao' },
  { ve: 'RKT-8H42\naprovada\nM2C-0417 · hoje, 11:47 · Rafael Vieira' },
  { ve: 'O QUE O SERVIDOR RECEBEU\nPosicionamento\n3 posições em 1 min 12 s\nconforme\nEventos\no teste chegou em 24 s\nconforme\nViagens\n1 viagem fechada · 3 km\ncompleta\nA INSTALAÇÃO' },
  { ve: 'A INSTALAÇÃO\nPré-checagem\n12 de 12' },
  { ve: 'Autoteste\n8 de 8' },
  { naoVe: 'Recebimento' },
  { naoVe: 'confirmado 11:47' },
  { toca: 'Voltar às instalações' },
  { chega: 'T12', momento: null },
  // a PCX-9A17 no fluxo: sem recebimento no mock, o veredito da regra, sem o porquê
  { toca: 'PCX-9A17' },
  { chega: 'T12', momento: '01-momento-detalhe-da-instalacao' },
  { ve: 'PCX-9A17\naguardando validação\nM2C-0312 · ontem, 16:05' },
  { ve: 'O QUE O SERVIDOR RECEBEU\nPosicionamento\nconforme\nEventos\nconforme\nViagens\ncompleta\nA INSTALAÇÃO' },
  { ve: 'A INSTALAÇÃO\nConfiguração\n6 blocos relidos\nChecklist\n10 de 10\nAutoteste\n8 de 8' },
  { naoVe: 'Rafael Vieira' },
  { naoVe: 'Pré-checagem' },
  { tecla: 'Escape' },   // o voltar do Android, no detalhe, volta às instalações
  { chega: 'T12', momento: null },
  // a RVM-1E54, da falha reconhecida: nada chegou ao servidor
  { toca: 'RVM-1E54' },
  { chega: 'T12', momento: '01-momento-detalhe-da-instalacao' },
  { ve: 'RVM-1E54\nfalha reconhecida\nM2C-0362 · há 9 dias' },
  { ve: 'Posicionamento\nausente\nEventos\nausente\nViagens\nausente' },
  { naoVe: 'não confirmado' },
  { toca: 'Voltar às instalações' },
  { chega: 'T12', momento: null },
  // os estados do critério, pela coluna: parados, a PCX-9A17 com o recebimento do caso
  { abre: '?tela=T12&estado=04-estado-criterio-indisponivel' },
  { chega: 'T12', estado: '04-estado-criterio-indisponivel' },
  { ve: 'PCX-9A17\naguardando validação' },
  { ve: 'Eventos\no pacote não declara a fila\nindisponível' },
  { ve: 'Viagens\n1 viagem fechada · 1,1 km\ncompleta' },
  { fica: 'T12', ms: 500 },
  { abre: '?tela=T12&estado=05-estado-criterio-pendente' },
  { chega: 'T12', estado: '05-estado-criterio-pendente' },
  { ve: 'PCX-9A17\naguardando validação' },
  { ve: 'Posicionamento\nsem resposta · confere por 24 h\npendente' },
  { ve: 'Eventos\no teste chegou em 52 s\nconforme' },
  { tecla: 'Escape' },   // num estado da coluna, o app está parado: o voltar não faz nada
  { fica: 'T12', ms: 500 },
  { chega: 'T12', estado: '05-estado-criterio-pendente' },
]
