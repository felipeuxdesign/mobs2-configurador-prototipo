// T14 · o movimento do ciclo dinâmico (02-telas/T14-ciclo-dinamico/animacao.md; gate C12·4, C12·5,
// C12·12, C12·15, C12·18, C12·19, C12·23 e C12·40):
//   · a troca de quadro (C12·4, G26 · T14 01 → 00): quando a fila do módulo drena, a frase dela sai
//     do prazo, a espera sai do rodapé e o disparo acende — o desenho muda, e o conteúdo esmaece em
//     150, pelo processo; o disparo acende com ele, sem camada por dentro. O mesmo quando o ciclo
//     conclui (o rodapé troca inteiro): o último passo entra com a troca, sem esmaecer de novo;
//   · o disparo (C12·23): o texto do primário troca no lugar (Disparar evento de teste → Encerrar
//     o ciclo), e o disparado pelo app vira a hora esmaecendo (T14·4);
//   · a barra do prazo (T14·1, C12·40): cada tique de 250 ms é um trecho linear, o marcador e o
//     preenchido juntos, só por transform; o número troca no lugar (T14·2). Com reduzir, o número
//     troca e a barra salta, no mesmo ritmo;
//   · o passo do veículo (T14·3, C12·12): o relógio vira check esmaecendo, a +9 e +12 s do disparo;
//   · o evento que chega (T14·4): o relógio vira o horário, esmaecendo;
//   · o pedido de correção (T14·5, C12·19): o link vira o registro no lugar, esmaecendo, e nada
//     fica animando depois — pela sessão do PCX-9A17 (o caso identificador-divergente, G28).
// A tela abre parada pela URL no 05 e em cada estado, e no print; pelo endereço sem momento (a
// entrada é a 01) e no 06, o processo corre (G27), sem animar a entrada.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const MIOLO = esmaece('tela-miolo')
const TEXTO = esmaece('ds-primario-texto')                 // o texto do primário que troca no lugar (C12·23)
const TEXTO_NASCE = { prop: 'opacity', em: 'ds-primario-texto-nasce' }
const ACENDE = { prop: 'opacity', em: 'ds-primario-antes' }
const CHECK = esmaece('ds-glifo')
const EVENTO = esmaece('ds-evento-valor')
const PRAZO = [{ prop: 'transform', ms: 250, curva: 'linear', em: 'ds-escala-agulha' }, { prop: 'transform', ms: 250, curva: 'linear', em: 'ds-escala-faixa' }]
const SEM_LARGURA = [{ prop: 'width', em: 'ds-escala' }, { prop: 'left', em: 'ds-escala' }]
const NUMERO_PARADO = [{ prop: 'opacity', em: 'ds-prazo' }, { prop: 'transform', em: 'ds-prazo' }]
const M05 = '05-momento-ciclo-concluido'
const M06 = '06-momento-correcao-solicitada'
const ESTADOS = ['02-estado-prazo-estourado', '03-estado-dinamico-fora-do-esperado', '04-estado-identificador-divergente']
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]

