# T11 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| veredito | a última linha acende | a caixa do veredito está no lugar desde que a tela abre, neutra — o traço no cinza, o poço vazio, a palavra guardando o lugar —, e a contagem acompanha as linhas (*1 de 5* … *4 de 5*); na quinta, a palavra e a cor entram esmaecendo, no lugar, sem mexer em nada, e no `02` a legenda da prova no mesmo tique (C12·35) | 150ms | desacelera (C12·5) | aparece |
| conferindo | a tela abre | cada bloco entra com o relógio no poço e vira check ou xis; o relógio só liga depois da troca entre telas — pelo menu, o primeiro aos 550ms; pelo endereço, aos 400ms (C12·35) | 400ms por linha | desacelera | troca direta |
| linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | aparecem juntas |

- no protótipo · a nossa versão da linha *linhas de conferência*, antes desta entrega: | linhas de conferência | a leitura corre | acendem em ordem, 400ms cada | 150ms | desacelera | acendem em ordem, no mesmo ritmo, sem o esmaecer (movimento.md · G26) |
- no protótipo (o pacote 2, decisão 53): as linhas são cinco, e a contagem acompanha só as quatro que se comparam — *1 de 4*, *2 de 4*; na linha do Extended ID, só leitura, ela não sobe; *3 de 4* — e o veredito entra na quinta linha (*4 de 4*). A legenda da prova do `02` saiu com a prova (o `textos.md` novo não a tem): no `02`, só a palavra e o lima do traço entram. O Extended ID entra como as outras — o relógio no poço vira o i, e, na `00`, a linha do que está no módulo esmaece junto. As linhas de revisar em seguida (`05`) entram com o relógio e ficam com ele; a linha de cima delas espera a leitura como a do módulo. A tabela acima diz *1 de 5 … 4 de 5* e a legenda da prova: é a letra de antes do pacote, pro arquiteto

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
