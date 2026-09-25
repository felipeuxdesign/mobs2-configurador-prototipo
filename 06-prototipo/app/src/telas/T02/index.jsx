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
// nome ou cidade) · 03-momento-busca-sem-resultado (a entrega de 25/09: o
// mesmo mundo, com a busca que não acha nada — o vazio declarado diz o termo
// digitado e sugere buscar pela cidade). A busca não é condição do quadro:
// aparece em qualquer mundo com mais de 6 garagens, e o do herói, com 3, não a
// tem. A lista rola por baixo do rodapé, que fica parado (G16, o miolo que rola).
import { useEffect, useState } from 'react'
import { BarraDoSistema, Busca, Lista, LinhaEscolha, Rodape, Vazio } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { filtrar, gruposDo, temBusca, temPacote, LISTA_LONGA, SEM_RESULTADO } from './garagens.js'
import './T02.css'

const ESCOLHIDA = '01-momento-escolhida'
// o termo que a referência 03 desenha digitado (textos.md): o endereço do momento abre com ele
const TERMO_DA_03 = 'Recreio'
const nadaCom = (termo) => `Nada com “${termo}”`

export default function T02({ momento, estado }) {
  const { estado: app, despachar } = useEstado()
  // o mundo do caso lista-longa-garagens: o estado 02, pela coluna, e o momento
  // 03, pelo endereço. Aberta pelo 03, a tela fica no mundo do caso enquanto está
  // montada: a busca que volta a achar mostra as garagens dele, e não as do herói
  const [peloMomento] = useState(momento === SEM_RESULTADO)
  const doCaso = estado === LISTA_LONGA || peloMomento
  const mundo = gruposDo(doCaso)
  const comBusca = temBusca(mundo)

  // a escolha do fluxo (00 → 01) e a do mundo do caso (o estado 02, que nasce sem
  // escolha e sem busca, e o momento 03). A escolha mora aqui, e não no estado único: o palco remonta a
  // tela a cada pulo (a geração), então voltar do estado reabre o 01 com a
  // garagem do contexto do mock (Várzea), e não com a que foi tocada antes
  // (medido na revisão da entrega de 24/09; vai ao diretor, porque guardar a
  // escolha pede gravá-la no estado único já no toque, e hoje quem grava o
  // contexto é o primário, ou mudar o palco)
  const [escolhaFluxo, setEscolhaFluxo] = useState(momento === ESCOLHIDA ? M.contextoAtivo.uoId : null)
  // a escolha no mundo do caso mora aqui e não vai pra URL: o 01 é o quadro do mundo do herói
  const [escolhaDoCaso, setEscolhaDoCaso] = useState(null)
  const [busca, setBusca] = useState(peloMomento ? TERMO_DA_03 : '')
  const [estadoAberto, setEstadoAberto] = useState(estado)
  if (estado !== estadoAberto) { setEstadoAberto(estado); setEscolhaDoCaso(null); setBusca('') }

  const grupos = comBusca ? filtrar(mundo, busca) : mundo
  // a busca que não acha nada: o vazio declarado no lugar da lista (03). A escolha
  // que ela esconde fica guardada, e volta com a lista; enquanto nada aparece, o
  // primário espera, como a 03 desenha
  const semResultado = comBusca && grupos.length === 0
  const escolhida = semResultado ? null : doCaso ? escolhaDoCaso : momento === ESCOLHIDA ? (escolhaFluxo ?? M.contextoAtivo.uoId) : null
  const uo = escolhida ? mundo.flatMap((g) => g.linhas).find((l) => l.uo.id === escolhida)?.uo ?? null : null

  // a URL diz o 03 enquanto a busca não acha nada; a que volta a achar o tira.
  // Num estado da coluna, nada anda
  useEffect(() => {
    if (estado) return
    if (semResultado && momento !== SEM_RESULTADO) despachar({ tipo: 'ir', tela: 'T02', momento: SEM_RESULTADO })
    else if (!semResultado && momento === SEM_RESULTADO) despachar({ tipo: 'ir', tela: 'T02', momento: null })
  }, [estado, semResultado, momento, despachar])

  function escolher(uoId) {
    if (doCaso) { setEscolhaDoCaso(uoId); return }
    setEscolhaFluxo(uoId)
    if (momento !== ESCOLHIDA) despachar({ tipo: 'ir', tela: 'T02', momento: ESCOLHIDA })
  }

  // num estado da coluna o app está parado (o palco o deixa inerte) e nada se
  // grava. No mundo do caso aberto pelo 03, só sincroniza a garagem que o mundo
  // do herói também tem (Várzea, Ibura, Caruaru): as outras seis não têm pacote
  // no mock, e a T03 não teria o que baixar (pendência)
  function sincronizar() {
    if (estado || !temPacote(uo.id)) return
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
        {comBusca && <Busca dica="Buscar garagem ou cidade" valor={busca} aoMudar={setBusca} focado={semResultado} />}
        {semResultado && <Vazio titulo={nadaCom(busca.trim())} frase="Confira o nome, ou busque pela cidade." />}
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
