// A prova da empresa antes da unidade, pra todo técnico (decisão 37, revista pelo
// diretor em 26/09; logica.md · A empresa e a unidade; a otimização 400). Os três
// mundos da T02 — o do herói, com as três empresas dele (M.empresas), o de uma
// empresa só (o caso uma-empresa) e o da lista longa, de uma empresa só também —,
// o mundo em que a tela abre, o quadro de partida, a URL de cada quadro e o que
// cada toque faz, no node, nas mesmas funções que a tela usa —
// src/telas/T02/empresas.js —, com os textos do textos.md da T02. Os estados (05,
// 06, 08) abrem pela coluna e pelo endereço, parados e sem toque (palco.md); os
// momentos (01, 07, 09) abertos pelo endereço são o app vivo no mundo deles. O
// roteiro scripts/caminhos/empresa.mjs anda os dois caminhos no app: o do herói,
// 05 → 07 → 06 → 09 → T03, e o de uma empresa só, 08 → 00 → 01 → T03.
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
const foraDaSecao = (ref, ...lista) => { const s = secao('T02', ref); return s.length > 0 && lista.every((x) => !s.includes(x)) }
const tela = (t) => readFileSync(resolve(raiz, '02-telas', readdirSync(resolve(raiz, '02-telas')).find((d) => d.startsWith(t + '-')), 'tela.md'), 'utf8')
globalThis.window = {}   // o mock escreve window.M2CF_MOCKS (a ponte de src/dados/mock.js)
const { M } = await import(resolve(app, 'src/dados/mock.js'))
const E = await import(resolve(app, 'src/telas/T02/empresas.js'))
const { TX } = await import(resolve(app, 'src/telas/T02/textos.js'))
const { caixaAlta } = await import(resolve(app, 'src/dados/formato.js'))
const { pacoteDaGaragem } = await import(resolve(app, 'src/dados/garagens.js'))
const { RECEITAS } = await import(resolve(app, 'src/estado/receitas.js'))
const { SEMENTES } = await import(resolve(app, 'src/estado/sementes.js'))

let falhas = 0
const chk = (n, ok, d) => { console.log((ok ? 'OK     ' : 'FALHA  ') + n + (d ? ' — ' + d : '')); if (!ok) falhas++ }
const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const nomesDas = (grupos) => grupos.flatMap((g) => g.linhas.map((l) => l.uo.nome))
const { HEROI, UMA_EMPRESA, LONGA } = E
const LISTA_LONGA = '02-estado-lista-longa-com-busca'
const SEM_RESULTADO = '03-momento-busca-sem-resultado'
const ESCONDE = '04-momento-busca-esconde-a-escolha'
const OUTRO_USUARIO = '18-estado-outro-usuario-no-aparelho'
const varzea = M.uos.find((u) => u.id === M.contextoAtivo.uoId)
const vazio = { uoId: null, pacote: null, empresas: null }   // o contexto do estado único ao nascer (estado.jsx)

// ── os mundos: o do herói tem as três empresas do mock; o do caso, uma ──
chk('o herói tem três empresas (M.empresas), e a dele, a Viação Atlântico Sul (M.empresa), está entre elas',
  E.empresasDo(HEROI) === M.empresas && M.empresas.length === 3 && E.empresaDe(HEROI, M.empresa.id)?.nome === M.empresa.nome && E.variasEmpresas(HEROI))
chk('o caso uma-empresa tem uma empresa só, a do herói, e não tem a troca',
  E.empresasDo(UMA_EMPRESA) === M.casos['uma-empresa'].empresas && E.empresasDo(UMA_EMPRESA).length === 1 && E.empresasDo(UMA_EMPRESA)[0].id === M.empresa.id && !E.variasEmpresas(UMA_EMPRESA))
chk('a lista longa é de uma empresa só, a do herói, e não tem a troca (tela.md · O que se toca)', E.empresasDo(LONGA).length === 1 && E.empresasDo(LONGA)[0].id === M.empresa.id && !E.variasEmpresas(LONGA))
chk('o caso varias-empresas saiu do mock, e o código não o lê mais', !M.casos['varias-empresas'] && !readFileSync(resolve(app, 'src/telas/T02/empresas.js'), 'utf8').includes('varias-empresas'))

