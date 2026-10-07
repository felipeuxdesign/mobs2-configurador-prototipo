// T09 · o movimento da configuração (02-telas/T09-configurar-modulo/animacao.md; gate C12·8, C12·9,
// C12·12, C12·13, C12·18, C12·23, C12·32 e G27; o pacote 1, decisões 47 e 49):
//   · a tela abre parada, no que vai ser gravado (05) ou no escolher o bloco (08), e o endereço diz
//     o quadro; nada grava antes do toque;
//   · Gravar no módulo e Reenviar as cercas trocam o quadro inteiro (C12·4: o miolo e o rodapé
//     esmaecem em 150), e a cadeia só corre depois da troca (G27): a Limpeza relê a 1 s do fim do
//     esmaecer (150 + 1000);
//   · o elo relido (T09·2): o check esmaece no poço em 150, um bloco a cada 1 s (RITMOS.cadeiaBlocoMs);
//     o trilho até o próximo acende de cima pra baixo, scaleY em 300 (T09·3, C12·32); o elo seguinte
//     ganha o quadrado de agora no mesmo tique (T09·1 — a peça o esmaece em 150, o desvio de toda
//     tela com o glifo, que vai ao fechamento);
//   · cada elo diz o conteúdo do bloco (OF-1621, 4 regiões, sem fio…), nunca a versão (decisão 49);
//   · a Conexão relida: o módulo confere se falou com o servidor (11, a rodada 1 do retorno do PM), um
//     bloco depois; todo elo relido diz *confere*;
//   · a cadeia que conclui (04): a prova (6 passos) esmaece no lugar em 150 (Prova · surge, C12·9), e o
//     primário acende com o Voltar ao menu: o texto novo esmaece no lugar, e o roxo troca direto, sem
//     camada (C12·23, a peça · o conserto de 27/09); a altura dos elos troca direto (G24);
//   · a recuperação (tentar sair antes de a Conexão gravar: o ENCERRAR, o voltar): o aviso esmaece no
//     topo em 150 (Aviso · surge, C12·9), o glifo do elo parado esmaece no poço, e o primário acende
//     com o Continuar a gravação, do mesmo jeito (C12·23); o contador e a altura dos elos trocam direto (G24);
//   · retomar: o primário se apaga direto, sem o roxo por cima (C12·18), e o texto novo esmaece no
//     lugar (C12·23); a cadeia segue do mesmo bloco, no mesmo ritmo;
//   · a cadeia curta da manutenção (09): a limpeza só das cercas e as cercas; o ENCERRAR fica apagado
//     e o voltar não faz nada enquanto ela corre (lei 17); relidas, o primário acende com o Voltar ao menu;
//   · a recusa e a queda não têm porta no palco (C12·13): a peça se prova na vitrine (mov-check).
// A tela abre parada pela URL, em cada momento e estado, no print e no palco. Com reduzir
// movimento, o mesmo ritmo, e nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const GLIFO = esmaece('ds-glifo')
const TRILHO = { prop: 'transform', ms: 300, em: 'ds-trilho-capa', curva: C }
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const ACENDE = esmaece('ds-primario-antes')      // a camada do primário que acende com o mesmo texto (C12·8): aqui o texto sempre troca
const TEXTO = esmaece('ds-primario-texto')        // o texto novo do primário, no lugar (C12·23)
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }, { prop: 'opacity', em: 'ds-primario-antes' }]   // C12·18
const BLOCO = [850, 1150]                         // 1 s por bloco, medido a partir do passo de antes
const DO_TOQUE = [900, 1400]                      // o primeiro, a 1 s do fim da troca: 150 + 1000 do toque, menos o que os passos de antes levaram
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const CONCLUIDA = '04-momento-cadeia-concluida'
const ANTES = '05-momento-o-que-vai-ser-gravado'
const ESCOLHER = '08-momento-manutencao-escolher-o-bloco'
const SERVIDOR = '11-momento-conferindo-o-servidor'
const REENVIANDO = '09-momento-manutencao-reenviando'
const ESTADOS = ['01-estado-bloco-recusado', '02-estado-queda-na-cadeia', '03-estado-recuperacao-ate-a-conexao-gravar',
  '06-estado-a-configuracao-nao-cabe', '07-estado-pontos-de-cerca-demais', '12-estado-o-modulo-ainda-nao-falou-com-o-servidor']

