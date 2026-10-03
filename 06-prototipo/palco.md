# O palco

A moldura de apresentação em volta do app. **Três peças e mais nada**, no fundo `--fundo-faixa` — a cor das superfícies do app. As referências estão em `palco/referencias/`.

## As peças

| Peça | Como é |
|---|---|
| **o quadrado** | 44 × 44, no canto de cima à esquerda, a 16px das bordas · abre o painel |
| **o celular** | no centro, **o app em tamanho real, 360 × 800** · a moldura é **a silhueta, sem marca**: **uma borda preta de 8px** em volta — 376 × 816 por fora · **canto de 36 por fora e 28 na tela, concêntricos** (28 + 8 = 36) · a borda **quase-preta `#050407`**, mais escura que a tela, com **um fio de luz de 1px por dentro** (`rgba(255,255,255,0.14)`) e um contorno escuro de 1px por fora — o acabamento de material, sem metal nem botão · **a sombra suave embaixo**, `0 12px 24px` a 45% — os 8% de fundo claro não aparecem no escuro · sem metal, sem câmera, sem botão · escala inteiro pra caber na janela, **nunca maior que o real** |
| **a coluna** | 230 de largura, 40 à direita do celular, **centralizada na altura dele** — a caixa tem a altura do celular e o conteúdo fica no meio · os estados da tela aberta, linhas de 32 |
| **o painel** | 280 de largura, desliza da esquerda por cima de tudo · fecha no X ou tocando fora · escolher uma tela não fecha o painel |

- **no protótipo** (decisão 43, revista no pacote 4) · a silhueta: os valores moram em `app/src/palco/palco-tokens.css` (a borda, os dois raios concêntricos, o fio de luz, o contorno e a sombra), e a moldura escala junto com a tela, nunca maior que o real (D3)

## O painel · em duas partes

- **O caminho** — as telas na ordem do fluxo: T01 a T05, a T07 e a T06, T09 e T10, depois T14, T13 e T16 · o diagnóstico vem antes do vínculo, como o quadro 04 desenha
- **As consultas** — T15, T11 e T12, que o técnico abre a qualquer hora pelo menu · a T07, o Diagnóstico do módulo, fica só no caminho
- no pé, **a data da última atualização** — *Atualizado em 04/10/2026*, a data do `CHANGELOG` (`app/src/palco/versao.js`)
  - no protótipo (o diretor, 04/10): o `Recomeçar do login` saiu do pé — tocar na T01 do painel faz o mesmo, zera o estado único e abre o login, porque a semente da T01 é vazia; e a etiqueta do canto do palco saiu junto, pra a data morar num lugar só. A cena 04 desenha o botão: o desvio fica nomeado até o quadro ser redesenhado

A tela aberta aparece marcada. As folhas não entram no painel: são momentos da T04.

## A coluna

- lista **só os estados** da tela aberta — momento é fluxo e não entra
- **quem entra na coluna é o campo `coluna` do `indice.json`**: verdadeiro pros estados que nascem de uma condição do mundo, falso pros que abrem por um toque — hoje, as três folhas de trocar da T04 (08, 09 e 14). A coluna da T04 mostra 4 dos 7
- **o momento que nasce de dentro de um estado também entra**, logo depois dele, **alinhado às outras linhas**: no índice, `coluna` verdadeiro e `depoisDe` com o estado de onde ele nasce · abre parado, como os estados · hoje são dois: a T07/06, *atualizando o firmware*, depois da T07/04, e a T14/06, *correção solicitada*, depois da T14/04 · sem isso, eles só se alcançam tocando dentro de um estado, e o estado aberto pela coluna é parado
- com mais de seis estados **na coluna** — e a coluna só lista os estados que nascem de uma condição —, eles se agrupam pelo que o técnico estava fazendo — na T07: o módulo e a CAN
  - no protótipo (o pacote 1): o grupo é o `grupo` de cada estado no `02-telas/indice.json`, `modulo` ou `can`, que a coluna escreve *O módulo* e *A CAN* — o `scripts/testar-estado.mjs` (no `npm run checar`) confere que todo estado da T07 tem um. A coluna do protótipo lista os estados do `indice.json`: a da T01 tem 8 e a da T04 tem 4, e as duas ficam soltas, porque só a T07 tem grupo. O *T01 e T02 não mostram coluna* da cena 00 vai pro arquiteto
  - no protótipo (o pacote 3, D2): a coluna lê o campo `coluna` de cada estado no `indice.json` (`app/src/palco/telas.js` · `estadosDa`) — falso, fica fora; sem o campo, entra. Fora da coluna, a 08, a 09 e a 14 da T04 continuam abrindo pelo endereço, com o `Voltar ao fluxo` no topo e nenhuma linha marcada. A folha da cena 00 desenha 3 linhas da coluna da T04, e a coluna tem 4 (o Sem conexão é a quarta): a bancada do palco dá a diferença com o nome
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

