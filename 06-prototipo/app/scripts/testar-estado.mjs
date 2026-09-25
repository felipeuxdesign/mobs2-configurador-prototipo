// O teste das sementes e das receitas (G21): todo id resolve no mock, e todo
// estado do indice.json tem receita. Roda no node, sem o navegador.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..'); const raiz = resolve(app, '../..')
globalThis.window = {}; createRequire(import.meta.url)(resolve(raiz, '04-dados/mocks.js')); const M = window.M2CF_MOCKS
const { RECEITAS } = await import(resolve(app, 'src/estado/receitas.js'))
const indice = JSON.parse(readFileSync(resolve(raiz, '02-telas/indice.json'), 'utf8')).itens
let falhas = 0; const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }
const estados = indice.filter((r) => r.tipo === 'estado').map((r) => r.id)
const sem = estados.filter((id) => !RECEITAS[id])
chk(`os ${estados.length} estados do indice.json têm receita`, estados.length > 0 && !sem.length, sem.join(', '))
// a coluna da T05 agrupa os estados (palco.md · A coluna, src/palco/telas.js · GRUPOS_T05): o estado
// sem um desses grupos não aparece nela, e só abriria pelo endereço (o mundo real: a 16 e a 17)
const gruposT05 = [...(readFileSync(resolve(app, 'src/palco/telas.js'), 'utf8').match(/GRUPOS_T05 = \[(.*)\]/)?.[1] ?? '').matchAll(/\['([a-z]+)'/g)].map((m) => m[1])
const foraDaColuna = indice.filter((r) => r.tela === 'T05' && r.tipo === 'estado' && !gruposT05.includes(r.grupo)).map((r) => r.id)
chk(`todo estado da T05 está num grupo da coluna (${gruposT05.join(', ')})`, gruposT05.length > 0 && !foraDaColuna.length, foraDaColuna.join(', '))
const cam = (p) => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), M)
const quebrados = []
for (const [id, r] of Object.entries(RECEITAS)) {
  for (const c of r.casos ?? []) if (!M.casos[c]) quebrados.push(`${id}: caso ${c}`)
  for (const d of r.dados ?? []) if (cam(d) === undefined) quebrados.push(`${id}: dado ${d}`)
}
chk('todo caso e todo dado das receitas existe no mock', !quebrados.length, quebrados.join(' · '))
const aditivos = Object.entries(RECEITAS).filter(([, r]) => r.aditivo && !M.casos[r.aditivo]).map(([id, r]) => `${id} → ${r.aditivo}`)
console.log(`\n${aditivos.length} estados esperam um caso aditivo no ciclo da tela:\n  ` + aditivos.join('\n  '))
// as sementes: o import usa o mock pela ponte do navegador, então aqui só se conferem os ids
const sem2 = readFileSync(resolve(app, 'src/estado/sementes.js'), 'utf8')
const ids = [...sem2.matchAll(/'(a-\d\d|M2C-\d{4}|uo-\d\d|pac-uo-\d\d)'/g)].map((m) => m[1])
const ruins = ids.filter((i) => !(M.ativos.some((a) => a.id === i) || M.modulos.some((m) => m.serial === i) || M.uos.some((u) => u.id === i) || M.pacotes.some((p) => p.id === i)))
chk('todo id das sementes existe no mock', !ruins.length, ruins.join(', '))
console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
