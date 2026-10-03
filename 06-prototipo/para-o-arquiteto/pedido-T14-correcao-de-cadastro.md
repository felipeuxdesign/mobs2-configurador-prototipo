# Pedido ao arquiteto · o que acontece depois do "Solicitar correção de cadastro" (T14)

## O que medi

O toque está desenhado e construído: é a T14/06. O link vira o registro *Correção solicitada às 14:30*, não tocável, e o pedido fica gravado na sessão com o código lido, o esperado e a hora.

O depois não está desenhado. Os requisitos (§4.7) dizem que o técnico "sai da visita com o pedido aberto e o diagnóstico pronto", mas o pedido não aparece em mais lugar nenhum:

1. **Na fila de saída (T15):** a fila só tem *Evidências da instalação* e *Checklist de homologação*. O pedido feito sem rede não tem como subir, e o técnico não vê que ele saiu.
2. **No checklist (T13):** a Seção E mostra o *Cartão do motorista* reprovado, sem dizer que a correção foi pedida.
3. **Na homologação:** com o cartão reprovado, a Seção E reprova. Não está escrito se a instalação homologa com o pedido aberto, com ressalva, ou se trava até o cadastro ser corrigido.
4. **Depois da correção:** não está escrito se o técnico refaz só o passo do cartão ou o ciclo inteiro, nem como ele fica sabendo que o cadastro foi corrigido.

## As decisões (o padrão que eu adotaria entre parênteses)

1. **O pedido entra na fila de saída.** (Sim, como um item novo, *Pedido de correção de cadastro*, com o ativo. Ele sobe como as evidências e mostra os mesmos estados: na fila, enviando, recebido, erro.)
2. **O checklist mostra o pedido.** (Sim. Na linha do *Cartão do motorista* da Seção E, a causa diz que a correção foi pedida, com a hora: algo como *correção pedida às 14:30*. O texto é seu.)
3. **A homologação com o pedido aberto.** (É do PM. O meu padrão seria a Seção E reprovar como hoje, e a instalação poder ser salva com ressalva citando o pedido, sem homologar até o cartão passar.)
4. **Depois da correção.** (É do PM. O meu padrão seria refazer só o passo do cartão, numa visita nova, com o cadastro corrigido vindo no pacote da sincronização.)

## O que o pacote traria

- **Dois estados novos** (uma condição do mundo, montada por caso do mock):
  - **T15 · o pedido na fila de saída:** com o tipo novo de item;
  - **T13 · a Seção E com o cartão reprovado e a correção pedida:** pelo caso que já existe, `identificador-divergente`.
- **Na T14, nada novo:** o toque já tem o quadro dele, o momento `06`.
- **Mais estados, se as decisões 3 e 4 pedirem.**
- **O mock:** um tipo novo na fila de saída e o caso do pedido.
- **Os documentos:** T13, T15 e T14 (`tela.md`, `textos.md`, `estados.md`), a `logica.md` e, pro dev, `08-para-o-dev/o-que-o-produto-ainda-decide.md`.
