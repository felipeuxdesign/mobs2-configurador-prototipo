// A coluna do trilho (folha 5): o poço com o glifo do estado e, embaixo, o
// trilho até o próximo poço. O trilho diz o que passou: lima no que foi
// feito, branco no que corre (ou espera o técnico), a divisória no resto.
// O último elo não tem trilho. É o que a cadeia e o encerramento dividem.
// O "pulado" do encerramento é o traço do não se aplica em --marca-limite
// (a folha 5 desenha o pulado mais claro que o traço da folha 3).
import { Poco, Glifo, ESTADOS } from '../index.js'
import './Trilho.css'

const TRILHO = { ok: 'feito', agora: 'corre', energia: 'corre' }

export function Trilho({ estado, poco, ultimo = false, nomeGlifo }) {
  return (
    <div className={`ds-trilho ds-trilho-${poco}`}>
      <Poco tam={poco}>
        {estado === 'pulado'
          ? <span role="img" aria-label={nomeGlifo ?? ESTADOS.traco.nome} className="ds-trilho-pulado" />
          : <Glifo estado={estado} poco={poco} nome={nomeGlifo} />}
      </Poco>
      {!ultimo && <span className={`ds-trilho-linha ds-trilho-linha-${TRILHO[estado] ?? 'resto'}`} />}
    </div>
  )
}
