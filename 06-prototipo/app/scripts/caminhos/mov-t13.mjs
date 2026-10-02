// T13 · o movimento do checklist (02-telas/T13-checklist/animacao.md; gate C12·4, C12·6, C12·8, C12·10,
// C12·13, C12·18, C12·23, C12·36, C12·37, C12·42, C12·46 e C12·47):
//   · a seção abre (T13·1, C12·46): o cartão cresce no lugar, as de baixo descem por transform, a
//     seta gira, e os itens esmaecem junto, em 200 — não é troca de quadro;
//   · o nível do item (C12·4): abrir o item, passar ao próximo depois do Tirar foto e voltar às
//     seções trocam o desenho inteiro — o conteúdo esmaece em 150, como entre telas; o rodapé nasce
//     com o quadro, e o texto do primário não esmaece de novo por dentro;
//   · a barra do checklist (T13·2, C12·36): na volta às seções, parte do que tinha quando o item
//     abriu e avança em 300 até o novo; sem nada novo, não anda; no Finalizar, completa;
//   · o check das fotos tiradas (T13·4, C12·37): entra com a troca da volta, sem esmaecer de novo;
//   · a caixa do não conforme (C12·47): marcar, ela desliza pro lugar novo em 150 e o campo esmaece
//     embaixo dela; o quadrado surge; desmarcar faz o mesmo ao contrário (C12·6);
//   · o registro do problema (T13·4, C12·42, C12·10): esmaece no lugar do visor, que sai esmaecendo
//     por cima; a caixa e o campo sobem pro lugar novo;
//   · o botão diz o que falta (C12·23): o texto novo esmaece no lugar, o roxo troca direto; o
//     Fotografar o problema que desabilita no toque não mostra o roxo (C12·18);
//   · o veredito (T13·5): no Finalizar, esmaece em 150 no lugar, a barra completa e o texto do
//     primário troca no lugar;
//   · o Encerrar sem homologar? nasce e some em 150 com o véu (a peça, C12·43);
//   · a ciência (T13·6) só se alcança num estado da coluna, parado: a prova é o espécime
//     mov-check-ciencia (mov-check, C12·13).
// A tela abre parada pela URL, em cada momento e estado, e no print. Com reduzir, nada anda.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const esmaece = (em, ms = 150) => ({ prop: 'opacity', ms, em, curva: C })
const desliza = (em, ms = 150) => ({ prop: 'transform', ms, em, curva: C })
const TROCA = [esmaece('tela-miolo'), esmaece('ds-rodape')]
const MIOLO = esmaece('tela-miolo')
const SECAO = [esmaece('ds-secao-ck-corpo', 200), desliza('ds-secao-ck', 200), desliza('ds-icone', 200)]
const FECHA = [desliza('ds-secao-ck', 200), desliza('ds-icone', 200)]
const BARRA = desliza('ds-barra-ck', 300)
const TEXTO = esmaece('ds-primario-texto')                 // o texto do primário que troca no lugar (C12·23)
const TEXTO_NASCE = { prop: 'opacity', em: 'ds-primario-texto-nasce' }
const SEM_ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]   // C12·18
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]
const CHECKBOX_SOLTA = { prop: 'opacity', ms: 100, em: 'ds-checkbox', curva: C }   // o pressionado do checkbox solta em 100, como a linha (C12·17, G14 a · o conserto de 27/09)
const DESMARCA = [esmaece('ds-quadrado'), desliza('ds-quadrado')]
const CAIXA = desliza('t13-nao-conforme')
const CAMPO = esmaece('ds-campo-texto')
const CAMPO_SAI = esmaece('ds-justificativa-sai')
const REGISTRO = esmaece('ds-foto-tirada')
const VISOR = esmaece('ds-visor')
const SAI = esmaece('ds-reorganiza-sai')                    // o que sai, por cima, esmaecendo (C12·10)
const VEREDITO = esmaece('ds-veredito-ck')
const DIALOGO = { prop: 'opacity', ms: 150, em: 'ds-dialogo', curva: C }
const M02 = '02-momento-b-montagem-aberta'
const M07 = '07-momento-responder-item'
const M08 = '08-momento-nao-conforme-com-justificativa'
const M15 = '15-momento-problema-fotografado'
const MOMENTOS = [
  '01-momento-a-identificacao-aberta', M02, '03-momento-c-hardware-aberta', '04-momento-d-configuracao-aberta',
  '05-momento-e-teste-dinamico-aberta', '06-momento-f-servidor-aberta', M07, M08, '11-momento-homologado',
  '12-momento-b-com-ressalva', '13-momento-e-resolvida', M15,
]
const ESTADOS = ['09-estado-item-reprovado', '10-estado-finalizar-com-a-secao-f-falhando', '14-estado-homologado-sem-localizacao']
const PARADA = [{ quieto: true }, { dorme: 700 }, { quieto: true }]

