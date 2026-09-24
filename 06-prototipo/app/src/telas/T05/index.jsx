// T05 · Conectar módulo (02-telas/T05-conectar-modulo): achar o módulo,
// conectar e conferir, antes de qualquer gravação, se ele pode ser instalado.
//
// Os quadros do caminho feliz (C6):
// · 00-tela — a busca achou os módulos por perto (M.situacao.porPerto, AC-06)
//   e o do herói, o primeiro, vem escolhido: a semente (G21)
// · 01-momento-nenhum-escolhido — a busca achou e nada foi tocado: é onde
//   `Procurar de novo` leva. Tocar num módulo o escolhe, e a tela volta à 00
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
// Os onze estados da T05 e as portas naturais são o C7 (quadroDoEstado).
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, Rodape, CabecalhoConteudo, BlocoEscolhido, Lista, LinhaModulo,
  LinhaChecagem, TiraLeituras, Nota,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'
import {
  porPerto, soOHeroi, HEROI, cadastrado, varianteNaLista, detalheDoEscolhido, firmwareDe,
  contextoDe, rotuloDeTopo, resultados, faltas, TOTAL, LINHA_FIRMWARE, sessaoNova, casoFirmware,
} from './dados.js'
import './t05.css'

const M01 = '01-momento-nenhum-escolhido'
const M02 = '02-momento-um-encontrado'
const M05 = '05-momento-pre-checagem'
const M10 = '10-momento-atualizando-o-firmware'
const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)

// o quadro da busca: os módulos por perto e o escolhido (ou nenhum)
const busca = (perto, escolhido) => ({ fase: 'busca', perto, escolhido })
// o da pré-checagem: o módulo, quantas linhas já terminaram e, se o firmware
// atualiza, a porcentagem gravada
const pre = (serial, feitas, atualizando = null) => ({ fase: 'pre', serial, feitas, atualizando })

// o quadro em que a tela abre, pelo momento da URL (sem momento, a 00)
function inicio(momento) {
  if (momento === M01) return busca(porPerto(), null)
  if (momento === M02) return busca(soOHeroi(), HEROI)
  if (momento === M05) return pre(HEROI, TOTAL)
  if (momento === M10) { const c = casoFirmware(); return pre(c.moduloSerial, LINHA_FIRMWARE, c.atualizacao.quadroPct) }
  return busca(porPerto(), HEROI)
}

// os estados da coluna (C7): montados pela receita, parados. Até lá, o quadro do fluxo.
function quadroDoEstado() { return null }

