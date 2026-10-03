// O movimento das listas (C12 · as peças do movimento · gate C12·10, C12·20, C12·28 e
// C12·41): a lista que se reorganiza quando a busca filtra (o useReorganiza), a fila que
// fecha o espaço, e a cascata da lista que a busca acha (a Lista com `surge`). Cada
// espécime é a peça tocável, montada como a tela a monta — os textos são os do textos.js
// de cada tela (o da T06, os que a tela escreve, do textos.md dela), e o dado é o do
// mock, nada escrito aqui. Fora da bancada (semBancada): o quadro parado de cada peça é o
// espécime da folha dela e o print de cada tela; estes só provam o que anda entre os
// quadros (scripts/caminhos/mov-listas.mjs). O palco ainda não os alcança: as telas ligam
// a peça na fase seguinte. Os botões tracejados ("bancada · …") são da vitrine, não do
// app. Cada espécime abre parado — nada anima ao abrir.
import { useState } from 'react'
import {
  BarraDoSistema, Faixa, Busca, Lista, LinhaEscolha, LinhaOnibus, LinhaModulo, LinhaFila, Rodape, Vazio,
  CabecalhoConteudo, useReorganiza,
} from '../../ds/index.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { TX as T02 } from '../../telas/T02/textos.js'
import { filtrar as filtrarUnidades, gruposDo } from '../../telas/T02/garagens.js'
import { doPacote, modeloDe, filtrar as filtrarOnibus, contagemDoPacote } from '../../telas/T06/dados.js'
import { TX as T05 } from '../../telas/T05/textos.js'
import { porPerto, varianteNaLista, firmwareDe, HEROI } from '../../telas/T05/dados.js'
import { T as T15 } from '../../telas/T15/textos.js'
import { quadroDoEstado, grupos as gruposDaFila, linhaDaLista } from '../../telas/T15/dados.js'
import '../../telas/T02/T02.css'
import '../../telas/T06/t06.css'
import '../../telas/T05/t05.css'
import '../../telas/T15/t15.css'
import './mov-listas.css'

function Controles({ children }) { return <div className="vitrine-ml-controles">{children}</div> }
function Botao({ children, aoTocar }) { return <button type="button" className="vitrine-ml-botao" onClick={aoTocar}>{children}</button> }

// ── a lista que se reorganiza (C12·10, T02): a lista longa do caso, com a busca que filtra ──
// A T02 em miniatura, no mundo do caso lista-longa-garagens (as 9 unidades em 3 regiões).
// Digitar filtra: as unidades que ficam deslizam pro lugar novo, o grupo inteiro sobe
// junto quando o de cima some, e o que sai esmaece por cima; tocar marca, e o quadrado
// lima surge (a vencida também, C12·20).
function Unidades() {
  const [busca, setBusca] = useState('')
  const [escolha, setEscolha] = useState(null)
  const lugar = useReorganiza(busca)
  const mundo = gruposDo(true)
  const grupos = filtrarUnidades(mundo, busca)
  const semResultado = grupos.length === 0
  const aVista = grupos.some((g) => g.linhas.some((l) => l.uo.id === escolha))
  const uo = aVista ? mundo.flatMap((g) => g.linhas).find((l) => l.uo.id === escolha).uo : null
  return (
    <div className="vitrine-ml-pilha">
      <div className="t02 vitrine-ml-tela">
        <BarraDoSistema fundo="pagina" />
        <div ref={lugar} className="tela-miolo t02-miolo">
          <div className="t02-cabeca">
            <span className="t02-empresa">{caixaAlta(M.empresa.nome)}</span>
            <h1 className="t02-titulo">{T02.titulo}</h1>
          </div>
          <Busca dica={T02.buscar} valor={busca} aoMudar={setBusca} />
          {semResultado && <Vazio titulo={T02.nadaCom(busca.trim())} frase={T02.confiraNome} />}
          {grupos.map(({ uc, linhas }) => (
            <div key={uc.id} className="t02-grupo">
              <span id={`vitrine-ml-${uc.id}`} className="t02-grupo-rotulo">{caixaAlta(uc.nome)}</span>
              <Lista role="radiogroup" aria-labelledby={`vitrine-ml-${uc.id}`}>
                {linhas.map((l, i) => (
                  <LinhaEscolha key={l.uo.id} nome={l.uo.nome} detalhe={l.detalhe} valor={l.valor}
                    estado={l.uo.id === uo?.id ? 'escolhida' : l.vencida ? 'vencida' : 'disponivel'}
                    escolhivel divisoria={i < linhas.length - 1} aoTocar={() => setEscolha(l.uo.id)} />
                ))}
              </Lista>
            </div>
          ))}
        </div>
        <Rodape primario={uo ? T02.sincronizar(uo.nome) : T02.escolhaUnidade} primarioDesabilitado={!uo} />
      </div>
      <Controles><Botao aoTocar={() => setBusca('')}>bancada · limpa a busca</Botao></Controles>
    </div>
  )
}

