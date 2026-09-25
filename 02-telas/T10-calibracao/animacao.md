# T10 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| campo do painel | tocar no campo | o rótulo e o traço de baixo acendem em lima | 150ms | desacelera | troca direta |
| foto registrada | voltar da câmera | o cartão vira o registro no lugar: o check lima entra no poço | 150ms | esmaece | troca direta |
| semear | tocar em Semear | o botão diz *Gravando no módulo…* e depois *Relendo…*; aí o tambor rola e a tela vira o semeado, ou o não confere | 1s + 1s | linear | troca direta |
| tambor | semear | as rodinhas rolam de 184.320 até 482.317, uma depois da outra | 600ms no total | desacelera | mostra o número final |
| régua da diferença | semear | a diferença encolhe até zero | 300ms | desacelera | troca direta |
| foto do painel | foto tirada | a miniatura surge no lugar do "aguarda" | 150ms | esmaece | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
