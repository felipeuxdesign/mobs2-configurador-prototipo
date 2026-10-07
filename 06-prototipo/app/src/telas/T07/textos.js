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

  // as duas seções
  oModulo: 'O MÓDULO',
  aCan: 'A CAN',
  aCanDo: (modelo) => `A CAN · ${modelo}`,       // o nome do modelo do ativo, em caixa alta (01, 08, 09, 10)
  aguardando: 'AGUARDANDO A CONFIGURAÇÃO DO ATIVO',

  // o módulo depois da configuração: uma linha só (01, 08, 09, 10)
  conferido: 'Conferido na conexão',
  deTotal: (n, total) => `${n} de ${total}`,

  // o aviso que abre as travas sem saída escrita (02, 03 · o pacote 3): o serial e o modelo, do cadastro
  serialForaDoCadastro: 'SERIAL FORA DO CADASTRO',
  pecaAoGestor: (serial) => `Peça ao gestor pra cadastrar o ${serial}.`,
  modeloSemSuporteTitulo: 'MODELO SEM SUPORTE',
  appNaoConfigura: (modelo) => `O app ainda não configura o ${modelo}.`,

  // o que trava (02, 03, 04)
  naoEstaNoCadastro: 'não está no cadastro',
  modeloSemSuporte: 'modelo sem suporte nesta versão',
  semCadastro: 'sem cadastro',
  naLista: (lista) => `na lista: ${lista.join(' e ')}`,   // a rodada 2: o firmware fora da lista (04, 05)

  // o que só informa (05, 07)
  semElaNaoAtualiza: 'sem ela, o firmware não atualiza',
  semRede: 'sem rede',
  // a rodada 2 do retorno do PM: o que só informa — as mensagens no módulo e o alternador da CAN
  soInformacao: 'só informação',
  faixa: (f) => `faixa ${f}`,   // a faixa de operação do modelo, embaixo da alimentação
  mensagens: (n) => `${n} mensagens ainda não enviadas`,
  // a sessão anterior mal encerrada (13): o canal de programação encontrado aberto
  malEncerradaTitulo: 'SESSÃO ANTERIOR MAL ENCERRADA',
  malEncerradaFrase: 'O app fechou o acesso que ficou aberto. Pode seguir.',
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
  comConexaoGravada: 'Com a conexão conferida, o firmware atualiza pelo módulo.',
  gravarConexao: 'Gravar a conexão',
  atualizando: 'Atualizando · não desconecte',
  recomeca: 'O diagnóstico recomeça quando terminar',
  lerDeNovo: 'Ler de novo',
  lendoNaoSaia: 'Lendo · não saia da tela',
}
