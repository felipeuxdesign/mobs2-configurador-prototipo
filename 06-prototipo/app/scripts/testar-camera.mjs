// O teste da câmera sem a permissão (src/estado/camera.js): o que o botão do
// estado T10/11 faz, provado no node — no palco o estado fica parado e sem
// toque, e o fluxo não chega nele (o protótipo não tem o pedido do Android).
// Vale pras duas câmeras do app, a da T10 e a do item manual da T13.
// Uso: node scripts/testar-camera.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..'); const raiz = resolve(app, '../..')
globalThis.window = {}; createRequire(import.meta.url)(resolve(raiz, '04-dados/mocks.js')); const M = window.M2CF_MOCKS
const { RECEITAS } = await import(resolve(app, 'src/estado/receitas.js'))
const { CONCEDIDA, NEGADA, permissaoDoEstado, camera, primarioDaCamera, voltaDasConfiguracoes } = await import(resolve(app, 'src/estado/camera.js'))
const { T: T10 } = await import(resolve(app, 'src/telas/T10/textos.js'))
const { T: T13 } = await import(resolve(app, 'src/telas/T13/textos.js'))
const indice = JSON.parse(readFileSync(resolve(raiz, '02-telas/indice.json'), 'utf8')).itens
// os textos de uma referência no textos.md da tela (o mesmo recorte do scripts/textos.mjs)
function textosDaRef(t, ref) {
  const pasta = readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-'))
  const md = readFileSync(resolve(raiz, '02-telas', pasta, 'textos.md'), 'utf8')
  const bloco = md.split(/^## /m).find((b) => b.startsWith('`' + ref + '`'))
  return bloco ? [...bloco.split('\n').slice(1).join('\n').matchAll(/`([^`]*)`/g)].map((m) => m[1]) : []
}
let falhas = 0; const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }

// 1 · de onde vem a permissão: só o caso camera-sem-permissao nega, e só a T10/11 aponta pra ele
const caso = M.casos['camera-sem-permissao']
chk('o caso camera-sem-permissao existe e nega a câmera', caso?.permissao === 'camera' && caso?.resposta === 'negada', JSON.stringify(caso))
const negam = indice.filter((r) => r.tipo === 'estado').map((r) => r.id).filter((id) => permissaoDoEstado(RECEITAS[id], M.casos) === NEGADA)
chk('dos estados do indice.json, só a T10/11 abre sem a câmera', negam.length === 1 && negam[0] === 'T10/11-estado-camera-sem-permissao', negam.join(', '))
chk('no fluxo (sem estado), a câmera abre', permissaoDoEstado(undefined, M.casos) === CONCEDIDA)
const t13 = Object.keys(RECEITAS).filter((id) => id.startsWith('T13/'))
chk('nenhum estado da T13 nega a câmera (nenhuma referência desenha o checklist sem ela)', t13.every((id) => permissaoDoEstado(RECEITAS[id], M.casos) === CONCEDIDA), t13.join(', '))

// 2 · o que a câmera mostra e faz: sem a permissão, o primário tem saída (regra 12)
const sem = camera(NEGADA); const com = camera(CONCEDIDA)
chk('sem a permissão: o visor diz o que falta, e o primário abre as configurações', !sem.abre && sem.visor === 'sem-permissao' && sem.primario === 'abrir-configuracoes', JSON.stringify(sem))
chk('com a permissão: o visor enquadra, e o primário tira a foto', com.abre && com.visor === 'enquadre' && com.primario === 'tirar-foto', JSON.stringify(com))
const volta = voltaDasConfiguracoes()
chk('Abrir as configurações → o técnico permite lá e volta → a câmera abre com o Tirar foto', volta === CONCEDIDA && camera(volta).primario === 'tirar-foto')
chk('se ele volta sem permitir, a câmera continua sem ela, e o primário continua com saída', camera(voltaDasConfiguracoes(false)).primario === 'abrir-configuracoes')

// 2b · o primário que as telas tocam (primarioDaCamera): o da câmera, e no item manual o Não conforme ganha dela
chk('T10 · na câmera, o primário é o da permissão: Tirar foto, ou Abrir as configurações', primarioDaCamera(CONCEDIDA) === 'tirar-foto' && primarioDaCamera(NEGADA) === 'abrir-configuracoes')
chk('T13 · o Não conforme marcado, com ou sem a permissão: Salvar com ressalva (a ressalva não precisa da câmera)',
  primarioDaCamera(NEGADA, { ressalva: true }) === 'salvar-com-ressalva' && primarioDaCamera(CONCEDIDA, { ressalva: true }) === 'salvar-com-ressalva')
chk('T13 · desmarcado sem a permissão, volta o Abrir as configurações', primarioDaCamera(NEGADA, { ressalva: false }) === 'abrir-configuracoes')
// as duas telas tocam o que a função diz, e não uma decisão delas: senão o teste provaria outra coisa
const leem = ['T10', 'T13'].filter((t) => /primarioDaCamera\(/.test(readFileSync(resolve(app, `src/telas/${t}/index.jsx`), 'utf8')))
chk('a T10 e a T13 tiram o primário da câmera de primarioDaCamera', leem.length === 2, leem.join(', '))

// 3 · os textos: os da T10/11 são os do textos.md; o primário da T13 é o mesmo da T10 (logica.md · a câmera do checklist)
const md = textosDaRef('T10', '11-estado-camera-sem-permissao')
for (const [nome, texto] of [['precisaDaCamera', T10.precisaDaCamera], ['semAFoto', T10.semAFoto], ['abrirConfiguracoes', T10.abrirConfiguracoes], ['voltarCalibracao', T10.voltarCalibracao], ['fotoDoPainel', T10.fotoDoPainel]]) {
  chk(`T10 · ${nome} está no textos.md da 11`, md.includes(texto), texto)
}
chk('T13 · o primário sem a permissão é o Abrir as configurações da T10', T13.abrirConfiguracoes === T10.abrirConfiguracoes, T13.abrirConfiguracoes)
const md08 = textosDaRef('T13', '08-momento-nao-conforme-com-justificativa')
chk('T13 · o Salvar com ressalva está no textos.md da 08', md08.includes(T13.salvarComRessalva), T13.salvarComRessalva)

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
