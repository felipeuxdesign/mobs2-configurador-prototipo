# T01 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| olho da senha | tocar no olho | a senha troca entre os pontos e o texto, no lugar, e o olho troca pelo riscado | 150ms | esmaece | troca direta |
| campo em foco | tocar no campo | o traço de baixo acende em lima, da esquerda pra direita (scaleX 0→1) | 150ms | desacelera | aparece aceso |
| aviso de erro | Entrar com senha inválida | surge no lugar (opacidade 0→1); a marca NÃO se move | 150ms | desacelera | aparece |
| célula do código | cada dígito digitado | o dígito surge e o traço lima pula pra próxima célula | 100ms | desacelera | troca direta |
| cronômetro do código | a cada segundo | o número troca no lugar; nada desliza | — | — | igual |
| contagem do reenvio | a cada segundo, na folha | o número troca no lugar; ao zerar, a seta entra e a linha acende | 150ms | esmaece | troca direta |
| requisitos da senha | cada requisito atendido | o poço ganha o check (traço desenhado) e o texto clareia | 150ms | desacelera | troca direta |
| folha "não recebi o código" | tocar no link | o painel sobe de baixo (translateY 100%→0) e o véu esmaece | 200ms | desacelera | aparece |
| diálogo "senha alterada" | nova senha aceita | esmaece e cresce 98%→100% | 150ms | desacelera | aparece |
| checkbox "Lembrar meu usuário" | tocar no checkbox | o quadrado lima surge no poço (opacidade e escala 80%→100%); desmarcar some igual | 150ms | desacelera | aparece |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
