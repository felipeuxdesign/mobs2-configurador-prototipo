// Os textos da T05, copiados do 02-telas/T05-conectar-modulo/textos.md —
// nunca redigitados. Onde o texto traz um dado (o serial, o firmware, a
// contagem), a função monta com o valor do mock que a tela passa; o resto é a
// letra da referência.
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
  escolhaNaMao: 'Escolha o que está na sua mão.',
  rotuloFirmware: 'FIRMWARE',
  escolhaUm: 'Escolha um módulo para continuar',
  conectar: 'Conectar',
  conectarAo: (serial) => `Conectar ao ${serial}`,
  procurarDeNovo: 'Procurar de novo',
  voltarAoMenu: 'Voltar ao menu',

  // ── C7 · os estados ──
  // Os ordinais saem do número do mock, mas só o que o textos.md escreve (como
  // o 'OUTROS QUATRO' da busca): com outro número, a frase fica sem texto
  // (G25), nunca uma palavra inventada.

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
