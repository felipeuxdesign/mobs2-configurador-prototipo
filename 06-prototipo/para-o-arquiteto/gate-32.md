# Gate · pacote 32 — o que sumia no claro

Gate sem espera. Por cima do 31 (7bf960b).

## 1 · Censo

**201 referências** — 15 telas, **82 estados, 104 momentos** · **10 folhas** · **114 peças** no catálogo (entrou o tracinho vazio) · **301 tokens** (entrou o `--folha-topo`, a pedido do diretor; ver abaixo) · 109 histórias · 63 casos · nenhum fluxo, texto ou dado do mock mudou.

O pacote trouxe 71 arquivos. Os 66 de referência (os pares de 32 telas e da folha 10) entraram inteiros. O `tokens.css`, o `tokens.json`, as leis, o catálogo e o CHANGELOG vieram de cópias antigas: entraram só as linhas deste pacote. **A última linha do gate:** nenhuma divergência bloqueou — o commit foi feito.

## 2 · No claro

Pelos tokens, sem nenhuma troca de cor no app: `--marca` `#8E91A0`, `--marca-limite` `#6E7180`, `--marca-vazia` `#9EA1AF`, `--lima-faixa` a 22%, `--lima-borda` a 80%. O CHANGELOG do pacote diz `--marca` a `#8E91A0` num item e a `#A3A6B3` em outro; valeu o `#8E91A0`, o do `tokens.css` e do prompt.

- **o tracinho visível** na garagem vencida, nos cartões do menu sem módulo e nas linhas sem valor: o glifo `traco` e o traço da escala vazia passaram da luz do poço ao `--marca-vazia` · o roteiro `claro` confere cada tracinho das 201 referências no claro (o do recebimento da T12, `--marca-limite`, como a referência) — **aprovado, 424 passos**.
- **a barra do pacote** com o trecho feito em `--lima-feito`, a faixa a 22% com a borda a 80%, e os riscos em `--marca` e `--marca-limite` mais escuros, pelos tokens.
- **contra a tabela da folha 10:** os valores do bloco claro são os da tabela.

## 3 · As duas faixas da T04

**Sem sessão:** um traço em cima e um embaixo, nos 50 da faixa — a tira de contexto não tem mais o traço de baixo, e o app somava 1px à faixa pra compensar; saiu · T04/01 de 0,21% a **0,13%**, e as quatro folhas sobre ela (05, 07, 08, 14) de 0,08% a **0%**. **Com sessão:** já tinha um em cima e um embaixo; a T04/00 continua a 0,06%.

## 4 · As listas em cartão

A última linha sem divisória: a lista de módulos da T05 (passou a receber a divisória só nas linhas que não são a última) e o *Conferido na conexão* da T07 · a T03, a T12 e a T13 já estavam assim no app, e melhoraram contra as referências novas (a T12/04 e 05 de 1,50% a 1,46%, a T13/02 e 12 de 0,06% a 0,04%) · as da T13 rolada ficam como estão.

## 5 · A varredura: peça pintada com a cor de outra

Trocadas: **o tracinho vazio** (o glifo `traco` e a escala vazia), e **o fio de cima da folha** — o diretor apontou, durante o pacote, a linha que aparecia em cima da folha no claro: ela usava a luz do poço. Ganhou o token do papel, `--folha-topo`, com `#332C49` no escuro (o mesmo de antes: as folhas da T01, T04 e T11 iguais à base) e a cor da folha no claro.

**Ainda com a luz do poço (`--borda-poco`)**, medidas e **não corrigidas** — as referências as desenham assim, e escolher o valor delas no claro é desenho:

| peça | escuro | claro |
|---|---|---|
| o trilho da cadeia antes de começar | 1,34:1 | 1,23:1 |
| a borda do diálogo | 1,39:1 | 1,23:1 |
| a borda do botão da linha | 1,34:1 | 1,23:1 |
| o traço do aviso que espera | 1,34:1 | 1,23:1 |
| a capa do aviso que chega | 1,34:1 | 1,23:1 |
| a borda da nota do achado | 1,47:1 | 1,15:1 |
| o traço da prova que se desenha | 1,51:1 | 1,09:1 |
| o tracejado e a marca do vazio da T05 | 1,34:1 | 1,23:1 |

Todas leem mais fraco no claro, o que a lei nova não aceita. **A proposta:** um token do papel, `--traco-apagado`, com `#332C49` no escuro (nada muda) e `#C9CBD4` no claro, que dá 1,62:1 no branco, 1,51:1 na página e 1,42:1 no poço — no mínimo o peso do escuro em quase todos os casos.

**A bancada das 201** contra a base do pacote 30: **42 em 0%, nenhuma com erro, 10 melhoraram, nenhuma piorou** · **roteiros:** os 48 (`todos`), 38 aprovados (entre eles o `claro`, o `palco-claro`, o `heroi`, o `mov-t04`, o `mov-t05` e o `mov-t07`) e os mesmos 10 parados nos mesmos passos de antes do pacote 29 · `checar` e build aprovados.

## O que entrou além do prompt, e por quê

1. **O `--folha-topo`** (o 301º token), pedido pelo diretor durante o pacote: a linha em cima da folha no claro.
2. **O roteiro `claro`** confere o tracinho vazio.
