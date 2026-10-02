// A entrega do checklist (decisão 34) · a T13 numa estrutura só, por toque:
// a seção que cresce no lugar e fecha, a troca de uma aberta pra outra, os
// quadros que a URL abre (o 11, o 12, o 13), tem seta, toca — a foto por fazer,
// a ação da E — e o reduzir movimento. A última entrega (decisão 39): o não
// conforme exige a foto do problema — a caixa nas duas telas do item, o
// Fotografar o problema, o registro (15), o Conte o que aconteceu apagado, a
// ordem livre entre escrever e fotografar — e o singular (1 item). O pacote 2: a A com 3, o Painel
// foto a tirar (decisão 52), a D pelo conteúdo, a E com os 6 passos do ciclo de testes, parado
// (decisão 54). Entre um toque que mexe as seções e o
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
  { ve: '23' },
  { toca: 'B · Montagem' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'o ciclo passou' },
  { ve: 'Faltam 5 itens' },
  // a D pelo conteúdo: as cercas em regiões, o Extended ID só leitura, a APN e o leitor, sem a versão
  { abre: '?tela=T13&momento=04-momento-d-configuracao-aberta' },
  { ve: '4 regiões' },
  { ve: '3 cartões · 1 iButton' },
  { ve: 'm2m.mobs2.br' },
  { ve: '9.640 h' },
  { naoToca: 'Extended ID' },
  // a A com 3: o chassi saiu
  { abre: '?tela=T13&momento=01-momento-a-identificacao-aberta' },
  { naoVe: 'Chassi' },
  // o Painel é foto a tirar, como os outros quatro (decisão 52)
  { abre: '?tela=T13&momento=02-momento-b-montagem-aberta' },
  { ve: 'você fotografa 5 itens' },
  { naoVe: 'fotografado na calibração' },
  { toca: 'Painel' },
  { chega: 'T13', momento: '07-momento-responder-item' },
  { ve: 'Painel com hodômetro e horímetro legíveis' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  // o 12: a ressalva com o check e a causa, sem seta; a foto por fazer abre a câmera do app
  { abre: '?tela=T13&momento=12-momento-b-com-ressalva' },
  { ve: 'com ressalva · suporte trincado' },
  { ve: 'você fotografa 5 itens' },
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
  { ve: 'você fotografa 5 itens' },
  { ve: 'Faltam 10 itens' },
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
  // ── o singular (a resposta do arquiteto de 26/09): Falta 1 item · o que ele fotografa conta os itens da seção (pacote 3), e fica 5 ──
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { ve: 'Faltam 5 itens' },
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
  { toca: 'Tirar foto' },
  { ve: 'Painel com hodômetro e horímetro legíveis' },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: 'você fotografa 5 itens' },
  { ve: 'Falta 1 item' },
  { naoVe: 'você fotografa 1 itens' },
  { toca: 'Painel' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: '02-momento-b-montagem-aberta' },
  { ve: '5 fotos tiradas' },
  { naoVe: 'Falta' },
  // a E: uma ação só, e os passos são leitura
  { abre: '?tela=T13&momento=05-momento-e-teste-dinamico-aberta' },
  { naoToca: 'Ignição ligada' },
  { toca: 'D · Configuração' },
  { dorme: 250 },
  { toca: 'E · Ciclo de testes' },
  { dorme: 250 },
  { ve: 'os 6 passos, com o ônibus parado' },
  { ve: 'Cartão do motorista' },
  { toca: 'Fazer o ciclo de testes' },
  { chega: 'T14' },
]
