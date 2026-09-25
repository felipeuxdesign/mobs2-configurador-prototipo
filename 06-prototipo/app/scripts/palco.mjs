// A bancada do palco: os 5 quadros de 06-prototipo/palco/referencias contra o
// palco rodando, os dois no MESMO Chrome headless, a 1× (os PNG do palco são 1×):
// 1440 × 900, e o 00 (a folha das peças) em 1440 × 1760.
//
// O palco não é igual ao quadro inteiro, e isso é decidido (G19): o quadro desenha
// o celular a 90% (340 × 736, no topo a 50) com o PNG da referência dentro, e o
// palco põe o app em tamanho real, rodando, no centro; o quadrado fica a 16, e não
// a 24; e a etiqueta, que nenhum quadro desenha, fica no canto (PALCO-A14). Por isso
// a bancada compara **peça por peça**, cada uma no lugar onde caiu nos dois — o
// quadrado, a coluna (o conteúdo, que fica no meio da altura do celular), o painel —,
// e dá o quadro inteiro só de informação. O celular não entra: a tela dele é da
// régua das telas (scripts/tela.mjs), a 360 × 800.
// No 00, cada espécime da folha contra a mesma peça numa das fotos do palco.
// E os textos do painel e da coluna, na ordem, contra os do quadro (o palco não tem
// textos.md: o texto dele é o que o quadro escreve, G19).
// Cada diferença que se sabe de onde vem leva a nota (NOTAS, embaixo); a que não
// tem nota é defeito do palco.
//
// O lugar de cada peça sai medido dos dois lados: no palco, pelo ?medir=1
// (Palco.jsx escreve as caixas num <pre>); no quadro, por um script que vai numa
// cópia do HTML. Assim a bancada segue certa se o celular mudar de tamanho (C13).
//
// Uso (com o `npm run dev` rodando em :5173):
//   node scripts/palco.mjs                 → os 5 quadros; grava prints/palco/relatorio.json
//   node scripts/palco.mjs <base.json>     → e diz o que piorou contra essa base
// Saída: prints/palco/<quadro>-{html,app,diff}.png (o quadro inteiro) e
// <quadro>-<peça>-{html,app,diff}.png (cada peça), uma linha por peça.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { foto, dom, TMP } from './cromo.mjs'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
const REF = resolve(raiz, '06-prototipo/palco/referencias')
const OUT = resolve(app, 'prints/palco'); mkdirSync(OUT, { recursive: true })
const DEV = process.env.DEV || 'http://localhost:5173'
const W = 1440, H = 900, H00 = 1760

// os quadros e o lugar do palco que cada um desenha
const QUADROS = [
  { ref: '01-no-fluxo', url: '?tela=T04' },
  { ref: '02-num-estado', url: '?tela=T07&estado=01-estado-fora-da-faixa' },
  { ref: '03-tela-com-muitos-estados', url: '?tela=T05' },
  { ref: '04-painel-aberto', url: '?tela=T07&painel=1' },
]
// a linha normal do painel, que o 00 desenha com a T07: o painel aberto numa tela que não é a T07
const AUX = { ref: 'painel-noutra-tela', url: '?tela=T04&painel=1' }

// o que já se sabe que difere, peça a peça: a bancada mostra o número e diz por quê.
// A chave é "<quadro>/<peça>"; sem ela, vale a da peça. O texto só leva nota quando o quadro diz outra coisa.
const MARCADOR = 'o quadrado vazado de 11 por dentro (lei do marcador, decisão 15); o quadro desenha 11 mais a borda, 13'
const NOTAS = {
  'inteiro': 'o quadro inteiro só informa: o celular a 90% com o PNG dentro, o quadrado a 24 e sem etiqueta, contra o palco.md (G19, PALCO-A11, PALCO-A14)',
  'quadrado': 'o LayoutGrid do Lucide contra os quatro quadrados desenhados à mão (G5)',
  'painel': 'o X e o RotateCcw do Lucide, no traço 1,8, contra os desenhados à mão no traço 2 (G5)',
  'coluna': MARCADOR,
  '02-num-estado/coluna': MARCADOR + '; e o Undo2 do Lucide no Voltar ao fluxo (G5)',
  '01-no-fluxo/coluna': 'o quadro lista 2 dos 5 estados da T04; a coluna lista todos (PALCO-A4, PALCO-D3); e ' + MARCADOR,
  '03-tela-com-muitos-estados/coluna': 'o quadro põe o momento "Um encontrado" no grupo Achar; a coluna lista só os 11 estados (G19, PALCO-A7); o nome do grupo na tinta e na letra do rótulo de 10 (lei 11, PALCO-A15, PALCO-V4); e ' + MARCADOR,
  'coluna-no-fluxo': MARCADOR,
  'coluna-num-estado': MARCADOR + '; e o Undo2 do Lucide no Voltar ao fluxo (G5)',
  'coluna-T05': 'a lista dos grupos: a folha tem 10 estados, sem "Firmware fora · sem rede", e a coluna tem os 11 (PALCO-A7); o nome do grupo na tinta e na letra do rótulo de 10, e não em --marca-limite e 1,4 (lei 11, PALCO-A15, PALCO-V4); e ' + MARCADOR,
}
const notaDe = (nome, nomePeca) => NOTAS[`${nome}/${nomePeca}`] ?? NOTAS[nomePeca]
const NOTAS_TEXTO = {
  '01-no-fluxo/coluna': NOTAS['01-no-fluxo/coluna'].split('; e ')[0],
  '03-tela-com-muitos-estados/coluna': NOTAS['03-tela-com-muitos-estados/coluna'].split('; e ')[0],
}

