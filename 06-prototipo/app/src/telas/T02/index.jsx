// T02 · Selecionar contexto (02-telas/T02-selecionar-contexto): o técnico diz
// em que unidade está hoje (a palavra é unidade, a lei 18 · decisão 37). As
// unidades vêm do mock (garagens.js), agrupadas por UC na ordem do mundo; cada
// linha diz a idade do pacote, derivada do dado (formato.js), e os ativos que
// ele traz (T02·5). Tocar numa unidade a escolhe (tocar de novo não desmarca,
// T02·4) — o Pátio Caruaru, vencido, também (T02·1 a). O primário grava o
// contexto no estado único e vai pra T03.
//
// Os mundos e os quadros (empresas.js): a empresa vem sempre antes da unidade,
// pra todo técnico (decisão 37, revista pelo diretor em 26/09).
//  · o herói, com três empresas (M.empresas) — o Entrar da T01 abre aqui:
//    05-estado-escolher-a-empresa (Pra qual empresa hoje?, as empresas com a
//    contagem das unidades, o primário apagado até escolher) → 07-momento-empresa-
//    escolhida (a Viação marcada, Ver as unidades) → as unidades da Viação, com a
//    empresa em cima e o Trocar de empresa no rodapé (o quadro do 06-estado-unidades-
//    com-trocar-empresa) → 09-momento-unidade-escolhida-com-trocar-empresa (a unidade
//    escolhida, e o Trocar de empresa ainda lá) → Sincronizar → T03. O Trocar de
//    empresa volta ao 07, com a atual marcada. Com as outras duas escolhidas, o Ver
//    as unidades espera: o mock traz só a contagem delas
//  · uma empresa só (o caso uma-empresa): 08-estado-uma-empresa-ja-marcada (a lista
//    com ela marcada e o Ver as unidades aceso) → 00-tela (as unidades, com o nome
//    dela em cima e sem o Trocar de empresa) → 01-momento-escolhida → T03. A coluna
//    consulta os quadros 00 e 01 parados; o painel abre as empresas do herói
//  · a lista longa (o caso lista-longa-garagens, de uma empresa só):
//    02-estado-lista-longa-com-busca (9 unidades, mais que o limite sem busca, e a
//    busca aparece; ela filtra por nome ou cidade) · 03-momento-busca-sem-resultado (a
//    entrega de 25/09: a busca que não acha nada — o vazio declarado diz o termo
//    digitado e sugere buscar pela cidade) · 04-momento-busca-esconde-a-escolha (a
//    otimização do design: a Várzea escolhida e a busca que acha outra unidade e a
//    esconde — o primário espera). A busca não é condição do quadro: aparece em
//    qualquer mundo com mais de 6 unidades, e o do herói, com 3, não a tem. A lista
//    rola por baixo do rodapé, que fica parado (G16, o miolo que rola). Toda unidade
//    do mundo do caso tem pacote (src/dados/garagens.js): o Sincronizar de qualquer
//    uma leva à T03, que baixa o pacote dela.
// Os estados (02, 05, 06, 08) abrem pela coluna e pelo endereço, parados e sem
// toque; os momentos abertos pelo endereço são o app vivo no mundo deles. Aberta, a
// tela fica no mundo enquanto está montada, e o mundo vai junto no estado único
// (contexto.empresas) até o menu; a T02 aberta no fluxo com ele no contexto abre nele.
//
// Outro usuário no aparelho (a T01/18, a última entrega): o Entrar com outro
// usuário depois de uma sessão neste aparelho abre esta tela com o diálogo *Outra
// sessão neste aparelho* por cima (situacao.outraSessao), que nasce aberto, com a
// tela, e fecha no Entendi. Pela coluna, a T01 monta esta tela com o caso, nas
// unidades da 00, como a referência desenha; no fluxo, a entrada do herói (o 05).
import { Fragment, useEffect, useRef, useState } from 'react'
import { BarraDoSistema, Busca, Lista, LinhaEscolha, Rodape, Vazio, Veu, Dialogo, Frase, useReorganiza, useTrocaDeQuadro } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { filtrar, temBusca, SEM_RESULTADO, ESCONDE } from './garagens.js'
import {
  LONGA, mundoAoAbrir, inicioDoMundo, momentoDoCaso, variasEmpresas, unidadesDa, rotuloDasEmpresas, linhasDasEmpresas,
  primarioDasEmpresas, escolherEmpresa, verAsUnidades, rotuloDaEmpresa, escolherUnidade, trocarDeEmpresa,
  contextoDoQuadro, contextoDoCaso, voltarNoCaso,
} from './empresas.js'
// a presença do diálogo (entra fechado e abre; sai fechando antes de desmontar) é a do que vem por cima
import { usePresenca } from '../../ds/chrome/PorCima.jsx'
import { TX } from './textos.js'
import './T02.css'

