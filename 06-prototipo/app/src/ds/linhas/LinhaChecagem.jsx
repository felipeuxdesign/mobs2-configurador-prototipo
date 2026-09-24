// A linha de checagem (folha 4): cinco estados, o mesmo desenho em todos
// (Lei 3). O glifo vive no poço (Lei 4), do tamanho da linha: 38 → 24,
// 50 → 32; a conferência da T11 leva 26 em 50 (exceção declarada nas leis).
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
const GLIFO = { aprovada: 'ok', reprovada: 'xis', 'nao-se-aplica': 'traco', parou: 'sem-sinal', 'ainda-nao': 'espera', agora: 'agora', diverge: 'traco' }
const POCO = { compacta: 24, passo: 24, dupla: 32, conferencia: 26 }

// C7 · T05 (G11), três propriedades nomeadas; sem elas, a linha é a de sempre:
// · `nota` — a linha de 12 embaixo do título, como a causa, mas em
//   --tinta-apagada: o fato que a checagem resolveu e não reprova ('aberto
//   desde 03/03 às 13:20', o canal que o app fechou, T05/13). A linha cresce igual.
// · `tom` 'neutro' — o 'parou aqui' que não é erro (o módulo em repouso,
//   T05/15): a lua no poço e o valor em --tinta-secundaria, no lugar do vermelho.
// · folgaFim 'pre-checagem-parada' — a última da pré-checagem que terminou numa
//   falha ou parou no caso (45, T05/06–09, 11, 12, 14, 15). Com a `nota`, a
//   'pre-checagem' (a inteira aprovada) abre 8 em cima e embaixo (T05/13).
// C11 · T11 (G11, G27), duas propriedades nomeadas; sem elas, a linha é a de sempre:
// · folgaFim 'conferencia' — a última da lista de conferência, com a folga do
//   pé do cartão (72, T11/00–02).
// · `lendo` — a leitura ainda não chegou nesta linha: o poço fica, vazio, e o
//   glifo espera a vez, invisível e mudo (o C12 o faz surgir por opacity).
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
// outra garagem, sem referência ('confirmado após reprocessamento', T12·2). O que
// cabe numa linha fica igual.
export function LinhaChecagem({
  estado = 'aprovada', variante = 'compacta', titulo, causa, nota, valor, tom,
  glifo, nomeGlifo, divisoria = true, folgaFim = false, lendo = false, recheioCausa, valorQuebra = false, className = '',
}) {
  const tam = POCO[variante]
  const neutro = tom === 'neutro' && estado === 'parou'
  const classes = [
    'ds-checagem', `ds-checagem-${variante}`, `ds-checagem-${estado}`, neutro ? 'ds-checagem-tom-neutro' : '',
    causa || nota ? 'ds-checagem-com-causa' : '', divisoria ? '' : 'ds-checagem-sem-divisoria',
    folgaFim === true ? 'ds-checagem-folga-fim' : folgaFim ? `ds-checagem-fim-${folgaFim}` : '', lendo ? 'ds-checagem-lendo' : '',
    recheioCausa && (causa || nota) ? `ds-checagem-recheio-${recheioCausa}` : '', valorQuebra ? 'ds-checagem-valor-quebra' : '', className,
  ].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <Poco tam={tam} aria-hidden={lendo ? 'true' : undefined}><Glifo estado={glifo ?? (neutro ? 'lua' : GLIFO[estado])} poco={tam} nome={nomeGlifo} /></Poco>
      <span className="ds-checagem-corpo">
        <span className="ds-checagem-titulo">{titulo}</span>
        {causa && <span className="ds-checagem-causa">{causa}</span>}
        {nota && <span className="ds-checagem-causa ds-checagem-nota">{nota}</span>}
      </span>
      {valor != null && <span className="ds-checagem-valor">{valor}</span>}
    </div>
  )
}
