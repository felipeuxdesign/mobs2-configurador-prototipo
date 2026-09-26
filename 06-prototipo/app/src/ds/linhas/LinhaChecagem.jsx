// A linha de checagem (folha 4): cinco estados, o mesmo desenho em todos
// (Lei 3). O glifo vive no poço (Lei 4), do tamanho da linha: 38 → 24,
// 50 → 32 (o poço na linha, leis de medida). A conferência da T11 também leva
// o de 32 desde a entrega do checklist — antes, 26 —, com o glifo de 16 que a
// folha 4 e a T11 desenham (o tamanho do glifo do poço de 26).
//
// estado:   'aprovada' · 'reprovada' · 'nao-se-aplica' · 'parou' · 'ainda-nao'
// variante: 'compacta' (38, a pré-checagem) · 'passo' (38, o ciclo da T14)
//           'dupla' (50, a assertiva da sessão) · 'conferencia' (50, a T11)
// titulo, causa (só na reprovada: a linha cresce), valor (o que foi lido)
// glifo: troca o glifo do estado por outro do Glifo (ex.: 'relogio'); no
//        'ainda não', o glifo trocado fica apagado, na tinta de marca (T05/10)
// divisoria: a linha embaixo · folgaFim: a última dos passos no prazo estourado (40);
//        'pre-checagem' é a última da pré-checagem inteira aprovada (43, T05/05 · C6)
// C6 · T05 (G11): +estado 'agora' — a checagem que corre: o quadrado branco no
//        poço (10 no de 24) e o valor em --tinta (a T05/10: 'atualizando · 62%')
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaChecagem.css'

// C11 · T11 (G11): +estado 'diverge' — o bloco que não bate com o cadastro, na
//        linha de conferência: o traço no poço e o valor (o que o cadastro
//        manda) em --tinta, como a T11/00 e 01 desenham. O nome pro leitor
//        segue o dado (G15): quem monta passa o nomeGlifo.
// A entrega do checklist (T11/00): o bloco que não bate leva o xis vermelho, e não mais o traço.
// A última entrega · T12 (decisão 41): +estado 'indisponivel' (o traço) e 'pendente' (o relógio), no que o servidor recebeu
const GLIFO = { aprovada: 'ok', reprovada: 'xis', 'nao-se-aplica': 'traco', parou: 'sem-sinal', 'ainda-nao': 'espera', agora: 'agora', diverge: 'xis',
  indisponivel: 'traco', pendente: 'relogio' }
const POCO = { compacta: 24, passo: 24, dupla: 32, conferencia: 32, recebimento: 32 }
// o glifo pelo poço (--glifo-<poço>); onde a folha desenha outro, o poço cujo glifo ela usa
const GLIFO_DO_POCO = { conferencia: 26 }
// no recebimento, o check é o do poço de 32 (19), e o relógio do pendente, o de 16 (o do poço de 26), como a T12/05 desenha
const glifoDoPoco = (variante, estado, tam) => (variante === 'recebimento' && estado === 'pendente' ? 26 : GLIFO_DO_POCO[variante] ?? tam)

