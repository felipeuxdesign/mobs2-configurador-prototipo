# A lógica do protótipo navegável

## O estado único

Um objeto só guarda tudo o que o app sabe, e **toda tela lê dele**:

```
tecnico      Rafael Vieira · r.vieira — quem entrou (o m.souza é Marcos Souza, o caso outro-usuario)
contexto     empresa · unidade · pacote e a idade dele · e o mundo das empresas — o do herói, com três, ou o de uma empresa só — e a atual (empresas)
sessao       nenhuma | { modulo, ativo, aberta às 14:30, etapa }
etapas       o que já foi feito: diagnóstico, vínculo, cadeia, calibração, ciclo, checklist
modo         instalação | manutenção — quem decide é o vínculo
fila         os itens esperando envio · e os que o técnico reenviou na T15 (reenviados)
aviso        o aviso do acesso vencendo, já fechado no Entendi ou não (avisoDoAcessoVisto)
situacao     o que é do celular: a rede, a sessão de acesso, o usuário que ele lembra (usuarioLembrado), se o Entrar já entrou (jaEntrou) e a sessão de outro usuário que o Entrar encerrou, até o Entendi (outraSessao)
tela         onde o app está · momento ou estado aberto
```

**A sessão nasce quando o módulo conecta.** A faixa desce no diagnóstico, quando as sete linhas passam sem trava. A conexão só conecta: o que o módulo é e como ele está, o diagnóstico mostra logo depois, já dentro da sessão. E morre no encerramento, quando a faixa sobe.

- **no protótipo** (o padrão aprovado pelo arquiteto no gate do pacote 1, até a errata dele): a sessão nasce na conexão, e **a faixa desce na T07, quando as sete linhas do diagnóstico passam sem trava** — é o que as referências desenham: a T07/00 e a 07 têm a faixa; da 02 à 06, as travas e a atualização do firmware, não, e o módulo fica em cima do título. Na trava, `Procurar outro módulo` leva à T05/01, a lista sem nada escolhido (O diagnóstico do módulo)
- **no protótipo, as etapas** (o padrão do gate do pacote 1, item 2): a T13 é intocável até o pacote 2 e lê `etapas.preChecagem` e `etapas.can`, então o diagnóstico grava ali, com os nomes de hoje — as sete linhas do módulo e a CAN lida. O vínculo fica em `etapas.ativo`, como antes. Os nomes novos chegam com o pacote 2, junto com a T13

## O começo

O protótipo abre no **login, às 14:30, com o Rafael Vieira**, na T01/00: o usuário e a senha vêm preenchidos, pro palco andar num toque; qualquer senha com 8 caracteres ou mais entra. Com menos, aparece o erro. O `Entrar` diz o que falta enquanto o técnico apaga e digita — *Digite o usuário* → *Digite a senha* → `Entrar` —, apagado e desabilitado de verdade enquanto falta (a lei 17), e o foco vai pro primeiro campo vazio.

**O usuário lembrado** (HU-T01-3, a otimização do design): o celular guarda só o identificador, nunca a senha — no estado único, `situacao.usuarioLembrado`, que o palco começa sem nenhum. O `Entrar` que entra com *Lembrar meu usuário* marcado guarda o usuário; desmarcado, não guarda nada. E, dali em diante (`situacao.jaEntrou`), o login só traz o que o celular lembra — a T01/00, com os dois campos preenchidos, é só o começo do palco, e cada pulo do palco recomeça nela. Saindo da conta (T04), o login volta com ele lembrado: o xis dentro do campo, a caixa marcada, a senha vazia e o foco nela, e o `Entrar` dizendo *Digite a senha* — o quadro da T01/16; sem ninguém lembrado — o técnico não marcou Lembrar —, o quadro da T01/15: os dois campos vazios, a caixa desmarcada, o foco no usuário e *Digite o usuário*. A senha nunca fica. O xis limpa o campo e esquece o usuário lembrado, o cursor vai pro usuário, e a caixa fica como o técnico deixou: marcada, entrar de novo lembra de novo. As duas referências de quem abre o app — nada lembrado (15, o caso `primeiro-acesso`) e o usuário lembrado (16, o `usuario-lembrado`) — abrem pela coluna, montadas pelo caso, paradas e sem toque. As regras são funções puras em `app/src/telas/T01/regras.js` (`oQueFalta`, `entradaDoLembrado`, `entradaDoFluxo`, `depoisDoXis`, `lembradoDepoisDoEntrar`), provadas no node (`node scripts/testar-login-e-bluetooth.mjs`); o toque, no roteiro `lembrar.mjs`: marcar, entrar, sair, o xis, entrar de novo lembrado, desmarcar, e o login seguinte sem ninguém lembrado

**Outro usuário no aparelho** (HU-T01-4, a última entrega · T01/18): entrar com um usuário diferente do da sessão anterior encerra a sessão dele, e a fila dele continua subindo — a fila é do aparelho (decisão 42). No protótipo, a sessão anterior é a do último `Entrar` que entrou desde o começo do palco (`situacao.jaEntrou`, e o `tecnico` do estado único): o primeiro `Entrar` nunca abre o diálogo. Saindo da conta e entrando com outro usuário, o `Entrar` grava na situação do celular o usuário anterior e os itens da fila que esperam (a mesma conta do diálogo de sair do menu, T04/06: 3), e a T02 abre com o diálogo *Outra sessão neste aparelho* por cima da entrada dela — as empresas do herói, o quadro do `05`, com a empresa antes da unidade (a otimização 400) —, nascido aberto; o `Entendi` fecha. O login deixa o m.souza entrar pela regra de sempre (qualquer senha com o mínimo), e ele passa a ser o técnico — *Marcos Souza*, o nome do caso `outro-usuario`; o mock não conhece outro nome, e outro identificador entra com o do herói (padrão, pro arquiteto). A 18 abre pela coluna, com a T02 montada pelo caso, parada, nas unidades, como a referência desenha (desvio nomeado, pro arquiteto: no fluxo, o diálogo fica sobre as empresas). As regras em `app/src/telas/T01/regras.js` (`outraSessaoAoEntrar`, `tecnicoDo`), provadas em `node scripts/testar-login.mjs`; o toque, no roteiro `outro-usuario.mjs`

**O teto de envios** (HU-T01-7, a última entrega · T01/17): depois dos 3 envios da hora, a linha do reenvio diz *Os 3 envios desta hora acabaram · libera às 15:12*, e o código enviado segue valendo. No protótipo, o 15:12 é a hora do caso `teto-de-envios`, que vale também no fluxo — o relógio está congelado, e não há outra de onde ler. O teto chega pelo reenvio da T01/12 ou da 13 (o terceiro envio da hora), quando a espera zera; pedir o código de novo no teto não envia nada, e volta o código que já foi (`depoisDoEnviar`). O `Confirmar` diz o que falta com as células vazias: *Digite o código*, apagado, como a 12 e a 13 desenham

## O caminho do herói

```
login → a Viação Atlântico Sul → a unidade Várzea → sincroniza o pacote → menu, com o aviso do acesso na primeira chegada (Entendi)
→ conectar: acha cinco módulos (o do herói e mais quatro), escolhe o M2C-0417, conecta
→ o diagnóstico do módulo: as sete linhas conferem, e a faixa desce · a CAN espera o ativo
→ o ônibus RKT-8H42 → confirma o vínculo: placa, frota, fabricante e modelo
→ o que vai ser gravado: a limpeza primeiro, e o espaço cabe → a cadeia grava e relê os blocos
→ a CAN do ônibus aparece no diagnóstico → calibra o hodômetro, e o horímetro se quiser
→ o ciclo de testes, parado: os seis passos sozinhos, o evento chega → o checklist fecha → ENCERRAR → a faixa sobe → menu sem sessão
```

O roteiro `app/scripts/caminhos/heroi.mjs` prova o caminho só por toque, do login ao menu sem sessão, sem pulo do palco (`node scripts/caminho.mjs heroi`, 209 passos até o pacote 1). Com a empresa antes da unidade (a otimização 400), a unidade Várzea vem depois da empresa: o Entrar abre as três empresas do herói (T02/05), e o roteiro escolhe a Viação (07), `Ver as unidades` e a Várzea (09). Na primeira chegada ao menu, o roteiro vê o aviso do acesso nascer parado, com o menu atrás sem toque, e toca `Entendi`; na volta ao menu sem sessão, no fim, o aviso não aparece de novo. Na calibração, o roteiro digita o número do painel do mock, fotografa e semeia — o botão dizendo o que falta, e o *Gravando no módulo…* e o *Relendo…* no ritmo —, no hodômetro e no horímetro, com o `Voltar ao menu` e o `ENCERRAR` desabilitados enquanto o semear corre; a calibração completa aponta o ciclo, e o `Fazer o ciclo dinâmico` abre a T14 (decisão 35: calibra, ciclo, checklist, em linha); o `Voltar ao checklist` do ciclo concluído leva ao checklist, em 24 de 31 e com a E resolvida (a E aberta, o 13, e fechada de novo), e o checklist fecha com as quatro fotos de B — a B cresce no lugar, e o Painel vem herdado da calibração — e o `Finalizar instalação`, com o veredito e o relatório no topo. Esse é o roteiro do pacote 1: com o pacote 2, a calibração semeia sem fotografar, com o horímetro e sem ele (`Pular o horímetro`), o `Fazer o ciclo de testes` abre o ciclo de seis passos, e o Painel se fotografa na B, com as outras quatro — o roteiro se refaz no ciclo que constrói o pacote, e o aceite pede os dois caminhos.

- **no protótipo** (o pacote 1): a faixa desce no fim das sete linhas do diagnóstico, na T07, e não no conectar (O estado único, acima)
- **os módulos por perto:** o pacote escreve *quatro*; a referência T05/01 desenha cinco linhas — quatro que se tocam e o M2C-0999, que não se toca —, e o mock tem cinco em `situacao.porPerto`. O protótipo segue a referência e o mock: cinco linhas, as cinco se tocam (a errata)
- **da cadeia à CAN lida** (D2): a cadeia concluída só tem `Voltar ao menu` (T09-A3), e o herói chega à CAN lida (T07/01) pelo `Diagnóstico do módulo` do menu; dali, o `Voltar ao menu` e a Calibração
- **o roteiro se mede de novo** com o diagnóstico, o vínculo e o que vai ser gravado: os 209 passos são de antes do pacote 1

## As sementes

Pular direto pra uma tela pelo painel monta o estado mínimo que ela precisa pra fazer sentido:

| Tela | Semente |
|---|---|
| T01 · Login | nenhuma sessão · usuário r.vieira preenchido |
| T02 · Selecionar contexto | três empresas — a do herói é a Viação Atlântico Sul, com três unidades · Várzea com pacote de ontem |
| T03 · Sincronizar | unidade Várzea · pacote pac-uo-01 |
| T04 · Menu | sessão M2C-0417 + RKT-8H42 · fila com 2 itens |
| T05 · Conectar módulo | cinco módulos por perto (situacao.porPerto) · M2C-0417 é o do herói · pelo menu, a tela abre na lista sem nada escolhido (01) |
| T06 · Selecionar ativo | sessão M2C-0417 · dez ônibus no pacote |
| T07 · Diagnóstico do módulo | sessão M2C-0417, ainda sem ativo · as sete linhas do módulo · a CAN espera o ativo |
| T09 · Configurar módulo | sessão M2C-0417 + RKT-8H42 · instalação nova · abre no que vai ser gravado |
| T10 · Calibração | sessão M2C-0417 + RKT-8H42 · hodômetro 184.320 no módulo, 482.317 no painel |
| T11 · Conferir configuração | M2C-0438 + ONK-8Q90 · caso diff-divergente · a Garagem Ibura, a unidade do ONK-8Q90, com o pacote dela (G21) |
| T12 · Últimas instalações | sessão M2C-0417 + RKT-8H42 · unidade Várzea · cinco instalações (a 00 desenha a sessão aberta, G21) |
| T13 · Checklist | sessão M2C-0417 + RKT-8H42 · 31 itens |
| T14 · Ciclo de testes | sessão M2C-0417 + RKT-8H42 · fila com 6 mensagens e 2 de diagnóstico |
| T15 · Fila de saída | fila com dois itens · um com erro |
| T16 · Sessão | sessão M2C-0417 + RKT-8H42 homologada |

- **no protótipo** (a otimização 400): a semente da T02 é a `T02/00` — o mundo de uma empresa só, o caso `uma-empresa`, já confirmada: as unidades da Viação, com o nome dela em cima e sem o `Trocar de empresa` (`app/src/estado/sementes.js`) —, e não as três empresas do herói que a linha diz: a `00` é do caso `uma-empresa` (a `estados.md` da T02), e o endereço dela é o da tela, `?tela=T02`, o mesmo do pulo, que a régua fotografa. O herói chega às três empresas dele (o `T02/05`) pelo `Entrar` da T01. O pulo pra T04, e o `07` e o `09` da T02 pelo endereço, abrem o mundo do herói (desvio nomeado, pro arquiteto: a semente ser o herói, o `05`, com a `00` fotografada por um endereço do mundo `uma-empresa`, ou a linha dizer a `00`)

## As portas naturais

Tocar num módulo ou ônibus da lista que é **caso do mock** abre o estado dele, igual ao que o técnico veria no mundo. Na T05, tocar no M2C-0999 conecta, e o diagnóstico abre travado pelo serial fora do cadastro; na T06, tocar num ônibus de outra unidade abre o fora do pacote. A coluna do palco sempre funciona também.

