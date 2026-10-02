# T11 · Conferir configuração

Comparar o que o módulo tem gravado com o que o cadastro manda — em linguagem de negócio.

| | |
|---|---|
| **Elemento-assinatura** | as linhas de conferência: cada bloco dizendo se bate com o cadastro |
| **Chrome** | faixa de sessão |
| **Semente no protótipo** | M2C-0438 + ONK-8Q90 · caso diff-divergente |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 2 · 2 — ver `estados.md` |

## O que se toca

- as linhas: **Cercas, APN, Extended ID, Eventos e Leitor** · as cercas contam regiões (decisão 50) · a APN aparece (decisão 51)
- o **Extended ID é só leitura**, com o ícone de informação: o app mostra os cartões e iButtons que estão no módulo, e não grava (decisão 45) · o contador conta as quatro que se comparam
- `Corrigir as cercas` → T09, a manutenção, com **o primeiro bloco que diverge, na ordem da cadeia** — um bloco por vez (decisão 53)
  - no protótipo · a nossa versão desta linha, antes desta entrega: `Corrigir as N divergências` levava à cadeia da T09, a de sempre, que regravava os seis blocos — a T09 não tinha desenho da cadeia só dos divergentes (G25). Com a decisão 53, sai: o `Corrigir` reenvia um bloco só, e o rótulo diz qual
  - no protótipo (o pacote 2, D2): o `Corrigir` e o `Revisar` passam à T09 o modo e o bloco pelo estado único — `etapas.ativo.modo = 'manutencao'` e `etapas.ativo.bloco` —, e a T09 abre no escolher o bloco (`08`) com ele escolhido; `Reenviar …` liga a cadeia curta (`09`), e o `Voltar ao menu` dela leva ao menu, de onde o `Conferir configuração` reabre a conferência, que pede o próximo. A conferência guarda os blocos já reenviados (`etapas.conferencia.reenviados`) e lê o que a T09 acabou de reenviar (`etapas.cadeia.reenviado`, que ela limpa a cada pedido). **A mudança mínima na T09, nomeada:** ela lê o bloco do estado (uma linha) e ganha o texto do reenvio do leitor, dos eventos e da conexão — *Reenviar o leitor*, *Reenviando só o leitor.*, *apaga só o leitor · o resto fica como está*, e os dos eventos e da conexão —, pela gramática dos das cercas, sem referência; com texto, essas três linhas do `08` deixam de ficar inertes (o `Ativo` continua). A volta passa pelo menu, e não direto à conferência: o fim da cadeia curta só tem o `Voltar ao menu` (padrão, pro arquiteto)
  - no protótipo · a ordem: o `Corrigir`/`Revisar` segue a ordem da cadeia (`M.cadeia.ordem`: cercas, leitor, eventos, conexão), e as linhas, a ordem da decisão 53 (Cercas, APN, Extended ID, Eventos, Leitor). No par da semente, depois das cercas, a APN ainda diverge: o cabeçalho fica *NÃO BATE COM O CADASTRO · 1 de 4* (o que diverge vence o cinza), o primário é `Revisar o leitor`, e o link continua `Outras ações`; depois do leitor, `Revisar os eventos`; depois deles, `Corrigir a APN`; e tudo confere (`02`). *Revisar os eventos* e *Corrigir a APN* seguem a gramática das referências, sem desenho próprio (padrão, pro arquiteto)
- depois de reenviar um bloco, **os que dependem dele ficam *revisar em seguida***, pelo arraste do mock: as cercas levam o leitor e os eventos · o cabeçalho é cinza, e `Revisar o leitor` → T09, com o próximo, na ordem
  - no protótipo: o arraste é o mesmo que a `04` de antes lia em `M.cadeia.arraste` pra legenda *Corrigir as Cercas leva o Leitor e os Eventos junto* — a legenda sai com a `04`, e o arraste passa a marcar o *revisar em seguida* da `05`, aberta pela coluna com o caso `cercas-reenviadas` (o par do herói, o `reenviado` do caso). Cada linha de revisar leva o relógio cinza no poço, *revisar em seguida* em `--tinta` e, embaixo, o porquê, pelo bloco que a marcou; só os dois do arraste das cercas têm texto (`05`), e o que não tem fica sem a segunda linha (G25). A linha já marcada guarda quem a marcou: reenviado o leitor, os eventos continuam *dependem das cercas*. O cabeçalho cinza conta as de revisar, sem unidade (*2*), com o relógio no poço. Só com as de revisar, o link é o `Voltar ao menu`, como a `05` desenha, e o voltar do Android sai por ele
