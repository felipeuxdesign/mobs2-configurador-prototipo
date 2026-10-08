// A empresa vem sempre antes da unidade, pra todo técnico (decisão 37, revista
// pelo diretor em 26/09; logica.md · A empresa e a unidade). São três mundos, e
// a tela abre sempre num deles:
//  · o do herói (M.empresas): três empresas, e só a dele — a Viação Atlântico
//    Sul, M.empresa — tem o mundo do protótipo (M.ucs, M.uos). O caminho: `05` as
//    empresas → `07` a escolhida → `Ver as unidades` → `06` as unidades, com o
//    `Trocar de empresa` no rodapé → `09` a unidade escolhida, com ele ainda lá →
//    `Sincronizar` → T03. É o do Entrar da T01;
//  · o de uma empresa só (o caso `uma-empresa`): `08` a lista com ela já marcada e
//    o `Ver as unidades` aceso → `00` as unidades, com o nome dela em cima e sem o
//    `Trocar de empresa` → `01` a escolhida → T03. As consultas 00 e 01 ficam paradas na coluna; a fotografia conserva essa
//    semente. O painel e o endereço simples abrem as três empresas do herói.
//  · o da lista longa (o caso `lista-longa-garagens`), de uma empresa só também:
//    as nove unidades com a busca (o `02`, o `03` e o `04`, garagens.js).
// Das outras duas empresas do herói, o mock traz só a contagem: elas se escolhem,
// e o `Ver as unidades` espera (padrão a, confirmado pelo arquiteto em 26/09).
//
// Funções puras, sem React: a tela monta cada quadro e responde a cada toque com
// elas, e `scripts/testar-empresa.mjs` as prova no node. Os estados (05, 06, 08)
// abrem pela coluna e pelo endereço, parados e sem toque (palco.md); os momentos
// (01, 07, 09) abertos pelo endereço são o app vivo no mundo deles. O mundo vai
// junto no estado único, com a unidade (contexto.empresas, { caso, atual },
// gravado no Sincronizar), até o menu: a folha de trocar de unidade do herói tem o
// Trocar de empresa (o quadro da T04/14), que volta ao 07 com a atual marcada; a
// de uma empresa só, não (o da T04/07) — src/telas/T04/dados.js. Antes do
// Sincronizar, o Ver as unidades e o Trocar de empresa gravam o quadro ali também
// (contextoDoQuadro): o Voltar ao fluxo do palco devolve o quadro de antes, no
// mesmo mundo (palco.md · o instante de antes do primeiro estado aberto).
import { M } from '../../dados/mock.js'
import { gruposDo, LISTA_LONGA, SEM_RESULTADO, ESCONDE } from './garagens.js'
import { TX } from './textos.js'

// os mundos: o nome de cada um é o que vai no estado único (contexto.empresas.caso)
export const HEROI = 'heroi'
export const UMA_EMPRESA = 'uma-empresa'
export const LONGA = 'lista-longa-garagens'

export const UNIDADE_ESCOLHIDA = '01-momento-escolhida'
export const ESCOLHER_EMPRESA = '05-estado-escolher-a-empresa'
export const UNIDADES_DA_EMPRESA = '06-estado-unidades-com-trocar-empresa'
export const EMPRESA_ESCOLHIDA = '07-momento-empresa-escolhida'
export const UMA_JA_MARCADA = '08-estado-uma-empresa-ja-marcada'
export const UNIDADE_COM_TROCA = '09-momento-unidade-escolhida-com-trocar-empresa'

/** as empresas do técnico, em cada mundo, na ordem do mock: as três do herói, a do
 *  caso uma-empresa, e a da lista longa — a mesma empresa, a do herói (a receita do 02) */
export function empresasDo(mundo) {
  if (mundo === UMA_EMPRESA) return M.casos[UMA_EMPRESA].empresas
  if (mundo === LONGA) return [M.empresa]
  return M.empresas
}
export const empresaDe = (mundo, id) => empresasDo(mundo).find((e) => e.id === id) ?? null
/** com mais de uma empresa, a troca existe: o Trocar de empresa no rodapé das unidades e na folha do menu */
export const variasEmpresas = (mundo) => empresasDo(mundo).length > 1

/** o mundo que o estado único guarda (contexto.empresas); sem ele, o do herói — o do Entrar */
export const mundoDoContexto = (contexto) => contexto?.empresas?.caso ?? HEROI
/** a folha de trocar de unidade do menu tem o Trocar de empresa (T04/14), ou não (T04/07) */
export const temVariasEmpresas = (contexto) => variasEmpresas(mundoDoContexto(contexto))
/** o mundo no estado único: qual, e a empresa atual — a da unidade que o técnico escolheu,
 *  ou a que ele confirmou no Ver as unidades. Depois do Ver as unidades, e até o
 *  Sincronizar, o passo diz que ele está nas unidades dela (contextoDoQuadro) */
