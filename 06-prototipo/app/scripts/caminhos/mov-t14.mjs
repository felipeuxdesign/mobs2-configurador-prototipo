// T14 · o movimento do ciclo de testes (02-telas/T14-ciclo-dinamico/animacao.md; gate C12·4, C12·5,
// C12·12, C12·15, C12·18, C12·19, C12·23 e C12·40):
//   · a troca de quadro (C12·4, G26 · T14 01 → 00): quando a fila do módulo drena, a frase dela sai
//     do prazo e o disparo acende (o pacote 2 tirou a legenda do rodapé) — o desenho muda, e o conteúdo esmaece em
//     150, pelo processo; o disparo acende com ele, sem camada por dentro. O mesmo quando o ciclo
//     conclui (o rodapé troca inteiro): o último passo entra com a troca, sem esmaecer de novo;
//   · o disparo (C12·23): o texto do primário troca no lugar (Disparar evento de teste → Encerrar
//     o ciclo), e o disparado pelo app vira a hora esmaecendo (T14·4);
//   · a barra do prazo (T14·1, C12·40): cada tique de 250 ms é um trecho linear, o marcador e o
//     preenchido juntos, só por transform; o número troca no lugar (T14·2). Com reduzir, o número
//     troca e a barra salta, no mesmo ritmo;
//   · o passo do veículo (T14·3, C12·12): o relógio vira check esmaecendo · a rodada 1 do retorno do
//     PM: quatro passos — o cartão é a vez desde o disparo, o módulo o lê (a 08) e espera a resposta
//     do técnico; o Confere leva à ignição desligada (a 11), que entra com a troca do ciclo concluído;
//   · o evento que chega (T14·4): o relógio vira o horário, esmaecendo.
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
const M08 = '08-momento-o-modulo-leu-o-cartao'
const M11 = '11-momento-vez-da-ignicao-desligada'
const ESTADOS = ['02-estado-prazo-estourado', '03-estado-dinamico-fora-do-esperado', '12-estado-ativo-sem-leitor']
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
// o pacote 6: a fila que drena, a linha fina da 01, em 3 s, linear, só por transform
const FILA = { prop: 'transform', ms: 3000, em: 'ds-prazo-fila-resta' }

