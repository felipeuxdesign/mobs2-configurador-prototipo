// As provas que o arquiteto pediu na otimizacao300000000 (a barra de status, a
// moldura do palco, a T16, a T06 e a T12), medidas no protótipo rodando, e os
// quatro modos do palco (e a folha 00) fotografados no quadro das referências.
//
//   (a) nas 142 do 02-telas/indice.json (as que o índice tiver), pelo endereço do print (como o tela.mjs
//       abre), as duas barras do sistema (lei 22, o pacote 4): em cima, o desenho oficial do Android
//       (05-recursos/sistema/barra-de-status-android.svg), elemento por elemento, no recorte do pacote
//       (viewBox 0 12.90 412 34.33), com 360 × 30 no topo da tela, a imagem com o rótulo pro leitor, e o topo do
//       primeiro elemento que vem embaixo dela em y = 30; embaixo, a navegação por gestos oficial, 360 × 20,97
//       no pé, uma só, por cima de tudo (o ponto do meio de cada terço dela cai nela, com folha e véu abertos),
//       sem toque e muda · e as duas na referência, com os mesmos desenhos
//   (b) nenhum pedido pra fora da máquina (os desenhos vão no código, nunca baixados)
//   (c) a moldura no palco largo, a 1440 × 900 e a 1920 × 1080: a silhueta (palco.md, o pacote 4) — 376 × 816
//       por fora, a borda de 8 quase-preta, sem metal, o canto de 36 por fora e 28 na tela, o fio de luz, o
//       contorno e a sombra, e o fundo do palco em --fundo-faixa — pelo getBoundingClientRect e o
//       getComputedStyle do celular e da tela; e numa janela baixa, a moldura que escala junto, nunca maior
//       que o real (D3)
//   (d) o celular no centro da janela (palco.md: é o celular que fica no centro, nos
//       dois eixos; a coluna fica ao lado dele): a folga da esquerda igual à da
//       direita e a de cima igual à de baixo
//   (e) a coluna a 40 do celular e com a altura dele (816)
//   (f) a T16 com o vão de 14 entre os blocos do miolo nas sete referências, e a
//       T06 (00 · a 02 e a 07 saíram no pacote 1) e a T12 (00, 03) com 16 entre o último grupo e o rodapé,
//       no fim da rolagem — no app e, de referência, no HTML da referência
//   e as fotos: o palco a 1440 × 900 (a 1×, como os PNG do palco) nos quatro modos,
//   e as peças da folha 00, em prints/provas-palco/; o lado a lado com as
//   referências sai do scripts/provas-palco-lado-a-lado.py, que este chama no fim.
//
// Uso (com o dev server em :5173 e o fotógrafo de escala 1 no ar):
//   node scripts/provas-palco.mjs              → tudo
//   node scripts/provas-palco.mjs medidas      → só as medidas (a–f)
//   node scripts/provas-palco.mjs fotos        → só as fotos e o lado a lado
//   node scripts/provas-palco.mjs texto        → só reescreve o palco-provas.txt do json
// Saída: prints/tmp/relatorios/palco-provas.json e palco-provas.txt, as fotos em
// prints/provas-palco/ e o lado a lado em ../para-o-arquiteto/palco/.
// Usa o Chrome do fotógrafo (o de escala 1, pra a foto sair a 1×), numa aba própria,
// como o scripts/caminho.mjs; sem fotógrafo, abre um Chrome headless só pra isto.
import { spawn, execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { PNG } from 'pngjs'
import { CHROME } from './cromo.mjs'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const BASE = process.env.BASE || 'http://localhost:5173/'
const FOTOS = resolve(app, 'prints/provas-palco'); mkdirSync(FOTOS, { recursive: true })
const RELATORIOS = resolve(app, 'prints/tmp/relatorios'); mkdirSync(RELATORIOS, { recursive: true })
const REF_PALCO = resolve(raiz, '06-prototipo/palco/referencias')
const modo = process.argv[2] || 'tudo'

// as normas: as barras (lei 22 e a ficha das barras no componentes.md, o pacote 4) e a moldura (palco.md, decisão 43 revista)
const NORMA = {
  barra: 30, recorte: '0 12.90 412 34.33', rotulo: '9:30 · Wi-Fi, sinal e bateria', navegacao: 20.97,
  moldura: { fora: [376, 816], tela: [360, 800], borda: 8, raioFora: 36, raioTela: 28, bordaCor: 'rgb(5, 4, 7)',
    sombras: 'rgba(255, 255, 255, 0.14) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.45) 0px 12px 24px 0px',
    fundo: 'rgb(22, 19, 29)' },
  coluna: { distancia: 40, altura: 816 },
  t16Vao: 14, folgaRodape: 16,
}
const JANELAS = [[1440, 900], [1920, 1080]]
// os quatro modos, no lugar do palco que cada quadro desenha (o mesmo do scripts/palco.mjs)
const MODOS = [
  { ref: '01-no-fluxo', url: '?tela=T04', o: 'no fluxo · a T04' },
  { ref: '02-num-estado', url: '?tela=T07&estado=04-estado-firmware-nao-homologado', o: 'num estado · a T07, Firmware não homologado' },
  { ref: '03-tela-com-muitos-estados', url: '?tela=T07', o: 'tela com muitos estados · a T07, em O módulo e A CAN' },
  { ref: '04-painel-aberto', url: '?tela=T07&painel=1', o: 'painel aberto · a T07' },
]

// ─── o Chrome ────────────────────────────────────────────────────────────────
async function conectar() {
  for (const e of [1, 2]) {
    const f = resolve(app, `prints/tmp/fotografo-perfil-${e}/DevToolsActivePort`)
    if (!existsSync(f)) continue
    const [porta, caminho] = readFileSync(f, 'utf8').trim().split('\n')
    try { await fetch(`http://127.0.0.1:${porta}/json/version`); return { url: `ws://127.0.0.1:${porta}${caminho}`, escalaDoChrome: e, fechar: () => {} } } catch {}
  }
  const perfil = resolve(app, 'prints/tmp/provas-perfil'); rmSync(perfil, { recursive: true, force: true }); mkdirSync(perfil, { recursive: true })
  const cromo = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--no-first-run', '--no-default-browser-check',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows', '--force-device-scale-factor=1',
    '--remote-debugging-port=0', '--user-data-dir=' + perfil, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] })
  const url = await new Promise((ok, falha) => {
    let buf = ''; const t = setTimeout(() => falha(new Error('o Chrome não abriu')), 20000)
    cromo.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); ok(m[1]) } })
  })
  return { url, escalaDoChrome: 1, fechar: () => { try { cromo.kill() } catch {} } }
}
const { url, escalaDoChrome, fechar } = await conectar()
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

const { targetId } = await cdp('Target.createTarget', { url: 'about:blank', newWindow: true })
const { sessionId: S } = await cdp('Target.attachToTarget', { targetId, flatten: true })
await cdp('Page.enable', {}, S); await cdp('Runtime.enable', {}, S)
await cdp('Emulation.setFocusEmulationEnabled', { enabled: true }, S)
await cdp('DOM.enable', {}, S); await cdp('CSS.enable', {}, S); await cdp('Network.enable', {}, S)

// os pedidos da página: o que sai da máquina, e as fontes
let pedidos = []
ouvintes.add((m) => {
  if (m.sessionId !== S) return
  if (m.method === 'Network.requestWillBeSent') pedidos.push({ url: m.params.request.url, tipo: m.params.type })
})
const local = (u) => /^(data:|blob:|about:|file:|chrome|devtools:)/.test(u) || /^(https?|wss?):\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?\//.test(u)