export const mundoDasEmpresas = (mundo, atual, passo) => (passo === 'unidades' ? { caso: mundo, atual, passo } : { caso: mundo, atual })

/** o mundo em que a tela abre. Num estado da coluna, o da receita (receitas.js): o 05 e
 *  o 06 no do herói, o 08 no de uma empresa só, o 02 no da lista longa — e a T01/18,
 *  que monta esta tela com o diálogo por cima, nas unidades da 00, de uma empresa só,
 *  como a referência desenha. Um momento, no mundo dele: o 01 no de uma empresa só,
 *  o 03 e o 04 no da lista longa, o 07 e o 09 no do herói. No fluxo, o que o contexto
 *  guarda; sem nada, o do herói (o Entrar) */
export function mundoAoAbrir(est, momento, contexto) {
  if (est === LISTA_LONGA) return LONGA
  if (est === ESCOLHER_EMPRESA || est === UNIDADES_DA_EMPRESA) return HEROI
  if (est) return UMA_EMPRESA
  if (momento === SEM_RESULTADO || momento === ESCONDE) return LONGA
  if (momento === EMPRESA_ESCOLHIDA || momento === UNIDADE_COM_TROCA) return HEROI
  if (momento === UNIDADE_ESCOLHIDA) return UMA_EMPRESA
  return mundoDoContexto(contexto)
}

const nasEmpresas = (empresaId) => ({ passo: 'empresas', empresaId, uoId: null })
const nasUnidades = (empresaId, uoId = null) => ({ passo: 'unidades', empresaId, uoId })
/** a empresa já marcada de quem tem uma só; com várias, nenhuma */
const soEmpresa = (mundo) => (variasEmpresas(mundo) ? null : empresasDo(mundo)[0].id)

/** o quadro de partida, no mundo em que a tela abre:
 *  · parados: o 05 sem nada escolhido · o 06, as unidades da Viação sem nada · o 08, a
 *    empresa já marcada · o 02 e a T01/18, as unidades, sem nada
 *  · pelo endereço: o 07, a Viação marcada · o 09 e o 01, as unidades com a unidade do
 *    contexto do mock escolhida (Várzea) · o 04, a Várzea escolhida (a busca a esconde) ·
 *    o 03, nada · a tela (a 00, a semente), as unidades da empresa, sem nada
 *  · no fluxo, pelo contexto: com a unidade — o Voltar ao contexto e o Trocar de unidade
 *    da T03 —, as unidades da atual, sem nada escolhido; sem ela e com a atual — o Trocar
 *    de empresa do menu, ou o da própria tela —, as empresas com a atual marcada (o 07),
 *    ou, depois do Ver as unidades (o passo), as unidades dela (o quadro do 06: o Voltar
 *    ao fluxo do palco); sem nada — o Entrar —, a entrada: as empresas sem nada (o 05),
 *    ou a única já marcada (o 08) */
export function inicioDoMundo(mundo, est, momento, contexto) {
  if (est === ESCOLHER_EMPRESA) return nasEmpresas(null)
  if (est === UMA_JA_MARCADA) return nasEmpresas(soEmpresa(mundo))
  if (est) return nasUnidades(M.empresa.id)
  // a atual, e o passo, se o contexto guarda este mesmo mundo
  const doMundo = contexto?.empresas?.caso === mundo ? contexto.empresas : null
  const atual = doMundo?.atual ?? null
  if (momento === EMPRESA_ESCOLHIDA) return nasEmpresas(atual ?? M.empresa.id)
  if (momento === UNIDADE_COM_TROCA || momento === UNIDADE_ESCOLHIDA || momento === ESCONDE) return nasUnidades(M.empresa.id, M.contextoAtivo.uoId)
  if (momento === SEM_RESULTADO) return nasUnidades(M.empresa.id)
  if (contexto?.uoId) return nasUnidades(atual ?? M.empresa.id)
  if (atual) return soEmpresa(mundo) || doMundo.passo === 'unidades' ? nasUnidades(atual) : nasEmpresas(atual)
  return nasEmpresas(soEmpresa(mundo))
}

/** a URL do quadro (G20), no mundo das empresas: as empresas com uma escolhida é o 07,
 *  no herói; as empresas sem nada (o 05) e a única já marcada (o 08) são estados, que
 *  parados não andam — sem momento; as unidades sem escolha também (o 06 é estado, e a
 *  00 é a tela); a unidade escolhida é o 09 com várias empresas, e o 01 com uma só. Na
 *  lista longa, a URL é a da busca (o 03, o 04), e a escolha não vai pra ela */