- **no protótipo** (a R-14 do diretor, de 24/09, que vence a R-11 do pacote, da cópia de antes): tocar na linha **só marca**, e o estado aparece quando o técnico aperta o botão — o `Conectar ao …` na T05, o `Usar este ativo` na T06
- **o M2C-0999 se toca** (a errata): na T05/01 ele é uma linha como as outras, com *VL06 · CAN-BT · FIRMWARE 2.3.5*, de `naBuscaForaCadastro`; conectar nele leva à T07/02, travado pelo serial fora do cadastro. A T05/00 e a 04, que a errata não refez, ainda o desenham *não cadastrado* e sem toque, e o protótipo segue cada referência (pro arquiteto)
- **o que abre só pela coluna** (o padrão do gate do pacote 1, item 5): os dois casos do vínculo (`modulo-em-outro-ativo`, `modulo-ja-deste-ativo`), o `modem-sem-sinal` e os dois sinais da CAN (`can-estatico-ausente`, `can-estatico-isolado`) caem no par do herói, M2C-0417 × RKT-8H42. Pelo serial, no fluxo, o herói veria todos eles; por isso nenhum abre tocando. O M2C-0451 e o M2C-0497, das travas do firmware e do modelo, não estão por perto: abrem pela coluna também
- as portas da T05 de antes — o M2C-0394 no conteúdo que não cabe, o M2C-0362 no canal aberto, o M2C-0335 dormindo na nona — e o KNB-5H39 sem chassi, na T06, saíram com a pré-checagem e com o chassi

Na T05, o que acontece uma vez vale uma vez por sessão (G21, `casosConsumidos`): a falha ao conectar. O que é fato do cadastro — o serial, o driver e a matriz — vale toda vez que o módulo conecta, e trava no diagnóstico (T07). O conteúdo e as cercas passaram pro envio da T09 (decisão 47). O link que caía, o módulo que dormia e o canal antigo saíram com a pré-checagem.

O roteiro `app/scripts/caminhos/portas.mjs` prova as portas e a R-14 nas três listas de escolha — a T02, a T05 (a lista e a 00) e a T06 (`node scripts/caminho.mjs portas`). Com o pacote 1, os destinos da T05 e da T06 mudam, e ele se mede de novo.

## ENCERRAR

- **depois de homologar:** os passos do encerramento, o corte de alimentação que o técnico faz quando o driver não reinicia por comando, e o autoteste (T16·1). O passo que corre diz o que faz, na legenda embaixo do nome (as 8 do `tela.md` da T16); o passo 2 só leva a dele no corte, porque ela manda desligar a alimentação (T16·7). O herói é um VL06, que reinicia por comando; o corte aparece na sessão do KNB-5H39 · M2C-0371, que se abre pelo endereço do momento. Ao fechar o sétimo passo, a sessão sai do estado único e a tela passa pra *Sessão encerrada*, onde as oito assertivas acendem uma a uma; a prova e o `Voltar ao menu` entram com a última (T16·4)
- **antes de homologar:** o ENCERRAR abre o diálogo *Encerrar sem homologar?* — `Continuar a instalação` é o principal, e fecha · `Encerrar sem homologar` roda a sessão abortada, 4 passos. Um toque sem querer, de luva, não perde a instalação (decisão 36). Depois do `Encerrar sem homologar`, os 4 passos terminam na *Sessão encerrada* sem homologar; dos diálogos do menu (`Encerrar a sessão e sair`, `Encerrar a sessão e trocar`), o destino fica gravado no estado único e, depois dos 4 passos, o app segue pra ele — o login com a fila preservada, ou a sincronização da unidade nova (G23)
- **todo caminho que encerra a sessão antes de homologar avisa que a instalação não é homologada**: o ENCERRAR da faixa e o `Encerrar a sessão` das folhas do módulo e do ativo abrem o diálogo · as folhas de sair da conta e de trocar de unidade já são a confirmação delas, e dizem *é encerrada antes, sem homologar* — nenhum caminho pergunta duas vezes
- **nos processos, o ENCERRAR faz o mesmo que o voltar do Android.** Onde o voltar não faz nada — a releitura da CAN, o semear da T10 —, o ENCERRAR fica desabilitado e em tinta apagada (lei 17). Na cadeia da T09, antes de a Conexão gravar, ele abre a recuperação, como o voltar. No encerramento da T16, a faixa já não mostra o ENCERRAR
- **a sessão interrompida (T16/06):** `Retomar` reabre a cadeia da T09 no bloco que parou, com os blocos já confirmados; `Descartar` volta ao menu sem sessão e não cria item de fila; o voltar não faz nada (T16·5, T16·6)
- **a exceção da T09 (G23, HU-T09-9):** enquanto a Conexão não gravou, o ENCERRAR e o `Voltar ao menu` com a cadeia parada levam à recuperação (T09/03), onde o ENCERRAR não faz nada e `Continuar a gravação` retoma do mesmo bloco. Com a cadeia concluída, o ENCERRAR volta a ser o de cima
- **no protótipo** (decisão 36, construída): o ENCERRAR é uma peça só pras dez telas com a faixa, a T04 e da T06 à T15 (desde o pacote 1, a T08 saiu, e a T05 só conecta, sem faixa) — `app/src/estado/encerrar.jsx` (`useEncerrar`) —, que decide pelo estado único: com o checklist homologado (`etapas.checklist.homologada`; na T13, o registro dela), direto pros passos do encerramento (T16/00); antes, o diálogo, com os textos da T04/13. O menu, que ia pra sessão abortada mesmo homologado, agora vai direto também
  - **no menu**, o diálogo é o momento `13` da T04, com endereço: a URL abre e fecha (G20), e o `Continuar a instalação` volta ao quadro do menu (00, 01 ou 02). O véu cobre a tira e a faixa, como no aviso do acesso, e a caixa tem o ar de 24 que a `13` desenha. Aberto pelo endereço, o aviso do acesso espera o diálogo fechar, como espera a folha
  - **nas outras telas**, o diálogo abre por cima da própria tela onde o ENCERRAR foi tocado, sem endereço — a referência só desenha o do menu (a decisão padrão deste ciclo, pro arquiteto · **confirmada por ele em 26/09**: fora do menu, sobre a própria tela, e o técnico fica nela; o das folhas do módulo e do ativo, sobre o menu): o véu começa embaixo da barra do sistema e cobre a faixa, a caixa é a mesma, e o `Continuar a instalação` deixa o técnico ali, no mesmo quadro. O que fica atrás do véu é inerte (G25): nem o toque nem o leitor chegam lá. O que corre sozinho embaixo — a conferência da T11, o ciclo da T14 — continua correndo: o técnico ainda não decidiu nada
  - **o `Encerrar a sessão` das folhas do módulo e do ativo** (T04/10, 11) fecha a folha na hora, sem dois véus, e abre o `13` por cima do menu; o `Continuar a instalação` volta ao menu, sem a folha
  - **o voltar do Android** com o diálogo aberto faz o `Continuar a instalação`, antes da saída da tela (O voltar do Android · numa folha ou num diálogo; `useVoltar` · `porCima`, em `app/src/estado/voltar.js`)
  - **o movimento** é o dos diálogos (movimento.md): o véu e a caixa esmaecem, e a caixa cresce de 98% a 100%, em 150ms, na entrada e na saída; pelo endereço ou no print, nasce aberto, parado
  - **onde o ENCERRAR está desabilitado** (a releitura da CAN na T07, o semear da T10, a recuperação da T09) nada muda, e na cadeia da T09 antes de a Conexão gravar ele continua abrindo a recuperação. Os diálogos de sair e de trocar não passam pelo *Encerrar sem homologar?*: já são a confirmação, e dizem *é encerrada antes, sem homologar* e *é encerrada antes da troca, sem homologar.*

Os roteiros provam: `heroi.mjs`, o depois de homologar, direto, sem o diálogo · `sessao.mjs`, o corte de alimentação pelo endereço do momento, com a legenda de cada passo que corre · `abortada.mjs`, o antes — o diálogo por cima da T06 e da T07, do menu (o `13`, pelo ENCERRAR da faixa e pelo `Encerrar a sessão` das folhas do módulo e do ativo) e do checklist (T13); o `Continuar a instalação` fecha e o técnico fica, o voltar também, e o `Encerrar sem homologar` roda os 4 passos, com a legenda de cada um e o traço do pulado mudo pro leitor de tela (nenhum nome diz *não se aplica* na `03`) · `sair.mjs`, os dois diálogos do menu, com o *sem homologar*, e os destinos deles, sem outra pergunta no caminho · `portas.mjs`, o diálogo no fim de cada porta · `voltar.mjs`, o voltar com o diálogo aberto no menu e na T07. Com o pacote 1, os roteiros que passavam pela pré-checagem, pela T07 antiga e pela T08 se medem de novo.

## Os contadores do menu (T04·1, T04·2)

- **no cartão Fila de saída:** o que ainda não chegou ao servidor (tudo o que não foi recebido), só da unidade ativa — na Várzea, 2
- **no diálogo Sair da conta:** o que está na fila, de todas as unidades — 3. As duas contas são diferentes, e a diferença está com o diretor (T04·1)
- **no cartão Finalizar com checklist:** só depois que o checklist foi aberto uma vez na sessão; conta os itens das seções B e E, os que o técnico resolve, ainda não resolvidos — 10 na semente — e some ao homologar (T04·2). A T13 grava a conta em `etapas.checklist.pendentes` a cada item que resolve (C10). **Um item resolvido** é o manual com foto — tirada no checklist, ou herdada da calibração (o Painel, HU-T10-4) — ou com ressalva (não conforme com a foto do problema e o que aconteceu, que não bloqueia — decisão 39), o passo de E que a T14 aprovou, e o que não se aplica. Pela conta da T13, a semente do checklist dá 9, porque o Painel já vem herdado; o menu segue com a conta dele (10) até ler `pendentes`
- **a troca de unidade com evidência subindo** (T04/08) abre pela coluna do palco: no fluxo, a semente do menu não tem envio em curso, e a folha abre sem o aviso (T04·3)

## A fila de saída (T15)

A fila é **do aparelho**, não da unidade: a HU-T01-4 diz que a fila de outro usuário continua subindo (decisão 42). O rótulo é *neste aparelho*. As referências mostram o topo da lista; o protótipo mostra a fila do mock inteira. A fila vazia vem do caso `fila-vazia`.

- **a fila, num lugar só:** a do mock mais o que a sessão criou, cada item como está (`app/src/estado/fila.js`). A T15 e o menu leem dali, e o item conta igual nas duas
- **`Ressincronizar e reenviar`:** os itens com erro do cartão voltam pra fila — o id entra em `reenviados`, no estado único, e o item passa a *na fila*; o mock fica intocado. O cartão que pede ação sai, porque nada mais precisa do técnico, e a lista sobe pra baixo do cabeçalho, com o item esperando desde o `criadoAs` (na semente, *KJC-7N23 · na fila · há 145 min*). Nenhum vira o *SUBINDO AGORA*: o progresso e o tamanho só existem no f-04 do mock (G25). O contador da T15 não muda; no menu, o diálogo *Sair da conta* vai de 3 pra 4 (T04·1). Sair da tela não desfaz (HU-T15-2), e o `Recomeçar do login` e o pulo do palco zeram
- **a notificação da fila parada** (*Envio parado · 3 itens esperando há 30 min*, HU-T15-6) não se constrói: nenhuma referência a desenha, e ela é do sistema, fora da tela. Os 30 min são o padrão adotado (`pendencias.md`)
- **no protótipo, a fila do aparelho** (a última entrega, decisão 42): o rótulo *neste aparelho* nas cinco; no fluxo, a seleção da semente mais tudo o que a sessão criou, de qualquer unidade (o filtro pela unidade ativa saiu, `app/src/telas/T15/dados.js`); em cada estado, o recorte do caso inteiro — no `01`, os cinco, com a quinta linha embaixo de onde a referência corta. *A fila do mock inteira* é lida como o recorte inteiro de cada quadro: os dez de `filaSaida` juntos dariam dois erros e um envio correndo ao mesmo tempo, que nenhuma referência desenha (padrão, pro arquiteto). O recebido de mais de um dia diz o dia, do `data` do mock: *10/03, 10:05*. O `03` e o `04` leem o caso `fila-vazia`, do design, com o *14:02*
- **o menu e a fila do aparelho:** o cartão *Fila de saída* do menu conta os pendentes da unidade ativa, e o diálogo *Sair da conta*, a fila do mock inteira (Os contadores do menu). Com a decisão 42, o *da unidade ativa* do cartão ficou sem razão — a regra é da T04, e não mudou aqui

O roteiro `app/scripts/caminhos/fila.mjs` prova o reenvio, a ordem da lista e o contador que continua 3, a volta pelo menu com o cartão da Fila de saída igual, e a conta do diálogo (`node scripts/caminho.mjs fila`).

## A escolha do ativo (T06·1 a T06·5)

