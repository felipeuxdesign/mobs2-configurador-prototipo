// T12 · os textos, exatamente como o textos.md da tela (02-telas/T12-ultimas-instalacoes/textos.md).
// O dado (placa, serial, hora, contagem, nome) vem do mock e entra pelos parâmetros.
// Os que o textos.md não tem estão marcados, com a fonte e a decisão (G25, T12·2, T12·3).
export const TX = {
  encerrar: 'ENCERRAR',
  semSessao: 'Sem sessão de configuração',
  semAtivo: 'sem ativo', // a faixa com o módulo e sem o ônibus: o texto da T06 e da T04 (não há referência da T12 sem ativo, G25)
  titulo: 'Últimas instalações',
  nestaUnidade: 'nesta unidade', // a lei 18, a palavra é unidade (decisão 37)
  grupos: { hoje: 'HOJE', ontem: 'ONTEM', esteMes: 'ESTE MÊS', maisDeUmMes: 'MAIS DE UM MÊS' },
  entre: ' · ',
  haDias: (n) => `há ${n} dias`,

  // o veredito de cada estado de M.instalacoes (T12·3 a): os três desenhados, e os
  // dois sem referência com o nome da máquina de estado (dominio.md §4.1), em caixa baixa
  veredito: {
    aprovada: 'aprovada',
    'aguardando-validacao': 'aguardando validação',
    'falha-recebimento-reconhecida': 'falha reconhecida',
    'aprovada-reprocessamento': 'aprovada após reprocessamento', // sem referência (T12·3 a)
    reprovada: 'reprovada',                                       // sem referência (T12·3 a)
  },

  semConexao: 'SEM CONEXÃO',
  consultaDas: (hora) => `Esta é a consulta das ${hora}.`,
  vazioTitulo: 'Nenhuma instalação nesta unidade',
  vazioFrase: 'O que foi instalado em outra unidade aparece ao trocar de contexto.',
  voltarAoMenu: 'Voltar ao menu',

  // o detalhe (01, 04, 05)
  hoje: (hora) => `hoje, ${hora}`,
  // a última entrega (T12/04 e 05): o quando de ontem ganhou texto, 'ontem, 16:05'.
  // As de mais de um dia repetem no detalhe a linha de baixo da lista (G25): o
  // 'há 9 dias, 13:58' não existe no textos.md (revisão C11)
  ontem: (hora) => `ontem, ${hora}`,

  // o que o servidor recebeu (decisão 41, T12/01, 04 e 05): os três critérios,
  // cada um com o veredito e o porquê numa linha. O número vem do mock
  // (instalacoes[].recebimento, ou o recebimento do caso) e entra pelos parâmetros
  oQueRecebeu: 'O QUE O SERVIDOR RECEBEU',
  aInstalacao: 'A INSTALAÇÃO',
  criterios: { posicionamento: 'Posicionamento', eventos: 'Eventos' }, // a viagem saiu (decisão 54)
  // o veredito de cada critério pelo estado dele: os quatro desenhados e, sem
  // referência, os valores da regra do mock (criteriosRegra.porEstado), como vêm
  vereditoDoCriterio: {
    conforme: 'conforme',
    completa: 'completa',
    indisponivel: 'indisponível',
    pendente: 'pendente',
    ausente: 'ausente',                         // sem referência (criteriosRegra.porEstado)
    'fora do parâmetro': 'fora do parâmetro',   // sem referência (criteriosRegra.porEstado)
    incompleta: 'incompleta',                   // sem referência (criteriosRegra.porEstado)
    atrasado: 'atrasado',                       // sem referência (criteriosRegra.excecoes)
  },
  posicoesEm: (n, tempo) => `${n} posições em ${tempo}`,
  testeChegouEm: (tempo) => `o teste chegou em ${tempo}`,
  confereDeNovo: (motivo, horas) => `${motivo} · confere por ${horas} h`,
  // o tempo do porquê: '1 min 12 s', '24 s'
  seg: (s) => `${s} s`,
  min: (m) => `${m} min`,

  etapas: {
    // o pacote 1 (decisão 44): a pré-checagem virou o Diagnóstico do módulo, e o resumo diz as linhas dele
    diagnostico: 'Diagnóstico',
    configuracao: 'Configuração',
    calibracao: 'Calibração',
    ciclo: 'Ciclo de testes', // decisão 54
    checklist: 'Checklist',
    autoteste: 'Autoteste',
  },
  deN: (feito, total) => `${feito} de ${total}`,
  blocosRelidos: (n) => `${n} blocos relidos`,
  // a rodada 3 do retorno do PM (T12/01, 04, 05): a configuração em passos — o requisito
  // conta a limpeza como passo —, a calibração do ônibus sem nada a calibrar, e o
  // autoteste nos três contadores, embaixo do nome, nunca 'N de N'
  passos: (n) => `${n} passos`,
  nadaACalibrar: 'nada a calibrar',
  contadores: (a, ns, p) => [
    `${a} ${a === 1 ? 'aprovada' : 'aprovadas'}`,
    `${ns} ${ns === 1 ? 'não se aplica' : 'não se aplicam'}`,
    `${p} ${p === 1 ? 'pendente' : 'pendentes'}`,
  ].join(' · '),
  e: ' e ', // as grandezas da calibração: 'hodômetro e horímetro' (o pacote 2, decisão 52)
  voltarAsInstalacoes: 'Voltar às instalações',
}
