# T06 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| pedido de correção | tocar em Solicitar correção | o cartão vira o registro no lugar: o relógio entra no poço e o texto troca | 150ms | esmaece | troca direta |
| par de chassis | a leitura chega | o valor lido aparece; se bate, o check se desenha entre os dois | 150ms | desacelera | aparece |
| confirmação manual | marcar o checkbox | o quadrado lima surge e o botão acende | 150ms | desacelera | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
