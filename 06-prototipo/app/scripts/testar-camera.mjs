// O teste da câmera sem a permissão (src/estado/camera.js): o que o primário da
// câmera faz sem ela, provado no node — nenhum estado nem o fluxo chegam nela (o
// protótipo não tem o pedido do Android). Desde o pacote 2 (decisão 52), a T10 não
// tem câmera, e a T10/11 e o caso camera-sem-permissao saíram: a câmera do app é
// uma só, a do item manual da T13 (a do item e a do problema, decisão 39).
// Uso: node scripts/testar-camera.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..'); const raiz = resolve(app, '../..')
globalThis.window = {}; createRequire(import.meta.url)(resolve(raiz, '04-dados/mocks.js')); const M = window.M2CF_MOCKS
const { RECEITAS } = await import(resolve(app, 'src/estado/receitas.js'))
const { CONCEDIDA, NEGADA, APAGADO, permissaoDoEstado, camera, primarioDaCamera, voltaDasConfiguracoes } = await import(resolve(app, 'src/estado/camera.js'))
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

// 1 · de onde vem a permissão: do caso que a receita aponta — e, desde o pacote 2, nenhum caso do
// mock nega a câmera (o camera-sem-permissao saiu com a T10/11, decisão 52)
const negadores = Object.entries(M.casos).filter(([, c]) => c?.permissao === 'camera' && c?.resposta === 'negada').map(([id]) => id)
chk('nenhum caso do mock nega a câmera (o camera-sem-permissao saiu)', negadores.length === 0 && !M.casos['camera-sem-permissao'], negadores.join(', '))
// a T10/11 de hoje (a rodada 2 do retorno do PM) é o nada a calibrar, e não a câmera de antes
chk('a câmera sem a permissão saiu do indice.json (a T10/11 de hoje é o nada a calibrar)', !indice.some((r) => r.id === 'T10/11-estado-camera-sem-permissao'))
const negam = indice.filter((r) => r.tipo === 'estado').map((r) => r.id).filter((id) => permissaoDoEstado(RECEITAS[id], M.casos) === NEGADA)
chk('nenhum estado do indice.json abre sem a câmera', negam.length === 0, negam.join(', '))
// a função continua lendo o caso: um caso que negue a câmera, apontado pela receita, a nega
const finge = { 'nega-camera': { permissao: 'camera', resposta: 'negada' } }
chk('um caso que negue a câmera, apontado pela receita, a nega', permissaoDoEstado({ casos: ['nega-camera'] }, finge) === NEGADA && permissaoDoEstado({ casos: [] }, finge) === CONCEDIDA)
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

// 2b · o primário que as telas tocam (primarioDaCamera): o da câmera, e no item manual, com o Não está
// conforme marcado, o que falta pra ressalva — o não conforme exige a foto do problema (decisão 39)
chk('na câmera, sem o item marcado, o primário é o da permissão: Tirar foto, ou Abrir as configurações', primarioDaCamera(CONCEDIDA) === 'tirar-foto' && primarioDaCamera(NEGADA) === 'abrir-configuracoes')
chk('T13 · desmarcado, o da câmera: Tirar foto, e sem a permissão o Abrir as configurações',
  primarioDaCamera(CONCEDIDA, { naoConforme: false }) === 'tirar-foto' && primarioDaCamera(NEGADA, { naoConforme: false }) === 'abrir-configuracoes')
chk('T13 · marcado, sem a foto do problema: o disparador Fotografar o problema, com ou sem o texto (a ordem é livre)',
  primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: false, contou: true }) === 'fotografar-problema'
  && primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: false, contou: false }) === 'fotografar-problema')
chk('T13 · marcado, sem a foto e sem a permissão: o Abrir as configurações (a foto do problema precisa da câmera, regra 12)',
  primarioDaCamera(NEGADA, { naoConforme: true, fotografado: false, contou: true }) === 'abrir-configuracoes')
chk('T13 · fotografado, sem o texto: Conte o que aconteceu, o apagado', primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: true, contou: false }) === APAGADO)
chk('T13 · fotografado e contado: Salvar com ressalva', primarioDaCamera(CONCEDIDA, { naoConforme: true, fotografado: true, contou: true }) === 'salvar-com-ressalva')
// o Salvar com ressalva só existe com a foto do problema e o texto: nenhuma combinação o dá sem os dois
const combina = [CONCEDIDA, NEGADA].flatMap((p) => [false, true].flatMap((f) => [false, true].map((c) => ({ p, f, c }))))
chk('T13 · nenhum Salvar com ressalva sem a foto do problema e o texto', combina.every(({ p, f, c }) => primarioDaCamera(p, { naoConforme: true, fotografado: f, contou: c }) !== 'salvar-com-ressalva' || (f && c)))
// a tela toca o que a função diz, e não uma decisão dela: senão o teste provaria outra coisa
const fonte = (t) => readFileSync(resolve(app, `src/telas/${t}/index.jsx`), 'utf8')
chk('a T13 tira o primário da câmera de primarioDaCamera', /primarioDaCamera\(/.test(fonte('T13')))
chk('a T10 não tem câmera (decisão 52): não lê src/estado/camera.js', !/estado\/camera/.test(fonte('T10')))

// 3 · os textos: nenhuma referência desenha a câmera sem a permissão desde que a T10/11 saiu; o
// Abrir as configurações é a letra da ficha da T13, do logica.md e da regra 12 (06-prototipo/CLAUDE.md)
const fontesDoAbrir = ['02-telas/T13-checklist/tela.md', '06-prototipo/logica.md', '06-prototipo/CLAUDE.md'].map((f) => readFileSync(resolve(raiz, f), 'utf8'))
chk('T13 · o primário sem a permissão, Abrir as configurações, é a letra da ficha da T13, do logica.md e da regra 12',
  fontesDoAbrir.every((md) => md.includes('`' + T13.abrirConfiguracoes + '`')), T13.abrirConfiguracoes)
const md07 = textosDaRef('T13', '07-momento-responder-item')
const md08 = textosDaRef('T13', '08-momento-nao-conforme-com-justificativa')
const md15 = textosDaRef('T13', '15-momento-problema-fotografado')
chk('T13 · o Tirar foto e a caixa desmarcada estão no textos.md da 07', [T13.tirarFoto, T13.naoConforme, T13.marqueEConte].every((t) => md07.includes(t)))
chk('T13 · o Fotografar o problema, o Enquadre o problema e a caixa marcada estão no textos.md da 08',
  [T13.fotografarProblema, T13.enquadreProblema, T13.naoConforme, T13.conteEmbaixo, T13.oQueAconteceu].every((t) => md08.includes(t)))
chk('T13 · o Salvar com ressalva e o registro do problema estão no textos.md da 15',
  [T13.salvarComRessalva, T13.problemaFotografado('14:30'), T13.vaiComARessalva, T13.oQueAconteceu].every((t) => md15.includes(t)))
// o apagado não tem referência: o texto é o do tela.md da T13 e o do logica.md (decisão 39)
const telaMd = readFileSync(resolve(raiz, '02-telas/T13-checklist/tela.md'), 'utf8'); const logicaMd = readFileSync(resolve(raiz, '06-prototipo/logica.md'), 'utf8')
chk('T13 · o Conte o que aconteceu está no tela.md da T13 e no logica.md', telaMd.includes(T13.conteOQueAconteceu) && logicaMd.includes(T13.conteOQueAconteceu), T13.conteOQueAconteceu)

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
