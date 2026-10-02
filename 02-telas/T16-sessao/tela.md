# T16 · Sessão

Encerrar a sessão de configuração provando que a configuração sobreviveu ao desligar.

| | |
|---|---|
| **Elemento-assinatura** | a cadeia do encerramento e o autoteste assertiva por assertiva, com o valor lido |
| **Chrome** | faixa de sessão, até ela subir no fim |
| **Semente no protótipo** | sessão M2C-0417 + RKT-8H42 homologada |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 4 · 2 — ver `estados.md` |

## O que se toca

- a legenda de cada passo, enquanto ele corre: *Contadores e estado* — Grava os contadores e o estado no módulo, pra nada se perder no reinício · *Reinício do módulo* — Desligue e ligue a alimentação do módulo. Ele volta sozinho em alguns segundos · *Releitura completa* — Ele lê de volta o que ficou gravado. É isto que prova que a configuração sobreviveu ao reinício · *Repouso do módulo* — Devolve o módulo ao repouso que ele tinha antes da sessão · *Canal de programação* — Fecha o canal que o app abriu no módulo. Ele fecha sempre, mesmo sem homologar · *Registro da sessão* — Guarda o que foi feito aqui, pra ir ao servidor junto com a instalação · *Desconexão* — Solta o Bluetooth. O módulo fica livre pra outro aparelho · *Autoteste* — Confere as assertivas uma por uma, cada uma com o valor lido
  - **no protótipo:** cada legenda aparece embaixo do nome do passo que corre, no lugar que a peça do encerramento tem (a folha 5 · *a legenda só no passo que corre*), com o ponto final das três que as referências desenham (`00`, `01`, `03`); nos 4 passos da sessão abortada, as dos quatro que rodam. O passo 2 só leva a legenda no corte (T16·1): ela manda desligar a alimentação, e o módulo que reinicia por comando não pede isso — no herói, o passo 2 corre sem legenda, e o texto do reinício por comando vai ao arquiteto (T16·7). A do *Autoteste* fica no dado e não aparece: o passo 8 é a *Sessão encerrada* (T16·4). A palavra da direita enquanto corre (como *relendo* e *fechando*) continua sem texto nos passos 1, 2, 4, 6 e 7 (G25)
- `ENCERRAR` na faixa → o encerramento corre
  - no protótipo · a nossa versão desta linha, antes desta entrega: `ENCERRAR` na faixa → o encerramento corre: com a sessão homologada, os passos 1 a 7, um a cada 600 ms; ao fechar o 7, a faixa fica sem sessão e a tela passa pra *Sessão encerrada*, onde as 8 assertivas acendem a 400 ms, e a prova e o `Voltar ao menu` entram com a última (T16·4)
- no passo do corte: o técnico desliga e religa a alimentação
  - no protótipo · a nossa versão desta linha, antes desta entrega: no passo do corte, só quando o driver não reinicia por comando (T16·1): o técnico desliga e religa a alimentação; no protótipo, o módulo volta sozinho no ritmo do passo
- encerrada: `Voltar ao menu`
  - no protótipo · a nossa versão desta linha, antes desta entrega: encerrada: `Voltar ao menu` → o menu sem sessão; o voltar faz o mesmo
- ENCERRAR antes de homologar → os 4 passos da sessão abortada, sem confirmação
  - no protótipo · a nossa versão desta linha, antes desta entrega: ENCERRAR antes de homologar → os 4 passos da sessão abortada, sem confirmação, e a *Sessão encerrada* sem homologar. Pelos diálogos do menu (`Encerrar a sessão e sair`, `Encerrar a sessão e trocar`), os 4 passos seguem pro destino deles (G23)
  - **no protótipo** (decisão 36): quem chega aqui já confirmou — no diálogo *Encerrar sem homologar?*, aberto pelo ENCERRAR por cima da tela de onde ele veio, ou num dos diálogos do menu. Os 4 passos em si não perguntam de novo
- no protótipo · as nossas linhas, que saíram do pacote desta entrega e continuam valendo:
  - sessão interrompida: `Retomar` → a cadeia da T09, no bloco que parou; `Descartar` → o menu sem sessão, sem item de fila (T16·5); o voltar não faz nada (T16·6)
  - no encerramento e no autoteste, o voltar não faz nada
