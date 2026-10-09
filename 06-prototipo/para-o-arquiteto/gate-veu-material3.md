# Gate · o véu como o Material 3 oficial

Gate sem espera. Substitui o pacote 27, que não tinha sido aplicado: este foi direto por cima do complemento da rodada 3 e do véu integral (a5ffab3).

## Censo

15 telas · **191 referências** · 79 estados · 97 momentos · 109 histórias · 295 tokens (nenhum novo, só o valor do `--veu`) · 106 peças · 62 casos. O pacote trouxe 47 arquivos: 38 entraram inteiros (19 pares HTML/PNG), 9 eram fichas e tokens de cópias antigas e entraram só nas linhas do véu.

## O que mudou

1. **`--veu` a 32%** (`rgba(6, 5, 10, 0.32)`), o `ScrimOpacity` do Material 3. `tokens.json` regenerado pelo `npm run tokens`. Nenhum `0.72` sobra no código do app (`src/`): o único `0.72` em `scripts/` é o limiar de semelhança do `junta-gerados.py`, que não é cor.
2. **A tela de origem atrás:** o protótipo já desenhava a tela de onde a folha ou o diálogo saiu (G25) e nenhum lugar pintava um fundo próprio. No print, a T04/05, 07, 08 e 14 montam o menu sem sessão (o 01), como as referências novas; fora do print nada muda (o fluxo mostra o menu que estava; o mesmo modelo da T11, em que o `print=1` monta a referência).
3. **Os três diálogos do pacote 27:**
   - T01/18 (mora na T02): a barra escurece (`veu` da `BarraDoSistema`).
   - T13/10: o fundo do véu sobe sobre a faixa (`--veu-topo: var(--faixa-sessao)`, como a T11/03), a faixa fica inerte e a barra escurece. A caixa fica no mesmo lugar: o diff contra o HTML não marca nada nela.
   - *Encerrar antes de terminar?* fora do menu: `useEncerrar` devolve `veu` ('dialogo' enquanto o véu está aceso), e T06, T07, T09, T10 (as duas composições), T11, T12, T13, T14 e T15 passam ele pra barra. O `.encerrar-sobre` já cobria a faixa.

## A conferência

- **As 18 referências com véu** (bancada `tela.mjs`, contra o HTML novo · contra o PNG):

| ref | HTML | PNG | nota |
|---|---|---|---|
| T01/04 | 0,57% | 1,36% | a contagem 10:00 contra o 9:41 da foto, já nomeada |
| T01/09 | 0,03% | 1,71% | |
| T01/11 | 0,23% | 1,02% | a contagem, como a 04 |
| T01/18 | 0% | 1,58% | |
| T01/22 | 0,25% | 0,95% | |
| T04/05 | 0,08% | 1,13% | era 1,58% antes de o print montar o menu sem sessão |
| T04/06 | 0,02% | 1,29% | |
| T04/07 | 0,08% | 1,35% | idem 05 |
| T04/08 | 0,08% | 1,32% | idem 05 |
| T04/09 | 0,02% | 1,73% | |
| T04/10 | 0,05% | 1,54% | |
| T04/11 | 0,06% | 2,02% | |
| T04/12 | 0,04% | 1,26% | |
| T04/13 | 0,03% | 1,39% | |
| T04/14 | 0,08% | 1,31% | idem 05 |
| T04/16 | 0,55% | 1,89% | igual à base do véu integral (resíduo anterior nos textos do diálogo) |
| T11/03 | 0,02% | 3,14% | era 2% na base |
| T13/10 | 7,76% | 8,43% | **desvio nomeado**: a referência ainda não tem a tela de origem |

  Contra a base do véu integral (`veu-integral/comparacoes.json`), nenhuma piorou. Em todas, a folha ou o diálogo no mesmo lugar e a hora branca, por cima do véu; o que o diff marca dentro deles são os resíduos anteriores (a contagem da T01/04 e 11, os textos da T04/16).
- **O *Encerrar antes de terminar?* na T09** (aberto pelo ENCERRAR da faixa, no navegador): a T09 visível atrás, escurecida, a faixa coberta, a barra com `ds-barra-sistema-veu-dialogo` e o `::before` em `rgba(6, 5, 10, 0.32)` a opacidade 1, a hora branca · fechando no *Continuar a instalação*, a barra volta sem véu.
- **T13/10 e T01/18 no navegador:** o véu pintado começa em y=30 (o fim da barra), a faixa inerte, a barra escurecida.
- `npm run checar` aprovado (213 conferências do mock, tokens.json = tokens.css, zero cor e px soltos) · build aprovado.
- **Roteiros:** `mov-t04` 283 · `folhas` 154 · `mov-t11` 132 · `mov-t13` 340 · `outro-usuario` 110 · `sair` 122 · `mov-t01` 311 · `heroi` 239 · `readme` 65, todos aprovados. `mov-porcima` para no passo 97 de 216, na entrada histórica `?tela=T11` que espera a divergência: **no HEAD (a5ffab3), sem este ciclo, ele para no mesmo passo** (as consultas paradas de 07/10 fizeram o endereço simples abrir o herói, e o gate do véu integral já tirava essas entradas do aceite). Os passos do véu antes dele, incluindo o *Encerrar antes de terminar?* sobre a T12, passam.
- **GIF do README regravado** (ele passa pelo aviso T04/12): 150 quadros, 36,9 s, 330×672, com o menu legível atrás do véu a 32%. A primeira gravação reprovou de forma intermitente e foi descartada; a segunda aprovou os 65 passos.
- `git diff --check` acusa só espaços no fim de linha dentro dos HTML de referência do pacote, que entraram como vieram.

## Desvio nomeado

- **T13/10 a 7,76%:** a referência desenha o diálogo sobre o fundo vazio, porque a tela de origem — o checklist completo com a Seção F falhando — ainda não tem referência. O protótipo usa a tela do checklist que já abre esse diálogo, como o pacote manda.
