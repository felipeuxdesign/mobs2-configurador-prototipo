// A régua do caminho: percorre o app como o técnico, tocando pelo nome que o
// leitor de tela lê, e confere onde o app chega. Os roteiros ficam em
// scripts/caminhos/<nome>.mjs (export default [passos]).
//
// Uso: node scripts/caminho.mjs heroi            (um roteiro)
//      node scripts/caminho.mjs todos            (todos os de scripts/caminhos/)
// O dev server precisa estar no ar (http://localhost:5173). Usa o Chrome do
// fotógrafo, numa aba própria (nesta máquina, Chrome em paralelo trava); sem
// fotógrafo, abre um Chrome headless só pra régua.
//
// Os passos:
//   { abre: '?tela=T01' }                  abre o protótipo nesse endereço (fora do print: os processos correm)
//   { toca: 'Entrar' }                     toca no tocável com esse nome (o exato; senão, o que começa por ele)
//   { marca: 'M2C-0417' }                  o mesmo que toca, pra ler melhor no roteiro de escolha (R-14)
//   { digita: 'abc12345', em: 'Senha' }    escreve no campo com esse rótulo, no lugar do que tinha
//   { tecla: 'Escape' }                    aperta a tecla (o Esc é o voltar do Android, logica.md)
//   { chega: 'T03' } · { chega: 'T01', momento: '02-…' } · { chega: 'T05', estado: null }   espera a URL dizer isso
//   { ve: 'texto' } · { naoVe: 'texto' }  espera o texto aparecer, ou sumir, no celular
//   { fica: 'T13', ms: 1500 }              confere que o app continua nessa tela depois de ms (o voltar que não faz nada)
//   { desligado: 'Conectar' }              espera o tocável com esse nome existir desabilitado (o primário apagado, o cartão em espera)
//   { naoToca: 'M2C-0999' }                confere que nenhum tocável tem esse nome (o que a referência desenha sem toque)
//   { dorme: 500 }
// Todo passo que espera aceita `ms` (padrão 15000): os processos correm no ritmo de ritmos.js,
// e `entre: [min, max]`: quanto tempo a espera pode levar, em ms (o ritmo de um processo) — no toca,
// a espera é a do tocável aparecer ligado (o Voltar ao menu que entra com a última assertiva).
// Se a página recarrega sem um abre (o dev server trocou um arquivo que outro agente editou), o
// estado único volta ao começo: a régua para e diz isso, em vez de só "não chegou".
//
// O movimento (movimento.md): todo toque grava o que começou a animar no celular logo depois,
// em prints/caminho/<roteiro>-movimento.json, e acusa com ⚠ o que a lei proíbe (animar
// outra coisa que transform e opacity, ou em loop).
//   { toca: 'X', anima: [{ prop: 'opacity', ms: 150, curva?, atraso?, em? }] }   o toque tem de começar isso
//   { anima: [...] }                        o que está animando agora (depois de um dorme, num processo)
//   { quieto: true }                        nada animando agora (a tela abre sem animar a entrada)
//   { reduzir: true } · { reduzir: false }  liga e desliga o prefers-reduced-motion (com ele, toda duração é zero), e espera 400 ms
//                                          pro que o toque anterior começou acabar
// Fora do celular (a vitrine, ?vitrine=1), a régua procura na página inteira.
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { CHROME } from './cromo.mjs'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.env.BASE || 'http://localhost:5173/'
const SAIDA = resolve(app, 'prints/caminho'); mkdirSync(SAIDA, { recursive: true })
const W = 360, H = 800