- **no protótipo · os blocos, pelo pacote 1** (decisão 49, construído em 02/10): a prova da `02` diz *6 blocos* no lugar da versão, contados da ordem da cadeia · na `06`, os blocos confirmados mostram o conteúdo do bloco no par do caso, o mesmo da T09 (o do caso, nunca o do herói — a errata): a Limpeza *feita*, o Ativo *OF-1621* e as Cercas *nenhuma*; e a legenda do bloco que parou diz o que já foi gravado, montada dos confirmados do caso, sem a limpeza: *o ativo e as cercas já estão gravados* (só o ativo e as cercas têm a forma com artigo no `textos.md`) · o `Retomar` grava só quantos confirmaram (`etapas.cadeia.confirmados`), sem a versão, que saiu
  - **desvio nomeado · a `06`:** a referência desenha *Cercas · 4 áreas* — o número do herói, com a palavra de antes da decisão 50 —, e o caso `sessao-interrompida` é o QAH-1M67 (a-13), que não tem região em `CERCAS.regioes`: o elo diz *nenhuma*. Pro arquiteto: a `06` passar a *nenhuma* (ou *4 regiões*, se o a-13 ganhar regiões no mock)
    - **o pacote 2** (02/10): a `06` passou a *4 regiões* — a palavra da decisão 50 —, mas o número segue o do herói: o caso `sessao-interrompida` continua no QAH-1M67 (a-13), sem região em `CERCAS.regioes`, e o elo diz *nenhuma*, pelo dado (decisão 49: o do caso, nunca o do herói). O código não mudou. Pra a `06` dizer *4 regiões* sem inventar o número, o a-13 tem de ganhar as quatro regiões no mock (pro arquiteto); aí o elo diz *4 regiões* sozinho
- **no protótipo · a assertiva dos identificadores, pela errata** (T16/02): a limpeza nunca apaga os identificadores — os dois escopos do `CADEIA.escopos` os mantêm —, e o autoteste confere que eles continuam lá: *Extended ID · preservado*. A assertiva é uma só, e diz o mesmo em toda sessão encerrada · **desvio nomeado · a `05`:** a errata não refez a `05`, que ainda desenha *Identificadores · 3 de 3* (e o `textos.md` dela também); o protótipo mostra *Extended ID · preservado* nas duas. O rótulo do mock continua *Identificadores* (o gate confere a ordem das oito): pro arquiteto, a `05` e o rótulo do mock seguirem a `02`
- **quanto afasta, depois do pacote 1** (02/10, contra o HTML · contra o PNG): `00` 0,05% · 1,68% · `01` 0,06% · 1,63% · `02` 0,06% · 3,18% · `03` 0,02% · 2,80% · `04` 0,05% · 1,57% · `05` 0,21% · 2,40% · `06` 0,10% · 1,26%. O que sobra é o contorno dos glifos do Lucide e a pausa (abaixo), e, com nome: na `05`, o *Extended ID · preservado*; na `06`, o *nenhuma*. Os textos conferem nas outras cinco

**No protótipo · o padrão da T16/02** (a resposta do arquiteto de 26/09, *seguir a T16/02 como padrão*, que as referências da `otimizacao300000000` confirmam e corrigem — o `MUDANCAS.md` §3). O que a instrução nova confirma ficou; o que a rodada anterior tinha feito pela instrução antiga, e ela desfaz, voltou. Nada disso é mais desvio:

- **o vão de 14:** o miolo tem 14 entre os blocos nas sete. A `02`, a `04` e a `05` desenhavam 12, e agora desenham 14 — ficou como a rodada anterior tinha feito
- **o subtítulo no bloco do título:** na `03`, como na `06`, o título e o subtítulo são um bloco, com 4 entre os dois — sai a margem de −8 que puxava o subtítulo solto pra cima. Ficou como a rodada anterior tinha feito
- **a nota do que não rodou numa peça só:** na `04`, a caixa tracejada com uma frase, *Não rodaram: contadores, reinício, releitura e o autoteste.* (o `textos.md`) — a de 13 em 500 e `--tinta-secundaria` (o `corpo pulado` da nota), sem o rótulo em caixa-alta, e as duas linhas equilibradas pelo `text-wrap: balance` na caixa, não na frase. Como a referência monta, a caixa é um bloco e a frase corre em linha dentro dela: cada linha tem a altura da linha da caixa, e não só a entrelinha da frase (sem isso a frase subia 1,5 e a caixa encolhia 3). Voltou a frase de 13 em `--tinta-secundaria`; saíram o rótulo e a frase de 12 em `--tinta-apagada` que a rodada anterior tinha posto
- **três estados, e não um:** o *não se aplica* — o círculo com o traço, em `--marca` — é só da assertiva do autoteste que não vale pra esse ativo, e aparece onde o autoteste aparece, na `02` e na `05` · o *pulado* é o passo que o encerrar sem homologar pula, na `03`: o traço solto da folha 5 no poço, em `--marca-limite`, e o texto *pulado* · o *—* é o passo que ainda não chegou, na `00` e na `01`, com o círculo vazio no poço. Voltou o traço solto no passo pulado; saiu o círculo com o traço que a rodada anterior tinha posto nele. Pro leitor de tela, também são três: o círculo com o traço diz *não se aplica*, o círculo vazio diz *ainda não*, e o traço do pulado fica mudo (`aria-hidden`), como na referência `03`, que não dá nome a ele — a situação ao lado já diz *pulado*, e nenhuma legenda da folha 3 nomeia esse traço (G15). Até o conserto de 26/09, ele dizia *não se aplica*, o nome do traço da folha 3, e o leitor ouvia *não se aplica · Contadores e estado · pulado*
- **quanto afasta** (contra o HTML novo, com a barra de status nova; medido antes do pacote 1 — a `02` e a `06` mudaram com a decisão 49, e se medem de novo): `00` 0,05% · `01` 0,06% · `02` 0,06% · `03` 0,02% · `04` 0,05% · `05` 0,06% · `06` 0,06% — o que sobra é o contorno dos glifos do Lucide. Contra as referências de antes, o padrão afastava a `02` 3,68%, a `03` 1,93%, a `04` 2,20% e a `05` 3,03%; contra as novas, antes desta construção, a `03` ficava em 0,30% (o círculo com o traço no passo pulado) e a `04` em 0,65% (o rótulo e a frase de 12), com a barra de status de antes ainda contando uns 0,2 pontos em cada uma. Os textos conferem nas sete
- **no protótipo · a pausa** (a auditoria do C13, 27/09): o poço do bloco que parou — o *SEM HOMOLOGAR* da `04` e o *parou aqui* da `06` — leva o `Pause` do Lucide, dois retângulos de cantos redondos, e as referências desenham dois traços finos (`M9.5 7.5v9 M14.5 7.5v9`), feitos à mão. É a regra dos ícones (G5, lei 14: os ícones vêm do Lucide, nunca desenhados à mão), e é a maior parte do que sobra na `04` (0,05%) e na `06` (0,06%, antes do pacote 1); o espécime *parou aqui* da folha 4, que levava o mesmo glifo, saiu com a pré-checagem no pacote 1. Desvio nomeado, pro arquiteto: aceitar a pausa do Lucide, ou a folha 3 dizer qual ícone do Lucide é a pausa

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema
- faixa · sem sessão
- faixa · sem ação
- o topo do menu inteiro
- duas ações
- uma ação
- processo correndo
- com legenda
- não se aplica
- assertiva da sessão
- linha de conferência
- aviso
- linha do histórico
- a lista de garagens
- encerrando
- pede o corte
- sem homologar
- com contador
- linha de opção
- lista com contagem
- item feito
- item com ressalva
- prova da sessão

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- barra do sistema
- faixa · sem sessão
- faixa · sem ação
- duas ações
- uma ação
- processo correndo
- os glifos de estado
- os poços
- os marcadores
- assertiva da sessão
- falha
- aviso
- nota tracejada
- encerrando
- pede o corte
- sem homologar
- com contador
- prova da sessão

