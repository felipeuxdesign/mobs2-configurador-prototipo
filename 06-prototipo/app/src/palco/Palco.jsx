// O palco — a moldura de apresentação em volta do app (06-prototipo/palco.md).
// Separado do app no código: o App não sabe que o palco existe.
import { App } from '../App.jsx'

function modoPrint() {
  return new URLSearchParams(window.location.search).get('print') === '1'
}

export function Palco() {
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
