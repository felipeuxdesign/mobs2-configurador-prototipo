// A régua do botão aceso (06-prototipo/CLAUDE.md, regra 12 — nunca um botão
// que não faz nada): em cada tela e momento do fluxo (02-telas/indice.json,
// sem os estados, que abrem parados pela coluna), toca cada tocável aceso, um
// por vez, com a página aberta de novo, e confere se alguma coisa mudou — o
// endereço, o desenho do app ou o foco. O que não muda nada é o botão aceso
// que não faz nada: vai pra lista, com a nota do porquê, se já se sabe. O que
// muda e volta dentro da janela do toque (o quadro da busca da T05, que fica
// RITMOS.buscaMs e dá lugar à lista) conta como mudou: a régua olha a janela
// inteira, de 100 em 100 ms, e não só o fim dela. A janela cobre a busca de novo
// (JANELA_MS): na T05/00, o quadro da busca é o da própria 00, e o que muda é a
// lista que volta, depois de RITMOS.buscaMs.
//
// Uso: node scripts/aceso.mjs            (todas as telas e momentos)
//      node scripts/aceso.mjs T02,T09    (só os que começam assim)
// O dev server precisa estar no ar (http://localhost:5173). Usa o Chrome do
// fotógrafo, numa aba própria, como a régua do caminho. Grava prints/aceso.json.
//
// O foco conta só quando o toque o leva a outro lugar (o rótulo que põe o foco
// no campo): o Chrome dá o foco ao botão tocado, e isso não é o botão fazer
// alguma coisa. Antes de cada toque, o foco que ficou sai do campo, como o toque
// de verdade o tiraria.
// Os lugares que só nascem de um toque depois da entrada (o menu sem o aviso do
// acesso, a busca que acha na T02, a recuperação da T09) entram com o toque
// que os faz nascer (DEPOIS_DE_UM_TOQUE).
// O quadro com um processo andando sozinho muda sem toque: o do cronômetro do
// código (T01) se mede sem os números; o que acaba no mesmo lugar (a conferência
// da T11, o encerramento sem homologar), depois de acabar; o que acaba em outro
// lugar (a releitura, a cadeia, o autoteste) sai como "não medido", e o lugar de
// depois se mede sozinho. O que já está desabilitado de verdade (o disabled, o
// fieldset desabilitado, o aria-disabled) não conta: é o botão que o leitor ouve
// desabilitado. O rótulo do campo que já está em foco também não, nem a escolha
// já marcada (o radio marcado): tocar de novo nela não muda nada, e o leitor já
// diz marcada.
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHROME } from './cromo.mjs'
import { RITMOS } from '../src/estado/ritmos.js'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const BASE = process.env.BASE || 'http://localhost:5173/'
const so = process.argv[2] ? process.argv[2].split(',') : null

// o que já se sabe, lugar a lugar: "<tela>/<nn>|<nome do tocável>" → o porquê. Nenhum, desde a construção da
// otimização do design: o Sincronizar das seis garagens da lista longa baixa o pacote que o caso declara pra
// elas (T02/03, depois de uma busca que acha), e o Procurar de novo da T05/01 mostra o quadro da busca da
// T05/00 antes de a lista voltar (logica.md · Nenhum botão aceso que não faz nada). O ENCERRAR da recuperação
// da T09 (T09/03) fica desabilitado de verdade (a lei 17), e a régua não o conta
const NOTAS = {}
// os lugares que só nascem de um toque depois da entrada: o endereço, e o que se faz antes de medir
// (a cada vez que a página reabre). O menu na primeira chegada mostra o aviso do acesso por cima: o
// lugar do endereço mede o Entendi, e o "sem o aviso" mede o menu
const DEPOIS_DE_UM_TOQUE = [
  { id: 'T04/00-tela · sem o aviso', q: '?tela=T04', antes: [{ toca: 'Entendi' }] },
  { id: 'T04/01-momento-sem-modulo · sem o aviso', q: '?tela=T04&momento=01-momento-sem-modulo', antes: [{ toca: 'Entendi' }] },
  { id: 'T04/02-momento-modulo-sem-ativo · sem o aviso', q: '?tela=T04&momento=02-momento-modulo-sem-ativo', antes: [{ toca: 'Entendi' }] },
  { id: 'T02/03 · a busca que acha', q: '?tela=T02&momento=03-momento-busca-sem-resultado', antes: [{ digita: 'Olinda', em: 'Buscar unidade ou cidade' }, { toca: 'Garagem Olinda' }] },
  { id: 'T09/03 · a recuperação pelo ENCERRAR', q: '?tela=T09', antes: [{ toca: 'ENCERRAR' }] },
]