// ── as receitas: o 05 e o 06 no mundo do herói, o 08 no caso uma-empresa ──
chk('as receitas: o 05 e o 06 são o mundo do herói (M.empresas), o 08 é o caso uma-empresa',
  RECEITAS[`T02/${E.ESCOLHER_EMPRESA}`]?.dados?.includes('empresas') && RECEITAS[`T02/${E.UNIDADES_DA_EMPRESA}`]?.dados?.includes('empresas') && RECEITAS[`T02/${E.UMA_JA_MARCADA}`]?.casos?.includes('uma-empresa'),
  JSON.stringify([RECEITAS[`T02/${E.ESCOLHER_EMPRESA}`], RECEITAS[`T02/${E.UNIDADES_DA_EMPRESA}`], RECEITAS[`T02/${E.UMA_JA_MARCADA}`]].map((r) => r?.casos ?? r?.dados)))

// ── o mundo em que a tela abre ──
const semente = SEMENTES.T02.contexto
chk('num estado: o 05 e o 06 no mundo do herói, o 08 no de uma empresa só, o 02 no da lista longa',
  E.mundoAoAbrir(E.ESCOLHER_EMPRESA, null, semente) === HEROI && E.mundoAoAbrir(E.UNIDADES_DA_EMPRESA, null, semente) === HEROI
  && E.mundoAoAbrir(E.UMA_JA_MARCADA, null, semente) === UMA_EMPRESA && E.mundoAoAbrir(LISTA_LONGA, null, semente) === LONGA)
chk('a T01/18, que monta esta tela com o diálogo por cima: as unidades de uma empresa só, a 00, como a referência desenha',
  E.mundoAoAbrir(OUTRO_USUARIO, null, vazio) === UMA_EMPRESA && igual(E.inicioDoMundo(UMA_EMPRESA, OUTRO_USUARIO, null, vazio), { passo: 'unidades', empresaId: M.empresa.id, uoId: null }))
chk('num momento pelo endereço, o mundo dele: o 01 no de uma empresa só, o 03 e o 04 no da lista longa, o 07 e o 09 no do herói',
  E.mundoAoAbrir(null, E.UNIDADE_ESCOLHIDA, semente) === UMA_EMPRESA && E.mundoAoAbrir(null, SEM_RESULTADO, semente) === LONGA && E.mundoAoAbrir(null, ESCONDE, semente) === LONGA
  && E.mundoAoAbrir(null, E.EMPRESA_ESCOLHIDA, semente) === HEROI && E.mundoAoAbrir(null, E.UNIDADE_COM_TROCA, semente) === HEROI)
chk('a tela pelo endereço (a semente da T02, o pulo do palco): o mundo de uma empresa só, já confirmada',
  semente?.empresas?.caso === UMA_EMPRESA && semente.empresas.atual === M.empresa.id && E.mundoAoAbrir(null, null, semente) === UMA_EMPRESA, JSON.stringify(semente))
chk('o Entrar da T01 (o contexto sem o mundo): o do herói', E.mundoAoAbrir(null, null, vazio) === HEROI && E.mundoAoAbrir(null, null, undefined) === HEROI)
chk('o estado único nasce sem o mundo das empresas no contexto (estado.jsx)', readFileSync(resolve(app, 'src/estado/estado.jsx'), 'utf8').includes('contexto: { uoId: null, pacote: null, empresas: null }'))

// ══ o caminho do herói: 05 → 07 → 06 → 09 → T03 ══

// ── o 05 · a entrada: Pra qual empresa hoje? ──
const q05 = E.inicioDoMundo(HEROI, null, null, vazio)
chk('05 · o Entrar abre nas empresas, sem nada escolhido — o quadro que o endereço do 05 abre',
  igual(q05, { passo: 'empresas', empresaId: null, uoId: null }) && igual(q05, E.inicioDoMundo(HEROI, E.ESCOLHER_EMPRESA, null, semente)))
