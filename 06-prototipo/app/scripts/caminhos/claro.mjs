// O pacote 30 · o modo claro, de ponta a ponta (leis R-16 a R-19): o app nasce escuro; na folha da
// Conta, a linha *Modo claro* liga o claro — a bolinha desliza e cresce (200) e o app inteiro troca as
// cores no lugar (300), com a folha aberta; desligar volta; recarregar com o claro ligado abre claro,
// o login também. Depois, a volta por TODAS as referências das 15 telas no claro, e em cada uma a
// varredura das cores que o navegador calculou: nenhuma cor que só o escuro tem (um valor escrito
// direto no código, ou um token resolvido no :root), nenhum texto ou ícone branco fora do botão
// principal (sumiria no branco) · e, onde aparecem, as barras do sistema na cor do texto, o véu preto
// a 32%, o primário roxo com o texto branco e o confere em roxo.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..')
const css = readFileSync(resolve(raiz, '03-design-system/tokens.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
const bloco = (sel) => { const i = css.indexOf(sel + ' {'); return css.slice(i, css.indexOf('}', i)) }
const cores = (t) => [...t.matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9A-Fa-f]{6}|rgba?\([^)]*\))\s*;/g)].map((m) => [m[1], m[2]])
const chave = (v) => v.startsWith('#')
  ? [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16)).join(',')
  : v.match(/\(([^)]*)\)/)[1].split(',').slice(0, 3).map((x) => +x).join(',')
const doClaro = new Set(cores(bloco('[data-tema="claro"]')).map(([, v]) => chave(v)))
// as cores do escuro que o claro não tem: se uma delas aparece no claro, ela não veio do token do tema
const SO_DO_ESCURO = [...new Set(cores(bloco(':root')).map(([, v]) => chave(v)))].filter((k) => !doClaro.has(k))

export const AUDITA = `
  const app = document.querySelector('.app'); if (!app) return 'sem o app'
  if (app.dataset.tema !== 'claro') return 'o app não está no claro'
  const ESCURO = new Set(${JSON.stringify(SO_DO_ESCURO)})
  const rgb = (c) => { const m = c && c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null
    const p = m[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number); return { k: p.slice(0, 3).join(','), a: p[3] ?? 1 } }
  const BRANCOS = new Set(['255,255,255', '242,240,247'])
  const ruins = []
  const nome = (el) => (el.className?.baseVal ?? el.className ?? el.tagName) + ''
  for (const el of [app, ...app.querySelectorAll('*')]) {
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue
    const texto = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    const svg = el instanceof SVGElement && el.tagName !== 'svg'
    const props = [['fundo', cs.backgroundColor]]
    if (texto) props.push(['texto', cs.color])
    if (svg) props.push(['fill', cs.fill], ['stroke', cs.stroke])
    for (const l of ['Top', 'Right', 'Bottom', 'Left']) if (parseFloat(cs['border' + l + 'Width']) > 0) props.push(['borda', cs['border' + l + 'Color']])
    for (const ps of ['::before', '::after']) {
      const p = getComputedStyle(el, ps); if (!p.content || p.content === 'none') continue
      props.push([ps, p.backgroundColor])
      for (const l of ['Top', 'Right', 'Bottom', 'Left']) if (parseFloat(p['border' + l + 'Width']) > 0) props.push([ps + ' borda', p['border' + l + 'Color']])
    }
    for (const [n, v] of props) {
      const c = rgb(v); if (!c || c.a === 0) continue
      if (ESCURO.has(c.k)) ruins.push(n + ' ' + v + ' em ' + nome(el).slice(0, 60))
      if ((n === 'texto' || ((n === 'fill' || n === 'stroke') && !el.closest('.ds-barra-sistema, .ds-navegacao-gestos'))) && BRANCOS.has(c.k) && !el.closest('.ds-primario'))
        ruins.push(n + ' branco ' + v + ' em ' + nome(el).slice(0, 60))
    }
  }
  const igual = (sel, prop, esperado, ps) => { const el = app.querySelector(sel); if (!el) return
    const v = getComputedStyle(el, ps)[prop]; if (v.replace(/\\s/g, '') !== esperado) ruins.push(sel + ' ' + prop + ' ' + v + ', esperava ' + esperado) }
  igual('.ds-barra-sistema path[fill="white"]', 'fill', 'rgb(26,22,37)')
  igual('.ds-navegacao-gestos [fill="white"]', 'fill', 'rgb(26,22,37)')
  igual('.ds-veu', 'backgroundColor', 'rgba(6,5,10,0.32)')
  igual('.ds-primario:not(.ds-primario-desabilitado)', 'backgroundColor', 'rgb(64,32,112)')
  igual('.ds-primario:not(.ds-primario-desabilitado)', 'color', 'rgb(255,255,255)')
  igual('.ds-glifo-cor-lima', 'color', 'rgb(91,58,153)')
  return ruins.length ? [...new Set(ruins)].slice(0, 6).join(' · ') : true`

