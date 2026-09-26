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
// digitado e sugere buscar pela cidade) · 04-momento-busca-esconde-a-escolha
// (a otimização do design: o mesmo mundo, com a Várzea escolhida e a busca que
// acha outra garagem e a esconde — o primário espera). A busca não é condição
// do quadro: aparece em qualquer mundo com mais de 6 garagens, e o do herói, com
// 3, não a tem. A lista rola por baixo do rodapé, que fica parado (G16, o miolo
// que rola). Toda garagem do mundo do caso tem pacote (src/dados/garagens.js):
// o Sincronizar de qualquer uma leva à T03, que baixa o pacote dela.
import { useEffect, useState } from 'react'
import { BarraDoSistema, Busca, Lista, LinhaEscolha, Rodape, Vazio } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { filtrar, gruposDo, temBusca, LISTA_LONGA, SEM_RESULTADO, ESCONDE } from './garagens.js'
import './T02.css'

const ESCOLHIDA = '01-momento-escolhida'
// os termos que as referências 03 e 04 desenham digitados (textos.md): o endereço do momento abre com eles
const TERMO_DA_03 = 'Recreio'
const TERMO_DA_04 = 'Olin'
// os dois quadros da busca, que abrem pelo endereço no mundo do caso, e a URL que diz cada um
const DA_BUSCA = [SEM_RESULTADO, ESCONDE]
const nadaCom = (termo) => `Nada com “${termo}”`

export default function T02({ momento, estado }) {
  const { estado: app, despachar } = useEstado()
  // o mundo do caso lista-longa-garagens: o estado 02, pela coluna, e os momentos
  // 03 e 04, pelo endereço. Aberta pelo 03 ou pelo 04, a tela fica no mundo do caso
  // enquanto está montada: a busca que volta a achar mostra as garagens dele, e não as do herói
  const [peloMomento] = useState(DA_BUSCA.includes(momento))
  const doCaso = estado === LISTA_LONGA || peloMomento
  const mundo = gruposDo(doCaso)
  const comBusca = temBusca(mundo)

  // a escolha do fluxo (00 → 01) e a do mundo do caso (o estado 02, que nasce sem
  // escolha e sem busca, o momento 03 e o 04). A escolha mora aqui, e não no estado único: o palco remonta a
  // tela a cada pulo (a geração), então voltar do estado reabre o 01 com a
  // garagem do contexto do mock (Várzea), e não com a que foi tocada antes
  // (medido na revisão da entrega de 24/09; vai ao diretor, porque guardar a
  // escolha pede gravá-la no estado único já no toque, e hoje quem grava o
  // contexto é o primário, ou mudar o palco)
  const [escolhaFluxo, setEscolhaFluxo] = useState(momento === ESCOLHIDA ? M.contextoAtivo.uoId : null)
  // a escolha no mundo do caso mora aqui e não vai pra URL: o 01 é o quadro do mundo do herói.
  // Aberta pelo 04, a escolha é a garagem do contexto do mock (Várzea), como o 01, e a busca
  // da referência (Olin) a esconde
  const [escolhaDoCaso, setEscolhaDoCaso] = useState(momento === ESCONDE ? M.contextoAtivo.uoId : null)
  const [busca, setBusca] = useState(momento === SEM_RESULTADO ? TERMO_DA_03 : momento === ESCONDE ? TERMO_DA_04 : '')
  const [estadoAberto, setEstadoAberto] = useState(estado)
  if (estado !== estadoAberto) { setEstadoAberto(estado); setEscolhaDoCaso(null); setBusca('') }

  const grupos = comBusca ? filtrar(mundo, busca) : mundo
  // a busca que não acha nada: o vazio declarado no lugar da lista (03). A escolha
  // que a busca esconde — sem resultado, ou achando outras garagens — fica
  // guardada, e volta com a lista; enquanto ela não aparece, o primário espera,
  // como a 03 desenha (decisão do diretor, 25/09, b: a busca que acha e esconde
  // a escolha também espera), e acende de novo quando ela volta a aparecer
  const semResultado = comBusca && grupos.length === 0
  const guardada = doCaso ? escolhaDoCaso : momento === ESCOLHIDA ? (escolhaFluxo ?? M.contextoAtivo.uoId) : null
  const aVista = grupos.some((g) => g.linhas.some((l) => l.uo.id === guardada))
  const escolhida = aVista ? guardada : null
  const uo = escolhida ? mundo.flatMap((g) => g.linhas).find((l) => l.uo.id === escolhida)?.uo ?? null : null
  // a busca que acha outras garagens e esconde a escolhida (o 04)
  const esconde = comBusca && !semResultado && guardada != null && !aVista

  // a URL diz o quadro da busca: o 03 enquanto ela não acha nada, o 04 enquanto
  // ela acha outras e esconde a escolha; a busca que devolve a escolha, ou que
  // volta a achar, tira o momento (no mundo do caso, a escolha não vai pra URL).
  // Num estado da coluna, nada anda
  const quadroDaBusca = semResultado ? SEM_RESULTADO : esconde ? ESCONDE : null
  useEffect(() => {
    if (estado) return
    if (quadroDaBusca && momento !== quadroDaBusca) despachar({ tipo: 'ir', tela: 'T02', momento: quadroDaBusca })
    else if (!quadroDaBusca && DA_BUSCA.includes(momento)) despachar({ tipo: 'ir', tela: 'T02', momento: null })
  }, [estado, quadroDaBusca, momento, despachar])

  function escolher(uoId) {
    if (doCaso) { setEscolhaDoCaso(uoId); return }
    setEscolhaFluxo(uoId)
    if (momento !== ESCOLHIDA) despachar({ tipo: 'ir', tela: 'T02', momento: ESCOLHIDA })
  }

  // num estado da coluna o app está parado (o palco o deixa inerte) e nada se
  // grava. No mundo do caso, qualquer garagem sincroniza: as seis que só o caso
  // tem trazem o pacote dele (a otimização do design), e a T03 baixa esse pacote
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
        {comBusca && <Busca dica="Buscar garagem ou cidade" valor={busca} aoMudar={setBusca} focado={semResultado || esconde} />}
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
