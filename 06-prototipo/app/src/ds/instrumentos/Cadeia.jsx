// A cadeia (folha 5): os blocos gravados um de cada vez, cada um relido
// antes do próximo, ligados pelo trilho. Cada elo: o poço de 34 com o glifo
// do estado, o nome, o valor à direita (feita, o conteúdo do bloco — OF-1621,
// 4 regiões —, recusado, gravando; o módulo não guarda versão, decisão 49) e a
// descrição. O elo que falhou acende (Lei 2): valor e descrição em
// vermelho, e o trilho para. Os que não foram alcançados ficam apagados.
// Na cadeia recusada, a descrição dos elos feitos sobe pra --tinta-secundaria
// (a folha 5 e a T09/01 desenham assim; na concluída ela é --tinta-apagada).
// `justa`: a cadeia divide a tela com o aviso (recusa, queda, recuperação) —
// o elo baixa de --cadeia-elo pra --cadeia-elo-justo e o fecho de 14 pra 12.
// Estados de elo: ok · agora · xis · espera · traco · sem-sinal (os do Glifo).
// `altura` (C9 · T09, G11): as duas alturas que a T09 desenha além dessas —
// 'correndo', a cadeia gravando (elo de 86, fecho 14, T09/00), e 'pausada', a
// cadeia parada com o contador e o aviso (elo de 68, fecho 12, T09/02 e 03).
// O elo em que a cadeia pausou (sem-sinal-neutro, pausa) fica aceso como o que
// corre: nome e valor em --tinta, e o trilho dele ainda apagado.
// Pacote 1 (decisão 47 · a cadeia antes de gravar, folha 5, a peça nova): o elo
// que espera a gravação leva o relógio no poço ('relogio', o tom 'antes'), em
// --marca-limite; o nome em --tinta-forte, o valor (primeiro, o conteúdo) em
// --tinta-secundaria, e o trilho em --borda-poco, o cinza da borda do poço — o
// 'resto' de quem não foi alcançado continua na divisória. Com o aviso das travas
// do envio, ela é a justa (elo de 70, fecho 12: T09/05, 06, 07); o elo das cercas
// que passam do limite é o que falhou (xis, T09/07), e o trilho dele é o resto.
// `curta` (T09/09 · a cadeia curta da manutenção): só a limpeza e o bloco
// escolhido, e a frase do que fica embaixo — o último elo guarda a altura dele,
// como a referência desenha (os dois de 86).
// `semFecho` (T09/05 a 07): a cadeia que fecha o miolo — nada vem embaixo dela —
// deixa o último elo sem o fecho de baixo. Com o aviso das travas, o fecho e o
// recheio do miolo passariam 7 da altura, que a referência corta: o quadro rolaria
// à toa (G16). No desenho, nada muda.
import { emLinhas } from '../primitivos/linhas.jsx'
import { Trilho } from './Trilho.jsx'
import './Cadeia.css'

const TOM = { ok: 'feito', agora: 'corre', xis: 'falha', 'sem-sinal': 'falha', 'sem-sinal-neutro': 'corre', pausa: 'corre', relogio: 'antes' }

export function Cadeia({ elos, justa = false, altura, curta = false, semFecho = false }) {
  const recusada = elos.some((e) => e.estado === 'xis')
  return (
    <div className={`ds-cadeia ${justa ? 'ds-cadeia-justa' : ''} ${altura ? `ds-cadeia-${altura}` : ''} ${recusada ? 'ds-cadeia-recusada' : ''} ${curta ? 'ds-cadeia-curta' : ''} ${semFecho ? 'ds-cadeia-sem-fecho' : ''}`}>
      {elos.map((e, i) => {
        const ultimo = i === elos.length - 1
        return (
          <div key={e.nome} className={`ds-cadeia-elo ds-cadeia-elo-${TOM[e.estado] ?? 'resto'} ${ultimo ? 'ds-cadeia-elo-ultimo' : ''}`}>
            {/* C12·32 · a cadeia liga o trilho que acende (o do elo relido, de cima pra baixo); o encerramento, não */}
            <Trilho estado={e.estado} poco={34} ultimo={ultimo} nomeGlifo={e.nomeGlifo} acende />
            <div className="ds-cadeia-texto">
              <div className="ds-cadeia-linha">
                <span className="ds-cadeia-nome">{e.nome}</span>
                <span className={`ds-cadeia-valor ${e.valorAceso ? 'ds-cadeia-valor-aceso' : ''}`}>{e.valor}</span>
              </div>
              {e.descricao != null && <span className="ds-cadeia-descricao">{emLinhas(e.descricao)}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