chk('05 · o rótulo conta as empresas do herói, e o título é o da referência', E.rotuloDasEmpresas(HEROI) === '3 EMPRESAS' && naSecao(E.ESCOLHER_EMPRESA, E.rotuloDasEmpresas(HEROI), TX.tituloEmpresas), E.rotuloDasEmpresas(HEROI))
const linhas05 = E.linhasDasEmpresas(HEROI, q05)
chk('05 · as três linhas, na ordem do mock: o nome e as unidades de cada uma, como o textos.md',
  linhas05.length === 3 && linhas05.every((l) => naSecao(E.ESCOLHER_EMPRESA, l.nome, l.detalhe)) && !linhas05.some((l) => l.escolhida),
  linhas05.map((l) => `${l.nome} · ${l.detalhe}`).join(' / '))
const p05 = E.primarioDasEmpresas(HEROI, q05)
chk('05 · o primário apagado e desabilitado até escolher: Escolha uma empresa', p05.desabilitado && p05.texto === TX.escolhaEmpresa && naSecao(E.ESCOLHER_EMPRESA, p05.texto))
chk('05 · a URL: o 05 é estado, e no fluxo fica sem momento', E.momentoDoCaso(HEROI, q05) === null)
chk('05 · o voltar do Android não faz nada: a tela não tem saída desenhada (padrão c)', E.voltarNoCaso(HEROI, q05) === null)

// ── tocar na Viação → o 07 ──
const viacao = E.empresaDe(HEROI, M.empresa.id)
const q07 = E.escolherEmpresa(q05, viacao.id)
chk('07 · tocar na Viação: a linha fica escolhida, só ela', E.linhasDasEmpresas(HEROI, q07).find((l) => l.id === viacao.id).escolhida && E.linhasDasEmpresas(HEROI, q07).filter((l) => l.escolhida).length === 1)
const p07 = E.primarioDasEmpresas(HEROI, q07)
chk('07 · escolhida, o primário acende e diz Ver as unidades (tela.md, textos.md)', !p07.desabilitado && p07.texto === TX.verUnidades && tela('T02').includes('*Ver as unidades*') && naSecao(E.EMPRESA_ESCOLHIDA, TX.verUnidades))
chk('07 · a URL diz o 07, e o endereço do 07 abre esse mesmo quadro', E.momentoDoCaso(HEROI, q07) === E.EMPRESA_ESCOLHIDA && igual(E.inicioDoMundo(HEROI, null, E.EMPRESA_ESCOLHIDA, semente), q07))
chk('07 · tocar de novo na mesma empresa não desmarca', igual(E.escolherEmpresa(q07, viacao.id), q07))
chk('07 · o voltar do Android não faz nada, como no 05 (padrão c, confirmado)', E.voltarNoCaso(HEROI, q07) === null)
chk('07 · no textos.md: as três empresas e o primário Ver as unidades', naSecao(E.EMPRESA_ESCOLHIDA, E.rotuloDasEmpresas(HEROI), TX.tituloEmpresas, TX.verUnidades, ...linhas05.flatMap((l) => [l.nome, l.detalhe])))

// ── Ver as unidades → o quadro do 06 ──
const q06 = E.verAsUnidades(HEROI, q07)
chk('06 · Ver as unidades: as unidades da Viação, sem nada escolhido — o quadro que o endereço do 06 abre',
  igual(q06, { passo: 'unidades', empresaId: viacao.id, uoId: null }) && igual(q06, E.inicioDoMundo(HEROI, E.UNIDADES_DA_EMPRESA, null, semente)))
