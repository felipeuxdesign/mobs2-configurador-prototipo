// As duas camadas do texto tocável do chrome (o ENCERRAR da faixa, a garagem
// da tira): a cor não anima (só transform e opacity), então o texto vem duas
// vezes, e a camada do toque, em --tinta, entra por opacity e solta em 100ms —
// o mesmo desenho do Link (G14, G26). O botão que usa leva a classe
// `ds-com-camadas`. A camada de cima é muda pro leitor.
import './Camadas.css'

export function Camadas({ children, className = '' }) {
  return (
    <span className={`ds-chrome-camadas ${className}`}>
      <span className="ds-chrome-camadas-normal">{children}</span>
      <span className="ds-chrome-camadas-toque" aria-hidden="true">{children}</span>
    </span>
  )
}
