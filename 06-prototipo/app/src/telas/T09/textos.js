// T09 · os textos exatos (02-telas/T09-configurar-modulo/textos.md). Onde o
// texto traz um dado (o nome do bloco, a contagem por extenso, o conteúdo do
// bloco, os registros e as regiões), ele é montado do mock na hora e confere com
// o textos.md (G1, G8). O motivo escrito no caso bloco-recusado não é lido: a
// causa é a do textos.md (T09-A5, G9).
import { caixaAlta, porExtenso } from '../../dados/formato.js'

// 'Ativo, Leitor, Eventos e Conexão' — a lista dos rótulos, o último com o 'e'
const emLista = (nomes) => (nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}` : nomes.join(''))

export const T = {
  titulo: 'Configurar módulo',
  encerrar: 'ENCERRAR',
  pinos: 'ocupação de pinos confere',
  // o que cada bloco faz, na descrição do elo (a mesma nas nove referências da cadeia).
  // A limpeza diz o que apaga e o que preserva (decisão 47, HU-T09-3)
  descricao: {
    limpeza: 'apaga a configuração anterior · preserva o serial e os contadores',
    ativo: 'quem é o veículo e a tradução da CAN',
    cercas: 'as regiões geográficas',
    leitor: 'como o cartão do motorista é lido',
    eventos: 'o que o módulo reporta e quando',
    conexao: 'para onde ele manda',
  },
  // o valor à direita do elo: o conteúdo do bloco, do cadastro do par (decisão 49 · o
  // módulo não guarda versão), e as palavras do processo
  feita: 'feita',          // a limpeza confirmada
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
  causa: { cercas: 'os pontos das áreas não voltaram' },
  // as duas pré-condições, embaixo do título (HU-T09-2): os pinos e o espaço no módulo
  cabe: (registros, capacidade) => `cabe no módulo · ${registros} de ${capacidade} registros`,
  naoCabe: (registros, capacidade) => `não cabe · ${registros} registros, cabem ${capacidade}`,
  // as travas do envio (06, 07, HU-T09-4): o aviso diz o que fazer, sem repetir os
  // números que o elemento já mostra (decisão 47)
  naoCabeTitulo: 'NÃO CABE NO MÓDULO',
  naoCabeFrase: 'Use um módulo com mais memória.',
  cercasDemaisTitulo: 'CERCAS DEMAIS PRO MÓDULO',
  cercasDemaisFrase: 'Use um módulo que guarde mais cercas.',
  cercasNaoCabem: 'não cabe',
  cercasDemais: (regioes, cabem, fora) => `${T.regioes(regioes)}, cabem ${cabem}${fora ? ` · ${fora} fica de fora` : ''}`,
  // os avisos da cadeia
  parou: 'A CADEIA PAROU',
  recusou: (rotulo, seguintes) => `${rotulo} foi recusado. Os ${porExtenso(seguintes)} seguintes nem começaram.`,
  pausou: (rotulo) => `A CADEIA PAUSOU NO ${caixaAlta(rotulo)}`,
  linkCaiu: (gravados) => `O link caiu. Os ${porExtenso(gravados)} primeiros blocos ficam gravados.`,
  semConexao: (rotulo) => `A ${caixaAlta(rotulo)} AINDA NÃO FOI GRAVADA`,
  semSinal: 'Sem ela o módulo fica sem sinal. Termine a gravação antes de sair.',
  // a manutenção (08, 09, HU-T09-5): um bloco por vez. Só as cercas têm texto aprovado
  // pro reenvio — o primário, a frase da cadeia curta e a limpeza só delas (G25)
  manutencao: 'MANUTENÇÃO',
  reenvieUm: 'Reenvie um bloco por vez. A limpeza apaga só o que você escolher.',
  reenviar: { cercas: 'Reenviar as cercas' },
  reenviando: { cercas: 'Reenviando só as cercas.' },
  limpezaSo: { cercas: 'apaga só as cercas · o resto fica como está' },
  ficamComoEstao: (rotulos) => `${emLista(rotulos)} ficam como estão.`,
  // a prova da cadeia concluída: os blocos, contados da ordem (decisão 49)
  gravadoERelido: 'GRAVADO E RELIDO',
  blocos: (n) => `${n} blocos`,
  devolveu: (blocos) => `o módulo devolveu os ${porExtenso(blocos)} blocos`,
  deTotal: (total) => `de ${total}`,
  // o rodapé
  gravarNoModulo: 'Gravar no módulo',
  procurarOutro: 'Procurar outro módulo',
  gravandoNaoInterrompa: 'Gravando · não interrompa',
  saidaVolta: 'A saída volta quando a cadeia fechar',
  tentarDeNovo: 'Tentar de novo',
  reconectar: 'Reconectar e seguir',
  continuar: 'Continuar a gravação',
  voltar: 'Voltar ao menu',
}