chk('06 · a URL: o 06 é estado, e no fluxo fica sem momento', E.momentoDoCaso(HEROI, q06) === null)
const unidades = E.unidadesDa(HEROI, q06.empresaId)
chk('06 · a empresa em cima, em caixa alta, como a referência', caixaAlta(E.rotuloDaEmpresa(HEROI, q06)) === 'VIAÇÃO ATLÂNTICO SUL' && naSecao(E.UNIDADES_DA_EMPRESA, caixaAlta(E.rotuloDaEmpresa(HEROI, q06)), TX.titulo))
chk('06 · as unidades da Viação são as do mundo do herói (M.ucs, M.uos), com o pacote de cada uma, como a referência',
  igual(nomesDas(unidades), M.uos.map((u) => u.nome)) && unidades.every((g) => naSecao(E.UNIDADES_DA_EMPRESA, caixaAlta(g.uc.nome)) && g.linhas.every((l) => naSecao(E.UNIDADES_DA_EMPRESA, l.uo.nome, l.detalhe, l.valor))),
  nomesDas(unidades).join(' / '))
chk('06 · a contagem da linha da Viação no 05 é a das unidades que o 06 mostra', viacao.unidades === nomesDas(unidades).length)
chk('06 · o primário apagado até escolher, e o Trocar de empresa no rodapé, como o textos.md', E.variasEmpresas(HEROI) && naSecao(E.UNIDADES_DA_EMPRESA, TX.escolhaUnidade, TX.trocarEmpresa))
chk('06 · o voltar do Android faz o Trocar de empresa, a saída desenhada (padrão c): o 07, com a atual marcada',
  E.voltarNoCaso(HEROI, q06) === E.trocarDeEmpresa && igual(E.voltarNoCaso(HEROI, q06)(q06), q07))

// ── tocar na Várzea → o 09 ──
const q09 = E.escolherUnidade(q06, varzea.id)
chk('09 · tocar na Garagem Várzea: a escolha fica, a empresa também', igual(q09, { passo: 'unidades', empresaId: viacao.id, uoId: varzea.id }))
chk('09 · a URL diz o 09 — não o 01, que é de quem tem uma empresa só —, e o endereço do 09 abre esse mesmo quadro',
  E.momentoDoCaso(HEROI, q09) === E.UNIDADE_COM_TROCA && igual(E.inicioDoMundo(HEROI, null, E.UNIDADE_COM_TROCA, semente), q09))
chk('09 · o primário diz Sincronizar Garagem Várzea, e o Trocar de empresa segue no rodapé, como o textos.md',
  naSecao(E.UNIDADE_COM_TROCA, 'VIAÇÃO ATLÂNTICO SUL', TX.titulo, TX.sincronizar(varzea.nome), TX.trocarEmpresa) && !naSecao(E.UNIDADE_COM_TROCA, TX.escolhaUnidade))
chk('09 · o voltar do Android também faz o Trocar de empresa', E.voltarNoCaso(HEROI, q09) === E.trocarDeEmpresa)
chk('09 · Trocar de empresa: o 07, com a atual marcada — a escolha da unidade não fica', igual(E.trocarDeEmpresa(q09), q07) && E.momentoDoCaso(HEROI, E.trocarDeEmpresa(q09)) === E.EMPRESA_ESCOLHIDA)
chk('09 · Sincronizar → T03: a Várzea tem pacote, e a T03 baixa ele', !!pacoteDaGaragem(varzea.id), pacoteDaGaragem(varzea.id)?.id)
const ctxHeroi = E.contextoDoCaso(HEROI, q09, vazio, varzea.id)
chk('09 · Sincronizar: a unidade no contexto, e o mundo do herói junto, com a atual',
  igual(ctxHeroi, { uoId: varzea.id, pacote: null, empresas: { caso: HEROI, atual: viacao.id } }) && E.temVariasEmpresas(ctxHeroi), JSON.stringify(ctxHeroi))
// outra unidade: a URL segue o 09
const ibura = M.uos.find((u) => u.id !== varzea.id)
chk('09 · outra unidade escolhida: a URL segue no 09, e o primário diz o nome dela', E.momentoDoCaso(HEROI, E.escolherUnidade(q06, ibura.id)) === E.UNIDADE_COM_TROCA && TX.sincronizar(ibura.nome) === `Sincronizar ${ibura.nome}`)

