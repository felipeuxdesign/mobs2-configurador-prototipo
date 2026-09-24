// O cartão de valor da seção aberta (folha 7): o rótulo de bloco, o valor de
// 18 (com a unidade, se houver) e, embaixo, a medida:
//   medida ausente   → nada (o valor é veredito: "confere", "feita")
//   medida 'traco'   → o traço no lugar da barra (valor sem faixa esperada)
//   medida { min, max, faixa: [de, ate], valor } → a barra, com a faixa esperada
//                      em lima e o marcador do valor lido (o cartão com barra)
// aguarda: o valor ainda não veio (o traço da Seção E até o veículo andar).
// A família de cartão: CartaoValor, CartaoFoto, na GradeCartoes.
// C10 · T13 (G11), três acréscimos, e o que já existia fica igual:
//   unidadeTexto · a palavra que acompanha o valor ('Mobs2 dados', '12 subiram')
//                  em 12 (--n-unidade-p), e não a unidade de 10 (T13/04, 06)
//   larga        · o cartão ocupa as duas colunas da grade (a versão gravada
//                  inteira, T13·1 a); a grade preenche o buraco que ele deixa
//   aoTocar      · o cartão que leva a outra tela (o item reprovado → o nível
//                  do item; o passo de E que falta → T14, T13·4) vira o
//                  Tocavel inteiro, com o nome em `rotulo` (G14)
// A faixa aberta pra cima (max null, os satélites) vai até o fim da escala.
import { Tocavel } from '../primitivos/Tocavel.jsx'
import './CartaoValor.css'

// a posição na escala, em %, com uma casa (a régua das referências)
const pos = (x, min, max) => Math.round(((x - min) / (max - min)) * 1000) / 10

export function GradeCartoes({ colunas = 2, children }) {
  return <div className={`ds-grade-cartoes ds-grade-cartoes-${colunas}`}>{children}</div>
}

function BarraCartao({ min, max, faixa, valor }) {
  const de = pos(faixa[0], min, max)
  const ate = pos(faixa[1] ?? max, min, max)
  const estilo = { '--ds-faixa-de': `${de}%`, '--ds-faixa-largura': `${(ate - de).toFixed(1)}%`, '--ds-agulha-em': `${pos(valor, min, max)}%` }
  return (
    <div className="ds-cartao-barra" style={estilo} aria-hidden="true">
      <div className="ds-cartao-barra-faixa" />
      <div className="ds-cartao-barra-agulha" />
    </div>
  )
}

export function CartaoValor({ nome, valor, unidade, medida, aguarda = false, unidadeTexto = false, larga = false, aoTocar, rotulo }) {
  const classes = ['ds-cartao-valor']
  if (aguarda) classes.push('ds-cartao-valor-aguarda')
  if (larga) classes.push('ds-cartao-valor-larga')
  const conteudo = (
    <>
      <span className="ds-cartao-valor-nome">{nome}</span>
      <span className="ds-cartao-valor-numero">{valor}{unidade && <span className={`ds-cartao-valor-unidade ${unidadeTexto ? 'ds-cartao-valor-unidade-texto' : ''}`}>{unidade}</span>}</span>
      {medida === 'traco' && <div className="ds-cartao-valor-sem-faixa" aria-hidden="true"><span className="ds-cartao-valor-traco" /></div>}
      {medida && typeof medida === 'object' && <BarraCartao {...medida} />}
    </>
  )
  if (aoTocar) return <Tocavel rotulo={rotulo} aoTocar={aoTocar} className={classes.join(' ')}>{conteudo}</Tocavel>
  return <div className={classes.join(' ')}>{conteudo}</div>
}
