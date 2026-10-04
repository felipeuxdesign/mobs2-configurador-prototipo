# Gate dos pacotes 8 e 9

Medido em 04/10, com os pacotes 8 e 9 aplicados e construídos.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 154 | 154 ✓ (15 telas, 65 estados, 74 momentos) |
| peças | 105 | 105 ✓ |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

**A parte 1 (o pacote 8)** já estava aplicada e publicada (`ebf7cc2`). A folha 6 deste pacote é idêntica, byte a byte, à que estava no projeto.

## 2 · A conferência

As folhas lado a lado estão em `pacote9/`:

| referência | contra o HTML |
|---|---|
| T05 `07` · *Conectado ao M2C-0417*, com o traço embaixo da linha (nova) | 0,1% (o `Procurar de novo` apagado, já nomeado no pacote 6) |
| T14 `07` · a vez da porta, com o marcador em 70% | 0,04% (era 0,09%) |
| T14 `04` · a vez da ignição, com o marcador em 50% | 0,05% (era 0,1%) |
| T14 `06` · a correção solicitada, com o marcador em 50% | 0,05% (era 0,1%) |
| folha 6 | o bloco escolhido da T06 em 0% (`folha-6.png`) |

- **As 154:** sem erro. As quatro da T14 melhoraram, e nenhuma piorou contra a base do pacote 7. A nova base é `prints/linha-de-base-pacote9.json`.
- **As animações, medidas rodando no fluxo:**
  - **T05:** o *Conectando…* por 1,2 s; depois o *Conectado ao M2C-0417*, com o traço se desenhando em 300 ms; depois de mais 1,2 s, a T07. Na falha, sem traço.
  - **T16:** quando a oitava assertiva passa, o quadro da 02 entra e o traço da prova se desenha em 300 ms. Pela URL, a 02 abre com a borda lima de sempre, sem animação (0,06%).
  - **T07/01:** a cada 1 s, só rotação, temperatura, consumo e alternador trocam o número, pela lista `leituras` do mock, sem nenhuma animação nas linhas. Velocidade, hodômetro, combustível e ré ficam parados.
  - **T14:** com o evento chegado, o preenchido para na chegada, e o marcador branco segue o tempo.
- **Os 43 roteiros:** aprovados. Três foram atualizados pelo movimento novo:
  - `mov-t05`: o *Conectado* antes da T07;
  - `mov-t14`: o marcador que segue andando;
  - `mov-t16`: o traço do veredito.
- **O GIF do README foi regravado**, com 35 s:
  - o traço da conexão na T05;
  - a CAN lida ao vivo (a T07/01, aberta pelo endereço depois da cadeia);
  - o fim da visita, com o traço do veredito (a T16 rodando do encerramento à 02).
- **checar e build:** aprovados.

**O aceite:**
- a folha 6 com o bloco escolhido da T06, e 105 peças ✓;
- o traço se desenha quando a conexão confirma, e não durante o *Conectando…* ✓;
- o traço do veredito, uma vez, só no fluxo ✓;
- só os quatro sinais da CAN trocam, a cada 1 s, sem transição ✓;
- o marcador da T14 segue o tempo ✓, com a 05 como exceção nomeada abaixo;
- o gate APROVADO ✓.

## 3 · A lista da `08-para-o-dev/`

```
08-para-o-dev/
  README.md
  conferir-contra-o-design.md
  contrato-de-dados.md
  integracoes.md
  o-que-o-produto-ainda-decide.md
  testes-prontos.md
```

## 4 · As divergências

Nenhuma bloqueia. Três vão nomeadas, cada uma com o padrão adotado:

1. **O marcador da T14/05.** O ciclo do herói fecha aos +18 s, e o marcador, seguindo o tempo, fica em 40%. A 05 o desenha em 60% (o `animacao.md` também diz *"o marcador em 60%"*). A 07 (70%), a 08 (60%), a 04 e a 06 (50%) batem com a regra.
   - **Padrão:** a regra.
   - **A 05 fica em 0,1%:** ou ela vai pros 40%, ou a regra precisa de uma exceção no fim do ciclo.
2. **Quanto tempo o *Conectado* fica antes da T07.** O pacote não dá o número.
   - **Padrão:** 1,2 s (`buscaMs`), o mesmo da espera, sem número novo. É uma linha, se você quiser outro.
3. **Os documentos de cópia antiga.**
   - O `mocks.js` do pacote vinha de uma cópia antiga (sem os comentários do protótipo): entraram só as quatro linhas das `leituras`.
   - O `CLAUDE.md` vinha com os números de antes (62 momentos, 106 peças, 49 casos): entrou só a exceção do dado ao vivo, e os números ficaram os medidos (74, 105, 56).
   - A `logica.md`, a `palco`, as linhas antigas dos `animacao.md` da T07, T14 e T16 e a entrada repetida do pacote 8 no `CHANGELOG.md` também ficaram com o nosso conteúdo; entrou só o que é novo.

**No protótipo:**
- o traço é uma peça só (`Traco.css`), reaproveitada na linha de módulo (`confirmada`) e na prova (`desenha`);
- o ritmo da CAN ao vivo entrou no `ritmos.js` (`canAoVivoMs`, 1 s, o número do `animacao.md`);
- o roteiro do GIF ganhou as duas cenas do fim.
