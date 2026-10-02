// T05 · Conectar módulo (02-telas/T05-conectar-modulo): achar o módulo e
// conectar. O que ele informa vem logo depois, no diagnóstico (T07) — a
// pré-checagem saiu daqui com o pacote 1 (decisão 44).
//
// Os quadros do caminho feliz (C6):
// · 00-tela — a busca achou os módulos por perto (M.situacao.porPerto, AC-06)
//   e o do herói, o primeiro, vem escolhido: a semente (G21)
// · 01-momento-nenhum-escolhido — a busca achou e nada foi tocado: é onde
//   a busca de novo termina, e onde o menu abre. Tocar num módulo só o marca
//   (o quadrado lima) e acende `Conectar ao …`; é o botão que conecta (R-14).
//   Todo módulo da lista se escolhe: o M2C-0999, fora do cadastro, com o que
//   ele mesmo informa (a errata do pacote 1, M.naBuscaForaCadastro)
// · 02-momento-um-encontrado — só um por perto: a busca em que só o herói
//   responde. Sem gatilho no mock, abre só pela URL (G20)
// Conectado: a sessão nasce no estado único, com o meio da busca e sem
// nenhuma etapa, e a tela vai pra T07. A faixa não desce aqui: desce na T07,
// quando as sete linhas passam sem trava (o padrão aprovado no gate do pacote 1).
// O M2C-0999 conecta como os outros, e a T07 trava pelo serial fora do cadastro (T07/02).
// A busca de novo (`Procurar de novo`, o Bluetooth que liga): a busca da
// T05/00 corre de novo, e a lista volta (a otimização do design) — o quadro da
// 00 fica na tela RITMOS.buscaMs, com a URL dizendo a 00, e a lista volta sem
// nada escolhido (01). O ritmo é o do arquiteto, 1,2 s (a última entrega,
// animacao.md). O animacao.md diz que a lista some e *Procurando…* fica na
// tela, mas esse texto não está em referência nem no textos.md: fica o quadro
// da 00, que ele aprovou antes, sem texto novo (a pergunta vai ao arquiteto).
// Tocar no quadro da 00 enquanto ele está na tela vale como na 00: o toque
// fica, e a lista não volta por cima dele.
//
// O movimento (C12, animacao.md). Aberta pela URL, pelo palco, num estado ou
// no print, a tela fica parada; o que se move é só o que acontece depois:
// · a troca de quadro (C12·4, C12·41): a lista (01) e o quadro com o escolhido
//   (00, 02, 04) são desenhos diferentes — o conteúdo esmaece em 150 quando um
//   vira o outro (useTrocaDeQuadro, a chave é o quadro)
// · a busca que acha (C12·28): a lista que volta da busca de novo surge em
//   cascata, 150 cada, de 80 em 80 (Lista `surge`, pela marca `achou`)
// · o marcador (C12·20) e o texto do primário que diz o serial marcado, que
//   esmaece no lugar, com o roxo direto (C12·23, como a T02)
// · conectar leva à T07: a troca entre telas (C12·2), do App
// · entre quadros, só a troca esmaece: o rodapé nasce de novo em cada quadro
//
// Os quatro estados (C7), pela receita (receitas.js) e pelo caso do mock:
// · a busca: 03 (busca-vazia, o vazio no lugar da lista) e 04 (conexao-falha,
//   a trava mora no escolhido)
// · o bloco do nenhum encontrado (03) é peça desta tela (pecas.jsx)
// · a falha ao conectar vale uma vez por sessão (G21, casosConsumidos)
//
// O mundo real (logica.md): o que o celular impede antes da busca — o
// Bluetooth desligado (16) e a permissão negada (17), no bloco da busca, com o
// Bluetooth riscado (lei 21). O quadro e o toque do primário são de celular.js: Ligar o
// Bluetooth e Abrir as configurações levam à busca (a 01); Permitir, com a
// resposta negada do caso, vira Abrir as configurações. Os dois abrem só pela
// coluna, parados: o toque se prova no node (scripts/testar-login-e-bluetooth.mjs)
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Rodape, CabecalhoConteudo, BlocoEscolhido, Lista, LinhaModulo, Nota, useTrocaDeQuadro,
} from '../../ds/index.js'
import { VazioDaBusca } from './pecas.jsx'
import { quadroDoCelular, textosDoCelular, depoisDoPedido } from './celular.js'
import { useEstado, estadoVazio } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { RITMOS } from '../../estado/ritmos.js'
import { RECEITAS } from '../../estado/receitas.js'
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'
import {
  porPerto, soOHeroi, HEROI, varianteNaLista, detalheDoEscolhido, firmwareDe, sessaoNova,
  casosDoModulo, buscaVazia, serialDaFalha, pertoComFalha, CASO_BUSCA_VAZIA, CASO_CONEXAO,
} from './dados.js'
import './t05.css'

