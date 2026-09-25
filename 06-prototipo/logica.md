# A lógica do protótipo navegável

## O estado único

Um objeto só guarda tudo o que o app sabe, e **toda tela lê dele**:

```
tecnico      Rafael Vieira · r.vieira
contexto     empresa · garagem · pacote e a idade dele
sessao       nenhuma | { modulo, ativo, aberta às 14:30, etapa }
etapas       o que já foi feito: pré-checagem, a CAN (lida · refeita), cadeia, calibração, ciclo, checklist
fila         os itens esperando envio · e os que o técnico reenviou na T15 (reenviados)
aviso        o aviso do acesso vencendo, já fechado no Entendi ou não (avisoDoAcessoVisto)
tela         onde o app está · momento ou estado aberto
```

**A sessão nasce na pré-checagem aprovada** — é aí que a faixa desce. E morre no encerramento, quando a faixa sobe.

## O começo

O protótipo abre no **login, às 14:30, com o Rafael Vieira**. O usuário vem preenchido; qualquer senha com 8 caracteres ou mais entra. Com menos, aparece o erro.

## O caminho do herói

```
login → garagem Várzea → sincroniza o pacote → menu, com o aviso do acesso na primeira chegada (Entendi)
→ conectar: acha cinco módulos (o do herói e mais quatro), escolhe o M2C-0417, conecta, a pré-checagem acende as onze linhas → a faixa desce
→ o ônibus RKT-8H42 → os chassis batem → a CAN lida → a cadeia grava e relê os blocos → calibra o hodômetro e o horímetro, com a prova: o número do painel e a foto
→ o ciclo dinâmico: os cinco passos sozinhos, o evento chega → o checklist fecha → ENCERRAR → a faixa sobe → menu sem sessão
```

O roteiro `app/scripts/caminhos/heroi.mjs` prova o caminho só por toque, do login ao menu sem sessão, sem pulo do palco (`node scripts/caminho.mjs heroi`, 189 passos). Na primeira chegada ao menu, o roteiro vê o aviso do acesso nascer parado, com o menu atrás sem toque, e toca `Entendi`; na volta ao menu sem sessão, no fim, o aviso não aparece de novo. Na calibração, o roteiro digita o número do painel do mock, fotografa e semeia — o botão dizendo o que falta, e o *Gravando no módulo…* e o *Relendo…* no ritmo —, no hodômetro e no horímetro, e o `Concluir a calibração` volta ao menu; o caminho segue pelo `Finalizar com checklist`: o menu não tem cartão do ciclo, e é o cartão da Seção E que falta que abre a T14 (T13·4); o `Voltar ao checklist` do ciclo concluído leva de volta, e o checklist fecha com as quatro fotos de B (o Painel vem herdado da calibração) e o `Finalizar instalação`.

## As sementes

Pular direto pra uma tela pelo painel monta o estado mínimo que ela precisa pra fazer sentido:

| Tela | Semente |
|---|---|
| T01 · Login | nenhuma sessão · usuário r.vieira preenchido |
| T02 · Selecionar contexto | Viação Atlântico Sul · três garagens · Várzea com pacote de ontem |
| T03 · Sincronizar | garagem Várzea · pacote pac-uo-01 |
| T04 · Menu | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| T05 · Conectar módulo | cinco módulos por perto (situacao.porPerto) · M2C-0417 é o do herói · pelo menu, a tela abre na lista sem nada escolhido (01) |
| T06 · Selecionar ativo | sessão M2C-0417 · dez ônibus no pacote |
| T07 · Dados da CAN | sessão M2C-0417 + RKT-8H42 · doze sinais do mock |
| T08 · Refazer leitura da CAN | sessão M2C-0417 + RKT-8H42 · leitura feita |
| T09 · Configurar módulo | sessão M2C-0417 + RKT-8H42 · os blocos do mock |
| T10 · Calibração | sessão M2C-0417 + RKT-8H42 · hodômetro 184.320 no módulo, 482.317 no painel |
| T11 · Conferir configuração | M2C-0438 + ONK-8Q90 · caso diff-divergente · garagem Ibura, a do ONK-8Q90, com o pacote dela (G21) |
| T12 · Últimas instalações | sessão M2C-0417 + RKT-8H42 · garagem Várzea · cinco instalações (a 00 desenha a sessão aberta, G21) |
| T13 · Checklist | sessão M2C-0417 + RKT-8H42 · 31 itens |
| T14 · Ciclo dinâmico | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| T15 · Fila de saída | fila com dois itens · um com erro |
| T16 · Sessão | sessão M2C-0417 + RKT-8H42 homologada |

## As portas naturais

Escolher e seguir com um módulo ou ônibus da lista que é **caso do mock** abre o estado dele, igual ao que o técnico veria no mundo. Com a R-14, tocar na linha só marca: o estado aparece quando o técnico aperta o botão (R-11). Na T05, marcar o M2C-0394 e tocar em `Conectar ao M2C-0394` leva a pré-checagem ao conteúdo que não cabe (o 11); o M2C-0362 fecha o canal da sessão anterior e mostra as pendências (o 13); o M2C-0335 dorme na nona, e o `Acordar módulo` segue dali (o 15). O M2C-0999 não se toca, como a referência desenha: o serial não cadastrado abre pela coluna. Na T06, tocar no KNB-5H39 abre o sem chassi na CAN. A coluna do palco sempre funciona também.

Na T05, o que acontece uma vez vale uma vez por sessão (G21, `casosConsumidos`): o link que cai, o módulo que dorme, o canal antigo que o app fecha, a falha ao conectar e o módulo sem rede até a conexão gravar. O que é fato do cadastro — o serial, o driver, a matriz, o conteúdo, as cercas e as pendências — vale toda vez que o módulo conecta.

