// T09 · Configurar módulo (02-telas/T09-configurar-modulo): grava os seis
// passos da cadeia no módulo, um de cada vez, cada um relido antes do próximo,
// sem nada pra escolher. Enquanto a Conexão não grava, o técnico não sai.
// · A cadeia corre sozinha, na ordem canônica do mock (M.cadeia.ordem, a
//   limpeza primeiro): um bloco a cada RITMOS.cadeiaBlocoMs, e o próximo começa
//   no instante em que o anterior confirma (T09·1). O trilho de 300 ms e o check
//   que aparece são o movimento do C12. A tela entra no quadro da 00 — três
//   relidos, o Leitor gravando — e anda Leitor → Eventos → Conexão (G27). No
//   print (EM_QUADRO), a 00 fica parada nesse quadro.
// · O último relido → 04-momento-cadeia-concluida, com a prova da cadeia; a
//   versão composta vai pro estado único a cada bloco relido (etapas.cadeia,
//   HU-T09-8). Voltar ao menu → T04, de onde a Calibração segue (T09-A3: a 04
//   não desenha o "Calibrar", e texto novo é proibido).
// · Tentar sair no meio (ENCERRAR, ou o Voltar ao menu com a cadeia parada) →
//   a recuperação, até a Conexão gravar; nela, o ENCERRAR não faz nada (G23).
//   Continuar a gravação retoma do mesmo bloco. Depois da Conexão, o ENCERRAR
//   é o de sempre: antes de homologar, o diálogo Encerrar sem homologar? por
//   cima da tela (decisão 36), e a sessão abortada; depois, o encerramento.
// · Os estados da coluna, parados, pela receita: o 01 pelo caso bloco-recusado,
//   o 02 e o 03 pelo queda-na-cadeia (G21), cada um na sessão do caso. No
//   fluxo, o caso para a cadeia uma vez, quando o par da faixa é o dele (G28).
//   Tentar de novo e Reconectar e seguir retomam o mesmo bloco (HU-T09-5, 6).
// · O estado muda o conteúdo; onde a referência remonta (a altura do elo, os
//   pinos no pé do 01, o contador do 02 e do 03), ela é construída fiel (G24).
// · O movimento (C12), o mesmo vocabulário das outras telas, e nada ao abrir:
//   - a cadeia só corre depois da troca entre telas que trouxe a tela (G27): o
//     primeiro bloco relê a 1 s do fim do esmaecer (logo, pelo endereço);
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
import { useEffect, useRef, useState } from 'react'
import { BarraDoSistema, Faixa, CabecalhoConteudo, Precondicao, Aviso, Cadeia, Prova, Rodape, useFimDaTroca } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import {
  REF, CASO_RECUSA, CASO_QUEDA, ORDEM, TOTAL, CONEXAO, QUADRO_00, rotuloDe, placaDe, parDoCaso, paradaDoCaso,
  casoDoPar, versaoGravada, elosDo,
} from './cadeia.js'
import { T } from './textos.js'
import './t09.css'


// o par módulo × ativo da sessão; sem sessão, o da semente
const parDaSessao = (s) => (s?.ativoId ? { ativoId: s.ativoId, moduloSerial: s.moduloSerial } : { ativoId: SEMENTES.T09.sessao.ativoId, moduloSerial: SEMENTES.T09.sessao.moduloSerial })

// o quadro em que a tela abre. Num estado da coluna, o do caso, parado (a
// receita). No fluxo: a concluída (04), ou a cadeia correndo de onde o estado
// único diz que ela está. Na primeira vez, ela entra no quadro da 00 — três
// relidos, o Leitor gravando — e anda Leitor → Eventos → Conexão (G27: nada
// conta de zero ao abrir). Se o par da faixa é o de um caso que para a cadeia
// antes disso (a recusa de Cercas), ela entra no bloco do caso, que grava.
function entrada(par, consumidos) {
  const caso = casoDoPar(par, consumidos)
  const p = caso ? paradaDoCaso(caso) : null
  return p ? Math.min(QUADRO_00, ORDEM.indexOf(p.bloco)) : QUADRO_00
}

function inicio(momento, est, unico) {
  if (est === REF.recusado) {
    const p = paradaDoCaso(CASO_RECUSA)
    return { par: parDoCaso(CASO_RECUSA), confirmados: ORDEM.indexOf(p.bloco), fase: 'recusado', parou: p.parou }
  }
  if (est === REF.queda || est === REF.recuperacao) {
    const p = paradaDoCaso(CASO_QUEDA)
    return { par: parDoCaso(CASO_QUEDA), confirmados: ORDEM.indexOf(p.bloco), fase: est === REF.queda ? 'pausado' : 'recuperacao', parou: p.parou }
  }
  const par = parDaSessao(unico.sessao)
  if (momento === REF.concluida) return { par, confirmados: TOTAL, fase: 'concluida', parou: null }
  const gravados = unico.etapas.cadeia?.confirmados
  const feitos = EM_QUADRO ? QUADRO_00 : gravados != null ? Math.min(gravados, TOTAL) : entrada(par, unico.casosConsumidos)
  return { par, confirmados: feitos, fase: feitos >= TOTAL ? 'concluida' : 'gravando', parou: null }
}

