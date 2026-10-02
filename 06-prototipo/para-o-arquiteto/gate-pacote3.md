# Gate do pacote 3

Medido em 02/10, com o pacote aplicado e construído. Publicado junto com os pacotes 1 e 2.

## 1 · O censo

142 referências (15 telas, 62 momentos, 65 estados) · 106 peças · 23 leis · 54 decisões · 56 casos no mock (os seus 49 e os nossos 7). A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

## 2 · O que mudou no código

- **T07** (`index.jsx`, `diagnostico.js`, `textos.js`):
  - o módulo na linha de 50, uma variante nova da `LinhaChecagem` (`diagnostico`, com poço de 32);
  - a CAN e o *Conferido na conexão* na lista longa de 44 (a variante `longa`, com poço de 30);
  - a mesma letra na tela inteira;
  - o aviso nas travas 02 e 03, e o topo da 02 só com o serial;
  - a D3 com o respiro de 6.
- **T09** (01, 06 e 07) e **as regiões, pela D1:** as do `ativoId` mais as do `tambemAtivos`, numa regra só, que a T09, a T11, a T13 e a T16 usam. A T09/02 e 03 e a T16/06 dizem *4 regiões* com o dado.
- **T13:** a barra do checklist no número do título; o Painel pendente na B; o texto da 12. **T04/04:** 11.
- **O palco, pela D2:** o campo `coluna` decide. As três folhas de trocar da T04 saem da coluna.
- **T10:** saiu a leitura do `calibracao.itemChecklist`, que o pacote tirou do mock. Sem isso, a T10 ficava em branco no fim da calibração.
- **O design system e a vitrine:** as peças de estado em 50, a lista longa em 44, e sai a *diagnóstico com sessão*. As folhas 4 e 5 batem.
- **O token `--conferencia-nome` a 96,** e o `tokens.json` regenerado.

## A régua

- **as 142 referências:** sem erro, 35 em 0% contra o HTML. Nenhuma piorou em relação à base do pacote 2. O que passa de 1% já tinha nome antes:
  - os três textos da T01;
  - as folhas da T04 (G25);
  - o véu da T11/03;
  - os dois critérios da T12;
  - a T13/10;
  - o recorte da T15/01.
- **a T07:** as 11 referências, de 0,03% a 0,13%.
- **o herói:** com o horímetro, 243 passos, e sem ele, 231.
- **o mov-t07:** 268 passos, com as quatro travas.
- **o palco:** 5 de 5 textos e 38 de 38 na moldura.
- **o `checar`:** APROVADO.

## 3 · As divergências

Nenhuma bloqueia. Uma vai nomeada:
- **O aviso da trava no fluxo.** Quando o M2C-0999 chega da T05/01, o aviso da 02 aparece quando a sétima linha fecha e empurra o bloco do módulo pra baixo, como as travas da T09 fazem. Nenhuma referência desenha esse movimento.
