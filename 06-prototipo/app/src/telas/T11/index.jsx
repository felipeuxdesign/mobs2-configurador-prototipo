// T11 · Conferir configuração (02-telas/T11-conferir-configuracao): compara,
// bloco a bloco, o que o módulo tem gravado com o que o cadastro manda, em
// linguagem de negócio, e deixa o técnico regravar os cinco ou só registrar.
// · Os blocos são os cinco versionados da cadeia (M.cadeia, sem a limpeza), na
//   ordem canônica. O valor de cada linha é o que o cadastro manda: o do caso,
//   no par do diff-divergente; o cadastro do próprio par, nos outros (AC-17, G9).
// · A tela lê ao abrir (G27), sobre o desenho da 00: os glifos das cinco linhas
//   acendem em ordem, um a cada RITMOS.conferenciaLinhaMs (400 ms), no mesmo
//   ritmo com reduzir movimento (movimento.md:47, G26). O esmaecer do glifo é
//   do C12. No print (EM_QUADRO) e num estado da coluna, nasce lida, parada.
// · O que diverge (T11·1, T11·2): a semente do painel (M2C-0438 + ONK-8Q90) é o
//   par do diff-divergente e abre na 00, com os cinco não batendo. Aberta pelo
//   menu com a sessão do herói (o par do conferencia-confere), nada diverge, e
//   ela vai pro 02. Depois de regravar pela T09, a mesma sessão confere: o
//   estado único registra a cadeia concluída (etapas.cadeia). O endereço do 02
//   monta o par que confere (G20), como a T04 ajusta o mundo do momento.
// · O 01 (a coluna) é a 00 montada pelo diff-divergente, com o conteúdo que o
//   app não reconhece (indice-nao-classificado) entre a lista e a legenda — a
//   legenda desce, como a referência desenha (G24, T11-A5). No fluxo, o par da
//   semente é o mesmo dos dois casos, e a semente abre na 00: o 01 é só da coluna.
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
  divergenciasDo, cadastroDo, mundoQueConfere,
} from './conferencia.js'
import { T } from './textos.js'
import './t11.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)
// o nome do traço pro leitor segue o dado (G15): o bloco que não bate falhou na conferência
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

  // Num estado da coluna, o mundo é o da receita (receitas.js): o 01 é a 00 do
  // diff-divergente com o índice que o app não classifica, no par dos dois
  const doEstado = mundoDoEstado(est)
  const par = doEstado ? doEstado.par : parDaSessao(mundo.sessao)
  const sessao = mundo.sessao ?? SEMENTE
  const divergem = doEstado ? doEstado.divergem : divergenciasDo(par, mundo.etapas)
  const confere = divergem.length === 0
  const naoReconhece = Boolean(doEstado?.naoReconhece)
  const cadastro = cadastroDo(par, sessao)
  const total = BLOCOS.length

  // a leitura: uma linha a cada 400 ms, na ordem da cadeia; parada no print e na coluna
  const [lidas, setLidas] = useState(() => (EM_QUADRO || est != null ? total : 0))
  const lendo = lidas < total
  useEffect(() => {
    if (!lendo) return undefined
    const relogio = setInterval(() => setLidas((n) => Math.min(n + 1, total)), RITMOS.conferenciaLinhaMs)
    return () => clearInterval(relogio)
  }, [lendo, total])

  // a URL segue o quadro (G20): nada diverge é o 02; o que diverge, a 00
  const quadro = confere ? REF.confere : null
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
  useVoltar(confere ? voltar : registrar)

  const cabeca = confere
    ? <Aviso tom="veredito" titulo={T.confere} numero={total - divergem.length} unidade={T.deTotal(total)} />
    : <Aviso glifo="xis" titulo={T.naoBate} numero={divergem.length} unidade={T.deTotal(total)} />

  return (
    <div className="t11">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      <Faixa serial={par.moduloSerial} placa={ativoDe(par.ativoId)?.placa} acao={T.encerrar} aoEncerrar={encerrar} />
      <div className="tela-miolo t11-miolo">
        <CabecalhoConteudo titulo={T.titulo} />
        {cabeca}
        <Lista>
          {BLOCOS.map((b, i) => {
            const fim = i === total - 1
            const diverge = divergem.includes(b)
            return (
              <LinhaChecagem key={b} variante="conferencia" estado={diverge ? 'diverge' : 'aprovada'} nomeGlifo={diverge ? NOME_DIVERGE : undefined}
                titulo={rotuloDe(b)} valor={cadastro[b]} divisoria={!fim} folgaFim={fim ? 'conferencia' : false} lendo={i >= lidas} />
            )
          })}
        </Lista>
        {naoReconhece && <Nota tom="achado" titulo={T.naoReconhece} frase={T.foraDosBlocos} />}
        {confere
          ? <Prova tipo="cadeia" rotulo={T.versaoLida} versao={VERSAO_DO_CADASTRO} legenda={T.igualAoCadastro} />
          : <span className="t11-legenda">{T.legenda(total)}</span>}
      </div>
      {confere
        ? <Rodape primario={T.voltar} aoPrimario={voltar} />
        : <Rodape primario={T.regravar(total)} aoPrimario={regravar} link={T.soRegistrar} aoLink={registrar} />}
    </div>
  )
}
