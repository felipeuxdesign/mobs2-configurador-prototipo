// A ordem importa: primeiro os tokens e a fonte, depois o palco e o app.
import '../../../03-design-system/tokens.css'
import '../../../05-recursos/fontes/barlow.css'
import './palco/palco-tokens.css'
import './palco/palco.css'
import { createRoot } from 'react-dom/client'
import { EstadoProvider } from './estado/estado.jsx'
import { Palco } from './palco/Palco.jsx'

createRoot(document.getElementById('raiz')).render(
  <EstadoProvider>
    <Palco />
  </EstadoProvider>,
)
