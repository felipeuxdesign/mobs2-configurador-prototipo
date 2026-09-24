// A linha de módulo (folha 6, T05): o serial à esquerda e a variante à
// direita, na linha dupla de 50. Tocável (o pressionado sobe pra --elevado).
// `apagada` é o módulo que não se escolhe (T05: o não cadastrado): o serial
// cai pra --tinta-apagada e a linha não é tocável.
// C6 · T05 (G11), duas propriedades nomeadas; sem elas, a linha é a de sempre:
// · `escolha` — a lista de escolha da T05/01: 72 de alto, o marcador de
//   escolha vazio no poço de 30 (o traço, mudo, no apagado), o serial em cima
//   da variante e, à direita, `rotuloValor` em cima de `valor` (FIRMWARE ·
//   2.3.5). É rádio (aria-checked), e o marcador fica mudo (G15).
// · `fim` — a última linha da lista, com a folga que a referência desenha no
//   pé do cartão: 56 na busca (T05/00, 04) e 76 na escolha (T05/01).
import { Tocavel, Poco, Glifo, Quadrado } from '../index.js'
import './LinhaModulo.css'

export function LinhaModulo({ serial, variante, aoTocar, rotulo, apagada = false, divisoria = true, escolha = false, rotuloValor, valor, fim = false }) {
  const classe = [
    'ds-linha-modulo', escolha ? 'ds-linha-modulo-escolha' : '', apagada ? 'ds-linha-modulo-apagada' : '',
    divisoria ? '' : 'ds-sem-divisoria', fim ? 'ds-linha-modulo-fim' : '',
  ].filter(Boolean).join(' ')
  const conteudo = escolha ? (
    <>
      <Poco tam={30} aria-hidden="true">{apagada ? <Glifo estado="traco" /> : <Quadrado tam={11} />}</Poco>
      <span className="ds-linha-modulo-corpo">
        <span className="ds-linha-modulo-serial">{serial}</span>
        <span className="ds-linha-modulo-variante">{variante}</span>
      </span>
      {valor != null && (
        <span className="ds-linha-modulo-coluna">
          <span className="ds-linha-modulo-rotulo">{rotuloValor}</span>
          <span className="ds-linha-modulo-valor">{valor}</span>
        </span>
      )}
    </>
  ) : (
    <>
      <span className="ds-linha-modulo-serial">{serial}</span>
      <span className="ds-linha-modulo-variante">{variante}</span>
    </>
  )
  if (apagada) return <div className={classe}>{conteudo}</div>
  const radio = escolha ? { role: 'radio', 'aria-checked': false } : {}
  return <Tocavel className={classe} rotulo={rotulo} aoTocar={aoTocar} {...radio}>{conteudo}</Tocavel>
}
