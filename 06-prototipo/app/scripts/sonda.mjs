// A sonda das 201 referências (o pacote 37): abre cada uma no modo print do app (no escuro ou no
// claro) ou o HTML da referência, num Chrome próprio a 360 × 800 e 2×, e mede dentro da página.
// As medidas:
//   · icones     → cada ícone (o svg de 24 ou de 20): o desenho (o `d` de cada path, os círculos e as
//                  linhas), o tamanho em que ele aparece e o traço
//   · superficies → o que está pintado com o poço ou com o rebaixado, com o tamanho
//   · barra      → a cor da barra de status e a da superfície logo embaixo dela
//   · andamento  → o que está pintado com a cor do texto (o creme ou o preto) sem ser texto
//   · botoes     → cada botão secundário: o fill dele e a superfície onde ele mora
//   · contraste  → todo texto com menos de 4,5:1 contra o fundo onde ele está
// Uso (com o `npm run dev` rodando em :5173):
//   node scripts/sonda.mjs <medida> app [claro] <saida.json>
//   node scripts/sonda.mjs icones ref <saida.json>
// TELAS=T04,T13 limita às telas dadas.
import { readdirSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHROME } from './cromo.mjs'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const DEV = process.env.DEV || 'http://localhost:5173'
const SO = process.env.TELAS ? process.env.TELAS.split(',') : null
const telas = readdirSync(resolve(raiz, '02-telas')).filter((d) => /^T\d\d-/.test(d) && (!SO || SO.includes(d.slice(0, 3)))).sort()
const referencias = (pasta) => readdirSync(resolve(raiz, '02-telas', pasta, 'referencias/html')).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')).sort()

const args = process.argv.slice(2)
const [medida, onde] = args
const claro = args.includes('claro')
const saida = args[args.length - 1]

function urlDoApp(t, ref) {
  const q = new URLSearchParams({ print: '1', tela: t })
  const m = ref.match(/^\d\d-(estado|momento)-/)
  if (m) q.set(m[1], ref)
  if (claro) q.set('tema', 'claro')
  return `${DEV}/?${q}`
}

