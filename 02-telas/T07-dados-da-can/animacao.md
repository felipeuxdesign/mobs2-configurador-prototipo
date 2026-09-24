# T07 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| marcador da barra | a leitura de cada sinal chega | corre de zero até o valor (translateX) | 300ms | desacelera | aparece no valor |
| tambor do hodômetro | a leitura do hodômetro chega | cada rodinha rola até o dígito, da direita pra esquerda, 40ms entre elas | 300ms por rodinha | desacelera | mostra o número |
| contador do cabeçalho | cada sinal que passa | `7 de 12` troca no lugar | — | — | igual |
| sinal fora da faixa | o valor cai fora | o bloco ganha a borda vermelha e a causa aparece | 150ms | esmaece | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
