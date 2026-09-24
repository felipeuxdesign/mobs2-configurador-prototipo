// A vitrine do design system (C2): cada peça, uma vez, na moldura de
// espécime das folhas — pra fotografar e comparar com a folha dela.
// Não é o app nem o palco. Cada família registra os seus espécimes num
// arquivo de ./especimes/, exportando `especimes`.
import { useEffect, useRef } from 'react'
import '../ds/index.js'
import './vitrine.css'

const modulos = import.meta.glob('./especimes/*.jsx', { eager: true })
export const TODOS = Object.values(modulos).flatMap((m) => m.especimes ?? [])

function Moldura({ e }) {
  return <div className={`vitrine-moldura ${e.chrome ? 'vitrine-moldura-chrome' : ''}`} data-especime={e.id}>{e.render()}</div>
}

export function Vitrine() {
  const q = new URLSearchParams(window.location.search)
  const id = q.get('especime')
  const ref = useRef(null)
  useEffect(() => {
    // pra bancada: escreve a medida da moldura num <pre> que o --dump-dom lê
    if (!q.has('medir') && !q.has('lista')) return
    const out = document.createElement('pre'); out.id = 'm2cf-out'; out.style.display = 'none'
    if (q.has('lista')) out.textContent = JSON.stringify(TODOS.map(({ id, folha, rotulo }) => ({ id, folha, rotulo })))
    else { const r = ref.current.querySelector('.vitrine-moldura').getBoundingClientRect(); out.textContent = JSON.stringify({ x: r.x, y: r.y, w: r.width, h: r.height }) }
    document.body.appendChild(out)
  }, [])
  if (id) {
    const e = TODOS.find((x) => x.id === id)
    return <div className="vitrine vitrine-um" ref={ref}>{e ? <Moldura e={e} /> : <p>sem o espécime {id}</p>}</div>
  }
  const folhas = [...new Set(TODOS.map((e) => e.folha))].sort()
  return (
    <div className="vitrine" ref={ref}>
      {folhas.map((f) => (
        <section key={f} className="vitrine-folha">
          <h2 className="vitrine-titulo">Folha {f}</h2>
          <div className="vitrine-grade">
            {TODOS.filter((e) => e.folha === f).map((e) => (
              <div key={e.id} className="vitrine-especime">
                <span className="vitrine-rotulo">{e.rotulo}</span>
                <Moldura e={e} />
                {e.legenda && <span className="vitrine-legenda">{e.legenda}</span>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