export default [
  // ── abre parada: pela URL, em cada momento e em cada estado, e no print ──
  { abre: '?tela=T13' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T13&momento=${m}` }, ...PARADA]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T13&estado=${e}` }, ...PARADA]),
  { abre: '?tela=T13&print=1' },
  ...PARADA,
  ...MOMENTOS.flatMap((m) => [{ abre: `?tela=T13&momento=${m}&print=1` }, ...PARADA]),
  ...ESTADOS.flatMap((e) => [{ abre: `?tela=T13&estado=${e}&print=1` }, ...PARADA]),

  // ── a seção abre no lugar: não é troca de quadro (T13·1, C12·46) ──
  { abre: '?tela=T13' },
  { quieto: true },
  { toca: 'B · Montagem', anima: SECAO, naoAnima: [MIOLO] },
  { chega: 'T13', momento: M02 },
  { dorme: 300 },
  { quieto: true },
  // tocar de novo fecha: o mesmo ao contrário (C12·6) — a seta volta e as de baixo sobem, em 200; os
  // itens saem com o cartão, que já tem o tamanho novo e corta o que passa da borda (C12·10)
  { toca: 'B · Montagem', anima: FECHA, naoAnima: [MIOLO, esmaece('ds-secao-ck-corpo', 200)] },
  { chega: 'T13', momento: null },
  { dorme: 300 },
  { quieto: true },

  // ── o nível do item: abrir, o próximo depois do Tirar foto (C12·4) ──
  // (do 13, com o ciclo feito: no fim das fotos, o Finalizar acende)
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { toca: 'B · Montagem', anima: SECAO, naoAnima: [MIOLO] },
  { chega: 'T13', momento: M02 },
  { dorme: 300 },
  { toca: 'Módulo', anima: TROCA, naoAnima: [BARRA] },
  { chega: 'T13', momento: M07 },
  { ve: 'Módulo fixado e posicionado' },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Tirar foto', anima: TROCA, naoAnima: [TEXTO_NASCE] },
  { ve: 'Antena GPS posicionada e livre' },
  { dorme: 250 },
  { quieto: true },

  // ── o não conforme (C12·47): a caixa desliza, o campo esmaece embaixo dela, o quadrado surge ──
  { toca: 'Não está conforme', anima: [...MARCA, CAIXA, CAMPO, TEXTO, CHECKBOX_SOLTA], naoAnima: [MIOLO] },
  { chega: 'T13', momento: M08 },
  { ve: 'Enquadre o problema' },
  { dorme: 250 },
  { quieto: true },
  // desmarcar: o mesmo ao contrário — a caixa desce, o campo de antes esmaece por cima (C12·6)
  { toca: 'Não está conforme', anima: [...DESMARCA, CAIXA, CAMPO_SAI, TEXTO, CHECKBOX_SOLTA], naoAnima: [MIOLO] },
  { chega: 'T13', momento: M07 },
  { dorme: 250 },
  { quieto: true },
  { toca: 'Não está conforme', anima: [CAIXA, CAMPO, TEXTO] },
  { chega: 'T13', momento: M08 },
  { dorme: 250 },
  // sem o texto, o Fotografar o problema vira o Conte o que aconteceu, apagado: sem o roxo (C12·18);
  // o registro esmaece no lugar do visor, que sai por cima, e a caixa sobe (C12·42, C12·10)
  { digita: '', em: 'O QUE ACONTECEU' },
  { dorme: 250 },
  { toca: 'Fotografar o problema', anima: [REGISTRO, SAI, CAIXA, TEXTO], naoAnima: [...SEM_ROXO, MIOLO] },
  { chega: 'T13', momento: M15 },
  { desligado: 'Conte o que aconteceu' },
  { dorme: 250 },
  { quieto: true },
  // o texto chega: o Salvar com ressalva, com o texto novo no lugar
  { digita: 'Suporte trincado; fixei com abraçadeira até a troca.', em: 'O QUE ACONTECEU' },
  { anima: [TEXTO] },
  { ve: 'Salvar com ressalva' },
  { dorme: 250 },
  // desmarcar com a foto guardada (15 → 07): o visor volta esmaecendo, o registro e o campo saem por cima
  { toca: 'Não está conforme', anima: [VISOR, SAI, CAMPO_SAI, CAIXA, TEXTO] },
  { chega: 'T13', momento: M07 },
  { dorme: 250 },
  // e marcar de novo (07 → 15): o registro esmaece no lugar do visor, o campo embaixo da caixa
  { toca: 'Não está conforme', anima: [REGISTRO, SAI, CAMPO, CAIXA, TEXTO] },
  { chega: 'T13', momento: M15 },
  { dorme: 250 },
  { quieto: true },
  // Salvar com ressalva: o próximo item, pela troca; o texto não esmaece de novo por dentro
  { toca: 'Salvar com ressalva', anima: TROCA, naoAnima: [TEXTO_NASCE, CAIXA] },
  { chega: 'T13', momento: M07 },
  { ve: 'Chicote e emendas protegidos' },
  { dorme: 250 },
  { toca: 'Tirar foto', anima: TROCA },
  { ve: 'Leitor posicionado' },
  { dorme: 250 },
  // o Painel é foto a tirar, como os outros quatro (decisão 52)
  { toca: 'Tirar foto', anima: TROCA },
  { ve: 'Painel com hodômetro e horímetro legíveis' },
  { dorme: 250 },
  // o último: a volta às seções, e a barra avança do que tinha quando o item abriu (C12·36, C12·37)
  { toca: 'Tirar foto', anima: [...TROCA, BARRA], naoAnima: [esmaece('ds-glifo')] },   // o check entra com a troca
  { chega: 'T13', momento: '12-momento-b-com-ressalva' },
  { ve: '5 de 5' },
  { dorme: 400 },
  { quieto: true },
  // ── o Finalizar (T13·5): o veredito esmaece no lugar, a barra completa, o texto do primário troca;
  // a B aberta fecha (as de baixo dela sobem, a peça) ──
  { toca: 'Finalizar instalação', anima: [VEREDITO, BARRA, TEXTO, ...FECHA], naoAnima: [MIOLO] },
  { chega: 'T13', momento: '11-momento-homologado' },
  { ve: 'Instalação homologada às 14:30' },
  { dorme: 400 },
  { quieto: true },
  // com as seções fechadas: o espaço do veredito abre direto, e nenhuma seção desliza (C12·9 (a),
  // a revisão de 27/09: a lista media o lugar de cada seção fora dela, e as seis desciam)
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { toca: 'B · Montagem' },
  { dorme: 300 },
  { toca: 'Módulo' },
  { dorme: 250 },
  { toca: 'Tirar foto' },
  { dorme: 250 },
  { toca: 'Tirar foto' },
  { dorme: 250 },
  { toca: 'Tirar foto' },
  { dorme: 250 },
  { toca: 'Tirar foto' },
  { dorme: 250 },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: M02 },
  { ve: '5 de 5' },
  { dorme: 400 },
  { toca: 'B · Montagem', anima: FECHA },
  { chega: 'T13', momento: null },
  { dorme: 300 },
  { toca: 'Finalizar instalação', anima: [VEREDITO, BARRA, TEXTO], naoAnima: [MIOLO, { prop: 'transform', em: 'ds-secao-ck' }, { prop: 'transform', em: 'ds-icone' }] },
  { chega: 'T13', momento: '11-momento-homologado' },
  { dorme: 400 },
  { quieto: true },

  // ── a volta sem nada novo: a troca, e a barra não anda; o voltar do Android faz o mesmo ──
  { abre: `?tela=T13&momento=${M02}` },
  { toca: 'Módulo', anima: TROCA },
  { chega: 'T13', momento: M07 },
  { dorme: 250 },
  { toca: 'Voltar ao checklist', anima: TROCA, naoAnima: [BARRA] },
  { chega: 'T13', momento: M02 },
  { dorme: 250 },
  { toca: 'Módulo', anima: TROCA },
  { dorme: 250 },
  { toca: 'Tirar foto', anima: TROCA },
  { dorme: 250 },
  { tecla: 'Escape' },
  { anima: [...TROCA, BARRA] },
  { chega: 'T13', momento: M02 },
  { ve: 'você fotografa 5 itens' },
  { dorme: 400 },
  { quieto: true },

  // ── o Encerrar sem homologar? (decisão 36): nasce e some em 150, com o véu ──
  { toca: 'ENCERRAR', anima: [DIALOGO] },
  { ve: 'Encerrar sem homologar?' },
  { dorme: 250 },
  { toca: 'Continuar a instalação', anima: [DIALOGO], naoAnima: [MIOLO] },
  { naoVe: 'Encerrar sem homologar?' },
  { dorme: 250 },
  { quieto: true },

  // ── com reduzir movimento: nada anda ──
  { reduzir: true },
  { abre: `?tela=T13&momento=${M02}` },
  { quieto: true },
  { toca: 'Módulo' },
  { quieto: true },
  { toca: 'Não está conforme' },
  { quieto: true },
  { toca: 'Fotografar o problema' },
  { quieto: true },
  { toca: 'Não está conforme' },
  { quieto: true },
  { toca: 'Tirar foto' },
  { quieto: true },
  { toca: 'Voltar ao checklist' },
  { chega: 'T13', momento: M02 },
  { quieto: true },
  { toca: 'B · Montagem' },
  { quieto: true },
  { toca: 'B · Montagem' },
  { quieto: true },
  // o Finalizar, direto: o veredito, a barra e o texto do primário
  { abre: '?tela=T13&momento=13-momento-e-resolvida' },
  { toca: 'B · Montagem' },
  { toca: 'Módulo' },
  { toca: 'Tirar foto' },
  { toca: 'Tirar foto' },
  { toca: 'Tirar foto' },
  { toca: 'Tirar foto' },
  { toca: 'Tirar foto' },
  { chega: 'T13', momento: M02 },
  { toca: 'Finalizar instalação' },
  { quieto: true },
  { chega: 'T13', momento: '11-momento-homologado' },
  { reduzir: false },

  // ── o palco (a janela larga): o estado da coluna e a volta ao fluxo abrem parados ──
  { abre: `?tela=T13&momento=${M02}` },
  { janela: [1440, 900] },
  { quieto: true },
  { palco: 'Finalizar com a Seção F falhando' },
  { chega: 'T13', estado: ESTADOS[1] },
  ...PARADA,
  { palco: 'Item reprovado' },
  { chega: 'T13', estado: ESTADOS[0] },
  ...PARADA,
  { palco: 'Voltar ao fluxo' },
  { chega: 'T13', estado: null },
  ...PARADA,
]