O roteiro `app/scripts/caminhos/portas.mjs` prova as portas e a R-14 nas três listas de escolha — a T02, a T05 (a lista e a 00) e a T06 (`node scripts/caminho.mjs portas`).

## ENCERRAR

- **depois de homologar:** os passos do encerramento, o corte de alimentação que o técnico faz quando o driver não reinicia por comando, e o autoteste (T16·1). O passo que corre diz o que faz, na legenda embaixo do nome (as 8 do `tela.md` da T16); o passo 2 só leva a dele no corte, porque ela manda desligar a alimentação (T16·7). O herói é um VL06, que reinicia por comando; o corte aparece na sessão do KNB-5H39 · M2C-0371, que se abre pelo endereço do momento. Ao fechar o sétimo passo, a sessão sai do estado único e a tela passa pra *Sessão encerrada*, onde as oito assertivas acendem uma a uma; a prova e o `Voltar ao menu` entram com a última (T16·4)
- **antes de homologar:** a sessão abortada — **4 passos, sem confirmação**. Quem tocou no ENCERRAR da faixa já decidiu. Do ENCERRAR, os 4 passos terminam na *Sessão encerrada* sem homologar; dos diálogos do menu (`Encerrar a sessão e sair`, `Encerrar a sessão e trocar`), o destino fica gravado no estado único e, depois dos 4 passos, o app segue pra ele — o login com a fila preservada, ou a sincronização da garagem nova (G23)
- **a sessão interrompida (T16/06):** `Retomar` reabre a cadeia da T09 no bloco que parou, com os blocos já confirmados; `Descartar` volta ao menu sem sessão e não cria item de fila; o voltar não faz nada (T16·5, T16·6)
- **a exceção da T09 (G23, HU-T09-9):** enquanto a Conexão não gravou, o ENCERRAR e o `Voltar ao menu` com a cadeia parada levam à recuperação (T09/03), onde o ENCERRAR não faz nada e `Continuar a gravação` retoma do mesmo bloco. Com a cadeia concluída, o ENCERRAR volta a ser o de cima

Os roteiros provam: `heroi.mjs`, o depois de homologar · `sessao.mjs`, o corte de alimentação pelo endereço do momento, com a legenda de cada passo que corre · `abortada.mjs`, o antes — o ENCERRAR da faixa na pré-checagem, na CAN e no menu, e o `Encerrar a sessão` da folha do módulo, com a legenda de cada um dos 4 passos · `sair.mjs`, os dois diálogos do menu e os destinos deles.

## Os contadores do menu (T04·1, T04·2)

- **no cartão Fila de saída:** o que ainda não chegou ao servidor (tudo o que não foi recebido), só da garagem ativa — na Várzea, 2
- **no diálogo Sair da conta:** o que está na fila, de todas as garagens — 3. As duas contas são diferentes, e a diferença está com o diretor (T04·1)
- **no cartão Finalizar com checklist:** só depois que o checklist foi aberto uma vez na sessão; conta os itens das seções B e E, os que o técnico resolve, ainda não resolvidos — 10 na semente — e some ao homologar (T04·2). A T13 grava a conta em `etapas.checklist.pendentes` a cada item que resolve (C10). **Um item resolvido** é o manual com foto — tirada no checklist, ou herdada da calibração (o Painel, HU-T10-4) — ou com ressalva (não conforme com justificativa, que não bloqueia), o passo de E que a T14 aprovou, e o que não se aplica. Pela conta da T13, a semente do checklist dá 9, porque o Painel já vem herdado; o menu segue com a conta dele (10) até ler `pendentes`
- **a troca de garagem com evidência subindo** (T04/08) abre pela coluna do palco: no fluxo, a semente do menu não tem envio em curso, e a folha abre sem o aviso (T04·3)

## A fila de saída (T15)

- **a fila, num lugar só:** a do mock mais o que a sessão criou, cada item como está (`app/src/estado/fila.js`). A T15 e o menu leem dali, e o item conta igual nas duas
- **`Ressincronizar e reenviar`:** os itens com erro do cartão voltam pra fila — o id entra em `reenviados`, no estado único, e o item passa a *na fila*; o mock fica intocado. O cartão que pede ação sai, porque nada mais precisa do técnico, e a lista sobe pra baixo do cabeçalho, com o item esperando desde o `criadoAs` (na semente, *KJC-7N23 · na fila · há 145 min*). Nenhum vira o *SUBINDO AGORA*: o progresso e o tamanho só existem no f-04 do mock (G25). O contador da T15 não muda; no menu, o diálogo *Sair da conta* vai de 3 pra 4 (T04·1). Sair da tela não desfaz (HU-T15-2), e o `Recomeçar do login` e o pulo do palco zeram
- **a notificação da fila parada** (*Envio parado · 3 itens esperando há 30 min*, HU-T15-6) não se constrói: nenhuma referência a desenha, e ela é do sistema, fora da tela. Os 30 min são o padrão até o PM definir (`pendencias.md`)

O roteiro `app/scripts/caminhos/fila.mjs` prova o reenvio, a ordem da lista e o contador que continua 3, a volta pelo menu com o cartão da Fila de saída igual, e a conta do diálogo (`node scripts/caminho.mjs fila`).

## A escolha do ativo (T06·1 a T06·5)

