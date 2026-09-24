// A bancada do C2: compara um espécime da vitrine com o espécime da folha,
// os dois renderizados no MESMO Chrome headless, a 1× (as folhas são 1×, DS-D11).
// Assim a diferença de fonte entre geradores some, e o que sobra é desenho.
//
// Uso (com o `npm run dev` rodando em :5173):
//   node scripts/especime.mjs compara <folha 1..8> "<rótulo na folha>" <id na vitrine>
//   node scripts/especime.mjs todos            → compara todos os espécimes registrados
// Saída: prints/especimes/<id>-folha.png, -vitrine.png, -diff.png e uma linha de resultado.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const TMP = resolve(app, 'prints/tmp'); const OUT = resolve(app, 'prints/especimes')
mkdirSync(TMP, { recursive: true }); mkdirSync(OUT, { recursive: true })
const DEV = process.env.DEV || 'http://localhost:5173'

function chrome(args) { return execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--virtual-time-budget=4000', ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 }) }
function lerPre(dom) { const m = dom.match(/<pre id="m2cf-out"[^>]*>([\s\S]*?)<\/pre>/); if (!m) throw new Error('sem medida'); return JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')) }
function recorta(png, r) {
  const x = Math.round(r.x), y = Math.round(r.y), w = Math.round(r.w), h = Math.round(r.h)
  const out = new PNG({ width: w, height: h })
  PNG.bitblt(png, out, x, y, Math.min(w, png.width - x), Math.min(h, png.height - y), 0, 0)
  return out
}

const arquivoDaFolha = (n) => readdirSync(resolve(raiz, '03-design-system/referencias/html')).find((f) => f.startsWith(`folha-${n}-`))

export function especimeDaFolha(n, rotulo, id) {
  const arq = arquivoDaFolha(n)
  let html = readFileSync(resolve(raiz, '03-design-system/referencias/html', arq), 'utf8')
  html = html.replace(/\.\.\/\.\.\/\.\.\/05-recursos\//g, 'file://' + raiz + '/05-recursos/')
  const medir = `<script>document.fonts.ready.then(()=>{const alvo=${JSON.stringify(rotulo)};
    const s=[...document.querySelectorAll('span')].find(e=>e.textContent.trim()===alvo&&getComputedStyle(e).letterSpacing==='1.4px'&&e.nextElementSibling&&/dashed/.test(e.nextElementSibling.style.border));
    const o=document.createElement('pre');o.id='m2cf-out';o.style.display='none';
    if(!s){o.textContent=JSON.stringify({erro:'rótulo não achado'})}else{const r=s.nextElementSibling.getBoundingClientRect();o.textContent=JSON.stringify({x:r.x+scrollX,y:r.y+scrollY,w:r.width,h:r.height,H:document.documentElement.scrollHeight})}
    document.body.appendChild(o)})</script>`
  const tmp = resolve(TMP, `folha-${n}.html`); writeFileSync(tmp, html.replace('</body>', medir + '</body>'))
  const r = lerPre(chrome(['--window-size=1440,900', '--dump-dom', 'file://' + tmp]))
  if (r.erro) throw new Error(`folha ${n}: ${r.erro} — "${rotulo}"`)
  const shot = resolve(TMP, `folha-${n}.png`)
  chrome([`--window-size=1440,${Math.ceil(r.H)}`, '--screenshot=' + shot, 'file://' + tmp])
  const png = recorta(PNG.sync.read(readFileSync(shot)), r)
  writeFileSync(resolve(OUT, `${id}-folha.png`), PNG.sync.write(png))
  return png
}

export function especimeDaVitrine(id) {
  const url = `${DEV}/?vitrine=1&especime=${encodeURIComponent(id)}&medir=1`
  const r = lerPre(chrome(['--window-size=360,1200', '--dump-dom', url]))
  const shot = resolve(TMP, `vitrine-${id}.png`)
  chrome([`--window-size=${Math.ceil(r.w)},${Math.ceil(r.h) + 2}`, '--screenshot=' + shot, url])
  const png = recorta(PNG.sync.read(readFileSync(shot)), { x: 0, y: 0, w: r.w, h: r.h })
  writeFileSync(resolve(OUT, `${id}-vitrine.png`), PNG.sync.write(png))
  return png
}

export function compara(n, rotulo, id) {
  const a = especimeDaFolha(n, rotulo, id), b = especimeDaVitrine(id)
  const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height)
  const A = recorta(a, { x: 0, y: 0, w, h }), B = recorta(b, { x: 0, y: 0, w, h })
  const diff = new PNG({ width: w, height: h })
  const fino = pixelmatch(A.data, B.data, diff.data, w, h, { threshold: 0.1 })
  writeFileSync(resolve(OUT, `${id}-diff.png`), PNG.sync.write(diff))
  const pct = (100 * fino / (w * h)).toFixed(2)
  const tam = a.width === b.width && a.height === b.height ? 'mesmo tamanho' : `folha ${a.width}×${a.height} · vitrine ${b.width}×${b.height}`
  return { id, folha: n, rotulo, diferenca: +pct, tam }
}

const [cmd, ...args] = process.argv.slice(2)
if (cmd === 'compara') {
  const [n, rotulo, id] = args
  const r = compara(n, rotulo, id)
  console.log(`${r.id} · ${r.diferenca}% diferente · ${r.tam}`)
} else if (cmd === 'todos') {
  const lista = lerPre(chrome(['--window-size=360,800', '--dump-dom', `${DEV}/?vitrine=1&lista=1`]))
  const res = []
  for (const e of lista) {
    try { res.push(compara(e.folha, e.rotulo, e.id)) } catch (err) { res.push({ id: e.id, folha: e.folha, rotulo: e.rotulo, erro: String(err.message) }) }
    const r = res[res.length - 1]; console.log(r.erro ? `${r.id} · ERRO ${r.erro}` : `${r.id} · ${r.diferenca}% · ${r.tam}`)
  }
  writeFileSync(resolve(OUT, 'relatorio.json'), JSON.stringify(res, null, 1))
} else {
  console.log('uso: node scripts/especime.mjs compara <folha> "<rótulo>" <id> | todos')
}
