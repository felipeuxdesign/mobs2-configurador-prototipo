// O palco — a moldura de apresentação em volta do app (06-prototipo/palco.md).
// Separado do app no código: o App não sabe que o palco existe.
// Três peças e o painel: o quadrado, o celular, a coluna (G18, G19, G20).
import { useCallback, useEffect, useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import '../ds/index.js'
import { App } from '../App.jsx'
import { Vitrine } from '../vitrine/Vitrine.jsx'
import { useEstado } from '../estado/estado.jsx'
import { Coluna } from './Coluna.jsx'
import { Painel } from './Painel.jsx'
import { lerUrl, escreverUrl } from './rotas.js'
import { estadosDa } from './telas.js'
import { VERSAO } from './versao.js'

// a largura que o palco pede antes de encolher o celular: celular + distância + coluna + margens
// o corte do modo estreito mora no palco-tokens.css (--palco-estreito)
const larguraEstreita = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--palco-estreito'))

function medirEscala(temColuna) {
  const css = getComputedStyle(document.documentElement)
  const px = (v) => parseFloat(css.getPropertyValue(v))
  const alturaCel = px('--tela-altura') + 2 * px('--e-8')
  const larguraCel = px('--tela-largura') + 2 * px('--e-8')
  const lado = temColuna ? px('--palco-coluna-distancia') + px('--palco-coluna') : 0
  const margem = 2 * px('--e-24')
  return Math.min(1, (window.innerHeight - margem) / alturaCel, (window.innerWidth - margem - 2 * lado) / larguraCel)
}

// Pra régua dos textos (scripts/textos.mjs): no print com &textos=1, escreve
// num <pre> escondido os textos da tela na ordem do documento, que o
// --dump-dom do Chrome lê. É ferramenta do ciclo, não do app.
function Textos() {
  useEffect(() => {
    document.fonts.ready.then(() => setTimeout(() => {
      const raiz = document.querySelector('.celular-tela'); const lista = []
      // o que está inerte (a tela atrás do véu de uma folha ou diálogo, G25) não conta: não é o quadro da referência
      const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement?.closest('[inert]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) })
      for (let n = w.nextNode(); n; n = w.nextNode()) { const t = n.textContent.replace(/\s+/g, ' ').trim(); if (t) lista.push(t) }
      // o miolo que rola no quadro da referência é defeito (a foto sai na rolagem 0 e esconde o que passou de 800)
      const rolam = [...raiz.querySelectorAll('*')].filter((e) => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 1).map((e) => `${e.className || e.tagName} (${e.scrollHeight} > ${e.clientHeight})`)
      const out = document.createElement('pre'); out.id = 'm2cf-out'; out.style.display = 'none'; out.textContent = JSON.stringify({ lista, rolam })
      document.body.appendChild(out)
    }, 50))
  }, [])
  return null
}

export function Palco() {
  if (new URLSearchParams(window.location.search).get('vitrine') === '1') return <Vitrine />
  return <PalcoApp />
}

function PalcoApp() {
  const { estado, despachar } = useEstado()
  const [painel, setPainel] = useState(new URLSearchParams(window.location.search).get('painel') === '1')
  const [pisca, setPisca] = useState(0)
  const [janela, setJanela] = useState({ w: window.innerWidth, h: window.innerHeight })
  const { id: tela, estado: est, momento } = estado.tela
  const print = lerUrl().print

  useEffect(() => { escreverUrl({ tela, estado: est, momento }) }, [tela, est, momento])
  useEffect(() => { const r = () => setJanela({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r) }, [])

  // o painel só fecha no X, tocando fora ou com Esc — escolher uma tela não fecha (diretor, 24/09)
  const ir = useCallback((id) => despachar({ tipo: 'pular', tela: id }), [despachar])
  const abrirEstado = (nome) => despachar({ tipo: 'abrir-estado', estado: nome })
  const voltarAoFluxo = () => despachar({ tipo: 'voltar-ao-fluxo' })
  const recomecar = () => despachar({ tipo: 'recomecar' })

  if (print) return <main className="palco palco-print"><div className="celular-tela"><App /></div>{lerUrl().textos && <Textos />}</main>

  const estreito = janela.w < larguraEstreita()
  const temColuna = !estreito && estadosDa(tela).length > 0
  const escala = estreito ? 1 : medirEscala(temColuna)
  const numEstado = !!est

  return (
    <main className={`palco ${estreito ? 'palco-estreito' : ''}`}>
      <button type="button" key={estreito ? pisca : 0} className={`palco-quadrado ${estreito && pisca ? 'palco-pisca' : ''}`} aria-label="Telas do protótipo" onClick={() => setPainel(true)}>
        <LayoutGrid aria-hidden="true" className="palco-icone-18" />
      </button>
      <div className="palco-cena">
        <div className={`celular ${numEstado ? 'celular-estado' : ''}`} style={estreito ? undefined : { transform: `scale(${escala})` }}
          onClickCapture={numEstado ? (e) => { e.stopPropagation(); e.preventDefault(); setPisca((n) => n + 1) } : undefined}>
          <div className="celular-tela" inert={numEstado ? '' : undefined}><App /></div>
        </div>
        {temColuna && <Coluna tela={tela} estado={est} aoAbrir={abrirEstado} aoVoltar={voltarAoFluxo} pisca={pisca} escala={escala} />}
      </div>
      <span className="palco-etiqueta">{VERSAO.ciclo} · {VERSAO.data}</span>
      <Painel aberto={painel} tela={tela} aoIr={ir} aoFechar={() => setPainel(false)} aoRecomecar={recomecar}
        estreito={estreito} numEstado={numEstado} aoVoltar={voltarAoFluxo} />
    </main>
  )
}