// C7 · T05 (G11), três propriedades nomeadas; sem elas, a linha é a de sempre:
// · `nota` — a linha de 12 embaixo do título, como a causa, mas em
//   --tinta-apagada: o fato que a checagem resolveu e não reprova ('aberto
//   desde 03/03 às 13:20', o canal que o app fechou, T05/13). A linha cresce igual.
// · `tom` 'neutro' — o 'parou aqui' que não é erro (o módulo em repouso,
//   T05/15): a lua no poço e o valor em --tinta-secundaria, no lugar do vermelho.
// · folgaFim 'pre-checagem-parada' — a última da pré-checagem que terminou numa
//   falha ou parou no caso (45, T05/06–09, 11, 12, 14, 15). Com a `nota`, a
//   'pre-checagem' (a inteira aprovada) abre 8 em cima e embaixo (T05/13).
// C11 · T11 (G11, G27) · `lendo` — a leitura ainda não chegou nesta linha: o
//   poço fica, vazio, e o glifo espera a vez, invisível e mudo (a T16). Na
//   conferência (a entrega do checklist), o bloco entra com o relógio no poço
//   ('em andamento'), e o que o módulo tem (a linha de cima do par) espera a vez.
// A entrega do checklist · T11 (G11), três propriedades nomeadas; sem elas, a
// linha é a de sempre (a folgaFim 'conferencia', a última de 72, saiu: a
// Conexão tem os 50 das outras):
// · `par` { modulo, cadastro } — o bloco que não bate mostra o par embaixo do
//   nome: o que o módulo tem, em vermelho, e o que o cadastro manda, em
//   --tinta-secundaria, a 3 um do outro; a linha cresce, com 10 em cima e
//   embaixo, e fica sem o valor à direita (T11/00).
// · `valorAceso` — o valor em --tinta, e não em --tinta-secundaria: o bloco que
//   confere quando a conferência não bate por outra razão (T11/01).
// · `acende` — a leitura chegou nesta linha na frente de quem olha: o glifo, e
//   a linha do módulo, esmaecem em 150 ms (animacao.md; com reduzir, direto).
//   Nascida lida (o print, a coluna), a linha não o recebe e fica parada.
// C11 · T16 (G11), na assertiva da sessão (dupla); sem elas, a linha é a de sempre:
// · o nome fica aceso em todo estado — quem diz o veredito é o glifo e o valor:
//   o 'não se aplica' leva o círculo com o traço (glifo 'traco-circulo') e o
//   valor apagado; o 'ainda não' (o ID na plataforma, na fila) leva o relógio e
//   o valor em --tinta-secundaria (T16/02 e 05).
// · folgaFim 'assertiva' — a última do cartão das assertivas, com a folga do pé
//   do cartão, sem divisória (54, T16/02, 04 e 05).
// C10 · T14 (G11): `recheioCausa` — no passo do ciclo, a linha que cresce com a
// causa abre o recheio que a referência desenha, e a causa fica na entrelinha do
// texto: 'largo' (8 em cima e embaixo, o passo reprovado no meio da lista, T14/03)
// ou 'justo' (4, o teste do cartão, a última linha, T14/04). Sem ele, os 6 de sempre.
// C11 · T12 (G11, G25): `valorQuebra` — o título não quebra, e o valor longo quebra
// em duas linhas, alinhado à direita, dentro da mesma altura: o recebimento de
// outra unidade, sem referência ('confirmado após reprocessamento', T12·2). O que
// cabe numa linha fica igual. Sem uso nas telas desde a última entrega: o
// detalhe da T12 passou à variante 'recebimento'.
// A última entrega · T12/01, 04 e 05 (decisão 41, G11) · a variante 'recebimento' —
//   o que o servidor recebeu, um critério por linha (posicionamento, eventos,
//   viagens): o glifo no poço de 32, o título em 14/600 e, embaixo, a 2, o
//   porquê numa linha (`porque`, 12 em --tinta-secundaria: '3 posições em 1 min
//   12 s', 'o pacote não declara a fila', 'sem resposta · confere por 24 h'), e
//   o veredito à direita (`valor`), em 13/700. A linha tem 58 no mínimo
//   (--linha-com-porque), com 8 em cima e embaixo. O estado muda o glifo e a
//   tinta do veredito, nunca o desenho (Lei 3):
//   · 'aprovada' — conforme, completa: o check lima, o veredito em --tinta
//   · 'indisponivel' — o pacote não declara o parâmetro: o traço, em
//     --marca-limite, e o veredito em --tinta-apagada
//   · 'pendente' — o servidor não respondeu: o relógio de 16, e o veredito em
//     --tinta-secundaria
//   · 'reprovada' — o xis, e o veredito em vermelho (nenhuma referência desenha)
//   O veredito está escrito à direita: o glifo fica mudo pro leitor (G15).
export function LinhaChecagem({
  estado = 'aprovada', variante = 'compacta', titulo, causa, nota, porque, valor, tom,
  glifo, nomeGlifo, divisoria = true, folgaFim = false, lendo = false, recheioCausa, valorQuebra = false,
  par, valorAceso = false, acende = false, className = '',
}) {
  const tam = POCO[variante]
  const neutro = tom === 'neutro' && estado === 'parou'
  // a conferência que ainda lê este bloco: o relógio no poço, à vista e com nome
  const relogio = lendo && variante === 'conferencia'
  const classes = [
    'ds-checagem', `ds-checagem-${variante}`, `ds-checagem-${estado}`, neutro ? 'ds-checagem-tom-neutro' : '',
    causa || nota ? 'ds-checagem-com-causa' : '', divisoria ? '' : 'ds-checagem-sem-divisoria',
    folgaFim === true ? 'ds-checagem-folga-fim' : folgaFim ? `ds-checagem-fim-${folgaFim}` : '', lendo ? 'ds-checagem-lendo' : '',
    relogio ? 'ds-checagem-lendo-relogio' : '', par ? 'ds-checagem-com-par' : '', valorAceso ? 'ds-checagem-valor-aceso' : '',
    acende && !lendo ? 'ds-checagem-acende' : '',
    recheioCausa && (causa || nota) ? `ds-checagem-recheio-${recheioCausa}` : '', valorQuebra ? 'ds-checagem-valor-quebra' : '', className,
  ].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <Poco tam={tam} aria-hidden={(lendo && !relogio) || variante === 'recebimento' ? 'true' : undefined}>
        <Glifo estado={relogio ? 'relogio' : glifo ?? (neutro ? 'lua' : GLIFO[estado])} poco={glifoDoPoco(variante, estado, tam)} nome={relogio ? undefined : nomeGlifo} />
      </Poco>
      <span className="ds-checagem-corpo">
        <span className="ds-checagem-titulo">{titulo}</span>
        {porque != null && <span className="ds-checagem-porque">{porque}</span>}
        {causa && <span className="ds-checagem-causa">{causa}</span>}
        {nota && <span className="ds-checagem-causa ds-checagem-nota">{nota}</span>}
        {par && <span className="ds-checagem-par ds-checagem-par-modulo" aria-hidden={lendo ? 'true' : undefined}>{par.modulo}</span>}
        {par && <span className="ds-checagem-par ds-checagem-par-cadastro">{par.cadastro}</span>}
      </span>
      {valor != null && <span className="ds-checagem-valor">{valor}</span>}
    </div>
  )
}
