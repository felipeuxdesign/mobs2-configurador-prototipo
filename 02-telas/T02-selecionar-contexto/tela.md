# T02 · Selecionar contexto

**Regra vigente do palco · 07/10/2026:** o painel e `?tela=T02` abrem as três empresas do técnico, como o Entrar. Os exemplos de uma empresa só ficam em **Estados desta tela**, como *Uma empresa · unidades* (`00`) e *Uma empresa · unidade escolhida* (`01`), parados e sem toque. O link antigo do momento `01` também abre parado. A fotografia com `print=1` preserva a referência. Esta regra substitui as notas anteriores que descreviam a semente de uma empresa como percurso navegável; os tipos e as contagens permanecem iguais.

Dizer em que unidade o técnico está hoje — o pacote de dados que o app vai usar.

| | |
|---|---|
| **Elemento-assinatura** | a linha escolhida com o marcador lima e o pacote de cada unidade dizendo a idade dele |
| **Chrome** | sem faixa |
| **Semente no protótipo** | três empresas — a do herói é a Viação Atlântico Sul, com três unidades · Várzea com pacote de ontem |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 5 · 4 — ver `estados.md` |

Histórico, anterior à regra vigente do palco (a otimização 400): a semente da T02 — o pulo do palco e o endereço da tela, `?tela=T02` — é a `00`, o mundo de uma empresa só, o caso `uma-empresa`, já confirmada: as unidades da Viação, com o nome dela em cima e sem o `Trocar de empresa` (`app/src/estado/sementes.js`). A linha de cima diz as três empresas do herói, mas a `00` é do caso `uma-empresa` (`estados.md`), e o endereço dela é o da tela, que a régua fotografa. O herói chega às três empresas dele (o `05`) pelo `Entrar` da T01. Desvio nomeado, pro arquiteto: a semente ser o herói (o `05`), com a `00` fotografada por um endereço do mundo `uma-empresa`, ou a linha dizer a `00`

## O que se toca