const M01 = '01-momento-nenhum-escolhido'
const M02 = '02-momento-um-encontrado'

// o quadro da busca: os módulos por perto, o escolhido (ou nenhum) e, se a
// conexão com ele falhou, a trava no escolhido (04)
const busca = (perto, escolhido, trava = false) => ({ fase: 'busca', perto, escolhido, trava })
// a busca que corre de novo: o quadro da busca da 00, até a lista voltar (01)
const correndo = () => ({ ...busca(porPerto(), HEROI), correndo: true })
// o da busca que não achou nada (03)
const vazia = () => ({ fase: 'vazia' })

// o quadro em que a tela abre, pelo momento da URL (sem momento, a 00)
function inicio(momento) {
  if (momento === M01) return busca(porPerto(), null)
  if (momento === M02) return busca(soOHeroi(), HEROI)
  return busca(porPerto(), HEROI)
}

// os estados da coluna, montados pela receita e parados
function quadroDoEstado(est) {
  const r = est ? RECEITAS[`T05/${est}`] : null
  if (!r) return null
  const casos = [...(r.casos ?? []), ...(r.aditivo ? [r.aditivo] : [])]
  const celular = quadroDoCelular(casos)
  if (celular) return celular
  if (casos.includes(CASO_BUSCA_VAZIA)) return vazia()
  if (casos.includes(CASO_CONEXAO)) return busca(pertoComFalha(), serialDaFalha(), true)
  return null
}

