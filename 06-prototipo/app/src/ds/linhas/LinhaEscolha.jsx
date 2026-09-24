// A escolha numa lista (folha 3, T02): tocar numa garagem a deixa escolhida.
// O quadrado lima cheio é o escolhido (Lei 1); o nome sobe pra --tinta.
//
// nome, detalhe ('pacote de ontem, 07:10'), valor ('10 ativos'),
// estado: 'disponivel' · 'escolhida' · 'vencida' (o traço; não se escolhe, fora com escolhivel)
// aoTocar, rotulo (o nome pro leitor de tela; o texto visível, se faltar), divisoria
// escolhivel (C4 · T02·1 a): a vencida também se escolhe — o toque põe o
// quadrado lima no lugar do traço. O traço fica no lugar do marcador de
// escolha, e por isso fica mudo (G15); o estado vai no aria-checked.
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Quadrado } from '../primitivos/Marcador.jsx'
import './LinhaEscolha.css'

export function LinhaEscolha({ nome, detalhe, valor, estado = 'disponivel', aoTocar, rotulo, nomeGlifo, divisoria = true, escolhivel = false, className = '' }) {
  const vencida = estado === 'vencida'
  const escolhida = estado === 'escolhida'
  return (
    <Tocavel
      className={`ds-escolha ds-escolha-${estado} ${divisoria ? '' : 'ds-escolha-sem-divisoria'} ${className}`}
      role="radio" aria-checked={escolhida}
      rotulo={rotulo} aoTocar={aoTocar} desabilitado={vencida && !escolhivel}
    >
      <Poco tam={26} aria-hidden={vencida && escolhivel ? true : undefined}>{vencida ? <Glifo estado="traco" nome={nomeGlifo} /> : <Quadrado escolhido={escolhida} tam={escolhida ? 12 : 11} />}</Poco>
      <span className="ds-escolha-corpo">
        <span className="ds-escolha-nome">{nome}</span>
        <span className="ds-escolha-detalhe">{detalhe}</span>
      </span>
      <span className="ds-escolha-valor">{valor}</span>
    </Tocavel>
  )
}
