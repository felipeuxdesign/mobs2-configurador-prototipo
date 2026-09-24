// A coluna (palco.md): só os estados da tela aberta, linhas de 32, o marcador
// igual ao do app (decisão 29: poço de 24 com o quadrado vazado de 11, lima de 11 no escolhido). Com mais de seis, em
// grupos (só a T05). O topo tem um lugar fixo (decisão 30): a frase do fluxo, ou
// o "Voltar ao fluxo" com um estado aberto. A coluna fica no meio da altura do celular.
import { Undo2 } from 'lucide-react'
import { NOMES, estadosDa, GRUPOS_T05 } from './telas.js'
import { Poco, Quadrado } from '../ds/index.js'

function Linha({ e, aberto, aoAbrir }) {
  return (
    <button type="button" role="radio" aria-checked={aberto} className={`coluna-linha ${aberto ? 'coluna-linha-aberta' : ''}`} onClick={() => aoAbrir(e.nome)}>
      <Poco tam={24}><Quadrado escolhido={aberto} /></Poco>
      <span className="coluna-nome">{e.rotulo}</span>
    </button>
  )
}

export function Coluna({ tela, estado, aoAbrir, aoVoltar, pisca, escala = 1 }) {
  const estados = estadosDa(tela)
  if (!estados.length) return null
  const grupos = tela === 'T05' ? GRUPOS_T05.map(([g, nome]) => [nome, estados.filter((e) => e.grupo === g)]) : [[null, estados]]
  return (
    <aside className="coluna" aria-label="Estados desta tela" style={{ '--escala': escala }}>
      <div className="coluna-cabeca">
        <span className="palco-rotulo">ESTADOS DESTA TELA</span>
        <span className="coluna-tela">{tela} · {NOMES[tela]}</span>
      </div>
      {/* o topo tem um lugar fixo de 34 (decisão 30): no fluxo, a frase; num estado, o Voltar ao fluxo — a lista não se mexe */}
      <div className="coluna-topo">
        {estado ? (
          <button type="button" key={pisca} className={`coluna-voltar ${pisca ? 'coluna-voltar-pisca' : ''}`} onClick={aoVoltar}>
            <Undo2 aria-hidden="true" className="palco-icone-14" />Voltar ao fluxo
          </button>
        ) : <span className="coluna-no-fluxo">no fluxo · toque num estado pra ver</span>}
      </div>
      <div role="radiogroup" aria-label="Estados desta tela" className="coluna-lista">
        {grupos.map(([nome, lista]) => (
          <div key={nome ?? 'todos'} className="coluna-grupo">
            {nome && <span className="coluna-grupo-nome">{nome.toUpperCase()}</span>}
            {lista.map((e) => <Linha key={e.nome} e={e} aberto={e.nome === estado} aoAbrir={aoAbrir} />)}
          </div>
        ))}
      </div>
    </aside>
  )
}
