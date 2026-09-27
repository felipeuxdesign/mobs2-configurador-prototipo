// A última entrega · outro usuário no aparelho (T01/18, HU-T01-4, o caso
// outro-usuario): entrar com um usuário diferente do da sessão anterior encerra a
// sessão dele, e a fila dele continua subindo — a fila é do aparelho (decisão 42).
// O diálogo *Outra sessão neste aparelho* abre sobre a entrada da T02 — as
// empresas, com a empresa antes da unidade (decisão 37, revista); pela coluna, a
// 18, sobre as unidades, como a referência desenha —, e o Entendi (ou o voltar) fecha. Só por toque: o r.vieira entra e sai da conta; o
// m.souza entra — o login deixa, pela regra do tela.md (qualquer senha com o
// mínimo; o roteiro digita a mesma dos outros roteiros) — e o diálogo diz o
// r.vieira e os 3 itens da fila; o m.souza é quem está no menu; ele sai e entra de
// novo, sem diálogo; e o r.vieira, de volta, vê o diálogo com o m.souza. O
// primeiro Entrar do palco nunca abre o diálogo. A 18 pela coluna fica parada.
// A revisão de 26/09 (ultima-conserto, padrão 2): com o m.souza no menu, o
// detalhe da RKT-8H42 (a i-01, a do herói) segue dizendo quem instalou, o
// Rafael Vieira do mock — o autor sai do dado, nunca de quem está logado.
const OUTRA = 'Outra sessão neste aparelho'
const ATE_O_MENU = [
  // a empresa antes da unidade (decisão 37, revista): a Viação, e as unidades dela
  { marca: 'Viação Atlântico Sul' },
  { toca: 'Ver as unidades' },
  { marca: 'Garagem Várzea' },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
]
// sair da conta sem sessão: a fila do aparelho tem itens, e o diálogo diz isso (T04·5 a)
const sair = (nome) => [
  { toca: `Conta — ${nome}` },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { toca: 'Sair da conta' },
  { ve: '3' },
  { ve: 'itens continuam na fila e sobem no próximo login.' },
  { toca: 'Encerrar a sessão e sair' },
  { chega: 'T01', momento: null },
]
const entra = (usuario) => [
  { digita: usuario, em: 'USUÁRIO' },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  { chega: 'T02', momento: null },
]

export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  // o primeiro Entrar do palco: nenhuma sessão anterior neste aparelho, e nenhum diálogo
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  { chega: 'T02', momento: null },
  { naoVe: OUTRA, ms: 600 },
  ...ATE_O_MENU,
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  ...sair('Rafael Vieira'),

  // o m.souza entra: o diálogo sobre a entrada da T02 — com a empresa antes da unidade
  // (decisão 37, revista), as empresas —, com o r.vieira e a fila dele
  ...entra('m.souza'),
  { ve: OUTRA },
  { ve: 'A sessão de r.vieira foi encerrada. A fila dele continua subindo: 3 itens.' },
  { ve: 'Pra qual empresa hoje?' },
  { ve: 'Viação Atlântico Sul' },
  // as empresas ficam atrás do véu, sem toque; o Entendi é o único jeito de fechar
  { naoToca: 'Viação Atlântico Sul' },
  { naoToca: 'Escolha uma empresa' },
  { toca: 'Entendi' },
  { naoVe: OUTRA },
  { chega: 'T02', momento: null },
  { desligado: 'Escolha uma empresa' },
  // o m.souza é quem está no menu: Marcos Souza, m.souza
  ...ATE_O_MENU,
  { toca: 'Conta — Marcos Souza' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { ve: 'Marcos Souza' },
  { ve: 'm.souza · Viação Atlântico Sul' },
  { toca: 'Fechar' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  // o autor da instalação é o do dado: a i-01 é do Rafael Vieira com qualquer um logado
  { toca: 'Últimas instalações' },
  { chega: 'T12', momento: null },
  { toca: 'RKT-8H42' },
  { chega: 'T12', momento: '01-momento-detalhe-da-instalacao' },
  { ve: 'M2C-0417 · hoje, 11:47 · Rafael Vieira' },
  { naoVe: 'M2C-0417 · hoje, 11:47 · Marcos Souza', ms: 400 },
  { tecla: 'Escape' },
  { chega: 'T12', momento: null },
  { tecla: 'Escape' },
  { chega: 'T04' },
  ...sair('Marcos Souza'),

  // o mesmo usuário de novo: nenhum diálogo
  ...entra('m.souza'),
  { naoVe: OUTRA, ms: 600 },
  ...ATE_O_MENU,
  ...sair('Marcos Souza'),

  // o r.vieira de volta: o diálogo diz o m.souza; o voltar do sistema fecha, como o Entendi
  ...entra('r.vieira'),
  { ve: OUTRA },
  { ve: 'A sessão de m.souza foi encerrada. A fila dele continua subindo: 3 itens.' },
  { tecla: 'Escape' },
  { naoVe: OUTRA },
  { fica: 'T02', ms: 400 },
  { chega: 'T02', momento: null },
  { marca: 'Viação Atlântico Sul' },
  { chega: 'T02', momento: '07-momento-empresa-escolhida' },
  { toca: 'Ver as unidades' },
  { marca: 'Garagem Várzea' },
  { chega: 'T02', momento: '09-momento-unidade-escolhida-com-trocar-empresa' },
  { ve: 'Sincronizar Garagem Várzea' },

  // a 18 pela coluna: parada e sem toque, e o voltar não escuta
  { abre: '?tela=T01&estado=18-estado-outro-usuario-no-aparelho' },
  { chega: 'T01', estado: '18-estado-outro-usuario-no-aparelho' },
  { ve: OUTRA },
  { ve: 'A sessão de r.vieira foi encerrada. A fila dele continua subindo: 3 itens.' },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { naoToca: 'Entendi' },
  { tecla: 'Escape' },
  { fica: 'T01', ms: 500 },
  { ve: OUTRA },
]
