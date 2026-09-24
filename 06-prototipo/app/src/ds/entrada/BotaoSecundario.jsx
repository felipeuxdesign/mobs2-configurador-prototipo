// O botão secundário (folha 6, T15): a ação da linha, fora do rodapé. Fundo
// --elevado, borda --borda-neutra, 52 de alto, o texto em --tinta. Não é o
// primário (Lei 8): sem roxo e sem lima. No toque afunda 2%, como o primário,
// e solta em 100ms (só transform se move).
import './BotaoSecundario.css'

// `compacto` (C11 · T15/02, G11): o botão do cartão com dois erros, 46 de
// desenho e 15 de letra; o toque de 48 cresce por fora, sem mudar o desenho (G14).
export function BotaoSecundario({ children, aoTocar, rotulo, desabilitado = false, forcaToque = false, compacto = false }) {
  return (
    <button
      type="button"
      className={`ds-secundario ${compacto ? 'ds-secundario-compacto' : ''} ${forcaToque ? 'ds-forca-toque' : ''}`}
      disabled={desabilitado}
      aria-label={rotulo}
      onClick={desabilitado ? undefined : aoTocar}
    >
      {children}
    </button>
  )
}
