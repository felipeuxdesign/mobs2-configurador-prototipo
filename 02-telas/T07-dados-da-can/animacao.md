# T07 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| leitura da CAN (C12·30) | a chegada da T06, depois da troca entre telas, e o `Ler novamente` | os sinais chegam um a cada 600ms, na ordem da tela; pelo menu, depois da T08, pela URL e no print, a tela nasce lida, parada | ritmo 600ms por sinal | — | mesmo ritmo |
| marcador da barra | a leitura de cada sinal chega | corre do começo da escala até o valor (translateX) (C12·31) | 300ms | desacelera | aparece no valor |
| tambor do hodômetro | a leitura do hodômetro chega | cada rodinha rola da casa 0 até o dígito (C12·31), da direita pra esquerda, 40ms entre elas | 300ms por rodinha | desacelera | mostra o número |
| contador do cabeçalho | cada sinal que passa | `7 de 12` troca no lugar | — | — | igual |
| sinal fora da faixa | o valor cai fora | a borda vermelha entra por uma camada (C12·8) e a causa esmaece; o lugar dela abre direto (C12·9) | 150ms | desacelera (C12·5) | troca direta |
| liga-desliga (C12·30) | a leitura da ignição e da posição chega | o valor troca no lugar, e o check esmaece | 150ms | desacelera | aparece |
| botão primário (C12·31, C12·8, C12·23) | a leitura termina; o sinal que falha; `Ler novamente` | o botão, apagado com o mesmo texto enquanto lê, acende por uma camada (C12·8); o texto que troca na frente de quem olha — o `Configurar módulo` que vira `Ler novamente` com o sinal que falha, e o `Ler novamente` que volta ao `Configurar módulo` — esmaece no lugar, e o roxo troca direto (C12·23); o link troca direto | 150ms | desacelera | troca direta |

- no protótipo (C12·31, sem referência, G25): o quadro de começo é o de fim com o que anda na origem — o valor em traço, o marcador no começo da escala, as rodinhas na casa 0, o check fora e o primário apagado. Enquanto lê, o cabeçalho e o rodapé dizem o que já chegou: o reprovado entra, na cor dele, com o sinal que falha, e o `Ler novamente` só no lugar do `Configurar módulo` a partir dali (o veredito espera a prova, C12·35). O `Ler novamente` volta ao quadro de começo de uma vez, e a leitura corre de novo

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
