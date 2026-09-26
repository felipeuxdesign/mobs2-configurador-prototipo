// O ícone riscado (lei 21): o ícone inteiro, com o risco por cima e um fio
// escuro separando — nunca a versão -off do Lucide, que redesenha o ícone em
// pedaços e obriga o técnico a reconhecer um desenho novo.
// O risco é a diagonal de 3,5 a 20,5 do desenho de 24 (a geometria do SVG das
// referências, como o `d` de um ícone), em dois traços: por baixo, o corte,
// grosso (--risco-corte) e da cor do poço (--poco), que abre o fio escuro no
// desenho onde o risco passa; por cima, o risco, com o traço e a cor do ícone
// (a classe do Icone ou do Glifo). É o desenho da T01/10 e 14, da T05/16 e 17,
// da T10/11 e da folha 6. Os riscados moram no fundo do poço — o poço, o visor
// da câmera —, então o corte é --poco.
// Uso: `riscado(Wifi)` é um ícone como os do Lucide, pro Icone e pro Glifo; o
// `Risco` sozinho vai dentro de um desenho do app (o olho da senha, Icone.jsx).
import { createElement } from 'react'
import './Riscado.css'

export function Risco() {
  return (
    <>
      <line className="ds-risco-corte" x1="3.5" y1="3.5" x2="20.5" y2="20.5" />
      <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" />
    </>
  )
}

// o ícone do Lucide inteiro, e o Risco depois dos traços dele (o Lucide põe os
// filhos no fim do SVG): o risco fica por cima do desenho
export function riscado(IconeDoLucide) {
  const Riscado = (props) => createElement(IconeDoLucide, props, createElement(Risco, { key: 'risco' }))
  Riscado.displayName = `Riscado(${IconeDoLucide.displayName ?? 'Icone'})`
  return Riscado
}
