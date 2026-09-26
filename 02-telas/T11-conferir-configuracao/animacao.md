# T11 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| veredito | a última linha acende | o veredito entra esmaecendo, no lugar dele, sem mexer em nada — antes disso ele não aparece | 150ms | esmaece | aparece |
| conferindo | a tela abre | cada bloco entra com o relógio no poço e vira check ou xis | 400ms por linha | desacelera | troca direta |
| linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | aparecem juntas |

- no protótipo · a nossa versão da linha *linhas de conferência*, antes desta entrega: | linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | acendem em ordem, no mesmo ritmo, sem o esmaecer (movimento.md · G26) |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
