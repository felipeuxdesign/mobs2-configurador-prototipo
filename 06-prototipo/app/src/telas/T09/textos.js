// T09 · os textos exatos (02-telas/T09-configurar-modulo/textos.md). Onde o
// texto traz um dado (o nome do bloco, a contagem por extenso), ele é montado
// do mock na hora e confere com o textos.md (G1, G8). O motivo escrito no caso
// bloco-recusado não é lido: a causa é a do textos.md (T09-A5, G9).
import { caixaAlta, porExtenso } from '../../dados/formato.js'

export const T = {
  titulo: 'Configurar módulo',
  encerrar: 'ENCERRAR',
  pinos: 'ocupação de pinos confere',
  // o que cada bloco faz, na descrição do elo (a mesma nas cinco referências)
  descricao: {
    limpeza: 'apaga a configuração anterior',
    ativo: 'quem é o veículo e a tradução da CAN',
    cercas: 'as regiões geográficas',
    leitor: 'como o cartão do motorista é lido',
    eventos: 'o que o módulo reporta e quando',
    conexao: 'para onde ele manda',
  },
  // o valor à direita do elo
  feita: 'feita',          // a limpeza confirmada (ela não tem versão)
  gravando: 'gravando',    // o bloco que corre
  recusado: 'recusado',    // o bloco que o módulo recusou
  pausado: 'pausado',      // o bloco em que a cadeia parou
  pendente: '—',           // os que ainda vão gravar, com a cadeia parada
  naoAlcancado: 'não foi alcançado', // os que nem começaram, depois da recusa
  // a causa da recusa, por bloco: só a de Cercas tem texto aprovado (G25)
  causa: { cercas: 'os pontos das áreas não voltaram' },
  // os avisos
  parou: 'A CADEIA PAROU',
  recusou: (rotulo, seguintes) => `${rotulo} foi recusado. Os ${porExtenso(seguintes)} seguintes nem começaram.`,
  pausou: (rotulo) => `A CADEIA PAUSOU NO ${caixaAlta(rotulo)}`,
  linkCaiu: (gravados) => `O link caiu. Os ${porExtenso(gravados)} primeiros blocos ficam gravados.`,
  semConexao: (rotulo) => `A ${caixaAlta(rotulo)} AINDA NÃO FOI GRAVADA`,
  semSinal: 'Sem ela o módulo fica sem sinal. Termine a gravação antes de sair.',
  // a prova da cadeia concluída
  gravadoERelido: 'GRAVADO E RELIDO',
  devolveu: (blocos) => `o módulo devolveu os ${porExtenso(blocos)} blocos`,
  deTotal: (total) => `de ${total}`,
  // o rodapé
  gravandoNaoInterrompa: 'Gravando · não interrompa',
  saidaVolta: 'A saída volta quando a cadeia fechar',
  tentarDeNovo: 'Tentar de novo',
  reconectar: 'Reconectar e seguir',
  continuar: 'Continuar a gravação',
  voltar: 'Voltar ao menu',
}
