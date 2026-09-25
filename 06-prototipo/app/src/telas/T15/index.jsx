// T15 · Fila de saída (02-telas/T15-fila-de-saida): o que o aparelho ainda
// deve ao servidor, item por item, e o que precisa do técnico. No topo, o
// cartão que cresce até o espaço livre: com erro, o cartão que pede ação (a
// recusa do servidor, com a ação, e o erro de rede, que reenvia sozinho); sem
// erro, o item que sobe agora. Embaixo, o que anda sozinho — na fila e já
// recebido. Sem nada, o vazio declarado; e a Seção F em re-checagem aparece à
// parte, fora da fila (HU-T15-5).
// · Tudo sai do mock (dados.js): a fila pela seleção da semente (00, G21) ou
//   pelo recorte do caso de cada estado (01 a 04, receitas.js), o rótulo curto
//   pelo tiposFila (AC-14), a janela da re-checagem pelo criteriosRegra (AC-15).
// · O estado muda o conteúdo: os blocos ficam onde as referências desenham, e
//   onde elas mudam de desenho (o cartão compacto da 02, a Seção F da 04), a
//   tela é construída fiel (G24).
// · Os toques: Voltar ao menu → T04 (e o voltar do Android, o Esc no
//   computador, faz o mesmo: logica.md) · Ressincronizar e reenviar (a entrega
//   do design de 25/09): os itens com erro voltam pra fila e o envio recomeça.
//   O que isso mostra é só o que as referências e o mock sustentam (G25): o
//   cartão que pede ação sai, porque nada mais precisa do técnico, e os itens
//   entram na lista como 'na fila', com a espera de criadoAs às 14:30. Nenhum
//   deles vira o SUBINDO AGORA: o progresso e o tamanho só existem no f-04 do
//   mock. O item reenviado mora no estado único (`reenviados`, estado/fila.js),
//   e sair da tela não o desfaz (HU-T15-2) · ENCERRAR, antes de homologar, é a
//   sessão abortada da T16 (G23); depois de homologar, os passos do encerramento.
// · A notificação local da fila parada (HU-T15-6, o tela.md de 25/09) não se
//   constrói: nenhuma referência a desenha, e ela é do sistema, fora da tela.
// · Sem processo que ande sozinho: o envio da fila não tem ritmo declarado
//   (G4), e o 01 é estado, parado. O movimento (a barra que enche, o item que
//   esmaece, o cartão que sai) é do C12.
import {
  BarraDoSistema, Faixa, CabecalhoConteudo, CartaoAcao, Lista, LinhaFila, LinhaRechecagem, Vazio, Rodape,
} from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import {
  quadroDoEstado, quadroDoFluxo, grupos, placaDe, tituloDoItem, causaDaRecusa, causaDaRede, tamanhoDoEnvio,
  linhaDaLista, linhaDaRechecagem,
} from './dados.js'
import { Subindo, ItemQueReenvia, Legenda } from './pecas.jsx'
import { T } from './textos.js'
import './t15.css'

const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)

