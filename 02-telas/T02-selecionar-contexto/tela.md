# T02 · Selecionar contexto

Dizer em que unidade o técnico está hoje — o pacote de dados que o app vai usar.

| | |
|---|---|
| **Elemento-assinatura** | a linha escolhida com o marcador lima e o pacote de cada unidade dizendo a idade dele |
| **Chrome** | sem faixa |
| **Semente no protótipo** | Viação Atlântico Sul · três unidades · Várzea com pacote de ontem |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 3 — ver `estados.md` |

## O que se toca

- só a empresa do herói anda: com as outras duas escolhidas, o `Ver as unidades` espera — o caso mostra a escolha
- `Trocar de empresa` volta pra lista com a empresa atual marcada · com módulo conectado, a folha *Trocar de empresa* confirma antes: *…é encerrada antes da troca, sem homologar*, `Encerrar a sessão e trocar`
- no caso `lista-longa-garagens`, o mundo das seis unidades vai até o menu, sem os ônibus: a fonte da idade e da hora é o pacote
  - no protótipo (a última entrega): a linha de cada unidade lê a idade, a hora e os ativos do pacote dela (`app/src/dados/garagens.js`), e os seis pacotes do caso declaram os modelos e os cartões, que a T03 lê. A folha de trocar de unidade do menu, com uma unidade que só o caso tem, lista as três do herói (a folha lê `uos`) — nenhuma referência desenha a folha da lista longa (pendência, pro arquiteto)
