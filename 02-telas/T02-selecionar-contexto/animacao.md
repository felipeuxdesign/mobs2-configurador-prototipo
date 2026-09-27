# T02 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| marcador de escolha | tocar na linha | o quadrado lima surge no poço (opacidade e escala 80%→100%) | 150ms | desacelera | aparece |
| botão primário | cada escolha (C12·23) | o texto troca pro nome da unidade, no lugar; o roxo troca direto (C12·23) | 150ms | desacelera (C12·5) | troca direta |
| lista filtrada | digitar na busca | as linhas que saem esmaecem por cima, fora do fluxo; as que ficam sobem juntas, só por deslocamento, sem reordenar; as que voltam esmaecem no lugar; nenhuma altura anima (C12·10) | 150ms | desacelera | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
