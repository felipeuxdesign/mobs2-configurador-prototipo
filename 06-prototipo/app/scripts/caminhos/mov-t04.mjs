// C12 · o movimento da T04 · Menu (02-telas/T04-menu/animacao.md; gate C12·2, 3, 6, 24, 26, 27
// e 43). No menu, nada se move ao chegar: a sessão nasce na conexão (T05), a faixa desce no
// diagnóstico (T07), quando as sete linhas passam sem trava, e o menu já abre com ela (C12·24 a, pacote 1); os cartões liberados chegam com o esmaecer entre telas, sem
// nada mudando depois (C12·26 a); o contador da fila e do checklist troca no lugar. O que se move
// é o que vem por cima, o mesmo peso em todo o app (src/ds/chrome/PorCima.jsx): a folha sobe em
// 200 e desce em 150, com o véu — no X, tocando fora, arrastando e no voltar (lei 20) —; o diálogo
// nasce e some em 150, de 98% a 100%; e a folha que vira diálogo deixa o véu aceso, parado: a
// folha desce em 150 enquanto o diálogo nasce, e no Cancelar o diálogo some enquanto a folha sobe
// de novo em 200 (C12·27, C12·43); no Encerrar antes de terminar?, só o pedaço novo do véu, em cima,
// esmaece. Os toques que levam a outra tela esmaecem o conteúdo dela em 150, e o topo troca
// direto (C12·2, C12·3). Pela URL, no palco, num estado e no print, o menu abre parado; com
// reduzir movimento, tudo direto.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em, ms = 150) => ({ prop: 'opacity', ms, em, curva: C })
const desliza = (em, ms = 150) => ({ prop: 'transform', ms, em, curva: C })
const MIOLO = esmaece('tela-miolo')
const RODAPE = esmaece('ds-rodape')
const FOLHA_SOBE = desliza('ds-folha', 200)
const FOLHA_DESCE = desliza('ds-folha')
const VEU_SOBE = esmaece('ds-veu ds-veu-folha', 200)
const VEU_SAI = esmaece('ds-veu ds-veu')
const DIALOGO = [esmaece('ds-dialogo'), desliza('ds-dialogo')]
const VEU_PARADO = [{ prop: 'opacity', em: 'ds-veu ds-veu' }]
const PEDACO = esmaece('ds-veu-cresce-pedaco')
// o topo não se move: nem a faixa, nem a tira, nem a barra (o pressionado do avatar e do nome da unidade solta em 100, e é outra coisa)
const TOPO_PARADO = [
  ...['ds-faixa', 'ds-tira-contexto', 'ds-topo-menu', 'ds-barra-sistema'].map((em) => ({ prop: 'transform', em })),
  { prop: 'opacity', em: 'ds-faixa' }, { prop: 'opacity', ms: 150, em: 'ds-tira-contexto' }, { prop: 'opacity', ms: 200, em: 'ds-tira-contexto' },
]
const esc = { tecla: 'Escape' }
// o menu aberto pelo endereço: o aviso do acesso (T04/12) nasce aberto, parado, e o Entendi o fecha em 150
const ENTENDI = [
  { ve: 'Seu acesso vence em 2 dias' },
  { dorme: 250 },
  { toca: 'Entendi', anima: [DIALOGO[0], VEU_SAI] },
  { naoVe: 'Seu acesso vence em 2 dias' },
  { dorme: 250 },
]
const MOMENTOS = ['01-momento-sem-modulo', '02-momento-modulo-sem-ativo', '05-momento-folha-conta', '06-momento-folha-conta-sair-com-sessao-aberta',
  '07-momento-folha-trocar-de-garagem', '10-momento-folha-modulo-conectado', '11-momento-folha-ativo-da-sessao', '13-momento-encerrar-antes-de-homologar']
const ESTADOS = ['03-estado-faixa-modulo-com-falha', '04-estado-checklist-pendente', '08-estado-folha-trocar-de-garagem-envio-em-andamento',
  '09-estado-folha-trocar-de-garagem-com-modulo-conectado', '12-estado-acesso-vencendo', '14-estado-folha-trocar-de-unidade-com-empresa',
  '15-estado-sem-conexao']
