// O que conferir (folha 6, o complemento do pacote 11): as causas de uma falha,
// numeradas, antes de tentar de novo — a caixa de poço, o rótulo e uma linha por
// causa, o nome em negrito e o que conferir depois. Nasceu na T05/04 (o pacote 7)
// e serve a toda falha que diz o que olhar: a T13/09 também (o pacote 11).
// `falha`: o traço vermelho embaixo, quando a falha mora nesta caixa (a conexão
// que não respondeu, T05/04); sem ele, a caixa de poço comum, quando a falha já
// está desenhada em cima (a régua do item reprovado, T13/09).
// `causas`: [{ titulo: '1 · Bateria do ônibus', texto: '— carga e terminais' }]
import '../cartoes/caixas.css'   // a caixa de poço, a do aviso
import './OQueConferir.css'

export function OQueConferir({ rotulo, causas, falha = false }) {
  return (
    <div className={`ds-o-que-conferir ds-caixa-poco ${falha ? 'ds-caixa-falha' : ''}`}>
      <span className="ds-o-que-conferir-rotulo">{rotulo}</span>
      {causas.map((c) => <span key={c.titulo} className="ds-o-que-conferir-causa"><span className="ds-o-que-conferir-titulo">{c.titulo}</span> {c.texto}</span>)}
    </div>
  )
}
