// A escolha numa lista (folha 3, T02): tocar numa unidade a deixa escolhida.
// O quadrado lima cheio é o escolhido (Lei 1); o nome sobe pra --tinta.
// O marcador é o de todas as escolhas (decisão 29): poço de 30, vazado de 11
// no desmarcado e lima de 11 no marcado.
//
// nome, detalhe ('pacote de ontem, 07:10'), valor ('10 ativos'; sem ele, nada
// à direita — a linha da empresa da T02/05, o nome e a contagem de unidades),
// estado: 'disponivel' · 'escolhida' · 'vencida' (o traço; não se escolhe, fora com escolhivel)
// aoTocar, rotulo (o nome pro leitor de tela; o texto visível, se faltar), divisoria
// escolhivel (C4 · T02·1 a): a vencida também se escolhe — o toque põe o
// quadrado lima no lugar do traço. O traço fica no lugar do marcador de
// escolha, e por isso fica mudo (G15); o estado vai no aria-checked.
//
// C12 · o marcador da vencida que se escolhe (gate C12·20, o conserto da vencida):
// como em toda escolha, o quadrado lima surge no poço no toque (opacidade e escala
// de 80% a 100%, em 150) e, na que perde a marca, faz o mesmo ao contrário. Na
// vencida, o poço guarda o quadrado desde o começo, invisível por cima do traço (sem
// a borda do vazado, que a vencida não tem): no toque, o traço sai de uma vez e o
// lima surge no lugar dele; na volta, o traço volta e o lima some. Antes, o traço e o
// quadrado se trocavam no poço, e o lima nascia pronto, sem se mover. Parada, a linha
// é a mesma de antes, pixel a pixel. A tela não liga nada: a peça lembra que a linha
// é uma vencida, porque a tela escolhida a passa como 'escolhida'.
//
// Pacote 1 · a escolha do bloco na manutenção (T09/08): `valorTom` 'secundaria', o
// valor à direita em --tinta-secundaria, como a 08 desenha (na T02 ele é
// --tinta-apagada: a pergunta vai ao arquiteto); `inerte`, a linha que ainda não se
// escolhe — no desenho igual às outras, sem o pressionado, e desabilitada pro leitor
// (os blocos sem texto aprovado pro reenvio, G25).
import { useRef } from 'react'
import { Tocavel } from '../primitivos/Tocavel.jsx'
import { Poco } from '../primitivos/Poco.jsx'
import { Glifo } from '../primitivos/Glifo.jsx'
import { Quadrado } from '../primitivos/Marcador.jsx'
import './LinhaEscolha.css'

export function LinhaEscolha({ nome, detalhe, valor, estado = 'disponivel', aoTocar, rotulo, nomeGlifo, divisoria = true, escolhivel = false, valorTom, inerte = false, className = '' }) {
  const vencida = estado === 'vencida'
  const escolhida = estado === 'escolhida'
  // a vencida que se escolhe: o quadrado mora no poço por cima do traço, e a linha lembra disso
  const foiVencida = useRef(false)
  if (vencida && escolhivel) foiVencida.current = true
  const sobre = escolhivel && foiVencida.current
  return (
    <Tocavel
      className={`ds-escolha ds-escolha-${estado} ${divisoria ? '' : 'ds-escolha-sem-divisoria'} ${className}`}
      role="radio" aria-checked={escolhida}
      rotulo={rotulo} aoTocar={aoTocar} desabilitado={(vencida && !escolhivel) || inerte}
    >
      <Poco tam={30} className={sobre ? 'ds-escolha-poco-sobre' : ''} aria-hidden={vencida && escolhivel ? true : undefined}>
        {vencida && <Glifo key="traco" estado="traco" nome={nomeGlifo} />}
        {(!vencida || sobre) && <Quadrado key="marca" escolhido={escolhida} />}
      </Poco>
      <span className="ds-escolha-corpo">
        <span className="ds-escolha-nome">{nome}</span>
        <span className="ds-escolha-detalhe">{detalhe}</span>
      </span>
      {valor != null && <span className={`ds-escolha-valor ${valorTom ? `ds-escolha-valor-${valorTom}` : ''}`}>{valor}</span>}
    </Tocavel>
  )
}
