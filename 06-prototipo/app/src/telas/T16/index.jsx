// T16 · Sessão (02-telas/T16-sessao): encerrar a sessão provando que a
// configuração sobreviveu ao desligar, e devolver a sessão que caiu no meio.
// · Com a sessão homologada (o ENCERRAR de toda tela, a T13): os passos 1 a 7
//   correm em "Encerrar sessão", um a cada RITMOS.encerramentoPassoMs, desde o
//   passo 1 (G27); a 00 é o quadro com a releitura correndo. O passo 2, o reinício,
//   é automático (a rodada 1 do retorno do PM): *Reiniciando o módulo…*, e *de volta*;
//   a conexão que cai nele diz *Reconectando…*, nunca falha (a 08, só pelo endereço:
//   nenhum caso derruba a conexão). O passo que corre leva a legenda dele embaixo
//   do nome. Ao fechar o 7, a sessão sai do estado
//   único, e a aberta sobe e revela a faixa "sem sessão" (C12·25, na peça); a tela
//   passa pra "Sessão encerrada" (a troca de quadro, C12·4), onde as sete assertivas
//   acendem, uma a cada RITMOS.autotesteAssertivaMs — o autoteste correndo (07): os
//   três contadores das que já acenderam, a da vez com o quadrado de agora e
//   *conferindo*, as seguintes com o relógio e o traço, e o Voltar ao menu no lugar,
//   desligado. Na última, o quadro troca (C12·4) pro fim: a *Instalação homologada*,
//   com o horário — a única tela com a palavra (a rodada 1) —, ou a homologação
//   bloqueada com a causa (05, HU-T16-5), e o Voltar ao menu aceso.
// · Antes de homologar (ENCERRAR → 03, G23): os 4 passos da sessão abortada —
//   quem pediu já confirmou, no diálogo Encerrar antes de terminar? (decisão 36) ou
//   num dos do menu —, e depois a encerrada sem homologar (04). Quando quem
//   pediu foi um diálogo do menu (sair da conta, trocar de unidade ou de
//   empresa), o destino
//   está no estado único (etapas.encerramento.destino) e a tela segue pra ele
//   depois dos 4 passos.
// · A sessão interrompida (06), pela receita: Retomar reabre a T09 no bloco
//   que parou (o Leitor); Descartar volta ao menu sem sessão, sem item de
//   fila (T16·5); o voltar não faz nada (T16·6).
// · No print (EM_QUADRO), cada momento fica parado no quadro da referência;
//   num estado da coluna, o quadro final, parado, sem relógio.
// · O padrão da T16/02, como as referências da otimizacao300000000 desenham: o
//   miolo tem o vão de 14 nas sete (t16.css); o subtítulo entra no bloco do
//   título, a 4 dele, na 03 como na 06; a nota do que não rodou (04) é uma peça
//   só, a nota tracejada com uma frase de 13 e sem o rótulo, equilibrada nas
//   duas linhas; e o passo pulado da 03 leva o traço da folha 5 — o 'não se
//   aplica' é só das assertivas do autoteste (02, 05), e o '—', do passo que
//   ainda não chegou (00, 01).
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Encerramento, Lista, LinhaChecagem, Prova, Aviso, Nota, Rodape, useTrocaDeQuadro, ESTADOS,
} from '../../ds/index.js'
import { useEstado, estadoVazio } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { SEMENTES } from '../../estado/sementes.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import {
  REF, CASO_FALHA, CASO_INTERROMPIDA, REINICIO, AUTOTESTE, QUADRO_00, QUADRO_03, QUADRO_07, SEGUROS, TOTAL_ASSERTIVAS, CAUSA,
  placaDe, moduloDoAtivo, parDoReinicio, passosEncerrando, passosAbortando, blocosRelidos, assertivas, contadoresDas,
  interrompida,
} from './dados.js'
import { T, PASSOS } from './textos.js'
import './t16.css'

// o par módulo × ativo da sessão; sem sessão, o da semente (o herói)
const parDe = (s) => {
  const base = s?.moduloSerial ? s : SEMENTES.T16.sessao
  return { moduloSerial: base.moduloSerial, ativoId: base.ativoId }
}