- sem divergência — só o conteúdo que o app não reconhece —, o principal é `Reenviar os 5 blocos`: limpar tudo é refazer a instalação
  - no protótipo: a `01`, pela coluna — o link é o `Apenas registrar o diagnóstico`, e a nota diz *Reenviar os 5 blocos limpa*; o valor das linhas que conferem fica em `--tinta-secundaria`, como a `01` nova desenha (antes, aceso: a peça guarda o `valorAceso`, sem uso). A legenda de antes (*Regravar substitui os cinco na ordem da cadeia.*) saiu da `00` e da `01`. O *5* dos blocos sai da cadeia: os cinco depois da limpeza
- a folha `Outras ações`: *Reenviar os 5 blocos* e *Apenas registrar o diagnóstico*, cada uma com o efeito
  - no protótipo (a entrega do pacote 1, construída): `Outras ações` → a folha (`03`), com a URL dizendo o `03` enquanto ela está aberta; ela fecha no xis e também tocando fora, arrastando pra baixo e no voltar (lei 20), e a URL volta à `00`. O véu começa embaixo da faixa, que fica acesa e desabilitada, como a `03` desenha (e a T04/10); a conferência atrás dele fica inerte (G25), e a `03` desenha o véu sobre o vazio — no app, a `00` aparece atrás dele (desvio nomeado, como a T13/10). A folha fica sem o puxador, como a `03` desenha (a peça, `puxador={false}`), e arrasta de qualquer ponto. Aberta pelo endereço ou no print, nasce aberta e com a leitura feita. Com a folha aberta, o `ENCERRAR` não responde
  - no protótipo: `Reenviar os 5 blocos` leva à cadeia da T09, a de sempre, e depois dela a conferência reaberta confere (T11·2); se um `Corrigir` já pôs a manutenção no estado, o `Reenviar` devolve o modo que o vínculo tinha (`etapas.conferencia.modoDoVinculo`), e a T09 abre no que vai ser gravado (`05`) · `Apenas registrar o diagnóstico` registra o diagnóstico na sessão e volta ao menu; nenhum item entra na fila, porque o mock não tem onde (C11 · G25)
- tudo confere: `Voltar ao menu`
- a leitura corre ao abrir, sobre o desenho do quadro a que ela chega — a `00` quando diverge, o `02` quando confere —, e o resto da tela já está no lugar (C11 · G27): **cada linha entra com o relógio no poço e vira check ou xis**, um a cada 400 ms, na ordem da cadeia; o que o módulo tem (a linha vermelha do par, na `00`) espera a leitura chegar na linha, e o glifo e ela esmaecem em 150 ms (`animacao.md`) · **o veredito espera a última linha** (a decisão do diretor de 25/09, C12·35 b): o *NÃO BATE COM O CADASTRO · 4 de 4*, ou o *CONFERE COM O CADASTRO · 4 de 4*, ficam no lugar, sem desenho e mudos pro leitor, e entram esmaecendo em 150 ms quando a última linha acende · o quadro parado de cada referência é o do fim, e o de começo não tem referência nem texto (G25) · com reduzir movimento, a leitura segue no mesmo ritmo, e o esmaecer vira troca direta (G26) · num estado da coluna, ela nasce lida
  - no protótipo (C12·35): o relógio liga depois da troca de 150 ms entre telas — pelo menu, a primeira linha vira aos 550 ms; pelo endereço, aos 400 ms. E o veredito não deixa vão (o retorno do diretor de 26/09, o padrão a): a caixa dele está no lugar desde que a tela abre, neutra — o traço no cinza, o poço vazio, a palavra guardando o lugar —, com a contagem acompanhando as linhas que se comparam; na última, a palavra e a cor entram esmaecendo. O quadro de espera não tem referência (G25) e vai ao arquiteto
  - no protótipo (o pacote 2, medido): o Extended ID entra na leitura como as outras — o relógio no poço, e a linha do que está no módulo esperando a vez — e vira o i cinza; ele fica fora da contagem, então na linha dele a contagem não sobe (*1 de 4*, *2 de 4*, *2 de 4*, *3 de 4*, e o veredito na quinta linha). O quadro de espera não tem referência (G25)