const abreParado = (q) => [{ abre: `?tela=T04${q}` }, { quieto: true }, { dorme: 300 }, { quieto: true }]

export default [
  // ── abre parado, em cada quadro: a 00 (com o aviso do acesso nascendo aberto), cada momento e estado, e o print ──
  ...abreParado(''),
  { ve: 'Seu acesso vence em 2 dias' },
  ...abreParado('&print=1'),
  ...MOMENTOS.flatMap((m) => abreParado(`&momento=${m}`)),
  ...ESTADOS.flatMap((e) => abreParado(`&estado=${e}`)),
  ...abreParado('&momento=10-momento-folha-modulo-conectado&print=1'),
  // T04·2 · o contador do checklist, num estado: troca no lugar, e nada anima
  { abre: '?tela=T04&estado=04-estado-checklist-pendente' },
  { quieto: true },
  // T04/15 (decisão 48) · sem rede, na sessão do herói: só o Últimas instalações espera a conexão
  { abre: '?tela=T04&estado=15-estado-sem-conexao' },
  { ve: 'sem conexão' },
  { ve: 'RKT-8H42' },
  { quieto: true },

  // ── T04·3 · as folhas: sobem em 200 com o véu e descem em 150 — no X, fora, arrastando e no voltar ──
  { abre: '?tela=T04' },
  ...ENTENDI,
  { quieto: true },
  { toca: 'Trocar de unidade — Garagem Várzea', anima: [FOLHA_SOBE, VEU_SOBE], naoAnima: TOPO_PARADO },
  { chega: 'T04', momento: '07-momento-folha-trocar-de-garagem' },
  { dorme: 300 },
  { quieto: true },
  { toca: 'Fechar', anima: [FOLHA_DESCE, VEU_SAI] },
  { chega: 'T04', momento: null },
  { dorme: 250 },
  { toca: 'Conta — Rafael Vieira', anima: [FOLHA_SOBE, VEU_SOBE], naoAnima: TOPO_PARADO },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { dorme: 300 },
  { tocaFora: 'Conta', anima: [FOLHA_DESCE, VEU_SAI] },
  { chega: 'T04', momento: null },
  { dorme: 250 },
  { toca: 'Conta — Rafael Vieira', anima: [FOLHA_SOBE, VEU_SOBE] },
  { dorme: 300 },
  { arrasta: 'Conta', dy: 30, anima: [FOLHA_SOBE] },          // antes do limite, volta ao lugar em 200
  { dorme: 300 },
  { arrasta: 'Conta', dy: 120, anima: [FOLHA_DESCE, VEU_SAI] },
  { chega: 'T04', momento: null },
  { dorme: 250 },
  { toca: 'Conta — Rafael Vieira', anima: [FOLHA_SOBE, VEU_SOBE] },
  { dorme: 300 },
  esc,
  { anima: [FOLHA_DESCE, VEU_SAI] },
  { chega: 'T04', momento: null },
  { dorme: 250 },
  { quieto: true },

  // ── a folha que vira diálogo (C12·27, C12·43): o véu fica aceso, parado ──
  // a conta → o sair, e o Cancelar
  { toca: 'Conta — Rafael Vieira' },
  { dorme: 300 },
  { toca: 'Sair da conta', anima: [FOLHA_DESCE, ...DIALOGO], naoAnima: VEU_PARADO },
  { chega: 'T04', momento: '06-momento-folha-conta-sair-com-sessao-aberta' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Cancelar', anima: [DIALOGO[0], FOLHA_SOBE], naoAnima: VEU_PARADO },
  { chega: 'T04', momento: '05-momento-folha-conta' },
  { dorme: 300 },
  { toca: 'Fechar', anima: [FOLHA_DESCE, VEU_SAI] },
  { dorme: 250 },
  // a unidade, com a sessão aberta → o trocar, e o Cancelar
  { toca: 'Trocar de unidade — Garagem Várzea' },
  { dorme: 300 },
  { toca: 'Garagem Ibura', anima: [FOLHA_DESCE, ...DIALOGO], naoAnima: VEU_PARADO },
  { ve: 'Encerrar a sessão e trocar' },
  { dorme: 250 },
  { toca: 'Cancelar', anima: [DIALOGO[0], FOLHA_SOBE], naoAnima: VEU_PARADO },
  { ve: 'Trocar recarrega os ativos e o pacote desta unidade.' },
  { dorme: 300 },
  { toca: 'Fechar' },
  { dorme: 250 },
  // o módulo → o Encerrar antes de terminar?: o véu cresce pra cima da faixa, e só o pedaço novo esmaece
  { toca: 'CONECTAR MÓDULO, M2C-0417', anima: [FOLHA_SOBE, VEU_SOBE] },
  { chega: 'T04', momento: '10-momento-folha-modulo-conectado' },
  { dorme: 300 },
  { toca: 'Encerrar a sessão', anima: [FOLHA_DESCE, ...DIALOGO, PEDACO], naoAnima: VEU_PARADO },
  { chega: 'T04', momento: '13-momento-encerrar-antes-de-homologar' },
  { dorme: 250 },
  { quieto: true },
  // o Continuar a instalação: a folha não volta, e o diálogo e o véu esmaecem juntos
  { toca: 'Continuar a instalação', anima: [DIALOGO[0], VEU_SAI] },
  { chega: 'T04', momento: null },
  { dorme: 250 },
  // o ativo → o mesmo diálogo
  { toca: 'ATIVO SELECIONADO, RKT-8H42', anima: [FOLHA_SOBE, VEU_SOBE] },
  { chega: 'T04', momento: '11-momento-folha-ativo-da-sessao' },
  { dorme: 300 },
  { toca: 'Encerrar a sessão', anima: [FOLHA_DESCE, ...DIALOGO, PEDACO], naoAnima: VEU_PARADO },
  { ve: 'Encerrar antes de terminar?' },
  { dorme: 250 },
  esc,
  { anima: [DIALOGO[0], VEU_SAI] },
  { naoVe: 'Encerrar antes de terminar?' },
  { dorme: 250 },
  // ── o ENCERRAR da faixa (13, a prosa): o diálogo nasce em 150 com o véu, e some igual ──
  { toca: 'ENCERRAR', anima: [...DIALOGO, esmaece('ds-veu ds-veu-dialogo')], naoAnima: TOPO_PARADO },
  { chega: 'T04', momento: '13-momento-encerrar-antes-de-homologar' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Continuar a instalação', anima: [DIALOGO[0], VEU_SAI] },
  { chega: 'T04', momento: null },
  { dorme: 250 },
  { quieto: true },

  // ── os toques que levam a outra tela: o conteúdo dela esmaece, e o topo troca direto ──
  { toca: 'Diagnóstico do módulo', anima: [MIOLO], naoAnima: TOPO_PARADO },
  { chega: 'T07' },
  { dorme: 250 },
  { toca: 'Voltar ao menu', anima: [MIOLO], naoAnima: TOPO_PARADO },
  { chega: 'T04' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Fila de saída', anima: [MIOLO, RODAPE] },
  { chega: 'T15' },
  { dorme: 250 },
  esc,
  { anima: [MIOLO] },
  { chega: 'T04' },
  { dorme: 250 },
  // sem sessão (o 01): o CONECTAR MÓDULO leva à T05
  { abre: '?tela=T04&momento=01-momento-sem-modulo' },
  ...ENTENDI,
  { toca: 'CONECTAR MÓDULO', anima: [MIOLO, RODAPE] },
  { chega: 'T05' },
  // sem sessão, a unidade da folha leva direto à T03 dela: a folha sai de uma vez com o menu, e só o
  // conteúdo da T03 esmaece (a folha não desce por cima da troca)
  { abre: '?tela=T04&momento=01-momento-sem-modulo' },
  ...ENTENDI,
  { toca: 'Trocar de unidade — Garagem Várzea', anima: [FOLHA_SOBE, VEU_SOBE] },
  { dorme: 300 },
  { toca: 'Garagem Ibura', anima: [MIOLO, RODAPE], naoAnima: [FOLHA_DESCE, VEU_SAI] },
  { chega: 'T03' },

  // sem sessão (o 01), o Diagnóstico espera o módulo, e as outras ferramentas, o módulo e o ativo
  { abre: '?tela=T04&momento=01-momento-sem-modulo' },
  ...ENTENDI,
  { desligado: 'Diagnóstico do módulo, espera módulo' },
  { desligado: 'Configurar módulo, espera módulo e ativo' },

  // ── T04·1 e T04·4 · a faixa e o cartão liberado: a sessão nasce na conexão (T05), a faixa desce no
  // diagnóstico (T07), e o menu só chega com ela ──
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T07' },
  { ve: 'ENCERRAR', ms: 12000 },
  { dorme: 400 },
  { toca: 'Voltar ao menu', anima: [MIOLO], naoAnima: TOPO_PARADO },
  { chega: 'T04', momento: '02-momento-modulo-sem-ativo' },
  { ve: 'toque para escolher' },
  { dorme: 250 },
  { quieto: true },                                           // nada se move depois de chegar: nem a faixa, nem os cartões
  { dorme: 400 },
  { quieto: true },
  // com o módulo sem ativo (02), o Diagnóstico já se toca, e as outras esperam o ativo
  // (a primeira chegada ao menu desta página: o aviso do acesso nasce aberto, e o Entendi o fecha)
  ...ENTENDI,
  { desligado: 'Configurar módulo, espera ativo' },
  { toca: 'Diagnóstico do módulo', anima: [MIOLO], naoAnima: TOPO_PARADO },
  { chega: 'T07' },
  { dorme: 250 },
  { toca: 'Voltar ao menu', ms: 12000 },
  { chega: 'T04', momento: '02-momento-modulo-sem-ativo' },
  { dorme: 250 },

  // ── com reduzir movimento: tudo direto ──
  { reduzir: true },
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { quieto: true },
  { toca: 'Conta — Rafael Vieira' },
  { quieto: true },
  { toca: 'Sair da conta' },
  { quieto: true },
  { toca: 'Cancelar' },
  { quieto: true },
  { toca: 'Fechar' },
  { quieto: true },
  { toca: 'CONECTAR MÓDULO, M2C-0417' },
  { quieto: true },
  { toca: 'Encerrar a sessão' },
  { quieto: true },
  { toca: 'Continuar a instalação' },
  { quieto: true },
  { toca: 'Fila de saída' },
  { chega: 'T15' },
  { quieto: true },
  esc,
  { chega: 'T04' },
  { quieto: true },
  { reduzir: false },

  // ── T04/14 · a folha de trocar de unidade vira o Trocar de empresa, com a sessão aberta (o caminho da empresa) ──
  { abre: '?tela=T02&momento=07-momento-empresa-escolhida' },
  { toca: 'Ver as unidades' },
  { chega: 'T02', momento: null },
  { marca: 'Garagem Várzea' },
  { toca: 'Sincronizar Garagem Várzea' },
  { chega: 'T03', momento: '02-momento-concluido', ms: 8000 },
  { toca: 'Ir para o menu' },
  { chega: 'T04', momento: '01-momento-sem-modulo' },
  { toca: 'Entendi' },
  { naoVe: 'Seu acesso vence em 2 dias' },
  { toca: 'CONECTAR MÓDULO' },
  { chega: 'T05', momento: '01-momento-nenhum-escolhido' },
  { marca: 'M2C-0417' },
  { toca: 'Conectar ao M2C-0417' },
  { chega: 'T07' },
  { ve: 'ENCERRAR', ms: 12000 },
  { dorme: 400 },
  { toca: 'Voltar ao menu' },
  { chega: 'T04', momento: '02-momento-modulo-sem-ativo' },
  { dorme: 250 },
  { toca: 'Trocar de unidade — Garagem Várzea', anima: [FOLHA_SOBE, VEU_SOBE] },
  { ve: 'Trocar de empresa' },
  { dorme: 300 },
  { toca: 'Trocar de empresa', anima: [FOLHA_DESCE, ...DIALOGO], naoAnima: VEU_PARADO },
  { ve: 'é encerrada antes da troca, sem terminar a instalação.' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Cancelar', anima: [DIALOGO[0], FOLHA_SOBE], naoAnima: VEU_PARADO },
  { ve: 'Trocar de empresa' },
  { dorme: 300 },
  { quieto: true },
]
