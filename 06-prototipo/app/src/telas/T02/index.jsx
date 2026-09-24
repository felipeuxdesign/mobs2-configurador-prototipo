// T02 · Selecionar contexto (02-telas/T02-selecionar-contexto): o técnico diz
// em que garagem está hoje. As garagens vêm do mock, agrupadas por UC na ordem
// de M.ucs; cada linha diz a idade do pacote (T02·6) e os ativos que ele traz
// (T02·5). Tocar numa garagem a escolhe (tocar de novo não desmarca, T02·4) —
// o Pátio Caruaru, vencido, também (T02·1 a). O primário grava o contexto no
// estado único e vai pra T03.
//
// Os quadros: 00-tela (nada escolhido) · 01-momento-escolhida (tocar numa
// garagem; aberto pela URL, é a garagem do contexto do mock, Várzea) ·
// 02-estado-lista-longa-com-busca (a busca aparece: condição de apresentação
// da receita; ela filtra por garagem e por UC, sem acento e sem caixa, T02·7).
import { useState } from 'react'
import { BarraDoSistema, Busca, Lista, LinhaEscolha, Rodape } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { M } from '../../dados/mock.js'
import { caixaAlta, chaveDeBusca, idadeNaLinhaDaGaragem, pacotePassouDoBloqueio } from '../../dados/formato.js'
import './T02.css'

const ESCOLHIDA = '01-momento-escolhida'
const LISTA_LONGA = '02-estado-lista-longa-com-busca'

// as garagens por UC; cada linha lê o pacote da UO na hora de montar
const GRUPOS = M.ucs.map((uc) => ({
  uc,
  linhas: M.uos.filter((uo) => uo.ucId === uc.id).map((uo) => {
    const p = M.pacotes.find((x) => x.uoId === uo.id)
    return { uo, detalhe: idadeNaLinhaDaGaragem(p), valor: `${p.contem.ativos} ativos`, vencida: pacotePassouDoBloqueio(p) }
  }),
}))

// a busca: a linha fica se o texto está no nome da garagem ou no da UC; o grupo sem linha some
function filtrar(grupos, texto) {
  const q = chaveDeBusca(texto)
  if (!q) return grupos
  return grupos
    .map((g) => chaveDeBusca(g.uc.nome).includes(q) ? g : { ...g, linhas: g.linhas.filter((l) => chaveDeBusca(l.uo.nome).includes(q)) })
    .filter((g) => g.linhas.length)
}

export default function T02({ momento, estado }) {
  const { estado: app, despachar } = useEstado()
  const comBusca = estado === LISTA_LONGA

  // a escolha do fluxo (00 → 01) e a do quadro do estado, que nasce sem escolha
  // e sem busca; voltar do estado devolve a escolha do fluxo como estava
  const [escolhaFluxo, setEscolhaFluxo] = useState(momento === ESCOLHIDA ? M.contextoAtivo.uoId : null)
  const [escolhaEstado, setEscolhaEstado] = useState(null)
  const [busca, setBusca] = useState('')
  const [estadoAberto, setEstadoAberto] = useState(estado)
  if (estado !== estadoAberto) { setEstadoAberto(estado); setEscolhaEstado(null); setBusca('') }

  const escolhida = estado ? escolhaEstado : momento === ESCOLHIDA ? (escolhaFluxo ?? M.contextoAtivo.uoId) : null
  const uo = escolhida ? M.uos.find((u) => u.id === escolhida) : null
  const grupos = comBusca ? filtrar(GRUPOS, busca) : GRUPOS

  function escolher(uoId) {
    if (estado) { setEscolhaEstado(uoId); return }
    setEscolhaFluxo(uoId)
    if (momento !== ESCOLHIDA) despachar({ tipo: 'ir', tela: 'T02', momento: ESCOLHIDA })
  }

  function sincronizar() {
    despachar({ tipo: 'mesclar', parcial: { contexto: { ...app.contexto, uoId: uo.id, pacote: null } } })
    despachar({ tipo: 'ir', tela: 'T03' })
  }

  return (
    <div className="t02">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="pagina" />
      <div className="tela-miolo t02-miolo">
        <div className="t02-cabeca">
          <span className="t02-empresa">{caixaAlta(M.empresa.nome)}</span>
          <h1 className="t02-titulo">Onde você está hoje?</h1>
        </div>
        {comBusca && <Busca dica="Buscar garagem ou cidade" valor={busca} aoMudar={setBusca} />}
        {grupos.map(({ uc, linhas }) => (
          <div key={uc.id} className="t02-grupo">
            <span id={`t02-${uc.id}`} className="t02-grupo-rotulo">{caixaAlta(uc.nome)}</span>
            <Lista role="radiogroup" aria-labelledby={`t02-${uc.id}`}>
              {linhas.map((l, i) => (
                <LinhaEscolha
                  key={l.uo.id}
                  nome={l.uo.nome} detalhe={l.detalhe} valor={l.valor}
                  estado={l.uo.id === escolhida ? 'escolhida' : l.vencida ? 'vencida' : 'disponivel'}
                  escolhivel divisoria={i < linhas.length - 1}
                  aoTocar={() => escolher(l.uo.id)}
                />
              ))}
            </Lista>
          </div>
        ))}
      </div>
      <Rodape
        primario={uo ? `Sincronizar ${uo.nome}` : 'Escolha uma garagem'}
        primarioDesabilitado={!uo}
        aoPrimario={sincronizar}
      />
    </div>
  )
}
