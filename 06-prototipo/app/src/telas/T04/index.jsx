// T04 · Menu (02-telas/T04-menu): a grade de dez cartões em que cada
// ferramenta diz, no próprio cartão, o que falta pra ela funcionar. Em cima, a
// tira de contexto e a faixa da sessão; por cima, as folhas da conta, da
// unidade, do módulo e do ativo da sessão, os diálogos de sair e de trocar, o
// do ENCERRAR antes de homologar (13, decisão 36) e o aviso do acesso vencendo
// (12). Tudo lê do estado único e do mock: o estado muda o que os blocos
// dizem, nunca onde eles ficam (Lei 3).
import { useEffect, useRef, useState } from 'react'
import {
  BarraDoSistema, TopoDoMenu, TiraDeContexto, Faixa, GradeFerramentas, CartaoFerramenta,
  Veu, Folha, CartaoDaConta, PrazoDaConta, BotaoDaFolha, Dialogo, Frase, Destaque,
  Aviso, Nota, Lista, LinhaGaragem, Link,
} from '../../ds/index.js'
import { useEstado, estadoVazio } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar, ENCERRAR_SEM_HOMOLOGAR } from '../../estado/encerrar.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
// a presença da folha (sobe em 200, desce em 150, movimento.md) é a mesma da T01
import { usePresenca } from '../T01/presenca.js'
import { CartaoPreso } from './pecas.jsx'
import {
  REF, SOBRE, MOMENTO_DA_FOLHA, FOLHAS, SOB_A_FAIXA, placaDe, uoDe, iniciais, filaToda, pendentesDaGaragem, naFila,
  enviando, checklistPendentes, prazoDoAcesso, avisoDoAcesso, garagens, moduloPreso, ativoPreso, temVariasEmpresas,
  TROCA_DE_EMPRESA, destinoDaTroca, depoisDoTrocar,
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
  // o diálogo de trocar (o 09), no fluxo: pra qual unidade ({ uoId }), ou de empresa ({ empresa: true })
  const [trocarPara, setTrocarPara] = useState(null)
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

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const abrir = (qual) => { setTrocarPara(null); ir('T04', { momento: MOMENTO_DA_FOLHA[qual] }) }
  const fechar = () => { setTrocarPara(null); ir('T04', { momento: base ?? undefined }) }
  const vazio = estadoVazio()

  // O ENCERRAR da faixa e o Encerrar a sessão das folhas do módulo e do ativo
  // (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar sem homologar? por cima do menu — o momento 13, que tem endereço:
  // a URL abre e fecha (G20), e o Continuar a instalação volta ao quadro do
  // menu. Depois de homologar, direto, pros passos do encerramento.
  const enc = useEncerrar({ aberto: sobre === 'encerrar', aoAbrir: () => abrir('encerrar'), aoFechar: fechar })

  // A folha sobe do pé em 200 e desce em 150 (movimento.md, animacao.md): ao
  // fechar, a que estava aberta continua na tela até terminar de descer. Se um
  // diálogo toma o lugar dela (o Sair da conta, o trocar, o do ENCERRAR), ela
  // sai na hora, sem dois véus. Aberta pela URL ou no print, nasce aberta, sem movimento.
  const folhaPedida = FOLHAS.includes(sobre) ? sobre : null
  const ultimaFolha = useRef(folhaPedida)
  if (folhaPedida) ultimaFolha.current = folhaPedida
  const presenca = usePresenca(folhaPedida != null)
  const folha = folhaPedida ?? (presenca.montado && !sobre ? ultimaFolha.current : null)
  // as folhas do módulo e do ativo abrem embaixo da faixa, que fica acesa em cima do véu (T04/10, 11)
  const sobFaixa = SOB_A_FAIXA.includes(folha)

  // O aviso do acesso vencendo (logica.md · O aviso do acesso, T04/12): no dia
  // do aviso, o diálogo aparece na primeira chegada ao menu — pelo fluxo ou pela
  // semente (o pulo do palco, o endereço) —, com nada por cima, uma vez. O
  // Entendi fecha e grava no estado único que ele foi visto; o Recomeçar do
  // login e o pulo do palco zeram o estado, e ele volta. Num estado da coluna,
  // só no 12; no print, também só no 12, o quadro que a referência desenha.
  // Os dias saem do mock (M.situacao.sessaoAcesso). Nasce aberto, com o menu;
  // fecha pelo movimento da peça (o diálogo e o véu esmaecem em 150). Se ele
  // esperava uma folha ou o diálogo do ENCERRAR (o endereço deles), só é pedido
  // depois de ela terminar de descer, ou de ele esmaecer: entra pela presença da
  // peça, sem o véu dele aparecer de uma vez em cima do que some, e o voltar
  // nesse meio não o fecha.
  const prazoDoAviso = avisoDoAcesso(mundo.situacao.sessaoAcesso)
  const avisoPedido = prazoDoAviso != null && (est ? est === REF.acesso
    : !EM_QUADRO && !sobre && !presenca.montado && !enc.montado && !mundo.avisoDoAcessoVisto)
  const presencaDoAviso = usePresenca(avisoPedido)

  // a URL segue o quadro do menu (G20): sem sessão é o 01, sem ativo é o 02
  useEffect(() => {
    if (est || !aplicado || SOBRE[momento]) return
    if ((momento ?? null) !== base) despachar({ tipo: 'ir', tela: 'T04', momento: base ?? undefined })
  }, [est, aplicado, momento, base, despachar])

  // C11 · G23: os primários dos diálogos de sair e de trocar encerram a sessão
  // pelos 4 passos da sessão abortada da T16 (03) e seguem pro destino depois
  // deles: o destino fica gravado no estado único (etapas.encerramento.destino),
  // e a T16 o aplica ao fechar o 4º passo. Os dois diálogos já são a confirmação
  // deles, e dizem *sem homologar*: nenhum caminho pergunta duas vezes (decisão 36).
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
  // Trocar de unidade (T04·4 a) e de empresa (T04/14, decisão 37): com a sessão
  // aberta, o diálogo de trocar; sem ela, direto (dados.js · depoisDoTrocar). No
  // diálogo, o primário passa pelo encerramento sem homologar da T16 e segue pro
  // destino (G23): a T03 da unidade nova, ou a T02/07, a lista das empresas com a
  // atual marcada (a resposta do arquiteto de 26/09). O mundo das empresas vai junto
  // no contexto (contexto.empresas), e a unidade de antes sai dele.
  const trocarEncerrando = (alvo) => encerrarE(destinoDaTroca(alvo, mundo.contexto))
  const trocar = (alvo) => {
    const { confirma, vai } = depoisDoTrocar(sessao, alvo, mundo.contexto)
    if (confirma) { setTrocarPara(confirma); return }
    despachar({ tipo: 'mesclar', parcial: { sessao: null, etapas: vazio.etapas, contexto: vai.contexto } })
    ir(vai.tela, vai.momento ? { momento: vai.momento } : {})
  }
  const escolher = (id) => trocar({ uoId: id })
  // com mais de uma empresa, o Trocar de empresa no fim da folha (14; no fluxo, vindo da T02/07)
  const variasEmpresas = temVariasEmpresas(mundo, est)
  const trocarDeEmpresa = () => trocar(TROCA_DE_EMPRESA)

  const tecnico = mundo.tecnico.nome
  const sigla = iniciais(tecnico)
  const pendentesFila = pendentesDaGaragem(fila, uoId)
  const pendentesChecklist = completa && checklistAberto ? checklistPendentes(mundo.etapas.checklist) : 0

  // ── o topo ──
  const faixa = !sessao
    ? <Faixa lugar="menu" estado="sem-sessao" fato="Sem sessão de configuração" />
    : sessao.saude === 'falha'
      ? <Faixa lugar="menu" estado="falha" fato="Módulo com falha" acao="ENCERRAR" aoEncerrar={enc.encerrar} />
      : <Faixa lugar="menu" serial={sessao.moduloSerial} placa={completa ? placaDe(sessao.ativoId) : 'sem ativo'} semAtivo={!completa}
          acao="ENCERRAR" aoEncerrar={enc.encerrar} />

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
    // a sessão é o ENCERRAR da faixa (logica.md · módulo e ativo travados):
    // antes de homologar, a folha sai e o diálogo abre por cima do menu (o 13)
    const doModulo = folha === 'modulo'
    const preso = doModulo ? moduloPreso(sessao?.moduloSerial) : ativoPreso(sessao?.ativoId)
    porCima = veuDaFolha(
      <Folha titulo={doModulo ? 'Módulo conectado' : 'Ativo da sessão'} rotuloFechar="Fechar" aoFechar={fechar} aberta={presenca.visivel}>
        <CartaoPreso icone={doModulo ? 'conectar' : 'ativo'} identidade={preso.identidade} detalhes={preso.detalhes} />
        <Nota tom="fato" titulo="TRAVADO NA SESSÃO" frase={doModulo
          ? 'Enquanto a sessão estiver aberta, o módulo não troca. Pra trocar de módulo, encerre a sessão.'
          : 'Enquanto a sessão estiver aberta, o ativo não troca. Pra trocar de ativo, encerre a sessão.'} />
        <BotaoDaFolha aoTocar={enc.encerrar}>Encerrar a sessão</BotaoDaFolha>
      </Folha>,
    )
  } else if (sobre === 'sair') {
    porCima = (
      <Veu de="dialogo">
        <Dialogo titulo="Sair da conta" primario="Encerrar a sessão e sair" aoPrimario={sairEncerrando}
          saida="Cancelar" aoSair={() => abrir('conta')} saidaDe44 margem={20}>
          {itensNaFila > 0 && <Frase><Destaque>{itensNaFila}</Destaque> itens continuam na fila e sobem no próximo login.</Frase>}
          {sessao && <Frase>A sessão de configuração do <Destaque>{sessao.moduloSerial}</Destaque> é encerrada antes, sem homologar.</Frase>}
        </Dialogo>
      </Veu>
    )
  } else if (folha === 'garagem') {
    // 07 · 08 · 14 · a folha de trocar de unidade; com mais de uma empresa, o
    // Trocar de empresa no fim (14, decisão 37)
    const lista = garagens()
    porCima = veuDaFolha(
      <Folha titulo="Trocar de unidade" rotuloFechar="Fechar" folga={12} aoFechar={fechar} aberta={presenca.visivel}
        subtitulo={subindo ? undefined : 'Trocar recarrega os ativos e o pacote desta unidade.'}>
        {subindo === 1 && <Aviso tom="neutro" semPoco titulo="UMA EVIDÊNCIA ESTÁ SUBINDO" frase="Troque de unidade quando a fila terminar." />}
        <Lista role="radiogroup" aria-label="Trocar de unidade">
          {lista.map((g, i) => {
            const atual = g.id === uoId
            const estadoLinha = atual ? 'atual' : g.vencida ? 'vencida' : subindo ? 'espera' : 'disponivel'
            return (
              <LinhaGaragem key={g.id} nome={g.nome} estado={estadoLinha}
                pacote={estadoLinha === 'espera' ? 'espera o envio terminar' : g.pacote}
                nomeGlifo="ainda não" rotuloContagem="ATIVOS" contagem={g.ativos}
                aoTocar={estadoLinha === 'disponivel' ? () => escolher(g.id) : undefined}
                divisoria={i < lista.length - 1} />
            )
          })}
        </Lista>
        {variasEmpresas && (
          <div className="t04-folha-empresa">
            <Link aoTocar={trocarDeEmpresa}>Trocar de empresa</Link>
          </div>
        )}
      </Folha>,
    )
  } else if (sobre === 'trocar') {
    // 09 · trocar com a sessão aberta: de unidade, ou de empresa (a mesma
    // confirmação, com a empresa no lugar da unidade · logica.md · A empresa e a unidade)
    const alvo = trocarPara ?? { uoId: garagens().find((g) => g.id !== uoId && !g.vencida)?.id }
    const deEmpresa = Boolean(alvo.empresa)
    porCima = (
      <Veu de="dialogo">
        <Dialogo titulo={deEmpresa ? 'Trocar de empresa' : 'Trocar de unidade'} primario="Encerrar a sessão e trocar"
          aoPrimario={() => trocarEncerrando(alvo)}
          saida="Cancelar" aoSair={() => setTrocarPara(null)} margem={20}>
          <Frase>A sessão de configuração do <Destaque>{sessao?.moduloSerial}</Destaque> é encerrada antes da troca, sem homologar.</Frase>
          <Frase>O que já foi gravado fica no módulo.</Frase>
        </Dialogo>
      </Veu>
    )
  }
  // 13 · o ENCERRAR antes de homologar (decisão 36): o véu cobre também a tira
  // e a faixa, como no aviso do acesso — o menu inteiro fica atrás dele
  const doEncerrar = !porCima && enc.montado
  if (doEncerrar) porCima = enc.dialogo
  // o aviso do acesso: o véu cobre também a tira e a faixa (T04/12), e o
  // Entendi é o único jeito de fechar
  const entendi = () => despachar({ tipo: 'mesclar', parcial: { avisoDoAcessoVisto: true } })
  const aviso = !porCima && presencaDoAviso.montado
  if (aviso) {
    porCima = (
      <Veu de="dialogo" visivel={presencaDoAviso.visivel}>
        <Dialogo titulo={`Seu acesso vence em ${prazoDoAviso.restam} dias`} primario="Entendi" aoPrimario={entendi}
          margem={24} aberto={presencaDoAviso.visivel}>
          <Frase>Depois disso, ele pede a senha de novo — e pra isso precisa de rede.</Frase>
        </Dialogo>
      </Veu>
    )
  }

  // o voltar do Android (logica.md): o X da folha, o Cancelar do diálogo; no
  // aviso do acesso, o Entendi, que só fecha e é a única saída; no menu, que
  // não tem saída desenhada, nada. No diálogo do ENCERRAR (13), o Continuar a
  // instalação, pela peça dele, que vale por cima (useEncerrar). Num estado da
  // coluna, a peça não escuta
  const voltar = folhaPedida ? fechar
    : sobre === 'sair' ? () => abrir('conta')
      : sobre === 'trocar' ? () => setTrocarPara(null)
        : avisoPedido ? entendi
          : null
  useVoltar(voltar)

  // O que fica atrás do véu (G25) é inerte: a folha e o diálogo são modais
  // (aria-modal), e nem o toque nem o leitor chegam nele. O que fica aceso em
  // cima do véu, como a referência desenha, fica desabilitado — o toque não faz
  // nada, e o leitor ouve desabilitado (tela.md: com a folha ou o diálogo
  // aberto, a tira não se toca): a tira, com toda folha e diálogo (05 a 11), e
  // a faixa também nas folhas do módulo e do ativo, em que o véu começa
  // embaixo dela (10, 11). Nas outras, a faixa fica atrás do véu, inerte. No
  // aviso do acesso e no diálogo do ENCERRAR, o véu cobre a tira também (12,
  // 13): o topo inteiro fica inerte.
  const atras = porCima ? '' : undefined
  const sobreTudo = aviso || doEncerrar
  return (
    <div className="t04">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="tira" />
      <div className="t04-fundo">
        <fieldset className="t04-topo" role="presentation" disabled={Boolean(porCima)} inert={sobreTudo ? '' : undefined}>
          <TopoDoMenu>
            <TiraDeContexto garagem={caixaAlta(uoDe(uoId).nome)} aoTrocarGaragem={() => abrir('garagem')}
              rotuloGaragem={`Trocar de unidade — ${uoDe(uoId).nome}`}
              iniciais={sigla} rotuloConta={`Conta — ${tecnico}`} aoAbrirConta={() => abrir('conta')} />
            <div inert={sobFaixa ? undefined : atras}>{faixa}</div>
          </TopoDoMenu>
        </fieldset>
        {/* o título Menu, escondido, existe em todas as telas do menu, com folha ou
            diálogo por cima ou não (a resposta do arquiteto de 26/09): não se toca, e
            fica fora do inert do que está atrás do véu, pro leitor de tela */}
        <h1 className="t04-titulo">Menu</h1>
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
      {porCima && <div className={`t04-sobre ${sobFaixa ? 't04-sobre-faixa' : ''} ${sobreTudo ? 't04-sobre-tudo' : ''}`}>{porCima}</div>}
    </div>
  )
}
