// O voltar do Android (06-prototipo/logica.md, "O voltar do Android"), numa
// peça só pras 16 telas: no computador, o Esc. A tela diz o que ele faz — o
// mesmo que o link de saída do rodapé; numa folha ou num diálogo, o X ou o
// Cancelar — e passa null onde ele não faz nada: a tela sem saída desenhada e
// os processos que não podem parar.
// Sem ação, a peça não escuta. Nem no print (EM_QUADRO), nem num estado aberto
// pela coluna do palco (estado.tela.estado): ali o app fica parado e sem toque.
// O painel do palco pega o Esc antes, na captura, e para aí (palco/Painel.jsx).
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useEstado } from './estado.jsx'
import { EM_QUADRO } from './quadro.js'

export function useVoltar(acao) {
  const { estado } = useEstado()
  const vale = Boolean(acao) && !EM_QUADRO && estado.tela.estado == null
  // a tela refaz a ação a cada desenho; o Esc chama a do último
  const vez = useRef(null)
  useLayoutEffect(() => { vez.current = vale ? acao : null })
  useEffect(() => {
    if (!vale) return undefined
    const esc = (e) => { if (e.key === 'Escape' && vez.current) vez.current() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [vale])
}
