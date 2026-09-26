// T12 · os textos, exatamente como o textos.md da tela (02-telas/T12-ultimas-instalacoes/textos.md).
// O dado (placa, serial, hora, contagem, nome) vem do mock e entra pelos parâmetros.
// Os que o textos.md não tem estão marcados, com a fonte e a decisão (G25, T12·2, T12·3).
export const TX = {
  encerrar: 'ENCERRAR',
  semSessao: 'Sem sessão de configuração',
  semAtivo: 'sem ativo', // a faixa com o módulo e sem o ônibus: o texto da T06 e da T04 (não há referência da T12 sem ativo, G25)
  titulo: 'Últimas instalações',
  nestaGaragem: 'nesta unidade', // a lei 18, a palavra é unidade (decisão 37); o nome interno fica
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

  // o detalhe (01)
  hoje: (hora) => `hoje, ${hora}`,
  // as outras instalações repetem no detalhe a linha de baixo da lista (G25): o
  // 'ontem, 16:05' e o 'há 9 dias, 13:58' não existem no textos.md (revisão C11)
  etapas: {
    preChecagem: 'Pré-checagem',
    configuracao: 'Configuração',
    calibracao: 'Calibração',
    ciclo: 'Ciclo dinâmico',
    checklist: 'Checklist',
    autoteste: 'Autoteste',
    recebimento: 'Recebimento',
  },
  deN: (feito, total) => `${feito} de ${total}`,
  blocosRelidos: (n) => `${n} blocos relidos`,
  comFoto: (grandeza) => `${grandeza} · com foto`,
  confirmadoAs: (hora) => `confirmado ${hora}`,
  voltarAsInstalacoes: 'Voltar às instalações',
}
