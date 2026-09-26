# T05 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| lista de módulos | a busca acha | cada linha surge esmaecendo, uma depois da outra | 150ms · 80ms entre elas | desacelera | aparecem juntas |
| linha da pré-checagem | a checagem daquela linha começa | o poço mostra o quadrado branco de agora | — | — | igual |
| linha da pré-checagem | a checagem passa | o quadrado vira check, e a próxima linha começa · ritmo 600ms por linha | 150ms | desacelera | troca direta, mesmo ritmo |
| linha que falha | a checagem reprova | a linha fica vermelha no lugar, a causa aparece embaixo, e o aviso surge | 150ms | esmaece | troca direta |
| faixa de sessão | a última linha passa | desce de cima — o momento em que a sessão começa | 200ms | desacelera | aparece |
| atualização de firmware | o firmware grava | a porcentagem troca no lugar; ao terminar, a pré-checagem recomeça do zero | — | — | igual |
| busca de novo | toca em `Procurar de novo` | a lista some e *Procurando…* fica na tela antes de a lista voltar — 400ms passaria sem o técnico ver que buscou | 1,2s | — | igual |

- no protótipo (a última entrega): a busca de novo dura 1,2 s (`app/src/estado/ritmos.js` · `buscaMs`), e o quadro dela é o da T05/00, que o arquiteto aprovou antes — os cinco por perto, com o do herói escolhido —, e não um *Procurando…*: esse texto não está em nenhuma referência nem no `textos.md`, e o protótipo não o inventa (a pergunta vai ao arquiteto)

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
