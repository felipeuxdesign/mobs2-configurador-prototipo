# Gate · pacote 30 — o modo claro e as correções finas

Gate sem espera. Por cima do 29 (0a4481b), do 29b (9baf566) e do 29c (fc82bf0).

## 1 · Censo

**201 referências** — 15 telas, **82 estados, 104 momentos** · **10 folhas** no design system (a 10, *O modo claro*, nova; as outras nove dizem *de 10*) · **112 peças** no catálogo (entraram o interruptor e o avatar da conta) · **299 tokens** (ver os desvios) · 109 histórias · 63 casos · os textos do PM e o mock sem mudança.

O pacote trouxe 373 arquivos (371 mudam, 2 entram). Os 363 de referência — as 169 telas com o texto de apoio novo, as nove folhas e as cinco cenas do palco, e a folha 10 em HTML e PNG — entraram inteiros. As fichas da T04, o catálogo, as leis, o movimento, o README do design system, o `tokens.css`, o `tokens.json` e o CHANGELOG vieram de cópias antigas (o `tokens.css` do pacote tem 173 linhas, o nosso 382): entraram só as linhas deste pacote, listadas no CHANGELOG. **A última linha do gate:** nenhuma divergência bloqueou — o commit foi feito.

## 2 · O modo claro, de ponta a ponta

Pelo roteiro novo [`claro`](../app/scripts/caminhos/claro.mjs), **424 passos, aprovado**:

- **o app abre escuro** (o roteiro começa com o armazenamento limpo: a raiz sem `data-tema`);
- **na folha da Conta, ligar o *Modo claro* troca o app inteiro, com a animação**: a bolinha desliza e cresce em 200 (`transform` na `ds-interruptor-bolinha`) e o app troca as cores no lugar em 300 (`background-color`, com a folha aberta — o *Sair da conta* continua à vista) · **desligar volta** (a raiz sem `data-tema`, com as mesmas duas animações);
- **recarregar com o claro ligado abre claro, inclusive o login** (o F5 do navegador; o palco recomeça do login, e o login está no claro);
- **as 201 referências no claro, uma por uma**: em cada uma, a varredura das cores que o navegador calculou — fundo, texto, borda, `fill` e `stroke` de cada elemento visível, e o `::before` e o `::after` — reprova qualquer cor que só o escuro tem (as 20 cores do `:root` que o claro não repete: um valor escrito no código ou um token resolvido no `:root`), e qualquer texto ou ícone branco fora do botão principal (sumiria no branco). **Nenhuma sobrou.** E, onde aparecem: **as barras do sistema na cor do texto** (`rgb(26,22,37)`, a barra e a pílula), **o véu preto a 32%** (`rgba(6,5,10,0.32)`), **o primário roxo com o texto branco** (`rgb(64,32,112)` e `rgb(255,255,255)`) e **o confere em roxo** (`rgb(91,58,153)`) — todos conferem.
- **a prova de que a varredura pega:** a mesma auditoria, rodada com o app no escuro, reprova — o fundo da página, a faixa, a borda e o LED lima.
- **contra a folha 10:** as cores do claro são as do bloco `[data-tema="claro"]`, que é a paleta da folha (os 31 pares e o `--texto-primario`), e o `tokens.json` leva o par claro de cada cor na extensão `mobs2.tema.claro` — gerado do CSS, conferido pelo `checar`. Visto nos quadros do GIF: a folha da Conta no claro, o menu, o diagnóstico, a escolha do ativo, a cadeia concluída e a sessão encerrada, como a folha 10 desenha.

## 3 · A varredura de cor

Nenhuma cor escrita direto no código do protótipo fora dos tokens: o app já não tinha hex solto (o `checar` conferia desde o C2), nem rgb, rgba ou hsl — **o `checar` agora reprova os quatro** (o `palco-tokens.css` é do palco, fora do app). O que não trocaria com o tema, e foi trocado — **6**:

1. o lima escrito no texto do botão principal → `--texto-primario`;
2. o branco do desenho oficial da barra de status → a `--tinta`, no claro;
3. o branco da pílula de gestos → a `--tinta`, no claro;
4. o lima a 55% da barra do checklist e da fila que drena (`--lima-barra-checklist`, fora da paleta do claro) → `--lima-feito`, a 50% (22 telas da T13 e a T14/01);
5. e 6. os dois tokens que apontam pra outro, `--idade-preenchido` e `--rolagem-cor`: um `var()` se resolve onde o token é declarado, e no `:root` ele ficaria com a cor do escuro dentro do claro — eles se repetem no bloco do claro.

A máscara do ícone riscado usa branco e preto de luminância (o que fica e o que some), que não são cor do desenho.

## 4 · As correções

| | medido |
|---|---|
| **o texto de apoio com 16** | 62 regras pelo token `--entrelinha-apoio`, e três sobras achadas pela bancada (a nota *fato* de 13, a nota do diagnóstico da T07 com `normal`, a causa do passo do ciclo da T14) |
| **a T07 com o apoio no lugar** | o Firmware senta onde a referência desenha · a T07/00, 02 a 05, 07 e 11 de 0,13–0,17% a 0,09–0,10% · a T07/12 de 2,61 a 2,53 · para isso, além da altura de 16, a nota de uma linha (a faixa, os satélites, as mensagens, o *só informação*) ficou a 1 do nome, e a faixa com o que a linha informa (a 12) virou um apoio só, sem o vão do corpo entre as duas linhas — como as referências desenham |
| **a T11/00 sem rolar** | não rola, e o último bloco fica a 19 do rodapé · os blocos com 2 entre as linhas: a 00, 03 e 05 a 0,02–0,03%, a 06 a 0,54% (a folha, igual à base) |
| **a divisória da T13** | o *Canal de programação* já tinha a divisória no app; a referência é que mudou (T13/04, 38, 43: o resíduo de 2px que já era nomeado) |
| **a régua fechada** | a régua da T13 já tinha as quatro bordas no app (T13/09 a 0,04%) · a barra do prazo da conta ganhou as laterais |
| **o relógio de 16** | o das listas da T07/11, da T11/04 e da Seção D já era 16 no app |
| **o avatar nas 17 telas** | pela peça: as 17 da T04 entre 0,02% e 0,21%, e a 16 a 0,55% (o resíduo da fila parada, igual à base) |
| **o progresso no token** | `--lima-feito`, a 50% |

