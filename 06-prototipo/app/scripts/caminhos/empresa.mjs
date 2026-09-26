// A otimização do design · a empresa antes da unidade (logica.md · A empresa e a
// unidade; T02/05 e T02/06, o caso varias-empresas). Com mais de uma empresa, a
// lista delas vem antes: o 05, Pra qual empresa hoje?, e o 06, as unidades com o
// Trocar de empresa no rodapé. Os dois são estados: abrem pela coluna e pelo
// endereço, montados pelo caso, parados e sem toque (palco.md) — o toque de cada
// um, a ordem 05 → 06 → a escolhida → T03, o Trocar de empresa, as duas empresas
// que o mock não traz e o voltar se provam no node, nas funções que a tela usa
// (node scripts/testar-empresa.mjs). Aqui: os dois quadros no app, com a URL
// dizendo cada um, parados; e o herói, com uma empresa só, sem mudança: 00 → 01.
const ESCOLHER = '05-estado-escolher-a-empresa'
const UNIDADES = '06-estado-unidades-com-trocar-empresa'
const esc = { tecla: 'Escape' }
export default [
  // ── o herói, do login: uma empresa só, e o passo da empresa não existe ──
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  { chega: 'T02', momento: null },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { ve: 'Onde você está hoje?' },
  { naoVe: 'Pra qual empresa hoje?' },
  { naoVe: 'EMPRESAS' },
  { naoVe: 'Trocar de empresa' },
  { desligado: 'Escolha uma unidade' },
  // o voltar do sistema não faz nada: a escolha da unidade não tem saída desenhada
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', momento: null },
  { marca: 'Garagem Várzea' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { ve: 'Sincronizar Garagem Várzea' },
  { naoVe: 'Trocar de empresa' },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' },
  { ve: 'GARAGEM VÁRZEA' },

  // ── o 05 pelo endereço: as três empresas, nada escolhido, e o primário apagado ──
  { abre: `?tela=T02&estado=${ESCOLHER}` },
  { chega: 'T02', estado: ESCOLHER },
  { ve: '3 EMPRESAS' },
  { ve: 'Pra qual empresa hoje?' },
  { ve: 'Viação Atlântico Sul' },
  { ve: '3 unidades' },
  { ve: 'Transportes Capibaribe' },
  { ve: '4 unidades' },
  { ve: 'Expresso Caruaruense' },
  { ve: '2 unidades' },
  { ve: 'Escolha uma empresa' },
  { naoVe: 'Onde você está hoje?' },
  { naoVe: 'Trocar de empresa' },
  // parado e sem toque: nenhuma empresa se toca, e o primário também não
  { naoToca: 'Viação Atlântico Sul' },
  { naoToca: 'Transportes Capibaribe' },
  { naoToca: 'Expresso Caruaruense' },
  { naoToca: 'Escolha uma empresa' },
  // o voltar: no estado parado, nada (e no fluxo, também nada — o 05 não tem saída desenhada)
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', estado: ESCOLHER },
  { ve: 'Pra qual empresa hoje?' },

  // ── o 06 pelo endereço: as unidades da Viação, com o Trocar de empresa no rodapé ──
  { abre: `?tela=T02&estado=${UNIDADES}` },
  { chega: 'T02', estado: UNIDADES },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { ve: 'Onde você está hoje?' },
  { ve: 'RMR – RECIFE' },
  { ve: 'Garagem Várzea' },
  { ve: 'pacote de ontem, 07:10' },
  { ve: 'Garagem Ibura' },
  { ve: 'Pátio Caruaru' },
  { ve: 'pacote vencido há 8 dias' },
  { ve: 'Escolha uma unidade' },
  { ve: 'Trocar de empresa' },
  { naoVe: 'Pra qual empresa hoje?' },
  { naoToca: 'Trocar de empresa' },
  { naoToca: 'Garagem Várzea' },
  { naoToca: 'Escolha uma unidade' },
  // o voltar: no estado parado, nada (no fluxo, ele faria o Trocar de empresa — a prova é a do node)
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', estado: UNIDADES },
  { ve: 'Trocar de empresa' },

  // ── o herói de novo, pelo endereço: nada do mundo das empresas vazou ──
  { abre: '?tela=T02' },
  { chega: 'T02', momento: null },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { naoVe: 'Trocar de empresa' },
  { desligado: 'Escolha uma unidade' },
  { abre: '?tela=T02&momento=01-momento-escolhida' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { ve: 'Sincronizar Garagem Várzea' },
  { naoVe: 'Trocar de empresa' },
]
