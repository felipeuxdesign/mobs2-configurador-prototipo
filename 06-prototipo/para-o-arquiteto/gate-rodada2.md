# Gate da rodada 2 do retorno do PM

Medido em 07/10, com a rodada 2 aplicada e construída por cima da rodada 1. **Sem push:** commit local, e o push vem no fim da rodada 3.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 188 | 188 ✓ (15 telas, 79 estados, 94 momentos) |
| peças | 106 | 106 ✓ (nenhuma nova · duas variantes e um ajuste, no desvio 9) |
| leis | 24 | 24 ✓ (`leis.md` intacto) |
| decisões | 54 | 54 ✓ |
| tokens | — | 295, `tokens.css` intacto |
| casos no mock | — | 62: entraram o `pareando` e o `reconectando`, saiu o `conflito-pinos-resolvivel` |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

**Os 4 do `APAGAR.txt`:** o HTML e o PNG da T06/05 (o conflito com saída) e da T07/04 de antes (o firmware não homologado, que virou *fora da lista*) saíram antes da cópia. Nenhum dos 4 existe na pasta, e nada no app, nos roteiros, no índice, no palco ou nos documentos vivos aponta pra eles · os gates antigos guardam o registro.

**O que vinha de cópia antiga, e como entrou:**
- **com base, pela mescla de três vias** (o nosso, a última entrega do arquiteto e a nova): os `tela.md` da T07, T11, T13 e T15, os `textos.md` da T07, T13 e T15, o `estados.md` da T07, o `componentes.md`, o `casos.md`, a `logica.md`, o CHANGELOG, o mock e o gate · os conflitos, à mão: as seções novas da T07 e da T13 ao lado das nossas notas, os dois casos novos no mock com a nossa indentação, e as checagens do gate;
- **o `indice.json`, por id e por campo:** os 5 itens novos, os 2 que saíram e 12 campos que o arquiteto mudou · os nossos `rotulo`, `grupo`, `coluna` e `depoisDe` ficaram, e os itens novos ganharam os deles (*Pareando*, *Reconectando*, *Firmware fora da lista*, *Sessão anterior mal encerrada*, *Nada a calibrar*);
- **sem base, à mão:** os `tela.md` da T05, T06 e T10 (a linha da contagem e a seção nova, por cima das nossas notas) e os `estados.md` delas (as linhas novas) · os `textos.md` da T05, T06, T10 e T11, inteiros, porque são norma e não têm nota nossa;
- **o gate do arquiteto** traz só as âncoras dele: as nossas ~120 conferências ficaram, acertadas ao mock novo (o desvio 12);
- **o `08-produto-real/pendencias.md`** é, aqui, o `08-para-o-dev/o-que-o-produto-ainda-decide.md`: as duas leituras nossas entraram nele, e a pergunta do conflito com saída virou decidida.

**O escopo negativo, conferido:** nada nos tokens, nas peças (só variantes) e nas leis · as telas da rodada 1 (T09, T13, T14, T16) só mudaram no que a rodada 2 pede — a T13 pelo efeito dominó, a legenda do rodapé · as da rodada 3 (T01 a T04, T12) não mudaram de desenho; o que muda nelas é o que o mock novo diz (o desvio 13).

## 2 · A conferência

As folhas lado a lado estão em `rodada2/`, uma por referência nova ou mudada (64).

