// O caminho feliz (o diretor, 13/10 · src/estado/caminho.js): qualquer módulo e qualquer ônibus
// escolhidos no caminho seguem o caminho do herói, só com os nomes deles — do login ao
// encerramento homologado. Os desvios que o mock guarda pra esses pares só se veem na coluna.
// Uso: MODULO=M2C-0999 PLACA=RKT-8H42 node scripts/caminho.mjs caminho-feliz
//      (UNIDADE=Garagem Ibura pra outra garagem; SEM_BIP=1 pro ônibus sem bip; sem nada, o par do herói)
const MODULO = process.env.MODULO || 'M2C-0417'
const PLACA = process.env.PLACA || 'RKT-8H42'
const UNIDADE = process.env.UNIDADE || 'Garagem Várzea'
const EMPRESA = process.env.EMPRESA || 'Viação Atlântico Sul'

export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  { chega: 'T02', momento: null },
  { marca: EMPRESA },
  { toca: 'Ver as unidades' },
  { marca: UNIDADE },
  { fica: 'T02', ms: 600 },
  { toca: `Sincronizar ${UNIDADE}` },
  { chega: 'T03' },
  // a baixa nunca cai no caminho, em nenhuma unidade
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 7000] },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { toca: 'Entendi' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { marca: MODULO },
  { fica: 'T05', ms: 600 },
  { toca: `Conectar ao ${MODULO}` },
  // o diagnóstico passa sem trava, com o serial escolhido
  { chega: 'T07', momento: null },
  { ve: 'ENCERRAR', entre: [3500, 6500] },
  { ve: '8 de 8' },
  { ve: MODULO },
  { naoVe: 'SERIAL FORA DO CADASTRO' },
  { toca: 'Selecionar ativo' },
  { chega: 'T06', momento: null },
  { marca: PLACA },
  { fica: 'T06', ms: 600 },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { toca: 'Vincular o módulo' },
  // o que vai ser gravado cabe, e a cadeia grava os seis blocos sem cair
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { ve: PLACA },
  { ve: 'cabe no módulo · 96 de 127 contadores' },
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: null },
  { chega: 'T09', momento: '11-momento-conferindo-o-servidor', entre: [5000, 8500] },
  { chega: 'T09', momento: '04-momento-cadeia-concluida', entre: [500, 1800] },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  // nada a calibrar, como o herói
  { toca: 'Calibração' },
  { chega: 'T10', momento: null },
  { ve: 'Nada a calibrar' },
  { toca: 'Fazer o ciclo de testes' },
  // o ciclo chega no prazo, com o motor ligado
  { chega: 'T14' },
  { toca: 'Disparar evento de teste', entre: [2000, 4500] },
  { chega: 'T14', momento: '08-momento-o-modulo-leu-o-cartao', entre: [1000, 20000] },
  { toca: 'Confere com o cartão' },
  { chega: 'T14', momento: '05-momento-ciclo-concluido', entre: [1000, 20000] },
  { toca: 'Ir para o checklist' },
  { chega: 'T13', momento: null },
  // o bip, quando o leitor do ônibus tem (SEM_BIP=1 no caminhão coletor, que não tem: a E já vem resolvida)
  ...(process.env.SEM_BIP ? [] : [
    { toca: 'E · Ciclo de testes' },
    { toca: 'Testar bip' },
    { chega: 'T13', momento: '40-momento-bip-esperando-resposta', entre: [500, 2500] },
    { toca: 'Ouvi' },
    { chega: 'T13', momento: '41-momento-bip-ouvido' },
    { toca: 'E · Ciclo de testes' },
  ]),
  { toca: 'B · Montagem' },
  { toca: 'Módulo' },
  { toca: 'Tirar foto' },
  { toca: 'Tirar foto' },
  { toca: 'Tirar foto' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  // a Seção F não reprova no caminho
  { naoVe: 'Não chegou' },
  { toca: 'Finalizar instalação' },
  { chega: 'T13', momento: '11-momento-aguardando-autoteste' },
  { toca: 'Encerrar sessão' },
  { chega: 'T16', momento: null },
  // homologada, sem bloqueio
  { chega: 'T16', momento: '02-momento-instalacao-homologada', entre: [500, 9000] },
  { naoVe: 'A HOMOLOGAÇÃO FICA BLOQUEADA' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
]
