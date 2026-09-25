// T13 · Checklist (02-telas/T13-checklist): fechar a homologação — o que o app
// já provou sozinho, e o que o técnico ainda precisa provar.
// · Uma estrutura só (a entrega do checklist, decisão 34): o título com a
//   contagem, a barra fina e os seis cartões de seção, cada um dizendo quem
//   age. Tocar num cartão faz ele crescer no lugar, com a seta pra cima; as
//   seções de baixo descem e a lista rola; nada mais se mexe. Uma aberta por
//   vez: tocar em outra troca, e tocar na aberta fecha.
// · Tem seta, toca; sem seta, é leitura (Lei 16). A foto por fazer abre a
//   câmera do app (07); o automático que falta leva à tela que resolve, pelo
//   `origem` do mock (conectar → T05, ativo → T06, can → T08, configurar →
//   T09, calibração → T10); o que reprovou abre o nível do item (09). Na E,
//   uma ação só, Fazer o ciclo dinâmico → T14. A F não tem ação.
// · Cada item lê a etapa que o produziu no estado único (checklist.js). Pular
//   pelo palco semeia só a sessão: o que as telas T05 a T10 gravariam no
//   caminho vem da semente da T13 — o herói depois da calibração, antes do
//   ciclo e da fila (G21).
// · B, o item manual: Não conforme abre a justificativa (08). Tirar foto e
//   Salvar com ressalva resolvem o item e seguem pro próximo por fazer; sem
//   próximo, voltam à B aberta. A ressalva aparece com o check e a causa (12).
// · A câmera do item sem a permissão (o mundo real, igual à T10/11 · estado/
//   camera.js): o visor com a câmera riscada e o Tirar foto vira Abrir as
//   configurações; permitida lá, a câmera abre na volta. O Não conforme
//   continua: a ressalva não precisa da câmera (o primário sai de
//   primarioDaCamera). Nenhuma referência desenha este quadro e o visor fica
//   sem frase (G25), e a URL sai do momento; nenhum estado da coluna chega nele.
// · O automático reprovado: o nível do item (09) mostra o motivo e o caminho,
//   Refazer a leitura da CAN → T08 (T13·2). Nada se marca à mão.
// · Finalizar instalação acende quando o que bloqueia fecha (A a E); o toque
//   gera o relatório na fila (HU-T13-7) e o homologado aparece depois (T13·3):
//   o veredito e o relatório no topo — com a localização negada, o relatório
//   vai sem ela (14). Com a Seção F falhando, pede a ciência antes (10).
// · O que a tela resolve vai pro estado único em etapas.checklist — é dele que
//   o contador do menu conta (T04·2, logica.md).
// · O voltar do Android (logica.md) é o Esc: no diálogo, o Cancelar; no nível
//   do item, o Voltar ao checklist; nas seções e no homologado, o Voltar ao
//   menu (T13·6). ENCERRAR antes de homologar é a sessão abortada (G23).
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, BarraDoChecklist, SecoesDoChecklist, SecaoDoChecklist, ItemDoChecklist, VereditoDoChecklist,
  Segmentado, LinhaTocavel, Justificativa, Nota, Rodape, Veu, Dialogo, Frase, VisorCamera,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { NEGADA, permissaoDoEstado, camera as cameraDa, primarioDaCamera, voltaDasConfiguracoes } from '../../estado/camera.js'
import { RECEITAS } from '../../estado/receitas.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import {
  REF, SECAO_DO_MOMENTO, mundoDe, checklist, nivelDoItem, primeiroPendente, proximoPendente, momentoDaSecao,
  instrumentoDoItem, filaDoFinalizar, nomeDaSecao, rotuloDoNivel, itemDe, ativoDe, registroDoQuadro, cicloConcluido,
} from './checklist.js'
import { InstrumentoDoItem } from './pecas.jsx'
import { T } from './textos.js'
import './t13.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)
const HORA = M.HORA_NOMINAL
// o nome do glifo pro leitor, pelo estado do dado (G15, as legendas da folha 3)
const NOME_DA_SECAO = { aprovada: 'aprovado', pendente: 'ainda não', aguarda: 'ainda não', reprovada: 'falha' }
const NOME_DO_ITEM = { ok: 'aprovado', ressalva: 'aprovado', nsa: 'não se aplica', pendente: 'ainda não', aguarda: 'ainda não', reprovado: 'falha' }
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

// o 13 pela URL é o fluxo depois do ciclo que a T14 fechou (G20): o mundo com ele
function comQuadro(base, momento) {
  if (momento !== REF.eResolvida || base.etapas.ciclo?.concluido) return base
  return { ...base, etapas: { ...base.etapas, ciclo: cicloConcluido(base.sessao.ativoId, base.sessao.moduloSerial) } }
}