// o Chrome: o do fotógrafo, pelo arquivo que o Chrome escreve no perfil; senão, um próprio
async function conectar() {
  for (const e of [1, 2]) {
    const f = resolve(app, `prints/tmp/fotografo-perfil-${e}/DevToolsActivePort`)
    if (!existsSync(f)) continue
    const [porta, caminho] = readFileSync(f, 'utf8').trim().split('\n')
    try { await fetch(`http://127.0.0.1:${porta}/json/version`); return { url: `ws://127.0.0.1:${porta}${caminho}`, fechar: () => {} } } catch {}
  }
  const perfil = resolve(app, 'prints/tmp/caminho-perfil'); rmSync(perfil, { recursive: true, force: true }); mkdirSync(perfil, { recursive: true })
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
const ws = new WebSocket(url)
await new Promise((ok) => ws.addEventListener('open', ok, { once: true }))
let seq = 0; const pendentes = new Map(); const ouvintes = new Set()
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pendentes.has(m.id)) { const p = pendentes.get(m.id); pendentes.delete(m.id); m.error ? p.falha(new Error(m.error.message)) : p.ok(m.result) }
  else if (m.method) for (const f of ouvintes) f(m)
})
const cdp = (method, params = {}, sessionId) => new Promise((ok, falha) => { const id = ++seq; pendentes.set(id, { ok, falha }); ws.send(JSON.stringify({ id, method, params, sessionId })) })
const dorme = (ms) => new Promise((r) => setTimeout(r, ms))

// dentro da página: os tocáveis do celular, com o nome que o leitor de tela lê
const NA_PAGINA = `(() => {
  // o celular; fora dele (a vitrine das peças, ?vitrine=1), a página inteira
  const raiz = document.querySelector('.celular-tela .app') || document.querySelector('.app') || document.body
  const limpa = (s) => (s || '').replace(/\\s+/g, ' ').trim()
  const nome = (e) => limpa(e.getAttribute('aria-label')
    || (e.getAttribute('aria-labelledby') || '').split(' ').map((i) => document.getElementById(i)?.innerText).join(' ')
    || (e.labels && e.labels[0] && e.labels[0].innerText) || e.innerText || e.value || e.getAttribute('title'))
  const inerte = (e) => !!e.closest('[inert]') || e.closest('[aria-hidden="true"]')
  const desligado = (e) => e.disabled || e.getAttribute('aria-disabled') === 'true'
  const tocaveis = () => [...raiz.querySelectorAll('button, a[href], [role=button], [role=link], [role=radio], [role=checkbox], [role=option], [role=switch], [role=tab], input[type=checkbox], input[type=radio], label')]
    .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !inerte(e) })
  const acha = (alvo) => { const t = tocaveis(); return t.find((e) => nome(e) === alvo) || t.find((e) => nome(e).startsWith(alvo)) || t.find((e) => nome(e).includes(alvo)) }
  // o que anima dentro do celular: a propriedade, o tempo, a curva e quantas vezes
  const anims = () => document.getAnimations().filter((a) => a.effect?.target && raiz.contains(a.effect.target)).map((a) => {
    const t = a.effect.getTiming(), alvo = a.effect.target
    const props = a.transitionProperty ? [a.transitionProperty] : [...new Set(a.effect.getKeyframes().flatMap((k) => Object.keys(k).filter((p) => !['offset', 'easing', 'composite', 'computedOffset'].includes(p))))]
    return { em: (typeof alvo.className === 'string' ? alvo.className : alvo.tagName).trim().split(/\\s+/).slice(0, 3).join(' '), nome: a.animationName || a.transitionProperty || '', props,
      ms: Math.round(Number(t.duration) || 0), atraso: Math.round(t.delay || 0), curva: t.easing === 'linear' && a.transitionProperty ? getComputedStyle(alvo).transitionTimingFunction : (t.easing === 'linear' && a.animationName ? getComputedStyle(alvo).animationTimingFunction : t.easing), vezes: t.iterations }
  })
  return { raiz, nome, desligado, tocaveis, acha, limpa, anims }
})()`
const na = async (s, corpo) => {
  const r = await cdp('Runtime.evaluate', { expression: `(() => { const P = ${NA_PAGINA}; ${corpo} })()`, returnByValue: true, awaitPromise: true }, s)
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}
const onde = (s) => na(s, `const q = new URLSearchParams(location.search); return { tela: q.get('tela'), momento: q.get('momento'), estado: q.get('estado') }`)
const nomes = (s) => na(s, `return P.tocaveis().map((e) => (P.desligado(e) ? '(desligado) ' : '') + P.nome(e)).filter(Boolean)`)

