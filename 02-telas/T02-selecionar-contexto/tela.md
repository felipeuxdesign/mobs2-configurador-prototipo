# T02 · Selecionar contexto

Dizer em que unidade o técnico está hoje — o pacote de dados que o app vai usar.

| | |
|---|---|
| **Elemento-assinatura** | a linha escolhida com o marcador lima e o pacote de cada unidade dizendo a idade dele |
| **Chrome** | sem faixa |
| **Semente no protótipo** | Viação Atlântico Sul · três unidades · Várzea com pacote de ontem |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 3 · 3 — ver `estados.md` |

## O que se toca

- com mais de uma empresa, a lista delas vem antes: *Pra qual empresa hoje?* · escolhida, o primário diz *Ver as unidades* · na lista das unidades, `Trocar de empresa` fica no rodapé e volta pra lista das empresas
- com uma empresa só, esse passo não existe: o nome dela aparece em cima das unidades
- a ordem, com mais de uma empresa: `05` escolher a empresa → `06` as unidades, com *Trocar de empresa* → `01` a escolhida · com uma empresa só: `00` → `01`
  - no protótipo (a otimização do design, construída): o `05` e o `06` são estados — abrem pela coluna do palco e pelo endereço (`?tela=T02&estado=05-estado-escolher-a-empresa` e `?tela=T02&estado=06-estado-unidades-com-trocar-empresa`), montados pelo caso `varias-empresas` (a receita deles, `app/src/estado/receitas.js`), parados e sem toque, como todo estado (`06-prototipo/palco.md`). Nada no mock dá ao herói, que tem uma empresa só, mais de uma no fluxo: o caminho `05` → `Ver as unidades` → `06` → a unidade escolhida → `Sincronizar` → T03, e o `Trocar de empresa` de volta ao `05`, não se anda por toque — se prova no node, nas funções que a tela usa (`app/src/telas/T02/empresas.js`; `node app/scripts/testar-empresa.mjs`), como o login sem conexão e o Bluetooth (`06-prototipo/logica.md` · O mundo real). O roteiro `empresa.mjs` confere no app os dois quadros parados, a URL de cada um, e o herói sem mudança: `00` → `01` → T03, sem nada da empresa
  - o `05`: *3 EMPRESAS*, a contagem das empresas do caso, em cima do título · cada linha, o nome da empresa e *N unidades*, a contagem que o caso declara · a linha é a escolha numa lista, sem o valor à direita (a peça ganhou a variante) · o primário apagado e desabilitado, *Escolha uma empresa*, até escolher; escolhida, *Ver as unidades* · rodapé de uma ação
  - o `06`: as unidades da Viação Atlântico Sul, a empresa do herói, que são as do mundo dele — o gate confere que a contagem do caso é a de `M.uos` —, com o nome dela em cima e o `Trocar de empresa` no rodapé de duas ações (o toque da decisão 38)
  - os padrões, onde o design não diz (vão ao arquiteto): (a) o mock só traz as unidades da Viação; a Transportes Capibaribe e a Expresso Caruaruense trazem só a contagem — as três linhas ficam como a referência desenha e se escolhem, e, escolhida uma das duas, o primário espera: *Ver as unidades*, desabilitado de verdade e em tinta apagada, sem fazer nada, como na busca que esconde a escolha, porque não há o que mostrar sem inventar dado · (b) o `Trocar de empresa` volta ao `05` sem nada escolhido, como a referência desenha · (c) o voltar, logo abaixo · (d) com a unidade escolhida no `06`, o rodapé segue com o `Trocar de empresa` e o primário diz *Sincronizar* e o nome dela, como o `01` — nenhuma referência desenha a escolhida de quem tem mais de uma empresa, e o estado muda o conteúdo, nunca o desenho
- a busca que esconde a escolha feita apaga o primário, que volta quando ela reaparece · a escolha não se perde (a `04`; a decisão do diretor de 25/09)
  - no protótipo (a otimização do design, construída): a URL diz o `04` enquanto a busca acha outras garagens e esconde a escolhida, e a busca que a devolve o tira; aberto pelo endereço, o `04` vem no mundo do caso `lista-longa-garagens`, com a Várzea escolhida — a garagem do contexto do mock, como o `01` — e *Olin* digitado. O campo fica com o traço lima do campo focado enquanto a busca esconde a escolha, como a `04` desenha (o mesmo do `03`)