- só a empresa do herói anda: com as outras duas escolhidas, o `Ver as unidades` espera — o protótipo mostra a escolha, mas só a Viação Atlântico Sul tem o mundo do herói
- `Trocar de empresa` volta pra lista com a empresa atual marcada · com módulo conectado, a folha *Trocar de empresa* confirma antes: *…é encerrada antes da troca, sem homologar*, `Encerrar a sessão e trocar`
- no caso `lista-longa-garagens`, de uma empresa só, o mundo das seis unidades vai até o menu, sem os ônibus: a fonte da idade e da hora é o pacote
- **a empresa vem sempre antes da unidade**, pra todo técnico: *Pra qual empresa hoje?* · escolhida, o primário diz *Ver as unidades* · na lista das unidades, `Trocar de empresa` fica no rodapé — quando há mais de uma — e volta pra lista das empresas
- com uma empresa só, a lista aparece com ela **já marcada** e o `Ver as unidades` aceso — o técnico só confirma · nas unidades, o nome dela fica em cima, e não há `Trocar de empresa`
- a ordem, com várias empresas — o herói: `05` as empresas → `07` a escolhida → `06` as unidades, com *Trocar de empresa* → `09` a unidade escolhida → T03 · com uma empresa só: `08` a empresa já marcada → `00` as unidades → `01` a escolhida → T03
  - no protótipo (a última entrega): a linha de cada unidade lê a idade, a hora e os ativos do pacote dela (`app/src/dados/garagens.js`), e os seis pacotes do caso declaram os modelos e os cartões, que a T03 lê. A folha de trocar de unidade do menu, com uma unidade que só o caso tem, lista as três do herói (a folha lê `uos`) — nenhuma referência desenha a folha da lista longa (pendência, pro arquiteto). O mundo da lista longa vai junto no estado único, com a unidade (`contexto.empresas`, a otimização 400): a folha fica sem o `Trocar de empresa`, porque a lista longa é de uma empresa só, e o `Voltar ao contexto` da T03 volta às nove unidades
  - no protótipo (a otimização do design, construída; o mundo do herói desde a otimização 400): o `05` e o `06` são estados — abrem pela coluna do palco e pelo endereço (`?tela=T02&estado=05-estado-escolher-a-empresa` e `?tela=T02&estado=06-estado-unidades-com-trocar-empresa`), montados pelo mundo do herói, `M.empresas` (a receita deles, `app/src/estado/receitas.js`), parados e sem toque, como todo estado (`06-prototipo/palco.md`). O `08` também, montado pelo caso `uma-empresa`: a Viação marcada, *1 EMPRESA* e o `Ver as unidades` aceso. No fluxo, os quadros do `05` e do `06` se andam por toque, e a URL deles fica sem momento, porque estado parado não anda — o endereço copiado neles reabre a `00`, de uma empresa só (desvio nomeado, pro arquiteto: `06-prototipo/palco.md` · O link publicado)
  - histórico (a otimização 400, construída; os acessos de uma empresa foram substituídos pela regra vigente do palco): **o Entrar da T01 leva o herói ao `05`** — as três empresas dele, nada escolhido, e o primário apagado —, e dali ele anda por toque: a Viação → o `07` (a URL diz o `07`) → `Ver as unidades` → as unidades da Viação com o `Trocar de empresa` (o quadro do `06`, sem momento na URL) → a unidade escolhida → o `09` (a URL diz o `09`; antes, dizia o `01`, que agora é de uma empresa só) → `Sincronizar` → T03 → o menu. O `07` e o `09` abertos pelo endereço são o app vivo no mundo do herói — o `07` com a Viação marcada, o `09` com a unidade do contexto do mock escolhida, a Várzea. O mundo vai junto no estado único, com a unidade (`contexto.empresas`, `{ caso, atual }`, gravado no `Sincronizar`; antes dele, o `Ver as unidades` e o `Trocar de empresa` gravam o quadro ali também — o `Ver as unidades` com o passo, `{ caso, atual, passo }` —, e o `Voltar ao fluxo` do palco devolve as unidades da Viação, ou o `07`, no mesmo mundo, do `Entrar`, do menu e do `07` aberto pelo endereço; a escolha tocada dentro do quadro não vai, e volta a do endereço, a Viação e a Várzea, a pergunta ao diretor): a folha de trocar de unidade do menu tem o `Trocar de empresa` (o quadro da T04/14), que volta ao `07` com a atual marcada — sem sessão, direto; com ela, pelo diálogo e pelos 4 passos da T16. A T02 aberta no fluxo com o mundo no contexto abre nele: sem unidade (o `Trocar de empresa` do menu), no `07`; com a unidade (o `Voltar ao contexto` e o `Trocar de unidade` da T03), nas unidades da atual, sem nada escolhido; sem o mundo (o Entrar), no `05`. **De uma empresa só (o caso `uma-empresa`):** a tela aberta pelo endereço (`?tela=T02`), ou pelo pulo do palco, é a `00` — as unidades, com o nome dela em cima e sem o `Trocar de empresa`, o app vivo, a semente da T02 (`app/src/estado/sementes.js`) —, e o `01` pelo endereço também é desse mundo, com a Várzea escolhida; dali, `Sincronizar` → T03 → o menu, com a folha sem o `Trocar de empresa` (o quadro da T04/07). O `08`, a entrada desse mundo, só abre parado, pela coluna e pelo endereço: nada no mock leva o técnico de uma empresa só ao fluxo, porque o Entrar é o do herói — o `Ver as unidades` do `08` → a `00` se prova no node. As funções em `app/src/telas/T02/empresas.js`, provadas em `node app/scripts/testar-empresa.mjs`; o roteiro `empresa.mjs` anda os dois caminhos, com a URL de cada quadro
  - no protótipo (a última entrega): a `07` desenha o nome da empresa escolhida em `--tinta-forte`, como o das outras duas; a peça — a escolha numa lista, da folha 3, e a `01` — sobe o nome da escolhida pra `--tinta`. O protótipo segue a peça: 0,17% contra o HTML, só o nome da Viação (desvio nomeado, pro arquiteto: a `07` sobe o nome, ou a peça ganha a variante sem subir) · a `08`, da otimização 400, desenha igual — a Viação já marcada em `--tinta-forte` —, e dá os mesmos 0,17%, pelo mesmo nome (o mesmo desvio)
  - o `05`: *3 EMPRESAS*, a contagem das empresas do herói (`M.empresas`), em cima do título · cada linha, o nome da empresa e *N unidades*, a contagem que o mock declara · a linha é a escolha numa lista, sem o valor à direita (a peça ganhou a variante) · o primário apagado e desabilitado, *Escolha uma empresa*, até escolher; escolhida, *Ver as unidades* · rodapé de uma ação · o `08`: o mesmo quadro com a única empresa do caso `uma-empresa`, *1 EMPRESA* no singular, a linha já escolhida e o `Ver as unidades` aceso
  - o `06`: as unidades da Viação Atlântico Sul, a empresa do herói, que são as do mundo dele — o gate confere que a contagem dela em `M.empresas` é a de `M.uos` —, com o nome dela em cima e o `Trocar de empresa` no rodapé de duas ações (o toque da decisão 38) · o `09`: o mesmo quadro com a unidade escolhida, o primário dizendo *Sincronizar* e o nome dela, e o `Trocar de empresa` ainda no rodapé
  - os padrões, onde o design não diz (vão ao arquiteto): (a) o mock só traz as unidades da Viação; a Transportes Capibaribe e a Expresso Caruaruense trazem só a contagem — as três linhas ficam como a referência desenha e se escolhem, e, escolhida uma das duas, o primário espera: *Ver as unidades*, desabilitado de verdade e em tinta apagada, sem fazer nada, como na busca que esconde a escolha, porque não há o que mostrar sem inventar dado — **confirmado pelo arquiteto em 26/09**: só a do herói anda · (b) o `Trocar de empresa` volta ao `07`, com a atual marcada — **mudou na última entrega** (a resposta do arquiteto de 26/09; antes, voltava ao `05` sem nada escolhido) · (c) o voltar, logo abaixo — confirmado · (d) com a unidade escolhida no `06`, o rodapé segue com o `Trocar de empresa` e o primário diz *Sincronizar* e o nome dela — **virou referência na otimização 400**: a `09` desenha esse quadro, e o protótipo o faz a 0% do HTML
