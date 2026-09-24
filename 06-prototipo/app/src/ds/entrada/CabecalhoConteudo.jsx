// O cabeçalho do conteúdo (folha 6): o título da tela e, à direita, o
// contador na linha de base. O contador conta o que passou (neutro), quantos
// reprovaram (falha, em vermelho) ou fecha o veredito (veredito, em lima —
// a pré-checagem de 11 de 11, T05). O título nunca vira a falha (R-03).
import './CabecalhoConteudo.css'

export function CabecalhoConteudo({ titulo, contagem, unidade, tom = 'neutro', className = '' }) {
  return (
    <div className={`ds-cabecalho ${className}`}>
      <h1 className="ds-cabecalho-titulo">{titulo}</h1>
      {contagem != null && (
        <span className={`ds-cabecalho-contador ds-cabecalho-contador-${tom}`}>
          {unidade != null ? `${contagem} ` : contagem}
          {unidade != null && <span className="ds-cabecalho-unidade">{unidade}</span>}
        </span>
      )}
    </div>
  )
}
