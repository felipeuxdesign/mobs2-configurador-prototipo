# T13 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| seção abre | tocar no cartão | o cartão cresce no lugar e a seta vira pra cima; as seções de baixo descem; os itens esmaecem junto (C12·46); tocar de novo fecha, o mesmo ao contrário — a seta volta e as de baixo sobem, e os itens saem com o cartão, que já tem o tamanho novo e corta o que passa da borda (C12·6, C12·10) | 200ms | desacelera | troca direta |
| troca de quadro (C12·4) | abrir um item, passar ao próximo depois do `Tirar foto` ou do `Salvar com ressalva`, e voltar às seções | as seções e o nível do item são desenhos diferentes: o conteúdo esmaece, como entre telas; a faixa e a barra do sistema ficam paradas; o rodapé entra com o quadro, sem esmaecer de novo por dentro | 150ms | desacelera | troca direta |
| barra do checklist | um item passa — na volta do nível do item às seções, e no `Finalizar instalação` (C12·36) | o lima avança até o novo total, a partir do que tinha quando o item abriu; o número do título troca no lugar (C12·36) | 300ms | desacelera | troca direta |
| miniatura da foto | foto tirada — na volta à seção (C12·37) | o visor segue sem a foto (G25); o check das fotos tiradas entra no cartão da seção com a troca de quadro da volta, sem esmaecer de novo (C12·37) | 150ms | desacelera (C12·5) | aparece |
| caixa do não conforme (C12·47) | marcar e desmarcar `Não está conforme` | o quadrado lima surge no poço; a caixa desliza do lugar de antes ao novo (translateY) e o campo *O que aconteceu* esmaece embaixo dela; desmarcar faz o mesmo ao contrário — a caixa desce, e o campo esmaece por cima até sumir (C12·6) | 150ms | desacelera | troca direta |
| registro do problema (C12·42) | tocar em `Fotografar o problema` | o registro esmaece no lugar do visor, e o visor sai esmaecendo por cima; a caixa e o campo sobem pro lugar novo, só por deslocamento (C12·10, C12·47); desmarcar com a foto guardada faz o contrário | 150ms | desacelera | troca direta |
| botão primário (C12·23) | marcar a caixa, fotografar o problema, escrever o que aconteceu, e o `Finalizar instalação` | o texto do primário troca no lugar — `Tirar foto` → `Fotografar o problema` → `Conte o que aconteceu` → `Salvar com ressalva`, e `Finalizar instalação` → `Encerrar a sessão`; o roxo troca direto, e o que se desabilita no toque não mostra o roxo (C12·18) | 150ms | desacelera | troca direta |
| veredito | o último item passa | o placar completa e o veredito aparece | 150ms | desacelera (C12·5) | aparece |
| checkbox da ciência | marcar "Estou ciente" | o quadrado lima surge no poço e o `Finalizar instalação` acende, por uma camada (C12·8) | 150ms | desacelera | troca direta |

- no protótipo (C12·36): a linha *placar* saiu. O placar saiu com a estrutura nova (decisão 34), e a barra do checklist tomou o lugar dele: o movimento é o da linha *barra do checklist*. A linha de antes: | placar | um item conclui | a barra enche até o novo valor (scaleX) | 300ms | desacelera | salta pro valor |

- no protótipo · a nossa versão da linha *veredito*, antes desta entrega: | veredito | o toque em `Finalizar instalação`, com o que bloqueia resolvido (T13·3) | o placar completa e o veredito aparece | 150ms | esmaece | aparece |
  - no protótipo (C12·36, C12·9): no `Finalizar instalação`, a barra do checklist completa em 300 (o placar da linha) e o veredito esmaece no lugar em 150; o espaço dele abre direto, e nenhuma seção desliza por ele; a seção que estava aberta fecha, e só as de baixo dela sobem (a linha *seção abre*); o texto do primário troca no lugar (C12·23)

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
