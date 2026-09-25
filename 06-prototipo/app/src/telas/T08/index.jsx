// T08 · Refazer leitura da CAN (02-telas/T08-refazer-leitura): apaga só os
// valores lidos e lê tudo de novo, no mesmo lugar. Consulta do menu.
// · 00-tela: os sinais do ativo da sessão em mostrador apagado, na ordem da
//   T08·1 (sinais.js), a garantia do que fica e as duas ações.
// · Refazer a leitura → 01-momento-relendo: um sinal responde a cada
//   RITMOS.releituraSinalMs, na ordem da grade, e acende no lugar (mostrador
//   relendo). O placar conta os que voltaram, de sinaisCan.length (T08·2).
// · O último responde → 02-momento-concluida: os sinais em mostrador aceso, o
//   placar vira veredito, e a leitura refeita vai pro estado único
//   (etapas.can, T08·3). Ver os dados da CAN → T07, que abre já lida (G27).
// · "doze" e "de 12" saem de sinaisCan.length, por extenso (T08·2).
// · No print (EM_QUADRO), a 01 para no quadro que a referência desenha.
// · ENCERRAR, antes de homologar, é a sessão abortada (G23): cancela a
//   releitura e segue pra T16. O processo para sozinho quando a tela sai.
import { useEffect, useRef, useState } from 'react'
import { BarraDoSistema, Faixa, GradeCartoes, Mostrador, Rodape } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { RITMOS } from '../../estado/ritmos.js'
import { M } from '../../dados/mock.js'
import { porExtenso } from '../../dados/formato.js'
import { sinaisDoAtivo, leituraDe, valorEUnidade, casoDoAtivo } from './sinais.js'
import { Garantia, Placar } from './pecas.jsx'
import './t08.css'

const M01 = '01-momento-relendo'
const M02 = '02-momento-concluida'
const ENCERRAR_SEM_HOMOLOGAR = '03-momento-encerrando-sem-homologar' // G23: a sessão abortada (T16/03)

// o quadro que a 01 desenha: cinco sinais já responderam (5 de 12)
const QUADRO_01 = 5

// o quadro em que a tela abre: o da referência que o palco pede. Fora do
// print, a 01 aberta pela URL relê do começo (G20, G27).
function inicio(momento, total) {
  if (momento === M02) return { fase: 'concluida', lidos: total }
  if (momento === M01) return { fase: 'relendo', lidos: EM_QUADRO ? Math.min(QUADRO_01, total) : 0 }
  return { fase: 'pronta', lidos: 0 }
}