const avalia = async (expression) => {
  const r = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, S)
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}
async function janela(w, h) { await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false }, S) }
// abre o endereço e espera a página nova pronta: carregada, as fontes, o que o app desenha e os efeitos do React
async function abre(endereco, { pronto = 'true', respiro = 300 } = {}) {
  await avalia('window.__provaVelha = true').catch(() => {})
  await cdp('Page.navigate', { url: endereco }, S)
  const t0 = performance.now()
  for (;;) {
    const ok = await avalia(`!window.__provaVelha && document.readyState === 'complete' && document.fonts.status === 'loaded' && (${pronto})`).catch(() => false)
    if (ok) break
    if (performance.now() - t0 > 20000) throw new Error('não abriu: ' + endereco)
    await dorme(60)
  }
  await avalia(`new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => r(true), ${respiro}))))`)
}
// espera o que anima parar (a coluna, o painel, um processo que ainda corre)
async function quieto(ms = 6000) {
  const t0 = performance.now()
  while (performance.now() - t0 < ms) {
    if (await avalia(`document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.getTiming().iterations !== Infinity).length === 0`)) return true
    await dorme(80)
  }
  return false
}
async function fotografa(saida, clip) {
  const { data } = await cdp('Page.captureScreenshot', { format: 'png', ...(clip ? { clip: { ...clip, scale: 1 } } : {}) }, S)
  const buf = Buffer.from(data, 'base64'); writeFileSync(saida, buf)
  return PNG.sync.read(buf)
}
// a foto preta (nesta máquina, às vezes a foto sai toda preta): o fundo do palco é o --fundo-faixa, nunca o preto puro
const preta = (png) => { let n = 0; for (let i = 0; i < png.data.length; i += 4) if (png.data[i] + png.data[i + 1] + png.data[i + 2] === 0) n++; return n / (png.width * png.height) > 0.9 }

const perto = (a, b, tol = 0.5) => Math.abs(a - b) <= tol
const r2 = (v) => Math.round(v * 100) / 100
const resultado = { entrega: 'pacote 4', o_que: 'as provas do arquiteto, medidas no protótipo rodando (scripts/provas-palco.mjs)', chrome: `o do fotógrafo de escala ${escalaDoChrome}, numa aba própria`, norma: NORMA }

// ─── (a) e (b): as barras do sistema nas 142 ─────────────────────────────────
// as duas são o desenho oficial (lei 22, o pacote 4 · 05-recursos/sistema/): em cima, a barra do Android cortada no
// viewBox do pacote, e embaixo, a navegação por gestos. Os elementos do desenho (cada path e rect, com os atributos),
// lidos do arquivo oficial, contra os que a página desenhou
const SISTEMA = resolve(raiz, '05-recursos/sistema')
const elementos = (svg) => [...svg.matchAll(/<(path|rect)\b([^>]*?)\/?>/g)].map(([, tag, at]) => `${tag} ${[...at.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, k, v]) => `${k}=${v}`).sort().join(' ')}`)
const OFICIAL = {
  barra: elementos(readFileSync(resolve(SISTEMA, 'barra-de-status-android.svg'), 'utf8')),
  navegacao: elementos(readFileSync(resolve(SISTEMA, 'navegacao-por-gestos.svg'), 'utf8')),
}
const MEDE_BARRA = `(() => {
  const tela = document.querySelector('.celular-tela'); if (!tela) return { erro: 'sem a tela do app' }
  const T = tela.getBoundingClientRect()
  const tem = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 }
  const barras = [...tela.querySelectorAll('.ds-barra-sistema')].filter(tem)
  const b = barras[0]; if (!b) return { erro: 'sem a barra de status', texto: tela.innerText.replace(/\\s+/g, ' ').trim().slice(0, 120) }
  const rb = b.getBoundingClientRect(), cb = getComputedStyle(b)
  // o primeiro elemento que vem embaixo da barra: o irmão seguinte no fluxo, subindo pelos pais até a tela. O que
  // é display: contents (a T02 põe o miolo e o rodapé num embrulho assim) vale pelos filhos. Os que flutuam (absolutos
  // ou fixos) só contam se nada no fluxo vier, e se não cobrem a barra (o véu, no 0, não é o que vem embaixo): é o
  // quadro que a T01 põe por cima da tela, no 30 (.t01-sobre)
  const abre = (e) => getComputedStyle(e).display === 'contents' ? [...e.children].flatMap(abre) : [e]
  const flutua = (e) => /absolute|fixed/.test(getComputedStyle(e).position)
  const seguintes = []
  for (let el = b; el && el !== tela; el = el.parentElement) for (let s = el.nextElementSibling; s; s = s.nextElementSibling) seguintes.push(...abre(s))
  const vistos = seguintes.filter((e) => getComputedStyle(e).display !== 'none' && tem(e) && !e.closest('.ds-navegacao-gestos'))
  let prox = vistos.find((e) => !flutua(e)), como = 'no fluxo'
  if (!prox) { prox = vistos.find((e) => flutua(e) && e.getBoundingClientRect().top - T.top > 0.5); como = 'por cima da tela, embaixo da barra' }
  const quem = (e) => (typeof e.className === 'string' && e.className.trim() ? e.className.trim().split(/\\s+/).slice(0, 2).join(' ') : e.tagName.toLowerCase())
  // e o que se desenha por cima da faixa da barra, fora dela e fora dos pais dela (um véu, uma folha): só informa. O
  // título que só o leitor de tela lê (1 × 1, recortado) vai à parte: ninguém o vê
  const naFaixa = [...tela.querySelectorAll('*')].filter((e) => !b.contains(e) && !e.contains(b) && tem(e) && getComputedStyle(e).visibility !== 'hidden'
    && e.getBoundingClientRect().top - T.top < ${NORMA.barra} - 0.5 && e.getBoundingClientRect().bottom - T.top > 0.5)
  const soLeitor = (e) => { const r = e.getBoundingClientRect(); return r.width <= 1 && r.height <= 1 }
  const porCima = naFaixa.filter((e) => !soLeitor(e)).map(quem), soDoLeitor = naFaixa.filter(soLeitor).map(quem)
  // os elementos de um desenho, com os atributos, como o node lê o arquivo oficial
  const elementos = (svg) => svg ? [...svg.querySelectorAll('path, rect')].map((e) => e.tagName.toLowerCase() + ' ' + e.getAttributeNames().map((k) => k + '=' + e.getAttribute(k)).sort().join(' ')) : []
  const caixa = (e) => { const r = e.getBoundingClientRect(); return { esquerda: r.left - T.left, topo: r.top - T.top, largura: r.width, altura: r.height, baixo: T.bottom - r.bottom } }
  const sb = b.querySelector(':scope > svg')
  const desenho = sb && { viewBox: sb.getAttribute('viewBox'), elementos: elementos(sb), caixa: caixa(sb), mudo: sb.getAttribute('aria-hidden') }
  // a navegação por gestos: no pé, por cima de tudo — com o toque ligado só pra medir, o ponto do meio de cada
  // terço da faixa dela cai nela, e não numa folha, num véu ou no rodapé —, sem toque e muda
  const navs = [...tela.querySelectorAll('.ds-navegacao-gestos')]
  const n = navs[0]; let nav = null
  if (n) {
    const sn = n.querySelector(':scope > svg'), rn = n.getBoundingClientRect(), cn = getComputedStyle(n)
    const toque = cn.pointerEvents
    n.style.pointerEvents = 'auto'
    const pontos = [1 / 6, 1 / 2, 5 / 6].map((f) => document.elementFromPoint(rn.left + rn.width * f, rn.top + rn.height / 2))
    n.style.pointerEvents = ''
    nav = { quantas: navs.length, caixa: caixa(n), toque, mudo: n.getAttribute('aria-hidden'), porCima: pontos.map((p) => !!p && n.contains(p)),
      quemCobre: pontos.filter((p) => p && !n.contains(p)).map(quem), viewBox: sn?.getAttribute('viewBox'), elementos: elementos(sn) }
  }
  return {
    barra: { topo: rb.top - T.top, altura: rb.height, largura: rb.width, alturaCalculada: cb.height, quantas: barras.length,
      papel: b.getAttribute('role'), rotulo: b.getAttribute('aria-label'), texto: b.textContent.trim(), fundo: cb.backgroundColor },
    desenho, nav,
    embaixo: prox ? { quem: quem(prox), topo: prox.getBoundingClientRect().top - T.top, como } : null,
    porCima: [...new Set(porCima)].slice(0, 6), soDoLeitor: [...new Set(soDoLeitor)],
  }
})()`

// o que não se constrói, por desvio nomeado: fica fora da conta, e o relatório diz por quê
// (o domínio mudo da T07 antiga saiu com ela, no pacote 1: hoje nenhuma)
const FORA_DO_CICLO = {}