async function conectar() {
  for (const e of [1, 2]) {
    const f = resolve(app, `prints/tmp/fotografo-perfil-${e}/DevToolsActivePort`)
    if (!existsSync(f)) continue
    const [porta, caminho] = readFileSync(f, 'utf8').trim().split('\n')
    try { await fetch(`http://127.0.0.1:${porta}/json/version`); return { url: `ws://127.0.0.1:${porta}${caminho}`, fechar: () => {} } } catch {}
  }
  const perfil = resolve(app, 'prints/tmp/aceso-perfil'); rmSync(perfil, { recursive: true, force: true }); mkdirSync(perfil, { recursive: true })
  const cromo = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
    '--remote-debugging-port=0', '--user-data-dir=' + perfil, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] })
  const url = await new Promise((ok, falha) => {
    let buf = ''; const t = setTimeout(() => falha(new Error('o Chrome não abriu')), 20000)
    cromo.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); ok(m[1]) } })
  })
  return { url, fechar: () => { try { cromo.kill() } catch {} } }
}

const { url, fechar } = await conectar()
const ws = new WebSocket(url); await new Promise((ok) => ws.addEventListener('open', ok, { once: true }))
let seq = 0; const pend = new Map()
ws.addEventListener('message', (ev) => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.falha(new Error(m.error.message)) : p.ok(m.result) } })
const cdp = (method, params = {}, sessionId) => new Promise((ok, falha) => { const id = ++seq; pend.set(id, { ok, falha }); ws.send(JSON.stringify({ id, method, params, sessionId })) })
const dorme = (ms) => new Promise((r) => setTimeout(r, ms))
const na = async (s, corpo) => {
  const r = await cdp('Runtime.evaluate', { expression: `(() => { const P = ${NA_PAGINA}; ${corpo} })()`, returnByValue: true, awaitPromise: true }, s)
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}
// dentro da página: os tocáveis acesos do celular, com o nome que o leitor lê, e a foto do que se vê
const NA_PAGINA = `(() => {
  const raiz = document.querySelector('.celular-tela .app')
  const limpa = (s) => (s || '').replace(/\\s+/g, ' ').trim()
  const nome = (e) => limpa(e.getAttribute('aria-label') || (e.getAttribute('aria-labelledby') || '').split(' ').map((i) => document.getElementById(i)?.innerText).join(' ')
    || (e.labels && e.labels[0] && e.labels[0].innerText) || e.innerText || e.value)
  const desligado = (e) => e.disabled || !!e.matches(':disabled') || e.getAttribute('aria-disabled') === 'true'
  const tocaveis = () => [...raiz.querySelectorAll('button, a[href], [role=button], [role=link], [role=radio], [role=checkbox], [role=option], [role=switch], [role=tab], input[type=checkbox], input[type=radio], label')]
    .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !e.closest('[inert]') && !e.closest('[aria-hidden="true"]') && !desligado(e)
      && !(e.tagName === 'LABEL' && e.control && e.control === document.activeElement)
      // a escolha já feita (a garagem, o módulo, o ônibus, o canal marcados): tocar de novo nela não muda nada, e o leitor já diz marcada
      && !(e.getAttribute('role') === 'radio' && e.getAttribute('aria-checked') === 'true') && !(e.type === 'radio' && e.checked) })
  // o foco conta só quando o toque o leva pra outro lugar (o rótulo que põe o foco no campo): o botão
  // tocado ganha o foco do próprio clique, no Chrome, e isso não é o botão fazer alguma coisa.
  // Com \`sem\`, os números saem da foto: o cronômetro do código anda sozinho, e o resto não
  const foto = (sem) => { const c = raiz.cloneNode(true); c.querySelectorAll('.ds-rolagem').forEach((e) => e.remove())
    const f = document.activeElement, html = sem ? c.innerHTML.replace(/[0-9]/g, '#') : c.innerHTML
    return location.search + '§' + html + '§' + (f && raiz.contains(f) && f !== window.__m2cfAlvo ? nome(f) || f.tagName : '') }
  // o que o preparo pede: escrever no campo com esse nome
  const campo = (alvo) => [...raiz.querySelectorAll('input, textarea')].find((e) => nome(e).startsWith(alvo))
  return { raiz, nome, tocaveis, foto, campo }
})()`

