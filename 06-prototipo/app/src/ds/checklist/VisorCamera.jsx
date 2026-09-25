// A câmera do app: o quadro parado que as referências desenham, feito em código
// (a câmera do painel, T10/06 e 11 · a do item manual do checklist, T13/07 e
// 08). As duas câmeras do app são o mesmo desenho, então são uma peça só: o
// poço que cresce no que sobra, a câmera de 46 em --marca e a frase no meio.
// · Aberta: a câmera e a frase de enquadrar. Sem frase aprovada, só a câmera (G25).
// · Sem a permissão (semPermissao, o mundo real · T10/11): a câmera riscada, a
//   frase do que falta e, embaixo, a explicação apagada. O desenho é o mesmo
//   (Lei 3): muda o que o visor diz. Na T13, que não tem o texto, só a câmera
//   riscada (G25).
// Não se toca: o toque é do rodapé (Tirar foto, ou Abrir as configurações).
// A peça 'a câmera do app' da folha 7, desde a entrega do checklist.
import { Icone } from '../index.js'
import '../cartoes/caixas.css'   // a caixa de poço é a do aviso e do valor em poço
import './VisorCamera.css'

export function VisorCamera({ frase, explicacao, semPermissao = false }) {
  return (
    <div className="ds-visor ds-caixa-poco">
      <Icone nome={semPermissao ? 'camera-negada' : 'camera'} cor="marca" className="ds-visor-camera" />
      {frase && <span className="ds-visor-frase">{frase}</span>}
      {explicacao && <span className="ds-visor-explicacao">{explicacao}</span>}
    </div>
  )
}