- **a lista:** os ônibus do pacote da unidade do contexto, na ordem do mock — na Várzea, os 10, com "10 no pacote" (G9). O conteúdo rola; o KNB-5H39 é o nono
- **a ordem das checagens:** ao tocar num ônibus, a confirmação checa o pacote, depois os pinos (T06·3). O conflito de pinos vale quando o módulo da faixa, o ônibus e o meio da sessão são os do caso. O chassi saiu (decisão 46): a confirmação é o vínculo — placa, frota, fabricante e modelo —, e o módulo em outro ativo e o já deste ativo vêm dos casos, que abrem só pela coluna (As portas naturais)
- **o que fica gravado:** `Vincular o módulo` põe o ativo na sessão e anota em `etapas.ativo` o vínculo, confirmado pelo técnico — sem o chassi, que saiu (decisão 46) —, e a hora, 14:30. `Desvincular e vincular aqui` anota também o desvínculo, um fato da sessão, sem tela própria (D3). No protótipo, o modo e o desvínculo moram no registro do vínculo, `etapas.ativo.modo` (`instalacao` ou `manutencao`) e `etapas.ativo.desvinculo`, que zeram com a sessão. `Usar leitor sem fio` passa a sessão a sem fio, e o conflito some (T06·4)
- **os casos não se consomem:** o ônibus de outra unidade é fato do cadastro, e vale toda vez que o ônibus é tocado
- **a busca sem resultado (08, a entrega de 25/09, que muda a T06·5):** o vazio declarado fica no lugar da instrução e da lista, com o termo no título, e o `Usar este ativo` espera; o ônibus marcado volta com a lista. A URL diz o `08` enquanto a busca não acha nada. Na T02, o mesmo, no `03`, que só existe no mundo do caso `lista-longa-garagens` (a busca aparece com mais de 6 unidades)
- **a busca que acha e esconde a escolha (decisão do diretor, 25/09, b):** enquanto a busca esconde o ônibus marcado (T06) ou a unidade escolhida (T02) — sem resultado, ou achando outros —, o primário espera; a escolha fica guardada e, quando a busca a mostra de novo, ela volta marcada e o primário acende. Na T06, o `Usar este ativo` apagado; na T02, o `Escolha uma unidade` apagado, como a `03` desenha, e o `Sincronizar Garagem X` volta com ela. A URL diz o `09` da T06 e o `04` da T02 enquanto a busca acha outros e esconde a escolha (A busca que esconde a escolha, abaixo). O roteiro `busca.mjs` prova as duas
- **a instrução e a busca:** com um termo na busca, a *Escolha o veículo que está na sua frente.* sai, e embaixo do campo fica o que a busca achou — a lista ou o vazio —, como a `08` e a `09` desenham

## A releitura da CAN (o `Ler de novo` da T07)

A T08 saiu inteira, e a releitura mora na própria T07: com o bloco do ativo gravado, `Ler de novo` relê a CAN (T07/10), e a tela volta lida (01).

- **o que se lê:** o módulo fica numa linha, *Conferido na conexão · 7 de 7*, e a CAN é a lista do modelo do ativo — no herói, o ônibus urbano OF-1621, com 8 sinais: rotação, velocidade, hodômetro, temperatura, combustível, consumo, alternador e ré. O contador conta os dois: *15 de 15* na CAN lida (01), *10 de 15* no meio da releitura (10)
- **o ritmo:** uma linha a cada 600ms, na ordem da lista (`movimento.md` · diagnóstico), como a releitura da T08 fazia: as lidas, a que lê com o quadrado de agora e *lendo*, as que esperam com o relógio e o traço, e o rodapé *Lendo · não saia da tela* (10)
- **ENCERRAR no meio da releitura** (a lei 17, a decisão do diretor de 25/09, e a decisão 36): relendo, o ENCERRAR fica apagado e não faz nada — a releitura não para no meio, como o voltar do Android (O `ENCERRAR` da faixa faz o mesmo que o voltar, abaixo). O PNG da T07/10 desenha o ENCERRAR aceso: a diferença fica nomeada no aceite. Fora da releitura, antes de homologar, ele abre o diálogo *Encerrar sem homologar?* por cima da tela, e só o `Encerrar sem homologar` roda a sessão abortada (ENCERRAR, acima)

## A cadeia (T09·1)

- **o ritmo:** um bloco grava e relê a cada 1 s, na ordem do mock (`cadeia.ordem`), e o próximo começa no instante em que o anterior confirma (T09·1)
- **a entrada:** na instalação nova, a tela abre no que vai ser gravado (05), e `Gravar no módulo` liga a cadeia; na manutenção, no escolher o bloco (08), e `Reenviar as cercas` liga a cadeia curta (09) — o modo vem do vínculo (O vínculo decide o modo). A 00 é o quadro da cadeia correndo — três relidos, o Leitor gravando (G27). Quando o par módulo × ativo da faixa é o de um caso da cadeia, ela para no bloco do caso, uma vez por sessão (G21, G28): a recusa de Cercas (`bloco-recusado`) ou a queda no Leitor (`queda-na-cadeia`). `Tentar de novo` e `Reconectar e seguir` retomam do mesmo bloco
- **o que fica gravado:** a cada bloco relido, `etapas.cadeia` fica com quantos confirmaram; com os seis, a concluída diz *6 blocos*, gravados e relidos. O módulo não guarda versão (decisão 49): cada elo mostra o conteúdo do bloco no par da faixa (O que vai ser gravado, abaixo), e a versão composta saiu. A T09 aberta depois disso já abre concluída. A cadeia curta da manutenção grava o bloco que reenviou (`etapas.cadeia.reenviado`), sem contar os confirmados
- **a saída:** a cadeia concluída tem só `Voltar ao menu`, que leva ao menu, de onde a Calibração segue: nenhuma referência desenha um `Calibrar` (T09-A3, G25) · a ficha do pacote 1 ainda diz `Calibrar` → T10, e a 04 continua desenhando só o `Voltar ao menu` · a CAN lida se vê pelo `Diagnóstico do módulo`, no menu (D2)

## A conferência (T11·1, T11·2)

- **o pacote 2** (decisão 53, a construir): o que segue é o protótipo do pacote 1. A conferência passa a ter cinco linhas — Cercas, APN, Extended ID (só leitura, fora da contagem), Eventos e Leitor —, o `Corrigir` reenvia um bloco por vez e deixa os que dependem *revisar em seguida* (T11/05), a 04 sai, e o *igual à do cadastro* do 02 também (As ações da conferência, abaixo)
- **o que diverge:** só o par do caso `diff-divergente` (M2C-0438 + ONK-8Q90, a semente do painel), e ele abre na 00 com os cinco blocos não batendo — cada um com o par: *no módulo*, o `noModulo` do caso, e *no cadastro*, o `noCadastro`. A T11 aberta pelo menu com a sessão do herói (o par do caso `conferencia-confere`) não acha divergência e vai pro **02, tudo confere** (T11·1). O endereço do 02 monta esse par, com a unidade dele
- **depois de regravar:** `Corrigir as N divergências` e `Reenviar os 5 blocos` (a última entrega, decisão 40; antes, `Regravar os cinco blocos`) levam à T09; com a cadeia concluída, `etapas.cadeia` registra os seis blocos relidos, e a T11 reaberta com a mesma sessão abre em tudo confere (T11·2)
- **o valor de cada linha:** o que o cadastro manda — o do caso, no par do `diff-divergente`; nos outros, o cadastro do próprio par: a tradução do modelo, as regiões do ativo, o meio da sessão, o intervalo do preset de eventos (G9)
- **a leitura:** ao abrir, sobre o desenho do quadro a que ela chega — a 00 quando diverge, o 02 quando confere (G27) —, cada bloco entra com o relógio no poço e vira check ou xis, um a cada 400 ms; o que o módulo tem espera a leitura chegar no bloco. **O veredito espera a última linha** (a decisão do diretor de 25/09, C12·35 b): o cabeçalho com a contagem e, no 02, o *igual à do cadastro* ficam no lugar e entram esmaecendo quando a quinta linha acende. Num estado da coluna, e no print, ela nasce lida
- **o voltar:** faz a saída do rodapé — no 02, o `Voltar ao menu`; na 01, o `Apenas registrar o diagnóstico`, o link dela; na 00 e na 04, o link é o `Outras ações`, que não sai da tela, e o voltar não faz nada (a última entrega; antes, na 00, o `Só registrar`); com a folha aberta (03), fecha a folha
- **o conteúdo que o app não reconhece** (o 01) abre só pela coluna, com o caso `indice-nao-classificado`: os cinco blocos conferem, e o cabeçalho diz *NÃO BATE COM O CADASTRO · 1 a mais* — um conteúdo fora de todos os blocos, a posição que o caso traz. O par da semente é o mesmo dos dois casos, e a semente abre na 00
- **o que fica gravado:** `Apenas registrar o diagnóstico` (antes, `Só registrar o diagnóstico`) põe em `etapas.conferencia` os blocos que não bateram e a hora, 14:30, e volta ao menu; nenhum item entra na fila (G25)

## O ciclo de testes (T14·1 a T14·4)

- **o pacote 2** (decisão 54, a construir): o que segue é o protótipo do pacote 1, com o ciclo dinâmico de cinco passos. A T14 vira o *Ciclo de testes*, com a ignição ligada e o ônibus parado: seis passos — ignição ligada, rotação, ré, porta, cartão do motorista e ignição desligada —, a velocidade só com o `tacografoDigital` do modelo, e a rotação zerada pede o motor ligado (T14/03, caso `motor-desligado-no-ciclo`, no lugar do `can-fora-esperado`)
- **a entrada:** a tela entra no quadro da 01 — a fila do módulo drenando, o prazo cheio, o disparo indisponível (G27). A fila é a de todo módulo (`ciclo.mensagensGuardadas`, 6 e 2) ou, no serial do `modulo-com-pendencias`, a dele (12 e 3), e drena em 3 s; o `Disparar evento de teste` acende
- **o ritmo:** disparado, o prazo de 2:00 anda 4 s por segundo real. A semente traz 2 passos feitos; os passos 3 a 5 acendem a +9, +12 e +15 s do disparo (T14·1, `ritmos.js`). O evento chega aos 24 s do prazo — a 00 é o instante antes, 1:36 — e os campos conferem aos 33 (`6 de 6`, `ciclo.evento.campos`). Chegou, o número passa a ser o tempo que ele levou (0:24), e a barra para no que restava. Os cinco passos e o evento → 05
- **os casos, pelo par da faixa (G28):** o `evento-sem-resposta` (M2C-0335 + KHT-4B08) estoura o prazo na 1ª tentativa, uma vez por sessão (G21), e `Disparar outro evento` confirma na 2ª, com os passos valendo · o `can-fora-esperado` (QJF-2C61) reprova o passo que o sinal prova (`ciclo.passoDoSinal`: velocidade → Movimento detectado) · o `identificador-divergente` (PCX-9A17) acrescenta a linha do teste do cartão, que só existe com o caso (T14·3). Os dois últimos são fato do veículo e do cadastro: valem toda vez
- **as saídas:** `Encerrar o ciclo` fecha a captura, e os pendentes ficam pendentes na Seção E; `Ir para o checklist` sai com o ciclo aberto — os dois → T13 (T14·2). Concluído, `Voltar ao checklist` → T13 e `Voltar ao menu` → T04 (T14·4). `Solicitar correção de cadastro` vira o registro no mesmo lugar, com a hora do protótipo e os dois valores anexados
- **o que fica gravado:** `etapas.ciclo` guarda o par, os passos pelo id do item da Seção E (`aprovada`, `reprovada` ou `pendente`), quantos foram feitos, o evento (`antes`, `disparado`, `recebido`, `conferido` ou `nao-chegou`) e a tentativa, o cartão e a correção pedida (o lido, o esperado e 14:30), se o ciclo concluiu e se a captura foi fechada. Voltar à T14 com o ciclo aberto, no mesmo par, retoma os passos que já valem e a correção; o evento se dispara de novo. Concluído, ela abre concluída

## O checklist (T13·1 a T13·6)

