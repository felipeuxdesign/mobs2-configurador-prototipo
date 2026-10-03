# T05 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| lista de módulos | a busca acha | cada linha surge esmaecendo, uma depois da outra | 150ms · 80ms entre elas | desacelera | aparecem juntas |
| busca de novo | tocar em `Procurar de novo` | a lista some e a tela vira o *Procurando…* (ref. 05) — o poço com o quadrado de agora, o botão desligado —, e a lista volta · 400ms passaria sem o técnico ver que buscou | 1,2s | — | igual |
| conectar | tocar em `Conectar ao …`, ou no `Tentar de novo` da 04 | o primário desliga e diz *Conectando ao M2C-0417…* (ref. 06), e o `Procurar de novo` apaga; depois vem a T07, ou o *NÃO RESPONDEU* da 04 — no aparelho, o tempo real da conexão | 1,2s | — | igual |

- no protótipo · a nossa versão da linha *lista de módulos*, antes desta entrega: | lista de módulos | a busca acha — a lista que volta da busca de novo (C12·28, C12·41) | cada linha surge esmaecendo, uma depois da outra; ao abrir, a lista já está lá, parada (C12·28) | 150ms · 80ms entre elas | desacelera | aparecem juntas |

- no protótipo (o pacote 7: a lista e o escolhido viraram um desenho só, e a troca de quadro ficou só entre a lista e o *Procurando…*, o vazio e o Bluetooth) · a nossa linha *troca de quadro*, que saiu do pacote desta entrega, reescrita sem a pré-checagem: | troca de quadro (C12·4, C12·41) | tocar em `Procurar de novo`; a lista que volta | a lista e o quadro com o escolhido são desenhos diferentes: quando um vira o outro, o conteúdo esmaece, como entre telas; a barra fica parada; o rodapé entra com o quadro, e o texto do primário não esmaece de novo por dentro (C12·23) | 150ms | desacelera | troca direta | — o `Procurar outro módulo` agora chega da T07, e o `Conectar ao …` e o `Tentar de novo` levam à T07: troca de tela, não de quadro

- no protótipo · a nossa linha *marcador de escolha*, que saiu do pacote desta entrega (o protótipo segue com ela): | marcador de escolha (C12·20) | tocar num módulo da lista | o quadrado lima surge no poço (opacidade e escala 80%→100%); o que perde a marca faz o contrário | 150ms | desacelera | aparece |

- no protótipo · a nossa linha *botão primário*, que saiu do pacote desta entrega (o protótipo segue com ela): | botão primário (C12·23) | tocar num módulo, ou noutro por perto | o texto troca pro serial do módulo, no lugar; o roxo troca direto | 150ms | desacelera | troca direta |

- no protótipo · a faixa de sessão não desce nesta tela: a sessão nasce na conexão, e a faixa desce na T07, quando as sete linhas passam sem trava (o padrão aprovado, a resposta do arquiteto ao gate, 02/10). As nossas linhas da pré-checagem — as duas da *linha da pré-checagem*, a *linha que falha* (C12·29), a *faixa de sessão* (C12·24), o *botão primário* da pré-checagem (C12·8, C12·44) e a *atualização de firmware* — saíram com ela (decisão 44)

- no protótipo (o pacote 5): a busca de novo são duas trocas de quadro e uma cascata — no toque, o conteúdo esmaece pro *Procurando…* (05) em 150; aos 1,2 s, a lista volta: a frase e o rodapé esmaecem em 150, e as cinco linhas surgem em cascata

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
