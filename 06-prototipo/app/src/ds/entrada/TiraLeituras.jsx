// A tira de leituras (folha 6, T05): leituras de fato, sem veredito, em duas
// colunas — o rótulo em cima, o valor embaixo — num fundo apagado com a borda
// tracejada. `itens` é a lista de { rotulo, valor }.
import './TiraLeituras.css'

export function TiraLeituras({ itens = [] }) {
  return (
    <div className="ds-tira-leituras">
      {itens.map((item, i) => (
        <span key={i} className="ds-tira-leitura">
          <span className="ds-tira-leitura-rotulo">{item.rotulo}</span>
          <span className="ds-tira-leitura-valor">{item.valor}</span>
        </span>
      ))}
    </div>
  )
}
