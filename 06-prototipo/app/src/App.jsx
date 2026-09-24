// O app — o que o técnico usaria. Separado do palco (06-prototipo/CLAUDE.md).
// Mostra a tela do estado único; num estado do palco, a tela montada pelo caso.
import { useEstado } from './estado/estado.jsx'
import { telaDe } from './telas/index.jsx'

export function App() {
  const { estado } = useEstado()
  const { id, momento, estado: est } = estado.tela
  const Tela = telaDe(id)
  return <div className="app" aria-label="App Configurador"><Tela momento={momento} estado={est} /></div>
}
