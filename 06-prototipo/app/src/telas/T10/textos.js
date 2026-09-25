// T10 · os textos da tela, exatamente como no 02-telas/T10-calibracao/textos.md.
// Onde o texto traz um dado (a contagem, a diferença, a unidade, os dias, a
// hora, a seção, o nome da grandeza), a moldura é daqui e o dado vem do mock,
// na hora de montar. Dois textos vêm de outro documento da tela, porque
// nenhuma referência os desenha: o semear do horímetro (estados.md, a 09) e o
// que o botão diz enquanto o semear corre (animacao.md).
export const T = {
  encerrar: 'ENCERRAR',
  rotulo: 'CALIBRAÇÃO',
  deTotal: (total) => `de ${total}`,
  depois: (nomes) => `Depois: ${nomes.join(' · ')}`,
  ultimoPasso: 'Último passo',
  completa: 'Calibração completa',

  // o valor em poço: o que o módulo conta (partida) ou lê (ajuste)
  moduloConta: 'O MÓDULO CONTA',
  moduloLe: 'O MÓDULO LÊ',
  moduloAgora: 'O MÓDULO CONTA AGORA',
  moduloReleu: 'O MÓDULO RELEU',
  vazio: '—',

  // a régua da diferença
  lido: (hora) => `lido do módulo às ${hora}`,
  diferenca: (valor, unidade) => `diferença de ${valor} ${unidade}`,
  semeadoHa: (dias) => `semeado há ${dias} dias`,
  ligueMotor: 'ligue o motor pra ele ler',
  relido: (hora) => `relido às ${hora} · confere com o painel`,
  // o desvio na unidade do reporte: só o do hodômetro tem texto (em metros, T10/10)
  naoConfere: { hodometro: (valor) => `não confere · ${valor} m a menos que o painel` },

  // o valor alvo: o campo do painel
  painel: 'O PAINEL MOSTRA',
  painelVazio: 'toque e digite o que o painel mostra',
  alvoVai: 'é este que vai para o módulo',
  alvoCumprido: 'o mesmo que o módulo agora conta',
  alvoAjuste: { rotacao: 'digite o que o conta-giros mostra' },

  // a foto do painel: o cartão que se toca e o registro no lugar dele
  fotografar: 'Fotografar o painel',
  fotoLegenda: 'é a prova do número — vale no checklist',
  fotografado: (hora) => `Painel fotografado às ${hora}`,
  fotoVale: (secao) => `vale também no checklist, na Seção ${secao}`,

  // a câmera do app (T10/06): o nome é o da grandeza do passo
  fotoDoPainel: 'Foto do painel',
  enquadre: (nome) => `Enquadre o ${nome} do painel`,
  tirarFoto: 'Tirar foto',
  voltarCalibracao: 'Voltar à calibração',
  // a câmera sem a permissão (T10/11, o mundo real): o quadro diz o que falta
  precisaDaCamera: 'O app precisa da câmera pra fotografar o painel',
  semAFoto: 'Sem a foto, a calibração não semeia.',
  abrirConfiguracoes: 'Abrir as configurações',

  // o que não se aplica (T10·5)
  naoSeAplicamModelo: 'NÃO SE APLICAM NESTE MODELO',
  naoSeAplicam: 'NÃO SE APLICAM',

  // o rodapé: o primário diz sempre o que falta (decisão 33)
  digite: 'Digite o que o painel mostra',
  fotografe: 'Fotografe o painel',
  ligue: 'Ligue o motor',
  semear: { hodometro: 'Semear o hodômetro', horimetro: 'Semear o horímetro' },
  gravando: 'Gravando no módulo…',
  relendo: 'Relendo…',
  semearDeNovo: 'Semear de novo',
  calibrar: { horimetro: 'Calibrar o horímetro' },
  concluir: 'Concluir a calibração',
  voltar: 'Voltar ao menu',
}
