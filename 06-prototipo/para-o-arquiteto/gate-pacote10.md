# Gate do pacote 10

Medido em 04/10, com o pacote 10 aplicado e construído, por cima dos pacotes 8 e 9.

## 1 · O censo

| | pedido | medido |
|---|---|---|
| referências | 160 | 160 ✓ (15 telas, 67 estados, 78 momentos) |
| peças | 105 | 105 ✓ |
| leis | 24 | 24 ✓ |
| decisões | 54 | 54 ✓ |

A última linha do gate: `GATE APROVADO — todas as âncoras recomputadas conferem`.

**Os documentos do pacote vinham de cópias antigas**, como nos pacotes de antes: o `mocks.js`, a `logica.md`, o `indice.json`, o `tela.md` e o `estados.md` da T07 e da T13, e o `CHANGELOG.md`. Entrou só o que era novo:
- **as referências:** as 12 novas e as 10 corrigidas, inteiras;
- **os `textos.md`:** inteiros, porque só diferiam no que o pacote mudou;
- **o `indice.json`:** as 6 entradas novas. Os nossos campos ficam (`rotulo`, `rotuloOrigem`, `grupo`), e as duas entradas da coluna ganharam rótulo: *Alimentação abaixo da faixa* e *Seção C com item reprovado*;
- **o mock:**
  - o caso da bateria;
  - os cinco `enquadre`;
  - os três `motivo`;
- **as fichas:** as linhas novas, com as nossas anotações no lugar. A `logica.md` do pacote não tinha a T07/12 nem a T13/16 na tabela dos estados, e eu pus as duas.

## 2 · A conferência

As folhas lado a lado estão em `pacote10/`:

| referência | contra o HTML |
|---|---|
| T07 `12` · a alimentação abaixo da faixa (nova) | 0,04% |
| T13 `16` · a Seção C com o item reprovado (nova) | 0,12% (o desvio 1, da §3) |
| T13 `17` · a foto da antena (nova) | 0,14% |
| T13 `18` · a foto do chicote (nova) | 0,14% |
| T13 `19` · a foto do leitor (nova) | 0,14% |
| T13 `20` · a foto do painel (nova) | 0,14% |
| T13 `09` · o item reprovado, corrigido | **0%** (era 0,45%) |
| T13 `07` · *B · MONTAGEM* | 0,14%, como antes |
| T13 `08` · *B · MONTAGEM* | 0,14%, como antes |
| T13 `15` · *B · MONTAGEM* | 0%, como antes |
| folha 5 · o segmentado com *B · MONTAGEM* | 0% |

Os 0,14% das fotos são os mesmos da 07 de antes: o visor da câmera.

- **As 160:** sem erro, e 36 em 0% contra o HTML. Nenhuma das 154 de antes ficou pior que a base do pacote 9. A nova base é `prints/linha-de-base-pacote10.json`.
- **Os roteiros:** os 43 aprovados. O `mov-t07` e o `mov-t13` pararam na primeira volta por esperarem o comportamento de antes, e aprovaram depois de atualizados (embaixo).
- **O palco:**
  - as provas batem todas;
  - a moldura bate em 38 de 38;
  - os textos da coluna ficam com a diferença explicada: a coluna da T07 ganhou a *Alimentação abaixo da faixa*, no grupo O MÓDULO, e nenhuma cena do palco a desenha ainda.
- **Os espécimes:** todos rodam, e o segmentado da folha 5 dá 0%.
- **checar, build e o gate:** aprovados.

