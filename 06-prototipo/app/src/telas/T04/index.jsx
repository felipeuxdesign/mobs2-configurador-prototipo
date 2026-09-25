// T04 · Menu (02-telas/T04-menu): a grade de dez cartões em que cada
// ferramenta diz, no próprio cartão, o que falta pra ela funcionar. Em cima, a
// tira de contexto e a faixa da sessão; por cima, as folhas da conta, da
// garagem, do módulo e do ativo da sessão, e os dois diálogos. Tudo lê do
// estado único e do mock: o estado muda o que os blocos dizem, nunca onde eles
// ficam (Lei 3).
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, TopoDoMenu, TiraDeContexto, Faixa, GradeFerramentas, CartaoFerramenta,
  Veu, Folha, CartaoDaConta, PrazoDaConta, BotaoDaFolha, Dialogo, Frase, Destaque,
  Aviso, Nota, Lista, LinhaGaragem,
} from '../../ds/index.js'
import { useEstado, estadoVazio } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
// a presença da folha (sobe em 200, desce em 150, movimento.md) é a mesma da T01
import { usePresenca } from '../T01/presenca.js'
import { CartaoPreso } from './pecas.jsx'
import {
  REF, SOBRE, MOMENTO_DA_FOLHA, FOLHAS, SOB_A_FAIXA, placaDe, uoDe, iniciais, filaToda, pendentesDaGaragem, naFila,
  enviando, checklistPendentes, prazoDoAcesso, garagens, moduloPreso, ativoPreso,
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

  // A folha sobe do pé em 200 e desce em 150 (movimento.md, animacao.md): ao
  // fechar, a que estava aberta continua na tela até terminar de descer. Se um
  // diálogo toma o lugar dela (o Sair da conta, o trocar), ela sai na hora, sem
  // dois véus. Aberta pela URL ou no print, nasce aberta, sem movimento.
  const folhaPedida = FOLHAS.includes(sobre) ? sobre : null
  const ultimaFolha = useRef(folhaPedida)
  if (folhaPedida) ultimaFolha.current = folhaPedida
  const presenca = usePresenca(folhaPedida != null)
  const folha = folhaPedida ?? (presenca.montado && !sobre ? ultimaFolha.current : null)
  // as folhas do módulo e do ativo abrem embaixo da faixa, que fica acesa em cima do véu (T04/10, 11)
  const sobFaixa = SOB_A_FAIXA.includes(folha)

  // a URL segue o quadro do menu (G20): sem sessão é o 01, sem ativo é o 02
  useEffect(() => {
    if (est || !aplicado || SOBRE[momento]) return
    if ((momento ?? null) !== base) despachar({ tipo: 'ir', tela: 'T04', momento: base ?? undefined })
  }, [est, aplicado, momento, base, despachar])

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const abrir = (qual) => { setTrocarPara(null); ir('T04', { momento: MOMENTO_DA_FOLHA[qual] }) }
  const fechar = () => { setTrocarPara(null); ir('T04', { momento: base ?? undefined }) }
  const vazio = estadoVazio()
  // o ENCERRAR da faixa e o Encerrar a sessão das folhas do módulo e do ativo: o mesmo destino
  const encerrar = () => ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR })

  // C11 · G23: os primários dos diálogos de sair e de trocar encerram a sessão
  // pelos 4 passos da sessão abortada da T16 (03), sem confirmação, e seguem
  // pro destino depois deles: o destino fica gravado no estado único
  // (etapas.encerramento.destino), e a T16 o aplica ao fechar o 4º passo.
  const encerrarE = (destino) => {
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...mundo.etapas, encerramento: { destino } } } })
    ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR })
  }

  // Sair da conta (T04·5 a): sem sessão e sem fila, sai direto; senão, o diálogo.
  // Com a sessão aberta, o primário passa pelo encerramento sem homologar da
  // T16 e vai pro login, com a fila preservada (G23).
  const sairDeVez = () => {
    despachar({ tipo: 'mesclar', parcial: { sessao: null, contexto: vazio.contexto, etapas: vazio.etapas } })
    ir('T01')
  }
  const pedirSaida = () => (sessao || itensNaFila > 0 ? abrir('sair') : sairDeVez())
  const sairEncerrando = () => (sessao ? encerrarE({ tela: 'T01', contexto: vazio.contexto }) : sairDeVez())
  // Trocar de garagem (T04·4 a): com a sessão aberta, o diálogo; sem ela, direto.
  // No diálogo, o primário passa pelo encerramento sem homologar da T16 e segue
  // pra T03 da garagem nova (G23).
  const trocarEncerrando = (id) => encerrarE({ tela: 'T03', contexto: { uoId: id, pacote: null } })
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
      ? <Faixa lugar="menu" estado="falha" fato="Módulo com falha" acao="ENCERRAR" tracoSobreposto aoEncerrar={encerrar} />
      : <Faixa lugar="menu" serial={sessao.moduloSerial} placa={completa ? placaDe(sessao.ativoId) : 'sem ativo'} semAtivo={!completa}
          acao="ENCERRAR" aoEncerrar={encerrar} />

  // ── os dois cartões largos: o módulo e o ativo. Com a sessão aberta, os dois
  // não trocam (HU-T16-2): o toque abre a folha do que ela prendeu (10, 11) ──
  const poco = sessao ? 30 : 34
  const conectar = !sessao
    ? <CartaoFerramenta largo estado="decide" icone="conectar" poco={poco} titulo="CONECTAR MÓDULO" valor="toque para procurar" aoTocar={() => ir('T05', { momento: '01-momento-nenhum-escolhido' })} />
    : <CartaoFerramenta largo icone="conectar" poco={poco} titulo="CONECTAR MÓDULO" valor={sessao.moduloSerial} aoTocar={() => abrir('modulo')} />
  const ativo = !sessao
    ? <CartaoFerramenta largo estado="espera" poco={poco} titulo="ATIVO SELECIONADO" valor="nenhum" />
    : !completa
      ? <CartaoFerramenta largo estado="decide" icone="ativo" poco={poco} titulo="ATIVO SELECIONADO" valor="toque para escolher" aoTocar={() => ir('T06')} />
      : <CartaoFerramenta largo icone="ativo" poco={poco} titulo="ATIVO SELECIONADO" valor={placaDe(sessao.ativoId)} aoTocar={() => abrir('ativo')} />
  const causa = !sessao ? 'espera módulo e ativo' : !completa ? 'espera ativo' : undefined

  // ── por cima: as folhas e os diálogos ──
  // A folha fecha pelo X, pelo toque no véu, fora dela, e pelo voltar do
  // sistema (logica.md). Dentro, o conteúdo de cada uma.
  const veuDaFolha = (conteudo) => (
    <Veu de="folha" visivel={presenca.visivel} aoTocarFora={fechar}>{conteudo}</Veu>
  )
  let porCima = null
  if (folha === 'conta') {
    const { restam, total } = prazoDoAcesso(mundo.situacao.sessaoAcesso)
    porCima = veuDaFolha(
      <Folha titulo="Conta" rotuloFechar="Fechar" minima aoFechar={fechar} aberta={presenca.visivel}>
        <CartaoDaConta iniciais={sigla} nome={tecnico} detalhe={`${mundo.tecnico.usuario} · ${M.empresa.nome}`} />
        <PrazoDaConta rotulo="ACESSO VENCE EM" restam={restam} total={total} unidade="dias"
          resta={`RESTAM ${restam} DE ${total} DIAS`} legenda="Sincronize para renovar o acesso." />
        <BotaoDaFolha aoTocar={pedirSaida}>Sair da conta</BotaoDaFolha>
      </Folha>,
    )
  } else if (folha === 'modulo' || folha === 'ativo') {
    // 10 · 11 · o que a sessão prendeu, travado nela (HU-T16-2); o Encerrar
    // a sessão é o ENCERRAR da faixa (logica.md · módulo e ativo travados)
    const doModulo = folha === 'modulo'
    const preso = doModulo ? moduloPreso(sessao?.moduloSerial) : ativoPreso(sessao?.ativoId)
    porCima = veuDaFolha(
      <Folha titulo={doModulo ? 'Módulo conectado' : 'Ativo da sessão'} rotuloFechar="Fechar" aoFechar={fechar} aberta={presenca.visivel}>
        <CartaoPreso icone={doModulo ? 'conectar' : 'ativo'} identidade={preso.identidade} detalhes={preso.detalhes} />
        <Nota tom="fato" titulo="TRAVADO NA SESSÃO" frase={doModulo
          ? 'Enquanto a sessão estiver aberta, o módulo não troca. Pra trocar de módulo, encerre a sessão.'
          : 'Enquanto a sessão estiver aberta, o ativo não troca. Pra trocar de ativo, encerre a sessão.'} />
        <BotaoDaFolha aoTocar={encerrar}>Encerrar a sessão</BotaoDaFolha>
      </Folha>,
    )
  } else if (sobre === 'sair') {
    porCima = (
      <Veu de="dialogo">
        <Dialogo titulo="Sair da conta" primario="Encerrar a sessão e sair" aoPrimario={sairEncerrando}
          saida="Cancelar" aoSair={() => abrir('conta')} saidaDe44 margem={20}>
          {itensNaFila > 0 && <Frase><Destaque>{itensNaFila}</Destaque> itens continuam na fila e sobem no próximo login.</Frase>}
          {sessao && <Frase>A sessão de configuração do <Destaque>{sessao.moduloSerial}</Destaque> é encerrada antes.</Frase>}
        </Dialogo>
      </Veu>
    )
  } else if (folha === 'garagem') {
    const lista = garagens()
    porCima = veuDaFolha(
      <Folha titulo="Trocar de garagem" rotuloFechar="Fechar" folga={12} aoFechar={fechar} aberta={presenca.visivel}
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
      </Folha>,
    )
  } else if (sobre === 'trocar') {
    const alvo = trocarPara ?? garagens().find((g) => g.id !== uoId && !g.vencida)?.id
    porCima = (
      <Veu de="dialogo">
        <Dialogo titulo="Trocar de garagem" primario="Encerrar a sessão e trocar" aoPrimario={() => trocarEncerrando(alvo)}
          saida="Cancelar" aoSair={() => setTrocarPara(null)} margem={20}>
          <Frase>A sessão de configuração do <Destaque>{sessao?.moduloSerial}</Destaque> é encerrada antes da troca.</Frase>
          <Frase>O que já foi gravado fica no módulo.</Frase>
        </Dialogo>
      </Veu>
    )
  }

  // o voltar do Android (logica.md): o X da folha, o Cancelar do diálogo; no
  // menu, que não tem saída desenhada, nada. Num estado da coluna, a peça não escuta
  const voltar = folhaPedida ? fechar
    : sobre === 'sair' ? () => abrir('conta')
      : sobre === 'trocar' ? () => setTrocarPara(null)
        : null
  useVoltar(voltar)

  // O que fica atrás do véu (G25) é inerte: a folha e o diálogo são modais
  // (aria-modal), e nem o toque nem o leitor chegam nele. O que fica aceso em
  // cima do véu, como a referência desenha, fica desabilitado — o toque não faz
  // nada, e o leitor ouve desabilitado (tela.md: com a folha ou o diálogo
  // aberto, a tira não se toca): a tira, com toda folha e diálogo (05 a 11), e
  // a faixa também nas folhas do módulo e do ativo, em que o véu começa
  // embaixo dela (10, 11). Nas outras, a faixa fica atrás do véu, inerte.
  const atras = porCima ? '' : undefined
  return (
    <div className="t04">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="tira" />
      <div className="t04-fundo">
        <fieldset className="t04-topo" role="presentation" disabled={Boolean(porCima)}>
          <TopoDoMenu>
            <TiraDeContexto garagem={caixaAlta(uoDe(uoId).nome)} aoTrocarGaragem={() => abrir('garagem')}
              iniciais={sigla} rotuloConta={`Conta — ${tecnico}`} aoAbrirConta={() => abrir('conta')} />
            <div inert={sobFaixa ? undefined : atras}>{faixa}</div>
          </TopoDoMenu>
        </fieldset>
        <h1 className="t04-titulo" inert={atras}>Menu</h1>
        <div className="tela-miolo t04-miolo" inert={atras}>
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
      {porCima && <div className={`t04-sobre ${sobFaixa ? 't04-sobre-faixa' : ''}`}>{porCima}</div>}
    </div>
  )
}
