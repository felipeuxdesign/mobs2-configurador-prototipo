# T16 · animação

Vale o `03-design-system/movimento.md`. Entre telas, só o conteúdo esmaece em 150ms — a barra do sistema e a faixa da sessão ficam paradas. Aqui está o que se move **dentro** desta tela.

| Elemento | Quando | O que muda | Tempo | Curva | Com reduzir movimento |
|---|---|---|---|---|---|
| passo do encerramento | cada passo conclui | o quadrado de agora vira check · ritmo 600ms; o trilho troca direto, não acende (C12·32); o quadrado de agora do passo seguinte esmaece no poço junto, como o check (a peça, C12·20) | 150ms | desacelera | troca direta |
| legenda do passo que corre (C12·9) | o passo seguinte começa | a legenda passa ao passo que corre e esmaece no lugar; a do que fechou sai de uma vez, e o espaço muda direto — as linhas de baixo não deslizam (C12·9) | 150ms | desacelera | troca direta |
| botão primário (C12·23) | o corte começa e termina (01) | o texto do primário apagado troca no lugar: `Aguardando o módulo voltar`, e de volta `Encerrando · não desconecte` | 150ms | desacelera | troca direta |
| troca de quadro (C12·4) | o último passo fecha: a sessão encerra, com ou sem homologar (00 → 02, 03 → 04) | o encerramento e a sessão encerrada são desenhos diferentes: o conteúdo esmaece, como entre telas, pelo processo; o rodapé entra com o quadro; a faixa sobe junto (a linha de baixo) | 150ms | desacelera | troca direta |
| assertiva do autoteste | cada leitura chega | acende com o valor lido, em ordem, 400ms cada | 150ms | desacelera | em ordem, no mesmo ritmo, sem o esmaecer (C12·38) |
| prova, bloqueio e `Voltar ao menu` (C12·44) | a última assertiva chega | a prova (ou o bloqueio) já está no lugar desde a primeira assertiva, neutra — a moldura, o traço cinza e a contagem das que acenderam (*1 de 8* …) no lugar dos *6 blocos* (até o pacote 1, a versão; decisão 49); na oitava, o rótulo, os *6 blocos* e a legenda (ou o título e a frase) entram, o lima (ou o vermelho) do traço passa por uma camada e a contagem sai; o `Voltar ao menu`, no lugar, apagado, com o mesmo texto, acende por uma camada (C12·8); nada muda de lugar (C12·44) | 150ms | desacelera | troca direta |
| faixa de sessão | a sessão encerra | a faixa aberta sobe (translateY 0→-100%) por baixo da barra do sistema e revela a faixa sem sessão, que já está no lugar; nada do layout se move (C12·25) | 200ms | desacelera (C12·5) | troca direta (C12·25) |

- no protótipo (C12·44): o quadro de espera da prova e do bloqueio — a caixa neutra com a contagem — não tem referência (G25) e vai ao arquiteto, junto com o da T11 (C12·35)

**Os quadros de começo e fim** de cada movimento são as referências desta pasta: o movimento vai de uma referência parada à outra. Só propriedades de transform e opacity — nada que mexa no layout.
