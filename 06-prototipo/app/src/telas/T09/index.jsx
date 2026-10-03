// T09 · Configurar módulo (02-telas/T09-configurar-modulo): grava no módulo o
// que ele precisa — os seis passos da cadeia, na instalação nova; um bloco, na
// manutenção —, um de cada vez, cada um relido antes do próximo. Enquanto a
// Conexão não grava, o técnico não sai.
// · A entrada (pacote 1, decisão 47): a tela abre parada, pelo modo que o vínculo
//   decidiu (etapas.ativo.modo, a T06). Na instalação nova, o que vai ser gravado
//   (05): a limpeza em primeiro, dizendo o que apaga e o que preserva, os blocos
//   com o conteúdo do par, e as duas pré-condições — os pinos e o espaço,
//   calculado sobre o que vai ser gravado. Se não cabe (06) ou as cercas passam do
//   limite do módulo (07), a gravação não começa, e o Procurar outro módulo abre o
//   diálogo Encerrar sem homologar? (a sessão está aberta: o módulo não troca).
//   Na manutenção, o escolher o bloco (08): as cercas, as únicas com texto pro
//   reenvio (G25). Aberta com a cadeia em curso (o Retomar da T16), segue dela;
//   concluída, abre concluída. O endereço acompanha o quadro (05, 08).
// · Gravar no módulo liga a cadeia, pela Limpeza; ela corre sozinha, na ordem
//   canônica do mock (M.cadeia.ordem): um bloco a cada RITMOS.cadeiaBlocoMs, e o
//   próximo começa no instante em que o anterior confirma (T09·1). O trilho de
//   300 ms e o check que aparece são o movimento do C12. A 00 é o quadro dela
//   correndo — três relidos, o Leitor gravando —, a tela da régua: no print
//   (EM_QUADRO), ela fica parada nesse quadro. Reenviar as cercas liga a cadeia
//   curta (09): a limpeza só das cercas, e as cercas; relidas, o Voltar ao menu.
// · Cada elo mostra o conteúdo do bloco no par da faixa, do cadastro dele (o do
//   caso, nunca o do herói · decisão 49 e a errata): o modelo do ativo, as
//   regiões, o leitor pela variante, o intervalo dos eventos e a APN.
// · O último relido → 04-momento-cadeia-concluida, com a prova da cadeia (os 6
//   blocos); a cada bloco relido, quantos confirmaram vai pro estado único
//   (etapas.cadeia). Voltar ao menu → T04, de onde a Calibração segue (T09-A3: a
//   04 não desenha o "Calibrar", e texto novo é proibido).
// · Tentar sair no meio (ENCERRAR, ou o Voltar ao menu com a cadeia parada) →
//   a recuperação, até a Conexão gravar; nela, o ENCERRAR não faz nada (G23).
//   Continuar a gravação retoma do mesmo bloco. Antes de gravar (05 a 08) e
//   depois da Conexão, o ENCERRAR é o de sempre: antes de homologar, o diálogo
//   Encerrar sem homologar? por cima da tela (decisão 36), e a sessão abortada;
//   depois, o encerramento. Na cadeia curta, ele fica apagado, como o voltar
//   (lei 17): a recuperação não se aplica, e o processo termina sozinho.
// · Os estados da coluna, parados, pela receita: o 01 pelo caso bloco-recusado,
//   o 02 e o 03 pelo queda-na-cadeia (G21), o 06 pelo conteudo-nao-cabe e o 07
//   pelo pool-esgotado, cada um na sessão do caso. No fluxo, a recusa e a queda
//   param a cadeia uma vez, quando o par da faixa é o do caso (G28); as travas do
//   envio são a regra do cadastro, e valem toda vez. Tentar de novo e Reconectar
//   e seguir retomam o mesmo bloco (HU-T09-7, 8).
// · O estado muda o conteúdo; onde a referência remonta (a altura do elo, os
//   pinos depois do aviso no 01, o contador do 02 e do 03), ela é construída fiel (G24).
//   Nas travas do envio (o pacote 3), o aviso diz o número e quem fica de fora, e a
//   linha do espaço que o repetiria não aparece na 06.
// · O movimento (C12), o mesmo vocabulário das outras telas, e nada ao abrir:
//   - a cadeia só corre depois da troca que a trouxe (G27): no Gravar no módulo e
//     no Reenviar, o quadro troca inteiro e o conteúdo esmaece, como entre telas
//     (C12·4), e o primeiro bloco relê a 1 s do fim do esmaecer; pelo endereço da
//     00 e da 09, a 1 s da montagem;
//   - o elo relido: o check esmaece no poço, e o trilho acende de cima pra baixo
//     (a Cadeia e o Trilho, C12·12 e C12·32);
//   - o aviso que nasce ao vivo — a recuperação, e a recusa e a queda, que só a
//     vitrine alcança (C12·13) — esmaece no lugar, em 150 (Aviso · surge, C12·9);
//     o espaço, a altura dos elos e o contador trocam direto (G24);
//   - a prova da cadeia concluída na frente de quem olha esmaece no lugar, em 150
//     (Prova · surge, C12·9);
//   - o primário que acende — a cadeia que conclui ou para, e a recuperação —
//     acende com o texto da saída: o texto novo esmaece no lugar, e o roxo troca
//     direto (C12·23, a peça · o conserto de 27/09); o que se apaga (retomar)
//     perde o roxo de uma vez (C12·18), e o texto novo esmaece no lugar (C12·23).
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Precondicao, Aviso, Cadeia, Prova, Rodape, Lista, LinhaEscolha,
  useFimDaTroca, useTrocaDeQuadro,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import {
  REF, CASO_RECUSA, CASO_QUEDA, CASO_NAO_CABE, CASO_POOL, ORDEM, TOTAL, CONEXAO, QUADRO_00, CURTA,
  BLOCOS_DA_MANUTENCAO, BLOCO_DA_MANUTENCAO, rotuloDe, placaDe, parDoCaso, paradaDoCaso, casoDoPar,
  conteudoDo, envioDo, travaDo, emManutencao, ficam, elosDo, elosDaCurta,
} from './cadeia.js'
import { T } from './textos.js'
import './t09.css'

