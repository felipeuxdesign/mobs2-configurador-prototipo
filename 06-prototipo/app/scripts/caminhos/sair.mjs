// C11 · os diálogos do menu com a sessão aberta (G23, logica.md · ENCERRAR): o
// primário passa pelos 4 passos da sessão abortada da T16 e segue pro destino
// gravado — o login com a fila preservada, ou a sincronização da garagem nova.
const LOGIN_ATE_O_MENU = [
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  { chega: 'T02' },
  { marca: 'Garagem Várzea' },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
]
// o 5º dia do acesso: o aviso na primeira chegada ao menu, e o Entendi fecha (T04/12)
const O_AVISO = [
  { ve: 'Seu acesso vence em 2 dias' },
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
]
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
// os 4 passos, sem confirmação, e o app segue sozinho pro destino
const OS_QUATRO_PASSOS = [
  { chega: 'T16', momento: '03-momento-encerrando-sem-homologar', ms: 1000 },
  { ve: 'Sem homologar · só o que deixa o módulo seguro' },
  { ve: 'Encerrando · não desconecte' },
]

export default [
  { abre: '' },
  ...LOGIN_ATE_O_MENU,
  ...O_AVISO,
  ...SESSAO_ABERTA,
  // Sair da conta: as iniciais → a folha Conta → o diálogo
  { toca: 'Conta — Rafael Vieira' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { ve: 'Rafael Vieira' },
  { ve: 'r.vieira · Viação Atlântico Sul' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { ve: 'itens continuam na fila e sobem no próximo login.' },
  { ve: '3 itens' },
  { ve: 'A sessão de configuração do M2C-0417 é encerrada antes.' },
  // o Cancelar volta à folha de onde o diálogo nasceu (T04·8)
  { toca: 'Cancelar' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { toca: 'Encerrar a sessão e sair' },
  ...OS_QUATRO_PASSOS,
  // fechado o 4º passo, o login, sem a sessão: sem Lembrar meu usuário, o celular não
  // lembra ninguém — o quadro da 15, os dois campos vazios (T01 · entradaDoFluxo)
  { chega: 'T01', momento: null, entre: [1500, 3500] },
  { ve: 'Esqueci a senha' },
  { desligado: 'Digite o usuário' },
  { digita: 'r.vieira', em: 'USUÁRIO' },
  ...LOGIN_ATE_O_MENU,
  { naoVe: 'ENCERRAR' },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'Seu acesso vence em 2 dias' },   // sair e entrar de novo não zera o aviso: ele é uma vez por dia
  // a fila preservada: a mesma conta no cartão (a garagem ativa) e no diálogo (todas)
  { toca: 'Conta — Rafael Vieira' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { toca: 'Sair da conta' },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { ve: '3 itens continuam na fila e sobem no próximo login.' },
  { naoVe: 'A sessão de configuração do' },
  { toca: 'Cancelar' },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { tecla: 'Escape' },   // a folha fecha pelo voltar
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  // 2ª passada: trocar de garagem com a sessão aberta
  ...SESSAO_ABERTA,
  { toca: 'GARAGEM VÁRZEA' },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-garagem' },
  { ve: 'Trocar recarrega os ativos e o pacote desta garagem.' },
  { toca: 'Garagem Ibura' },
  { ve: 'A sessão de configuração do M2C-0417 é encerrada antes da troca.' },
  { ve: 'O que já foi gravado fica no módulo.' },
  { toca: 'Cancelar' },
  { naoVe: 'é encerrada antes da troca.' },
  { ve: 'Trocar recarrega os ativos e o pacote desta garagem.' },
  { toca: 'Garagem Ibura' },
  { toca: 'Encerrar a sessão e trocar' },
  ...OS_QUATRO_PASSOS,
  // fechado o 4º passo, a sincronização da garagem nova
  { chega: 'T03', entre: [1500, 3500] },
  { ve: 'GARAGEM IBURA' },
  { ve: 'Baixando o pacote' },
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 6000] },
  { ve: 'Pacote de hoje' },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { ve: 'GARAGEM IBURA' },
  { ve: 'Sem sessão de configuração' },
  { naoVe: 'ENCERRAR' },
]
