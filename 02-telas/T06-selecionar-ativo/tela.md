# T06 · Selecionar ativo

Escolher o ônibus que está na frente do técnico e vincular o módulo a ele, na empresa.

| | |
|---|---|
| **Elemento-assinatura** | o escolhido em cima e os dados do modelo embaixo — placa, frota, fabricante e modelo, sem chassi |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | sessão M2C-0417 · dez ônibus no pacote |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 3 · 4 — ver `estados.md` |

## O que se toca

- a instrução *Escolha o veículo que está na sua frente* sai com qualquer termo na busca
  - no protótipo (já era assim desde a otimização do design, e a última entrega confirmou): com um termo na busca, a instrução sai, e embaixo do campo fica o que a busca achou — a lista ou o vazio —, também na busca que acha sem esconder nada (o `busca.mjs` prova com o RKT-8H42 marcado e com nada marcado)
- a busca que esconde o ativo escolhido apaga o `Usar este ativo`, que volta quando ele reaparece · a escolha não se perde
  - no protótipo (a `09`; a decisão do diretor de 25/09 · a otimização do design, construída): a URL diz o `09` enquanto a busca acha outros ônibus e esconde o marcado, e a busca que o devolve o tira; aberto pelo endereço, o `09` vem com o RKT-8H42 marcado — o ônibus do módulo da sessão, como o `01` — e *PCX* digitado. O campo fica com o traço lima do campo focado enquanto a busca esconde o marcado, como a `09` desenha · **com um termo na busca, a instrução sai**: embaixo do campo fica o que a busca achou, a lista ou o vazio, como a `08` e a `09` desenham (nenhuma referência desenha a busca que acha sem esconder nada: ela segue as duas)
- a busca sem resultado diz *Nada com “ABC-1234”* e sugere buscar pela frota
- a busca filtra por placa, frota ou módulo
  - no protótipo · a nossa versão desta linha, antes desta entrega: a busca filtra ao digitar por placa, frota, módulo esperado e chassi, sem caixa, sem acento e sem o hífen da placa; a placa de um ônibus de outro pacote abre a trava de fora do pacote; sem resultado, o cartão diz *Nada com “ABC-1234”* e sugere buscar pela frota — o momento `08` (a entrega do design de 25/09, que muda a T06·5) · com o pacote 1, o chassi segue no cadastro, e nenhuma tela o mostra (decisão 46): a busca que acha por ele não o mostra
    - no protótipo, o vazio declarado fica no lugar da instrução e da lista, e o `Usar este ativo` espera, como a `08` desenha; o ônibus marcado fica guardado e volta com a lista. A busca que acha outros ônibus e esconde o marcado faz o mesmo (decisão do diretor de 25/09, b): o `Usar este ativo` espera, apagado, e acende de novo quando a busca mostra o marcado outra vez (o roteiro `busca.mjs` prova). O campo acende o traço lima do campo focado no foco, e fica aceso enquanto a busca não acha nada, como a `08` desenha (a T06·5 dizia sem desenho de foco). A URL diz o `08` enquanto a busca não acha nada, e a busca que volta a achar o tira; aberto pelo endereço, o `08` vem com *ABC-1234* digitado. O `Escolher outro` de uma placa de outro pacote volta à lista com a busca como estava, e ela não acha nada no pacote: é o `08`, com a placa no título
- tocar num ônibus → confirmar o vínculo
  - no protótipo · a nossa versão desta linha, antes desta entrega: tocar num ônibus → ele fica **marcado** (o quadrado lima no poço) e o `Usar este ativo` acende; o `Usar este ativo` → confirmar o vínculo. Tocar em outro ônibus troca a marca (decisão do diretor, 24/09: a T06·1 passa pra (b), o T06-N3). A lista com um ônibus marcado não tem referência: monta-se com as peças que existem (G25) · **a R-14 do diretor vence a R-11 do pacote** (a resposta do arquiteto ao gate do pacote 1, 02/10): o estado de um ônibus que é caso aparece no `Usar este ativo`, não no toque da linha
  - no protótipo (o pacote 1, construído em 02/10): a confirmação é o escolhido justo, com a frota sem o modelo (*frota 1003*), e os dados do modelo embaixo — a peça nova da folha 4, `DadosDoModelo` (`app/src/ds/cartoes/`), com o espécime `f4-dados-do-modelo` em 0% contra a folha. O FABRICANTE e o MODELO vêm de `modelosAtivo`; o MODELO das referências, *OF-1621 · ônibus urbano*, é o código e o tipo, e o mock não tem um campo do tipo: ele sai do nome do modelo sem o código, com a primeira letra minúscula — *ônibus urbano*, *caminhão coletor*, *retroescavadeira* (`app/src/telas/T06/dados.js`, `dadosDoModelo`) · **desvio nomeado, pro arquiteto:** um campo `tipo` nos três modelos de ativo, que o gate confira, tiraria a derivação. A empresa da frase é a do mundo do protótipo, `M.empresa` (a Viação Atlântico Sul), a mesma do cartão da conta no menu
