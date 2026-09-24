// A linha com contagem (folha 6, T03): o que o pacote baixa, um tipo por
// linha de 58, com o poço de 26, o nome e a contagem à direita. O estado muda
// o que a linha diz (Lei 3):
// · `agora`  — o que está baixando: o quadrado branco no poço, tudo em --tinta
// · `ok`     — o que já baixou: o check lima, a contagem em --tinta-secundaria
// · `espera` — o que ainda não começou: o círculo apagado, tudo em --tinta-apagada
import { Poco, Glifo } from '../index.js'
import './LinhaContagem.css'

export function LinhaContagem({ nome, contagem, estado = 'espera', divisoria = true }) {
  return (
    <div className={`ds-linha-contagem ds-linha-contagem-${estado} ${divisoria ? '' : 'ds-sem-divisoria'}`}>
      <Poco tam={26}><Glifo estado={estado} poco={26} /></Poco>
      <span className="ds-linha-contagem-nome">{nome}</span>
      <span className="ds-linha-contagem-valor">{contagem}</span>
    </div>
  )
}
