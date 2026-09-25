// T10 · Calibração (02-telas/T10-calibracao): o módulo passa a contar o mesmo
// que o painel do veículo — e só semeia com a prova (decisão 33, a entrega do
// design de 25/09).
// · As grandezas e a ordem: o cadastro do modelo do ativo da sessão, menos as
//   que o módulo não mede (T10·1, calibracao.js). O 'Depois:' mostra só a
//   próxima (T10·2); a 03 mantém o texto dela, com todas as que faltam. Sem
//   próxima, 'Último passo' (08), e com tudo semeado, 'Calibração completa' (09).
// · O campo do painel (o valor alvo, com o teclado numérico): o técnico digita
//   o que o painel mostra. O botão só acende com o número digitado E a foto, e
//   sempre diz o que falta: Digite o que o painel mostra → Fotografe o painel →
//   Semear o hodômetro.
// · Fotografar o painel (o cartão inteiro) → a câmera do próprio app (06, o
//   quadro parado feito em código, ds/checklist/VisorCamera) → Tirar foto → volta com o
//   registro no lugar do cartão, sem toque: foto tirada fica tirada. A foto
//   leva a hora, o técnico, o ativo e o módulo carimbados, e vale também no
//   item da Seção B do checklist (etapas.calibracao, HU-T10-4). Voltar à
//   calibração (e o voltar do sistema) sai da câmera sem foto.
// · A câmera sem a permissão (11, o mundo real · estado/camera.js): o visor diz
//   o que falta, com a câmera riscada, e o primário vira Abrir as configurações
//   — o Android abre a página do app; permitida lá, a câmera abre na volta, com
//   o Tirar foto. O Voltar à calibração continua. Só o estado da coluna chega
//   nela (o caso camera-sem-permissao): o protótipo não tem o pedido do Android.
// · Semear → Gravando no módulo… → Relendo… (1 s + 1 s, ritmos.js) → o tambor
//   rola até o relido e a tela vira o semeado (01), ou, com a releitura acima
//   da tolerância, o não confere (10), que pede Semear de novo — a foto
//   continua valendo. O movimento fino (o tambor, a régua encolhendo) é do C12.
//   O semear grava no módulo e não para (a decisão do diretor de 25/09): nos
//   2 s, o Voltar ao menu fica no lugar, desabilitado de verdade e em tinta
//   apagada, e o voltar do sistema não faz nada, como a releitura da T08. O
//   ENCERRAR faz o mesmo que o voltar: apagado, e não faz nada (a lei 17).
// · O horímetro (08): o mesmo fluxo, com o número dele, até a calibração
//   completa (09), que aponta o ciclo (a entrega do checklist, decisão 35):
//   Fazer o ciclo dinâmico → T14, e Voltar ao menu → T04, embaixo.
// · A calibração vai pro estado único (etapas.calibracao: o digitado, a foto e
//   o semeado de cada grandeza) e volta de onde parou; a URL diz o quadro da
//   referência em que o passo está (calibracao.js, quadroDe).
// · Os estados da coluna, parados, pelo dado da receita (calibracao.js): o 02
//   e o 03 no a-09, o 04 no a-22 (G21), o 10 no caso releitura-nao-confere, o
//   11 na sessão da semente, com a câmera aberta e a permissão negada.
// · ENCERRAR, antes de homologar, é a sessão abortada da T16 (G23); depois, o
//   encerramento. Voltar ao menu → T04.
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, Segmentado, ValorEmPoco, ReguaDiferenca, ValorAlvo, FotoProva, VisorCamera, Declarado, Rodape,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { camera as cameraDa, primarioDaCamera, voltaDasConfiguracoes } from '../../estado/camera.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { milhar } from '../../dados/formato.js'
import {
  REF, grandezaDe, ativoDe, grandezasDoPar, moduloConta, painelMostra, semeadoHa, releitura, secaoDaFoto, mundoDoEstado,
  digitos, quadroDe, permissaoDaCamera,
} from './calibracao.js'
import { T } from './textos.js'
import './t10.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)
const HORA = M.HORA_NOMINAL
// o módulo foi gravado: o segmento do passo acende (01 e 10), alto como o atual (08 e 09)
const GRAVADO = ['semeada', 'nao-confere']
const passoVazio = () => ({ digitado: '', foto: null, fase: 'pronta', relido: null })

