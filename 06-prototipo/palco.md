# O palco

A moldura de apresentação em volta do app. **Três peças e mais nada**, no fundo `--poco-fundo`. As referências estão em `palco/referencias/`.

## As peças

| Peça | Como é |
|---|---|
| **o quadrado** | 44 × 44, no canto de cima à esquerda, a 16px das bordas · abre o painel |
| **o celular** | no centro, **o app em tamanho real, 360 × 800** · a moldura é um celular sem marca: **metal de 3px** em volta e **aro preto de 10px** — 386 × 826 por fora · **canto de 57 por fora e 44 na tela**, concêntricos · metal `#3C3C43`, aro `#050507`, um fio de 1px `#17171B` por fora · sem câmera, sem botão, sem sombra · escala inteiro pra caber na janela, **nunca maior que o real** |
| **a coluna** | 230 de largura, 40 à direita do celular, **centralizada na altura dele** — a caixa tem a altura do celular e o conteúdo fica no meio · os estados da tela aberta, linhas de 32 |
| **o painel** | 280 de largura, desliza da esquerda por cima de tudo · fecha no X ou tocando fora · escolher uma tela não fecha o painel |

- **no protótipo** (decisão 43) · a moldura é o metal na borda e o aro no recheio, e os dois fios são sombra, que não soma no tamanho: o de `#17171B` por fora do metal e o de `rgba(255,255,255,0.04)` por dentro dele, que o `MUDANCAS.md` da entrega e os quadros desenham · os valores moram em `app/src/palco/palco-tokens.css` (`--palco-metal`, `--palco-aro`, `--palco-raio-fora`, e o `--palco-raio-tela`, que sai dele menos a moldura: concêntrico por construção) · o celular fica no centro da janela nos dois eixos, com a mesma folga em cima e embaixo, e a coluna a 40 dele, com a altura dele (826 em tamanho real, a altura do celular na escala) · a escala é a menor entre 1, (altura − 48) / 826 e (largura − 48 − 2 × 270) / 386 — a 1440 × 900, o tamanho real, com 37 em cima e embaixo · o painel passa por cima, e o celular e a coluna não se mexem quando ele abre (o quadro 00: *não se mexe quando o painel abre*); o quadro 04 desenha os dois 90 à direita, juntos · a régua do palco (`app/scripts/palco.mjs`) confere a moldura em tamanho real, número a número, e o anel dela contra o do quadro, com o palco numa janela de 792, onde a escala põe o celular na altura do quadro (744)

## O painel · em duas partes

- **O caminho** — as telas na ordem do fluxo: T01 a T05, a T07 e a T06, T09 e T10, depois T14, T13 e T16 · o diagnóstico vem antes do vínculo, como o quadro 04 desenha
- **As consultas** — T15, T11 e T12, que o técnico abre a qualquer hora pelo menu · a T07, o Diagnóstico do módulo, fica só no caminho
- no pé, **`Recomeçar do login`** — zera o estado único e volta ao começo

A tela aberta aparece marcada. As folhas não entram no painel: são momentos da T04.

## A coluna

- lista **só os estados** da tela aberta — momento é fluxo e não entra
- com mais de seis estados **na coluna** — e a coluna só lista os estados que nascem de uma condição —, eles se agrupam pelo que o técnico estava fazendo — na T07: o módulo e a CAN
  - no protótipo (o pacote 1): o grupo é o `grupo` de cada estado no `02-telas/indice.json`, `modulo` ou `can`, que a coluna escreve *O módulo* e *A CAN* — o `scripts/testar-estado.mjs` (no `npm run checar`) confere que todo estado da T07 tem um. A coluna do protótipo lista os estados do `indice.json`: a da T01 tem 8 e a da T04 tem 7, e as duas ficam soltas, porque só a T07 tem grupo. O *T01 e T02 não mostram coluna* da cena 00 vai pro arquiteto
- o marcador é **o mesmo do app**: poço de 24 com o quadrado vazado de 11, que vira lima de 11 no escolhido
- **o topo da coluna tem um lugar fixo, de 34px**: no fluxo, o texto *no fluxo · toque num estado pra ver*; num estado, o **`Voltar ao fluxo`**. Com a mesma altura, a lista nunca se mexe quando um estado abre · o `Voltar ao fluxo` devolve o instante de antes do primeiro estado aberto; se o estado veio pelo endereço, monta a semente da tela
  - no protótipo (a empresa antes da unidade, a otimização 400): na T02, o quadro das empresas ou das unidades vai pro estado único no `Ver as unidades` e no `Trocar de empresa` (`contexto.empresas`, `app/src/telas/T02/empresas.js` · `contextoDoQuadro`), e o `Voltar ao fluxo` devolve o quadro de antes, no mesmo mundo: as unidades da Viação depois do `Ver as unidades` — do `Entrar`, do `Trocar de empresa` do menu ou do `07` aberto pelo endereço —, e o `07` depois do `Trocar de empresa` (o roteiro `app/scripts/caminhos/empresa.mjs` prova). Até o fechamento de 27/09, o quadro morava só na tela, e o `Voltar ao fluxo` do quadro do `06` caía nas empresas (o `05` ou o `07`), ou, do `07` aberto pelo endereço, na `T02/00` de uma empresa só. A escolha tocada dentro do quadro ainda não vai: o `Voltar ao fluxo` do `07` e do `09` traz a escolha do endereço — a Viação, a Várzea —, e não a tocada (a pergunta ao diretor, de 24/09: gravar a escolha no toque)