- a busca sem resultado diz *Nada com “Recreio”* e sugere buscar pela cidade — o termo digitado aparece no título
- tocar numa unidade → ela fica escolhida
- `Sincronizar Unidade X` → T03
- com **mais de 6 unidades**, o campo de busca aparece em cima e filtra por nome ou cidade · a lista rola por baixo do rodapé, que fica parado
- a linha de unidade diz a idade do pacote — *pacote de hoje*, *de ontem*, *de 4 dias* —, e vencida diz só a causa: *pacote vencido há 8 dias* · a ação de sincronizar mora na T03
- o voltar do sistema (no computador, o Esc) não faz nada: a tela não tem saída desenhada, e o `Sincronizar` é o ato, não a saída (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-produto-real/pendencias.md`)
  - no protótipo (a otimização do design): nas unidades de quem tem mais de uma empresa (`06`), o voltar faz o `Trocar de empresa`, a saída desenhada do rodapé; nas empresas (`05`), nada, como no `00` — a tela não tem saída desenhada (padrão c, vai ao arquiteto). Provado no node (`testar-empresa.mjs`): aberto pela coluna ou pelo endereço, o estado fica parado, e o voltar não escuta

No protótipo (entrega do design de 24/09): o 6 é o `limiteSemBusca` do caso `lista-longa-garagens`, e a busca aparece em qualquer mundo com mais garagens que ele — o do herói, com 3, não a tem; o estado 02 é o mundo do caso, com 9. A busca olha o nome da garagem e o campo `cidade` do caso, sem acento e sem caixa; o nome da região saiu da busca (muda o T02·7). A frase da idade sai de `idadeNaLinhaDaGaragem`, em `app/src/dados/formato.js` (muda o T02·6); cada garagem lê o limiar do próprio pacote — a que só o caso tem, o do pacote que o caso declara pra ela (a otimização do design).

No protótipo (entrega do design de 25/09, que resolve o vazio sem frase do T02·7): a busca que não acha nenhuma garagem mostra o vazio declarado no lugar da lista, com o termo digitado no título, e o campo com o traço lima do campo focado: ele acende no foco, como o campo focado, e fica aceso enquanto a busca não acha nada, como a `03` desenha. A URL diz o `03` enquanto a busca não acha nada; a busca que volta a achar o tira. O `03` abre pelo endereço no mundo do caso `lista-longa-garagens`, com *Recreio* digitado, e a tela fica nesse mundo enquanto está aberta: a escolha ali não vai pra URL, porque o `01` é o quadro do mundo do herói. A escolha que a busca sem resultado esconde fica guardada e volta com a lista; enquanto nada aparece, o primário espera, como a `03` desenha. A busca que acha outras garagens e esconde a escolhida faz o mesmo (decisão do diretor de 25/09, b): o primário volta a *Escolha uma unidade*, apagado, e acende de novo, com o nome dela, quando a busca a mostra outra vez — a escolha volta marcada (o roteiro `busca.mjs` prova). No mundo do caso, aberto pelo `03` ou pelo `04`, toda garagem sincroniza (a otimização do design, construída): as três que o mundo do herói também tem (Várzea, Ibura e Pátio Caruaru) com o pacote delas em `pacotes`, e as outras seis com o pacote que o caso declara pra elas (pac-uo-11 a pac-uo-16). A linha de cada uma diz a idade e a hora do pacote dela e os ativos que ele traz — a Garagem Olinda, *pacote de hoje, 06:15* e *12 ativos* (pac-uo-12) —, e o `Sincronizar` leva à T03, que baixa esse pacote (`app/src/dados/garagens.js`).

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

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto.

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

Corrigida no C4 pelo medido (G10, T02-A3): saíram as 6 peças que nenhuma das três desenha (linha do histórico, a lista de garagens, segmentado, a marca no login, campo e campo focado) e entraram as que a tela usa e faltavam: o primário nos três estados, a linha tocável, os glifos, os poços e os marcadores. A lista das garagens daqui é a escolha numa lista, não a lista de garagens da folha (T02-A4). O que só a T02 desenha virou variante nomeada (G11): a linha de escolha escolhível, em que a garagem vencida também se escolhe, e a busca com a dica em texto. Com a `03` (entrega de 25/09), entraram o vazio declarado, com o termo digitado no título, e a busca focada, o traço lima do campo focado. Com o `05` e o `06` (a otimização do design), entraram as duas ações, com o link *Trocar de empresa* no rodapé das unidades de quem tem mais de uma empresa, e o link; a linha da empresa é a escolha numa lista, na variante sem o valor à direita.

## Histórias de usuário

- **HU-T02-1** — Vejo empresas/UC/UO que tenho permissão, com busca quando a lista for longa
- **HU-T02-2** — Troco de contexto a qualquer momento pelo cabeçalho; o contexto ativo fica sempre visível
- **HU-T02-3** — Trocar com módulo conectado avisa que a sessão de configuração encerra, e pede confirmação
- **HU-T02-4** — Trocar com envio em andamento é bloqueado até concluir ou abortar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
