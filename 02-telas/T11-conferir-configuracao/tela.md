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

- o rodapé é o de sempre: `Corrigir as N divergências` e o link `Outras ações` · a folha tem as outras duas, cada uma com o efeito: *Reenviar os 5 blocos — a cadeia inteira, preservando a conexão* e *Apenas registrar o diagnóstico — nada é gravado* · fecha no xis
  - no protótipo (a última entrega, construída): o N é o da conferência (5 na `00`, 2 na `04`), e o 5 dos blocos sai da cadeia (os cinco versionados). `Outras ações` → a folha (`03`), com a URL dizendo o `03` enquanto ela está aberta; ela fecha no xis e também tocando fora, arrastando pra baixo e no voltar (lei 20), e a URL volta à `00`. O véu começa embaixo da faixa, que fica acesa e desabilitada, como a `03` desenha (e a T04/10); a conferência atrás dele fica inerte (G25), e a `03` desenha o véu sobre o vazio — no app, a `00` aparece atrás dele (desvio nomeado, como a T13/10). A folha fica sem o puxador, como a `03` desenha (a peça, `puxador={false}`), e arrasta de qualquer ponto. Aberta pelo endereço ou no print, nasce aberta e com a leitura feita. O que cada ação faz: `Corrigir` e `Reenviar` levam à cadeia da T09, a de sempre, que regrava os seis blocos — a T09 não tem desenho da cadeia só dos divergentes e do que eles arrastam (G25) —, e depois dela a conferência reaberta confere (T11·2); `Apenas registrar o diagnóstico` registra na sessão e volta ao menu, sem item na fila (acima). Com a folha aberta, o `ENCERRAR` não responde
- sem divergência — só o conteúdo não reconhecido —, o `Corrigir` não aparece: o principal é `Reenviar os 5 blocos`, e a legenda diz que preserva a conexão
  - no protótipo: a `01`, pela coluna — o link é o `Apenas registrar o diagnóstico`, e a nota diz *Reenviar os 5 blocos limpa*; o valor dos blocos que conferem fica aceso, como ela desenha. A legenda de antes (*Regravar substitui os cinco na ordem da cadeia.*) saiu da `00` e da `01`
- com a versão ilegível, a linha de condição embaixo do título avisa que a conferência foi pelo conteúdo · a legenda mostra o arraste: *Corrigir as Cercas leva o Leitor e os Eventos junto*
  - no protótipo: a `04`, pela coluna, montada pelo caso `versao-ilegivel` (a receita), no par da semente — o caso não declara o par, e a faixa da `04` é a da semente. Os 2 que não batem são os que o caso diz (`divergentes`), com o par do `diff-divergente`; os que conferem, com o valor em `--tinta-secundaria`, como ela desenha. A linha de condição é a pré-condição da T09 (`Precondicao`), com o i no círculo, cinza e mudo pro leitor (o glifo `info`, a frase já diz). A legenda do arraste sai de `M.cadeia.arraste`: aparece quando corrigir leva junto um bloco que confere — o primeiro bloco que diverge e arrasta um desses, e tudo o que ele arrasta, na ordem da cadeia; na `00`, com os cinco divergindo, não há o que levar a mais, e ela não aparece
- `Regravar os cinco blocos` → T09
  - no protótipo · a nossa versão desta linha, antes desta entrega: `Corrigir as N divergências` e `Reenviar os 5 blocos` → T09 (a última entrega; antes, `Regravar os cinco blocos`)
- `Só registrar o diagnóstico` → registra e volta ao menu
  - no protótipo · a nossa versão desta linha, antes desta entrega: `Apenas registrar o diagnóstico` (antes, `Só registrar o diagnóstico`) → registra o diagnóstico na sessão e volta ao menu; nenhum item entra na fila, porque o mock não tem onde (C11 · G25)