- **o pacote 2** (decisões 52 e 54, a construir): o que segue é o protótipo do pacote 1. A A fica com 3 (o chassi saiu) · o Painel é foto a tirar na B, obrigatória quando houve calibração, e a B começa em 0 de 5 — não há mais o Painel herdado da calibração · a D confere as cercas em regiões, o Extended ID, a APN e o leitor, sem a versão (o `CADEIA.versoes` sai do mock) · a E tem os 6 passos e *você faz o ciclo parado* · a semente das referências é 17 de 31, `Faltam 11 itens` · o item da bateria leva a `Refazer o diagnóstico`
- **no protótipo (o pacote 1):** a T13 é intocável até o pacote 2, e ainda mostra o que ele corrige — o *Chassi confere* e a versão gravada (`MUDANCAS.md` · O que este pacote não muda). A versão sai do `CADEIA.versoes`, que fica no mock como acréscimo nomeado até lá, e a A e a C leem `etapas.preChecagem` e `etapas.can`, que o diagnóstico grava com os nomes de hoje (o padrão do gate do pacote 1, item 2)
- **uma estrutura só (a entrega do checklist, decisão 34):** o título com a contagem, a barra fina — o lima é o que já passou; o número fica no título — e os seis cartões de seção de 58, a 8, cada um com o veredito no poço, o nome, quem age, a contagem e a seta. Uma seção aberta por vez: tocar num cartão faz ele crescer no lugar, com a seta pra cima, e os itens entram embaixo da cabeça; tocar em outro troca, e tocar no aberto fecha. As seções de baixo descem por transform e os itens esmaecem, em 200 ms; nada mais se mexe, e a rolagem fica onde está (a 06 desenha a F aberta cortada no pé, na rolagem 0). Nascer aberta (a URL, a coluna, o print) não anima (`SecoesDoChecklist`, `SecaoDoChecklist`)
- **quem age, embaixo do nome:** A, C e D, *o app confere sozinho*, e *o app conferiu* no homologado · B, *você fotografa N itens* (as fotos por fazer) e, sem nenhuma por fazer, *N fotos tiradas* (as tiradas aqui e a herdada da calibração) · E, *você faz o ciclo em movimento*, e *o ciclo passou* com os cinco passos · F, *espera o servidor · não bloqueia*, e *o servidor confirmou* com os três. Com 1, o singular (a resposta do arquiteto de 26/09): *você fotografa 1 item* e *1 foto tirada*; e no rodapé, *Falta 1 item* (o singular do `Faltam N itens` com o verbo junto, proposta pro arquiteto). As fotos tiradas contam também o item salvo com a ressalva, que tem a foto do problema (decisão 39); sem nenhuma, o cartão fica só com o nome (G25)
- **tem seta, toca; sem seta, é leitura (Lei 16):** a foto por fazer, com a câmera e *foto a tirar*, abre a câmera do app (07) · o automático que falta leva à tela que resolve, pelo `origem` do mock — conectar → T05 · ativo → T06 · can → T07, o diagnóstico (a T08 saiu: as duas rotas da T13 que iam pra ela apontam pra T07, o padrão do gate do pacote 1, item 2) · configurar → T09 · calibração → T10 —, com o ícone da ferramenta e *a fazer* (nenhuma referência desenha esse item: no caminho do herói nada falta em A, C e D) · o que reprovou com a leitura (a bateria) abre o nível do item (09) · na E, uma ação só, *Fazer o ciclo dinâmico* · *os 5 passos, com o ônibus em movimento* → T14, enquanto falta passo. Sem seta: as leituras de A, C e D, o feito, a ressalva, os passos da E e a F, que não tem ação
- **o que cada item diz:** A, o serial, o firmware, a placa e o chassi *confere* · B, o Painel *fotografado na calibração, às 14:30* (a hora da foto da T10, o relógio parado), a ressalva *com ressalva · a causa* (a primeira oração da justificativa, com a minúscula: *suporte trincado*), e a foto tirada aqui só com o nome — nenhum texto aprovado diz de onde ela veio (G25) · C, o lido da CAN (*13,8 V*, *9 satélites*), *conforme* nas entradas e *sinal bom* no modem, sem o dBm · D, *feita*, a tradução do modelo (*urbano v3*), a cerca (*G07*), *gravados*, o intervalo do preset de eventos do modelo (*intervalo 30 s*), *atual*, *gravado*, a versão gravada inteira e o painel semeado (*482.317 km*, *9.640 h*) · E, *confere* ou *a fazer* · F, *espera o envio*
- **cada item lê a etapa que o produziu:** A, a sessão, `etapas.preChecagem` e `etapas.ativo` · B, as fotos e ressalvas do próprio checklist e a foto de `etapas.calibracao` · C, `etapas.can` (o lido do caso do ativo, se não foi consumido, ou o nominal) e a leitura nominal do módulo (`leituraNominalModulo`, AC-13) · D, `etapas.cadeia` e `etapas.calibracao` · E, `etapas.ciclo` · F, a fila desta sessão
- **a semente:** pular pro checklist pelo palco semeia só a sessão; sem o diagnóstico gravado, o checklist lê o que as telas T05 a T10 gravariam no caminho do herói — o diagnóstico aprovado, o vínculo (e o chassi, que a T13 mostra até o pacote 2), a CAN lida, os seis blocos relidos e o hodômetro semeado com a foto. A, C e D resolvidas, o Painel herdado, B e E por fazer, F esperando: 19 de 31, `Faltam 9 itens`, como a entrega de 25/09 desenha. No caminho do herói, o checklist abre depois do ciclo: 24 de 31, `Faltam 4 itens` (13)
- **a Seção F (G22):** conta só os itens da fila do ativo criados depois da abertura da sessão, pelos tipos da fila (AC-14). O que o herói subiu às 09:14 e 09:15 é da instalação de antes, e não conta. Antes do Finalizar, nada desta sessão está na fila, e ela espera. O `Finalizar instalação` gera o relatório (HU-T13-7) — as evidências e o checklist — na fila, às 14:30, e a Seção F conta ele: 3 de 3, *o servidor confirmou*. Aberta assim, nenhuma referência a desenha, e os itens ficam com os valores do C10, do mock: `12 subiram`, `31 de 31`, o ID na plataforma `na fila` (G25). Ela falha quando o servidor diz que não: o evento de teste que não chegou (T14/02), um item desta sessão recusado, ou o ativo do `pronto-para-fechar`, sem resposta — o X na seção e nos três itens
- **o Finalizar (T13·3):** acende quando A a E estão resolvidas; o toque grava `etapas.checklist.homologada` e a hora, gera o relatório e mostra o homologado (11): o veredito no topo, embaixo da barra — *Instalação homologada às 14:30* e *o relatório leva 12 evidências, o local e o seu nome* (`checklist.evidencias`) —, que esmaece no lugar em 150 ms, e o `Encerrar sessão` no rodapé. Com a localização negada (14, o caso `localizacao-negada`), o relatório diz *o relatório vai sem localização*; nada no mock nega a localização no fluxo, e o 14 só abre pela coluna, parado. Com a Seção F falhando, o toque abre o diálogo da ciência (10); marcado o `Estou ciente`, o Finalizar do diálogo homologa, e a ciência fica gravada com o nome e a hora
- **o que fica gravado:** `etapas.checklist` guarda o ativo, que foi aberto, as fotos tiradas e as ressalvas (a justificativa, a hora e a hora da foto do problema, decisão 39), a conta do menu (`pendentes`), se homologou e quando, e a ciência. Voltar ao checklist no mesmo ativo reabre o que foi resolvido; homologado, ele abre no 11
- **a URL de cada quadro:** as seções fechadas, a tela (00), ou o 11 no homologado · a seção aberta, o momento dela (01 a 06), a B com ressalva no 12 e a E resolvida no 13; homologado, a seção aberta não tem referência, e a URL sai do momento. Aberto pela URL, o quadro é o fluxo depois dos toques que levam lá (G20), e grava o que eles gravariam: o 11, as fotos de B, o ciclo e o Finalizar; o 12, o primeiro item de B salvo com a ressalva de exemplo (`checklist.exemploJustificativa`) e a foto do problema; o 08 e o 15, o primeiro item de B por fazer com a caixa marcada e o texto de exemplo — o 15 com o problema fotografado às 14:30; o 13, o ciclo que a T14 fecha (`etapas.ciclo` concluído)
- **o nível do item:** o rótulo de topo é o título longo da seção que o técnico faz (*B · INSTALAÇÃO FÍSICA*, 07 e 08) e o nome curto da que o app confere (*C · HARDWARE*, 09) — é o que as referências da entrega desenham, e vai pro arquiteto
- **os caminhos:** o item reprovado leva ao nível do item (09), e `Refazer a leitura da CAN` à T07 (com o pacote 2, o botão diz `Refazer o diagnóstico`), onde mora o `Ler de novo` (T13·2; a T08 saiu) · a ação da E abre a T14 (T13·4), e a Seção E é a mesma se a T14 saiu por `Encerrar o ciclo` ou por `Ir para o checklist` (T14·2): os pendentes ficam *a fazer*, o aprovado diz `confere`, e a ação continua · `Tirar foto` e `Salvar com ressalva` seguem pro próximo item por fazer; sem próximo, voltam à Seção B aberta · no item manual, marcar *Não está conforme* → 08, `Fotografar o problema` → 15, desmarcar → 07 (O não conforme com a foto do problema) · o voltar faz o `Voltar ao menu` nas seções e no homologado (T13·6), e o `Voltar ao checklist` no nível do item

O roteiro `app/scripts/caminhos/checklist.mjs` prova a estrutura por toque (`node scripts/caminho.mjs checklist`): nascer aberta sem animar, a seção que cresce e fecha com o movimento conferido, a troca de uma aberta pra outra, o reduzir movimento, os quadros 11, 12 e 13 pela URL, a foto por fazer que abre a câmera, o não conforme com a foto do problema (a caixa, o disparador, o registro, o apagado, a ordem livre, o 08 e o 15 pela URL, o teclado no campo), o singular e a ação da E que abre a T14.

## O voltar do Android

O botão de voltar do sistema faz **o mesmo que o link de saída do rodapé** daquela tela — nunca um caminho que a tela não oferece. No protótipo é o Esc do computador, numa peça só pras 15 telas, `useVoltar` (`app/src/estado/voltar.js`): cada tela diz o que ele faz em cada momento, e passa nada onde ele não faz nada.

- **a saída é o link que sai:** o que leva a outra tela, ou ao nível de cima da mesma (a lista, o mapa, a seção). O link que fica no lugar (o `Procurar de novo` da busca da T05, o pedido de correção da T14) ou que avança o fluxo não é saída, e o voltar não faz nada
- **sem link**, a saída é o primário quando ele é a única saída e só navega: o `Voltar ao menu` da *Sessão encerrada* (T16) e da cadeia concluída (T09/04), o `Ir para o menu` do pacote baixado (T03/02), o `Escolher outro` das travas sem link da T06, o `Procurar outro módulo` das travas sem link da T07 (02, 03). O primário que é ato (`Entrar`, `Sincronizar`) não é saída
- **onde a tela não tem saída desenhada** — o login, a escolha da unidade, o menu, a busca da T05 —, ele não faz nada no protótipo (`08-para-o-dev/o-que-o-produto-ainda-decide.md`)

Nos processos que não podem parar, ele **não sai**:

- **na cadeia da T09**, antes de a Conexão gravar, ele abre a recuperação; na recuperação, que só oferece `Continuar a gravação`, não faz nada
- **no diagnóstico correndo, na atualização do firmware (T07/06, D4), no encerramento e no autoteste**, ele não faz nada — o processo termina sozinho em segundos. Terminado o processo, vale a saída do rodapé: o diagnóstico sem trava tem o `Voltar ao menu`, e o travado, o `Procurar outro módulo`. Na *Sessão encerrada*, com o autoteste terminado, ele faz o `Voltar ao menu`, a saída que ela tem (T16)
- **na baixa do pacote (T03) e na releitura da CAN (T07/10)**, que dizem *não saia da tela* e não têm saída, ele não faz nada
- **no semear da calibração (T10)**, nos 2 s de *Gravando no módulo…* e *Relendo…*, ele não faz nada: o semear grava no módulo, e parar no meio deixaria o valor pela metade (a decisão do diretor de 25/09). O `Voltar ao menu` fica no lugar, desabilitado de verdade e em `--tinta-apagada` (Nenhum botão aceso que não faz nada, regra 12, e a lei 17), e o `ENCERRAR` também, como na releitura da CAN (T07/10, logo abaixo). Terminado o semear, valem o `Voltar ao menu` e o `ENCERRAR` de novo
- **na sessão interrompida (T16/06)**, ele não faz nada: `Retomar` e `Descartar` são atos, e o voltar não escolhe no lugar do técnico (T16·6)
- **numa folha ou num diálogo**, ele fecha a folha ou o diálogo, como o X ou o Cancelar. O diálogo sem X nem Cancelar — o *Senha alterada* (T01/09, HU-T01-10) — não fecha, e o voltar não faz nada. O aviso do acesso (T04/12), que também não tem Cancelar, fecha: o `Entendi` só fecha, não é ato, e é a única saída
  - no protótipo (decisão 36): o diálogo *Encerrar sem homologar?*, em qualquer tela com a faixa, fecha pelo voltar como pelo `Continuar a instalação`, e o voltar da tela embaixo espera — enquanto ele está aberto, o Esc é dele (`useVoltar(acao, { porCima: true })`: o de cima responde, e o Esc que ele atendeu não chega a mais ninguém)

**O `ENCERRAR` da faixa faz o mesmo que o voltar** (a lei 17, decisão do diretor de 25/09): antes de a Conexão gravar, na cadeia da T09, ele abre a recuperação; onde o voltar não faz nada — a releitura da CAN (T07/10), o semear da calibração (T10) e a própria recuperação da T09 (T09/03) —, ele fica desabilitado de verdade, em `--tinta-apagada`, sem o pressionado, e o motivo já está escrito na tela (a peça: `Faixa`, `acaoDesabilitada`). No diagnóstico correndo, nas travas e na atualização do firmware, a faixa ainda não desceu (ela desce quando as sete linhas passam sem trava), e no encerramento da T16 ela não mostra o `ENCERRAR`: ali nada muda.

**Onde ele não escuta:** no print (`?print=1`) e num estado aberto pela coluna do palco, que fica parado e sem toque. Com o painel do palco aberto, o Esc fecha só o painel, que o pega antes (na captura).

