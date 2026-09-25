# O palco

A moldura de apresentação em volta do app. **Três peças e mais nada**, no fundo `--poco-fundo`. As referências estão em `palco/referencias/`.

## As peças

| Peça | Como é |
|---|---|
| **o quadrado** | 44 × 44, no canto de cima à esquerda, a 16px das bordas · abre o painel |
| **o celular** | no centro, **o app em tamanho real, 360 × 800**, com moldura de 8px — 376 × 816 por fora · raio 34 por fora, 26 na tela · escala inteiro pra caber na janela, **nunca maior que o real** |
| **a coluna** | 230 de largura, 40 à direita do celular, **centralizada na altura dele** — a caixa tem a altura do celular e o conteúdo fica no meio · os estados da tela aberta, linhas de 32 |
| **o painel** | 280 de largura, desliza da esquerda por cima de tudo · fecha no X ou tocando fora · escolher uma tela não fecha o painel |

## O painel · em duas partes

- **O caminho** — as telas na ordem do fluxo: T01 a T07, T09 e T10, depois T14, T13 e T16
- **As consultas** — T15, T11, T12 e T08, que o técnico abre a qualquer hora pelo menu
- no pé, **`Recomeçar do login`** — zera o estado único e volta ao começo

A tela aberta aparece marcada. As folhas não entram no painel: são momentos da T04.

## A coluna

- lista **só os estados** da tela aberta — momento é fluxo e não entra
- com mais de seis, os estados se agrupam pelo que o técnico estava fazendo — na T05: achar, conectar, conferir · o Bluetooth desligado e sem permissão (T05/16 e 17, o mundo real) vão no achar: é a busca que não começa. O grupo é o `grupo` de cada estado no `02-telas/indice.json`; o estado sem ele não aparece na coluna, e o `scripts/testar-estado.mjs` (no `npm run checar`) confere que todo estado da T05 tem um
- o marcador é **o mesmo do app**: poço de 24 com o quadrado vazado de 11, que vira lima de 11 no escolhido
- **o topo da coluna tem um lugar fixo, de 34px**: no fluxo, o texto *no fluxo · toque num estado pra ver*; num estado, o **`Voltar ao fluxo`**. Com a mesma altura, a lista nunca se mexe quando um estado abre · o `Voltar ao fluxo` devolve o instante de antes do primeiro estado aberto; se o estado veio pelo endereço, monta a semente da tela
- tela sem estados: a coluna não aparece

## O celular, nos dois jeitos

| | |
|---|---|
| **no fluxo** | o app interativo · moldura `--borda` |
| **num estado** | **o próprio app, montado pelo caso do mock, parado e sem toque** · a moldura é a mesma do fluxo, `--borda`: o estado se lê na coluna · tocar nele faz o `Voltar ao fluxo` piscar uma vez |

## As regras

- **nada reage a passar o mouse** — nem no palco. O quadrado e os itens do painel respondem no clique, com o pressionado
- dentro do celular, a seta normal do cursor; a mãozinha só nas peças do palco
- **janela estreita** — abaixo de 900px de largura, como no celular de quem recebe o link: o app em tela cheia, sem moldura e sem coluna, e o quadrado flutuando no canto. O painel continua abrindo por ele, e leva o `Voltar ao fluxo` no topo e a etiqueta no pé · num estado, tocar no app pisca o quadrado
- **janela estreita deitada** — mais larga que alta, o celular de lado: o app não gira (a regra 11 do `CLAUDE.md`). O celular volta a ser o do palco — 360 × 800, com a moldura, no centro e em escala pra caber, nunca maior que o real —, sem a coluna, e o resto do estreito fica: o quadrado, o painel com o `Voltar ao fluxo` e a etiqueta. De pé de novo, a tela cheia volta. O teclado aberto num campo do app só encolhe a altura, e não conta como deitar, nem reescala o celular: ele fica na escala que tinha, e o app encolhe até o que sobra acima do teclado — vale também pro palco largo de um tablet (`app/src/palco/retrato.js`, `logica.md` · O retrato e O teclado)
- uma **etiqueta discreta com a data e o ciclo** no canto de baixo, pra quem comenta dizer qual versão viu
- o palco nunca mostra comparação com a referência — isso é trabalho do ciclo
