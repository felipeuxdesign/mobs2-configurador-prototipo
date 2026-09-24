# Gate C8 · O ônibus e a CAN — T06, T07 e T08

**Data:** 2026-09-24 · **Estado:** fechado em 2026-09-24 — os quadros comparados e explicados, os textos conferidos com os desvios nomeados no CHANGELOG, `checar` e `build` aprovando. Roda junto com o C6.

## O censo · o que existe no começo do ciclo

- **14 referências:** T06 tem 7 (a lista, confirmar o veículo e 5 estados), T07 tem 4 (a leitura e 3 estados), T08 tem 3 (a tela, relendo e concluída)
- **As peças do C2:** a linha de ônibus, o escolhido com trava, o par comparado, os instrumentos da folha 5 (a leitura na faixa, fora da faixa, pequena, com mínimo, o tambor e os liga-desliga) e os mostradores da folha 7
- **As decisões do C0 que valem aqui:** T06·1 a T06·5, T07·1 a T07·5, T08·1 a T08·3, e as transversais

## Os achados deste ciclo

1. **A faixa esperada dos sinais não está no mock** (AC-07): o {min, max} de cada sinal e o rótulo curto "Alternador". Entra como acréscimo, com checagem.
2. **O estado domínio mudo da T07 (03) fica fora do ciclo** (T07·1 a). A referência desenha dados do ma-01 com a placa do a-16, e o caso é do ma-02. **Pedido ao arquiteto:** uma referência nova do 03 pro ma-02.
3. **O "doze" e o "de 12" da T08 saem do dado** (T08·2), por extenso, e a grade monta quantos sinais houver.

## As decisões deste ciclo

- **C8·1 · Uma tela por agente, três em paralelo, e um revisor por tela.**
- **C8·2 · O tambor da T07 mostra o valor.** O movimento dele rolando é do C12.
- **C8·3 · Decisão do diretor, no meio do ciclo (24/09): a T06·1 passa pra (b).** Na lista (00), tocar num ônibus o **marca** (o quadrado lima no poço, como a escolha numa lista) e acende o "Usar este ativo". O primário leva à confirmação do veículo (01). Era o T06-N3, que o C0 levou ao diretor. O agente da T06 constrói pela (a), porque já estava rodando, e eu aplico a (b) no fechamento: o `tela.md` da T06 muda junto. O quadro da linha marcada não tem referência e se monta com as peças que existem (G25). **Aviso ao arquiteto:** desenhar esse quadro.
- **O mesmo pedido pra T05:** primeiro a lista, depois escolher, depois "Conectar". O `tela.md` da T05 já diz isso (01 → 00 → conectar), e confiro no fechamento do C6.

## Entra

A T06, a T07 (sem o 03) e a T08 inteiras · o acréscimo AC-07.

## Não entra

O estado domínio mudo da T07, até chegar a referência nova · o movimento fino (C12).

## Está pronto quando

As 13 referências comparadas, com a diferença de cada uma explicada ou nomeada · os textos conferindo · o `npm run checar` e o `npm run build` aprovam · o commit do C8 está feito.