export default function T05({ momento, estado: est }) {
  const { estado, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento))
  const vivo = useRef(null)
  vivo.current = { estado }
  const q = quadroDoEstado(est) ?? fluxo
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // a troca de quadro (C12·4 a, C12·41): quando o título ou o rodapé trocam inteiros, o
  // conteúdo esmaece em 150, como entre telas — a lista (01) e o quadro da busca com o
  // escolhido (00, 02, 04) são desenhos diferentes. O que muda dentro do mesmo quadro
  // (marcar, o escolhido que troca, a trava do 04) move só a peça. Aberto pela URL, pelo
  // palco, num estado ou no print, parado. O rodapé nasce de novo em cada quadro (a chave, lá
  // embaixo): entre quadros, só a troca de quadro esmaece, e o texto do primário não esmaece
  // uma segunda vez por dentro dela (C12·23, a nota da T01: dentro do quadro, o texto; entre
  // quadros, a troca)
  const quadro = q.fase === 'busca' ? (q.escolhido ? 'escolhido' : 'lista') : q.fase
  useTrocaDeQuadro(quadro)
  // o caso que acontece agora fica consumido na sessão (G21); num estado da coluna, nada se grava
  const consumir = (...ids) => {
    const e = vivo.current.estado
    const novos = ids.filter((k) => !e.casosConsumidos.includes(k))
    if (est == null && novos.length) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...e.casosConsumidos, ...novos] } })
  }

  // ── os toques (tela.md). Num estado da coluna o celular não toca; se
  // tocasse, cada toque parte do quadro que está na tela (q) e vira fluxo ──
  // na lista (01), tocar num módulo só o marca; o 'Conectar ao …' acende e é
  // ele que conecta (diretor, 24/09: escolher numa lista marca, quem avança é o botão)
  const [marcado, setMarcado] = useState(null)
  function escolher(serial) {
    // no quadro da busca que corre, o toque vale como na 00, e a lista não volta por cima dele
    setFluxo((f) => ({ ...f, escolhido: serial, correndo: false }))
    if (momento) ir('T05') // o escolhido é a 00, a tela: a URL segue
  }
  // a busca de novo (tela.md: a busca da T05/00 corre de novo, e a lista volta):
  // o quadro da 00, com a URL dizendo a 00, e depois de RITMOS.buscaMs a lista sem nada escolhido (01)
  function procurar() {
    setMarcado(null)
    setFluxo(correndo())
    ir('T05')
  }
  useEffect(() => {
    if (est != null || !fluxo.correndo) return undefined
    // a lista que volta leva a marca `achou`: é o *a busca acha*, e ela surge em cascata (C12·28, C12·41)
    const relogio = setTimeout(() => { setFluxo({ ...busca(porPerto(), null), achou: true }); ir('T05', { momento: M01 }) }, RITMOS.buscaMs)
    return () => clearTimeout(relogio)
  }, [fluxo, est]) // eslint-disable-line react-hooks/exhaustive-deps
  // conectado: a sessão nasce no estado único, com o meio em que a busca achou o módulo e
  // nenhuma etapa ainda (o diagnóstico grava a dele), e a tela vai pro diagnóstico (T07),
  // que lê o módulo da sessão — o M2C-0999 trava lá, pelo serial fora do cadastro (T07/02)
  function abrirSessao(serial) {
    despachar({ tipo: 'mesclar', parcial: { sessao: sessaoNova(serial), etapas: estadoVazio().etapas } })
    ir('T07')
  }
  // conectar: a primeira tentativa do módulo do caso não responde (04), uma vez; senão, conecta
  function conectar(serial = q.escolhido) {
    if (casosDoModulo(serial, vivo.current.estado.casosConsumidos).includes(CASO_CONEXAO)) {
      consumir(CASO_CONEXAO)
      setFluxo(busca(q.fase === 'busca' ? q.perto : porPerto(), serial, true))
      return
    }
    abrirSessao(serial)
  }
  // `Tentar de novo` (04): o caso já valeu, e a conexão segue
  function tentarDeNovo() {
    consumir(CASO_CONEXAO)
    abrirSessao(q.escolhido)
  }
  const voltar = () => ir('T04')
  // 16 · 17 · o primário do celular: o Android responde, e a tela vai pra busca
  // (a 01, como o Procurar de novo) ou pro quadro de depois (celular.js)
  function pedirAoAndroid() {
    const depois = depoisDoPedido(q)
    if (depois === 'busca') procurar()
    else setFluxo(depois)
  }

  // O voltar do Android (logica.md): o link de saída do rodapé. Na busca (00,
  // 01, 02, 04), o link é o Procurar de novo, que não sai da tela: não faz nada
  // (pendencias.md). No vazio (03) e sem Bluetooth ou sem a permissão (16, 17),
  // o Voltar ao menu do rodapé
  useVoltar(q.fase === 'vazia' || q.fase === 'celular' ? voltar : null)

  let miolo, rodape
  if (q.fase === 'celular') {
    // ── 16 · 17 · o celular impede a busca: o bloco da busca, com o Bluetooth riscado (lei 21) ──
    const t = textosDoCelular(q)
    miolo = (
      <>
        <CabecalhoConteudo titulo={TX.titulo} unidade={t.unidade} />
        <VazioDaBusca icone="bluetooth-desligado" titulo={t.titulo} frase={t.frase} />
      </>
    )
    rodape = <Rodape primario={t.primario} aoPrimario={pedirAoAndroid} link={TX.voltarAoMenu} aoLink={voltar} />
  } else if (q.fase === 'vazia') {
    // ── 03 · nenhum módulo respondeu: o vazio no lugar da lista ──
    const bv = buscaVazia()
    const legenda = TX.buscaDurou(bv.duracaoSeg, bv.tentativa)
    miolo = (
      <>
        <CabecalhoConteudo titulo={TX.titulo} unidade={TX.nenhumEncontrado} />
        <VazioDaBusca titulo={TX.nenhumRespondeu} frase={TX.aproxime} />
        {legenda && <span className="t05-legenda">{legenda}</span>}
      </>
    )
    rodape = <Rodape primario={TX.procurarDeNovo} aoPrimario={procurar} link={TX.voltarAoMenu} aoLink={voltar} />
  } else {
    const { perto, escolhido, trava } = q
    const outros = perto.filter((p) => p.serial !== escolhido)
    const cabeca = <CabecalhoConteudo titulo={TX.titulo} contagem={perto.length} unidade={TX.encontrados(perto.length)} />
    if (escolhido) {
      // 00 · 02 · 04 · os outros por perto, todos tocáveis: o M2C-0999, fora do cadastro, é uma
      // linha como as outras, com o que ele informa na busca, e a última também com a divisória
      // (o complemento do pacote 2 refez a 00 e a 04)
      miolo = (
        <>
          {cabeca}
          {trava
            ? <BlocoEscolhido falha rotulo={TX.naoRespondeu} identidade={escolhido} detalhe={detalheDoEscolhido(escolhido)} passos={TX.conferir} />
            : <BlocoEscolhido rotulo={TX.escolhido} identidade={escolhido} detalhe={detalheDoEscolhido(escolhido)} />}
          {outros.length > 0 ? (
            <>
              {TX.outrosPorPerto[outros.length] && <span className="t05-rotulo-bloco">{TX.outrosPorPerto[outros.length]}</span>}
              <Lista className="t05-lista">
                {outros.map((p) => (
                  <LinhaModulo key={p.serial} serial={p.serial} variante={varianteNaLista(p.serial)} aoTocar={() => escolher(p.serial)} divisoria />))}
              </Lista>
            </>
          ) : (
            <Nota titulo={TX.nenhumOutro} frase={TX.seNaoForEste} />
          )}
        </>
      )
      rodape = trava
        ? <Rodape primario={TX.tentarDeNovo} aoPrimario={tentarDeNovo} link={TX.procurarDeNovo} aoLink={procurar} />
        : <Rodape primario={TX.conectarAo(escolhido)} aoPrimario={() => conectar()} primarioTrocaTexto link={TX.procurarDeNovo} aoLink={procurar} />
    } else {
      // 01 · a lista de escolha: as cinco linhas iguais, com a divisória embaixo de cada uma,
      // a última também (a referência da errata: 72 e o traço, sem a folga de 76 do fim)
      miolo = (
        <>
          {cabeca}
          <span id="t05-escolha" className="t05-frase">{TX.escolhaNaMao}</span>
          <Lista className="t05-lista" surge={!!q.achou} role="radiogroup" aria-labelledby="t05-escolha">
            {perto.map((p) => (
              <LinhaModulo key={p.serial} escolha serial={p.serial} variante={varianteNaLista(p.serial)}
                rotuloValor={TX.rotuloFirmware} valor={firmwareDe(p.serial)} marcado={p.serial === marcado} aoTocar={() => setMarcado(p.serial)} />
            ))}
          </Lista>
        </>
      )
      rodape = marcado
        ? <Rodape primario={TX.conectarAo(marcado)} aoPrimario={() => conectar(marcado)} primarioTrocaTexto link={TX.procurarDeNovo} aoLink={procurar} />
        : <Rodape legenda={TX.escolhaUm} primario={TX.conectar} primarioDesabilitado primarioTrocaTexto link={TX.procurarDeNovo} aoLink={procurar} />
    }
  }

  return (
    <div className="t05">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="pagina" />
      <div className={`tela-miolo t05-miolo-busca ${q.fase === 'celular' ? 't05-miolo-celular' : ''}`}>{miolo}</div>
      <Fragment key={quadro}>{rodape}</Fragment>
    </div>
  )
}
