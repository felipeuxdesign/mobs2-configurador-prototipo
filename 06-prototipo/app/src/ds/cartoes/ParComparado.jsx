// O par comparado (folha 4): o lido e o cadastro, um em cima do outro, e a
// explicação embaixo (T06, T15). A peça compara os dois valores caractere a
// caractere: o que difere acende em vermelho, e a caixa ganha o traço da
// falha (Lei 2). Se os dois batem, nada acende.
import './caixas.css'
import './ParComparado.css'

// os trechos do valor, na ordem, marcando o que não bate com o outro
function trechos(valor, outro) {
  const lista = []
  for (let i = 0; i < valor.length; i++) {
    const difere = valor[i] !== outro[i]
    const ultimo = lista[lista.length - 1]
    if (ultimo && ultimo.difere === difere) ultimo.texto += valor[i]
    else lista.push({ difere, texto: valor[i] })
  }
  return lista
}

function Metade({ titulo, valor, outro, veredito = false }) {
  return (
    <div className="ds-par-metade">
      <span className={`ds-par-titulo ${veredito ? 'ds-par-titulo-veredito' : ''}`}>{titulo}</span>
      <span className="ds-par-valor">
        {trechos(valor, outro).map((t, i) => (t.difere ? <span key={i} className="ds-par-difere">{t.texto}</span> : t.texto))}
      </span>
    </div>
  )
}

// C8 · T06/01 (G11, G12): `veredito` — quando os dois batem, o rótulo do
// cadastro é a prova e vira lima (Lei 1, NO CADASTRO), e a explicação é a
// frase de 600, sem entrelinha aberta. Com os dois diferentes, não muda nada.
export function ParComparado({ lido, cadastro, explicacao, veredito = false, className = '' }) {
  const difere = lido.valor !== cadastro.valor
  const confere = veredito && !difere
  return (
    <div className={`ds-par ds-caixa-poco ${difere ? 'ds-caixa-falha' : ''} ${confere ? 'ds-par-confere' : ''} ${className}`}>
      <Metade titulo={lido.titulo} valor={lido.valor} outro={cadastro.valor} />
      <span className="ds-par-separador" aria-hidden="true" />
      <Metade titulo={cadastro.titulo} valor={cadastro.valor} outro={lido.valor} veredito={confere} />
      {explicacao != null && <span className="ds-par-explicacao">{explicacao}</span>}
    </div>
  )
}
