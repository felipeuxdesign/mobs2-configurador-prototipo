// A câmera do app sem a permissão (06-prototipo/logica.md · O mundo real, e a
// regra 12 da lei de construir: permissão negada tem saída). Vale pras duas
// câmeras do app — a do painel, na T10, e a do item manual do checklist, na
// T13 (a do item e a do problema, decisão 39). Com a permissão, o visor diz o
// que enquadrar e o primário é o Tirar foto. Sem ela, o visor diz o que falta
// e o primário vira Abrir as configurações: na câmera, o design não desenha o pedir de novo (T10/11) —
// o técnico já negou no pedido do Android, e a saída é a página do app nas
// configurações. Na volta, o app confere a permissão de novo.
// Funções puras e sem o mock (recebem o caso): o teste roda no node,
// scripts/testar-camera.mjs.
export const CONCEDIDA = 'concedida'
export const NEGADA = 'negada'

// A permissão com que a câmera abre: a do caso que a receita do estado da
// coluna aponta (camera-sem-permissao, na T10/11). No fluxo e nos outros
// estados, concedida: nada no mock nega a câmera fora do caso, e o protótipo
// não tem o pedido do Android — o caminho natural até ela não existe.
export function permissaoDoEstado(receita, casos) {
  const nega = (receita?.casos ?? []).some((id) => casos?.[id]?.permissao === 'camera' && casos[id].resposta === 'negada')
  return nega ? NEGADA : CONCEDIDA
}

// O que a câmera mostra e o que o primário dela faz, pela permissão. Nunca um
// primário sem toque: sem a permissão, ele abre as configurações.
export function camera(permissao) {
  return permissao === NEGADA
    ? { abre: false, visor: 'sem-permissao', primario: 'abrir-configuracoes' }
    : { abre: true, visor: 'enquadre', primario: 'tirar-foto' }
}

// O primário da câmera aberta: o que o rodapé toca, lido pelas duas telas. Na
// T10, o do visor (o Tirar foto, ou o Abrir as configurações). No item manual
// do checklist, com o Não conforme marcado, o não conforme exige a foto do
// problema (decisão 39, T13/08 e 15), e o botão diz o que falta: o Fotografar
// o problema — o disparador — até a foto existir; o Conte o que aconteceu,
// apagado, até o texto; e então o Salvar com ressalva. A ordem entre escrever e
// fotografar é livre: sem a foto, o disparador acende com ou sem o texto. Sem
// a permissão, a foto do problema precisa da câmera como a do item, e o
// primário é o Abrir as configurações (regra 12). Desmarcado, volta o da câmera.
// (Antes da decisão 39, a ressalva não precisava da câmera, e o Não conforme
// marcado dava o Salvar com ressalva, com ou sem ela.)
export const APAGADO = 'conte-o-que-aconteceu'
export function primarioDaCamera(permissao, { naoConforme = false, fotografado = false, contou = false } = {}) {
  if (!naoConforme) return camera(permissao).primario
  if (!fotografado) return camera(permissao).abre ? 'fotografar-problema' : 'abrir-configuracoes'
  return contou ? 'salvar-com-ressalva' : APAGADO
}

// A volta das configurações do Android: o app confere a permissão de novo. O
// técnico foi lá pra permitir a câmera; no protótipo, que não tem o Android
// pra abrir, ele volta com ela permitida, e a câmera abre com o Tirar foto.
export function voltaDasConfiguracoes(permitiu = true) {
  return permitiu ? CONCEDIDA : NEGADA
}