**O que mudou no protótipo:**
- **a T07 lê a alimentação do caso** na linha dela, como o modem sem sinal muda a dele. A linha só informa, o contador fica em *6 de 7* e o *Selecionar ativo* acende. O M2C-0301 não está entre os que a busca acha, e por isso a 12 abre só pela coluna;
- **a T13 lê a alimentação do caso do módulo da sessão**, contra a faixa da bateria do modelo do ativo. O mesmo caso monta a T07/12, a 16 e a 09;
- **o item reprovado com leitura** é a linha de leitura da peça, com o valor em `--vermelho` e a seta, e a linha toca e abre a 09. Passou, é leitura, sem seta;
- **o nível do item** diz o nome curto da seção em toda tela;
- **a frase da câmera** é o `enquadre` do item;
- **o `Tirar foto` leva de uma foto à outra pela URL**: 07, 17, 18, 19 e 20. Aberto pela URL, cada quadro vem com as fotos de antes tiradas;
- **o mock perdeu as sobras do AC-11:**
  - o `titulo` das seções;
  - a `instrucao` do Módulo;
  - a `pergunta` *Tensão da bateria na faixa*;
  - a linha repetida do `can-estatico-bateria`.
  As conferências do gate foram trocadas pelas do pacote 10.
- **o palco:** só a etiqueta do pé, *pacote 10*. A T06, a T05 e o palco não mudam de resto.
- **Os roteiros atualizados pelo comportamento novo:**
  - o `checklist`: tocar na Antena leva à 17, tocar no Painel à 20, e salvar o Módulo com ressalva à 17;
  - o `heroi` e o `heroi-sem-horimetro`: *B · MONTAGEM*, e a URL de cada foto;
  - o `mov-t13` e o `mov-t07`: os quadros novos abrem parados. No `mov-t13`, o não conforme é feito na Antena, e a URL sai do momento; o `Salvar com ressalva` leva à 18;
  - o `palco.mjs`: a nota da *Alimentação abaixo da faixa* nas cenas 02, 03 e 04.

## 3 · As divergências

Nenhuma bloqueia. Três vão nomeadas:

1. **T13/16 · o QJF-2C61 sem calibração no mock.**
   - A referência desenha o QJF-2C61 calibrado: a B com o Painel (*0 de 5*), a D *10 de 10*, *16 de 31* e *Faltam 12 itens*.
   - O mock não tem o painel do a-02. O `calibracao.painel` só tem o a-01, o a-09 e o a-22. Sem ele não houve calibração, e o protótipo mostra *0 de 4*, *8 de 10*, *14 de 30* e *Faltam 13 itens*. São os 0,12%.
   - Não inventei o número do painel. **Pra você:** ou o mock ganha o painel do a-02, com o hodômetro de partida, ou a referência sai sem a calibração.
2. **A folha 7 não desenha o item de leitura reprovado com a seta**, que a 16 desenha.
   - Fiz como variante da peça que já existe (`ItemDoChecklist`), sem token novo: o valor em `--vermelho` e a seta.
   - A variante antiga, *o reprovado com a leitura embaixo*, que a gente tinha posto sem desenho (G25), saiu.
   - **Pra você:** a variante na folha 7.
3. **O `motivo` novo do `ativo-fora-pacote` diz *Pertence a Garagem Ibura.***
   - Esse texto é o da referência T06/04, que desenha o ONK-8Q90 (a-16, da Ibura).
   - O ativo do caso é o a-24 (KUD-4Y21), do Pátio Caruaru, e o mock agora se contradiz.
   - O protótipo não lê esse `motivo`. Ele monta a frase pela garagem do ativo e mostra *Pertence a Pátio Caruaru.*, o desvio da T06/04 que já estava nomeado.
   - **Pra você:** ou o caso passa a apontar o a-16, ou o `motivo` diz Caruaru.

**Pra quando você redesenhar as cenas do palco** (junto com o Atualizando o firmware e o Recomeçar, que já estavam pendentes): a coluna da T07 tem agora a *Alimentação abaixo da faixa*, e a da T13, a *Seção C com item reprovado*.

**Também no protótipo:**
- **O não conforme das fotos 17 a 20 não tem referência.** O 08 e o 15 desenham o Módulo, e nos outros quatro a URL sai do momento, como o item reprovado no fluxo.
- **O `Refazer o diagnóstico` da 09, aberta pela coluna, leva à T07 da sessão do estado único**, e não à do M2C-0301. Todo estado da coluna é o app parado, montado pelo caso. Do lado da T07, é a 12 que mostra o M2C-0301 com os mesmos 10,9 V.

