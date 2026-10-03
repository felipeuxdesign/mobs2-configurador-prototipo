// T03 · Sincronizar (02-telas/T03-sincronizar): baixa o pacote da unidade
// escolhida e diz se dá pra trabalhar com ele.
// · No fluxo, a sincronização sempre corre (G27): um item por tick, nos cinco
//   grupos do pacote — Ativos → Conexões → Modelos de ativo → Eventos → Cercas,
//   os ativos primeiro —, 4 s no total (T03·1). O poço acompanha os
//   ativos (T03·5). A primeira baixa do pacote do caso sync-falha-rede cai no
//   item do caso (G21), e Reconectar segue de onde parou. Ao terminar, o
//   pacote novo vai pro estado único (T03·7) e a URL passa a dizer 02. A
//   unidade que só o caso lista-longa-garagens tem baixa o pacote que o caso
//   declara pra ela (pacote.js · src/dados/garagens.js).
// · Os estados da coluna, parados: a 01 pelo caso, a 03 e a 04 pela idade do
//   pacote (receitas.js · pacotes). O estado muda o conteúdo; onde a
//   referência remonta, ela é construída fiel (G24).
// · No print (EM_QUADRO), a 00 para no quadro que a referência desenha.
import { useEffect, useRef, useState } from 'react'
import { BarraDoSistema, Rodape, Aviso, Nota, Lista, LinhaContagem, useTrocaDeQuadro } from '../../ds/index.js'
import { useEstado } from '../../estado/estado.jsx'
import { useVoltar } from '../../estado/voltar.js'
import { EM_QUADRO } from '../../estado/quadro.js'
import { M } from '../../dados/mock.js'
import { caixaAlta } from '../../dados/formato.js'
import { Download, Concluido, Idade } from './Instrumentos.jsx'
import {
  uoDe, pacoteDaUo, pacotePorId, casoFalha, CASO_FALHA, pacoteQueAvisa, pacoteQueBloqueia, avisa, bloqueia,
  ORDEM_LISTA, totalDe, tickMs, conteudos, faltamSeg, versao, diaMes, HOJE, pacoteNovo, fimDaIdade,
} from './pacote.js'
import './T03.css'

const M02 = '02-momento-concluido'
const E01 = '01-estado-falha-de-rede'
const E03 = '03-estado-pacote-de-4-dias'
const E04 = '04-estado-pacote-vencido'
const MENU = { tipo: 'ir', tela: 'T04', momento: '01-momento-sem-modulo' } // T03·6: o menu antes de conectar
const CONTEXTO = { tipo: 'ir', tela: 'T02' }                                  // T03·6: Voltar ao contexto, Trocar de unidade

// o quadro que a 00 desenha (gate C4, achado 5): Várzea no 6º item de 31 (6 de 10 ativos)
const QUADRO_00 = 6

const NOMES = { ativos: 'Ativos', conexoes: 'Conexões', modelosAtivo: 'Modelos de ativo', eventos: 'Eventos', cercas: 'Cercas' }
const TITULOS = { baixando: 'Baixando o pacote', falha: 'Baixando o pacote', concluido: 'Pacote de hoje', idade: 'Sincronizar' }

// o pacote que o aparelho tem da unidade, na forma do estado único (sementes.js)
const pacoteAtual = (p) => ({ id: p.id, diasAtras: p.diasAtras, hora: p.hora })

// o estado da coluna, montado pela receita: a 01 pelo caso (G9: o pacote e o
// item são os do caso), a 03 pelo pacote que avisa, a 04 pelo que bloqueia
function quadroDoEstado(estado) {
  if (estado === E01) { const c = casoFalha(); return { fase: 'falha', uoId: pacotePorId(c.pacoteId).uoId, baixados: c.falhaNoTick - 1 } }
  if (estado === E03) return { fase: 'idade', uoId: pacoteQueAvisa().uoId, baixados: 0 }
  if (estado === E04) return { fase: 'idade', uoId: pacoteQueBloqueia().uoId, baixados: 0 }
  return null
}

// o quadro em que a tela abre no fluxo: o concluído (02) ou a baixa, do começo
// (ou, no print, no quadro da 00)
function inicio(momento, uoId) {
  if (momento === M02) return { fase: 'concluido', uoId, baixados: totalDe(pacoteDaUo(uoId)) }
  return { fase: 'baixando', uoId, baixados: EM_QUADRO ? QUADRO_00 : 0 }
}

