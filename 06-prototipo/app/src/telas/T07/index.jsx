// T07 · Dados da CAN (02-telas/T07-dados-da-can): com o ônibus parado e a
// chave ligada, cada sinal estático que a CAN entregou contra a faixa que o
// cadastro espera; o bloco que falhou acende com a causa provável, e os que
// só se provam andando ficam num resumo apagado.
// · Tudo sai do mock: os sinais do modelo do ativo da sessão, pela peça do
//   mapa por id (T07·4 b), a escala pela regra da T07·2 (leitura.js).
// · Os estados da coluna, parados, pela receita: o 01 (can-estatico-isolado)
//   e o 02 (can-estatico-ausente) trocam a sessão pela do caso. O estado muda
//   o conteúdo; onde a referência remonta (a causa do 01 abre espaço), ela é
//   construída fiel (G24). O 03 fica fora do ciclo (T07·1 a).
// · No fluxo, a tela abre já lida (G27, C8·2): o ritmo da leitura e o
//   movimento (o marcador que corre, o tambor que rola) são do C12.
// · Os toques: Configurar módulo → T09 · Voltar ao menu → T04 · Ler
//   novamente relê no lugar (T07·5 a) · ENCERRAR, antes de homologar, abre o
//   diálogo Encerrar sem homologar? por cima da tela (decisão 36), que leva à
//   sessão abortada da T16 (G23); depois de homologar (a T07 continua no
//   menu), são os passos do encerramento, a T16 (logica.md, como a T08).
import { useEffect } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Leitura, LeituraTambor, LeituraPequena, GradeLeituras,
  Sinais, Declarado, Rodape,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { Vazia } from '../Vazia.jsx'
import {
  REF, casoDoEstado, casoDoAtivo, ativoDe, ler, pecas, leituraGrande, leituraPequena, leituraTambor, ligaDesliga,
} from './leitura.js'
import { T } from './textos.js'
import './t07.css'


// a sessão do estado da coluna: o par módulo × ativo do caso, do cadastro
function sessaoDoCaso(casoId) {
  const a = ativoDe(M.casos[casoId].ativoId)
  return { ...SEMENTES.T07.sessao, ativoId: a.id, moduloSerial: a.moduloSerial }
}

export default function T07({ estado: est }) {
  // T07·1 (a): o domínio mudo espera a referência nova do ma-02 — até lá, a
  // coluna abre a tela ainda não construída, com o nome (como no C3)
  if (est === REF.dominio) return <Vazia tela="T07" estado={est} />
  return <DadosDaCan est={est} />
}

function DadosDaCan({ est }) {
  const { estado: unico, despachar } = useEstado()
  const casoEst = est ? casoDoEstado(est) : null
  const sessao = casoEst ? sessaoDoCaso(casoEst) : (unico.sessao?.ativoId ? unico.sessao : SEMENTES.T07.sessao)
  const caso = est ? casoEst : casoDoAtivo(sessao.ativoId)
  const consumido = !est && caso != null && unico.casosConsumidos.includes(caso)
  const leitura = ler(sessao.ativoId, caso, consumido)
  const { leitura: grandes, tambor, pequenas, sinais } = pecas(leitura)
  const falhou = leitura.reprovados > 0

  // no fluxo, a leitura feita vai pro estado único (etapas.can)
  useEffect(() => {
    if (est) return
    const atual = unico.etapas.can
    if (atual?.lida && atual.reprovados === leitura.reprovados) return
    despachar({ tipo: 'mesclar', parcial: { etapas: { ...unico.etapas, can: { ...atual, lida: true, reprovados: leitura.reprovados } } } })
  }, [est, leitura.reprovados]) // eslint-disable-line react-hooks/exhaustive-deps

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  // G23: antes de homologar, a sessão abortada (T16/03); depois, o encerramento (T16)
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar sem homologar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()
  // T07·5 (a): relê no lugar. O caso vale uma vez por sessão (G21): relida, a
  // falha dá lugar ao nominal do sinal
  const lerNovamente = () => {
    if (caso && !unico.casosConsumidos.includes(caso)) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...unico.casosConsumidos, caso] } })
  }

  // O voltar do Android (logica.md): com tudo aprovado, o Voltar ao menu, o link
  // de saída do rodapé. Com um sinal reprovado, o link é o Configurar módulo, que
  // avança pra gravação e não é saída: não faz nada (pendencias.md)
  useVoltar(falhou ? null : () => ir('T04'))

  const rodape = falhou
    ? <Rodape primario={T.lerNovamente} aoPrimario={lerNovamente} link={T.configurar} aoLink={() => ir('T09')} />
    : <Rodape primario={T.configurar} aoPrimario={() => ir('T09')} link={T.voltar} aoLink={() => ir('T04')} />

  return (
    <div className="t07">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      <Faixa serial={sessao.moduloSerial} placa={leitura.ativo.placa} acao={T.encerrar}
        aoEncerrar={enc.encerrar} />
      <div className="tela-miolo t07-miolo">
        {falhou
          ? <CabecalhoConteudo titulo={T.titulo} contagem={leitura.reprovados} unidade={T.reprovado} tom="falha" />
          : <CabecalhoConteudo titulo={T.titulo} contagem={leitura.passaram} unidade={T.deTotal(leitura.total)} />}
        {grandes.map((s) => <Leitura key={s.id} rotulo={caixaAlta(s.rotulo)} {...leituraGrande(s, T)} />)}
        {tambor.map((s) => <LeituraTambor key={s.id} rotulo={caixaAlta(s.rotulo)} nota={T.notaSemFaixa} {...leituraTambor(s)} />)}
        <GradeLeituras folga={10}>
          {pequenas.map((s) => <LeituraPequena key={s.id} rotulo={caixaAlta(s.rotulo)} {...leituraPequena(s, T)} />)}
          {sinais.length > 0 && <Sinais sinais={sinais.map(ligaDesliga)} />}
        </GradeLeituras>
        <Declarado aoPe rotulo={T.apagados(leitura.dinamicos.length)}
          texto={leitura.dinamicos.map((s) => s.rotuloCurto ?? s.rotulo).join(T.entreSinais)} />
      </div>
      {rodape}
      {enc.sobre}
    </div>
  )
}
