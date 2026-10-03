# T07 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| faixa de sessão | as sete linhas passam sem trava | desce de cima (translateY -100%→0) e o conteúdo desce junto; o rodapé troca no mesmo acontecimento | 200ms | desacelera | aparece |
| atualização do firmware | tocar em `Atualizar firmware` | o quadro dos 62% (ref. 06) fica 1s — o ritmo de um bloco da cadeia — e o diagnóstico relê · não há quadro dos 100% | 1s | linear | troca direta |
| linha do módulo ou da CAN | a leitura daquela linha começa | o poço mostra o quadrado branco de agora e o valor diz *lendo*; as seguintes esperam com o relógio e o traço · sem a faixa, e o rodapé desligado *Lendo · não saia da tela* (ref. 11) | — | — | igual |
| linha do módulo ou da CAN | a leitura chega | o poço troca pro estado — check, informação ou falha — e o valor aparece no lugar · 600ms por linha, também nos sinais da CAN no `Ler de novo` | 150ms | esmaece | troca direta, mesmo ritmo |
| contador do título | cada linha que fecha certa | a contagem sobe no lugar, ao lado do título — `4 de 7` na ref. 11 | — | — | igual |
| aviso da trava | a sétima linha fecha na trava | o aviso esmaece no lugar e empurra o bloco do módulo pra baixo | 150ms | desacelera | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