// um passo como o estado único guardou — ou como a T13 o semeia, com o semeado e sem o digitado
function passoDaEtapa(e, g) {
  const s = e.semeadas?.[g]
  const digitado = e.painel?.[g] ?? (s?.painel != null ? String(s.painel) : '')
  const foto = e.fotos?.[g] ?? (s && e.foto ? { as: s.as ?? HORA } : null)
  if (!s) return { ...passoVazio(), digitado, foto }
  return { digitado, foto, fase: 'semeada', relido: { valor: s.relido ?? s.painel, confere: true } }
}

// a calibração no estado único: o digitado, a foto e o semeado de cada grandeza.
// `foto` diz se o painel já foi fotografado: é o que a T13 lê pro item da Seção B
function etapaDe(fluxo, ordem, ativoId, moduloSerial) {
  const painel = {}; const fotos = {}; const semeadas = {}
  for (const g of ordem) {
    const p = fluxo.passos[g]
    if (p.digitado) painel[g] = p.digitado
    if (p.foto) fotos[g] = p.foto
    if (p.fase === 'semeada') semeadas[g] = { painel: Number(p.digitado), relido: p.relido?.valor, confere: true, as: HORA }
  }
  return {
    ativoId, moduloSerial, itemChecklist: M.calibracao.itemChecklist.id, passo: ordem[fluxo.atual],
    painel, fotos, foto: Object.keys(fotos).length > 0, semeadas, concluida: fluxo.concluida,
  }
}

// o quadro em que a tela abre. No estado da coluna, o do caso, parado. No
// fluxo, o que o estado único guardou desta calibração — e ele ganha da URL:
// de volta da coluna do palco, o momento só devolve o que a etapa não guarda,
// a câmera aberta (06) e o foco no campo (05), e o número digitado continua o
// do técnico. Sem etapa, pela URL, o quadro da referência, depois dos toques
// que levam a ele (o número digitado é o do mock).
function inicio({ momento, est, mundo, ordem, etapa, ativoId, carimbo }) {
  const passos = Object.fromEntries(ordem.map((g) => [g, passoVazio()]))
  // a permissão da câmera é do celular, e não da calibração: não vai pra etapa
  const f = { atual: 0, passos, camera: false, focado: false, concluida: false, permissao: permissaoDaCamera(est) }
  if (est) {
    // o 11: a câmera do 1º passo aberta, e o Android sem a permissão (o caso)
    if (est === REF.semPermissao) f.camera = true
    const c = est === REF.naoConfere ? mundo?.caso : null
    if (c && passos[c.grandeza]) {
      const painel = painelMostra(ativoId, c.grandeza)
      passos[c.grandeza] = { digitado: String(painel), foto: carimbo, fase: 'nao-confere', relido: releitura(c.grandeza, painel, c.relidoBruto) }
      f.atual = ordem.indexOf(c.grandeza)
    }
    return f
  }
  const e = etapa && etapa.ativoId === ativoId ? etapa : null
  if (e) {
    for (const g of ordem) passos[g] = passoDaEtapa(e, g)
    f.atual = Math.max(0, ordem.indexOf(e.passo)); f.concluida = !!e.concluida
    f.camera = momento === REF.camera
    f.focado = momento === REF.digitado
    return f
  }
  const temPainel = (g) => painelMostra(ativoId, g) != null
  const digita = (g) => { passos[g] = { ...passos[g], digitado: String(painelMostra(ativoId, g)) } }
  const fotografa = (g) => { passos[g] = { ...passos[g], foto: carimbo } }
  const semeia = (g) => { digita(g); fotografa(g); passos[g] = { ...passos[g], fase: 'semeada', relido: releitura(g, Number(passos[g].digitado)) } }
  const hod = ordem.indexOf('hodometro'); const hor = ordem.indexOf('horimetro')
  if ([REF.digitado, REF.camera, REF.fotografado, REF.semeado].includes(momento) && hod >= 0 && temPainel('hodometro')) {
    f.atual = hod
    digita('hodometro')
    if (momento === REF.digitado) f.focado = true
    if (momento === REF.camera) f.camera = true
    if (momento === REF.fotografado) fotografa('hodometro')
    if (momento === REF.semeado) semeia('hodometro')
  }
  if ([REF.horimetro, REF.completa].includes(momento) && hor > 0 && ordem.slice(0, hor).every(temPainel)) {
    ordem.slice(0, hor).forEach(semeia)
    passos.horimetro = passoVazio()
    f.atual = hor
    if (momento === REF.completa && temPainel('horimetro')) semeia('horimetro')
  }
  return f
}

