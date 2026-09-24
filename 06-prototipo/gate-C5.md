# Gate C5 · O menu e as folhas — T04

**Data:** 2026-09-24 · **Estado:** fechado em 2026-09-24 — os quadros comparados e explicados, os textos conferidos com os desvios nomeados no CHANGELOG, `checar` e `build` aprovando. Roda junto com o C4 (decisão do diretor: dois ciclos de tela ao mesmo tempo, nunca na mesma tela).

## O censo · o que existe no começo do ciclo

- **10 referências:** a tela, 5 momentos (sem módulo, módulo sem ativo, as folhas da conta e da garagem, o diálogo de sair) e 4 estados (a faixa com o módulo em falha, o checklist pendente, a troca com envio em andamento e a troca com o módulo conectado)
- **As peças do C2:**
  - o topo do menu (a tira de contexto e a faixa no menu);
  - a grade dos dez cartões de ferramenta;
  - a folha e o diálogo com as variantes da T04;
  - o prazo da conta;
  - a lista de garagens;
  - o contador;
- **As decisões do C0 que valem aqui:** T04·1 a T04·8, e as transversais G1, G8, G9, G12, G13, G14, G15, G16, G17, G20, G21, G23 e G25

## Os achados deste ciclo

1. **Os dois contadores da fila contam coisas diferentes** (T04·1). O menu mostra 2: o que ainda não chegou, só da garagem ativa (f-01 e f-04). O diálogo de sair mostra 3: o que está na fila, de todas as garagens. As duas contas saem do mock, e a contradição vai ao diretor, junto do "3 nesta garagem" da T15.
2. **O contador do checklist só aparece depois que o checklist foi aberto uma vez** (T04·2). Isso separa o 00 (sem contador) do 04 (10).
3. **A troca de garagem com a sessão aberta** (T04·4) passa pelo encerramento sem homologar da T16, que só entra no C11. Até lá, o primário segue direto pra T03 da garagem nova, e isso fica nomeado como provisório.
4. **Os cartões de ferramenta** abrem as telas delas, que por enquanto são vazias. Com a sessão aberta, os cartões CONECTAR MÓDULO e ATIVO SELECIONADO não navegam (T04·7).

## As decisões deste ciclo

- **C5·1 · Um agente constrói a T04, e outro revisa e corrige,** como no C4. As peças mexidas pelos dois ciclos são provadas de novo na bancada do C2.
- **C5·2 · Valor que a T04 precisa e o mock não tem** entra como acréscimo, no bloco `P·C5` do gate do mock, e só aditivo (G8).

## Entra

A T04 inteira: os 10 quadros, as três folhas e os dois diálogos, os toques do `tela.md` e os contadores pelas regras da T04·1 e da T04·2.

## Não entra

O movimento da faixa descendo e das folhas além do que as peças já fazem (C12) · as telas das ferramentas (C6 em diante).

## Está pronto quando

Os 10 quadros comparados, com a diferença de cada um explicada ou nomeada · os textos conferindo · o `npm run checar` e o `npm run build` aprovam · o commit do C5 está feito.
