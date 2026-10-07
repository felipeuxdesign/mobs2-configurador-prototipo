# Gate do complemento da rodada 2 · a lista final do PM

Medido em 07/10, por cima da rodada 2 (`baac2b1`). **Sem push:** commit local, e o push vem no fim da rodada 3.

## 1 · O censo

O da rodada 2, sem mudança: **188 referências** (15 telas, 79 estados, 94 momentos) · 106 peças · 24 leis · 54 decisões · 62 casos no mock. Nada entrou, nada saiu: 16 arquivos mudaram.

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

**Como entrou:** as 10 referências e os dois `textos.md` (norma, sem nota nossa), inteiros · nos `tela.md` da T06 e da T07, só a linha nova · no mock, só a velocidade fora da CAN do herói e o comentário dela · no CHANGELOG, a entrada do arquiteto.

## 2 · A conferência

As folhas lado a lado estão em `complemento-rodada2/`.

| tela | referência | contra o HTML | o que sobra |
|---|---|---|---|
| T06 | `06-estado-conflito-de-pinos-sem-saida` | 0% | — |
| T07 | `01-momento-can-lida` | 0,24% | o texto rasterizado, como na rodada 2 |
| T07 | `08-estado-sinal-da-can-sem-leitura` | 0,24% | idem |
| T07 | `09-estado-sinal-da-can-fora-do-esperado` | 0,24% | idem |
| T07 | `10-momento-relendo-a-can` | 0,13% | idem |

- **Na CAN da T07, nenhuma velocidade:** a lista vem do mock (`diagnostico.can.sinais`), e a velocidade saiu dele · o roteiro `heroi` confere que ela não aparece.
- **Os contadores em 13:** 13 de 13 com tudo lido (a 01), 12 de 13 com um sinal que falha (a 08 e a 09), 10 de 13 relendo (a 10) — o quadro da 10 é o da temperatura, agora a terceira da lista · o alternador segue fora da conta.
- **A T06/06:** *O fio branco já está ocupado.* — o app montava a frase com o *sensor de porta* do caso; agora diz só o fio.
- **Os roteiros:** os 45 aprovados (43 na corrida inteira; o `mov-t01` e o `mov-t13`, que não tocam a T06 nem a T07, pararam por tempo e passaram na volta). O `mov-t07`, o `heroi` e o `heroi-sem-horimetro` passaram aos números novos da CAN.
- **checar, build e o gate:** aprovados.

## 3 · As divergências

Nenhuma. O caso `conflito-pinos-sem-saida` do mock ainda diz `ocupadoPor: "sensor de porta"`: a tela não o lê mais, e o dado fica pro arquiteto decidir se sai.
