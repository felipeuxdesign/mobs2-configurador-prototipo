// T09 · os textos exatos (02-telas/T09-configurar-modulo/textos.md). Onde o
// texto traz um dado (o nome do bloco, a contagem por extenso, o conteúdo do
// bloco, os registros e as regiões), ele é montado do mock na hora e confere com
// o textos.md (G1, G8). O motivo escrito no caso bloco-recusado não é lido: a
// causa é a do textos.md (T09-A5, G9).
import { caixaAlta, porExtenso } from '../../dados/formato.js'

// 'Ativo, Leitor, Eventos e Conexão' — a lista dos rótulos, o último com o 'e'
// o bloco com o artigo (o retorno do PM de 09/10, a 16: *Falta reenviar o leitor e os eventos.*)
const COM_ARTIGO = { ativo: 'o ativo', cercas: 'as cercas', leitor: 'o leitor', eventos: 'os eventos', conexao: 'a conexão' }
const porExtensoMaiusculo = (n) => { const t = porExtenso(n); return t.charAt(0).toUpperCase() + t.slice(1) }
const emLista = (nomes) => (nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}` : nomes.join(''))

export const T = {
  titulo: 'Configurar módulo',
  encerrar: 'ENCERRAR',
  pinos: 'ocupação de pinos confere',
  // o que cada bloco faz, na descrição do elo (a mesma nas nove referências da cadeia).
  // A limpeza diz o que apaga e o que preserva (decisão 47, HU-T09-3)
  descricao: {
    // a rodada 1 do retorno do PM: a limpeza da instalação nova apaga a rede também, e diz que ela
    // volta no último passo (duas frases, duas linhas · componentes.md · Duas ideias numa linha)
    limpeza: ['Apaga a configuração anterior, inclusive a rede do módulo.', 'A rede será gravada de novo no último passo.'],
    ativo: 'quem é o veículo e a tradução da CAN',
    cercas: 'as regiões geográficas',
    leitor: 'como o cartão do motorista é lido',
    eventos: 'o que o módulo reporta e quando',
    conexao: 'para onde ele manda',
  },
  // o valor à direita do elo: o conteúdo do bloco, do cadastro do par (decisão 49 · o
  // módulo não guarda versão), e as palavras do processo
  // a rodada 1: cada bloco termina em confere — aguardando, gravando, conferindo, confere, não confere
  confere: 'confere',
  naoConfere: 'não confere',
  aguardando: 'aguardando',
  conferindo: 'conferindo',
  // a Conexão: o servidor da Mobs2 (nenhuma tela da rodada diz o endereço), e o que o módulo prova
  servidorDaMobs2: 'o servidor da Mobs2',
  falouComServidor: 'O módulo falou com o servidor',
  sim: 'sim',
  aindaNao: 'ainda não',
  oQueConferir: 'O QUE CONFERIR',
  conferirServidor: [
    { titulo: '1 · Chip', texto: '— encaixado e ativo' },
    { titulo: '2 · Antena', texto: '— conectada' },
    { titulo: '3 · Endereço', texto: '— o servidor da Mobs2 no cadastro' },
  ],
  // a limpeza da manutenção (09, 10): só a parte reenviada, e a rede fica
  limpezaDaManutencao: ['Apaga só esta parte.', 'A rede do módulo continua.'],
  primeiro: 'primeiro',    // a limpeza, antes de gravar (05, 06, 07)
  gravando: 'gravando',    // o bloco que corre
  recusado: 'recusado',    // o bloco que o módulo recusou
  pausado: 'pausado',      // o bloco em que a cadeia parou
  pendente: '—',           // os que ainda vão gravar, com a cadeia parada
  naoAlcancado: 'não foi alcançado', // os que nem começaram, depois da recusa
  // o conteúdo (decisões 49, 50 e 51): as regiões do ativo — nenhuma, no ônibus sem
  // cerca (T09/06) —, o leitor pela variante do módulo, o intervalo do preset de
  // eventos do modelo e a APN da conexão. '1 região' não tem referência: é a forma
  // do singular, que nenhum par do mock alcança
  regioes: (n) => (n === 0 ? 'nenhuma' : `${n} ${n === 1 ? 'região' : 'regiões'}`),
  semFio: 'sem fio',
  noFioBranco: 'no fio branco',
  intervalo: (seg) => `intervalo ${seg} s`,
  // a causa da recusa, por bloco: só a de Cercas tem texto aprovado (G25)
  causa: { cercas: 'os pontos das regiões não voltaram' },
  // as duas pré-condições, embaixo do título (HU-T09-2): os pinos e o espaço no módulo. Na
  // trava do espaço (06), a linha do espaço não aparece: o aviso já diz os números (o pacote 3)
  cabe: (registros, capacidade) => `cabe no módulo · ${registros} de ${capacidade} contadores`,
  // as travas do envio (06, 07, HU-T09-4): o aviso diz o número e quem fica de fora (o
  // pacote 3 · antes, ele dizia o que fazer, e a pré-condição repetia os números)
  naoCabeTitulo: 'NÃO CABE NO MÓDULO',
  // a rodada 1: o não cabe nomeia o que estourou — os contadores (06) ou os pontos das cercas (07)
  naoCabeFrase: (registros, capacidade) => `São ${registros} contadores. Este módulo guarda ${capacidade}.`,
  pontosDemaisFrase: (pontos, max) => `As cercas têm ${pontos} pontos. Este módulo guarda ${max}.`,
  cercasNaoCabem: 'não cabe',
  // os avisos da cadeia
  parou: 'A CADEIA PAROU',
  recusou: (rotulo, seguintes) => `${rotulo} foi recusado. Os ${porExtenso(seguintes)} seguintes nem começaram.`,
  pausou: (rotulo) => `A CADEIA PAUSOU NO ${caixaAlta(rotulo)}`,
  linkCaiu: (gravados) => `O link caiu. Os ${porExtenso(gravados)} primeiros blocos já conferem.`,
  semConexao: (rotulo) => `A ${caixaAlta(rotulo)} AINDA NÃO FOI GRAVADA`,
  semSinal: 'Sem ela o módulo fica sem sinal. Termine a gravação antes de sair.',
  // a manutenção (08, 09, HU-T09-5): um bloco por vez. Só as cercas têm texto aprovado
  // pro reenvio — o primário, a frase da cadeia curta e a limpeza só delas (G25)
  manutencao: 'MANUTENÇÃO',
  reenvieUm: 'Reenvie um bloco por vez. A limpeza apaga só o que você escolher.',
  // o pacote 2 (D2): a conferência corrige um bloco por vez — as cercas, e depois o leitor, os eventos
  // e a conexão. Os textos desses três seguem a gramática dos das cercas: nenhuma referência os desenha
  // o retorno do PM de 09/10: todo bloco se reenvia, um por vez · o do ativo é a letra da T09/17
  reenviar: { ativo: 'Reenviar o ativo', cercas: 'Reenviar as cercas', leitor: 'Reenviar o leitor', eventos: 'Reenviar os eventos', conexao: 'Reenviar a conexão' },
  reenviando: { ativo: 'Reenviando só o ativo.', cercas: 'Reenviando só as cercas.', leitor: 'Reenviando só o leitor.', eventos: 'Reenviando só os eventos.', conexao: 'Reenviando só a conexão.' },
  // ── o retorno do PM de 09/10: o arrastado nunca é reenviado sozinho ──
  // a folha de confirmação (13, 17, 18): a consequência, antes de enviar · a das cercas é do mock
  // (M.consequenciaReenvio); a do ativo e a do leitor, a letra das referências
  consequencia: {
    ativo: { titulo: 'Reenviar o ativo pede reenviar os eventos depois.', texto: 'Os eventos usam o ativo. Depois do ativo, o app pergunta por eles.' },
    leitor: { titulo: 'Reenviar o leitor pede reenviar os eventos depois.', texto: 'Os eventos usam o leitor. Depois do leitor, o app pergunta por eles.' },
  },
  cancelar: 'Cancelar',
  fechar: 'Fechar',
  // enviando (09): quem precisa ser reenviado depois — nunca *ficam como estão* com dependente pendente
  dependemDepois: (rotulos) => `${emLista(rotulos)} precisam ser reenviados depois. Você confirma em seguida.`,
  // depois de conferir (10, 14, 15): o bloco confere, e quantos dependem dele · sem dependente, só o confere
  // (a letra das três referências; os outros seguem a gramática delas)
  confereComDependentes: {
    ativo: (n) => `Ativo confere. ${n === 1 ? 'Um bloco depende dele.' : `${porExtensoMaiusculo(n)} blocos dependem dele.`}`,
    cercas: (n) => `Cercas conferem. ${n === 1 ? 'Um bloco depende delas.' : `${porExtensoMaiusculo(n)} blocos dependem delas.`}`,
    leitor: (n) => `Leitor confere. ${n === 1 ? 'Um bloco depende dele.' : `${porExtensoMaiusculo(n)} blocos dependem dele.`}`,
  },
  confereSo: { ativo: 'Ativo confere.', cercas: 'Cercas conferem.', leitor: 'Leitor confere.', eventos: 'Eventos conferem.', conexao: 'Conexão confere.' },
  // a pergunta por cada dependente, numerada, na ordem do script
  numerado: (n, rotulo) => `${n} · ${rotulo}`,
  liberaDepois: (rotulo) => `libera depois do ${rotulo.toLowerCase()}`,
  deixarParaDepois: 'Deixar para depois',
  // o que ficou para depois (16): na lista da manutenção, e no aviso
  faltaReenviarValor: 'falta reenviar',
  faltaReenviar: (blocos) => `Falta reenviar ${emLista(blocos.map((b) => COM_ARTIGO[b]))}.`,
  // a 10 (o pacote 5): a cadeia curta fechada — o das cercas é a letra da referência; os outros
  // três seguem a gramática dela, como os do reenviando
  reenviado: { cercas: 'As cercas foram reenviadas.', leitor: 'O leitor foi reenviado.', eventos: 'Os eventos foram reenviados.', conexao: 'A conexão foi reenviada.' },
  relido: { cercas: 'relidas', leitor: 'relido', eventos: 'relidos', conexao: 'relida' },
  limpezaSo: {
    cercas: 'apaga só as cercas · o resto fica como está',
    leitor: 'apaga só o leitor · o resto fica como está',
    eventos: 'apaga só os eventos · o resto fica como está',
    conexao: 'apaga só a conexão · o resto fica como está',
  },
  ficamComoEstao: (rotulos) => `${emLista(rotulos)} ficam como estão.`,
  // a prova da cadeia concluída (a rodada 1): os passos, contados da ordem (decisão 49)
  conferidoNoModulo: 'CONFERIDO NO MÓDULO',
  passos: (n) => `${n} passos`,
  devolveu: (n) => `o módulo devolveu os ${porExtenso(n)} passos`,
  deTotal: (total) => `de ${total}`,
  // o rodapé
  gravarNoModulo: 'Gravar no módulo',
  procurarOutro: 'Procurar outro módulo',
  gravandoNaoInterrompa: 'Gravando · não interrompa',
  saidaVolta: 'A saída volta quando a cadeia fechar',
  tentarDeNovo: 'Tentar de novo',
  reconectar: 'Reconectar',
  continuar: 'Continuar a gravação',
  voltar: 'Voltar ao menu',
}
