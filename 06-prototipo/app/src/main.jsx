// A ordem importa: primeiro os tokens e a fonte, depois o palco e o app.
import '../../../03-design-system/tokens.css'
import '../../../05-recursos/fontes/barlow.css'
import './palco/palco-tokens.css'
import './palco/palco.css'
import { createRoot } from 'react-dom/client'
import { EstadoProvider, semeado } from './estado/estado.jsx'
import { Palco } from './palco/Palco.jsx'
import { lerUrl } from './palco/rotas.js'

// a URL abre o lugar: o estado único nasce semeado na tela, no estado ou no momento dela
const u = lerUrl()
const inicial = semeado(u.tela, { estado: u.estado, momento: u.momento })

createRoot(document.getElementById('raiz')).render(
  <EstadoProvider inicial={inicial}>
    <Palco />
  </EstadoProvider>,
)
