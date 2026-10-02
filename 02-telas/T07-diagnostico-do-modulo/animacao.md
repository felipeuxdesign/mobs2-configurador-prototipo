# T07 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| linha do módulo ou da CAN | a leitura daquela linha começa | o poço mostra o quadrado branco de agora | — | — | igual |
| linha do módulo ou da CAN | a leitura chega | o poço troca pro estado — check, informação ou falha — e o valor aparece no lugar | 150ms | esmaece | troca direta |
| contador do título | cada linha que fecha certa | `7 de 7` troca no lugar | — | — | igual |
| a CAN, na segunda visita | a configuração do ativo gravada | a caixa tracejada dá lugar às linhas da CAN | 150ms | esmaece | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
