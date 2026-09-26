// T12 · Últimas instalações (02-telas/T12-ultimas-instalacoes): o que foi
// instalado nesta garagem e o que cada instalação provou.
// · A lista (00): as instalações da garagem do contexto, agrupadas por idade
//   pelo corte do AC-16 (T12·1 a), cada uma com o veredito do estado dela
//   (T12·3 a). A i-01, de hoje às 11:47, fica ao lado da sessão aberta (G22).
// · Tocar numa instalação abre o detalhe (01) e a URL diz 01: em cima, o que o
//   servidor recebeu — posicionamento, eventos e viagens, cada um com o veredito
//   e o porquê (decisão 41) —, e embaixo a instalação: a i-01 com as seis
//   etapas; as outras com só as linhas que o resumo sustenta (T12·2 a). O 01
//   aberto pelo endereço mostra a mais nova da garagem — a i-01 em Várzea.
// · Os estados da coluna, parados, pela receita: a 02 pela consulta vazia do
//   caso (AC-21), sem sessão; a 03 com o aviso da consulta anterior em cima da
//   lista, que desce como a referência desenha (G24); a 04 e a 05, o detalhe da
//   PCX-9A17 com o recebimento do caso — o critério indisponível (o traço, com o
//   motivo) ou pendente (o relógio, confere por 24 h) —, e o status geral
//   'aguardando validação', que sai dos critérios.
// · O voltar do Android (logica.md), no computador o Esc, faz o mesmo que a
//   saída do rodapé: no detalhe, volta às instalações; na lista, ao menu.
import { useState } from 'react'
import { BarraDoSistema, Faixa, CabecalhoConteudo, Aviso, Vazio, Lista, LinhaHistorico, LinhaChecagem, Rodape } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { useEncerrar } from '../../estado/encerrar.jsx'
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'
import {
  REF, ativoDe, instalacaoDe, agrupar, vereditoDe, vereditoDoEstado, detalheDaLinha, linhaDoDetalhe, linhasDoDetalhe, mundoDe,
  criteriosDe, estadoGeral, detalheDoCaso,
} from './dados.js'
import { Grupo } from './pecas.jsx'
import './t12.css'


export default function T12({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const mundo = mundoDe(est, unico)
  const { sessao, lista } = mundo

  // a instalação aberta no detalhe: a tocada, ou, pelo endereço, a mais nova da
  // garagem; nos estados 04 e 05, a do caso, com o recebimento dele
  const [aberta, setAberta] = useState(() => (momento === REF.detalhe ? lista[0]?.id ?? null : null))
  const doCaso = est ? detalheDoCaso(est) : null
  const detalhe = doCaso?.instalacao ?? (!est && momento === REF.detalhe && aberta ? instalacaoDe(aberta) : null)

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const abrir = (id) => { setAberta(id); ir('T12', { momento: REF.detalhe }) }
  const voltarAsInstalacoes = () => ir('T12')
  const voltarAoMenu = () => ir('T04')
  // o ENCERRAR (decisão 36, src/estado/encerrar.jsx): antes de homologar, o diálogo
  // Encerrar sem homologar? por cima desta tela; depois de homologar, direto, pra T16
  const enc = useEncerrar()

  // o voltar do Android: o Esc faz o que a saída do rodapé faz; num estado da coluna, a peça não escuta
  useVoltar(detalhe ? voltarAsInstalacoes : voltarAoMenu)

  // ── o topo: a barra na cor da faixa, e a faixa da sessão ou sem sessão ──
  const faixa = sessao
    ? <Faixa serial={sessao.moduloSerial} placa={sessao.ativoId ? ativoDe(sessao.ativoId).placa : TX.semAtivo} semAtivo={!sessao.ativoId}
        acao={TX.encerrar} aoEncerrar={enc.encerrar} />
    : <Faixa estado="sem-sessao" fato={TX.semSessao} />

  let miolo, rodape
  if (detalhe) {
    // ── 01, 04, 05 · o detalhe: a placa e o status geral, o que o servidor
    // recebeu (os três critérios) e a trilha de evidência, etapa por etapa ──
    const criterios = criteriosDe(detalhe, doCaso ? doCaso.recebimento : detalhe.recebimento)
    const v = vereditoDoEstado(estadoGeral(detalhe, criterios))
    const linhas = linhasDoDetalhe(detalhe)
    miolo = (
      <div key="detalhe" className="tela-miolo t12-miolo t12-miolo-detalhe">
        <div className="t12-cabeca">
          <CabecalhoConteudo titulo={ativoDe(detalhe.ativoId).placa} contagem={v.texto} tom={v.cabeca} forte />
          <span className="t12-cabeca-linha">{linhaDoDetalhe(detalhe)}</span>
        </div>
        <Grupo rotulo={TX.oQueRecebeu} secao>
          <Lista>
            {criterios.map((c, n) => (
              <LinhaChecagem key={c.id} variante="recebimento" estado={c.natureza} titulo={c.titulo} porque={c.porque} valor={c.valor}
                divisoria={n < criterios.length - 1} />
            ))}
          </Lista>
        </Grupo>
        <Grupo rotulo={TX.aInstalacao} secao>
          <Lista>
            {linhas.map((l, n) => (
              <LinhaChecagem key={l.titulo} variante="dupla" estado={l.ok ? 'aprovada' : 'reprovada'} titulo={l.titulo} valor={l.valor}
                causa={l.causa} divisoria={n < linhas.length - 1} />
            ))}
          </Lista>
        </Grupo>
      </div>
    )
    rodape = <Rodape primario={TX.voltarAsInstalacoes} aoPrimario={voltarAsInstalacoes} />
  } else {
    // ── 00 · a lista por idade (02: o vazio declarado no lugar dela · 03: o aviso em cima) ──
    const grupos = agrupar(lista)
    miolo = (
      <div key="lista" className="tela-miolo t12-miolo">
        <CabecalhoConteudo titulo={TX.titulo} contagem={String(lista.length)} unidade={TX.nestaUnidade} />
        {mundo.consultaDas && <Aviso tom="neutro" glifo="sem-sinal-neutro" titulo={TX.semConexao} frase={TX.consultaDas(mundo.consultaDas)} />}
        {grupos.length === 0 && <Vazio titulo={TX.vazioTitulo} frase={TX.vazioFrase} />}
        {grupos.map((g) => (
          <Grupo key={g.id} rotulo={TX.grupos[g.id]}>
            <Lista>
              {g.itens.map((i, k) => {
                const v = vereditoDe(i); const d = detalheDaLinha(i)
                return (
                  <LinhaHistorico key={i.id} placa={ativoDe(i.ativoId).placa} detalhe={d.texto} detalheTam={d.tam} veredito={v.texto}
                    estado={v.glifo} tom={v.tom} divisoria={k < g.itens.length - 1} aoTocar={() => abrir(i.id)} />
                )
              })}
            </Lista>
          </Grupo>
        ))}
      </div>
    )
    rodape = <Rodape primario={TX.voltarAoMenu} aoPrimario={voltarAoMenu} />
  }

  return (
    <div className="t12">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      {faixa}
      {miolo}
      {rodape}
      {enc.sobre}
    </div>
  )
}