// As barras na referência (o pacote 4): a de cima no recorte do pacote, com os elementos do desenho oficial, e a
// navegação por gestos no pé
function barrasDaReferencia(html) {
  const s = readFileSync(resolve(raiz, html), 'utf8')
  const i = s.indexOf(`viewBox="${NORMA.recorte}"`), j = s.indexOf('data-sistema="navegacao-por-gestos"')
  const cima = i < 0 ? '' : s.slice(i, s.indexOf('</svg>', i)), baixo = j < 0 ? '' : s.slice(j, s.indexOf('</svg>', j))
  return { barra: i >= 0 && JSON.stringify(elementos(cima)) === JSON.stringify(OFICIAL.barra), navegacao: j >= 0 && JSON.stringify(elementos(baixo)) === JSON.stringify(OFICIAL.navegacao) }
}
async function barraNas145() {
  const indice = JSON.parse(readFileSync(resolve(raiz, '02-telas/indice.json'), 'utf8'))
  await janela(360, 800)
  const linhas = []
  // PROVAS_SO=T07/04-estado-firmware-nao-homologado,T02/00-tela: só essas (pra conferir uma de novo)
  const so = process.env.PROVAS_SO ? process.env.PROVAS_SO.split(',') : null
  const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
  for (const it of indice.itens.filter((i) => !so || so.includes(i.id))) {
    const q = new URLSearchParams({ print: '1', tela: it.tela })
    const m = it.nome.match(/^\d\d-(estado|momento)-/); if (m) q.set(m[1], it.nome)
    const endereco = `${BASE}?${q}`
    let med, erro = null, tentativas = 0
    // a que não abre tenta de novo, duas vezes (o dev server às vezes demora a responder uma)
    for (;;) {
      tentativas++; pedidos = []; erro = null
      try {
        await abre(endereco, { pronto: `!!document.querySelector('.celular-tela .app')?.children.length` })
        med = await avalia(MEDE_BARRA)
      } catch (e) { erro = e.message }
      if (!erro || tentativas >= 3) break
    }
    const fora = pedidos.filter((p) => !local(p.url)).map((p) => p.url)
    const l = { id: it.id, endereco: `?${q}` }
    if (tentativas > 1) l.tentativas = tentativas
    if (FORA_DO_CICLO[it.id] && med?.erro) { l.foraDoCiclo = FORA_DO_CICLO[it.id]; l.medido = med.erro; l.texto = med.texto; linhas.push(l); console.log(`  – ${it.id} · fora do ciclo: ${l.foraDoCiclo}`); continue }
    if (erro || med?.erro) { l.erro = erro || med.erro; linhas.push(l); console.log(`  ✘ ${it.id} · ${l.erro}`); continue }
    const d = med.desenho, n = med.nav
    l.barra = { topo: r2(med.barra.topo), altura: r2(med.barra.altura), quantas: med.barra.quantas, fundo: med.barra.fundo }
    l.desenho = d && { viewBox: d.viewBox, caixa: [r2(d.caixa.esquerda), r2(d.caixa.topo), r2(d.caixa.largura), r2(d.caixa.altura)], elementos: d.elementos.length }
    l.navegacao = n && { caixa: [r2(n.caixa.esquerda), r2(n.caixa.topo), r2(n.caixa.largura), r2(n.caixa.altura)], baixo: r2(n.caixa.baixo), quantas: n.quantas, toque: n.toque, porCima: n.porCima, ...(n.quemCobre.length ? { quemCobre: n.quemCobre } : {}) }
    l.embaixo = med.embaixo && { quem: med.embaixo.quem, topo: r2(med.embaixo.topo), como: med.embaixo.como }
    if (med.porCima.length) l.porCima = med.porCima
    if (med.soDoLeitor.length) l.soDoLeitor = med.soDoLeitor
    l.pedidosParaFora = fora
    l.referencia = barrasDaReferencia(it.html)
    l.ok = {
      a_referenciaComOsDesenhos: l.referencia.barra && l.referencia.navegacao,
      a_desenhoOficialEmCima: !!d && d.viewBox === NORMA.recorte && igual(d.elementos, OFICIAL.barra) && d.mudo === 'true',
      a_360por30: !!d && perto(d.caixa.esquerda, 0) && perto(d.caixa.topo, 0) && perto(d.caixa.largura, 360, 0.05) && perto(d.caixa.altura, NORMA.barra, 0.05),
      a_imagemPraOLeitor: med.barra.papel === 'img' && med.barra.rotulo === NORMA.rotulo && med.barra.texto === '',
      a_altura30: perto(med.barra.altura, NORMA.barra) && perto(med.barra.topo, 0),
      a_embaixoEm30: !!med.embaixo && perto(med.embaixo.topo, NORMA.barra),
      a_navegacaoOficial: !!n && n.quantas === 1 && n.viewBox === '0 0 412 24' && igual(n.elementos, OFICIAL.navegacao),
      a_navegacaoNoPe: !!n && perto(n.caixa.esquerda, 0) && perto(n.caixa.largura, 360, 0.05) && perto(n.caixa.altura, NORMA.navegacao, 0.05) && perto(n.caixa.baixo, 0, 0.05),
      a_navegacaoPorCimaDeTudo: !!n && n.porCima.every(Boolean),
      a_navegacaoSemToqueEMuda: !!n && n.toque === 'none' && n.mudo === 'true',
      b_nadaDaInternet: fora.length === 0,
    }
    l.passa = Object.values(l.ok).every(Boolean)
    linhas.push(l)
    if (!l.passa) console.log(`  ✘ ${it.id} · ${Object.entries(l.ok).filter(([, v]) => !v).map(([k]) => k).join(', ')} · barra ${l.barra.altura} no ${l.barra.topo} · embaixo ${l.embaixo?.quem} em ${l.embaixo?.topo}${n?.quemCobre.length ? ` · a navegação coberta por ${n.quemCobre.join(', ')}` : ''}`)
  }
  const conta = (k) => linhas.filter((l) => l.ok?.[k]).length
  const medidas = linhas.filter((l) => !l.foraDoCiclo)
  const resumo = { referencias: linhas.length, medidas: medidas.length, foraDoCiclo: linhas.filter((l) => l.foraDoCiclo).map((l) => `${l.id}: ${l.foraDoCiclo} · medido: ${l.medido} («${l.texto}»)`),
    erros: linhas.filter((l) => l.erro).length, passam: linhas.filter((l) => l.passa).length }
  for (const k of ['a_referenciaComOsDesenhos', 'a_desenhoOficialEmCima', 'a_360por30', 'a_imagemPraOLeitor', 'a_altura30', 'a_embaixoEm30', 'a_navegacaoOficial', 'a_navegacaoNoPe', 'a_navegacaoPorCimaDeTudo', 'a_navegacaoSemToqueEMuda', 'b_nadaDaInternet']) resumo[k] = `${conta(k)} de ${medidas.length}`
  // o que vem embaixo, por peça, e os fundos da barra (pra ler de uma vez)
  const porPeca = {}; for (const l of linhas) if (l.embaixo) { const k = l.embaixo.quem + (l.embaixo.como === 'no fluxo' ? '' : ' (por cima da tela)'); porPeca[k] = (porPeca[k] || 0) + 1 }
  resumo.oQueVemEmbaixo = porPeca
  const fundos = {}; for (const l of linhas) if (l.barra) fundos[l.barra.fundo] = (fundos[l.barra.fundo] || 0) + 1
  resumo.fundosDaBarra = fundos
  resumo.tituloSoDoLeitorNaFaixa = [...new Set(linhas.flatMap((l) => l.soDoLeitor ?? []))].map((k) => `${k} (${linhas.filter((l) => l.soDoLeitor?.includes(k)).length})`)
  resumo.comAlgoPorCimaDaBarra = linhas.filter((l) => l.porCima).map((l) => `${l.id}: ${l.porCima.join(', ')}`)
  resumo.desenhoOficial = { barra: `${OFICIAL.barra.length} elementos, no recorte ${NORMA.recorte}`, navegacao: `${OFICIAL.navegacao.length} elemento, no 0 0 412 24` }
  return { resumo, linhas }
}

