# T09 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| elo da cadeia | o bloco começa a gravar | o poço mostra o quadrado de agora | — | — | igual |
| elo da cadeia | o read-back confirma | o quadrado vira check · ritmo 1s por bloco | 150ms | desacelera | troca direta, mesmo ritmo |
| trilho | um elo confirma | o trilho até o próximo elo acende (scaleY de cima pra baixo) | 300ms | desacelera | aparece aceso |
| elo recusado | o módulo recusa | o elo fica vermelho e o aviso surge | 150ms | esmaece | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
