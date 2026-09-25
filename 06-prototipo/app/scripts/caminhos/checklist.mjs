// A entrega do checklist (decisão 34) · a T13 numa estrutura só, por toque:
// a seção que cresce no lugar e fecha, a troca de uma aberta pra outra, os
// quadros que a URL abre (o 11, o 12, o 13), tem seta, toca — a foto por fazer,
// a ação da E — e o reduzir movimento. Entre um toque que mexe as seções e o
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
