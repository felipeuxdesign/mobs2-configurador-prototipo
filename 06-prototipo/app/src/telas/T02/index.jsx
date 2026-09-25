// T02 · Selecionar contexto (02-telas/T02-selecionar-contexto): o técnico diz
// em que garagem está hoje. As garagens vêm do mock (garagens.js), agrupadas
// por UC na ordem do mundo; cada linha diz a idade do pacote, derivada do dado
// (formato.js), e os ativos que ele traz (T02·5). Tocar numa garagem a escolhe
// (tocar de novo não desmarca, T02·4) — o Pátio Caruaru, vencido, também
// (T02·1 a). O primário grava o contexto no estado único e vai pra T03.
//
// Os quadros: 00-tela (nada escolhido) · 01-momento-escolhida (tocar numa
// garagem; aberto pela URL, é a garagem do contexto do mock, Várzea) ·
// 02-estado-lista-longa-com-busca (o mundo do caso lista-longa-garagens: 9
// garagens, mais que o limite sem busca, e a busca aparece; ela filtra por
// nome ou cidade). A busca não é condição do quadro: aparece em qualquer mundo
// com mais de 6 garagens, e o do herói, com 3, não a tem. A lista rola por
// baixo do rodapé, que fica parado (G16, o miolo que rola).
import { useState } from 'react'
import { BarraDoSistema, Busca, Lista, LinhaEscolha, Rodape } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { filtrar, gruposDo, temBusca } from './garagens.js'
import './T02.css'

const ESCOLHIDA = '01-momento-escolhida'

export default function T02({ momento, estado }) {
  const { estado: app, despachar } = useEstado()
  const mundo = gruposDo(estado)
  const comBusca = temBusca(mundo)

  // a escolha do fluxo (00 → 01) e a do quadro do estado, que nasce sem escolha
  // e sem busca. A escolha mora aqui, e não no estado único: o palco remonta a
  // tela a cada pulo (a geração), então voltar do estado reabre o 01 com a
  // garagem do contexto do mock (Várzea), e não com a que foi tocada antes
  // (medido na revisão da entrega de 24/09; vai ao diretor, porque guardar a
  // escolha pede gravá-la no estado único já no toque, e hoje quem grava o
  // contexto é o primário, ou mudar o palco)
  const [escolhaFluxo, setEscolhaFluxo] = useState(momento === ESCOLHIDA ? M.contextoAtivo.uoId : null)
  const [escolhaEstado, setEscolhaEstado] = useState(null)
  const [busca, setBusca] = useState('')
  const [estadoAberto, setEstadoAberto] = useState(estado)
  if (estado !== estadoAberto) { setEstadoAberto(estado); setEscolhaEstado(null); setBusca('') }

  const escolhida = estado ? escolhaEstado : momento === ESCOLHIDA ? (escolhaFluxo ?? M.contextoAtivo.uoId) : null
  const uo = escolhida ? mundo.flatMap((g) => g.linhas).find((l) => l.uo.id === escolhida)?.uo ?? null : null
  const grupos = comBusca ? filtrar(mundo, busca) : mundo

  function escolher(uoId) {
    if (estado) { setEscolhaEstado(uoId); return }
    setEscolhaFluxo(uoId)
    if (momento !== ESCOLHIDA) despachar({ tipo: 'ir', tela: 'T02', momento: ESCOLHIDA })
  }

  // num estado da coluna o app está parado (o palco o deixa inerte) e nada se
  // grava: o caso tem garagens que o mundo do herói não tem, e a T03 não teria
  // o pacote delas
  function sincronizar() {
    if (estado) return
    despachar({ tipo: 'mesclar', parcial: { contexto: { ...app.contexto, uoId: uo.id, pacote: null } } })
    despachar({ tipo: 'ir', tela: 'T03' })
  }

  // O voltar do Android (logica.md): a escolha da garagem não tem saída
  // desenhada — o primário é o ato, não a saída —, e ele não faz nada (pendencias.md)
  useVoltar(null)

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
