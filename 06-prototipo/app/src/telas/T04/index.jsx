// T04 · Menu (02-telas/T04-menu): a grade de dez cartões em que cada
// ferramenta diz, no próprio cartão, o que falta pra ela funcionar. Em cima, a
// tira de contexto e a faixa da sessão; por cima, as folhas da conta e da
// garagem e os dois diálogos. Tudo lê do estado único e do mock: o estado muda
// o que os blocos dizem, nunca onde eles ficam (Lei 3).
import { useEffect, useState } from 'react'
import {
  BarraDoSistema, TopoDoMenu, TiraDeContexto, Faixa, GradeFerramentas, CartaoFerramenta,
  Veu, Folha, CartaoDaConta, PrazoDaConta, BotaoDaFolha, Dialogo, Frase, Destaque,
  Aviso, Lista, LinhaGaragem,
} from '../../ds/index.js'
import { useEstado, estadoVazio } from '../../estado/estado.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import {
  REF, SOBRE, MOMENTO_DA_FOLHA, placaDe, uoDe, iniciais, filaToda, pendentesDaGaragem, naFila,
  enviando, checklistPendentes, prazoDoAcesso, garagens,
} from './dados.js'
import './t04.css'

// as seis ferramentas que dependem do módulo e do ativo, na ordem da grade
const FERRAMENTAS = [
  { icone: 'can', titulo: 'Dados da CAN', tela: 'T07' },
  { icone: 'configurar', titulo: 'Configurar módulo', tela: 'T09' },
  { icone: 'refazer', titulo: 'Refazer leitura', tela: 'T08' },
  { icone: 'calibracao', titulo: 'Calibração', tela: 'T10' },
  { icone: 'conferir', titulo: 'Conferir configuração', tela: 'T11' },
  { icone: 'checklist', titulo: 'Finalizar com checklist', tela: 'T13', contaChecklist: true },
]
const HEROI = SEMENTES.T04.sessao
const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)

// O palco abre o momento com a semente da T04 (a sessão do herói). O 01 e o 02
// pedem outro mundo: sem sessão, e com o módulo sem o ativo. A tela ajusta o
// estado único uma vez, ao montar.
function ajusteDoMomento(momento, unico) {
  if (momento === REF.semModulo && unico.sessao) return { sessao: null }
  if (momento === REF.semAtivo && unico.sessao?.ativoId) return { sessao: { ...unico.sessao, ativoId: null } }
  return null
}

// Num estado da coluna, o mundo é o do caso (receitas.js): a falha do 03 é só
// "o link caiu", na sessão do herói; o 04 e o 09 também pedem a sessão inteira.
function sessaoDoEstado(sessao, est) {
  const precisa = est === REF.falha || est === REF.checklist || est === REF.trocar
  const base = precisa && !sessao?.ativoId ? HEROI : sessao
  return est === REF.falha && M.casos['link-perdido'] ? { ...base, saude: 'falha' } : base
}