| Tela | O que o voltar faz |
|---|---|
| T01 | na entrada (00, 01, 10, 14, 15, 16, e a entrada depois de sair da conta, com o usuário lembrado ou sem ele, no fluxo), nada · no canal, no código e na senha nova (02, 03, 05 a 08, 12, 13, e o código no teto, 17), o `Voltar ao login` · na folha *Não recebi o código* (04, 11), fecha, como o X · no diálogo *Senha alterada* (09), nada · o diálogo de outro usuário (18) mora na T02, e fecha no `Entendi` · a 17 e a 18 pela coluna ficam paradas |
| T02 | de uma empresa só, nada (00 a 04, e o 08) · o herói, com três empresas: nas empresas (05 e 07), nada, e nas unidades (o quadro do 06, e o 09), o `Trocar de empresa` → o 07, com a atual marcada · o 05, o 06 e o 08 pela coluna ou pelo endereço ficam parados · com o diálogo de outro usuário por cima (T01/18), o `Entendi`, como o aviso do acesso (A empresa e a unidade) |
| T03 | baixando (00), nada · na falha (01), o `Voltar ao contexto` → T02 · baixado (02), o `Ir para o menu` → T04 · no de 4 dias (03), o `Continuar com este pacote` → T04 · no vencido (04), o `Trocar de unidade` → T02 |
| T04 | no menu (00 a 04, e o sem rede, 15), nada · numa folha (05, 07, 08, 10, 11), fecha, como o X · no diálogo de sair (06), o `Cancelar`, que volta à folha Conta · no de trocar (09), o `Cancelar` · no aviso do acesso (12, no fluxo), o `Entendi` · no diálogo do ENCERRAR (13), o `Continuar a instalação` · a folha com o Trocar de empresa (14) abre pela coluna, parada; no fluxo, é a folha do herói — a do 07, com o link —, e o voltar fecha como o X |
| T05 | na busca (00, 01, 02, 04), nada · no vazio (03), o `Voltar ao menu` · sem Bluetooth ou sem a permissão (16, 17), o `Voltar ao menu` |
| T06 | na lista (00) e na busca sem resultado (08), o `Voltar ao menu` · na confirmação do vínculo (01), no módulo em outro ativo (10), no que já é deste ativo (11) e no conflito com saída (05), o `Escolher outro` → a lista · nas travas sem link (04, 06), o `Escolher outro` do primário → a lista, com a busca como estava (a placa de outro pacote dá o 08) |
| T07 | sem trava, antes do ativo (00, 07), e com a CAN lida (01, 08, 09), o `Voltar ao menu` · nas travas (02 a 05), o `Procurar outro módulo` → a T05/01 · na leitura correndo, na atualização do firmware (06) e relendo a CAN (10), nada |
| T09 | no que vai ser gravado (05), nas travas do envio (06, 07) e no escolher o bloco (08), o `Voltar ao menu` · correndo (00), recusado (01) e pausado (02), a recuperação (03) · na recuperação, nada · concluída (04), o `Voltar ao menu` · reenviando, na manutenção (09), nada: o processo termina sozinho (padrão do protótipo) |
| T10 | o `Voltar ao menu`, em todo passo (00 a 05, 08, 10) e na calibração completa (09), embaixo do `Fazer o ciclo de testes` · no meio do semear (*Gravando no módulo…*, *Relendo…*), nada: o semear não para, e o `Voltar ao menu` fica desabilitado (a decisão do diretor de 25/09) · a câmera da calibração (06 e 11) saiu com a decisão 52 |
| T11 | o que diverge (00, e o 04, que abre só pela coluna), nada: o link é o `Outras ações`, que não sai da tela · na folha *Outras ações* (03), fecha, como o X · o conteúdo que o app não reconhece (01, só pela coluna), o `Apenas registrar o diagnóstico` · tudo confere (02), o `Voltar ao menu` |
| T12 | na lista (00, 02, 03), o `Voltar ao menu` · no detalhe (01), o `Voltar às instalações` |
| T13 | nas seções, fechadas ou com uma aberta, e no homologado (00 a 06, 11 a 13), o `Voltar ao menu` · no nível do item (07 a 09 e 15, e o item com a câmera sem a permissão, que não tem endereço), o `Voltar ao checklist` · no diálogo da ciência (10), o `Cancelar` · o homologado sem localização (14) abre só pela coluna, parado |
| T14 | com o ciclo aberto (00 a 03), o `Ir para o checklist` · no ciclo concluído (05), o `Voltar ao menu` · com o caso de identificador correndo (04, 06), nada |
| T15 | o `Voltar ao menu` (00 a 04) |
| T16 | no encerramento (00, 01), no autoteste e na sessão abortando (03), nada · encerrada (02, 04, 05), o `Voltar ao menu` · interrompida (06), nada |

O roteiro `app/scripts/caminhos/voltar.mjs` prova a tabela: cada tela pelo endereço e pelos momentos com saída própria, o Esc e o destino (`node scripts/caminho.mjs voltar`) — e o diálogo do ENCERRAR, no `13` do menu e por cima da T07, onde o Esc fecha só o diálogo e a T07 fica.

## Os cartões em espera

A ferramenta que espera módulo ou ônibus é **desabilitada de verdade**: o toque não faz nada, e o motivo já está escrito no cartão. Pro leitor de tela, ela é desabilitada — nunca um botão que não responde.

## Módulo e ativo travados

Com a sessão aberta, **o módulo e o ativo não trocam** — é a HU-T16-2. Tocar no cartão de qualquer um dos dois, no menu, abre a folha dele: o que está conectado, *Travado na sessão*, e `Encerrar a sessão`, que segue a mesma regra do ENCERRAR da faixa.

## A calibração semeia com o número

Na T10, o botão principal acende **com o número digitado**, e sempre diz o que falta: *Digite o que o painel mostra* → `Semear o hodômetro`. **A foto do painel não é daqui** (decisão 52): ela é um item da Seção B do checklist, obrigatória quando houve calibração. **O horímetro só aparece quando o modelo tem, e é opcional**: depois do hodômetro, `Calibrar o horímetro` e o link `Pular o horímetro`.

No estado único, `etapas.calibracao` guarda, de cada grandeza, o número digitado (`painel`) e o semeado com o relido (`semeadas`) · até o pacote 1, guardava também a foto com o carimbo (`fotos`) e o `foto`, que o checklist lia pro Painel herdado; com a decisão 52, a foto do painel é tirada no checklist, e a calibração só diz se houve (o Painel aparece na B quando houve). O semear corre em 1 s gravando e 1 s relendo (`ritmos.js`), e não para: nesses 2 s, o `Voltar ao menu` e o voltar do sistema não fazem nada (O voltar do Android). A hora da foto e da releitura é a do relógio parado, 14:30, como as referências da entrega do checklist desenham.

## O aviso do acesso

No 5º dia da sessão de acesso — `situacao.sessaoAcesso` —, o diálogo *Seu acesso vence em 2 dias* aparece na primeira chegada ao menu, uma vez por dia. O herói está nesse dia, então **ele aparece no caminho feliz**, uma vez; `Recomeçar do login` mostra de novo.

No protótipo, o relógio parado faz do *uma vez por dia* uma vez só:

- **o dia do aviso** vai do `avisoNoDia` até o fim da `validadeDias`, e os dias do título são o que resta, `validadeDias − abertaDiasAtras` — nunca digitados
- **a chegada** é a do menu sem nada por cima, com a sessão ou sem ela: pelo fluxo (depois da sincronização, a do herói) e **pela semente** — o pulo do palco pro menu e o endereço `?tela=T04` também são chegada, e mostram o aviso. Um endereço de folha ou diálogo abre a folha ou o diálogo, e o aviso espera o menu ficar sem nada por cima: a folha termina de descer, e só então ele entra, pelo movimento do próprio diálogo (150)
- **o `Entendi` fecha** e grava no estado único que ele foi visto (`avisoDoAcessoVisto`): o técnico volta ao menu quantas vezes quiser, sai e entra de novo, e ele não volta no mesmo dia. `Recomeçar do login` e o pulo do palco zeram o estado, e ele volta
- **o `Entendi` é o único jeito de fechar**: o diálogo não tem `Cancelar`, e o voltar faz o mesmo que ele (O voltar do Android). O véu cobre o menu inteiro, a tira e a faixa também, e nada atrás dele se toca (T04/12)
- **o estado 12** abre pela coluna com o diálogo aberto, parado e sem toque. **No print**, o aviso só aparece no 12: a foto é o quadro que a referência desenha, e as outras da T04 não desenham ele

## O diagnóstico do módulo

Depois de conectar, o diagnóstico lê o módulo: o serial, o firmware, a alimentação, o GPS, as entradas, o modem e o SIM. **Três linhas travam a instalação** — o serial fora do cadastro, o modelo sem suporte e o firmware não homologado. O firmware tem `Atualizar`; sem rede no módulo, `Gravar a conexão` grava só a conexão, isolada — a sessão já existe, e a conexão não depende do ativo —, e o firmware atualiza por ela. `Procurar outro módulo` volta pra lista da T05, sem nada escolhido. **As outras só informam**: o app segue, e o checklist registra. A CAN só aparece com o ativo — até o bloco do ativo ser gravado, ela espera. Depois, `Ler de novo` relê a CAN inteira. Os dados vêm de `diagnostico` no mock.

- **no protótipo, a faixa** (o padrão aprovado no gate do pacote 1, até a errata): as sete linhas acendem uma a cada 600ms (`movimento.md`), ainda sem a faixa; passando sem trava, a faixa desce, e a tela é a 00 — *7 de 7*, `Selecionar ativo` e `Voltar ao menu`. O modem sem sinal (07) só informa: a faixa desce também, com *6 de 7*. Nas travas (02 a 05) e na atualização do firmware (06), a faixa não desce, e o módulo fica em cima do título — *M2C-0999 · fora do cadastro*, ou o serial e a placa do cadastro
- **`Procurar outro módulo`**, nas travas, leva à T05/01, a lista sem nada escolhido (o padrão aprovado no gate)
- **a CAN depois da cadeia** (D2): com o bloco do ativo gravado, o diagnóstico abre com a CAN lida (01). A cadeia concluída só tem `Voltar ao menu` (T09-A3), e o herói chega ao 01 pelo `Diagnóstico do módulo` do menu. Na manutenção, o bloco do ativo já está no módulo, e a CAN aparece lida logo depois do vínculo (gate do pacote 1, D2). A caixa *Aguardando a configuração do ativo* nunca dá lugar às linhas na frente do técnico: a T07 volta já lida, e a entrada de tela não anima (gate do pacote 1 · o que não faz sentido)
- **a atualização do firmware** (D4, T07/06): termina sozinha e relê o diagnóstico, e o voltar e o ENCERRAR não fazem nada durante. O quadro dos 62% fica 1 s (`RITMOS.cadeiaBlocoMs`, o padrão aprovado no gate) e o diagnóstico relê
- **o `Gravar a conexão`** do firmware sem rede no módulo (05) vem antes de haver ativo e cadeia, e a Conexão é o sexto bloco dela: a pergunta está com o arquiteto (gate do pacote 1 · o que não faz sentido)
- **o que abre só pela coluna:** as travas, o modem sem sinal e os dois sinais da CAN (As portas naturais)

## O vínculo decide o modo

Confirmar o vínculo liga o módulo ao ativo, na empresa: placa, frota, fabricante e modelo — **sem chassi**. Se o módulo já está em outro ativo, a tela avisa, e `Desvincular e vincular aqui` desfaz o vínculo antigo e registra o desvínculo. Se o módulo já é deste ativo, **é manutenção**. Módulo novo neste ativo é instalação nova — o padrão do herói. O `moduloSerial` do cadastro é o módulo **previsto** pro ativo: o modo vem do caso, nunca do cadastro.

- **no protótipo** (D1, com a condição do gate do pacote 1, item 5): o padrão é a instalação nova. O cadastro já põe o M2C-0417 no RKT-8H42, e o caso `modulo-ja-deste-ativo` é o mesmo par: se o vínculo lesse o par, toda instalação do herói seria manutenção. Por isso a manutenção vem só do caso, pela coluna (T06/11), e `Seguir pra manutenção` → T09, no escolher o bloco (08)
- `Vincular o módulo` (01) e `Desvincular e vincular aqui` (10) → T09, no que vai ser gravado (05) · o desvínculo é um fato da sessão, sem tela própria (D3)

## O que vai ser gravado

Na instalação nova, a configuração abre na conferência do que vai ser gravado: todos os blocos, obrigatórios, com **a limpeza primeiro** — ela diz o que apaga e o que preserva, e apaga só a parte dos blocos que vão ser gravados. **O espaço no módulo e as cercas são calculados ali**, sobre o que vai ser gravado: se não cabe, a gravação não começa, e o botão vira `Procurar outro módulo` — com a sessão aberta, ele pergunta antes: *Encerrar sem homologar?*. Na manutenção, o técnico escolhe um bloco, e a cadeia curta grava só ele.

- **no protótipo, `Procurar outro módulo`** (06, 07): com a sessão aberta, o módulo não troca (Módulo e ativo travados), então ele abre o diálogo *Encerrar sem homologar?*, como o ENCERRAR da faixa (decisão 36 · o padrão aprovado no gate do pacote 1)
- **o conteúdo de cada elo** é o do par da faixa — o do caso, nunca o do herói (decisão 49 e a errata) —, lido do cadastro: o modelo do ativo (*OF-1621*), as regiões dele (*4 regiões* no herói, *nenhuma* nos outros; decisão 50), o leitor pela variante do módulo (*sem fio*, ou *no fio branco*), o intervalo do preset de eventos (*intervalo 30 s*) e a APN da conexão (*m2m.mobs2.br*, decisão 51). No herói, a conta dá o `CADEIA.conteudo` do mock. A T09/02 e a 03 desenham *4 regiões* no PCX-9A17, que não tem região: o protótipo diz *nenhuma* (desvio nomeado na ficha da T09)
- **as travas do envio** são a regra do cadastro, e valem toda vez que o par aparece: os registros do modelo do ativo contra a capacidade da variante (06), e as regiões contra o limite dela (07, as do caso `pool-esgotado`)

## O menu sem rede

Sem rede, o menu continua todo de pé — o Bluetooth e o pacote bastam pra instalar. **Só o `Últimas instalações` espera a conexão**, porque é o único que pergunta ao servidor (T04/15).

- **no protótipo** (decisão 48): o herói começa com rede, e o `Últimas instalações` fica ligado, com o relógio de histórico. O menu sem rede abre pela coluna, montado pelo caso `sem-conexao-no-menu` (T04/15)