- **a lista:** os ônibus do pacote da garagem do contexto, na ordem do mock — na Várzea, os 10, com "10 no pacote" (G9). O conteúdo rola; o KNB-5H39 é o nono
- **a ordem das checagens:** ao tocar num ônibus, a confirmação checa o pacote, depois os pinos, depois o chassi (T06·3). O conflito de pinos vale quando o módulo da faixa, o ônibus e o meio da sessão são os do caso; o chassi lido é o do caso de divergência, e nos outros é o do cadastro (T06·2)
- **o que fica gravado:** `Usar este ativo` põe o ativo na sessão e anota em `etapas.ativo` como o vínculo foi provado — `chassi` ou `confirmacao` do técnico — e a hora, 14:30. `Usar leitor sem fio` passa a sessão a sem fio, e o conflito some (T06·4)
- **os casos não se consomem:** a divergência do chassi e o ônibus de outra garagem são fato do cadastro, e valem toda vez que o ônibus é tocado
- **a busca sem resultado (08, a entrega de 25/09, que muda a T06·5):** o vazio declarado fica no lugar da instrução e da lista, com o termo no título, e o `Usar este ativo` espera; o ônibus marcado volta com a lista. A URL diz o `08` enquanto a busca não acha nada. Na T02, o mesmo, no `03`, que só existe no mundo do caso `lista-longa-garagens` (a busca aparece com mais de 6 garagens)

## A releitura da CAN (T08·1, T08·2, T08·3)

- **a ordem da grade:** a dos domínios do mock (`dominiosCan`) e, dentro do domínio, o sinal estático antes do dinâmico; no mais, a ordem de `sinaisCan`. No herói, o Motor põe a Temperatura antes da Rotação, como as referências desenham
- **quantos sinais:** a grade monta os sinais do modelo do ativo da sessão. "doze" e "de 12" são `sinaisCan.length`, por extenso no texto: 12 no herói, 8 num ônibus do ma-02
- **o ritmo:** um sinal responde a cada 600ms, na ordem da grade (`movimento.md`, `ritmos.js`). O valor que volta é o `lido` do sinal estático e o `lidoDinamico` do dinâmico. Quando o ônibus tem caso estático no mock, vale o lido do caso que passa, como na T07 (o hodômetro do QJF-2C61, do PCX-9A17 e do KNB-5H39); a falha que o caso trazia dá lugar ao nominal, porque a releitura é leitura nova e o caso vale uma vez por sessão (G21, como o `Ler novamente` da T07). Ao terminar, o caso fica consumido, e a T07 que abre depois mostra a mesma leitura
- **o que fica gravado:** ao terminar, `etapas.can` fica com `lida` e `refeita`. A T07 aberta por `Ver os dados da CAN` já abre lida (G27). A T16 continua sem a assertiva 4, como as referências desenham (T08·3)
- **ENCERRAR no meio da releitura:** a sessão abortada, como em qualquer tela antes de homologar; a releitura para ali

## A cadeia (T09·1)

- **o ritmo:** um bloco grava e relê a cada 1 s, na ordem do mock (`cadeia.ordem`), e o próximo começa no instante em que o anterior confirma (T09·1)
- **a entrada:** a tela entra no quadro da 00 — três relidos, o Leitor gravando — e anda Leitor → Eventos → Conexão (G27). Quando o par módulo × ativo da faixa é o de um caso da cadeia, ela para no bloco do caso, uma vez por sessão (G21, G28): a recusa de Cercas (`bloco-recusado`) ou a queda no Leitor (`queda-na-cadeia`). `Tentar de novo` e `Reconectar e seguir` retomam do mesmo bloco
- **o que fica gravado:** a cada bloco relido, `etapas.cadeia` fica com quantos confirmaram e a versão composta até ali (HU-T09-8); com os seis, `A12.G07.L02.E05.C03`. A T09 aberta depois disso já abre concluída
- **a saída:** a cadeia concluída tem só `Voltar ao menu`, que leva ao menu, de onde a Calibração segue: nenhuma referência desenha um `Calibrar` (T09-A3, G25)

## A conferência (T11·1, T11·2)

- **o que diverge:** só o par do caso `diff-divergente` (M2C-0438 + ONK-8Q90, a semente do painel), e ele abre na 00 com os cinco blocos não batendo. A T11 aberta pelo menu com a sessão do herói (o par do caso `conferencia-confere`) não acha divergência e vai pro **02, tudo confere** (T11·1). O endereço do 02 monta esse par, com a garagem dele
- **depois de regravar:** `Regravar os cinco blocos` leva à T09; com a cadeia concluída, `etapas.cadeia` registra os seis blocos relidos, e a T11 reaberta com a mesma sessão abre em tudo confere (T11·2)
- **o valor de cada linha:** o que o cadastro manda — o do caso, no par do `diff-divergente`; nos outros, o cadastro do próprio par: a tradução do modelo, as regiões do ativo, o meio da sessão, o intervalo do preset de eventos (G9)
- **a leitura:** ao abrir, as cinco linhas acendem em ordem, uma a cada 400 ms, sobre o desenho do quadro a que ela chega — a 00 quando diverge, o 02 quando confere (G27); num estado da coluna, ela nasce lida
- **o voltar:** faz a saída do rodapé — na 00 e na 01, o `Só registrar o diagnóstico`; no 02, o `Voltar ao menu`
- **o conteúdo que o app não reconhece** (o 01) abre só pela coluna: o par da semente é o mesmo dos dois casos, e a semente abre na 00
- **o que fica gravado:** `Só registrar o diagnóstico` põe em `etapas.conferencia` os blocos que não bateram e a hora, 14:30, e volta ao menu; nenhum item entra na fila (G25)

## O ciclo dinâmico (T14·1 a T14·4)