async function espera(fn, ms, passo, entre) {
  const t0 = performance.now(); let ultimo
  for (;;) {
    ultimo = await fn()
    if (ultimo === true) {
      const levou = Math.round(performance.now() - t0)
      if (entre && (levou < entre[0] || levou > entre[1])) throw new Error(`${passo}: levou ${levou} ms, e o ritmo pede entre ${entre[0]} e ${entre[1]}`)
      return
    }
    if (performance.now() - t0 > ms) throw new Error(`${passo}: não chegou em ${ms} ms${ultimo && ultimo !== false ? ' · ' + ultimo : ''}`)
    await dorme(entre ? 20 : 100)
  }
}

// o movimento: o que a lei proíbe (movimento.md, "Só isto se move") e o que o roteiro espera
const PODE = new Set(['transform', 'opacity', 'translate', 'scale', 'rotate'])
let registro = []
let abrindo = false   // o abre navega de propósito; fora dele, navegar é o app recarregando
function avisaLei(vistas, onde) {
  for (const a of vistas) {
    const fora = a.props.filter((p) => !PODE.has(p))
    if (fora.length) console.log(`      ⚠ ${onde}: ${a.em} anima ${fora.join(', ')} — só transform e opacity se movem`)
    if (a.vezes === Infinity || a.vezes === 'Infinity') console.log(`      ⚠ ${onde}: ${a.em} anima em loop`)
  }
}
function confere(esperado, vistas, onde) {
  avisaLei(vistas, onde)
  for (const e of esperado) {
    const achou = vistas.find((a) => a.props.includes(e.prop) && (e.ms === undefined || Math.abs(a.ms - e.ms) <= 1)
      && (e.atraso === undefined || Math.abs(a.atraso - e.atraso) <= 1) && (e.em === undefined || a.em.includes(e.em))
      && (e.curva === undefined || a.curva.replace(/\s/g, '') === e.curva.replace(/\s/g, '')))
    if (!achou) throw new Error(`${onde}: esperava ${JSON.stringify(e)}; animou ${vistas.length ? vistas.map((a) => `${a.em} ${a.props.join('+')} ${a.ms}ms +${a.atraso} ${a.curva}`).join(' · ') : 'nada'}`)
  }
}