Medido nas referências e no código do C11, no fechamento (G10), com os nomes das linhas do `componentes.md`. Saíram as nove que o código não usa: a faixa · sessão aberta (enquanto a sessão fecha, a faixa é a sem ação, e depois a sem sessão), a com legenda (quem explica o primário apagado é a explicação embaixo dele, a do processo correndo), a linha de conferência, a nota com rótulo (o NÃO RODARAM é a nota tracejada), a linha do histórico, a lista de unidades, o com contador de falha (a sessão que falha conta em neutro as que passaram, T16·3), a linha de opção e a lista com contagem. Entraram as de toque da folha 1 (o primário nos três estados, apagado enquanto o encerramento corre, e o link do `Descartar`), os átomos da folha 3 (os glifos e os poços do encerramento e das assertivas, e o LED da faixa), a falha (A HOMOLOGAÇÃO FICA BLOQUEADA, `05`) e a nota tracejada (`04`). As diferenças da tela contra a folha viraram variante nomeada da peça (G11), declarada lá: a assertiva da sessão com o nome aceso em todo estado, o círculo com o traço no não se aplica (o glifo de fora da folha 3) e o relógio no ainda não, a última de 54 e a que ainda não acendeu; a falha em bloqueio, sem poço (Lei 7 · exceção); o encerramento em pausa, a sessão interrompida (`06`); e o cabeçalho com o subtítulo (`03` e `06`). Com as referências da `otimizacao300000000`, a nota do que não rodou é a nota tracejada com a frase de 13 em `--tinta-secundaria` (`corpo pulado` na peça), sem o rótulo e equilibrada; o passo pulado leva o traço solto da folha 5 (o *sem homologar* da peça), e o círculo com o traço fica só nas assertivas. Com o pacote 1 (as folhas 4 e 6), o *com contador neutro* e o *com contador de falha* viraram uma peça só, o *com contador*: as listas dizem o nome novo, e o *de falha* desta nota é ele em falha · e o *não se aplica* da lista do design passou a ser o da assertiva, o círculo com o traço, que o código desenha na assertiva da sessão (a variante acima).

## Histórias de usuário

- **HU-T16-1** — A faixa fica no topo de toda tela: abertura, módulo, tempo decorrido e a única saída
- **HU-T16-2** — Enquanto a sessão vive: canal reaberto sozinho, módulo e ativo travados, repouso inibido
- **HU-T16-3** — O encerramento executa 8 passos e mostra cada um
- **HU-T16-4** — Vejo o autoteste assertiva por assertiva, com o valor lido — nunca um "OK" agregado
- **HU-T16-5** — Falha do autoteste bloqueia a homologação, não o encerramento
- **HU-T16-6** — Sessão interrompida é oferecida de volta, com o ponto de retomada
- **HU-T16-7** — Descartar não desfaz o que foi gravado — descarta a intenção, e isso é registrado
- **HU-T16-8** — Canal aberto por sessão anterior é anomalia: o app fecha antes de começar

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