- **a entrada:** a tela entra no quadro da 01 — a fila do módulo drenando, o prazo cheio, o disparo indisponível (G27). A fila é a de todo módulo (`ciclo.mensagensGuardadas`, 6 e 2) ou, no serial do `modulo-com-pendencias`, a dele (12 e 3), e drena em 3 s; o `Disparar evento de teste` acende
- **o ritmo:** disparado, o prazo de 2:00 anda 4 s por segundo real. A semente traz 2 passos feitos; os passos 3 a 5 acendem a +9, +12 e +15 s do disparo (T14·1, `ritmos.js`). O evento chega aos 24 s do prazo — a 00 é o instante antes, 1:36 — e os campos conferem aos 33 (`6 de 6`, `ciclo.evento.campos`). Chegou, o número passa a ser o tempo que ele levou (0:24), e a barra para no que restava. Os cinco passos e o evento → 05
- **os casos, pelo par da faixa (G28):** o `evento-sem-resposta` (M2C-0335 + KHT-4B08) estoura o prazo na 1ª tentativa, uma vez por sessão (G21), e `Disparar outro evento` confirma na 2ª, com os passos valendo · o `can-fora-esperado` (QJF-2C61) reprova o passo que o sinal prova (`ciclo.passoDoSinal`: velocidade → Movimento detectado) · o `identificador-divergente` (PCX-9A17) acrescenta a linha do teste do cartão, que só existe com o caso (T14·3). Os dois últimos são fato do veículo e do cadastro: valem toda vez
- **as saídas:** `Encerrar o ciclo` fecha a captura, e os pendentes ficam pendentes na Seção E; `Ir para o checklist` sai com o ciclo aberto — os dois → T13 (T14·2). Concluído, `Voltar ao checklist` → T13 e `Voltar ao menu` → T04 (T14·4). `Solicitar correção de cadastro` vira o registro no mesmo lugar, com a hora do protótipo e os dois valores anexados
- **o que fica gravado:** `etapas.ciclo` guarda o par, os passos pelo id do item da Seção E (`aprovada`, `reprovada` ou `pendente`), quantos foram feitos, o evento (`antes`, `disparado`, `recebido`, `conferido` ou `nao-chegou`) e a tentativa, o cartão e a correção pedida (o lido, o esperado e 14:30), se o ciclo concluiu e se a captura foi fechada. Voltar à T14 com o ciclo aberto, no mesmo par, retoma os passos que já valem e a correção; o evento se dispara de novo. Concluído, ela abre concluída

## O checklist (T13·1 a T13·6)

- **cada item lê a etapa que o produziu:** A, a sessão, `etapas.preChecagem` e `etapas.ativo` · B, as fotos e ressalvas do próprio checklist e a foto de `etapas.calibracao` · C, `etapas.can` (o lido do caso do ativo, se não foi consumido, ou o nominal) e a leitura nominal do módulo (`leituraNominalModulo`, AC-13) · D, `etapas.cadeia` e `etapas.calibracao` · E, `etapas.ciclo` · F, a fila desta sessão
- **a semente:** pular pro checklist pelo palco semeia só a sessão; sem a pré-checagem gravada, o checklist lê o que as telas T05 a T10 gravariam no caminho do herói — a pré-checagem aprovada, o chassi pela CAN, a CAN lida, os seis blocos relidos e o hodômetro semeado com a foto. A, C e D resolvidas, o Painel herdado, B e E por fazer, F esperando: 19 de 31, `Faltam 9 itens` (G9 contra o 21 e o 10 das referências, que não contam o Painel nem a regra da Seção F)
- **a Seção F (G22):** conta só os itens da fila do ativo criados depois da abertura da sessão, pelos tipos da fila (AC-14). O que o herói subiu às 09:14 e 09:15 é da instalação de antes, e não conta. Antes do Finalizar, nada desta sessão está na fila, e ela espera. O `Finalizar instalação` gera o relatório (HU-T13-7) — as evidências e o checklist — na fila, às 14:30, e a Seção F conta ele: `12 subiram`, `31 de 31`, o ID na plataforma `na fila`. Ela falha quando o servidor diz que não: o evento de teste que não chegou (T14/02), um item desta sessão recusado, ou o ativo do `pronto-para-fechar`, sem resposta
- **o Finalizar (T13·3):** acende quando A a E estão resolvidas; o toque grava `etapas.checklist.homologada` e a hora, gera o relatório e mostra o homologado (11). Com a Seção F falhando, o toque abre o diálogo da ciência (10); marcado o `Estou ciente`, o Finalizar do diálogo homologa, e a ciência fica gravada com o nome e a hora
- **o que fica gravado:** `etapas.checklist` guarda o ativo, que foi aberto, as fotos tiradas e as ressalvas (a justificativa e a hora), a conta do menu (`pendentes`), se homologou e quando, e a ciência. Voltar ao checklist no mesmo ativo reabre o que foi resolvido; homologado, ele abre no 11
- **os caminhos:** o cartão reprovado leva ao nível do item (09), e `Refazer a leitura da CAN` à T08 (T13·2) · o cartão de E que falta abre a T14 (T13·4), e a Seção E é a mesma se a T14 saiu por `Encerrar o ciclo` ou por `Ir para o checklist` (T14·2): os pendentes ficam pendentes, e o aprovado diz `confere` · `Tirar foto` e `Salvar com ressalva` seguem pro próximo item por fazer; sem próximo, voltam à Seção B · o voltar faz o `Voltar ao menu` no mapa e na seção aberta (T13·6), e o `Voltar ao checklist` no nível do item

## O voltar do Android

O botão de voltar do sistema faz **o mesmo que o link de saída do rodapé** daquela tela — nunca um caminho que a tela não oferece. No protótipo é o Esc do computador, numa peça só pras 16 telas, `useVoltar` (`app/src/estado/voltar.js`): cada tela diz o que ele faz em cada momento, e passa nada onde ele não faz nada.