// O quadro em que a tela abre, pelo momento ou pelo estado (a URL, o palco).
//   encerrando · { k }        o passo que corre, 0 a 6 (os passos 1 a 7)
//   autoteste  · { acesas }   quantas assertivas já acenderam
//   encerrada  ·              as 8 acesas, com a prova ou o bloqueio
//   abortando  · { feitos }   quantos dos 4 seguros já fecharam
//   abortada   ·              a encerrada sem homologar
//   interrompida ·            a sessão que caiu (06)
function inicio(momento, est, unico) {
  if (est === REF.falhando) {
    const { ativoId } = M.casos[CASO_FALHA]
    return { fase: 'encerrada', par: { ativoId, moduloSerial: moduloDoAtivo(ativoId) }, versao: blocosRelidos() }
  }
  if (est === REF.interrompida) return { fase: 'interrompida', par: null }
  const par = parDe(unico.sessao)
  // a prova da sessão encerrada: os 6 blocos relidos (decisão 49 · o módulo não guarda versão)
  const versao = blocosRelidos()
  if (momento === REF.reiniciando || momento === REF.reconectando) {
    // o 01 e o 08 (a rodada 1): o reinício, no par que a referência desenha, parados
    const uoId = unico.contexto.uoId ?? M.contextoAtivo.uoId
    return { fase: 'encerrando', par: parDoReinicio(uoId) ?? par, k: REINICIO, versao, reconectando: momento === REF.reconectando, parado: true }
  }
  if (momento === REF.encerrada) return { fase: 'encerrada', par, versao }
  // a 07 pelo endereço: o autoteste parado nos Pontos de cerca, como todo momento
  if (momento === REF.autoteste) return { fase: 'autoteste', par, acesas: QUADRO_07, versao, parado: true }
  if (momento === REF.encerradaSemHomologar) return { fase: 'abortada', par }
  if (momento === REF.semHomologar) {
    return { fase: 'abortando', par, feitos: EM_QUADRO ? QUADRO_03 : 0, destino: unico.etapas.encerramento?.destino ?? null }
  }
  return { fase: 'encerrando', par, k: EM_QUADRO ? QUADRO_00 : 0, versao }
}

// o passo seguinte do processo que anda sozinho
function proximo(f) {
  if (f.fase === 'encerrando') {
    const k = f.k + 1
    return k >= AUTOTESTE ? { ...f, fase: 'autoteste', acesas: 0 } : { ...f, k }
  }
  if (f.fase === 'autoteste') {
    const acesas = f.acesas + 1
    // a oitava: o fim — e o traço do veredito se desenha, uma vez (o pacote 9: só no fluxo)
    return acesas >= TOTAL_ASSERTIVAS ? { ...f, fase: 'encerrada', desenha: true } : { ...f, acesas }
  }
  if (f.fase === 'abortando') {
    const feitos = f.feitos + 1
    return feitos >= SEGUROS.length ? { ...f, fase: 'abortada' } : { ...f, feitos }
  }
  return f
}
const RITMO = { encerrando: RITMOS.encerramentoPassoMs, autoteste: RITMOS.autotesteAssertivaMs, abortando: RITMOS.encerramentoPassoMs }

// O desenho de cada fase (C12·4): o encerramento (00 e 01, o corte é um passo dele), a
// sessão encerrada (o autoteste que corre e o fim, 02 e 05), os 4 passos sem homologar (03),
// a encerrada sem homologar (04) e a interrompida (06). Quando um vira o outro, na frente de
// quem olha, o conteúdo esmaece em 150, como entre telas (src/ds/chrome/Troca.jsx); o que
// muda dentro de uma fase move só a peça.
const QUADRO = { encerrando: 'encerrando', autoteste: 'autoteste', encerrada: 'encerrada', abortando: 'abortando', abortada: 'abortada', interrompida: 'interrompida' }

