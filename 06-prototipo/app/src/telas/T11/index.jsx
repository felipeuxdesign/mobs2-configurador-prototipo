// T11 · Conferir configuração (02-telas/T11-conferir-configuracao): compara,
// linha a linha, o que o módulo tem gravado com o que o cadastro manda, em
// linguagem de negócio, e deixa o técnico corrigir um bloco por vez, reenviar
// a cadeia ou só registrar.
// · As cinco linhas (o pacote 2, decisão 53): Cercas (em regiões), APN, Extended
//   ID, Eventos e Leitor, nessa ordem. O Extended ID é só leitura — o i cinza no
//   poço, os cartões e iButtons que estão no módulo — e fica fora da contagem: o
//   contador conta as quatro que se comparam. Sem cartão nenhum, ele só informa
//   (D5). O valor de cada linha é o que o cadastro manda: o do caso, no par do
//   diff-divergente; o cadastro do próprio par, nos outros (AC-17, G9).
// · O que não bate (T11/00): o xis vermelho e o par embaixo do nome — no módulo,
//   o noModulo do caso, em vermelho; no cadastro, o noCadastro. Com par na tela,
//   o Extended ID diz o que está no módulo e que é só leitura, nas duas linhas.
// · O rodapé (decisão 53): `Corrigir` reenvia o primeiro bloco que diverge, na
//   ordem da cadeia — na 00, `Corrigir as cercas`. Depois dele, os que dependem
//   ficam *revisar em seguida*, pelo arraste do mock (as cercas levam o leitor e
//   os eventos): o relógio no poço, a linha dizendo o porquê, o cabeçalho cinza
//   com quantas, e `Revisar o leitor` (05). Com algum que ainda diverge, o link é
//   o `Outras ações`; só com os de revisar, o `Voltar ao menu` (05).
// · Corrigir e Revisar (D2): o estado único passa à T09 o modo e o bloco
//   (etapas.ativo.modo = 'manutencao', etapas.ativo.bloco) — a T09 abre no
//   escolher o bloco (08) com ele escolhido, e a cadeia curta o reenvia. A
//   conferência guarda os blocos já reenviados (etapas.conferencia.reenviados) e
//   lê o que a T09 acabou de reenviar (etapas.cadeia.reenviado, que ela limpa a
//   cada pedido). Reaberta pelo menu, ela pede o próximo: depois do leitor, os eventos.
// · A tela confere ao abrir (G27), sobre o desenho do quadro a que ela chega:
//   cada linha entra com o relógio no poço e vira o glifo dela, uma a cada
//   RITMOS.conferenciaLinhaMs (400 ms), no mesmo ritmo com reduzir movimento
//   (movimento.md:47, G26); o que o módulo tem espera a leitura chegar na linha,
//   e o glifo e ele esmaecem em 150 ms (animacao.md; com reduzir, direto). O
//   relógio só liga depois da troca entre telas (C12·35 b): pelo menu, a primeira
//   linha vira aos 550 ms (150 + 400); pelo endereço, aos 400. O veredito espera a
//   última linha (C12·35, o padrão a): a caixa dele já está no lugar, neutra, e a
//   contagem acompanha as que se comparam (1 de 4 … 3 de 4 — na linha do Extended
//   ID ela não sobe); na quinta linha, a palavra e a cor entram em 150. No print
//   (EM_QUADRO), num estado da coluna e na folha Outras ações aberta pelo
//   endereço (03), nasce lida, parada: o quadro de cada referência é o do fim.
// · O que diverge (T11·1, T11·2): a semente do painel (M2C-0438 + ONK-8Q90) é o
//   par do diff-divergente e abre na 00. Aberta pelo menu com a sessão do herói
//   (o par do conferencia-confere), nada diverge, e ela vai pro 02. Depois de
//   regravar a cadeia inteira pela T09, a mesma sessão confere. O endereço do 02
//   monta o par que confere (G20), como a T04 ajusta o mundo do momento.
// · O 01 (a coluna) é o índice que o app não classifica (indice-nao-classificado),
//   no par da semente: as quatro conferem, e o cabeçalho diz NÃO BATE COM O
//   CADASTRO · 1 a mais — o conteúdo fora de todos os blocos, na nota. O 05 (a
//   coluna) é o cercas-reenviadas, no par do herói: as cercas conferem, e o leitor
//   e os eventos ficam pra revisar em seguida.
// · As outras ações (decisão 40): a folha Outras ações (03) tem Reenviar os 5
//   blocos e Apenas registrar o diagnóstico, cada uma com o efeito embaixo. Sem
//   divergência — só o conteúdo não reconhecido (01) —, o principal é o Reenviar,
//   e o link, o Apenas registrar. Reenviar leva à cadeia inteira da T09 (o modo da
//   manutenção volta ao que o vínculo decidiu); o Apenas registrar grava no estado
//   único (etapas.conferencia) e volta ao menu, sem item na fila (G25, T11-V4).
//   Voltar ao menu → T04. ENCERRAR → antes de homologar, o diálogo Encerrar sem
//   homologar? (decisão 36), e a T16 sem homologar (G23).
// · A folha Outras ações (lei 20) fecha no X, tocando fora, arrastando e no
//   voltar do Android (o Esc), e a URL segue: o 03 com ela aberta (G20). O véu
//   mantém a composição abaixo da faixa, com o fundo estendido sobre o topo;
//   a tela atrás do véu fica inerte (G25).
// · O voltar do Android (logica.md): o link de saída do rodapé. No 02 e no revisar
//   em seguida, o Voltar ao menu; no 01, o Apenas registrar o diagnóstico. Com o
//   Outras ações no link, ele não sai da tela, e o voltar não faz nada; com a
//   folha aberta, fecha a folha.
import { useEffect, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Aviso, Lista, LinhaChecagem, Nota, Rodape,
  Veu, Folha, CartaoDeOpcoes, LinhaDeOpcao, ESTADOS, useFimDaTroca,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
// a presença da folha (entra fechada e sobe; sai descendo antes de desmontar) é a do que vem por cima
import { usePresenca } from '../../ds/chrome/PorCima.jsx'
import {
  REF, LINHAS, BLOCOS_DA_CADEIA, ativoDe, mundoDoEstado, divergenciasDo, reenviadosDa,
  conferenciaDo, comparadasAte, mundoQueConfere, QUADRO_04,
} from './conferencia.js'
import { T } from './textos.js'
import { BotaoDaLinha } from '../comum/BotaoDaLinha.jsx'
import './t11.css'

// o nome do xis pro leitor segue o dado (G15): o bloco que não bate falhou na conferência
const NOME_DIVERGE = ESTADOS.xis.nome
const SEMENTE = SEMENTES.T11.sessao

// o par módulo × ativo da sessão; sem sessão, o da semente
const parDaSessao = (s) => (s?.ativoId ? { ativoId: s.ativoId, moduloSerial: s.moduloSerial } : { ativoId: SEMENTE.ativoId, moduloSerial: SEMENTE.moduloSerial })

// O endereço do 02 com a semente da referência (o par que diverge) pede outro
// mundo: a sessão do herói, que confere (T11·1, G20). A tela ajusta o estado
// único uma vez, ao montar, como a T04 faz com os momentos dela.
// A 04 (o pacote 5) é a conferência do herói, que confere, parada no meio.
function ajusteDoMomento(momento, est, unico) {
  if (est != null || (momento !== REF.confere && momento !== REF.conferindo)) return null
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

  // Num estado da coluna, o mundo é o da receita (receitas.js): o 01, o índice que
  // o app não classifica; o 05, as cercas reenviadas
  const doEstado = mundoDoEstado(est)
  const par = doEstado ? doEstado.par : parDaSessao(mundo.sessao)
  const sessao = mundo.sessao ?? SEMENTE
  const naoReconhecidos = doEstado?.naoReconhecidos ?? 0
  const conf = conferenciaDo({
    par, sessao, naoReconhecidos,
    divergem: doEstado ? doEstado.divergem : divergenciasDo(par, mundo.etapas),
    reenviados: doEstado ? doEstado.reenviados : reenviadosDa(mundo.etapas),
  })
  const { linhas, naoBatem, aRevisar, total, proximo, bate } = conf
  // sem nada pra reenviar um a um, só o conteúdo não reconhecido (o 01): o principal é o Reenviar
  const soReenviar = !bate && !proximo
  const blocos = BLOCOS_DA_CADEIA.length

  // a folha Outras ações (03): a URL abre e fecha (G20); só com o que ainda diverge
  const outrasPedida = naoBatem > 0 && (est === REF.outras || (est == null && momento === REF.outras))
  // no tudo confere (02, o complemento da rodada 3), o Outras ações aceso abre a mesma folha por
  // cima da 02, sem quadro próprio: a URL fica no 02
  const [outrasNoConfere, setOutrasNoConfere] = useState(false)
  const outras = usePresenca(outrasPedida || outrasNoConfere)

  // a leitura: uma linha a cada 400 ms, na ordem da tela; parada no print, na
  // coluna e na folha aberta pelo endereço (o 03 é um quadro depois da leitura)
  const nLinhas = LINHAS.length
  const [nasceuLida] = useState(() => EM_QUADRO || est != null || outrasPedida)
  // a 04 pelo endereço: parada nos Eventos, como todo momento
  const [parada] = useState(() => est == null && momento === REF.conferindo)
  const [lidas, setLidas] = useState(() => (parada ? QUADRO_04 : nasceuLida ? nLinhas : 0))
  const lendo = lidas < nLinhas
  // o relógio só liga depois da troca entre telas que trouxe a tela (C12·35 b): pelo menu,
  // a primeira linha aos 150 + 400; pelo endereço (nada esmaece), aos 400
  const fimDaTroca = useFimDaTroca()
  useEffect(() => {
    if (!lendo || parada) return undefined
    let vivo = true, relogio = null
    fimDaTroca().then(() => {
      if (vivo) relogio = setInterval(() => setLidas((n) => Math.min(n + 1, nLinhas)), RITMOS.conferenciaLinhaMs)
    })
    return () => { vivo = false; clearInterval(relogio) }
  }, [lendo, nLinhas]) // eslint-disable-line react-hooks/exhaustive-deps

  // a URL segue o quadro (G20): nada diverge é o 02; o que diverge, a 00, ou o 03 com a folha aberta
  const quadro = parada ? REF.conferindo : bate ? REF.confere : outrasPedida ? REF.outras : null
  useEffect(() => {
    if (est != null || !aplicado) return
    if ((momento ?? null) !== quadro) despachar({ tipo: 'ir', tela: 'T11', momento: quadro ?? undefined })
  }, [est, aplicado, momento, quadro, despachar])

  // os toques
  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const etapas = unico.etapas
  const anotada = etapas.conferencia ?? {}
  // Corrigir e Revisar (D2): um bloco por vez, pela manutenção da T09 — o modo e o
  // bloco vão no registro do vínculo (etapas.ativo), e o modo que o vínculo tinha
  // fica guardado pra cadeia inteira; o que a T09 reenviou antes entra na lista, e
  // o lugar dela fica limpo pro próximo
  const reenviarUm = (bloco) => {
    const modoDoVinculo = 'modoDoVinculo' in anotada ? anotada.modoDoVinculo : etapas.ativo?.modo ?? null
    despachar({ tipo: 'mesclar', parcial: { etapas: {
      ...etapas,
      ativo: { ...(etapas.ativo ?? {}), modo: 'manutencao', bloco },
      cadeia: { ...(etapas.cadeia ?? {}), reenviado: null },
      conferencia: { ...anotada, modoDoVinculo, reenviados: reenviadosDa(etapas) },
    } } })
    ir('T09')
  }
  // Reenviar os 5 blocos: a cadeia inteira da T09, com o modo que o vínculo decidiu.
  // O avanço anterior sai, inclusive quando já estava concluído: é um novo envio, não uma retomada.
  const reenviar = () => {
    let ativoDoReenvio = etapas.ativo
    if ('modoDoVinculo' in anotada) {
      const { bloco: _bloco, ...ativo } = etapas.ativo ?? {}
      ativoDoReenvio = { ...ativo, modo: anotada.modoDoVinculo }
    }
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...etapas, ativo: ativoDoReenvio, cadeia: null } } })
    ir('T09')
  }
  // só registra o que a leitura achou, no estado único (G25: nenhum item na fila)
  const registrar = () => {
    const blocosQueNaoBatem = linhas.filter((l) => l.estado === 'diverge').map((l) => l.id)
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...etapas, conferencia: { ...anotada, diagnostico: 'registrado', blocos: blocosQueNaoBatem, as: M.HORA_NOMINAL } } } })
    ir('T04')
  }
  const voltar = () => ir('T04')
  const abrirOutras = () => (bate ? setOutrasNoConfere(true) : ir('T11', { momento: REF.outras }))
  const fecharOutras = () => (outrasNoConfere ? setOutrasNoConfere(false) : ir('T11'))
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar antes de terminar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()

  // O voltar do Android (logica.md): no computador, o Esc — o mesmo que o link
  // de saída do rodapé; com a folha aberta, fecha a folha. Com o Outras ações no
  // link, que não sai da tela, não faz nada. Num estado da coluna, a peça não escuta.
  const linkSai = !bate && !soReenviar && naoBatem === 0
  useVoltar(outrasPedida || outrasNoConfere ? fecharOutras : bate || linkSai ? voltar : soReenviar ? registrar : null)

  // o veredito: quantas não batem de 4; quantas ficam pra revisar; no 01, quantos
  // conteúdos a mais. Enquanto lê, a caixa espera no lugar, neutra, com a contagem
  // das que se comparam (C12·35 a, a peça: Aviso · aguarda)
  // O pacote 5 (T11/04): enquanto lê, o veredito diz *CONFERINDO*, neutro, sem poço à
  // vista, com a contagem; na última linha, o veredito de verdade entra no lugar. A caixa
  // que espera já tem o desenho da final — no que não bate, o lugar do poço, invisível —,
  // e nada muda de lugar nem de altura (a lei; a 04 é o caso que confere, sem poço)
  const aguarda = lendo ? comparadasAte(lidas) : null
  const conta = T.deTotal(total)
  const espera = { aguarda, aguardaUnidade: conta, aguardaTitulo: T.conferindo }
  let cabeca = <Aviso tom="veredito" titulo={T.confere} numero={total} unidade={conta} {...espera} />
  if (naoBatem) cabeca = <Aviso glifo="xis" titulo={T.naoBate} numero={naoBatem} unidade={conta} {...espera} />
  else if (aRevisar) cabeca = <Aviso tom="neutro" glifo="relogio" titulo={T.revisarCabecalho} numero={aRevisar} {...espera} />
  else if (!bate) cabeca = <Aviso glifo="xis" titulo={T.naoBate} numero={naoReconhecidos} unidade={T.aMais} {...espera} />

  // O rodapé (decisão 53, lei 19 · a rodada 2 do retorno do PM): a ação de cada bloco mora na linha
  // dele — o *Corrigir este bloco* do que diverge (00), o *Enviar agora* do que espera revisão (05) —, e o
  // rodapé fica só com a saída: o Outras ações, ou o Voltar ao menu. Enquanto lê (04), as ações já estão
  // lá, desligadas, com a frase que diz quando liberam · na *tudo confere* (02, o complemento da rodada 3),
  // o rodapé é o da leitura, aceso: o Voltar ao menu e, embaixo, o Outras ações, no mesmo lugar
  let rodape
  if (lendo) rodape = <Rodape legenda={T.acoesLiberam} primario={T.voltar} primarioDesabilitado primarioTrocaTexto link={bate ? T.outrasAcoes : undefined} linkDesabilitado explicacao={bate ? undefined : T.outrasAcoes} pe="botao" />
  else if (bate) rodape = <Rodape primario={T.voltar} aoPrimario={voltar} link={T.outrasAcoes} aoLink={abrirOutras} pe="botao" />
  else if (soReenviar) rodape = <Rodape legenda={T.preservaConexao} primario={T.reenviar(blocos)} aoPrimario={reenviar} link={T.registrar} aoLink={registrar} />
  else rodape = naoBatem ? <Rodape link={T.outrasAcoes} aoLink={abrirOutras} /> : <Rodape link={T.voltar} aoLink={voltar} />
  // a ação na linha: o bloco que diverge se corrige; o que espera revisão se envia agora · o nome pro
  // leitor de tela leva o bloco (os botões repetem o texto) · enquanto a linha não foi lida, o botão
  // guarda o lugar, invisível, e aparece no lugar quando ela chega: nada muda de lugar (o marcaLugar)
  const acaoDa = (l, lida) => {
    const texto = l.estado === 'diverge' ? T.corrigirEsteBloco : l.estado === 'pendente' ? T.enviarAgora : null
    if (!texto) return undefined
    return (
      <span className={lida ? undefined : 't11-acao-espera'} aria-hidden={lida ? undefined : 'true'}>
        <BotaoDaLinha tam="teste" letra="secundario" rotulo={`${texto}: ${l.titulo}`} desabilitado={!lida} aoTocar={() => reenviarUm(l.id)}>{texto}</BotaoDaLinha>
      </span>
    )
  }

  // A tela e a faixa ficam inertes atrás do véu da folha (G25).
  const atras = outras.montado ? '' : undefined
  return (
    <div className={`t11 ${lendo ? 't11-lendo' : ''}`}>
      <BarraDoSistema fundo="faixa" veu={outras.visivel ? 'folha' : null} />
      <fieldset className="t11-topo" role="presentation" disabled={outras.montado} inert={atras}>
        <Faixa serial={par.moduloSerial} placa={ativoDe(par.ativoId)?.placa} acao={T.encerrar} aoEncerrar={enc.encerrar} />
      </fieldset>
      <div className="t11-corpo" inert={atras}>
        <div className="tela-miolo t11-miolo">
          <CabecalhoConteudo titulo={T.titulo} />
          <div className="t11-veredito">{cabeca}</div>
          <Lista>
            {/* o poço numa leitura em andamento (o pacote 5, componentes.md): a linha da vez com o
                quadrado de agora e *conferindo*; as seguintes com o relógio e o traço */}
            {linhas.map((l, i) => (i === lidas
              ? <LinhaChecagem key={l.id} variante="conferencia" estado="agora" titulo={l.titulo} valor={T.conferindoLinha} par={l.par} divisoria={i < nLinhas - 1}
                embaixo={acaoDa(l, false)} />
              : <LinhaChecagem key={l.id} variante="conferencia" estado={l.estado} nomeGlifo={l.estado === 'diverge' ? NOME_DIVERGE : undefined}
                titulo={l.titulo} valor={i > lidas ? T.vazio : l.valor} par={l.par} divisoria={i < nLinhas - 1} lendo={i > lidas}
                embaixo={acaoDa(l, i < lidas)} />
            ))}
          </Lista>
          {naoReconhecidos > 0 && <Nota tom="achado" titulo={T.naoReconhece} frase={T.foraDosBlocos(blocos)} />}
        </div>
        {rodape}
      </div>
      {outras.montado && (
        <div className="t11-sobre">
          <Veu de="folha" visivel={outras.visivel}>
            <Folha titulo={T.outrasAcoes} rotuloFechar={T.fechar} aoFechar={fecharOutras} aberta={outras.visivel}>
              <CartaoDeOpcoes>
                <LinhaDeOpcao variante="efeito" icone="reenviar" titulo={T.reenviar(blocos)} detalhe={T.efeitoReenviar} aoTocar={reenviar} />
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