// O quadro em que a tela abre: as seções (uma aberta, ou nenhuma), o item, o diálogo
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
  const base = comQuadro(mundoDe({ unico, est, semente: SEMENTES.T13 }), est ? null : momento)
  const [registro, setRegistro] = useState(() => registroDoQuadro(momento, base, checklist(base)))
  const mundo = comRegistro(base, registro)
  const ck = checklist(mundo)
  const [q, setQ] = useState(() => quadroInicial({ momento, est, ck }))
  // a permissão da câmera do item: a do caso do estado da coluna; no fluxo, concedida
  const [permissao, setPermissao] = useState(() => permissaoDoEstado(est ? RECEITAS[`T13/${est}`] : null, M.casos))
  const vivo = useRef(unico)
  vivo.current = unico
  const homologada = registro.homologada
  // o veredito que nasce do toque no Finalizar esmaece; o que abre homologado, não (animacao.md)
  const [homologouAgora, setHomologouAgora] = useState(false)

  // o que a tela resolve vai pro estado único (etapas.checklist), e o relatório,
  // pra fila (M.filaSaida + estado.fila) — só no fluxo
  function gravar(novo) {
    if (est) return
    const e = vivo.current
    const m = comRegistro(comQuadro(mundoDe({ unico: e, est: null, semente: SEMENTES.T13 }), momento), novo)
    const etapas = { ...e.etapas, checklist: { ...novo, pendentes: checklist(m).pendentesDoMenu } }
    // o 13 pela URL grava o ciclo que a T14 teria gravado (G20)
    if (momento === REF.eResolvida && !e.etapas.ciclo?.concluido) etapas.ciclo = m.etapas.ciclo
    const parcial = { etapas }
    if (novo.homologada) {
      const faltam = filaDoFinalizar(m).filter((f) => !e.fila.some((x) => x.id === f.id))
      if (faltam.length) parcial.fila = [...e.fila, ...faltam]
    }
    despachar({ tipo: 'mesclar', parcial })
  }
  // abrir o checklist uma vez já conta pro menu (T04·2); o 11, o 12 e o 13 pela URL gravam o que os toques gravariam
  useEffect(() => { gravar(registro) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // a volta ao checklist homologado reabre no quadro dele: a URL segue (G20)
  useEffect(() => {
    if (!est && homologada && !momento) despachar({ tipo: 'ir', tela: 'T13', momento: REF.homologado })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── os toques ──
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const irQuadro = (m) => ir('T13', m ? { momento: m } : {})
  // o nível do item manual (07, 08): sem a permissão da câmera, o quadro não tem
  // referência, e a URL sai do momento (como a câmera da T10 e o item reprovado)
  const irItem = (m, p = permissao) => irQuadro(p === NEGADA ? null : m)
  const quadroDasSecoes = (aberta, c = ck) => (aberta ? momentoDaSecao(aberta, c, homologada) : homologada ? REF.homologado : null)
  const encerrar = () => (homologada ? ir('T16') : ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR }))
  const voltarAoMenu = () => ir('T04')

  function abrirSecao(s) {
    const aberta = q.aberta === s ? null : s
    setQ({ ...q, aberta, item: null })
    irQuadro(quadroDasSecoes(aberta))
  }
  // o toque num item com seta: a câmera do app, o nível do item reprovado, ou a tela que resolve
  function tocarItem(c) {
    if (c.destino === 'item') { setQ({ ...q, item: c.id, naoConforme: false, texto: '' }); irItem(REF.responder); return }
    if (c.destino === 'reprovado') { setQ({ ...q, item: c.id }); irQuadro(null); return } // o 09 é estado da coluna: no fluxo, a URL fica na tela
    if (c.destino?.tela) ir(c.destino.tela)
  }
  function marcarNaoConforme(marcado) {
    setQ((x) => ({ ...x, naoConforme: marcado, texto: marcado ? (x.texto || M.checklist.exemploJustificativa) : x.texto }))
    irItem(marcado ? REF.naoConforme : REF.responder)
  }
  function voltarAoChecklist() {
    const s = itemDe(q.item).secao
    setQ({ ...q, item: null, naoConforme: false, aberta: s })
    irQuadro(quadroDasSecoes(s))
  }
  // Tirar foto e Salvar com ressalva: o item resolvido, e o próximo por fazer
  function responder(como) {
    const id = q.item
    const fotos = { ...registro.fotos }; const ressalvas = { ...registro.ressalvas }
    if (como === 'foto') { fotos[id] = HORA; delete ressalvas[id] } else { ressalvas[id] = { justificativa: q.texto.trim(), as: HORA }; delete fotos[id] }
    const novo = { ...registro, fotos, ressalvas }
    setRegistro(novo)
    gravar(novo)
    const depois = checklist(comRegistro(base, novo))
    const seguinte = proximoPendente(depois, id)
    if (seguinte) { setQ({ ...q, item: seguinte, naoConforme: false, texto: '' }); irItem(REF.responder) } else {
      const s = itemDe(id).secao
      setQ({ ...q, item: null, naoConforme: false, texto: '', aberta: s })
      irQuadro(quadroDasSecoes(s, depois))
    }
  }
  function homologar(ciencia) {
    const novo = { ...registro, homologada: true, homologadaAs: HORA, ciencia }
    setRegistro(novo)
    setHomologouAgora(true)
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

  // os itens da seção aberta: a ação da seção primeiro (a E), e a última sem o traço de baixo
  function itensDa(s) {
    const linhas = []
    if (s.acao) linhas.push({ acao: true, ...s.acao })
    for (const c of s.itens) linhas.push(c)
    return linhas.map((c, i) => {
      const divisoria = i < linhas.length - 1
      if (c.acao) {
        return <ItemDoChecklist key="acao" tipo="tocar" icone={c.icone} nome={c.nome} legenda={c.legenda} divisoria={divisoria} aoTocar={() => ir(c.destino.tela)} />
      }
      return (
        <ItemDoChecklist key={c.id} tipo={c.tipo} estado={c.estado} icone={c.icone} nome={c.nome} valor={c.valor} legenda={c.legenda} apagado={!!c.apagado}
          divisoria={divisoria} nomeGlifo={NOME_DO_ITEM[c.estado]} aoTocar={c.tipo === 'tocar' ? () => tocarItem(c) : undefined} />
      )
    })
  }

  let miolo
  let rodape
  const nivel = q.item ? nivelDoItem(ck, q.item) : null
  if (nivel && nivel.item.secao === 'B') {
    // o nível do item manual (07, 08). Sem a permissão da câmera, a câmera
    // riscada e o Abrir as configurações no lugar do Tirar foto (estado/camera.js)
    const cam = cameraDa(permissao)
    miolo = (
      <>
        <Segmentado rotulo={rotuloDoNivel(nivel.secao)} contagem={String(nivel.posicao)} total={T.de(nivel.total)} segmentos={nivel.segmentos}
          legenda={nivel.depois ? T.depois(nivel.depois) : undefined} />
        <h1 className="t13-titulo-item">{nivel.item.pergunta}</h1>
        {cam.abre ? <VisorCamera frase={nivel.item.instrucao} /> : <VisorCamera semPermissao />}
        {q.naoConforme
          ? <Justificativa opcao={T.naoConforme} marcado aoMarcar={marcarNaoConforme} rotulo={T.justificativa} valor={q.texto}
              aoEscrever={(texto) => setQ((x) => ({ ...x, texto }))} focado />
          : <LinhaTocavel variante="acao" titulo={T.naoConforme} valor={T.pedeJustificativa} className="t13-nao-conforme"
              rotulo={`${T.naoConforme}, ${T.pedeJustificativa}`} aoTocar={() => marcarNaoConforme(true)} />}
      </>
    )
    // o primário é o que estado/camera.js diz (provado no node, scripts/testar-camera.mjs):
    // o Não conforme marcado ganha da câmera, com ou sem a permissão
    const PRIMARIO = {
      'tirar-foto': { rotulo: T.tirarFoto, aoTocar: () => responder('foto') },
      'salvar-com-ressalva': { rotulo: T.salvarComRessalva, aoTocar: () => responder('ressalva') },
      // de volta das configurações com a permissão, a câmera abre, e a URL volta ao 07
      'abrir-configuracoes': { rotulo: T.abrirConfiguracoes, aoTocar: () => { const p = voltaDasConfiguracoes(); setPermissao(p); irItem(REF.responder, p) } },
    }
    const primario = PRIMARIO[primarioDaCamera(permissao, { ressalva: q.naoConforme })]
    rodape = (
      <Rodape primario={primario.rotulo} aoPrimario={primario.aoTocar}
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
    // as seções: o título com a contagem, a barra, o veredito (homologado) e os seis cartões
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} contagem={String(ck.feitos)} unidade={T.de(ck.total)} />
        <BarraDoChecklist feitos={ck.feitos} total={ck.total} className="t13-barra" />
        {homologada && (
          <VereditoDoChecklist titulo={T.homologadaAs(registro.homologadaAs ?? HORA)} surge={homologouAgora}
            relatorio={mundo.semLocalizacao ? T.semLocalizacao : T.relatorioLeva(M.checklist.evidencias)} />
        )}
        <SecoesDoChecklist aberta={q.aberta}>
          {ck.secoes.map((s) => (
            <SecaoDoChecklist key={s.id} estado={s.estado} titulo={nomeDaSecao(s)} quemAge={s.quemAge ?? undefined} feitos={s.feitos} de={T.de(s.total)}
              aberta={q.aberta === s.id} nomeGlifo={NOME_DA_SECAO[s.estado]} aoTocar={() => abrirSecao(s.id)}>
              {itensDa(s)}
            </SecaoDoChecklist>
          ))}
        </SecoesDoChecklist>
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
