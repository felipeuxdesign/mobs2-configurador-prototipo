// C12 · o movimento da T02 · Selecionar contexto (02-telas/T02-selecionar-contexto/animacao.md;
// gate C12·4, 8, 10, 18, 20 e 23). Tocar numa unidade, ou numa empresa, marca: o quadrado lima
// surge no poço, em opacidade e escala de 80% a 100%, em 150, e o da que perde a marca faz o
// mesmo ao contrário — a vencida também (C12·20, a LinhaEscolha). A cada escolha, o texto do
// primário troca no lugar, esmaecendo em 150, e o roxo troca direto (C12·23 a); com o mesmo
// texto, o Ver as unidades que volta a valer acende por uma camada (C12·8). A busca filtra: o
// layout vai direto pro fim, o que fica desliza pro lugar novo só por deslocamento, o que sai
// esmaece por cima numa cópia, o que volta esmaece no lugar, e nenhuma altura anima (C12·10 a,
// useReorganiza). As empresas e as unidades são dois quadros: o Ver as unidades e o Trocar de
// empresa esmaecem o conteúdo em 150, como entre telas (C12·4 a). O Sincronizar leva à T03 com
// a troca entre telas. Pela URL, no palco, num estado e no print, a tela abre parada; com
// reduzir movimento, tudo direto.
const C = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const desliza = (em) => ({ prop: 'transform', ms: 150, em, curva: C })
const esmaece = (em) => ({ prop: 'opacity', ms: 150, em, curva: C })
const MIOLO = esmaece('tela-miolo')
const RODAPE = esmaece('ds-rodape')
const MARCA = [esmaece('ds-quadrado-cheio'), desliza('ds-quadrado-cheio')]
const TEXTO = esmaece('ds-primario-texto')
const ACENDE = esmaece('ds-primario-antes')
const ROXO = [{ prop: 'opacity', em: 'ds-primario-desabilitado' }]
const SAI = 'ds-reorganiza-sai'
const LAYOUT = ['height', 'top', 'margin-top', 'margin-bottom', 'padding-top', 'max-height'].map((prop) => ({ prop }))
const BUSCA = 'Buscar unidade ou cidade'