- `Vincular o módulo` → T09, a configuração
  - no protótipo · a nossa versão desta linha, sem o chassi: `Vincular o módulo` → o ativo entra na sessão, com o vínculo anotado às 14:30, e segue pra T09, no que vai ser gravado (`05`) — instalação nova, o padrão (D1)
- `Escolher outro` → a lista
  - no protótipo · a nossa versão desta linha, antes desta entrega: `Escolher outro` → a lista, com a busca como estava · `Voltar ao menu` → T04 · `ENCERRAR` → a sessão abortada (T16/03, G23)
    - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16
- o módulo em outro ativo: a tela avisa · `Desvincular e vincular aqui` desfaz o vínculo antigo, e o desvínculo fica registrado
  - no protótipo (D3): `Desvincular e vincular aqui` segue pra T09, no que vai ser gravado (`05`) — o módulo é novo neste ativo, e é instalação nova; o registro do desvínculo é um fato da sessão, sem tela própria
    - no protótipo (o pacote 1, construído): o caso `modulo-em-outro-ativo` não traz o ativo — só o módulo e onde ele está, o a-18, o QTM-5S79 do aviso —, e o ônibus do `10` é o do módulo da faixa no pacote, o RKT-8H42, como a referência desenha e como o `01` aberto pelo endereço (padrão, pro arquiteto: um `ativoId` no caso). O desvínculo fica no registro do vínculo, `etapas.ativo.desvinculo` = { o a-18, 14:30 }, com o `modo` da instalação nova; nenhuma tela o lê nesta versão (a T13 e a T15, intocáveis no pacote 1)
- o módulo que já é deste ativo: é manutenção · `Seguir pra manutenção` → T09, um bloco por vez
- o vínculo decide o modo: módulo novo neste ativo é instalação; módulo que já era dele é manutenção
  - no protótipo (D1; o gate do pacote 1, item 5): o modo não sai do cadastro — o a-01 do herói já traz o M2C-0417 como módulo previsto (`04-dados/mocks.js`), e por ele o herói seria manutenção. O padrão é a instalação nova; a manutenção vem só do caso `modulo-ja-deste-ativo`, e o `10` e o `11` abrem pela coluna do palco, montados pelo caso, nunca pelo serial no fluxo
    - no protótipo (o pacote 1, construído): o modo mora no registro do vínculo, `etapas.ativo.modo` — `instalacao` no `01` e no `10`, o `modo` do caso, `manutencao`, no `11` —, que zera com a sessão nas zeragens que já existem; a `logica.md` desenha o modo como linha própria do estado único (desvio nomeado, pro arquiteto). Sem pergunta ao técnico. O `10` e o `11` abrem pela coluna, parados e sem toque (`06-prototipo/palco.md`): o `Desvincular e vincular aqui` e o `Seguir pra manutenção` estão construídos, e nenhum roteiro os toca — a T09/08 abre pelo endereço do momento

- a lista são os ônibus do pacote da unidade do contexto, na ordem do mock — na Várzea, os 10 (G9); o conteúdo rola entre a faixa e o rodapé (G16)
- a confirmação checa nesta ordem: o pacote, os pinos e o vínculo (T06·3, com o vínculo no lugar do chassi, pela decisão 46). O ônibus que não é caso abre o vínculo novo, a `01`
- conflito de pinos: sempre a trava (06), sem saída no lugar — o conflito com saída saiu na rodada 2 do retorno do PM. O conflito vale quando o módulo da faixa e o ônibus são os do caso (G28)
- o voltar do sistema (no computador, o Esc) faz o mesmo que o link de saída do rodapé: na lista e na busca sem resultado (08), o `Voltar ao menu`; na confirmação e nos avisos do vínculo (10, 11), o `Escolher outro`, que volta à lista. Nas travas sem link (04, 06), o `Escolher outro` do primário, a saída que elas têm (`06-prototipo/logica.md` · O voltar do Android)
- no protótipo, a folga antes do rodapé (a proposta do protótipo, que o arquiteto aceitou): a lista do pacote, o último grupo do miolo que rola, não tem mais a margem de 16 embaixo, que somava com o recheio do miolo 32 no fim da rolagem; ficam os 16 do recheio. Na rolagem 0 não muda nenhum pixel (as dez referências de então, na base). Na confirmação, que não rola, o último bloco segue com os 16 dele e cresce até ali, como as referências desenham: os dados do modelo (01, 10 e 11) e a trava (04 a 06) — tirar a margem moveria o desenho

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- aviso
- vazio declarado
- os dados do modelo
- linha do histórico
- a lista de garagens
- com contador
- campo de busca
- linha de opção
- linha de ônibus
- escolhido com trava · T06
- lista com contagem
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas 7 referências e construído no C8 (T06-A6, G1), e medido de novo nas 9 do pacote 1 (02/10), antes de construir: as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- os glifos de estado
- os poços
- os marcadores
- aviso
- vazio declarado
- os dados do modelo
- com contador
- campo de busca
- linha de ônibus
- bloco escolhido
- escolhido com trava · T06

