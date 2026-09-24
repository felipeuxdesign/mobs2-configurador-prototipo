// Fotografa o app a 360 × 800 com escala 2 (720 × 1600, o tamanho dos PNG
// de referência), pelo Chrome da máquina, headless (G17). Usa a mesma trava
// da bancada: o Chrome headless trava com instâncias em paralelo.
// Uso: npm run print -- "<url>" <saida.png> [largura altura escala]
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TMP = resolve(app, 'prints/tmp'); mkdirSync(TMP, { recursive: true })
const TRAVA = resolve(TMP, 'chrome.trava')
const dorme = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
function comTrava(fn) {
  for (;;) {
    try { mkdirSync(TRAVA); break } catch {
      try { if (Date.now() - statSync(TRAVA).mtimeMs > 120000) rmSync(TRAVA, { recursive: true, force: true }) } catch {}
      dorme(200)
    }
  }
  try { return fn() } finally { rmSync(TRAVA, { recursive: true, force: true }) }
}

const [url, saida, w = '360', h = '800', escala = '2'] = process.argv.slice(2)
if (!url || !saida) { console.log('uso: npm run print -- "<url>" <saida.png> [largura altura escala]'); process.exit(1) }
const out = resolve(saida)
mkdirSync(dirname(out), { recursive: true })
comTrava(() => execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`,
  `--force-device-scale-factor=${escala}`, '--virtual-time-budget=4000', '--screenshot=' + out, url], { stdio: 'ignore', timeout: 90000 }))
console.log('print:', out)
