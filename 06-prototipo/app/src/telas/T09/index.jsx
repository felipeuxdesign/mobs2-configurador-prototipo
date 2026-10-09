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
//   diálogo Encerrar antes de terminar? (a sessão está aberta: o módulo não troca).
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
//   Encerrar antes de terminar? por cima da tela (decisão 36), e a sessão abortada;
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
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Precondicao, Aviso, Cadeia, Prova, Rodape, Lista, LinhaEscolha, OQueConferir, Veu,
  useFimDaTroca, useTrocaDeQuadro,
} from '../../ds/index.js'
import { usePresenca } from '../../ds/chrome/PorCima.jsx'
import { dependentesDe, temDependente, motivoDe, faltaReenviarDe, comFalta, reenviado, manutencaoDoCaso } from '../../estado/reenvio.js'
import { FolhaDeConfirmacao } from './FolhaDeConfirmacao.jsx'
import { Pergunta } from './Pergunta.jsx'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import { milhar } from '../../dados/formato.js'
import {
  REF, CASO_RECUSA, CASO_QUEDA, CASO_NAO_CABE, CASO_POOL, CASO_SERVIDOR, ORDEM, TOTAL, CONEXAO, QUADRO_00, CURTA,
  BLOCOS_DA_MANUTENCAO, BLOCO_DA_MANUTENCAO, rotuloDe, placaDe, parDoCaso, paradaDoCaso, casoDoPar,
  conteudoNaTela, envioDo, travaDo, emManutencao, depoisDaCurta, elosDo, elosDaCurta,
  QUADRO_DA_MANUTENCAO, MOMENTO_DA_FOLHA, MOMENTO_DA_PERGUNTA,
} from './cadeia.js'
import { T } from './textos.js'
import './t09.css'

// o par módulo × ativo da sessão; sem sessão, o da semente
const parDaSessao = (s) => (s?.ativoId ? { ativoId: s.ativoId, moduloSerial: s.moduloSerial } : { ativoId: SEMENTES.T09.sessao.ativoId, moduloSerial: SEMENTES.T09.sessao.moduloSerial })

// o caso de cada estado da coluna (a receita)
const CASO_DO_ESTADO = {
  [REF.recusado]: CASO_RECUSA, [REF.queda]: CASO_QUEDA, [REF.recuperacao]: CASO_QUEDA,
  [REF.naoCabe]: CASO_NAO_CABE, [REF.cercasDemais]: CASO_POOL, [REF.semServidor]: CASO_SERVIDOR,
}

