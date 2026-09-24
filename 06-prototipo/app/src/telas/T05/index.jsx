// T05 · Conectar módulo (02-telas/T05-conectar-modulo): achar o módulo,
// conectar e conferir, antes de qualquer gravação, se ele pode ser instalado.
//
// Os quadros do caminho feliz (C6):
// · 00-tela — a busca achou os módulos por perto (M.situacao.porPerto, AC-06)
//   e o do herói, o primeiro, vem escolhido: a semente (G21)
// · 01-momento-nenhum-escolhido — a busca achou e nada foi tocado: é onde
//   `Procurar de novo` leva, e onde o menu abre. Tocar num módulo só o marca
//   (o quadrado lima) e acende `Conectar ao …`; é o botão que conecta (R-14)
// · 02-momento-um-encontrado — só um por perto: a busca em que só o herói
//   responde. Sem gatilho no mock, abre só pela URL (G20)
// · 05-momento-pre-checagem — conectado: as onze linhas acendem uma a uma, no
//   ritmo de RITMOS.preChecagemLinhaMs (G27: só quando o toque conecta; pela
//   URL, a tela abre no fim, sem contar de zero). Aprovada, a sessão nasce no
//   estado único, com o meio da busca, e a faixa aparece (C6·2; o movimento
//   dela descendo é do C12)
// · 10-momento-atualizando-o-firmware — `Atualizar firmware`: a linha do
//   firmware corre com a porcentagem do caso (AC-19), as seguintes esperam.
//   O ritmo da atualização não está em movimento.md (G4): o quadro fica parado
// No print (EM_QUADRO), cada quadro para no que a referência desenha.
// A busca acha na hora: o ritmo dela também não está declarado (G4), e o
// quadro da busca correndo não tem referência nem texto (G25).
//
// Os onze estados (C7), pela receita (receitas.js) e pelo caso do mock:
// · a busca: 03 (busca-vazia, o vazio no lugar da lista) e 04 (conexao-falha,
//   a trava mora no escolhido)
// · a pré-checagem: 06, 07, 08 e 11 saem da regra do cadastro; 09, 12 e 13, do
//   que o caso muda na linha dele; 14 e 15 param na checagem do caso (C7·2).
//   A falha mora na linha que falhou (Lei 3); onde a referência remonta (o
//   aviso em cima, a tira que some, a faixa), ela é construída fiel (G24)
// · as portas naturais (G28, R-11): marcar na lista um módulo que é caso do
//   mock (M2C-0362 → 13, M2C-0394 → 11, M2C-0335 → 15) e tocar em
//   `Conectar ao …` abre o estado dele no fluxo — o toque na linha só marca
//   (R-14). O M2C-0999 não se toca, como a referência desenha
// · o bloco do nenhum encontrado (03) é peça desta tela (pecas.jsx)
// · cada caso que acontece uma vez vale uma vez por sessão (G21, casosConsumidos)
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, Rodape, CabecalhoConteudo, BlocoEscolhido, Lista, LinhaModulo,
  LinhaChecagem, TiraLeituras, Nota, Aviso, ESTADOS,
} from '../../ds/index.js'
import { VazioDaBusca } from './pecas.jsx'
import { useEstado } from '../../estado/estado.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { RECEITAS } from '../../estado/receitas.js'
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'
import {
  porPerto, soOHeroi, HEROI, cadastrado, varianteNaLista, detalheDoEscolhido, firmwareDe,
  contextoDe, rotuloDeTopo, resultados, faltas, TOTAL, LINHA_FIRMWARE, sessaoNova, casoFirmware, CASO_FIRMWARE,
  casosDoModulo, serialDoCaso, paradaDe, leiturasDa, buscaVazia, serialDaFalha, pertoComFalha,
  CASO_BUSCA_VAZIA, CASO_CONEXAO, CASO_SEM_REDE, CASO_CANAL,
} from './dados.js'
import './t05.css'

const M01 = '01-momento-nenhum-escolhido'
const M02 = '02-momento-um-encontrado'
const M05 = '05-momento-pre-checagem'
const M10 = '10-momento-atualizando-o-firmware'
const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)

// o quadro da busca: os módulos por perto, o escolhido (ou nenhum) e, se a
// conexão com ele falhou, a trava no escolhido (04)
const busca = (perto, escolhido, trava = false) => ({ fase: 'busca', perto, escolhido, trava })
// o da busca que não achou nada (03)
const vazia = () => ({ fase: 'vazia' })
// o da pré-checagem: o módulo, quantas linhas já terminaram, a porcentagem
// gravada se o firmware atualiza, e os casos do mock que valem nesta conexão
const pre = (serial, feitas, casos = [], atualizando = null) => ({ fase: 'pre', serial, feitas, casos, atualizando })

