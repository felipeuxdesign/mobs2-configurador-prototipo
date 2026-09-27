# T08 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| troca de quadro (C12·4) | tocar em `Refazer a leitura`; o último sinal responde | o título, a caixa e o rodapé trocam inteiros: o conteúdo esmaece, como entre telas; a faixa e a barra ficam paradas | 150ms | desacelera | troca direta |
| valores novos | cada leitura chega | o mostrador acende: a pele por opacity, e o valor troca no lugar (C12·11) · ritmo 600ms por sinal; o último chega junto com a troca 01 → 02 e entra com ela, sem acender a pele de novo por dentro (C12·4) | 150ms | desacelera | aparece, mesmo ritmo |
| placar da releitura (C12·20) | cada sinal que responde | o número troca no lugar | — | — | igual |

- (C12·11) a linha *valores lidos · a releitura começa · viram traço, esmaecendo juntos* saiu: nenhuma referência desenha os traços — os mostradores da 00 já estão em traço —, e nada se move além da troca de quadro. Na linha *valores novos*, o marcador e o tambor da T07 também saíram: a grade é de mostradores

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