export default function T05({ momento, estado: est }) {
  const { estado, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento))
  const vivo = useRef(null)
  vivo.current = { estado }
  const q = quadroDoEstado(est) ?? fluxo
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })

  // ── a pré-checagem: o que cada linha diz, e onde ela está ──
  const c = q.fase === 'pre' ? contextoDe(q.serial) : null
  const res = c ? resultados(c) : []
  const corre = q.fase === 'pre' && q.atualizando == null && q.feitas < TOTAL
  const concluida = q.fase === 'pre' && q.atualizando == null && q.feitas >= TOTAL
  const aprovadas = res.slice(0, q.feitas).filter((r) => r.estado === 'aprovada').length
  const aprovada = concluida && res.every((r) => r.estado !== 'reprovada')

  // uma linha por tick, no ritmo da pré-checagem; para no print, num estado e fora da corrida
  useEffect(() => {
    if (EM_QUADRO || est != null || !corre) return undefined
    const relogio = setInterval(() => setFluxo((f) => (f.fase === 'pre' && f.atualizando == null && f.feitas < TOTAL ? { ...f, feitas: f.feitas + 1 } : f)), RITMOS.preChecagemLinhaMs)
    return () => clearInterval(relogio)
  }, [corre, est])

  // aprovada: a sessão nasce no estado único (C6·2), com o meio em que a busca achou o módulo
  useEffect(() => {
    if (est != null || !aprovada) return
    const e = vivo.current.estado
    if (e.sessao?.moduloSerial === q.serial) return
    despachar({ tipo: 'mesclar', parcial: { sessao: sessaoNova(q.serial), etapas: { ...e.etapas, preChecagem: { checagens: TOTAL, passaram: aprovadas } } } })
  }, [aprovada, q.serial, est]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── os toques (tela.md) ──
  function escolher(serial) {
    setFluxo((f) => ({ ...f, escolhido: serial }))
    if (momento) ir('T05') // o escolhido é a 00, a tela: a URL segue
  }
  function procurar() {
    setFluxo(busca(porPerto(), null))
    ir('T05', { momento: M01 })
  }
  function conectar() {
    setFluxo(pre(q.escolhido, 0))
    ir('T05', { momento: M05 })
  }
  // o módulo é o do quadro que está na tela (q): no estado 08 da coluna (C7),
  // o fluxo ainda é a busca, e o serial dele não existe
  function atualizarFirmware() {
    setFluxo(pre(q.serial, LINHA_FIRMWARE, casoFirmware().atualizacao.quadroPct))
    ir('T05', { momento: M10 })
  }

  // ── o topo: a barra na cor do que vem embaixo, e a faixa quando a sessão nasce ──
  const comFaixa = aprovada
  const faixa = comFaixa && (
    <Faixa serial={q.serial} placa={TX.semAtivo} semAtivo acao={TX.encerrar}
      aoEncerrar={() => ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR })} />
  )

  let miolo, rodape
  if (q.fase === 'busca') {
    const { perto, escolhido } = q
    const outros = perto.filter((p) => p.serial !== escolhido)
    const cabeca = <CabecalhoConteudo titulo={TX.titulo} contagem={perto.length} unidade={TX.encontrados(perto.length)} />
    if (escolhido) {
      const ultimo = outros.length - 1
      miolo = (
        <>
          {cabeca}
          <BlocoEscolhido rotulo={TX.escolhido} identidade={escolhido} detalhe={detalheDoEscolhido(escolhido)} />
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
      rodape = <Rodape primario={TX.conectarAo(escolhido)} aoPrimario={conectar} link={TX.procurarDeNovo} aoLink={procurar} />
    } else {
      const ultimo = perto.length - 1
      miolo = (
        <>
          {cabeca}
          <span id="t05-escolha" className="t05-frase">{TX.escolhaNaMao}</span>
          <Lista className="t05-lista" role="radiogroup" aria-labelledby="t05-escolha">
            {perto.map((p, i) => (cadastrado(p.serial)
              ? <LinhaModulo key={p.serial} escolha serial={p.serial} variante={varianteNaLista(p.serial)}
                  rotuloValor={TX.rotuloFirmware} valor={firmwareDe(p.serial)} aoTocar={() => escolher(p.serial)}
                  divisoria={i < ultimo} fim={i === ultimo} />
              : <LinhaModulo key={p.serial} escolha apagada serial={p.serial} variante={TX.foraDestaEmpresa} divisoria={i < ultimo} fim={i === ultimo} />))}
          </Lista>
        </>
      )
      rodape = <Rodape legenda={TX.escolhaUm} primario={TX.conectar} primarioDesabilitado link={TX.procurarDeNovo} aoLink={procurar} />
    }
  } else {
    // as linhas: as que terminaram dizem o resultado; a que corre mostra o
    // quadrado de agora; as outras esperam (na atualização, com o relógio da 10)
    const linhas = res.map((r, i) => {
      if (q.atualizando != null && i === LINHA_FIRMWARE) return { ...r, estado: 'agora', valor: TX.atualizandoPct(q.atualizando), causa: undefined }
      if (i < q.feitas) return r
      if (i === q.feitas && corre) return { ...r, estado: 'agora', valor: undefined, causa: undefined }
      return { ...r, estado: 'ainda-nao', valor: TX.aindaNao, causa: undefined, glifo: q.atualizando != null ? 'relogio' : undefined }
    })
    miolo = (
      <>
        <div className="t05-cabeca">
          {!comFaixa && <span className="t05-rotulo-topo">{rotuloDeTopo(c)}</span>}
          <CabecalhoConteudo titulo={TX.preChecagem} contagem={aprovadas} unidade={TX.de(TOTAL)} tom={aprovada ? 'veredito' : 'neutro'} />
        </div>
        <Lista className="t05-lista">
          {linhas.map((l, i) => (
            <LinhaChecagem key={l.id} estado={l.estado} titulo={l.titulo} valor={l.valor} causa={l.causa}
              glifo={l.glifo} nomeGlifo={l.estado === 'ainda-nao' ? 'ainda não' : undefined}
              divisoria={i < TOTAL - 1} folgaFim={i === TOTAL - 1 && aprovada ? 'pre-checagem' : false} />
          ))}
        </Lista>
        <TiraLeituras itens={[{ rotulo: TX.mensagensPendentes, valor: TX.nenhuma }, { rotulo: TX.redeDoModulo, valor: TX.conectada }]} />
      </>
    )
    const voltar = () => ir('T04')
    if (q.atualizando != null) rodape = <Rodape primario={TX.atualizando} primarioDesabilitado explicacao={TX.recomeca} pe="botao" />
    else if (!concluida) rodape = <Rodape primario={TX.selecionarAtivo} primarioDesabilitado link={TX.voltarAoMenu} aoLink={voltar} />
    else if (aprovada) rodape = <Rodape primario={TX.selecionarAtivo} aoPrimario={() => ir('T06')} link={TX.voltarAoMenu} aoLink={voltar} />
    else if (faltas(c).firmwareFora) rodape = <Rodape primario={TX.atualizarFirmware} aoPrimario={atualizarFirmware} link={TX.procurarOutro} aoLink={procurar} />
    else rodape = <Rodape primario={TX.procurarOutro} aoPrimario={procurar} />
  }

  return (
    <div className="t05">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo={comFaixa ? 'faixa' : 'pagina'} />
      {faixa}
      <div className={`tela-miolo ${q.fase === 'busca' ? 't05-miolo-busca' : 't05-miolo-pre'}`}>{miolo}</div>
      {rodape}
    </div>
  )
}
