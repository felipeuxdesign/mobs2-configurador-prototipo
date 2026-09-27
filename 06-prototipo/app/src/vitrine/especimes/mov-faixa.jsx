// O movimento · a faixa de sessão (gate C12·24 e C12·25 · src/ds/chrome/Faixa.jsx), tocável. Nenhuma folha
// desenha movimento: os espécimes ficam fora da bancada (semBancada), e parados eles são os quadros das
// referências. Os botões tracejados ("bancada · …") são da vitrine, não do app: fazem o que a tela fará.
// · a faixa que nasce: a T05 em miniatura, na pré-checagem com a última linha correndo. A linha passa, a
//   sessão nasce, e a faixa desce de cima, por baixo da barra do sistema, em --mov-padrao; o miolo vai do
//   lugar em que estava ao novo só por deslocamento, no mesmo tempo — nada salta —, e a barra troca de cor
//   direto (é do Android, decisão 43). "abre aprovada" monta a tela já com a faixa: parada;
// · a faixa que encerra: a T16 em miniatura, com a faixa sem ação. A sessão fecha, e a aberta sobe por baixo
//   da barra, em --mov-padrao, e revela a sem sessão, que já está no lugar: nada do layout se move;
// · o ENCERRAR que se apaga e volta (a lei 17): a tinta troca direto, sem piscar, e nada anima.
// Com reduzir movimento, tudo troca direto. Os textos são os dos textos.js das telas e o dado é o do mock;
// nada escrito aqui. Prova: scripts/caminhos/mov-faixa.mjs.
import { useState } from 'react'
import { BarraDoSistema, Faixa, CabecalhoConteudo, Lista, LinhaChecagem, TiraLeituras, Rodape } from '../../ds/index.js'
import { M } from '../../dados/mock.js'
import { SEMENTES } from '../../estado/sementes.js'
import { TX as T05 } from '../../telas/T05/textos.js'
import { HEROI, contextoDe, resultados, rotuloDeTopo, TOTAL, leiturasDa } from '../../telas/T05/dados.js'
import { T as T16 } from '../../telas/T16/textos.js'
import { placaDe } from '../../telas/T16/dados.js'
import '../../telas/T05/t05.css'
import '../../telas/T16/t16.css'
import './mov-faixa.css'

function Controles({ children }) { return <div className="vitrine-mf-controles">{children}</div> }
function Botao({ children, aoTocar }) { return <button type="button" className="vitrine-mf-botao" onClick={aoTocar}>{children}</button> }

// ── a faixa que nasce (C12·24): a pré-checagem do herói, com a última linha correndo, e ela passa ──
function PreChecagem({ inicio }) {
  const [aprovada, setAprovada] = useState(inicio)
  const c = contextoDe(HEROI)
  const res = resultados(c, [])
  const linhas = res.map((r, i) => (aprovada || i < TOTAL - 1 ? r : { ...r, estado: 'agora', valor: undefined, causa: undefined, nota: undefined }))
  const aprovadas = linhas.filter((r) => r.estado === 'aprovada').length
  return (
    <div className="vitrine-mf-pilha">
      <Controles><Botao aoTocar={() => setAprovada(true)}>bancada · a última linha passa</Botao></Controles>
      <div className="t05 vitrine-mf-tela">
        <BarraDoSistema hora={M.HORA_NOMINAL} fundo={aprovada ? 'faixa' : 'pagina'} />
        <Faixa ausente={!aprovada} serial={HEROI} placa={T05.semAtivo} semAtivo acao={T05.encerrar} />
        <div className="tela-miolo t05-miolo-pre">
          <div className="t05-cabeca">
            {!aprovada && <span className="t05-rotulo-topo">{rotuloDeTopo(c)}</span>}
            <CabecalhoConteudo titulo={T05.preChecagem} contagem={aprovadas} unidade={T05.de(TOTAL)} tom={aprovada ? 'veredito' : 'neutro'} />
          </div>
          <Lista className="t05-lista">
            {linhas.map((l, i) => (
              <LinhaChecagem key={l.id} estado={l.estado} tom={l.tom} titulo={l.titulo} valor={l.valor} causa={l.causa} nota={l.nota}
                divisoria={i < TOTAL - 1} folgaFim={i === TOTAL - 1 ? (aprovada ? 'pre-checagem' : false) : false} />
            ))}
          </Lista>
          <TiraLeituras itens={leiturasDa([])} />
        </div>
        <Rodape primario={T05.selecionarAtivo} primarioDesabilitado={!aprovada} link={T05.voltarAoMenu} />
      </div>
    </div>
  )
}