export default function T15({ estado: est }) {
  const { estado: unico, despachar } = useEstado()
  const quadro = (est && quadroDoEstado(est)) || quadroDoFluxo(unico)
  const { total, erros, enviando, lista } = grupos(quadro.itens)

  // a sessão: no fluxo, a do estado único; no 01 e no 02, a do herói (as
  // referências desenham M2C-0417 · RKT-8H42); no 03 e no 04, nenhuma (o caso
  // fila-vazia, T15-V1)
  const sessao = quadro.semSessao ? null : est ? (unico.sessao?.ativoId ? unico.sessao : SEMENTES.T15.sessao) : unico.sessao
  const completa = Boolean(sessao?.ativoId)

  const ir = (tela, extra = {}) => despachar({ tipo: 'ir', tela, ...extra })
  const voltarAoMenu = () => ir('T04')
  // G23: antes de homologar, a sessão abortada (T16/03); depois, o encerramento (T16)
  const encerrar = () => (unico.etapas.checklist?.homologada ? ir('T16') : ir('T16', { momento: ENCERRAR_SEM_HOMOLOGAR }))
  // o voltar do Android (logica.md): o mesmo que a saída do rodapé, o Voltar ao
  // menu. Num estado da coluna, o app está parado, e a peça não escuta
  useVoltar(voltarAoMenu)

  const faixa = !sessao
    ? <Faixa estado="sem-sessao" fato={T.semSessao} />
    : <Faixa serial={sessao.moduloSerial} placa={completa ? placaDe(sessao.ativoId) : T.semAtivo} semAtivo={!completa}
        acao={T.encerrar} aoEncerrar={encerrar} />

  // ── o cartão do topo ──
  // com erro: o cartão que pede ação, pela recusa do servidor (a que precisa
  // da mão do técnico). Com um erro, o desenho da folha 6 (00); com mais, o
  // compacto, com o erro de rede e a legenda embaixo (02, T15·1)
  const recusa = erros.find((f) => f.estado === 'erro-recusa')
  const outros = erros.filter((f) => f !== recusa)
  // Ressincronizar e reenviar: os itens com erro do cartão voltam pra fila
  // (estado único, `reenviados`); sem erro, o cartão sai e eles entram na lista
  const reenviar = () => despachar({
    tipo: 'mesclar', parcial: { reenviados: [...new Set([...(unico.reenviados ?? []), ...erros.map((f) => f.id)])] },
  })
  let cartao = null
  if (recusa) {
    const compacto = erros.length > 1
    cartao = (
      <CartaoAcao compacto={compacto} rotulo={T.rotuloDosErros[erros.length]} titulo={tituloDoItem(recusa)}
        descricao={causaDaRecusa(recusa, erros.length)} acao={T.ressincronizar} aoAgir={reenviar}>
        {outros.map((f) => <ItemQueReenvia key={f.id} titulo={tituloDoItem(f)} causa={causaDaRede(f)} nomeGlifo="sem conexão" />)}
        {compacto && outros.length === 1 && outros[0].estado === 'erro-rede' && <Legenda>{T.soAPrimeira}</Legenda>}
      </CartaoAcao>
    )
  } else if (enviando) {
    // sem erro: o item que sobe agora (01)
    cartao = <Subindo rotulo={T.subindo} titulo={tituloDoItem(enviando)} pct={enviando.progresso} unidade={T.pct}
      tamanho={tamanhoDoEnvio(enviando)} legenda={T.nadaPrecisa} />
  }

  // ── a lista: o que está na fila e o que já foi recebido. A altura é da
  // posição (T15-V2): 50 com a divisória no meio, e 62 a última ──
  const linhas = lista.map((f, i) => {
    const ultima = i === lista.length - 1
    return <LinhaFila key={f.id} {...linhaDaLista(f)} posicao={ultima ? 'fim' : 'meio'} divisoria={!ultima} />
  })

  return (
    <div className="t15">
      <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
      {faixa}
      <div className="tela-miolo">
        <CabecalhoConteudo titulo={T.titulo} contagem={total} unidade={T.nestaGaragem} />
        {total === 0 && <Vazio titulo={T.vazio} frase={quadro.ultimoEnvioAs ? T.ultimoSubiu(quadro.ultimoEnvioAs) : undefined} />}
        {cartao}
        {linhas.length > 0 && (
          <>
            {/* embaixo da recusa, o que anda sozinho (00, 02); sem recusa, o que está na fila e o recebido (01) */}
            <span className="t15-rotulo">{recusa ? T.oResto : T.naFilaERecebidas}</span>
            <Lista className="t15-lista">{linhas}</Lista>
          </>
        )}
        {quadro.secaoF && (
          <div className="t15-rechecagem">
            <span className="t15-rotulo">{T.rechecagem}</span>
            <Lista><LinhaRechecagem {...linhaDaRechecagem(quadro.secaoF)} /></Lista>
          </div>
        )}
      </div>
      <Rodape primario={T.voltar} aoPrimario={voltarAoMenu} />
    </div>
  )
}
