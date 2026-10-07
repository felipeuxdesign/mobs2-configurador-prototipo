// T13 · Checklist (02-telas/T13-checklist): fechar a homologação — o que o app
// já provou sozinho, e o que o técnico ainda precisa provar.
// · Uma estrutura só (a entrega do checklist, decisão 34): o título com a
//   contagem, a barra fina e os seis cartões de seção, cada um dizendo quem
//   age. Tocar num cartão faz ele crescer no lugar, com a seta pra cima; as
//   seções de baixo descem e a lista rola; nada mais se mexe. Uma aberta por
//   vez: tocar em outra troca, e tocar na aberta fecha.
// · Tem seta, toca; sem seta, é leitura (Lei 16). A foto por fazer abre a
//   câmera do app (07) — o Painel também, quando houve calibração (decisão 52);
//   o automático que falta leva à tela que resolve, pelo `origem` do mock
//   (conectar → T05, ativo → T06, can → T07, configurar → T09, calibração →
//   T10); o que reprovou abre o nível do item (09). Na E, uma ação só, Fazer o
//   ciclo de testes → T14. A F não tem ação.
// · Cada item lê a etapa que o produziu no estado único (checklist.js). Pular
//   pelo palco semeia só a sessão: o que as telas T05 a T10 gravariam no
//   caminho vem da semente da T13 — o herói depois da calibração, antes do
//   ciclo e da fila (G21).
// · B, o item manual: a caixa Não está conforme nas duas telas do item (07 e
//   08). O não conforme exige a foto do problema (decisão 39): marcada a caixa,
//   o quadro diz Enquadre o problema e o botão é o disparador, Fotografar o
//   problema (08); fotografado, o quadro vira o registro e o botão, Salvar com
//   ressalva (15); sem o texto, Conte o que aconteceu, apagado. A ordem entre
//   escrever e fotografar é livre. Tirar foto e Salvar com ressalva resolvem o
//   item e seguem pro próximo por fazer; sem próximo, voltam à B aberta. A
//   ressalva aparece com o check e a causa (12).
// · A câmera do item sem a permissão (o mundo real, igual à T10/11 · estado/
//   camera.js): o visor com a câmera riscada e o Tirar foto vira Abrir as
//   configurações; permitida lá, a câmera abre na volta. Com o Não está
//   conforme marcado, também: a foto do problema precisa da câmera (decisão
//   39; o primário sai de primarioDaCamera). Nenhuma referência desenha este
//   quadro e o visor fica sem frase (G25), e a URL sai do momento; nenhum
//   estado da coluna chega nele.
// · O automático reprovado: o nível do item (09) mostra o motivo e o que conferir, e
//   relê o módulo ali mesmo (o pacote 13): Reler o módulo vira Relendo o módulo…
//   (29) e, deu certo, a mesma tela fica positiva, com o valor novo, o relido e o
//   veredito, e um botão só, Voltar ao checklist (30 a 33); não deu (o pacote 23), o
//   valor novo, ainda vermelho, o xis com o relido e o que ainda falta, e o Reler o
//   módulo de novo (34 a 37). O mock em sequência: a 1ª releitura ainda reprova, a 2ª passa. A releitura lê o módulo inteiro: a C
//   volta atualizada. Não leva à T07, e nada muda de tela sozinho. Nada se marca à mão.
// · Finalizar instalação acende quando o que bloqueia fecha (A a E); o toque
//   gera o relatório na fila (HU-T13-7) e o homologado aparece depois (T13·3):
//   o veredito e o relatório no topo — com a localização negada, o relatório
//   vai sem ela (14). Com a Seção F falhando, pede a ciência antes (10).
// · O que a tela resolve vai pro estado único em etapas.checklist — é dele que
//   o contador do menu conta (T04·2, logica.md).
// · O voltar do Android (logica.md) é o Esc: no diálogo, o Cancelar; no nível
//   do item, o Voltar ao checklist; nas seções e no homologado, o Voltar ao
//   menu (T13·6). ENCERRAR antes de homologar abre o diálogo Encerrar sem
//   homologar? por cima da tela (decisão 36), e a sessão abortada (G23).
// · O movimento (C12): o item abre, passa ao próximo e volta pela troca de quadro
//   (C12·4); na volta, a barra parte do que tinha quando o item abriu (C12·36); a
//   caixa do não conforme desliza pro lugar novo e o registro do problema esmaece
//   no lugar do visor (C12·47, C12·42); o texto do primário troca no lugar
//   (C12·23); o diálogo da Seção F nasce e some com o véu. Nada anima ao abrir.
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, BarraDoChecklist, SecoesDoChecklist, SecaoDoChecklist, ItemDoChecklist, VereditoDoChecklist, CampoTexto,
  Segmentado, Justificativa, OQueConferir, Rodape, Veu, Dialogo, Frase, VisorCamera, FotoProva,
  useTrocaDeQuadro, useReorganiza, usePresenca,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { NEGADA, APAGADO, permissaoDoEstado, camera as cameraDa, primarioDaCamera, voltaDasConfiguracoes } from '../../estado/camera.js'
