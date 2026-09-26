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
| **folha · o arraste** | **proposta do protótipo, espera o arquiteto** (lei 20): o painel acompanha o dedo pra baixo, só por transform, depois de 8 (`--folha-arraste-folga`) · soltando depois de 56 (`--folha-arraste-limite`), desce de onde parou e fecha em 150ms, e o véu esmaece junto · soltando antes, volta ao lugar em 200ms · só a posição decide, nunca a velocidade |
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
| ciclo dinâmico · cada passo do veículo | 3s · a semente traz 2 feitos, e o passo k acende a k × 3s do disparo: +9, +12 e +15s (T14·1) |
| ciclo dinâmico · a fila do módulo drenando, antes do disparo | 3s no total · depois, o `Disparar evento de teste` acende (T14-D11) |
| prazo do evento | 1s real vale 4s de prazo |
| sincronização do pacote | 4s no total |
| cronômetro do código (T01) | 1s real vale 1s · o prazo e o reenvio abrem cheios, como o mock diz (T01·1) |
| releitura da CAN (T08) · cada sinal que responde | 600ms · na ordem da grade (T08·1) |
| semear da calibração (T10) · gravando e relendo | 1s + 1s · o botão diz *Gravando no módulo…* e depois *Relendo…*; aí o tambor e a régua (a `animacao.md` da T10) |
| busca da T05 · a busca de novo | 1,2s · o número do arquiteto (a última entrega, o `animacao.md` da T05): 400ms passaria sem o técnico ver que buscou · no protótipo, o quadro da busca da T05/00 fica na tela, e a lista volta sem nada escolhido (a T05/01) — o *Procurando…* do `animacao.md` não está em referência nem em `textos.md`, e fica de fora (pergunta ao arquiteto) |

## Só isto se move

`transform` e `opacity`. **Proibido:** animar a entrada de uma tela, contar de zero ao abrir, mover o layout, animar em loop, e qualquer coisa que reaja ao mouse passando por cima.

## Reduzir movimento

Com `prefers-reduced-motion`, **toda duração vira zero**: a troca é direta. Os processos continuam andando no mesmo ritmo — a prova continua nascendo em ordem, só que sem movimento.

Cada tela diz o que se move nela em `02-telas/<tela>/animacao.md`.
