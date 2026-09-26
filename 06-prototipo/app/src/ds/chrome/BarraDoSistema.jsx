// A barra do sistema (folha 2 · lei 22 · decisão 43): é do celular, não do app —
// o desenho de um Android atual, pra separar o celular do que é nosso. A hora na
// Google Sans (--fonte-sistema: o recorte de 05-recursos/fontes com só os números e
// os dois-pontos, no @font-face do BarraDoSistema.css), o sinal em quatro cápsulas,
// o Wi-Fi em dois arcos e um ponto, a bateria cheia e branca, sem porcentagem. Os
// três ícones são o desenho da folha, e não Lucide (o C0 mediu que não têm
// equivalente): a geometria de dentro é a da ficha do componentes.md (A barra de
// status), medida no HTML das 145 referências; o tamanho de cada SVG, o do próprio
// viewBox, e o traço do Wi-Fi vêm dos tokens, no BarraDoSistema.css (--barra-*).
// Ela sangra no que vem logo embaixo (decisão 18): a faixa, a tira do menu ou a
// página. Sob o véu, escurece junto — uma camada de --veu por baixo da hora e dos
// ícones, que entra por opacity com o véu da folha (200ms) ou do diálogo (150ms) e
// sai em 150ms. Muda pro leitor (G15): é a barra do aparelho.
import './BarraDoSistema.css'

// fundo: 'faixa' (--fundo-faixa) · 'tira' (--poco, no menu) · 'pagina' (--fundo-pagina, sem sessão)
// veu: null · 'folha' · 'dialogo' — o que está aberto por cima da tela
export function BarraDoSistema({ hora, fundo = 'faixa', veu = null }) {
  return (
    <div aria-hidden="true" className={`ds-barra-sistema ds-barra-sistema-${fundo} ${veu ? `ds-barra-sistema-veu-${veu}` : ''}`}>
      <span className="ds-barra-sistema-hora">{hora}</span>
      <span className="ds-barra-sistema-icones">
        {/* o sinal: 4 cápsulas de 2,1, a cada 4,2, alinhadas embaixo */}
        <svg className="ds-barra-sistema-sinal" viewBox="0 0 14.7 9.7" fill="currentColor">
          <rect x="0" y="5.4" width="2.1" height="4.3" rx="1.05" />
          <rect x="4.2" y="3.6" width="2.1" height="6.1" rx="1.05" />
          <rect x="8.4" y="1.2" width="2.1" height="8.5" rx="1.05" />
          <rect x="12.6" y="0" width="2.1" height="9.7" rx="1.05" />
        </svg>
        {/* o Wi-Fi: dois arcos de traço 2,3 com ponta redonda e um ponto de 2,4 embaixo */}
        <svg className="ds-barra-sistema-wifi" viewBox="0 0 12.8 10.4" fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M1.24 4.14 A7.3 7.3 0 0 1 11.56 4.14" />
          <path d="M3.64 6.54 A3.9 3.9 0 0 1 9.16 6.54" />
          <circle cx="6.4" cy="9.2" r="1.2" fill="currentColor" stroke="none" />
        </svg>
        {/* a bateria: o corpo de 18,3 × 10,4, canto de 3,1, cheio · o pininho de 1,3 × 4,2 separado */}
        <svg className="ds-barra-sistema-bateria" viewBox="0 0 20.4 10.4" fill="currentColor">
          <rect x="0" y="0" width="18.3" height="10.4" rx="3.1" />
          <rect x="19.1" y="3.1" width="1.3" height="4.2" rx="0.65" />
        </svg>
      </span>
    </div>
  )
}
