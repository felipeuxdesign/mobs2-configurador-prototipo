// T07 · os textos da tela, exatamente como no 02-telas/T07-dados-da-can/textos.md.
// Onde o texto traz um dado (a contagem, a faixa, a diferença, o nome do
// sinal), a moldura é daqui e o dado vem do mock, na hora de montar.
export const T = {
  titulo: 'Dados da CAN',
  deTotal: (total) => `de ${total}`,
  reprovado: 'reprovado',
  notaSemFaixa: 'SEM FAIXA',                        // o hodômetro, ao lado do rótulo
  legendaSemFaixa: 'sem faixa',                     // a leitura pequena sem faixa (o nível)
  faixaDaLeitura: (de, ate) => `${de} — ${ate}`,    // a faixa esperada, em lima, na leitura grande
  faixaFechada: (de, ate) => `${de} a ${ate}`,      // a leitura pequena com a faixa inteira
  minimo: (min) => `mínimo ${min}`,                 // a leitura com mínimo
  abaixo: (diferenca, unidade) => `${diferenca} ${unidade} abaixo do mínimo · veículo ou cadastro`,
  semLeitura: 'sem leitura · ligação',
  vazio: '—',
  apagados: (n) => `SEM ENERGIA · ${n} SINAIS · FECHAM ANDANDO`,
  entreSinais: ' · ',
  encerrar: 'ENCERRAR',
  configurar: 'Configurar módulo',
  voltar: 'Voltar ao menu',
  lerNovamente: 'Ler novamente',
}