export default [
  // ── abre parada: no print, nos estados da coluna e nos momentos pelo endereço ──
  ...['', `&momento=${CONCLUIDA}`, `&momento=${ANTES}`, `&momento=${ESCOLHER}`, `&momento=${REENVIANDO}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T09${q}&print=1` }, ...PARADA]),
  // no print, a cadeia não anda: passada a primeira batida (1 s), o Leitor ainda grava
  { abre: '?tela=T09&print=1' },
  { dorme: 1200 },
  { quieto: true },
  { ve: 'Leitor\ngravando', ms: 200 },
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T09&estado=${e}` }, ...PARADA]),
  // as travas do envio, pelo caso: o elemento que falhou diz o número, e o aviso, o que fazer
  { abre: `?tela=T09&estado=${ESTADOS[3]}` },
  { ve: 'NÃO CABE NO MÓDULO' },
  { ve: 'São 131 contadores. Este módulo guarda 127.' }, // a rodada 1: contadores, os números do caso
  { ve: 'Cercas\nnenhuma' },
  { ve: 'Leitor\nno fio branco' },
  { ve: 'Procurar outro módulo' },
  { abre: `?tela=T09&estado=${ESTADOS[4]}` },
  { ve: 'NÃO CABE NO MÓDULO' },
  { ve: 'As cercas têm 6.410 pontos. Este módulo guarda 6.143.' }, // a rodada 1: os pontos de cerca
  { ve: 'Cercas\nnão cabe' },
  { abre: `?tela=T09&momento=${CONCLUIDA}` },
  ...PARADA,
  { ve: 'CONFERIDO NO MÓDULO\n6 passos' },

  // ── pelo endereço: a tela abre parada no que vai ser gravado, e o endereço diz o 05 ──
  { abre: '?tela=T09' },
  { chega: 'T09', momento: ANTES },
  { quieto: true },
  { ve: 'Limpeza\nprimeiro' },
  { ve: 'cabe no módulo · 96 de 127 contadores' },
  { fica: 'T09', ms: 1300 },                                     // nada grava antes do toque
  { quieto: true },
  { naoVe: 'gravando' },
  // Gravar no módulo: o quadro troca inteiro, e a cadeia corre pela Limpeza, a 1 s do fim do esmaecer
  { toca: 'Gravar no módulo', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T09', momento: null },
  { ve: 'Limpeza\ngravando' },
  { ve: 'Ativo\ngravando', entre: DO_TOQUE },                     // a Limpeza relida
  { anima: [GLIFO, TRILHO] },                                    // o check no poço, e o trilho que acende
  { ve: 'Limpeza\nconfere' },
  { ve: 'Cercas\ngravando', entre: BLOCO },
  { ve: 'Ativo\nconfere' },
  { ve: 'Leitor\ngravando', entre: BLOCO },
  { ve: 'Cercas\nconfere' },
  { dorme: 400 },
  { quieto: true },                                              // acabou, nada fica vivo (C12·19)

  // ── a recuperação: o ENCERRAR antes de a Conexão gravar ──
  { toca: 'ENCERRAR', anima: [esmaece('ds-aviso'), TEXTO, GLIFO], naoAnima: [ACENDE] },   // o aviso no topo, o primário que acende com o texto novo, a pausa no poço
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { ve: '3 de 6' },
  { desligado: 'ENCERRAR' },
  { dorme: 250 },
  { quieto: true },
  { fica: 'T09', ms: 1300 },                                      // a cadeia parada: nada relê
  { quieto: true },
  // retomar: o primário se apaga direto, e o texto novo esmaece no lugar; a cadeia segue do mesmo bloco
  { toca: 'Continuar a gravação', anima: [TEXTO, GLIFO], naoAnima: SEM_ROXO },
  { naoVe: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { desligado: 'Gravando · não interrompa' },
  { dorme: 250 },
  { quieto: true },
  // o voltar do Android (o Esc) faz o mesmo que o ENCERRAR antes de a Conexão gravar
  { tecla: 'Escape' },
  { anima: [esmaece('ds-aviso'), TEXTO], naoAnima: [ACENDE] },
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { dorme: 250 },
  { toca: 'Continuar a gravação', naoAnima: SEM_ROXO },
  { ve: 'Eventos\ngravando', entre: BLOCO },                     // o Leitor, relido a 1 s do retomar
  { anima: [GLIFO, TRILHO] },
  { ve: 'Leitor\nconfere' },
  { ve: 'Conexão\ngravando', entre: BLOCO },
  // a Conexão relida: o módulo confere se falou com o servidor (a rodada 1), um bloco depois
  { chega: 'T09', momento: SERVIDOR, entre: BLOCO },
  { ve: 'O módulo falou com o servidor\nconferindo' },
  { desligado: 'Gravando · não interrompa' },
  // falou: a cadeia conclui — o check, a prova no lugar e o primário que acende
  { chega: 'T09', momento: CONCLUIDA, entre: BLOCO },
  { anima: [GLIFO, esmaece('ds-prova'), TEXTO], naoAnima: [ACENDE, ...TROCA] },   // o endereço que passa ao 04 não é troca
  { ve: 'CONFERIDO NO MÓDULO\n6 passos' },
  { ve: 'O módulo falou com o servidor\nsim' },
  { ve: 'Eventos\nconfere' },
  { dorme: 250 },
  { quieto: true },
  // a saída: a troca entre telas (o topo muda no menu: só o miolo esmaece)
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },
  { chega: 'T04' },
  { dorme: 250 },

  // ── pelo menu (o estado de novo, sem nada gravado): a troca entre telas, e a tela parada no 05 ──
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { dorme: 250 },
  { toca: 'Configurar módulo', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T09', momento: ANTES },
  { dorme: 250 },
  { quieto: true },
  { fica: 'T09', ms: 1300 },
  { naoVe: 'gravando' },
  // antes de gravar, o voltar é o Voltar ao menu
  { tecla: 'Escape' },
  { chega: 'T04' },

  // ── a manutenção: escolher o bloco (08) e a cadeia curta (09) ──
  { abre: `?tela=T09&momento=${ESCOLHER}` },
  { chega: 'T09', momento: ESCOLHER },
  { quieto: true },
  { ve: 'MANUTENÇÃO\nReenvie um bloco por vez. A limpeza apaga só o que você escolher.' },
  { ve: 'Cercas\nas regiões geográficas\n4 regiões' },
  { desligado: 'Ativo' },                                         // os blocos sem texto pro reenvio ficam inertes (G25)
  { toca: 'Reenviar as cercas', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T09', momento: REENVIANDO },
  { ve: 'Limpeza\ngravando' },
  { ve: 'Cercas\ngravando', entre: DO_TOQUE },                   // a limpeza só das cercas, relida
  { anima: [GLIFO, TRILHO] },
  { ve: 'Reenviando só as cercas.' },
  { ve: 'Limpeza\nconfere' },
  { ve: 'Apaga só esta parte.' },
  { ve: 'Ativo, Leitor, Eventos e Conexão ficam como estão.' },
  { desligado: 'ENCERRAR' },                                      // a curta termina sozinha: o ENCERRAR apagado (lei 17)
  { tecla: 'Escape' },
  { fica: 'T09', ms: 300 },                                       // e o voltar não faz nada
  { toca: 'Voltar ao menu', entre: [300, 1150] },                 // as cercas relidas: o primário acende com a saída
  { chega: 'T04' },

  // ── com reduzir movimento: o mesmo ritmo, e nada anda ──
  { reduzir: true },
  { abre: '?tela=T09' },
  { chega: 'T09', momento: ANTES },
  { quieto: true },
  { toca: 'Gravar no módulo' },
  { quieto: true },
  { ve: 'Ativo\ngravando', entre: [900, 1300] },
  { quieto: true },
  { toca: 'ENCERRAR' },
  { quieto: true },
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { toca: 'Continuar a gravação' },
  { quieto: true },
  { ve: 'Cercas\ngravando', entre: BLOCO },
  { quieto: true },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna abre parado; a volta ao fluxo e o pulo, no 05 ──
  { abre: '?tela=T09' },
  { janela: [1440, 900] },
  { chega: 'T09', momento: ANTES },
  { quieto: true },
  { palco: 'Bloco recusado' },
  { chega: 'T09', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Queda na cadeia' },
  { chega: 'T09', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Recuperação até a Conexão gravar' },
  { chega: 'T09', estado: ESTADOS[2] },
  ...PARADA,
  { palco: 'A configuração não cabe' },
  { chega: 'T09', estado: ESTADOS[3] },
  ...PARADA,
  { palco: 'Pontos de cerca demais' },
  { chega: 'T09', estado: ESTADOS[4] },
  ...PARADA,
  { palco: 'Ainda não falou com o servidor' },   // a rodada 1: só pela coluna
  { chega: 'T09', estado: ESTADOS[5] },
  { ve: 'O módulo falou com o servidor\nainda não' },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T09', estado: null },
  { quieto: true },
  { ve: 'Gravar no módulo' },
  { abre: '?tela=T04' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T09' },
  { chega: 'T09', momento: ANTES },
  { quieto: true },
  { fica: 'T09', ms: 1300 },
  { naoVe: 'gravando' },
]