// ── a T02 no fluxo, com o mundo do herói no contexto ──
chk('a T03 voltando ao contexto (com a unidade): as unidades da atual, sem nada escolhido (o quadro do 06)',
  E.mundoAoAbrir(null, null, ctxHeroi) === HEROI && igual(E.inicioDoMundo(HEROI, null, null, ctxHeroi), q06))
const doMenu = { ...ctxHeroi, uoId: null }
chk('o Trocar de empresa do menu (sem a unidade, com o 07 no endereço): as empresas com a atual marcada (o 07)',
  E.mundoAoAbrir(null, E.EMPRESA_ESCOLHIDA, doMenu) === HEROI && igual(E.inicioDoMundo(HEROI, null, E.EMPRESA_ESCOLHIDA, doMenu), q07) && igual(E.inicioDoMundo(HEROI, null, null, doMenu), q07))
chk('a T03 aberta pelo pulo do palco (a unidade, sem o mundo), voltando ao contexto: as unidades do herói (o quadro do 06)',
  E.mundoAoAbrir(null, null, { uoId: varzea.id, pacote: null }) === HEROI && igual(E.inicioDoMundo(HEROI, null, null, { uoId: varzea.id, pacote: null }), q06))

// ── o Voltar ao fluxo do palco (palco.md · o instante de antes do primeiro estado aberto) ──
// o Ver as unidades e o Trocar de empresa gravam o quadro no estado único (contextoDoQuadro):
// o palco remonta a tela, e ela abre no quadro de antes, no mesmo mundo
const ctx06 = E.contextoDoQuadro(HEROI, q06, vazio)
chk('Ver as unidades grava o quadro: o mundo do herói, a Viação e o passo das unidades, sem a unidade',
  igual(ctx06, { uoId: null, pacote: null, empresas: { caso: HEROI, atual: viacao.id, passo: 'unidades' } }) && E.temVariasEmpresas(ctx06), JSON.stringify(ctx06))
chk('o Voltar ao fluxo do quadro do 06 (o Entrar → a Viação → Ver as unidades): as unidades da Viação, com o Trocar de empresa — não o 05',
  E.mundoAoAbrir(null, null, ctx06) === HEROI && igual(E.inicioDoMundo(HEROI, null, null, ctx06), q06))
const ctx07 = E.contextoDoQuadro(HEROI, E.trocarDeEmpresa(q06), ctx06)
chk('Trocar de empresa grava o quadro: o mundo e a atual, sem o passo — o mesmo que o Trocar de empresa do menu deixa',
  igual(ctx07.empresas, { caso: HEROI, atual: viacao.id }) && igual(E.inicioDoMundo(HEROI, null, E.EMPRESA_ESCOLHIDA, ctx07), q07) && igual(E.inicioDoMundo(HEROI, null, null, ctx07), q07), JSON.stringify(ctx07))
const ctx06DoMenu = E.contextoDoQuadro(HEROI, q06, doMenu)
chk('o Voltar ao fluxo do quadro do 06 aberto pelo Trocar de empresa do menu: as unidades da Viação — não o 07',
  igual(E.inicioDoMundo(HEROI, null, null, ctx06DoMenu), q06))
const ctx06DoEndereco = E.contextoDoQuadro(HEROI, q06, semente)
chk('o Voltar ao fluxo do quadro do 06 aberto pelo 07 do endereço: o mundo do herói fica — não a 00 de uma empresa só',
  E.mundoAoAbrir(null, null, ctx06DoEndereco) === HEROI && igual(E.inicioDoMundo(HEROI, null, null, ctx06DoEndereco), q06), JSON.stringify(ctx06DoEndereco.empresas))
chk('o Sincronizar depois do Ver as unidades: o contexto sai sem o passo', igual(E.contextoDoCaso(HEROI, q09, ctx06, varzea.id).empresas, { caso: HEROI, atual: viacao.id }))
chk('a T03 voltando ao contexto depois do Ver as unidades gravado: as unidades da atual, como antes',
  igual(E.inicioDoMundo(HEROI, null, null, { ...ctx06, uoId: varzea.id }), q06) && igual(E.inicioDoMundo(HEROI, null, null, { ...ctx07, uoId: varzea.id }), q06))

