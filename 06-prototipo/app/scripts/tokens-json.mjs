// Gera 03-design-system/tokens.json a partir do tokens.css, que é a norma (G3).
// O JSON leva os valores do modo normal — o reduzir movimento fica só no CSS.
// Uso: npm run tokens            → escreve o JSON
//      npm run tokens -- --checar → só confere (exit 1 se divergir)
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const cssPath = resolve(raiz, '03-design-system/tokens.css')
const jsonPath = resolve(raiz, '03-design-system/tokens.json')

export function tokensDoCss() {
  const css = readFileSync(cssPath, 'utf8')
  const root = css.slice(css.indexOf(':root'), css.indexOf('@media'))
  const out = {}
  for (const m of root.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim()
  return out
}

function tipo(nome, valor) {
  if (/^#|^rgba?\(/.test(valor)) return 'color'
  if (/^cubic-bezier/.test(valor)) return 'cubicBezier'
  if (/ms$/.test(valor)) return 'duration'
  if (nome === 'fonte') return 'fontFamily'
  if (/px$/.test(valor)) return 'dimension'
  if (/^-?[\d.]+$/.test(valor)) return 'number'
  return 'string'
}

export function jsonDoCss() {
  const t = tokensDoCss()
  const o = {}
  for (const [k, v] of Object.entries(t)) o[k] = { $type: tipo(k, v), $value: v }
  return JSON.stringify(o, null, 1) + '\n'
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const novo = jsonDoCss()
  if (process.argv.includes('--checar')) {
    const atual = readFileSync(jsonPath, 'utf8')
    if (atual !== novo) { console.log('tokens.json DIVERGE do tokens.css — rode npm run tokens'); process.exit(1) }
    console.log('tokens.json = tokens.css')
  } else {
    writeFileSync(jsonPath, novo)
    console.log('tokens.json gerado com', Object.keys(tokensDoCss()).length, 'tokens')
  }
}
