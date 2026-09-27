// T14 · Ciclo dinâmico (02-telas/T14-ciclo-dinamico): andar com o ônibus e
// deixar o app provar o que só fecha em movimento.
// · A entrada (G27): a tela abre no quadro 01 — a fila do módulo drenando
//   (M.ciclo.mensagensGuardadas, ou a do modulo-com-pendencias no serial dele),
//   o prazo cheio e o disparo indisponível com o motivo. A fila drena em
//   RITMOS.filaDrenagemMs, e o 'Disparar evento de teste' acende (o quadro da
//   fila drenada antes do disparo não tem referência: junta as peças que
//   existem, G25). No print (EM_QUADRO), sem momento, a tela fica parada na 00.
// · O disparo: o prazo de 2:00 (M.ciclo.prazoEventoSeg) drena no tique do prazo
//   (1 s real vale 4 s de prazo). A semente traz 2 passos feitos, e os passos
//   3 a 5 acendem sozinhos a +9, +12 e +15 s (T14·1). O evento chega depois de
//   M.ciclo.evento.recebidoAosSeg — a 00 é o instante antes, 1:36 — e o número
//   passa a ser o tempo que ele levou, com a barra parada no que restava; os
//   campos conferem depois de conferidoAosSeg ('6 de 6', AC-09). Os cinco
//   passos e o evento → 05-momento-ciclo-concluido.
// · Os estados da coluna, parados, pela receita (G21), cada um na sessão do
//   caso: o 02 (evento-sem-resposta, o fim do prazo), o 03 (can-fora-esperado,
//   o passo que o sinal prova reprova, AC-10) e o 04 (identificador-divergente,
//   a linha do teste do cartão, que só entra com o caso, T14·3). No fluxo, o
//   caso vale quando o par da faixa é o dele (G28); o evento sem resposta, uma
//   vez por sessão: 'Disparar outro evento' tenta de novo, e os passos continuam
//   valendo.
// · 'Encerrar o ciclo' fecha a captura, e os pendentes ficam pendentes na
//   Seção E; 'Ir para o checklist' sai com o ciclo aberto — os dois → T13
//   (T14·2). 'Voltar ao checklist' → T13 · 'Voltar ao menu' → T04 (T14·4).
//   ENCERRAR → antes de homologar, o diálogo Encerrar sem homologar? por cima
//   da tela (decisão 36), e a sessão abortada (G23). O voltar do Android
//   (o Esc) faz o mesmo que o link de saída do rodapé (logica.md).
// · 'Solicitar correção de cadastro' (04) → o link vira o registro no mesmo
//   lugar, 'Correção solicitada às 14:30', e deixa de ser tocável (06).
// · O ciclo fica gravado em etapas.ciclo: os passos pelo id do item da Seção E,
//   o evento, o cartão, a correção pedida e se a captura foi fechada. Voltar à
//   T14 com o ciclo aberto retoma os passos que já valem; o evento se dispara de novo.
// · O movimento (C12): a fila que drena, o prazo que estoura e o ciclo que conclui
//   trocam o desenho, e o conteúdo esmaece (C12·4); o disparo troca o texto do
//   primário no lugar (C12·23); o prazo drena contínuo, um trecho linear por tique
//   (C12·40); o check do passo e o horário do evento esmaecem (as peças). Nada
//   anima ao abrir.
import { Fragment, useEffect, useRef, useState } from 'react'
import { BarraDoSistema, Faixa, CabecalhoConteudo, Prazo, BlocoEvento, Lista, LinhaChecagem, Rodape, ESTADOS, useTrocaDeQuadro } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import { minSeg } from '../../dados/formato.js'
import {
  REF, CASO_SEM_RESPOSTA, CASO_FORA, CASO_IDENTIFICADOR, PASSOS, PRAZO, EVENTO, TIQUE_MS, QUADRO_00, QUADRO_05,
  tiqueDoPasso, horaDoRecebido, ativoDe, parDaSessao, parDoCaso, casosDoPar, filaDoModulo, veredito,
  passosNaEntrada, passosFeitos, passosDoRegistro,
} from './ciclo.js'
import { T } from './textos.js'
import './t14.css'