| tela | referência | contra o HTML | o que sobra |
|---|---|---|---|
| T05 | `01-momento-nenhum-escolhido` (mudou) | 0% | — |
| T05 | `18-estado-pareando` (nova) | 0,1% | — |
| T05 | `19-estado-reconectando` (nova) | 0,1% | — |
| T07 | `00-tela` (mudou) | 0,14% | — |
| T07 | `01-momento-can-lida` (mudou) | 0,24% | — |
| T07 | `02-estado-serial-nao-cadastrado` (mudou) | 0,14% | — |
| T07 | `03-estado-modelo-sem-suporte` (mudou) | 0,14% | — |
| T07 | `04-estado-firmware-fora-da-lista` (nova) | 0,14% | — |
| T07 | `05-estado-firmware-sem-rede-no-modulo` (mudou) | 0,13% | — |
| T07 | `06-momento-atualizando-o-firmware` (mudou) | 1,58% | as mensagens esperando sem o traço (a 11 desenha com ele) e os títulos apagados (desvio do pacote 5) |
| T07 | `07-estado-modem-sem-sinal` (mudou) | 0,13% | — |
| T07 | `08-estado-sinal-da-can-sem-leitura` (mudou) | 0,24% | — |
| T07 | `09-estado-sinal-da-can-fora-do-esperado` (mudou) | 0,24% | — |
| T07 | `10-momento-relendo-a-can` (mudou) | 0,14% | — |
| T07 | `11-momento-lendo` (mudou) | 0,17% | — |
| T07 | `12-estado-alimentacao-abaixo-da-faixa` (mudou) | 3,56% | a linha do firmware com 64 na referência |
| T07 | `13-estado-sessao-anterior-mal-encerrada` (nova) | 4,59% | a referência rolada, e o VL06 CAN-BT onde o mock diz VL06 CAN |
| T10 | `00-tela` (mudou) | 0,14% | *lido do módulo* contra *semeado há 27 dias* |
| T10 | `01-momento-hodometro-semeado` (mudou) | 0,01% | — |
| T10 | `02-estado-rotacao-caminhao-coletor` (mudou) | 0% | — |
| T10 | `03-estado-ja-semeado` (mudou) | 0% | — |
| T10 | `04-estado-modulo-sem-pulsos` (mudou) | 0% | — |
| T10 | `05-momento-hodometro-digitado` (mudou) | 0,03% | — |
| T10 | `06-momento-gravando-no-modulo` (mudou) | 0,49% | o ENCERRAR e o link apagados no semear (desvio do pacote 5) |
| T10 | `07-momento-relendo` (mudou) | 0,49% | o ENCERRAR e o link apagados no semear (desvio do pacote 5) |
| T10 | `08-momento-horimetro` (mudou) | 0% | — |
| T10 | `09-momento-calibracao-completa` (mudou) | 0,01% | — |
| T10 | `10-estado-releitura-nao-confere` (mudou) | 0,01% | — |
| T10 | `11-estado-nada-a-calibrar` (nova) | 0% | — |
| T11 | `00-tela` (mudou) | 0,03% | — |
| T11 | `01-estado-conteudo-que-o-app-nao-reconhece` (mudou) | 0,03% | — |
| T11 | `02-momento-tudo-confere` (mudou) | 0,08% | — |
| T11 | `03-momento-outras-acoes` (mudou) | 2,01% | o véu (desvio de antes) |
| T11 | `04-momento-conferindo` (mudou) | 0,08% | — |
| T11 | `05-estado-revisar-em-seguida` (mudou) | 0,09% | — |
| T13 | `00-tela` (mudou) | 0,04% | — |
| T13 | `01-momento-a-identificacao-aberta` (mudou) | 0,1% | — |
| T13 | `02-momento-b-montagem-aberta` (mudou) | 0,05% | — |
| T13 | `03-momento-c-hardware-aberta` (mudou) | 0,05% | — |
| T13 | `04-momento-d-configuracao-aberta` (mudou) | 2,07% | a rolagem (desvio da rodada 1) |
| T13 | `05-momento-e-teste-dinamico-aberta` (mudou) | 4,45% | a rolagem (desvio da rodada 1) |
| T13 | `06-momento-f-servidor-aberta` (mudou) | 5,24% | a referência abre rolada 20 |
| T13 | `07-momento-responder-item` (mudou) | 0,14% | — |
| T13 | `08-momento-nao-conforme-com-justificativa` (mudou) | 0,14% | — |
| T13 | `11-momento-aguardando-autoteste` (mudou) | 0,04% | — |
| T13 | `12-momento-b-com-ressalva` (mudou) | 0,05% | — |
| T13 | `13-momento-e-resolvida` (mudou) | 4,4% | a rolagem (desvio da rodada 1) |
| T13 | `14-estado-aguardando-autoteste-sem-localizacao` (mudou) | 0,04% | — |
| T13 | `15-momento-problema-fotografado` (mudou) | 0% | — |
| T13 | `16-estado-secao-c-com-item-reprovado` (mudou) | 0,12% | — |
| T13 | `17-momento-foto-da-antena` (mudou) | 0,14% | — |
| T13 | `18-momento-foto-do-chicote` (mudou) | 0,14% | — |
| T13 | `19-momento-foto-do-leitor` (mudou) | 0,14% | — |
| T13 | `20-momento-foto-do-painel` (mudou) | 0,14% | — |
| T13 | `21-estado-secao-c-com-gps-reprovado` (mudou) | 0,05% | — |
| T13 | `23-estado-secao-c-com-entradas-reprovadas` (mudou) | 0,05% | — |
| T13 | `25-estado-secao-c-com-modem-reprovado` (mudou) | 0,05% | — |
| T13 | `38-momento-secao-d-sendo-lida` (mudou) | 1,9% | a rolagem (desvio da rodada 1) |
| T13 | `39-momento-bip-tocando` (mudou) | 4,43% | a rolagem (desvio da rodada 1) |
| T13 | `40-momento-bip-esperando-resposta` (mudou) | 2,54% | a rolagem (desvio da rodada 1) |
| T13 | `41-momento-bip-ouvido` (mudou) | 4,38% | a rolagem (desvio da rodada 1) |
| T13 | `42-momento-bip-nao-ouvido` (mudou) | 2,57% | a rolagem (desvio da rodada 1) |
| T15 | `00-tela` (mudou) | 3,63% | o recebido do meio (62 contra 50) e a placa do f-11 |
| T15 | `02-estado-dois-erros` (mudou) | 0,06% | — |

