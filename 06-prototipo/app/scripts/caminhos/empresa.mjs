// A empresa vem sempre antes da unidade, pra todo técnico (decisão 37, revista pelo
// diretor em 26/09; logica.md · A empresa e a unidade; a otimização 400). Os dois
// caminhos inteiros, com a URL de cada quadro:
//  · o do herói, com as três empresas dele (M.empresas), do login: 05 as empresas,
//    nada escolhido → a Viação, 07 → Ver as unidades → as unidades da Viação, com o
//    Trocar de empresa (o quadro do 06: a URL fica sem momento, porque o 06 é estado,
//    e estado parado não anda) → a unidade, 09, com o Trocar de empresa ainda lá →
//    Sincronizar → T03 → o menu, com o Trocar de empresa na folha de trocar de
//    unidade (o quadro da T04/14), que volta ao 07 com a atual marcada; com a sessão
//    aberta, pela confirmação e pelos 4 passos da T16. As outras duas empresas se
//    escolhem, e o Ver as unidades espera (só a do herói anda, o arquiteto, 26/09).
//    O Trocar de empresa e o voltar, nas unidades, levam ao 07; nas empresas, o
//    voltar não faz nada
//  · o de uma empresa só (o caso uma-empresa): o 08, a empresa já marcada, parado
//    pela coluna e pelo endereço → a 00, as unidades, aberta pelo endereço da tela
//    (o app vivo, a semente da T02) → a unidade, 01, sem o Trocar de empresa →
//    Sincronizar → T03 → o menu, com a folha sem o Trocar de empresa (o quadro da
//    T04/07, que o endereço dele também abre)
// E os estados parados: o 05, o 06 e o 08, e o Voltar ao fluxo que devolve o quadro de
// antes, no mesmo mundo: as unidades da Viação depois do Ver as unidades (do Entrar, do
// Trocar de empresa do menu e do 07 pelo endereço), e o 07 depois do Trocar de empresa. O
// que cada função faz se prova no node (testar-empresa.mjs, testar-trocar-empresa.mjs).
const ESCOLHER = '05-estado-escolher-a-empresa'
const UNIDADES = '06-estado-unidades-com-trocar-empresa'
const ESCOLHIDA = '07-momento-empresa-escolhida'
const JA_MARCADA = '08-estado-uma-empresa-ja-marcada'
const COM_TROCA = '09-momento-unidade-escolhida-com-trocar-empresa'
const UMA_ESCOLHIDA = '01-momento-escolhida'
const FOLHA = '07-momento-folha-trocar-de-garagem'
const esc = { tecla: 'Escape' }
// a entrada do herói: as três empresas, nada escolhido — o quadro do 05, sem momento na URL
const NO_05 = [
  { chega: 'T02', momento: null },
  { ve: '3 EMPRESAS' },
  { ve: 'Pra qual empresa hoje?' },
  { ve: 'Viação Atlântico Sul' },
  { ve: 'Transportes Capibaribe' },
  { ve: 'Expresso Caruaruense' },
  { desligado: 'Escolha uma empresa' },
  { naoVe: 'Ver as unidades' },
  { naoVe: 'Onde você está hoje?' },
]
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
  { naoVe: 'Pra qual empresa hoje?' },
]
// o mesmo quadro, sem o toque: as unidades da Viação que o Voltar ao fluxo devolve
const NAS_UNIDADES = AS_UNIDADES.slice(1)
// a Várzea escolhida: o 09, com o Trocar de empresa ainda no rodapé
const NO_09 = [
  { marca: 'Garagem Várzea' },
  { chega: 'T02', momento: COM_TROCA },
  { ve: 'Sincronizar Garagem Várzea' },
  { ve: 'Trocar de empresa' },
]
// do 09, Sincronizar → a T03 baixa o pacote dela → o menu sem sessão
const DO_09_AO_MENU = [
  ...NO_09,
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' },
  { ve: 'GARAGEM VÁRZEA' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
]
// a folha de trocar de unidade do herói, com o Trocar de empresa no fim (o quadro da T04/14)
const A_FOLHA = [
  { toca: 'Trocar de unidade — Garagem Várzea' },
  { chega: 'T04', momento: FOLHA },
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
  // a conexão abre o diagnóstico (T07, pacote 1): as sete passam, e a faixa desce
  { chega: 'T07' },
  { ve: 'ENCERRAR', ms: 12000 },
  { toca: 'Selecionar ativo' },
  { chega: 'T06' },
  { marca: 'RKT-8H42' },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: null },
  { ve: 'RKT-8H42' },
  { ve: 'ENCERRAR' },
]
// as unidades de quem tem uma empresa só: a 00, com o nome dela em cima e sem o Trocar de empresa
const NA_00 = [
  { chega: 'T02', momento: null },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { ve: 'Onde você está hoje?' },
  { ve: 'Garagem Várzea' },
  { ve: 'pacote de ontem, 07:10' },
  { desligado: 'Escolha uma unidade' },
  { naoVe: 'Trocar de empresa' },
  { naoVe: 'Pra qual empresa hoje?' },
]