- a leitura corre ao abrir, sobre o desenho do quadro a que ela chega — a `00` quando diverge, o `02` quando confere —, e o resto da tela já está no lugar (C11 · G27): **cada bloco entra com o relógio no poço e vira check ou xis**, um a cada 400 ms, na ordem da cadeia; o que o módulo tem (a linha vermelha do par, na `00`) espera a leitura chegar no bloco, e o glifo e ela esmaecem em 150 ms (`animacao.md`) · **o veredito espera a última linha** (a decisão do diretor de 25/09, C12·35 b): o *NÃO BATE COM O CADASTRO · 5 de 5*, ou o *CONFERE COM O CADASTRO · 5 de 5* e o *igual à do cadastro, bloco a bloco*, ficam no lugar, sem desenho e mudos pro leitor, e entram esmaecendo em 150 ms quando a quinta linha acende · o quadro parado de cada referência é o do fim, e o de começo não tem referência nem texto (G25) · com reduzir movimento, a leitura segue no mesmo ritmo, e o esmaecer vira troca direta (G26) · num estado da coluna, ela nasce lida
  - no protótipo (C12·35): o relógio liga depois da troca de 150 ms entre telas — pelo menu, o primeiro bloco vira aos 550 ms; pelo endereço, aos 400 ms. E o veredito não deixa vão (o retorno do diretor de 26/09, o padrão a): a caixa dele está no lugar desde que a tela abre, neutra — o traço no cinza, o poço vazio, a palavra guardando o lugar —, com a contagem acompanhando as linhas (*1 de 5* … *4 de 5*); na quinta, a palavra e a cor entram esmaecendo, e no `02` a legenda da prova no mesmo tique. O quadro de espera não tem referência (G25) e vai ao arquiteto
- o que diverge: aberta pelo painel, com a semente M2C-0438 + ONK-8Q90, os cinco blocos não batem (`00`): cada um com o xis vermelho e o par embaixo do nome — *no módulo · tradução frota v1*, em vermelho, o `noModulo` do caso, e *no cadastro · tradução frota v2*, o `noCadastro` —, e a Conexão com os mesmos 50 das outras (antes, 72; a entrega do checklist). Aberta pelo menu com a sessão do herói, nada diverge, e ela vai pro `02` (T11·1). Depois de regravar pela T09, a mesma sessão confere (T11·2)
- o valor de cada linha é o que o cadastro manda: o do caso, no par do diff-divergente; o cadastro do próprio par, nos outros — por isso o `02` do herói diz `urbano v3`, a tradução do modelo dele (C11 · G9; a última entrega escreve só o nome, e o protótipo segue o `textos.md` — nos outros quadros, *tradução frota v2* é a frase do caso). O Leitor sai do meio da sessão: sem fio é `leitor sem fio`, como na T06; por cabo, a linha fica sem valor, porque não há texto aprovado (G25)
- o conteúdo que o app não reconhece (`01`, só pela coluna): o caso `indice-nao-classificado`, no par da semente — os cinco blocos conferem, com o check, e o cabeçalho diz *NÃO BATE COM O CADASTRO · 1 a mais*: o 1 é o conteúdo fora de todos os blocos, a posição que o caso traz; a nota diz o que é; o rodapé é o do quadro sem divergência (a última entrega, abaixo): `Reenviar os 5 blocos` e `Apenas registrar o diagnóstico`
- tudo confere: `Voltar ao menu`
- o `ENCERRAR` é o de toda tela com sessão: antes de homologar, a sessão abortada da T16 (G23); depois, o encerramento
  - **no protótipo** (decisão 36): antes de homologar, o ENCERRAR abre o diálogo *Encerrar sem homologar?* por cima desta tela, e o `Continuar a instalação` deixa o técnico nela — a resposta do arquiteto de 26/09 · o `Encerrar sem homologar` roda os 4 passos da T16 · a conferência continua correndo embaixo do diálogo, porque o técnico ainda não decidiu nada (padrão do protótipo, pro arquiteto; a alternativa é pausar)
