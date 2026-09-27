# T01 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| olho da senha | tocar no olho | a senha troca entre os pontos e o texto, no lugar, e o olho troca pelo riscado | 150ms | desacelera (C12·5) | troca direta |
| campo em foco | tocar no campo | o traço de baixo acende em lima, da esquerda pra direita (scaleX 0→1) | 150ms | desacelera | aparece aceso |
| espera do Entrar (no protótipo, decisão do diretor, 27/09) | Entrar com internet | o texto do primário troca no lugar pra *Entrando…* (opacidade 0→1) e o botão se apaga direto, desabilitado, como o *Gravando no módulo…* da T10; nada gira, nada sai do lugar; a resposta chega 1,2 s depois, e a T02 entra com a troca entre telas | 150ms | desacelera | troca direta, no mesmo ritmo |
| aviso de erro | Entrar com senha inválida | surge no lugar (opacidade 0→1); a marca NÃO se move | 150ms | desacelera | aparece |
| célula do código | cada dígito digitado | o dígito surge e o traço lima pula pra próxima célula | 100ms | desacelera | troca direta |
| cronômetro do código | a cada segundo | o número troca no lugar; nada desliza | — | — | igual |
| contagem do reenvio | a cada segundo, na folha | o número troca no lugar; ao zerar, a seta entra e a linha acende | 150ms | desacelera (C12·5) | troca direta |
| requisitos da senha | cada requisito atendido | a marca ganha o check e o texto clareia (C12·7) | 150ms | desacelera | troca direta |
| folha "não recebi o código" | tocar no link | o painel sobe de baixo (translateY 100%→0) e o véu esmaece | 200ms | desacelera | aparece |
| diálogo "senha alterada" | nova senha aceita | esmaece e cresce 98%→100% | 150ms | desacelera | aparece |
| checkbox "Lembrar meu usuário" | tocar no checkbox | o quadrado lima surge no poço (opacidade e escala 80%→100%); desmarcar some igual | 150ms | desacelera | aparece |

No protótipo (a última entrega): o diálogo *Outra sessão neste aparelho* (a 18) nasce aberto, junto com a entrada da T02 — no fluxo, as empresas do herói, o quadro do `05` (a empresa antes da unidade, a otimização 400); pela coluna, as unidades, como a 18 desenha — nenhuma tela anima a entrada —, e sai como todo diálogo: o véu e a caixa esmaecem, e a caixa diminui de 100% a 98%, em 150ms. A linha do reenvio que vira o teto (a 17) troca o texto no lugar, sem movimento.

No protótipo (lei 20, a última entrega): a folha *Não recebi o código* também se arrasta — o painel acompanha o dedo pra baixo, só por transform; soltando depois de 56, desce de onde parou e fecha em 150ms, e o véu esmaece junto; antes, volta ao lugar em 200ms. É o arraste de toda folha (`movimento.md` · folha · o arraste, proposta do protótipo); com reduzir movimento, o painel segue o dedo e a volta ou o fecho é direto.

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
