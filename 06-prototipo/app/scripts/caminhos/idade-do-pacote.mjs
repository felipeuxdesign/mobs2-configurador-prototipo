// A idade do pacote no caminho (o diretor, 14/10 · T03/03 e 04): a unidade escolhida na T02 ou na
// folha do menu, cujo pacote no aparelho é de 4 dias (Ibura) ou vencido (Caruaru), pergunta antes de
// baixar · Continuar com este pacote vai ao menu; Sincronizar agora baixa (em Caruaru, a primeira
// baixa cai na rede, o caso sync-falha-rede, e o Reconectar conclui) · a de ontem (Várzea) baixa direto
const ATE_AS_UNIDADES = [
  { abre: '' }, { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' }, { toca: 'Entrar' },
  { chega: 'T02', momento: null }, { marca: 'Viação Atlântico Sul' }, { toca: 'Ver as unidades' },
]
export default [
  // Ibura, pela T02: o pacote de 4 dias pergunta, e Continuar com este pacote vai ao menu
  ...ATE_AS_UNIDADES,
  { marca: 'Garagem Ibura' }, { fica: 'T02', ms: 500 }, { toca: 'Sincronizar Garagem Ibura' },
  { chega: 'T03' }, { ve: 'PACOTE DE 4 DIAS' }, { ve: 'Continuar com este pacote' }, { fica: 'T03', ms: 1500 },
  { toca: 'Continuar com este pacote' }, { chega: 'T04' }, { ve: 'GARAGEM IBURA' },
  // Caruaru, pela T02: o vencido pede sincronizar; a baixa cai na rede (o caso), e o Reconectar conclui
  ...ATE_AS_UNIDADES,
  { marca: 'Pátio Caruaru' }, { fica: 'T02', ms: 500 }, { toca: 'Sincronizar Pátio Caruaru' },
  { chega: 'T03' }, { ve: 'ENQUANTO NÃO SINCRONIZAR' }, { ve: 'Trocar de unidade' }, { fica: 'T03', ms: 1500 },
  { toca: 'Sincronizar agora' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 8000 }, { toca: 'Reconectar' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 9000 }, { toca: 'Ir para o menu' }, { chega: 'T04' },
  // a Várzea, de ontem: baixa direto, sem perguntar
  ...ATE_AS_UNIDADES,
  { marca: 'Garagem Várzea' }, { fica: 'T02', ms: 500 }, { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' }, { naoVe: 'Continuar com este pacote' }, { chega: 'T03', momento: '02-momento-concluido', ms: 9000 },
  { toca: 'Ir para o menu' }, { chega: 'T04' }, { toca: 'Entendi' },
  // Ibura pela folha do menu: o pacote de 4 dias pergunta de novo; Sincronizar agora baixa
  { toca: 'Trocar de unidade — Garagem Várzea' }, { toca: 'Garagem Ibura' },
  { chega: 'T03' }, { ve: 'PACOTE DE 4 DIAS' }, { toca: 'Sincronizar agora' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 9000 }, { ve: 'GARAGEM IBURA' },
]
