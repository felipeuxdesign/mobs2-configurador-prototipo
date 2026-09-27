# T06 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| marcador de escolha (C12·20) | tocar num ônibus | o quadrado lima surge no poço (opacidade e escala 80%→100%); o que perde a marca faz o contrário | 150ms | desacelera | aparece |
| botão primário (C12·8) | tocar num ônibus, sem nenhum marcado; a busca que devolve o marcado | o `Usar este ativo`, apagado com o mesmo texto, acende por uma camada, como todo primário que acende na frente de quem olha; a busca que esconde o marcado o apaga direto (C12·18) | 150ms | desacelera | troca direta |
| lista filtrada (C12·10, C12·20) | digitar na busca | as linhas que saem esmaecem por cima; as que ficam deslizam pro lugar novo (translateY), sem reordenar; as que voltam esmaecem no lugar; nenhuma altura anima | 150ms | desacelera | troca direta |
| troca de quadro (C12·4) | tocar em `Usar este ativo` na lista, em `Escolher outro` e em `Usar leitor sem fio`; a busca que acha a placa de outro pacote e abre a trava, sem a lista andar por cima (C12·4, C12·10) | a lista e *Confirmar o veículo* são desenhos diferentes: o conteúdo esmaece, como entre telas; a faixa e a barra ficam paradas | 150ms | desacelera | troca direta |
| pedido de correção | tocar em Solicitar correção | o cartão vira o registro no lugar: o relógio entra no poço e o texto troca | 150ms | desacelera (C12·5) | troca direta |
| par de chassis | a confirmação abre (C12·11) | o par chega com o conteúdo, no esmaecer da troca de quadro; nada se desenha entre os dois — nenhuma referência desenha o check entre os chassis (C12·11) | 150ms | desacelera | troca direta |
| confirmação manual | marcar o checkbox | o quadrado lima surge e o botão acende, por uma camada (C12·8); desmarcar: o quadrado some igual, e o botão se apaga direto | 150ms | desacelera | troca direta |

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