const indice = JSON.parse(readFileSync(resolve(raiz, '02-telas/indice.json'), 'utf8')).itens
const lugares = [...indice.filter((r) => r.tipo !== 'estado')
  .map((r) => ({ id: r.id, q: r.tipo === 'tela' ? `?tela=${r.tela}` : `?tela=${r.tela}&momento=${r.nome}` })), ...DEPOIS_DE_UM_TOQUE]
  .filter((l) => !so || so.some((t) => l.id.startsWith(t)))

const { targetId } = await cdp('Target.createTarget', { url: 'about:blank', newWindow: true })
const { sessionId: s } = await cdp('Target.attachToTarget', { targetId, flatten: true })
await cdp('Page.enable', {}, s); await cdp('Runtime.enable', {}, s)
await cdp('Emulation.setFocusEmulationEnabled', { enabled: true }, s)
await cdp('Emulation.setDeviceMetricsOverride', { width: 360, height: 800, deviceScaleFactor: 1, mobile: false }, s)
async function abre(q) {
  await na(s, 'window.__m2cfVelha = true; return true').catch(() => {})
  await cdp('Page.navigate', { url: BASE + q }, s)
  for (let i = 0; i < 150; i++) {
    const ok = await na(s, `return !window.__m2cfVelha && document.readyState === 'complete' && !!P.raiz && document.fonts.status === 'loaded'`).catch(() => false)
    if (ok) break; await dorme(100)
  }
  await dorme(900)
}
const toque = async (c) => { for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 }, s) }
const centro = `e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, n: P.nome(e) }`
// abre o lugar, faz o que ele pede antes (o toque que o faz nascer) e tira o foco que ficou: o toque de
// verdade o tiraria do campo de qualquer jeito, e a foto de antes tem de ser a do que se vê
async function prepara(l, espera = 0) {
  await abre(l.q)
  for (const p of l.antes ?? []) {
    if (p.digita !== undefined) {
      if (!(await na(s, `const i = P.campo(${JSON.stringify(p.em)}); if (!i) return false; i.focus(); i.select?.(); return true`))) throw new Error(`${l.id}: não achei o campo "${p.em}"`)
      await cdp('Input.insertText', { text: p.digita }, s)
    } else {
      const c = await na(s, `const t = P.tocaveis(), e = t.find((e) => P.nome(e) === ${JSON.stringify(p.toca)}) || t.find((e) => P.nome(e).startsWith(${JSON.stringify(p.toca)})); if (!e) return null; ${centro}`)
      if (!c) throw new Error(`${l.id}: não achei "${p.toca}" pra tocar antes`)
      await toque(c)
    }
    await dorme(500)
  }
  await na(s, `window.__m2cfAlvo = null; const f = document.activeElement; if (f && f !== document.body) f.blur(); return true`)
  await dorme(espera || 300)
}
// o que se vê está parado? Os números fora (o cronômetro do código), ou o processo que acaba no mesmo
// lugar (a conferência da T11): a régua espera ele acabar, e mede dali
async function parado() {
  const a = await na(s, 'return [P.foto(), P.foto(true)]'); await dorme(1100); const b = await na(s, 'return [P.foto(), P.foto(true)]')
  if (a[0] === b[0]) return { modo: 'cru', espera: 0 }
  if (a[1] === b[1]) return { modo: 'sem os números', espera: 0 }
  const q = await na(s, 'return location.search'); let antes = b[0]
  for (let t = 1100; t <= 8800; t += 1100) {
    await dorme(1100); const agora = await na(s, 'return P.foto()')
    if (agora === antes) return (await na(s, 'return location.search')) === q ? { modo: 'depois do processo', espera: t + 1400 } : null
    antes = agora
  }
  return null
}

