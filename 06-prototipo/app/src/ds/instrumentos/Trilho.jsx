// A coluna do trilho (folha 5): o poço com o glifo do estado e, embaixo, o
// trilho até o próximo poço. O trilho diz o que passou: lima no que foi
// feito, branco no que corre (ou espera o técnico), a divisória no resto.
// O último elo não tem trilho. É o que a cadeia e o encerramento dividem.
// O "pulado" do encerramento é o desenho do traço em --marca-limite (a folha 5
// desenha o pulado mais claro que o traço da folha 3), mas não é o não se aplica:
// são três estados (otimizacao300000000 · MUDANCAS §3). O traço do pulado fica
// mudo pro leitor (aria-hidden), como a referência (T16/03) e como o 'info' do
// Glifo: a situação ao lado já diz 'pulado', e nenhuma legenda da folha 3 dá um
// nome a ele (G15). Quem passar nomeGlifo dá o nome.
import { Poco, Glifo } from '../index.js'
import './Trilho.css'

const TRILHO = { ok: 'feito', agora: 'corre', energia: 'corre' }

export function Trilho({ estado, poco, ultimo = false, nomeGlifo }) {
  return (
    <div className={`ds-trilho ds-trilho-${poco}`}>
      <Poco tam={poco}>
        {estado === 'pulado'
          ? <span {...(nomeGlifo ? { role: 'img', 'aria-label': nomeGlifo } : { 'aria-hidden': 'true' })} className="ds-trilho-pulado" />
          : <Glifo estado={estado} poco={poco} nome={nomeGlifo} />}
      </Poco>
      {!ultimo && <span className={`ds-trilho-linha ds-trilho-linha-${TRILHO[estado] ?? 'resto'}`} />}
    </div>
  )
}