- **a saída é o link que sai:** o que leva a outra tela, ou ao nível de cima da mesma (a lista, o mapa, a seção). O link que fica no lugar (o `Procurar de novo` da busca da T05, o pedido de correção da T14) ou que avança o fluxo (o `Configurar módulo` da T07 com um sinal reprovado) não é saída, e o voltar não faz nada
- **sem link**, a saída é o primário quando ele é a única saída e só navega: o `Voltar ao menu` da *Sessão encerrada* (T16) e da cadeia concluída (T09/04), o `Ir para o menu` do pacote baixado (T03/02), o `Escolher outro` das travas sem link da T06. O primário que é ato (`Entrar`, `Sincronizar`) não é saída
- **onde a tela não tem saída desenhada** — o login, a escolha da garagem, o menu, a busca da T05 —, ele não faz nada no protótipo (`08-produto-real/pendencias.md`)

Nos processos que não podem parar, ele **não sai**:

- **na cadeia da T09**, antes de a Conexão gravar, ele abre a recuperação; na recuperação, que só oferece `Continuar a gravação`, não faz nada
- **na pré-checagem correndo, na atualização do firmware, no encerramento e no autoteste**, ele não faz nada — o processo termina sozinho em segundos. Terminado o processo, vale a saída do rodapé: a pré-checagem aprovada tem o `Voltar ao menu`, e a reprovada ou parada no caso, o `Procurar outro módulo`. Na *Sessão encerrada*, com o autoteste terminado, ele faz o `Voltar ao menu`, a saída que ela tem (T16)
- **na baixa do pacote (T03) e na releitura da CAN (T08)**, que dizem *não saia da tela* e não têm saída, ele não faz nada
- **na sessão interrompida (T16/06)**, ele não faz nada: `Retomar` e `Descartar` são atos, e o voltar não escolhe no lugar do técnico (T16·6)
- **numa folha ou num diálogo**, ele fecha a folha ou o diálogo, como o X ou o Cancelar. O diálogo sem X nem Cancelar — o *Senha alterada* (T01/09, HU-T01-10) — não fecha, e o voltar não faz nada. O aviso do acesso (T04/12), que também não tem Cancelar, fecha: o `Entendi` só fecha, não é ato, e é a única saída

**Onde ele não escuta:** no print (`?print=1`) e num estado aberto pela coluna do palco, que fica parado e sem toque. Com o painel do palco aberto, o Esc fecha só o painel, que o pega antes (na captura).

| Tela | O que o voltar faz |
|---|---|
| T01 | na entrada (00, 01, 10), nada · no canal, no código e na senha nova (02, 03, 05 a 08, 12, 13), o `Voltar ao login` · na folha *Não recebi o código* (04, 11), fecha, como o X · no diálogo *Senha alterada* (09), nada |
| T02 | nada (00 a 03) |
| T03 | baixando (00), nada · na falha (01), o `Voltar ao contexto` → T02 · baixado (02), o `Ir para o menu` → T04 · no de 4 dias (03), o `Continuar com este pacote` → T04 · no vencido (04), o `Trocar de garagem` → T02 |
| T04 | no menu (00 a 04), nada · numa folha (05, 07, 08, 10, 11), fecha, como o X · no diálogo de sair (06), o `Cancelar`, que volta à folha Conta · no de trocar (09), o `Cancelar` · no aviso do acesso (12, no fluxo), o `Entendi` |
| T05 | na busca (00, 01, 02, 04), nada · no vazio (03), o `Voltar ao menu` · na pré-checagem correndo (05) e na atualização (10), nada · aprovada (05, 13), o `Voltar ao menu` · reprovada ou parada no caso (06 a 09, 11, 12, 14, 15), o `Procurar outro módulo` → a lista (01) |
| T06 | na lista (00), na busca sem resultado (08), no chassi divergente (02) e na correção pedida (07), o `Voltar ao menu` · na confirmação (01, 03) e no conflito com saída (05), o `Escolher outro` → a lista · nas travas sem link (04, 06), o `Escolher outro` do primário → a lista, com a busca como estava (a placa de outro pacote dá o 08) |
| T07 | tudo aprovado (00), o `Voltar ao menu` · com um sinal reprovado (01, 02), nada |
| T08 | antes e depois da releitura (00, 02), o `Voltar ao menu` · relendo (01), nada |
| T09 | correndo (00), recusado (01) e pausado (02), a recuperação (03) · na recuperação, nada · concluída (04), o `Voltar ao menu` |
| T10 | o `Voltar ao menu`, em todo passo (00 a 05, 07, 08, 10) · no meio do semear (*Gravando no módulo…*, *Relendo…*), o `Voltar ao menu` também, e o semear para ali: nada vai pro módulo, e a volta cai no passo com o número e a foto (07), com o `Semear` aceso · na câmera (06), o `Voltar à calibração`, sem foto · na calibração completa (09), sem link, o `Concluir a calibração` → T04 |
| T11 | o que diverge (00, 01), o `Só registrar o diagnóstico` · tudo confere (02), o `Voltar ao menu` |
| T12 | na lista (00, 02, 03), o `Voltar ao menu` · no detalhe (01), o `Voltar às instalações` |
| T13 | no mapa, numa seção aberta e no homologado (00 a 06, 11), o `Voltar ao menu` · no nível do item (07 a 09), o `Voltar ao checklist` · no diálogo da ciência (10), o `Cancelar` |
| T14 | com o ciclo aberto (00 a 03), o `Ir para o checklist` · no ciclo concluído (05), o `Voltar ao menu` · com o caso de identificador correndo (04, 06), nada |
| T15 | o `Voltar ao menu` (00 a 04) |
| T16 | no encerramento (00, 01), no autoteste e na sessão abortando (03), nada · encerrada (02, 04, 05), o `Voltar ao menu` · interrompida (06), nada |

O roteiro `app/scripts/caminhos/voltar.mjs` prova a tabela: cada tela pelo endereço e pelos momentos com saída própria, o Esc e o destino (`node scripts/caminho.mjs voltar`).

## Os cartões em espera