// ─── (c), (d), (e): a moldura, o centro e a coluna no palco largo ─────────────
const MEDE_PALCO = `(() => {
  const cel = document.querySelector('.celular'); if (!cel) return { erro: 'sem o celular' }
  const tela = cel.querySelector('.celular-tela'), col = document.querySelector('.coluna')
  const cx = (e) => { const b = e.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height, direita: b.right, baixo: b.bottom } }
  const cs = getComputedStyle(cel), ts = getComputedStyle(tela)
  const lados = (p) => ['Top', 'Right', 'Bottom', 'Left'].map((l) => cs[p.replace('#', l)])
  const cantos = (s) => ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'].map((c) => s['border' + c + 'Radius'])
  const filhos = col ? [...col.children].map(cx) : []
  return { W: innerWidth, H: innerHeight, transform: cs.transform, celular: cx(cel), tela: cx(tela), coluna: col ? cx(col) : null,
    conteudoDaColuna: filhos.length ? { y: filhos[0].y, baixo: filhos.at(-1).baixo } : null,
    borda: { larguras: lados('border#Width'), cores: lados('border#Color'), estilo: cs.borderTopStyle },
    recheio: lados('padding#'), fundo: cs.backgroundColor, boxSizing: cs.boxSizing,
    raioFora: cantos(cs), raioTela: cantos(ts), fios: cs.boxShadow, painelAberto: !!document.querySelector('.painel-aberto'),
    // o resto das medidas da folha 00 (MEDIDAS E CORES, MOVIMENTO): o fundo, a coluna, o painel
    folha: (() => { const p = document.querySelector('.painel'), lp = document.querySelector('.painel-linha'), cab = document.querySelector('.painel-cabeca'), lc = document.querySelector('.coluna-linha')
      return { estados: col ? col.querySelectorAll('[role=radio]').length : 0, fundo: getComputedStyle(document.body).backgroundColor, colunaLargura: col ? col.getBoundingClientRect().width : null, linhaDaColuna: lc ? lc.getBoundingClientRect().height : null,
        painel: p ? { largura: p.getBoundingClientRect().width, fundo: getComputedStyle(p).backgroundColor, cabeca: cab ? cab.getBoundingClientRect().height : null, linha: lp ? lp.getBoundingClientRect().height : null, transicao: getComputedStyle(p).transition } : null } })() }
})()`

