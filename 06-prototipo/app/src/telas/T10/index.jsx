// T10 · Calibração (02-telas/T10-calibracao): o módulo passa a contar o mesmo
// que o painel do veículo, com a foto do painel como prova.
// · As grandezas e a ordem: o cadastro do modelo do ativo da sessão, menos as
//   que o módulo não mede (T10·1, calibracao.js). O 'Depois:' mostra só a
//   próxima (T10·2); a 03 mantém o texto dela, com todas as que faltam.
// · Fotografar o painel (o cartão inteiro, G14) → a foto entra, e vale também
//   no item da Seção B do checklist: etapas.calibracao.foto, com o id do item
//   (HU-T10-4). Foto e semear não dependem uma da outra (T10·3).
// · Semear → em sequência (T10·4): o tambor troca o número do módulo pelo do
//   painel (a roda de dígito, G29: 300ms por rodinha e 40 entre elas, dos
//   tokens); depois a releitura confere e a régua vira 'confere' (300ms); o
//   primário fica inerte, com o mesmo texto, e no fim troca pro passo
//   seguinte. A calibração vai pro estado único (etapas.calibracao) e a URL
//   diz 01. O movimento fino (o tambor rolando, a régua encolhendo) é do C12.
// · O passo do horímetro não tem referência: monta-se com as peças e os
//   textos que existem, e o semear dele, sem texto, fica com o primário
//   desabilitado e o mesmo rótulo (G25).
// · Os estados da coluna, parados, pelo dado da receita (calibracao.js): o
//   02 e o 03 no a-09, o 04 no a-22 (G21). Mudam o conteúdo; onde a
//   referência remonta (a foto some, a linha 'Depois' some), ela é construída
//   fiel (G24).
// · ENCERRAR, antes de homologar, é a sessão abortada da T16 (G23); depois,
//   o encerramento. Voltar ao menu → T04.
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, Segmentado, ValorEmPoco, ReguaDiferenca, ValorAlvo, FotoProva, Declarado, Rodape,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { milhar } from '../../dados/formato.js'
import {
  REF, grandezaDe, ativoDe, grandezasDoPar, moduloConta, painelMostra, semeadoHa, releitura, secaoDaFoto, mundoDoEstado,
} from './calibracao.js'
import { T } from './textos.js'
import './t10.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)

// os tempos do semear saem dos tokens (G29, T10·4) e zeram com reduzir movimento
const token = (nome) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(nome)) || 0
const tempoDoTambor = (texto) => {
  const rodas = String(texto).replace(/\D/g, '').length
  return token('--mov-lento') + Math.max(0, rodas - 1) * token('--mov-escalonar-tambor')
}
const tempoDaRegua = () => token('--mov-lento')

// as fases do passo atual: pronta → escrevendo (o tambor) → relendo (a régua) → semeada
const RELIDO = ['relendo', 'semeada']
const ESCRITO = ['escrevendo', ...RELIDO]
const partida = (g) => grandezaDe(g)?.natureza === 'partida'

// o quadro em que a tela abre. No estado da coluna, o do caso, parado. No
// fluxo, o que o estado único guardou desta calibração; na 01, o hodômetro
// semeado com a foto tirada (T10·3: a 01 exata é foto + semear).
function inicio({ momento, est, ordem, etapa, ativoId }) {
  const vazio = { atual: 0, semeadas: {}, foto: false, fase: 'pronta' }
  if (est) return vazio
  const g = etapa && etapa.ativoId === ativoId ? etapa : null
  const base = g ? { ...vazio, atual: Math.max(0, ordem.indexOf(g.passo)), semeadas: { ...g.semeadas }, foto: !!g.foto } : vazio
  if (momento === REF.semeado && partida(ordem[0])) {
    return { ...base, atual: 0, semeadas: { ...base.semeadas, [ordem[0]]: true }, foto: true, fase: 'semeada' }
  }
  return { ...base, fase: base.semeadas[ordem[base.atual]] ? 'semeada' : 'pronta' }
}