// ── dentro da página ──
const MEDIDAS = {
  icones: `(() => {
    const raiz = document.querySelector('.app') || document.body
    const GEO = { path: ['d'], circle: ['cx', 'cy', 'r'], line: ['x1', 'y1', 'x2', 'y2'], rect: ['x', 'y', 'width', 'height', 'rx'], polyline: ['points'], polygon: ['points'], ellipse: ['cx', 'cy', 'rx', 'ry'] }
    const limpa = (s) => (s || '').replace(/\\s+/g, ' ').trim()
    const visivel = (e) => e.checkVisibility ? e.checkVisibility({ opacityProperty: true, visibilityProperty: true }) : true
    return [...raiz.querySelectorAll('svg')].filter((s) => /^0 0 (24 24|20 20)$/.test(s.getAttribute('viewBox') || '') && !s.parentElement.closest('svg') && visivel(s)).map((s) => {
      const r = s.getBoundingClientRect()
      const geo = [...s.querySelectorAll(Object.keys(GEO).join(','))].filter((e) => !e.closest('defs, mask')).map((e) => {
        const t = e.tagName.toLowerCase()
        return t + '(' + GEO[t].map((k) => limpa(e.getAttribute(k))).join(' ') + (e.getAttribute('stroke-width') ? ' sw=' + e.getAttribute('stroke-width') : '') + (e.getAttribute('fill') && e.getAttribute('fill') !== 'none' ? ' fill' : '') + ')'
      }).join(' ')
      const primeiro = s.querySelector(Object.keys(GEO).join(','))
      const traco = primeiro ? parseFloat(getComputedStyle(primeiro).strokeWidth) : null
      const caixa = s.getAttribute('viewBox')
      // o dono: a peça do ícone (o Icone ou o Glifo) e a peça em volta, pra saber quem desenha
      const cls = (e) => (e && typeof e.className === 'string' ? e.className : '').trim().split(/\\s+/).filter(Boolean)
      const peca = s.parentElement && cls(s.parentElement).join(' ')
      let volta = s.parentElement && s.parentElement.parentElement
      while (volta && !cls(volta).some((c) => /^(ds|t\\d\\d|t)-/.test(c))) volta = volta.parentElement
      const giro = getComputedStyle(s.parentElement || s).transform
      return { caixa, geo, w: Math.round(r.width * 2) / 2, h: Math.round(r.height * 2) / 2, traco: traco == null ? null : Math.round(traco * 100) / 100, x: Math.round(r.left), y: Math.round(r.top),
        dono: (peca || '').slice(0, 60), volta: volta ? cls(volta).slice(0, 2).join(' ') : '', giro: giro && giro !== 'none' ? giro : null }
    })
  })()`,
  superficies: `(() => {
    const raiz = document.querySelector('.app') || document.body
    const cor = (n) => getComputedStyle(document.querySelector('.app')).getPropertyValue(n).trim()
    const rgb = (hex) => { const h = hex.replace('#', ''); return 'rgb(' + [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(', ') + ')' }
    const POCO = rgb(cor('--poco')), REB = rgb(cor('--fundo-rebaixado'))
    return [...raiz.querySelectorAll('*')].map((e) => {
      const c = getComputedStyle(e); const bg = c.backgroundColor
      if (bg !== POCO && bg !== REB) return null
      const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null
      if (e.checkVisibility && !e.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return null
      return { classe: (typeof e.className === 'string' ? e.className : '').trim().split(/\\s+/).slice(0, 3).join(' ') || e.tagName, cor: bg === POCO ? 'poco' : 'rebaixado', w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left), y: Math.round(r.top) }
    }).filter(Boolean)
  })()`,
  barra: `(() => {
    const b = document.querySelector('.ds-barra-sistema'); if (!b) return null
    const r = b.getBoundingClientRect()
    const fundo = (e) => { for (let a = e; a; a = a.parentElement) { const c = getComputedStyle(a).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return { cor: c, classe: (typeof a.className === 'string' ? a.className : '').trim().split(/\\s+/).slice(0, 2).join(' ') } } return null }
    const meio = r.left + r.width / 2
    // com uma folha ou um diálogo aberto, o véu cobre a tela: a superfície é a de baixo dele
    // o que fica atrás do véu está inerte ou sem toque (o topo do menu desligado), e nada disso entra
    // na pilha do ponto: solto só pra medir, e devolvo
    const inertes = [...document.querySelectorAll('[inert]')]; inertes.forEach((e) => e.removeAttribute('inert'))
    const solta = document.createElement('style'); solta.textContent = '* { pointer-events: auto !important; }'; document.head.appendChild(solta)
    const pilha = document.elementsFromPoint(meio, r.bottom + 2).filter((e) => !b.contains(e))
    solta.remove(); inertes.forEach((e) => e.setAttribute('inert', ''))
    const abaixo = pilha.find((e) => !e.closest('.ds-veu'))
    return { barra: getComputedStyle(b).backgroundColor, embaixo: abaixo ? fundo(abaixo) : null, veu: pilha.some((e) => e.closest('.ds-veu')) }
  })()`,
  botoes: `(() => {
    const raiz = document.querySelector('.app') || document.body
    const cor = (n) => getComputedStyle(document.querySelector('.app')).getPropertyValue(n).trim()
    const rgb = (hex) => { const h = hex.replace('#', ''); return 'rgb(' + [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(', ') + ')' }
    const NOMES = { [rgb(cor('--fundo-rebaixado'))]: 'rebaixado', [rgb(cor('--poco'))]: 'poco', [rgb(cor('--fundo-cartao'))]: 'cartao', [rgb(cor('--fundo-pagina'))]: 'pagina', [rgb(cor('--fundo-faixa'))]: 'faixa', [rgb(cor('--fundo-botao'))]: 'fundo-botao', [rgb(cor('--fundo-botao-no-rebaixado'))]: 'fundo-botao-no-rebaixado' }
    const fundo = (e) => { for (let a = e; a; a = a.parentElement) { const c = getComputedStyle(a).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return NOMES[c] || c } return null }
    return [...raiz.querySelectorAll('.ds-secundario, .t-botao-linha, .ds-botao-folha')].filter((b) => b.getBoundingClientRect().width > 0).map((b) => ({
      texto: (b.innerText || '').trim().slice(0, 30), fill: fundo(b), embaixo: fundo(b.parentElement), desligado: b.disabled || false }))
  })()`,
  contraste: `(() => {
    const raiz = document.querySelector('.app') || document.body
    const rgb = (c) => { const m = c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const v = m[1].split(',').map((x) => parseFloat(x)); return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 } }
    const lum = (c) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4) }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b) }
    const fundo = (e) => { for (let a = e; a; a = a.parentElement) { const c = rgb(getComputedStyle(a).backgroundColor); if (c && c.a >= 0.99) return { c, classe: (typeof a.className === 'string' ? a.className : '').trim().split(/\\s+/).slice(0, 2).join(' ') } } return null }
    const out = []
    for (const e of raiz.querySelectorAll('*')) {
      const texto = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim()
      if (!texto) continue
      if (e.checkVisibility && !e.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue
      const cs = getComputedStyle(e); const cor = rgb(cs.color); if (!cor || cor.a < 0.99) continue
      const f = fundo(e); if (!f) continue
      const a = lum(cor), b = lum(f.c); const k = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
      if (k < 4.5) out.push({ texto: texto.slice(0, 30), cor: cs.color, fundo: f.classe, k: Math.round(k * 100) / 100, desligado: !!e.closest(':disabled, [aria-disabled=true], .ds-desligado') })
    }
    return out
  })()`,
  andamento: `(() => {
    const raiz = document.querySelector('.app') || document.body
    const tinta = getComputedStyle(document.querySelector('.app')).color
    return [...raiz.querySelectorAll('*')].map((e) => {
      const c = getComputedStyle(e)
      if (c.backgroundColor !== tinta) return null
      const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null
      if (e.checkVisibility && !e.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return null
      return { classe: (typeof e.className === 'string' ? e.className : '').trim().split(/\\s+/).slice(0, 3).join(' ') || e.tagName, w: Math.round(r.width), h: Math.round(r.height) }
    }).filter(Boolean)
  })()`,
}

