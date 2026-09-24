// A linha da fila de saída (T15) — uma peça só pros dois estados (revisão do C2:
// eram LinhaFila na família checklist e LinhaFilaEsperando aqui, com o mesmo
// desenho por dentro). O veredito no poço de 30 (Lei do poço na linha, exceção
// T15) com o glifo de 17, o que é e de quem embaixo, o quando à direita.
//   estado 'espera' · o que ainda não subiu (folha 4): o círculo em
//                     --tinta-secundaria (a espera da fila é fato, não apagado)
//   os outros       · o que já subiu (folha 7): o glifo do estado ('ok', 'xis'…)
// A altura muda com o estado — 50 esperando, 62 depois de subir —, porque as
// folhas 4 e 7 desenham assim. Isso bate na Lei 3 e está com o arquiteto
// (pedido das famílias linhas e checklist): quando ele decidir, a regra
// .ds-linha-fila-espera sai e fica uma altura só.
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import './LinhaFila.css'

// `posicao` (C11 · T15, G11, T15-V2): na lista da fila, a altura é regra de
// posição — 'meio', 50 com a divisória, em qualquer estado (a recebida do meio
// da T15/01); 'fim', a última, 62. Sem ela, a altura segue o estado, como acima.
export function LinhaFila({ estado = 'ok', titulo, legenda, quando, nomeGlifo, divisoria = false, posicao, className = '' }) {
  return (
    <div className={`ds-linha-fila ds-linha-fila-${estado} ${divisoria ? 'ds-linha-fila-divisoria' : ''} ${posicao ? `ds-linha-fila-${posicao}` : ''} ${className}`}>
      <Poco tam={30}><Glifo estado={estado} poco={28} nome={nomeGlifo} /></Poco>
      <span className="ds-linha-fila-texto">
        <span className="ds-linha-fila-titulo">{titulo}</span>
        <span className="ds-linha-fila-legenda">{legenda}</span>
      </span>
      <span className="ds-linha-fila-quando">{quando}</span>
    </div>
  )
}