## O mundo real

Quatro estados que vêm do celular, e não do módulo nem do ativo. Nenhum trava o que já foi feito.

- **Bluetooth desligado**, na T05 — `Ligar o Bluetooth` pede ao Android, e a busca começa sozinha quando ele liga
- **Bluetooth sem permissão**, na T05 — `Permitir` pede de novo. Se o técnico marcou *não perguntar de novo*, o Android não deixa o app perguntar: o botão vira `Abrir as configurações`
  - **no protótipo**, a resposta do Android vem do caso: o `bluetooth-desligado` não traz recusa, e o `Ligar o Bluetooth` leva à busca (a lista sem nada escolhido, T05/01). No `bluetooth-sem-permissao`, a resposta é *negada*: o Android não deixa perguntar mais, e o primário vira `Abrir as configurações` no mesmo bloco. As configurações do Android não se desenham: o `Abrir as configurações` volta com a permissão dada, e a busca começa (`app/src/telas/T05/celular.js`)
- **câmera sem permissão**, no checklist — o quadro diz o que falta, e o botão vira `Abrir as configurações`
  - **no protótipo**, a permissão vem do caso, e nenhum caso nega a câmera desde o pacote 2: o `camera-sem-permissao` saiu com a T10/11 (decisão 52), e no fluxo, e em todo estado, a câmera abre. A câmera do app é uma peça só, a do checklist (`VisorCamera`, em `app/src/ds/checklist/`). No item manual da T13, sem a permissão: a câmera riscada, sem a frase — o `textos.md` não tem a do item (G25) —, também com o *Não está conforme* marcado: desde a decisão 39, a ressalva exige a foto do problema, e o primário sem a foto é o `Abrir as configurações` (antes, o `Não conforme` continuava, porque a ressalva não precisava da câmera). As configurações do Android não se desenham: o `Abrir as configurações` volta com a permissão dada, e a câmera abre com o `Tirar foto` (`app/src/estado/camera.js`, provado em `node scripts/testar-camera.mjs`). A câmera sem permissão não tem endereço no fluxo: a URL sai do momento, como no item reprovado da T13
- **login sem conexão**, na T01 — o aviso *SEM CONEXÃO*, e os campos ficam preenchidos, porque a senha não estava errada
  - **no protótipo**, a rede é a `situacao.rede` do estado único, que o mock abre conectada: no fluxo, o `Entrar` segue a regra da senha. Sem ela, o aviso no lugar do erro, os campos como estavam e o `Entrar` aceso, que tenta de novo; com a conexão de volta, a regra da senha (`app/src/telas/T01/regras.js` · `depoisDoEntrar`)

**O login sem conexão e os dois do Bluetooth abrem só pela coluna** (T01/14, T05/16 e 17), parados e sem toque: nenhum gatilho do mock tira a rede do login, desliga o Bluetooth ou nega a permissão dele no fluxo. O toque do primário de cada um se prova no node, nas funções que a tela usa (`node scripts/testar-login-e-bluetooth.mjs`), e o roteiro `voltar.mjs` confere que os três ficam parados, sem toque e sem voltar. **A câmera sem a permissão** não tem mais estado na coluna: a T10/11 saiu com a decisão 52, e a do item da T13 se vê na vitrine (`f7-visor-sem-permissao-item`). O primário da câmera sai de `primarioDaCamera`, que a T13 lê e o `node scripts/testar-camera.mjs` prova · até o pacote 1, a T10 lia a mesma função, e o `voltar.mjs` conferia a T10/11 parada, sem toque e sem voltar.

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

- **a permissão negada tem saída:** o Bluetooth desligado, a permissão do Bluetooth e a da câmera (T05/16 e 17, e a câmera do checklist; a T10/11 saiu com a decisão 52) têm sempre um primário que leva adiante: o Android liga o Bluetooth ou pergunta de novo, ou `Abrir as configurações`, que volta com a permissão dada — na câmera, e no Bluetooth quando o Android não deixa perguntar mais (O mundo real; `app/src/estado/camera.js`, `app/src/telas/T05/celular.js`). O login sem conexão tenta de novo
- **o que não faz nada é desabilitado de verdade**, como os cartões em espera: o toque não faz nada, o leitor ouve desabilitado, e o desenho é o da referência — o primário apagado que diz o que falta, a tira da T04 com a folha ou o diálogo por cima, a faixa da T13 com o diálogo da Seção F
- **a régua:** `app/scripts/aceso.mjs` toca cada tocável aceso de cada tela e momento do fluxo, um por vez, e confere se alguma coisa mudou — o endereço, o desenho ou o foco levado a outro lugar (o foco que o botão ganha do próprio toque não conta). Os lugares que nascem de um toque depois da entrada entram com esse toque: o menu sem o aviso do acesso (T04/00, 01 e 02), a busca que acha na T02 e a recuperação da T09. O cronômetro do código da T01 se mede sem os números, e a conferência da T11 e o encerramento sem homologar, depois de acabar. São 83 lugares até o pacote 1 — com o `13` da T04, o diálogo do ENCERRAR antes de homologar, cujos dois tocáveis fazem alguma coisa (a otimização do design) —, e a conta se faz de novo com as telas dele; os 4 que não se medem — a releitura da CAN (a T08/01; agora, a T07/10), a cadeia (T09/00) e o autoteste (T16/00 e 01) — acabam em outro lugar, que se mede sozinho (`node scripts/aceso.mjs`, `prints/aceso.json`). O encerramento sem homologar (T16/03) também acaba em outro lugar, a 04: conforme o tempo da máquina, a régua o mede depois de acabar ou o deixa sem medir, e a 04 se mede nos dois casos (no fechamento do mundo real e no da entrega do checklist, a rodada inteira deixou 5 sem medir)
- **nenhum fica, desde a construção da otimização do design:** o `Sincronizar` das seis unidades que só a lista longa tem (T02/03, depois de uma busca que acha) baixa o pacote que o caso `lista-longa-garagens` declara pra cada uma, e o `Procurar de novo` da lista sem nada escolhido (T05/01) mostra o quadro da busca da T05/00, por 1,2 s — o ritmo do arquiteto (a última entrega; `ritmos.js` · `buscaMs`, `movimento.md`) —, antes de a lista voltar (na T05/00, o quadro da busca é a própria 00, e o que muda é a lista que volta: a janela do toque da régua passou a cobrir a busca, `RITMOS.buscaMs` + 400, e não mais 800 ms) · o `ENCERRAR` da recuperação da T09 (T09/03) fica desabilitado de verdade e em tinta apagada, como a referência nova desenha (a lei 17; O voltar do Android) · a régua olha a janela inteira do toque, de 100 em 100 ms até o fim dela (1,6 s, `RITMOS.buscaMs` + 400): o que muda e volta — o quadro da busca que passa — também mudou

## O checklist

Uma estrutura só em todas as telas da T13: o título com a contagem, a barra fina e os seis cartões de seção. Tocar num cartão faz ele crescer no lugar — as seções de baixo descem, e nada mais se mexe. **Tem seta, toca; sem seta, é leitura.**

- a contagem vem do mock: no caminho feliz, ao abrir o checklist depois do ciclo, são 24 de 31 · antes do ciclo, 19 de 31, porque o Painel já vem da calibração e a F espera o servidor
- item pendente leva à tela que resolve, pelo campo `origem` de cada item do mock
- a E tem uma ação só, *Fazer o ciclo de testes*, que abre a T14 · a F não tem ação: espera o servidor
- o homologado mostra o veredito e o relatório no topo · com a localização negada, o relatório vai sem ela

## O próximo passo depois da calibração

A calibração completa leva direto ao ciclo de testes: *Fazer o ciclo de testes* é o botão principal, e *Voltar ao menu* fica embaixo. O caminho feliz anda em linha — calibra, ciclo, checklist.

- **no protótipo**, os dois gravam a calibração concluída na etapa (`etapas.calibracao.concluida`): o `Fazer o ciclo de testes` abre a T14, e o `Voltar ao menu` leva ao menu; o voltar do sistema faz o `Voltar ao menu`. Voltar à calibração depois abre a 09, com as mesmas duas saídas

## A busca que esconde a escolha

Na T02 e na T06, se a busca esconde o que já foi escolhido, o primário apaga — ele não confirma o que não está na tela. Quando a escolha reaparece, ele acende de novo. A escolha não se perde.

- **no protótipo**, construído pela decisão do diretor de 25/09 e pela otimização do design (A escolha do ativo, e o `busca.mjs` prova). A URL segue o quadro: o `04` da T02 e o `09` da T06 enquanto a busca acha outros e esconde a escolha, o `03` e o `08` quando ela não acha nada, e nenhum momento quando a escolha volta — na T02, no mundo do caso, a escolha não vai pra URL, porque o `01` é o quadro de outro mundo (o do herói até a otimização 400; agora, o de uma empresa só). O endereço de cada um abre a tela nele: o `04` no mundo do caso `lista-longa-garagens`, com a Várzea escolhida e *Olin* digitado; o `09` com o RKT-8H42 marcado e *PCX* digitado. Enquanto a busca esconde a escolha, o campo fica com o traço lima do campo focado, como as duas desenham

## A empresa e a unidade

O contexto é **empresa → unidade**, como o domínio diz (Empresa, UC e UO). A interface chama a UO de **unidade**; *Garagem Várzea* e *Pátio Caruaru* são nomes de unidade, e ficam como estão.

- **a ordem**: **a empresa vem sempre antes da unidade**, pra todo técnico — decisão do diretor, 26/09 · com várias empresas, o herói: `T02/05` as empresas → `T02/07` a escolhida → `T02/06` as unidades → `T02/09` a unidade escolhida → T03 · com uma empresa só, caso `uma-empresa`: `T02/08` a empresa já marcada → `T02/00` as unidades → `T02/01` a escolhida → T03
- **com uma empresa só**, a lista aparece com ela **já marcada** e o `Ver as unidades` aceso — o técnico só confirma · nas unidades, o nome dela fica em cima, e não há `Trocar de empresa`
- **com várias empresas**, o herói: *Pra qual empresa hoje?* · na lista das unidades, `Trocar de empresa` fica no rodapé, e continua lá com a unidade escolhida · na folha de trocar de unidade do menu, também — `T04/14`
- **com módulo conectado**, trocar de empresa pede a mesma confirmação de trocar de unidade: a sessão de configuração encerra antes (HU-T02-3) — a mesma folha, com a empresa no lugar da unidade
- **no protótipo** (a otimização do design, construída na T02; o mundo do herói desde a otimização 400): o `T02/05`, o `T02/06` e o `T02/08` são estados — abrem pela coluna e pelo endereço, parados e sem toque, como todo estado (`palco.md`): o `05` e o `06` montados pelo mundo do herói (`M.empresas`), o `08` pelo caso `uma-empresa`. O `05`, com as três empresas do herói, cada uma com *N unidades*, e o primário apagado, *Escolha uma empresa*, até escolher · escolhida, *Ver as unidades* → as unidades dela, com o nome em cima e o `Trocar de empresa` no rodapé (o `06`) · escolhida a unidade, *Sincronizar* e o nome dela (o `09`) → T03, que baixa o pacote dela · o `08`, a Viação já marcada, *1 EMPRESA* e o `Ver as unidades` aceso → as unidades, sem o `Trocar de empresa` (a `00`) · o voltar do Android, nas unidades do herói, faz o `Trocar de empresa`, a saída desenhada, e nas empresas e nas unidades de uma empresa só não faz nada. As funções em `app/src/telas/T02/empresas.js`, provadas no node (`node scripts/testar-empresa.mjs`)
- **no protótipo, o dado**: as unidades da Viação Atlântico Sul — a empresa do herói, `M.empresa` — são as do mundo dele (`M.ucs`, `M.uos`), e o gate confere que a contagem dela em `M.empresas`, e a do caso `uma-empresa`, é a de `M.uos`; a Transportes Capibaribe e a Expresso Caruaruense trazem só a contagem. As três linhas se escolhem, e, com uma das duas, o primário espera — *Ver as unidades*, desabilitado de verdade e em tinta apagada (a lei 17), sem fazer nada, como na busca que esconde a escolha —, porque não há o que mostrar sem inventar dado (confirmado pelo arquiteto em 26/09) · com a unidade escolhida, o rodapé segue com o `Trocar de empresa` — o padrão que a `T02/09` desenhou na otimização 400
- **no protótipo, a folha de trocar de unidade** (T04/14, construída na T04; a do herói desde a otimização 400): o `14` também é estado — pela coluna e pelo endereço, montado pelo mundo do herói, parado e sem toque —, e no fluxo o quadro dele é a folha do herói: tocar no nome da unidade abre a folha com o `Trocar de empresa` no fim (a URL diz o `T04/07`, o momento de tocar no nome). O `T04/07` aberto pelo endereço é o app vivo no mundo de uma empresa só, sem o link, como a referência; a folha de quem sincronizou uma unidade de uma empresa só (a `T02/01`, a lista longa) também não o tem. O menu escreve o mundo no estado único ao montar, quando o contexto não o traz (`app/src/telas/T04/dados.js` · `mundoDoMenu`): o `07` pelo endereço, o de uma empresa só; o resto, o do herói, a semente da T04 — assim o `Voltar ao fluxo` reabre a mesma folha. O que o toque faz se prova no node, nas funções que a tela usa (`depoisDoTrocar`, `destinoDaTroca`; `node scripts/testar-trocar-empresa.mjs`): sem a sessão, a T02/07, com a atual marcada; com a sessão aberta, a confirmação de trocar de unidade com a empresa no lugar — *Trocar de empresa* no título, *é encerrada antes da troca, sem homologar.* e `Encerrar a sessão e trocar` —, os 4 passos da T16, e depois a T02/07. O link é o de 48, a 6 do cartão das unidades, comendo 4 em cima e embaixo, como a `14` desenha (o toque fica a 14 do cartão)
- **no protótipo, a otimização 400** (a empresa vem sempre antes da unidade, construída): **o Entrar da T01 leva o herói ao `T02/05`**, e ele anda por toque — a Viação (o `07` na URL) → `Ver as unidades` → as unidades, com o `Trocar de empresa` (o quadro do `06`, sem momento na URL: o `06` é estado) → a escolhida (o `09` na URL) → `Sincronizar` → T03 → o menu. O `07` e o `09` pelo endereço são o app vivo no mundo do herói. O mundo vai no estado único junto da unidade, `contexto.empresas` (`{ caso, atual }`, gravado no `Sincronizar`, em todo mundo: o do herói, o de uma empresa só e o da lista longa), e a T03 e a T04 o guardam como está. Antes do `Sincronizar`, o `Ver as unidades` e o `Trocar de empresa` da T02 também o gravam — o `Ver as unidades` com o passo, `{ caso, atual, passo: 'unidades' }` (`contextoDoQuadro`) —, e o `Voltar ao fluxo` do palco devolve o quadro de antes, no mesmo mundo (`palco.md`): as unidades da Viação, do `Entrar`, do menu e do `07` aberto pelo endereço, e o `07` depois do `Trocar de empresa`; a escolha tocada dentro do quadro não vai (a pergunta ao diretor, de 24/09). **O `Trocar de empresa` volta ao `T02/07`, com a atual marcada** — na T02, na folha do menu sem sessão (direto) e com a sessão (a confirmação, os 4 passos da T16, e a T02, que com o mundo no contexto e sem unidade abre no `07` e diz o `07`). A T02 aberta no fluxo com o mundo e a unidade no contexto (o `Voltar ao contexto` e o `Trocar de unidade` da T03) abre nas unidades da atual, sem nada escolhido; sem o mundo (o Entrar), no `05`. Trocar de unidade no menu leva o mundo junto; sair da conta o apaga. **De uma empresa só:** a T02 pelo endereço, ou pelo pulo do palco, é a `T02/00` — o app vivo no mundo do caso `uma-empresa`, a semente da T02 (`app/src/estado/sementes.js`) —, e o `T02/01` pelo endereço também; o `Sincronizar` leva o mundo ao menu, e a folha fica sem o link. O `T02/08`, a entrada desse mundo, só abre parado: o Entrar é o do herói, e o `Ver as unidades` do `08` → a `00` se prova no node. As funções em `app/src/telas/T02/empresas.js` e `app/src/telas/T04/dados.js`, provadas em `node scripts/testar-empresa.mjs` e `testar-trocar-empresa.mjs`; o roteiro `empresa.mjs` anda os dois caminhos, com a URL de cada quadro, e os do menu, sem e com a sessão