// ── o Chrome ──
const perfil = resolve(app, 'prints/tmp/sonda-perfil'); rmSync(perfil, { recursive: true, force: true }); mkdirSync(perfil, { recursive: true })
const cromo = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--allow-file-access-from-files',
  '--remote-debugging-port=0', '--user-data-dir=' + perfil, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] })
const url = await new Promise((ok, falha) => {
  let buf = ''; const t = setTimeout(() => falha(new Error('o Chrome não abriu')), 20000)
  cromo.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); ok(m[1]) } })
})
const ws = new WebSocket(url)
await new Promise((ok) => ws.addEventListener('open', ok, { once: true }))
let seq = 0; const pendentes = new Map(); const ouvintes = new Set()
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pendentes.has(m.id)) { const p = pendentes.get(m.id); pendentes.delete(m.id); m.error ? p.falha(new Error(m.error.message)) : p.ok(m.result) } else if (m.method) for (const f of ouvintes) f(m)
})
const cdp = (method, params = {}, sessionId) => new Promise((ok, falha) => { const id = ++seq; pendentes.set(id, { ok, falha }); ws.send(JSON.stringify({ id, method, params, sessionId })) })
const dorme = (ms) => new Promise((r) => setTimeout(r, ms))

const { targetId } = await cdp('Target.createTarget', { url: 'about:blank' })
const { sessionId: s } = await cdp('Target.attachToTarget', { targetId, flatten: true })
await cdp('Page.enable', {}, s); await cdp('Runtime.enable', {}, s)
await cdp('Emulation.setDeviceMetricsOverride', { width: 360, height: 800, deviceScaleFactor: 2, mobile: false }, s)

async function abre(u) {
  const carregou = new Promise((ok) => { const f = (m) => { if (m.method === 'Page.loadEventFired' && m.sessionId === s) { ouvintes.delete(f); ok() } }; ouvintes.add(f) })
  await cdp('Page.navigate', { url: u }, s)
  await Promise.race([carregou, dorme(15000)])
  await cdp('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true }, s)
  await dorme(900)
}
async function mede(expr) {
  const r = await cdp('Runtime.evaluate', { expression: expr, returnByValue: true }, s)
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'erro na página')
  return r.result.value
}

const resultado = {}
try {
  for (const pasta of telas) {
    const t = pasta.slice(0, 3)
    for (const ref of referencias(pasta)) {
      const u = onde === 'ref' ? 'file://' + resolve(raiz, '02-telas', pasta, 'referencias/html', ref + '.html') : urlDoApp(t, ref)
      await abre(u)
      resultado[`${t}/${ref}`] = await mede(MEDIDAS[medida])
    }
    console.log(`${t} medida`)
  }
} finally {
  writeFileSync(saida, JSON.stringify(resultado, null, 1))
  try { ws.close() } catch {}
  cromo.kill()
}
console.log(`${Object.keys(resultado).length} referências · ${medida} · ${onde}${claro ? ' · claro' : ''} → ${saida}`)
