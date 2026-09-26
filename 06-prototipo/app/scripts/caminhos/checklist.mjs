// A entrega do checklist (decisão 34) · a T13 numa estrutura só, por toque:
// a seção que cresce no lugar e fecha, a troca de uma aberta pra outra, os
// quadros que a URL abre (o 11, o 12, o 13), tem seta, toca — a foto por fazer,
// a ação da E — e o reduzir movimento. A última entrega (decisão 39): o não
// conforme exige a foto do problema — a caixa nas duas telas do item, o
// Fotografar o problema, o registro (15), o Conte o que aconteceu apagado, a
// ordem livre entre escrever e fotografar — e o singular (1 item). Entre um toque que mexe as seções e o
// próximo, a espera dos 200 ms do movimento: no meio dele, o cartão que desce
// ainda não está no lugar (logica.md · O checklist).
export default [
  // nascer aberta não anima (a entrada da tela nunca anima)
  { abre: '?tela=T13&momento=02-momento-b-montagem-aberta' },
  { dorme: 100 },
  { quieto: true },
  { abre: '?tela=T13&momento=11-momento-homologado' },
  { dorme: 100 },
  { quieto: true },
  { ve: 'Instalação homologada às 14:30' },
  // tocar num cartão: os itens esmaecem e a seta gira pra cima (transform e opacity, 200 ms)
  { toca: 'D · Configuração', anima: [{ prop: 'opacity', ms: 200, em: 'ds-secao-ck-corpo' }, { prop: 'transform', ms: 200, em: 'ds-icone' }] },
  { chega: 'T13', momento: null },   // homologado, a seção aberta não tem referência
  { ve: 'intervalo 30 s' },
  { naoToca: 'Eventos' },   // sem seta, é leitura (Lei 16)
  { dorme: 250 },
  // trocar de uma aberta pra outra, e fechar: a lista não pula debaixo do dedo
  { toca: 'F · Servidor' },
  { naoVe: 'intervalo 30 s' },
  { ve: '12 subiram' },
  { dorme: 250 },
  { toca: 'F · Servidor' },
  { naoVe: '12 subiram' },
  { chega: 'T13', momento: '11-momento-homologado' },
  // com o reduzir movimento, a troca é direta
  { reduzir: true },
  { toca: 'A · Identificação' },
  { quieto: true },
  { ve: 'Serial do módulo' },
  { toca: 'A · Identificação' },
  { chega: 'T13', momento: '11-momento-homologado' },
  { reduzir: false },
  // o 13 pela URL grava o ciclo que a T14 fecha: abrir a B não desfaz a E resolvida
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { ve: '24' },
  { toca: 'B · Montagem' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'o ciclo passou' },
  { ve: 'Faltam 4 itens' },
  // o 12: a ressalva com o check e a causa, sem seta; a foto por fazer abre a câmera do app
  { abre: '?tela=T13&momento=12-momento-b-com-ressalva' },
  { ve: 'com ressalva · suporte trincado' },
  { ve: 'você fotografa 3 itens' },
  { naoToca: 'Módulo' },
  { toca: 'Antena GPS' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { ve: 'Antena GPS posicionada e livre' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '12-momento-b-com-ressalva' },
  // ── o não conforme exige a foto do problema (decisão 39): a caixa Não está conforme nas duas telas do item ──
  { abre: '?tela=T13&momento=07-momento-responder-item' },
  { ve: 'Enquadre o módulo e o ponto de fixação' },
  { ve: 'marque e conte o que aconteceu' },
  { naoVe: 'O QUE ACONTECEU' },
  { toca: 'Não está conforme', anima: [{ prop: 'opacity', ms: 150 }] },   // o quadrado lima surge no poço
  { chega: 'T13', momento: '08-momento-nao-conforme-com-justificativa' },
  { ve: 'Enquadre o problema' },
  { ve: 'conte embaixo o que aconteceu' },
  { ve: 'O QUE ACONTECEU' },
  { naoVe: 'Salvar com ressalva' },
  // a ordem entre escrever e fotografar é livre: sem o texto, o disparador acende igual
  { digita: '', em: 'O QUE ACONTECEU' },
  { toca: 'Fotografar o problema' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  { ve: 'Problema fotografado às 14:30' },
  { ve: 'vai junto com a ressalva, pro gestor' },
  { naoVe: 'Enquadre o problema' },
  { naoToca: 'Problema fotografado às 14:30' },   // o registro não é botão: é o que aconteceu
  // fotografado, sem o texto: o botão diz o que falta, apagado e desabilitado (lei 17)
  { desligado: 'Conte o que aconteceu' },
  { naoVe: 'Salvar com ressalva' },
  { digita: 'Suporte trincado; fixei com abraçadeira até a troca.', em: 'O QUE ACONTECEU' },   // checklist.exemploJustificativa
  { naoVe: 'Conte o que aconteceu' },
  // desmarcar volta à câmera do item (07); marcar de novo devolve o que aconteceu e a foto do problema (15)
  { toca: 'Não está conforme' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { ve: 'Enquadre o módulo e o ponto de fixação' },
  { naoVe: 'Problema fotografado às 14:30' },
  { toca: 'Não está conforme' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  { ve: 'Problema fotografado às 14:30' },
  // salvo com a ressalva, o item conta como resolvido: o próximo por fazer, e a B com a ressalva (12)
  { toca: 'Salvar com ressalva' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { ve: 'Antena GPS posicionada e livre' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '12-momento-b-com-ressalva' },
  { ve: 'com ressalva · suporte trincado' },
  { ve: 'você fotografa 3 itens' },
  { ve: 'Faltam 8 itens' },
  // escrever primeiro e fotografar depois: o 08 pela URL já tem o que aconteceu
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { toca: 'Fotografar o problema' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  { toca: 'Salvar com ressalva' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  // o 15 pela URL é o fluxo depois do toque no Fotografar o problema (G20)
  { abre: '?tela=T13&momento=15-momento-problema-fotografado' },
  { ve: 'Problema fotografado às 14:30' },
  { toca: 'Salvar com ressalva' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  // o teclado nunca esconde o que importa (regra 10): o campo O QUE ACONTECEU em foco e o botão acima dele, no 08 e no 15
  { abre: '?tela=T13&momento=08-momento-nao-conforme-com-justificativa' },
  { foca: 'O QUE ACONTECEU', teclado: 'texto' },
  { janela: [360, 480] },
  { app: [360, 480] },
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Fotografar o problema' },
  { toca: 'Fotografar o problema' },
  { chega: 'T13', momento: '15-momento-problema-fotografado' },
  // o toque no botão tira o foco do campo, e o teclado fecha; tocar no campo de novo o abre
  { janela: [360, 800] },
  { app: [360, 800] },
  { foca: 'O QUE ACONTECEU', teclado: 'texto' },
  { janela: [360, 480] },
  { app: [360, 480] },
  { aVista: 'O QUE ACONTECEU' },
  { aVista: 'Salvar com ressalva' },
  { janela: [360, 800] },
  { app: [360, 800] },
  // ── o singular (a resposta do arquiteto de 26/09): você fotografa 1 item · Falta 1 item ──
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { ve: 'Faltam 4 itens' },
  { toca: 'B · Montagem' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { toca: 'Módulo' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { toca: 'Tirar foto' },
  { ve: 'Antena GPS posicionada e livre' },
  { toca: 'Tirar foto' },
  { ve: 'Chicote e emendas protegidos' },
  { toca: 'Tirar foto' },
  { ve: 'Leitor posicionado' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'você fotografa 1 item' },
  { ve: 'Falta 1 item' },
  { naoVe: 'você fotografa 1 itens' },
  { toca: 'Leitor' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: '5 fotos tiradas' },
  { naoVe: 'Falta' },
  // a E: uma ação só, e os passos são leitura
  { abre: '?tela=T13&momento=05-momento-e-teste-dinamico-aberta' },
  { naoToca: 'Ignição ligada' },
  { toca: 'D · Configuração' },
  { dorme: 250 },
  { toca: 'E · Teste dinâmico' },
  { dorme: 250 },
  { toca: 'Fazer o ciclo dinâmico' },
  { chega: 'T14' },
]