- com mais de uma empresa, a lista delas vem antes: *Pra qual empresa hoje?* · escolhida, o primário diz *Ver as unidades* · na lista das unidades, `Trocar de empresa` fica no rodapé e volta pra lista das empresas
- com uma empresa só, esse passo não existe: o nome dela aparece em cima das unidades
- a ordem, com mais de uma empresa: `05` escolher a empresa → `06` as unidades, com *Trocar de empresa* → `01` a escolhida · com uma empresa só: `00` → `01`
  - no protótipo (a otimização do design, construída): o `05` e o `06` são estados — abrem pela coluna do palco e pelo endereço (`?tela=T02&estado=05-estado-escolher-a-empresa` e `?tela=T02&estado=06-estado-unidades-com-trocar-empresa`), montados pelo caso `varias-empresas` (a receita deles, `app/src/estado/receitas.js`), parados e sem toque, como todo estado (`06-prototipo/palco.md`). Nada no mock dá ao herói, que tem uma empresa só, mais de uma no fluxo: o caminho `05` → `Ver as unidades` → `06` → a unidade escolhida → `Sincronizar` → T03, e o `Trocar de empresa` de volta ao `05`, não se anda por toque — se prova no node, nas funções que a tela usa (`app/src/telas/T02/empresas.js`; `node app/scripts/testar-empresa.mjs`), como o login sem conexão e o Bluetooth (`06-prototipo/logica.md` · O mundo real). O roteiro `empresa.mjs` confere no app os dois quadros parados, a URL de cada um, e o herói sem mudança: `00` → `01` → T03, sem nada da empresa
  - no protótipo (a última entrega, construída): o `07` é um momento — aberto pelo endereço (`?tela=T02&momento=07-momento-empresa-escolhida`), é o app vivo no mundo do caso `varias-empresas`, com a Viação Atlântico Sul marcada, como a referência. Dali o técnico anda por toque: `Ver as unidades` → as unidades da Viação com o `Trocar de empresa` (o quadro do `06`; a URL fica sem momento, porque o `06` é estado, e estado parado não anda) → a unidade escolhida (a URL diz o `01`: as unidades são as do herói, e o rodapé segue com o `Trocar de empresa`, padrão d) → `Sincronizar` → T03 → o menu. O mundo vai junto no estado único, com a unidade (`contexto.empresas`, a empresa atual): a folha de trocar de unidade do menu ganha o `Trocar de empresa` (o quadro da T04/14), que volta ao `07` com a atual marcada — sem sessão, direto; com ela, pelo diálogo e pelos 4 passos da T16. A T02 aberta no fluxo com o mundo no contexto abre nele: sem unidade (o `Trocar de empresa` do menu), no `07`; com a unidade (o `Voltar ao contexto` e o `Trocar de unidade` da T03), nas unidades da atual, sem nada escolhido. O `05` e o `06` seguem estados, parados. O roteiro `empresa.mjs` anda tudo isso e confere o herói sem mudança; as funções se provam no node (`testar-empresa.mjs`)
  - no protótipo (a última entrega): a `07` desenha o nome da empresa escolhida em `--tinta-forte`, como o das outras duas; a peça — a escolha numa lista, da folha 3, e a `01` — sobe o nome da escolhida pra `--tinta`. O protótipo segue a peça: 0,17% contra o HTML, só o nome da Viação (desvio nomeado, pro arquiteto: a `07` sobe o nome, ou a peça ganha a variante sem subir)
  - o `05`: *3 EMPRESAS*, a contagem das empresas do caso, em cima do título · cada linha, o nome da empresa e *N unidades*, a contagem que o caso declara · a linha é a escolha numa lista, sem o valor à direita (a peça ganhou a variante) · o primário apagado e desabilitado, *Escolha uma empresa*, até escolher; escolhida, *Ver as unidades* · rodapé de uma ação
  - o `06`: as unidades da Viação Atlântico Sul, a empresa do herói, que são as do mundo dele — o gate confere que a contagem do caso é a de `M.uos` —, com o nome dela em cima e o `Trocar de empresa` no rodapé de duas ações (o toque da decisão 38)
  - os padrões, onde o design não diz (vão ao arquiteto): (a) o mock só traz as unidades da Viação; a Transportes Capibaribe e a Expresso Caruaruense trazem só a contagem — as três linhas ficam como a referência desenha e se escolhem, e, escolhida uma das duas, o primário espera: *Ver as unidades*, desabilitado de verdade e em tinta apagada, sem fazer nada, como na busca que esconde a escolha, porque não há o que mostrar sem inventar dado — **confirmado pelo arquiteto em 26/09**: só a do herói anda · (b) o `Trocar de empresa` volta ao `07`, com a atual marcada — **mudou na última entrega** (a resposta do arquiteto de 26/09; antes, voltava ao `05` sem nada escolhido) · (c) o voltar, logo abaixo — confirmado · (d) com a unidade escolhida no `06`, o rodapé segue com o `Trocar de empresa` e o primário diz *Sincronizar* e o nome dela, como o `01` — nenhuma referência desenha a escolhida de quem tem mais de uma empresa, e o estado muda o conteúdo, nunca o desenho
- a busca que esconde a escolha feita apaga o primário, que volta quando ela reaparece · a escolha não se perde (a `04`; a decisão do diretor de 25/09)
  - no protótipo (a otimização do design, construída): a URL diz o `04` enquanto a busca acha outras unidades e esconde a escolhida, e a busca que a devolve o tira; aberto pelo endereço, o `04` vem no mundo do caso `lista-longa-garagens`, com a Várzea escolhida — a unidade do contexto do mock, como o `01` — e *Olin* digitado. O campo fica com o traço lima do campo focado enquanto a busca esconde a escolha, como a `04` desenha (o mesmo do `03`)