// o quadro em que a tela abre. fase: 'drenando' (a fila sai do módulo) ·
// 'drenada' (o disparo acende) · 'correndo' (o prazo drena) · 'estourado' (o
// prazo acabou sem o evento) · 'concluido'. tique: os segundos de prazo desde o disparo.
function inicio(momento, est, unico) {
  const doCaso = { [REF.estourado]: CASO_SEM_RESPOSTA, [REF.fora]: CASO_FORA, [REF.identificador]: CASO_IDENTIFICADOR }[est]
    ?? (momento === REF.corrigida ? CASO_IDENTIFICADOR : null)
  const par = doCaso ? parDoCaso(doCaso) : parDaSessao(unico.sessao)
  // num estado da coluna, o caso vale sempre (a receita); no fluxo, uma vez por sessão
  const casos = casosDoPar(par, est ? [] : unico.casosConsumidos)
  const base = { par, casos, tentativa: 1, correcao: false }
  if (est === REF.estourado) return { ...base, fase: 'estourado', tique: PRAZO, passos: passosFeitos(casos.fora) }
  if (est != null || momento === REF.corrigida) {
    return { ...base, fase: 'correndo', tique: QUADRO_00, passos: passosNaEntrada(casos.fora), correcao: momento === REF.corrigida }
  }
  if (momento === REF.concluido) return { ...base, fase: 'concluido', tique: QUADRO_05, passos: passosFeitos(casos.fora) }
  if (EM_QUADRO) {
    return momento === REF.antes
      ? { ...base, fase: 'drenando', tique: 0, passos: passosNaEntrada(casos.fora) }
      : { ...base, fase: 'correndo', tique: QUADRO_00, passos: passosNaEntrada(casos.fora) }
  }
  // no fluxo, a entrada é a 01 (G27). Com o ciclo deste par já gravado, os passos
  // que valem ficam, e a correção pedida também; o ciclo concluído abre concluído
  const salvo = unico.etapas.ciclo
  if (salvo && salvo.ativoId === par.ativoId && salvo.moduloSerial === par.moduloSerial) {
    const retomado = { ...base, passos: passosDoRegistro(salvo), correcao: !!salvo.correcao }
    return salvo.concluido ? { ...retomado, fase: 'concluido', tique: QUADRO_05 } : { ...retomado, fase: 'drenando', tique: 0 }
  }
  return { ...base, fase: 'drenando', tique: 0, passos: passosNaEntrada(casos.fora) }
}

// o evento desta tentativa não vai chegar (o caso evento-sem-resposta, 1ª tentativa)
const semResposta = (f) => f.casos.semResposta && f.tentativa === 1
const recebido = (f) => !semResposta(f) && (f.fase === 'concluido' || (f.fase === 'correndo' && f.tique > EVENTO.recebidoAosSeg))
const conferido = (f) => !semResposta(f) && (f.fase === 'concluido' || (f.fase === 'correndo' && f.tique > EVENTO.conferidoAosSeg))
// o quadro chegou ao fim do que acontece sozinho: o evento conferido e nenhum passo por fazer
const assentado = (f) => conferido(f) && !f.passos.includes('pendente')

// um tique do prazo: os passos que chegaram na hora acendem; o prazo acaba sem
// o evento (02), ou os cinco passos e o evento fecham o ciclo (05)
function avancar(f) {
  if (f.fase !== 'correndo' || assentado(f)) return f
  const tique = f.tique + 1
  const passos = f.passos.map((e, i) => (e === 'pendente' && tique >= tiqueDoPasso(i) ? veredito(i, f.casos.fora) : e))
  const g = { ...f, tique, passos }
  if (semResposta(g) && tique >= PRAZO) return { ...g, tique: PRAZO, fase: 'estourado' }
  if (assentado(g) && passos.every((e) => e === 'aprovada') && !g.casos.cartao) return { ...g, fase: 'concluido' }
  return g
}

