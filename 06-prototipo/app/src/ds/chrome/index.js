// A família chrome (folha 2, mais a linha de opção da folha 6): o que emoldura
// toda tela — a barra do sistema, a faixa de sessão, a tira do menu, o rodapé —
// e o que vem por cima dela — o véu, a folha e o diálogo.
export { BarraDoSistema } from './BarraDoSistema.jsx'
export { Faixa } from './Faixa.jsx'
export { TiraDeContexto } from './TiraDeContexto.jsx'
export { TopoDoMenu } from './TopoDoMenu.jsx'
export { Avatar } from './Avatar.jsx'
export { Rodape } from './Rodape.jsx'
export { Veu } from './Veu.jsx'
export { Folha } from './Folha.jsx'
export { Dialogo, Frase, Destaque } from './Dialogo.jsx'
// a presença do que vem por cima (C12·6, C12·27, C12·43): o véu, a folha e o diálogo, numa peça só
export { PorCima, usePorCima, usePresenca } from './PorCima.jsx'
export { LinhaDeOpcao, CartaoDeOpcoes } from './LinhaDeOpcao.jsx'
export { CartaoDaConta } from './CartaoDaConta.jsx'
export { PrazoDaConta } from './PrazoDaConta.jsx'
export { BotaoDaFolha } from './BotaoDaFolha.jsx'
// a troca entre telas e entre quadros inteiros (C12·2, C12·3, C12·4): só o conteúdo esmaece
export { RaizDaTroca, TrocaDeQuadro, useTrocaDeQuadro, useFimDaTroca, esmaecerConteudo, emToque, respostaDoToque, consumirResposta } from './Troca.jsx'
