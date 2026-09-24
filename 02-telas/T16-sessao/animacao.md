# T16 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| passo do encerramento | cada passo conclui | o quadrado de agora vira check · ritmo 600ms | 150ms | desacelera | troca direta |
| assertiva do autoteste | cada leitura chega | acende com o valor lido, em ordem, 400ms cada | 150ms | desacelera | aparecem juntas |
| faixa de sessão | a sessão encerra | sobe e some (translateY 0→-100%) | 200ms | acelera | some |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
