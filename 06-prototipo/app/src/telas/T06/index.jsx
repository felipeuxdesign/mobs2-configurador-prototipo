// T06 · Selecionar ativo (02-telas/T06-selecionar-ativo): escolher o ônibus que
// está na frente do técnico e provar que é ele. A lista são os ônibus do pacote
// da garagem do contexto (G9: os 10 do mock, e o miolo rola, G16). Tocar num
// deles o marca, e o 'Usar este ativo' leva à confirmação (R-14; T06·1 b, o
// T06-N3), que checa, nesta ordem, o pacote, os pinos e o chassi (T06·3 a):
//   · fora do pacote → a trava, sem pedir cadastro (04)
//   · o par da faixa é um caso de pinos → a trava com ou sem saída (05, 06);
//     'Usar leitor sem fio' resolve no lugar: a sessão passa a sem fio (T06·4 a)
//   · o modelo não manda chassi → a confirmação marcada libera o primário (03)
//   · o chassi lido contra o do cadastro: batem (01) ou divergem (02);
//     'Solicitar correção de cadastro' vira o registro no mesmo cartão (07)
// O ônibus que não é caso abre a 01 com o lido igual ao cadastro (T06·2 a).
// A busca que não acha nenhum ônibus do pacote mostra o vazio declarado, com o
// termo no título (08, a entrega de 25/09, que muda a T06·5). Enquanto a busca
// esconde o ônibus marcado, o primário espera (decisão do diretor, 25/09, b), e
// a URL diz o 09 (a otimização do design). Com um termo na busca, a instrução
// sai: embaixo do campo fica o que a busca achou, a lista ou o vazio, como a 08
// e a 09 desenham.
// 'Usar este ativo' grava o ativo na sessão e segue pra T07.
// O último grupo antes do rodapé não tem margem: a folga é só a da coluna, os 16
// do recheio do miolo (a proposta do protótipo que o arquiteto aceitou, e as
// referências da otimizacao300000000 desenham — MUDANCAS §4). Assim a lista do
// pacote (00), que rola, e a linha da correção de cadastro (02, 07), embaixo do
// par comparado, que cresce até ela. Onde o último bloco é o que cresce (o par
// que bate, 01, e a trava, 04 a 06), ele segue com os 16 dele
// (t06-antes-do-rodape), como as referências ainda desenham.
import { useEffect, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Busca, Lista, LinhaOnibus, BlocoEscolhido,
  ParComparado, Nota, Checkbox, LinhaTocavel, Rodape, Vazio,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import {
  REF, ativoDe, modeloDe, doPacote, contagemDoPacote, ativoDoModulo, filtrar, placaDeOutroPacote,
  avaliar, mundoDoEstado, ultimosTrocados,
} from './dados.js'
import './t06.css'

// os termos que as referências 08 e 09 desenham digitados (textos.md): o endereço do momento abre com eles
const TERMO_DA_08 = 'ABC-1234'
const TERMO_DA_09 = 'PCX'
// os dois quadros da busca, e a URL que diz cada um
const DA_BUSCA = [REF.semResultado, REF.esconde]
const nadaCom = (termo) => `Nada com “${termo}”`

export default function T06({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const sessaoFluxo = unico.sessao ?? SEMENTES.T06.sessao
  const uoFluxo = unico.contexto.uoId ?? M.contextoAtivo.uoId

  // num estado da coluna, o mundo é o do caso (receitas.js); no fluxo, o do estado
  // único. O momento 07 também é do caso: o do chassi divergente (mundoDoEstado)
  const doCaso = est ?? (momento === REF.corrigida ? momento : null)
  const doEstado = doCaso ? mundoDoEstado(doCaso, { sessao: sessaoFluxo, uoId: uoFluxo }) : null
  const sessao = doEstado?.sessao ?? sessaoFluxo
  const uoId = doEstado?.uoId ?? uoFluxo

  // o ônibus escolhido: o do caso, o do módulo da sessão (a 01 aberta pela URL) ou nenhum (a lista)
  const [escolhido, setEscolhido] = useState(() => doEstado?.ativoId ?? (momento === REF.confirmar ? ativoDoModulo(uoFluxo, sessaoFluxo) : null))
  const [busca, setBusca] = useState(momento === REF.semResultado ? TERMO_DA_08 : momento === REF.esconde ? TERMO_DA_09 : '')
  const [confirmado, setConfirmado] = useState(false)
  // na lista, tocar num ônibus o marca, e o 'Usar este ativo' leva à confirmação
  // (decisão do diretor, 24/09: a T06·1 passa pra (b), o T06-N3). Aberta pelo 09, o
  // marcado é o ônibus do módulo da sessão (RKT-8H42), como o 01, e a busca da
  // referência (PCX) o esconde
  const [marcado, setMarcado] = useState(() => (momento === REF.esconde ? ativoDoModulo(uoFluxo, sessaoFluxo) : null))
  // os ônibus com a correção de cadastro já pedida, enquanto a T06 está aberta:
  // o pedido não volta a ser tocável — escolher o mesmo ônibus de novo abre o registro (07)
  const [pedidos, setPedidos] = useState(() => (momento === REF.corrigida && doEstado?.ativoId ? [doEstado.ativoId] : []))

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const escolher = (id) => { setEscolhido(id); setConfirmado(false); ir('T06', { momento: pedidos.includes(id) ? REF.corrigida : REF.confirmar }) }
  const escolherOutro = () => { setEscolhido(null); setMarcado(null); setConfirmado(false); ir('T06') }
  const voltarAoMenu = () => ir('T04')
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar sem homologar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()

  // a busca filtra ao digitar; a placa de um ônibus de outro pacote abre a trava dele (T06·5 a)
  const buscar = (texto) => {
    setBusca(texto)
    const fora = placaDeOutroPacote(texto, uoId)
    if (fora) escolher(fora.id)
  }

  const ativo = escolhido ? ativoDe(escolhido) : null
  const prova = ativo ? avaliar(ativo, { uoId, sessao }, doEstado?.desde) : null

  // a lista do pacote, filtrada pela busca. Sem nenhum ônibus, o vazio declarado
  // no lugar da instrução e da lista, e o primário espera, como a 08 desenha; o
  // ônibus marcado fica guardado e volta com a lista
  const lista = ativo ? [] : filtrar(doPacote(uoId), busca)
  const semResultado = !ativo && busca.trim() !== '' && lista.length === 0
  // a busca que acha outros ônibus e esconde o marcado: o primário espera, e
  // acende de novo quando o marcado volta à lista (decisão do diretor, 25/09, b)
  const marcadoAVista = marcado != null && lista.some((a) => a.id === marcado)
  const esconde = !ativo && !semResultado && marcado != null && !marcadoAVista
  // a URL diz o quadro da busca: o 08 enquanto ela não acha nada, o 09 enquanto
  // ela acha outros e esconde o marcado; a que volta a achar, ou devolve o
  // marcado, tira o momento. Num estado da coluna, nada anda
  const quadroDaBusca = semResultado ? REF.semResultado : esconde ? REF.esconde : null
  useEffect(() => {
    if (est) return
    if (quadroDaBusca && momento !== quadroDaBusca) despachar({ tipo: 'ir', tela: 'T06', momento: quadroDaBusca })
    else if (!quadroDaBusca && DA_BUSCA.includes(momento)) despachar({ tipo: 'ir', tela: 'T06', momento: null })
  }, [est, quadroDaBusca, momento, despachar])

  // O voltar do Android (logica.md): o link de saída do rodapé — na lista, na
  // busca sem resultado, no chassi divergente e na correção pedida (00, 08, 02,
  // 07), o Voltar ao menu; na
  // confirmação (01, 03, 05), o Escolher outro, que volta à lista. Nas travas sem
  // link (04, 06), o Escolher outro do primário, a saída que elas têm
  useVoltar(!ativo || prova.passo === 'diverge' ? voltarAoMenu : escolherOutro)

  // 'Usar este ativo': o ativo entra na sessão, e o vínculo fica anotado com
  // como foi provado — o chassi lido ou a confirmação do técnico, às 14:30
  const usar = () => {
    despachar({ tipo: 'mesclar', parcial: {
      sessao: { ...sessao, ativoId: ativo.id },
      etapas: { ...unico.etapas, ativo: { ativoId: ativo.id, vinculo: prova.passo === 'sem-chassi' ? 'confirmacao' : 'chassi', as: M.HORA_NOMINAL } },
    } })
    ir('T07')
  }
  // 'Usar leitor sem fio' (T06·4 a): a sessão passa a sem fio, e o mesmo ônibus segue pra confirmação
  const usarSemFio = () => {
    despachar({ tipo: 'mesclar', parcial: { sessao: { ...sessao, meio: 'sem-fio' } } })
    ir('T06', { momento: REF.confirmar })
  }
  // 'Solicitar correção de cadastro' (T06·2, o 07): o pedido vira o registro no
  // mesmo cartão, com a hora do protótipo, e deixa de ser tocável
  const solicitarCorrecao = () => {
    setPedidos((p) => (p.includes(ativo.id) ? p : [...p, ativo.id]))
    ir('T06', { momento: REF.corrigida })
  }

  const faixa = (
    <Faixa serial={sessao.moduloSerial} placa="sem ativo" semAtivo acao="ENCERRAR" aoEncerrar={enc.encerrar} />
  )

  let miolo, rodape
  if (!ativo) {
    // ── 00 · a lista do pacote · 08 · a busca sem resultado · 09 · a busca que esconde o marcado ──
    // com um termo na busca, a instrução sai, e embaixo do campo fica o que ela achou (a 08 e a 09)
    const buscando = busca.trim() !== ''
    miolo = (
      <>
        <CabecalhoConteudo titulo="Selecionar ativo" contagem={contagemDoPacote(unico.contexto, uoId)} unidade="no pacote" />
        <Busca dica="Buscar placa, frota ou módulo" valor={busca} aoMudar={buscar} focado={semResultado || esconde} />
        {semResultado ? (
          <Vazio titulo={nadaCom(busca.trim())} frase="Confira a placa, ou busque pela frota." />
        ) : (
          <>
            {!buscando && <span className="t06-instrucao">Escolha o veículo que está na sua frente.</span>}
            <Lista className="t06-lista">
              {lista.map((a, i) => (
                <LinhaOnibus key={a.id} placa={a.placa} modelo={modeloDe(a).nome} rotuloFrota="FROTA" frota={a.frota}
                  divisoria={i < lista.length - 1} escolhido={a.id === marcado} aoTocar={() => setMarcado(a.id)} />
              ))}
            </Lista>
          </>
        )}
      </>
    )
    rodape = <Rodape primario="Usar este ativo" primarioDesabilitado={!marcadoAVista} aoPrimario={() => escolher(marcado)} link="Voltar ao menu" aoLink={voltarAoMenu} />
  } else {
    const modelo = modeloDe(ativo)
    const detalhe = `frota ${ativo.frota} · ${modelo.nome}`
    const titulo = <CabecalhoConteudo titulo="Confirmar o veículo" />
    const { passo } = prova

    if (passo === 'fora' || passo === 'resolvivel' || passo === 'sem-saida') {
      // ── 04 · 05 · 06 · a trava mora no escolhido ──
      const { caso } = prova
      const trava = {
        fora: { rotulo: 'FORA DO PACOTE DESTA UO', falha: true, motivo: [`Pertence a ${prova.garagem}.`, 'Acione o cadastro no M2.'] },
        resolvivel: caso && { rotulo: `CONFLITO NO ${caixaAlta(caso.fio)}`, tom: 'neutro', motivo: [`O ${caso.ocupadoPor} já ocupa o ${caso.fio}.`, 'Com o leitor sem fio, os dois funcionam.'] },
        'sem-saida': caso && { rotulo: 'ERRO DE PROJETO DE INSTALAÇÃO', falha: true, motivo: [`O ${caso.fio} é do ${caso.ocupadoPor}, e este módulo não tem leitor sem fio.`, 'Acione o gestor.'] },
      }[passo]
      miolo = (
        <>
          {titulo}
          <BlocoEscolhido className="t06-antes-do-rodape" rotulo={trava.rotulo} falha={trava.falha} tom={trava.tom}
            identidade={ativo.placa} detalhe={detalhe} motivo={trava.motivo} />
        </>
      )
      rodape = passo === 'resolvivel'
        ? <Rodape primario="Usar leitor sem fio" aoPrimario={usarSemFio} link="Escolher outro" aoLink={escolherOutro} />
        : <Rodape primario="Escolher outro" aoPrimario={escolherOutro} />
    } else if (passo === 'sem-chassi') {
      // ── 03 · o modelo não manda o chassi: o vínculo é a confirmação do técnico ──
      miolo = (
        <>
          {titulo}
          <BlocoEscolhido justo rotulo="ESCOLHIDO" identidade={ativo.placa} detalhe={detalhe} />
          <Nota tom="fato" titulo="SEM CHASSI NA CAN" frase="Este modelo não manda o chassi. O vínculo fica pela sua confirmação, e ela entra na evidência." />
          <Checkbox marcado={confirmado} aoMudar={setConfirmado}>{`Confirmo que o ${ativo.placa} é o veículo à minha frente`}</Checkbox>
        </>
      )
      rodape = (
        <Rodape legenda="Confirme o veículo para continuar" primario="Usar este ativo" primarioDesabilitado={!confirmado} aoPrimario={usar}
          link="Escolher outro" aoLink={escolherOutro} />
      )
    } else {
      // ── 01 · 02 · o par comparado: o chassi lido e o do cadastro ──
      const bate = passo === 'confere'
      const explicacao = bate ? 'Os dois batem — é este veículo.'
        : ultimosTrocados(prova.lido, prova.cadastro) ? 'Os dois últimos dígitos estão trocados de lugar — erro de digitação no cadastro.' : null
      miolo = (
        <>
          {titulo}
          <BlocoEscolhido justo tom={bate ? 'escolhido' : 'apagado'} rotulo="ESCOLHIDO" identidade={ativo.placa} detalhe={detalhe} />
          <ParComparado className={bate ? 't06-antes-do-rodape' : ''} veredito
            lido={{ titulo: 'CHASSI LIDO DO VEÍCULO', valor: prova.lido }}
            cadastro={{ titulo: 'NO CADASTRO', valor: prova.cadastro }}
            explicacao={explicacao} />
          {/* 02 → 07: o pedido de correção, e depois do toque o registro no mesmo cartão (a hora é a do protótipo) */}
          {!bate && (pedidos.includes(ativo.id)
            ? <LinhaTocavel variante="acao" registrado estado="relogio"
                titulo={`Correção solicitada às ${M.HORA_NOMINAL}`} valor="o gestor recebe os dois chassis" />
            : <LinhaTocavel variante="acao" titulo="Solicitar correção de cadastro" valor="anexa os dois" aoTocar={solicitarCorrecao} />)}
        </>
      )
      rodape = bate
        ? <Rodape primario="Usar este ativo" aoPrimario={usar} link="Escolher outro" aoLink={escolherOutro} />
        : <Rodape primario="Escolher outro veículo" aoPrimario={escolherOutro} link="Voltar ao menu" aoLink={voltarAoMenu} />
    }
  }

  return (
    <div className="t06">
      <BarraDoSistema hora={M.HORA_NOMINAL} />
      {faixa}
      <div className="tela-miolo t06-miolo">{miolo}</div>
      {rodape}
      {enc.sobre}
    </div>
  )
}