export default function T08({ momento }) {
  const { estado, despachar } = useEstado()
  const sessao = estado.sessao
  const { ativo, sinais } = sinaisDoAtivo(sessao?.ativoId)
  const total = sinais.length
  const [fluxo, setFluxo] = useState(() => inicio(momento, total))
  const vivo = useRef(null)
  vivo.current = { estado, momento }

  // a releitura anda um sinal por batida; para no print e fora do relendo
  const correndo = !EM_QUADRO && fluxo.fase === 'relendo'
  useEffect(() => {
    if (!correndo) return undefined
    const relogio = setInterval(() => {
      setFluxo((f) => {
        const lidos = f.lidos + 1
        return lidos >= total ? { fase: 'concluida', lidos: total } : { ...f, lidos }
      })
    }, RITMOS.releituraSinalMs)
    return () => clearInterval(relogio)
  }, [correndo, total])

  // concluída: a leitura refeita vai pro estado único (T08·3) e a URL diz 02.
  // O caso estático do ativo, se houver, fica consumido (G21): a T07 que abre
  // depois mostra a mesma leitura que a grade mostrou
  useEffect(() => {
    if (fluxo.fase !== 'concluida') return
    const { estado: e, momento: m } = vivo.current
    const caso = casoDoAtivo(e.sessao?.ativoId)
    const parcial = {}
    if (!e.etapas.can?.refeita) parcial.etapas = { ...e.etapas, can: { ...e.etapas.can, lida: true, refeita: true } }
    if (caso && !e.casosConsumidos.includes(caso)) parcial.casosConsumidos = [...e.casosConsumidos, caso]
    if (Object.keys(parcial).length) despachar({ tipo: 'mesclar', parcial })
    if (m !== M02) despachar({ tipo: 'ir', tela: 'T08', momento: M02 })
  }, [fluxo.fase, despachar])

  // os toques
  function refazer() {
    setFluxo({ fase: 'relendo', lidos: 0 })
    despachar({ tipo: 'ir', tela: 'T08', momento: M01 })
  }
  const verDados = () => despachar({ tipo: 'ir', tela: 'T07' })
  const voltar = () => despachar({ tipo: 'ir', tela: 'T04' })
  const encerrar = () => despachar(estado.etapas.checklist?.homologada
    ? { tipo: 'ir', tela: 'T16' }
    : { tipo: 'ir', tela: 'T16', momento: ENCERRAR_SEM_HOMOLOGAR })

  const { fase, lidos } = fluxo
  // O voltar do Android (logica.md): antes e depois da releitura, o Voltar ao
  // menu, o link de saída do rodapé. Relendo, a tela não tem saída (não saia da
  // tela): não faz nada — a releitura termina sozinha
  useVoltar(fase === 'relendo' ? null : voltar)
  const extenso = porExtenso(total)

  let cabeca
  if (fase === 'pronta') cabeca = { titulo: 'Refazer leitura da CAN', frase: `Os ${extenso} sinais apagam e o módulo lê tudo de novo.` }
  else if (fase === 'relendo') cabeca = { titulo: 'Lendo a CAN', frase: 'Os sinais voltam conforme o módulo responde.' }
  else cabeca = { titulo: 'Leitura refeita', frase: `Os ${extenso} sinais responderam.` }

  // cada mostrador: apagado até o sinal responder; relendo enquanto a
  // releitura corre; aceso quando ela termina
  const mostradores = sinais.map((s, i) => {
    const respondeu = fase === 'concluida' || (fase === 'relendo' && i < lidos)
    if (!respondeu) return <Mostrador key={s.id} estado="apagado" valor="—" nome={s.rotulo} />
    const { valor, unidade } = valorEUnidade(leituraDe(s, ativo?.id))
    return <Mostrador key={s.id} estado={fase === 'concluida' ? 'aceso' : 'relendo'} valor={valor} unidade={unidade} nome={s.rotulo} />
  })

  let caixa
  if (fase === 'pronta') caixa = <Garantia rotulo="NADA SE PERDE" frase="Contadores, configuração gravada, conexão e o que ainda não subiu ficam como estão." />
  else if (fase === 'relendo') caixa = <Placar rotulo="LENDO O BARRAMENTO" numero={lidos} unidade={`de ${total}`} />
  else caixa = <Placar veredito rotulo="LEITURA REFEITA" numero={total} unidade={`de ${total}`} />

  let rodape
  if (fase === 'pronta') rodape = <Rodape primario="Refazer a leitura" aoPrimario={refazer} link="Voltar ao menu" aoLink={voltar} />
  else if (fase === 'relendo') rodape = <Rodape primario="Lendo · não saia da tela" primarioDesabilitado />
  else rodape = <Rodape primario="Ver os dados da CAN" aoPrimario={verDados} link="Voltar ao menu" aoLink={voltar} />

  return (
    <div className="t08">
      <BarraDoSistema hora={M.HORA_NOMINAL} />
      <Faixa serial={sessao?.moduloSerial} placa={ativo?.placa} acao="ENCERRAR" aoEncerrar={encerrar} />
      <div className="tela-miolo">
        <div className="t08-cabeca">
          <h1 className="t08-titulo">{cabeca.titulo}</h1>
          <span className="t08-frase">{cabeca.frase}</span>
        </div>
        <GradeCartoes colunas={3}>{mostradores}</GradeCartoes>
        {caixa}
      </div>
      {rodape}
    </div>
  )
}