// ── a faixa que encerra (C12·25): o sétimo passo fecha, e a tela passa pra Sessão encerrada ──
function Encerramento({ inicio }) {
  const [fechada, setFechada] = useState(inicio)
  const s = SEMENTES.T16.sessao
  return (
    <div className="vitrine-mf-pilha">
      <Controles><Botao aoTocar={() => setFechada(true)}>bancada · a sessão encerra</Botao></Controles>
      <div className="t16 vitrine-mf-tela vitrine-mf-curta">
        <BarraDoSistema hora={M.HORA_NOMINAL} fundo="faixa" />
        {fechada
          ? <Faixa estado="sem-sessao" fato={T16.semSessao} revela />
          : <Faixa serial={s.moduloSerial} placa={placaDe(s.ativoId)} />}
        <div className="tela-miolo">
          <CabecalhoConteudo titulo={fechada ? T16.encerrada : T16.encerrar} />
        </div>
      </div>
    </div>
  )
}

// ── o ENCERRAR que se apaga e volta (a lei 17): o processo em que o voltar não faz nada ──
function EncerrarQueApaga() {
  const [apagado, setApagado] = useState(false)
  const s = SEMENTES.T16.sessao
  return (
    <div className="vitrine-mf-pilha">
      <Controles>
        <Botao aoTocar={() => setApagado(true)}>bancada · o processo começa</Botao>
        <Botao aoTocar={() => setApagado(false)}>bancada · o processo termina</Botao>
      </Controles>
      <Faixa serial={s.moduloSerial} placa={placaDe(s.ativoId)} acao={T05.encerrar} aoEncerrar={() => {}} acaoDesabilitada={apagado} />
    </div>
  )
}

// o "abre de novo": a mesma peça montada outra vez no quadro de uma ponta, parada
function ComAbrirDeNovo({ Peca }) {
  const [vez, setVez] = useState({ n: 0, fim: false })
  return (
    <div className="vitrine-mf-pilha">
      <Peca key={vez.n} inicio={vez.fim} />
      <Controles>
        <Botao aoTocar={() => setVez((v) => ({ n: v.n + 1, fim: true }))}>bancada · abre no fim</Botao>
        <Botao aoTocar={() => setVez((v) => ({ n: v.n + 1, fim: false }))}>bancada · abre no começo</Botao>
      </Controles>
    </div>
  )
}

export const especimes = [
  { id: 'mov-faixa-nasce', folha: 2, chrome: true, semBancada: true, rotulo: 'a faixa que nasce',
    legenda: 'a última linha passa · a faixa desce em 200, por baixo da barra, e o miolo acompanha só por deslocamento · abre no fim: parada',
    render: () => <ComAbrirDeNovo Peca={PreChecagem} /> },
  { id: 'mov-faixa-encerra', folha: 2, chrome: true, semBancada: true, rotulo: 'a faixa que encerra',
    legenda: 'a sessão encerra · a aberta sobe em 200, por baixo da barra, e revela a sem sessão no lugar · abre no fim: parada',
    render: () => <ComAbrirDeNovo Peca={Encerramento} /> },
  { id: 'mov-faixa-encerrar', folha: 2, chrome: true, semBancada: true, rotulo: 'o ENCERRAR que se apaga e volta',
    legenda: 'a lei 17 · a tinta troca direto, sem piscar, e nada anima',
    render: () => <EncerrarQueApaga /> },
]