- a busca que esconde a escolha feita apaga o primário, que volta quando ela reaparece · a escolha não se perde (a `04`; a decisão do diretor de 25/09)
  - no protótipo (a otimização do design, construída): a URL diz o `04` enquanto a busca acha outras unidades e esconde a escolhida, e a busca que a devolve o tira; aberto pelo endereço, o `04` vem no mundo do caso `lista-longa-garagens`, com a Várzea escolhida — a unidade do contexto do mock, como o `01` — e *Olin* digitado. O campo fica com o traço lima do campo focado enquanto a busca esconde a escolha, como a `04` desenha (o mesmo do `03`)

- a busca sem resultado diz *Nada com “Recreio”* e sugere buscar pela cidade — o termo digitado aparece no título
- tocar numa unidade → ela fica escolhida
- `Sincronizar Unidade X` → T03
- com **mais de 6 unidades**, o campo de busca aparece em cima e filtra por nome ou cidade · a lista rola por baixo do rodapé, que fica parado
- a linha de unidade diz a idade do pacote — *pacote de hoje*, *de ontem*, *de 4 dias* —, e vencida diz só a causa: *pacote vencido há 8 dias* · a ação de sincronizar mora na T03
- o voltar do sistema (no computador, o Esc) não faz nada: a tela não tem saída desenhada, e o `Sincronizar` é o ato, não a saída (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-para-o-dev/o-que-o-produto-ainda-decide.md`)
  - no protótipo (a otimização do design): nas unidades de quem tem mais de uma empresa (o quadro do `06`, e o `09`), o voltar faz o `Trocar de empresa`, a saída desenhada do rodapé; nas empresas (`05`, `07`, `08`), nada, como no `00` e no `01`, de uma empresa só — a tela não tem saída desenhada (padrão c). Provado no node (`testar-empresa.mjs`): aberto pela coluna ou pelo endereço, o estado fica parado, e o voltar não escuta
  - no protótipo (a última entrega): o arquiteto confirmou o padrão c em 26/09. No `05` e no `07`, vivos, o voltar não faz nada; nas unidades do herói, faz o `Trocar de empresa` → o `07`, com a atual marcada. Com o diálogo de outro usuário por cima (a T01/18), o `Entendi`, que só fecha e é a única saída, como o aviso do acesso (T04/12). O roteiro `empresa.mjs`, o `voltar.mjs` e o `outro-usuario.mjs` provam no app

No protótipo (entrega do design de 24/09): o 6 é o `limiteSemBusca` do caso `lista-longa-garagens`, e a busca aparece em qualquer mundo com mais unidades que ele — o do herói, com 3, não a tem; o estado 02 é o mundo do caso, com 9. A busca olha o nome da unidade e o campo `cidade` do caso, sem acento e sem caixa; o nome da região saiu da busca (muda o T02·7). A frase da idade sai de `idadeNaLinhaDaGaragem`, em `app/src/dados/formato.js` (muda o T02·6); cada unidade lê o limiar do próprio pacote — a que só o caso tem, o do pacote que o caso declara pra ela (a otimização do design).

No protótipo (entrega do design de 25/09, que resolve o vazio sem frase do T02·7): a busca que não acha nenhuma unidade mostra o vazio declarado no lugar da lista, com o termo digitado no título, e o campo com o traço lima do campo focado: ele acende no foco, como o campo focado, e fica aceso enquanto a busca não acha nada, como a `03` desenha. A URL diz o `03` enquanto a busca não acha nada; a busca que volta a achar o tira. O `03` abre pelo endereço no mundo do caso `lista-longa-garagens`, com *Recreio* digitado, e a tela fica nesse mundo enquanto está aberta: a escolha ali não vai pra URL, porque o `01` é o quadro de outro mundo (o do herói até a otimização 400; agora, o de uma empresa só). A escolha que a busca sem resultado esconde fica guardada e volta com a lista; enquanto nada aparece, o primário espera, como a `03` desenha. A busca que acha outras unidades e esconde a escolhida faz o mesmo (decisão do diretor de 25/09, b): o primário volta a *Escolha uma unidade*, apagado, e acende de novo, com o nome dela, quando a busca a mostra outra vez — a escolha volta marcada (o roteiro `busca.mjs` prova). No mundo do caso, aberto pelo `03` ou pelo `04`, toda unidade sincroniza (a otimização do design, construída): as três que o mundo do herói também tem (Várzea, Ibura e Pátio Caruaru) com o pacote delas em `pacotes`, e as outras seis com o pacote que o caso declara pra elas (pac-uo-11 a pac-uo-16). A linha de cada uma diz a idade e a hora do pacote dela e os ativos que ele traz — a Garagem Olinda, *pacote de hoje, 06:15* e *12 ativos* (pac-uo-12) —, e o `Sincronizar` leva à T03, que baixa esse pacote (`app/src/dados/garagens.js`).
- no protótipo (a última entrega): o diálogo *Outra sessão neste aparelho* da T01/18 mora nesta tela — o Entrar com outro usuário depois de uma sessão neste aparelho abre a entrada da T02 com ele por cima — com a empresa antes da unidade (a otimização 400), as empresas do herói, o quadro do `05`: a 18 desenha as unidades, sem o `Trocar de empresa`, e é o que a coluna mostra (desvio nomeado, pro arquiteto: a 18 com as empresas atrás, ou o diálogo nas unidades) —, e ele nasce aberto, com a tela, sem movimento de entrada; o `Entendi` fecha, e o véu e a caixa esmaecem em 150ms. A barra do sistema fica na cor da página, e o véu começa embaixo dela, com o ar de 24 em volta da caixa, como a 18 desenha; o que fica atrás do véu é inerte (G25). Pela coluna, a T01 monta esta tela com o caso `outro-usuario` (`02-telas/T01-login/tela.md`)

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema sem sessão
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- escolha numa lista
- vazio declarado
- linha do histórico
- a lista de garagens
- campo de busca
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- linha tocável · normal e pressionada
- link · normal e pressionado
- barra do sistema sem sessão
- uma ação
- duas ações
- escolha numa lista
- os glifos de estado
- os poços
- os marcadores
- vazio declarado
- campo de busca

Corrigida no C4 pelo medido (G10, T02-A3): saíram as 6 peças que nenhuma das três desenha (linha do histórico, a lista de unidades, segmentado, a marca no login, campo e campo focado) e entraram as que a tela usa e faltavam: o primário nos três estados, a linha tocável, os glifos, os poços e os marcadores. A lista das unidades daqui é a escolha numa lista, não a lista de unidades da folha (T02-A4). O que só a T02 desenha virou variante nomeada (G11): a linha de escolha escolhível, em que a unidade vencida também se escolhe, e a busca com a dica em texto. Com a `03` (entrega de 25/09), entraram o vazio declarado, com o termo digitado no título, e a busca focada, o traço lima do campo focado. Com o `05` e o `06` (a otimização do design), entraram as duas ações, com o link *Trocar de empresa* no rodapé das unidades de quem tem mais de uma empresa, e o link; a linha da empresa é a escolha numa lista, na variante sem o valor à direita.

## Histórias de usuário

- **HU-T02-1** — Vejo empresas/UC/UO que tenho permissão, com busca quando a lista for longa
- **HU-T02-2** — Troco de contexto a qualquer momento pelo cabeçalho; o contexto ativo fica sempre visível
- **HU-T02-3** — Trocar com módulo conectado avisa que a sessão de configuração encerra, e pede confirmação
- **HU-T02-4** — Trocar com envio em andamento é bloqueado até concluir ou abortar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
