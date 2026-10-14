// As outras duas empresas do herói (o diretor, 14/10): cada garagem delas é espelho de uma da
// Viação (M.empresas[].garagens no mock) — o mesmo pacote e os mesmos ônibus, com o nome delas.
// Do login: a Transportes Capibaribe, o Ver as unidades aceso, as quatro garagens dela, a Garagem
// Casa Amarela sincronizada com o nome dela, a tira do menu com ele, a folha de trocar de unidade
// com as garagens dela (o Pátio Santa Cruz vencido, apagado, como Caruaru), e a troca pra Garagem
// Afogados (espelho de Ibura), que sincroniza e marca a atual com o nome dela.
const EMPRESA = 'Transportes Capibaribe'
const UNIDADE = 'Garagem Casa Amarela'

export default [
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  { chega: 'T02', momento: null },
  { marca: EMPRESA },
  { ve: 'Ver as unidades' },
  { toca: 'Ver as unidades' },
  { marca: UNIDADE },
  { fica: 'T02', ms: 600 },
  { toca: `Sincronizar ${UNIDADE}` },
  { chega: 'T03' },
  // a baixa nunca cai no caminho, em nenhuma unidade
  { chega: 'T03', momento: '02-momento-concluido', entre: [3000, 7000] },
  { ve: UNIDADE.toUpperCase() },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { ve: UNIDADE.toUpperCase() },
  { toca: 'Entendi' },
  { toca: 'Trocar de unidade — Garagem Casa Amarela' },
  { ve: 'Garagem Afogados' }, { ve: 'Garagem Jaboatão' }, { ve: 'Pátio Santa Cruz' },
  { naoVe: 'Garagem Várzea' },
  { toca: 'Garagem Afogados' },
  { chega: 'T03' },
  { ve: 'GARAGEM AFOGADOS' },
  // a Afogados espelha Ibura: o pacote de 4 dias pergunta antes de baixar
  { ve: 'PACOTE DE 4 DIAS' },
  { toca: 'Sincronizar agora' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 9000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04' },
  { ve: 'GARAGEM AFOGADOS' },
  { toca: 'Trocar de unidade — Garagem Afogados' },
  { ve: 'Garagem Casa Amarela' },
  // a atual marcada na folha é a escolhida, não a espelho
  { executa: `const r = [...document.querySelectorAll('[role=radio]')].find((e) => e.textContent.startsWith('Garagem Afogados')); return r?.getAttribute('aria-checked') === 'true' || 'a Afogados não está marcada'` },
  { naoVe: 'Garagem Várzea' },
]