// ── a mesma peça na T06: a lista do pacote, a instrução que sai quando se digita ──
// O cartão inteiro sobe no lugar da instrução, e as linhas que ficam sobem dentro dele.
// Os textos são os que a T06 escreve (02-telas/T06-selecionar-ativo/textos.md).
const T06 = {
  titulo: 'Selecionar ativo', noPacote: 'no pacote', buscar: 'Buscar placa, frota ou módulo',
  instrucao: 'Escolha o veículo que está na sua frente.', frota: 'FROTA', semAtivo: 'sem ativo', encerrar: 'ENCERRAR',
  nadaCom: (termo) => `Nada com “${termo}”`, confira: 'Confira a placa, ou busque pela frota.',
  usar: 'Usar este ativo', voltarAoMenu: 'Voltar ao menu',
}
function Onibus() {
  const [busca, setBusca] = useState('')
  const [marcado, setMarcado] = useState(null)
  const lugar = useReorganiza(busca)
  const uoId = M.contextoAtivo.uoId
  const lista = filtrarOnibus(doPacote(uoId), busca)
  const buscando = busca.trim() !== ''
  const semResultado = buscando && lista.length === 0
  const aVista = lista.some((a) => a.id === marcado)
  return (
    <div className="vitrine-ml-pilha">
      <div className="t06 vitrine-ml-tela">
        <BarraDoSistema fundo="faixa" />
        <Faixa serial={HEROI} placa={T06.semAtivo} semAtivo acao={T06.encerrar} />
        <div ref={lugar} className="tela-miolo t06-miolo">
          <CabecalhoConteudo titulo={T06.titulo} contagem={contagemDoPacote({}, uoId)} unidade={T06.noPacote} />
          <Busca dica={T06.buscar} valor={busca} aoMudar={setBusca} />
          {semResultado ? <Vazio titulo={T06.nadaCom(busca.trim())} frase={T06.confira} /> : (
            <>
              {!buscando && <span className="t06-instrucao">{T06.instrucao}</span>}
              <Lista className="t06-lista">
                {lista.map((a, i) => (
                  <LinhaOnibus key={a.id} placa={a.placa} modelo={modeloDe(a).nome} rotuloFrota={T06.frota} frota={a.frota}
                    divisoria={i < lista.length - 1} escolhido={a.id === marcado} aoTocar={() => setMarcado(a.id)} />
                ))}
              </Lista>
            </>
          )}
        </div>
        <Rodape primario={T06.usar} primarioDesabilitado={!aVista} link={T06.voltarAoMenu} />
      </div>
      <Controles><Botao aoTocar={() => setBusca('')}>bancada · limpa a busca</Botao></Controles>
    </div>
  )
}

