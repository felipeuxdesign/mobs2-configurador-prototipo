# T13 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| seção abre | tocar no cartão | o cartão cresce no lugar e a seta vira pra cima; as seções de baixo descem | 200ms | desacelera | troca direta |
| barra do checklist | um item passa | o lima avança até o novo total | 300ms | desacelera | troca direta |
| placar | um item conclui | a barra enche até o novo valor (scaleX) | 300ms | desacelera | salta pro valor |
| miniatura da foto | foto tirada | surge no lugar do visor | 150ms | esmaece | aparece |
| veredito | o toque em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | o placar completa e o veredito aparece | 150ms | esmaece | aparece |
| checkbox da ciência | marcar "Estou ciente" | o quadrado lima surge no poço e o `Finalizar instalação` acende | 150ms | desacelera | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
