// A última entrega · as ações da conferência (decisão 40, logica.md · As ações da
// conferência): o rodapé da T11 tem um botão e um link (lei 19) — Corrigir as N
// divergências e Outras ações —, e a folha Outras ações (T11/03) tem as outras
// duas, cada uma com o efeito embaixo. A folha fecha no xis e dos outros três
// jeitos da lei 20 (tocando fora, arrastando pra baixo, no voltar), e a URL segue
// (o 03 com ela aberta). Com ela aberta, o ENCERRAR da faixa fica aceso e
// desabilitado, como na T04/10. O Corrigir e o Reenviar levam à cadeia da T09, e o
// Apenas registrar volta ao menu. Na 00 o voltar não faz nada: o link é o Outras
// ações, que não sai da tela. O 01 e o 04 abrem só pela coluna, parados.
const volta = [{ prop: 'transform', ms: 200, em: 'ds-folha' }]
const fecha = [{ prop: 'transform', ms: 150, em: 'ds-folha' }, { prop: 'opacity', ms: 150, em: 'ds-veu' }]
const esc = { tecla: 'Escape' }
const abreAFolha = [
  { toca: 'Outras ações' },
  { chega: 'T11', momento: '03-momento-outras-acoes' },
  { ve: 'a cadeia inteira, preservando a conexão' },
  { ve: 'nada é gravado · só o diagnóstico sobe' },
]
export default [
  // ── a 00, pela semente: o rodapé novo ──
  { abre: '?tela=T11' },
  { chega: 'T11', momento: null },
  { ve: 'NÃO BATE COM O CADASTRO' },
  { ve: 'Corrigir as 5 divergências' },
  { naoVe: 'Regravar' },
  { naoVe: 'Só registrar' },
  { naoVe: 'Reenviar os 5 blocos' },
  { naoToca: 'Apenas registrar o diagnóstico' },
  // o voltar não faz nada: o link é o Outras ações, que não sai da tela
  esc,
  { fica: 'T11', ms: 500 },
  { chega: 'T11', momento: null },

  // ── a folha, e os quatro jeitos de fechar ──
  ...abreAFolha,
  { desligado: 'ENCERRAR' },            // a faixa acesa em cima do véu, sem toque
  { naoToca: 'Corrigir as 5 divergências' },   // a conferência atrás do véu fica inerte
  { toca: 'Fechar' },
  { chega: 'T11', momento: null },
  { naoVe: 'nada é gravado · só o diagnóstico sobe' },
  { toca: 'ENCERRAR' },                 // fechada a folha, o ENCERRAR responde de novo: o diálogo
  { ve: 'Encerrar sem homologar?' },
  { toca: 'Continuar a instalação' },
  { naoVe: 'Encerrar sem homologar?' },
  ...abreAFolha,
  { tocaFora: 'Outras ações', anima: fecha },
  { chega: 'T11', momento: null },
  { naoVe: 'nada é gravado · só o diagnóstico sobe' },
  ...abreAFolha,
  // a folha não tem o puxador (a T11/03): o arraste começa numa linha, e não a toca
  { arrasta: 'Outras ações', de: 'Reenviar os 5 blocos', dy: 40, anima: volta },
  { fica: 'T11', ms: 300 },
  { chega: 'T11', momento: '03-momento-outras-acoes' },
  { arrasta: 'Outras ações', de: 'Apenas registrar o diagnóstico', dy: 120, anima: fecha },
  { chega: 'T11', momento: null },
  { fica: 'T11', ms: 300 },
  { naoVe: 'nada é gravado · só o diagnóstico sobe' },
  ...abreAFolha,
  esc,
  { chega: 'T11', momento: null },
  { naoVe: 'nada é gravado · só o diagnóstico sobe' },

  // ── as ações ──
  // Apenas registrar o diagnóstico: registra e volta ao menu
  ...abreAFolha,
  { toca: 'Apenas registrar o diagnóstico' },
  { chega: 'T04' },
  // Reenviar os 5 blocos: a cadeia inteira, pela T09 — o 03 pelo endereço, com a folha aberta
  { abre: '?tela=T11&momento=03-momento-outras-acoes' },
  { chega: 'T11', momento: '03-momento-outras-acoes' },
  { ve: 'Reenviar os 5 blocos' },
  { toca: 'Reenviar os 5 blocos' },
  { chega: 'T09' },
  // a T09 abre no que vai ser gravado (05, pacote 1), e o Gravar no módulo liga a cadeia
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: null },
  // Corrigir as 5 divergências: a cadeia da T09, e depois dela a mesma sessão confere (T11·2)
  { abre: '?tela=T11' },
  { toca: 'Corrigir as 5 divergências' },
  { chega: 'T09', momento: '05-momento-o-que-vai-ser-gravado' },
  { toca: 'Gravar no módulo' },
  { chega: 'T09', momento: '04-momento-cadeia-concluida', ms: 12000 },
  { toca: 'Voltar ao menu' },
  { chega: 'T04' },
  { ve: 'Seu acesso vence em 2 dias' },
  { toca: 'Entendi' },
  { toca: 'Conferir configuração' },
  { chega: 'T11', momento: '02-momento-tudo-confere' },
  { ve: 'CONFERE COM O CADASTRO', ms: 5000 },
  { naoVe: 'Outras ações' },
  { toca: 'Voltar ao menu', ms: 5000 },
  { chega: 'T04' },

  // ── o 01 e o 04, pela coluna: parados e sem toque ──
  { abre: '?tela=T11&estado=01-estado-conteudo-que-o-app-nao-reconhece' },
  { ve: 'Reenviar preserva a conexão do módulo.' },
  { naoToca: 'Reenviar os 5 blocos' },
  { naoToca: 'Apenas registrar o diagnóstico' },
  esc,
  { fica: 'T11', ms: 500 },
  { chega: 'T11', estado: '01-estado-conteudo-que-o-app-nao-reconhece' },
  { abre: '?tela=T11&estado=04-estado-versao-ilegivel' },
  { ve: 'a versão não pôde ser lida · conferido pelo conteúdo' },
  { ve: 'Corrigir as Cercas leva o Leitor e os Eventos junto.' },
  { naoToca: 'Corrigir as 2 divergências' },
  { naoToca: 'Outras ações' },
]