- o que diverge: aberta pelo painel, com a semente M2C-0438 + ONK-8Q90, as quatro linhas que se comparam não batem (`00`): cada uma com o xis vermelho e o par embaixo do nome — *no módulo · …*, em vermelho, o `noModulo` do caso, e *no cadastro · …*, o `noCadastro` —, e o Extended ID diz o que está no módulo, só leitura. Aberta pelo menu com a sessão do herói, nada diverge, e ela vai pro `02` (T11·1)
- o valor de cada linha é o que o cadastro manda: o do caso, no par do diff-divergente; o cadastro do próprio par, nos outros (C11 · G9). O Leitor sai do meio da sessão: sem fio é `leitor sem fio`, como na T06
  - no protótipo (o pacote 2): no par sem caso, as cercas são as regiões do ativo (decisão 50), a APN é a da conexão da empresa (`M.conexoes`, decisão 51, a mesma da T09) e os eventos, o intervalo do preset do modelo. O Extended ID é o que está no módulo: o do cadastro do módulo, se o mock declarar; senão, o único declarado, o do `diff-divergente` (*3 cartões · 1 iButton*), que a `02` e a `05` desenham no herói — o mock não declara o do M2C-0417 (como o item D da T13 lê; pro arquiteto). Com par na tela — alguma linha diverge (`00`) —, ele diz o que está no módulo e o só leitura, nas duas linhas em `--tinta-secundaria`; sem par, o valor curto à direita (`01`, `02`, `05`). Sem cartão nenhum (D5), só informa: *nenhum cartão no módulo* com par, *nenhum cartão* à direita — nenhuma referência desenha, e a frase curta é a mesma gramática do valor curto (padrão, pro arquiteto)
  - no protótipo · a coluna do nome: a folha 4 e as cinco referências medem 96 (o *Extended ID*), e o token `--conferencia-nome` diz 74 — os tokens não mudam neste pacote. O nome fica do tamanho dele, numa linha, nunca menos que o token, e o valor, alinhado à direita, cai no mesmo pixel (desvio nomeado; pro arquiteto: o token a 96)
- o conteúdo que o app não reconhece (`01`, só pela coluna): o caso `indice-nao-classificado`, no par da semente — as linhas conferem, com o check, e o cabeçalho diz *NÃO BATE COM O CADASTRO · 1 a mais*: o 1 é o conteúdo fora de todos os blocos, a posição que o caso traz; a nota diz o que é; o rodapé é o do quadro sem divergência: `Reenviar os 5 blocos` e `Apenas registrar o diagnóstico`
- o `ENCERRAR` é o de toda tela com sessão: antes de homologar, a sessão abortada da T16 (G23); depois, o encerramento
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16 · a conferência continua correndo embaixo do diálogo, porque o técnico ainda não decidiu nada (padrão do protótipo, pro arquiteto; a alternativa é pausar)
- o voltar do Android faz o mesmo que a saída do rodapé (`logica.md`): no `02` e na `05`, o `Voltar ao menu`; na `01`, o `Apenas registrar o diagnóstico`; na `00`, o link é o `Outras ações`, que não sai da tela, e ele não faz nada · com a folha *Outras ações* aberta (`03`), fecha a folha

Corrigido no C11 pelas referências e pelas decisões do C0 (G1): a leitura ao abrir, o que diverge e o valor de cada linha, o que o `Só registrar` grava e o voltar. Na entrega do checklist: o par do que não bate, o 01 com os blocos conferindo e o *1 a mais*, o relógio que vira check ou xis e o veredito que espera a última linha. Na rodada 3 (decisão 53, pacote 2): as cinco linhas, com o Extended ID só leitura e fora da contagem, o `Corrigir` de um bloco por vez e o *revisar em seguida* (`05`); sai a versão ilegível (`04`), com a linha de condição e a legenda do arraste.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- duas ações
- uma ação
- com legenda
- folha
- não se aplica
- assertiva da sessão
- linha de conferência
- com contagem
- linha do histórico
- a lista de garagens
- encerrando
- pede o corte
- sem homologar
- linha de opção
- lista com contagem
- item feito
- item com ressalva

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas 3 referências da entrega do checklist, nas 2 da entrega do pacote 1 e no código: as peças que a tela usa de fato. Revista pelo pacote 2 (decisão 53): sai a `04`, e com ela a pré-condição; sai a prova da cadeia, o *igual à do cadastro* do `02`, que o `textos.md` novo não tem; a `05` e o Extended ID só leitura, com o ícone de informação, medidos no ciclo que construiu o pacote (abaixo). Construa com o componente — nunca redesenhe.