// O quadro em que a tela abre. Num estado da coluna, o do caso, parado (a
// receita). Pelo endereço de um momento, o dele. Sem momento: no print, o quadro
// da 00 (a cadeia correndo); no fluxo, a cadeia de onde o estado único diz que ela
// está (o Retomar da T16), a concluída, ou — nada gravado ainda — a entrada pelo
// modo: o que vai ser gravado (05) ou o escolher o bloco (08).
//   fase · antes · escolher · gravando · recusado · pausado · recuperacao · concluida · curta · curtaFeita
// os confirmados de cada fase da curta: a 09 é o quadro de 1 (a limpeza feita, o bloco gravando)
const CONFIRMADOS_DA_CURTA = { escolher: 0, curta: 1, curtaFeita: CURTA }
function daManutencao(q, par, falta = null) {
  return { par, confirmados: CONFIRMADOS_DA_CURTA[q.fase], fase: q.fase, parou: null, bloco: q.bloco, folha: q.folha ?? null, decisoes: {}, faltaFixa: falta }
}
function inicio(momento, est, unico) {
  // A manutenção da coluna consulta o caso inteiro, sem herdar bloco ou avanço do fluxo (o retorno do
  // PM de 09/10: a folha de cada bloco, a pergunta pelos dependentes e o que ficou para depois)
  const parDaManutencao = parDoCaso('modulo-ja-deste-ativo')
  if (QUADRO_DA_MANUTENCAO[est]) return daManutencao(QUADRO_DA_MANUTENCAO[est], parDaManutencao, [])
  if (est === REF.faltaReenviar) {
    const falta = manutencaoDoCaso('falta-reenviar').faltaReenviar
    return daManutencao({ fase: 'escolher', bloco: falta[0].bloco }, parDaManutencao, falta)
  }
  // o bloco que a conferência (T11) ou o checklist (T13) pede vem escolhido, pelo estado; sem pedido,
  // o primeiro que ficou para depois, ou as cercas · `agora`: o técnico já confirmou na T11, e a curta corre
  const falta = faltaReenviarDe(unico.etapas)
  const pedido = unico.etapas.ativo?.bloco
  const bloco = pedido && T.reenviar[pedido] ? pedido : falta[0]?.bloco ?? BLOCO_DA_MANUTENCAO
  if (est === REF.recusado) {
    const p = paradaDoCaso(CASO_RECUSA)
    return { par: parDoCaso(CASO_RECUSA), confirmados: ORDEM.indexOf(p.bloco), fase: 'recusado', parou: p.parou }
  }
  if (est === REF.queda || est === REF.recuperacao) {
    const p = paradaDoCaso(CASO_QUEDA)
    return { par: parDoCaso(CASO_QUEDA), confirmados: ORDEM.indexOf(p.bloco), fase: est === REF.queda ? 'pausado' : 'recuperacao', parou: p.parou }
  }
  if (est === REF.naoCabe || est === REF.cercasDemais) return { par: parDoCaso(CASO_DO_ESTADO[est]), confirmados: 0, fase: 'antes', parou: null }
  // a 12 (a rodada 1): a cadeia conferida, e o módulo do caso ainda não falou com o servidor — o caso
  // diz só o módulo, que é o do herói: o ônibus é o da semente
  if (est === REF.semServidor) return { par: { ativoId: SEMENTES.T09.sessao.ativoId, moduloSerial: M.casos[CASO_SERVIDOR].moduloSerial }, confirmados: TOTAL, fase: 'semServidor', parou: null }
  const par = parDaSessao(unico.sessao)
  if (QUADRO_DA_MANUTENCAO[momento]) return daManutencao(QUADRO_DA_MANUTENCAO[momento], par)
  if (emManutencao(unico) && pedido && unico.etapas.ativo?.agora) return daManutencao({ fase: 'curta', bloco }, par)
  if (emManutencao(unico) && pedido) return daManutencao({ fase: 'escolher', bloco }, par)
  // a 11: a Conexão gravada, e o módulo conferindo se falou com o servidor
  if (momento === REF.conferindoServidor) return { par, confirmados: TOTAL, fase: 'servidor', parou: null }
  if (momento === REF.concluida) return { par, confirmados: TOTAL, fase: 'concluida', parou: null }
  if (momento === REF.antes) return { par, confirmados: 0, fase: 'antes', parou: null }
  if (EM_QUADRO) return { par, confirmados: QUADRO_00, fase: 'gravando', parou: null }
  const gravados = unico.etapas.cadeia?.confirmados
  // na manutenção, o módulo já tem a configuração: a cadeia gravada não é a entrada — a lista é (o
  // retorno do PM de 09/10); só uma cadeia que ficou pela metade retoma
  if (emManutencao(unico) && !(gravados > 0 && gravados < TOTAL)) return daManutencao({ fase: 'escolher', bloco }, par)
  if (gravados > 0) return { par, confirmados: Math.min(gravados, TOTAL), fase: gravados >= TOTAL ? 'concluida' : 'gravando', parou: null }
  return emManutencao(unico)
    ? daManutencao({ fase: 'escolher', bloco }, par)
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
  const correndo = !EM_QUADRO && est == null && (fluxo.fase === 'gravando' || fluxo.fase === 'curta' || fluxo.fase === 'servidor')
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
      // a rodada 1: o módulo prova que falou com o servidor, um bloco depois da Conexão
      if (f.fase === 'servidor') { setFluxo({ ...f, fase: 'concluida' }); return }
      if (f.fase !== 'gravando') return
      const caso = casoDoPar(f.par, u.casosConsumidos)
      const parada = caso ? paradaDoCaso(caso) : null
      if (parada && parada.bloco === ORDEM[f.confirmados]) {
        despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...u.casosConsumidos, caso] } })
        setFluxo({ ...f, fase: parada.parou === 'recusa' ? 'recusado' : 'pausado', parou: parada.parou })
        return
      }
      const confirmados = f.confirmados + 1
      setFluxo({ ...f, confirmados, fase: confirmados >= TOTAL ? 'servidor' : 'gravando' })
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
      // o bloco conferido sai do que falta reenviar, e entra no que já foi (o retorno do PM de 09/10)
      if (u.etapas.cadeia?.reenviado !== fluxo.bloco || faltaReenviarDe(u.etapas).some((x) => x.bloco === fluxo.bloco)) {
        despachar({ tipo: 'mesclar', parcial: { etapas: { ...reenviado(u.etapas, fluxo.bloco), cadeia: { ...(u.etapas.cadeia ?? {}), reenviado: fluxo.bloco } } } })
      }
      return
    }
    if (quadro !== 'cadeia' || fluxo.confirmados === 0) return
    if (u.etapas.cadeia?.confirmados === fluxo.confirmados) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, cadeia: { confirmados: fluxo.confirmados } } } })
  }, [fluxo.confirmados, fluxo.fase, est, despachar]) // eslint-disable-line react-hooks/exhaustive-deps

  // o último relido: a URL passa a dizer 04 — e, na cadeia curta, 10 (o pacote 5)
  useEffect(() => {
    if (est != null) return
    // a curta conferida: a pergunta de cada bloco tem o seu quadro (10, 14, 15); a dos eventos e a da
    // conexão, que nenhuma referência desenha, ficam no endereço da curta
    const m = fluxo.fase === 'concluida' ? REF.concluida : fluxo.fase === 'curtaFeita' ? MOMENTO_DA_PERGUNTA[fluxo.bloco] ?? null : fluxo.fase === 'servidor' ? REF.conferindoServidor : null
    if (m && vivo.current.momento !== m) despachar({ tipo: 'ir', tela: 'T09', momento: m })
  }, [fluxo.fase, fluxo.bloco, est, despachar])
  // o pedido já confirmado (o `agora` da T11) vale uma vez: a curta já está correndo
  useEffect(() => {
    const u = vivo.current.unico
    if (est == null && u.etapas.ativo?.agora) despachar({ tipo: 'mesclar', parcial: { etapas: { ...u.etapas, ativo: { ...u.etapas.ativo, agora: false } } } })
    if (est == null && fluxo.fase === 'curta' && vivo.current.momento !== REF.reenviando) despachar({ tipo: 'ir', tela: 'T09', momento: REF.reenviando })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // a troca de quadro (C12·4): o que vai ser gravado → a cadeia, o escolher → a curta
  useTrocaDeQuadro(quadro)
  // a cadeia concluída e o servidor (a rodada 1): o quadro que a URL abre já rolado até o fim, como a
  // 04 e a 12 desenham — a prova e o que conferir à vista
  useLayoutEffect(() => {
    if (fluxo.fase !== 'concluida' && fluxo.fase !== 'semServidor') return
    const miolo = document.querySelector('.t09 .tela-miolo')
    if (miolo) miolo.scrollTop = miolo.scrollHeight
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
  // Reenviar um bloco: a cadeia curta, pela limpeza só dele (09) · nenhum outro vai junto
  function reenviar(bloco) {
    setFluxo((f) => ({ ...f, bloco: bloco ?? f.bloco, fase: 'curta', confirmados: 0, parou: null, folha: null, decisoes: {} }))
    ir('T09', { momento: REF.reenviando })
  }
  // O retorno do PM de 09/10: o bloco que tem dependente pede a confirmação antes (a folha, 13, 17 e
  // 18); o que não tem vai direto. A folha confirmada reenvia; o Cancelar só fecha
  function pedirReenvio() {
    const { bloco: b } = vivo.current.fluxo
    if (!temDependente(b)) { reenviar(b); return }
    setFluxo((f) => ({ ...f, folha: b }))
    ir('T09', { momento: MOMENTO_DA_FOLHA[b] })
  }
  const fecharFolha = () => { setFluxo((f) => ({ ...f, folha: null })); ir('T09', { momento: REF.escolher }) }
  // a pergunta pelos dependentes (10, 14, 15): Reenviar corre a curta dele, sem folha — a pergunta é
  // a confirmação; Deixar para depois marca *falta reenviar*, aqui, na T11 e na T13
  const deixar = (b) => {
    const de = vivo.current.fluxo.bloco
    setFluxo((f) => ({ ...f, decisoes: { ...f.decisoes, [b]: 'depois' } }))
    if (est == null) despachar({ tipo: 'mesclar', parcial: { etapas: comFalta(vivo.current.unico.etapas, [{ bloco: b, por: de }]) } })
  }
  // sair da pergunta não perde nada: o que não foi decidido vira pendência
  function sairDaPergunta() {
    const { bloco: de, decisoes } = vivo.current.fluxo
    const abertos = dependentesDe(de).filter((b) => !decisoes[b]).map((b) => ({ bloco: b, por: de }))
    if (abertos.length && est == null) despachar({ tipo: 'mesclar', parcial: { etapas: comFalta(vivo.current.unico.etapas, abertos) } })
    ir('T04')
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
  // o diálogo Encerrar antes de terminar? por cima desta tela; depois, direto, pra T16.
  // O Procurar outro módulo das travas do envio é o mesmo diálogo: com a sessão
  // aberta, o módulo não troca (a resposta do arquiteto ao gate do pacote 1)
  const enc = useEncerrar()
  const PRENDE = ['gravando', 'recusado', 'pausado']
  function encerrar() {
    const { fase } = vivo.current.fluxo
    if (fase === 'recuperacao' || fase === 'curta' || fase === 'servidor') return // G23 · lei 17: ali o ENCERRAR não faz nada
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
  useVoltar(fluxo.folha ? fecharFolha : PRENDE.includes(fase) ? recuperar : fase === 'recuperacao' || fase === 'curta' || fase === 'servidor' ? null
    : fase === 'curtaFeita' ? sairDaPergunta : voltarAoMenu)
  // o que ficou para depois: o do caso, numa consulta da coluna; o do estado único, no fluxo
  const falta = fluxo.faltaFixa ?? faltaReenviarDe(unico.etapas)
  const faltaDe = (b) => falta.find((x) => x.bloco === b)
  // a folha de confirmação (13, 17, 18): sobe e desce como toda folha; a que fecha fica desenhada até sair
  const folha = usePresenca(Boolean(fluxo.folha))
  const ultimaFolha = useRef(fluxo.folha)
  if (fluxo.folha) ultimaFolha.current = fluxo.folha
  // a pergunta: nasce embaixo do check, ao vivo (a curta que acaba de conferir); pelo endereço, parada
  const [abriuNaPergunta] = useState(() => fluxo.fase === 'curtaFeita')

  const conteudo = conteudoNaTela(par)
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
        {trava === 'cercas-demais' && <Aviso tom="falha" glifo="xis" titulo={T.naoCabeTitulo} frase={T.pontosDemaisFrase(milhar(envio.pontos), milhar(envio.pontosMax))} />}
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
    // ── a manutenção: escolher o bloco (08) · o que ficou para depois, marcado, com o motivo (16) ──
    const ultimo = BLOCOS_DA_MANUTENCAO.length - 1
    const aviso = falta.length ? T.faltaReenviar(falta.map((x) => x.bloco)) : T.reenvieUm
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} />
        <Aviso tom="neutro" glifo="info" titulo={T.manutencao} frase={aviso} />
        <Lista role="radiogroup" aria-label={T.titulo}>
          {BLOCOS_DA_MANUTENCAO.map((b, i) => {
            const f = faltaDe(b)
            return (
              <LinhaEscolha key={b} nome={rotuloDe(b)} detalhe={f ? motivoDe(b, f.por) : T.descricao[b]}
                valor={f ? T.faltaReenviarValor : conteudo[b]} valorTom={f ? 'forte' : 'secundaria'}
                estado={b === fluxo.bloco ? 'escolhida' : 'disponivel'}
                aoTocar={() => setFluxo((x) => ({ ...x, bloco: b }))} divisoria={i < ultimo} />
            )
          })}
        </Lista>
      </>
    )
    rodape = <Rodape primario={T.reenviar[fluxo.bloco]} aoPrimario={pedirReenvio} link={T.voltar} aoLink={voltarAoMenu} />
  } else if (fase === 'curta' || fase === 'curtaFeita') {
    // ── a manutenção: a cadeia curta (09) — a limpeza só do bloco, e o bloco · conferida, a pergunta
    // pelos dependentes, um por vez, na ordem do script (10, 14, 15) ──
    const dependentes = dependentesDe(fluxo.bloco)
    const decididos = (i) => dependentes.slice(0, i).every((b) => fluxo.decisoes[b] === 'depois')
    const itens = dependentes.map((b, i) => {
      const anterior = !decididos(i) ? dependentes[i - 1] : null
      const motivo = motivoDe(b, fluxo.bloco)
      return {
        bloco: b, rotulo: rotuloDe(b), decisao: fluxo.decisoes[b] ?? null, liberado: decididos(i), acendeu: i > 0 && aoVivo,
        motivo: anterior ? `${motivo} · ${T.liberaDepois(rotuloDe(anterior))}` : motivo,
      }
    })
    const frase = fase === 'curta' ? T.reenviando[fluxo.bloco]
      : dependentes.length ? T.confereComDependentes[fluxo.bloco](dependentes.length) : T.confereSo[fluxo.bloco]
    miolo = (
      <>
        <CabecalhoConteudo titulo={T.titulo} />
        <Aviso tom="neutro" glifo="info" titulo={T.manutencao} frase={frase} />
        <Cadeia elos={elosDaCurta(k, fluxo.bloco, conteudo)} altura="correndo" curta />
        {fase === 'curta' && <p className="t09-ficam">{depoisDaCurta(fluxo.bloco, dependentes, falta.map((x) => x.bloco))}</p>}
        {fase === 'curtaFeita' && dependentes.length > 0 && (
          <Pergunta itens={itens} surge={aoVivo && !abriuNaPergunta} aoReenviar={reenviar} aoDeixar={deixar} />
        )}
      </>
    )
    // conferida: com dependente, o Voltar ao menu vira link — sair não perde nada, o que ficar vira pendência
    rodape = fase === 'curta'
      ? <Rodape {...mov} primario={T.gravandoNaoInterrompa} primarioDesabilitado explicacao={T.saidaVolta} />
      : dependentes.length ? <Rodape link={T.voltar} aoLink={sairDaPergunta} />
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
        {fase === 'concluida' && <Prova surge={aoVivo && !abriuConcluida} rotulo={T.conferidoNoModulo} versao={T.passos(TOTAL)} legenda={T.devolveu(TOTAL)} />}
        {fase === 'semServidor' && <OQueConferir rotulo={T.oQueConferir} causas={T.conferirServidor} />}
      </>
    )
    // a rodada 1: não se sai do meio — no recusado e na queda, só o Tentar de novo e o Reconectar
    if (fase === 'gravando' || fase === 'servidor') rodape = <Rodape {...mov} primario={T.gravandoNaoInterrompa} primarioDesabilitado explicacao={T.saidaVolta} />
    else if (fase === 'recusado') rodape = <Rodape {...mov} primario={T.tentarDeNovo} aoPrimario={retomar} />
    else if (fase === 'pausado') rodape = <Rodape {...mov} primario={T.reconectar} aoPrimario={retomar} />
    else if (fase === 'recuperacao') rodape = <Rodape {...mov} primario={T.continuar} aoPrimario={retomar} />
    else rodape = <Rodape {...mov} primario={T.voltar} aoPrimario={voltarAoMenu} />
  }

  return (
    <div className="t09">
      <BarraDoSistema fundo="faixa" veu={folha.visivel ? 'folha' : enc.veu} />
      {/* o ENCERRAR faz o mesmo que o voltar: antes de a Conexão gravar, abre a recuperação; na recuperação e na cadeia curta, fica apagado (a lei 17, diretor, 25/09) */}
      <div className="t09-topo" inert={folha.montado ? '' : undefined}>
        <Faixa serial={par.moduloSerial} placa={placaDe(par.ativoId)} acao={T.encerrar} aoEncerrar={encerrar} acaoDesabilitada={fase === 'recuperacao' || fase === 'curta'} />
      </div>
      {/* o miolo nasce com o quadro: as peças de dentro não esmaecem de novo por dentro da troca */}
      <div key={`miolo·${quadro}`} className={`tela-miolo t09-miolo ${parada ? 't09-miolo-justo' : ''}`} inert={folha.montado ? '' : undefined}>
        {miolo}
      </div>
      {/* o rodapé nasce com o quadro: dentro da troca, o texto do primário não esmaece de novo */}
      <div className="t09-pe" inert={folha.montado ? '' : undefined}>
        <Fragment key={`rodape·${quadro}`}>{rodape}</Fragment>
      </div>
      {/* a folha de confirmação (o retorno do PM de 09/10): por cima da lista, que fica atrás do véu, inerte (G25) */}
      {folha.montado && (
        <div className="t09-sobre t-confirmacao">
          <Veu de="folha" visivel={folha.visivel}>
            <FolhaDeConfirmacao bloco={ultimaFolha.current} aberta={folha.visivel} aoConfirmar={() => reenviar(ultimaFolha.current)} aoFechar={fecharFolha} />
          </Veu>
        </div>
      )}
      {enc.sobre}
    </div>
  )
}
