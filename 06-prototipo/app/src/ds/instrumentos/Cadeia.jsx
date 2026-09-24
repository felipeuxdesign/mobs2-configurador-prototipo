// A cadeia (folha 5): os blocos gravados um de cada vez, cada um relido
// antes do próximo, ligados pelo trilho. Cada elo: o poço de 34 com o glifo
// do estado, o nome, o valor à direita (feita, A12, recusado, gravando) e a
// descrição. O elo que falhou acende (Lei 2): valor e descrição em
// vermelho, e o trilho para. Os que não foram alcançados ficam apagados.
// Na cadeia recusada, a descrição dos elos feitos sobe pra --tinta-secundaria
// (a folha 5 e a T09/01 desenham assim; na concluída ela é --tinta-apagada).
// `justa`: a cadeia divide a tela com o aviso (recusa, queda, recuperação) —
// o elo baixa de --cadeia-elo pra --cadeia-elo-justo e o fecho de 14 pra 12.
// Estados de elo: ok · agora · xis · espera · traco · sem-sinal (os do Glifo).
import { Trilho } from './Trilho.jsx'
import './Cadeia.css'

const TOM = { ok: 'feito', agora: 'corre', xis: 'falha', 'sem-sinal': 'falha' }

export function Cadeia({ elos, justa = false }) {
  const recusada = elos.some((e) => e.estado === 'xis')
  return (
    <div className={`ds-cadeia ${justa ? 'ds-cadeia-justa' : ''} ${recusada ? 'ds-cadeia-recusada' : ''}`}>
      {elos.map((e, i) => {
        const ultimo = i === elos.length - 1
        return (
          <div key={e.nome} className={`ds-cadeia-elo ds-cadeia-elo-${TOM[e.estado] ?? 'resto'} ${ultimo ? 'ds-cadeia-elo-ultimo' : ''}`}>
            <Trilho estado={e.estado} poco={34} ultimo={ultimo} nomeGlifo={e.nomeGlifo} />
            <div className="ds-cadeia-texto">
              <div className="ds-cadeia-linha">
                <span className="ds-cadeia-nome">{e.nome}</span>
                <span className="ds-cadeia-valor">{e.valor}</span>
              </div>
              {e.descricao != null && <span className="ds-cadeia-descricao">{e.descricao}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
