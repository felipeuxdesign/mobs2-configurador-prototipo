// O movimento do check (C12 · as peças do movimento · gate C12·7, 8, 9, 12, 13, 18, 23,
// 32, 35 e 44): o check que nasce no poço, o aviso que surge, o primário que acende e
// troca o texto no lugar, e o veredito que espera a prova (o da T16 saiu no pacote 5: o
// autoteste correndo não tem veredito, e o fim é outro quadro). Cada espécime é a peça
// tocável, com os botões da bancada fazendo o que a tela fará — a leitura que chega, a
// recusa, o toque que acende. Fora da bancada (semBancada): o quadro parado de cada
// peça é o espécime da folha dela, e estes só provam o que anda entre os quadros
// (scripts/caminhos/mov-check.mjs). Os botões (tracejados, "bancada · …") são da
// vitrine, não do app; o que está dentro é a peça, com os textos das telas e o dado do
// mock. O ritmo dos processos sai de ritmos.js, como nas telas.
// Cada espécime abre parado — é o "nunca ao abrir" —, e o "abre de novo" monta a peça
// outra vez já no fim, parada.
import { useEffect, useState } from 'react'
import {
  Lista, LinhaChecagem, LinhaEscolha, Aviso, Primario, Dialogo, Frase, Cadeia, Encerramento,
  LinhaContagem, Requisito, Requisitos,
} from '../../ds/index.js'
import { RITMOS } from '../../estado/ritmos.js'
import { SEMENTES } from '../../estado/sementes.js'
import { M } from '../../dados/mock.js'
import { T as T11 } from '../../telas/T11/textos.js'
import { LINHAS, parDoCaso, CASO_DIFF, CASO_CONFERE, conferenciaDo, comparadasAte } from '../../telas/T11/conferencia.js'
import { elosDo } from '../../telas/T09/cadeia.js'
import { T as T13 } from '../../telas/T13/textos.js'
import { TX as T02 } from '../../telas/T02/textos.js'
import './mov-check.css'

function Controles({ children }) { return <div className="vitrine-mc-controles">{children}</div> }
function Botao({ children, aoTocar }) { return <button type="button" className="vitrine-mc-botao" onClick={aoTocar}>{children}</button> }

// a leitura que corre, como nas telas: `lidas` anda de 0 a `total`, uma a cada `ms`
function useLeitura(total, ms) {
  const [lidas, setLidas] = useState(0)
  const [corre, setCorre] = useState(false)
  useEffect(() => {
    if (!corre) return undefined
    if (lidas >= total) { setCorre(false); return undefined }
    const relogio = setTimeout(() => setLidas((n) => n + 1), ms)
    return () => clearTimeout(relogio)
  }, [corre, lidas, total, ms])
  return { lidas, correr: () => { setLidas(0); setCorre(true) } }
}

// ── a linha que conclui (C12·7, C12·12, C12·29): o quadrado de agora, o check com o valor, a reprova com a causa ──
// os textos são os da folha 4 (f4-linhas), na linha de 50 do módulo da T07 (o pacote 3)
const LINHA = [
  [{ estado: 'ainda-nao', valor: '—' }, { estado: 'ainda-nao', valor: '—' }],
  [{ estado: 'agora' }, { estado: 'ainda-nao', valor: '—' }],
  [{ estado: 'aprovada', valor: 'VL06 FULL' }, { estado: 'agora' }],
  [{ estado: 'aprovada', valor: 'VL06 FULL' }, { estado: 'reprovada', causa: 'homologadas 2.2.0 e 2.3.5', valor: '2.4.1' }],
]
function LinhasQueConcluem({ inicio = 0 }) {
  const [passo, setPasso] = useState(inicio)
  const [a, b] = LINHA[passo]
  return (
    <Lista>
      <LinhaChecagem variante="diagnostico" titulo="Serial no cadastro" {...a} />
      <LinhaChecagem variante="diagnostico" titulo="Firmware" {...b} divisoria={false} />
      <Controles><Botao aoTocar={() => setPasso((p) => Math.min(p + 1, LINHA.length - 1))}>bancada · avança</Botao></Controles>
    </Lista>
  )
}
function ComAbrirDeNovo({ children, fim }) {
  const [vez, setVez] = useState(0)
  return (
    <div className="vitrine-mc-pilha">
      <div key={vez}>{vez ? fim : children}</div>
      <Controles><Botao aoTocar={() => setVez((v) => v + 1)}>bancada · abre de novo</Botao></Controles>
    </div>
  )
}

