# Pedido ao arquiteto · a T05/00 sem caminho no fluxo, e onde mora o "Conectando…"

## 1 · A 00 não se alcança tocando

O `estados.md` diz que a `00` é "a entrada da tela", e ela é a referência da tela no `tela.md`. Mas, desde a decisão do diretor de 24/09 (escolher numa lista marca, quem avança é o botão), o fluxo é outro:
1. o menu abre a `01`, a lista sem nada escolhido;
2. tocar num módulo só marca o quadrado lima, e continua na lista;
3. o `Conectar ao …` leva ao *Conectando…* (`06`) e daí à T07, ou ao *NÃO RESPONDEU* (`04`).

O quadro da `00` parado, com o `Conectar ao M2C-0417` aceso, só abre pelo painel do palco ou pelo link. O desenho dela continua vivo: é a base da `06` e da `04` (o bloco *ESCOLHIDO* e os outros por perto). Um dev que leia "a entrada da tela" vai construir uma entrada que o fluxo não tem.

### As decisões (o padrão que eu adotaria entre parênteses)

1. **Qual é a referência da tela.** (A `01`, a lista, vira a entrada da T05. A `00` fica registrada como o desenho base do *Conectando…* e da falha, sem ser uma parada do fluxo.)
2. **A alternativa:** a `00` ganha um caso real, por exemplo o módulo já conectado antes nesse ônibus vir escolhido. Isso é regra de produto, do PM.

## 2 · Onde mora o "Conectando…"

O diretor achou estranho um quadro que, no protótipo, dura 1,2 s. Os fatos:
- a `06` não é uma tela nova: é o texto do primário que troca no mesmo quadro (*Conectando ao M2C-0417…*);
- no produto, ela dura o tempo real da conexão Bluetooth, em geral de 1 a 3 s, e mais quando o módulo não responde (aí entra o tempo-limite antes do *NÃO RESPONDEU*);
- os requisitos (§9.8, A8) pedem que a falha de conexão mostre a causa (cabo, alimentação, cadastro). Isso mora na T05, na `04`.

### As opções

- **(a) Fica na T05, como está.** O toque dá retorno na hora, no mesmo lugar, e a falha aparece no mesmo quadro, com a causa. O dev só troca os 1,2 s pelo tempo real.
- **(b) Vai pra T07.** O toque leva direto ao diagnóstico, que abre dizendo *Conectando ao M2C-0417…* até as sete linhas começarem. Some um quadro da T05, mas a falha precisa voltar à T05/04 ou ganhar desenho na T07, e a T07 passa a nascer antes de existir sessão.

(O meu padrão é a (a): a falha e a causa ficam onde o técnico está. Confira com o que o PM pediu nas últimas rodadas: se ele pediu o retorno no próprio botão, ou uma tela de conexão.)

### Junto, uma decisão de produto

**O tempo-limite da conexão:** quanto o app espera o módulo antes de mostrar o *NÃO RESPONDEU*. Ele vai pro `08-para-o-dev/o-que-o-produto-ainda-decide.md`, ao lado do tempo-limite do `Entrar`.

## O que o pacote traria

- **Pela decisão 1:** o `estados.md` e o `tela.md` da T05 com a entrada certa, e a referência da tela trocada, se for o caso.
- **Pela decisão 2:** nada na (a). Na (b), o quadro da T07 conectando e o caminho da falha.
- **Nada muda** no mock, nos tokens nem nas peças.
