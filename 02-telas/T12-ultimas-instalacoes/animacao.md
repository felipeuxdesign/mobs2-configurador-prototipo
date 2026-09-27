# T12 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| tela · troca de quadro (C12·4) | abrir o detalhe, e voltar às instalações (o `Voltar às instalações`, o voltar) | a lista e o detalhe são desenhos diferentes: o conteúdo esmaece, como entre telas — é o total, sem o 1→0→1 (C12·2); a barra e a faixa ficam paradas; o rodapé entra com o quadro · nada mais se move | 150ms | desacelera (C12·5) | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
