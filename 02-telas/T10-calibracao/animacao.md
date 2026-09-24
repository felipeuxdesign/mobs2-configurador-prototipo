# T10 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| tambor | semear | as rodinhas rolam de 184.320 até 482.317, uma depois da outra | 600ms no total | desacelera | mostra o número final |
| régua da diferença | semear | a diferença encolhe até zero | 300ms | desacelera | troca direta |
| foto do painel | foto tirada | a miniatura surge no lugar do "aguarda" | 150ms | esmaece | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
