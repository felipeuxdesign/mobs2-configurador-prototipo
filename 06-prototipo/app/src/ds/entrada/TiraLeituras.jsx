// A tira de leituras (folha 6, T05): leituras de fato, sem veredito, em duas
// colunas — o rótulo em cima, o valor embaixo — num fundo apagado com a borda
// tracejada. `itens` é a lista de { rotulo, valor }.
// C7 · T05 (G11): o item pode trazer `destaque` (o número em --tinta, a leitura
// que tem o que contar: as 12 mensagens pendentes, T05/13) e `complemento` (o
// resto da leitura, em 500 apagado, junto do número: '· 3 de diagnóstico').
// Sem eles, a leitura é a de sempre.
import './TiraLeituras.css'

export function TiraLeituras({ itens = [] }) {
  return (
    <div className="ds-tira-leituras">
      {itens.map((item, i) => (
        <span key={i} className="ds-tira-leitura">
          <span className="ds-tira-leitura-rotulo">{item.rotulo}</span>
          <span className={item.destaque ? 'ds-tira-leitura-valor ds-tira-leitura-destaque' : 'ds-tira-leitura-valor'}>
            {item.valor}
            {item.complemento != null && <> <span className="ds-tira-leitura-complemento">{item.complemento}</span></>}
          </span>
        </span>
      ))}
    </div>
  )
}