export default [
  // ── abre parada: pela URL no 05 e em cada estado; no print, cada quadro ──
  { abre: `?tela=T14&momento=${M05}` },
  ...PARADA,
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T14&estado=${e}` }, ...PARADA]),
  ...['', '&momento=01-momento-antes-do-disparo', `&momento=${M05}`, `&momento=${M08}`, `&momento=${M11}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T14${q}&print=1` }, ...PARADA]),
  // o 08 pela URL: parado até a resposta; o Confere leva à 11, e o ciclo corre dali, sem animar a entrada
  { abre: `?tela=T14&momento=${M08}` },
  ...PARADA,
  { toca: 'Confere com o cartão', naoAnima: [MIOLO] },
  { chega: 'T14', momento: M11 },
  // o 01 pela URL: a fila drena dali (G27) — só a linha da fila anda, a entrada não anima
  { abre: '?tela=T14&momento=01-momento-antes-do-disparo' },
  { anima: [FILA], naoAnima: [esmaece('tela-miolo')] },
  { ve: 'FILA DRENADA', entre: [2000, 3600] },

  // ── a entrada (G27): a fila drena, e a troca de quadro acende o disparo ──
  { abre: '?tela=T14' },
  { anima: [FILA], naoAnima: [esmaece('tela-miolo')] },
  { ve: 'FILA DRENANDO' },
  { ve: '6 mensagens e 2 de diagnóstico saindo do módulo' },
  { desligado: 'Disparar evento de teste' },
  { ve: 'FILA DRENADA', entre: [2400, 3300] },
  { anima: TROCA, naoAnima: [ACENDE, TEXTO_NASCE] },
  { naoVe: 'saindo do módulo' },
  { dorme: 300 },
  { quieto: true },
  // o disparo: o texto do primário troca no lugar, e o disparado pelo app vira a hora
  // (o pacote 6) o primário desliga e diz Aguardando o evento: o toque duplo não encerra o ciclo;
  // e o passo da vez, o cartão, ganha o quadrado de agora e a ação (a rodada 1)
  { toca: 'Disparar evento de teste', anima: [TEXTO, EVENTO], naoAnima: [MIOLO] },
  { desligado: 'Aguardando o evento' },
  { naoVe: 'Encerrar o ciclo' },
  { ve: 'passe o cartão' },
  // o prazo drena contínuo: um trecho linear por tique, só por transform; o número troca no lugar
  { ve: '1:59', entre: [100, 450] },
  { anima: PRAZO, naoAnima: [...SEM_LARGURA, ...NUMERO_PARADO] },
  { ve: '1:58', entre: [150, 350] },
  { anima: PRAZO, naoAnima: SEM_LARGURA },
  // o evento chega: o relógio vira o horário (T14·4); a barra fica no que restava
  { ve: 'O EVENTO CHEGOU EM', entre: [4500, 6500] },
  { anima: [EVENTO] },
  { ve: 'Encerrar o ciclo' },   // o evento chegou: o Encerrar o ciclo acende
  // (o pacote 9) o preenchido para na chegada, e o marcador branco segue o tempo, só por transform
  { dorme: 400 },
  { anima: [{ prop: 'transform', em: 'ds-escala-agulha' }], naoAnima: SEM_LARGURA },
  // o cartão (a rodada 1): o módulo lê aos 48 s do prazo (12 s reais), e espera o técnico
  { chega: 'T14', momento: M08, entre: [3500, 7000] },
  { ve: 'leu 9412857' },
  { naoVe: 'passe o cartão' },
  { dorme: 300 },
  // o Confere: o check esmaece no poço do cartão, e a ignição desligada é a vez, com a espera explicada
  { toca: 'Confere com o cartão', anima: [CHECK], naoAnima: [MIOLO] },
  { chega: 'T14', momento: M11 },
  { ve: '3 de 4 passos' },
  { ve: 'O módulo leva alguns segundos para perceber que a ignição foi desligada.' },
  // o ciclo conclui: o rodapé troca inteiro, e o conteúdo esmaece; o último passo entra com a troca
  { chega: 'T14', momento: M05, entre: [2500, 4500] },
  { anima: TROCA, naoAnima: [CHECK, TEXTO_NASCE] },
  { ve: '4 de 4 passos' },
  { dorme: 300 },
  { quieto: true },
  { toca: 'Ir para o checklist', anima: TROCA },
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

  // ── o prazo que estoura e o Disparar outro evento (C12·4): pela sessão do KHT-4B08, o caso
  // evento-sem-resposta (G28) — a revisão de 27/09: a troca dos dois só se media no estado da coluna ──
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { toca: 'M2C-0335' },
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0335' },
  { chega: 'T07' },
  { toca: 'Selecionar ativo', ms: 12000 },
  { chega: 'T06', momento: null },
  { toca: 'KHT-4B08' },
  { dorme: 250 },
  { toca: 'Usar este ativo' },
  { ve: 'CONFLITO NO FIO BRANCO' },
  { dorme: 250 },
  { toca: 'Usar leitor sem fio' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { dorme: 300 },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { dorme: 400 },
  { toca: 'Voltar ao menu', ms: 20000 },
  { chega: 'T04' },
  { toca: 'Entendi' },
  { dorme: 400 },
  { toca: 'Finalizar com checklist' },
  { chega: 'T13' },
  { dorme: 300 },
  { toca: 'E · Ciclo de testes' },
  { dorme: 300 },
  { toca: 'Fazer o ciclo de testes', anima: TROCA },
  { chega: 'T14' },
  { ve: 'FILA DRENADA', entre: [2400, 3300] },
  { dorme: 300 },
  { toca: 'Disparar evento de teste', anima: [TEXTO, EVENTO] },
  // o prazo acaba sem o evento (1 s real vale 4 s: 2:00 em 30 s): a frase da Seção F entra e o rodapé
  // troca inteiro — o conteúdo esmaece, pelo processo; o Disparar outro evento entra com ele
  { ve: 'Disparar outro evento', ms: 40000, entre: [28500, 32500] },
  { anima: TROCA, naoAnima: [ACENDE, TEXTO_NASCE, CHECK] },
  { ve: 'A Seção F reprova · os passos continuam valendo.' },
  { dorme: 300 },
  { quieto: true },
  // Disparar outro evento: o prazo volta cheio com o quadro, sem encher por dentro, e drena dali
  { toca: 'Disparar outro evento', anima: TROCA, naoAnima: [...PRAZO, TEXTO_NASCE] },
  { ve: '1:59', entre: [100, 450] },
  { anima: PRAZO, naoAnima: SEM_LARGURA },
  { ve: 'O EVENTO CHEGOU EM', entre: [4500, 6500] },
  { anima: [EVENTO] },
  { ve: 'Encerrar o ciclo' },   // o evento chegou: o Encerrar o ciclo acende
  // o cartão, lido na 1ª tentativa, segue esperando o técnico: os passos continuam valendo
  { chega: 'T14', momento: M08 },
  // o Confere: o prazo recomeçou no Disparar outro, e a ignição desligada não vem antes da vez dela
  // no ciclo (os 48 do prazo, 12 s do disparo): uns 5,7 s depois do toque
  { toca: 'Confere com o cartão' },
  { chega: 'T14', momento: M05, entre: [5000, 6500] },
  { anima: TROCA, naoAnima: [CHECK] },
  { dorme: 300 },
  { quieto: true },

  // ── o motor desligado (T14/03, o caso motor-desligado-no-ciclo): a rotação zerada reprova e pede o motor ──
  { abre: '?tela=T14&estado=03-estado-dinamico-fora-do-esperado' },
  { ve: '1 de 4 passos' },
  { ve: 'Rotação\n0 rpm · ligue o motor' },
  { quieto: true },

  // ── D3 · a velocidade com tacógrafo digital: pela sessão do KNB-5H39 com o M2C-0335 (o a-09, ma-02, que tem
  // tacografoDigital), o passo da velocidade entra depois da rotação, e o ciclo tem sete passos.
  // Nenhuma referência o desenha — o herói não tem —: monta pelo dado ──
  { abre: '?tela=T05&momento=01-momento-nenhum-escolhido' },
  { toca: 'M2C-0335' },   // o módulo do M2C-0335, num ativo de tacógrafo (o caso dele é do a-04, e não vale aqui)
  { dorme: 250 },
  { toca: 'Conectar ao M2C-0335' },
  { chega: 'T07' },
  { toca: 'Selecionar ativo', ms: 12000 },
  { chega: 'T06', momento: null },
  { toca: 'KNB-5H39' },
  { dorme: 250 },
  { toca: 'Usar este ativo' },
  { chega: 'T06', momento: '01-momento-confirmar-o-veiculo' },
  { dorme: 300 },
  { toca: 'Vincular o módulo' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { dorme: 400 },
  { toca: 'Voltar ao menu', ms: 20000 },
  { chega: 'T04' },
  { toca: 'Entendi' },
  { dorme: 400 },
  { toca: 'Finalizar com checklist' },
  { chega: 'T13' },
  { dorme: 300 },
  { toca: 'E · Ciclo de testes' },
  { dorme: 300 },
  { toca: 'Fazer o ciclo de testes', anima: TROCA },
  { chega: 'T14' },
  { ve: '2 de 5 passos' },
  { ve: 'Ignição ligada\nRotação\nVelocidade\nCartão do motorista\nIgnição desligada' },
  { ve: 'FILA DRENADA', entre: [2400, 3300] },
  { dorme: 300 },
  { toca: 'Disparar evento de teste', anima: [TEXTO, EVENTO] },
  { ve: '3 de 5 passos', entre: [8000, 10500] },
  { chega: 'T14', momento: M08, entre: [4500, 8000] },   // o cartão, depois da velocidade: o módulo lê aos 60 s do prazo
  { toca: 'Confere com o cartão' },
  { chega: 'T14', momento: M05, entre: [2500, 4500] },
  { ve: '5 de 5 passos' },
  { dorme: 300 },
  { quieto: true },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: `?tela=T14&momento=${M05}` },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Prazo estourado' },
  { chega: 'T14', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Ativo sem leitor' },   // a rodada 1: o ciclo em 3 passos, sem o cartão
  { chega: 'T14', estado: ESTADOS[2] },
  { ve: '3 de 3 passos' },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T14', estado: null },
  { quieto: true },
]