- tela sem estados: a coluna não aparece

## O celular, nos dois jeitos

| | |
|---|---|
| **no fluxo** | o app interativo · a moldura do celular |
| **num estado** | **o próprio app, montado pelo caso do mock, parado e sem toque** · **a mesma moldura** — o que avisa que está parado é o `Voltar ao fluxo`, que pisca uma vez quando se toca no app |

- **no protótipo** · a piscada é só do toque: cada toque no app parado pisca uma vez o `Voltar ao fluxo` (no estreito, o quadrado), e nada mais pisca — abrir um estado, trocar de estado pela coluna, voltar ao fluxo e passar a janela de larga a estreita, ou de volta, não piscam: a peça que nasce, nasce quieta: o contador da piscada volta a 0 quando um estado abre ou fecha e quando a janela passa de larga a estreita, ou de volta (`app/src/palco/Palco.jsx`; o roteiro `app/scripts/caminhos/pisca.mjs` prova, 62 passos, `node scripts/caminho.mjs pisca`) · até o conserto de 26/09, o contador da piscada nunca voltava a 0, e depois da primeira piscada todo estado aberto a partir do fluxo já nascia piscando — um aviso falso, agora que a moldura é uma só; e, até a segunda passada do conserto, um toque na larga, a janela estreita e de volta à larga, sem tocar no meio, ainda fazia o `Voltar ao fluxo` piscar sozinho

## As regras

- **nada reage a passar o mouse** — nem no palco. O quadrado e os itens do painel respondem no clique, com o pressionado
- dentro do celular, a seta normal do cursor; a mãozinha só nas peças do palco
- **janela estreita** — abaixo de 900px de largura, como no celular de quem recebe o link: o app em tela cheia, sem moldura e sem coluna, e o quadrado flutuando no canto. O painel continua abrindo por ele, e leva o `Voltar ao fluxo` no topo e a etiqueta no pé · num estado, tocar no app pisca o quadrado
- **no celular de verdade** (a janela estreita num aparelho de toque): o palco sai do caminho — **sem o quadrado** por cima do app, e o endereço não acompanha a navegação, então recarregar volta ao que foi aberto (o login, no link principal) e o link direto de uma tela ou estado continua abrindo certo. O painel ainda abre pelo `&painel=1`. No computador, com a janela estreita ou larga, o quadrado fica (diretor, 25/09: o celular é pra ver, o teste é no computador) · **a barra do Android desenhada também sai no celular de verdade**, com o app na tela inteira: o aparelho já mostra a barra dele, e duas barras denunciariam o site. A altura dela vira zero, e o véu, as folhas e o topo do login acompanham. No computador, no print e no celular deitado (que desenha o celular), ela fica
- **janela estreita deitada** — mais larga que alta, o celular de lado: o app não gira (a regra 11 do `CLAUDE.md`). O celular volta a ser o do palco — 360 × 800, com a moldura, no centro e em escala pra caber, nunca maior que o real —, sem a coluna, e o resto do estreito fica: o quadrado, o painel com o `Voltar ao fluxo` e a etiqueta. De pé de novo, a tela cheia volta. O teclado aberto num campo do app só encolhe a altura, e não conta como deitar, nem reescala o celular: ele fica na escala que tinha, e o app encolhe até o que sobra acima do teclado — vale também pro palco largo de um tablet (`app/src/palco/retrato.js`, `logica.md` · O retrato e O teclado)
- uma **etiqueta discreta com a data e o ciclo** no canto de baixo, pra quem comenta dizer qual versão viu
- o palco nunca mostra comparação com a referência — isso é trabalho do ciclo

## O link publicado

O link publicado abre direto no palco, sem senha (diretor, 26/09: a porta da senha saiu — ela não protegia de verdade, porque a senha ia no código que o navegador baixa, e só atrapalhava quem abre o link muitas vezes). O site continua pedindo pra não entrar em buscador (`noindex`, no `index.html`). Quem tiver o link, abre.

- **recarregar a página recomeça do login, no computador também** (diretor, 26/09): o endereço continua acompanhando a navegação — é ele que se copia pra mandar uma tela —, mas a página recarregada abre a T01, como o `Recomeçar do login`, e o painel fechado. Um link aberto de novo ainda abre a tela, o estado ou o painel dele. O print, a vitrine e as réguas abrem cada endereço de novo e nunca recarregam, então não mudam (`app/src/palco/rotas.js` · `recarregou`; o roteiro `app/scripts/caminhos/recarregar.mjs` prova)
  - no protótipo (a empresa antes da unidade, a otimização 400): três quadros do caminho do herói não têm endereço próprio, e o endereço copiado neles abre outra coisa — as empresas dele, nada escolhido (o `05`, a entrada depois do `Entrar`), e as unidades da Viação com o `Trocar de empresa` (o quadro do `06`) ficam em `?tela=T02`, sem momento, porque o `05` e o `06` são estados, e estado parado não anda; e a folha de trocar de unidade do herói, com o `Trocar de empresa` (o quadro do `T04/14`), fica em `?tela=T04&momento=07-momento-folha-trocar-de-garagem`, o endereço da `T04/07`. Abertos de novo, os dois endereços mostram o mundo de uma empresa só: as unidades sem o `Trocar de empresa` (a `T02/00`, a semente da T02) e a folha sem ele (a `T04/07`). O link do estado (`&estado=05-…`, `&estado=06-…`, o `T04/14`) mostra o quadro, parado (desvio nomeado, pro arquiteto: dar endereço a esses três quadros no fluxo, ou aceitar)