- primário · normal
- primário · pressionado
- link · normal e pressionado
- barra do sistema
- faixa · sessão aberta
- duas ações
- uma ação
- os glifos de estado
- os poços
- os marcadores
- com contagem
- linha de conferência
- nota com rótulo
- com contador
- folha com opções (a *Outras ações*, sem o puxador · `03`, a entrega do pacote 1)
- linha de opção (com o efeito embaixo · `03`)

As diferenças da tela contra a folha viraram variante nomeada da peça (G11): o com contagem que confere, em lima e sem poço, 12 · 14 (`02`), e o que não bate, com o poço de 32 e o glifo de 16, como a folha 4 nova (`00`, `01`: o *1 a mais*); a linha de conferência com o poço de 32 e o glifo de 16 (o poço na linha: 50 leva 32); a que não bate, com o xis vermelho e o par embaixo do nome, o módulo em vermelho e o cadastro em `--tinta-secundaria`, a 3, com 10 em cima e embaixo e sem o valor à direita (`00`, `LinhaChecagem` `par`); a que confere com o valor em `--tinta`, quando a conferência não bate por outra razão (`01`, `valorAceso` — sem uso desde o pacote 2: a `01` nova desenha o valor em `--tinta-secundaria`); a que a leitura ainda não alcançou, com o relógio no poço e a linha do módulo esperando, e a que acende, esmaecendo (`lendo`, `acende`); e a nota com rótulo do que a leitura achou, com a borda do poço, 10 · 12 (`01`). A legenda embaixo da lista é texto do conteúdo, não a *com legenda* do rodapé (T11-A14). A faixa é a *sessão aberta*, com a linha de baixo, igual nas referências e no app (a faixa é uma peça só). Na coluna do `componentes.md`, a T11 sai das linhas que nenhuma das três desenha. Com o pacote 1 (a folha 6), o *com contador neutro* e o *com contador de falha* viraram uma peça só, o *com contador*: a lista diz o nome novo. Com o pacote 2 (a folha 4, decisão 53, medido nas cinco referências): o Extended ID é a linha de conferência no estado *só informa* (`informa`, o i cinza no poço), com o valor curto em `--tinta-secundaria` (`01`, `02`, `05`) ou, com par na tela, as duas linhas do par em `--tinta-secundaria` (`00`); o *revisar em seguida* é a linha no estado `pendente` (o relógio cinza), com a linha de cima do par em `--tinta` e o porquê embaixo — sem o porquê, só a de cima; o cabeçalho cinza do revisar é o *com contagem* neutro, com o relógio no poço de 32 e o número sem unidade (`05`); e o nome da linha fica numa linha, do tamanho dele, a partir do token de 74 (a folha mede 96, acima).

## Histórias de usuário

- **HU-T11-1** — A conferência compara o conteúdo de cada bloco — o módulo não guarda versão
- **HU-T11-2** — Vejo as cercas, em regiões, a APN, os eventos e o leitor, cada um com o que está no módulo e no cadastro
- **HU-T11-3** — O Extended ID — os cartões e iButtons gravados no módulo — aparece só pra leitura
- **HU-T11-4** — Corrigir reenvia um bloco por vez: o primeiro que diverge, na ordem da cadeia
- **HU-T11-5** — Depois de reenviar um bloco, os que dependem dele ficam marcados *revisar em seguida*
- **HU-T11-6** — As outras ações dizem o efeito: reenviar os 5 blocos ou apenas registrar o diagnóstico
- **HU-T11-7** — Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados*
- **HU-T11-8** — Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui
- **HU-T11-9** — Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
