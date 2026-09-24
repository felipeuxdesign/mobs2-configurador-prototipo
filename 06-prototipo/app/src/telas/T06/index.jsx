// T06 · Selecionar ativo (02-telas/T06-selecionar-ativo): escolher o ônibus que
// está na frente do técnico e provar que é ele. A lista são os ônibus do pacote
// da garagem do contexto (G9: os 10 do mock, e o miolo rola, G16). Tocar num
// deles vai direto à confirmação (T06·1 a), e a confirmação checa, nesta ordem,
// o pacote, os pinos e o chassi (T06·3 a):
//   · fora do pacote → a trava, sem pedir cadastro (04)
//   · o par da faixa é um caso de pinos → a trava com ou sem saída (05, 06);
//     'Usar leitor sem fio' resolve no lugar: a sessão passa a sem fio (T06·4 a)
//   · o modelo não manda chassi → a confirmação marcada libera o primário (03)
//   · o chassi lido contra o do cadastro: batem (01) ou divergem (02)
// O ônibus que não é caso abre a 01 com o lido igual ao cadastro (T06·2 a).
// 'Usar este ativo' grava o ativo na sessão e segue pra T07.
import { useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Busca, Lista, LinhaOnibus, BlocoEscolhido,
  ParComparado, Nota, Checkbox, LinhaTocavel, Rodape,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import {
  REF, ativoDe, modeloDe, doPacote, contagemDoPacote, ativoDoModulo, filtrar, placaDeOutroPacote,
  avaliar, mundoDoEstado, ultimosTrocados,
} from './dados.js'
import './t06.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)

export default function T06({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const sessaoFluxo = unico.sessao ?? SEMENTES.T06.sessao
  const uoFluxo = unico.contexto.uoId ?? M.contextoAtivo.uoId

  // num estado da coluna, o mundo é o do caso (receitas.js); no fluxo, o do estado único
  const doEstado = est ? mundoDoEstado(est, { sessao: sessaoFluxo, uoId: uoFluxo }) : null
  const sessao = doEstado?.sessao ?? sessaoFluxo
  const uoId = doEstado?.uoId ?? uoFluxo

  // o ônibus escolhido: o do caso, o do módulo da sessão (a 01 aberta pela URL) ou nenhum (a lista)
  const [escolhido, setEscolhido] = useState(() => doEstado?.ativoId ?? (momento === REF.confirmar ? ativoDoModulo(uoFluxo, sessaoFluxo) : null))
  const [busca, setBusca] = useState('')
  const [confirmado, setConfirmado] = useState(false)
  // na lista, tocar num ônibus o marca, e o 'Usar este ativo' leva à confirmação
  // (decisão do diretor, 24/09: a T06·1 passa pra (b), o T06-N3)
  const [marcado, setMarcado] = useState(null)

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const escolher = (id) => { setEscolhido(id); setConfirmado(false); ir('T06', { momento: REF.confirmar }) }
  const escolherOutro = () => { setEscolhido(null); setMarcado(null); setConfirmado(false); ir('T06') }
  const voltarAoMenu = () => ir('T04')
  const encerrar = () => ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR })

  // a busca filtra ao digitar; a placa de um ônibus de outro pacote abre a trava dele (T06·5 a)
  const buscar = (texto) => {
    setBusca(texto)
    const fora = placaDeOutroPacote(texto, uoId)
    if (fora) escolher(fora.id)
  }

  const ativo = escolhido ? ativoDe(escolhido) : null
  const prova = ativo ? avaliar(ativo, { uoId, sessao }, doEstado?.desde) : null

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

  const faixa = (
    <Faixa serial={sessao.moduloSerial} placa="sem ativo" semAtivo acao="ENCERRAR" aoEncerrar={encerrar} />
  )

  let miolo, rodape
  if (!ativo) {
    // ── 00 · a lista do pacote ──
    const lista = filtrar(doPacote(uoId), busca)
    miolo = (
      <>
        <CabecalhoConteudo titulo="Selecionar ativo" contagem={contagemDoPacote(unico.contexto, uoId)} unidade="no pacote" />
        <Busca dica="Buscar placa, frota ou módulo" valor={busca} aoMudar={buscar} />
        <span className="t06-instrucao">Escolha o veículo que está na sua frente.</span>
        <Lista className="t06-lista">
          {lista.map((a, i) => (
            <LinhaOnibus key={a.id} placa={a.placa} modelo={modeloDe(a).nome} rotuloFrota="FROTA" frota={a.frota}
              divisoria={i < lista.length - 1} fim={i === lista.length - 1} escolhido={a.id === marcado} aoTocar={() => setMarcado(a.id)} />
          ))}
        </Lista>
      </>
    )
    rodape = <Rodape primario="Usar este ativo" primarioDesabilitado={!marcado} aoPrimario={() => escolher(marcado)} link="Voltar ao menu" aoLink={voltarAoMenu} />
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
          {/* G25: o pedido de correção dá o pressionado e só o que o texto promete — sem dado nem destino no mock */}
          {!bate && <LinhaTocavel variante="acao" className="t06-antes-do-rodape" titulo="Solicitar correção de cadastro" valor="anexa os dois" aoTocar={() => {}} />}
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
    </div>
  )
}
