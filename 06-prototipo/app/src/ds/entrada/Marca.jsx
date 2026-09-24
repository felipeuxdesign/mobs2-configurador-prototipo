// A marca no login (folha 6, T01): a logo da Mobs2 e, embaixo, o nome do
// app entre dois traços. A logo é o arquivo do projeto (05-recursos/marca),
// nunca por endereço de fora; o lima dela é o --lima (Lei 15). Quem prende a
// marca a 207 do topo (--marca-topo) é a tela.
import logo from '../../../../../05-recursos/marca/logo-mobs2.svg'
import './Marca.css'

export function Marca({ nome, rotuloLogo }) {
  return (
    <div className="ds-marca">
      <img className="ds-marca-logo" src={logo} alt={rotuloLogo} />
      <div className="ds-marca-nome">
        <span className="ds-marca-traco" aria-hidden="true" />
        <span className="ds-marca-texto">{nome}</span>
        <span className="ds-marca-traco" aria-hidden="true" />
      </div>
    </div>
  )
}