// o quadro em que a tela abre, pelo momento da URL (sem momento, a 00)
function inicio(momento) {
  if (momento === M01) return busca(porPerto(), null)
  if (momento === M02) return busca(soOHeroi(), HEROI)
  if (momento === M05) return pre(HEROI, TOTAL)
  if (momento === M10) { const c = casoFirmware(); return pre(c.moduloSerial, LINHA_FIRMWARE, [CASO_FIRMWARE], c.atualizacao.quadroPct) }
  return busca(porPerto(), HEROI)
}

// os estados da coluna, montados pela receita e parados: o quadro que o caso
// dá quando termina — ou onde para, no link que cai e no módulo que dorme
function quadroDoEstado(est) {
  const r = est ? RECEITAS[`T05/${est}`] : null
  if (!r) return null
  const casos = [...(r.casos ?? []), ...(r.aditivo ? [r.aditivo] : [])]
  if (casos.includes(CASO_BUSCA_VAZIA)) return vazia()
  if (casos.includes(CASO_CONEXAO)) return busca(pertoComFalha(), serialDaFalha(), true)
  const parada = paradaDe(casos)
  return pre(serialDoCaso(casos[0]), parada ? parada.indice : TOTAL, casos)
}

export default function T05({ momento, estado: est }) {
  const { estado, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento))
  const vivo = useRef(null)
  vivo.current = { estado }
  const q = quadroDoEstado(est) ?? fluxo
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // o caso que acontece agora fica consumido na sessão (G21); num estado da coluna, nada se grava
  const consumir = (...ids) => {
    const e = vivo.current.estado
    const novos = ids.filter((k) => !e.casosConsumidos.includes(k))
    if (est == null && novos.length) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...e.casosConsumidos, ...novos] } })
  }

  // ── a pré-checagem: o que cada linha diz, e onde ela está ──
  const c = q.fase === 'pre' ? contextoDe(q.serial) : null
  const casos = q.fase === 'pre' ? q.casos : []
  const res = c ? resultados(c, casos) : []
  const parada = q.fase === 'pre' ? paradaDe(casos) : null
  const limite = parada ? parada.indice : TOTAL
  const parou = !!parada && q.feitas >= parada.indice
  const corre = q.fase === 'pre' && q.atualizando == null && q.feitas < limite
  const concluida = q.fase === 'pre' && q.atualizando == null && q.feitas >= TOTAL
  const aprovadas = res.slice(0, q.feitas).filter((r) => r.estado === 'aprovada').length
  const aprovada = concluida && res.every((r) => r.estado !== 'reprovada')

  // uma linha por tick, no ritmo da pré-checagem; para no print, num estado,
  // fora da corrida e na checagem em que o caso para
  useEffect(() => {
    if (EM_QUADRO || est != null || !corre) return undefined
    const relogio = setInterval(() => setFluxo((f) => (f.fase === 'pre' && f.atualizando == null && f.feitas < limite ? { ...f, feitas: f.feitas + 1 } : f)), RITMOS.preChecagemLinhaMs)
    return () => clearInterval(relogio)
  }, [corre, est, limite])

  // parou no caso: o link caiu ou o módulo dormiu, uma vez nesta sessão
  useEffect(() => {
    if (est != null || !parou) return
    consumir(parada.caso)
  }, [parou, est]) // eslint-disable-line react-hooks/exhaustive-deps

  // aprovada: a sessão nasce no estado único (C6·2), com o meio em que a busca
  // achou o módulo; o canal antigo, se havia, o app fechou (13)
  useEffect(() => {
    if (est != null || !aprovada) return
    const e = vivo.current.estado
    if (e.sessao?.moduloSerial === q.serial) return
    const fechou = casos.includes(CASO_CANAL) && !e.casosConsumidos.includes(CASO_CANAL) ? [CASO_CANAL] : []
    despachar({ tipo: 'mesclar', parcial: {
      sessao: sessaoNova(q.serial),
      etapas: { ...e.etapas, preChecagem: { checagens: TOTAL, passaram: aprovadas } },
      ...(fechou.length ? { casosConsumidos: [...e.casosConsumidos, ...fechou] } : {}),
    } })
  }, [aprovada, q.serial, est]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── os toques (tela.md). Num estado da coluna o celular não toca; se
  // tocasse, cada toque parte do quadro que está na tela (q) e vira fluxo ──
  // na lista (01), tocar num módulo só o marca; o 'Conectar ao …' acende e é
  // ele que conecta (diretor, 24/09: escolher numa lista marca, quem avança é o botão)
  const [marcado, setMarcado] = useState(null)
  function escolher(serial) {
    setFluxo((f) => ({ ...f, escolhido: serial }))
    if (momento) ir('T05') // o escolhido é a 00, a tela: a URL segue
  }
  function procurar() {
    setMarcado(null)
    setFluxo(busca(porPerto(), null))
    ir('T05', { momento: M01 })
  }
  // conectar: a primeira tentativa do módulo do caso não responde (04), uma
  // vez; senão, a pré-checagem corre com os casos que valem pra ele agora
  function conectar(serial = q.escolhido) {
    const agora = casosDoModulo(serial, vivo.current.estado.casosConsumidos)
    if (agora.includes(CASO_CONEXAO)) {
      consumir(CASO_CONEXAO)
      setFluxo(busca(q.fase === 'busca' ? q.perto : porPerto(), serial, true))
      return
    }
    setFluxo(pre(serial, 0, agora))
    ir('T05', { momento: M05 })
  }
  // `Tentar de novo` (04): o caso já valeu, e a conexão segue
  function tentarDeNovo() {
    consumir(CASO_CONEXAO)
    setFluxo(pre(q.escolhido, 0, casosDoModulo(q.escolhido, [...vivo.current.estado.casosConsumidos, CASO_CONEXAO])))
    ir('T05', { momento: M05 })
  }
  // `Reconectar` (14) e `Acordar módulo` (15): segue da checagem em que parou,
  // com as de antes preservadas (HU-T05-9); o caso já valeu
  function seguir() {
    consumir(parada.caso)
    setFluxo(pre(q.serial, parada.indice, casos.filter((k) => k !== parada.caso)))
    ir('T05', { momento: M05 })
  }
  // `Gravar a conexão` (09): com a conexão gravada, o módulo tem rede, e a
  // saída é a da 08, atualizar o firmware (HU-T05-5). O quadro de gravando não
  // tem referência (G25): a troca é direta
  function gravarConexao() {
    consumir(CASO_SEM_REDE)
    setFluxo(pre(q.serial, q.feitas, casos.filter((k) => k !== CASO_SEM_REDE)))
    ir('T05', { momento: M05 })
  }
  // o módulo é o do quadro que está na tela (q), com os casos dele
  function atualizarFirmware() {
    setFluxo(pre(q.serial, LINHA_FIRMWARE, casos.filter((k) => k !== CASO_SEM_REDE), casoFirmware().atualizacao.quadroPct))
    ir('T05', { momento: M10 })
  }
  const voltar = () => ir('T04')

  // ── o topo: a barra na cor do que vem embaixo, e a faixa quando a sessão nasce ──
  const comFaixa = aprovada
  const faixa = comFaixa && (
    <Faixa serial={q.serial} placa={TX.semAtivo} semAtivo acao={TX.encerrar}
      aoEncerrar={() => ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR })} />
  )

  let miolo, rodape
  if (q.fase === 'vazia') {
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
  } else if (q.fase === 'busca') {
    const { perto, escolhido, trava } = q
    const outros = perto.filter((p) => p.serial !== escolhido)
    const cabeca = <CabecalhoConteudo titulo={TX.titulo} contagem={perto.length} unidade={TX.encontrados(perto.length)} />
    if (escolhido) {
      const ultimo = outros.length - 1
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
                {outros.map((p, i) => (cadastrado(p.serial)
                  ? <LinhaModulo key={p.serial} serial={p.serial} variante={varianteNaLista(p.serial)} aoTocar={() => escolher(p.serial)}
                      divisoria={i < ultimo} fim={i === ultimo} />
                  : <LinhaModulo key={p.serial} apagada serial={p.serial} variante={TX.naoCadastrado} divisoria={i < ultimo} fim={i === ultimo} />))}
              </Lista>
            </>
          ) : (
            <Nota titulo={TX.nenhumOutro} frase={TX.seNaoForEste} />
          )}
        </>
      )
      rodape = trava
        ? <Rodape primario={TX.tentarDeNovo} aoPrimario={tentarDeNovo} link={TX.procurarDeNovo} aoLink={procurar} />
        : <Rodape primario={TX.conectarAo(escolhido)} aoPrimario={() => conectar()} link={TX.procurarDeNovo} aoLink={procurar} />
    } else {
      const ultimo = perto.length - 1
      miolo = (
        <>
          {cabeca}
          <span id="t05-escolha" className="t05-frase">{TX.escolhaNaMao}</span>
          <Lista className="t05-lista" role="radiogroup" aria-labelledby="t05-escolha">
            {perto.map((p, i) => (cadastrado(p.serial)
              ? <LinhaModulo key={p.serial} escolha serial={p.serial} variante={varianteNaLista(p.serial)}
                  rotuloValor={TX.rotuloFirmware} valor={firmwareDe(p.serial)} marcado={p.serial === marcado} aoTocar={() => setMarcado(p.serial)}
                  divisoria={i < ultimo} fim={i === ultimo} />
              : <LinhaModulo key={p.serial} escolha apagada serial={p.serial} variante={TX.foraDestaEmpresa} divisoria={i < ultimo} fim={i === ultimo} />))}
          </Lista>
        </>
      )
      rodape = marcado
        ? <Rodape primario={TX.conectarAo(marcado)} aoPrimario={() => conectar(marcado)} link={TX.procurarDeNovo} aoLink={procurar} />
        : <Rodape legenda={TX.escolhaUm} primario={TX.conectar} primarioDesabilitado link={TX.procurarDeNovo} aoLink={procurar} />
    }
  } else {
    // as linhas: as que terminaram dizem o resultado; a que corre mostra o
    // quadrado de agora; a que parou diz o que houve; as outras esperam (na
    // atualização, com o relógio da 10)
    const linhas = res.map((r, i) => {
      if (q.atualizando != null && i === LINHA_FIRMWARE) return { ...r, estado: 'agora', valor: TX.atualizandoPct(q.atualizando), causa: undefined, nota: undefined }
      if (parou && i === parada.indice) return { ...r, ...parada.linha, causa: undefined, nota: undefined }
      if (i < q.feitas) return r
      if (i === q.feitas && corre) return { ...r, estado: 'agora', valor: undefined, causa: undefined, nota: undefined }
      return { ...r, estado: 'ainda-nao', valor: TX.aindaNao, causa: undefined, nota: undefined, glifo: q.atualizando != null ? 'relogio' : undefined }
    })
    // a última linha leva a folga do pé do cartão: 43 na aprovada, 45 na que
    // terminou numa falha ou parou no caso; correndo, a de 38
    const fim = aprovada ? 'pre-checagem' : concluida || parou ? 'pre-checagem-parada' : false
    const fora = !c.modulo
    miolo = (
      <>
        <div className="t05-cabeca">
          {!comFaixa && <span className={`t05-rotulo-topo ${fora ? 't05-rotulo-topo-fora' : ''}`}>{rotuloDeTopo(c)}</span>}
          <CabecalhoConteudo titulo={TX.preChecagem} contagem={aprovadas} unidade={TX.de(TOTAL)} tom={aprovada ? 'veredito' : 'neutro'} />
        </div>
        {parou && parada.tipo === 'link' && (
          <Aviso tom="falha" glifo="sem-sinal" poco={24} titulo={TX.semRespostaDoModulo} frase={TX.reconecteDa[parada.n]} />
        )}
        {parou && parada.tipo === 'repouso' && (
          <Aviso tom="neutro" glifo="lua" poco={24} titulo={TX.moduloEmRepouso} frase={TX.acordeDa[parada.n]} />
        )}
        <Lista className="t05-lista">
          {linhas.map((l, i) => (
            <LinhaChecagem key={l.id} estado={l.estado} tom={l.tom} titulo={l.titulo} valor={l.valor} causa={l.causa} nota={l.nota}
              glifo={l.glifo} nomeGlifo={l.estado === 'ainda-nao' ? ESTADOS.espera.nome : undefined}
              divisoria={i < TOTAL - 1} folgaFim={i === TOTAL - 1 ? fim : false} />
          ))}
        </Lista>
        {!parou && <TiraLeituras itens={leiturasDa(casos)} />}
      </>
    )
    const f = faltas(c)
    if (q.atualizando != null) rodape = <Rodape primario={TX.atualizando} primarioDesabilitado explicacao={TX.recomeca} pe="botao" />
    else if (parou) {
      rodape = <Rodape primario={parada.tipo === 'link' ? TX.reconectar : TX.acordarModulo} aoPrimario={seguir} link={TX.procurarOutro} aoLink={procurar} />
    } else if (!concluida) rodape = <Rodape primario={TX.selecionarAtivo} primarioDesabilitado link={TX.voltarAoMenu} aoLink={voltar} />
    else if (aprovada) rodape = <Rodape primario={TX.selecionarAtivo} aoPrimario={() => ir('T06')} link={TX.voltarAoMenu} aoLink={voltar} />
    else if (f.firmwareFora && casos.includes(CASO_SEM_REDE)) {
      rodape = <Rodape legenda={TX.comConexaoGravada} primario={TX.gravarConexao} aoPrimario={gravarConexao} link={TX.procurarOutro} aoLink={procurar} />
    } else if (f.firmwareFora) rodape = <Rodape primario={TX.atualizarFirmware} aoPrimario={atualizarFirmware} link={TX.procurarOutro} aoLink={procurar} />
    else rodape = <Rodape primario={TX.procurarOutro} aoPrimario={procurar} />
  }

  return (
    <div className="t05">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo={comFaixa ? 'faixa' : 'pagina'} />
      {faixa}
      <div className={`tela-miolo ${q.fase === 'pre' ? 't05-miolo-pre' : 't05-miolo-busca'}`}>{miolo}</div>
      {rodape}
    </div>
  )
}
