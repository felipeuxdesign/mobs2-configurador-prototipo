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
situacao     o que é do celular: a rede, a sessão de acesso, o usuário que ele lembra (usuarioLembrado) e se o Entrar já entrou (jaEntrou)
tela         onde o app está · momento ou estado aberto
```

**A sessão nasce na pré-checagem aprovada** — é aí que a faixa desce. E morre no encerramento, quando a faixa sobe.

## O começo

O protótipo abre no **login, às 14:30, com o Rafael Vieira**, na T01/00: o usuário e a senha vêm preenchidos, pro palco andar num toque; qualquer senha com 8 caracteres ou mais entra. Com menos, aparece o erro. O `Entrar` diz o que falta enquanto o técnico apaga e digita — *Digite o usuário* → *Digite a senha* → `Entrar` —, apagado e desabilitado de verdade enquanto falta (a lei 17), e o foco vai pro primeiro campo vazio.

**O usuário lembrado** (HU-T01-3, a otimização do design): o celular guarda só o identificador, nunca a senha — no estado único, `situacao.usuarioLembrado`, que o palco começa sem nenhum. O `Entrar` que entra com *Lembrar meu usuário* marcado guarda o usuário; desmarcado, não guarda nada. E, dali em diante (`situacao.jaEntrou`), o login só traz o que o celular lembra — a T01/00, com os dois campos preenchidos, é só o começo do palco, e cada pulo do palco recomeça nela. Saindo da conta (T04), o login volta com ele lembrado: o xis dentro do campo, a caixa marcada, a senha vazia e o foco nela, e o `Entrar` dizendo *Digite a senha* — o quadro da T01/16; sem ninguém lembrado — o técnico não marcou Lembrar —, o quadro da T01/15: os dois campos vazios, a caixa desmarcada, o foco no usuário e *Digite o usuário*. A senha nunca fica. O xis limpa o campo e esquece o usuário lembrado, o cursor vai pro usuário, e a caixa fica como o técnico deixou: marcada, entrar de novo lembra de novo. As duas referências de quem abre o app — nada lembrado (15, o caso `primeiro-acesso`) e o usuário lembrado (16, o `usuario-lembrado`) — abrem pela coluna, montadas pelo caso, paradas e sem toque. As regras são funções puras em `app/src/telas/T01/regras.js` (`oQueFalta`, `entradaDoLembrado`, `entradaDoFluxo`, `depoisDoXis`, `lembradoDepoisDoEntrar`), provadas no node (`node scripts/testar-login-e-bluetooth.mjs`); o toque, no roteiro `lembrar.mjs`: marcar, entrar, sair, o xis, entrar de novo lembrado, desmarcar, e o login seguinte sem ninguém lembrado

## O caminho do herói

```
login → garagem Várzea → sincroniza o pacote → menu, com o aviso do acesso na primeira chegada (Entendi)
→ conectar: acha cinco módulos (o do herói e mais quatro), escolhe o M2C-0417, conecta, a pré-checagem acende as onze linhas → a faixa desce
→ o ônibus RKT-8H42 → os chassis batem → a CAN lida → a cadeia grava e relê os blocos → calibra o hodômetro e o horímetro, com a prova: o número do painel e a foto
→ o ciclo dinâmico: os cinco passos sozinhos, o evento chega → o checklist fecha → ENCERRAR → a faixa sobe → menu sem sessão
```

O roteiro `app/scripts/caminhos/heroi.mjs` prova o caminho só por toque, do login ao menu sem sessão, sem pulo do palco (`node scripts/caminho.mjs heroi`, 201 passos). Na primeira chegada ao menu, o roteiro vê o aviso do acesso nascer parado, com o menu atrás sem toque, e toca `Entendi`; na volta ao menu sem sessão, no fim, o aviso não aparece de novo. Na calibração, o roteiro digita o número do painel do mock, fotografa e semeia — o botão dizendo o que falta, e o *Gravando no módulo…* e o *Relendo…* no ritmo —, no hodômetro e no horímetro, com o `Voltar ao menu` e o `ENCERRAR` desabilitados enquanto o semear corre; a calibração completa aponta o ciclo, e o `Fazer o ciclo dinâmico` abre a T14 (decisão 35: calibra, ciclo, checklist, em linha); o `Voltar ao checklist` do ciclo concluído leva ao checklist, em 24 de 31 e com a E resolvida (a E aberta, o 13, e fechada de novo), e o checklist fecha com as quatro fotos de B — a B cresce no lugar, e o Painel vem herdado da calibração — e o `Finalizar instalação`, com o veredito e o relatório no topo.

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
- **nos processos, o ENCERRAR faz o mesmo que o voltar do Android.** Onde o voltar não faz nada — a pré-checagem correndo, a releitura da CAN, o semear da T10 —, o ENCERRAR fica desabilitado e em tinta apagada (lei 17). Na cadeia da T09, antes de a Conexão gravar, ele abre a recuperação, como o voltar. No encerramento da T16, a faixa já não mostra o ENCERRAR
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
- **a busca que acha e esconde a escolha (decisão do diretor, 25/09, b):** enquanto a busca esconde o ônibus marcado (T06) ou a garagem escolhida (T02) — sem resultado, ou achando outros —, o primário espera; a escolha fica guardada e, quando a busca a mostra de novo, ela volta marcada e o primário acende. Na T06, o `Usar este ativo` apagado; na T02, o `Escolha uma garagem` apagado, como a `03` desenha, e o `Sincronizar Garagem X` volta com ela. O roteiro `busca.mjs` prova as duas

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

- **o que diverge:** só o par do caso `diff-divergente` (M2C-0438 + ONK-8Q90, a semente do painel), e ele abre na 00 com os cinco blocos não batendo — cada um com o par: *no módulo*, o `noModulo` do caso, e *no cadastro*, o `noCadastro`. A T11 aberta pelo menu com a sessão do herói (o par do caso `conferencia-confere`) não acha divergência e vai pro **02, tudo confere** (T11·1). O endereço do 02 monta esse par, com a garagem dele
- **depois de regravar:** `Regravar os cinco blocos` leva à T09; com a cadeia concluída, `etapas.cadeia` registra os seis blocos relidos, e a T11 reaberta com a mesma sessão abre em tudo confere (T11·2)
- **o valor de cada linha:** o que o cadastro manda — o do caso, no par do `diff-divergente`; nos outros, o cadastro do próprio par: a tradução do modelo, as regiões do ativo, o meio da sessão, o intervalo do preset de eventos (G9)
- **a leitura:** ao abrir, sobre o desenho do quadro a que ela chega — a 00 quando diverge, o 02 quando confere (G27) —, cada bloco entra com o relógio no poço e vira check ou xis, um a cada 400 ms; o que o módulo tem espera a leitura chegar no bloco. **O veredito espera a última linha** (a decisão do diretor de 25/09, C12·35 b): o cabeçalho com a contagem e, no 02, o *igual à do cadastro* ficam no lugar e entram esmaecendo quando a quinta linha acende. Num estado da coluna, e no print, ela nasce lida
- **o voltar:** faz a saída do rodapé — na 00 e na 01, o `Só registrar o diagnóstico`; no 02, o `Voltar ao menu`
- **o conteúdo que o app não reconhece** (o 01) abre só pela coluna, com o caso `indice-nao-classificado`: os cinco blocos conferem, e o cabeçalho diz *NÃO BATE COM O CADASTRO · 1 a mais* — um conteúdo fora de todos os blocos, a posição que o caso traz. O par da semente é o mesmo dos dois casos, e a semente abre na 00
- **o que fica gravado:** `Só registrar o diagnóstico` põe em `etapas.conferencia` os blocos que não bateram e a hora, 14:30, e volta ao menu; nenhum item entra na fila (G25)

## O ciclo dinâmico (T14·1 a T14·4)

- **a entrada:** a tela entra no quadro da 01 — a fila do módulo drenando, o prazo cheio, o disparo indisponível (G27). A fila é a de todo módulo (`ciclo.mensagensGuardadas`, 6 e 2) ou, no serial do `modulo-com-pendencias`, a dele (12 e 3), e drena em 3 s; o `Disparar evento de teste` acende
- **o ritmo:** disparado, o prazo de 2:00 anda 4 s por segundo real. A semente traz 2 passos feitos; os passos 3 a 5 acendem a +9, +12 e +15 s do disparo (T14·1, `ritmos.js`). O evento chega aos 24 s do prazo — a 00 é o instante antes, 1:36 — e os campos conferem aos 33 (`6 de 6`, `ciclo.evento.campos`). Chegou, o número passa a ser o tempo que ele levou (0:24), e a barra para no que restava. Os cinco passos e o evento → 05
- **os casos, pelo par da faixa (G28):** o `evento-sem-resposta` (M2C-0335 + KHT-4B08) estoura o prazo na 1ª tentativa, uma vez por sessão (G21), e `Disparar outro evento` confirma na 2ª, com os passos valendo · o `can-fora-esperado` (QJF-2C61) reprova o passo que o sinal prova (`ciclo.passoDoSinal`: velocidade → Movimento detectado) · o `identificador-divergente` (PCX-9A17) acrescenta a linha do teste do cartão, que só existe com o caso (T14·3). Os dois últimos são fato do veículo e do cadastro: valem toda vez
- **as saídas:** `Encerrar o ciclo` fecha a captura, e os pendentes ficam pendentes na Seção E; `Ir para o checklist` sai com o ciclo aberto — os dois → T13 (T14·2). Concluído, `Voltar ao checklist` → T13 e `Voltar ao menu` → T04 (T14·4). `Solicitar correção de cadastro` vira o registro no mesmo lugar, com a hora do protótipo e os dois valores anexados
- **o que fica gravado:** `etapas.ciclo` guarda o par, os passos pelo id do item da Seção E (`aprovada`, `reprovada` ou `pendente`), quantos foram feitos, o evento (`antes`, `disparado`, `recebido`, `conferido` ou `nao-chegou`) e a tentativa, o cartão e a correção pedida (o lido, o esperado e 14:30), se o ciclo concluiu e se a captura foi fechada. Voltar à T14 com o ciclo aberto, no mesmo par, retoma os passos que já valem e a correção; o evento se dispara de novo. Concluído, ela abre concluída

## O checklist (T13·1 a T13·6)

- **uma estrutura só (a entrega do checklist, decisão 34):** o título com a contagem, a barra fina — o lima é o que já passou; o número fica no título — e os seis cartões de seção de 58, a 8, cada um com o veredito no poço, o nome, quem age, a contagem e a seta. Uma seção aberta por vez: tocar num cartão faz ele crescer no lugar, com a seta pra cima, e os itens entram embaixo da cabeça; tocar em outro troca, e tocar no aberto fecha. As seções de baixo descem por transform e os itens esmaecem, em 200 ms; nada mais se mexe, e a rolagem fica onde está (a 06 desenha a F aberta cortada no pé, na rolagem 0). Nascer aberta (a URL, a coluna, o print) não anima (`SecoesDoChecklist`, `SecaoDoChecklist`)
- **quem age, embaixo do nome:** A, C e D, *o app confere sozinho*, e *o app conferiu* no homologado · B, *você fotografa N itens* (as fotos por fazer) e, sem nenhuma por fazer, *N fotos tiradas* (as tiradas aqui e a herdada da calibração) · E, *você faz o ciclo em movimento*, e *o ciclo passou* com os cinco passos · F, *espera o servidor · não bloqueia*, e *o servidor confirmou* com os três. Com 1, o plural do `textos.md` não existe, e o cartão fica só com o nome (G25, como o `Faltam`)
- **tem seta, toca; sem seta, é leitura (Lei 16):** a foto por fazer, com a câmera e *foto a tirar*, abre a câmera do app (07) · o automático que falta leva à tela que resolve, pelo `origem` do mock — conectar → T05 · ativo → T06 · can → T08 · configurar → T09 · calibração → T10 —, com o ícone da ferramenta e *a fazer* (nenhuma referência desenha esse item: no caminho do herói nada falta em A, C e D) · o que reprovou com a leitura (a bateria) abre o nível do item (09) · na E, uma ação só, *Fazer o ciclo dinâmico* · *os 5 passos, com o ônibus em movimento* → T14, enquanto falta passo. Sem seta: as leituras de A, C e D, o feito, a ressalva, os passos da E e a F, que não tem ação
- **o que cada item diz:** A, o serial, o firmware, a placa e o chassi *confere* · B, o Painel *fotografado na calibração, às 14:30* (a hora da foto da T10, o relógio parado), a ressalva *com ressalva · a causa* (a primeira oração da justificativa, com a minúscula: *suporte trincado*), e a foto tirada aqui só com o nome — nenhum texto aprovado diz de onde ela veio (G25) · C, o lido da CAN (*13,8 V*, *9 satélites*), *conforme* nas entradas e *sinal bom* no modem, sem o dBm · D, *feita*, a tradução do modelo (*urbano v3*), a cerca (*G07*), *gravados*, o intervalo do preset de eventos do modelo (*intervalo 30 s*), *atual*, *gravado*, a versão gravada inteira e o painel semeado (*482.317 km*, *9.640 h*) · E, *confere* ou *a fazer* · F, *espera o envio*
- **cada item lê a etapa que o produziu:** A, a sessão, `etapas.preChecagem` e `etapas.ativo` · B, as fotos e ressalvas do próprio checklist e a foto de `etapas.calibracao` · C, `etapas.can` (o lido do caso do ativo, se não foi consumido, ou o nominal) e a leitura nominal do módulo (`leituraNominalModulo`, AC-13) · D, `etapas.cadeia` e `etapas.calibracao` · E, `etapas.ciclo` · F, a fila desta sessão
- **a semente:** pular pro checklist pelo palco semeia só a sessão; sem a pré-checagem gravada, o checklist lê o que as telas T05 a T10 gravariam no caminho do herói — a pré-checagem aprovada, o chassi pela CAN, a CAN lida, os seis blocos relidos e o hodômetro semeado com a foto. A, C e D resolvidas, o Painel herdado, B e E por fazer, F esperando: 19 de 31, `Faltam 9 itens`, como a entrega de 25/09 desenha. No caminho do herói, o checklist abre depois do ciclo: 24 de 31, `Faltam 4 itens` (13)
- **a Seção F (G22):** conta só os itens da fila do ativo criados depois da abertura da sessão, pelos tipos da fila (AC-14). O que o herói subiu às 09:14 e 09:15 é da instalação de antes, e não conta. Antes do Finalizar, nada desta sessão está na fila, e ela espera. O `Finalizar instalação` gera o relatório (HU-T13-7) — as evidências e o checklist — na fila, às 14:30, e a Seção F conta ele: 3 de 3, *o servidor confirmou*. Aberta assim, nenhuma referência a desenha, e os itens ficam com os valores do C10, do mock: `12 subiram`, `31 de 31`, o ID na plataforma `na fila` (G25). Ela falha quando o servidor diz que não: o evento de teste que não chegou (T14/02), um item desta sessão recusado, ou o ativo do `pronto-para-fechar`, sem resposta — o X na seção e nos três itens
- **o Finalizar (T13·3):** acende quando A a E estão resolvidas; o toque grava `etapas.checklist.homologada` e a hora, gera o relatório e mostra o homologado (11): o veredito no topo, embaixo da barra — *Instalação homologada às 14:30* e *o relatório leva 12 evidências, o local e o seu nome* (`checklist.evidencias`) —, que esmaece no lugar em 150 ms, e o `Encerrar sessão` no rodapé. Com a localização negada (14, o caso `localizacao-negada`), o relatório diz *o relatório vai sem localização*; nada no mock nega a localização no fluxo, e o 14 só abre pela coluna, parado. Com a Seção F falhando, o toque abre o diálogo da ciência (10); marcado o `Estou ciente`, o Finalizar do diálogo homologa, e a ciência fica gravada com o nome e a hora
- **o que fica gravado:** `etapas.checklist` guarda o ativo, que foi aberto, as fotos tiradas e as ressalvas (a justificativa e a hora), a conta do menu (`pendentes`), se homologou e quando, e a ciência. Voltar ao checklist no mesmo ativo reabre o que foi resolvido; homologado, ele abre no 11
- **a URL de cada quadro:** as seções fechadas, a tela (00), ou o 11 no homologado · a seção aberta, o momento dela (01 a 06), a B com ressalva no 12 e a E resolvida no 13; homologado, a seção aberta não tem referência, e a URL sai do momento. Aberto pela URL, o quadro é o fluxo depois dos toques que levam lá (G20), e grava o que eles gravariam: o 11, as fotos de B, o ciclo e o Finalizar; o 12, o primeiro item de B salvo com a ressalva de exemplo (`checklist.exemploJustificativa`); o 13, o ciclo que a T14 fecha (`etapas.ciclo` concluído)
- **o nível do item:** o rótulo de topo é o título longo da seção que o técnico faz (*B · INSTALAÇÃO FÍSICA*, 07 e 08) e o nome curto da que o app confere (*C · HARDWARE*, 09) — é o que as referências da entrega desenham, e vai pro arquiteto
- **os caminhos:** o item reprovado leva ao nível do item (09), e `Refazer a leitura da CAN` à T08 (T13·2) · a ação da E abre a T14 (T13·4), e a Seção E é a mesma se a T14 saiu por `Encerrar o ciclo` ou por `Ir para o checklist` (T14·2): os pendentes ficam *a fazer*, o aprovado diz `confere`, e a ação continua · `Tirar foto` e `Salvar com ressalva` seguem pro próximo item por fazer; sem próximo, voltam à Seção B aberta · o voltar faz o `Voltar ao menu` nas seções e no homologado (T13·6), e o `Voltar ao checklist` no nível do item

O roteiro `app/scripts/caminhos/checklist.mjs` prova a estrutura por toque (`node scripts/caminho.mjs checklist`): nascer aberta sem animar, a seção que cresce e fecha com o movimento conferido, a troca de uma aberta pra outra, o reduzir movimento, os quadros 11, 12 e 13 pela URL, a foto por fazer que abre a câmera, e a ação da E que abre a T14.

## O voltar do Android

O botão de voltar do sistema faz **o mesmo que o link de saída do rodapé** daquela tela — nunca um caminho que a tela não oferece. No protótipo é o Esc do computador, numa peça só pras 16 telas, `useVoltar` (`app/src/estado/voltar.js`): cada tela diz o que ele faz em cada momento, e passa nada onde ele não faz nada.

- **a saída é o link que sai:** o que leva a outra tela, ou ao nível de cima da mesma (a lista, o mapa, a seção). O link que fica no lugar (o `Procurar de novo` da busca da T05, o pedido de correção da T14) ou que avança o fluxo (o `Configurar módulo` da T07 com um sinal reprovado) não é saída, e o voltar não faz nada
- **sem link**, a saída é o primário quando ele é a única saída e só navega: o `Voltar ao menu` da *Sessão encerrada* (T16) e da cadeia concluída (T09/04), o `Ir para o menu` do pacote baixado (T03/02), o `Escolher outro` das travas sem link da T06. O primário que é ato (`Entrar`, `Sincronizar`) não é saída
- **onde a tela não tem saída desenhada** — o login, a escolha da garagem, o menu, a busca da T05 —, ele não faz nada no protótipo (`08-produto-real/pendencias.md`)

Nos processos que não podem parar, ele **não sai**:

- **na cadeia da T09**, antes de a Conexão gravar, ele abre a recuperação; na recuperação, que só oferece `Continuar a gravação`, não faz nada
- **na pré-checagem correndo, na atualização do firmware, no encerramento e no autoteste**, ele não faz nada — o processo termina sozinho em segundos. Terminado o processo, vale a saída do rodapé: a pré-checagem aprovada tem o `Voltar ao menu`, e a reprovada ou parada no caso, o `Procurar outro módulo`. Na *Sessão encerrada*, com o autoteste terminado, ele faz o `Voltar ao menu`, a saída que ela tem (T16)
- **na baixa do pacote (T03) e na releitura da CAN (T08)**, que dizem *não saia da tela* e não têm saída, ele não faz nada
- **no semear da calibração (T10)**, nos 2 s de *Gravando no módulo…* e *Relendo…*, ele não faz nada: o semear grava no módulo, e parar no meio deixaria o valor pela metade (a decisão do diretor de 25/09). O `Voltar ao menu` fica no lugar, desabilitado de verdade e em `--tinta-apagada` (Nenhum botão aceso que não faz nada, regra 12, e a lei 17), e o `ENCERRAR` também, como na releitura da T08 (logo abaixo). Terminado o semear, valem o `Voltar ao menu` e o `ENCERRAR` de novo
- **na sessão interrompida (T16/06)**, ele não faz nada: `Retomar` e `Descartar` são atos, e o voltar não escolhe no lugar do técnico (T16·6)
- **numa folha ou num diálogo**, ele fecha a folha ou o diálogo, como o X ou o Cancelar. O diálogo sem X nem Cancelar — o *Senha alterada* (T01/09, HU-T01-10) — não fecha, e o voltar não faz nada. O aviso do acesso (T04/12), que também não tem Cancelar, fecha: o `Entendi` só fecha, não é ato, e é a única saída

**O `ENCERRAR` da faixa faz o mesmo que o voltar** (a lei 17, decisão do diretor de 25/09): antes de a Conexão gravar, na cadeia da T09, ele abre a recuperação; onde o voltar não faz nada — a releitura da CAN (T08/01), o semear da calibração (T10) e a própria recuperação da T09 (T09/03) —, ele fica desabilitado de verdade, em `--tinta-apagada`, sem o pressionado, e o motivo já está escrito na tela (a peça: `Faixa`, `acaoDesabilitada`). Na pré-checagem correndo a faixa ainda não existe (ela desce quando a sessão nasce), e no encerramento da T16 ela não mostra o `ENCERRAR`: ali nada muda.

**Onde ele não escuta:** no print (`?print=1`) e num estado aberto pela coluna do palco, que fica parado e sem toque. Com o painel do palco aberto, o Esc fecha só o painel, que o pega antes (na captura).

| Tela | O que o voltar faz |
|---|---|
| T01 | na entrada (00, 01, 10, 14, 15, 16, e a entrada depois de sair da conta, com o usuário lembrado ou sem ele, no fluxo), nada · no canal, no código e na senha nova (02, 03, 05 a 08, 12, 13), o `Voltar ao login` · na folha *Não recebi o código* (04, 11), fecha, como o X · no diálogo *Senha alterada* (09), nada |
| T02 | nada (00 a 03) |
| T03 | baixando (00), nada · na falha (01), o `Voltar ao contexto` → T02 · baixado (02), o `Ir para o menu` → T04 · no de 4 dias (03), o `Continuar com este pacote` → T04 · no vencido (04), o `Trocar de garagem` → T02 |
| T04 | no menu (00 a 04), nada · numa folha (05, 07, 08, 10, 11), fecha, como o X · no diálogo de sair (06), o `Cancelar`, que volta à folha Conta · no de trocar (09), o `Cancelar` · no aviso do acesso (12, no fluxo), o `Entendi` |
| T05 | na busca (00, 01, 02, 04), nada · no vazio (03), o `Voltar ao menu` · na pré-checagem correndo (05) e na atualização (10), nada · aprovada (05, 13), o `Voltar ao menu` · reprovada ou parada no caso (06 a 09, 11, 12, 14, 15), o `Procurar outro módulo` → a lista (01) · sem Bluetooth ou sem a permissão (16, 17), o `Voltar ao menu` |
| T06 | na lista (00), na busca sem resultado (08), no chassi divergente (02) e na correção pedida (07), o `Voltar ao menu` · na confirmação (01, 03) e no conflito com saída (05), o `Escolher outro` → a lista · nas travas sem link (04, 06), o `Escolher outro` do primário → a lista, com a busca como estava (a placa de outro pacote dá o 08) |
| T07 | tudo aprovado (00), o `Voltar ao menu` · com um sinal reprovado (01, 02), nada |
| T08 | antes e depois da releitura (00, 02), o `Voltar ao menu` · relendo (01), nada |
| T09 | correndo (00), recusado (01) e pausado (02), a recuperação (03) · na recuperação, nada · concluída (04), o `Voltar ao menu` |
| T10 | o `Voltar ao menu`, em todo passo (00 a 05, 07, 08, 10) e na calibração completa (09), embaixo do `Fazer o ciclo dinâmico` · no meio do semear (*Gravando no módulo…*, *Relendo…*), nada: o semear não para, e o `Voltar ao menu` fica desabilitado (a decisão do diretor de 25/09) · na câmera (06, e a mesma câmera sem a permissão, a 11, que no fluxo não tem endereço), o `Voltar à calibração`, sem foto |
| T11 | o que diverge (00, 01), o `Só registrar o diagnóstico` · tudo confere (02), o `Voltar ao menu` |
| T12 | na lista (00, 02, 03), o `Voltar ao menu` · no detalhe (01), o `Voltar às instalações` |
| T13 | nas seções, fechadas ou com uma aberta, e no homologado (00 a 06, 11 a 13), o `Voltar ao menu` · no nível do item (07 a 09, e o item com a câmera sem a permissão, que não tem endereço), o `Voltar ao checklist` · no diálogo da ciência (10), o `Cancelar` · o homologado sem localização (14) abre só pela coluna, parado |
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

No estado único, `etapas.calibracao` guarda, de cada grandeza, o número digitado (`painel`), a foto com o carimbo (`fotos`: a hora, o técnico, o ativo e o módulo) e o semeado com o relido (`semeadas`); `foto` diz que o painel já foi fotografado, e é o que o checklist lê pro Painel da Seção B (HU-T10-4). O semear corre em 1 s gravando e 1 s relendo (`ritmos.js`), e não para: nesses 2 s, o `Voltar ao menu` e o voltar do sistema não fazem nada (O voltar do Android). A hora da foto e da releitura é a do relógio parado, 14:30, como as referências da entrega do checklist desenham.

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
  - **no protótipo**, a resposta do Android vem do caso: o `bluetooth-desligado` não traz recusa, e o `Ligar o Bluetooth` leva à busca (a lista sem nada escolhido, T05/01). No `bluetooth-sem-permissao`, a resposta é *negada*: o Android não deixa perguntar mais, e o primário vira `Abrir as configurações` no mesmo bloco. As configurações do Android não se desenham: o `Abrir as configurações` volta com a permissão dada, e a busca começa (`app/src/telas/T05/celular.js`)
- **câmera sem permissão**, na T10 — o quadro diz o que falta, e o botão vira `Abrir as configurações`. Vale igual pra câmera do checklist
  - **no protótipo**, a permissão vem do caso: só o `camera-sem-permissao` a nega, e só a T10/11 aponta pra ele — no fluxo, e em todo outro estado, a câmera abre. As duas câmeras do app são uma peça só (`VisorCamera`, em `app/src/ds/checklist/`). Na T10, a câmera do 1º passo aberta, na sessão da semente (o caso não aponta ativo): a câmera riscada, *O app precisa da câmera pra fotografar o painel*, *Sem a foto, a calibração não semeia.*, `Abrir as configurações` e `Voltar à calibração`. No item manual da T13, o mesmo, sem a frase — o `textos.md` não tem a do item (G25) —, e o `Não conforme` continua. As configurações do Android não se desenham: o `Abrir as configurações` volta com a permissão dada, e a câmera abre com o `Tirar foto` (`app/src/estado/camera.js`, provado em `node scripts/testar-camera.mjs`). A câmera sem permissão não tem endereço no fluxo: a URL sai do momento, como no item reprovado da T13
- **login sem conexão**, na T01 — o aviso *SEM CONEXÃO*, e os campos ficam preenchidos, porque a senha não estava errada
  - **no protótipo**, a rede é a `situacao.rede` do estado único, que o mock abre conectada: no fluxo, o `Entrar` segue a regra da senha. Sem ela, o aviso no lugar do erro, os campos como estavam e o `Entrar` aceso, que tenta de novo; com a conexão de volta, a regra da senha (`app/src/telas/T01/regras.js` · `depoisDoEntrar`)

**O login sem conexão e os dois do Bluetooth abrem só pela coluna** (T01/14, T05/16 e 17), parados e sem toque: nenhum gatilho do mock tira a rede do login, desliga o Bluetooth ou nega a permissão dele no fluxo. O toque do primário de cada um se prova no node, nas funções que a tela usa (`node scripts/testar-login-e-bluetooth.mjs`), e o roteiro `voltar.mjs` confere que os três ficam parados, sem toque e sem voltar. **A câmera sem a permissão também** (T10/11), pelo mesmo motivo: nada no mock nega a câmera no fluxo. O primário das duas câmeras sai de `primarioDaCamera`, que a T10 e a T13 leem e o `node scripts/testar-camera.mjs` prova, e o `voltar.mjs` confere a T10/11 parada, sem toque e sem voltar.

A **localização negada** não tem tela: nada trava, e o relatório do checklist sai sem a geolocalização, com a linha dizendo *sem localização*.

- **no protótipo**, nada no fluxo lê a localização, então nada trava. O relatório é o que o `Finalizar instalação` põe na fila (as evidências e o checklist, HU-T13-7). O caso `localizacao-negada` (a entrega do checklist) monta o homologado sem localização (T13/14): o veredito diz *o relatório vai sem localização*, no lugar de *o relatório leva 12 evidências, o local e o seu nome*. Ele abre só pela coluna, parado e sem toque: nada no mock nega a localização no fluxo, como nos outros estados do celular (o checklist · o Finalizar)

## O teclado (regra 10)

- **o rodapé sobe junto:** no celular de verdade — o link aberto num celular, o modo estreito do palco —, o teclado que abre encolhe a página. O `index.html` pede `interactive-widget=resizes-content`, que é o *adjustResize* do Android, e o app, que mora em 100% da altura, encolhe junto. Toda tela é a barra, o miolo que rola e o rodapé (G16): o rodapé é o pé do app, e o botão principal fica acima do teclado
- **o campo em foco à vista:** quando o tamanho muda com um campo do app em foco, o miolo rola até ele, com o rótulo e o poço inteiro, o traço do foco à vista — numa peça só, no app e não no palco (`useTeclado`, `app/src/estado/teclado.js`). Trocar de campo com o teclado aberto, quem traz é o navegador
- **onde o navegador não encolhe a página** — o Safari do iPhone não lê o `interactive-widget` —, a peça mede o que sobra acima do teclado (`visualViewport`) e encolhe o app até ali, descendo-o quando o navegador rolou a página pra mostrar o campo. No palco largo (um tablet), a conta é a do celular em escala. Com o zoom de pinça, nada muda (`teclado-conta.js`)
- **o teclado não encolhe o celular em escala** — o palco largo de um tablet, e o celular deitado (O retrato): com um campo do app em foco e a largura igual, a página que encolhe não reescala o celular, que fica do tamanho que tinha; a peça do teclado encolhe o app até o que sobra, dentro da moldura, como no Safari. Sem isso, o Chrome do Android reescalaria o celular pra caber nos poucos px acima do teclado — deitado, de 0,38 pra 0,14 (`app/src/palco/retrato.js`, `alturaDoPalco`)
- **os campos:** o usuário e a senha, o código e a senha nova (T01), a busca (T02 e T06), o painel (T10) e a justificativa (T13). O painel e o código abrem o teclado numérico (`inputMode="numeric"`); os outros, o de texto
- **no computador** não há teclado: a janela que se vê é a página inteira, e nada muda. **No print**, a peça nem escuta: os quadros parados não mudam
- **o teclado não deita o app:** num celular baixo, ele deixa a janela mais larga que alta; com um campo do app em foco e a largura igual, o palco não conta isso como giro (O retrato)

O roteiro `app/scripts/caminhos/teclado.mjs` prova cada campo com a janela encolhendo de 800 pra 480 — o campo com o rótulo e o botão principal à vista, e o app de volta aos 800 quando o teclado fecha —, o teclado numérico do painel e do código, a janela de 360 × 300 que não deita, o teclado por cima da página, sem encolhê-la, como no Safari, e o celular em escala que não encolhe com o teclado, no palco largo de 1280 × 800 e deitado em 800 × 360 (`node scripts/caminho.mjs teclado`). A conta do teclado e a do retrato se provam também no node (`scripts/testar-regras.mjs`, no `npm run checar`).

## O retrato (regra 11)

O app não gira. No modo estreito com a janela mais larga que alta — o celular deitado no painel do ônibus, ou a janela baixa de um computador —, o palco põe **o celular de 360 × 800 no centro, com a moldura e em escala pra caber, como no palco largo**, sem a coluna; o resto do modo estreito fica: o quadrado, o painel com o `Voltar ao fluxo` e a etiqueta (`palco.md`). O app segue se tocando, na escala, e nada do que o técnico fez se perde; de pé de novo, a tela cheia volta. O giro sempre troca a largura, e o teclado só a altura; com o teclado aberto, o celular fica na escala que tinha, e o app encolhe até o que sobra (O teclado; `app/src/palco/retrato.js`). O roteiro `app/scripts/caminhos/retrato.mjs` prova o app em pé com a janela deitada, o toque nele, a volta à tela cheia e o palco largo como era (`node scripts/caminho.mjs retrato`).

## Nenhum botão aceso que não faz nada (regra 12)

- **a permissão negada tem saída:** o Bluetooth desligado, a permissão do Bluetooth e a da câmera (T05/16 e 17, T10/11 e a câmera do checklist) têm sempre um primário que leva adiante: o Android liga o Bluetooth ou pergunta de novo, ou `Abrir as configurações`, que volta com a permissão dada — na câmera, e no Bluetooth quando o Android não deixa perguntar mais (O mundo real; `app/src/estado/camera.js`, `app/src/telas/T05/celular.js`). O login sem conexão tenta de novo
- **o que não faz nada é desabilitado de verdade**, como os cartões em espera: o toque não faz nada, o leitor ouve desabilitado, e o desenho é o da referência — o primário apagado que diz o que falta, a tira da T04 com a folha ou o diálogo por cima, a faixa da T13 com o diálogo da Seção F
- **a régua:** `app/scripts/aceso.mjs` toca cada tocável aceso de cada tela e momento do fluxo, um por vez, e confere se alguma coisa mudou — o endereço, o desenho ou o foco levado a outro lugar (o foco que o botão ganha do próprio toque não conta). Os lugares que nascem de um toque depois da entrada entram com esse toque: o menu sem o aviso do acesso (T04/00, 01 e 02), a busca que acha na T02 e a recuperação da T09. O cronômetro do código da T01 se mede sem os números, e a conferência da T11 e o encerramento sem homologar, depois de acabar. São 79 lugares; os 4 que não se medem — a releitura da CAN (T08/01), a cadeia (T09/00) e o autoteste (T16/00 e 01) — acabam em outro lugar, que se mede sozinho (`node scripts/aceso.mjs`, `prints/aceso.json`). O encerramento sem homologar (T16/03) também acaba em outro lugar, a 04: conforme o tempo da máquina, a régua o mede depois de acabar ou o deixa sem medir, e a 04 se mede nos dois casos (no fechamento do mundo real e no da entrega do checklist, a rodada inteira deixou 5 sem medir)
- **os dois que ficam**, cada um com o padrão que o `tela.md` manda, a nota na régua e a pergunta no `decisoes-do-diretor.md`: o `Sincronizar` das seis garagens sem pacote da lista longa (T02/03, depois de uma busca que acha) e o `Procurar de novo` da lista sem nada escolhido (T05/01): a busca de novo acha a mesma lista na hora, e nada muda. A entrega da otimização do design respondeu os dois — o pacote das seis garagens no mock, e o `Procurar de novo` que volta à busca da T05/00 — e eles esperam a construção dela · o terceiro, o `ENCERRAR` da recuperação da T09 (T09/03), já fica desabilitado de verdade e em tinta apagada, como a referência nova desenha (a lei 17; O voltar do Android)

## O checklist

Uma estrutura só em todas as telas da T13: o título com a contagem, a barra fina e os seis cartões de seção. Tocar num cartão faz ele crescer no lugar — as seções de baixo descem, e nada mais se mexe. **Tem seta, toca; sem seta, é leitura.**

- a contagem vem do mock: no caminho feliz, ao abrir o checklist depois do ciclo, são 24 de 31 · antes do ciclo, 19 de 31, porque o Painel já vem da calibração e a F espera o servidor
- item pendente leva à tela que resolve, pelo campo `origem` de cada item do mock
- a E tem uma ação só, *Fazer o ciclo dinâmico*, que abre a T14 · a F não tem ação: espera o servidor
- o homologado mostra o veredito e o relatório no topo · com a localização negada, o relatório vai sem ela

## O próximo passo depois da calibração

A calibração completa leva direto ao ciclo dinâmico: *Fazer o ciclo dinâmico* é o botão principal, e *Voltar ao menu* fica embaixo. O caminho feliz anda em linha — calibra, ciclo, checklist.

- **no protótipo**, os dois gravam a calibração concluída na etapa (`etapas.calibracao.concluida`): o `Fazer o ciclo dinâmico` abre a T14, e o `Voltar ao menu` leva ao menu; o voltar do sistema faz o `Voltar ao menu`. Voltar à calibração depois abre a 09, com as mesmas duas saídas

## A busca que esconde a escolha

Na T02 e na T06, se a busca esconde o que já foi escolhido, o primário apaga — ele não confirma o que não está na tela. Quando a escolha reaparece, ele acende de novo. A escolha não se perde.

- **no protótipo**, construído pela decisão do diretor de 25/09 (A escolha do ativo, e o `busca.mjs` prova). As duas referências que a otimização do design trouxe pra isso, a T02/04 e a T06/09, esperam a construção dela: a URL fica no quadro de antes — a T02 no 01, a T06 no 00, e o 03 e o 08 quando a busca não acha nada —, e o endereço delas abre a tela

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
| `T02/04-momento-busca-esconde-a-escolha` | com uma garagem escolhida, digitar uma busca que esconde ela |
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
| `T06/09-momento-busca-esconde-a-escolha` | com um ativo escolhido, digitar uma busca que esconde ele |
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
| `T13/12-momento-b-com-ressalva` | salvar um item como não conforme, com a justificativa, e voltar à Seção B |
| `T13/13-momento-e-resolvida` | voltar do ciclo dinâmico com os cinco passos feitos, e tocar na Seção E |
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
| `T01/15-estado-primeiro-acesso` | nenhum usuário lembrado — o app acabou de ser instalado, ou o técnico não marcou Lembrar | `primeiro-acesso` |
| `T01/16-estado-usuario-lembrado` | o técnico marcou Lembrar meu usuário num login anterior | `usuario-lembrado` |
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
| `T13/14-estado-homologado-sem-localizacao` | finalizar com a localização negada | `localizacao-negada` |
| `T14/02-estado-prazo-estourado` | o evento não chega em 2:00 | `evento-sem-resposta` |
| `T14/03-estado-dinamico-fora-do-esperado` | um sinal andando fora do esperado | `can-fora-esperado` |
| `T14/04-estado-identificador-divergente` | o cartão lido não bate | `identificador-divergente` |
| `T15/01-estado-sem-erro` | a fila sem erros | `filaSaida` |
| `T15/02-estado-dois-erros` | dois itens recusados | `filaSaida` |
| `T15/03-estado-fila-vazia` | nada esperando envio | `filaSaida` |
| `T15/04-estado-secao-f-em-re-checagem` | a Seção F esperando o servidor | `secaoF · RVM-1E54` |
| `T16/05-estado-assertiva-falhando` | uma assertiva falha | `autoteste-falhando` |
| `T16/06-estado-sessao-interrompida` | a sessão caiu e volta oferecida | `sessao-interrompida` |
