// O cartão de ferramenta do menu (folha 4, T04): cada ferramenta diz, no
// próprio cartão, o que falta pra ela funcionar (HU-T04-2). Duas formas:
// o de meia largura (ícone em poço, o nome embaixo) e o largo, que ocupa a
// linha da grade (o rótulo de topo e o valor: o serial, a placa ou o próximo
// passo). Os estados mudam o que o cartão diz, nunca o lugar das coisas (Lei 3):
//   disponivel · o ícone lima no poço
//   decide     · a borda e o valor em lima: o próximo passo (Lei 1)
//   espera     · tracejado e apagado; o traço no poço e a causa no lugar da ação
//   sem-rede   · o mesmo da espera, com a causa da rede e o traço um a menos
//                (9, como a folha 4 e a T04 o desenham)
// A contagem é o contador no canto (o da fila, HU-T04-3).
import { Tocavel, Poco, Glifo, Icone } from '../index.js'
import { Contador } from './Contador.jsx'
import './CartaoFerramenta.css'

const ICONE_DO_POCO = { 30: 18, 34: 20 } // o ícone de ferramenta dentro do poço (folha 3)

export function CartaoFerramenta({
  largo = false, estado = 'disponivel', icone, poco = 30,
  titulo, valor, causa, contagem, rotulo, aoTocar, className = '',
}) {
  const espera = estado === 'espera' || estado === 'sem-rede'
  const marca = espera
    ? <Glifo estado="traco" />
    : <Icone nome={icone} tam={ICONE_DO_POCO[poco]} cor="lima" />
  const nome = rotulo ?? [titulo, valor, causa, contagem].filter((x) => x != null).join(', ')
  // sem-rede leva as duas classes: desenha como a espera (a folha 4 a desenha tracejada,
  // embora a legenda diga borda sólida) e só muda o traço no poço
  const classe = `ds-ferramenta ds-ferramenta-${largo ? 'largo' : 'meia'} ${espera ? 'ds-ferramenta-espera' : ''} ds-ferramenta-${estado} ${className}`
  if (largo) {
    return (
      <Tocavel className={classe} rotulo={nome} aoTocar={aoTocar} desabilitado={espera}>
        <Poco tam={poco}>{marca}</Poco>
        <span className="ds-ferramenta-leitura">
          <span className="ds-ferramenta-rotulo">{titulo}</span>
          <span className="ds-ferramenta-valor">{valor}</span>
        </span>
      </Tocavel>
    )
  }
  return (
    <Tocavel className={classe} rotulo={nome} aoTocar={aoTocar} desabilitado={espera}>
      <span className="ds-ferramenta-topo">
        <Poco tam={poco}>{marca}</Poco>
        {contagem != null && <Contador valor={contagem} />}
      </span>
      <span className="ds-ferramenta-nome">
        <span className="ds-ferramenta-titulo">{titulo}</span>
        {causa != null && <span className="ds-ferramenta-causa">{causa}</span>}
      </span>
    </Tocavel>
  )
}