// ── a linha com contagem (C12·12, T03): o check do tipo que terminou; a contagem troca no lugar ──
function Contagens() {
  const [feito, setFeito] = useState(false)
  return (
    <div>
      <Lista>
        <LinhaContagem nome="Ativos" contagem={feito ? '10 de 10' : '6 de 10'} estado={feito ? 'ok' : 'agora'} />
        <LinhaContagem nome="Modelos de ativo" contagem="3 de 3" estado="ok" divisoria={false} />
      </Lista>
      <Controles><Botao aoTocar={() => setFeito(true)}>bancada · termina</Botao></Controles>
    </div>
  )
}

// ── a cadeia (C12·12, C12·32, T09): o elo relido, o trilho que acende de cima pra baixo; e a recusa, com o aviso que surge (C12·9, C12·13) ──
// os blocos e a recusa são os da folha 5 (f5-instrumentos) e da folha 4 (o aviso de processo parado):
// os quatro primeiros elos da cadeia concluída, com o conteúdo de cada bloco (CADEIA.conteudo, decisão 49)
const BLOCOS_CADEIA = elosDo({ confirmados: M.cadeia.ordem.length, fase: 'concluida' }, M.cadeia.conteudo)
  .slice(0, 4).map(({ nome, valor, descricao }) => ({ nome, valor, descricao }))
function CadeiaQueGrava() {
  const [feitos, setFeitos] = useState(1)
  const [recusada, setRecusada] = useState(false)
  const elos = BLOCOS_CADEIA.map((b, i) => {
    if (i < feitos) return { estado: 'ok', ...b }
    if (i === feitos) return recusada ? { estado: 'xis', nome: b.nome, valor: 'recusado', descricao: 'os pontos das regiões não voltaram' } : { estado: 'agora', nome: b.nome, valor: 'gravando', descricao: b.descricao }
    return recusada ? { estado: 'traco', nome: b.nome, descricao: 'não foi alcançado' } : { estado: 'espera', nome: b.nome, descricao: b.descricao }
  })
  return (
    <div className="vitrine-mc-pilha">
      {recusada && <Aviso glifo="xis" titulo="A CADEIA PAROU" frase="Cercas foi recusado. Os três seguintes nem começaram." surge />}
      <Cadeia elos={elos} justa={recusada} />
      <Controles>
        <Botao aoTocar={() => setFeitos((n) => Math.min(n + 1, 2))}>bancada · relê</Botao>
        <Botao aoTocar={() => setRecusada(true)}>bancada · recusa</Botao>
      </Controles>
    </div>
  )
}

// ── o encerramento (C12·12, C12·32 · T16): o passo que conclui esmaece o check; o trilho não acende ──
const PASSOS = ['Contadores e estado', 'Reinício do módulo', 'Releitura completa', 'Repouso do módulo']
const SITUACAO = ['gravados', 'voltou', 'relido', 'restaurado']
function EncerramentoQueCorre() {
  const [k, setK] = useState(1)
  const passos = PASSOS.map((nome, i) => (i < k ? { estado: 'ok', nome, situacao: SITUACAO[i] } : i === k ? { estado: 'agora', nome, situacao: '—' } : { estado: 'espera', nome, situacao: '—' }))
  return (
    <div>
      <Encerramento passos={passos} />
      <Controles><Botao aoTocar={() => setK((n) => Math.min(n + 1, PASSOS.length))}>bancada · conclui</Botao></Controles>
    </div>
  )
}

// ── o requisito da senha (C12·7, T01): a marca ganha o check e o texto clareia; a volta é igual ao contrário ──
function RequisitosDaSenha() {
  const [cumpre, setCumpre] = useState(false)
  return (
    <div>
      <Requisitos>
        <Requisito texto="10 caracteres ou mais" cumprido={cumpre} />
        <Requisito texto="Um número" />
      </Requisitos>
      <Controles><Botao aoTocar={() => setCumpre((c) => !c)}>bancada · cumpre</Botao></Controles>
    </div>
  )
}