No acerto do design system pelo medido (G10), a lista ficou só com os nomes das linhas do `componentes.md`, e as anotações viraram variante nomeada da peça (G11), declarada lá: a faixa sem ativo, a linha de ônibus com o fim da lista e como escolha, o bloco escolhido justo e o escolhido com trava neutro, o do conflito com saída. Entraram as de toque da folha 1 (o primário nos três estados e o link), e os poços e os marcadores da folha 3. Saiu a lista em cartão, que não tem linha: é o recipiente de todas as linhas (`linhas/Lista.jsx`). Na coluna do `componentes.md`, a T06 saiu de 16 linhas que nenhuma das sete desenha (faixa · sem ação, processo correndo, linha do histórico, a lista de unidades, as duas da cadeia, as três do encerramento, com contador de falha, a marca no login, campo e campo focado, linha de opção, cartão que pede ação e lista com contagem) e entrou na faixa · sessão aberta e no bloco escolhido. Com a `08` (entrega de 25/09), entraram o vazio declarado, com o termo digitado no título, e a busca focada, o traço lima do campo focado (muda a T06·5). Com a entrega do checklist, a última linha de ônibus da lista tem 72, como as outras, só sem a divisória — saiu a variante do fim de 78 da linha de ônibus (C8). **Com o pacote 1 (decisão 46):** saíram, com o `02`, o `03` e o `07`, o par comparado, a nota com rótulo, a legenda, o checkbox e o checkbox marcado, a linha tocável da correção e o bloco escolhido apagado; entraram os dados do modelo (01, 10 e 11) e o aviso neutro, com o glifo de informação no poço de 26 (10 e 11); o com contador neutro passou a se chamar com contador, como no `componentes.md` do pacote. A lista do design desta entrega traz linhas que nenhuma das 9 desenha — faixa · sem ação, o topo do menu inteiro, com legenda, linha do histórico, a lista de garagens, linha de opção, lista com contagem, linha da fila e linha da re-checagem: a diferença vai pro arquiteto.

## Histórias de usuário

- **HU-T06-1** — Busco por placa, frota ou módulo; vejo o modelo do ativo
- **HU-T06-2** — Confirmo o vínculo vendo placa, frota, fabricante e modelo — sem chassi
- **HU-T06-3** — Se o módulo já está em outro ativo, o app avisa; vincular aqui desfaz o vínculo antigo e registra o desvínculo
- **HU-T06-4** — Se o módulo já é deste ativo, é manutenção: o vínculo decide o modo, e eu não preciso escolher
- **HU-T06-5** — Ativo fora do pacote trava, sem oferecer solicitar cadastro
- **HU-T06-6** — A matriz de ocupação de pinos roda aqui; conflito resolvível oferece o leitor sem fio no lugar
- **HU-T06-7** — Conflito sem saída é nomeado como incompatibilidade e escalonado — não há reordenação que resolva
- **HU-T06-8** — Cada linha do arnês é nomeada por cor e função

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## O conflito de pinos (retorno do PM, 06/10)

- **o conflito é sempre erro de projeto de instalação** (a 06): sem cabo, trocar o meio de conexão nunca resolve, e o técnico não escolhe o leitor · o estado com saída, *Usar leitor sem fio*, saiu
- **no protótipo · a rodada 2:** o caso de pinos é só o `conflito-pinos-sem-saida`, e o par da faixa decide (G28), sem olhar o meio da sessão · saíram a trava com saída, o `Usar leitor sem fio` e o caso `conflito-pinos-resolvivel`
