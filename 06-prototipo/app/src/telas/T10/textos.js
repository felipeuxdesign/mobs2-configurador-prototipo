// T10 · os textos da tela, exatamente como no 02-telas/T10-calibracao/textos.md.
// Onde o texto traz um dado (a contagem, a diferença, a unidade, os dias, a
// hora, a seção, o nome da grandeza), a moldura é daqui e o dado vem do mock,
// na hora de montar. O nome pro leitor do cartão da foto é o toque do tela.md
// ('Fotografar o painel', G14).
export const T = {
  encerrar: 'ENCERRAR',
  rotulo: 'CALIBRAÇÃO',
  deTotal: (total) => `de ${total}`,
  depois: (nomes) => `Depois: ${nomes.join(' · ')}`,

  // o valor em poço: o que o módulo conta (partida) ou lê (ajuste)
  moduloConta: 'O MÓDULO CONTA',
  moduloLe: 'O MÓDULO LÊ',
  moduloAgora: 'O MÓDULO CONTA AGORA',
  vazio: '—',

  // a régua da diferença
  diferenca: (valor, unidade) => `diferença de ${valor} ${unidade}`,
  semeadoHa: (dias) => `semeado há ${dias} dias`,
  entre: ' · ',
  ligueMotor: 'ligue o motor pra ele ler',
  relido: (hora) => `relido às ${hora} · confere com o painel`,

  // o valor alvo
  painel: 'O PAINEL MOSTRA',
  alvoVai: 'é este que vai para o módulo',
  alvoCumprido: 'o mesmo que o módulo agora conta',
  alvoAjuste: { rotacao: 'digite o que o conta-giros mostra' },

  // a foto do painel
  foto: 'Foto do painel',
  fotoLegenda: 'É a prova do número — e vale no checklist',
  fotoTirada: (secao) => `Também vale no checklist, na Seção ${secao}`,
  aguarda: 'aguarda',
  fotografada: 'fotografada',
  fotografar: 'Fotografar o painel',

  // o que não se aplica (T10·5)
  naoSeAplicamModelo: 'NÃO SE APLICAM NESTE MODELO',
  naoSeAplicam: 'NÃO SE APLICAM',

  // o rodapé: semear (partida), calibrar (ajuste e o passo seguinte)
  semear: { hodometro: 'Semear o hodômetro' },
  semearDeNovo: 'Semear de novo',
  calibrar: { horimetro: 'Calibrar o horímetro', rotacao: 'Calibrar a rotação' },
  voltar: 'Voltar ao menu',
}
