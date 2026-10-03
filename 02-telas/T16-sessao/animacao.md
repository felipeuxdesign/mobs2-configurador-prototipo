# T16 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| passo do encerramento | cada passo conclui | o quadrado de agora vira check · ritmo 600ms; o trilho troca direto, não acende (C12·32); o quadrado de agora do passo seguinte esmaece no poço junto, como o check (a peça, C12·20) | 150ms | desacelera | troca direta |
| legenda do passo que corre (C12·9) | o passo seguinte começa | a legenda passa ao passo que corre e esmaece no lugar; a do que fechou sai de uma vez, e o espaço muda direto — as linhas de baixo não deslizam (C12·9) | 150ms | desacelera | troca direta |
| botão primário (C12·23) | o corte começa e termina (01) | o texto do primário apagado troca no lugar: `Aguardando o módulo voltar`, e de volta `Encerrando · não desconecte` | 150ms | desacelera | troca direta |
| troca de quadro (C12·4) | o último passo fecha: a sessão encerra, com ou sem homologar (00 → 02, 03 → 04) | o encerramento e a sessão encerrada são desenhos diferentes: o conteúdo esmaece, como entre telas, pelo processo; o rodapé entra com o quadro; a faixa sobe junto (a linha de baixo) | 150ms | desacelera | troca direta |
| assertiva do autoteste | cada leitura chega | a linha da vez mostra o quadrado branco de agora e diz *lendo*; as seguintes esperam com o relógio e o traço; a contagem sobe ao lado do título; o veredito só entra no fim (ref. 07) · 400ms por assertiva | 150ms | desacelera | aparecem juntas |
| rodapé | o autoteste corre | `Voltar ao menu` desligado até o veredito | — | — | igual |
| prova, bloqueio e `Voltar ao menu` (o pacote 5) | a última assertiva chega | o autoteste correndo (07) não tem veredito: a contagem ao lado do título e o `Voltar ao menu` desligado; na oitava, o quadro troca pro fim (02 ou 05) — o conteúdo esmaece, como entre telas (C12·4), e a prova (ou o bloqueio) e o `Voltar ao menu` aceso já vêm no quadro novo | 150ms | desacelera | troca direta |
| faixa de sessão | a sessão encerra | a faixa aberta sobe (translateY 0→-100%) por baixo da barra do sistema e revela a faixa sem sessão, que já está no lugar; nada do layout se move (C12·25) | 200ms | desacelera (C12·5) | troca direta (C12·25) |


**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