## As ações da conferência

A T11 tem as três ações dos requisitos, nomeadas pelo efeito — mas o rodapé segue a lei: um botão e um link (decisão 40).

- as linhas: as cercas, em regiões, a APN, o Extended ID — só leitura, fora da contagem —, os eventos e o leitor
- o rodapé: `Corrigir` com o primeiro bloco que diverge — `Corrigir as cercas` — e o link `Outras ações` · **um bloco por vez** (decisão 53); depois dele, os que dependem ficam *revisar em seguida*, pelo arraste do mock, e `Revisar o leitor` segue com o próximo
- a folha *Outras ações*: *Reenviar os 5 blocos — a cadeia inteira, preservando a conexão* e *Apenas registrar o diagnóstico — nada é gravado* · fecha no xis
- sem divergência — só conteúdo não reconhecido —, o `Corrigir` não aparece: o principal é `Reenviar os 5 blocos`
- **no protótipo** (a entrega do pacote 1, construída na T11): `Outras ações` abre a folha, o `03` — a URL diz o `03` enquanto ela está aberta —, e ela fecha no xis e dos outros três jeitos da lei 20 (A folha que fecha). O véu começa embaixo da faixa, que fica acesa e desabilitada, e a conferência atrás dele fica inerte (G25). `Reenviar os 5 blocos` leva à cadeia da T09, a de sempre, e depois dela a mesma sessão confere (T11·2); `Apenas registrar o diagnóstico` põe o diagnóstico em `etapas.conferencia` e volta ao menu, sem item na fila (A conferência). Sem divergência (o 01, só pela coluna), o principal é o `Reenviar`, e o link, o `Apenas registrar`
- **no protótipo · o que o pacote 2 tira daqui** (decisão 53): o `Corrigir as N divergências`, que levava à cadeia inteira da T09 — a T09 não tinha desenho de uma cadeia só dos divergentes (G25) —, e a versão ilegível (o 04, só pela coluna), com a linha de condição e a legenda do arraste. O arraste de `M.cadeia.arraste` fica: é ele que marca os *revisar em seguida* da T11/05, aberta pela coluna com o caso `cercas-reenviadas`

## O que o servidor recebeu

O detalhe da T12 mostra os três critérios dos requisitos, e o status geral sai deles (decisão 41).

- **posicionamento** e **eventos**, cada um com o veredito e o porquê numa linha — a viagem saiu (decisão 54) — de `instalacoes[].recebimento`
- **indisponível** (caso `criterio-indisponivel`): o pacote não declara o parâmetro · o traço, e o motivo
- **pendente** (caso `criterio-pendente`): o servidor não respondeu · o relógio, e o app confere de novo por 24 h — nunca reprova por rede
- com um critério indisponível ou pendente, o status geral é *aguardando validação*
- **no protótipo** (construído, `app/src/telas/T12/dados.js`): a seção entra antes de *A INSTALAÇÃO*, e o recebimento deixou de ser a sétima etapa. O porquê sai do número do mock (`posicoes` e `emSeg` → *3 posições em 1 min 12 s*; `recebidoAosSeg` → *o teste chegou em 24 s*; `km` → *1 viagem fechada · 3 km*, o *1* é do texto) ou do `motivo` do caso (*o pacote não declara a fila*; *sem resposta · confere por 24 h*). Os estados 04 e 05 abrem a instalação mais nova do ativo do caso (a i-02, a PCX-9A17) com o recebimento do caso. A instalação sem `recebimento` — as outras doze — leva o veredito de `criteriosRegra.porEstado` (e a exceção da i-09), sem o porquê: nada se inventa (padrão, pro arquiteto). A i-02 só tem o resumo: a 04 e a 05 mostram três etapas e nenhum nome, contra as seis e o *Rafael Vieira* das referências (desvio nomeado; a correção é a i-02 ganhar as `etapas` no mock). O roteiro `app/scripts/caminhos/recebido.mjs` prova a i-01, a PCX-9A17 e a RVM-1E54 no fluxo, e os dois estados parados
- **no protótipo · quem instalou** (a revisão de 26/09): o nome embaixo da placa sai do dado, e não de quem está logado — a instalação com as `etapas` (a i-01) é do herói do mock, `tecnico.nome`, *Rafael Vieira*, com qualquer usuário no aparelho (`linhaDoDetalhe`, `app/src/telas/T12/dados.js`). Com o m.souza logado (Outro usuário no aparelho), a RKT-8H42 segue com *Rafael Vieira*; o roteiro `outro-usuario.mjs` prova. Padrão do protótipo; a alternativa é o mock ganhar quem instalou em cada instalação, com a checagem no gate (pro arquiteto)

## O não conforme com a foto do problema

O item manual respondido como não conforme exige a foto do problema e o que aconteceu (decisão 39). O botão diz o que falta: `Fotografar o problema` — o disparador — até a foto existir; *Conte o que aconteceu*, apagado, até o texto; e então `Salvar com ressalva`. A ordem entre escrever e fotografar é livre.

- **no protótipo:** o botão sai de uma função só, provada no node (`app/src/estado/camera.js` · `primarioDaCamera`, `scripts/testar-camera.mjs`): desmarcada a caixa, o da câmera (`Tirar foto`, ou `Abrir as configurações` sem a permissão) · marcada e sem a foto, `Fotografar o problema`, com ou sem o texto — e, sem a permissão, `Abrir as configurações`, porque a foto do problema precisa da câmera (regra 12) · fotografado e sem o texto, *Conte o que aconteceu*, apagado e desabilitado (lei 17) · fotografado e contado, `Salvar com ressalva`. Nenhuma combinação dá o `Salvar com ressalva` sem a foto e o texto
- **o quadro:** marcada, o visor diz *Enquadre o problema* (08); fotografado, o registro fica no lugar do visor — a foto tirada que nasceu na T10, *Problema fotografado às 14:30* e *vai junto com a ressalva, pro gestor*, sem toque (15). O registro entra com a troca de quadro, sem esmaecer de novo por dentro (C12·42)
- **desmarcar e marcar de novo:** desmarcada, volta a câmera do item (07); o que aconteceu e a foto do problema ficam guardados enquanto o técnico está no item, e marcar de novo os devolve (08, ou 15 se já fotografou). Sair do item os descarta. Proposta: a alternativa é desmarcar descartar a foto do problema
- **a ressalva salva** conta como resolvida, como antes, e leva o que aconteceu, a hora e a hora da foto do problema; o item diz *com ressalva · a causa* (12)


## Os casos de lista

O caso `lista-longa-garagens` existe pra mostrar a busca, e o `uma-empresa`, a empresa já marcada. Na lista longa, de uma empresa só, o mundo das seis unidades vai até o menu, sem os ônibus; a fonte da idade e da hora é o pacote. Nas três empresas do herói, só a dele anda: com as outras duas escolhidas, o `Ver as unidades` espera.

- **no protótipo** (a última entrega): na lista longa, a linha de cada unidade lê a idade, a hora e os ativos do pacote dela, e os seis pacotes do caso declaram os grupos no `contem` — desde o pacote 1, sem os cartões (decisão 45) —, e a T03 lê dali (`app/src/dados/garagens.js`); só a estimativa por item ainda sai dos três pacotes do mock, que a declaram iguais (desvio nomeado, pro arquiteto) — 1,6 s, que dá o *faltam ~40 s* da T03/00, o padrão aprovado no gate do pacote 1 (antes, 6 s). A folha de trocar de unidade do menu, numa unidade que só o caso tem, lista as três do herói: nenhuma referência desenha a folha da lista longa (pendência, pro arquiteto). Nas três empresas do herói, o mundo anda a partir do Entrar, no `T02/05` (A empresa e a unidade); na lista longa, o mundo dela vai junto no estado único, com a unidade, e a folha fica sem o `Trocar de empresa`, porque ela é de uma empresa só

## A folha que fecha (lei 20)

A folha de opções fecha no xis; a de confirmação, no `Cancelar`. **Toda folha também fecha tocando fora, arrastando pra baixo e no voltar do Android.**

- **no protótipo** (a última entrega, construída na peça — `app/src/ds/chrome/Folha.jsx` e `Veu.jsx`): o toque fora e o arraste moram na folha e chamam o mesmo fechar do X, sem a tela passar nada; o voltar é da tela que a abriu (`useVoltar`, O voltar do Android). Valem nas folhas que existem: *Não recebi o código* (T01/04 e 11) e as quatro do menu — *Conta* (T04/05), *Trocar de unidade* (T04/07, 08, 14), *Módulo conectado* (T04/10) e *Ativo da sessão* (T04/11) —, e na *Outras ações* (T11/03), que a T11 monta com a peça, sem o puxador (o voltar pelo `useVoltar` da T11)
- **tocar fora**: o toque no véu, fora do painel, fecha como o X · dentro do painel, nada muda
- **arrastar pra baixo**: o painel acompanha o dedo, só por transform, depois de o dedo andar 8 (`--folha-arraste-folga`, o *touch slop* do Android) — antes disso é toque, e a linha embaixo do dedo responde. Soltando mais de 56 abaixo do lugar (`--folha-arraste-limite`, o limiar de posição da folha do Material 3), a folha fecha: desce de onde parou, no fechar de sempre (150), e o véu esmaece junto; soltando antes, volta, no subir (200). Pra cima, o painel não passa do lugar dele. O toque que virou arraste não chega em nada — nem na linha em que começou: a *Garagem Ibura* não troca de unidade, o `Encerrar a sessão` não encerra, o `Conferir e reenviar` não reenvia —, e o pressionado dela some enquanto o dedo arrasta. Os dois números são proposta do protótipo (pro arquiteto); o arraste não mede velocidade, só posição: mesma entrada, mesma saída
- **o diálogo não é folha**: a confirmação (o *Sair da conta*, o *Trocar de unidade*, o *Encerrar sem homologar?*) fecha no `Cancelar`, ou na saída dele, e no voltar — o toque no véu, fora da caixa, não fecha (proposta do protótipo, pro arquiteto: a lei fala de folha)
- o roteiro `app/scripts/caminhos/folhas.mjs` prova os quatro jeitos em cada folha, o arraste que volta e o que fecha, com o movimento conferido, o arraste que começa em cima de uma linha tocável, e o toque no véu do diálogo que não fecha

## A URL

Todo lugar do protótipo tem endereço: `?tela=T07` abre a tela · `?tela=T07&estado=02-estado-serial-nao-cadastrado` abre o estado (até o pacote 1, o exemplo era o `01-estado-fora-da-faixa`, da T07 antiga). Um link mandado pra alguém abre exatamente o que se quis mostrar.