// o que fica gravado em etapas.ciclo (logica.md · o ciclo dinâmico)
function registro(f, fechado = false) {
  const evento = f.fase === 'estourado' ? 'nao-chegou' : conferido(f) ? 'conferido' : recebido(f) ? 'recebido'
    : f.fase === 'correndo' ? 'disparado' : 'antes'
  const { cartao } = f.casos
  return {
    ativoId: f.par.ativoId, moduloSerial: f.par.moduloSerial,
    passos: Object.fromEntries(PASSOS.map((p, i) => [p.id, f.passos[i]])),
    feitos: f.passos.filter((e) => e === 'aprovada').length, total: PASSOS.length,
    evento, tentativa: f.tentativa,
    cartao: cartao ? { cartaoId: cartao.cartaoId, estado: 'reprovada', lido: cartao.lido, esperado: cartao.esperado } : null,
    correcao: f.correcao && cartao ? { solicitadaAs: M.HORA_NOMINAL, lido: cartao.lido, esperado: cartao.esperado } : null,
    concluido: f.fase === 'concluido', fechado,
  }
}

export default function T14({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento, est, unico))
  const vivo = useRef(null)
  vivo.current = { fluxo, unico, momento }
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })

  // a fila do módulo drena antes do disparo; para no print e num estado da coluna
  useEffect(() => {
    if (EM_QUADRO || est != null || fluxo.fase !== 'drenando') return undefined
    const t = setTimeout(() => setFluxo((f) => (f.fase === 'drenando' ? { ...f, fase: 'drenada' } : f)), RITMOS.filaDrenagemMs)
    return () => clearTimeout(t)
  }, [fluxo.fase, est])

  // o prazo anda um segundo por tique, até o quadro assentar
  const correndo = !EM_QUADRO && est == null && fluxo.fase === 'correndo' && !assentado(fluxo)
  useEffect(() => {
    if (!correndo) return undefined
    const relogio = setInterval(() => setFluxo(avancar), TIQUE_MS)
    return () => clearInterval(relogio)
  }, [correndo])

  // o prazo estourou sem o evento: o caso fica consumido nesta sessão (G21)
  useEffect(() => {
    if (est != null || fluxo.fase !== 'estourado') return
    const u = vivo.current.unico
    if (!u.casosConsumidos.includes(CASO_SEM_RESPOSTA)) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...u.casosConsumidos, CASO_SEM_RESPOSTA] } })
  }, [fluxo.fase, est, despachar])

  // os cinco passos e o evento: a URL passa a dizer 05
  useEffect(() => {
    if (est != null || fluxo.fase !== 'concluido') return
    if (vivo.current.momento !== REF.concluido) despachar({ tipo: 'ir', tela: 'T14', momento: REF.concluido })
  }, [fluxo.fase, est, despachar])

  // o ciclo fica gravado no estado único a cada fato novo (etapas.ciclo)
  const fato = JSON.stringify(registro(fluxo))
  useEffect(() => {
    if (est != null) return
    const u = vivo.current.unico
    if (JSON.stringify(u.etapas.ciclo) === fato) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, ciclo: JSON.parse(fato) } } })
  }, [fato, est, despachar])

  // ── os toques ──
  const sair = (tela, fechado) => {
    const u = vivo.current.unico
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, ciclo: registro(vivo.current.fluxo, fechado) } } })
    ir(tela)
  }
  const disparar = () => {
    setFluxo((f) => ({ ...f, fase: 'correndo', tique: 0 }))
    if (momento != null) ir('T14') // a 01 ficou pra trás: a URL volta a ser a da tela
  }
  const dispararOutro = () => setFluxo((f) => ({ ...f, fase: 'correndo', tique: 0, tentativa: f.tentativa + 1 }))
  const encerrarCiclo = () => sair('T13', true)   // fecha a captura: os pendentes ficam pendentes na Seção E (T14·2)
  const irAoChecklist = () => sair('T13', false)  // sai com o ciclo aberto (T14·2)
  const solicitarCorrecao = () => {
    setFluxo((f) => ({ ...f, correcao: true }))
    ir('T14', { momento: REF.corrigida })
  }
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar sem homologar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()

  // ── o quadro ──
  const { par, casos, fase, tique, passos, correcao } = fluxo
  // O desenho de cada fase (C12·4, G26 · T14 01 → 00): o antes do disparo (a fila saindo do
  // módulo, com a frase dela no prazo e a espera no rodapé), o prazo (a fila drenada, o disparo
  // e o prazo correndo), o prazo estourado (a frase da Seção F e o disparar outro) e o ciclo
  // concluído (o rodapé troca inteiro). Quando um vira o outro — pelo processo (a fila que drena,
  // o prazo que acaba, o último passo) ou pelo toque (Disparar outro evento) —, o conteúdo
  // esmaece em 150, como entre telas; dentro de um, move só a peça: o disparo troca o texto do
  // primário no lugar e o prazo drena (C12·23, C12·40)
  const quadro = fase === 'drenando' ? 'antes' : fase === 'estourado' ? 'estourado' : fase === 'concluido' ? 'concluido' : 'prazo'
  useTrocaDeQuadro(quadro)
  const estourado = fase === 'estourado'
  const disparado = fase === 'correndo' || estourado || fase === 'concluido'
  const chegou = recebido(fluxo)
  const conferiu = conferido(fluxo)
  const total = PASSOS.length + (casos.cartao ? 1 : 0)
  const aprovados = passos.filter((e) => e === 'aprovada').length
  // o que resta do prazo; depois que o evento chega, a barra fica no que restava
  const restante = chegou ? PRAZO - EVENTO.recebidoAosSeg : disparado ? Math.max(0, PRAZO - tique) : PRAZO

  const prazo = (
    <Prazo
      rotulo={chegou ? T.chegouEm : T.prazo}
      nota={fase === 'drenando' ? T.filaDrenando : T.filaDrenada}
      tempo={minSeg(chegou ? EVENTO.recebidoAosSeg : restante)}
      restante={restante} limite={PRAZO} segue={TIQUE_MS}
      legendas={{ inicio: chegou ? T.disparadoAs(M.HORA_NOMINAL) : minSeg(0), fim: T.limite(PRAZO) }}
      detalhe={fase === 'drenando' ? T.filaSaindo(filaDoModulo(par.moduloSerial)) : estourado ? [T.secaoF, T.continuamValendo(PASSOS.length)] : null}
      falha={estourado}
    />
  )

  // o relógio de quem espera o servidor: 'em andamento' com o evento no ar; antes
  // do disparo, nada anda, e o leitor ouve 'ainda não' (G15, o nome segue o dado)
  const nomeEspera = disparado ? undefined : ESTADOS.espera.nome
  const evento = (
    <BlocoEvento rotulo={T.evento} linhas={[
      { texto: T.disparado, estado: disparado ? 'feito' : 'pronto', valor: M.HORA_NOMINAL },
      { texto: T.recebido, estado: estourado ? 'falha' : chegou ? 'feito' : 'aguarda', valor: estourado ? T.naoChegou : horaDoRecebido(), nome: nomeEspera },
      { texto: T.campos, estado: estourado ? 'parado' : conferiu ? 'feito' : 'aguarda', valor: T.conferidos(EVENTO.campos), nome: nomeEspera },
    ]} />
  )

  // os passos do veículo e, com o caso de identificador, o teste do cartão (T14·3).
  // No prazo estourado, a última linha leva a folga do pé do cartão (40, folha 4)
  const lista = (
    <Lista recheio="passos">
      {PASSOS.map((p, i) => {
        const e = passos[i]
        const ultima = i === PASSOS.length - 1 && !casos.cartao
        const reprovada = e === 'reprovada'
        return (
          <LinhaChecagem key={p.id} variante="passo" titulo={p.titulo}
            estado={e === 'pendente' ? 'ainda-nao' : e}
            glifo={e === 'pendente' ? 'relogio' : undefined} nomeGlifo={e === 'pendente' ? ESTADOS.espera.nome : undefined}
            causa={reprovada ? T.causaDoSinal(casos.fora) : undefined} recheioCausa={reprovada ? 'largo' : undefined}
            divisoria={!ultima} folgaFim={ultima && estourado} />
        )
      })}
      {casos.cartao && (
        <LinhaChecagem variante="passo" estado="reprovada" titulo={T.cartao} causa={T.leu(casos.cartao)} recheioCausa="justo" divisoria={false} />
      )}
    </Lista>
  )

  // O voltar do Android (logica.md): no computador, o Esc — o mesmo que o link de
  // saída do rodapé: 'Ir para o checklist' (sai com o ciclo aberto, T14·2) e, no
  // ciclo concluído, 'Voltar ao menu'. Com o caso de identificador, o link do
  // rodapé é o pedido de correção, que não sai: o voltar não faz nada (como o menu
  // da T04). Num estado da coluna, o celular não toca, e a peça não escuta.
  useVoltar(fase === 'concluido' ? () => ir('T04') : casos.cartao && fase === 'correndo' ? null : irAoChecklist)

  let rodape
  if (fase === 'drenando') {
    rodape = <Rodape legenda={T.esperaFila} primario={T.disparar} primarioDesabilitado link={T.irAoChecklist} aoLink={irAoChecklist} />
  } else if (fase === 'drenada') {
    // o disparo troca o texto do primário no lugar (C12·23): Disparar evento de teste → Encerrar o ciclo
    rodape = <Rodape primario={T.disparar} aoPrimario={disparar} primarioTrocaTexto link={T.irAoChecklist} aoLink={irAoChecklist} />
  } else if (estourado) {
    rodape = <Rodape primario={T.dispararOutro} aoPrimario={dispararOutro} link={T.irAoChecklist} aoLink={irAoChecklist} />
  } else if (fase === 'concluido') {
    rodape = <Rodape primario={T.voltarAoChecklist} aoPrimario={() => ir('T13')} link={T.voltarAoMenu} aoLink={() => ir('T04')} />
  } else if (casos.cartao) {
    rodape = (
      <Rodape primario={T.encerrarCiclo} aoPrimario={encerrarCiclo} primarioTrocaTexto
        link={correcao ? T.solicitada(M.HORA_NOMINAL) : T.solicitar} aoLink={solicitarCorrecao} linkRegistrado={correcao} />
    )
  } else {
    rodape = <Rodape primario={T.encerrarCiclo} aoPrimario={encerrarCiclo} primarioTrocaTexto link={T.irAoChecklist} aoLink={irAoChecklist} />
  }

  return (
    <div className="t14">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      <Faixa serial={par.moduloSerial} placa={ativoDe(par.ativoId).placa} acao={T.encerrar} aoEncerrar={enc.encerrar} />
      {/* o miolo e o rodapé nascem com o quadro: dentro da troca, nada anda nem esmaece de novo por
          dentro (o passo que fecha o ciclo, o prazo que acaba) */}
      <div className="tela-miolo t14-miolo">
        <Fragment key={quadro}>
          <CabecalhoConteudo titulo={T.titulo} contagem={aprovados} unidade={T.dePassos(total)} />
          {prazo}
          {evento}
          {lista}
        </Fragment>
      </div>
      <Fragment key={quadro}>{rodape}</Fragment>
      {enc.sobre}
    </div>
  )
}
