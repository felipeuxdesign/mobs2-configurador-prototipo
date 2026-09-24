// A linha de checagem (folha 4): cinco estados, o mesmo desenho em todos
// (Lei 3). O glifo vive no poço (Lei 4), do tamanho da linha: 38 → 24,
// 50 → 32; a conferência da T11 leva 26 em 50 (exceção declarada nas leis).
//
// estado:   'aprovada' · 'reprovada' · 'nao-se-aplica' · 'parou' · 'ainda-nao'
// variante: 'compacta' (38, a pré-checagem) · 'passo' (38, o ciclo da T14)
//           'dupla' (50, a assertiva da sessão) · 'conferencia' (50, a T11)
// titulo, causa (só na reprovada: a linha cresce), valor (o que foi lido)
// glifo: troca o glifo do estado por outro do Glifo (ex.: 'relogio')
// divisoria: a linha embaixo · folgaFim: a última dos passos no prazo estourado (40)
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaChecagem.css'

const GLIFO = { aprovada: 'ok', reprovada: 'xis', 'nao-se-aplica': 'traco', parou: 'sem-sinal', 'ainda-nao': 'espera' }
const POCO = { compacta: 24, passo: 24, dupla: 32, conferencia: 26 }

export function LinhaChecagem({
  estado = 'aprovada', variante = 'compacta', titulo, causa, valor,
  glifo, nomeGlifo, divisoria = true, folgaFim = false, className = '',
}) {
  const tam = POCO[variante]
  const classes = [
    'ds-checagem', `ds-checagem-${variante}`, `ds-checagem-${estado}`,
    causa ? 'ds-checagem-com-causa' : '', divisoria ? '' : 'ds-checagem-sem-divisoria',
    folgaFim ? 'ds-checagem-folga-fim' : '', className,
  ].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <Poco tam={tam}><Glifo estado={glifo ?? GLIFO[estado]} poco={tam} nome={nomeGlifo} /></Poco>
      <span className="ds-checagem-corpo">
        <span className="ds-checagem-titulo">{titulo}</span>
        {causa && <span className="ds-checagem-causa">{causa}</span>}
      </span>
      {valor != null && <span className="ds-checagem-valor">{valor}</span>}
    </div>
  )
}
