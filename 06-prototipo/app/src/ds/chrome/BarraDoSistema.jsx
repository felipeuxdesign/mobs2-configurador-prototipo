// A barra do sistema (folha 2): o desenho do Android, não do app. Por isso os
// três ícones são o desenho da folha, e não Lucide: o C0 mediu que sinal,
// wi-fi e bateria não têm equivalente (desenho do Android, preenchido, sem
// traço). Ela sangra no que vem logo embaixo (decisão 18): a faixa, a tira do
// menu ou a página. Sob o véu, escurece junto — uma camada de --veu por baixo
// da hora e dos ícones, que entra por opacity com o véu da folha (200ms) ou do
// diálogo (150ms) e sai em 150ms. Muda pro leitor (G15): é a barra do aparelho.
import './BarraDoSistema.css'

// fundo: 'faixa' (--fundo-faixa) · 'tira' (--poco, no menu) · 'pagina' (--fundo-pagina, sem sessão)
// veu: null · 'folha' · 'dialogo' — o que está aberto por cima da tela
export function BarraDoSistema({ hora, fundo = 'faixa', veu = null }) {
  return (
    <div aria-hidden="true" className={`ds-barra-sistema ds-barra-sistema-${fundo} ${veu ? `ds-barra-sistema-veu-${veu}` : ''}`}>
      <span className="ds-barra-sistema-hora">{hora}</span>
      <span className="ds-barra-sistema-icones">
        <svg className="ds-barra-sistema-sinal" viewBox="0 0 17 12" fill="none">
          <path d="M16 1.05v9.45a.5.5 0 01-.5.5H1.36a.5.5 0 01-.35-.86L15.15.7a.5.5 0 01.85.35z" fill="currentColor" />
        </svg>
        <svg className="ds-barra-sistema-sinal" viewBox="0 0 17 12" fill="none">
          <path d="M8.5 11.2.83 3.36a10.9 10.9 0 0115.34 0L8.5 11.2z" fill="currentColor" />
        </svg>
        <svg className="ds-barra-sistema-bateria" viewBox="0 0 25 12" fill="none">
          <rect className="ds-barra-sistema-casca" x="0.75" y="0.75" width="20.5" height="10.5" rx="3.2" stroke="currentColor" strokeWidth="1.3" />
          <rect x="2.5" y="2.5" width="13.2" height="7" rx="1.9" fill="currentColor" />
          <path className="ds-barra-sistema-casca" d="M23.1 4.3v3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  )
}