export default [
  // ── abre parada, em cada quadro: pelo print, pelo endereço e pela coluna ──
  { abre: '?tela=T02&print=1' },
  { quieto: true },
  { abre: '?tela=T02' },
  { ve: 'Escolha uma unidade' },
  { quieto: true },
  { abre: '?tela=T02&momento=01-momento-escolhida' },
  { ve: 'Sincronizar Garagem Várzea' },
  { quieto: true },
  { abre: '?tela=T02&estado=02-estado-lista-longa-com-busca' },
  { ve: 'Buscar unidade ou cidade' },
  { quieto: true },
  { abre: '?tela=T02&momento=03-momento-busca-sem-resultado' },
  { ve: 'Nada com “Recreio”' },
  { quieto: true },
  { abre: '?tela=T02&momento=04-momento-busca-esconde-a-escolha' },
  { ve: 'Garagem Olinda' },
  { quieto: true },
  { abre: '?tela=T02&estado=05-estado-escolher-a-empresa' },
  { ve: 'Pra qual empresa hoje?' },
  { quieto: true },
  { abre: '?tela=T02&estado=06-estado-unidades-com-trocar-empresa' },
  { ve: 'Trocar de empresa' },
  { quieto: true },
  { abre: '?tela=T02&momento=07-momento-empresa-escolhida' },
  { ve: 'Ver as unidades' },
  { quieto: true },
  { abre: '?tela=T02&momento=07-momento-empresa-escolhida&print=1' },
  { quieto: true },
  // a otimização 400: o 08, a empresa já marcada, e o 09, a unidade escolhida com o Trocar de empresa
  { abre: '?tela=T02&estado=08-estado-uma-empresa-ja-marcada' },
  { ve: '1 EMPRESA' },
  { quieto: true },
  { abre: '?tela=T02&momento=09-momento-unidade-escolhida-com-trocar-empresa' },
  { ve: 'Sincronizar Garagem Várzea' },
  { quieto: true },
  { abre: '?tela=T02&momento=09-momento-unidade-escolhida-com-trocar-empresa&print=1' },
  { quieto: true },

  // ── T02·1 e T02·2 · o marcador e o texto do primário, a cada escolha ──
  { abre: '?tela=T02' },
  { quieto: true },
  { toca: 'Garagem Várzea', anima: [...MARCA, TEXTO] },            // a primeira escolha: Escolha uma unidade → Sincronizar Garagem Várzea
  { ve: 'Sincronizar Garagem Várzea' },
  { dorme: 200 },
  { quieto: true },
  { toca: 'Pátio Caruaru', anima: [...MARCA, esmaece('ds-quadrado'), TEXTO] },   // a vencida também: o lima surge, e o da Várzea sai
  { ve: 'Sincronizar Pátio Caruaru' },
  { dorme: 200 },
  { toca: 'Garagem Ibura', anima: [...MARCA, esmaece('ds-quadrado'), TEXTO] },
  { ve: 'Sincronizar Garagem Ibura' },
  { dorme: 200 },
  // tocar de novo não desmarca (T02·4): nada troca, e só o pressionado solta
  { toca: 'Garagem Ibura', naoAnima: [esmaece('ds-quadrado-cheio'), TEXTO] },
  { dorme: 200 },
  { quieto: true },
  // o Sincronizar: a troca entre telas, e a T03 abre baixando
  { toca: 'Sincronizar Garagem Ibura', anima: [MIOLO, RODAPE] },
  { chega: 'T03' },
  // aberta pelo 01 (a Várzea do contexto), a troca de unidade também troca o texto no lugar
  { abre: '?tela=T02&momento=01-momento-escolhida' },
  { quieto: true },
  { toca: 'Garagem Ibura', anima: [...MARCA, TEXTO] },
  { ve: 'Sincronizar Garagem Ibura' },

  // ── T02·3 · a lista filtrada (o mundo da lista longa: o 04 pelo endereço) ──
  { abre: '?tela=T02&momento=04-momento-busca-esconde-a-escolha' },
  { ve: 'Escolha uma unidade' },
  { quieto: true },
  // Garagem: a Olinda desce, as outras voltam no lugar, e a Várzea escolhida volta: o primário diz o nome dela
  { digita: 'Garagem', em: BUSCA },
  { anima: [desliza('ds-escolha'), esmaece('ds-escolha'), TEXTO], naoAnima: LAYOUT },
  { ve: 'Sincronizar Garagem Várzea' },
  { dorme: 250 },
  { quieto: true },
  // Olin de novo: a Olinda sobe dentro do cartão, o que sai esmaece por cima, e a escolha se esconde
  { digita: 'Olin', em: BUSCA },
  { anima: [desliza('ds-escolha'), esmaece(SAI), TEXTO], naoAnima: [...LAYOUT, ...ROXO] },
  { ve: 'Escolha uma unidade' },
  { dorme: 250 },
  { quieto: true },
  // de Garagem a Caruaru: os grupos de cima saem por cima, e o do Agreste sobe inteiro
  { digita: 'Garagem', em: BUSCA },
  { dorme: 250 },
  { digita: 'Caruaru', em: BUSCA },
  { anima: [desliza('t02-grupo'), esmaece(SAI)], naoAnima: LAYOUT },
  { dorme: 250 },
  // Recreio: nada acha — o grupo sai por cima e o vazio esmaece no lugar
  { digita: 'Recreio', em: BUSCA },
  { anima: [esmaece(SAI), esmaece('ds-vazio')], naoAnima: LAYOUT },
  { ve: 'Nada com “Recreio”' },
  { dorme: 250 },
  { quieto: true },
  // a lista longa rola por baixo do rodapé: o indicador de rolagem aparece e some, em 300, depois da espera (R-15, C12·20)
  { digita: 'Garagem', em: BUSCA },
  { dorme: 250 },
  { toca: 'Garagem Gravatá', anima: MARCA },
  { dorme: 1000 },
  { anima: [{ prop: 'opacity', ms: 300, em: 'ds-rolagem', curva: C }] },
  { dorme: 400 },
  { quieto: true },
  // tocar numa linha da busca marca, sem a lista andar
  { digita: 'Olin', em: BUSCA },
  { dorme: 250 },
  { toca: 'Garagem Olinda', anima: [...MARCA, TEXTO], naoAnima: [desliza('ds-escolha')] },
  { ve: 'Sincronizar Garagem Olinda' },
  { dorme: 250 },
  { quieto: true },

  // ── as empresas e as unidades: dois quadros (o 07, vivo pelo endereço) ──
  { abre: '?tela=T02&momento=07-momento-empresa-escolhida' },
  { quieto: true },
  // a empresa sem unidades: o Ver as unidades espera, apagado, com o mesmo texto, e o roxo sai direto (C12·18)
  { toca: 'Transportes Capibaribe', anima: [...MARCA, esmaece('ds-quadrado')], naoAnima: [TEXTO, ACENDE, ...ROXO] },
  { desligado: 'Ver as unidades' },
  { dorme: 200 },
  // a Viação de novo: o Ver as unidades volta a valer, com o mesmo texto, e acende por uma camada
  { toca: 'Viação Atlântico Sul', anima: [...MARCA, esmaece('ds-quadrado'), ACENDE], naoAnima: [TEXTO] },
  { dorme: 200 },
  { quieto: true },
  // Ver as unidades: o quadro troca inteiro, e o conteúdo esmaece como entre telas; o
  // primário nasce com o quadro (a chave dele), e o texto dele não esmaece de novo por
  // dentro, nem acende (movimento.md · o que nasce com o quadro)
  { toca: 'Ver as unidades', anima: [MIOLO, RODAPE], naoAnima: [TEXTO, ACENDE] },
  { chega: 'T02', momento: null },
  { ve: 'Onde você está hoje?' },
  { dorme: 200 },
  { quieto: true },
  { toca: 'Garagem Várzea', anima: [...MARCA, TEXTO] },
  { chega: 'T02', momento: '09-momento-unidade-escolhida-com-trocar-empresa' },
  { dorme: 200 },
  // o Trocar de empresa volta às empresas, com a atual marcada: a troca de quadro de novo
  { toca: 'Trocar de empresa', anima: [MIOLO, RODAPE], naoAnima: [TEXTO, ACENDE] },
  { chega: 'T02', momento: '07-momento-empresa-escolhida' },
  { dorme: 200 },
  { quieto: true },
  // o voltar do Android nas unidades é o Trocar de empresa: o mesmo esmaecer
  { toca: 'Ver as unidades' },
  { chega: 'T02', momento: null },
  { dorme: 200 },
  { tecla: 'Escape' },
  { anima: [MIOLO, RODAPE], naoAnima: [TEXTO, ACENDE] },
  { chega: 'T02', momento: '07-momento-empresa-escolhida' },
  { dorme: 200 },
  // as empresas sem escolha: a coluna do 05 é parada, e o Entrar abre o herói nelas
  // (a otimização 400) — a primeira escolha troca o texto no lugar (Escolha uma empresa →
  // Ver as unidades), e o roxo troca direto, sem a camada (C12·23)
  { abre: '?tela=T02&estado=05-estado-escolher-a-empresa' },
  { ve: 'Escolha uma empresa' },
  { quieto: true },
  { abre: '' },
  { digita: 'Varzea26', em: 'SENHA' },
  // a espera do Entrar (decisão do diretor, 27/09): o primário diz Entrando…, desabilitado,
  // e a T02 chega 1,2 s depois, com a troca entre telas — a resposta do toque
  { toca: 'Entrar', anima: [TEXTO] },
  { desligado: 'Entrando…' },
  { chega: 'T02', momento: null, entre: [800, 1700] },
  { anima: [MIOLO, RODAPE] },
  { ve: 'Escolha uma empresa' },
  { dorme: 200 },
  { quieto: true },
  { toca: 'Viação Atlântico Sul', anima: [...MARCA, TEXTO], naoAnima: [ACENDE] },
  { chega: 'T02', momento: '07-momento-empresa-escolhida' },
  { ve: 'Ver as unidades' },
  { dorme: 200 },
  { quieto: true },

  // ── com reduzir movimento: tudo direto ──
  { reduzir: true },
  { abre: '?tela=T02' },
  { toca: 'Garagem Várzea' },
  { quieto: true },
  { ve: 'Sincronizar Garagem Várzea' },
  { toca: 'Pátio Caruaru' },
  { quieto: true },
  { toca: 'Sincronizar Pátio Caruaru' },
  { chega: 'T03' },
  { quieto: true },
  { abre: '?tela=T02&momento=04-momento-busca-esconde-a-escolha' },
  { digita: 'Garagem', em: BUSCA },
  { quieto: true },
  { ve: 'Sincronizar Garagem Várzea' },
  { digita: 'Recreio', em: BUSCA },
  { quieto: true },
  { abre: '?tela=T02&momento=07-momento-empresa-escolhida' },
  { toca: 'Transportes Capibaribe' },
  { quieto: true },
  { toca: 'Viação Atlântico Sul' },
  { quieto: true },
  { toca: 'Ver as unidades' },
  { quieto: true },
  { chega: 'T02', momento: null },
  { toca: 'Trocar de empresa' },
  { quieto: true },
  { chega: 'T02', momento: '07-momento-empresa-escolhida' },
  { reduzir: false },
]
