// As fotos do app nas 201 referências, no mesmo Chrome da bancada das telas (cromo.mjs), pra
// comparar o app com ele mesmo: antes e depois de uma mudança que não pode mexer no desenho
// (o pacote 37: o escuro não muda, fora os ícones).
//
// Uso (com o `npm run dev` rodando em :5173):
//   node scripts/fotos.mjs tira <pasta> [claro]    → <pasta>/<T>/<ref>.png, no escuro (ou no claro)
//   node scripts/fotos.mjs compara <antes> <depois> → os pixels que mudaram, por referência,
//                                                     com a caixa onde mudaram
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { foto } from './cromo.mjs'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const DEV = process.env.DEV || 'http://localhost:5173'

// TELAS=T04,T13 limita às telas dadas
const SO = process.env.TELAS ? process.env.TELAS.split(',') : null
const telas = readdirSync(resolve(raiz, '02-telas')).filter((d) => /^T\d\d-/.test(d) && (!SO || SO.includes(d.slice(0, 3)))).sort()
const referencias = (pasta) => readdirSync(resolve(raiz, '02-telas', pasta, 'referencias/html')).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')).sort()

function urlDoApp(t, ref, claro) {
  const q = new URLSearchParams({ print: '1', tela: t })
  const m = ref.match(/^\d\d-(estado|momento)-/)
  if (m) q.set(m[1], ref)
  if (claro) q.set('tema', 'claro')
  return `${DEV}/?${q}`
}

const [cmd, a, b] = process.argv.slice(2)
if (cmd === 'tira') {
  const claro = b === 'claro'
  let n = 0
  for (const pasta of telas) {
    const t = pasta.slice(0, 3); const out = resolve(a, t); mkdirSync(out, { recursive: true })
    for (const ref of referencias(pasta)) { foto(urlDoApp(t, ref, claro), resolve(out, ref + '.png'), { w: 360, h: 800, escala: 2 }); n++ }
    console.log(`${t} fotografada`)
  }
  console.log(`${n} fotos em ${a}${claro ? ' · no claro' : ''}`)
} else if (cmd === 'compara') {
  const mudaram = []; let n = 0
  for (const pasta of telas) {
    const t = pasta.slice(0, 3)
    for (const ref of referencias(pasta)) {
      const fa = resolve(a, t, ref + '.png'); const fb = resolve(b, t, ref + '.png')
      if (!existsSync(fa) || !existsSync(fb)) { mudaram.push({ id: `${t}/${ref}`, erro: 'sem foto' }); continue }
      n++
      const A = PNG.sync.read(readFileSync(fa)); const B = PNG.sync.read(readFileSync(fb))
      if (A.width !== B.width || A.height !== B.height) { mudaram.push({ id: `${t}/${ref}`, erro: 'tamanho' }); continue }
      const diff = new PNG({ width: A.width, height: A.height })
      const px = pixelmatch(A.data, B.data, diff.data, A.width, A.height, { threshold: 0 })
      if (!px) continue
      // a caixa dos pixels que mudaram (em pontos de tela, a 2×)
      let x0 = A.width, y0 = A.height, x1 = 0, y1 = 0
      for (let y = 0; y < A.height; y++) for (let x = 0; x < A.width; x++) {
        const i = (y * A.width + x) * 4
        if (diff.data[i] === 255 && diff.data[i + 1] === 0 && diff.data[i + 2] === 0) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
      }
      mkdirSync(resolve(b, '_diff', t), { recursive: true })
      writeFileSync(resolve(b, '_diff', t, ref + '.png'), PNG.sync.write(diff))
      mudaram.push({ id: `${t}/${ref}`, px, caixa: [x0 / 2, y0 / 2, x1 / 2, y1 / 2] })
    }
  }
  writeFileSync(resolve(b, 'compara.json'), JSON.stringify(mudaram, null, 1))
  for (const m of mudaram) console.log(m.erro ? `${m.id} · ${m.erro}` : `${m.id} · ${m.px} px · em ${m.caixa.join(', ')}`)
  console.log(`${n} comparadas · ${mudaram.length} com diferença`)
} else {
  console.log('uso: node scripts/fotos.mjs tira <pasta> [claro] | compara <antes> <depois>')
}