- **As 188:** sem erro, e 38 em 0% contra o HTML. Das 124 que a rodada não tocou, 123 ficaram exatamente como na base da rodada 1; a T12/01 foi de 0,11% a 0,26% (o desvio 13). A nova base é `prints/linha-de-base-rodada2.json`.
- **Os roteiros:** os 45 aprovados — 44 na corrida final, e o `mov-t07` duas vezes seguidas depois de esperar o indicador de rolagem na CAN lida aberta pelo menu (ele parava às vezes ali). Os refeitos pro fluxo novo: `heroi` e `heroi-sem-horimetro` (o *Nada a calibrar* e as 4 fotos), `mov-t07` (as 9 linhas e as 8 que contam, a CAN em 14), `mov-t10` (o caminhão), `mov-t11` e `conferencia` (a ação na linha e o rodapé), `mov-t06` e `mov-t14` (sem o conflito com saída), `checklist` e `mov-t13` (28 itens, o 20 no caminhão), `fila` (o conflito e a causa nova), `mov-check`, `mov-faixa`, `abortada`, `recebido`, `voltar`, `readme` e `mov-t16` (os números e os ritmos).
- **O palco:** 25 peças sem erro · 6 textos com a diferença explicada · a moldura bate em 47 de 47 · as provas batem.
- **Os espécimes:** os 114, iguais aos da rodada 1 (a cadeia da folha 5 segue nos 6,3% a 6,5% de antes).
- **checar, build e o gate:** aprovados.

**O que o protótipo faz:**
- **T05:** a 18 e a 19 abrem pela coluna, paradas, com o quadro do *Conectando* e a frase da espera embaixo da lista, neutra (12/500 em `--tinta-secundaria`).
- **T06:** um caso de pinos só, sempre a trava, e o par da faixa decide.
- **T07:** a leitura passa pelas 9 linhas, um tique cada, e o contador conta as 8 · a faixa, os satélites, *só informação* e as mensagens embaixo do nome · as mensagens e o alternador com o i · o firmware que trava diz *na lista: …* · o `modulo-com-pendencias` monta a 13, com o aviso neutro em cima quando a leitura termina.
- **T10:** pelo endereço, o caminhão coletor · no fluxo, o herói cai no *Nada a calibrar* e vai direto ao ciclo, e a calibração fica concluída sem nada semeado · a contagem e os segmentos só dos obrigatórios · o *Depois:* com tudo o que falta · o não confere fica no segmento atual.
- **T11:** a ação na linha, com o nome do bloco pro leitor de tela (*Corrigir este bloco: Cercas*) · o rodapé só com a saída · no *Conferindo*, as ações desligadas, com a frase · o botão guarda o lugar enquanto a linha não foi lida.
- **T15:** o recebido em conflito, depois dos recebidos, em duas linhas · sozinha, a recusa é uma frase.
- **T13:** o herói com 4 fotos e 28 itens · o 20 pelo endereço, na sessão do caminhão.