- o voltar do Android faz o mesmo que a saída do rodapé (`logica.md`): no `02`, o `Voltar ao menu`; na `01`, o `Apenas registrar o diagnóstico`; na `00` e na `04`, o link é o `Outras ações`, que não sai da tela, e ele não faz nada (a última entrega; antes, na `00`, o `Só registrar`) · com a folha *Outras ações* aberta (`03`), fecha a folha

Corrigido no C11 pelas referências e pelas decisões do C0 (G1): a leitura ao abrir, o que diverge e o valor de cada linha, o que o `Só registrar` grava e o voltar. Na entrega do checklist: o par do que não bate, o 01 com os blocos conferindo e o *1 a mais*, a Conexão de 50, o relógio que vira check ou xis e o veredito que espera a última linha.

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sessão aberta
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- com legenda
- folha
- assertiva da sessão
- linha de conferência
- com contagem
- linha do histórico
- a lista de garagens
- a pré-condição dos pinos
- encerrando
- pede o corte
- sem homologar
- linha de opção
- lista com contagem
- item feito
- item com ressalva

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

Medido nas 3 referências da entrega do checklist, nas 2 da última entrega e no código: as peças que a tela usa de fato. Construa com o componente — nunca redesenhe.

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
- prova da cadeia
- folha com opções (a *Outras ações*, sem o puxador · `03`, a última entrega)
- linha de opção (com o efeito embaixo · `03`)
- a pré-condição dos pinos (a linha de condição da versão ilegível, com o i · `04`)

As diferenças da tela contra a folha viraram variante nomeada da peça (G11): o com contagem que confere, em lima e sem poço, 12 · 14 (`02`), e o que não bate, com o poço de 32 e o glifo de 16, como a folha 4 nova (`00`, `01`: o *1 a mais*); a linha de conferência com o poço de 32 e o glifo de 16 (o poço na linha: 50 leva 32), a Conexão com os 50 das outras (`00` a `02`); a que não bate, com o xis vermelho e o par embaixo do nome, o módulo em vermelho e o cadastro em `--tinta-secundaria`, a 3, com 10 em cima e embaixo e sem o valor à direita (`00`, `LinhaChecagem` `par`); a que confere com o valor em `--tinta`, quando a conferência não bate por outra razão (`01`, `valorAceso`); a que a leitura ainda não alcançou, com o relógio no poço e a linha do módulo esperando, e a que acende, esmaecendo (`lendo`, `acende`); e a nota com rótulo do que a leitura achou, com a borda do poço, 10 · 12 (`01`). A legenda embaixo da lista é texto do conteúdo, não a *com legenda* do rodapé (T11-A14). A faixa é a *sessão aberta*, com a linha de baixo, igual nas referências e no app (a faixa é uma peça só). Na coluna do `componentes.md`, a T11 sai das linhas que nenhuma das três desenha. Com o pacote 1 (a folha 6), o *com contador neutro* e o *com contador de falha* viraram uma peça só, o *com contador*: a lista diz o nome novo.

## Histórias de usuário

- **HU-T11-1** — O app lê a string de versão como primeiro passo; ausente ou ilegível roda diff completo por conteúdo
- **HU-T11-2** — Vejo divergências agrupadas por bloco, em linguagem de negócio
- **HU-T11-3** — Escolho entre 3 ações nomeadas pelo efeito, incluindo *apenas registrar o diagnóstico*
- **HU-T11-4** — Corrigir arrasta as dependências automaticamente, na ordem canônica
- **HU-T11-5** — Índice que o firmware cria sozinho não é divergência; sem lista, vai para *não classificados*
- **HU-T11-6** — Escopo fixo em limpeza de configuração — limpeza total não é oferecida aqui
- **HU-T11-7** — Configuração conforme é declarada explicitamente; o diff sobe mesmo sem reenvio

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
