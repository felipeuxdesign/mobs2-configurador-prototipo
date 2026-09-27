// A leitura (folha 5): o cartão de largura inteira com o número grande, a
// escala e as três marcas embaixo — o começo da escala, a faixa esperada (em
// lima, Lei 1) e o fim. Fora da faixa, o cartão ganha a borda vermelha, o
// número e o marcador ficam vermelhos e a causa aparece embaixo (Lei 2): o
// intervalo entre as linhas aperta de 8 pra 6 pra abrir o lugar dela.
// A escala (min, max, faixa, riscos) vem em `escala`; os textos, do textos.md.
//
// O movimento (T07 · animacao.md, C12·30): montar não anima. Com `corre`, a
// leitura que chega leva o marcador de onde estava até o valor (a Escala).
// A falha que chega depois de montar (o valor cai fora): a borda vermelha é
// uma camada por cima da borda de sempre (fora do fluxo, sem mexer no vão),
// e ela e a causa esmaecem no lugar
// em --mov-rapido; no fim, a camada sai e fica a borda vermelha, o desenho de
// sempre. O número e o marcador trocam de cor no lugar, com o valor. O lugar
// da causa abre direto (G24, desvio nomeado). Com reduzir, tudo direto.
import { useState } from 'react'
import { Escala } from './Escala.jsx'
import './caixas.css'
import './Leitura.css'

export function Leitura({ rotulo, valor, unidade, escala, legendas, fora = false, causa, corre = false }) {
  const [antes, setAntes] = useState(fora)
  const [acende, setAcende] = useState(false)
  if (antes !== fora) { setAntes(fora); setAcende(fora) }
  return (
    <div className={`ds-leitura ds-inst-cartao ${fora ? 'ds-leitura-fora' : ''} ${acende ? 'ds-leitura-acende' : ''}`}>
      {acende && <span className="ds-leitura-borda" aria-hidden="true" onAnimationEnd={() => setAcende(false)} />}
      <span className="ds-inst-rotulo">{rotulo}</span>
      <div className="ds-leitura-numero">
        <span className="ds-leitura-valor">{valor}</span>
        {unidade != null && <span className="ds-leitura-unidade">{unidade}</span>}
      </div>
      <Escala {...escala} tam="leitura" falha={fora} corre={corre} />
      <div className="ds-inst-legendas">
        <span>{legendas.min}</span><span className="ds-inst-legenda-lima">{legendas.faixa}</span><span>{legendas.max}</span>
      </div>
      {causa != null && <span className="ds-leitura-causa">{causa}</span>}
    </div>
  )
}