## 3 · As divergências

Nenhuma bloqueia.

1. **A T07 desenha alturas diferentes pra linha com a frase embaixo:** a alimentação e as mensagens com 54, o GPS com 50. Segui linha a linha.
2. **A T07/12 traz a linha do firmware com 64,** sem nada que peça (3,56%).
3. **A T07/13 abre rolada** (o título fora do quadro), e o módulo dela, o M2C-0362, é VL06 CAN-BT na referência e VL06 CAN no mock (4,59%).
4. **A T07/06 e a 11 discordam na linha das mensagens esperando:** a 06 sem o traço, a 11 com ele. Segui a 11. O número do chip esperando fica sem valor, como as duas desenham.
5. **A T10/00 diz *lido do módulo*, e a 03 diz *semeado há 27 dias*** pro mesmo caminhão: o mock tem o semeado (`calibracao.ultimas`), e a 00 segue o mock (0,14%).
6. **O mock completado na T10:** o bruto do horímetro do caminhão não existia (a 08 desenha 2.950 h), e o `releitura-nao-confere` ainda era o ônibus (a 10 desenha o caminhão, 87.711). Os dois entraram com o número da referência.
7. **A T10 pelo endereço da 08 e da 09** marca a rotação e a velocidade feitas, sem número: o mock não traz o que o motor ligado lê. No fluxo, o caminhão para na rotação, *Ligue o motor*, como antes.
8. **A T15/00:** o recebido do meio tem 62 na referência e 50 no protótipo (a 01 desenha 50, a regra da peça); e o f-11 do mock é do RVM-1E54, onde a 00 desenha QAH-1M67 (3,63%).
9. **Duas variantes e um ajuste, sem peça nova nem token:** a `embaixo` da linha de checagem (a ação na linha), o rodapé sem primário e a legenda a 4 de margem por cima do vão (as referências mediam 4 a mais que a peça). Vão ao arquiteto pras folhas (`componentes.md`, *No protótipo · as variantes da rodada 2*).
10. **A T11 envia na ordem que o técnico tocar:** o leitor arrasta os eventos (`M.cadeia.arraste`), e enviar os eventos antes do leitor os marca de novo. O roteiro envia na ordem da cadeia.
11. **A T13/06 abre rolada 20** na referência; no protótipo a Seção F cabe, e a lista abre no topo (5,24%).
12. **O gate do mock:** as nossas conferências foram acertadas ao mock novo — a calibração por modelo (o ônibus sem nada, o caminhão com quatro), a fila com 11, a fila da Várzea sem o recebido em conflito, a T11 sem o Extended ID e com a rede da Mobs2, a bateria fora da CAN (a alimentação é a do módulo, contra a faixa), o checklist de 28.
13. **As telas da rodada 3 que o mock novo mexe:** a T12/01 diz *Diagnóstico 8 de 8* e a linha da Calibração fica sem valor (a i-01 não calibrou nada, e a T12 não tem texto pra isso); o contador do checklist da T04 continua 10 (a conta do mock), onde a T13 diz *Faltam 9*. Ficam pra rodada 3.
14. **O `heroi-sem-horimetro` perdeu a premissa:** o ônibus não tem horímetro pra pular. Ele passou a provar o outro caminho que sobra: do *Nada a calibrar* ao menu, e o ciclo pela Seção E.
15. **A T05/04 ainda diz *1 · Cabo e conector*** no *O que conferir*: é o cabo de alimentação, e não o de programação. Ficou, e vai ao arquiteto.
16. **A T05/18 e 19 só pela coluna:** no fluxo, a conexão do herói não pareia nem cai.

## 4 · O que não faz sentido

- **A T11 deixa o técnico enviar fora de ordem**, e o leitor enviado depois dos eventos os devolve pra revisar: o botão de cada linha convida a isso. Se a ordem importa, a linha do que depende de outro poderia esperar.
- **O mock do PM fala em *a rede da Mobs2* na T11 e em *o servidor da Mobs2* na T09** pro mesmo cadastro (`conexoes.exibir`).
