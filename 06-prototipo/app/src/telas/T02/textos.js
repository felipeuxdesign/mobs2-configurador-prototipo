// Os textos da T02, copiados do 02-telas/T02-selecionar-contexto/textos.md —
// nunca redigitados. Onde o texto traz um dado (o nome da unidade, a contagem
// de empresas ou de unidades, o termo digitado), a função monta com o valor do
// mock que a tela passa; o resto é a letra da referência. A palavra é unidade
// (a lei 18, decisão 37): *garagem* só aparece quando é o nome da unidade.
export const TX = {
  // 00 a 04 e 06 · as unidades
  titulo: 'Onde você está hoje?',
  buscar: 'Buscar unidade ou cidade',
  escolhaUnidade: 'Escolha uma unidade',
  sincronizar: (nome) => `Sincronizar ${nome}`,
  nadaCom: (termo) => `Nada com “${termo}”`,
  confiraNome: 'Confira o nome, ou busque pela cidade.',
  ativos: (n) => `${n} ativos`,
  // 05 · as empresas, antes das unidades (a otimização do design)
  empresas: (n) => `${n} EMPRESAS`,
  tituloEmpresas: 'Pra qual empresa hoje?',
  unidades: (n) => `${n} unidades`,
  escolhaEmpresa: 'Escolha uma empresa',
  // 07 · o primário com a empresa escolhida (a última entrega desenha, na T02/07)
  verUnidades: 'Ver as unidades',
  // 06 · o link do rodapé das unidades, pra quem tem mais de uma empresa
  trocarEmpresa: 'Trocar de empresa',
  // o diálogo de quem entra depois de outro usuário, sobre as unidades — a T01/18
  // (02-telas/T01-login/textos.md). O usuário anterior e os itens da fila dele são o
  // dado; no singular, *1 item* (o singular vale, a resposta do arquiteto de 26/09)
  outraSessao: 'Outra sessão neste aparelho',
  sessaoEncerrada: (usuario, n) => `A sessão de ${usuario} foi encerrada. A fila dele continua subindo: ${n} ${n === 1 ? 'item' : 'itens'}.`,
  entendi: 'Entendi',
}
