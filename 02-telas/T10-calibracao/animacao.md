# T10 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| campo do painel | tocar no campo | o traço de baixo acende em lima, da esquerda pra direita, por cima da borda, e o rótulo troca a cor direto; nada sai do lugar (C12·22, C12·45) | 150ms | desacelera | troca direta |
| troca de quadro (C12·4) | tocar em `Fotografar o painel`, `Tirar foto`, `Voltar à calibração` (e o voltar, na câmera) e `Calibrar o …` | a câmera e o passo seguinte são outro desenho: o conteúdo esmaece, como entre telas; a faixa e a barra ficam paradas; o rodapé entra com o quadro | 150ms | desacelera | troca direta |
| foto registrada | voltar da câmera | o cartão vira o registro no lugar: o check lima entra no poço com a troca de quadro da volta — os mesmos 150, e o registro não esmaece de novo por dentro (C12·42, C12·4) | 150ms | desacelera (C12·5) | troca direta |
| botão primário (C12·18, C12·23) | digitar, fotografar e semear | o texto diz o que falta e troca no lugar, esmaecendo; o `Semear` que o apaga perde o roxo de uma vez; no fim do semear, acende com o texto do passo seguinte, que esmaece no lugar, e o roxo troca direto (C12·23) | 150ms | desacelera | troca direta |
| semear | tocar em Semear | o botão diz *Gravando no módulo…* e depois *Relendo…*; aí o tambor rola e a tela vira o semeado, ou o não confere | 1s + 1s | linear | troca direta |
| tambor | semear | as rodinhas rolam de 184.320 até 482.317, uma depois da outra | 500ms no total · 300ms por rodinha e 40ms entre elas, a unidade primeiro (C12·33) | desacelera | mostra o número final |
| régua da diferença | semear, quando o tambor para | em sequência, depois do tambor (T10·4 a): a diferença encolhe no centro e esmaece, no lugar dela; no fim dos 300, o confere entra esmaecendo, e no mesmo quadro o poço acende, o alvo diz que cumpriu, o segmento fica feito e o primário acende (C12·34) | 300ms · 150ms | desacelera | troca direta |

- (C12·42) a linha *foto do painel · foto tirada · a miniatura surge no lugar do "aguarda"* saiu: a miniatura e o *aguarda* saíram com a decisão 33, e a foto é a da linha *foto registrada*
- no protótipo (C12·34): o semear só acaba quando o veredito assenta — até lá, o `Relendo…`, o `Voltar ao menu` e o `ENCERRAR` ficam como estavam

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
