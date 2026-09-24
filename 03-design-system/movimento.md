# O movimento

**O movimento conta o que mudou. Ele nunca chama atenção pra si.** O que impressiona neste app é a evidência nascendo na frente de quem olha — a pré-checagem acendendo, o tambor rolando, o prazo drenando. A transição entre telas é quase invisível justamente pra esses momentos aparecerem.

## Os tokens

| Token | Valor | Uso |
|---|---|---|
| `--mov-rapido` | 150ms | esmaecer, pressionar, trocar de tela, o check aparecer |
| `--mov-padrao` | 200ms | a folha subir, a faixa da sessão descer ou subir |
| `--mov-lento` | 300ms | o marcador correr na barra, a rodinha do tambor, o trilho da cadeia |
| `--mov-curva` | cubic-bezier(0.2, 0.8, 0.2, 1) | desacelera no fim · a curva de tudo, menos do que é linear |

## Entre telas

Só **o conteúdo** esmaece, em 150ms. **A barra do sistema e a faixa da sessão ficam paradas** — elas não mudam entre as telas de uma sessão, e o técnico sente que continua no mesmo trabalho. Nada desliza de lado.

## Por cima da tela

| O quê | Como |
|---|---|
| **folha** | o painel sobe de baixo (translateY 100% → 0) em 200ms e o véu esmaece junto · fecha em 150ms |
| **diálogo** | esmaece e cresce de 98% a 100% em 150ms · o véu esmaece junto |
| **pressionado** | no toque — no computador, no clique. O primário vai pra `--roxo-pressionado` e afunda 2%; a linha tocável sobe pra `--elevado`; o link vai pra `--tinta`. Solta em 100ms |

## Os processos

Mudam **no lugar**. O ritmo do protótipo é de apresentação: rápido o bastante pra não cansar, devagar o bastante pra acompanhar cada prova.

| Processo | Ritmo no protótipo |
|---|---|
| pré-checagem · cada linha | 600ms |
| cadeia · cada bloco, gravado e relido | 1s |
| conferência da T11 · cada linha | 400ms |
| encerramento · cada passo | 600ms |
| autoteste · cada assertiva | 400ms |
| ciclo dinâmico · cada passo do veículo | 3s |
| prazo do evento | 1s real vale 4s de prazo |
| sincronização do pacote | 4s no total |

## Só isto se move

`transform` e `opacity`. **Proibido:** animar a entrada de uma tela, contar de zero ao abrir, mover o layout, animar em loop, e qualquer coisa que reaja ao mouse passando por cima.

## Reduzir movimento

Com `prefers-reduced-motion`, **toda duração vira zero**: a troca é direta. Os processos continuam andando no mesmo ritmo — a prova continua nascendo em ordem, só que sem movimento.

Cada tela diz o que se move nela em `02-telas/<tela>/animacao.md`.
