// T09 · o movimento da cadeia (02-telas/T09-configurar-modulo/animacao.md; gate C12·8, C12·9, C12·12,
// C12·13, C12·18, C12·23, C12·32 e G27):
//   · a cadeia só corre depois da troca entre telas que trouxe a tela (G27): pelo menu, o primeiro
//     bloco relê a 1 s do fim do esmaecer (150 + 1000); pelo endereço, a 1 s da montagem;
//   · o elo relido (T09·2): o check esmaece no poço em 150, um bloco a cada 1 s (RITMOS.cadeiaBlocoMs);
//     o trilho até o próximo acende de cima pra baixo, scaleY em 300 (T09·3, C12·32); o elo seguinte
//     ganha o quadrado de agora no mesmo tique (T09·1 — a peça o esmaece em 150, o desvio de toda
//     tela com o glifo, que vai ao fechamento);
//   · a cadeia que conclui (04): a prova esmaece no lugar em 150 (Prova · surge, C12·9), e o primário
//     acende com o Voltar ao menu: o texto novo esmaece no lugar, e o roxo troca direto, sem camada
//     (C12·23, a peça · o conserto de 27/09); a altura dos elos troca direto (G24);
//   · a recuperação (tentar sair antes de a Conexão gravar: o ENCERRAR, o voltar): o aviso esmaece no
//     topo em 150 (Aviso · surge, C12·9), o glifo do elo parado esmaece no poço, e o primário acende
//     com o Continuar a gravação, do mesmo jeito (C12·23); o contador e a altura dos elos trocam direto (G24);
//   · retomar: o primário se apaga direto, sem o roxo por cima (C12·18), e o texto novo esmaece no
//     lugar (C12·23); a cadeia segue do mesmo bloco, no mesmo ritmo;
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
const ABRE = [650, 1150]                          // o primeiro, a 1 s da montagem: o abre volta depois de a tela pintar
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]
const CONCLUIDA = '04-momento-cadeia-concluida'
const ESTADOS = ['01-estado-bloco-recusado', '02-estado-queda-na-cadeia', '03-estado-recuperacao-ate-a-conexao-gravar']

export default [
  // ── abre parada: no print, nos estados da coluna e na concluída pelo endereço ──
  ...['', `&momento=${CONCLUIDA}`, ...ESTADOS.map((e) => `&estado=${e}`)]
    .flatMap((q) => [{ abre: `?tela=T09${q}&print=1` }, ...PARADA]),
  // no print, a cadeia não anda: passada a primeira batida (1 s), o Leitor ainda grava
  { abre: '?tela=T09&print=1' },
  { dorme: 1200 },
  { quieto: true },
  { ve: 'Leitor\ngravando', ms: 200 },
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T09&estado=${e}` }, ...PARADA]),
  { abre: `?tela=T09&momento=${CONCLUIDA}` },
  ...PARADA,
  { ve: 'GRAVADO E RELIDO' },

  // ── pelo endereço: a tela abre parada no quadro da 00, e a cadeia corre dali (G27) ──
  { abre: '?tela=T09' },
  { quieto: true },
  { ve: 'Leitor\ngravando' },
  { ve: 'Leitor\nL02', entre: ABRE },                           // o Leitor relido, a 1 s da montagem
  { anima: [GLIFO, TRILHO] },                                    // o check no poço, e o trilho que acende
  { ve: 'Eventos\ngravando' },
  { dorme: 400 },
  { quieto: true },                                              // acabou, nada fica vivo (C12·19)
  { ve: 'Conexão\ngravando', entre: [450, 750] },                // os Eventos relidos
  { anima: [GLIFO, TRILHO] },
  // a Conexão relida: a cadeia conclui — o check, a prova no lugar e o primário que acende
  { chega: 'T09', momento: CONCLUIDA, entre: BLOCO },
  { anima: [GLIFO, esmaece('ds-prova'), TEXTO], naoAnima: [ACENDE, ...TROCA] },   // o endereço que passa ao 04 não é troca
  { ve: 'GRAVADO E RELIDO' },
  { ve: 'A12.G07.L02.E05.C03' },
  { dorme: 250 },
  { quieto: true },
  // a saída: a troca entre telas (o topo muda no menu: só o miolo esmaece)
  { toca: 'Voltar ao menu', anima: [esmaece('tela-miolo')] },
  { chega: 'T04' },
  { dorme: 250 },

  // ── pelo menu (o estado de novo, com a cadeia por gravar): a troca entre telas, e a cadeia só depois dela ──
  { abre: '?tela=T04' },
  { toca: 'Entendi' },
  { dorme: 250 },
  { toca: 'Configurar módulo', anima: TROCA, naoAnima: [GLIFO] },
  { chega: 'T09' },
  { dorme: 250 },
  { quieto: true },
  { ve: 'Leitor\nL02', entre: [760, 1060] },                     // aos 1150 do toque: 150 da troca + 1000 (sem esperar a troca, ~700)
  { anima: [GLIFO, TRILHO] },

  // ── a recuperação: o ENCERRAR antes de a Conexão gravar ──
  { dorme: 200 },
  { toca: 'ENCERRAR', anima: [esmaece('ds-aviso'), TEXTO, GLIFO], naoAnima: [ACENDE] },   // o aviso no topo, o primário que acende com o texto novo, a pausa no poço
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { ve: '4 de 6' },
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
  { ve: 'Conexão\ngravando', entre: BLOCO },                     // os Eventos, relidos a 1 s do retomar
  { anima: [GLIFO, TRILHO] },
  { chega: 'T09', momento: CONCLUIDA, entre: BLOCO },
  { anima: [GLIFO, esmaece('ds-prova'), TEXTO], naoAnima: [ACENDE] },
  { dorme: 250 },
  { quieto: true },

  // ── com reduzir movimento: o mesmo ritmo, e nada anda ──
  { reduzir: true },
  { abre: '?tela=T09' },
  { quieto: true },
  { ve: 'Leitor\nL02', entre: ABRE },
  { quieto: true },
  { toca: 'ENCERRAR' },
  { quieto: true },
  { ve: 'A CONEXÃO AINDA NÃO FOI GRAVADA' },
  { toca: 'Continuar a gravação' },
  { quieto: true },
  { ve: 'Conexão\ngravando', entre: BLOCO },
  { quieto: true },
  { chega: 'T09', momento: CONCLUIDA, entre: BLOCO },
  { quieto: true },
  { ve: 'GRAVADO E RELIDO' },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna abre parado; a volta ao fluxo e o pulo, a cadeia dali ──
  { abre: '?tela=T09' },
  { janela: [1440, 900] },
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
  { palco: 'Voltar ao fluxo' },
  { chega: 'T09', estado: null },
  { quieto: true },
  { abre: '?tela=T04' },
  { palco: 'Telas do protótipo' },
  { dorme: 400 },   // o painel desliza da esquerda: o toque espera ele parar no lugar
  { palco: 'T09' },
  { chega: 'T09' },
  { quieto: true },
  { ve: 'Leitor\nL02', entre: ABRE },
]
