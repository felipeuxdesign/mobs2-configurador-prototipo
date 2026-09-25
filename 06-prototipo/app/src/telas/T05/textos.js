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

  // ── C7 · os estados ──
  // Os ordinais e o extenso saem do número do mock, mas só o que o textos.md
  // escreve (como o 'OUTROS QUATRO' da busca): com outro número, a frase fica
  // sem texto (G25), nunca uma palavra inventada.

  // 03 · nenhum encontrado (busca-vazia)
  nenhumEncontrado: 'nenhum encontrado',
  nenhumRespondeu: 'Nenhum módulo respondeu',
  aproxime: 'Aproxime o aparelho do módulo e confira se ele está alimentado.',
  tentativa: { 1: 'primeira' },
  buscaDurou: (seg, tentativa) => (TX.tentativa[tentativa] ? `A busca durou ${seg} s · ${TX.tentativa[tentativa]} tentativa` : null),

  // 04 · a conexão falhou (conexao-falha): a trava mora no escolhido
  naoRespondeu: 'NÃO RESPONDEU',
  conferir: [
    { titulo: '1 · Cabo e conector', texto: '— encaixe firme' },
    { titulo: '2 · Alimentação', texto: '— energia chegando' },
    { titulo: '3 · Cadastro', texto: '— serial e modelo conferem' },
  ],
  tentarDeNovo: 'Tentar de novo',

  // 09 · o firmware fora com o módulo sem rede
  comConexaoGravada: 'Com a conexão gravada, o firmware atualiza pelo módulo.',
  gravarConexao: 'Gravar a conexão',

  // 12 · o pool de cercas esgotado: a região pedida não cabe
  regiaoNaoCabe: (nome) => `${nome} não cabe`,

  // 13 · o canal aberto de uma sessão anterior, que o app fecha, e as pendências
  fechado: 'fechado',
  abertoDesde: (dia, hora) => `aberto desde ${dia} às ${hora}`,
  deDiagnostico: (n) => `· ${n} de diagnóstico`,

  // 14 · o link cai na checagem do caso
  semRespostaDoModulo: 'SEM RESPOSTA DO MÓDULO',
  reconecteDa: { 6: 'Reconecte para seguir da sexta.' },
  semResposta: 'sem resposta',
  reconectar: 'Reconectar',

  // 15 · o módulo dorme na checagem do caso — não é erro
  moduloEmRepouso: 'MÓDULO EM REPOUSO',
  acordeDa: { 9: 'Acorde para seguir da nona.' },
  emRepouso: 'em repouso',
  acordarModulo: 'Acordar módulo',

  // ── o mundo real · o que o celular impede antes da busca (celular.js) ──
  // 16 · o Bluetooth desligado (bluetooth-desligado)
  semBluetooth: 'sem Bluetooth',
  bluetoothDesligado: 'O Bluetooth está desligado',
  semEle: 'Sem ele, o app não acha o módulo. Ligue, e a busca começa sozinha.',
  ligarBluetooth: 'Ligar o Bluetooth',
  // 17 · a permissão negada (bluetooth-sem-permissao)
  semPermissao: 'sem permissão',
  faltaPermissao: 'Falta a permissão do Bluetooth',
  oAppUsa: 'O app usa só pra achar os módulos por perto. Sem ela, a busca não começa.',
  permitir: 'Permitir',
  // o Android não deixa perguntar de novo: o primário vira a saída (tela.md; a
  // letra é a da T10/11 e da lei de construir, 12 — nenhuma referência da T05 a desenha)
  abrirConfiguracoes: 'Abrir as configurações',
}
