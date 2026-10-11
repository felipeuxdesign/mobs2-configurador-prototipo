// O ícone riscado (lei 21, e a lei 14 revista no 29c): o ícone inteiro, com o risco por cima
// cortando o contorno onde passa — nunca a versão -off do Lucide, que redesenha o ícone em
// pedaços e obriga o técnico a reconhecer um desenho novo.
// O risco é a diagonal de 3,5 a 20,5 do desenho de 24 (a geometria do SVG das referências, como
// o `d` de um ícone). O corte é um VÃO DE VERDADE, feito com máscara (o 29c): o desenho fica num
// grupo mascarado, e a máscara apaga uma faixa de --risco-corte em volta do risco — nada é
// pintado na cor do fundo, então o vão funciona em qualquer fundo (o poço, o visor, a página).
// Por cima do grupo, o risco, com o traço e a cor do ícone (a classe do Icone ou do Glifo).
// É o desenho da T01/10 e 14, da T05/16 e 17, da T10/11 e das folhas 6 e 9.
// Uso: `riscado(Wifi)` é um ícone como os do Lucide, pro Icone e pro Glifo; o `ComRisco` vai
// dentro de um desenho do app, em volta dos traços dele (o olho da senha, Icone.jsx).
import { createElement, useId } from 'react'
import './Riscado.css'

const RISCO = { x1: '3.5', y1: '3.5', x2: '20.5', y2: '20.5' }

// os traços do desenho, mascarados pelo vão, e o risco por cima
export function ComRisco({ children }) {
  const id = useId()
  return (
    <>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <line className="ds-risco-vao" {...RISCO} stroke="black" />
        </mask>
      </defs>
      <g mask={`url(#${id})`}>{children}</g>
      <line {...RISCO} />
    </>
  )
}

// o ícone do Lucide inteiro, dentro do grupo mascarado (o svg dele ocupa o desenho de 24 do de
// fora: o Icone e o Glifo dão 100% a todo svg de dentro), e o risco por cima
export function riscado(IconeDoLucide) {
  const Riscado = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <ComRisco>{createElement(IconeDoLucide, props)}</ComRisco>
    </svg>
  )
  Riscado.displayName = `Riscado(${IconeDoLucide.displayName ?? 'Icone'})`
  return Riscado
}
