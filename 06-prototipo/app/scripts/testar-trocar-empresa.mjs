// A prova do Trocar de empresa da folha de trocar de unidade (T04/14, decisão
// 37, logica.md · A empresa e a unidade). O mundo do caso varias-empresas só
// existe no estado da coluna, parado e sem toque — nada no mock dá ao herói
// mais de uma empresa no fluxo —, então o que o toque faz se prova aqui, no
// node, nas mesmas funções que a tela usa (src/telas/T04/dados.js): com a
// sessão aberta, a mesma confirmação de trocar de unidade (HU-T02-3), e depois
// dos 4 passos a T02, na lista das empresas; sem ela, direto.
// Uso: node scripts/testar-trocar-empresa.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
globalThis.window = {}   // o mock escreve window.M2CF_MOCKS (a ponte de src/dados/mock.js)
const { M } = await import(resolve(app, 'src/dados/mock.js'))
const T04 = await import(resolve(app, 'src/telas/T04/dados.js'))
const md = readFileSync(resolve(raiz, '02-telas/T04-menu/textos.md'), 'utf8')
const secao = (ref) => { const i = md.indexOf('## `' + ref + '`'); const f = md.indexOf('\n## ', i + 1); return i < 0 ? '' : md.slice(i, f < 0 ? undefined : f) }
const tela = readFileSync(resolve(app, 'src/telas/T04/index.jsx'), 'utf8')

let falhas = 0
const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }
const heroi = { moduloSerial: 'M2C-0417', ativoId: 'a-01' }

// ── quem vê o Trocar de empresa ──
chk('o caso varias-empresas tem mais de uma empresa', M.casos[T04.CASO_EMPRESAS]?.empresas?.length > 1, M.casos[T04.CASO_EMPRESAS]?.empresas?.length)
chk('T04/14 · a folha do estado 14 tem o Trocar de empresa', T04.temVariasEmpresas({}, T04.REF.empresa))
chk('T04/07 · a folha do herói, uma empresa só, não tem', !T04.temVariasEmpresas({}, null))
chk('T04/08 · a do envio em andamento também não', !T04.temVariasEmpresas({}, T04.REF.envio))
chk('o 14 abre a folha de trocar de unidade', T04.SOBRE[T04.REF.empresa] === 'garagem')

// ── o toque ──
const comSessao = T04.depoisDoTrocar(heroi, T04.TROCA_DE_EMPRESA)
chk('com a sessão aberta, o Trocar de empresa pede a confirmação (o diálogo de trocar, com a empresa)', comSessao.confirma?.empresa === true && !comSessao.vai)
const destino = T04.destinoDaTroca(comSessao.confirma)
chk('depois dos 4 passos, a T02, sem unidade no contexto (a lista das empresas)', destino.tela === 'T02' && destino.contexto.uoId === null && destino.contexto.pacote === null, JSON.stringify(destino))
const semSessao = T04.depoisDoTrocar(null, T04.TROCA_DE_EMPRESA)
chk('sem a sessão, direto pra T02, sem confirmação', semSessao.vai?.tela === 'T02' && !semSessao.confirma)
// o de unidade continua o mesmo
const unidade = T04.depoisDoTrocar(heroi, { uoId: 'uo-02' })
chk('trocar de unidade com a sessão aberta: a mesma confirmação', unidade.confirma?.uoId === 'uo-02')
chk('e depois dos 4 passos, a sincronização da unidade nova (T03)', T04.destinoDaTroca(unidade.confirma).tela === 'T03' && T04.destinoDaTroca(unidade.confirma).contexto.uoId === 'uo-02')
chk('trocar de unidade sem a sessão: direto pra T03', T04.depoisDoTrocar(null, { uoId: 'uo-02' }).vai?.tela === 'T03')

// ── os textos (textos.md da T04) e o diálogo, que a tela monta com eles ──
chk('o 14 diz Trocar de unidade, a frase da unidade e Trocar de empresa', ['Trocar de unidade', 'Trocar recarrega os ativos e o pacote desta unidade.', 'Trocar de empresa'].every((t) => secao('14-estado-folha-trocar-de-unidade-com-empresa').includes('`' + t + '`')))
chk('o 09 diz é encerrada antes da troca, sem homologar.', secao('09-estado-folha-trocar-de-garagem-com-modulo-conectado').includes('`é encerrada antes da troca, sem homologar.`'))
chk('a tela monta o diálogo com Trocar de empresa no título, a mesma frase e o mesmo primário',
  tela.includes("deEmpresa ? 'Trocar de empresa' : 'Trocar de unidade'") && tela.includes('é encerrada antes da troca, sem homologar.') && tela.includes('primario="Encerrar a sessão e trocar"'))
chk('o link da folha é o Trocar de empresa, e toca o trocarDeEmpresa', tela.includes('<Link aoTocar={trocarDeEmpresa}>Trocar de empresa</Link>'))

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