// os termos que as referências 03 e 04 desenham digitados (textos.md): o endereço do momento abre com eles
const TERMO_DA_03 = 'Recreio'
const TERMO_DA_04 = 'Olin'

export default function T02({ momento, estado, outraSessao }) {
  const { estado: app, despachar } = useEstado()
  // o mundo em que a tela abre (empresas.js · mundoAoAbrir): num estado, o da receita;
  // num momento aberto pelo endereço, o dele; no fluxo, o do contexto; sem nada, o do
  // herói. Aberta, a tela fica nele enquanto está montada: a busca da lista longa que
  // volta a achar mostra as unidades do caso, e não as do herói. O quadro (o passo —
  // as empresas ou as unidades —, a empresa e a unidade escolhidas) mora aqui. O passo e
  // a empresa atual vão também pro estado único no Ver as unidades e no Trocar de empresa
  // (irAoQuadro, logo abaixo), como o primário grava a unidade: o palco remonta a tela a
  // cada pulo (a geração), e o Voltar ao fluxo abre o quadro de antes, no mesmo mundo. A
  // escolha tocada dentro do quadro não vai: voltar do estado reabre o quadro do
  // endereço, com a unidade do contexto do mock (Várzea) no 01 e no 09, e a Viação no 07,
  // e não com a que foi tocada antes (medido na revisão da entrega de 24/09; vai ao
  // diretor, porque guardar a escolha pede gravá-la no estado único já no toque, e hoje
  // quem grava o contexto é o primário, ou mudar o palco)
  // O pacote 23 · as famílias na coluna: o 03 e o 04 embaixo do 02, o 07 embaixo do 05 e o 09
  // embaixo do 06 chegam como estado. O quadro é o do momento, com o termo da busca dele, e
  // parado, como todo estado da coluna (o `estado` cru diz que nada anda nem se grava)
  const doMomento = /^\d\d-momento-/.test(estado ?? '')
  const est = doMomento ? null : estado
  const mom = doMomento ? estado : momento
  const termoDo = (m) => (m === SEM_RESULTADO ? TERMO_DA_03 : m === ESCONDE ? TERMO_DA_04 : '')
  const [mundo, setMundo] = useState(() => mundoAoAbrir(est, mom, app.contexto))
  const [caso, setCaso] = useState(() => inicioDoMundo(mundoAoAbrir(est, mom, app.contexto), est, mom, app.contexto))
  const [busca, setBusca] = useState(() => termoDo(mom))
  const [estadoAberto, setEstadoAberto] = useState(estado)
  if (estado !== estadoAberto) {
    const m = mundoAoAbrir(est, mom, app.contexto)
    setEstadoAberto(estado); setMundo(m); setBusca(doMomento ? termoDo(mom) : ''); setCaso(inicioDoMundo(m, est, mom, app.contexto))
  }
  const naEmpresa = caso.passo === 'empresas'
  const todas = naEmpresa ? [] : unidadesDa(mundo, caso.empresaId) ?? []
  const comBusca = temBusca(todas)

  const grupos = comBusca ? filtrar(todas, busca) : todas
  // a busca que não acha nada: o vazio declarado no lugar da lista (03). A escolha
  // que a busca esconde — sem resultado, ou achando outras unidades — fica
  // guardada, e volta com a lista; enquanto ela não aparece, o primário espera,
  // como a 03 desenha (decisão do diretor, 25/09, b: a busca que acha e esconde
  // a escolha também espera), e acende de novo quando ela volta a aparecer
  const semResultado = comBusca && grupos.length === 0
  const guardada = caso.uoId
  const aVista = grupos.some((g) => g.linhas.some((l) => l.uo.id === guardada))
  const escolhida = aVista ? guardada : null
  const uo = escolhida ? todas.flatMap((g) => g.linhas).find((l) => l.uo.id === escolhida)?.uo ?? null : null
  // a busca que acha outras unidades e esconde a escolhida (o 04)
  const esconde = comBusca && !semResultado && guardada != null && !aVista

  // a URL segue o quadro (G20). Na lista longa, a da busca: o 03 enquanto ela não acha
  // nada, o 04 enquanto ela acha outras e esconde a escolha; a busca que devolve a
  // escolha, ou que volta a achar, tira o momento (no mundo do caso, a escolha não vai
  // pra URL). Nas empresas e nas unidades, a do quadro (empresas.js · momentoDoCaso): o
  // 07 com a empresa escolhida, o 09 ou o 01 com a unidade escolhida, nada no 05, no
  // 08, no quadro do 06 e na 00. Num estado da coluna, nada anda
  const quadroDaBusca = semResultado ? SEM_RESULTADO : esconde ? ESCONDE : null
  const doQuadro = mundo === LONGA ? quadroDaBusca : momentoDoCaso(mundo, caso)
  useEffect(() => {
    if (estado) return
    if ((momento ?? null) !== doQuadro) despachar({ tipo: 'ir', tela: 'T02', momento: doQuadro ?? undefined })
  }, [estado, doQuadro, momento, despachar])

  const escolher = (uoId) => setCaso((q) => escolherUnidade(q, uoId))
  // o Ver as unidades e o Trocar de empresa (e o voltar, que o faz) trocam o quadro e o
  // gravam no estado único (empresas.js · contextoDoQuadro): o Voltar ao fluxo do palco
  // devolve esse quadro, no mesmo mundo (palco.md). Num estado da coluna, nada se grava
  function irAoQuadro(novo) {
    if (novo === caso) return
    setCaso(novo)
    if (!estado) despachar({ tipo: 'mesclar', parcial: { contexto: contextoDoQuadro(mundo, novo, app.contexto) } })
  }

  // num estado da coluna o app está parado (o palco o deixa inerte) e nada se
  // grava. O mundo vai junto, com a empresa da unidade (contexto.empresas): o menu
  // sabe se a folha de trocar tem o Trocar de empresa. No mundo do caso, qualquer
  // unidade sincroniza: as seis que só o caso tem trazem o pacote dele (a otimização
  // do design), e a T03 baixa esse pacote
  function sincronizar() {
    if (estado) return
    despachar({ tipo: 'mesclar', parcial: { contexto: contextoDoCaso(mundo, caso, app.contexto, uo.id) } })
    despachar({ tipo: 'ir', tela: 'T03' })
  }

  // O diálogo de outro usuário no aparelho (a T01/18): o que o Entrar gravou na
  // situação do celular, ou, pela coluna, o que o caso diz. Nasce aberto, com a
  // tela (nenhuma tela anima a entrada), e o Entendi fecha: o véu e a caixa
  // esmaecem em 150 (movimento.md) e a tela fica, sem nada escolhido
  const outra = outraSessao ?? (estado ? null : app.situacao.outraSessao ?? null)
  const ultimaOutra = useRef(outra)
  if (outra) ultimaOutra.current = outra
  const aviso = usePresenca(Boolean(outra))
  const entendi = () => despachar({ tipo: 'mesclar', parcial: { situacao: { ...app.situacao, outraSessao: null } } })
  const dialogo = aviso.montado && (
    <div className="t02-sobre">
      <Veu de="dialogo" visivel={aviso.visivel}>
        <Dialogo titulo={TX.outraSessao} primario={TX.entendi} aoPrimario={entendi} margem={24} aberto={aviso.visivel}>
          <Frase>{TX.sessaoEncerrada(ultimaOutra.current.usuario, ultimaOutra.current.itensNaFila)}</Frase>
        </Dialogo>
      </Veu>
    </div>
  )
  // o que fica atrás do véu é inerte (G25): nem o toque nem o leitor chegam nele
  const atras = aviso.montado ? '' : undefined

  // O voltar do Android (logica.md): a escolha da unidade não tem saída
  // desenhada — o primário é o ato, não a saída —, e ele não faz nada
  // (pendencias.md). Nas unidades de quem tem várias empresas (o quadro do 06, o 09),
  // faz o Trocar de empresa, o link de saída do rodapé; nas empresas (05, 07, 08) e
  // nas unidades de quem tem uma só (00, 01, a lista longa), nada. Com o diálogo de
  // outro usuário, o Entendi, que só fecha e é a única saída, como o aviso do acesso (T04/12)
  const voltar = voltarNoCaso(mundo, caso)
  useVoltar(aviso.montado ? (outra ? entendi : null) : voltar ? () => irAoQuadro(voltar(caso)) : null)

  // C12 · o movimento fino. As empresas e as unidades são dois quadros (o título, o miolo
  // e o rodapé trocam inteiros, e nascem com o quadro, pela chave dele): no Ver as unidades
  // e no Trocar de empresa, o conteúdo esmaece em 150, como entre telas (C12·4 a), e o texto
  // do primário não esmaece de novo por dentro; aberto pelo endereço ou no print, parado.
  // A lista das unidades se reorganiza quando a busca filtra (C12·10 a, useReorganiza):
  // o que fica desliza pro lugar novo, o que sai esmaece por cima e o que volta esmaece
  // no lugar; nas empresas, a chave null diz que o quadro não é a lista. O texto do
  // primário troca no lugar a cada escolha, e o roxo troca direto (C12·23 a)
  useTrocaDeQuadro(naEmpresa ? 'empresas' : 'unidades')
  const lugar = useReorganiza(naEmpresa ? null : busca)
  // o primário das empresas: o texto que troca (Escolha uma empresa → Ver as unidades)
  // esmaece no lugar, com o roxo direto (C12·23); com o mesmo texto, o Ver as unidades que
  // volta a valer (da empresa sem unidades pra Viação) acende por uma camada, como todo
  // primário que acende na frente de quem olha (C12·8, o gesto da T06, da T13 e da T16)
  const primarioEmpresas = primarioDasEmpresas(mundo, caso)
  const textoDasEmpresas = useRef(primarioEmpresas.texto)
  const acendeNasEmpresas = textoDasEmpresas.current === primarioEmpresas.texto
  useEffect(() => { textoDasEmpresas.current = primarioEmpresas.texto })

  // as empresas (05, 07, 08) · a lista delas, com a contagem das unidades de cada uma
  const nasEmpresas = () => {
    const linhas = linhasDasEmpresas(mundo, caso)
    return (
      <>
        <div className="tela-miolo t02-miolo">
          <div className="t02-cabeca">
            <span className="t02-empresa">{rotuloDasEmpresas(mundo)}</span>
            <h1 id="t02-titulo" className="t02-titulo">{TX.tituloEmpresas}</h1>
          </div>
          <div className="t02-grupo">
            <Lista role="radiogroup" aria-labelledby="t02-titulo">
              {linhas.map((l, i) => (
                <LinhaEscolha
                  key={l.id}
                  nome={l.nome} detalhe={l.detalhe}
                  estado={l.escolhida ? 'escolhida' : 'disponivel'}
                  divisoria={i < linhas.length - 1}
                  aoTocar={() => setCaso((q) => escolherEmpresa(q, l.id))}
                />
              ))}
            </Lista>
          </div>
        </div>
        <Rodape primario={primarioEmpresas.texto} primarioDesabilitado={primarioEmpresas.desabilitado} primarioTrocaTexto primarioAcende={acendeNasEmpresas}
          aoPrimario={() => irAoQuadro(verAsUnidades(mundo, caso))} />
      </>
    )
  }

  // as unidades (00, 01, 02 a 04, 06, 09) · a empresa em cima, e o Trocar de empresa
  // no rodapé de quem tem várias (06, 09)
  const troca = variasEmpresas(mundo)
  const nasUnidades = () => (
    <>
      <div ref={lugar} className="tela-miolo t02-miolo">
        <div className="t02-cabeca">
          <span className="t02-empresa">{caixaAlta(rotuloDaEmpresa(mundo, caso))}</span>
          <h1 className="t02-titulo">{TX.titulo}</h1>
        </div>
        {comBusca && <Busca dica={TX.buscar} valor={busca} aoMudar={setBusca} focado={semResultado || esconde} />}
        {semResultado && <Vazio titulo={TX.nadaCom(busca.trim())} frase={TX.confiraNome} />}
        {grupos.map(({ uc, linhas }) => (
          <div key={uc.id} className="t02-grupo">
            <span id={`t02-${uc.id}`} className="t02-grupo-rotulo">{caixaAlta(uc.nome)}</span>
            <Lista role="radiogroup" aria-labelledby={`t02-${uc.id}`}>
              {linhas.map((l, i) => (
                <LinhaEscolha
                  key={l.uo.id}
                  nome={l.uo.nome} detalhe={l.detalhe} valor={l.valor}
                  estado={l.uo.id === escolhida ? 'escolhida' : l.vencida ? 'vencida' : 'disponivel'}
                  escolhivel divisoria={i < linhas.length - 1}
                  aoTocar={() => escolher(l.uo.id)}
                />
              ))}
            </Lista>
          </div>
        ))}
      </div>
      <Rodape
        primario={uo ? TX.sincronizar(uo.nome) : TX.escolhaUnidade}
        primarioDesabilitado={!uo}
        primarioTrocaTexto
        aoPrimario={sincronizar}
        link={troca ? TX.trocarEmpresa : undefined}
        aoLink={troca ? () => irAoQuadro(trocarDeEmpresa(caso)) : undefined}
      />
    </>
  )

  return (
    <div className="t02">
      <BarraDoSistema fundo="pagina" veu={aviso.visivel ? 'dialogo' : null} />
      {/* o quadro tem a chave dele: o miolo e o rodapé nascem com ele, e o texto do primário
          não esmaece de novo por dentro da troca (movimento.md · o que nasce com o quadro) */}
      <div className="t02-fundo" inert={atras}>
        <Fragment key={naEmpresa ? 'empresas' : 'unidades'}>{naEmpresa ? nasEmpresas() : nasUnidades()}</Fragment>
      </div>
      {dialogo}
    </div>
  )
}
