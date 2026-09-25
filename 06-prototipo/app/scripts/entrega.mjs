// A entrega do arquiteto: uma pasta na raiz (atualizacaoNN/) com os arquivos do
// design no mesmo caminho do projeto. O pedido dele é sempre o mesmo: copiar, e
// antes de sobrescrever um .md ou o indice.json que o protótipo mudou, parar e
// mostrar a diferença. A seção de peças e as referências são do design; a anotação
// de construção vai numa seção separada.
//
// Uso (da raiz do projeto ou de qualquer lugar):
//   node 06-prototipo/app/scripts/entrega.mjs classifica atualizacao98 [atualizacao33 …]
//       cada arquivo: IGUAL, NOVO, LIMPO (só o design mudou: copia), NOSSO (só o
//       protótipo mudou: fica) ou JUNTAR (os dois mudaram); a última pasta ganha
//   node 06-prototipo/app/scripts/entrega.mjs faltam <pasta> <arquivo…>
//       as linhas que o design pôs e o nosso não tem, e as que ele tirou e o nosso tem
//   node 06-prototipo/app/scripts/entrega.mjs tela <pasta> <02-telas/Tnn-…/tela.md> [base] [saida]
//       junta o tela.md: a seção de peças é a do design, a nossa lista medida vai pra
//       "No protótipo · as peças que o código usa", e o resto é 3-way contra a base
//       (o commit do C0, `deles` quando o arquivo já é a cópia do design, ou o caminho da
//       cópia anterior do design — a melhor base: a diferença dela pra nova é o que ele mudou agora)
// A base de tudo é o commit do C0 (6466d8f): as cópias do design partem dele.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync, readdirSync, statSync, mkdtempSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, relative, join } from 'node:path'
import { tmpdir } from 'node:os'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const BASE = '6466d8f'
const git = (...a) => execFileSync('git', a, { cwd: raiz, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
const daBase = (f, ref = BASE) => { try { return git('show', `${ref}:${f}`) } catch { return '' } }
const le = (f) => readFileSync(resolve(raiz, f), 'utf8')
const tmp = mkdtempSync(join(tmpdir(), 'entrega-'))
function mescla(nosso, base, deles) {
  const [n, b, d] = ['nosso', 'base', 'design'].map((x) => join(tmp, x))
  writeFileSync(n, nosso); writeFileSync(b, base); writeFileSync(d, deles)
  try { return git('merge-file', '-p', '-L', 'nosso', '-L', 'base', '-L', 'design', n, b, d) } catch (e) { return e.stdout?.toString() ?? '' }
}
const conflitos = (s) => (s.match(/^<<<<<<< /gm) || []).length

function arquivos(pasta) {
  const out = []
  const anda = (d) => { for (const x of readdirSync(d)) { const p = join(d, x); if (statSync(p).isDirectory()) anda(p); else out.push(relative(resolve(raiz, pasta), p)) } }
  anda(resolve(raiz, pasta))
  return out.filter((f) => !f.endsWith('.DS_Store') && !f.endsWith('_changelog-para-colar.md') && !/\/referencias\//.test(f))
}

const [cmd, ...args] = process.argv.slice(2)
if (cmd === 'classifica') {
  const ult = new Map(); for (const p of args) for (const f of arquivos(p)) ult.set(f, p)
  for (const [f, p] of [...ult].sort()) {
    if (!existsSync(resolve(raiz, f))) { console.log(`NOVO      ${f}  ← ${p}`); continue }
    const nosso = le(f), deles = le(join(p, f)), base = daBase(f)
    if (nosso === deles) console.log(`IGUAL     ${f}  ← ${p}`)
    else if (nosso === base) console.log(`LIMPO     ${f}  ← ${p} (só o design mudou)`)
    else if (deles === base) console.log(`NOSSO     ${f}  ← ${p} (só o protótipo mudou)`)
    else { const m = mescla(nosso, base, deles); console.log(`JUNTAR    ${f}  ← ${p} · ${m === nosso ? 'o nosso já tem o do design' : conflitos(m) + ' conflitos no 3-way'}`) }
  }
} else if (cmd === 'faltam') {
  const [p, ...fs] = args
  for (const f of fs) {
    const B = new Set(daBase(f).split('\n')), N = new Set(existsSync(resolve(raiz, f)) ? le(f).split('\n') : []), deles = le(join(p, f)).split('\n'), D = new Set(deles)
    const pos = deles.filter((l) => l.trim() && !B.has(l) && !N.has(l)), tirou = [...B].filter((l) => l.trim() && !D.has(l) && N.has(l))
    console.log(`\n##### ${f} (${p}) · ${pos.length} que faltam · ${tirou.length} que o design tirou e o nosso tem`)
    for (const l of pos) console.log('  + ' + l.slice(0, 260))
    for (const l of tirou) console.log('  - ' + l.slice(0, 260))
  }
} else if (cmd === 'tela') {
  const [p, f, baseRef = BASE, saida] = args
  const TIT = '## Peças do design system que esta tela usa', NOVO = '## No protótipo · as peças que o código usa'
  const deles = le(join(p, f)), nosso = le(f)
  // a base: um commit, `deles` (o arquivo já é a cópia do design), ou o caminho da cópia anterior do design
  const base = baseRef === 'deles' ? deles : existsSync(baseRef) ? readFileSync(baseRef, 'utf8') : daBase(f, baseRef)
  const secao = (s) => { const i = s.indexOf(TIT); if (i < 0) throw new Error('sem a seção de peças: ' + f); const j = s.indexOf('\n## ', i + TIT.length); return [i, j < 0 ? s.length : j + 1] }
  const [di, dj] = secao(deles), [ni, nj] = secao(nosso), [bi, bj] = secao(base)
  const pecasDeles = deles.slice(di, dj), pecasNossas = nosso.slice(ni, nj)
  const corpo = pecasNossas.slice(TIT.length).replace(/^\s*\n/, '').replace(/^Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system\/`\. Construa com o componente — nunca redesenhe\.\n\n/, '')
  const extra = nosso.includes(NOVO) || pecasNossas === pecasDeles ? '' : `${NOVO}\n\nAnotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.\n\n${corpo.trimEnd()}\n\n`
  const out = mescla(nosso.slice(0, ni) + pecasDeles + extra + nosso.slice(nj), base.slice(0, bi) + pecasDeles + base.slice(bj), deles)
  writeFileSync(saida ? resolve(saida) : resolve(raiz, f), out)
  console.log(`${f}: ${conflitos(out)} conflitos${extra ? ' · a lista medida foi pra seção do protótipo' : ''}${saida ? ' → ' + saida : ''}`)
} else console.log('uso: entrega.mjs classifica <pasta…> | faltam <pasta> <arquivo…> | tela <pasta> <tela.md> [base] [saida]')
