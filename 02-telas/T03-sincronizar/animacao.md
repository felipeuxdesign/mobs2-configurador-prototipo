# T03 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| barra de download | a sincronização correndo | a barra dos ativos enche da esquerda (scaleX), com o marcador junto, linear, um trecho por item, no ritmo do protótipo: 250ms por item, 4s a baixa inteira (C12·15) | 250ms por item (C12·15) | linear | cada item salta pro valor dele, no mesmo ritmo (C12·15) |
| contagem | cada bloco baixado | o número troca no lugar | — | — | igual |
| check de concluído | cada conteúdo termina de baixar — o último, no fim do download (C12·12) | o check surge no poço, por opacidade, no lugar do glifo de antes (C12·7) | 150ms | desacelera | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