export default [
  // ── abre parada: pela URL no 05 e em cada estado; no print, cada quadro ──
  { abre: `?tela=T14&momento=${M05}` },
  ...PARADA,
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T14&estado=${e}` }, ...PARADA]),
  ...['', '&momento=01-momento-antes-do-disparo', `&momento=${M05}`, `&momento=${M06}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T14${q}&print=1` }, ...PARADA]),
  // o 06 pela URL: o prazo corre dali, sem animar a entrada
  { abre: `?tela=T14&momento=${M06}` },
  { quieto: true },
  // o 01 pela URL: a fila drena dali (G27), sem animar a entrada
  { abre: '?tela=T14&momento=01-momento-antes-do-disparo' },
  { quieto: true },
  { dorme: 700 },
  { quieto: true },

  // ── a entrada (G27): a fila drena, e a troca de quadro acende o disparo ──
  { abre: '?tela=T14' },
  { quieto: true },
  { ve: 'FILA DRENANDO' },
  { ve: '6 mensagens e 2 de diagnóstico saindo do módulo' },
  { desligado: 'Disparar evento de teste' },
  { ve: 'FILA DRENADA', entre: [2400, 3300] },
  { anima: TROCA, naoAnima: [ACENDE, TEXTO_NASCE] },
  { naoVe: 'saindo do módulo' },
  { dorme: 300 },
  { quieto: true },
  // o disparo: o texto do primário troca no lugar, e o disparado pelo app vira a hora
  { toca: 'Disparar evento de teste', anima: [TEXTO, EVENTO], naoAnima: [MIOLO] },
  { ve: 'Encerrar o ciclo' },
  // o prazo drena contínuo: um trecho linear por tique, só por transform; o número troca no lugar
  { ve: '1:59', entre: [100, 450] },
  { anima: PRAZO, naoAnima: [...SEM_LARGURA, ...NUMERO_PARADO] },
  { ve: '1:58', entre: [150, 350] },
  { anima: PRAZO, naoAnima: SEM_LARGURA },
  // o evento chega: o relógio vira o horário (T14·4); a barra fica no que restava
  { ve: 'O EVENTO CHEGOU EM', entre: [4500, 6500] },
  { anima: [EVENTO] },
  { dorme: 400 },
  { quieto: true },
  // os passos do veículo: o check esmaece no poço (T14·3)
  { ve: '3 de 5 passos', entre: [1000, 3200] },
  { anima: [CHECK] },
  { ve: '4 de 5 passos', entre: [2400, 3600] },
  { anima: [CHECK] },
  // o ciclo conclui: o rodapé troca inteiro, e o conteúdo esmaece; o último passo entra com a troca
  { chega: 'T14', momento: M05, entre: [2400, 3600] },
  { anima: TROCA, naoAnima: [CHECK, TEXTO_NASCE] },
  { ve: '5 de 5 passos' },
  { dorme: 300 },
  { quieto: true },
  { toca: 'Voltar ao checklist', anima: TROCA },
  { chega: 'T13' },

  // ── com reduzir movimento: o mesmo ritmo; o número troca e a barra salta ──
  { reduzir: true },
  { abre: '?tela=T14' },
  { quieto: true },
  { ve: 'FILA DRENADA', entre: [2400, 3300] },
  { quieto: true },
  { toca: 'Disparar evento de teste' },
  { quieto: true },
  { ve: '1:59', entre: [100, 450] },
  { quieto: true },
  { ve: '1:58', entre: [150, 350] },
  { quieto: true },
  { reduzir: false },

  // ── o pedido de correção (T14·5): pela sessão do PCX-9A17, o cartão do caso identificador-divergente ──
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { toca: 'M2C-0417' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0417' },
  { toca: 'Selecionar ativo', ms: 12000 },
  { chega: 'T06', momento: null },
  { toca: 'PCX-9A17' },
  { dorme: 250 },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { dorme: 300 },
  { toca: 'Usar este ativo' },
  { chega: 'T07' },
  { dorme: 400 },
  { toca: 'Voltar ao menu', ms: 20000 },
  { chega: 'T04' },
  { toca: 'Entendi' },   // o 5º dia do acesso: o aviso na primeira chegada ao menu (T04/12)
  { dorme: 400 },
  { toca: 'Finalizar com checklist' },
  { chega: 'T13' },
  { dorme: 300 },
  { toca: 'E · Teste dinâmico' },
  { dorme: 300 },
  { toca: 'Fazer o ciclo dinâmico', anima: TROCA },
  { chega: 'T14' },
  { ve: 'FILA DRENADA', entre: [2400, 3300] },
  { dorme: 300 },
  { toca: 'Disparar evento de teste', anima: [TEXTO, EVENTO] },
  { ve: 'Solicitar correção de cadastro' },
  { dorme: 400 },
  { toca: 'Solicitar correção de cadastro', anima: [esmaece('ds-link-registro-texto')], naoAnima: [MIOLO] },
  { chega: 'T14', momento: M06 },
  { ve: 'Correção solicitada às 14:30' },
  { dorme: 300 },
  // o registro sem resto (C12·19): acabou, nada fica animando no rodapé
  { naoAnima: [{ prop: 'opacity', em: 'ds-link' }, { prop: 'opacity', em: 'ds-rodape' }] },

  // ── o prazo que estoura e o Disparar outro evento (C12·4): pela sessão do KHT-4B08, o caso
  // evento-sem-resposta (G28) — a revisão de 27/09: a troca dos dois só se media no estado da coluna ──
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { toca: 'M2C-0335' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0335' },
  { toca: 'Acordar módulo', ms: 9000 },
  { toca: 'Selecionar ativo', ms: 6000 },
  { chega: 'T06', momento: null },
  { toca: 'KHT-4B08' },
  { dorme: 250 },
  { toca: 'Usar este ativo' },
  { ve: 'CONFLITO NO FIO BRANCO' },
  { dorme: 250 },
  { toca: 'Usar leitor sem fio' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { dorme: 300 },
  { toca: 'Usar este ativo' },
  { chega: 'T07' },
  { dorme: 400 },
  { toca: 'Voltar ao menu', ms: 20000 },
  { chega: 'T04' },
  { toca: 'Entendi' },
  { dorme: 400 },
  { toca: 'Finalizar com checklist' },
  { chega: 'T13' },
  { dorme: 300 },
  { toca: 'E · Teste dinâmico' },
  { dorme: 300 },
  { toca: 'Fazer o ciclo dinâmico', anima: TROCA },
  { chega: 'T14' },
  { ve: 'FILA DRENADA', entre: [2400, 3300] },
  { dorme: 300 },
  { toca: 'Disparar evento de teste', anima: [TEXTO, EVENTO] },
  // o prazo acaba sem o evento (1 s real vale 4 s: 2:00 em 30 s): a frase da Seção F entra e o rodapé
  // troca inteiro — o conteúdo esmaece, pelo processo; o Disparar outro evento entra com ele
  { ve: 'Disparar outro evento', ms: 40000, entre: [28500, 32500] },
  { anima: TROCA, naoAnima: [ACENDE, TEXTO_NASCE, CHECK] },
  { ve: 'A Seção F reprova.' },
  { dorme: 300 },
  { quieto: true },
  // Disparar outro evento: o prazo volta cheio com o quadro, sem encher por dentro, e drena dali
  { toca: 'Disparar outro evento', anima: TROCA, naoAnima: [...PRAZO, TEXTO_NASCE] },
  { ve: '1:59', entre: [100, 450] },
  { anima: PRAZO, naoAnima: SEM_LARGURA },
  { ve: 'O EVENTO CHEGOU EM', entre: [4500, 6500] },
  { anima: [EVENTO] },
  { chega: 'T14', momento: M05, entre: [1000, 3500] },
  { anima: TROCA, naoAnima: [CHECK] },
  { dorme: 300 },
  { quieto: true },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: `?tela=T14&momento=${M05}` },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Prazo estourado' },
  { chega: 'T14', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Identificador divergente' },
  { chega: 'T14', estado: ESTADOS[2] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T14', estado: null },
  { quieto: true },
]
