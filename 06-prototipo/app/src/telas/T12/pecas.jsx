// T12 · a peça só da tela: o grupo por idade da lista (HOJE, ONTEM, ESTE MÊS,
// MAIS DE UM MÊS), o rótulo em cima do cartão. Nenhuma linha em componentes.md
// (gate C0, T12 · 2): 10/700 em caixa alta, a 4 do cartão. O último guarda 16
// até o fim do miolo, como a referência desenha.
import './pecas.css'

export function Grupo({ rotulo, ultimo = false, children }) {
  return (
    <div className={`t12-grupo ${ultimo ? 't12-grupo-ultimo' : ''}`}>
      <span className="t12-grupo-rotulo">{rotulo}</span>
      {children}
    </div>
  )
}