const ESCURO_AGORA = `const a = document.querySelector('.app'); return a && !a.dataset.tema ? true : 'o app devia estar no escuro'`

// todas as referências das 15 telas, como o palco as abre (o momento ou o estado pelo endereço)
const telas = readdirSync(resolve(raiz, '02-telas')).filter((d) => /^T\d\d-/.test(d)).sort()
const VOLTA = telas.flatMap((pasta) => {
  const t = pasta.slice(0, 3)
  return readdirSync(resolve(raiz, '02-telas', pasta, 'referencias/html')).filter((f) => f.endsWith('.html')).sort().flatMap((f) => {
    const ref = f.replace(/\.html$/, ''); const m = ref.match(/^\d\d-(estado|momento)-/)
    return [{ abre: `?tela=${t}${m ? `&${m[1]}=${ref}` : ''}` }, { executa: AUDITA, rotulo: `${t}/${ref} no claro` }]
  })
})

export default [
  // o app nasce escuro (R-16): o aparelho nunca escolheu
  { abre: '?tela=T01' },
  { chega: 'T01' },
  { executa: ESCURO_AGORA },
  { abre: '?tela=T04' },
  { chega: 'T04' },
  { toca: 'Entendi' },                                   // o aviso do acesso vencendo, na primeira chegada ao menu
  { toca: 'Conta — Rafael Vieira' },
  { ve: 'Modo claro' },
  // ligar: a bolinha desliza e cresce em 200, e o app troca as cores no lugar em 300, com a folha aberta
  { toca: 'Modo claro', anima: [{ prop: 'transform', ms: 200, em: 'ds-interruptor-bolinha' }, { prop: 'background-color', ms: 300 }] },
  { executa: `const a = document.querySelector('.app'); const s = document.querySelector('.ds-interruptor');
    return a.dataset.tema === 'claro' && s.getAttribute('aria-checked') === 'true' ? true : 'o claro não ligou'` },
  { ve: 'Sair da conta' },
  { dorme: 400 },
  { executa: AUDITA, rotulo: 'a folha da Conta no claro' },
  // desligar volta
  { toca: 'Modo claro', anima: [{ prop: 'transform', ms: 200, em: 'ds-interruptor-bolinha' }, { prop: 'background-color', ms: 300 }] },
  { executa: ESCURO_AGORA },
  { dorme: 400 },
  { toca: 'Modo claro' },
  { dorme: 400 },
  // o aparelho lembra: recarregar abre claro, o login também
  { recarrega: true },
  { chega: 'T01' },
  { executa: AUDITA, rotulo: 'o login no claro, depois de recarregar' },
  ...VOLTA,
  // o roteiro devolve o aparelho como achou
  { executa: `localStorage.removeItem('mobs2-configurador.tema'); return true` },
]