export default function T10({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const mundo = est ? mundoDoEstado(est, SEMENTES.T10.contexto.uoId, SEMENTES.T10.sessao) : null
  const sessao = mundo
    ? { ...SEMENTES.T10.sessao, ativoId: mundo.ativoId, moduloSerial: mundo.moduloSerial }
    : (unico.sessao?.ativoId ? unico.sessao : SEMENTES.T10.sessao)
  const { ativoId, moduloSerial } = sessao
  const par = grandezasDoPar(ativoId, moduloSerial)
  const ordem = mundo ? mundo.ordem : par.calibraveis
  // a foto da câmera do app, carimbada: a hora, o técnico, o ativo e o módulo (logica.md)
  const carimbo = { as: HORA, tecnico: unico.tecnico.nome, ativoId, moduloSerial }
  const [fluxo, setFluxo] = useState(() => inicio({ momento, est, mundo, ordem, etapa: unico.etapas.calibracao, ativoId, carimbo }))
  const vivo = useRef(unico)
  vivo.current = unico
  const relogios = useRef([])
  useEffect(() => () => relogios.current.forEach(clearTimeout), [])
  const campo = useRef(null)

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // a calibração no estado único (etapas.calibracao) — só no fluxo, e só depois do primeiro passo dado
  function gravar(f) {
    if (est) return
    const e = vivo.current
    const antes = e.etapas.calibracao?.ativoId === ativoId ? e.etapas.calibracao : null
    const mexeu = f.atual > 0 || f.concluida || ordem.some((g) => f.passos[g].digitado || f.passos[g].foto || f.passos[g].fase !== 'pronta')
    if (!mexeu && !antes) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...e.etapas, calibracao: etapaDe(f, ordem, ativoId, moduloSerial) } } })
  }
  useEffect(() => { gravar(fluxo) }, [fluxo.atual, fluxo.passos, fluxo.concluida]) // eslint-disable-line react-hooks/exhaustive-deps

  // a URL segue o quadro: o momento da referência em que o passo está, ou nenhum
  const quadro = est ? null : quadroDe({ ordem, ...fluxo })
  useEffect(() => {
    if (est || EM_QUADRO) return
    if (quadro !== (vivo.current.tela.momento ?? null)) ir('T10', { momento: quadro })
  }, [quadro]) // eslint-disable-line react-hooks/exhaustive-deps
  // a 05 aberta pela URL chega com o foco no campo, e o teclado aberto
  useEffect(() => { if (!EM_QUADRO && !est && fluxo.focado) campo.current?.focus() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const g = ordem[fluxo.atual]
  const p = fluxo.passos[g] ?? passoVazio()
  const gr = grandezaDe(g) ?? { natureza: 'partida', unidade: '' }
  const ajuste = gr.natureza === 'ajuste'
  const semeada = p.fase === 'semeada'
  const naoConfere = p.fase === 'nao-confere'

  // ── os toques ──
  const mudaPasso = (x, mudanca) => setFluxo((f) => ({ ...f, passos: { ...f.passos, [x]: { ...f.passos[x], ...mudanca } } }))
  const encerrar = () => (unico.etapas.checklist?.homologada ? ir('T16') : ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR }))
  const abrirCamera = () => setFluxo((f) => ({ ...f, camera: true, focado: false }))
  const fecharCamera = () => setFluxo((f) => ({ ...f, camera: false }))
  const tirarFoto = () => setFluxo((f) => ({ ...f, camera: false, passos: { ...f.passos, [g]: { ...f.passos[g], foto: carimbo } } }))
  // sem a permissão: o Android abre a página do app nas configurações; o técnico
  // permite a câmera lá, e na volta o app confere de novo e a câmera abre (estado/camera.js)
  const abrirConfiguracoes = () => setFluxo((f) => ({ ...f, permissao: voltaDasConfiguracoes() }))
  const focar = (v) => setFluxo((f) => (f.focado === v ? f : { ...f, focado: v }))
  function semear() {
    const passo = g; const painel = Number(p.digitado)
    mudaPasso(passo, { fase: 'gravando', relido: null })
    relogios.current.push(setTimeout(() => {
      mudaPasso(passo, { fase: 'relendo' })
      relogios.current.push(setTimeout(() => {
        const r = releitura(passo, painel)
        mudaPasso(passo, { fase: r?.confere ? 'semeada' : 'nao-confere', relido: r })
      }, RITMOS.semearRelendoMs))
    }, RITMOS.semearGravandoMs))
  }
  const proximo = () => setFluxo((f) => ({ ...f, atual: f.atual + 1, focado: false }))
  // a calibração completa (09): grava a etapa concluída e segue — pro ciclo dinâmico ou pro menu
  function concluir(tela) {
    const f = { ...fluxo, concluida: true }
    setFluxo(f); gravar(f); ir(tela)
  }

  // ── o segmentado: um segmento por passo; o gravado fica lima apagado e alto ──
  const gravado = (x) => GRAVADO.includes(fluxo.passos[x]?.fase)
  const segmentos = ordem.map((x, i) => {
    if (gravado(x)) return 'atual-feito'
    return i === fluxo.atual ? 'atual' : 'pendente'
  })
  const restantes = ordem.slice(fluxo.atual + 1).map((x) => grandezaDe(x).rotulo)
  const todas = ordem.length > 0 && ordem.every((x) => fluxo.passos[x]?.fase === 'semeada')
  let legenda
  if (restantes.length) legenda = T.depois(est === REF.jaSemeado ? restantes : restantes.slice(0, 1))
  else if (todas) legenda = T.completa
  else if (fluxo.atual > 0) legenda = T.ultimoPasso

  // ── os números ──
  const conta = ajuste ? null : moduloConta(ativoId, g)
  const dias = ajuste ? null : semeadoHa(ativoId, g)
  const digitado = p.digitado ? Number(p.digitado) : null
  let poco = { rotulo: T.moduloConta, valor: conta != null ? milhar(conta) : T.vazio, tom: 'apagado' }
  if (ajuste) poco = { rotulo: T.moduloLe, valor: T.vazio, tom: 'apagado' }
  else if (semeada) poco = { rotulo: T.moduloAgora, valor: milhar(p.relido.valor), tom: 'ativo' }
  else if (naoConfere) poco = { rotulo: T.moduloReleu, valor: milhar(p.relido.valor), tom: 'falha' }

  let regua
  if (ajuste) regua = <ReguaDiferenca>{T.ligueMotor}</ReguaDiferenca>
  else if (semeada) regua = <ReguaDiferenca confere>{T.relido(HORA)}</ReguaDiferenca>
  else if (naoConfere) {
    // só o que o módulo releu a menos tem texto (T10/10); o resto, só os traços (G25)
    const menos = p.relido.desvio < 0 && T.naoConfere[g]
    regua = menos ? <ReguaDiferenca falha>{T.naoConfere[g](milhar(Math.abs(Math.round(p.relido.desvio))))}</ReguaDiferenca> : <ReguaDiferenca />
  } else if (digitado != null && conta != null) regua = <ReguaDiferenca>{T.diferenca(milhar(Math.abs(digitado - conta)), gr.unidade)}</ReguaDiferenca>
  else if (dias != null) regua = <ReguaDiferenca>{T.semeadoHa(dias)}</ReguaDiferenca>
  else if (conta != null) regua = <ReguaDiferenca>{T.lido(HORA)}</ReguaDiferenca>
  else regua = <ReguaDiferenca /> // sem o número no mock: só os traços

  // o campo do painel: digita-se enquanto o passo não foi semeado
  const comCampo = p.fase === 'pronta'
  const foco = comCampo && fluxo.focado
  let alvoLegenda = digitado != null ? T.alvoVai : T.painelVazio
  if (ajuste) alvoLegenda = T.alvoAjuste[g]
  else if (semeada) alvoLegenda = T.alvoCumprido

  // ── o rodapé: o primário diz o que falta ──
  const seguinte = ordem[fluxo.atual + 1]
  const cam = cameraDa(fluxo.permissao)
  let primario
  // na câmera, o primário é o que estado/camera.js diz (provado no node, scripts/testar-camera.mjs)
  const DA_CAMERA = { 'tirar-foto': { rotulo: T.tirarFoto, aoTocar: tirarFoto }, 'abrir-configuracoes': { rotulo: T.abrirConfiguracoes, aoTocar: abrirConfiguracoes } }
  if (fluxo.camera) primario = DA_CAMERA[primarioDaCamera(fluxo.permissao)]
  else if (ajuste) primario = { rotulo: T.ligue, desabilitado: true } // o módulo ainda não lê: o motor desligado (HU-T10-2)
  else if (p.fase === 'gravando') primario = { rotulo: T.gravando, desabilitado: true }
  else if (p.fase === 'relendo') primario = { rotulo: T.relendo, desabilitado: true }
  else if (naoConfere) primario = { rotulo: T.semearDeNovo, aoTocar: semear }
  else if (semeada && !seguinte) primario = { rotulo: T.cicloDinamico, aoTocar: () => concluir('T14') } // decisão 35
  else if (semeada && T.calibrar[seguinte]) primario = { rotulo: T.calibrar[seguinte], aoTocar: proximo }
  else if (semeada) primario = { rotulo: T.semear[g], desabilitado: true } // G25: o passo seguinte sem texto
  else if (digitado == null) primario = { rotulo: T.digite, desabilitado: true }
  else if (!p.foto) primario = { rotulo: T.fotografe, desabilitado: true }
  else primario = { rotulo: T.semear[g], aoTocar: semear }
  // o semear não para (a decisão do diretor de 25/09): o link fica, desabilitado de verdade
  // e em tinta apagada, e o ENCERRAR faz o mesmo que o voltar: apagado (a lei 17)
  const semeando = p.fase === 'gravando' || p.fase === 'relendo'
  let link = { rotulo: T.voltar, aoTocar: () => ir('T04') }
  if (fluxo.camera) link = { rotulo: T.voltarCalibracao, aoTocar: fecharCamera }
  else if (semeando) link = { rotulo: T.voltar, desabilitado: true }
  else if (semeada && !seguinte) link = { rotulo: T.voltar, aoTocar: () => concluir('T04') } // a calibração completa (09)
  // O voltar do Android (logica.md): o link de saída do rodapé — em todo passo, o
  // Voltar ao menu, e a calibração volta de onde parou; na câmera, o Voltar à
  // calibração, sem foto; na calibração completa, o Voltar ao menu. No semear, nada
  useVoltar(link.desabilitado ? null : link.aoTocar)

  return (
    <div className="t10">
      <BarraDoSistema hora={HORA} fundo="faixa" />
      <Faixa serial={moduloSerial} placa={ativoDe(ativoId)?.placa} acao={T.encerrar} aoEncerrar={encerrar} acaoDesabilitada={semeando && !fluxo.camera} />
      <div className="tela-miolo t10-miolo">
        <Segmentado rotulo={T.rotulo} contagem={String(fluxo.atual + 1)} total={T.deTotal(ordem.length)} segmentos={segmentos} legenda={legenda} />
        {fluxo.camera ? (
          <>
            <h1 className="t10-titulo">{T.fotoDoPainel}</h1>
            {cam.abre
              ? <VisorCamera frase={T.enquadre(gr.rotulo.toLowerCase())} />
              : <VisorCamera semPermissao frase={T.precisaDaCamera} explicacao={T.semAFoto} />}
          </>
        ) : (
          <>
            <h1 className="t10-titulo">{gr.rotulo}</h1>
            {/* a chave é a grandeza: o tambor rola no semear, não na troca de passo */}
            <ValorEmPoco key={g} rotulo={poco.rotulo} valor={poco.valor} unidade={gr.unidade} tom={poco.tom} />
            {regua}
            <ValorAlvo rotulo={T.painel} valor={digitado != null ? milhar(digitado) : T.vazio} unidade={gr.unidade} legenda={alvoLegenda}
              vazio={digitado == null} cumprido={digitado != null && !foco} foco={foco}
              campo={comCampo ? { valor: p.digitado, aoMudar: (v) => mudaPasso(g, { digitado: digitos(v) }), aoFocar: () => focar(true), aoSair: () => focar(false), ref: campo } : undefined} />
            {!ajuste && (p.foto
              ? <FotoProva tirada titulo={T.fotografado(p.foto.as)} legenda={T.fotoVale(secaoDaFoto())} />
              : <FotoProva titulo={T.fotografar} legenda={T.fotoLegenda} aoTocar={abrirCamera} />)}
            {par.naoSeAplicam.length > 0 && (
              <Declarado aoPe rotulo={par.doModulo ? T.naoSeAplicam : T.naoSeAplicamModelo} divisoriaNoFim={ajuste}
                linhas={par.naoSeAplicam.map((l) => ({ nome: l.nome, motivo: l.motivo }))} />
            )}
          </>
        )}
      </div>
      <Rodape primario={primario.rotulo} aoPrimario={primario.aoTocar} primarioDesabilitado={!!primario.desabilitado}
        link={link.rotulo} aoLink={link.aoTocar} linkDesabilitado={!!link.desabilitado} />
    </div>
  )
}