export default function T10({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const mundo = est ? mundoDoEstado(est, SEMENTES.T10.contexto.uoId) : null
  const sessao = mundo
    ? { ...SEMENTES.T10.sessao, ativoId: mundo.ativoId, moduloSerial: mundo.moduloSerial }
    : (unico.sessao?.ativoId ? unico.sessao : SEMENTES.T10.sessao)
  const { ativoId } = sessao
  const par = grandezasDoPar(ativoId, sessao.moduloSerial)
  const ordem = mundo ? mundo.ordem : par.calibraveis
  const [fluxo, setFluxo] = useState(() => inicio({ momento, est, ordem, etapa: unico.etapas.calibracao, ativoId }))
  const vivo = useRef(null)
  vivo.current = unico
  const relogios = useRef([])
  useEffect(() => () => relogios.current.forEach(clearTimeout), [])

  // a calibração no estado único (etapas.calibracao) — só no fluxo
  function gravar(mudanca) {
    if (est) return
    const e = vivo.current
    const antes = e.etapas.calibracao?.ativoId === ativoId ? e.etapas.calibracao : null
    const calibracao = {
      ativoId, moduloSerial: sessao.moduloSerial, itemChecklist: M.calibracao.itemChecklist.id,
      foto: false, passo: ordem[fluxo.atual], semeadas: {}, ...antes, ...mudanca(antes),
    }
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...e.etapas, calibracao } } })
  }
  const semeadaNoEstado = (antes, g) => {
    const r = releitura(ativoId, g)
    return { semeadas: { ...antes?.semeadas, [g]: { painel: painelMostra(ativoId, g), relido: r?.valor, confere: !!r?.confere, as: M.HORA_NOMINAL } }, passo: g }
  }

  // a 01 aberta pela URL ou pelo palco é o fluxo depois dos dois toques: grava o que eles gravariam
  useEffect(() => {
    if (est || momento !== REF.semeado || fluxo.fase !== 'semeada') return
    const g = ordem[fluxo.atual]
    gravar((antes) => ({ ...semeadaNoEstado(antes, g), foto: true }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const g = ordem[fluxo.atual]
  const gr = grandezaDe(g) ?? { natureza: 'partida' }
  const ajuste = gr.natureza === 'ajuste'
  const { fase, foto } = fluxo

  // ── os toques ──
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const encerrar = () => (unico.etapas.checklist?.homologada ? ir('T16') : ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR }))
  // O voltar do Android (logica.md): o Voltar ao menu, o link de saída do rodapé,
  // em todo passo — e a calibração volta de onde parou
  useVoltar(() => ir('T04'))
  function fotografar() {
    setFluxo((f) => ({ ...f, foto: true }))
    gravar(() => ({ foto: true }))
  }
  function semear() {
    const passo = g
    setFluxo((f) => ({ ...f, fase: 'escrevendo' }))
    relogios.current.push(setTimeout(() => {
      setFluxo((f) => ({ ...f, fase: 'relendo' }))
      relogios.current.push(setTimeout(() => {
        setFluxo((f) => ({ ...f, fase: 'semeada', semeadas: { ...f.semeadas, [passo]: true } }))
        gravar((antes) => semeadaNoEstado(antes, passo))
        if (passo === 'hodometro') ir('T10', { momento: REF.semeado })
      }, tempoDaRegua()))
    }, tempoDoTambor(milhar(painelMostra(ativoId, passo)))))
  }
  function proximo() {
    const atual = fluxo.atual + 1
    setFluxo((f) => ({ ...f, atual, fase: f.semeadas[ordem[atual]] ? 'semeada' : 'pronta' }))
    gravar(() => ({ passo: ordem[atual] }))
    ir('T10') // o passo seguinte não tem referência: a URL sai da 01
  }
  // a volta pelo menu reabre no quadro guardado (etapas.calibracao); se é o
  // hodômetro semeado, a URL segue o quadro, como no toque que leva à 01
  useEffect(() => {
    if (!est && !momento && fluxo.fase === 'semeada' && g === 'hodometro') ir('T10', { momento: REF.semeado })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── o segmentado: um segmento por passo; o que já foi relido fica feito, e
  // o atual feito continua alto (a 01) ──
  const feito = (x, i) => fluxo.semeadas[x] || (i === fluxo.atual && RELIDO.includes(fase))
  const segmentos = ordem.map((x, i) => {
    if (i === fluxo.atual) return feito(x, i) ? 'atual-feito' : 'atual'
    return feito(x, i) ? 'feito' : 'pendente'
  })
  const restantes = ordem.slice(fluxo.atual + 1).map((x) => grandezaDe(x).rotulo)
  const legenda = restantes.length ? T.depois(est === REF.jaSemeado ? restantes : restantes.slice(0, 1)) : undefined

  // ── os números ──
  const conta = ajuste ? null : moduloConta(ativoId, g)
  const painel = ajuste ? null : painelMostra(ativoId, g)
  const rel = ajuste ? null : releitura(ativoId, g)
  const relido = RELIDO.includes(fase) && !!rel?.confere
  const escrito = ESCRITO.includes(fase)
  const dias = semeadoHa(ativoId, g)
  let valorModulo = T.vazio
  if (relido) valorModulo = milhar(rel.valor)
  else if (escrito && painel != null) valorModulo = milhar(painel)
  else if (conta != null) valorModulo = milhar(conta)

  let regua
  if (relido) regua = <ReguaDiferenca confere>{T.relido(M.HORA_NOMINAL)}</ReguaDiferenca>
  else if (ajuste) regua = <ReguaDiferenca>{T.ligueMotor}</ReguaDiferenca>
  else if (conta != null && painel != null) {
    regua = <ReguaDiferenca>{[T.diferenca(milhar(painel - conta), gr.unidade), ...(dias != null ? [T.semeadoHa(dias)] : [])].join(T.entre)}</ReguaDiferenca>
  } else regua = <ReguaDiferenca /> // sem o número no mock: só os traços

  let alvoLegenda = T.alvoVai
  if (relido) alvoLegenda = T.alvoCumprido
  else if (ajuste) alvoLegenda = T.alvoAjuste[g]

  // ── o rodapé ──
  const rotuloSemear = dias != null ? T.semearDeNovo : T.semear[g]
  const rotuloDoPasso = rotuloSemear ?? T.calibrar[g] // G25: sem o texto do semear, o mesmo rótulo que trouxe aqui
  const seguinte = ordem[fluxo.atual + 1]
  let primario
  if (ajuste) primario = { rotulo: T.calibrar[g], desabilitado: true } // o módulo ainda não lê: o motor desligado (HU-T10-2)
  else if (fase === 'pronta') primario = { rotulo: rotuloDoPasso, aoTocar: semear, desabilitado: !rotuloSemear || conta == null || painel == null }
  else if (fase !== 'semeada') primario = { rotulo: rotuloDoPasso, inerte: true }
  else if (seguinte && T.calibrar[seguinte]) primario = { rotulo: T.calibrar[seguinte], aoTocar: proximo }
  else primario = { rotulo: rotuloDoPasso, desabilitado: true } // G25: nada desenhado depois do último passo

  return (
    <div className="t10">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      <Faixa serial={sessao.moduloSerial} placa={ativoDe(ativoId)?.placa} acao={T.encerrar} aoEncerrar={encerrar} />
      <div className="tela-miolo t10-miolo">
        <Segmentado rotulo={T.rotulo} contagem={String(fluxo.atual + 1)} total={T.deTotal(ordem.length)} segmentos={segmentos} legenda={legenda} />
        <h1 className="t10-titulo">{gr.rotulo}</h1>
        {/* a chave é a grandeza: o tambor rola no semear, não na troca de passo */}
        <ValorEmPoco key={g} rotulo={relido ? T.moduloAgora : ajuste ? T.moduloLe : T.moduloConta} valor={valorModulo} unidade={gr.unidade}
          tom={relido ? 'ativo' : 'apagado'} />
        {regua}
        <ValorAlvo rotulo={T.painel} valor={painel != null ? milhar(painel) : T.vazio} unidade={gr.unidade} legenda={alvoLegenda} cumprido={relido} />
        {!ajuste && (
          <FotoProva titulo={T.foto} legenda={foto ? T.fotoTirada(secaoDaFoto()) : T.fotoLegenda} situacao={foto ? T.fotografada : T.aguarda}
            tirada={foto} aoTocar={fotografar} rotulo={T.fotografar} />
        )}
        {par.naoSeAplicam.length > 0 && (
          <Declarado aoPe rotulo={par.doModulo ? T.naoSeAplicam : T.naoSeAplicamModelo} divisoriaNoFim={ajuste}
            linhas={par.naoSeAplicam.map((l) => ({ nome: l.nome, motivo: l.motivo }))} />
        )}
      </div>
      <Rodape primario={primario.rotulo} aoPrimario={primario.aoTocar} primarioDesabilitado={!!primario.desabilitado} primarioInerte={!!primario.inerte}
        link={T.voltar} aoLink={() => ir('T04')} />
    </div>
  )
}
