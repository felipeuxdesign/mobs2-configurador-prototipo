// Os marcadores (folha 3): o quadrado de escolha e o LED da sessão.
import './Marcador.css'

// o quadrado de escolha: vazio ou lima cheio. tam 10, 11 ou 12 (as três medidas da pasta)
export function Quadrado({ escolhido = false, tam = 11 }) {
  return <span aria-hidden="true" className={`ds-quadrado ds-quadrado-${tam} ${escolhido ? 'ds-quadrado-cheio' : ''}`} />
}

// o LED da faixa: viva (lima), sem sessão (apagado), falha (vermelho)
export function Led({ estado = 'viva' }) {
  return <span aria-hidden="true" className={`ds-led ds-led-${estado}`} />
}
