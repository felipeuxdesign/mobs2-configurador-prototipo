# T05 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| lista de módulos | a busca acha — a lista que volta da busca de novo (C12·28, C12·41) | cada linha surge esmaecendo, uma depois da outra; ao abrir, a lista já está lá, parada (C12·28) | 150ms · 80ms entre elas | desacelera | aparecem juntas |
| troca de quadro (C12·4, C12·41) | tocar em `Procurar de novo`, `Procurar outro módulo`, `Conectar ao …` e `Tentar de novo`; a lista que volta | a lista, o quadro com o escolhido e a pré-checagem são desenhos diferentes: quando um vira o outro, o conteúdo esmaece, como entre telas; a faixa e a barra ficam paradas; o rodapé entra com o quadro, e o texto do primário não esmaece de novo por dentro (C12·23) | 150ms | desacelera | troca direta |
| marcador de escolha (C12·20) | tocar num módulo da lista | o quadrado lima surge no poço (opacidade e escala 80%→100%); o que perde a marca faz o contrário | 150ms | desacelera | aparece |
| botão primário (C12·23) | tocar num módulo, ou noutro por perto | o texto troca pro serial do módulo, no lugar; o roxo troca direto | 150ms | desacelera | troca direta |
| busca de novo | toca em `Procurar de novo` | a lista some e *Procurando…* fica na tela antes de a lista voltar — 400ms passaria sem o técnico ver que buscou | 1,2s | — | igual |
| linha da pré-checagem | a checagem daquela linha começa | o poço mostra o quadrado branco de agora | — | — | igual |
| linha da pré-checagem | a checagem passa | o quadrado vira check, e a próxima linha começa · ritmo 600ms por linha | 150ms | desacelera | troca direta, mesmo ritmo |
| linha que falha | a checagem reprova, ou para no caso (C12·29) | a reprova: o glifo, a cor e a causa trocam no lugar, esmaecendo, e a linha cresce direto; a parada: o aviso esmaece no topo, e a lista salta (C12·29) | 150ms | desacelera (C12·5) | troca direta |
| faixa de sessão | a última linha passa e a pré-checagem aprova (C12·24) | desce de cima (translateY -100%→0) — o momento em que a sessão começa —, por baixo da barra do sistema, que não se move; o miolo acompanha só por deslocamento, com o lugar já aberto (C12·24) | 200ms | desacelera | aparece |
| botão primário (C12·8, C12·23, C12·44) | a pré-checagem termina: aprova, reprova ou para no caso (C12·8); e o `Acordar módulo` | apagado com o `Selecionar ativo` enquanto ela corre, o primário acende: na aprovada, com o mesmo texto, por uma camada (C12·8); na reprova e na parada, com o texto da saída (`Procurar outro módulo`, `Acordar módulo`, `Reconectar`), o texto novo esmaece no lugar e o roxo troca direto (C12·23); o `Acordar módulo` que o apaga volta ao `Selecionar ativo` do mesmo jeito, sem o roxo por cima (C12·18) | 150ms | desacelera | troca direta |
| atualização de firmware | o firmware grava | a porcentagem troca no lugar; ao terminar, a pré-checagem recomeça do zero | — | — | igual |

- no protótipo (C12·41): a busca de novo são duas trocas de quadro e uma cascata — no toque, o conteúdo esmaece pro quadro da busca (o da 00) em 150; aos 1,2 s, a lista volta: a frase e o rodapé esmaecem em 150, e as cinco linhas surgem em cascata. Do quadro da 00, o toque não troca o desenho: só a volta da lista se move
- no protótipo (a última entrega): a busca de novo dura 1,2 s (`app/src/estado/ritmos.js` · `buscaMs`), e o quadro dela é o da T05/00, que o arquiteto aprovou antes — os cinco por perto, com o do herói escolhido —, e não um *Procurando…*: esse texto não está em nenhuma referência nem no `textos.md`, e o protótipo não o inventa (a pergunta vai ao arquiteto)

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
