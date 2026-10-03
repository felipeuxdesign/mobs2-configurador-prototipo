# Gate do pacote 6 e do complemento

Medido em 04/10, com o pacote 6 e o complemento aplicados e construídos. A segunda versão do complemento (43 arquivos) trouxe mais duas coisas: o *Ir para o checklist* na T14/05 e o `depoisDe` da coluna do palco. As duas estão na seção 4.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 153 | 153 ✓ (15 telas, 65 estados, 73 momentos) |
| peças | 106 | 106 ✓ |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |
| o complemento | 36 arquivos | os 36 são iguais, byte a byte, aos do pacote 6 que eu já tinha aplicado. A T14/01 aplicada já era a da linha fina, sem o círculo de 96px. Nada a desfazer. |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

## 2 · A conferência

Cada referência ao lado do print do protótipo, em `pacote6/` nesta pasta, com o % contra o HTML:

| referência | contra o HTML |
|---|---|
| T14 `00` · a vez da ré, o rodapé *Aguardando o evento* | 0,05% |
| T14 `01` · a fila drenando, a linha fina de 4px | 0,06% |
| T14 `03` · a falha da rotação, o rodapé aguardando | 0,05% |
| T14 `04` · a vez da ignição, o cartão com o xis | 0,1% |
| T14 `06` · a correção solicitada | 0,1% |
| T14 `07` · a vez da porta (nova) | 0,09% |
| T14 `08` · a vez do cartão (nova) | 0,1% |
| T05 `06` · *Conectando ao M2C-0417…* (nova) | 0,1% |
| T09 `00` a `07` · o ícone em linha, a limpeza em duas linhas | 0,04% a 0,08% |
| T10 `01`, `09` e `10` · o ícone em linha, o xis com círculo | 0,01% |
| T11 `03` · a folha com o puxador | 2,13% (o véu, como antes; o puxador bate, estrutural 0%) |
| T15 `02` · a recusa em duas linhas | 0,06% |
| folha 5 · a cadeia e a pré-condição | de 0,05% a 0,25% (a imagem `folha-5-cadeia-e-precondicao.png`) |

- **As 153:** sem erro. Nenhuma das 150 de antes ficou pior que a base do pacote 5, fora as da T14 que o pacote redesenhou. A nova base é `prints/linha-de-base-pacote6.json`.
- **Os roteiros:** os 43 aprovados, entre eles os cinco que você citou:
  - `mov-t14`: 238 passos;
  - `heroi`: 245 passos;
  - `mov-t05`: 160 passos;
  - `busca`: 165 passos;
  - `portas`: 109 passos.
- **Dois roteiros foram atualizados** pelo comportamento novo:
  - o `mov-t05`: o *Conectando…* antes da T07;
  - o `mov-t14`: a linha da fila que anda, o *Aguardando o evento*, o *Encerrar o ciclo* só com o evento, e a vez passando da ré pra porta.
- **O palco:** as provas batem todas, e a moldura bate em 38 de 38.
- **checar e build:** aprovados.

**O aceite:**
- o passo da vez com o quadrado e a ação, nos quatro passos depois do disparo ✓;
- o toque duplo no `Disparar` não encerra o ciclo ✓, porque o primário fica desligado até o evento;
- a fila na linha de 4px, com os seis passos acima do rodapé ✓;
- a T05 conectando antes da T07 e antes da 04 ✓;
- o ícone no meio das minúsculas ✓;
- a folha da T11 com o puxador, arrastando ✓;
- as duas linhas ✓;
- o gate APROVADO ✓.

## 3 · As divergências

Nenhuma bloqueia. Três vão nomeadas, cada uma com o padrão adotado:

1. **T05/06 · o `Procurar de novo` apagado.** A referência o desenha em `--marca` (`#4E475E`). A lei 17 põe o link desligado em `--tinta-apagada`, como o protótipo faz em toda tela. Mantive a lei. É o que sobra dos 0,1%.
2. **T14 · o marcador branco da escala.** Na 04, na 06, na 07 e na 08, o evento já chegou, e a referência põe o marcador no tempo que corre (70% na 07, 60% na 08). O protótipo o deixa no fim do preenchido, no que restava quando o evento chegou, como toda escala do app. É o mesmo caso já nomeado da `05` (`tela.md` da T14). É o que sobra dos 0,1%.
3. **T11/03 · o arraste fecha passando de 56px, não de 1/3 da altura.** O `animacao.md` novo da T11 diz *1/3 da altura*. O pacote pede que ela arraste *como as da T01 e da T04*, e essas fecham passando de `--folha-arraste-limite` (56px, lei 20). Segui o mesmo de toda folha.

**Também no protótipo:**
- O puxador ganhou o nome *Arrastar pra fechar* pro leitor de tela, em toda folha, como o `animacao.md` da T11 descreve.
- Do `Conectar ao …` da lista (a 01), o *Conectando…* vem no quadro do escolhido, que é o que a 06 desenha.
- A fila da 01 usa `--lima-barra-checklist`, o lima de 55% que a referência desenha. Já existia, e não entra token novo.

## 4 · A segunda versão do complemento

- **A T14/05 diz *Ir para o checklist*.** A referência nova bate em 0,1%; é o marcador branco já nomeado (§3, divergência 2). Os roteiros `heroi`, `heroi-sem-horimetro` e `mov-t14` tocam o texto novo.
- **A coluna do palco.**
  - A `T07/06` e a `T14/06` entram logo depois do estado de onde nascem (`coluna` e `depoisDe` no índice) e abrem paradas.
  - O índice ganhou o rótulo delas: *Atualizando o firmware*, como a cena 02 desenha, e *Correção solicitada*, que eu propus porque nenhuma cena a desenha.
  - A cena 02 bate na moldura (0%). A coluna dá 0,72%: o quadrado vazado de 11 e o Undo2 do Lucide, os dois já nomeados.
- **Os 36 arquivos de antes** continuam iguais aos aplicados. Dos 7 a mais, a `palco.md` e o `animacao.md` da T14 vinham de uma cópia antiga: entrou só a regra nova da coluna, e as linhas mais novas da animação ficaram as nossas.
- **O GIF não muda:** o caminho dele não passa pela T14 nem pela coluna.