## 4 · As duas respostas

### 1 · O `modulo-com-pendencias` e o `pronto-para-fechar`

**Os dois são usados**, e nenhum aparece numa referência com o que ele muda.

- **`pronto-para-fechar`:** monta a **T13/10**, o *Finalizar com a Seção F falhando* (`receitas.js`).
  - O caso põe a sessão no KNB-5H39 × M2C-0371 (a-09). A tela abre com o ciclo completo e as fotos da B tiradas.
  - A Seção F falha porque o servidor não respondeu (`recebimento: "sem resposta"`, `checklist.js` · `secaoFFalhando`). Por isso o `Finalizar` abre o diálogo *A Seção F não passou*.
  - A referência 10 desenha o herói (RKT-8H42 × M2C-0417). A faixa do protótipo diz KNB-5H39 · M2C-0371, e por isso a 10 fica em 1,74% contra o HTML (o diálogo está por cima).
  - O gate do mock confere o par.
  - **Se ele sair**, a 10 precisa de outro jeito de a F falhar. O mais simples é o caso apontar o herói, e aí a faixa bate com a referência.
- **`modulo-com-pendencias`:** usado na **T14**, na fila que drena antes do disparo (`ciclo.js` · `filaDoModulo`).
  - Quando o módulo da sessão é o M2C-0362, a fila é a do caso: 12 mensagens e 3 de diagnóstico. Em todo outro módulo, é a de todos: `ciclo.mensagensGuardadas`, 6 e 2, a que a T14/01 desenha.
  - Nenhuma referência mostra os 12 e 3. Só se chega a eles conectando o M2C-0362 na T05 e indo até a T14.
  - **Pode sair:** o código cai na fila de todos, e o gate do mock tira o nome da lista dos casos sem gate.

### 2 · Os textos do mock que o protótipo mostra

**Nenhum dos cinco candidatos o protótipo lê do mock.** A tela de cada um diz o texto do `textos.md` ou do código, que bate com a referência:

| candidato | o que o mock diz, e não aparece | o que a tela diz |
|---|---|---|
| T03 · a falha de rede (`sync-falha-rede.motivo`) | *O que já baixou fica guardado.* | *Nada se perdeu. Ao reconectar, continua de onde parou.* (do código, como a T03/01) |
| T09 · o bloco recusado (`bloco-recusado.motivo`) | *O módulo não confirmou os pontos das áreas.* | *os pontos das regiões não voltaram* (`textos.js`, como a T09/01) |
| T11 · o conteúdo desconhecido (`indice-nao-classificado.motivo`) | *Conteúdo gravado que o app não reconhece…* | *Fora de todos os blocos. Reenviar os 5 blocos limpa.* (como a T11/01) · a `posicao` só conta o *1 · a mais* |
| T16 · os contadores zerados (`autoteste-falhando`) | a `causa` *o módulo voltou com a leitura zerada* e o `efeito` | a causa do `textos.md` (como a T16/05) · do mock, só o lido, *0 km* |
| T10 · o horímetro sem leitura (`grandeza-indisponivel.motivo`) | *A leitura desta linha não fornece horímetro…* | *sem horímetro*, do `calibracao.porModelo` do mock, que bate com a T10/02 a 04 |

**Também sem leitor, e diferentes da tela**, se você quiser alinhar junto:
- o `secaoF.motivo`: a T15/04 diz *recebimento pendente*;
- na T16, o `motivo` da faixa de contadores, o `motivoSemCercas` e a `nota` do ID na plataforma: a tela diz *não se aplica* e a nota do `textos.md`.

**Os que o protótipo lê do mock batem todos com a referência:**
- os motivos da calibração;
- os critérios da T12;
- a recusa da fila (T15);
- os sinais da CAN e os casos da T07;
- as divergências da T11;
- os nomes das seções e dos itens do checklist;
- a justificativa de exemplo;
- as assertivas da T16.

A única troca na tela é a da T16/05: o mock diz *Identificadores*, e o protótipo mostra *Extended ID · preservado*, como já estava nomeado.
