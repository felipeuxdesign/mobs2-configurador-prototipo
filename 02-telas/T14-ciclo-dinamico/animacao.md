# T14 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| barra do prazo | o evento foi disparado | drena da direita pra esquerda · no protótipo, 1s vale 4s de prazo | contínuo | linear | o número troca, a barra salta |
| número do prazo | a cada segundo do prazo | troca no lugar | — | — | igual |
| passo do veículo | o ônibus faz o passo | o relógio vira check · ritmo 3s por passo | 150ms | desacelera | troca direta |
| linha do evento | o servidor recebe | o relógio vira o horário | 150ms | esmaece | troca direta |
| pedido de correção | tocar em Solicitar correção | o link vira o registro com o relógio, no mesmo lugar | 150ms | esmaece | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