// o par módulo × ativo da sessão; sem sessão, o da semente
const parDaSessao = (s) => (s?.ativoId ? { ativoId: s.ativoId, moduloSerial: s.moduloSerial } : { ativoId: SEMENTES.T09.sessao.ativoId, moduloSerial: SEMENTES.T09.sessao.moduloSerial })

// o caso de cada estado da coluna (a receita)
const CASO_DO_ESTADO = {
  [REF.recusado]: CASO_RECUSA, [REF.queda]: CASO_QUEDA, [REF.recuperacao]: CASO_QUEDA,
  [REF.naoCabe]: CASO_NAO_CABE, [REF.cercasDemais]: CASO_POOL,
}

// O quadro em que a tela abre. Num estado da coluna, o do caso, parado (a
// receita). Pelo endereço de um momento, o dele. Sem momento: no print, o quadro
// da 00 (a cadeia correndo); no fluxo, a cadeia de onde o estado único diz que ela
// está (o Retomar da T16), a concluída, ou — nada gravado ainda — a entrada pelo
// modo: o que vai ser gravado (05) ou o escolher o bloco (08).
//   fase · antes · escolher · gravando · recusado · pausado · recuperacao · concluida · curta · curtaFeita
function inicio(momento, est, unico) {
  // o pacote 2 (D2, a mudança mínima): o bloco que a conferência (T11) pede vem escolhido, pelo estado
  const pedido = unico.etapas.ativo?.bloco
  const bloco = pedido && T.reenviar[pedido] ? pedido : BLOCO_DA_MANUTENCAO
  if (est === REF.recusado) {
    const p = paradaDoCaso(CASO_RECUSA)
    return { par: parDoCaso(CASO_RECUSA), confirmados: ORDEM.indexOf(p.bloco), fase: 'recusado', parou: p.parou }
  }
  if (est === REF.queda || est === REF.recuperacao) {
    const p = paradaDoCaso(CASO_QUEDA)
    return { par: parDoCaso(CASO_QUEDA), confirmados: ORDEM.indexOf(p.bloco), fase: est === REF.queda ? 'pausado' : 'recuperacao', parou: p.parou }
  }
  if (est === REF.naoCabe || est === REF.cercasDemais) return { par: parDoCaso(CASO_DO_ESTADO[est]), confirmados: 0, fase: 'antes', parou: null }
  const par = parDaSessao(unico.sessao)
  if (momento === REF.concluida) return { par, confirmados: TOTAL, fase: 'concluida', parou: null }
  if (momento === REF.antes) return { par, confirmados: 0, fase: 'antes', parou: null }
  if (momento === REF.escolher) return { par, confirmados: 0, fase: 'escolher', parou: null, bloco }
  // a 09: a limpeza feita, as cercas gravando
  if (momento === REF.reenviando) return { par, confirmados: 1, fase: 'curta', parou: null, bloco }
  // a 10: a cadeia curta fechada, os dois relidos
  if (momento === REF.reenviado) return { par, confirmados: CURTA, fase: 'curtaFeita', parou: null, bloco }
  if (EM_QUADRO) return { par, confirmados: QUADRO_00, fase: 'gravando', parou: null }
  const gravados = unico.etapas.cadeia?.confirmados
  if (gravados > 0) return { par, confirmados: Math.min(gravados, TOTAL), fase: gravados >= TOTAL ? 'concluida' : 'gravando', parou: null }
  return emManutencao(unico)
    ? { par, confirmados: 0, fase: 'escolher', parou: null, bloco }
    : { par, confirmados: 0, fase: 'antes', parou: null }
}