// ── a fila que fecha o espaço (C12·10, T15): o que sobe sai da lista, e as de baixo sobem ──
// A fila do estado 01 (a fila sem erro, com os cinco itens). A T15 não envia no
// protótipo (o ritmo do envio é do diretor, C12·14): a bancada faz o que o envio fará.
const filaDoEstado = () => gruposDaFila(quadroDoEstado('01-estado-sem-erro')?.itens ?? []).lista
function Fila() {
  const [fila] = useState(filaDoEstado)
  const [subiram, setSubiram] = useState(0)
  const lugar = useReorganiza(subiram)
  const naFila = fila.filter((f) => f.estado === 'na-fila')
  const foram = new Set(naFila.slice(0, subiram).map((f) => f.id))
  const mostra = fila.filter((f) => !foram.has(f.id))
  return (
    <div className="vitrine-ml-pilha">
      <div ref={lugar} className="vitrine-ml-fila">
        <span className="t15-rotulo">{T15.naFilaERecebidas}</span>
        <Lista className="t15-lista">
          {mostra.map((f, i) => {
            const ultima = i === mostra.length - 1
            return <LinhaFila key={f.id} {...linhaDaLista(f)} posicao={ultima ? 'fim' : 'meio'} divisoria={!ultima} />
          })}
        </Lista>
      </div>
      <Controles><Botao aoTocar={() => setSubiram((n) => Math.min(n + 1, naFila.length))}>bancada · o primeiro da fila sobe</Botao></Controles>
    </div>
  )
}

// ── a cascata (C12·28, C12·41, T05/01): a lista que a busca acha surge linha a linha ──
// A lista de escolha da T05/01. "a busca acha" monta a lista de novo, com a cascata, como
// a T05 fará quando a busca de novo termina (aos 1,2 s, RITMOS.buscaMs); "abre de novo" a
// monta sem ela, parada, como ao abrir. Tocar marca o módulo, e a cascata não se repete.
function Modulos() {
  const [montagem, setMontagem] = useState({ vez: 0, surge: false })
  const [marcado, setMarcado] = useState(null)
  const perto = porPerto()
  const monta = (surge) => { setMarcado(null); setMontagem((m) => ({ vez: m.vez + 1, surge })) }
  return (
    <div className="vitrine-ml-pilha">
      <CabecalhoConteudo titulo={T05.titulo} contagem={perto.length} unidade={T05.encontrados(perto.length)} />
      <span id="vitrine-ml-escolha" className="t05-frase">{T05.escolhaNaMao}</span>
      <Lista key={montagem.vez} surge={montagem.surge} className="t05-lista" role="radiogroup" aria-labelledby="vitrine-ml-escolha">
        {/* a errata do pacote 1: as cinco se escolhem, o M2C-0999 também, e todas levam a divisória (T05/01) */}
        {perto.map((p) => (
          <LinhaModulo key={p.serial} escolha serial={p.serial} variante={varianteNaLista(p.serial)}
            rotuloValor={T05.rotuloFirmware} valor={firmwareDe(p.serial)} marcado={p.serial === marcado} aoTocar={() => setMarcado(p.serial)} />
        ))}
      </Lista>
      <Controles>
        <Botao aoTocar={() => monta(true)}>bancada · a busca acha</Botao>
        <Botao aoTocar={() => monta(false)}>bancada · abre de novo</Botao>
      </Controles>
    </div>
  )
}

export const especimes = [
  { id: 'mov-listas-unidades', folha: 4, chrome: true, semBancada: true, rotulo: 'a lista que se reorganiza',
    legenda: 'digite na busca: o que fica desliza pro lugar novo, em 150, o grupo sobe junto, e o que sai esmaece por cima · nenhuma altura anima · tocar marca',
    render: () => <Unidades /> },
  { id: 'mov-listas-onibus', folha: 6, chrome: true, semBancada: true, rotulo: 'a busca da lista do pacote',
    legenda: 'digite na busca: a instrução esmaece por cima, o cartão sobe no lugar dela e as linhas que ficam sobem dentro dele, em 150',
    render: () => <Onibus /> },
  { id: 'mov-listas-fila', folha: 4, semBancada: true, rotulo: 'a fila que fecha o espaço',
    legenda: 'bancada · sobe: a linha esmaece por cima, e as de baixo sobem, em 150 · o cartão corta o que passa da borda',
    render: () => <Fila /> },
  { id: 'mov-listas-cascata', folha: 6, semBancada: true, rotulo: 'a lista que a busca acha',
    legenda: 'bancada · a busca acha: cada linha surge esmaecendo, 150 cada, 80 entre elas · ao abrir, já está lá',
    render: () => <Modulos /> },
]