// o script que vai no fim da cópia do quadro: mede as peças e escreve a medida.
// No 00, leva cada espécime ao pixel inteiro, como a bancada do C2 (a folha cai em y fracionário).
const SCRIPT = `<script>(()=>{new Promise(ok=>document.readyState==='complete'?ok():addEventListener('load',ok,{once:true}))
.then(()=>document.fonts.ready).then(()=>{
  const cx=(e)=>{if(!e)return null;const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}};
  const inteiro=(e)=>{const r=e.getBoundingClientRect(),dx=Math.round(r.x)-r.x,dy=Math.round(r.y)-r.y;if(dx||dy){e.style.position='relative';e.style.left=dx+'px';e.style.top=dy+'px'}return e};
  const conteudo=(el)=>{const f=[...el.children].map(cx);return f.length?{x:f[0].x,y:f[0].y,w:Math.max(...f.map(c=>c.w)),h:f.at(-1).y+f.at(-1).h-f[0].y}:null};
  const divs=[...document.querySelectorAll('div')], spans=[...document.querySelectorAll('span')];
  const m={W:innerWidth,H:innerHeight};
  if(document.title.includes('00-componentes')){
    m.quadrados=spans.filter(e=>e.style.width==='44px'&&e.style.height==='44px').map(inteiro).map(cx);
    m.linhas=divs.filter(e=>e.style.width==='280px'&&e.style.height==='34px').map(inteiro).map(cx);
    const cols=divs.filter(e=>/dashed/.test(e.style.border)&&e.children.length>1).map(inteiro);m.colunas=cols.map(conteudo);m.listas=cols.map(e=>cx(e.lastElementChild));
  }else{
    m.quadrado=cx(document.querySelector('a[aria-label="Telas do protótipo"]'));
    m.celular=cx(divs.find(e=>e.style.borderRadius==='34px'));
    const p=divs.find(e=>e.style.width==='280px'&&e.style.left==='0px');m.painel=cx(p);
    m.linhas=p?Object.fromEntries([...p.querySelectorAll('a[href^="#T"]')].map(a=>[a.firstElementChild.textContent.trim(),cx(a)])):{};
    const c=divs.find(e=>e.style.width==='230px'&&e.style.justifyContent==='center');m.coluna=cx(c);m.conteudo=c?conteudo(c):null;
    const textos=(e)=>{const l=[];if(!e)return l;const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(let n=w.nextNode();n;n=w.nextNode()){const t=n.textContent.replace(/\\s+/g,' ').trim();if(!t)continue;if(n.previousSibling&&n.previousSibling.nodeType===3&&l.length)l[l.length-1]=(l[l.length-1]+' '+t).trim();else l.push(t)}return l};
    m.textos={painel:textos(p),coluna:textos(c)};
  }
  const o=document.createElement('pre');o.id='m2cf-out';o.style.display='none';o.textContent=JSON.stringify(m);document.body.appendChild(o)})})()</script>`

const lerPre = (html) => {
  const m = html.match(/<pre id="m2cf-out"[^>]*>([\s\S]*?)<\/pre>/); if (!m) throw new Error('sem medida')
  return JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'))
}

