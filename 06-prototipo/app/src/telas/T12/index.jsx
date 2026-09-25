// T12 · Últimas instalações (02-telas/T12-ultimas-instalacoes): o que foi
// instalado nesta garagem e o que cada instalação provou.
// · A lista (00): as instalações da garagem do contexto, agrupadas por idade
//   pelo corte do AC-16 (T12·1 a), cada uma com o veredito do estado dela
//   (T12·3 a). A i-01, de hoje às 11:47, fica ao lado da sessão aberta (G22).
// · Tocar numa instalação abre o detalhe (01) e a URL diz 01: a i-01 com as sete
//   etapas; as outras com só as linhas que o resumo sustenta (T12·2 a). O 01
//   aberto pelo endereço mostra a mais nova da garagem — a i-01 em Várzea.
// · Os estados da coluna, parados, pela receita: a 02 pela consulta vazia do
//   caso (AC-21), sem sessão; a 03 com o aviso da consulta anterior em cima da
//   lista, que desce como a referência desenha (G24).
// · O voltar do Android (logica.md), no computador o Esc, faz o mesmo que a
//   saída do rodapé: no detalhe, volta às instalações; na lista, ao menu.
import { useState } from 'react'
import { BarraDoSistema, Faixa, CabecalhoConteudo, Aviso, Vazio, Lista, LinhaHistorico, LinhaChecagem, Rodape } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { M } from '../../dados/mock.js'
import { TX } from './textos.js'
import { REF, ativoDe, instalacaoDe, agrupar, vereditoDe, detalheDaLinha, linhaDoDetalhe, linhasDoDetalhe, mundoDe } from './dados.js'
import { Grupo } from './pecas.jsx'
import './t12.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)

export default function T12({ momento, estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const mundo = mundoDe(est, unico)
  const { sessao, lista } = mundo

  // a instalação aberta no detalhe: a tocada, ou, pelo endereço, a mais nova da garagem
  const [aberta, setAberta] = useState(() => (momento === REF.detalhe ? lista[0]?.id ?? null : null))
  const detalhe = !est && momento === REF.detalhe && aberta ? instalacaoDe(aberta) : null

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const abrir = (id) => { setAberta(id); ir('T12', { momento: REF.detalhe }) }
  const voltarAsInstalacoes = () => ir('T12')
  const voltarAoMenu = () => ir('T04')
  const encerrar = () => (unico.etapas.checklist?.homologada ? ir('T16') : ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR }))

  // o voltar do Android: o Esc faz o que a saída do rodapé faz; num estado da coluna, a peça não escuta
  useVoltar(detalhe ? voltarAsInstalacoes : voltarAoMenu)

  // ── o topo: a barra na cor da faixa, e a faixa da sessão ou sem sessão ──
  const faixa = sessao
    ? <Faixa serial={sessao.moduloSerial} placa={sessao.ativoId ? ativoDe(sessao.ativoId).placa : TX.semAtivo} semAtivo={!sessao.ativoId}
        acao={TX.encerrar} aoEncerrar={encerrar} />
    : <Faixa estado="sem-sessao" fato={TX.semSessao} />

  let miolo, rodape
  if (detalhe) {
    // ── 01 · o detalhe: a placa, o veredito e a trilha de evidência, etapa por etapa ──
    const v = vereditoDe(detalhe)
    const linhas = linhasDoDetalhe(detalhe)
    miolo = (
      <div key="detalhe" className="tela-miolo t12-miolo t12-miolo-detalhe">
        <div className="t12-cabeca">
          <CabecalhoConteudo titulo={ativoDe(detalhe.ativoId).placa} contagem={v.texto} tom={v.cabeca} forte />
          <span className="t12-cabeca-linha">{linhaDoDetalhe(detalhe, unico.tecnico.nome)}</span>
        </div>
        <Lista>
          {linhas.map((l, n) => (
            <LinhaChecagem key={l.titulo} variante="dupla" estado={l.ok ? 'aprovada' : 'reprovada'} titulo={l.titulo} valor={l.valor}
              causa={l.causa} divisoria={n < linhas.length - 1} valorQuebra />
          ))}
        </Lista>
      </div>
    )
    rodape = <Rodape primario={TX.voltarAsInstalacoes} aoPrimario={voltarAsInstalacoes} />
  } else {
    // ── 00 · a lista por idade (02: o vazio declarado no lugar dela · 03: o aviso em cima) ──
    const grupos = agrupar(lista)
    miolo = (
      <div key="lista" className="tela-miolo t12-miolo">
        <CabecalhoConteudo titulo={TX.titulo} contagem={String(lista.length)} unidade={TX.nestaGaragem} />
        {mundo.consultaDas && <Aviso tom="neutro" glifo="sem-sinal-neutro" titulo={TX.semConexao} frase={TX.consultaDas(mundo.consultaDas)} />}
        {grupos.length === 0 && <Vazio titulo={TX.vazioTitulo} frase={TX.vazioFrase} />}
        {grupos.map((g, n) => (
          <Grupo key={g.id} rotulo={TX.grupos[g.id]} ultimo={n === grupos.length - 1}>
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
    </div>
  )
}
