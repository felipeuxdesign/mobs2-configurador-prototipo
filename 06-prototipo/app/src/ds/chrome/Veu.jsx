// O véu (folha 2, por cima da tela): o fundo escuro atrás da folha e do
// diálogo. Ocupa o que sobra embaixo do topo (flex-grow) e põe a folha no pé
// ou o diálogo no meio. Esmaece junto: com a folha entra em 200ms, com o
// diálogo em 150ms, e sai em 150ms (movimento.md). A barra do sistema escurece
// junto pelo `veu` dela.
import { createContext, useRef } from 'react'
import './Veu.css'

// A lei 20 (a última entrega): toda folha fecha tocando fora. A Folha que mora
// no véu se registra aqui (FechaPeloVeu) com o fechar dela — o mesmo do X —, e
// tocar no véu, fora da folha, chama esse fechar. Só o véu responde: o toque
// dentro da folha não chega aqui. Pro leitor de tela, quem fecha é o X da
// folha (e o voltar do sistema), e o véu continua sem papel.
export const FechaPeloVeu = createContext(null)

// de: 'folha' (no pé) · 'dialogo' (no meio)
// `aoTocarFora` (T04/10 e 11, G11): o que o toque no véu faz, no lugar do fechar
// da folha — a T04 passa o mesmo fechar do X. Na folha, sem ela, vale o fechar
// que a Folha registrou (a lei 20). No diálogo, sem ela, o toque no véu não faz
// nada: quem fecha a confirmação é o Cancelar (lei 20) ou a saída dele.
export function Veu({ de = 'folha', visivel = true, aoTocarFora, children }) {
  const daFolha = useRef(null)
  const fora = (e) => {
    if (e.target !== e.currentTarget) return
    const fecha = aoTocarFora ?? (de === 'folha' ? daFolha.current : null)
    fecha?.()
  }
  return (
    <FechaPeloVeu.Provider value={daFolha}>
      <div className={`ds-veu ds-veu-${de} ${visivel ? '' : 'ds-veu-oculto'}`} onClick={fora}>{children}</div>
    </FechaPeloVeu.Provider>
  )
}
