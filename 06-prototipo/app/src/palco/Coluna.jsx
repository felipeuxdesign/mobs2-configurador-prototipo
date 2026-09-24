// A coluna (palco.md): só os estados da tela aberta, linhas de 32, o marcador
// igual ao do app (poço de 24 com o quadrado lima de 10). Com mais de seis, em
// grupos (só a T05). Com um estado aberto, o "Voltar ao fluxo" no topo.
import { Undo2 } from 'lucide-react'
import { NOMES, estadosDa, GRUPOS_T05 } from './telas.js'

function Linha({ e, aberto, aoAbrir }) {
  return (
    <button type="button" role="radio" aria-checked={aberto} className={`coluna-linha ${aberto ? 'coluna-linha-aberta' : ''}`} onClick={() => aoAbrir(e.nome)}>
      <span className="coluna-poco">{aberto && <span className="coluna-quadrado" />}</span>
      <span className="coluna-nome">{e.rotulo}</span>
    </button>
  )
}

export function Coluna({ tela, estado, aoAbrir, aoVoltar, pisca }) {
  const estados = estadosDa(tela)
  if (!estados.length) return null
  const grupos = tela === 'T05' ? GRUPOS_T05.map(([g, nome]) => [nome, estados.filter((e) => e.grupo === g)]) : [[null, estados]]
  return (
    <aside className="coluna" aria-label="Estados desta tela">
      <div className="coluna-cabeca">
        <span className="palco-rotulo">ESTADOS DESTA TELA</span>
        <span className="coluna-tela">{tela} · {NOMES[tela]}</span>
      </div>
      {estado && (
        <button type="button" key={pisca} className={`coluna-voltar ${pisca ? 'coluna-voltar-pisca' : ''}`} onClick={aoVoltar}>
          <Undo2 aria-hidden="true" className="palco-icone-14" />Voltar ao fluxo
        </button>
      )}
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