export default function T03({ momento, estado: est }) {
  const { estado, despachar } = useEstado()
  const uoContexto = estado.contexto.uoId ?? M.contextoAtivo.uoId
  const [fluxo, setFluxo] = useState(() => inicio(momento, uoContexto))
  const vivo = useRef(null)
  vivo.current = { fluxo, estado }

  // o lugar mudou por fora — o painel pulou pra T03 (a semente inteira, G21)
  // ou trocou o momento —: a tela volta ao quadro dele, e a baixa recomeça.
  // Não contam o que a própria tela despacha (`euLevei`: o 02 ao concluir, a
  // baixa que sai de um estado) nem a volta ao fluxo, que devolve o mesmo
  // instante guardado (G19). Com um estado da coluna aberto, nada muda.
  const telaVista = useRef(estado.tela)
  const euLevei = useRef(false)
  useEffect(() => {
    if (est != null) return
    const deFora = estado.tela !== telaVista.current && !euLevei.current
    telaVista.current = estado.tela; euLevei.current = false
    if (deFora) setFluxo(inicio(momento, uoContexto))
  }, [estado.tela]) // eslint-disable-line react-hooks/exhaustive-deps

  // a unidade do contexto mudou com a tela montada: a baixa recomeça nela
  useEffect(() => {
    if (uoContexto !== vivo.current.fluxo.uoId) setFluxo(inicio(momento, uoContexto))
  }, [uoContexto]) // eslint-disable-line react-hooks/exhaustive-deps

  // a sincronização anda um item por tick; para no print, num estado da coluna e fora da baixa
  const parado = EM_QUADRO || est != null || fluxo.fase !== 'baixando'
  useEffect(() => {
    if (parado) return undefined
    const p = pacoteDaUo(fluxo.uoId)
    const relogio = setInterval(() => {
      const { fluxo: f, estado: e } = vivo.current
      const proximo = f.baixados + 1
      const caso = casoFalha()
      if (p.id === caso.pacoteId && proximo === caso.falhaNoTick && !e.casosConsumidos.includes(CASO_FALHA)) {
        despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...e.casosConsumidos, CASO_FALHA] } })
        setFluxo({ ...f, fase: 'falha' })
        return
      }
      setFluxo({ ...f, baixados: proximo, fase: proximo >= totalDe(p) ? 'concluido' : 'baixando' })
    }, tickMs(p))
    return () => clearInterval(relogio)
  }, [parado, fluxo.uoId, despachar])

  // concluído: o pacote novo vai pro estado único (T03·7) e a URL diz 02
  useEffect(() => {
    if (est != null || fluxo.fase !== 'concluido') return
    const novo = pacoteNovo(pacoteDaUo(fluxo.uoId)); const ctx = vivo.current.estado.contexto
    if (ctx.uoId !== fluxo.uoId || ctx.pacote?.versao !== novo.versao) despachar({ tipo: 'mesclar', parcial: { contexto: { ...ctx, uoId: fluxo.uoId, pacote: novo } } })
    if (momento !== M02) { euLevei.current = true; despachar({ tipo: 'ir', tela: 'T03', momento: M02 }) }
  }, [fluxo.fase, fluxo.uoId, est]) // eslint-disable-line react-hooks/exhaustive-deps

  const q = quadroDoEstado(est) ?? fluxo
  const uo = uoDe(q.uoId); const p = pacoteDaUo(q.uoId); const total = totalDe(p)

  // C12 · o movimento fino. A fase é o quadro: a baixa que termina (00 → 02), a que para
  // (00 → 01) e o Reconectar (01 → 00) trocam o título ou o rodapé inteiros, e o conteúdo
  // esmaece em 150, como entre telas (C12·4 a, G26); aberta pelo endereço, pelo palco ou
  // no print, parada. Dentro da baixa, a barra segue o passo (C12·15 a) e o check de cada
  // conteúdo nasce no poço (a LinhaContagem, C12·12); a contagem troca no lugar
  useTrocaDeQuadro(q.fase)
  const c = conteudos(p, q.baixados)
  const { bloqueioDias } = p.limiares

  // os toques (T03·6). Num estado da coluna o celular não toca; se tocasse,
  // o quadro vira fluxo, na unidade dele.
  function baixar(uoId, baixados) {
    const e = vivo.current.estado
    if (est != null || e.contexto.uoId !== uoId) {
      despachar({ tipo: 'mesclar', parcial: { contexto: { ...e.contexto, uoId, pacote: pacoteAtual(pacoteDaUo(uoId)) } } })
      euLevei.current = true; despachar({ tipo: 'ir', tela: 'T03' })
    }
    setFluxo({ fase: 'baixando', uoId, baixados })
  }
  function reconectar() {
    const e = vivo.current.estado
    if (!e.casosConsumidos.includes(CASO_FALHA)) despachar({ tipo: 'mesclar', parcial: { casosConsumidos: [...e.casosConsumidos, CASO_FALHA] } })
    baixar(q.uoId, q.baixados)
  }
  function continuar() {
    despachar({ tipo: 'mesclar', parcial: { contexto: { ...vivo.current.estado.contexto, uoId: q.uoId, pacote: pacoteAtual(p) } } })
    despachar(MENU)
  }

  // O voltar do Android (logica.md): o link de saída do rodapé — na falha, o
  // Voltar ao contexto; no vencido, o Trocar de unidade; no de 4 dias, o
  // Continuar com este pacote. No concluído, o Ir para o menu, a saída que ele
  // tem (como a Sessão encerrada da T16). Baixando, a tela não tem saída (não
  // saia da tela): não faz nada
  useVoltar(q.fase === 'falha' || (q.fase === 'idade' && bloqueia(p)) ? () => despachar(CONTEXTO)
    : q.fase === 'idade' ? continuar
      : q.fase === 'concluido' ? () => despachar(MENU)
        : null)

  // o bloco de cima: o instrumento da fase, ou a falha no lugar dele (G24)
  let instrumento
  if (q.fase === 'baixando') {
    instrumento = <Download rotulo="ATIVOS" feito={c.ativos.feito} de={c.ativos.de} unidade={`de ${c.ativos.de}`} segue={tickMs(p)}
      total={`${q.baixados} de ${total} no total`} faltam={`faltam ~${faltamSeg(p, q.baixados)} s`} />
  } else if (q.fase === 'falha') {
    instrumento = <Aviso tom="falha" glifo="sem-sinal" mudo titulo="A BAIXA PAROU ONDE ESTAVA" frase="Nada se perdeu. Ao reconectar, continua de onde parou." />
  } else if (q.fase === 'concluido') {
    instrumento = <Concluido rotulo="BAIXADO AGORA" feito={total} unidade={`de ${total}`} frase={`o pacote vale por ${bloqueioDias} dias`} />
  } else {
    instrumento = <Idade rotulo="CARREGADO HÁ" dias={p.diasAtras} unidade="dias" fim={fimDaIdade(p)} limite={bloqueioDias} vencido={bloqueia(p)}
      legendas={{ inicio: '0', meio: `O LIMITE É ${bloqueioDias} DIAS`, fim: String(fimDaIdade(p)) }} />
  }

  // o bloco do meio: o que o pacote traz, ou o que a idade diz
  let conteudo = null
  if (q.fase === 'idade') {
    if (bloqueia(p)) conteudo = <Nota tom="explica" corpo="secundario" titulo="ENQUANTO NÃO SINCRONIZAR" frase={`Os ${p.contem.ativos} ativos desta unidade ficam indisponíveis. Nenhuma instalação pode começar.`} />
    else if (avisa(p)) conteudo = <Aviso tom="neutro" glifo="pausa" mudo titulo={`PACOTE DE ${p.diasAtras} DIAS`} frase={`Dá pra trabalhar. Com ${bloqueioDias} ele bloqueia — sincronize quando tiver rede.`} />
  } else {
    conteudo = (
      <Lista>
        {ORDEM_LISTA.map((k, i) => {
          const x = c[k]; const concluido = q.fase === 'concluido'
          return (
            <LinhaContagem key={k} nome={NOMES[k]} estado={concluido ? 'ok' : x.estado} divisoria={i < ORDEM_LISTA.length - 1}
              contagem={concluido ? String(x.de) : x.estado === 'espera' ? '—' : `${x.feito} de ${x.de}`}
              nomeGlifo={q.fase === 'falha' && x.estado === 'agora' ? 'parou' : undefined} />
          )
        })}
      </Lista>
    )
  }

  // a linha do pacote: a versão e o carimbo (T03·2 b). No concluído, o pacote
  // novo, de hoje; no aviso de idade (03), o id do pacote, como está desenhado.
  let linhaPacote
  if (q.fase === 'concluido') linhaPacote = `pacote ${versao(p.uoId, HOJE)} · ${diaMes(HOJE)} ${M.HORA_NOMINAL}`
  else if (q.fase === 'idade' && avisa(p)) linhaPacote = `pacote ${p.id} · ${diaMes(p.data)} ${p.hora}`
  else linhaPacote = `pacote ${versao(p.uoId, p.data)} · ${diaMes(p.data)} ${p.hora}`

  let rodape
  if (q.fase === 'baixando') rodape = <Rodape primario="Baixando · não saia da tela" primarioDesabilitado />
  else if (q.fase === 'falha') rodape = <Rodape primario="Reconectar" aoPrimario={reconectar} link="Voltar ao contexto" aoLink={() => despachar(CONTEXTO)} />
  else if (q.fase === 'concluido') rodape = <Rodape primario="Ir para o menu" aoPrimario={() => despachar(MENU)} />
  else if (bloqueia(p)) rodape = <Rodape primario="Sincronizar agora" aoPrimario={() => baixar(q.uoId, 0)} link="Trocar de unidade" aoLink={() => despachar(CONTEXTO)} />
  else rodape = <Rodape primario="Sincronizar agora" aoPrimario={() => baixar(q.uoId, 0)} link="Continuar com este pacote" aoLink={continuar} />

  return (
    <div className="t03">
      <BarraDoSistema fundo="pagina" />
      <div className="tela-miolo">
        <div className="t03-cabeca">
          <span className="t03-cabeca-rotulo">{caixaAlta(uo.nome)}</span>
          <h1 className="t03-cabeca-titulo">{TITULOS[q.fase]}</h1>
        </div>
        {instrumento}
        {conteudo}
        <span className="t03-pacote">{linhaPacote}</span>
      </div>
      {rodape}
    </div>
  )
}