// ── o primário que acende (C12·8, T13·6): no diálogo com ciência, o Finalizar acende por uma camada quando o check é marcado ──
// os textos são os da folha 2 (f2-dialogo-ciencia)
function Ciencia() {
  const [ciente, setCiente] = useState(false)
  return (
    <Dialogo titulo="A Seção F não passou" primario="Finalizar instalação" saida="Cancelar" ciencia="Estou ciente · Rafael Vieira, 14:30"
      ciente={ciente} aoMudarCiencia={setCiente} aoPrimario={() => {}} aoSair={() => {}} margem={20}>
      <Frase>A instalação fica registrada com ela falhando — e com o seu nome.</Frase>
    </Dialogo>
  )
}

// ── o texto do primário que troca no lugar (C12·23, T02): a escolha diz o nome da unidade; o roxo troca direto ──
const UNIDADES = ['uo-01', 'uo-02'].map((id) => M.uos.find((u) => u.id === id)).filter(Boolean)
function PrimarioDaUnidade() {
  const [uo, setUo] = useState(null)
  return (
    <div className="vitrine-mc-pilha">
      <Lista>
        {UNIDADES.map((u, i) => (
          <LinhaEscolha key={u.id} nome={u.nome} estado={uo?.id === u.id ? 'escolhida' : 'disponivel'} escolhivel aoTocar={() => setUo(u)} divisoria={i < UNIDADES.length - 1} />
        ))}
      </Lista>
      <Primario desabilitado={!uo} trocaTexto>{uo ? T02.sincronizar(uo.nome) : T02.escolhaUnidade}</Primario>
    </div>
  )
}

// ── o botão que diz o que falta (C12·23 e C12·18, T13/08 → 15): o Fotografar o problema se desabilita no toque
// sem o roxo por cima, o Conte o que aconteceu entra no lugar, e o Salvar com ressalva quando o texto chega ──
function BotaoQueDizOQueFalta() {
  const [passo, setPasso] = useState(0)   // 0 · fotografar · 1 · contar · 2 · salvar
  const rotulo = [T13.fotografarProblema, T13.conteOQueAconteceu, T13.salvarComRessalva][passo]
  return (
    <div>
      <Primario desabilitado={passo === 1} trocaTexto aoTocar={() => setPasso((p) => (p === 0 ? 1 : p))}>{rotulo}</Primario>
      <Controles><Botao aoTocar={() => setPasso(2)}>bancada · conta</Botao></Controles>
    </div>
  )
}

// ── o veredito que espera a prova (C12·35, o retorno do diretor de 26/09 · T11): a caixa no lugar desde o começo,
// neutra, com a contagem das que se comparam; a palavra e a cor entram quando a quarta linha acende (a rodada 2 do
// retorno do PM: as quatro linhas, sem o Extended ID; a versão lida no módulo saiu do 02) ──
const SESSAO_T11 = SEMENTES.T11.sessao
function Conferencia({ confere = false, lida = false }) {
  const par = parDoCaso(confere ? CASO_CONFERE : CASO_DIFF)
  const { linhas, naoBatem, total } = conferenciaDo({ par, sessao: SESSAO_T11, divergem: confere ? [] : M.casos[CASO_DIFF].divergencias.map((d) => d.bloco) })
  const n = LINHAS.length
  const leitura = useLeitura(n, RITMOS.conferenciaLinhaMs)
  const lidas = lida ? n : leitura.lidas
  const lendo = lidas < n
  const aguarda = lendo ? comparadasAte(lidas) : null
  // o pacote 5 (T11/04): enquanto lê, a caixa diz *CONFERINDO*, sem poço; no fim, o veredito
  const espera = { aguarda, aguardaUnidade: T11.deTotal(total), aguardaTitulo: T11.conferindo }
  const cabeca = confere
    ? <Aviso tom="veredito" titulo={T11.confere} numero={total} unidade={T11.deTotal(total)} {...espera} />
    : <Aviso glifo="xis" titulo={T11.naoBate} numero={naoBatem} unidade={T11.deTotal(total)} {...espera} />
  return (
    <div className="vitrine-mc-pilha">
      {cabeca}
      <Lista>
        {linhas.map((l, i) => (i === lidas
          ? <LinhaChecagem key={l.id} variante="conferencia" estado="agora" titulo={l.titulo} valor={T11.conferindoLinha} par={l.par} divisoria={i < n - 1} />
          : <LinhaChecagem key={l.id} variante="conferencia" estado={l.estado} titulo={l.titulo} valor={i > lidas ? T11.vazio : l.valor} par={l.par}
            divisoria={i < n - 1} lendo={i > lidas} />
        ))}
      </Lista>
      {!lida && <Controles><Botao aoTocar={leitura.correr}>bancada · confere</Botao></Controles>}
    </div>
  )
}

