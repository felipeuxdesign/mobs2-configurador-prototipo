# T04 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| faixa de sessão | a sessão abre (fim da pré-checagem) | desce de cima (translateY -100%→0) e o conteúdo desce junto | 200ms | desacelera | aparece |
| contador da fila e do checklist | o número muda | troca no lugar, sem pular | — | — | igual |
| folhas | tocar na garagem ou nas iniciais · com a sessão aberta, no cartão do módulo ou do ativo | o painel sobe de baixo e o véu esmaece; fechar desce | 200ms · fecha em 150ms | desacelera | aparece |
| cartão liberado | o módulo conecta | o poço ganha cor e o texto de espera some | 150ms | esmaece | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
