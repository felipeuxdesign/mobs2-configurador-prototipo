// T13 · Checklist (02-telas/T13-checklist): fechar a homologação — o que o app
// já provou sozinho, e o que o técnico ainda precisa provar.
// · O mapa (00, 11): o placar, as seis seções com o veredito de cada uma e o
//   rodapé. Tocar numa seção abre o acordeão (01 a 06): uma aberta por vez;
//   tocar na aberta fecha, e o mapa volta.
// · Cada item lê a etapa que o produziu no estado único (checklist.js). Pular
//   pelo palco semeia só a sessão: o que as telas T05 a T10 gravariam no
//   caminho vem da semente da T13 — o herói depois da calibração, antes do
//   ciclo e da fila (G21).
// · B, o item manual: tocar num cartão de foto abre o nível do item (07);
//   Não conforme abre a justificativa (08). Tirar foto e Salvar com ressalva
//   resolvem o item e seguem pro próximo por fazer; sem próximo, voltam à B.
// · O automático reprovado leva ao nível do item (09), que mostra o motivo e
//   o caminho: Refazer a leitura da CAN → T08 (T13·2). Nada se marca à mão.
// · E não se responde aqui: o passo que falta abre a T14 (T13·4, HU-T13-8).
// · Finalizar instalação acende quando o que bloqueia fecha (A a E); o toque
//   gera o relatório na fila (HU-T13-7) e o homologado aparece depois (T13·3).
//   Com a Seção F falhando, pede a ciência antes (10).
// · O que a tela resolve vai pro estado único em etapas.checklist — é dele que
//   o contador do menu conta (T04·2, logica.md).
// · O voltar do Android (logica.md) é o Esc: no diálogo, o Cancelar; no nível
//   do item, o Voltar ao checklist; no mapa e na seção aberta, o Voltar ao
//   menu (T13·6). ENCERRAR antes de homologar é a sessão abortada (G23).
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Placar, LinhaSecaoMapa, Lista, SecaoChecklist, GradeCartoes,
  CartaoValor, CartaoFoto, Segmentado, LinhaTocavel, Justificativa, Nota, Rodape, Veu, Dialogo, Frase,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import {
  REF, SECAO_DO_MOMENTO, MOMENTO_DA_SECAO, mundoDe, checklist, nivelDoItem, primeiroPendente, proximoPendente,
  instrumentoDoItem, filaDoFinalizar, nomeDaSecao, rotuloDoNivel, itemDe, ativoDe,
} from './checklist.js'
import { VisorCamera, InstrumentoDoItem } from './pecas.jsx'
import { T } from './textos.js'
import './t13.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)
const HORA = M.HORA_NOMINAL
// o nome do glifo pro leitor, pelo estado do dado (G15, as legendas da folha 3)
const NOME_DO_ESTADO = { aprovada: 'aprovado', pendente: 'ainda não', aguarda: 'ainda não', reprovada: 'falha' }
const NOME_DO_ITEM = { ok: 'aprovado', ressalva: T.naoConforme, nsa: 'não se aplica', pendente: 'ainda não', aguarda: 'ainda não', reprovado: 'falha' }
// o que o nível do item reprovado explica, por item (textos.md · 09)
const NOTA_DO_REPROVADO = { 'c-alimentacao': T.confiraAlimentacao }

// Homologado ⇒ o relatório está na fila (o Finalizar o gerou): a Seção F desta
// sessão lê dele (G22). O mundo com o registro da tela e esse relatório.
function comRegistro(base, registro) {
  const mundo = { ...base, registro }
  if (!registro.homologada) return mundo
  const faltam = filaDoFinalizar(mundo).filter((f) => !base.fila.some((x) => x.id === f.id))
  return faltam.length ? { ...mundo, fila: [...base.fila, ...faltam] } : mundo
}

// O registro em que a tela abre: o guardado no estado único, ou o do quadro
// que a URL pede. O 11 é o fluxo depois dos toques que levam lá (G20): as
// fotos de B tiradas, o ciclo feito na T14, o Finalizar tocado.
function registroInicial(momento, base) {
  const r = base.registro
  if (momento !== REF.homologado || r.homologada) return r
  const fotos = { ...r.fotos }
  for (const c of checklist(base).porSecao.B) if (c.estado === 'pendente') fotos[c.id] = HORA
  return { ...r, fotos, homologada: true, homologadaAs: HORA }
}

