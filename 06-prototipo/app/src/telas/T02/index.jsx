// T02 · Selecionar contexto (02-telas/T02-selecionar-contexto): o técnico diz
// em que unidade está hoje (a palavra é unidade, a lei 18 · decisão 37). As
// unidades vêm do mock (garagens.js), agrupadas por UC na ordem do mundo; cada
// linha diz a idade do pacote, derivada do dado (formato.js), e os ativos que
// ele traz (T02·5). Tocar numa unidade a escolhe (tocar de novo não desmarca,
// T02·4) — o Pátio Caruaru, vencido, também (T02·1 a). O primário grava o
// contexto no estado único e vai pra T03.
//
// Os quadros: 00-tela (nada escolhido) · 01-momento-escolhida (tocar numa
// unidade; aberto pela URL, é a unidade do contexto do mock, Várzea) ·
// 02-estado-lista-longa-com-busca (o mundo do caso lista-longa-garagens: 9
// unidades, mais que o limite sem busca, e a busca aparece; ela filtra por
// nome ou cidade) · 03-momento-busca-sem-resultado (a entrega de 25/09: o
// mesmo mundo, com a busca que não acha nada — o vazio declarado diz o termo
// digitado e sugere buscar pela cidade) · 04-momento-busca-esconde-a-escolha
// (a otimização do design: o mesmo mundo, com a Várzea escolhida e a busca que
// acha outra unidade e a esconde — o primário espera). A busca não é condição
// do quadro: aparece em qualquer mundo com mais de 6 unidades, e o do herói, com
// 3, não a tem. A lista rola por baixo do rodapé, que fica parado (G16, o miolo
// que rola). Toda unidade do mundo do caso tem pacote (src/dados/garagens.js):
// o Sincronizar de qualquer uma leva à T03, que baixa o pacote dela.
//
// A empresa antes da unidade (a otimização do design, empresas.js): com mais de
// uma empresa — o mundo do caso varias-empresas, a receita dos estados —, o
// 05-estado-escolher-a-empresa (Pra qual empresa hoje?, as empresas com a
// contagem das unidades, o primário apagado até escolher, e Ver as unidades) e
// o 06-estado-unidades-com-trocar-empresa (as unidades da empresa, com a
// empresa em cima e o Trocar de empresa no rodapé). Os dois abrem pela coluna e
// pelo endereço, parados e sem toque. O 07-momento-empresa-escolhida (a última
// entrega) é o app vivo no mundo do caso: aberto pelo endereço, a Viação marcada,
// e dali o técnico anda — Ver as unidades → as unidades (o quadro do 06) → a
// escolhida (01) → Sincronizar → T03, e o Trocar de empresa volta ao 07 com a
// atual marcada. O mundo vai junto no estado único (contexto.empresas) até o menu,
// e a T02 aberta no fluxo com ele no contexto abre nele (empresas.js). Com uma
// empresa só, o herói, nada muda: 00 → 01.
//
// Outro usuário no aparelho (a T01/18, a última entrega): o Entrar com outro
// usuário depois de uma sessão neste aparelho abre esta tela com o diálogo *Outra
// sessão neste aparelho* por cima (situacao.outraSessao), que nasce aberto, com a
// tela, e fecha no Entendi. Pela coluna, a T01 monta esta tela com o caso.
import { useEffect, useRef, useState } from 'react'
import { BarraDoSistema, Busca, Lista, LinhaEscolha, Rodape, Vazio, Veu, Dialogo, Frase } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { filtrar, gruposDo, temBusca, LISTA_LONGA, SEM_RESULTADO, ESCONDE } from './garagens.js'
import {
  doCasoEmpresas, vivoNasEmpresas, inicioDoCaso, momentoDoCaso, unidadesDa, rotuloDasEmpresas, linhasDasEmpresas,
  primarioDasEmpresas, escolherEmpresa, verAsUnidades, rotuloDaEmpresa, escolherUnidade, trocarDeEmpresa,
  contextoDoCaso, voltarNoCaso,
} from './empresas.js'
// a presença do diálogo (entra fechado e abre; sai fechando antes de desmontar) é a da T01
import { usePresenca } from '../T01/presenca.js'
import { TX } from './textos.js'
import './T02.css'