A ferramenta que espera módulo ou ônibus é **desabilitada de verdade**: o toque não faz nada, e o motivo já está escrito no cartão. Pro leitor de tela, ela é desabilitada — nunca um botão que não responde.

## Módulo e ativo travados

Com a sessão aberta, **o módulo e o ativo não trocam** — é a HU-T16-2. Tocar no cartão de qualquer um dos dois, no menu, abre a folha dele: o que está conectado, *Travado na sessão*, e `Encerrar a sessão`, que segue a mesma regra do ENCERRAR da faixa.

## A calibração só semeia com a prova

Na T10, o botão principal só acende com **o número digitado e a foto tirada**, e sempre diz o que falta: *Digite o que o painel mostra* → *Fotografe o painel* → *Semear o hodômetro*. A foto é da **câmera do próprio app** — sem galeria, com a hora, o técnico, o ativo e o módulo carimbados —, e foto tirada fica tirada. Se a releitura passar da tolerância, a tela diz *não confere* e pede `Semear de novo`; a foto continua valendo, porque ela prova o painel. No protótipo, a câmera é simulada: o quadro mostra uma imagem parada e o `Tirar foto` só registra.

No estado único, `etapas.calibracao` guarda, de cada grandeza, o número digitado (`painel`), a foto com o carimbo (`fotos`: a hora, o técnico, o ativo e o módulo) e o semeado com o relido (`semeadas`); `foto` diz que o painel já foi fotografado, e é o que o checklist lê pro Painel da Seção B (HU-T10-4). O semear corre em 1 s gravando e 1 s relendo (`ritmos.js`). A hora da foto e da releitura é a do relógio parado, 14:30 (G9): as referências dizem 14:31 a 14:33.

## O aviso do acesso

No 5º dia da sessão de acesso — `situacao.sessaoAcesso` —, o diálogo *Seu acesso vence em 2 dias* aparece na primeira chegada ao menu, uma vez por dia. O herói está nesse dia, então **ele aparece no caminho feliz**, uma vez; `Recomeçar do login` mostra de novo.

No protótipo, o relógio parado faz do *uma vez por dia* uma vez só:

- **o dia do aviso** vai do `avisoNoDia` até o fim da `validadeDias`, e os dias do título são o que resta, `validadeDias − abertaDiasAtras` — nunca digitados
- **a chegada** é a do menu sem nada por cima, com a sessão ou sem ela: pelo fluxo (depois da sincronização, a do herói) e **pela semente** — o pulo do palco pro menu e o endereço `?tela=T04` também são chegada, e mostram o aviso. Um endereço de folha ou diálogo abre a folha ou o diálogo, e o aviso espera o menu ficar sem nada por cima: a folha termina de descer, e só então ele entra, pelo movimento do próprio diálogo (150)
- **o `Entendi` fecha** e grava no estado único que ele foi visto (`avisoDoAcessoVisto`): o técnico volta ao menu quantas vezes quiser, sai e entra de novo, e ele não volta no mesmo dia. `Recomeçar do login` e o pulo do palco zeram o estado, e ele volta
- **o `Entendi` é o único jeito de fechar**: o diálogo não tem `Cancelar`, e o voltar faz o mesmo que ele (O voltar do Android). O véu cobre o menu inteiro, a tira e a faixa também, e nada atrás dele se toca (T04/12)
- **o estado 12** abre pela coluna com o diálogo aberto, parado e sem toque. **No print**, o aviso só aparece no 12: a foto é o quadro que a referência desenha, e as outras da T04 não desenham ele

## O mundo real

Quatro estados que vêm do celular, e não do módulo nem do ativo. Nenhum trava o que já foi feito.

- **Bluetooth desligado**, na T05 — `Ligar o Bluetooth` pede ao Android, e a busca começa sozinha quando ele liga
- **Bluetooth sem permissão**, na T05 — `Permitir` pede de novo. Se o técnico marcou *não perguntar de novo*, o Android não deixa o app perguntar: o botão vira `Abrir as configurações`
- **câmera sem permissão**, na T10 — o quadro diz o que falta, e o botão vira `Abrir as configurações`. Vale igual pra câmera do checklist
- **login sem conexão**, na T01 — o aviso *SEM CONEXÃO*, e os campos ficam preenchidos, porque a senha não estava errada

A **localização negada** não tem tela: nada trava, e o relatório do checklist sai sem a geolocalização, com a linha dizendo *sem localização*.

## A URL

Todo lugar do protótipo tem endereço: `?tela=T07` abre a tela · `?tela=T07&estado=01-estado-fora-da-faixa` abre o estado. Um link mandado pra alguém abre exatamente o que se quis mostrar.

## O que é provisório

Pendências que não são de desenho seguem um padrão até o PM decidir — a lista e o padrão de cada uma estão em `08-produto-real/pendencias.md`. Se o padrão mudar, é uma linha.

## Como se chega em cada momento