// ── as outras duas empresas: o mock só traz a contagem, e o primário espera (padrão a) ──
for (const e of E.empresasDo(HEROI).filter((x) => x.id !== M.empresa.id)) {
  const q = E.escolherEmpresa(q05, e.id)
  const p = E.primarioDasEmpresas(HEROI, q)
  chk(`${e.nome} · se escolhe, e o mock não traz as unidades dela (só a contagem, ${e.unidades})`, E.linhasDasEmpresas(HEROI, q).find((l) => l.id === e.id).escolhida && E.unidadesDa(HEROI, e.id) === null)
  chk(`${e.nome} · o primário espera: Ver as unidades, desabilitado de verdade (lei 17, regra 12)`, p.desabilitado && p.texto === TX.verUnidades)
  chk(`${e.nome} · Ver as unidades não faz nada: nenhum quadro inventado`, igual(E.verAsUnidades(HEROI, q), q))
  chk(`${e.nome} → a Viação: o primário acende de novo`, !E.primarioDasEmpresas(HEROI, E.escolherEmpresa(q, viacao.id)).desabilitado)
}

// ══ uma empresa só (o caso uma-empresa): 08 → 00 → 01 → T03 ══

// ── o 08 · a lista com ela já marcada ──
const q08 = E.inicioDoMundo(UMA_EMPRESA, E.UMA_JA_MARCADA, null, semente)
chk('08 · as empresas, com a única já marcada — o técnico só confirma', igual(q08, { passo: 'empresas', empresaId: M.empresa.id, uoId: null }))
chk('08 · a entrada de quem tem uma empresa só, no fluxo, é esse mesmo quadro', igual(E.inicioDoMundo(UMA_EMPRESA, null, null, vazio), q08))
chk('08 · o rótulo diz 1 EMPRESA, no singular, e o título é o da referência', E.rotuloDasEmpresas(UMA_EMPRESA) === '1 EMPRESA' && naSecao(E.UMA_JA_MARCADA, E.rotuloDasEmpresas(UMA_EMPRESA), TX.tituloEmpresas), E.rotuloDasEmpresas(UMA_EMPRESA))
const linhas08 = E.linhasDasEmpresas(UMA_EMPRESA, q08)
chk('08 · uma linha só, a Viação com 3 unidades, escolhida, como o textos.md', linhas08.length === 1 && linhas08[0].escolhida && naSecao(E.UMA_JA_MARCADA, linhas08[0].nome, linhas08[0].detalhe), linhas08.map((l) => `${l.nome} · ${l.detalhe}`).join(' / '))
const p08 = E.primarioDasEmpresas(UMA_EMPRESA, q08)
chk('08 · o primário aceso: Ver as unidades, como o textos.md', !p08.desabilitado && p08.texto === TX.verUnidades && naSecao(E.UMA_JA_MARCADA, TX.verUnidades) && !naSecao(E.UMA_JA_MARCADA, TX.escolhaEmpresa))
chk('08 · a URL: o 08 é estado, sem momento', E.momentoDoCaso(UMA_EMPRESA, q08) === null)
chk('08 · o voltar do Android não faz nada, como no 05', E.voltarNoCaso(UMA_EMPRESA, q08) === null)

// ── Ver as unidades → a 00 ──
const q00 = E.verAsUnidades(UMA_EMPRESA, q08)
chk('00 · Ver as unidades: as unidades da Viação, sem nada escolhido — a tela, o quadro que o endereço da T02 abre',
  igual(q00, { passo: 'unidades', empresaId: M.empresa.id, uoId: null }) && igual(q00, E.inicioDoMundo(UMA_EMPRESA, null, null, semente)))
chk('00 · a URL: a tela, sem momento', E.momentoDoCaso(UMA_EMPRESA, q00) === null)
chk('00 · o nome dela em cima, as unidades do herói, e sem o Trocar de empresa, como o textos.md',
  naSecao('00-tela', caixaAlta(E.rotuloDaEmpresa(UMA_EMPRESA, q00)), TX.titulo, TX.escolhaUnidade, ...nomesDas(E.unidadesDa(UMA_EMPRESA, q00.empresaId)))
  && foraDaSecao('00-tela', TX.trocarEmpresa) && !E.variasEmpresas(UMA_EMPRESA))
