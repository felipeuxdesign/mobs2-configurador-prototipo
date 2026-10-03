# T03 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| barra de download | a sincronização correndo | enche da esquerda (scaleX), linear: 4s no total, uns 129ms por item · o *faltam ~40 s* sai do `segPorItem` 1,6 | 4s | linear | salta pro fim |
| contagem | cada bloco baixado | o número troca no lugar | — | — | igual |
| check de concluído | cada grupo termina de baixar — os ativos no 10º item, as conexões no 12º, os modelos no 15º, os eventos no 27º e as cercas, o último, no fim do download (C12·12, pacote 1) | o check surge no poço, por opacidade, no lugar do glifo de antes (C12·7) | 150ms | desacelera | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
