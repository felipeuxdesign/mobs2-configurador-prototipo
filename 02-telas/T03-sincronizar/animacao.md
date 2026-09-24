# T03 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| barra de download | a sincronização correndo | enche da esquerda (scaleX), linear, no ritmo do protótipo: 4s no total | 4s | linear | salta pro fim |
| contagem | cada bloco baixado | o número troca no lugar | — | — | igual |
| check de concluído | fim do download | o traço do check se desenha | 150ms | desacelera | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
