# T06 · Selecionar ativo

Escolher o ônibus que está na frente do técnico e provar que é ele.

| | |
|---|---|
| **Elemento-assinatura** | o par chassi lido × chassi do cadastro — dois números que batem, ou não |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 · dez ônibus no pacote |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 5 — ver `estados.md` |

## O que se toca

- a instrução *Escolha o veículo que está na sua frente* sai com qualquer termo na busca
  - no protótipo (já era assim desde a otimização do design, e a última entrega confirmou): com um termo na busca, a instrução sai, e embaixo do campo fica o que a busca achou — a lista ou o vazio —, também na busca que acha sem esconder nada (o `busca.mjs` prova com o RKT-8H42 marcado e com nada marcado)
- a busca que esconde o ativo escolhido apaga o `Usar este ativo`, que volta quando ele reaparece · a escolha não se perde (a `09`; a decisão do diretor de 25/09)
  - no protótipo (a otimização do design, construída): a URL diz o `09` enquanto a busca acha outros ônibus e esconde o marcado, e a busca que o devolve o tira; aberto pelo endereço, o `09` vem com o RKT-8H42 marcado — o ônibus do módulo da sessão, como o `01` — e *PCX* digitado. O campo fica com o traço lima do campo focado enquanto a busca esconde o marcado, como a `09` desenha · **com um termo na busca, a instrução sai**: embaixo do campo fica o que a busca achou, a lista ou o vazio, como a `08` e a `09` desenham (nenhuma referência desenha a busca que acha sem esconder nada: ela segue as duas)
- a busca sem resultado diz *Nada com “ABC-1234”* e sugere buscar pela frota
- tocar num ônibus → confirmar o veículo
  - no protótipo · a nossa versão desta linha, antes desta entrega: tocar num ônibus → ele fica **marcado** (o quadrado lima no poço) e o `Usar este ativo` acende; o `Usar este ativo` → confirmar o veículo. Tocar em outro ônibus troca a marca (decisão do diretor, 24/09: a T06·1 passa pra (b), o T06-N3). A lista com um ônibus marcado não tem referência: monta-se com as peças que existem (G25)
- `Usar este ativo` → T07
  - no protótipo · a nossa versão desta linha, antes desta entrega: `Usar este ativo` → o ativo entra na sessão, com o vínculo anotado (o chassi lido ou a confirmação do técnico, às 14:30), e segue pra T07
- `Escolher outro` → a lista
  - no protótipo · a nossa versão desta linha, antes desta entrega: `Escolher outro` e `Escolher outro veículo` → a lista, com a busca como estava · `Voltar ao menu` → T04 · `ENCERRAR` → a sessão abortada (T16/03, G23)
    - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16
- a busca filtra por placa, frota ou módulo
  - no protótipo · a nossa versão desta linha, antes desta entrega: a busca filtra ao digitar por placa, frota, módulo esperado e chassi, sem caixa, sem acento e sem o hífen da placa; a placa de um ônibus de outro pacote abre a trava de fora do pacote; sem resultado, o cartão diz *Nada com “ABC-1234”* e sugere buscar pela frota — o momento `08` (a entrega do design de 25/09, que muda a T06·5)
    - no protótipo, o vazio declarado fica no lugar da instrução e da lista, e o `Usar este ativo` espera, como a `08` desenha; o ônibus marcado fica guardado e volta com a lista. A busca que acha outros ônibus e esconde o marcado faz o mesmo (decisão do diretor de 25/09, b): o `Usar este ativo` espera, apagado, e acende de novo quando a busca mostra o marcado outra vez (o roteiro `busca.mjs` prova). O campo acende o traço lima do campo focado no foco, e fica aceso enquanto a busca não acha nada, como a `08` desenha (a T06·5 dizia sem desenho de foco). A URL diz o `08` enquanto a busca não acha nada, e a busca que volta a achar o tira; aberto pelo endereço, o `08` vem com *ABC-1234* digitado. O `Escolher outro` de uma placa de outro pacote volta à lista com a busca como estava, e ela não acha nada no pacote: é o `08`, com a placa no título

