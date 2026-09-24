// O cartão de valor da seção aberta (folha 7): o rótulo de bloco, o valor de
// 18 (com a unidade, se houver) e, embaixo, a medida:
//   medida ausente   → nada (o valor é veredito: "confere", "feita")
//   medida 'traco'   → o traço no lugar da barra (valor sem faixa esperada)
//   medida { min, max, faixa: [de, ate], valor } → a barra, com a faixa esperada
//                      em lima e o marcador do valor lido (o cartão com barra)
// aguarda: o valor ainda não veio (o traço da Seção E até o veículo andar).
// A família de cartão: CartaoValor, CartaoFoto, na GradeCartoes.
import './CartaoValor.css'

// a posição na escala, em %, com uma casa (a régua das referências)
const pos = (x, min, max) => Math.round(((x - min) / (max - min)) * 1000) / 10

export function GradeCartoes({ colunas = 2, children }) {
  return <div className={`ds-grade-cartoes ds-grade-cartoes-${colunas}`}>{children}</div>
}

function BarraCartao({ min, max, faixa, valor }) {
  const de = pos(faixa[0], min, max)
  const ate = pos(faixa[1], min, max)
  const estilo = { '--ds-faixa-de': `${de}%`, '--ds-faixa-largura': `${(ate - de).toFixed(1)}%`, '--ds-agulha-em': `${pos(valor, min, max)}%` }
  return (
    <div className="ds-cartao-barra" style={estilo} aria-hidden="true">
      <div className="ds-cartao-barra-faixa" />
      <div className="ds-cartao-barra-agulha" />
    </div>
  )
}

export function CartaoValor({ nome, valor, unidade, medida, aguarda = false }) {
  return (
    <div className={`ds-cartao-valor ${aguarda ? 'ds-cartao-valor-aguarda' : ''}`}>
      <span className="ds-cartao-valor-nome">{nome}</span>
      <span className="ds-cartao-valor-numero">{valor}{unidade && <span className="ds-cartao-valor-unidade">{unidade}</span>}</span>
      {medida === 'traco' && <div className="ds-cartao-valor-sem-faixa" aria-hidden="true"><span className="ds-cartao-valor-traco" /></div>}
      {medida && typeof medida === 'object' && <BarraCartao {...medida} />}
    </div>
  )
}