## O que é provisório

O que não é de desenho e o produto ainda decide segue um padrão — a lista e o padrão de cada um estão em `08-para-o-dev/o-que-o-produto-ainda-decide.md`. Se o padrão mudar, é uma linha.

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
| `T02/01-momento-escolhida` | tocar numa unidade, com uma empresa só |
| `T02/03-momento-busca-sem-resultado` | digitar na busca um nome que não existe |
| `T02/04-momento-busca-esconde-a-escolha` | com uma unidade escolhida, digitar uma busca que esconde ela |
| `T02/07-momento-empresa-escolhida` | tocar numa empresa da lista — ou voltar pelo Trocar de empresa, com a atual marcada |
| `T02/09-momento-unidade-escolhida-com-trocar-empresa` | tocar numa unidade, pra quem tem várias empresas |
| `T03/02-momento-concluido` | o download termina |
| `T04/01-momento-sem-modulo` | o menu antes de conectar |
| `T04/02-momento-modulo-sem-ativo` | módulo conectado, ônibus ainda não escolhido |
| `T04/05-momento-folha-conta` | tocar nas iniciais |
| `T04/06-momento-folha-conta-sair-com-sessao-aberta` | `Sair da conta` com sessão ou fila |
| `T04/07-momento-folha-trocar-de-garagem` | tocar no nome da unidade, com uma empresa só |
| `T04/10-momento-folha-modulo-conectado` | tocar no cartão do módulo com a sessão aberta |
| `T04/11-momento-folha-ativo-da-sessao` | tocar no cartão do ativo com a sessão aberta |
| `T04/13-momento-encerrar-antes-de-homologar` | tocar no ENCERRAR antes de homologar |
| `T05/01-momento-nenhum-escolhido` | a busca achou, nada tocado ainda |
| `T05/02-momento-um-encontrado` | só um módulo por perto |
| `T06/01-momento-confirmar-o-veiculo` | tocar num ônibus |
| `T06/08-momento-busca-sem-resultado` | digitar na busca uma placa que não existe |
| `T06/09-momento-busca-esconde-a-escolha` | com um ativo escolhido, digitar uma busca que esconde ele |
| `T07/01-momento-can-lida` | a configuração do ativo gravada, voltando ao diagnóstico |
| `T07/06-momento-atualizando-o-firmware` | `Atualizar firmware` |
| `T07/10-momento-relendo-a-can` | `Ler de novo` |
| `T09/04-momento-cadeia-concluida` | o último bloco relido |
| `T09/05-momento-o-que-vai-ser-gravado` | `Configurar módulo`, numa instalação nova |
| `T09/08-momento-manutencao-escolher-o-bloco` | `Configurar módulo`, numa manutenção |
| `T09/09-momento-manutencao-reenviando` | `Reenviar`, com um bloco escolhido |
| `T10/01-momento-hodometro-semeado` | `Semear o hodômetro` |
| `T10/05-momento-hodometro-digitado` | digitar o valor do painel |
| `T10/08-momento-horimetro` | `Calibrar o horímetro` |
| `T10/09-momento-calibracao-completa` | `Semear o horímetro`, com a releitura conferindo |
| `T11/02-momento-tudo-confere` | nada diverge: pelo menu, com a sessão do herói, ou depois de regravar pela T09 (T11·1, T11·2) |
| `T11/03-momento-outras-acoes` | tocar em Outras ações, no rodapé da conferência |
| `T12/01-momento-detalhe-da-instalacao` | tocar numa instalação |
| `T13/01-momento-a-identificacao-aberta` | tocar na seção |
| `T13/02-momento-b-montagem-aberta` | tocar na seção |
| `T13/03-momento-c-hardware-aberta` | tocar na seção |
| `T13/04-momento-d-configuracao-aberta` | tocar na seção |
| `T13/05-momento-e-teste-dinamico-aberta` | tocar na seção |
| `T13/06-momento-f-servidor-aberta` | tocar na seção |
| `T13/07-momento-responder-item` | tocar num item manual |
| `T13/08-momento-nao-conforme-com-justificativa` | marcar não conforme |
| `T13/11-momento-homologado` | tudo passa |
| `T13/12-momento-b-com-ressalva` | salvar um item como não conforme, com a justificativa |
| `T13/13-momento-e-resolvida` | voltar do ciclo de testes com os seis passos feitos |
| `T13/15-momento-problema-fotografado` | fotografar o problema depois de marcar Não está conforme |
| `T14/01-momento-antes-do-disparo` | a fila do módulo ainda drenando |
| `T14/05-momento-ciclo-concluido` | os seis passos e o evento |
| `T14/06-momento-correcao-solicitada` | tocar em `Solicitar correção de cadastro` no identificador divergente |
| `T16/01-momento-pede-o-corte-de-alimentacao` | o passo do corte |
| `T16/02-momento-sessao-encerrada` | o autoteste passa |
| `T16/03-momento-encerrando-sem-homologar` | ENCERRAR antes de homologar |
| `T16/04-momento-encerrada-sem-homologar` | os 4 passos terminam |

- **no protótipo** · a nossa versão das linhas da T13, antes desta entrega: o `11` é tocar em `Finalizar instalação`, com A a E resolvidas (T13·3) · o `12` é salvar um item como não conforme, com a justificativa, e voltar à Seção B · o `13` é voltar do ciclo com os passos feitos, e tocar na Seção E

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
| `T01/17-estado-teto-de-envios` | pedir um código depois dos 3 envios da hora | `teto-de-envios` |
| `T01/18-estado-outro-usuario-no-aparelho` | entrar com um usuário diferente do da sessão anterior | `outro-usuario` |
| `T02/02-estado-lista-longa-com-busca` | a empresa tem mais de 6 unidades — a busca aparece, e a lista rola por baixo do rodapé | `lista-longa-garagens` |
| `T02/05-estado-escolher-a-empresa` | a entrada da tela, pra quem tem várias empresas — o herói | `empresas` |
| `T02/06-estado-unidades-com-trocar-empresa` | Ver as unidades, pra quem tem várias empresas | `empresas · ucs · uos` |
| `T02/08-estado-uma-empresa-ja-marcada` | a entrada da tela, pra quem tem uma empresa só — ela já vem marcada | `uma-empresa` |
| `T03/01-estado-falha-de-rede` | a rede cai no meio do download | `sync-falha-rede` |
| `T03/03-estado-pacote-de-4-dias` | o pacote tem entre 3 e 7 dias | `pacotes · pac-uo-02` |
| `T03/04-estado-pacote-vencido` | o pacote passou de 7 dias | `pacotes · pac-uo-03` |
| `T04/03-estado-faixa-modulo-com-falha` | o módulo da sessão perde o link | `link-perdido` |
| `T04/04-estado-checklist-pendente` | o checklist tem itens abertos | `checklist` |
| `T04/08-estado-folha-trocar-de-garagem-envio-em-andamento` | trocar com evidência subindo | `filaSaida` |
| `T04/09-estado-folha-trocar-de-garagem-com-modulo-conectado` | trocar com a sessão aberta | derivado do fluxo |
| `T04/12-estado-acesso-vencendo` | a sessão de acesso chega ao 5º dia: o diálogo aparece uma vez por dia, na primeira chegada ao menu | `situacao.sessaoAcesso` |
| `T04/14-estado-folha-trocar-de-unidade-com-empresa` | tocar no nome da unidade, pra quem tem várias empresas — o herói | `empresas · uos · pacotes` |
| `T04/15-estado-sem-conexao` | o aparelho sem rede — o Últimas instalações espera a conexão | `sem-conexao-no-menu` |
| `T05/03-estado-nenhum-encontrado` | nenhum módulo responde | `busca-vazia` |
| `T05/04-estado-conexao-falhou` | o módulo não responde ao conectar | `conexao-falha` |
| `T05/16-estado-bluetooth-desligado` | o Bluetooth do celular está desligado | `bluetooth-desligado` |
| `T05/17-estado-bluetooth-sem-permissao` | o técnico negou a permissão do Bluetooth | `bluetooth-sem-permissao` |
| `T06/04-estado-fora-do-pacote` | o ônibus não está no pacote | `ativo-fora-pacote` |
| `T06/05-estado-conflito-de-pinos-resolvivel` | pinos ocupados, com saída | `conflito-pinos-resolvivel` |
| `T06/06-estado-conflito-de-pinos-sem-saida` | pinos ocupados, sem saída | `conflito-pinos-sem-saida` |
| `T06/10-estado-modulo-em-outro-ativo` | o módulo já está vinculado a outro ativo | `modulo-em-outro-ativo` |
| `T06/11-estado-modulo-ja-deste-ativo` | o módulo já é deste ativo — manutenção | `modulo-ja-deste-ativo` |
| `T07/02-estado-serial-nao-cadastrado` | o serial não está no cadastro | `serial-nao-cadastrado` |
| `T07/03-estado-modelo-sem-suporte` | o modelo do módulo sem suporte nesta versão | `modelo-sem-driver` |
| `T07/04-estado-firmware-nao-homologado` | o firmware não é homologado | `firmware-fora-matriz` |
| `T07/05-estado-firmware-sem-rede-no-modulo` | o firmware não é homologado e o módulo está sem rede | `firmware-sem-rede-no-modulo` |
| `T07/07-estado-modem-sem-sinal` | o modem sem sinal — só informa | `modem-sem-sinal` |
| `T07/08-estado-sinal-da-can-sem-leitura` | um sinal da CAN não chega | `can-estatico-ausente` |
| `T07/09-estado-sinal-da-can-fora-do-esperado` | um sinal da CAN fora do esperado | `can-estatico-isolado` |
| `T09/01-estado-bloco-recusado` | o módulo recusa um bloco | `bloco-recusado` |
| `T09/02-estado-queda-na-cadeia` | o link cai no meio da cadeia | `queda-na-cadeia` |
| `T09/03-estado-recuperacao-ate-a-conexao-gravar` | tentar sair antes da Conexão gravar | derivado do fluxo |
| `T09/06-estado-a-configuracao-nao-cabe` | o que vai ser gravado passa do espaço do módulo | `conteudo-nao-cabe` |
| `T09/07-estado-cercas-demais-pro-modulo` | o cadastro tem mais cercas do que o módulo guarda | `pool-esgotado` |
| `T10/02-estado-rotacao-caminhao-coletor` | o modelo calibra rotação e velocidade | `calibracao.porModelo · ma-02 · KNB-5H39` |
| `T10/03-estado-ja-semeado` | o hodômetro já foi semeado antes | `calibracao` |
| `T10/04-estado-modulo-sem-pulsos` | o módulo não recebe pulsos | `grandeza-indisponivel` |
| `T10/10-estado-releitura-nao-confere` | a releitura passa da tolerância: 500 m a menos, e o limite é 120 m | `releitura-nao-confere` |
| `T11/01-estado-conteudo-que-o-app-nao-reconhece` | índice que o app não classifica | `indice-nao-classificado` |
| `T11/05-estado-revisar-em-seguida` | reenviou as cercas numa manutenção — o leitor e os eventos dependem delas | `cercas-reenviadas` |
| `T12/02-estado-nenhuma-instalacao` | a unidade não tem instalações | `instalacoes` |
| `T12/03-estado-sem-rede` | a consulta sem rede | `instalacoes-sem-rede` |
| `T12/04-estado-criterio-indisponivel` | o pacote não declara o parâmetro do critério — aqui, o modo de fila do módulo | `criterio-indisponivel` |
| `T12/05-estado-criterio-pendente` | o servidor não respondeu à consulta | `criterio-pendente` |
| `T13/09-estado-item-reprovado` | um item automático reprova — a bateria abaixo do mínimo, na CAN | `can-estatico-bateria` (T13-A1) |
| `T13/10-estado-finalizar-com-a-secao-f-falhando` | `Finalizar` com a Seção F falhando — o servidor não respondeu | `pronto-para-fechar` (T13-A2) |
| `T13/14-estado-homologado-sem-localizacao` | finalizar com a localização negada | `localizacao-negada` |
| `T14/02-estado-prazo-estourado` | o evento não chega em 2:00 | `evento-sem-resposta` |
| `T14/03-estado-dinamico-fora-do-esperado` | a rotação não aparece: o motor está desligado | `motor-desligado-no-ciclo` |
| `T14/04-estado-identificador-divergente` | o cartão lido não bate | `identificador-divergente` |
| `T15/01-estado-sem-erro` | a fila sem erros | `filaSaida` |
| `T15/02-estado-dois-erros` | dois itens recusados | `filaSaida` |
| `T15/03-estado-fila-vazia` | nada esperando envio | `filaSaida` |
| `T15/04-estado-secao-f-em-re-checagem` | a Seção F esperando o servidor | `secaoF · RVM-1E54` |
| `T16/05-estado-assertiva-falhando` | uma assertiva falha | `autoteste-falhando` |
| `T16/06-estado-sessao-interrompida` | a sessão caiu e volta oferecida | `sessao-interrompida` |

- **no protótipo** · a nossa versão de duas linhas, antes desta entrega: `T10/10` · o limite é a granularidade mais o decorrido do mock, 100 + 40 = 140 m (HU-T10-5; o comentário do caso diz 120 m, e os dois dão *não confere*: vai pro arquiteto) · `T12/02` · o caso é `instalacoes` + `instalacoes-vazia` (a consulta da unidade que volta vazia, sem sessão, C11)