export default function T16({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento, est, unico))
  const vivo = useRef(null)
  vivo.current = { fluxo, unico, momento }
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const vazio = estadoVazio()

  // Ao abrir pelo endereço, o estado único segue o quadro (G20): o 01 é a sessão
  // do KNB-5H39 · M2C-0371, e no 02 e no 04 a sessão já acabou. Num estado da
  // coluna, o app fica parado, e o estado único também.
  useEffect(() => {
    if (est != null) return
    const { fluxo: f, unico: u } = vivo.current
    if (f.fase === 'encerrando' && u.sessao?.moduloSerial !== f.par.moduloSerial) {
      despachar({ tipo: 'mesclar', parcial: { sessao: { ...(u.sessao ?? SEMENTES.T16.sessao), ...f.par } } })
    }
    if ((f.fase === 'autoteste' || f.fase === 'encerrada' || f.fase === 'abortada') && u.sessao) {
      despachar({ tipo: 'mesclar', parcial: { sessao: null, etapas: estadoVazio().etapas } })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // O processo anda sozinho no ritmo de ritmos.js; para no print e num estado.
  // A cada passo, o estado único e a URL seguem o quadro.
  const correndo = !EM_QUADRO && est == null && RITMO[fluxo.fase] != null && !fluxo.parado
  useEffect(() => {
    if (!correndo) return undefined
    const relogio = setInterval(() => {
      const { fluxo: f, momento: m } = vivo.current
      const n = proximo(f)
      const fim = { sessao: null, etapas: estadoVazio().etapas }
      // os 4 passos pedidos por um diálogo do menu: segue pro destino (G23)
      if (f.fase === 'abortando' && n.fase === 'abortada' && f.destino) {
        despachar({ tipo: 'mesclar', parcial: { ...fim, contexto: f.destino.contexto } })
        despachar({ tipo: 'ir', tela: f.destino.tela })
        return
      }
      setFluxo(n)
      // ao fechar o 7, a sessão acaba: sai do estado único, e a faixa fica sem sessão
      if (f.fase === 'encerrando' && n.fase === 'autoteste') {
        despachar({ tipo: 'mesclar', parcial: fim })
        despachar({ tipo: 'ir', tela: 'T16', momento: REF.autoteste })
      }
      // a última assertiva: o fim — a 02, ou, com a falha, a tela sem momento (a 05 é estado)
      if (f.fase === 'autoteste' && n.fase === 'encerrada') {
        const falha = assertivas(f.par.ativoId).some((a) => a.estado === 'reprovada')
        despachar({ tipo: 'ir', tela: 'T16', momento: falha ? undefined : REF.encerrada })
      }
      if (f.fase === 'abortando' && n.fase === 'abortada') {
        despachar({ tipo: 'mesclar', parcial: fim })
        despachar({ tipo: 'ir', tela: 'T16', momento: REF.encerradaSemHomologar })
      }
    }, RITMO[fluxo.fase])
    return () => clearInterval(relogio)
  }, [correndo, fluxo.fase, despachar])

  // ── os toques ──
  const voltarAoMenu = () => {
    despachar({ tipo: 'mesclar', parcial: { sessao: null, etapas: vazio.etapas } })
    ir('T04')
  }
  // T16·5 (a): Retomar reabre a T09 no bloco que parou, com a sessão do caso e os
  // blocos que já confirmaram; Descartar volta ao menu sem sessão e sem item de fila
  const retomar = () => {
    const c = M.casos[CASO_INTERROMPIDA]
    despachar({
      tipo: 'mesclar',
      parcial: {
        sessao: { ...(unico.sessao ?? SEMENTES.T16.sessao), moduloSerial: c.moduloSerial, ativoId: c.ativoId, saude: 'ok', abertaAs: c.iniciadaAs },
        etapas: { ...vazio.etapas, cadeia: { confirmados: c.confirmados } },
      },
    })
    ir('T09')
  }
  const descartar = voltarAoMenu

  const { fase, par } = fluxo
  const quadro = QUADRO[fase]
  useTrocaDeQuadro(quadro)
  const fechada = fase === 'encerrada' || fase === 'abortada'
  // O voltar do Android (logica.md): no encerramento e no autoteste ele não faz
  // nada; na sessão interrompida também não (T16·6). Na sessão encerrada, faz o
  // mesmo que o Voltar ao menu, a saída do rodapé. Num estado da coluna, a peça não escuta
  useVoltar(fechada ? voltarAoMenu : null)

  // ── o topo: a faixa sem ação enquanto a sessão fecha; depois, sem sessão ──
  // (C12·25: quando a sessão fecha na frente de quem olha, a aberta sobe por baixo da barra e
  // revela a sem sessão, que já está no lugar — o movimento é da peça, src/ds/chrome/Faixa.jsx)
  const viva = fase === 'encerrando' || fase === 'abortando'
  const faixa = viva
    ? <Faixa serial={par.moduloSerial} placa={placaDe(par.ativoId)} />
    : <Faixa estado="sem-sessao" fato={T.semSessao} revela />

  let miolo
  let rodape
  if (fase === 'encerrando') {
    // o reinício (a rodada 1): o primário apagado diz *Reiniciando o módulo…*, ou *Reconectando…*,
    // e o texto troca no lugar (C12·23)
    const reiniciando = fluxo.k === REINICIO
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.encerrar} contagem={fluxo.k + 1} unidade={T.deTotal(PASSOS.length)} />
        <Encerramento justo={reiniciando} passos={passosEncerrando(fluxo.k, !!fluxo.reconectando)} />
      </>
    )
    const primario = reiniciando ? (fluxo.reconectando ? T.reconectandoRodape : T.reiniciandoOModulo) : T.encerrandoNaoDesconecte
    rodape = <Rodape primario={primario} primarioDesabilitado primarioTrocaTexto explicacao={T.saidaAutoteste} />
  } else if (fase === 'abortando') {
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.encerrar} contagem={fluxo.feitos} unidade={T.deTotal(SEGUROS.length)} subtitulo={T.semHomologar} />
        <Encerramento justo passos={passosAbortando(fluxo.feitos)} />
      </>
    )
    rodape = <Rodape primario={T.encerrandoNaoDesconecte} primarioDesabilitado explicacao={T.saidaDesconectar} />
  } else if (fase === 'autoteste' || fase === 'encerrada') {
    // as 8 assertivas, cada uma com o valor lido; a falha mora na assertiva (Lei 2)
    const lista = assertivas(par.ativoId)
    const acesas = fase === 'encerrada' ? lista.length : fluxo.acesas
    const pronta = fase === 'encerrada'
    const reprovadas = lista.filter((a) => a.estado === 'reprovada')
    const falha = reprovadas.length > 0
    const ultima = lista.length - 1
    // os três contadores das que já acenderam (a rodada 1): nunca *x de y*
    const linha = (a, i) => {
      if (pronta || i < acesas) return { estado: a.estado, glifo: a.glifo, nomeGlifo: a.nomeGlifo, valor: a.valor, porque: a.porque }
      if (i === acesas) return { estado: 'agora', valor: T.conferindo }
      return { estado: 'ainda-nao', glifo: 'relogio', nomeGlifo: ESTADOS.espera.nome, valor: T.aindaNao }
    }
    const contadores = contadoresDas(lista.slice(0, acesas))
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.encerrada} />
        {pronta && !falha && <Prova tipo="sessao" rotulo={T.homologada} versao={T.as(M.HORA_NOMINAL)} legenda={T.sobreviveu} desenha={!!fluxo.desenha && !EM_QUADRO && est == null} />}
        <p className="t16-contadores">
          {contadores.map((c, k) => (
            <Fragment key={c.texto}>{k > 0 && ' · '}<strong>{c.n}</strong> {c.texto}</Fragment>
          ))}
        </p>
        <Lista>
          {lista.map((a, i) => (
            /* a de 50, e a com o porquê embaixo, de 58 (o reset que não se aplica, o cartão pendente) */
            <LinhaChecagem key={a.id} variante={a.porque && (pronta || i < acesas) ? 'recebimento' : 'dupla'} titulo={a.titulo} {...linha(a, i)}
              className={!pronta && i > acesas ? 't16-assertiva-espera' : (pronta || i < acesas) && a.estado === 'nao-se-aplica' ? 't16-assertiva-nsa' : undefined}
              divisoria={i < ultima} />
          ))}
        </Lista>
        {pronta && (falha
          ? <Aviso tom="falha" bloqueio titulo={T.bloqueada} frase={CAUSA[reprovadas[0].id]} />
          : <span className="t16-nota">{T.notaCartao}</span>)}
      </>
    )
    // o Voltar ao menu fica no lugar, apagado e desabilitado, com o mesmo texto, e acende
    // por uma camada quando chega a última (C12·44, C12·8)
    rodape = <Rodape primario={T.voltarAoMenu} aoPrimario={voltarAoMenu} primarioDesabilitado={!pronta} primarioAcende />
  } else if (fase === 'abortada') {
    // os 4 que deixam o módulo seguro, feitos, e o que não rodou
    const ultima = SEGUROS.length - 1
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.encerrada} />
        <Aviso tom="neutro" glifo="pausa" titulo={T.semHomologarRotulo} frase={T.continuaAberta} />
        <Lista>
          {SEGUROS.map((p, i) => (
            <LinhaChecagem key={p.id} variante="dupla" titulo={p.nome} valor={p.feito}
              divisoria={i < ultima} folgaFim={i === ultima ? 'assertiva' : false} />
          ))}
        </Lista>
        <Nota tom="explica" corpo="pulado" frase={T.naoRodaram} />
      </>
    )
    rodape = <Rodape primario={T.voltarAoMenu} aoPrimario={voltarAoMenu} />
  } else {
    // a sessão interrompida (06): os seis blocos da T09 no desenho do encerramento (T16-V1)
    const s = interrompida()
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.interrompida} contagem={s.confirmados} unidade={T.deTotal(s.total)} subtitulo={s.subtitulo} />
        <Encerramento justo passos={s.blocos} />
      </>
    )
    rodape = <Rodape primario={T.retomar} aoPrimario={retomar} link={T.descartar} aoLink={descartar} />
  }

  return (
    <div className="t16">
      <BarraDoSistema fundo="faixa" />
      {faixa}
      <div className="tela-miolo">{miolo}</div>
      {/* o rodapé nasce com o quadro: dentro da troca, o texto do primário não esmaece de novo */}
      <Fragment key={quadro}>{rodape}</Fragment>
    </div>
  )
}
