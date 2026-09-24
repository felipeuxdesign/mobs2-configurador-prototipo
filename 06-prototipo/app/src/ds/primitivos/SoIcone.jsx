// O botão só de ícone (folha 6): o olho, o X. Desenho de 44; o toque tem 48,
// por uma área invisível em volta, sem mudar o desenho (Lei do toque de 48).
import { Icone } from './Icone.jsx'
import './SoIcone.css'

export function SoIcone({ icone, rotulo, aoTocar, tam = 20, cor = 'secundaria', pressionado }) {
  return (
    <button type="button" className="ds-so-icone" aria-label={rotulo} aria-pressed={pressionado} onClick={aoTocar}>
      <Icone nome={icone} tam={tam} cor={cor} />
    </button>
  )
}
