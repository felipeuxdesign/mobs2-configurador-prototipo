# T11 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| veredito | a última linha acende | a caixa do veredito está no lugar desde que a tela abre, neutra — o traço no cinza, o poço vazio, a palavra guardando o lugar —, e a contagem acompanha as linhas (*1 de 5* … *4 de 5*); na quinta, a palavra e a cor entram esmaecendo, no lugar, sem mexer em nada, e no `02` a legenda da prova no mesmo tique (C12·35) | 150ms | desacelera (C12·5) | aparece |
| conferindo | a tela abre | cada bloco entra com o relógio no poço e vira check ou xis; o relógio só liga depois da troca entre telas — pelo menu, o primeiro aos 550ms; pelo endereço, aos 400ms (C12·35) | 400ms por linha | desacelera | troca direta |
| linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | aparecem juntas |

- no protótipo · a nossa versão da linha *linhas de conferência*, antes desta entrega: | linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | acendem em ordem, no mesmo ritmo, sem o esmaecer (movimento.md · G26) |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