// o cartão com a largura da tela, 16 de cada lado, como nas outras molduras de recheio 0
const naTela = { padding: '0 calc(var(--e-16) - var(--traco-borda))' }

export const especimes = [
  { id: 'mov-check-linha', folha: 4, semBancada: true, rotulo: 'a linha que conclui',
    legenda: 'bancada · avança: o quadrado de agora, o check com o valor, a reprova com a causa · esmaecem em 150; o título e a cor trocam direto',
    render: () => <ComAbrirDeNovo fim={<LinhasQueConcluem inicio={LINHA.length - 1} />}><LinhasQueConcluem /></ComAbrirDeNovo> },
  { id: 'mov-check-contagem', folha: 6, semBancada: true, rotulo: 'a linha com contagem que termina',
    legenda: 'o check do tipo que baixou esmaece em 150 · a contagem troca no lugar',
    render: () => <Contagens /> },
  { id: 'mov-check-cadeia', folha: 5, semBancada: true, rotulo: 'a cadeia que grava',
    legenda: 'bancada · relê: o check do elo esmaece em 150 e o trilho acende de cima pra baixo em 300 · bancada · recusa: o xis e o aviso esmaecem em 150',
    render: () => <CadeiaQueGrava /> },
  { id: 'mov-check-encerramento', folha: 5, semBancada: true, rotulo: 'o encerramento que corre',
    legenda: 'o check do passo esmaece em 150 · o trilho troca direto (C12·32)',
    render: () => <EncerramentoQueCorre /> },
  { id: 'mov-check-requisito', folha: 6, semBancada: true, rotulo: 'o requisito que se cumpre',
    legenda: 'a marca ganha o check e o texto clareia, em 150 · a volta é igual',
    render: () => <RequisitosDaSenha /> },
  { id: 'mov-check-ciencia', folha: 2, chrome: true, semBancada: true, rotulo: 'o primário que acende',
    legenda: 'marcar Estou ciente: o quadrado surge e o Finalizar acende por uma camada, em 150',
    render: () => <Ciencia /> },
  { id: 'mov-check-primario-texto', folha: 1, semBancada: true, rotulo: 'o texto do primário que troca',
    legenda: 'a escolha: o nome da unidade esmaece no lugar, em 150 · o roxo troca direto',
    render: () => <PrimarioDaUnidade /> },
  { id: 'mov-check-primario-falta', folha: 1, semBancada: true, rotulo: 'o botão que diz o que falta',
    legenda: 'o toque desabilita sem o roxo por cima · o texto novo esmaece no lugar, em 150',
    render: () => <BotaoQueDizOQueFalta /> },
  { id: 'mov-check-veredito', folha: 4, chrome: true, semBancada: true, rotulo: 'o veredito que espera a prova',
    legenda: 'bancada · confere: a caixa diz CONFERINDO, a contagem acompanha, e a palavra, a cor e o poço entram na quarta linha',
    render: () => <div style={naTela}><ComAbrirDeNovo fim={<Conferencia lida />}><Conferencia /></ComAbrirDeNovo></div> },
  { id: 'mov-check-veredito-confere', folha: 4, chrome: true, semBancada: true, rotulo: 'o veredito que confere',
    legenda: 'o traço cinza vira lima por uma camada, e a palavra entra no mesmo tique',
    render: () => <div style={naTela}><Conferencia confere /></div> },
]
