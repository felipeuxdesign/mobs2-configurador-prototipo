# Pedido ao arquiteto · a T14 entra na gramática do poço (o passo da vez)

## O problema, medido

O diretor rodou a T14 e sentiu a tela travada, sem retorno. Medi no protótipo e nas referências:

- **Depois do disparo, nenhum passo diz que é a vez dele.**
  - *Ré acionada*, *Porta aberta*, *Cartão do motorista* e *Ignição desligada* ficam iguais: o relógio apagado e o título apagado.
  - As referências desenham assim: a 00, a 01, a 03, a 04 e a 06.
- **O primeiro passo depois do disparo só vira check aos 9 s** (`cicloPassoMs` 3 s; os passos acendem a +9, +12, +15 e +18 s).
  - Até lá, só o prazo anda, e a lista parece parada.
- **O pacote 5 tirou a T14 da regra de propósito.** O `componentes.md` (o poço numa leitura em andamento) diz: *"A T14 fica fora: o passo do veículo vai do relógio direto ao check, porque a espera é pelo ônibus."*

## Por que a T14 precisa do quadrado mais que as outras

Na T07, na T11 e na T16, o técnico **espera o sistema**. Na T14, é ele quem **age no ônibus**: dá a ré, abre a porta, passa o cartão, desliga a ignição. É a única lista em que a linha da vez é uma ordem pra ele. Sem o quadrado de agora, ele não sabe qual passo fazer, e a tela parece travada.

## A proposta

A T14 entra na gramática do poço:

- **esperando:** o relógio e o traço, como hoje;
- **agora:** o quadrado branco, com o título aceso e um texto curto à direita;
- **pronto:** o check, ou o xis com a causa.

A contagem *N de 6 passos* fica onde está, ao lado do título.

## As decisões (o padrão que eu adotaria entre parênteses)

1. **A T14 entra na regra do poço?** (Sim. Sai a frase *"A T14 fica fora"* do `componentes.md`, e a lei 24 vale aqui também.)
2. **O texto à direita do passo da vez.**
   - (Padrão: a ação, curta, na voz do técnico, uma por passo: *dê ré*, *abra a porta*, *passe o cartão*, *desligue a ignição*. Diz o que fazer, não só que está esperando.)
   - A alternativa é uma palavra só, como as outras telas (*aguardando*). O texto é seu; eu não invento.
3. **Antes do disparo (a 01), o quadrado aparece?**
   - (Não. Antes do disparo, o que é da vez é o `Disparar evento de teste`, e os passos só andam depois dele. O quadrado nasce no disparo.)
4. **Na falha (a 03, a Rotação com o xis e a causa).** (Os seguintes ficam com o relógio, sem quadrado. O ciclo parou ali, e a causa já diz o que fazer.)
5. **Na 04 e na 06 (o identificador divergente e a correção solicitada).** (O quadrado fica no passo da vez, como na 00, se os passos continuam andando nesses estados. Se não andam, sem quadrado. Confirme qual vale.)
6. **O movimento.**
   - (O quadrado nasce no poço do passo da vez quando o anterior vira check, no mesmo tique, os dois esmaecendo em 150 ms. É o *passo do veículo* do `animacao.md`, agora com o *agora*.)
   - (Com reduzir movimento, troca direta.)

## O que o pacote traria

- **As referências redesenhadas**, com o passo da vez:
  - a `00` (2 de 6: a *Ré acionada* com o quadrado);
  - a `04` e a `06`, conforme a decisão 5.
- **Um momento novo, pela lei 24, se você quiser mostrar o passo seguinte** (por exemplo, a `07-momento-passo-da-vez`, com 4 de 6 e o *Cartão do motorista* na vez). Telas de exemplo são bem-vindas.
- **Os documentos:**
  - `componentes.md`: sai *"A T14 fica fora"*, e a T14 entra na tabela do poço;
  - `animacao.md` da T14: a linha *passo do veículo*;
  - `textos.md` da T14: o texto de cada passo da vez;
  - `estados.md` e `tela.md`, se entrar momento novo;
  - o `indice.json`.
- **Nada muda** no mock, nos tokens, nas peças nem no ritmo (+9, +12, +15 e +18 s).

Construo igual às referências quando chegarem, rodo a régua (as referências, os roteiros `mov-t14` e `heroi`) e devolvo o gate com as telas lado a lado.
