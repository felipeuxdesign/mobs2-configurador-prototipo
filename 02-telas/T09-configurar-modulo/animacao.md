# T09 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| elo que espera | antes de gravar | o relógio no poço, e o trilho apagado | — | — | igual |
| elo da cadeia | o bloco começa a gravar | o poço mostra o quadrado de agora | — | — | igual |
| elo da cadeia | o read-back confirma | o quadrado vira check · ritmo 1s por bloco | 150ms | desacelera | troca direta, mesmo ritmo |
| trilho | um elo confirma | o trilho até o próximo elo acende (scaleY de cima pra baixo) | 300ms | desacelera | aparece aceso |
| elo recusado | o módulo recusa | o elo fica vermelho e o aviso surge | 150ms | esmaece | troca direta |
| aviso (C12·9) | tentar sair antes de a Conexão gravar (o `ENCERRAR`, o `Voltar ao menu` da cadeia parada, o voltar) | a recuperação: o aviso surge no topo, esmaecendo; o glifo do elo parado esmaece no poço; o espaço, o contador e a altura dos elos trocam direto (G24) | 150ms | desacelera | troca direta |
| prova da cadeia (C12·9) | o último bloco é relido | a prova surge no lugar, esmaecendo; a altura dos elos troca direto (G24) | 150ms | desacelera | aparece |
| botão primário (C12·8, C12·18, C12·23) | a cadeia conclui ou para, ou o técnico tenta sair; e retomar | apagado com o `Gravando · não interrompa`, o primário acende com o texto da saída: o texto novo esmaece no lugar, e o roxo troca direto (C12·23); ao retomar, se apaga direto, sem o roxo por cima, e o texto novo esmaece no lugar | 150ms | desacelera | troca direta |

- no protótipo · a nossa versão da linha *elo recusado*, antes desta entrega: | elo recusado | o módulo recusa | o xis entra no poço e o aviso surge no lugar, esmaecendo; o vermelho do elo troca direto (C12·8, C12·9) · sem porta no palco, provado na vitrine (C12·13) | 150ms | desacelera (C12·5) | troca direta |
- no protótipo (G27): a cadeia só corre depois da troca que a trouxe — no `Gravar no módulo` e no `Reenviar`, o rodapé troca inteiro, e o conteúdo esmaece como entre telas (C12·4): o primeiro bloco relê a 1 s do fim do esmaecer; pelo endereço da `00`, a 1 s da montagem · o *esmaece* da tabela é a curva de tudo, a que desacelera (C12·5)

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