export default function T04({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const [ajuste] = useState(() => ajusteDoMomento(momento, unico))
  const [aplicado, setAplicado] = useState(!ajuste)
  const [trocarPara, setTrocarPara] = useState(null) // o diálogo de trocar (o 09), no fluxo
  useEffect(() => {
    if (ajuste) { despachar({ tipo: 'mesclar', parcial: ajuste }); setAplicado(true) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const mundo = aplicado ? unico : { ...unico, ...ajuste }
  const sessao = est ? sessaoDoEstado(mundo.sessao, est) : mundo.sessao
  const completa = Boolean(sessao?.ativoId)
  const uoId = mundo.contexto.uoId ?? M.contextoAtivo.uoId
  const fila = filaToda(mundo)
  const itensNaFila = naFila(fila)
  // T04·3 (a): no fluxo, a folha abre sem envio em curso; o 08 só pela coluna
  const subindo = est === REF.envio ? enviando(fila) : 0
  // T04·2 (b): o contador do checklist só depois de aberto uma vez
  const checklistAberto = mundo.etapas.checklist != null || est === REF.checklist
  const rede = mundo.situacao.rede === 'conectada'

  // o que está por cima do menu: pela referência do estado, pelo momento, ou o diálogo de trocar
  const sobre = est ? (SOBRE[est] ?? null) : (trocarPara ? 'trocar' : (SOBRE[momento] ?? null))
  const base = !sessao ? REF.semModulo : !completa ? REF.semAtivo : null

  // a URL segue o quadro do menu (G20): sem sessão é o 01, sem ativo é o 02
  useEffect(() => {
    if (est || !aplicado || SOBRE[momento]) return
    if ((momento ?? null) !== base) despachar({ tipo: 'ir', tela: 'T04', momento: base ?? undefined })
  }, [est, aplicado, momento, base, despachar])

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const abrir = (folha) => { setTrocarPara(null); ir('T04', { momento: MOMENTO_DA_FOLHA[folha] }) }
  const fechar = () => { setTrocarPara(null); ir('T04', { momento: base ?? undefined }) }
  const vazio = estadoVazio()

  // Sair da conta (T04·5 a): sem sessão e sem fila, sai direto; senão, o diálogo.
  // Provisório até o C11: com a sessão aberta, o primário não passa pelo
  // encerramento sem homologar da T16 — encerra e vai pro login.
  const sairDeVez = () => {
    despachar({ tipo: 'mesclar', parcial: { sessao: null, contexto: vazio.contexto, etapas: vazio.etapas } })
    ir('T01')
  }
  const pedirSaida = () => (sessao || itensNaFila > 0 ? abrir('sair') : sairDeVez())
  // Trocar de garagem (T04·4 a): com a sessão aberta, o diálogo; sem ela, direto.
  // Provisório até o C11: o primário segue direto pra T03 da garagem nova.
  const trocarDeVez = (id) => {
    despachar({ tipo: 'mesclar', parcial: { sessao: null, etapas: vazio.etapas, contexto: { uoId: id, pacote: null } } })
    ir('T03')
  }
  const escolher = (id) => (sessao ? setTrocarPara(id) : trocarDeVez(id))

  const tecnico = mundo.tecnico.nome
  const sigla = iniciais(tecnico)
  const pendentesFila = pendentesDaGaragem(fila, uoId)
  const pendentesChecklist = completa && checklistAberto ? checklistPendentes(mundo.etapas.checklist) : 0

  // ── o topo ──
  const faixa = !sessao
    ? <Faixa lugar="menu" estado="sem-sessao" fato="Sem sessão de configuração" />
    : sessao.saude === 'falha'
      ? <Faixa lugar="menu" estado="falha" fato="Módulo com falha" acao="ENCERRAR" tracoSobreposto aoEncerrar={() => ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR })} />
      : <Faixa lugar="menu" serial={sessao.moduloSerial} placa={completa ? placaDe(sessao.ativoId) : 'sem ativo'} semAtivo={!completa}
          acao="ENCERRAR" aoEncerrar={() => ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR })} />

  // ── os dois cartões largos: o módulo e o ativo (T04·7: com a sessão, não navegam) ──
  const poco = sessao ? 30 : 34
  const conectar = !sessao
    ? <CartaoFerramenta largo estado="decide" icone="conectar" poco={poco} titulo="CONECTAR MÓDULO" valor="toque para procurar" aoTocar={() => ir('T05')} />
    : <CartaoFerramenta largo icone="conectar" poco={poco} titulo="CONECTAR MÓDULO" valor={sessao.moduloSerial} travado />
  const ativo = !sessao
    ? <CartaoFerramenta largo estado="espera" poco={poco} titulo="ATIVO SELECIONADO" valor="nenhum" />
    : !completa
      ? <CartaoFerramenta largo estado="decide" icone="ativo" poco={poco} titulo="ATIVO SELECIONADO" valor="toque para escolher" aoTocar={() => ir('T06')} />
      : <CartaoFerramenta largo icone="ativo" poco={poco} titulo="ATIVO SELECIONADO" valor={placaDe(sessao.ativoId)} travado />
  const causa = !sessao ? 'espera módulo e ativo' : !completa ? 'espera ativo' : undefined

  // ── por cima: as folhas e os diálogos ──
  let porCima = null
  if (sobre === 'conta') {
    const { restam, total } = prazoDoAcesso(mundo.situacao.sessaoAcesso)
    porCima = (
      <Veu de="folha">
        <Folha titulo="Conta" rotuloFechar="Fechar" minima aoFechar={fechar}>
          <CartaoDaConta iniciais={sigla} nome={tecnico} detalhe={`${mundo.tecnico.usuario} · ${M.empresa.nome}`} />
          <PrazoDaConta rotulo="ACESSO VENCE EM" restam={restam} total={total} unidade="dias"
            resta={`RESTAM ${restam} DE ${total} DIAS`} legenda="Sincronize para renovar o acesso." />
          <BotaoDaFolha aoTocar={pedirSaida}>Sair da conta</BotaoDaFolha>
        </Folha>
      </Veu>
    )
  } else if (sobre === 'sair') {
    porCima = (
      <Veu de="dialogo">
        <Dialogo titulo="Sair da conta" primario="Encerrar a sessão e sair" aoPrimario={sairDeVez}
          saida="Cancelar" aoSair={() => abrir('conta')} saidaDe44 margem={20}>
          {itensNaFila > 0 && <Frase><Destaque>{itensNaFila}</Destaque> itens continuam na fila e sobem no próximo login.</Frase>}
          {sessao && <Frase>A sessão de configuração do <Destaque>{sessao.moduloSerial}</Destaque> é encerrada antes.</Frase>}
        </Dialogo>
      </Veu>
    )
  } else if (sobre === 'garagem') {
    const lista = garagens()
    porCima = (
      <Veu de="folha">
        <Folha titulo="Trocar de garagem" rotuloFechar="Fechar" folga={12} aoFechar={fechar}
          subtitulo={subindo ? undefined : 'Trocar recarrega os ativos e o pacote desta garagem.'}>
          {subindo === 1 && <Aviso tom="neutro" semPoco titulo="UMA EVIDÊNCIA ESTÁ SUBINDO" frase="Troque de garagem quando a fila terminar." />}
          <Lista role="radiogroup" aria-label="Trocar de garagem">
            {lista.map((g, i) => {
              const atual = g.id === uoId
              const estadoLinha = atual ? 'atual' : g.vencida ? 'vencida' : subindo ? 'espera' : 'disponivel'
              return (
                <LinhaGaragem key={g.id} nome={g.nome} estado={estadoLinha}
                  pacote={estadoLinha === 'espera' ? 'espera o envio terminar' : g.pacote}
                  aviso={g.vencida && !atual ? 'Sincronize no menu para liberar' : undefined}
                  nomeGlifo="ainda não" rotuloContagem="ATIVOS" contagem={g.ativos}
                  aoTocar={estadoLinha === 'disponivel' ? () => escolher(g.id) : undefined}
                  divisoria={i < lista.length - 1} />
              )
            })}
          </Lista>
        </Folha>
      </Veu>
    )
  } else if (sobre === 'trocar') {
    const alvo = trocarPara ?? garagens().find((g) => g.id !== uoId && !g.vencida)?.id
    porCima = (
      <Veu de="dialogo">
        <Dialogo titulo="Trocar de garagem" primario="Encerrar a sessão e trocar" aoPrimario={() => trocarDeVez(alvo)}
          saida="Cancelar" aoSair={() => setTrocarPara(null)} margem={20}>
          <Frase>A sessão de configuração do <Destaque>{sessao?.moduloSerial}</Destaque> é encerrada antes da troca.</Frase>
          <Frase>O que já foi gravado fica no módulo.</Frase>
        </Dialogo>
      </Veu>
    )
  }

  return (
    <div className="t04">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="tira" />
      {/* o menu inteiro fica atrás da folha ou do diálogo (G25) e, como eles são
          modais (aria-modal), fica inerte: nem o toque nem o leitor chegam nele */}
      <div className="t04-fundo" inert={porCima ? '' : undefined}>
        <TopoDoMenu>
          <TiraDeContexto garagem={caixaAlta(uoDe(uoId).nome)} aoTrocarGaragem={() => abrir('garagem')}
            iniciais={sigla} rotuloConta={`Conta — ${tecnico}`} aoAbrirConta={() => abrir('conta')} />
          {faixa}
        </TopoDoMenu>
        <h1 className="t04-titulo">Menu</h1>
        <div className="tela-miolo t04-miolo">
          <GradeFerramentas folga={10}>
            {conectar}
            {ativo}
            {FERRAMENTAS.map((f) => completa
              ? <CartaoFerramenta key={f.tela} icone={f.icone} titulo={f.titulo} aoTocar={() => ir(f.tela)}
                  contagem={f.contaChecklist && pendentesChecklist > 0 ? pendentesChecklist : undefined} />
              : <CartaoFerramenta key={f.tela} estado="espera" titulo={f.titulo} causa={causa} />)}
            {rede
              ? <CartaoFerramenta icone="instalacoes" titulo="Últimas instalações" aoTocar={() => ir('T12')} />
              : <CartaoFerramenta estado={completa ? 'sem-rede' : 'espera'} titulo="Últimas instalações" causa={completa ? 'sem conexão' : 'espera conexão'} />}
            <CartaoFerramenta icone="fila" titulo="Fila de saída" aoTocar={() => ir('T15')}
              contagem={pendentesFila > 0 ? pendentesFila : undefined} />
          </GradeFerramentas>
        </div>
      </div>
      {porCima && <div className="t04-sobre">{porCima}</div>}
    </div>
  )
}
