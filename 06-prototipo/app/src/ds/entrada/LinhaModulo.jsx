// A linha de módulo (folha 6, T05): o serial à esquerda e a variante à
// direita, na linha dupla de 50. Tocável (o pressionado sobe pra --elevado).
// `apagada` é o módulo que não se escolhe (T05: o não cadastrado): o serial
// cai pra --tinta-apagada e a linha não é tocável.
import { Tocavel } from '../index.js'
import './LinhaModulo.css'

export function LinhaModulo({ serial, variante, aoTocar, rotulo, apagada = false, divisoria = true }) {
  const classe = `ds-linha-modulo ${apagada ? 'ds-linha-modulo-apagada' : ''} ${divisoria ? '' : 'ds-sem-divisoria'}`
  const conteudo = (
    <>
      <span className="ds-linha-modulo-serial">{serial}</span>
      <span className="ds-linha-modulo-variante">{variante}</span>
    </>
  )
  if (apagada) return <div className={classe}>{conteudo}</div>
  return <Tocavel className={classe} rotulo={rotulo} aoTocar={aoTocar}>{conteudo}</Tocavel>
}