// a janela do toque: 800 ms, ou o ritmo da busca de novo da T05 e mais um pouco, o que for maior. Na
// T05/00, o quadro da busca é a própria 00 (o M2C-0417 escolhido): nada muda na tela até a lista voltar,
// sem nada escolhido, depois de RITMOS.buscaMs (1,2 s, o número do arquiteto na última entrega)
const JANELA_MS = Math.max(800, RITMOS.buscaMs + 400)

const saida = []; let mortos = 0, naoMedidos = 0
const t0 = performance.now()
for (const l of lugares) {
  let r
  try {
    await prepara(l)
    const m = await parado()
    if (m?.espera) await prepara(l, m.espera)
    const nomes = await na(s, 'return P.tocaveis().map((e) => P.nome(e))')
    r = { id: l.id, medido: !!m, modo: m?.modo, tocaveis: nomes, nada: [] }
    if (!m) { naoMedidos++; console.log(`  ~ ${l.id}: um processo anda sozinho, não medido (${nomes.join(' | ') || 'sem tocável'})`); saida.push(r); continue }
    const sem = m.modo === 'sem os números'
    for (let i = 0; i < nomes.length; i++) {
      await prepara(l, m.espera)
      const c = await na(s, `const e = P.tocaveis()[${i}]; if (!e) return null; window.__m2cfAlvo = e; ${centro}`)
      if (!c) continue
      const antes = await na(s, `return P.foto(${sem})`)
      await toque(c)
      // a janela do toque inteira: o que muda e volta (o quadro que passa) também mudou
      let depois = antes
      for (let t = 100; t <= JANELA_MS && depois === antes; t += 100) { await dorme(100); depois = await na(s, `return P.foto(${sem})`).catch(() => null) }
      if (depois === antes) { const nota = NOTAS[`${l.id.slice(0, 6)}|${c.n}`]; r.nada.push(nota ? { nome: c.n, nota } : { nome: c.n }); if (!nota) mortos++ }
    }
  } catch (e) { naoMedidos++; r = { id: l.id, medido: false, erro: e.message, tocaveis: [], nada: [] }; console.log(`  ~ ${l.id}: ${e.message}`); saida.push(r); continue }
  const sem = r.nada.filter((n) => !n.nota), com = r.nada.filter((n) => n.nota)
  console.log(`  ${sem.length ? '✘' : '✔'} ${l.id}: ${r.tocaveis.length} tocáveis${r.modo !== 'cru' ? ` (${r.modo})` : ''}${sem.length ? ' · NÃO FAZEM NADA: ' + sem.map((n) => n.nome).join(' | ') : ''}${com.length ? ' · com nota: ' + com.map((n) => `${n.nome} (${n.nota})`).join(' | ') : ''}`)
  saida.push(r)
}
await cdp('Target.closeTarget', { targetId }).catch(() => {})
writeFileSync(resolve(app, 'prints/aceso.json'), JSON.stringify(saida, null, 1))
ws.close(); fechar()
const seg = ((performance.now() - t0) / 1000).toFixed(0)
console.log(`\n${lugares.length} lugares · ${naoMedidos} com um processo andando, não medidos · ${seg} s · prints/aceso.json`)
const comNota = saida.reduce((n, r) => n + r.nada.filter((x) => x.nota).length, 0)
console.log(mortos ? `${mortos} tocáveis acesos que não fazem nada, sem nota` : `NENHUM BOTÃO ACESO QUE NÃO FAZ NADA${comNota ? `, fora os ${comNota} com nota` : ''}`)
process.exit(mortos ? 1 : 0)