- a lista são os ônibus do pacote da unidade do contexto, na ordem do mock — na Várzea, os 10 (G9); o conteúdo rola entre a faixa e o rodapé (G16)
- a confirmação checa nesta ordem: o pacote, os pinos e o chassi (T06·3). O ônibus que não é caso abre com o chassi lido igual ao do cadastro (T06·2)
- sem chassi na CAN: marcar a confirmação libera o `Usar este ativo`; a legenda fica onde está, porque nenhuma referência desenha o quadro marcado e tirá-la moveria o rodapé (G25)
- chassi divergente: `Solicitar correção de cadastro` → o cartão vira o registro, *Correção solicitada às 14:30*, e deixa de ser tocável — é o momento `07`, no mesmo lugar e do mesmo tamanho: o relógio de 14 no poço de 32 (o poço na linha: o cartão de 50 que age como linha leva o de 32 · a entrega do checklist; era o de 24) e, embaixo do feito, *o gestor recebe os dois chassis*; a hora é a do protótipo (`M.HORA_NOMINAL`), e o conteúdo novo esmaece em 150ms (`animacao.md`). O `07` é do caso `divergencia-chassi`, como o `02`: abre pelo endereço com o RDF-3R14, e no fluxo pela porta natural do `02` — o ônibus do caso no pacote da unidade (na Ibura, R-11). Enquanto a T06 está aberta, o pedido fica feito: escolher o mesmo ônibus de novo abre o `07`, e não o pedido outra vez. Pro leitor de tela, o registro é um aviso de status, não um botão
- conflito de pinos com saída: `Usar leitor sem fio` resolve no lugar — a sessão passa a sem fio e o mesmo ônibus segue pra confirmação (T06·4). O conflito vale quando o módulo da faixa, o ônibus e o meio da sessão são os do caso (G28)
- o voltar do sistema (no computador, o Esc) faz o mesmo que o link de saída do rodapé: na lista, na busca sem resultado (08), no chassi divergente e na correção pedida, o `Voltar ao menu`; na confirmação, o `Escolher outro`, que volta à lista. Nas travas sem link (04, 06), o `Escolher outro` do primário, a saída que elas têm (`06-prototipo/logica.md` · O voltar do Android)
- no protótipo, a folga antes do rodapé (a última entrega: a proposta do protótipo, que o arquiteto aceitou): a lista do pacote, o último grupo do miolo que rola, não tem mais a margem de 16 embaixo, que somava com o recheio do miolo 32 no fim da rolagem; ficam os 16 do recheio. Na rolagem 0 não muda nenhum pixel (as dez referências na base). Na confirmação, que não rola, o último bloco segue com os 16 dele: o par comparado cresce até ali, e tirar a margem moveria o desenho (medido: as seis confirmações iam de 0 a 2,2–3,5%). **Com as referências da otimizacao300000000** (MUDANCAS §4, T06/00, 02 e 07): a linha da correção de cadastro, embaixo do par que diverge (02, e o registro dela na 07), também não tem mais a margem, e o par comparado cresce os 16 até ela — contra o HTML novo, a 02 foi de 3,55% a 0%, e a 07, de 3,68% a 0,01% (o antes ainda com a barra de status velha, uns 0,18 pontos disso). Ficam com os 16 só os blocos que são os últimos e crescem até o rodapé, o par que bate (01) e a trava (04 a 06), como as referências ainda desenham

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- vazio declarado
- nota com rótulo
- o par comparado
- linha do histórico
- a lista de garagens
- encerrando
- pede o corte
- sem homologar
- com contador neutro
- com contador de falha
- checkbox
- checkbox marcado
- campo de busca
- justificativa
- linha de opção
- linha de ônibus
- escolhido com trava · T06
- cartão que pede ação
- lista com contagem
- item feito
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas 7 referências e construído no C8 (T06-A6, G1): as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- com legenda
- os glifos de estado
- os poços
- os marcadores
- vazio declarado
- nota com rótulo
- o par comparado
- com contador neutro
- checkbox
- checkbox marcado
- campo de busca
- linha de ônibus
- bloco escolhido
- escolhido com trava · T06

No acerto do design system pelo medido (G10), a lista ficou só com os nomes das linhas do `componentes.md`, e as anotações viraram variante nomeada da peça (G11), declarada lá: a faixa sem ativo, a linha de ônibus com o fim da lista e como escolha, o bloco escolhido justo e apagado, o par comparado com o veredito, a linha tocável de ação ('Solicitar correção de cadastro') — e ela registrada, o pedido feito, na `07` (`registrado`) — e o escolhido com trava neutro, o do conflito com saída. Entraram as de toque da folha 1 (o primário nos três estados, o link e a linha tocável), os poços e os marcadores da folha 3 e o checkbox marcado, que aparece ao marcar. Com a `07`, entrou o glifo da folha 3: o relógio no poço de 24 do registro. Saiu a lista em cartão, que não tem linha: é o recipiente de todas as linhas (`linhas/Lista.jsx`). Na coluna do `componentes.md`, a T06 saiu de 16 linhas que nenhuma das sete desenha (faixa · sem ação, processo correndo, linha do histórico, a lista de unidades, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo e campo focado, linha de opção, cartão que pede ação e lista com contagem) e entrou na faixa · sessão aberta e no bloco escolhido. Com a `08` (entrega de 25/09), entraram o vazio declarado, com o termo digitado no título, e a busca focada, o traço lima do campo focado (muda a T06·5). Com a entrega do checklist: o registro da correção (`07`) leva o poço de 32, pela lei do poço na linha (a linha tocável registrada), e a última linha de ônibus da lista tem 72, como as outras, só sem a divisória — saiu a variante do fim de 78 da linha de ônibus (C8).

## Histórias de usuário

- **HU-T06-1** — Busco por placa, frota ou identificador; vejo modelo do ativo e módulo esperado
- **HU-T06-2** — Quando o ativo trafega chassi pela CAN, o app lê e compara — divergência bloqueia
- **HU-T06-3** — Sem chassi na CAN, o vínculo é confirmação explícita minha, registrada na evidência
- **HU-T06-4** — Ativo fora do pacote trava, sem oferecer solicitar cadastro
- **HU-T06-5** — A matriz de ocupação de pinos roda aqui; conflito resolvível oferece reconectar sem fio no lugar
- **HU-T06-6** — Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva
- **HU-T06-7** — Cada linha do arnês é nomeada por cor e função

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
