# T14 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| troca de quadro (C12·4) | a fila do módulo drena (01 → 00); o prazo estoura; o ciclo conclui; tocar em `Disparar outro evento` | o antes do disparo, o prazo correndo, o prazo estourado e o ciclo concluído são desenhos diferentes — a frase da fila e a espera saem, a frase da Seção F entra, o rodapé troca inteiro: o conteúdo esmaece, como entre telas, pelo processo ou pelo toque; o que entra com o quadro (o disparo que acende, o último passo) não esmaece de novo por dentro | 150ms | desacelera | troca direta |
| botão primário (C12·23) | tocar em `Disparar evento de teste` | o texto troca no lugar, pra `Encerrar o ciclo`; o roxo fica | 150ms | desacelera | troca direta |
| barra do prazo | o evento foi disparado | drena da direita pra esquerda · no protótipo, 1s vale 4s de prazo; cada tique de 250ms é um trecho linear, o marcador e o preenchido juntos, só por transform (C12·40) | contínuo | linear | o número troca, a barra salta |
| número do prazo | a cada segundo do prazo | troca no lugar | — | — | igual |
| passo do veículo | o ônibus faz o passo | o relógio vira check · ritmo 3s por passo | 150ms | desacelera | troca direta |
| linha do evento | o servidor recebe | o relógio vira o horário | 150ms | desacelera (C12·5) | troca direta |
| pedido de correção | tocar em Solicitar correção | o link vira o registro com o relógio, no mesmo lugar | 150ms | desacelera (C12·5) | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
