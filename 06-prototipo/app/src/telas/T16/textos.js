// T16 · os textos exatos (02-telas/T16-sessao/textos.md). Onde o texto traz um
// dado (a placa, o serial, a hora, a versão, a contagem, o contador lido), ele
// é montado do mock na hora, em dados.js, e confere com o textos.md (G1, G8).
// Os rótulos das assertivas e os valores fixos (fechado, restaurado, na fila)
// vêm do M.autotesteEncerramento, e são os mesmos do textos.md.
// A causa do caso autoteste-falhando não é lida: a frase é a do textos.md
// (T16-V7, G9: a frase de interface é texto).

// Os oito passos do encerramento, na ordem da referência. `feito` é o que o
// passo diz depois de concluir; `corre` e `legenda`, o que ele diz enquanto
// corre. As oito legendas vêm do tela.md (a entrega do design de 25/09), com
// o ponto final das três que as referências desenham (00, 01 e 03): a lista
// do tela.md tira o ponto de todas. Onde a pasta ainda não tem o texto (a
// palavra que corre nos passos 1, 2, 4, 6 e 7, e o feito da releitura), o
// passo fica sem ele (G25) e o texto vai ao arquiteto.
// · O passo 2 só leva legenda no corte (T16·1): a única legenda dele é a do
//   corte, `T.corte.legenda`, e pedir o corte a quem reinicia por comando
//   mandaria o técnico desligar o módulo à toa. No reinício por comando, o
//   passo corre sem legenda, e o texto dele vai ao arquiteto (T16·7).
// · A legenda do Autoteste fica no dado e não aparece: o passo 8 é a tela
//   seguinte, a Sessão encerrada (T16·4), e nenhuma referência o desenha
//   correndo na cadeia.
// `seguro`: os quatro que deixam o módulo seguro e rodam mesmo sem homologar
// (dominio.md §4.2, decisão 26).
export const PASSOS = [
  {
    id: 'contadores', nome: 'Contadores e estado', feito: 'gravados',
    legenda: 'Grava os contadores e o estado no módulo, pra nada se perder no reinício.',
  },
  { id: 'reinicio', nome: 'Reinício do módulo', feito: 'voltou' },
  {
    id: 'releitura', nome: 'Releitura completa', corre: 'relendo',
    legenda: 'Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício.',
  },
  {
    id: 'repouso', nome: 'Repouso do módulo', feito: 'restaurado', seguro: true,
    legenda: 'Devolve o módulo ao repouso que ele tinha antes da sessão.',
  },
  {
    id: 'canal', nome: 'Canal de programação', feito: 'fechado', seguro: true, corre: 'fechando',
    legenda: 'Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar.',
  },
  {
    id: 'registro', nome: 'Registro da sessão', feito: 'na fila', seguro: true,
    legenda: 'Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação.',
  },
  {
    id: 'desconexao', nome: 'Desconexão', feito: 'feita', seguro: true,
    legenda: 'Solta o Bluetooth. O módulo fica livre pra outro aparelho.',
  },
  { id: 'autoteste', nome: 'Autoteste', legenda: 'Confere as assertivas uma por uma, cada uma com o valor lido.' },
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
  // o corte de alimentação (T16·1: só quando o driver não reinicia por comando);
  // a legenda é a do passo 2 no tela.md, e só vale no corte (T16·7)
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
  // a nota do que não rodou é uma frase só, sem o rótulo em caixa alta (otimizacao300000000 · T16/04)
  naoRodaram: 'Não rodaram: contadores, reinício, releitura e o autoteste.',

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