chk('00 · o voltar do Android não faz nada: sem saída desenhada', E.voltarNoCaso(UMA_EMPRESA, q00) === null)

// ── tocar na Várzea → o 01 ──
const q01 = E.escolherUnidade(q00, varzea.id)
chk('01 · a URL diz o 01, e o endereço do 01 abre esse mesmo quadro', E.momentoDoCaso(UMA_EMPRESA, q01) === E.UNIDADE_ESCOLHIDA && igual(E.inicioDoMundo(UMA_EMPRESA, null, E.UNIDADE_ESCOLHIDA, semente), q01))
chk('01 · o primário diz Sincronizar Garagem Várzea, sem o Trocar de empresa, como o textos.md', naSecao(E.UNIDADE_ESCOLHIDA, TX.sincronizar(varzea.nome)) && foraDaSecao(E.UNIDADE_ESCOLHIDA, TX.trocarEmpresa))
chk('01 · o voltar do Android não faz nada', E.voltarNoCaso(UMA_EMPRESA, q01) === null)
const ctxUma = E.contextoDoCaso(UMA_EMPRESA, q01, semente, varzea.id)
chk('01 · Sincronizar: a unidade no contexto, e o mundo de uma empresa só junto — a folha do menu fica sem o Trocar de empresa',
  igual(ctxUma, { uoId: varzea.id, pacote: null, empresas: { caso: UMA_EMPRESA, atual: M.empresa.id } }) && !E.temVariasEmpresas(ctxUma), JSON.stringify(ctxUma))
chk('a T03 voltando ao contexto, nesse mundo: a 00, sem nada escolhido', E.mundoAoAbrir(null, null, ctxUma) === UMA_EMPRESA && igual(E.inicioDoMundo(UMA_EMPRESA, null, null, ctxUma), q00))

// ══ a lista longa, de uma empresa só ══
const qLonga = E.inicioDoMundo(LONGA, LISTA_LONGA, null, semente)
chk('a lista longa: as nove unidades do caso, sem nada escolhido, e a empresa em cima', qLonga.passo === 'unidades' && qLonga.uoId == null
  && E.unidadesDa(LONGA, qLonga.empresaId).flatMap((g) => g.linhas).length === M.casos['lista-longa-garagens'].uos.length && caixaAlta(E.rotuloDaEmpresa(LONGA, qLonga)) === 'VIAÇÃO ATLÂNTICO SUL')
chk('o 04 pelo endereço: a Várzea escolhida (a busca a esconde); o 03, nada', E.inicioDoMundo(LONGA, null, ESCONDE, semente).uoId === varzea.id && E.inicioDoMundo(LONGA, null, SEM_RESULTADO, semente).uoId == null)
chk('a lista longa não tem o Trocar de empresa, e o voltar não faz nada', !E.variasEmpresas(LONGA) && E.voltarNoCaso(LONGA, qLonga) === null && foraDaSecao(LISTA_LONGA, TX.trocarEmpresa))
const olinda = M.casos['lista-longa-garagens'].uos.find((u) => u.nome === 'Garagem Olinda')
const ctxLonga = E.contextoDoCaso(LONGA, E.escolherUnidade(qLonga, olinda.id), vazio, olinda.id)
chk('o Sincronizar na lista longa: o mundo dela vai junto — o menu fica sem o Trocar de empresa, e a T03 volta às nove',
  ctxLonga.empresas?.caso === LONGA && !E.temVariasEmpresas(ctxLonga) && E.mundoAoAbrir(null, null, ctxLonga) === LONGA && E.inicioDoMundo(LONGA, null, null, ctxLonga).passo === 'unidades', JSON.stringify(ctxLonga))

console.log(falhas ? `\nTESTE REPROVADO — ${falhas}` : '\nTESTE APROVADO'); process.exitCode = falhas ? 1 : 0