// O quadro em que a tela abre: o mapa, a seção aberta, o item, o diálogo
function quadroInicial({ momento, est, ck }) {
  const q = { aberta: null, item: null, naoConforme: false, texto: '', dialogo: false, ciente: false }
  if (est === REF.reprovado) return { ...q, item: ck.porSecao.C.find((c) => c.estado === 'reprovado')?.id ?? null }
  if (est === REF.secaoF) return { ...q, dialogo: true }
  if (SECAO_DO_MOMENTO[momento]) return { ...q, aberta: SECAO_DO_MOMENTO[momento] }
  if (momento === REF.responder) return { ...q, item: primeiroPendente(ck) }
  if (momento === REF.naoConforme) return { ...q, item: primeiroPendente(ck), naoConforme: true, texto: M.checklist.exemploJustificativa }
  return q
}

export default function T13({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const base = mundoDe({ unico, est, semente: SEMENTES.T13 })
  const [registro, setRegistro] = useState(() => registroInicial(momento, base))
  const mundo = comRegistro(base, registro)
  const ck = checklist(mundo)
  const [q, setQ] = useState(() => quadroInicial({ momento, est, ck }))
  const vivo = useRef(unico)
  vivo.current = unico
  const homologada = registro.homologada

  // o que a tela resolve vai pro estado único (etapas.checklist), e o relatório,
  // pra fila (M.filaSaida + estado.fila) — só no fluxo
  function gravar(novo) {
    if (est) return
    const e = vivo.current
    const m = comRegistro(mundoDe({ unico: e, est: null, semente: SEMENTES.T13 }), novo)
    const parcial = { etapas: { ...e.etapas, checklist: { ...novo, pendentes: checklist(m).pendentesDoMenu } } }
    if (novo.homologada) {
      const faltam = filaDoFinalizar(m).filter((f) => !e.fila.some((x) => x.id === f.id))
      if (faltam.length) parcial.fila = [...e.fila, ...faltam]
    }
    despachar({ tipo: 'mesclar', parcial })
  }
  // abrir o checklist uma vez já conta pro menu (T04·2); o 11 pela URL grava o que os toques gravariam
  useEffect(() => { gravar(registro) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // a volta ao checklist homologado reabre no quadro dele: a URL segue (G20)
  useEffect(() => {
    if (!est && homologada && !momento) despachar({ tipo: 'ir', tela: 'T13', momento: REF.homologado })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── os toques ──
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const irQuadro = (m) => ir('T13', m ? { momento: m } : {})
  const mapa = () => (homologada ? REF.homologado : null)
  const encerrar = () => (homologada ? ir('T16') : ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR }))
  const voltarAoMenu = () => ir('T04')

  function abrirSecao(s) {
    const aberta = q.aberta === s ? null : s
    setQ({ ...q, aberta, item: null })
    irQuadro(aberta ? MOMENTO_DA_SECAO[aberta] : mapa())
  }
  function abrirItem(id) {
    setQ({ ...q, item: id, naoConforme: false, texto: '' })
    irQuadro(REF.responder)
  }
  function abrirReprovado(id) {
    setQ({ ...q, item: id })
    irQuadro(null) // o 09 é estado da coluna: no fluxo, a URL fica na tela
  }
  function marcarNaoConforme(marcado) {
    setQ((x) => ({ ...x, naoConforme: marcado, texto: marcado ? (x.texto || M.checklist.exemploJustificativa) : x.texto }))
    irQuadro(marcado ? REF.naoConforme : REF.responder)
  }
  function voltarAoChecklist() {
    const s = itemDe(q.item).secao
    setQ({ ...q, item: null, naoConforme: false, aberta: s })
    irQuadro(MOMENTO_DA_SECAO[s])
  }
  // Tirar foto e Salvar com ressalva: o item resolvido, e o próximo por fazer
  function responder(como) {
    const id = q.item
    const fotos = { ...registro.fotos }; const ressalvas = { ...registro.ressalvas }
    if (como === 'foto') { fotos[id] = HORA; delete ressalvas[id] } else { ressalvas[id] = { justificativa: q.texto.trim(), as: HORA }; delete fotos[id] }
    const novo = { ...registro, fotos, ressalvas }
    setRegistro(novo)
    gravar(novo)
    const seguinte = proximoPendente(checklist(comRegistro(base, novo)), id)
    if (seguinte) { setQ({ ...q, item: seguinte, naoConforme: false, texto: '' }); irQuadro(REF.responder) } else {
      setQ({ ...q, item: null, naoConforme: false, texto: '', aberta: itemDe(id).secao })
      irQuadro(MOMENTO_DA_SECAO[itemDe(id).secao])
    }
  }
  function homologar(ciencia) {
    const novo = { ...registro, homologada: true, homologadaAs: HORA, ciencia }
    setRegistro(novo)
    gravar(novo)
    setQ({ ...q, dialogo: false, ciente: false, aberta: null, item: null })
    irQuadro(REF.homologado)
  }
  const finalizar = () => (ck.falhandoF ? setQ({ ...q, dialogo: true, ciente: false }) : homologar(null))
  const cancelar = () => setQ({ ...q, dialogo: false, ciente: false })

  // o voltar do Android (logica.md, T13·6): num estado da coluna o app está parado, e a peça não escuta
  useVoltar(q.dialogo ? cancelar : q.item ? voltarAoChecklist : voltarAoMenu)

  // ── o que se mostra ──
  const { sessao } = mundo
  const legendaDa = (s) => (s.bloqueia ? undefined : T.naoBloqueia)
  const contagemDa = (s) => T.contagem(s.feitos, s.total)

  function cartoesDa(s) {
    if (s.id === 'B') {
      return (
        <GradeCartoes colunas={3}>
          {s.itens.map((c) => {
            const nome = itemDe(c.id).rotulo
            return (
              // só o que falta se responde: a foto tirada fica tirada (pendencias.md), e o
              // Painel herdado da calibração não se fotografa de novo (HU-T10-4)
              <CartaoFoto key={c.id} nome={nome} tirada={c.estado === 'ok' || c.estado === 'ressalva'}
                desabilitado={c.estado !== 'pendente'} aoTocar={() => abrirItem(c.id)} rotulo={`${nome}, ${NOME_DO_ITEM[c.estado]}`} />
            )
          })}
        </GradeCartoes>
      )
    }
    return (
      <GradeCartoes colunas={2}>
        {s.itens.map((c) => {
          let aoTocar
          if (c.estado === 'reprovado' && c.leitura) aoTocar = () => abrirReprovado(c.id)
          else if (c.naT14) aoTocar = () => ir('T14')
          return (
            <CartaoValor key={c.id} nome={c.nome} valor={c.valor} unidade={c.unidade} unidadeTexto={!!c.unidadeTexto} medida={c.medida}
              aguarda={!!c.aguarda} larga={!!c.larga} aoTocar={aoTocar}
              rotulo={aoTocar ? `${itemDe(c.id).rotulo}, ${NOME_DO_ITEM[c.estado]}` : undefined} />
          )
        })}
      </GradeCartoes>
    )
  }

  let miolo
  let rodape
  const nivel = q.item ? nivelDoItem(ck, q.item) : null
  if (nivel && nivel.item.secao === 'B') {
    // o nível do item manual (07, 08)
    miolo = (
      <>
        <Segmentado rotulo={rotuloDoNivel(nivel.secao)} contagem={String(nivel.posicao)} total={T.de(nivel.total)} segmentos={nivel.segmentos}
          legenda={nivel.depois ? T.depois(nivel.depois) : undefined} />
        <h1 className="t13-titulo-item">{nivel.item.pergunta}</h1>
        <VisorCamera dica={nivel.item.instrucao} />
        {q.naoConforme
          ? <Justificativa opcao={T.naoConforme} marcado aoMarcar={marcarNaoConforme} rotulo={T.justificativa} valor={q.texto}
              aoEscrever={(texto) => setQ((x) => ({ ...x, texto }))} focado />
          : <LinhaTocavel variante="acao" titulo={T.naoConforme} valor={T.pedeJustificativa} className="t13-nao-conforme"
              rotulo={`${T.naoConforme}, ${T.pedeJustificativa}`} aoTocar={() => marcarNaoConforme(true)} />}
      </>
    )
    rodape = (
      <Rodape primario={q.naoConforme ? T.salvarComRessalva : T.tirarFoto} aoPrimario={() => responder(q.naoConforme ? 'ressalva' : 'foto')}
        primarioDesabilitado={q.naoConforme && !q.texto.trim()} link={T.voltarChecklist} aoLink={voltarAoChecklist} />
    )
  } else if (nivel) {
    // o nível do item automático reprovado (09): o motivo e o caminho; nada se marca à mão
    const c = ck.porSecao[nivel.item.secao].find((x) => x.id === q.item)
    const instrumento = c.leitura ? instrumentoDoItem(c) : null
    miolo = (
      <>
        <Segmentado rotulo={rotuloDoNivel(nivel.secao)} contagem={String(nivel.posicao)} total={T.de(nivel.total)} segmentos={nivel.segmentos} />
        <h1 className="t13-titulo-item">{nivel.item.pergunta ?? nivel.item.rotulo}</h1>
        {instrumento && <InstrumentoDoItem rotulo={T.lidoNaCan} {...instrumento} />}
        {NOTA_DO_REPROVADO[q.item] && <Nota tom="explica" corpo="item" titulo={T.naoSeMarca} frase={NOTA_DO_REPROVADO[q.item]} />}
      </>
    )
    rodape = <Rodape primario={T.refazerCan} aoPrimario={() => ir('T08')} link={T.voltarChecklist} aoLink={voltarAoChecklist} />
  } else {
    // o mapa (00, 11) e o acordeão (01 a 06)
    const n = ck.secoes.length
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} contagem={String(ck.feitos)} unidade={T.de(ck.total)} />
        {!q.aberta && (
          <>
            <Placar rotulo={homologada ? T.homologada : T.homologacao} veredito={homologada}
              meta={homologada ? T.evidencias(M.checklist.evidencias, registro.homologadaAs) : undefined}
              feitos={ck.feitos} total={ck.total} legendas={{ inicio: '0', meio: T.conferidos(ck.feitos, ck.total), fim: String(ck.total) }} />
            <div className="t13-colunas"><span>{T.colunaSecao}</span><span>{T.colunaResolvido}</span></div>
            <div className="t13-mapa">
              {ck.secoes.map((s, i) => (
                <LinhaSecaoMapa key={s.id} estado={s.estado} titulo={nomeDaSecao(s)} legenda={legendaDa(s)} contagem={contagemDa(s)}
                  divisoria={i < n - 1} nomeGlifo={NOME_DO_ESTADO[s.estado]} recolhida aoTocar={() => abrirSecao(s.id)} />
              ))}
            </div>
          </>
        )}
        {q.aberta && (
          <Lista className="t13-acordeao">
            {/* a última seção fica sem o traço de baixo, fora quando é ela a aberta (T13/06 desenha o traço) */}
            {ck.secoes.map((s, i) => (
              <SecaoChecklist key={s.id} estado={s.estado} titulo={nomeDaSecao(s)} legenda={legendaDa(s)} contagem={contagemDa(s)}
                aberta={q.aberta === s.id} divisoria={i < n - 1 || q.aberta === s.id} nomeGlifo={NOME_DO_ESTADO[s.estado]} aoTocar={() => abrirSecao(s.id)}>
                {cartoesDa(s)}
              </SecaoChecklist>
            ))}
          </Lista>
        )}
      </>
    )
    rodape = homologada
      ? <Rodape primario={T.encerrarSessao} aoPrimario={() => ir('T16')} link={T.voltarMenu} aoLink={voltarAoMenu} />
      : (
        // 'Faltam N itens' explica o primário apagado; com 1, o texto não existe (G25)
        <Rodape legenda={ck.faltam > 1 ? T.faltam(ck.faltam) : undefined} legendaJunta primario={T.finalizar} primarioDesabilitado={ck.faltam > 0}
          aoPrimario={finalizar} link={T.voltarMenu} aoLink={voltarAoMenu} />
      )
  }

  // Com o diálogo aberto, o que fica atrás do véu é inerte (G25), e a faixa,
  // acesa em cima dele como a referência desenha (G12), fica desabilitada.
  return (
    <div className="t13">
      <BarraDoSistema hora={HORA} fundo="faixa" />
      <fieldset className="t13-topo" role="presentation" disabled={q.dialogo}>
        <Faixa serial={sessao.moduloSerial} placa={ativoDe(sessao.ativoId)?.placa} acao={T.encerrar} aoEncerrar={encerrar} />
      </fieldset>
      <div className="t13-corpo">
        <div className="t13-conteudo" inert={q.dialogo ? '' : undefined}>
          <div className="tela-miolo t13-miolo">{miolo}</div>
          {rodape}
        </div>
        {q.dialogo && (
          <div className="t13-sobre">
            <Veu de="dialogo">
              <Dialogo titulo={T.secaoFNaoPassou} primario={T.finalizar} aoPrimario={() => homologar({ nome: unico.tecnico.nome, as: HORA })}
                saida={T.cancelar} aoSair={cancelar} ciencia={T.ciente(unico.tecnico.nome, HORA)} ciente={q.ciente}
                aoMudarCiencia={(ciente) => setQ((x) => ({ ...x, ciente }))} margem={16}>
                <Frase>{T.registradaFalhando}</Frase>
              </Dialogo>
            </Veu>
          </div>
        )}
      </div>
    </div>
  )
}
