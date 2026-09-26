// T11 · Conferir configuração (02-telas/T11-conferir-configuracao): compara,
// bloco a bloco, o que o módulo tem gravado com o que o cadastro manda, em
// linguagem de negócio, e deixa o técnico corrigir, reenviar ou só registrar.
// · Os blocos são os cinco versionados da cadeia (M.cadeia, sem a limpeza), na
//   ordem canônica. O valor de cada linha é o que o cadastro manda: o do caso,
//   no par do diff-divergente; o cadastro do próprio par, nos outros (AC-17, G9).
// · O que não bate (a entrega do checklist, T11/00): cada bloco com o xis
//   vermelho e o par embaixo do nome — no módulo, o noModulo do caso, em
//   vermelho; no cadastro, o noCadastro. Todas as linhas têm 50, e a Conexão
//   também (antes, 72).
// · A tela confere ao abrir (G27), sobre o desenho do quadro a que ela chega:
//   cada bloco entra com o relógio no poço e vira check ou xis, um a cada
//   RITMOS.conferenciaLinhaMs (400 ms), no mesmo ritmo com reduzir movimento
//   (movimento.md:47, G26); o que o módulo tem espera a leitura chegar no bloco,
//   e o glifo e ele esmaecem em 150 ms (animacao.md; com reduzir, direto). O
//   veredito espera a última linha (a decisão do diretor de 25/09, C12·35 b): o
//   com contagem e, no 02, o 'igual à do cadastro' esperam no lugar, sem desenho
//   e mudos pro leitor, e entram esmaecendo. No print (EM_QUADRO), num estado da
//   coluna e na folha Outras ações aberta pelo endereço (03), nasce lida, parada:
//   o quadro de cada referência é o do fim.
// · O que diverge (T11·1, T11·2): a semente do painel (M2C-0438 + ONK-8Q90) é o
//   par do diff-divergente e abre na 00, com os cinco não batendo. Aberta pelo
//   menu com a sessão do herói (o par do conferencia-confere), nada diverge, e
//   ela vai pro 02. Depois de regravar pela T09, a mesma sessão confere: o
//   estado único registra a cadeia concluída (etapas.cadeia). O endereço do 02
//   monta o par que confere (G20), como a T04 ajusta o mundo do momento.
// · O 01 (a coluna) é o índice que o app não classifica (indice-nao-classificado),
//   no par da semente: os cinco blocos conferem, com o valor em --tinta, e o
//   cabeçalho diz NÃO BATE COM O CADASTRO · 1 a mais — o conteúdo fora de todos
//   os blocos, na nota entre a lista e a legenda (G24, T11-A5). No fluxo, o par da
//   semente é o do diff-divergente, e a semente abre na 00: o 01 é só da coluna.
// · O 04 (a coluna, a última entrega) é a versão que não se lê (versao-ilegivel),
//   no par da semente: a linha de condição embaixo do título (a pré-condição, com
//   o i), o diff por conteúdo com as 2 que o caso diz, e a legenda do arraste —
//   o que corrigir leva junto, de M.cadeia.arraste.
// · As ações (decisão 40, a última entrega · logica.md · As ações da conferência):
//   o rodapé tem um botão e um link (lei 19) — Corrigir as N divergências e
//   Outras ações, que abre a folha (03) com Reenviar os 5 blocos e Apenas
//   registrar o diagnóstico, cada uma com o efeito embaixo. Sem divergência (o
//   01), o Corrigir não aparece: o principal é o Reenviar, e o link, o Apenas
//   registrar. No protótipo, o Corrigir e o Reenviar levam à cadeia da T09 (a
//   de sempre, que regrava os seis); o Apenas registrar grava no estado único
//   (etapas.conferencia) e volta ao menu, sem item na fila (G25, T11-V4).
//   Voltar ao menu → T04 (02). ENCERRAR → antes do checklist, o diálogo
//   Encerrar sem homologar? (decisão 36), e a T16 sem homologar (G23).
// · A folha Outras ações (lei 20) fecha no X, tocando fora, arrastando e no
//   voltar do Android (o Esc), e a URL segue: o 03 com ela aberta, nada com ela
//   fechada (G20). Por cima, o véu começa embaixo da faixa, que fica acesa e
//   desabilitada, como a T11/03 desenha (e a T04/10); a tela atrás do véu fica
//   inerte (G25). Sobe em 200 e desce em 150 (movimento.md); pelo endereço ou no
//   print, nasce aberta, parada.
// · O voltar do Android (logica.md): o link de saída do rodapé. No 02, o Voltar
//   ao menu; no 01, o Apenas registrar o diagnóstico. Na 00 e no 04, o link é o
//   Outras ações, que não sai da tela, e ele não faz nada (como o Procurar de
//   novo da T05); com a folha aberta, fecha a folha.
import { useEffect, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Aviso, Lista, LinhaChecagem, Nota, Prova, Rodape,
  Veu, Folha, CartaoDeOpcoes, LinhaDeOpcao, Precondicao, ESTADOS,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
// a presença da folha (entra fechada e sobe; sai descendo antes de desmontar) é a da T01
import { usePresenca } from '../T01/presenca.js'
import {
  REF, BLOCOS, VERSAO_DO_CADASTRO, rotuloDe, ativoDe, mundoDoEstado,
  divergenciasDo, cadastroDo, moduloDo, mundoQueConfere, arrasteDe,
} from './conferencia.js'
import { T } from './textos.js'
import './t11.css'

// o nome do xis pro leitor segue o dado (G15): o bloco que não bate falhou na conferência
const NOME_DIVERGE = ESTADOS.xis.nome
const SEMENTE = SEMENTES.T11.sessao

// o par módulo × ativo da sessão; sem sessão, o da semente
const parDaSessao = (s) => (s?.ativoId ? { ativoId: s.ativoId, moduloSerial: s.moduloSerial } : { ativoId: SEMENTE.ativoId, moduloSerial: SEMENTE.moduloSerial })

// O endereço do 02 com a semente do painel (o par que diverge) pede outro
// mundo: a sessão do herói, que confere (T11·1, G20). A tela ajusta o estado
// único uma vez, ao montar, como a T04 faz com os momentos dela.
function ajusteDoMomento(momento, est, unico) {
  if (est != null || momento !== REF.confere) return null
  if (divergenciasDo(parDaSessao(unico.sessao), unico.etapas).length === 0) return null
  return mundoQueConfere(unico.sessao ?? SEMENTE)
}

export default function T11({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [ajuste] = useState(() => ajusteDoMomento(momento, est, unico))
  const [aplicado, setAplicado] = useState(!ajuste)
  useEffect(() => {
    if (ajuste) { despachar({ tipo: 'mesclar', parcial: ajuste }); setAplicado(true) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const mundo = aplicado ? unico : { ...unico, ...ajuste }

  // Num estado da coluna, o mundo é o da receita (receitas.js): o 01 é o índice
  // que o app não classifica, e o 04, a versão que não se lê — os dois no par da semente
  const doEstado = mundoDoEstado(est)
  const par = doEstado ? doEstado.par : parDaSessao(mundo.sessao)
  const sessao = mundo.sessao ?? SEMENTE
  const divergem = doEstado ? doEstado.divergem : divergenciasDo(par, mundo.etapas)
  const naoReconhecidos = doEstado?.naoReconhecidos ?? 0
  const versaoIlegivel = doEstado?.versaoIlegivel ?? false
  // tudo bate: nenhum bloco diverge, e nada fora deles (o 02)
  const bate = divergem.length === 0 && naoReconhecidos === 0
  // sem divergência, só o conteúdo não reconhecido (o 01): o Corrigir não aparece
  const soReenviar = divergem.length === 0 && !bate
  const cadastro = cadastroDo(par, sessao)
  const modulo = moduloDo(par)
  const total = BLOCOS.length
  const arrasta = arrasteDe(divergem)

  // a folha Outras ações (03): a URL abre e fecha (G20); fora do que diverge, não há folha
  const outrasPedida = est == null && !bate && momento === REF.outras
  const outras = usePresenca(outrasPedida)

  // a leitura: um bloco a cada 400 ms, na ordem da cadeia; parada no print, na
  // coluna e na folha aberta pelo endereço (o 03 é um quadro depois da leitura)
  const [nasceuLida] = useState(() => EM_QUADRO || est != null || outrasPedida)
  const [lidas, setLidas] = useState(() => (nasceuLida ? total : 0))
  const lendo = lidas < total
  useEffect(() => {
    if (!lendo) return undefined
    const relogio = setInterval(() => setLidas((n) => Math.min(n + 1, total)), RITMOS.conferenciaLinhaMs)
    return () => clearInterval(relogio)
  }, [lendo, total])

  // a URL segue o quadro (G20): nada diverge é o 02; o que diverge, a 00, ou o 03 com a folha aberta
  const quadro = bate ? REF.confere : outrasPedida ? REF.outras : null
  useEffect(() => {
    if (est != null || !aplicado) return
    if ((momento ?? null) !== quadro) despachar({ tipo: 'ir', tela: 'T11', momento: quadro ?? undefined })
  }, [est, aplicado, momento, quadro, despachar])

  // os toques
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // o Corrigir e o Reenviar gravam pela cadeia da T09 (a de sempre, que regrava os seis)
  const corrigir = () => ir('T09')
  const reenviar = () => ir('T09')
  // só registra o que a leitura achou, no estado único (G25: nenhum item na fila)
  const registrar = () => {
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...unico.etapas, conferencia: { diagnostico: 'registrado', blocos: divergem, as: M.HORA_NOMINAL } } } })
    ir('T04')
  }
  const voltar = () => ir('T04')
  const abrirOutras = () => ir('T11', { momento: REF.outras })
  const fecharOutras = () => ir('T11')
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar sem homologar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()

  // O voltar do Android (logica.md): no computador, o Esc — o mesmo que o link
  // de saída do rodapé; com a folha aberta, fecha a folha. Na 00 (e no 04), o link
  // é o Outras ações, que não sai da tela: não faz nada. Num estado da coluna, a peça não escuta.
  useVoltar(outrasPedida ? fecharOutras : bate ? voltar : soReenviar ? registrar : null)

  // o veredito: quantos não batem de 5; no 01, quantos conteúdos a mais
  let cabeca = <Aviso tom="veredito" titulo={T.confere} numero={total} unidade={T.deTotal(total)} />
  if (divergem.length) cabeca = <Aviso glifo="xis" titulo={T.naoBate} numero={divergem.length} unidade={T.deTotal(total)} />
  else if (!bate) cabeca = <Aviso glifo="xis" titulo={T.naoBate} numero={naoReconhecidos} unidade={T.aMais} />
  // o que espera a última linha fica no lugar, sem desenho e mudo, e entra esmaecendo
  const espera = lendo ? ' t11-espera' : ''

  // a legenda embaixo da lista: no 01, o que o Reenviar preserva; com o arraste (04), o que o Corrigir leva junto
  const legenda = soReenviar ? T.preservaConexao
    : arrasta ? T.arraste(arrasta.bloco, rotuloDe(arrasta.bloco), arrasta.levados.map((b) => [b, rotuloDe(b)]))
      : null

  // O rodapé (decisão 40, lei 19): um botão e um link
  let rodape
  if (bate) rodape = <Rodape primario={T.voltar} aoPrimario={voltar} />
  else if (soReenviar) rodape = <Rodape primario={T.reenviar(total)} aoPrimario={reenviar} link={T.registrar} aoLink={registrar} />
  else rodape = <Rodape primario={T.corrigir(divergem.length)} aoPrimario={corrigir} link={T.outrasAcoes} aoLink={abrirOutras} />

  // a tela atrás do véu da folha fica inerte (G25); a faixa, acesa em cima dele, desabilitada
  const atras = outras.montado ? '' : undefined
  return (
    <div className="t11">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      <fieldset className="t11-topo" role="presentation" disabled={outras.montado}>
        <Faixa serial={par.moduloSerial} placa={ativoDe(par.ativoId)?.placa} acao={T.encerrar} aoEncerrar={enc.encerrar} />
      </fieldset>
      <div className="t11-corpo" inert={atras}>
        <div className="tela-miolo t11-miolo">
          <CabecalhoConteudo titulo={T.titulo} />
          {versaoIlegivel && <Precondicao estado="info">{T.versaoIlegivel}</Precondicao>}
          <div className={`t11-veredito${espera}`} aria-hidden={lendo ? 'true' : undefined}>{cabeca}</div>
          <Lista>
            {BLOCOS.map((b, i) => {
              const diverge = divergem.includes(b)
              return (
                <LinhaChecagem key={b} variante="conferencia" estado={diverge ? 'diverge' : 'aprovada'} nomeGlifo={diverge ? NOME_DIVERGE : undefined}
                  titulo={rotuloDe(b)} valor={diverge ? undefined : cadastro[b]} valorAceso={soReenviar}
                  par={diverge ? { modulo: T.noModulo(modulo[b]), cadastro: T.noCadastro(cadastro[b]) } : undefined}
                  divisoria={i < total - 1} lendo={i >= lidas} acende={!nasceuLida} />
              )
            })}
          </Lista>
          {naoReconhecidos > 0 && <Nota tom="achado" titulo={T.naoReconhece} frase={T.foraDosBlocos(total)} />}
          {bate && <Prova tipo="cadeia" className={`t11-prova${espera}`} rotulo={T.versaoLida} versao={VERSAO_DO_CADASTRO} legenda={T.igualAoCadastro} legendaMuda={lendo} />}
          {legenda && <span className="t11-legenda">{legenda}</span>}
        </div>
        {rodape}
      </div>
      {outras.montado && (
        <div className="t11-sobre">
          <Veu de="folha" visivel={outras.visivel}>
            <Folha titulo={T.outrasAcoes} rotuloFechar={T.fechar} puxador={false} aoFechar={fecharOutras} aberta={outras.visivel}>
              <CartaoDeOpcoes>
                <LinhaDeOpcao variante="efeito" icone="reenviar" titulo={T.reenviar(total)} detalhe={T.efeitoReenviar} aoTocar={reenviar} />
                <LinhaDeOpcao variante="efeito" icone="diagnostico" titulo={T.registrar} detalhe={T.efeitoRegistrar} aoTocar={registrar} />
              </CartaoDeOpcoes>
            </Folha>
          </Veu>
        </div>
      )}
      {enc.sobre}
    </div>
  )
}
