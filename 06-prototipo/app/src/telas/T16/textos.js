// T16 · os textos exatos (02-telas/T16-sessao/textos.md). Onde o texto traz um
// dado (a placa, o serial, a hora, a versão, a contagem, o contador lido), ele
// é montado do mock na hora, em dados.js, e confere com o textos.md (G1, G8).
// Os rótulos das assertivas e os valores fixos (fechado, restaurado, na fila)
// vêm do M.autotesteEncerramento, e são os mesmos do textos.md.
// A causa do caso autoteste-falhando não é lida: a frase é a do textos.md
// (T16-V7, G9: a frase de interface é texto).

// Os oito passos do encerramento, na ordem da referência. `feito` é o que o
// passo diz depois de concluir; `corre` e `legenda`, o que ele diz enquanto
// corre. Onde a pasta não tem o texto (o que corre nos passos 1, 2, 4, 6 e 7 e
// o feito da releitura), o passo fica sem ele (G25) e o texto vai ao diretor.
// `seguro`: os quatro que deixam o módulo seguro e rodam mesmo sem homologar
// (dominio.md §4.2, decisão 26).
export const PASSOS = [
  { id: 'contadores', nome: 'Contadores e estado', feito: 'gravados' },
  { id: 'reinicio', nome: 'Reinício do módulo', feito: 'voltou' },
  {
    id: 'releitura', nome: 'Releitura completa', corre: 'relendo',
    legenda: 'Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício.',
  },
  { id: 'repouso', nome: 'Repouso do módulo', feito: 'restaurado', seguro: true },
  {
    id: 'canal', nome: 'Canal de programação', feito: 'fechado', seguro: true, corre: 'fechando',
    legenda: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.',
  },
  { id: 'registro', nome: 'Registro da sessão', feito: 'na fila', seguro: true },
  { id: 'desconexao', nome: 'Desconexão', feito: 'feita', seguro: true },
  { id: 'autoteste', nome: 'Autoteste' },
]

export const T = {
  // os títulos (um por tela)
  encerrar: 'Encerrar sessão',
  encerrada: 'Sessão encerrada',
  interrompida: 'Sessão interrompida',
  deTotal: (total) => `de ${total}`,
  semSessao: 'Sem sessão de configuração',

  // a cadeia do encerramento
  aindaNao: '—',                 // o passo que ainda não chegou
  pulado: 'pulado',              // sem homologar: o que não roda
  semHomologar: 'Sem homologar · só o que deixa o módulo seguro',
  // o corte de alimentação (T16·1: só quando o driver não reinicia por comando)
  corte: { corre: 'é com você', legenda: 'Desligue e ligue a alimentação do módulo. Ele volta sozinho em alguns segundos.' },

  // o rodapé enquanto corre
  encerrandoNaoDesconecte: 'Encerrando · não desconecte',
  aguardandoOModulo: 'Aguardando o módulo voltar',
  saidaAutoteste: 'A saída volta quando o autoteste terminar',
  saidaDesconectar: 'A saída volta quando o módulo desconectar',

  // a sessão encerrada: a prova e as assertivas
  sobreviveu: 'A CONFIGURAÇÃO SOBREVIVEU AO REINÍCIO',
  relidoDoModulo: 'relido do módulo depois de desligar e ligar',
  confere: 'confere',
  naoSeAplica: 'não se aplica',
  deTotalIdentificadores: (lidos, total) => `${lidos} de ${total}`,
  notaPlataforma: 'O ID na plataforma confirma quando a evidência subir.',
  bloqueada: 'A HOMOLOGAÇÃO FICA BLOQUEADA',
  causaContadores: 'Os contadores voltaram zerados — o módulo perdeu a leitura no reinício. A sessão fechou, mas a instalação não pode ser aprovada assim.',

  // a sessão encerrada sem homologar
  semHomologarRotulo: 'SEM HOMOLOGAR',
  continuaAberta: 'A instalação continua aberta. O que foi gravado fica no módulo.',
  naoRodaram: 'NÃO RODARAM',
  oQueNaoRodou: 'Contadores, reinício, releitura e o autoteste.',

  // a sessão interrompida
  iniciada: (placa, serial, quando, hora) => `${placa} · ${serial} · iniciada ${quando} às ${hora}`,
  hoje: 'hoje',
  feita: 'feita',                // a limpeza confirmada (ela não tem versão), como na T09
  parouAqui: 'parou aqui',
  versaoAteAqui: (versao) => `a versão gravada até aqui é ${versao}`,
  retomar: 'Retomar',
  descartar: 'Descartar',

  voltarAoMenu: 'Voltar ao menu',
}