import { RECEITAS } from '../../estado/receitas.js'
import { RITMOS } from '../../estado/ritmos.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { sessaoDoQuadro,
  REF, SECOES, SECAO_DO_MOMENTO, MOMENTO_DA_FOTO, FOTO_DO_MOMENTO, LISTAS_DA_C, DETALHES_DA_C, RELIDO_DO_ITEM, NAO_RESOLVIDO_DO_ITEM, RELEITURA_DO_QUADRO, VEREDITO_DO_RELIDO, detalheDaReleitura,
  BIP_DO_MOMENTO, MOMENTO_DO_BIP, D_NO_QUADRO_38, mundoDe, checklist, nivelDoItem, primeiroPendente, proximoPendente, momentoDaSecao,
  instrumentoDoItem, filaDoFinalizar, nomeDaSecao, rotuloDoNivel, itemDe, ativoDe, registroDoQuadro, cicloConcluido,
} from './checklist.js'
import { InstrumentoDoItem } from './pecas.jsx'
import { BotaoDaLinha, RespostasDaLinha } from '../comum/BotaoDaLinha.jsx'
import { T } from './textos.js'
import './t13.css'

const HORA = M.HORA_NOMINAL
// o nome do glifo pro leitor, pelo estado do dado (G15, as legendas da folha 3)
const NOME_DA_SECAO = { aprovada: 'aprovado', pendente: 'ainda não', aguarda: 'ainda não', reprovada: 'falha', lendo: 'lendo' }
const NOME_DO_ITEM = { ok: 'aprovado', ressalva: 'aprovado', nsa: 'não se aplica', pendente: 'ainda não', aguarda: 'ainda não', reprovado: 'falha', lendo: 'lendo' }
// o que conferir no nível do item reprovado, por item (textos.md · 09, o pacote 11)
const CONFERIR_DO_REPROVADO = { 'c-alimentacao': T.conferirAlimentacao, 'c-gps': T.conferirGps, 'c-entradas': T.conferirEntradas, 'c-modem': T.conferirModem }

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

// O quadro em que a tela abre: as seções (uma aberta, ou nenhuma), o item, o
// diálogo. No item manual: a caixa do não conforme, o que aconteceu e a hora
// da foto do problema (decisão 39)
function quadroInicial({ momento, est, ck }) {
  // deFeitos: quantos estavam feitos quando o nível do item abriu (a barra parte dali na volta, C12·36)
  // releitura: o Reler o módulo do detalhe (o pacote 13 e o 23) · 'relendo' (29), 'naoResolvido' (34 a 37) ou 'relido' (30 a 33)
  // bip: o teste do bip enquanto ele não foi respondido (a rodada 1) · 'tocando' (39) ou 'esperando' (40)
  const q = { aberta: null, item: null, naoConforme: false, texto: '', fotoProblema: null, dialogo: false, ciente: false, deFeitos: null, releitura: null, bip: null }
  const daReleitura = RELEITURA_DO_QUADRO[est ?? momento]
  if (daReleitura) return { ...q, item: daReleitura.item, releitura: ['relendo', 'naoResolvido', 'relido'][daReleitura.vezes] }
  if (DETALHES_DA_C.includes(est)) return { ...q, item: ck.porSecao.C.find((c) => c.estado === 'reprovado')?.id ?? null }
  if (LISTAS_DA_C.includes(est)) return { ...q, aberta: 'C' }
  if (est === REF.secaoF) return { ...q, dialogo: true }
  const bip = BIP_DO_MOMENTO[momento]
  if (SECAO_DO_MOMENTO[momento]) return { ...q, aberta: SECAO_DO_MOMENTO[momento], bip: bip === 'tocando' || bip === 'esperando' ? bip : null }
  if (momento === REF.responder) return { ...q, item: primeiroPendente(ck) }
  if (FOTO_DO_MOMENTO[momento]) return { ...q, item: FOTO_DO_MOMENTO[momento] }
  if (momento === REF.naoConforme) return { ...q, item: primeiroPendente(ck), naoConforme: true, texto: M.checklist.exemploJustificativa }
  if (momento === REF.problemaFotografado) return { ...q, item: primeiroPendente(ck), naoConforme: true, texto: M.checklist.exemploJustificativa, fotoProblema: HORA }
  return q
}

