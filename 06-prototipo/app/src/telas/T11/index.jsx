// T11 · Conferir configuração (02-telas/T11-conferir-configuracao): compara,
// bloco a bloco, o que o módulo tem gravado com o que o cadastro manda, em
// linguagem de negócio, e deixa o técnico regravar os cinco ou só registrar.
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
//   e mudos pro leitor, e entram esmaecendo. No print (EM_QUADRO) e num estado da coluna, nasce
//   lida, parada: o quadro de cada referência é o do fim.
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
// · Os toques: Regravar os cinco blocos → T09 · Só registrar o diagnóstico →
//   registra no estado único (etapas.conferencia) e volta ao menu, sem item na
//   fila, porque o mock não tem onde (G25, T11-V4) · Voltar ao menu → T04 ·
//   ENCERRAR → a T16, sem homologar antes do checklist (G23). O voltar do
//   Android (o Esc) faz o mesmo que o link de saída do rodapé (logica.md): no
//   00, registra e volta; no 02, volta.
import { useEffect, useState } from 'react'
import { BarraDoSistema, Faixa, CabecalhoConteudo, Aviso, Lista, LinhaChecagem, Nota, Prova, Rodape, ESTADOS } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { SEMENTES } from '../../estado/sementes.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import {
  REF, BLOCOS, VERSAO_DO_CADASTRO, rotuloDe, ativoDe, mundoDoEstado,
  divergenciasDo, cadastroDo, moduloDo, mundoQueConfere,
} from './conferencia.js'
import { T } from './textos.js'
import './t11.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)
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
  // que o app não classifica, no par da semente, com os cinco blocos conferindo
  const doEstado = mundoDoEstado(est)
  const par = doEstado ? doEstado.par : parDaSessao(mundo.sessao)
  const sessao = mundo.sessao ?? SEMENTE
  const divergem = doEstado ? doEstado.divergem : divergenciasDo(par, mundo.etapas)
  const naoReconhecidos = doEstado?.naoReconhecidos ?? 0
  // tudo bate: nenhum bloco diverge, e nada fora deles (o 02)
  const bate = divergem.length === 0 && naoReconhecidos === 0
  const cadastro = cadastroDo(par, sessao)
  const modulo = moduloDo(par)
  const total = BLOCOS.length

  // a leitura: um bloco a cada 400 ms, na ordem da cadeia; parada no print e na coluna
  const nasceuLida = EM_QUADRO || est != null
  const [lidas, setLidas] = useState(() => (nasceuLida ? total : 0))
  const lendo = lidas < total
  useEffect(() => {
    if (!lendo) return undefined
    const relogio = setInterval(() => setLidas((n) => Math.min(n + 1, total)), RITMOS.conferenciaLinhaMs)
    return () => clearInterval(relogio)
  }, [lendo, total])

  // a URL segue o quadro (G20): nada diverge é o 02; o que diverge, a 00
  const quadro = bate ? REF.confere : null
  useEffect(() => {
    if (est != null || !aplicado) return
    if ((momento ?? null) !== quadro) despachar({ tipo: 'ir', tela: 'T11', momento: quadro ?? undefined })
  }, [est, aplicado, momento, quadro, despachar])

  // os toques
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const regravar = () => ir('T09')
  // só registra o que a leitura achou, no estado único (G25: nenhum item na fila)
  const registrar = () => {
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...unico.etapas, conferencia: { diagnostico: 'registrado', blocos: divergem, as: M.HORA_NOMINAL } } } })
    ir('T04')
  }
  const voltar = () => ir('T04')
  const encerrar = () => ir('T16', unico.etapas.checklist?.homologada ? {} : { momento: ENCERRAR_SEM_HOMOLOGAR })

  // O voltar do Android (logica.md): no computador, o Esc — o mesmo que o link
  // de saída do rodapé. Num estado da coluna, a peça não escuta.
  useVoltar(bate ? voltar : registrar)

  // o veredito: quantos não batem de 5; no 01, quantos conteúdos a mais
  let cabeca = <Aviso tom="veredito" titulo={T.confere} numero={total} unidade={T.deTotal(total)} />
  if (divergem.length) cabeca = <Aviso glifo="xis" titulo={T.naoBate} numero={divergem.length} unidade={T.deTotal(total)} />
  else if (!bate) cabeca = <Aviso glifo="xis" titulo={T.naoBate} numero={naoReconhecidos} unidade={T.aMais} />
  // o que espera a última linha fica no lugar, sem desenho e mudo, e entra esmaecendo
  const espera = lendo ? ' t11-espera' : ''

  return (
    <div className="t11">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      <Faixa serial={par.moduloSerial} placa={ativoDe(par.ativoId)?.placa} acao={T.encerrar} aoEncerrar={encerrar} />
      <div className="tela-miolo t11-miolo">
        <CabecalhoConteudo titulo={T.titulo} />
        <div className={`t11-veredito${espera}`} aria-hidden={lendo ? 'true' : undefined}>{cabeca}</div>
        <Lista>
          {BLOCOS.map((b, i) => {
            const diverge = divergem.includes(b)
            return (
              <LinhaChecagem key={b} variante="conferencia" estado={diverge ? 'diverge' : 'aprovada'} nomeGlifo={diverge ? NOME_DIVERGE : undefined}
                titulo={rotuloDe(b)} valor={diverge ? undefined : cadastro[b]} valorAceso={!bate}
                par={diverge ? { modulo: T.noModulo(modulo[b]), cadastro: T.noCadastro(cadastro[b]) } : undefined}
                divisoria={i < total - 1} lendo={i >= lidas} acende={!nasceuLida} />
            )
          })}
        </Lista>
        {naoReconhecidos > 0 && <Nota tom="achado" titulo={T.naoReconhece} frase={T.foraDosBlocos} />}
        {bate
          ? <Prova tipo="cadeia" className={`t11-prova${espera}`} rotulo={T.versaoLida} versao={VERSAO_DO_CADASTRO} legenda={T.igualAoCadastro} legendaMuda={lendo} />
          : <span className="t11-legenda">{T.legenda(total)}</span>}
      </div>
      {bate
        ? <Rodape primario={T.voltar} aoPrimario={voltar} />
        : <Rodape primario={T.regravar(total)} aoPrimario={regravar} link={T.soRegistrar} aoLink={registrar} />}
    </div>
  )
}