- a busca sem resultado diz *Nada com “Recreio”* e sugere buscar pela cidade — o termo digitado aparece no título
- tocar numa unidade → ela fica escolhida
- `Sincronizar Unidade X` → T03
- com **mais de 6 unidades**, o campo de busca aparece em cima e filtra por nome ou cidade · a lista rola por baixo do rodapé, que fica parado
- a linha de unidade diz a idade do pacote — *pacote de hoje*, *de ontem*, *de 4 dias* —, e vencida diz só a causa: *pacote vencido há 8 dias* · a ação de sincronizar mora na T03
- o voltar do sistema (no computador, o Esc) não faz nada: a tela não tem saída desenhada, e o `Sincronizar` é o ato, não a saída (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-produto-real/pendencias.md`)
  - no protótipo (a otimização do design): nas unidades de quem tem mais de uma empresa (`06`), o voltar faz o `Trocar de empresa`, a saída desenhada do rodapé; nas empresas (`05`), nada, como no `00` — a tela não tem saída desenhada (padrão c, vai ao arquiteto). Provado no node (`testar-empresa.mjs`): aberto pela coluna ou pelo endereço, o estado fica parado, e o voltar não escuta
  - no protótipo (a última entrega): o arquiteto confirmou o padrão c em 26/09. No `07`, vivo, o voltar não faz nada, como no `05`; nas unidades do mundo vivo, faz o `Trocar de empresa` → o `07`, com a atual marcada. Com o diálogo de outro usuário por cima (a T01/18), o `Entendi`, que só fecha e é a única saída, como o aviso do acesso (T04/12). O roteiro `empresa.mjs` e o `outro-usuario.mjs` provam no app

No protótipo (entrega do design de 24/09): o 6 é o `limiteSemBusca` do caso `lista-longa-garagens`, e a busca aparece em qualquer mundo com mais unidades que ele — o do herói, com 3, não a tem; o estado 02 é o mundo do caso, com 9. A busca olha o nome da unidade e o campo `cidade` do caso, sem acento e sem caixa; o nome da região saiu da busca (muda o T02·7). A frase da idade sai de `idadeNaLinhaDaGaragem`, em `app/src/dados/formato.js` (muda o T02·6); cada unidade lê o limiar do próprio pacote — a que só o caso tem, o do pacote que o caso declara pra ela (a otimização do design).

No protótipo (entrega do design de 25/09, que resolve o vazio sem frase do T02·7): a busca que não acha nenhuma unidade mostra o vazio declarado no lugar da lista, com o termo digitado no título, e o campo com o traço lima do campo focado: ele acende no foco, como o campo focado, e fica aceso enquanto a busca não acha nada, como a `03` desenha. A URL diz o `03` enquanto a busca não acha nada; a busca que volta a achar o tira. O `03` abre pelo endereço no mundo do caso `lista-longa-garagens`, com *Recreio* digitado, e a tela fica nesse mundo enquanto está aberta: a escolha ali não vai pra URL, porque o `01` é o quadro do mundo do herói. A escolha que a busca sem resultado esconde fica guardada e volta com a lista; enquanto nada aparece, o primário espera, como a `03` desenha. A busca que acha outras unidades e esconde a escolhida faz o mesmo (decisão do diretor de 25/09, b): o primário volta a *Escolha uma unidade*, apagado, e acende de novo, com o nome dela, quando a busca a mostra outra vez — a escolha volta marcada (o roteiro `busca.mjs` prova). No mundo do caso, aberto pelo `03` ou pelo `04`, toda unidade sincroniza (a otimização do design, construída): as três que o mundo do herói também tem (Várzea, Ibura e Pátio Caruaru) com o pacote delas em `pacotes`, e as outras seis com o pacote que o caso declara pra elas (pac-uo-11 a pac-uo-16). A linha de cada uma diz a idade e a hora do pacote dela e os ativos que ele traz — a Garagem Olinda, *pacote de hoje, 06:15* e *12 ativos* (pac-uo-12) —, e o `Sincronizar` leva à T03, que baixa esse pacote (`app/src/dados/garagens.js`).
- no protótipo (a última entrega): o diálogo *Outra sessão neste aparelho* da T01/18 mora nesta tela — o Entrar com outro usuário depois de uma sessão neste aparelho abre as unidades com ele por cima, e ele nasce aberto, com a tela, sem movimento de entrada; o `Entendi` fecha, e o véu e a caixa esmaecem em 150ms. A barra do sistema fica na cor da página, e o véu começa embaixo dela, com o ar de 24 em volta da caixa, como a 18 desenha; o que fica atrás do véu é inerte (G25). Pela coluna, a T01 monta esta tela com o caso `outro-usuario` (`02-telas/T01-login/tela.md`)

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
