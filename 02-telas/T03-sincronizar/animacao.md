# T03 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| barra de download | a sincronização correndo | a barra dos ativos enche da esquerda (scaleX), com o marcador junto, linear, um trecho por item, no ritmo do protótipo: 4s a baixa inteira, dividido pelos itens do pacote — ~129ms por item no herói, 31 itens (C12·15, pacote 1) | 4s ÷ os itens · ~129ms no herói (C12·15) | linear | cada item salta pro valor dele, no mesmo ritmo (C12·15) |
| contagem | cada bloco baixado | o número troca no lugar | — | — | igual |
| check de concluído | cada grupo termina de baixar — os ativos no 10º item, as conexões no 12º, os modelos no 15º, os eventos no 27º e as cercas, o último, no fim do download (C12·12, pacote 1) | o check surge no poço, por opacidade, no lugar do glifo de antes (C12·7) | 150ms | desacelera | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