| Referência | Como se chega |
|---|---|
| `T01/02-momento-recuperar-escolher-canal` | `Esqueci a senha` |
| `T01/03-momento-recuperar-digitar-codigo` | escolher o canal |
| `T01/04-momento-nao-recebi-o-codigo` | `Não recebi o código` |
| `T01/05-momento-codigo-errado` | digitar um código diferente de 482913 |
| `T01/08-momento-recuperar-nova-senha` | o código certo |
| `T01/09-momento-senha-alterada` | a nova senha cumpre os seis requisitos |
| `T01/10-momento-senha-visivel` | tocar no olho — a senha aparece por extenso e o olho vira o riscado |
| `T01/11-momento-nao-recebi-reenvio-liberado` | os 60 s do reenvio zeram |
| `T01/12-momento-codigo-reenviado` | tocar em *Conferir e reenviar* |
| `T01/13-momento-codigo-no-e-mail` | tocar em *Mandar para o e-mail* |
| `T02/01-momento-escolhida` | tocar numa garagem |
| `T02/03-momento-busca-sem-resultado` | digitar na busca um nome que não existe |
| `T03/02-momento-concluido` | o download termina |
| `T04/01-momento-sem-modulo` | o menu antes de conectar |
| `T04/02-momento-modulo-sem-ativo` | módulo conectado, ônibus ainda não escolhido |
| `T04/05-momento-folha-conta` | tocar nas iniciais |
| `T04/06-momento-folha-conta-sair-com-sessao-aberta` | `Sair da conta` com sessão ou fila |
| `T04/07-momento-folha-trocar-de-garagem` | tocar no nome da garagem |
| `T04/10-momento-folha-modulo-conectado` | tocar no cartão do módulo com a sessão aberta |
| `T04/11-momento-folha-ativo-da-sessao` | tocar no cartão do ativo com a sessão aberta |
| `T05/01-momento-nenhum-escolhido` | a busca achou, nada tocado ainda |
| `T05/02-momento-um-encontrado` | só um módulo por perto |
| `T05/05-momento-pre-checagem` | conectado |
| `T05/10-momento-atualizando-o-firmware` | `Atualizar firmware` |
| `T06/01-momento-confirmar-o-veiculo` | tocar num ônibus |
| `T06/07-momento-correcao-solicitada` | tocar em `Solicitar correção de cadastro` no chassi divergente |
| `T06/08-momento-busca-sem-resultado` | digitar na busca uma placa que não existe |
| `T08/01-momento-relendo` | `Refazer a leitura` |
| `T08/02-momento-concluida` | a releitura termina |
| `T09/04-momento-cadeia-concluida` | o último bloco relido |
| `T10/01-momento-hodometro-semeado` | `Semear o hodômetro` |
| `T10/05-momento-hodometro-digitado` | digitar o valor do painel |
| `T10/06-momento-camera-do-painel` | tocar em `Fotografar o painel` |
| `T10/07-momento-painel-fotografado` | `Tirar foto` |
| `T10/08-momento-horimetro` | `Calibrar o horímetro` |
| `T10/09-momento-calibracao-completa` | `Semear o horímetro`, com a releitura conferindo |
| `T11/02-momento-tudo-confere` | nada diverge: pelo menu, com a sessão do herói, ou depois de regravar pela T09 (T11·1, T11·2) |
| `T12/01-momento-detalhe-da-instalacao` | tocar numa instalação |
| `T13/01-momento-a-identificacao-aberta` | tocar na seção |
| `T13/02-momento-b-montagem-aberta` | tocar na seção |
| `T13/03-momento-c-hardware-aberta` | tocar na seção |
| `T13/04-momento-d-configuracao-aberta` | tocar na seção |
| `T13/05-momento-e-teste-dinamico-aberta` | tocar na seção |
| `T13/06-momento-f-servidor-aberta` | tocar na seção |
| `T13/07-momento-responder-item` | tocar num item manual |
| `T13/08-momento-nao-conforme-com-justificativa` | marcar não conforme |
| `T13/11-momento-homologado` | tocar em `Finalizar instalação`, com A a E resolvidas (T13·3) |
| `T14/01-momento-antes-do-disparo` | a fila do módulo ainda drenando |
| `T14/05-momento-ciclo-concluido` | os cinco passos e o evento |
| `T14/06-momento-correcao-solicitada` | tocar em `Solicitar correção de cadastro` no identificador divergente |
| `T16/01-momento-pede-o-corte-de-alimentacao` | o passo do corte |
| `T16/02-momento-sessao-encerrada` | o autoteste passa |
| `T16/03-momento-encerrando-sem-homologar` | ENCERRAR antes de homologar |
| `T16/04-momento-encerrada-sem-homologar` | os 4 passos terminam |

## O que causa cada estado

**Todo estado abre pela coluna do palco**, montado pelo caso do mock. Os que têm porta natural abrem também tocando.

