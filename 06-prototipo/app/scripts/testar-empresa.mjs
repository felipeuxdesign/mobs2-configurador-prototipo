// A prova da empresa antes da unidade (logica.md · A empresa e a unidade; a
// otimização do design, T02/05 e T02/06, e a última entrega, T02/07). Os dois
// estados abrem pela coluna e pelo endereço, parados e sem toque (palco.md); o
// momento 07 é o app vivo no mundo do caso. O que cada toque faz se prova aqui,
// no node, nas mesmas funções que a tela usa — src/telas/T02/empresas.js —, com
// os textos do textos.md da T02; o roteiro scripts/caminhos/empresa.mjs anda o
// mundo no app, do 07 ao menu e de volta, e confere o herói sem mudança.
// Uso: node scripts/testar-empresa.mjs → exit 0 aprovado / 1 reprovado.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const app = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raiz = resolve(app, '../..')
// o texto, como está no textos.md da tela (entre crases, na seção da referência)
const textos = (t) => readFileSync(resolve(raiz, '02-telas', readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-')), 'textos.md'), 'utf8')
const secao = (t, ref) => { const md = textos(t); const i = md.indexOf('## `' + ref + '`'); if (i < 0) return []; const f = md.indexOf('\n## ', i + 1); return [...md.slice(i, f < 0 ? undefined : f).matchAll(/`([^`]*)`/g)].map((m) => m[1]).slice(1) }
const naSecao = (ref, ...lista) => { const s = secao('T02', ref); return lista.every((x) => s.includes(x)) }
const tela = (t) => readFileSync(resolve(raiz, '02-telas', readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-')), 'tela.md'), 'utf8')
globalThis.window = {}   // o mock escreve window.M2CF_MOCKS (a ponte de src/dados/mock.js)
const { M } = await import(resolve(app, 'src/dados/mock.js'))
const E = await import(resolve(app, 'src/telas/T02/empresas.js'))
const { TX } = await import(resolve(app, 'src/telas/T02/textos.js'))
const { caixaAlta } = await import(resolve(app, 'src/dados/formato.js'))
const { pacoteDaGaragem } = await import(resolve(app, 'src/dados/garagens.js'))
const { RECEITAS } = await import(resolve(app, 'src/estado/receitas.js'))

let falhas = 0
const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }
const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const nomesDas = (grupos) => grupos.flatMap((g) => g.linhas.map((l) => l.uo.nome))

// ── o mundo: a receita dos dois estados, e o herói de fora ──
chk('os estados 05 e 06 são montados pelo caso varias-empresas (receitas.js)',
  E.doCasoEmpresas(E.ESCOLHER_EMPRESA) && E.doCasoEmpresas(E.UNIDADES_DA_EMPRESA), JSON.stringify([RECEITAS[`T02/${E.ESCOLHER_EMPRESA}`]?.casos, RECEITAS[`T02/${E.UNIDADES_DA_EMPRESA}`]?.casos]))
chk('o herói (a tela, os momentos, a lista longa) não está no mundo das empresas: 00 → 01, como antes',
  !E.doCasoEmpresas(null) && !E.doCasoEmpresas('02-estado-lista-longa-com-busca') && !!M.empresa && !Array.isArray(M.empresa))

// ── o 05 · Pra qual empresa hoje? ──
const q05 = E.inicioDoCaso(E.ESCOLHER_EMPRESA)
chk('05 · abre nas empresas, sem nada escolhido', q05.passo === 'empresas' && q05.empresaId == null && q05.uoId == null)
chk('05 · o rótulo conta as empresas do caso, e o título é o da referência', E.rotuloDasEmpresas() === '3 EMPRESAS' && naSecao(E.ESCOLHER_EMPRESA, E.rotuloDasEmpresas(), TX.tituloEmpresas), E.rotuloDasEmpresas())
const linhas05 = E.linhasDasEmpresas(q05)
chk('05 · as três linhas, na ordem do caso: o nome e as unidades de cada uma, como o textos.md',
  linhas05.length === 3 && linhas05.every((l) => naSecao(E.ESCOLHER_EMPRESA, l.nome, l.detalhe)) && !linhas05.some((l) => l.escolhida),
  linhas05.map((l) => `${l.nome} · ${l.detalhe}`).join(' / '))
const p05 = E.primarioDasEmpresas(q05)
chk('05 · o primário apagado e desabilitado até escolher: Escolha uma empresa', p05.desabilitado && p05.texto === TX.escolhaEmpresa && naSecao(E.ESCOLHER_EMPRESA, p05.texto))
chk('05 · o voltar do Android não faz nada: a tela não tem saída desenhada, como o 00 (padrão c)', E.voltarNoCaso(q05) === null)

// ── escolher a Viação → Ver as unidades → o 06 ──
const viacao = E.empresas().find((e) => e.id === M.empresa.id)
const qViacao = E.escolherEmpresa(q05, viacao.id)
chk('escolher a Viação Atlântico Sul: a linha fica escolhida', E.linhasDasEmpresas(qViacao).find((l) => l.id === viacao.id).escolhida && E.linhasDasEmpresas(qViacao).filter((l) => l.escolhida).length === 1)
const pViacao = E.primarioDasEmpresas(qViacao)
chk('escolhida, o primário acende e diz Ver as unidades (tela.md)', !pViacao.desabilitado && pViacao.texto === 'Ver as unidades' && tela('T02').includes('*Ver as unidades*'))
chk('tocar de novo na mesma empresa não desmarca', igual(E.escolherEmpresa(qViacao, viacao.id), qViacao))
const q06 = E.verAsUnidades(qViacao)
chk('Ver as unidades → o 06: as unidades da Viação, sem nada escolhido — o quadro que o endereço do 06 abre', q06.passo === 'unidades' && q06.empresaId === viacao.id && q06.uoId == null && igual(q06, E.inicioDoCaso(E.UNIDADES_DA_EMPRESA)))

// ── o 06 · as unidades, com Trocar de empresa ──
const unidades = E.unidadesDa(q06.empresaId)
chk('06 · a empresa em cima, em caixa alta, como a referência', caixaAlta(E.rotuloDaEmpresa(q06)) === 'VIAÇÃO ATLÂNTICO SUL' && naSecao(E.UNIDADES_DA_EMPRESA, caixaAlta(E.rotuloDaEmpresa(q06)), TX.titulo))
chk('06 · as unidades da Viação são as do mundo do herói (M.ucs, M.uos), com o pacote de cada uma, como a referência',
  igual(nomesDas(unidades), M.uos.map((u) => u.nome)) && unidades.every((g) => naSecao(E.UNIDADES_DA_EMPRESA, caixaAlta(g.uc.nome)) && g.linhas.every((l) => naSecao(E.UNIDADES_DA_EMPRESA, l.uo.nome, l.detalhe, l.valor))),
  nomesDas(unidades).join(' / '))
chk('06 · a contagem da linha da Viação no 05 é a das unidades que o 06 mostra', viacao.unidades === nomesDas(unidades).length)
chk('06 · o primário apagado até escolher, e o Trocar de empresa no rodapé, como o textos.md', naSecao(E.UNIDADES_DA_EMPRESA, TX.escolhaUnidade, TX.trocarEmpresa))
chk('06 · o voltar do Android faz o Trocar de empresa, a saída desenhada (padrão c)', E.voltarNoCaso(q06) === E.trocarDeEmpresa)
chk('06 · o voltar leva às empresas, com a atual marcada (o 07)', igual(E.voltarNoCaso(q06)(q06), qViacao) && E.momentoDoCaso(E.voltarNoCaso(q06)(q06)) === E.EMPRESA_ESCOLHIDA)

// ── escolher a Várzea → a escolhida → Sincronizar → T03 ──
const varzea = M.uos.find((u) => u.id === M.contextoAtivo.uoId)
const qVarzea = E.escolherUnidade(q06, varzea.id)
chk('escolher a Garagem Várzea: a escolha fica, a empresa também', qVarzea.uoId === varzea.id && qVarzea.empresaId === viacao.id && qVarzea.passo === 'unidades')
chk('a escolhida: o primário diz Sincronizar Garagem Várzea, como o 01', TX.sincronizar(varzea.nome) === 'Sincronizar Garagem Várzea' && secao('T02', '01-momento-escolhida').includes(TX.sincronizar(varzea.nome)))
chk('Sincronizar → T03: a Várzea tem pacote, e a T03 baixa ele', !!pacoteDaGaragem(varzea.id), pacoteDaGaragem(varzea.id)?.id)
chk('com a escolhida, o Trocar de empresa segue no rodapé, e o voltar também faz ele', E.voltarNoCaso(qVarzea) === E.trocarDeEmpresa)

// ── Trocar de empresa volta ao 07, com a atual marcada (a resposta do arquiteto de 26/09: MUDA o padrão b) ──
chk('Trocar de empresa → as empresas com a atual marcada: o quadro do 07', igual(E.trocarDeEmpresa(q06), qViacao) && E.momentoDoCaso(E.trocarDeEmpresa(q06)) === E.EMPRESA_ESCOLHIDA)
chk('Trocar de empresa com a Várzea escolhida: a escolha da unidade não fica, a empresa fica marcada', E.trocarDeEmpresa(qVarzea).uoId == null && E.trocarDeEmpresa(qVarzea).empresaId === viacao.id)
chk('o 07 no textos.md: as três empresas e o primário Ver as unidades', naSecao(E.EMPRESA_ESCOLHIDA, E.rotuloDasEmpresas(), TX.tituloEmpresas, TX.verUnidades, ...linhas05.flatMap((l) => [l.nome, l.detalhe])))

// ── o 07 · o momento vivo (a última entrega): o endereço, a URL de cada quadro, e o mundo no contexto ──
chk('07 · pelo endereço, o app vivo no mundo do caso; num estado da coluna, nunca', E.vivoNasEmpresas(null, E.EMPRESA_ESCOLHIDA, {}) && !E.vivoNasEmpresas(E.ESCOLHER_EMPRESA, null, {}) && !E.vivoNasEmpresas(E.UNIDADES_DA_EMPRESA, null, {}))
chk('07 · o herói (00, 01, a lista longa) não está no mundo vivo', !E.vivoNasEmpresas(null, null, { uoId: null }) && !E.vivoNasEmpresas(null, E.UNIDADE_ESCOLHIDA, { uoId: 'uo-01' }) && !E.vivoNasEmpresas(null, '03-momento-busca-sem-resultado', {}))
const q07 = E.inicioDoCaso(null, E.EMPRESA_ESCOLHIDA, {})
chk('07 · pelo endereço, as empresas com a Viação marcada, como a referência', igual(q07, qViacao))
chk('07 · o primário aceso: Ver as unidades', !E.primarioDasEmpresas(q07).desabilitado && E.primarioDasEmpresas(q07).texto === TX.verUnidades)
chk('07 · o voltar do Android não faz nada, como no 05 (padrão c, confirmado)', E.voltarNoCaso(q07) === null)
chk('a URL do mundo vivo: o 07 nas empresas, nada nas unidades sem escolha, o 01 com a escolhida',
  E.momentoDoCaso(q07) === E.EMPRESA_ESCOLHIDA && E.momentoDoCaso(E.verAsUnidades(q07)) === null && E.momentoDoCaso(E.escolherUnidade(E.verAsUnidades(q07), varzea.id)) === E.UNIDADE_ESCOLHIDA)
const ctx = E.contextoDoCaso(qVarzea, { uoId: null, pacote: null, empresas: null }, varzea.id)
chk('Sincronizar no mundo: a unidade no contexto, e o mundo junto, com a atual', ctx.uoId === varzea.id && ctx.pacote === null && E.temVariasEmpresas(ctx) && ctx.empresas.atual === viacao.id, JSON.stringify(ctx))
chk('no fluxo, com o mundo no contexto, a T02 abre viva', E.vivoNasEmpresas(null, null, ctx) && !E.vivoNasEmpresas(null, null, { uoId: varzea.id, pacote: null, empresas: null }))
chk('a T03 voltando ao contexto (com a unidade): as unidades da atual, sem nada escolhido (o quadro do 06)', igual(E.inicioDoCaso(null, null, ctx), q06))
const doMenu = { ...ctx, uoId: null }
chk('o Trocar de empresa do menu (sem a unidade): as empresas com a atual marcada (o 07)', igual(E.inicioDoCaso(null, null, doMenu), qViacao) && igual(E.inicioDoCaso(null, E.EMPRESA_ESCOLHIDA, doMenu), qViacao))

// ── as outras duas empresas: o mock só traz a contagem, e o primário espera (padrão a) ──
for (const e of E.empresas().filter((x) => x.id !== M.empresa.id)) {
  const q = E.escolherEmpresa(q05, e.id)
  const p = E.primarioDasEmpresas(q)
  chk(`${e.nome} · se escolhe, e o mock não traz as unidades dela (só a contagem, ${e.unidades})`, E.linhasDasEmpresas(q).find((l) => l.id === e.id).escolhida && E.unidadesDa(e.id) === null)
  chk(`${e.nome} · o primário espera: Ver as unidades, desabilitado de verdade (lei 17, regra 12)`, p.desabilitado && p.texto === TX.verUnidades)
  chk(`${e.nome} · Ver as unidades não faz nada: nenhum quadro inventado`, igual(E.verAsUnidades(q), q))
  chk(`${e.nome} → a Viação: o primário acende de novo`, !E.primarioDasEmpresas(E.escolherEmpresa(q, viacao.id)).desabilitado)
}

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
