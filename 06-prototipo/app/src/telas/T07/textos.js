// T07 · os textos da tela, exatamente como no 02-telas/T07-diagnostico-do-modulo/textos.md
// — nunca redigitados. Onde o texto traz um dado (a contagem, a porcentagem, as
// versões homologadas, o motivo, o esperado, o nome do modelo do ativo), a moldura
// é daqui e o dado vem do mock, na hora de montar. A frase da caixa da CAN que
// espera é do mock (M.diagnostico.canAguarda), igual à do textos.md.
export const T = {
  titulo: 'Diagnóstico do módulo',
  de: (total) => `de ${total}`,
  semAtivo: 'sem ativo',
  encerrar: 'ENCERRAR',
  foraDoCadastro: 'fora do cadastro',

  // as duas seções
  oModulo: 'O MÓDULO',
  aCan: 'A CAN',
  aCanDo: (modelo) => `A CAN · ${modelo}`,       // o nome do modelo do ativo, em caixa alta (01, 08, 09, 10)
  aguardando: 'AGUARDANDO A CONFIGURAÇÃO DO ATIVO',

  // o módulo depois da configuração: uma linha só (01, 08, 09, 10)
  conferido: 'Conferido na conexão',
  deTotal: (n, total) => `${n} de ${total}`,

  // o que trava (02, 03, 04)
  naoEstaNoCadastro: 'não está no cadastro',
  modeloSemSuporte: 'modelo sem suporte nesta versão',
  semCadastro: 'sem cadastro',
  homologadas: (lista) => `homologadas ${lista.join(' e ')}`,

  // o que só informa (05, 07)
  semElaNaoAtualiza: 'sem ela, o firmware não atualiza',
  semRede: 'sem rede',
  daPraSeguir: 'dá pra seguir · o checklist registra',

  // a CAN (08, 09)
  semLeitura: (motivo) => `sem leitura · ${motivo}`,
  foraDoEsperado: (esperado) => `fora do esperado · ${esperado}`,

  // o que corre: a linha que lê, a que espera (06, 10)
  lendo: 'lendo',
  vazio: '—',
  atualizandoPct: (pct) => `atualizando · ${pct}%`,

  // o rodapé
  selecionarAtivo: 'Selecionar ativo',
  voltarAoMenu: 'Voltar ao menu',
  procurarOutro: 'Procurar outro módulo',
  atualizarFirmware: 'Atualizar firmware',
  comConexaoGravada: 'Com a conexão gravada, o firmware atualiza pelo módulo.',
  gravarConexao: 'Gravar a conexão',
  atualizando: 'Atualizando · não desconecte',
  recomeca: 'O diagnóstico recomeça quando terminar',
  lerDeNovo: 'Ler de novo',
  lendoNaoSaia: 'Lendo · não saia da tela',
}
