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
// · A leitura que corre (C12·30 a, G27): na chegada da T06 — o ativo que
//   acabou de ser confirmado, cuja CAN ainda não foi lida —, depois da troca
//   entre telas, e no Ler novamente, os sinais chegam um a cada
//   RITMOS.leituraCanSinalMs, na ordem da tela (o que o mapa não desenha, por
//   último, só na contagem). Pelo menu, depois da T08, pela URL, pelo palco,
//   na coluna e no print, a tela nasce lida e parada. Com reduzir movimento,
//   o mesmo ritmo, e nada anda.
//   O quadro de começo (C12·31 a, sem referência, G25) é o de fim com o que
//   anda na origem: o valor em traço, o marcador no começo da escala, as
//   rodinhas na casa 0, o check fora, e o primário apagado com o texto dele.
//   Enquanto lê, o cabeçalho e o rodapé dizem o que já chegou — o veredito
//   espera a prova (C12·35 e C12·44): a contagem troca no lugar a cada sinal
//   que passa, e o reprovado entra, na cor dele, com o sinal que falha; o
//   texto do primário que troca com ele (o Ler novamente) esmaece no lugar
//   (C12·23). Quando o último chega, o primário acende por uma camada (C12·8).
//   O movimento é das peças: o marcador corre em 300 (a Escala, `corre`), as
//   rodinhas rolam 300 cada, de 40 em 40 (o Tambor), a borda vermelha e a
//   causa esmaecem em 150 (a Leitura), o check do liga-desliga esmaece em 150
//   (os Sinais). O Ler novamente volta ao quadro de começo de uma vez (as
//   peças nascem de novo, paradas) e lê de novo.
// · Os toques: Configurar módulo → T09 · Voltar ao menu → T04 · Ler
//   novamente relê no lugar (T07·5 a) · ENCERRAR, antes de homologar, abre o
//   diálogo Encerrar sem homologar? por cima da tela (decisão 36), que leva à
//   sessão abortada da T16 (G23); depois de homologar (a T07 continua no
//   menu), são os passos do encerramento, a T16 (logica.md, como a T08).
import { useEffect, useState } from 'react'
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, Leitura, LeituraTambor, LeituraPequena, GradeLeituras,
  Sinais, Declarado, Rodape, useFimDaTroca,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
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

  // ── a leitura que corre (C12·30 a) ──
  // a ordem em que os sinais chegam: a da tela, e o estático que o mapa não desenha, por último
  const estaticos = leitura.sinais.filter((s) => s.fase === 'estatico')
  const naTela = [...grandes, ...tambor, ...pequenas, ...sinais].map((s) => s.id)
  const ordem = [...naTela, ...estaticos.map((s) => s.id).filter((id) => !naTela.includes(id))]
  // a chegada da T06: o ativo que o Usar este ativo acabou de confirmar, com a CAN por ler
  const [corrida, setCorrida] = useState(() => ({
    rodada: 0,
    lidos: !est && !EM_QUADRO && unico.etapas.ativo?.ativoId === sessao.ativoId && !unico.etapas.can?.lida ? 0 : null,
  }))
  const lendo = corrida.lidos != null
  const fimDaTroca = useFimDaTroca()
  useEffect(() => {
    if (!lendo) return undefined
    let vivo = true, relogio = null
    // o relógio só liga depois da troca entre telas que trouxe a tela (logo, no Ler novamente)
    fimDaTroca().then(() => {
      if (!vivo) return
      relogio = setInterval(() => setCorrida((c) => {
        if (c.lidos == null) return c
        const lidos = c.lidos + 1
        return { ...c, lidos: lidos >= ordem.length ? null : lidos }
      }), RITMOS.leituraCanSinalMs)
    })
    return () => { vivo = false; clearInterval(relogio) }
  }, [lendo, corrida.rodada, ordem.length]) // eslint-disable-line react-hooks/exhaustive-deps
  // o que já chegou: tudo, fora da corrida
  const chegaram = new Set(lendo ? ordem.slice(0, corrida.lidos) : ordem)
  const chegou = (s) => chegaram.has(s.id)
  const lidosAgora = estaticos.filter(chegou)
  const reprovadosAgora = lidosAgora.filter((s) => s.veredito !== 'ok').length
  const passaramAgora = lidosAgora.length - reprovadosAgora
  const falhou = reprovadosAgora > 0
  // cada peça no quadro de começo, até o sinal dela chegar: o de fim, com o que anda na origem
  const grande = (s) => {
    const p = leituraGrande(s, T)
    return chegou(s) ? p : { ...p, valor: T.vazio, unidade: undefined, fora: false, causa: undefined, escala: { ...p.escala, valor: p.escala.min } }
  }
  const pequena = (s) => {
    if (chegou(s)) return leituraPequena(s, T)
    // o que não vai chegar (o sem leitura) espera como os outros: a escala dele, do mapa e da faixa
    const p = leituraPequena(s.veredito === 'ausente' ? { ...s, veredito: 'ok', lido: null } : s, T)
    return { ...p, valor: T.vazio, unidade: undefined, escala: { ...p.escala, valor: p.escala.min } }
  }
  const rodas = (s) => {
    const t = leituraTambor(s)
    return chegou(s) ? t : { ...t, valor: String(t.valor).replace(/[0-9]/g, '0'), nome: [T.vazio, t.unidade].filter(Boolean).join(' ') }
  }
  const liga = (s) => (chegou(s) ? ligaDesliga(s) : { rotulo: s.rotulo, valor: T.vazio, confere: false })

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
  // falha dá lugar ao nominal do sinal. A leitura volta ao quadro de começo e
  // corre de novo, no ritmo (C12·30 a)
  const lerNovamente = () => {
    if (caso && !unico.casosConsumidos.includes(caso)) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...unico.casosConsumidos, caso] } })
    setCorrida((c) => ({ rodada: c.rodada + 1, lidos: 0 }))
  }

  // O voltar do Android (logica.md): com tudo aprovado, o Voltar ao menu, o link
  // de saída do rodapé. Com um sinal reprovado, o link é o Configurar módulo, que
  // avança pra gravação e não é saída: não faz nada (pendencias.md)
  useVoltar(falhou ? null : () => ir('T04'))

  // enquanto lê, o primário fica apagado, com o texto do que já chegou, e acende por uma camada no fim (C12·8, C12·31);
  // o texto que troca na frente de quem olha — o sinal que falha traz o Ler novamente, e o Ler novamente volta ao
  // Configurar módulo — esmaece no lugar, com o roxo direto (C12·23, o conserto de 27/09). O link troca direto
  const rodape = falhou
    ? <Rodape primario={T.lerNovamente} aoPrimario={lerNovamente} primarioDesabilitado={lendo} primarioAcende primarioTrocaTexto link={T.configurar} aoLink={() => ir('T09')} />
    : <Rodape primario={T.configurar} aoPrimario={() => ir('T09')} primarioDesabilitado={lendo} primarioAcende primarioTrocaTexto link={T.voltar} aoLink={() => ir('T04')} />

  return (
    <div className="t07">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      <Faixa serial={sessao.moduloSerial} placa={leitura.ativo.placa} acao={T.encerrar}
        aoEncerrar={enc.encerrar} />
      <div className="tela-miolo t07-miolo">
        {falhou
          ? <CabecalhoConteudo titulo={T.titulo} contagem={reprovadosAgora} unidade={T.reprovado} tom="falha" />
          : <CabecalhoConteudo titulo={T.titulo} contagem={passaramAgora} unidade={T.deTotal(leitura.total)} />}
        {/* a rodada na chave: o Ler novamente devolve as peças ao quadro de começo de uma vez, paradas */}
        {grandes.map((s) => <Leitura key={`${s.id}·${corrida.rodada}`} rotulo={caixaAlta(s.rotulo)} {...grande(s)} corre />)}
        {tambor.map((s) => <LeituraTambor key={`${s.id}·${corrida.rodada}`} rotulo={caixaAlta(s.rotulo)} nota={T.notaSemFaixa} {...rodas(s)} />)}
        <GradeLeituras folga={10}>
          {pequenas.map((s) => <LeituraPequena key={`${s.id}·${corrida.rodada}`} rotulo={caixaAlta(s.rotulo)} {...pequena(s)} corre />)}
          {sinais.length > 0 && <Sinais key={corrida.rodada} sinais={sinais.map(liga)} />}
        </GradeLeituras>
        <Declarado aoPe rotulo={T.apagados(leitura.dinamicos.length)}
          texto={leitura.dinamicos.map((s) => s.rotuloCurto ?? s.rotulo).join(T.entreSinais)} />
      </div>
      {rodape}
      {enc.sobre}
    </div>
  )
}