function confereMoldura(m) {
  const px = (v) => parseFloat(v), N = NORMA.moldura, c = m.celular, t = m.tela
  const escala = m.transform === 'none' ? 1 : +(m.transform.match(/matrix\(([^,]+)/)?.[1] ?? NaN)
  const folgas = { esquerda: r2(c.x), direita: r2(m.W - c.direita), cima: r2(c.y), baixo: r2(m.H - c.baixo) }
  const conf = {
    c_porFora: { norma: N.fora, medido: [r2(c.w), r2(c.h)] },
    c_tela: { norma: N.tela, medido: [r2(t.w), r2(t.h)] },
    c_semMetal: { norma: 'nenhuma borda de CSS: a silhueta é o recheio', medido: m.borda.larguras.join(' ') },
    c_borda: { norma: `${N.borda} nos 4 lados, ${N.bordaCor}`, medido: `${m.recheio.join(' ')} · ${m.fundo}` },
    c_telaDentroDaBorda: { norma: [N.borda, N.borda], medido: [r2(t.x - c.x), r2(t.y - c.y)] },
    c_cantoFora: { norma: `${N.raioFora} nos 4 cantos`, medido: m.raioFora.join(' ') },
    c_cantoTela: { norma: `${N.raioTela} nos 4 cantos (36 − 8: concêntrico)`, medido: m.raioTela.join(' ') },
    c_sombras: { norma: N.sombras, medido: m.fios },
    c_fundoDoPalco: { norma: `${N.fundo} (--fundo-faixa)`, medido: m.folha.fundo },
    c_escala: { norma: 1, medido: escala },
    d_centroHorizontal: { norma: 'esquerda = direita', medido: `${folgas.esquerda} · ${folgas.direita}` },
    d_centroVertical: { norma: 'cima = baixo', medido: `${folgas.cima} · ${folgas.baixo}` },
  }
  const ok = {
    c_porFora: perto(c.w, N.fora[0]) && perto(c.h, N.fora[1]),
    c_tela: perto(t.w, N.tela[0]) && perto(t.h, N.tela[1]),
    c_semMetal: m.borda.larguras.every((v) => px(v) === 0),
    c_borda: m.recheio.every((v) => px(v) === N.borda) && m.fundo === N.bordaCor,
    c_telaDentroDaBorda: perto(t.x - c.x, N.borda) && perto(t.y - c.y, N.borda),
    c_cantoFora: m.raioFora.every((v) => px(v) === N.raioFora),
    c_cantoTela: m.raioTela.every((v) => px(v) === N.raioTela),
    c_sombras: m.fios === N.sombras,
    c_fundoDoPalco: m.folha.fundo === N.fundo,
    c_escala: escala === 1,
    d_centroHorizontal: perto(folgas.esquerda, folgas.direita),
    d_centroVertical: perto(folgas.cima, folgas.baixo),
  }
  if (m.coluna) {
    const co = m.coluna
    conf.e_colunaA40 = { norma: NORMA.coluna.distancia, medido: r2(co.x - c.direita) }
    conf.e_colunaComAAlturaDoCelular = { norma: `${NORMA.coluna.altura}, no topo do celular`, medido: `${r2(co.h)}, no ${r2(co.y)} (o celular no ${r2(c.y)})` }
    conf.e_conteudoNoMeio = { norma: 'o conteúdo no meio da altura do celular', medido: `${r2(m.conteudoDaColuna.y - co.y)} em cima · ${r2(co.baixo - m.conteudoDaColuna.baixo)} embaixo` }
    ok.e_colunaA40 = perto(co.x - c.direita, NORMA.coluna.distancia)
    ok.e_colunaComAAlturaDoCelular = perto(co.h, NORMA.coluna.altura) && perto(co.h, c.h) && perto(co.y, c.y)
    ok.e_conteudoNoMeio = perto(m.conteudoDaColuna.y - co.y, co.baixo - m.conteudoDaColuna.baixo, 1)
  }
  return { folgas, conjunto: m.coluna ? { esquerda: r2(c.x), direita: r2(m.W - m.coluna.direita), nota: 'só informa: pelo palco.md, é o celular que fica no centro, e a coluna fica ao lado dele' } : null, conf, ok }
}

async function palcoLargo() {
  const linhas = []
  for (const [w, h] of JANELAS) {
    await janela(w, h)
    for (const q of MODOS) {
      await abre(BASE + q.url, { pronto: `!!document.querySelector('.celular .celular-tela .app')` }); await quieto()
      const m = await avalia(MEDE_PALCO)
      if (m.erro) { linhas.push({ janela: [w, h], modo: q.ref, erro: m.erro }); continue }
      const r = confereMoldura(m)
      linhas.push({ janela: [w, h], modo: q.ref, endereco: q.url, celular: [r2(m.celular.x), r2(m.celular.y), r2(m.celular.w), r2(m.celular.h)], coluna: m.coluna && [r2(m.coluna.x), r2(m.coluna.y), r2(m.coluna.w), r2(m.coluna.h)], painelAberto: m.painelAberto, folha: m.folha, ...r, passa: Object.values(r.ok).every(Boolean) })
    }
    // o painel aberto não mexe o celular nem a coluna: a T07 com e sem o painel
    await abre(BASE + '?tela=T07', { pronto: `!!document.querySelector('.celular .celular-tela .app')` }); await quieto()
    const sem = await avalia(MEDE_PALCO), com = linhas.find((l) => l.janela[0] === w && l.modo === '04-painel-aberto')
    const lugar = (m) => [r2(m.celular.x), r2(m.celular.y), r2(m.coluna.x), r2(m.coluna.y)]
    linhas.push({ janela: [w, h], modo: 'o painel não mexe', norma: 'o celular e a coluna no mesmo lugar, com e sem o painel', medido: { semPainel: lugar(sem), comPainel: [...com.celular.slice(0, 2), ...com.coluna.slice(0, 2)] },
      passa: JSON.stringify(lugar(sem)) === JSON.stringify([...com.celular.slice(0, 2), ...com.coluna.slice(0, 2)]) })
  }
  // D3 (o pacote 4): numa janela baixa, a moldura escala junto com a tela — a borda, o canto e a tela proporcionais —,
  // e numa janela alta, nunca maior que o real
  for (const [w, h] of [[1440, 700], [1440, 1400]]) {
    await janela(w, h)
    await abre(BASE + '?tela=T04', { pronto: `!!document.querySelector('.celular .celular-tela .app')` }); await quieto()
    const m = await avalia(MEDE_PALCO), N = NORMA.moldura
    const s = Math.min(1, (h - 48) / N.fora[1]), escala = m.transform === 'none' ? 1 : +(m.transform.match(/matrix\(([^,]+)/)?.[1] ?? NaN)
    const medido = { escala: r2(escala), porFora: [r2(m.celular.w), r2(m.celular.h)], tela: [r2(m.tela.w), r2(m.tela.h)], borda: r2(m.tela.x - m.celular.x),
      cantos: [m.raioFora[0], m.raioTela[0]] }
    const norma = { escala: r2(s), porFora: [r2(N.fora[0] * s), r2(N.fora[1] * s)], tela: [r2(N.tela[0] * s), r2(N.tela[1] * s)], borda: r2(N.borda * s),
      cantos: [`${N.raioFora}px`, `${N.raioTela}px`] }
    linhas.push({ janela: [w, h], modo: 'a moldura escala junto', norma, medido,
      passa: perto(escala, s, 0.001) && escala <= 1 && perto(medido.porFora[0], norma.porFora[0]) && perto(medido.porFora[1], norma.porFora[1])
        && perto(medido.tela[0], norma.tela[0]) && perto(medido.tela[1], norma.tela[1]) && perto(medido.borda, norma.borda, 0.1) && JSON.stringify(medido.cantos) === JSON.stringify(norma.cantos) })
  }
  // o quadro a 90%, pra ler do lado (a norma é o tamanho real): o mesmo centro e a coluna a 40, com a altura dele
  await janela(1440, 900)
  const quadros = []
  for (const q of MODOS) {
    await abre('file://' + resolve(REF_PALCO, 'html', q.ref + '.html'))
    quadros.push({ quadro: q.ref, ...(await avalia(`(() => {
      const fr = [...document.querySelectorAll('div')].find((e) => e.children.length === 1 && e.firstElementChild.tagName === 'IMG'); if (!fr) return { erro: 'sem o celular' }
      const c = fr.getBoundingClientRect(), s = getComputedStyle(fr), col = [...document.querySelectorAll('div')].find((e) => e.style.width === '230px' && e.style.justifyContent === 'center')
      const k = col && col.getBoundingClientRect(), W = 1440, H = 900
      return { celular: [c.x, c.y, c.width, c.height], folgas: { esquerda: c.x, direita: W - c.right, cima: c.y, baixo: H - c.bottom },
        borda: s.paddingTop, cantos: [s.borderTopLeftRadius, getComputedStyle(fr.firstElementChild).borderTopLeftRadius],
        coluna: k ? { distancia: k.x - c.right, altura: k.height, topo: k.y, estados: col.querySelectorAll('[role=radio]').length } : null }
    })()`)) })
  }
  return { linhas, quadrosA90: quadros }
}

// ─── (f): a T16, a T06 e a T12 ────────────────────────────────────────────────
// no app, o miolo é o .tela-miolo da tela; no HTML da referência, o filho que cresce do quadro de 360 × 800
const ACHA_MIOLO_APP = `document.querySelector('.celular-tela .tela-miolo')`
const ACHA_MIOLO_REF = `(() => { const q = [...document.body.querySelectorAll('div')].find((e) => e.style.width === '360px' && e.style.height === '800px'); return q && [...q.children].find((e) => parseFloat(getComputedStyle(e).flexGrow) > 0) })()`
const MEDE_VAOS = (achar) => `(() => {
  const m = ${achar}; if (!m) return { erro: 'sem o miolo' }
  const filhos = [...m.children].filter((e) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return cs.display !== 'none' && cs.position !== 'absolute' && r.height > 0 })
  const quem = (e) => (typeof e.className === 'string' && e.className.trim() ? e.className.trim().split(/\\s+/)[0] : e.tagName.toLowerCase())
  const cs = getComputedStyle(m)
  return { gap: cs.rowGap, rola: m.scrollHeight > m.clientHeight + 1, blocos: filhos.map(quem),
    vaos: filhos.slice(1).map((e, i) => Math.round((e.getBoundingClientRect().top - filhos[i].getBoundingClientRect().bottom) * 100) / 100) }
})()`
const MEDE_RODAPE = (achar, app) => `(() => {
  const m = ${achar}; if (!m) return { erro: 'sem o miolo' }
  const rod = ${app ? `document.querySelector('.celular-tela .ds-rodape')` : 'm.nextElementSibling'}; if (!rod) return { erro: 'sem o rodapé' }
  const filhos = [...m.children].filter((e) => { const cs = getComputedStyle(e); return cs.display !== 'none' && cs.position !== 'absolute' && e.getBoundingClientRect().height > 0 })
  const ultimo = filhos.at(-1), quem = (e) => (typeof e.className === 'string' && e.className.trim() ? e.className.trim().split(/\\s+/).slice(0, 2).join(' ') : e.tagName.toLowerCase())
  const mede = () => Math.round((rod.getBoundingClientRect().top - ultimo.getBoundingClientRect().bottom) * 100) / 100
  const rola = m.scrollHeight > m.clientHeight + 1, noTopo = mede()
  m.scrollTop = m.scrollHeight
  const noFim = mede(); m.scrollTop = 0
  return { ultimo: quem(ultimo), margemDoUltimo: getComputedStyle(ultimo).marginBottom, recheioDoMiolo: getComputedStyle(m).paddingBottom, rola, noTopo, noFim }
})()`

async function telasDoAcabamento() {
  await janela(360, 800)
  const pasta = { T16: 'T16-sessao', T06: 'T06-selecionar-ativo', T12: 'T12-ultimas-instalacoes' }
  const endereco = (t, ref) => { const q = new URLSearchParams({ print: '1', tela: t }); const m = ref.match(/^\d\d-(estado|momento)-/); if (m) q.set(m[1], ref); return `${BASE}?${q}` }
  const refHtml = (t, ref) => 'file://' + resolve(raiz, '02-telas', pasta[t], 'referencias/html', ref + '.html')
  const t16 = []
  for (const ref of ['00-tela', '01-momento-pede-o-corte-de-alimentacao', '02-momento-sessao-encerrada', '03-momento-encerrando-sem-homologar', '04-momento-encerrada-sem-homologar', '05-estado-assertiva-falhando', '06-estado-sessao-interrompida']) {
    await abre(endereco('T16', ref), { pronto: `!!${ACHA_MIOLO_APP}` }); const a = await avalia(MEDE_VAOS(ACHA_MIOLO_APP))
    await abre(refHtml('T16', ref)); const h = await avalia(MEDE_VAOS(ACHA_MIOLO_REF))
    t16.push({ ref: `T16/${ref}`, app: a, referencia: h, passa: !a.erro && a.vaos.length > 0 && a.vaos.every((v) => perto(v, NORMA.t16Vao)) })
  }
  const folga = []
  // a T06 do pacote 1: a 02 e a 07 (o chassi e a correção) saíram. O vínculo (01, 10, 11) não entra: ele fecha com os
  // dados do modelo, que levam os 16 do antesDoRodape por cima dos 16 do miolo — 32, iguais aos das três referências
  // (medido no pacote 1) —, e não com o último grupo de uma lista
  for (const [t, ref] of [['T06', '00-tela'], ['T12', '00-tela'], ['T12', '03-estado-sem-rede']]) {
    await abre(endereco(t, ref), { pronto: `!!${ACHA_MIOLO_APP} && !!document.querySelector('.celular-tela .ds-rodape')` }); const a = await avalia(MEDE_RODAPE(ACHA_MIOLO_APP, true))
    await abre(refHtml(t, ref)); const h = await avalia(MEDE_RODAPE(ACHA_MIOLO_REF, false))
    // a folga que o desenho põe é o recheio do miolo mais a margem do último: 16 + 0. Ela se vê inteira quando o
    // conteúdo enche o miolo — no fim da rolagem da lista que rola; na que não rola, sobra espaço, e o que se mede é
    // essa folga mais o que sobra, que tem de ser o mesmo da referência
    const estrutural = a.erro ? null : parseFloat(a.recheioDoMiolo) + parseFloat(a.margemDoUltimo)
    const passa = !a.erro && parseFloat(a.margemDoUltimo) === 0 && perto(estrutural, NORMA.folgaRodape)
      && (a.rola ? perto(a.noFim, NORMA.folgaRodape) : a.noFim >= NORMA.folgaRodape - 0.5 && !h.erro && perto(a.noFim, h.noFim))
    folga.push({ ref: `${t}/${ref}`, folgaDoDesenho: estrutural, app: a, referencia: h, passa })
  }
  return { t16, folgaAntesDoRodape: folga }
}

// ─── as fotos: os quatro modos e as peças da folha 00 ──────────────────────────
// o aviso do acesso: na chegada ao menu, a semente mostra "Seu acesso vence em 2 dias" (02-telas/T04-menu/tela.md:
// "o pulo do palco pro menu também mostra o aviso"). O quadro desenha o menu sem nada por cima (a T04/00): a foto
// é depois do Entendi, o toque que o técnico faria
async function tiraOAviso() {
  const c = await avalia(`(() => { const b = [...document.querySelectorAll('.celular-tela button')].find((e) => e.textContent.trim() === 'Entendi'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`)
  if (!c) return false
  for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: c.x, y: c.y, button: 'left', buttons: type === 'mousePressed' ? 1 : 0, clickCount: 1 }, S)
  await dorme(100); await quieto()
  const t0 = performance.now()
  while (await avalia(`[...document.querySelectorAll('.celular-tela button')].some((e) => e.textContent.trim() === 'Entendi')`) && performance.now() - t0 < 3000) await dorme(80)
  await avalia(`new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => r(true), 300))))`)
  return true
}
async function fotoDoModo(q) {
  for (let i = 0; i < 3; i++) {
    await abre(BASE + q.url, { pronto: `!!document.querySelector('.celular .celular-tela .app')`, respiro: 600 }); await quieto()
    let aviso = null
    if (await avalia(`[...document.querySelectorAll('.celular-tela button')].some((e) => e.textContent.trim() === 'Entendi')`)) {
      await fotografa(resolve(FOTOS, q.ref + '-com-o-aviso-app.png'))
      aviso = { foto: `prints/provas-palco/${q.ref}-com-o-aviso-app.png`, o_que: 'na chegada ao menu, a semente mostra o aviso do acesso (T04 tela.md); a foto do lado a lado é depois do Entendi, o menu sem nada por cima, como o quadro desenha', tirado: await tiraOAviso() }
    }
    const png = await fotografa(resolve(FOTOS, q.ref + '-app.png'))
    if (!preta(png)) return { foto: `prints/provas-palco/${q.ref}-app.png`, tamanho: [png.width, png.height], tentativas: i + 1, ...(aviso ? { aviso } : {}) }
  }
  return { erro: 'a foto saiu preta três vezes' }
}
const caixa = (sel, fora = 0) => `(() => { const e = ${sel}; if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x - ${fora}, y: r.y - ${fora}, width: r.width + 2 * ${fora}, height: r.height + 2 * ${fora} } })()`
const colunaInteira = `(() => { const f = [...document.querySelectorAll('.coluna > *')].map((e) => e.getBoundingClientRect()); if (!f.length) return null; const x = Math.min(...f.map((r) => r.x)); return { x, y: f[0].y, width: Math.max(...f.map((r) => r.right)) - x, height: f.at(-1).bottom - f[0].y } })()`
const linhaDoPainel = (t) => `[...document.querySelectorAll('.painel-linha')].find((e) => e.querySelector('.painel-codigo')?.textContent === '${t}')`
const redondo = (c) => c && { x: Math.floor(c.x), y: Math.floor(c.y), width: Math.ceil(c.x + c.width) - Math.floor(c.x), height: Math.ceil(c.y + c.height) - Math.floor(c.y) }

