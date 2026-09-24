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

const GLIFO = { aprovada: 'ok', reprovada: 'xis', 'nao-se-aplica': 'traco', parou: 'sem-sinal', 'ainda-nao': 'espera', agora: 'agora' }
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
export function LinhaChecagem({
  estado = 'aprovada', variante = 'compacta', titulo, causa, nota, valor, tom,
  glifo, nomeGlifo, divisoria = true, folgaFim = false, className = '',
}) {
  const tam = POCO[variante]
  const neutro = tom === 'neutro' && estado === 'parou'
  const classes = [
    'ds-checagem', `ds-checagem-${variante}`, `ds-checagem-${estado}`, neutro ? 'ds-checagem-tom-neutro' : '',
    causa || nota ? 'ds-checagem-com-causa' : '', divisoria ? '' : 'ds-checagem-sem-divisoria',
    folgaFim === true ? 'ds-checagem-folga-fim' : folgaFim ? `ds-checagem-fim-${folgaFim}` : '', className,
  ].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <Poco tam={tam}><Glifo estado={glifo ?? (neutro ? 'lua' : GLIFO[estado])} poco={tam} nome={nomeGlifo} /></Poco>
      <span className="ds-checagem-corpo">
        <span className="ds-checagem-titulo">{titulo}</span>
        {causa && <span className="ds-checagem-causa">{causa}</span>}
        {nota && <span className="ds-checagem-causa ds-checagem-nota">{nota}</span>}
      </span>
      {valor != null && <span className="ds-checagem-valor">{valor}</span>}
    </div>
  )
}