export function momentoDoCaso(mundo, q) {
  if (q.passo === 'empresas') return variasEmpresas(mundo) && q.empresaId ? EMPRESA_ESCOLHIDA : null
  if (!q.uoId) return null
  return variasEmpresas(mundo) ? UNIDADE_COM_TROCA : UNIDADE_ESCOLHIDA
}

// ── as empresas · o 05, o 07 e o 08 ──

/** o rótulo de topo: quantas empresas ('3 EMPRESAS', '1 EMPRESA') */
export const rotuloDasEmpresas = (mundo) => TX.empresas(empresasDo(mundo).length)
/** a linha de cada empresa: o nome, e quantas unidades ela tem */
export const linhasDasEmpresas = (mundo, q) => empresasDo(mundo).map((e) => ({
  id: e.id, nome: e.nome, detalhe: TX.unidades(e.unidades), escolhida: e.id === q.empresaId,
}))
/** as unidades da empresa, agrupadas por UC: na lista longa, as do caso; na empresa do
 *  herói, as do mundo dele; nas outras, nenhuma — o mock traz só a contagem (padrão a) */
export function unidadesDa(mundo, empresaId) {
  if (mundo === LONGA) return gruposDo(true)
  return empresaId === M.empresa.id ? gruposDo(false) : null
}
/** o primário: apagado até escolher (Escolha uma empresa); escolhida, Ver as unidades.
 *  Com a empresa que o mock não traz as unidades, ele espera — desabilitado de
 *  verdade e em tinta apagada, como na busca que esconde a escolha (padrão a) */
export function primarioDasEmpresas(mundo, q) {
  if (!q.empresaId) return { texto: TX.escolhaEmpresa, desabilitado: true }
  return { texto: TX.verUnidades, desabilitado: !unidadesDa(mundo, q.empresaId) }
}
/** tocar numa empresa a escolhe (tocar de novo não desmarca, como nas unidades) */
export const escolherEmpresa = (q, id) => ({ ...q, empresaId: id })
/** Ver as unidades: as unidades da empresa escolhida, nada escolhido — o 06 com várias
 *  empresas, a 00 com uma só */
export const verAsUnidades = (mundo, q) => (unidadesDa(mundo, q.empresaId) ? nasUnidades(q.empresaId) : q)

// ── as unidades · o 06, o 09, a 00 e o 01 ──

/** o rótulo de topo: a empresa escolhida */
export const rotuloDaEmpresa = (mundo, q) => empresaDe(mundo, q.empresaId)?.nome ?? ''
/** tocar numa unidade a escolhe: o primário diz Sincronizar e o nome dela */
export const escolherUnidade = (q, uoId) => ({ ...q, uoId })
/** Trocar de empresa: a lista das empresas com a atual marcada — o 07 (a resposta
 *  do arquiteto, 26/09: MUDA o padrão b, que voltava ao 05 sem nada escolhido) */
export const trocarDeEmpresa = (q) => nasEmpresas(q.empresaId)
/** o Ver as unidades e o Trocar de empresa (e o voltar, que o faz) gravam o quadro no estado
 *  único, como o primário grava a unidade: o mundo, a empresa atual e, nas unidades, o passo.
 *  O Voltar ao fluxo do palco remonta a tela, e ela abre nesse quadro, no mesmo mundo. A
 *  escolha dentro do quadro — a empresa ou a unidade tocada — não vai: a pergunta da
 *  escolha no toque está com o diretor (a Várzea do 01 e do 09, index.jsx) */
export const contextoDoQuadro = (mundo, q, contexto) => ({ ...contexto, empresas: mundoDasEmpresas(mundo, q.empresaId, q.passo) })
/** o Sincronizar: a unidade, e o mundo junto, com a empresa dela, pro menu (sem o passo) */
export const contextoDoCaso = (mundo, q, contexto, uoId) => ({ ...contexto, uoId, pacote: null, empresas: mundoDasEmpresas(mundo, q.empresaId) })

/** o voltar do Android (logica.md · O voltar do Android): nas unidades de quem tem
 *  várias empresas (o 06, o 09), o mesmo que o Trocar de empresa, a saída desenhada;
 *  nas empresas (05, 07, 08) e nas unidades de quem tem uma só (00, 01, a lista
 *  longa), nada — a tela não tem saída desenhada (padrão c, que o arquiteto confirmou) */
export const voltarNoCaso = (mundo, q) => (variasEmpresas(mundo) && q.passo === 'unidades' ? trocarDeEmpresa : null)