async function pecasDaFolha() {
  const pecas = {}
  const guarda = async (nome, clip, como) => { if (!clip) { pecas[nome] = { erro: 'não achei a peça', como }; return } const c = redondo(clip); await fotografa(resolve(FOTOS, `00-${nome}.png`), c); pecas[nome] = { foto: `prints/provas-palco/00-${nome}.png`, caixa: [c.x, c.y, c.width, c.height], como } }
  const pronto = { pronto: `!!document.querySelector('.celular .celular-tela .app')`, respiro: 500 }
  await janela(1440, 900)
  // o quadrado: normal, pressionado (o botão apertado, sem soltar em cima dele) e com o foco do teclado
  await abre(BASE + '?tela=T04', pronto); await quieto()
  await guarda('quadrado-normal', await avalia(caixa(`document.querySelector('.palco-quadrado')`, 4)), '?tela=T04 · o quadrado')
  const q = await avalia(caixa(`document.querySelector('.palco-quadrado')`))
  await cdp('Input.dispatchMouseEvent', { type: 'mouseMoved', x: q.x + q.width / 2, y: q.y + q.height / 2 }, S)
  await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', x: q.x + q.width / 2, y: q.y + q.height / 2, button: 'left', buttons: 1, clickCount: 1 }, S)
  await avalia(`new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))`)
  await guarda('quadrado-pressionado', { ...q, x: q.x - 4, y: q.y - 4, width: q.width + 8, height: q.height + 8 }, '?tela=T04 · o quadrado com o botão apertado')
  // solta longe dele (no fundo do palco): não abre o painel
  await cdp('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 200, y: 700, button: 'left', buttons: 1 }, S)
  await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 200, y: 700, button: 'left', buttons: 0, clickCount: 1 }, S)
  await abre(BASE + '?tela=T04', pronto); await quieto()
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }, S); await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }, S)
  const foco = await avalia(`document.activeElement?.classList.contains('palco-quadrado') && document.activeElement.matches(':focus-visible')`)
  await avalia(`new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))`)
  await guarda('quadrado-foco', await avalia(caixa(`document.querySelector('.palco-quadrado')`, 6)), `?tela=T04 · o quadrado com o foco do Tab${foco ? '' : ' (o foco NÃO ficou nele)'}`)
  // a linha do painel: normal (o painel aberto noutra tela), pressionada e a da tela aberta
  await abre(BASE + '?tela=T04&painel=1', pronto); await quieto()
  await guarda('linha-normal', await avalia(caixa(linhaDoPainel('T07'))), '?tela=T04&painel=1 · a linha da T07')
  const l = await avalia(caixa(linhaDoPainel('T07')))
  await cdp('Input.dispatchMouseEvent', { type: 'mouseMoved', x: l.x + 60, y: l.y + l.height / 2 }, S)
  await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', x: l.x + 60, y: l.y + l.height / 2, button: 'left', buttons: 1, clickCount: 1 }, S)
  await avalia(`new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))`)
  await guarda('linha-pressionada', l, '?tela=T04&painel=1 · a linha da T07 com o botão apertado')
  await cdp('Input.dispatchMouseEvent', { type: 'mouseMoved', x: l.x + 60, y: 880, button: 'left', buttons: 1 }, S)
  await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', x: l.x + 60, y: 880, button: 'left', buttons: 0, clickCount: 1 }, S)
  await abre(BASE + '?tela=T07&painel=1', pronto); await quieto()
  await guarda('linha-aberta', await avalia(caixa(linhaDoPainel('T07'))), '?tela=T07&painel=1 · a linha da T07, a tela aberta')
  // a coluna, como a folha do pacote 1 desenha: no fluxo e num estado (a T04, no Módulo com falha), a da T07 em
  // grupos (O módulo e A CAN) e a tela sem estados
  await abre(BASE + '?tela=T04', pronto); await quieto(); await tiraOAviso(); await guarda('coluna-no-fluxo', await avalia(colunaInteira), '?tela=T04 · a coluna no fluxo')
  await abre(BASE + '?tela=T04&estado=03-estado-faixa-modulo-com-falha', pronto); await quieto(); await guarda('coluna-num-estado', await avalia(colunaInteira), '?tela=T04&estado=03-estado-faixa-modulo-com-falha · a coluna num estado')
  await abre(BASE + '?tela=T07', pronto); await quieto(); await guarda('coluna-T07', await avalia(colunaInteira), '?tela=T07 · a coluna em grupos')
  // a tela sem estados (palco.md: a coluna não aparece): desde que a T08 saiu, no pacote 1, nenhuma tela do índice fica
  // sem estado. A folha diz "T01 e T02 não mostram coluna", mas a T01 tem 8 estados e a T02 tem 4 no índice, e o palco
  // mostra a coluna das duas (o PALCO-N2 do C0: "tela sem estado de condição" só existe no quadro 00). A foto é o lugar
  // da coluna na T01
  const semColuna = {}
  for (const t of ['T01', 'T02']) {
    await abre(BASE + `?tela=${t}`, pronto); await quieto()
    semColuna[t] = await avalia(`(() => { const c = document.querySelector('.celular').getBoundingClientRect(); return { tem: !!document.querySelector('.coluna'), estados: document.querySelectorAll('.coluna [role=radio]').length, x: c.right + 40, y: c.y + c.height / 2 - 77, width: 264, height: 154 } })()`)
    if (t === 'T01') await guarda('sem-coluna', semColuna.T01, `?tela=T01 · 40 à direita do celular: ${semColuna.T01.tem ? 'TEM coluna' : 'nenhuma coluna'}`)
  }
  pecas.semColuna = Object.fromEntries(Object.entries(semColuna).map(([t, v]) => [t, v.tem ? `mostra a coluna, com ${v.estados} estados` : 'sem coluna']))
  // o celular em miniatura: o palco numa janela em que a escala dá a altura da miniatura da folha (321 + 48)
  // a folha 00: onde cada espécime, cada rótulo e cada legenda cai (o lado a lado põe as peças do palco nesse lugar)
  await janela(1440, 1760)
  await abre('file://' + resolve(REF_PALCO, 'html', '00-componentes.html'))
  pecas.folha = await avalia(`(() => {
    const cx = (e) => { const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map((v) => Math.round(v * 100) / 100) }
    const divs = [...document.querySelectorAll('div')], spans = [...document.querySelectorAll('span')]
    const rotulos = spans.filter((e) => e.style.letterSpacing === '1.6px' && e.style.fontSize === '10px' && !e.closest('[style*="dashed"]')).map((e) => ({ texto: e.textContent.trim(), caixa: cx(e) }))
    const quadrados = spans.filter((e) => e.style.width === '44px' && e.style.height === '44px').map(cx)
    const linhas = divs.filter((e) => e.style.width === '280px' && e.style.height === '34px').map(cx)
    const tracejadas = divs.filter((e) => /dashed/.test(e.style.border)).map((e) => ({ caixa: cx(e), filhos: e.children.length, conteudo: e.children.length ? cx(e.firstElementChild) : null }))
    const ce = divs.find((e) => e.children.length === 1 && e.style.borderRadius === '22px')
    const tabelas = divs.filter((e) => e.style.border && /solid/.test(e.style.border) && e.getBoundingClientRect().width > 600 && e.getBoundingClientRect().y > 1200).map(cx)
    const titulo = spans.slice(0, 3).map((e) => ({ texto: e.textContent.trim(), caixa: cx(e), tam: e.style.fontSize }))
    return { quadrados, linhas, tracejadas, celular: ce ? cx(ce) : null, rotulos, tabelas, titulo }
  })()`)
  await janela(1440, 321 + 48)
  await abre(BASE + '?tela=T04', pronto); await quieto(); await tiraOAviso()
  await guarda('celular', await avalia(caixa(`document.querySelector('.celular')`, 2)), '?tela=T04 numa janela de 1440 × 369 · a escala (321/816) põe o celular na altura da miniatura')
  await janela(1440, 900)
  return pecas
}