| Referência | O que causa | Caso do mock |
|---|---|---|
| `T01/01-estado-usuario-ou-senha-incorretos` | Entrar com senha de menos de 8 caracteres · a senha é apagada e o cursor vai pra ela; o usuário fica | `credenciais` |
| `T01/06-estado-codigo-expirado` | o código passa de 10 minutos | `recuperacao.limites.validadeMin` |
| `T01/07-estado-tentativas-esgotadas` | o terceiro código errado | `recuperacao.limites.tentativas` |
| `T01/14-estado-login-sem-conexao` | `Entrar` sem internet | `sem-conexao-no-login` |
| `T02/02-estado-lista-longa-com-busca` | a empresa tem mais de 6 garagens — a busca aparece, e a lista rola por baixo do rodapé | `lista-longa-garagens` |
| `T03/01-estado-falha-de-rede` | a rede cai no meio do download | `sync-falha-rede` |
| `T03/03-estado-pacote-de-4-dias` | o pacote tem entre 3 e 7 dias | `pacotes · pac-uo-02` |
| `T03/04-estado-pacote-vencido` | o pacote passou de 7 dias | `pacotes · pac-uo-03` |
| `T04/03-estado-faixa-modulo-com-falha` | o módulo da sessão perde o link | `link-perdido` |
| `T04/04-estado-checklist-pendente` | o checklist tem itens abertos | `checklist` |
| `T04/08-estado-folha-trocar-de-garagem-envio-em-andamento` | trocar com evidência subindo | `filaSaida` |
| `T04/09-estado-folha-trocar-de-garagem-com-modulo-conectado` | trocar com a sessão aberta | derivado do fluxo |
| `T04/12-estado-acesso-vencendo` | a sessão de acesso chega ao 5º dia: o diálogo aparece uma vez por dia, na primeira chegada ao menu | `situacao.sessaoAcesso` |
| `T05/03-estado-nenhum-encontrado` | nenhum módulo responde | `busca-vazia` |
| `T05/04-estado-conexao-falhou` | o módulo não responde ao conectar | `conexao-falha` |
| `T05/06-estado-pre-checagem-serial-nao-cadastrado` | o serial não está no cadastro | `serial-nao-cadastrado` |
| `T05/07-estado-pre-checagem-modelo-sem-driver` | o modelo não tem driver | `modelo-sem-driver` |
| `T05/08-estado-pre-checagem-firmware-fora-da-matriz` | o firmware não é homologado | `firmware-fora-matriz` |
| `T05/09-estado-firmware-fora-sem-rede-no-modulo` | firmware fora e o módulo sem rede | `firmware-fora-matriz` + `firmware-fora-sem-rede` (o modem sem rede, C7) |
| `T05/11-estado-pre-checagem-conteudo-nao-cabe` | a configuração não cabe no módulo | `conteudo-nao-cabe` |
| `T05/12-estado-pre-checagem-pool-de-cercas-esgotado` | as cercas passam do limite | `pool-esgotado` |
| `T05/13-estado-pre-checagem-canal-aberto-e-pendencias` | o módulo tem canal de sessão anterior — o app fecha antes de começar | `canal-aberto` + `modulo-com-pendencias` |
| `T05/14-estado-pre-checagem-link-perdido-na-6a` | o link cai na sexta checagem | `link-perdido` |
| `T05/15-estado-pre-checagem-modulo-em-repouso-na-9a` | o módulo dorme na nona checagem — não é erro | `modulo-em-repouso` |
| `T05/16-estado-bluetooth-desligado` | o Bluetooth do celular está desligado | `bluetooth-desligado` |
| `T05/17-estado-bluetooth-sem-permissao` | o técnico negou a permissão do Bluetooth | `bluetooth-sem-permissao` |
| `T06/02-estado-chassi-divergente` | o chassi lido não bate | `divergencia-chassi` |
| `T06/03-estado-sem-chassi-na-can` | o modelo não manda chassi | `modelosAtivo · ma-02 · chassiPelaCan: false` |
| `T06/04-estado-fora-do-pacote` | o ônibus não está no pacote | `ativo-fora-pacote` |
| `T06/05-estado-conflito-de-pinos-resolvivel` | pinos ocupados, com saída | `conflito-pinos-resolvivel` |
| `T06/06-estado-conflito-de-pinos-sem-saida` | pinos ocupados, sem saída | `conflito-pinos-sem-saida` |
| `T07/01-estado-fora-da-faixa` | um sinal fora do esperado | `can-estatico-isolado` |
| `T07/02-estado-sem-leitura` | um sinal não chega | `can-estatico-ausente` |
| `T07/03-estado-dominio-mudo` | um domínio inteiro calado | `can-estatico-dominio` |
| `T09/01-estado-bloco-recusado` | o módulo recusa um bloco | `bloco-recusado` |
| `T09/02-estado-queda-na-cadeia` | o link cai no meio da cadeia | `queda-na-cadeia` |
| `T09/03-estado-recuperacao-ate-a-conexao-gravar` | tentar sair antes da Conexão gravar | derivado do fluxo |
| `T10/02-estado-rotacao-caminhao-coletor` | o modelo calibra rotação e velocidade | `calibracao.porModelo · ma-02 · KNB-5H39` |
| `T10/03-estado-ja-semeado` | o hodômetro já foi semeado antes | `calibracao` |
| `T10/04-estado-modulo-sem-pulsos` | o módulo não recebe pulsos | `grandeza-indisponivel` |
| `T10/10-estado-releitura-nao-confere` | a releitura passa da tolerância: 500 m a menos, e o limite é a granularidade mais o decorrido do mock, 100 + 40 = 140 m (HU-T10-5; o comentário do caso diz 120 m, e os dois dão *não confere*: vai pro arquiteto) | `releitura-nao-confere` |
| `T10/11-estado-camera-sem-permissao` | o técnico negou a permissão da câmera | `camera-sem-permissao` |
| `T11/01-estado-conteudo-que-o-app-nao-reconhece` | índice que o app não classifica | `indice-nao-classificado` |
| `T12/02-estado-nenhuma-instalacao` | a garagem não tem instalações | `instalacoes` + `instalacoes-vazia` (a consulta da garagem que volta vazia, sem sessão, C11) |
| `T12/03-estado-sem-rede` | a consulta sem rede | `instalacoes-sem-rede` |
| `T13/09-estado-item-reprovado` | um item automático reprova — a bateria abaixo do mínimo, na CAN | `can-estatico-isolado` (T13-A1) |
| `T13/10-estado-finalizar-com-a-secao-f-falhando` | `Finalizar` com a Seção F falhando — o servidor não respondeu | `pronto-para-fechar` (T13-A2) |
| `T14/02-estado-prazo-estourado` | o evento não chega em 2:00 | `evento-sem-resposta` |
| `T14/03-estado-dinamico-fora-do-esperado` | um sinal andando fora do esperado | `can-fora-esperado` |
| `T14/04-estado-identificador-divergente` | o cartão lido não bate | `identificador-divergente` |
| `T15/01-estado-sem-erro` | a fila sem erros | `filaSaida` |
| `T15/02-estado-dois-erros` | dois itens recusados | `filaSaida` |
| `T15/03-estado-fila-vazia` | nada esperando envio | `filaSaida` |
| `T15/04-estado-secao-f-em-re-checagem` | a Seção F esperando o servidor | `secaoF · RVM-1E54` |
| `T16/05-estado-assertiva-falhando` | uma assertiva falha | `autoteste-falhando` |
| `T16/06-estado-sessao-interrompida` | a sessão caiu e volta oferecida | `sessao-interrompida` |
