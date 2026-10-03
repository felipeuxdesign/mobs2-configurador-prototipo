# Gate do pacote 5

Medido em 03/10, com o pacote 5 aplicado e construído.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 150 | 150 ✓ (15 telas, 65 estados, 70 momentos) |
| peças | 106 | 106 ✓ (as linhas das folhas 1 a 8 no `componentes.md`) |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |
| arquivos do pacote | 70 mudam, 16 entram | 52 referências (16 novas) e 34 documentos; o `CHANGELOG.md` não foi copiado: o `_changelog-para-colar.md` entrou no topo do nosso |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

## 2 · Os oito momentos, lado a lado

Cada referência ao lado do print do protótipo, em `pacote5/` nesta pasta, com o % contra o HTML:

| referência | contra o HTML | o que o código fez |
|---|---|---|
| `T01/19-momento-entrando` | 0,1% | a espera do Entrar abre pela URL, parada; no fluxo, a URL diz a 19 durante os 1,2 s · o 0,1% é o `Esqueci a senha` apagado (§4, divergência 1) |
| `T05/05-momento-procurando` | 0% | **novo:** o *Procurando…* no lugar do quadro da 00 durante a busca de novo — o poço de 44 com o quadrado de 16, a *segunda tentativa*, o primário desligado e o `Voltar ao menu` |
| `T07/11-momento-lendo` | 0,06% | a leitura do módulo como a 11 desenha: nada em cima do título, a barra no fundo da faixa, o título das que esperam aceso e o rodapé fechando em 24 |
| `T09/10-momento-manutencao-concluida` | 0,02% | a cadeia curta fechada: *As cercas foram reenviadas.*, o *relidas* aceso e o `Voltar ao menu` |
| `T10/06-momento-gravando-no-modulo` | 0,49% | o semear parado no *Gravando no módulo…* |
| `T10/07-momento-relendo` | 0,49% | o semear parado no *Relendo…* |
| `T11/04-momento-conferindo` | 0,02% | o veredito neutro diz *CONFERINDO*, sem poço, com o `2 de 4`; a linha da vez com o quadrado e *conferindo*; as seguintes com o relógio e o traço; o rodapé desligado |
| `T16/07-momento-autoteste-correndo` | 0,07% | **troca o improviso:** saiu a caixa grande; `4 de 8` ao lado do título, a da vez com o quadrado e *lendo*, as seguintes com o relógio e o traço, sem veredito, o rodapé desligado; o fim é outro quadro (02 ou 05) |

**O RV no centro:** `box-sizing: border-box` e `padding: 0 0 2px 1.4px` no avatar de 32 da tira (`app/src/ds/chrome/Avatar.css`), com 32px. A folha `pacote5/T04-00-tela.png` o mostra. As 16 da T04 e o espécime da tira da folha 2 dão 0% de diferença no avatar. O avatar de 52 da folha da conta não mudou, como o pacote desenha.

## 3 · A régua

- **As 150 referências:** sem erro. Nenhuma das 142 de antes ficou pior que a base do pacote 4. As 8 novas ficam entre 0% e 0,49%. A nova base é `prints/linha-de-base-pacote5.json`.
- **`checar` e `build`:** aprovados.
- **Os espécimes:** sem mudança. O da tira, com o avatar, dá 0%.
- **Os 43 roteiros:** todos aprovados. Dez pediam o quadro antigo e foram atualizados no mesmo ciclo:
  - **a T05 e o *Procurando…*:** `busca` e `mov-t05`;
  - **a T07 sem o rótulo de cima durante a leitura:** `heroi`, `heroi-sem-horimetro`, `mov-faixa` e `mov-t07`;
  - **a T16 com a 07 antes da 02:** `sessao`, `voltar` e `mov-t16`, e os dois do herói, de novo;
  - **o veredito que diz *CONFERINDO*:** `mov-check`.
  - O `heroi` tem agora 245 passos, e o `heroi-sem-horimetro`, 233.
  - **O `mov-t11`** parou por código, não por roteiro: na linha que chega, o *no módulo* não esmaecia, e a caixa do veredito crescia 4 px. As duas coisas foram corrigidas na peça (§4, divergência 3).
- **O palco:** as provas batem todas, e a moldura bate em 38 de 38 conferências.

## 4 · As divergências

Nenhuma bloqueia. As quatro vão nomeadas, com o padrão adotado:

1. **T01/19 e T10/06–07 · o link e o ENCERRAR durante a espera.** A 19 desenha o `Esqueci a senha` aceso, e a 06 e a 07 desenham o `Voltar ao menu` e o `ENCERRAR` acesos. A lei 17 e as decisões do diretor (25/09 e 27/09) os apagam enquanto o processo não pode ser interrompido.
   - **Padrão:** a lei vale e o desvio fica nomeado. O botão desligado, que é o que o pacote pediu pra conferir, bate.
   - **Também na 06 e na 07:** a referência mantém o foco do campo (o rótulo e o traço em lima). O protótipo o tira quando o semear começa, porque o campo deixa de ser editável.
2. **T07/11 × T07/06 e 10 · a gramática do processo na mesma tela.** A 11 desenha diferente das outras duas:
   - o título das linhas que esperam aceso (`--tinta-forte`), onde a 06 e a 10 o apagam;
   - a barra no fundo da faixa, sem a faixa;
   - o rodapé fechando em 24, onde as outras fecham em 32.
   - **Padrão:** cada referência como ela é. A 06 e a 10 seguem como estavam. Se a 11 for a nova regra, a 06 e a 10 pedem quadro novo.
3. **T11/04 · o poço entra no fim.** Na 04 o veredito não tem poço, e na 00 tem (o xis). A caixa com poço é 4 px mais alta, e o *CONFERINDO* começa na borda.
   - **O conflito:** desenhada como a 04, a caixa cresceria no fim da leitura que não bate, e a lista desceria 4 px. A lei proíbe mover o layout.
   - **Padrão:** a 04 é o caso que confere, e ali a caixa é a da referência (0,02%). No que não bate, a caixa que espera já tem o desenho da final, com o lugar do poço guardado e invisível, e o *CONFERINDO* começa depois dele. No fim, o poço e a palavra entram no mesmo esmaecer de 150 ms, e nada muda de lugar.
   - **O meio da leitura que não bate** não tem referência (G25).
4. **T16/07 · o fim é outra troca.** Sem veredito durante a leitura, a prova (ou o bloqueio) entra em cima da lista no fim, e a lista desce.
   - **Padrão:** é uma troca de quadro (C12·4): o conteúdo esmaece em 150 ms, como entre telas, e nada desliza.
   - **Consequência:** os dois espécimes do veredito que espera o autoteste saíram da vitrine (`mov-check`), e o `Aviso` e a `Prova` deixaram de ter `aguarda` na T16.

**O que não faz sentido:** nada.

**Uma decisão só minha:** a *segunda tentativa* da T05/05 conta as buscas desde que a tela abriu. Da terceira em diante, a legenda fica sem texto, porque o `textos.md` só escreve a primeira e a segunda (G25).
