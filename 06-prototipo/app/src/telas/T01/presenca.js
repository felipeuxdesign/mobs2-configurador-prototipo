// A presença da folha e do diálogo: o que vem por cima da tela entra montado
// fechado e abre logo depois (a folha sobe, o diálogo cresce — o movimento é
// o da peça, movimento.md), e sai fechando antes de desmontar. Entre montar e
// abrir, a leitura do layout garante que o fechado foi calculado, e a troca de
// classe vira transição. O tempo de saída é o token da peça, lido do CSS: com
// reduzir movimento, zero. Aberto desde o começo (o momento 04 ou 09 pela URL,
// o print), nasce aberto, sem movimento.
import { useEffect, useState } from 'react'

const tempo = (token) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(token)) || 0

export function usePresenca(aberto, saida = '--mov-rapido') {
  const [montado, setMontado] = useState(aberto)
  const [visivel, setVisivel] = useState(aberto)
  useEffect(() => {
    if (aberto) { setMontado(true); return undefined }
    setVisivel(false)
    const t = setTimeout(() => setMontado(false), tempo(saida))
    return () => clearTimeout(t)
  }, [aberto, saida])
  useEffect(() => {
    if (!aberto || !montado || visivel) return
    void document.body.offsetHeight   // o fechado calculado antes de abrir
    setVisivel(true)
  }, [aberto, montado, visivel])
  return { montado, visivel }
}
