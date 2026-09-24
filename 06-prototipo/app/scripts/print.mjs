// Fotografa o app a 360 × 800 com escala 2 (720 × 1600, o tamanho dos PNG
// de referência), pelo Chrome da máquina, headless (G17).
// Uso: npm run print -- "<url>" <saida.png>
//   ex.: npm run print -- "http://localhost:5173/?print=1&tela=T01" prints/T01-00.png
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const [url, saida] = process.argv.slice(2)
if (!url || !saida) { console.log('uso: npm run print -- "<url>" <saida.png>'); process.exit(1) }
const out = resolve(saida)
mkdirSync(dirname(out), { recursive: true })
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=360,800',
  '--force-device-scale-factor=2', '--virtual-time-budget=4000', '--screenshot=' + out, url], { stdio: 'ignore' })
console.log('print:', out)