export default function T09({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [fluxo, setFluxo] = useState(() => inicio(momento, est, unico))
  const vivo = useRef(null)
  vivo.current = { fluxo, unico, momento }
  // o que nasce ao vivo (C12·9): no fluxo, a tela abre gravando ou concluída — o aviso e a
  // prova que aparecem depois são da frente de quem olha; no print e na coluna, parados
  const aoVivo = !EM_QUADRO && est == null
  const [abriuConcluida] = useState(() => fluxo.fase === 'concluida')

  // a cadeia anda um bloco por batida; para no print, num estado da coluna e
  // fora da gravação. Quando o par da faixa é o de um caso, a cadeia para no
  // bloco dele, uma vez só (G21): a recusa ou a queda do link
  const correndo = !EM_QUADRO && est == null && fluxo.fase === 'gravando'
  // a cadeia só corre depois da troca entre telas que trouxe a tela (G27); ao retomar, logo
  const fimDaTroca = useFimDaTroca()
  useEffect(() => {
    if (!correndo) return undefined
    const batida = () => {
      const { fluxo: f, unico: u } = vivo.current
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

  // cada bloco relido grava no estado único a versão composta até ali (HU-T09-8)
  useEffect(() => {
    if (est != null || fluxo.confirmados === 0) return
    const u = vivo.current.unico
    if (u.etapas.cadeia?.confirmados === fluxo.confirmados) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, cadeia: { confirmados: fluxo.confirmados, versaoGravada: versaoGravada(fluxo.confirmados) } } } })
  }, [fluxo.confirmados, est, despachar])

  // o último relido: a URL passa a dizer 04
  useEffect(() => {
    if (est != null || fluxo.fase !== 'concluida') return
    if (vivo.current.momento !== REF.concluida) despachar({ tipo: 'ir', tela: 'T09', momento: REF.concluida })
  }, [fluxo.fase, est, despachar])

  // os toques. Num estado da coluna o celular não toca; se tocasse, o quadro
  // vira fluxo na sessão do caso, e o caso fica consumido (G21)
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  function paraOFluxo() {
    if (est == null) return
    const u = vivo.current.unico
    const caso = est === REF.recusado ? CASO_RECUSA : CASO_QUEDA
    const parcial = { sessao: { ...(u.sessao ?? SEMENTES.T09.sessao), ...fluxo.par } }
    if (!u.casosConsumidos.includes(caso)) parcial.casosConsumidos = [...u.casosConsumidos, caso]
    despachar({ tipo: 'mesclar', parcial })
    ir('T09')
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
  // o ENCERRAR de sempre (decisão 36, src/estado/encerrar.jsx): antes de homologar,
  // o diálogo Encerrar sem homologar? por cima desta tela; depois, direto, pra T16
  const enc = useEncerrar()
  function encerrar() {
    const { fase } = vivo.current.fluxo
    if (fase === 'recuperacao') return // G23: na recuperação, o ENCERRAR não faz nada
    if (fase !== 'concluida') { recuperar(); return }
    // a Conexão gravou: o ENCERRAR volta a ser o de cima
    enc.encerrar()
  }

  const { par, confirmados: k, fase } = fluxo
  // O voltar do Android (logica.md): antes de a Conexão gravar — correndo (00),
  // recusado (01), pausado (02) —, abre a recuperação, como o Voltar ao menu com
  // a cadeia parada; na recuperação, que só oferece continuar, não faz nada; na
  // concluída (04), o Voltar ao menu, a saída que ela tem
  useVoltar(fase === 'concluida' ? () => ir('T04') : fase === 'recuperacao' ? null : recuperar)
  const bloco = ORDEM[k]
  const parada = fase === 'recusado' || fase === 'pausado' || fase === 'recuperacao'
  const pinos = <Precondicao>{T.pinos}</Precondicao>

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
  const cadeia = <Cadeia elos={elosDo(fluxo)} justa={fase === 'recusado'} altura={altura} />

  // o rodapé: o mesmo primário em toda fase — o texto que troca esmaece no lugar, e o roxo troca
  // direto (C12·23); com o mesmo texto, acenderia por uma camada (C12·8, a peça)
  const mov = { primarioAcende: true, primarioTrocaTexto: true }
  let rodape
  if (fase === 'gravando') rodape = <Rodape {...mov} primario={T.gravandoNaoInterrompa} primarioDesabilitado explicacao={T.saidaVolta} />
  else if (fase === 'recusado') rodape = <Rodape {...mov} primario={T.tentarDeNovo} aoPrimario={retomar} link={T.voltar} aoLink={recuperar} />
  else if (fase === 'pausado') rodape = <Rodape {...mov} primario={T.reconectar} aoPrimario={retomar} link={T.voltar} aoLink={recuperar} />
  else if (fase === 'recuperacao') rodape = <Rodape {...mov} primario={T.continuar} aoPrimario={retomar} />
  else rodape = <Rodape {...mov} primario={T.voltar} aoPrimario={() => ir('T04')} />

  return (
    <div className="t09">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      {/* o ENCERRAR faz o mesmo que o voltar: antes de a Conexão gravar, abre a recuperação; na recuperação, fica apagado (a lei 17, diretor, 25/09) */}
      <Faixa serial={par.moduloSerial} placa={placaDe(par.ativoId)} acao={T.encerrar} aoEncerrar={encerrar} acaoDesabilitada={fase === 'recuperacao'} />
      <div className={`tela-miolo t09-miolo ${parada ? 't09-miolo-justo' : ''}`}>
        {cabeca}
        {fase !== 'recusado' && pinos}
        {aviso}
        {cadeia}
        {fase === 'concluida' && <Prova surge={aoVivo && !abriuConcluida} rotulo={T.gravadoERelido} versao={versaoGravada(TOTAL)} legenda={T.devolveu(TOTAL)} />}
      </div>
      {/* no 01, a linha dos pinos fica no pé, fora do miolo, como a referência desenha (G11, T09-D2) */}
      {fase === 'recusado' && pinos}
      {rodape}
      {enc.sobre}
    </div>
  )
}
