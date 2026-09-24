// Os textos da T05, copiados do 02-telas/T05-conectar-modulo/textos.md —
// nunca redigitados. Onde o texto traz um dado (o serial, o firmware, a
// contagem, a porcentagem), a função monta com o valor do mock que a tela
// passa; o resto é a letra da referência.
export const TX = {
  // a busca · 00, 01 e 02
  titulo: 'Conectar módulo',
  encontrados: (n) => (n === 1 ? 'encontrado' : 'encontrados'),
  escolhido: 'ESCOLHIDO',
  firmwareNoDetalhe: (fw) => `firmware ${fw}`,
  // o rótulo dos outros módulos, pela quantidade: só o que o textos.md escreve
  // (a lista do mock acha cinco; com outra contagem, o rótulo fica sem texto, G25)
  outrosPorPerto: { 4: 'OUTROS QUATRO POR PERTO' },
  nenhumOutro: 'NENHUM OUTRO POR PERTO',
  seNaoForEste: 'Se não for este, aproxime o aparelho do módulo e procure de novo.',
  naoCadastrado: 'não cadastrado',
  foraDestaEmpresa: 'não está no cadastro desta empresa',
  escolhaNaMao: 'Escolha o que está na sua mão.',
  rotuloFirmware: 'FIRMWARE',
  escolhaUm: 'Escolha um módulo para continuar',
  conectar: 'Conectar',
  conectarAo: (serial) => `Conectar ao ${serial}`,
  procurarDeNovo: 'Procurar de novo',

  // a pré-checagem · 05 e 10
  preChecagem: 'Pré-checagem',
  de: (total) => `de ${total}`,
  semAtivo: 'sem ativo',
  encerrar: 'ENCERRAR',
  selecionarAtivo: 'Selecionar ativo',
  voltarAoMenu: 'Voltar ao menu',
  mensagensPendentes: 'Mensagens pendentes',
  nenhuma: 'nenhuma',
  redeDoModulo: 'Rede do módulo',
  conectada: 'conectada',
  aindaNao: '—',
  atualizandoPct: (pct) => `atualizando · ${pct}%`,
  atualizando: 'Atualizando · não desconecte',
  recomeca: 'A pré-checagem recomeça quando terminar',

  // as onze checagens, na ordem da especificação (R-07), e o que cada uma diz
  // quando passa (05)
  linhas: {
    serial: 'Serial no cadastro',
    firmware: 'Firmware',
    alimentacao: 'Alimentação e bateria',
    gps: 'GPS e antena',
    entradas: 'Entradas digitais',
    modem: 'Modem, SIM e sinal',
    can: 'CAN',
    espaco: 'Espaço no módulo',
    cercas: 'Espaço para cercas',
    destino: 'ID no destino',
    canal: 'Canal de programação',
  },
  naFaixa: 'na faixa',
  antenaOk: 'antena ok',
  conforme: 'conforme',
  naRede: 'na rede',
  semErros: 'sem erros',
  registrado: 'registrado',
  livre: 'livre',
  deTotal: (usado, total) => `${usado} de ${total}`,

  // o que o próprio cadastro reprova (06, 07, 08 e 11 — os estados são o C7;
  // aqui, só as regras que nascem do dado, pra conexão no fluxo não mentir)
  semCadastro: 'sem cadastro',
  naoAvaliada: 'não avaliada',
  naoAtendido: 'não atendido nesta versão',
  homologadas: (lista) => `homologadas ${lista.join(' e ')}`,
  semCan: 'sem CAN',
  naoCabe: 'não cabe',
  registrosCabem: (pede, cabem) => `${pede} registros · cabem ${cabem}`,
  foraDoCadastro: 'fora do cadastro',
  procurarOutro: 'Procurar outro módulo',
  atualizarFirmware: 'Atualizar firmware',
}