async function passo(s, p) {
  const ms = p.ms ?? 15000
  if (p.abre !== undefined) {
    abrindo = true
    try {
      // a página de antes continua na tela até a nova chegar: marca a velha, e espera uma sem a marca
      // (o endereço não serve de prova, porque o palco o reescreve ao abrir)
      await na(s, `window.__m2cfVelha = true; return true`).catch(() => {})
      await cdp('Page.navigate', { url: BASE + p.abre }, s)
      await espera(() => na(s, `return !window.__m2cfVelha && document.readyState === 'complete' && !!P.raiz && document.fonts.status === 'loaded'`).catch(() => false), ms, 'abre')
      // o app desenhou, mas os efeitos do React (o Esc de cada tela, o relógio dos processos)
      // correm depois da pintura: dois quadros e uma volta do laço, senão a tecla logo depois do
      // abre cai antes de a tela escutar
      await na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => r(true), 50))))`)
      return
    } finally { abrindo = false }
  }
  if (p.toca !== undefined || p.marca !== undefined) {
    const alvo = p.toca ?? p.marca
    await espera(() => na(s, `const e = P.acha(${JSON.stringify(alvo)}); return !!e && !P.desligado(e) || (e ? 'está desligado' : 'não achei')`), ms, `toca "${alvo}"`, p.entre)
    const c = await na(s, `const e = P.acha(${JSON.stringify(alvo)}); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect();
      const x = r.left + r.width / 2, y = r.top + r.height / 2, em = document.elementFromPoint(x, y);
      return { x, y, cobre: em && !e.contains(em) && !em.contains(e) ? (em.className || em.tagName) + ' · ' + P.nome(em) : null }`)
    if (c.cobre) throw new Error(`toca "${alvo}": o centro dele está coberto por ${c.cobre}`)
    for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', clickCount: 1 }, s)
    // o que o toque começou: dois quadros depois, pra o React desenhar e a transição nascer
    const vistas = await na(s, `return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(P.anims()))))`)
    registro.push({ passo: `toca ${alvo}`, anims: vistas })
    if (p.anima) confere(p.anima, vistas, `toca "${alvo}"`); else avisaLei(vistas, `toca "${alvo}"`)
    return
  }
  if (p.anima !== undefined) { const vistas = await na(s, `return P.anims()`); registro.push({ passo: 'anima', anims: vistas }); return confere(p.anima, vistas, 'anima') }
  if (p.quieto !== undefined) {
    const vistas = await na(s, `return P.anims()`)
    if (vistas.length) throw new Error(`quieto: está animando ${vistas.map((a) => `${a.em} ${a.props.join('+')} ${a.ms}ms`).join(' · ')}`)
    return
  }
  if (p.reduzir !== undefined) {
    await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: p.reduzir ? 'reduce' : 'no-preference' }] }, s)
    // o que o toque anterior começou guarda o tempo dele: espera acabar, pra não contar como do reduzir
    return dorme(400)
  }
  if (p.digita !== undefined) {
    await espera(() => na(s, `const i = [...P.raiz.querySelectorAll('input, textarea')].find((e) => P.nome(e).startsWith(${JSON.stringify(p.em)}) || (e.labels?.[0] && P.limpa(e.labels[0].innerText).startsWith(${JSON.stringify(p.em)})));
      if (!i) return 'não achei o campo'; i.focus(); i.select?.(); return true`), ms, `digita em "${p.em}"`)
    await cdp('Input.insertText', { text: p.digita }, s)
    return
  }
  if (p.tecla !== undefined) {
    const k = { key: p.tecla, code: p.tecla, windowsVirtualKeyCode: { Escape: 27, Enter: 13, Tab: 9, Backspace: 8 }[p.tecla] }
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', ...k }, s); await cdp('Input.dispatchKeyEvent', { type: 'keyUp', ...k }, s)
    return
  }
  if (p.chega !== undefined) {
    return espera(async () => {
      const u = await onde(s)
      const ok = u.tela === p.chega && ('momento' in p ? u.momento === p.momento : true) && ('estado' in p ? u.estado === p.estado : true)
      return ok || `está em ${u.tela}${u.momento ? ' · ' + u.momento : ''}${u.estado ? ' · ' + u.estado : ''}`
    }, ms, `chega ${p.chega}${p.momento ? ' · ' + p.momento : ''}`, p.entre)
  }
  if (p.fica !== undefined) {
    await dorme(p.ms ?? 1500); const u = await onde(s)
    if (u.tela !== p.fica) throw new Error(`fica ${p.fica}: foi pra ${u.tela}`)
    return
  }
  if (p.naoToca !== undefined) return espera(() => na(s, `const e = P.acha(${JSON.stringify(p.naoToca)}); return !e || 'é tocável: ' + P.nome(e)`), ms, `não toca "${p.naoToca}"`, p.entre)
  if (p.desligado !== undefined) return espera(() => na(s, `const e = P.acha(${JSON.stringify(p.desligado)}); return !!e && P.desligado(e) || (e ? 'está ligado' : 'não achei')`), ms, `desligado "${p.desligado}"`, p.entre)
  if (p.ve !== undefined) return espera(() => na(s, `return P.raiz.innerText.includes(${JSON.stringify(p.ve)})`), ms, `vê "${p.ve}"`, p.entre)
  if (p.naoVe !== undefined) return espera(() => na(s, `return !P.raiz.innerText.includes(${JSON.stringify(p.naoVe)})`), ms, `não vê "${p.naoVe}"`, p.entre)
  if (p.dorme !== undefined) return dorme(p.dorme)
  throw new Error('passo desconhecido: ' + JSON.stringify(p))
}

const rotulo = (p) => Object.entries(p).filter(([k]) => !['ms', 'anima', 'entre'].includes(k)).map(([k, v]) => `${k} ${typeof v === 'string' ? v : JSON.stringify(v)}`).join(' · ')

async function roda(nome) {
  const passos = (await import(pathToFileURL(resolve(app, `scripts/caminhos/${nome}.mjs`)).href)).default
  const { targetId } = await cdp('Target.createTarget', { url: 'about:blank', newWindow: true })
  const { sessionId: s } = await cdp('Target.attachToTarget', { targetId, flatten: true })
  await cdp('Page.enable', {}, s); await cdp('Runtime.enable', {}, s)
  await cdp('Emulation.setFocusEmulationEnabled', { enabled: true }, s)
  await cdp('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false }, s)
  const t0 = performance.now(); let falhou = null; registro = []
  // a página que recarrega sem o roteiro mandar (o dev server trocou um arquivo que outro
  // agente editou) volta o estado único ao começo: a régua diz isso, em vez de só "não chegou"
  let recarregou = false
  const ouve = (m) => { if (m.sessionId === s && m.method === 'Page.frameNavigated' && !m.params.frame.parentId && !abrindo) recarregou = true }
  ouvintes.add(ouve)
  const RECARGA = 'o app recarregou no meio do caminho (o dev server trocou um arquivo?) e o estado voltou ao começo — rode de novo'
  try {
    for (const [i, p] of passos.entries()) {
      try { await passo(s, p); if (recarregou) throw new Error(RECARGA); console.log(`  ✔ ${String(i + 1).padStart(3)} ${rotulo(p)}`) }
      catch (e) {
        if (recarregou && e.message !== RECARGA) e.message = RECARGA + ' · ' + e.message
        falhou = { passo: i + 1, erro: e.message, onde: await onde(s).catch(() => null), tocaveis: await nomes(s).catch(() => []) }
        const { data } = await cdp('Page.captureScreenshot', { format: 'png' }, s)
        writeFileSync(resolve(SAIDA, `${nome}-falha.png`), Buffer.from(data, 'base64'))
        console.log(`  ✘ ${String(i + 1).padStart(3)} ${rotulo(p)}\n      ${e.message}\n      em ${JSON.stringify(falhou.onde)}\n      tocáveis: ${falhou.tocaveis.join(' | ')}\n      foto: prints/caminho/${nome}-falha.png`)
        break
      }
    }
  } finally { ouvintes.delete(ouve); await cdp('Target.closeTarget', { targetId }).catch(() => {}) }
  writeFileSync(resolve(SAIDA, `${nome}-movimento.json`), JSON.stringify(registro, null, 1))
  const seg = ((performance.now() - t0) / 1000).toFixed(1)
  console.log(falhou ? `${nome}: PAROU no passo ${falhou.passo} de ${passos.length} (${seg} s)` : `${nome}: OK, ${passos.length} passos (${seg} s)`)
  return !falhou
}

const alvo = process.argv[2] || 'heroi'
const lista = alvo === 'todos' ? readdirSync(resolve(app, 'scripts/caminhos')).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4)).sort() : [alvo]
let ok = true
for (const n of lista) { console.log(`\n# ${n}`); ok = (await roda(n)) && ok }
ws.close(); fechar()
console.log(ok ? '\nCAMINHO APROVADO' : '\nCAMINHO REPROVADO')
process.exit(ok ? 0 : 1)
