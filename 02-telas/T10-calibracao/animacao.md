# T10 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| campo do painel | tocar no campo | o rótulo e o traço de baixo acendem em lima | 150ms | desacelera | troca direta |
| semear | tocar em `Semear o hodômetro` | o botão desliga e diz *Gravando no módulo…* (ref. 06), depois *Relendo…* (ref. 07); no fim do *Relendo…* o tambor rola, e a tela vira o semeado ou o não confere | 1s + 1s | linear | troca direta |
| tambor | semear | as rodinhas rolam do número lido ao digitado para o ativo da sessão (na referência do caminhão, de 87.604 até 87.712), uma depois da outra | 600ms no total | desacelera | mostra o número final |
| régua da diferença | semear | a diferença encolhe até zero | 300ms | desacelera | troca direta |
| troca de quadro (C12·4) | tocar em `Calibrar o …` | o passo seguinte é outro desenho: o conteúdo esmaece, como entre telas; a faixa e a barra ficam paradas; o rodapé entra com o quadro | 150ms | desacelera | troca direta |
| botão primário (C12·18, C12·23) | digitar e semear | o texto diz o que falta e troca no lugar, esmaecendo; o `Semear` que o apaga perde o roxo de uma vez; no fim do semear, acende com o texto do passo seguinte, que esmaece no lugar, e o roxo troca direto (C12·23) | 150ms | desacelera | troca direta |

- no protótipo · a nossa versão da linha *campo do painel* (C12·22, C12·45): o traço de baixo acende em lima, da esquerda pra direita, por cima da borda, e o rótulo troca a cor direto; nada sai do lugar
- no protótipo · a nossa versão da linha *tambor* (C12·33): 500ms no total · 300ms por rodinha e 40ms entre elas, a unidade primeiro
- no protótipo · a nossa versão da linha *régua da diferença* (C12·34): semear, quando o tambor para · em sequência, depois do tambor (T10·4 a): a diferença encolhe no centro e esmaece, no lugar dela; no fim dos 300, o confere entra esmaecendo, e no mesmo quadro o poço acende, o alvo diz que cumpriu, o segmento fica feito e o primário acende · 300ms · 150ms
- no protótipo (C12·34): o semear só acaba quando o veredito assenta — até lá, o `Relendo…`, o `Voltar ao menu` e o `ENCERRAR` ficam como estavam
- com a decisão 52 (pacote 2), saem as nossas linhas da câmera e da *foto registrada*: a foto do painel é da Seção B do checklist, e a troca de quadro da T10 fica só no `Calibrar o …`

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
