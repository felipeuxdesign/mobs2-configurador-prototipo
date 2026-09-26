// A empresa antes da unidade (logica.md · A empresa e a unidade; T02/05, 06 e 07,
// o caso varias-empresas). Com mais de uma empresa, a lista delas vem antes. O 05
// e o 06 são estados: abrem pela coluna e pelo endereço, parados e sem toque
// (palco.md). O 07, a empresa escolhida (a última entrega), é um momento: aberto
// pelo endereço, é o app vivo no mundo do caso, e o técnico anda — 07 → Ver as
// unidades → as unidades (o quadro do 06) → a escolhida (01) → Sincronizar → T03
// → o menu, com o Trocar de empresa na folha de trocar de unidade (o quadro da
// T04/14), que volta ao 07 com a atual marcada; com a sessão aberta, pela
// confirmação e pelos 4 passos da T16. As outras duas empresas se escolhem, e o
// Ver as unidades espera (só a do herói anda, a resposta do arquiteto de 26/09).
// E o herói, com uma empresa só, sem mudança: 00 → 01. O que cada função faz se
// prova no node (testar-empresa.mjs, testar-trocar-empresa.mjs).
const ESCOLHER = '05-estado-escolher-a-empresa'
const UNIDADES = '06-estado-unidades-com-trocar-empresa'
const ESCOLHIDA = '07-momento-empresa-escolhida'
const esc = { tecla: 'Escape' }
// as empresas com a atual marcada: o 07, com o primário aceso
const NO_07 = [
  { chega: 'T02', momento: ESCOLHIDA },
  { ve: '3 EMPRESAS' },
  { ve: 'Pra qual empresa hoje?' },
  { naoVe: 'Escolha uma empresa' },
  { ve: 'Ver as unidades' },
  { naoVe: 'Onde você está hoje?' },
]
// Ver as unidades → as unidades da Viação, com o Trocar de empresa no rodapé e nada
// escolhido: o quadro do 06, que é estado — a URL fica sem momento
const AS_UNIDADES = [
  { toca: 'Ver as unidades' },
  { chega: 'T02', momento: null },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { ve: 'Onde você está hoje?' },
  { ve: 'Garagem Várzea' },
  { ve: 'pacote de ontem, 07:10' },
  { ve: 'Trocar de empresa' },
  { desligado: 'Escolha uma unidade' },
]
// a Várzea escolhida → Sincronizar → a T03 baixa o pacote dela → o menu sem sessão
const ATE_O_MENU = [
  { marca: 'Garagem Várzea' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' },
  { ve: 'GARAGEM VÁRZEA' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
]
// a folha de trocar de unidade, com o Trocar de empresa no fim (o quadro da T04/14)
const A_FOLHA = [
  { toca: 'Trocar de unidade — Garagem Várzea' },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-garagem' },
  { ve: 'Trocar recarrega os ativos e o pacote desta unidade.' },
  { ve: 'Garagem Ibura' },
  { ve: 'Trocar de empresa' },
]
// a sessão aberta do herói: o M2C-0417 e o RKT-8H42 (como no sair.mjs)
const SESSAO_ABERTA = [
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T05', momento: '05-momento-pre-checagem' },
  { ve: 'ENCERRAR', ms: 12000 },
  { toca: 'Selecionar ativo' },
  { chega: 'T06' },
  { marca: 'RKT-8H42' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { toca: 'Usar este ativo' },
  { chega: 'T07' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: null },
  { ve: 'RKT-8H42' },
  { ve: 'ENCERRAR' },
]

export default [
  // ── o 07 pelo endereço: o app vivo no mundo do caso, com a Viação marcada ──
  { abre: `?tela=T02&momento=${ESCOLHIDA}` },
  ...NO_07,
  // o voltar do sistema não faz nada nas empresas: a tela não tem saída desenhada (padrão c)
  esc,
  { fica: 'T02', ms: 500 },
  ...NO_07,
  // as outras duas se escolhem, e o Ver as unidades espera: o mock só traz a contagem delas
  { marca: 'Transportes Capibaribe' },
  { chega: 'T02', momento: ESCOLHIDA },
  { desligado: 'Ver as unidades' },
  { marca: 'Expresso Caruaruense' },
  { chega: 'T02', momento: ESCOLHIDA },
  { desligado: 'Ver as unidades' },
  { marca: 'Viação Atlântico Sul' },
  ...NO_07,
  ...AS_UNIDADES,
  { naoVe: 'Pra qual empresa hoje?' },
  // o voltar, nas unidades, faz o Trocar de empresa: o 07, com a atual marcada
  esc,
  ...NO_07,
  ...AS_UNIDADES,
  // a escolhida: o 01, com o Trocar de empresa ainda no rodapé (padrão d)
  { marca: 'Garagem Ibura' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { ve: 'Sincronizar Garagem Ibura' },
  { ve: 'Trocar de empresa' },
  // Trocar de empresa: o 07, com a atual marcada — a escolha da unidade não fica
  { toca: 'Trocar de empresa' },
  ...NO_07,
  ...AS_UNIDADES,
  // a T03 que volta ao contexto: as unidades da atual, sem nada escolhido (o quadro do 06).
  // A primeira baixa do Pátio Caruaru cai na rede (o caso sync-falha-rede)
  { marca: 'Pátio Caruaru' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { toca: 'Sincronizar Pátio Caruaru' },
  { chega: 'T03' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 8000 },
  { toca: 'Voltar ao contexto' },
  { chega: 'T02', momento: null },
  { ve: 'Onde você está hoje?' },
  { ve: 'Trocar de empresa' },
  { desligado: 'Escolha uma unidade' },

  // ── do 07 ao menu, e de volta pelo Trocar de empresa da folha, sem sessão: direto ──
  ...ATE_O_MENU,
  // o aviso do acesso, na primeira chegada ao menu (T04/12)
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  ...A_FOLHA,
  { toca: 'Trocar de empresa' },
  ...NO_07,
  { naoVe: 'Trocar de unidade' },

  // ── de novo, agora com a sessão aberta: a confirmação, os 4 passos, e o 07 ──
  ...AS_UNIDADES,
  ...ATE_O_MENU,
  ...SESSAO_ABERTA,
  ...A_FOLHA,
  { toca: 'Trocar de empresa' },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-garagem' },
  { ve: 'é encerrada antes da troca, sem homologar.' },
  { ve: 'O que já foi gravado fica no módulo.' },
  { ve: 'Encerrar a sessão e trocar' },
  // o Cancelar fecha o diálogo e volta à folha, com a sessão aberta
  { toca: 'Cancelar' },
  { naoVe: 'Encerrar a sessão e trocar' },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-garagem' },
  { ve: 'Trocar recarrega os ativos e o pacote desta unidade.' },
  { toca: 'Trocar de empresa' },
  { ve: 'Encerrar a sessão e trocar' },
  { toca: 'Encerrar a sessão e trocar' },
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar', ms: 1000 },
  { naoVe: 'Encerrar sem homologar?', ms: 300 },
  { ve: 'Sem homologar · só o que deixa o módulo seguro' },
  // depois dos 4 passos, a T02/07, com a atual marcada (MUDA: ia ao 05)
  ...NO_07.map((p) => (p.chega ? { ...p, ms: 20000 } : p)),
  ...AS_UNIDADES,

  // ── o 05 pelo endereço: as três empresas, nada escolhido, parado e sem toque ──
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
  { naoToca: 'Viação Atlântico Sul' },
  { naoToca: 'Transportes Capibaribe' },
  { naoToca: 'Expresso Caruaruense' },
  { naoToca: 'Escolha uma empresa' },
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', estado: ESCOLHER },

  // ── o 06 pelo endereço: as unidades da Viação, com o Trocar de empresa, parado ──
  { abre: `?tela=T02&estado=${UNIDADES}` },
  { chega: 'T02', estado: UNIDADES },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { ve: 'Onde você está hoje?' },
  { ve: 'RMR – RECIFE' },
  { ve: 'Garagem Várzea' },
  { ve: 'Pátio Caruaru' },
  { ve: 'pacote vencido há 8 dias' },
  { ve: 'Escolha uma unidade' },
  { ve: 'Trocar de empresa' },
  { naoVe: 'Pra qual empresa hoje?' },
  { naoToca: 'Trocar de empresa' },
  { naoToca: 'Garagem Várzea' },
  { naoToca: 'Escolha uma unidade' },
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', estado: UNIDADES },

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
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', momento: null },
  { marca: 'Garagem Várzea' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { ve: 'Sincronizar Garagem Várzea' },
  { naoVe: 'Trocar de empresa' },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { toca: 'Entendi' },
  // a folha do herói não tem o Trocar de empresa
  { toca: 'Trocar de unidade — Garagem Várzea' },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-garagem' },
  { ve: 'Garagem Ibura' },
  { naoVe: 'Trocar de empresa' },
  // e o endereço do 01 é o do herói
  { abre: '?tela=T02&momento=01-momento-escolhida' },
  { chega: 'T02', momento: '01-momento-escolhida' },
  { ve: 'Sincronizar Garagem Várzea' },
  { naoVe: 'Trocar de empresa' },
]