// ─── o relatório em texto ────────────────────────────────────────────────────
function emTexto(r) {
  const L = []
  const s = (ok) => (ok ? 'OK    ' : 'FALHA ')
  L.push('AS PROVAS DO PALCO · o pacote 4 (as barras oficiais e a silhueta) · medidas no protótipo rodando (scripts/provas-palco.mjs)', '')
  if (r.barra) {
    const b = r.barra.resumo, todas = (k) => s(b[k]?.startsWith(b.medidas + ' '))
    L.push(`(a) AS BARRAS DO SISTEMA · ${b.referencias} referências do 02-telas/indice.json, pelo endereço do print, a 360 × 800 · ${b.medidas} medidas${b.foraDoCiclo.length ? `, ${b.foraDoCiclo.length} fora do ciclo` : ''}`)
    for (const f of b.foraDoCiclo) L.push(`       fora do ciclo: ${f}`)
    L.push(`       o desenho oficial: em cima, ${b.desenhoOficial.barra} · embaixo, ${b.desenhoOficial.navegacao}`)
    L.push(`${todas('a_referenciaComOsDesenhos')} a referência com os dois desenhos oficiais (a barra no recorte e a navegação no pé): ${b.a_referenciaComOsDesenhos}`)
    L.push(`${todas('a_desenhoOficialEmCima')} em cima, o desenho oficial, elemento por elemento, no viewBox 0 12.90 412 34.33: ${b.a_desenhoOficialEmCima}`)
    L.push(`${todas('a_360por30')} o desenho com 360 × 30, no canto de cima da tela: ${b.a_360por30}`)
    L.push(`${todas('a_imagemPraOLeitor')} uma imagem pro leitor, com o rótulo «9:30 · Wi-Fi, sinal e bateria», sem texto: ${b.a_imagemPraOLeitor}`)
    L.push(`${todas('a_altura30')} a barra com 30 de altura, no topo da tela: ${b.a_altura30}`)
    L.push(`${todas('a_embaixoEm30')} o primeiro elemento embaixo dela em y = 30: ${b.a_embaixoEm30}`)
    L.push(`       o que vem embaixo: ${Object.entries(b.oQueVemEmbaixo).map(([k, v]) => `${k} (${v})`).join(' · ')}`)
    L.push(`       o fundo da barra, o da tela: ${Object.entries(b.fundosDaBarra).map(([k, v]) => `${k} (${v})`).join(' · ')}`)
    if (b.tituloSoDoLeitorNaFaixa.length) L.push(`       na faixa da barra, só o título que o leitor de tela lê (1 × 1, recortado, ninguém vê): ${b.tituloSoDoLeitorNaFaixa.join(' · ')}`)
    L.push(`       por cima da faixa da barra, visível: ${b.comAlgoPorCimaDaBarra.length ? '' : 'nada, nas ' + b.medidas}`)
    if (b.comAlgoPorCimaDaBarra.length) L.push(`       por cima da faixa da barra (só informa): ${b.comAlgoPorCimaDaBarra.length} referências — ${b.comAlgoPorCimaDaBarra.slice(0, 4).join(' | ')}${b.comAlgoPorCimaDaBarra.length > 4 ? ' | …' : ''}`)
    L.push(`${todas('a_navegacaoOficial')} embaixo, a navegação por gestos oficial, uma só: ${b.a_navegacaoOficial}`)
    L.push(`${todas('a_navegacaoNoPe')} com 360 × 20,97, no pé da tela: ${b.a_navegacaoNoPe}`)
    L.push(`${todas('a_navegacaoPorCimaDeTudo')} por cima de tudo, inclusive das folhas e dos véus (o meio de cada terço dela cai nela): ${b.a_navegacaoPorCimaDeTudo}`)
    L.push(`${todas('a_navegacaoSemToqueEMuda')} sem receber toque e muda pro leitor: ${b.a_navegacaoSemToqueEMuda}`)
    L.push('', `(b) NADA DA INTERNET · as mesmas ${b.medidas}`)
    L.push(`${todas('b_nadaDaInternet')} nenhum pedido pra fora da máquina: ${b.b_nadaDaInternet}`)
    for (const l of r.barra.linhas.filter((x) => !x.passa && !x.foraDoCiclo)) L.push(`       ✘ ${l.id} · ${l.erro ?? Object.entries(l.ok).filter(([, v]) => !v).map(([k]) => k).join(', ')}`)
    L.push('')
  }
  if (r.palco) {
    L.push('(c) A MOLDURA · (d) O CENTRO · (e) A COLUNA · no palco largo, a 1440 × 900 e a 1920 × 1080, nos quatro modos; e a moldura que escala, a 1440 × 700 e a 1440 × 1400')
    for (const l of r.palco.linhas) {
      if (l.modo === 'a moldura escala junto') { L.push(`${s(l.passa)} ${l.janela.join(' × ')} · a moldura escala junto, nunca maior que o real (D3) · ${JSON.stringify(l.medido)}${l.passa ? '' : `  (pede ${JSON.stringify(l.norma)})`}`); continue }
      if (l.modo === 'o painel não mexe') { L.push(`${s(l.passa)} ${l.janela.join(' × ')} · o painel aberto não mexe o celular nem a coluna · sem ${l.medido.semPainel.join(', ')} · com ${l.medido.comPainel.join(', ')}`); continue }
      if (l.erro) { L.push(`FALHA  ${l.janela.join(' × ')} · ${l.modo} · ${l.erro}`); continue }
      L.push(`${s(l.passa)} ${l.janela.join(' × ')} · ${l.modo} (${l.endereco}) · o celular em ${l.celular.join(', ')}${l.coluna ? ` · a coluna em ${l.coluna.join(', ')}` : ''}`)
      for (const [k, v] of Object.entries(l.conf)) L.push(`         ${l.ok[k] ? '✔' : '✘'} ${k.slice(2)}: ${typeof v.medido === 'object' ? JSON.stringify(v.medido) : v.medido}${l.ok[k] ? '' : `  (pede ${typeof v.norma === 'object' ? JSON.stringify(v.norma) : v.norma})`}`)
      if (l.conjunto) L.push(`           (o conjunto celular + coluna, só informa: ${l.conjunto.esquerda} à esquerda · ${l.conjunto.direita} à direita)`)
    }
    L.push('       o quadro, a 90% (só informa: a norma é o tamanho real):')
    for (const q of r.palco.quadrosA90) L.push(`         ${q.quadro}: ${q.celular.slice(2).join(' × ')} em ${q.celular.slice(0, 2).join(', ')} · folgas ${Object.values(q.folgas).map(r2).join(' · ')} · borda ${q.borda}, canto ${q.cantos.join(' e ')}${q.coluna ? ` · a coluna a ${r2(q.coluna.distancia)}, com ${q.coluna.altura}` : ''}`)
    L.push('')
  }
  if (r.acabamento) {
    L.push('(f) A T16 · o vão de 14 entre os blocos do miolo (no app; e no HTML da referência, de lado)')
    for (const t of r.acabamento.t16) L.push(`${s(t.passa)} ${t.ref} · app: ${t.app.erro ?? `${t.app.vaos.join(' · ')} (gap ${t.app.gap}${t.app.rola ? ', rola' : ''})`} · referência: ${t.referencia.erro ?? t.referencia.vaos.join(' · ')}`)
    L.push('    A T06 e a T12 · 16 entre o último grupo e o rodapé, no fim da rolagem, com o último sem margem')
    for (const t of r.acabamento.folgaAntesDoRodape) L.push(`${s(t.passa)} ${t.ref} · a folga do desenho ${t.folgaDoDesenho} (o recheio do miolo ${t.app.recheioDoMiolo} + a margem do último, ${t.app.ultimo}, ${t.app.margemDoUltimo}) · medida: ${t.app.erro ?? (t.app.rola ? `${t.app.noFim} no fim da rolagem (${t.app.noTopo} no topo)` : `${t.app.noFim} (não rola: ${r2(t.app.noFim - t.folgaDoDesenho)} sobram)`)} · na referência: ${t.referencia.erro ?? `${t.referencia.noFim}${t.referencia.rola ? ` no fim (${t.referencia.noTopo} no topo)` : ''}, margem ${t.referencia.margemDoUltimo}`}`)
    L.push('')
  }
  if (r.fotos) {
    L.push('AS FOTOS · o palco a 1440 × 900, a 1× (a janela e a escala dos PNG do palco)')
    for (const [k, v] of Object.entries(r.fotos.modos)) L.push(`  ${k}: ${v.erro ?? v.foto}${v.aviso ? ` · ${v.aviso.o_que} (a de antes: ${v.aviso.foto})` : ''}`)
    for (const [k, v] of Object.entries(r.fotos.pecas ?? {})) if (v.foto || v.erro) L.push(`  00 · ${k}: ${v.erro ?? v.foto} · ${v.como}`)
    if (r.fotos.pecas?.semColuna) L.push(`  00 · a tela sem coluna: ${Object.entries(r.fotos.pecas.semColuna).map(([t, v]) => `${t} ${v}`).join(' · ')} (a folha diz que a T01 e a T02 não mostram coluna; desde o pacote 1, nenhuma tela fica sem estado)`)
    if (r.fotos.ladoALado) L.push(`  o lado a lado: ${r.fotos.ladoALado}`)
  }
  // o relatório escrito à mão no mesmo json (os achados pro arquiteto, os padrões, as pendências)
  if (r.relatorio) {
    L.push('', 'OS ACHADOS PRO ARQUITETO'); for (const a of r.relatorio.achados_pro_arquiteto ?? []) L.push('  ' + a)
    L.push('', 'OS PADRÕES ADOTADOS'); for (const a of r.relatorio.padroes_adotados ?? []) L.push('  ' + a)
    L.push('', 'AS PENDÊNCIAS'); for (const a of r.relatorio.pendencias ?? []) L.push('  ' + a)
  }
  return L.join('\n')
}

