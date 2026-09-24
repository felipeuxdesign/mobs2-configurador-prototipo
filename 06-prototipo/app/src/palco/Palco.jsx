// O palco — a moldura de apresentação em volta do app (06-prototipo/palco.md).
// Separado do app no código: o App não sabe que o palco existe.
import '../ds/index.js'
import { App } from '../App.jsx'
import { Vitrine } from '../vitrine/Vitrine.jsx'

function modoPrint() {
  return new URLSearchParams(window.location.search).get('print') === '1'
}

export function Palco() {
  if (new URLSearchParams(window.location.search).get('vitrine') === '1') return <Vitrine />
  const print = modoPrint()
  return (
    <main className={print ? 'palco palco-print' : 'palco'}>
      <div className="celular">
        <div className="celular-tela">
          <App />
        </div>
      </div>
    </main>
  )
}