// o quadro: uma cópia com o script de medida (a mesma na medida e na foto), as fontes pelo caminho inteiro
function quadro(nome, h) {
  const html = readFileSync(resolve(REF, 'html', nome + '.html'), 'utf8').replace(/(\.\.\/)+05-recursos\//g, 'file://' + raiz + '/05-recursos/')
  const tmp = resolve(TMP, `palco-${nome}-${process.pid}.html`)
  writeFileSync(tmp, html.replace('</body>', SCRIPT + '</body>'))
  try {
    const medida = lerPre(dom('file://' + tmp, { w: W, h }))
    foto('file://' + tmp, resolve(OUT, nome + '-html.png'), { w: W, h, escala: 1 })
    return { medida, png: PNG.sync.read(readFileSync(resolve(OUT, nome + '-html.png'))) }
  } finally { rmSync(tmp, { force: true }) }
}
// o palco, no mesmo lugar
function palco({ ref, url }) {
  const u = `${DEV}/${url}&medir=1`
  const medida = lerPre(dom(u, { w: W, h: H }))
  foto(u, resolve(OUT, ref + '-app.png'), { w: W, h: H, escala: 1 })
  return { medida, png: PNG.sync.read(readFileSync(resolve(OUT, ref + '-app.png'))) }
}

function recorta(png, x, y, w, h) {
  const out = new PNG({ width: w, height: h }) // o que cai fora da foto fica transparente, e conta como diferença
  const x0 = Math.max(0, x), y0 = Math.max(0, y), x1 = Math.min(png.width, x + w), y1 = Math.min(png.height, y + h)
  if (x1 > x0 && y1 > y0) PNG.bitblt(png, out, x0, y0, x1 - x0, y1 - y0, x0 - x, y0 - y)
  return out
}
const pct = (n, w, h) => +(100 * n / (w * h)).toFixed(2)
function difere(A, B, saida) {
  const { width: w, height: h } = A
  const diff = new PNG({ width: w, height: h })
  const fino = pixelmatch(A.data, B.data, diff.data, w, h, { threshold: 0.1 })
  const grosso = pixelmatch(A.data, B.data, null, w, h, { threshold: 0.5 })
  if (saida) writeFileSync(saida, PNG.sync.write(diff))
  return { fino: pct(fino, w, h), estrutural: pct(grosso, w, h) }
}
// uma peça: a caixa do quadro contra a do palco, com uma folga em volta (a peça fora do lugar aparece);
// o tamanho é o maior dos dois, pra peça que cresceu ou encolheu também aparecer
function peca(nome, nomePeca, A, ca, B, cb, folga = 8) {
  if (!ca || !cb) return { quadro: nome, peca: nomePeca, erro: `${!ca ? 'o quadro' : 'o palco'} não tem a peça` }
  const w = Math.round(Math.max(ca.w, cb.w)) + 2 * folga, h = Math.round(Math.max(ca.h, cb.h)) + 2 * folga
  const a = recorta(A, Math.round(ca.x) - folga, Math.round(ca.y) - folga, w, h)
  const b = recorta(B, Math.round(cb.x) - folga, Math.round(cb.y) - folga, w, h)
  const base = resolve(OUT, `${nome}-${nomePeca}`)
  writeFileSync(base + '-html.png', PNG.sync.write(a)); writeFileSync(base + '-app.png', PNG.sync.write(b))
  const r = { quadro: nome, peca: nomePeca, ...difere(a, b, base + '-diff.png'),
    quadroEm: [ca.x, ca.y, ca.w, ca.h].map((v) => +v.toFixed(2)), palcoEm: [cb.x, cb.y, cb.w, cb.h].map((v) => +v.toFixed(2)) }
  const nota = notaDe(nome, nomePeca); if (nota && r.fino > 0) r.nota = nota
  return r
}

// os textos da peça, na ordem, contra os do quadro (o palco não tem textos.md: o texto dele é o do quadro, G19)
const textos = []
function confereTextos(nome, nomePeca, norma, tem) {
  const ok = JSON.stringify(norma) === JSON.stringify(tem)
  const r = { quadro: nome, peca: nomePeca, ok }
  if (!ok) { r.falta = norma.filter((t) => !tem.includes(t)); r.sobra = tem.filter((t) => !norma.includes(t)); if (!r.falta.length && !r.sobra.length) r.ordem = true }
  const nota = NOTAS_TEXTO[`${nome}/${nomePeca}`]; if (nota && !ok) r.nota = nota
  textos.push(r)
}

const res = []
const fotos = {}
for (const q of QUADROS) {
  const R = quadro(q.ref, H), P = palco(q); fotos[q.ref] = P
  confereTextos(q.ref, 'coluna', R.medida.textos.coluna, P.medida.textos.coluna)
  if (q.url.includes('painel=1')) confereTextos(q.ref, 'painel', R.medida.textos.painel, P.medida.textos.painel)
  res.push({ quadro: q.ref, peca: 'inteiro', ...difere(R.png, P.png, resolve(OUT, q.ref + '-diff.png')), nota: NOTAS.inteiro })
  // o quadrado: no 04 ele fica embaixo do painel, nos dois
  if (!q.url.includes('painel=1')) res.push(peca(q.ref, 'quadrado', R.png, R.medida.quadrado, P.png, P.medida.quadrado))
  res.push(peca(q.ref, 'coluna', R.png, R.medida.conteudo, P.png, P.medida.conteudo))
  if (q.url.includes('painel=1')) res.push(peca(q.ref, 'painel', R.png, R.medida.painel, P.png, P.medida.painel, 0))
}
// o 00, a folha: cada espécime contra a peça numa das fotos do palco
{
  const R = quadro('00-componentes', H00), P = palco(AUX), m = R.medida
  const f = (ref) => fotos[ref]
  res.push(peca('00-componentes', 'quadrado', R.png, m.quadrados[0], f('01-no-fluxo').png, f('01-no-fluxo').medida.quadrado, 0))
  // a linha tem 280 na folha e 279 no painel, que fecha com a borda da direita: compara os 279
  const linha = (c) => c && { ...c, w: Math.min(c.w, P.medida.linhas.T07?.w ?? c.w) }
  res.push(peca('00-componentes', 'linha-normal', R.png, linha(m.linhas[0]), P.png, P.medida.linhas.T07, 0))
  res.push(peca('00-componentes', 'linha-aberta', R.png, linha(m.linhas[2]), f('04-painel-aberto').png, f('04-painel-aberto').medida.linhas.T07, 0))
  res.push(peca('00-componentes', 'coluna-no-fluxo', R.png, m.colunas[0], f('04-painel-aberto').png, f('04-painel-aberto').medida.conteudo))
  res.push(peca('00-componentes', 'coluna-num-estado', R.png, m.colunas[1], f('02-num-estado').png, f('02-num-estado').medida.conteudo))
  // a da T05, pela lista: a folha não desenha o lugar fixo do topo (decisão 30), e a lista dos grupos fica comparável
  res.push(peca('00-componentes', 'coluna-T05', R.png, m.listas[2], f('03-tela-com-muitos-estados').png, f('03-tela-com-muitos-estados').medida.lista))
}

for (const r of res) console.log(`${r.quadro} · ${r.peca} · ${r.erro ? 'ERRO ' + r.erro : `${r.fino}% (estrutural ${r.estrutural}%)`}${r.nota ? ' · ' + r.nota : ''}`)
console.log('')
for (const t of textos) {
  console.log(t.ok ? `OK     textos · ${t.quadro} · ${t.peca}` : `FALHA  textos · ${t.quadro} · ${t.peca}${t.ordem ? ' — os textos batem, a ordem não' : ''}${t.nota ? ' · ' + t.nota : ''}`
    + (t.falta?.length ? '\n         falta: ' + t.falta.map((x) => '`' + x + '`').join(' · ') : '') + (t.sobra?.length ? '\n         sobra: ' + t.sobra.map((x) => '`' + x + '`').join(' · ') : ''))
}
writeFileSync(resolve(OUT, 'relatorio.json'), JSON.stringify(res, null, 1))
writeFileSync(resolve(OUT, 'textos.json'), JSON.stringify(textos, null, 1))
const erros = res.filter((r) => r.erro)
// o texto que difere sem nota é falha; com nota, é a diferença explicada
const textoRuim = textos.filter((t) => !t.ok && !t.nota)
console.log(`\n${res.length} peças · ${res.filter((r) => r.fino === 0).length} em 0% · ${erros.length} com erro · prints/palco/relatorio.json`)
console.log(`${textos.length} textos · ${textos.filter((t) => t.ok).length} conferem · ${textos.filter((t) => !t.ok && t.nota).length} com a diferença explicada · ${textoRuim.length} falham`)
const [baseArq] = process.argv.slice(2)
if (baseArq) {
  const base = JSON.parse(readFileSync(resolve(process.cwd(), baseArq), 'utf8'))
  const antes = new Map(base.map((r) => [`${r.quadro}/${r.peca}`, r.fino]))
  const chave = (r) => `${r.quadro}/${r.peca}`
  const pior = res.filter((r) => antes.has(chave(r)) && (r.fino ?? 100) > (antes.get(chave(r)) ?? 100) + 0.01)
  const melhor = res.filter((r) => antes.has(chave(r)) && (r.fino ?? 100) < (antes.get(chave(r)) ?? 100) - 0.01)
  for (const r of pior) console.log(`PIOROU   ${chave(r)} · ${antes.get(chave(r))}% → ${r.fino ?? r.erro}%`)
  for (const r of melhor) console.log(`MELHOROU ${chave(r)} · ${antes.get(chave(r))}% → ${r.fino}%`)
  console.log(pior.length ? `${pior.length} peça(s) pioraram contra a base` : 'nenhuma peça piorou contra a base')
  process.exitCode = pior.length || erros.length || textoRuim.length ? 1 : 0
} else process.exitCode = erros.length || textoRuim.length ? 1 : 0