export default function T13({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  // o caso que monta o mundo (o pacote 13): o do detalhe de onde a releitura parte, que fica
  // enquanto a tela vive — o Reler o módulo e o Voltar ao checklist seguem no ônibus do caso,
  // e a URL sai do estado da coluna · releituras: quantas o técnico já fez — os casos da C devolvem
  // a N-ésima das `releituras` do mock (o 34 a 37 abrem com uma, o 30 a 33 com duas)
  const [fixo] = useState(() => (DETALHES_DA_C.includes(est) ? est : detalheDaReleitura(est ?? momento)))
  const [releituras, setReleituras] = useState(() => RELEITURA_DO_QUADRO[est ?? momento]?.vezes ?? 0)
  const base = comQuadro(mundoDe({ unico: est || fixo ? unico : sessaoDoQuadro(unico, momento, SEMENTES.T13), est: fixo ?? est, semente: SEMENTES.T13, releituras }), est || fixo ? null : momento)
  const [registro, setRegistro] = useState(() => registroDoQuadro(momento, base, checklist(base)))
  // a Seção D lida bloco a bloco (a rodada 1, T13/38): ao entrar no checklist no fluxo, ela começa
  // vazia e enche no ritmo do diagnóstico; o 38 pela URL, com três lidos · null, toda lida (o print,
  // a coluna, os outros quadros, e depois do Finalizar)
  const [dLidos, setDLidos] = useState(() => (momento === REF.dSendoLida ? D_NO_QUADRO_38
    : EM_QUADRO || est || momento || base.registro.homologada ? null : 0))
  const mundo = { ...comRegistro(base, registro), dLidos }
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
    if (est || fixo) return
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
  // os quadros que a referência desenha com a lista já rolada (a rodada 1): aberta pela URL, a seção
  // que não cabe embaixo leva a lista até a seção de antes dela no topo do miolo — a D (04, 38) com a
  // C no topo, a E (05, 13, 39 a 42) com a D
  useLayoutEffect(() => {
    if (!momento || !q.aberta || est) return
    const miolo = document.querySelector('.t13 .tela-miolo')
    const cartoes = miolo?.querySelectorAll('.ds-secao-ck')
    const i = SECOES.findIndex((x) => x.id === q.aberta)
    if (!cartoes?.[i] || i < 1) return
    if (cartoes[i].getBoundingClientRect().bottom <= miolo.getBoundingClientRect().bottom) return
    miolo.scrollTop += cartoes[i - 1].getBoundingClientRect().top - miolo.getBoundingClientRect().top
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // a D enchendo: um item a cada RITMOS.diagnosticoLinhaMs, até a última
  const totalD = ck.porSecao.D.length
  useEffect(() => {
    if (EM_QUADRO || dLidos == null) return undefined
    const t = setTimeout(() => setDLidos((n) => (n == null || n + 1 >= totalD ? null : n + 1)), RITMOS.diagnosticoLinhaMs)
    return () => clearTimeout(t)
  }, [dLidos, totalD])
  // o bip tocando: o buzzer aciona por cerca de 1 s (RITMOS.bipMs), e a pergunta aparece (40)
  useEffect(() => {
    if (EM_QUADRO || q.bip !== 'tocando') return undefined
    const t = setTimeout(() => { setQ((x) => ({ ...x, bip: 'esperando' })); irQuadro(q.aberta === 'E' ? REF.bipEsperando : null) }, RITMOS.bipMs)
    return () => clearTimeout(t)
  }, [q.bip]) // eslint-disable-line react-hooks/exhaustive-deps
  // a volta ao checklist registrado reabre no quadro dele: a URL segue (G20)
  useEffect(() => {
    if (!est && homologada && !momento) despachar({ tipo: 'ir', tela: 'T13', momento: REF.registrado })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── os toques ──
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const irQuadro = (m) => ir('T13', m ? { momento: m } : {})
  // o nível do item manual (07, 08): sem a permissão da câmera, o quadro não tem
  // referência, e a URL sai do momento (como a câmera da T10 e o item reprovado)
  const irItem = (m, p = permissao) => irQuadro(p === NEGADA ? null : m)
  // o quadro de cada foto (o pacote 10): o 07 e o não conforme (08, 15) são do
  // Módulo, e os outros quatro têm o seu (17 a 20); o não conforme deles não tem
  // referência, e a URL sai do momento
  const momentoDaFoto = (id, m = REF.responder) => (MOMENTO_DA_FOTO[id] ? (m === REF.responder ? MOMENTO_DA_FOTO[id] : null) : m)
  const quadroDasSecoes = (aberta, c = ck) => (aberta ? momentoDaSecao(aberta, c, homologada) : homologada ? REF.registrado : null)
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar antes de terminar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar({ homologada })
  const voltarAoMenu = () => ir('T04')

  function abrirSecao(s) {
    const aberta = q.aberta === s ? null : s
    setQ({ ...q, aberta, item: null, deFeitos: null })
    irQuadro(quadroDasSecoes(aberta))
  }
  // o toque num item com seta: a câmera do app, o nível do item reprovado, ou a tela que resolve
  function tocarItem(c) {
    if (c.destino === 'item') { setQ({ ...q, item: c.id, naoConforme: false, texto: '', fotoProblema: null, deFeitos: ck.feitos }); irItem(momentoDaFoto(c.id)); return }
    if (c.destino === 'reprovado') { setQ({ ...q, item: c.id, deFeitos: ck.feitos }); irQuadro(null); return } // o 09 é estado da coluna: no fluxo, a URL fica na tela
    if (c.destino?.tela) ir(c.destino.tela)
  }
  // a caixa do não conforme: marcada, o 08 (ou o 15, se o problema já foi
  // fotografado); desmarcada, o 07. O que aconteceu e a foto do problema ficam
  // guardados enquanto o técnico está no item, e marcar de novo os devolve
  function marcarNaoConforme(marcado) {
    setQ((x) => ({ ...x, naoConforme: marcado, texto: marcado ? (x.texto || M.checklist.exemploJustificativa) : x.texto }))
    irItem(momentoDaFoto(q.item, marcado ? (q.fotoProblema ? REF.problemaFotografado : REF.naoConforme) : REF.responder))
  }
  // Fotografar o problema: o quadro vira o registro (15), com a hora do relógio parado
  function fotografarProblema() {
    setQ((x) => ({ ...x, fotoProblema: HORA }))
    irItem(momentoDaFoto(q.item, REF.problemaFotografado))
  }
  function voltarAoChecklist() {
    const s = itemDe(q.item).secao
    setQ({ ...q, item: null, naoConforme: false, fotoProblema: null, aberta: s, releitura: null })
    irQuadro(quadroDasSecoes(s))
  }
  // Reler o módulo (o pacote 13): o botão diz Relendo o módulo…, ali mesmo, o tempo do
  // Relendo… da T10; aí o módulo inteiro relido. O 29 desenha a primeira da Alimentação: nos
  // outros três, e na segunda, a URL sai do momento, como o não conforme das fotos
  function relerModulo() {
    setQ({ ...q, releitura: 'relendo' })
    irQuadro(q.item === RELEITURA_DO_QUADRO[REF.relendo].item && releituras === 0 ? REF.relendo : null)
  }
  useEffect(() => {
    if (EM_QUADRO || q.releitura !== 'relendo') return undefined
    const relogio = setTimeout(() => {
      // deu certo: a mesma tela, positiva (30 a 33); não deu, o valor novo, ainda vermelho, o xis
      // com o que ainda falta, e o Reler de novo (34 a 37)
      const n = releituras + 1
      const depois = checklist(comRegistro(comQuadro(mundoDe({ unico: vivo.current, est: fixo ?? est, semente: SEMENTES.T13, releituras: n }), null), registro))
      const passou = depois.porSecao.C.find((c) => c.id === q.item)?.estado === 'ok'
      setReleituras(n)
      setQ((x) => ({ ...x, releitura: passou ? 'relido' : 'naoResolvido' }))
      irQuadro((passou ? RELIDO_DO_ITEM : NAO_RESOLVIDO_DO_ITEM)[q.item])
    }, RITMOS.relerModuloMs)
    return () => clearTimeout(relogio)
  }, [q.releitura]) // eslint-disable-line react-hooks/exhaustive-deps
  // Tirar foto e Salvar com ressalva: o item resolvido, e o próximo por fazer
  function responder(como) {
    const id = q.item
    const fotos = { ...registro.fotos }; const ressalvas = { ...registro.ressalvas }
    if (como === 'foto') { fotos[id] = HORA; delete ressalvas[id] } else { ressalvas[id] = { justificativa: q.texto.trim(), as: HORA, foto: q.fotoProblema }; delete fotos[id] }
    const novo = { ...registro, fotos, ressalvas }
    setRegistro(novo)
    gravar(novo)
    const depois = checklist(comRegistro(base, novo))
    const seguinte = proximoPendente(depois, id)
    if (seguinte) { setQ({ ...q, item: seguinte, naoConforme: false, texto: '', fotoProblema: null }); irItem(momentoDaFoto(seguinte)) } else {
      const s = itemDe(id).secao
      setQ({ ...q, item: null, naoConforme: false, texto: '', fotoProblema: null, aberta: s })
      irQuadro(quadroDasSecoes(s, depois))
    }
  }
  // o Finalizar (a rodada 1 do retorno do PM): o checklist registrado, aguardando o autoteste — a
  // homologação é da T16, depois do encerramento · `homologada` guarda o nome de antes
  function registrar(ciencia) {
    const novo = { ...registro, homologada: true, homologadaAs: HORA, ciencia }
    setRegistro(novo)
    setHomologouAgora(true)
    gravar(novo)
    // o diálogo sai como estava, com a ciência marcada; o veredito surge embaixo dele
    setQ({ ...q, dialogo: false, aberta: null, item: null, deFeitos: null })
    irQuadro(REF.registrado)
  }
  // com a Seção F falhando, a ciência primeiro (10)
  const finalizar = () => (ck.falhandoF ? setQ({ ...q, dialogo: true, ciente: false }) : registrar(null))
  // o bip do leitor (a rodada 1, 39 a 42): o Testar bip toca por cerca de 1 s e pergunta; Ouvi
  // confere, Não ouvi é não conforme, com o campo do que aconteceu · a URL segue (G20)
  const testarBip = () => { setQ((x) => ({ ...x, bip: 'tocando' })); irQuadro(q.aberta === 'E' ? REF.bipTocando : null) }
  function responderBip(bip) {
    const novo = { ...registro, bip }
    setRegistro(novo)
    gravar(novo)
    setQ((x) => ({ ...x, bip: null }))
    irQuadro(q.aberta === 'E' ? MOMENTO_DO_BIP[bip] : null)
  }
  // o que aconteceu, no item não conforme da E (o bip não ouvido, o cartão que não confere)
  function justificar(id, texto) {
    const novo = { ...registro, justificativas: { ...registro.justificativas, [id]: texto } }
    setRegistro(novo)
    gravar(novo)
  }
  // o diálogo sai como estava (a ciência marcada continua desenhada até sumir); o Finalizar abre sem ela
  const cancelar = () => setQ({ ...q, dialogo: false })

  // o voltar do Android (logica.md, T13·6): num estado da coluna o app está parado, e a peça não escuta
  // relendo o módulo, nada: a releitura não para no meio (como a da CAN na T07)
  const relendo = q.item != null && q.releitura === 'relendo'
  useVoltar(relendo ? null : q.dialogo ? cancelar : q.item ? voltarAoChecklist : voltarAoMenu)

  // ── o que se mostra ──
  const { sessao } = mundo
  const nivel = q.item ? nivelDoItem(ck, q.item) : null
  const fotografado = q.naoConforme && q.fotoProblema != null

  // ── o movimento (C12) ──
  // O quadro que a tela desenha: as seções, ou o nível de um item. Abrir o item, passar ao
  // próximo depois do Tirar foto e voltar às seções trocam o desenho inteiro: o conteúdo
  // esmaece em 150, como entre telas (C12·4); abrir e fechar uma seção move só a seção.
  const quadro = q.item ?? 'secoes'
  useTrocaDeQuadro(quadro)
  // No nível do item manual, a caixa do não conforme muda de lugar na mesma vista (07 ↔ 08 ↔
  // 15): o layout vai direto pro fim, e ela desliza do lugar de antes ao novo, em 150; o
  // registro do problema esmaece no lugar do visor, e o visor sai esmaecendo por cima
  // (C12·47, C12·42, C12·10 · src/ds/linhas/Reorganiza.js). O campo que abre embaixo dela é
  // da peça (Justificativa). Nas seções e no item reprovado, nada disso: a chave é null
  const lugar = useReorganiza(nivel && nivel.item.secao === 'B' ? `${q.naoConforme}|${fotografado}` : null)
  // o diálogo da Seção F: nasce e some em 150, com o véu (movimento.md, "Por cima da tela");
  // aberto desde o começo (o 10, pela coluna), parado
  const dialogo = usePresenca(q.dialogo)

  // o item da E que o técnico responde aqui (a rodada 1): o bip — o Testar bip à direita, e a
  // pergunta com as duas respostas embaixo (40) —, e o não conforme com o campo do que aconteceu
  // (o bip não ouvido, 42; o cartão que não confere, sem referência, G25)
  function itemDaE(c, divisoria) {
    const fonte = itemDe(c.id).fonte
    const campo = (
      <CampoTexto rotulo={T.oQueAconteceu} valor={registro.justificativas?.[c.id] ?? ''} aoMudar={(texto) => justificar(c.id, texto)} placeholder={T.conteOQueAconteceu} />
    )
    if (c.estado === 'naoConforme') {
      return <ItemDoChecklist key={c.id} estado="reprovado" nome={c.nome} valor={c.valor} divisoria={divisoria} nomeGlifo={NOME_DO_ITEM.reprovado} embaixo={campo} />
    }
    if (fonte !== 'bip' || c.estado !== 'pendente') return null
    const botao = (
      <BotaoDaLinha tam="teste" letra="secundario" desabilitado={q.bip === 'tocando'} aoTocar={testarBip}>
        {q.bip === 'tocando' ? T.tocando : T.testarBip}
      </BotaoDaLinha>
    )
    const pergunta = q.bip === 'esperando' && (
      <>
        <span className="t13-pergunta-bip">{T.ouviuOBip}</span>
        <RespostasDaLinha>
          <BotaoDaLinha aoTocar={() => responderBip('ouvi')}>{T.ouviBotao}</BotaoDaLinha>
          <BotaoDaLinha aoTocar={() => responderBip('naoOuvi')}>{T.naoOuviBotao}</BotaoDaLinha>
        </RespostasDaLinha>
      </>
    )
    return <ItemDoChecklist key={c.id} estado="pendente" nome={c.nome} acao={botao} divisoria={divisoria} nomeGlifo={NOME_DO_ITEM.pendente} embaixo={pergunta || undefined} />
  }

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
      const daE = s.id === 'E' && itemDaE(c, divisoria)
      if (daE) return daE
      return (
        <ItemDoChecklist key={c.id} tipo={c.tipo} estado={c.estado} icone={c.icone} nome={c.nome} valor={c.valor} legenda={c.legenda} linhas={c.linhas} apagado={!!c.apagado} valorDeEstado={!!c.valorDeEstado}
          divisoria={divisoria} nomeGlifo={NOME_DO_ITEM[c.estado]} aoTocar={c.tipo === 'tocar' || c.destino ? () => tocarItem(c) : undefined} />
      )
    })
  }

  let miolo
  let rodape
  if (nivel && nivel.item.secao === 'B') {
    // o nível do item manual (07, 08, 15). Sem a permissão da câmera, a câmera
    // riscada e o Abrir as configurações no lugar do Tirar foto (estado/camera.js).
    // O quadro: a câmera do item; marcado o não conforme, a do problema
    // (Enquadre o problema, 08); fotografado o problema, o registro no lugar
    // dela (15) — a foto que prova, tirada, a peça da T10
    const cam = cameraDa(permissao)
    const frase = q.naoConforme ? T.enquadreProblema : nivel.item.enquadre
    miolo = (
      <>
        <Segmentado rotulo={rotuloDoNivel(nivel.secao)} contagem={String(nivel.posicao)} total={T.de(nivel.total)} segmentos={nivel.segmentos}
          legenda={nivel.depois ? T.depois(nivel.depois) : undefined} />
        <h1 className="t13-titulo-item">{nivel.item.pergunta}</h1>
        {fotografado
          ? <FotoProva tirada titulo={T.problemaFotografado(q.fotoProblema)} legenda={T.vaiComARessalva} />
          : cam.abre ? <VisorCamera frase={frase} /> : <VisorCamera semPermissao />}
        {/* a caixa do não conforme (decisão 39): desmarcada, a 16 do fim do miolo (T13/07) */}
        <div className={q.naoConforme ? 't13-nao-conforme' : 't13-nao-conforme t13-nao-conforme-desmarcada'}>
          {q.naoConforme
            ? <Justificativa opcao={T.naoConforme} legenda={T.conteEmbaixo} marcado aoMarcar={marcarNaoConforme} rotulo={T.oQueAconteceu} valor={q.texto}
                aoEscrever={(texto) => setQ((x) => ({ ...x, texto }))} focado />
            : <Justificativa opcao={T.naoConforme} legenda={T.marqueEConte} aoMarcar={marcarNaoConforme} />}
        </div>
      </>
    )
    // o primário é o que estado/camera.js diz (provado no node, scripts/testar-camera.mjs):
    // desmarcado, o da câmera; marcado, o que falta pra ressalva (decisão 39)
    const PRIMARIO = {
      'tirar-foto': { rotulo: T.tirarFoto, aoTocar: () => responder('foto') },
      'fotografar-problema': { rotulo: T.fotografarProblema, aoTocar: fotografarProblema },
      // sem o texto, apagado e desabilitado (lei 17): diz o que falta, e não faz nada
      [APAGADO]: { rotulo: T.conteOQueAconteceu, desabilitado: true },
      'salvar-com-ressalva': { rotulo: T.salvarComRessalva, aoTocar: () => responder('ressalva') },
      // de volta das configurações com a permissão, a câmera abre, e a URL volta ao quadro do item (07 ou 08)
      'abrir-configuracoes': { rotulo: T.abrirConfiguracoes, aoTocar: () => { const p = voltaDasConfiguracoes(); setPermissao(p); irItem(momentoDaFoto(q.item, q.naoConforme ? REF.naoConforme : REF.responder), p) } },
    }
    const primario = PRIMARIO[primarioDaCamera(permissao, { naoConforme: q.naoConforme, fotografado, contou: !!q.texto.trim() })]
    // o botão diz o que falta: o texto novo esmaece no lugar, e o roxo troca direto (C12·23)
    rodape = (
      <Rodape primario={primario.rotulo} aoPrimario={primario.aoTocar}
        primarioDesabilitado={!!primario.desabilitado} primarioTrocaTexto link={T.voltarChecklist} aoLink={voltarAoChecklist} />
    )
  } else if (nivel) {
    // o nível do item automático reprovado (09, o pacote 11): a tela que ajuda a consertar — a
    // leitura com a régua, e o que conferir (a peça da folha 6, a mesma da T05/04), sem o traço
    // vermelho (a falha já está na régua) · sem a barrinha: no detalhe não tem o que percorrer
    // · relido e dentro (o pacote 13, 30 a 33): sem o O que conferir e sem o vermelho, o check
    // com o relido e o veredito, e um botão só · relendo (29): o primário desligado e o link apagado
    const c = ck.porSecao[nivel.item.secao].find((x) => x.id === q.item)
    const positivo = q.releitura === 'relido' && c.estado === 'ok'
    // relido e ainda reprovado (o pacote 23): o xis com o que ainda falta, também enquanto relê de novo
    const aindaFalta = releituras > 0 && c.estado === 'reprovado'
    const instrumento = c.leitura ? instrumentoDoItem(c) : null
    miolo = (
      <>
        <Segmentado rotulo={rotuloDoNivel(nivel.secao)} />
        <h1 className="t13-titulo-item">{nivel.item.pergunta ?? nivel.item.rotulo}</h1>
        {instrumento && <InstrumentoDoItem rotulo={T.lidoNoModulo} {...instrumento} relido={positivo ? T.relido(HORA, VEREDITO_DO_RELIDO[c.id](c)) : undefined}
          naoResolvido={aindaFalta && instrumento.ainda ? T.relido(HORA, instrumento.ainda) : undefined} />}
        {!positivo && CONFERIR_DO_REPROVADO[q.item] && <OQueConferir rotulo={T.oQueConferir} causas={CONFERIR_DO_REPROVADO[q.item]} />}
      </>
    )
    rodape = positivo
      ? <Rodape primario={T.voltarChecklist} aoPrimario={voltarAoChecklist} primarioTrocaTexto />
      : <Rodape primario={relendo ? T.relendoModulo : T.relerModulo} aoPrimario={relerModulo} primarioDesabilitado={relendo} primarioTrocaTexto
          link={T.voltarChecklist} aoLink={voltarAoChecklist} linkDesabilitado={relendo} />
  } else {
    // as seções: o título com a contagem, a barra, o veredito (homologado) e os seis cartões
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} contagem={String(ck.feitos)} unidade={T.de(ck.total)} />
        {/* na volta do nível do item, a barra parte do que tinha quando o item abriu (C12·36) */}
        <BarraDoChecklist feitos={ck.feitos} total={ck.total} de={q.deFeitos ?? undefined} className="t13-barra" />
        {homologada && (
          <VereditoDoChecklist titulo={<>{T.registrado}<br />{T.aguardandoAutoteste}</>} surge={homologouAgora}
            relatorio={mundo.semLocalizacao ? T.semLocalizacao : T.proximoPasso} />
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
    // no Finalizar, o texto do primário troca no lugar (C12·23): Encerrar a sessão
    rodape = homologada
      ? <Rodape primario={T.encerrarSessao} aoPrimario={() => ir('T16')} primarioTrocaTexto link={T.voltarMenu} aoLink={voltarAoMenu} />
      : (
        // 'Faltam N itens' explica o primário apagado; com 1, no singular (Falta 1 item, proposta)
        <Rodape legenda={ck.motivo ?? undefined} legendaJunta primario={T.finalizar} primarioDesabilitado={ck.bloqueiam > 0}
          primarioTrocaTexto aoPrimario={finalizar} link={T.voltarMenu} aoLink={voltarAoMenu} />
      )
  }

  // Com o diálogo aberto, o que fica atrás do véu é inerte (G25), e a faixa,
  // acesa em cima dele como a referência desenha (G12), fica desabilitada.
  return (
    <div className="t13">
      <BarraDoSistema fundo="faixa" />
      <fieldset className="t13-topo" role="presentation" disabled={dialogo.montado}>
        {/* relendo o módulo, o ENCERRAR fica apagado e não faz nada, como na releitura da CAN (lei 17) */}
        <Faixa serial={sessao.moduloSerial} placa={ativoDe(sessao.ativoId)?.placa} acao={T.encerrar} aoEncerrar={enc.encerrar} acaoDesabilitada={relendo} />
      </fieldset>
      <div className="t13-corpo">
        <div className="t13-conteudo" inert={dialogo.montado ? '' : undefined}>
          {/* o miolo e o rodapé nascem com o quadro: dentro da troca, nada esmaece de novo por dentro */}
          <div key={`miolo:${quadro}`} ref={lugar} className="tela-miolo t13-miolo">{miolo}</div>
          <Fragment key={`rodape:${quadro}`}>{rodape}</Fragment>
        </div>
        {dialogo.montado && (
          <div className="t13-sobre">
            <Veu de="dialogo" visivel={dialogo.visivel}>
              <Dialogo titulo={T.secaoFNaoPassou} primario={T.finalizar}
                aoPrimario={() => registrar({ nome: unico.tecnico.nome, as: HORA })}
                saida={T.cancelar} aoSair={cancelar} ciencia={T.ciente(unico.tecnico.nome, HORA)} ciente={q.ciente}
                aoMudarCiencia={(ciente) => setQ((x) => ({ ...x, ciente }))} margem={16} aberto={dialogo.visivel}>
                <Frase>{T.registradaFalhando}</Frase>
              </Dialogo>
            </Veu>
          </div>
        )}
      </div>
      {enc.sobre}
    </div>
  )
}