export default [
  // ══ o caminho do herói, do login: 05 → 07 → 06 → 09 → T03 ══
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  ...NO_05,
  // o voltar do sistema não faz nada nas empresas: a tela não tem saída desenhada (padrão c)
  esc,
  { fica: 'T02', ms: 500 },
  ...NO_05,
  // as outras duas se escolhem, e o Ver as unidades espera: o mock só traz a contagem delas
  { marca: 'Transportes Capibaribe' },
  { chega: 'T02', momento: ESCOLHIDA },
  { desligado: 'Ver as unidades' },
  { marca: 'Expresso Caruaruense' },
  { chega: 'T02', momento: ESCOLHIDA },
  { desligado: 'Ver as unidades' },
  // a Viação: o 07, com o primário aceso
  { marca: 'Viação Atlântico Sul' },
  ...NO_07,
  esc,
  { fica: 'T02', ms: 500 },
  ...NO_07,
  ...AS_UNIDADES,
  // o voltar, nas unidades, faz o Trocar de empresa: o 07, com a atual marcada
  esc,
  ...NO_07,
  ...AS_UNIDADES,
  // a escolhida: o 09, com o Trocar de empresa ainda no rodapé
  { marca: 'Garagem Ibura' },
  { chega: 'T02', momento: COM_TROCA },
  { ve: 'Sincronizar Garagem Ibura' },
  { ve: 'Trocar de empresa' },
  // Trocar de empresa: o 07, com a atual marcada — a escolha da unidade não fica
  { toca: 'Trocar de empresa' },
  ...NO_07,
  ...AS_UNIDADES,
  // o voltar, no 09, também
  ...NO_09,
  esc,
  ...NO_07,
  ...AS_UNIDADES,
  // a T03 que volta ao contexto: as unidades da atual, sem nada escolhido (o quadro do 06).
  // A primeira baixa do Pátio Caruaru cai na rede (o caso sync-falha-rede)
  { marca: 'Pátio Caruaru' },
  { chega: 'T02', momento: COM_TROCA },
  { toca: 'Sincronizar Pátio Caruaru' },
  { chega: 'T03' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 8000 },
  { toca: 'Voltar ao contexto' },
  { chega: 'T02', momento: null },
  { ve: 'Onde você está hoje?' },
  { ve: 'Trocar de empresa' },
  { desligado: 'Escolha uma unidade' },

  // ── do 09 ao menu, e de volta pelo Trocar de empresa da folha, sem sessão: direto ──
  ...DO_09_AO_MENU,
  // o aviso do acesso, na primeira chegada ao menu (T04/12)
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  ...A_FOLHA,
  { toca: 'Trocar de empresa' },
  ...NO_07,
  { naoVe: 'Trocar de unidade' },

  // ── de novo, agora com a sessão aberta: a confirmação, os 4 passos, e o 07 ──
  ...AS_UNIDADES,
  ...DO_09_AO_MENU,
  ...SESSAO_ABERTA,
  ...A_FOLHA,
  { toca: 'Trocar de empresa' },
  { chega: 'T04', momento: FOLHA },
  { ve: 'é encerrada antes da troca, sem homologar.' },
  { ve: 'O que já foi gravado fica no módulo.' },
  { ve: 'Encerrar a sessão e trocar' },
  // o Cancelar fecha o diálogo e volta à folha, com a sessão aberta
  { toca: 'Cancelar' },
  { naoVe: 'Encerrar a sessão e trocar' },
  { chega: 'T04', momento: FOLHA },
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

  // ── o 07 e o 09 pelo endereço: o app vivo no mundo do herói ──
  { abre: `?tela=T02&momento=${ESCOLHIDA}` },
  ...NO_07,
  { ve: 'Transportes Capibaribe' },
  ...AS_UNIDADES,
  { abre: `?tela=T02&momento=${COM_TROCA}` },
  { chega: 'T02', momento: COM_TROCA },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { ve: 'Sincronizar Garagem Várzea' },
  { ve: 'Trocar de empresa' },
  { toca: 'Trocar de empresa' },
  ...NO_07,

  // ── o menu pelo pulo do palco é o do herói: a folha com o Trocar de empresa, e o
  // Voltar ao fluxo, depois de um estado da coluna, reabre a mesma folha (a janela larga, com a coluna) ──
  { abre: '?tela=T04' },
  { janela: [1440, 900] },
  { chega: 'T04', momento: null },
  { toca: 'Entendi' },
  ...A_FOLHA,
  // pacote 3 (D2): as folhas de trocar abrem por um toque e saíram da coluna (o campo `coluna` do índice):
  // o estado 14 não se abre mais pela coluna, e o Voltar ao fluxo que reabria a folha não tem mais de onde partir
  { ve: 'Garagem Ibura' },
  { ve: 'Trocar de empresa' },

  // ── o Voltar ao fluxo devolve o quadro de antes, no mesmo mundo (palco.md · o instante de
  // antes do primeiro estado aberto): o Ver as unidades e o Trocar de empresa gravam o quadro
  // no estado único (T02/empresas.js · contextoDoQuadro) ──
  // do login: o Entrar → a Viação → Ver as unidades → um estado da coluna → as unidades da Viação, não o 05
  { abre: '' },
  { chega: 'T01', momento: null },
  { digita: 'Varzea26', em: 'SENHA' },
  { toca: 'Entrar' },
  ...NO_05,
  { marca: 'Viação Atlântico Sul' },
  ...NO_07,
  ...AS_UNIDADES,
  { palco: 'Escolher a empresa' },
  { chega: 'T02', estado: ESCOLHER },
  { palco: 'Voltar ao fluxo' },
  ...NAS_UNIDADES,
  // o Trocar de empresa → o 07 → um estado → o 07 de novo, com a atual marcada
  { toca: 'Trocar de empresa' },
  ...NO_07,
  { palco: 'Unidades, com trocar de empresa' },
  { chega: 'T02', estado: UNIDADES },
  { palco: 'Voltar ao fluxo' },
  ...NO_07,
  // do Trocar de empresa do menu, sem sessão: Ver as unidades → um estado → as unidades, não o 07
  ...AS_UNIDADES,
  ...DO_09_AO_MENU,
  { toca: 'Entendi' },
  ...A_FOLHA,
  { toca: 'Trocar de empresa' },
  ...NO_07,
  ...AS_UNIDADES,
  { palco: 'Unidades, com trocar de empresa' },
  { chega: 'T02', estado: UNIDADES },
  { palco: 'Voltar ao fluxo' },
  ...NAS_UNIDADES,
  // do 07 pelo endereço: Ver as unidades → um estado → as unidades do herói, com o Trocar de
  // empresa — não a 00 de uma empresa só, a semente da T02
  { abre: `?tela=T02&momento=${ESCOLHIDA}` },
  ...NO_07,
  ...AS_UNIDADES,
  { palco: 'Escolher a empresa' },
  { chega: 'T02', estado: ESCOLHER },
  { palco: 'Voltar ao fluxo' },
  ...NAS_UNIDADES,
  { toca: 'Trocar de empresa' },
  ...NO_07,

  // ── os estados pelo endereço: parados e sem toque ──
  // o 05: as três empresas, nada escolhido
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
  // o 06: as unidades da Viação, com o Trocar de empresa
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

  // ══ uma empresa só (o caso uma-empresa): 08 → 00 → 01 → T03 ══
  // o 08: a lista com ela já marcada e o Ver as unidades aceso, parado
  { abre: `?tela=T02&estado=${JA_MARCADA}` },
  { chega: 'T02', estado: JA_MARCADA },
  { ve: '1 EMPRESA' },
  { ve: 'Pra qual empresa hoje?' },
  { ve: 'Viação Atlântico Sul' },
  { ve: '3 unidades' },
  { ve: 'Ver as unidades' },
  { naoVe: 'Transportes Capibaribe' },
  { naoVe: 'Escolha uma empresa' },
  { naoVe: 'Onde você está hoje?' },
  { naoToca: 'Viação Atlântico Sul' },
  { naoToca: 'Ver as unidades' },
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', estado: JA_MARCADA },
  // o Voltar ao fluxo de um estado aberto pelo endereço monta a semente da tela: a 00
  { palco: 'Voltar ao fluxo' },
  ...NA_00,
  // a 00 pelo endereço da tela: o app vivo, as unidades, e o voltar não faz nada
  { abre: '?tela=T02' },
  ...NA_00,
  esc,
  { fica: 'T02', ms: 500 },
  ...NA_00,
  // a escolhida: o 01, sem o Trocar de empresa
  { marca: 'Garagem Várzea' },
  { chega: 'T02', momento: UMA_ESCOLHIDA },
  { ve: 'Sincronizar Garagem Várzea' },
  { naoVe: 'Trocar de empresa' },
  esc,
  { fica: 'T02', ms: 500 },
  { chega: 'T02', momento: UMA_ESCOLHIDA },
  // a T03 que volta ao contexto: a 00 de novo, nesse mundo. A primeira baixa do Pátio Caruaru cai na rede
  { marca: 'Pátio Caruaru' },
  { chega: 'T02', momento: UMA_ESCOLHIDA },
  { toca: 'Sincronizar Pátio Caruaru' },
  { chega: 'T03' },
  { ve: 'A BAIXA PAROU ONDE ESTAVA', ms: 8000 },
  { toca: 'Voltar ao contexto' },
  ...NA_00,
  // → T03 → o menu, com a folha sem o Trocar de empresa (o quadro da T04/07)
  { marca: 'Garagem Várzea' },
  { chega: 'T02', momento: UMA_ESCOLHIDA },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { toca: 'Entendi' },
  { toca: 'Trocar de unidade — Garagem Várzea' },
  { chega: 'T04', momento: FOLHA },
  { ve: 'Garagem Ibura' },
  { naoVe: 'Trocar de empresa' },
  // e o endereço do 01 é o de uma empresa só
  { abre: `?tela=T02&momento=${UMA_ESCOLHIDA}` },
  { chega: 'T02', momento: UMA_ESCOLHIDA },
  { ve: 'VIAÇÃO ATLÂNTICO SUL' },
  { ve: 'Sincronizar Garagem Várzea' },
  { naoVe: 'Trocar de empresa' },
  // e o da folha, T04/07, também: sem o Trocar de empresa
  { abre: `?tela=T04&momento=${FOLHA}` },
  { chega: 'T04', momento: FOLHA },
  { ve: 'Trocar recarrega os ativos e o pacote desta unidade.' },
  { ve: 'Garagem Ibura' },
  { naoVe: 'Trocar de empresa' },
]