// ─── roda ─────────────────────────────────────────────────────────────────────
const saidaJson = resolve(RELATORIOS, 'palco-provas.json')
const anterior = existsSync(saidaJson) ? JSON.parse(readFileSync(saidaJson, 'utf8')) : {}
try {
  if (modo === 'tudo' || modo === 'medidas') {
    console.log('(a) (b) a barra de status nas referências do índice…'); resultado.barra = await barraNas145()
    console.log(`    ${resultado.barra.resumo.passam} de ${resultado.barra.resumo.referencias} passam`)
    console.log('(c) (d) (e) a moldura, o centro e a coluna…'); resultado.palco = await palcoLargo()
    console.log('(f) a T16, a T06 e a T12…'); resultado.acabamento = await telasDoAcabamento()
  } else Object.assign(resultado, { barra: anterior.barra, palco: anterior.palco, acabamento: anterior.acabamento })
  if (modo === 'tudo' || modo === 'fotos') {
    console.log('as fotos dos quatro modos…')
    await janela(1440, 900)
    const modos = {}; for (const q of MODOS) modos[q.ref] = await fotoDoModo(q)
    console.log('as peças da folha 00…')
    const pecas = await pecasDaFolha()
    resultado.fotos = { janela: [1440, 900], escala: 1, modos, pecas,
      nota: 'as referências desenham o celular a 90% (338,4 × 734,4, no topo a 82,8), com a coluna, o quadrado e o painel em tamanho real; o palco, a 1440 × 900, põe o celular em tamanho real (376 × 816, no topo a 42), porque a escala é a menor entre 1, (900 − 48)/816 e (1440 − 588)/376 — nunca maior que o real (palco.md). As fotos são o palco como ele roda nessa janela, sem reescalar' }
  } else resultado.fotos = anterior.fotos
} finally {
  await cdp('Target.closeTarget', { targetId }).catch(() => {})
  ws.close(); fechar()
}

// o lado a lado (Python, PIL): lê as fotos e as referências e grava em 06-prototipo/para-o-arquiteto/palco/
if (modo === 'tudo' || modo === 'fotos') {
  writeFileSync(resolve(FOTOS, 'medidas.json'), JSON.stringify({ palco: resultado.palco, fotos: resultado.fotos, barra: resultado.barra?.resumo }, null, 1))
  try {
    const out = execFileSync('python3', [resolve(app, 'scripts/provas-palco-lado-a-lado.py')], { encoding: 'utf8' })
    process.stdout.write(out); resultado.fotos.ladoALado = out.trim().split('\n').filter((l) => l.startsWith('gravado')).map((l) => l.replace('gravado ', '')).join(' · ')
  } catch (e) { resultado.fotos.ladoALado = 'ERRO: ' + (e.stderr || e.message) }
}

// o relatório de quem rodou (o que se construiu, os padrões, as pendências) é escrito à mão no mesmo arquivo: fica
if (anterior.relatorio) resultado.relatorio = anterior.relatorio
writeFileSync(saidaJson, JSON.stringify(resultado, null, 1))
const texto = emTexto(resultado)
writeFileSync(resolve(RELATORIOS, 'palco-provas.txt'), texto + '\n')
console.log('\n' + texto)
const falhas = [
  ...(resultado.barra?.linhas ?? []).filter((l) => !l.passa && !l.foraDoCiclo),
  ...(resultado.palco?.linhas ?? []).filter((l) => !l.passa),
  ...(resultado.acabamento?.t16 ?? []).filter((l) => !l.passa),
  ...(resultado.acabamento?.folgaAntesDoRodape ?? []).filter((l) => !l.passa),
]
console.log(falhas.length ? `\n${falhas.length} prova(s) não bateram · prints/tmp/relatorios/palco-provas.json` : '\nTODAS AS PROVAS BATEM · prints/tmp/relatorios/palco-provas.json')
process.exit(falhas.length ? 1 : 0)