**As 201 contra a linha de base do 29c** (`linha-de-base-29c.json`, medida contra as referências de antes): **38 em 0%, nenhuma com erro, 21 melhoraram** (a T07 inteira, de 0,14 a 0,09–0,10; a T14/10 e 11, de 0,25 a 0,03; a T13/05, 39 e 41, de 4,0 a 3,6–3,7) **e 17 variaram de +0,01 a +0,06** — a maior, a T13/04 (1,75 → 1,81), e a Seção D (38, 43), dentro do deslocamento de 2px que já era nomeado; a T07/01, 08 e 09 (0,24 → 0,28), 1px no fim do cartão da CAN, na linha do Alternador. A medida nova é a base deste pacote (`linha-de-base-30.json`).

**A vitrine** (114 espécimes contra as folhas): 4 melhoraram (a cadeia da folha 5, de 6,5% a 1,6–2,9%; o rodapé com a legenda), 1 piorou 0,08 — a linha de rechecagem, pelo relógio (abaixo) —, e nenhum outro mudou.

**O palco:** as 47 conferências da moldura batem; as peças (o quadrado, a coluna, o painel) iguais ao relatório anterior, ±0,1.

**Roteiros:** os 48 (`todos`): **38 aprovados** — o `claro` 424 passos, o `readme-claro` 74, o `heroi` 239, o `mov-t04` 283, o `mov-t09` 240, o `reenvio` 73, o `readme` 65, entre outros — e os mesmos 10 parados nos mesmos passos de antes do pacote 29 (`empresa` 453, `mov-faixa` 62, `mov-listas` 77, `mov-porcima` 97, `mov-t02` 4, `mov-t03` 45, `recarregar` 16, `reler` 2, `teclado` 63, `voltar` 52). `npm run checar` aprovado · build aprovado.

## O que entrou além do prompt, e por quê

1. **A folha 10 na vitrine** (`src/vitrine/especimes/f10-modo-claro.jsx`): o interruptor nos dois estados, e o primário, o confere e o avatar no claro · fora da bancada de espécimes, como os da folha 9 (a moldura sólida) · a vitrine ordenava as folhas como texto, e a 10 vinha depois da 1: agora por número.
2. **O roteiro `claro`** e a **varredura de cor** dentro dele, pra o gate 2 ser medido em todas as telas, e não visto · **o `readme-claro`**, o caminho do GIF novo.
3. **Todo roteiro começa com o armazenamento do navegador limpo** (o perfil da régua guarda de um roteiro pro outro, e um roteiro que ligasse o claro deixaria o seguinte claro) · o passo pode ter `rotulo`.
4. **O `checar` reprova rgb, rgba, hsl e hsla**, além do hex.
5. **A decisão 02** (*Só o tema escuro*) com a revisão de 12/10 e a **R-01** reescrita (o escuro é o padrão; o claro é escolha): sem isso, as leis diziam as duas coisas · o pacote trazia a R-01 antiga junto com a R-16.
6. **Os censos** (README, LEIA-PRIMEIRO, CLAUDE.md, os guias do dev, a lógica do protótipo, o mapa das peças, o README do design system) com 10 folhas, 112 peças, 299 tokens, 48 roteiros e os dois temas · o README com a seção *Os dois temas* (como ligar o claro) e o GIF novo · o `05-recursos/README.md` com a receita do GIF do claro.
7. **O GIF do README regravado** (157 quadros, 36,3 s: o mesmo caminho feliz, com a altura de linha nova) e **o GIF do modo claro** (163 quadros, 39,5 s, 330 × 672).
8. **O comentário do `--risco-corte`**, o desvio que o 29c deixou: agora diz que é a largura do vão da máscara.

## Desvios nomeados

1. **Os tokens passam de 295 a 299**, e não a 296: entraram o `--entrelinha-apoio` (16px — o `--entrelinha-legenda`, de 1,45, não podia virar 16 sem mudar os textos de 13 e 15 que o usam) e três do interruptor (`--interruptor-largura`, 52; `--interruptor-desligado` e `--interruptor-apertado`, a bolinha de 24 encolhida a 16 e crescida a 28 por `scale`, porque o movimento só usa transform e opacity), e saiu o `--lima-barra-checklist`.
2. **A troca do tema é uma transição de cor**, a única do app — o pacote pede (*só a cor muda*), e o roxo do trilho e a cor da bolinha, que são do interruptor, entram por opacity.
3. **O relógio da linha de rechecagem:** a folha 7 o desenha com 16, e a T15/04, a tela que usa a peça, com 18. O app segue a tela; o espécime da folha 7 fica 0,08 pior.
4. **A T12/05**, que o pacote cita no relógio de 16, continua com o de 19 na referência; o app segue a referência.
5. **O CHANGELOG do arquiteto diz que a T11/00 passa a rolar 9px**; medida no app, ela não rola, e o último bloco fica a 19 do rodapé — o que o prompt pede.
6. Os resíduos já nomeados continuam: a T13/10 (sem a tela de origem, desde o véu), a T11/04 (o rodapé), a T09/12 (a rolagem) e o deslocamento de 2px da Seção D da T13.
