# Gate do complemento do pacote 11

Medido em 04/10, com o complemento aplicado por cima do pacote 11.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 160 | 160 ✓ |
| peças | 106 | 106 ✓ (o *o que conferir* entra na folha 6, logo depois do cartão que pede ação) |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

**O `componentes.md` do complemento vinha de uma cópia antiga**, sem a nossa seção *No protótipo · o que o código mediu*. Entraram só as duas linhas novas da tabela do design: a peça nova e a regra do segmentado. Na nossa tabela medida, as duas ganharam o mesmo texto, com a medida e o componente. A folha 6 entrou inteira.

**Também atualizados, pela peça a mais:** o `CLAUDE.md`, o `README.md` do design system e o do `08-para-o-dev`, que dizem 106 peças.

## 2 · A conferência

As folhas lado a lado estão em `complemento11/`:

| o que | contra |
|---|---|
| folha 6 · o *o que conferir* (`folha-6-o-que-conferir.png`) | 0,02%, mesmo tamanho (360 × 144) |
| T05 `04` · a conexão que falhou | 0% contra o HTML, como antes |
| T13 `09` · o item reprovado | 0% contra o HTML, como antes |

- **Os espécimes:** todos rodam, sem erro.
- **Os roteiros que passam pelas duas telas:** aprovados (`mov-t05`, `busca`, `mov-t13` e `checklist`).
- **checar, build e o gate:** aprovados.

**O componente estava duplicado? Não.** Desde o pacote 11, a T13 já usava o bloco da T05 (`CausasDaFalha`, em `telas/T05/pecas.jsx`). Agora ele mudou de lugar: é a peça `OQueConferir`, em `ds/entrada/`, com o próprio CSS, e as duas telas usam a mesma.
- A opção `falha` põe o traço vermelho embaixo, o da T05/04.
- Sem ela, fica a caixa de poço comum, a da T13/09 e a que a folha desenha.
- As classes `t05-causas` saíram da T05.

## 3 · As divergências

Nenhuma.
