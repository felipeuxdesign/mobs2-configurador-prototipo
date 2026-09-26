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
  // o primário com a empresa escolhida: o tela.md diz, e nenhuma referência desenha
  verUnidades: 'Ver as unidades',
  // 06 · o link do rodapé das unidades, pra quem tem mais de uma empresa
  trocarEmpresa: 'Trocar de empresa',
}