// o quadro desenhado (C12·4): quando um vira o outro na frente de quem olha, o conteúdo esmaece
const QUADRO = { antes: 'antes', escolher: 'escolher', curta: 'curta', curtaFeita: 'curta' }
const quadroDa = (fase) => QUADRO[fase] ?? 'cadeia'
// o momento que o endereço diz em cada quadro de entrada
const MOMENTO_DA_ENTRADA = { antes: REF.antes, escolher: REF.escolher }

export default function T09({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento, est, unico))
  const vivo = useRef(null)
  vivo.current = { fluxo, unico, momento }
  // o que nasce ao vivo (C12·9): no fluxo, a tela abre gravando ou concluída — o aviso e a
  // prova que aparecem depois são da frente de quem olha; no print e na coluna, parados
  const aoVivo = !EM_QUADRO && est == null
  const [abriuConcluida] = useState(() => fluxo.fase === 'concluida')
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })

  // o endereço acompanha o quadro da entrada (G20): a T09 aberta pelo fluxo, sem momento,
  // passa a dizer o 05 ou o 08 — o ir que só acerta o endereço fica na mesma tela
  useEffect(() => {
    if (est != null) return
    const quer = MOMENTO_DA_ENTRADA[vivo.current.fluxo.fase]
    if (quer && vivo.current.momento !== quer) despachar({ tipo: 'ir', tela: 'T09', momento: quer })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // a cadeia anda um bloco por batida; para no print, num estado da coluna e
  // fora da gravação. Quando o par da faixa é o de um caso, a cadeia para no
  // bloco dele, uma vez só (G21): a recusa ou a queda do link. A curta anda os dois dela
  const correndo = !EM_QUADRO && est == null && (fluxo.fase === 'gravando' || fluxo.fase === 'curta')
  // a cadeia só corre depois da troca que a trouxe (G27); ao retomar, logo
  const fimDaTroca = useFimDaTroca()
  useEffect(() => {
    if (!correndo) return undefined
    const batida = () => {
      const { fluxo: f, unico: u } = vivo.current
      if (f.fase === 'curta') {
        const confirmados = f.confirmados + 1
        setFluxo({ ...f, confirmados, fase: confirmados >= CURTA ? 'curtaFeita' : 'curta' })
        return
      }
      if (f.fase !== 'gravando') return
      const caso = casoDoPar(f.par, u.casosConsumidos)
      const parada = caso ? paradaDoCaso(caso) : null
      if (parada && parada.bloco === ORDEM[f.confirmados]) {
        despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...u.casosConsumidos, caso] } })
        setFluxo({ ...f, fase: parada.parou === 'recusa' ? 'recusado' : 'pausado', parou: parada.parou })
        return
      }
      const confirmados = f.confirmados + 1
      setFluxo({ ...f, confirmados, fase: confirmados >= TOTAL ? 'concluida' : 'gravando' })
    }
    let ligada = true, relogio = null
    fimDaTroca().then(() => { if (ligada) relogio = setInterval(batida, RITMOS.cadeiaBlocoMs) })
    return () => { ligada = false; clearInterval(relogio) }
  }, [correndo, despachar]) // eslint-disable-line react-hooks/exhaustive-deps

  // cada bloco relido da cadeia grava no estado único quantos confirmaram (o módulo não
  // guarda versão, decisão 49); a cadeia curta, ao fim, o bloco que reenviou
  const quadro = quadroDa(fluxo.fase)
  useEffect(() => {
    if (est != null) return
    const u = vivo.current.unico
    if (fluxo.fase === 'curtaFeita') {
      if (u.etapas.cadeia?.reenviado !== fluxo.bloco) despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, cadeia: { ...(u.etapas.cadeia ?? {}), reenviado: fluxo.bloco } } } })
      return
    }
    if (quadro !== 'cadeia' || fluxo.confirmados === 0) return
    if (u.etapas.cadeia?.confirmados === fluxo.confirmados) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, cadeia: { confirmados: fluxo.confirmados } } } })
  }, [fluxo.confirmados, fluxo.fase, est, despachar]) // eslint-disable-line react-hooks/exhaustive-deps

  // o último relido: a URL passa a dizer 04 — e, na cadeia curta, 10 (o pacote 5)
  useEffect(() => {
    if (est != null) return
    const m = fluxo.fase === 'concluida' ? REF.concluida : fluxo.fase === 'curtaFeita' ? REF.reenviado : null
    if (m && vivo.current.momento !== m) despachar({ tipo: 'ir', tela: 'T09', momento: m })
  }, [fluxo.fase, est, despachar])

  // a troca de quadro (C12·4): o que vai ser gravado → a cadeia, o escolher → a curta
  useTrocaDeQuadro(quadro)

  // os toques. Num estado da coluna o celular não toca; se tocasse, o quadro
  // vira fluxo na sessão do caso, e a recusa e a queda ficam consumidas (G21)
  function paraOFluxo() {
    if (est == null) return
    const u = vivo.current.unico
    const caso = CASO_DO_ESTADO[est]
    const parcial = { sessao: { ...(u.sessao ?? SEMENTES.T09.sessao), ...fluxo.par } }
    if ((caso === CASO_RECUSA || caso === CASO_QUEDA) && !u.casosConsumidos.includes(caso)) parcial.casosConsumidos = [...u.casosConsumidos, caso]
    despachar({ tipo: 'mesclar', parcial })
    ir('T09')
  }
  // Gravar no módulo: a cadeia, pela Limpeza; o endereço passa à 00, a tela
  function gravar() {
    setFluxo((f) => ({ ...f, fase: 'gravando', confirmados: 0, parou: null }))
    ir('T09')
  }
  // Reenviar as cercas: a cadeia curta, pela limpeza só delas (09)
  function reenviar() {
    setFluxo((f) => ({ ...f, fase: 'curta', confirmados: 0, parou: null }))
    ir('T09', { momento: REF.reenviando })
  }
  // Tentar de novo · Reconectar e seguir · Continuar a gravação: o mesmo bloco, de novo
  function retomar() {
    paraOFluxo()
    setFluxo((f) => ({ ...f, fase: 'gravando', parou: null }))
  }
  // tentar sair antes da Conexão gravar: a recuperação, com a cadeia parada onde estava
  function recuperar() {
    paraOFluxo()
    setFluxo((f) => ({ ...f, fase: 'recuperacao', parou: f.parou ?? 'pedido' }))
  }
  const voltarAoMenu = () => ir('T04')
  // o ENCERRAR de sempre (decisão 36, src/estado/encerrar.jsx): antes de homologar,
  // o diálogo Encerrar sem homologar? por cima desta tela; depois, direto, pra T16.
  // O Procurar outro módulo das travas do envio é o mesmo diálogo: com a sessão
  // aberta, o módulo não troca (a resposta do arquiteto ao gate do pacote 1)
  const enc = useEncerrar()
  const PRENDE = ['gravando', 'recusado', 'pausado']
  function encerrar() {
    const { fase } = vivo.current.fluxo
    if (fase === 'recuperacao' || fase === 'curta') return // G23 · lei 17: ali o ENCERRAR não faz nada
    if (PRENDE.includes(fase)) { recuperar(); return }
    // antes de gravar, e depois da Conexão: o ENCERRAR de cima
    enc.encerrar()
  }

  const { par, confirmados: k, fase } = fluxo
  // O voltar do Android (logica.md): antes de gravar (05 a 08), na concluída (04) e
  // na curta relida, o Voltar ao menu, a saída do rodapé; antes de a Conexão gravar —
  // correndo (00), recusado (01), pausado (02) —, a recuperação, como o Voltar ao menu
  // com a cadeia parada; na recuperação, que só oferece continuar, e na cadeia curta,
  // que termina sozinha, não faz nada
  useVoltar(PRENDE.includes(fase) ? recuperar : fase === 'recuperacao' || fase === 'curta' ? null : voltarAoMenu)

  const conteudo = conteudoDo(par)
  const bloco = ORDEM[k]
  const parada = fase === 'recusado' || fase === 'pausado' || fase === 'recuperacao'
  const pinos = <Precondicao>{T.pinos}</Precondicao>

  let miolo
  let rodape
  // o rodapé da cadeia: o mesmo primário em toda fase — o texto que troca esmaece no lugar, e o
  // roxo troca direto (C12·23); com o mesmo texto, acenderia por uma camada (C12·8, a peça)
  const mov = { primarioAcende: true, primarioTrocaTexto: true }
  if (fase === 'antes') {
    // ── o que vai ser gravado (05) e as travas do envio (06, 07) ──
    const envio = envioDo(par)
    const trava = travaDo(envio)
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} />
        {trava === 'nao-cabe' && <Aviso tom="falha" glifo="xis" titulo={T.naoCabeTitulo} frase={T.naoCabeFrase(envio.registros, envio.capacidade)} />}
        {trava === 'cercas-demais' && <Aviso tom="falha" glifo="xis" titulo={T.cercasDemaisTitulo} frase={T.cercasDemaisFrase(envio.fora)} />}
        {pinos}
        {/* o espaço: na trava dele (06), a linha não aparece — o aviso já diz os números (o pacote 3) */}
        {envio.cabe && <Precondicao estado="ok">{T.cabe(envio.registros, envio.capacidade)}</Precondicao>}
        <Cadeia elos={elosDo(fluxo, conteudo, envio)} justa semFecho />
      </>
    )
    rodape = trava
      ? <Rodape primario={T.procurarOutro} aoPrimario={enc.encerrar} link={T.voltar} aoLink={voltarAoMenu} />
      : <Rodape primario={T.gravarNoModulo} aoPrimario={gravar} link={T.voltar} aoLink={voltarAoMenu} />
  } else if (fase === 'escolher') {
    // ── a manutenção: escolher o bloco (08) ──
    const ultimo = BLOCOS_DA_MANUTENCAO.length - 1
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} />
        <Aviso tom="neutro" glifo="info" titulo={T.manutencao} frase={T.reenvieUm} />
        <Lista role="radiogroup" aria-label={T.titulo}>
          {BLOCOS_DA_MANUTENCAO.map((b, i) => (
            <LinhaEscolha key={b} nome={rotuloDe(b)} detalhe={T.descricao[b]} valor={conteudo[b]} valorTom="secundaria"
              estado={b === fluxo.bloco ? 'escolhida' : 'disponivel'} inerte={!T.reenviar[b]}
              aoTocar={() => setFluxo((f) => ({ ...f, bloco: b }))} divisoria={i < ultimo} />
          ))}
        </Lista>
      </>
    )
    rodape = <Rodape primario={T.reenviar[fluxo.bloco]} aoPrimario={reenviar} link={T.voltar} aoLink={voltarAoMenu} />
  } else if (fase === 'curta' || fase === 'curtaFeita') {
    // ── a manutenção: a cadeia curta (09) — a limpeza só do bloco, e o bloco ──
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} />
        <Aviso tom="neutro" glifo="info" titulo={T.manutencao} frase={(fase === 'curta' ? T.reenviando : T.reenviado)[fluxo.bloco]} />
        <Cadeia elos={elosDaCurta(k, fluxo.bloco, conteudo)} altura="correndo" curta />
        <p className="t09-ficam">{ficam(fluxo.bloco)}</p>
      </>
    )
    rodape = fase === 'curta'
      ? <Rodape {...mov} primario={T.gravandoNaoInterrompa} primarioDesabilitado explicacao={T.saidaVolta} />
      : <Rodape {...mov} primario={T.voltar} aoPrimario={voltarAoMenu} pe="link" />
  } else {
    // ── a cadeia: correndo (00), parada (01, 02, 03) e concluída (04) ──
    const cabeca = fase === 'pausado' || fase === 'recuperacao'
      ? <CabecalhoConteudo titulo={T.titulo} contagem={k} unidade={T.deTotal(TOTAL)} />
      : <CabecalhoConteudo titulo={T.titulo} />
    // o aviso: cada um é um aviso novo (a chave é a fase), e o que nasce ao vivo esmaece no lugar (C12·9)
    let aviso = null
    if (fase === 'recusado') aviso = <Aviso key={fase} surge={aoVivo} tom="falha" glifo="xis" titulo={T.parou} frase={T.recusou(rotuloDe(bloco), TOTAL - k - 1)} />
    else if (fase === 'pausado') aviso = <Aviso key={fase} surge={aoVivo} tom="neutro" glifo="sem-sinal-neutro" titulo={T.pausou(rotuloDe(bloco))} frase={T.linkCaiu(k)} />
    else if (fase === 'recuperacao') aviso = <Aviso key={fase} surge={aoVivo} tom="neutro" glifo="pausa" titulo={T.semConexao(rotuloDe(CONEXAO))} frase={T.semSinal} />
    // a altura do elo é a de cada quadro (G11, G24): correndo 86, recusada 70, pausada 68, concluída 72
    const altura = fase === 'gravando' ? 'correndo' : fase === 'pausado' || fase === 'recuperacao' ? 'pausada' : undefined
    miolo = (
      <>
        {cabeca}
        {fase !== 'recusado' && pinos}
        {aviso}
        {/* no 01, a linha dos pinos vem logo depois do aviso, como na 06 (o pacote 3) */}
        {fase === 'recusado' && pinos}
        <Cadeia elos={elosDo(fluxo, conteudo)} justa={fase === 'recusado'} altura={altura} />
        {fase === 'concluida' && <Prova surge={aoVivo && !abriuConcluida} rotulo={T.gravadoERelido} versao={T.blocos(TOTAL)} legenda={T.devolveu(TOTAL)} />}
      </>
    )
    if (fase === 'gravando') rodape = <Rodape {...mov} primario={T.gravandoNaoInterrompa} primarioDesabilitado explicacao={T.saidaVolta} />
    else if (fase === 'recusado') rodape = <Rodape {...mov} primario={T.tentarDeNovo} aoPrimario={retomar} link={T.voltar} aoLink={recuperar} />
    else if (fase === 'pausado') rodape = <Rodape {...mov} primario={T.reconectar} aoPrimario={retomar} link={T.voltar} aoLink={recuperar} />
    else if (fase === 'recuperacao') rodape = <Rodape {...mov} primario={T.continuar} aoPrimario={retomar} />
    else rodape = <Rodape {...mov} primario={T.voltar} aoPrimario={voltarAoMenu} />
  }

  return (
    <div className="t09">
      <BarraDoSistema fundo="faixa" />
      {/* o ENCERRAR faz o mesmo que o voltar: antes de a Conexão gravar, abre a recuperação; na recuperação e na cadeia curta, fica apagado (a lei 17, diretor, 25/09) */}
      <Faixa serial={par.moduloSerial} placa={placaDe(par.ativoId)} acao={T.encerrar} aoEncerrar={encerrar} acaoDesabilitada={fase === 'recuperacao' || fase === 'curta'} />
      {/* o miolo nasce com o quadro: as peças de dentro não esmaecem de novo por dentro da troca */}
      <div key={`miolo·${quadro}`} className={`tela-miolo t09-miolo ${parada ? 't09-miolo-justo' : ''}`}>
        {miolo}
      </div>
      {/* o rodapé nasce com o quadro: dentro da troca, o texto do primário não esmaece de novo */}
      <Fragment key={`rodape·${quadro}`}>{rodape}</Fragment>
      {enc.sobre}
    </div>
  )
}