const ESCOLHIDA = '01-momento-escolhida'
// os termos que as referências 03 e 04 desenham digitados (textos.md): o endereço do momento abre com eles
const TERMO_DA_03 = 'Recreio'
const TERMO_DA_04 = 'Olin'
// os dois quadros da busca, que abrem pelo endereço no mundo do caso, e a URL que diz cada um
const DA_BUSCA = [SEM_RESULTADO, ESCONDE]

export default function T02({ momento, estado, outraSessao }) {
  const { estado: app, despachar } = useEstado()
  // o mundo do caso lista-longa-garagens: o estado 02, pela coluna, e os momentos
  // 03 e 04, pelo endereço. Aberta pelo 03 ou pelo 04, a tela fica no mundo do caso
  // enquanto está montada: a busca que volta a achar mostra as unidades dele, e não as do herói
  const [peloMomento] = useState(DA_BUSCA.includes(momento))
  const doCaso = estado === LISTA_LONGA || peloMomento
  // o mundo de quem tem mais de uma empresa (o caso varias-empresas): parado nos estados
  // 05 e 06; vivo no momento 07, ou no fluxo com o mundo no contexto. O passo (as
  // empresas ou as unidades), a empresa e a unidade escolhidas (empresas.js). Aberta
  // viva, a tela fica no mundo enquanto está montada
  const [vivo] = useState(() => vivoNasEmpresas(estado, momento, app.contexto))
  const comEmpresas = doCasoEmpresas(estado) || vivo
  const [caso, setCaso] = useState(() => inicioDoCaso(estado, momento, app.contexto))
  const naEmpresa = comEmpresas && caso.passo === 'empresas'
  const mundo = comEmpresas ? unidadesDa(caso.empresaId) ?? [] : gruposDo(doCaso)
  const comBusca = temBusca(mundo)

  // a escolha do fluxo (00 → 01) e a do mundo do caso (o estado 02, que nasce sem
  // escolha e sem busca, o momento 03 e o 04). A escolha mora aqui, e não no estado único: o palco remonta a
  // tela a cada pulo (a geração), então voltar do estado reabre o 01 com a
  // unidade do contexto do mock (Várzea), e não com a que foi tocada antes
  // (medido na revisão da entrega de 24/09; vai ao diretor, porque guardar a
  // escolha pede gravá-la no estado único já no toque, e hoje quem grava o
  // contexto é o primário, ou mudar o palco)
  const [escolhaFluxo, setEscolhaFluxo] = useState(momento === ESCOLHIDA ? M.contextoAtivo.uoId : null)
  // a escolha no mundo do caso mora aqui e não vai pra URL: o 01 é o quadro do mundo do herói.
  // Aberta pelo 04, a escolha é a unidade do contexto do mock (Várzea), como o 01, e a busca
  // da referência (Olin) a esconde
  const [escolhaDoCaso, setEscolhaDoCaso] = useState(momento === ESCONDE ? M.contextoAtivo.uoId : null)
  const [busca, setBusca] = useState(momento === SEM_RESULTADO ? TERMO_DA_03 : momento === ESCONDE ? TERMO_DA_04 : '')
  const [estadoAberto, setEstadoAberto] = useState(estado)
  if (estado !== estadoAberto) { setEstadoAberto(estado); setEscolhaDoCaso(null); setBusca(''); setCaso(inicioDoCaso(estado, momento, app.contexto)) }

  const grupos = comBusca ? filtrar(mundo, busca) : mundo
  // a busca que não acha nada: o vazio declarado no lugar da lista (03). A escolha
  // que a busca esconde — sem resultado, ou achando outras unidades — fica
  // guardada, e volta com a lista; enquanto ela não aparece, o primário espera,
  // como a 03 desenha (decisão do diretor, 25/09, b: a busca que acha e esconde
  // a escolha também espera), e acende de novo quando ela volta a aparecer
  const semResultado = comBusca && grupos.length === 0
  const guardada = comEmpresas ? caso.uoId : doCaso ? escolhaDoCaso : momento === ESCOLHIDA ? (escolhaFluxo ?? M.contextoAtivo.uoId) : null
  const aVista = grupos.some((g) => g.linhas.some((l) => l.uo.id === guardada))
  const escolhida = aVista ? guardada : null
  const uo = escolhida ? mundo.flatMap((g) => g.linhas).find((l) => l.uo.id === escolhida)?.uo ?? null : null
  // a busca que acha outras unidades e esconde a escolhida (o 04)
  const esconde = comBusca && !semResultado && guardada != null && !aVista

  // a URL diz o quadro da busca: o 03 enquanto ela não acha nada, o 04 enquanto
  // ela acha outras e esconde a escolha; a busca que devolve a escolha, ou que
  // volta a achar, tira o momento (no mundo do caso, a escolha não vai pra URL).
  // Num estado da coluna, nada anda
  const quadroDaBusca = semResultado ? SEM_RESULTADO : esconde ? ESCONDE : null
  useEffect(() => {
    if (estado || vivo) return
    if (quadroDaBusca && momento !== quadroDaBusca) despachar({ tipo: 'ir', tela: 'T02', momento: quadroDaBusca })
    else if (!quadroDaBusca && DA_BUSCA.includes(momento)) despachar({ tipo: 'ir', tela: 'T02', momento: null })
  }, [estado, vivo, quadroDaBusca, momento, despachar])
  // no mundo vivo das empresas, a URL segue o quadro (empresas.js · momentoDoCaso):
  // o 07 nas empresas, nada nas unidades sem escolha, o 01 com a unidade escolhida
  const doMundo = vivo ? momentoDoCaso(caso) : null
  useEffect(() => {
    if (!vivo) return
    if ((momento ?? null) !== doMundo) despachar({ tipo: 'ir', tela: 'T02', momento: doMundo ?? undefined })
  }, [vivo, doMundo, momento, despachar])

  function escolher(uoId) {
    if (comEmpresas) { setCaso((q) => escolherUnidade(q, uoId)); return }
    if (doCaso) { setEscolhaDoCaso(uoId); return }
    setEscolhaFluxo(uoId)
    if (momento !== ESCOLHIDA) despachar({ tipo: 'ir', tela: 'T02', momento: ESCOLHIDA })
  }

  // num estado da coluna o app está parado (o palco o deixa inerte) e nada se
  // grava. No mundo do caso, qualquer unidade sincroniza: as seis que só o caso
  // tem trazem o pacote dele (a otimização do design), e a T03 baixa esse pacote
  // No mundo das empresas, o mundo vai junto, com a empresa da unidade (contexto.empresas)
  function sincronizar() {
    if (estado) return
    const contexto = comEmpresas ? contextoDoCaso(caso, app.contexto, uo.id) : { ...app.contexto, uoId: uo.id, pacote: null }
    despachar({ tipo: 'mesclar', parcial: { contexto } })
    despachar({ tipo: 'ir', tela: 'T03' })
  }

  // O diálogo de outro usuário no aparelho (a T01/18): o que o Entrar gravou na
  // situação do celular, ou, pela coluna, o que o caso diz. Nasce aberto, com a
  // tela (nenhuma tela anima a entrada), e o Entendi fecha: o véu e a caixa
  // esmaecem em 150 (movimento.md) e a tela fica, sem nada escolhido
  const outra = outraSessao ?? (estado ? null : app.situacao.outraSessao ?? null)
  const ultimaOutra = useRef(outra)
  if (outra) ultimaOutra.current = outra
  const aviso = usePresenca(Boolean(outra))
  const entendi = () => despachar({ tipo: 'mesclar', parcial: { situacao: { ...app.situacao, outraSessao: null } } })
  const dialogo = aviso.montado && (
    <div className="t02-sobre">
      <Veu de="dialogo" visivel={aviso.visivel}>
        <Dialogo titulo={TX.outraSessao} primario={TX.entendi} aoPrimario={entendi} margem={24} aberto={aviso.visivel}>
          <Frase>{TX.sessaoEncerrada(ultimaOutra.current.usuario, ultimaOutra.current.itensNaFila)}</Frase>
        </Dialogo>
      </Veu>
    </div>
  )
  // o que fica atrás do véu é inerte (G25): nem o toque nem o leitor chegam nele
  const atras = aviso.montado ? '' : undefined

  // O voltar do Android (logica.md): a escolha da unidade não tem saída
  // desenhada — o primário é o ato, não a saída —, e ele não faz nada
  // (pendencias.md). Nas unidades de quem tem mais de uma empresa (06), faz o
  // Trocar de empresa, o link de saída do rodapé; nas empresas (05, 07), nada.
  // Com o diálogo de outro usuário, o Entendi, que só fecha e é a única saída,
  // como o aviso do acesso (T04/12)
  const voltar = comEmpresas ? voltarNoCaso(caso) : null
  useVoltar(aviso.montado ? (outra ? entendi : null) : voltar ? () => setCaso(voltar) : null)

  if (naEmpresa) {
    const primario = primarioDasEmpresas(caso)
    const linhas = linhasDasEmpresas(caso)
    return (
      <div className="t02">
        <BarraDoSistema hora={M.HORA_NOMINAL} fundo="pagina" />
        <div className="tela-miolo t02-miolo">
          <div className="t02-cabeca">
            <span className="t02-empresa">{rotuloDasEmpresas()}</span>
            <h1 id="t02-titulo" className="t02-titulo">{TX.tituloEmpresas}</h1>
          </div>
          <div className="t02-grupo">
            <Lista role="radiogroup" aria-labelledby="t02-titulo">
              {linhas.map((l, i) => (
                <LinhaEscolha
                  key={l.id}
                  nome={l.nome} detalhe={l.detalhe}
                  estado={l.escolhida ? 'escolhida' : 'disponivel'}
                  divisoria={i < linhas.length - 1}
                  aoTocar={() => setCaso((q) => escolherEmpresa(q, l.id))}
                />
              ))}
            </Lista>
          </div>
        </div>
        <Rodape primario={primario.texto} primarioDesabilitado={primario.desabilitado} aoPrimario={() => setCaso(verAsUnidades)} />
      </div>
    )
  }

  return (
    <div className="t02">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="pagina" />
      <div className="t02-fundo" inert={atras}>
      <div className="tela-miolo t02-miolo">
        <div className="t02-cabeca">
          <span className="t02-empresa">{caixaAlta(comEmpresas ? rotuloDaEmpresa(caso) : M.empresa.nome)}</span>
          <h1 className="t02-titulo">{TX.titulo}</h1>
        </div>
        {comBusca && <Busca dica={TX.buscar} valor={busca} aoMudar={setBusca} focado={semResultado || esconde} />}
        {semResultado && <Vazio titulo={TX.nadaCom(busca.trim())} frase={TX.confiraNome} />}
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
        primario={uo ? TX.sincronizar(uo.nome) : TX.escolhaUnidade}
        primarioDesabilitado={!uo}
        aoPrimario={sincronizar}
        link={comEmpresas ? TX.trocarEmpresa : undefined}
        aoLink={comEmpresas ? () => setCaso(trocarDeEmpresa) : undefined}
      />
      </div>
      {dialogo}
    </div>
  )
}
