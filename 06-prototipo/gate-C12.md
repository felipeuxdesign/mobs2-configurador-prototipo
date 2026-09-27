# Gate C12 · O movimento fino — as 16 telas

**Data:** 2026-09-24 · **Estado: fechado (27/09).** O C12 está construído, medido, revisado e fechado: cada item do *Está pronto quando*, no fim deste gate, está marcado, com a régua do fechamento. O commit e o push ficam com o diretor. · **Antes:** execução liberada pelo diretor (autonomia até o fim, 24/09), com o padrão (a) de cada decisão. O estudo das 16 telas foi medido com a régua do movimento (`scripts/caminho.mjs`); os roteiros de estudo foram apagados.

**Atualizado em 2026-09-26 · o gate de hoje.** Três entregas entraram depois de 24/09 e estão construídas: a empresa e a unidade, a última do design e a moldura do palco com a barra. As tabelas têm 66 linhas, e eram 58. **A T13 volta ao ciclo.** **A direção de movimento é do Claude que constrói** (o diretor delegou em 26/09): o padrão de cada decisão é o que se constrói, e fica anotado aqui e no relatório. Texto ou quadro novo não se inventa: vai ao arquiteto. O que mudou está na seção logo abaixo; as seções de 24/09 ficam como estavam, e cada decisão que mudou ganha a nota de 26/09.

- **A lista das 66 linhas** está em `app/prints/tmp/c12/linhas.json`: a tela, a linha, o que o código faz hoje, a decisão que vale, como medir e o roteiro. É o que as telas leem.
- **A base das peças** está em `app/prints/tmp/c12/especimes-antes.json`: 127 espécimes, e só dois acima de 0,5%, os de sempre (a faixa sem ação, 6,64%, e a marca, 11,97%).
- **A base dos quadros** é `app/prints/linha-de-base-palco-e-barra.json`: as 145 referências, 44 em 0% do HTML.

## 26/09 · o censo de hoje

- **66 linhas** nas 16 tabelas de `animacao.md`. As 8 novas são estas:
  - na T05, a busca de novo;
  - na T10, o campo do painel, a foto registrada e o semear;
  - na T11, o veredito e o conferindo;
  - na T13, a seção abre e a barra do checklist.
- **4 linhas mudaram de texto na junção.** Nas três de baixo, a nossa versão ficou numa nota embaixo da linha; na T02, mudou só a palavra, e não há nota:
  - o primário da T02 diz *unidade*, e não mais *garagem*;
  - o quando das folhas da T04 mudou;
  - a coluna do reduzir das linhas de conferência da T11 voltou a *aparecem juntas*;
  - o quando do veredito da T13 voltou a *o último item passa*.
- **5 movimentos novos, escritos em prosa, sem linha na tabela:**
  - o diálogo *Outra sessão neste aparelho* (T01/18), que sai como todo diálogo;
  - o teto do reenvio (T01/17), que troca o texto no lugar, sem movimento;
  - o diálogo *Encerrar sem homologar?* (T04/13), a mesma peça em toda tela com a faixa;
  - o arraste da folha (lei 20), na T01 e na T04;
  - a busca de novo em 1,2 s, na nota da T05.
- **O que as três entregas pedem de movimento e não tem linha:**
  - a folha que vira diálogo: o *Encerrar a sessão* das folhas do módulo e do ativo abre o *Encerrar sem homologar?*, e o *Trocar de empresa* da T04/14 abre o diálogo de trocar;
  - a câmera do app da T10 (06), que entra e sai;
  - o nível do item da T13 (07, 08, 09 e 15): ele abre, passa ao próximo item depois do `Tirar foto` e volta;
  - a caixa *Não está conforme* (T13/07 → 08), que abre o campo e sobe 76 px;
  - o registro do problema, que toma o lugar do visor (T13/15);
  - a folha *Outras ações* (T11/03), que já se move como toda folha.
  - Nada novo se move no que o servidor recebeu (T12/01, 04 e 05), na fila do aparelho (T15), nos ícones riscados, na empresa (T02/05 a 07, com o marcador de toda escolha) nem na moldura do palco com a barra.
- **O código hoje:**
  - 37 declarações de movimento em 28 arquivos do DS (em 24/09, eram 36 em 26), mais uma numa tela, o veredito que espera da T11 (`t11.css`);
  - duas peças mexem por estilo, e só em transform: o arraste da `Folha` e as seções que descem na `SecoesDoChecklist`;
  - as peças novas que já se movem: a `SecoesDoChecklist` (200 ms), a seta e o corpo da `SecaoDoChecklist` (200), a `BarraDoChecklist` (scaleX em 300), o `VereditoDoChecklist` (surge em 150), a `LinhaChecagem` da conferência (o glifo e a linha do módulo, em 150) e a `Folha` com o arraste;
  - os mesmos 7 tokens de tempo e curva de 24/09, as 3 escalas e o `--toque-apagado`; o bloco *C12 · o movimento fino* do `tokens.css` ainda está vazio;
  - 15 ritmos em `src/estado/ritmos.js`: entraram o semear (1 s + 1 s) e a busca de novo (1,2 s);
  - a troca entre telas continua sem existir: a tela remonta pela chave (`src/App.jsx`).
- **Como foi medido:**
  - dois roteiros de estudo curtos, em `app/prints/tmp/c12/` (a T05, a T10, a T11, a T13 e a folha que vira diálogo da T04), apagados no fim;
  - uma medida de posição antes e depois do toque (`medir.mjs`, apagada no fim);
  - três estudos de um passo, pra acertar o `entre` do `linhas.json` (apagados no fim): pelo endereço, o primeiro glifo da T11 acende de 245 a 339 ms depois do fim do `abre` (400 da montagem); a 01 da T05 volta 1180 ms depois do quadro da 00; a primeira assertiva da T16, 321 ms depois da *Sessão encerrada*;
  - os `movimento.json` que os 20 roteiros gravaram hoje, das 21:18 às 21:51;
  - o estudo de 24/09 (`app/prints/c12-estudo.json`), nas linhas que não mudaram.

| Tela | Linhas | Feitas | Parciais | Faltam | Contradizem |
|---|---|---|---|---|---|
| T01 | 10 | 7 | 2 | 0 | 1 |
| T02 | 3 | 0 | 1 | 2 | 0 |
| T03 | 3 | 1 | 1 | 0 | 1 |
| T04 | 4 | 2 | 0 | 0 | 2 |
| T05 | 7 | 1 | 1 | 4 | 1 |
| T06 | 3 | 1 | 1 | 0 | 1 |
| T07 | 4 | 0 | 3 | 1 | 0 |
| T08 | 2 | 0 | 0 | 0 | 2 |
| T09 | 4 | 1 | 1 | 2 | 0 |
| T10 | 6 | 1 | 1 | 3 | 1 |
| T11 | 3 | 0 | 1 | 0 | 2 |
| T12 | 1 | 0 | 0 | 1 | 0 |
| T13 | 6 | 1 | 3 | 0 | 2 |
| T14 | 5 | 3 | 2 | 0 | 0 |
| T15 | 2 | 0 | 0 | 2 | 0 |
| T16 | 3 | 0 | 2 | 0 | 1 |
| **Total** | **66** | **18** | **19** | **15** | **14** |

- **Como se conta.** A tabela conta como a de 24/09: contra a linha como está escrita. *Contradiz* é a linha que pede o que uma lei, uma referência ou uma decisão não deixa, ou o que não existe mais. Contra a decisão que vale, o `linhas.json` conta outra coisa: **24 linhas feitas, 38 a construir e 4 fora do ciclo**. As 4 de fora são o firmware da T05, a busca de novo da T05 (o *Procurando…*) e as duas da T15.
- **O que mudou nas linhas antigas desde 24/09:**
  - **T10**, com a calibração com prova de 25/09: a foto do painel, feita em 24/09, hoje contradiz. A miniatura e o *aguarda* saíram, e a foto é tirada na câmera do app. O tambor, com os 500 ms da G29, continua sendo o que se constrói (C12·33).
  - **T13**, com a estrutura nova da decisão 34: o placar saiu, a barra do checklist ficou no lugar dele, e o veredito foi construído no `Finalizar`.
  - **T11:** o esmaecer do glifo foi construído, e o veredito espera a última linha, pela (b) de 25/09.
- **Os movimentos sem linha:** os 14 de 24/09, os das entregas e as 3 regras de todas as telas somam 30 no `linhas.json`. São 8 feitos, 5 parciais e 17 faltando.

### 26/09 · o que a régua mediu hoje

- **Nada do que a lei proíbe.** Nenhum ⚠ nos dois estudos nem nos `movimento.json` dos 20 roteiros: nada anima fora de transform e opacity, e nada anima em loop. A T04, a T05, a T10, a T11 e a T13 abrem quietas pelo endereço.
- **Com o reduzir, tudo zera na T10 e na T11**, e os processos seguem no mesmo ritmo:
  - no semear, o *Relendo…* e a 01 chegam entre 800 e 1300 ms;
  - na conferência, uma linha a cada 400 ms.
- **Feito, e medido hoje:**
  - a seção do checklist que abre (T13): as de baixo descem por transform em 200, a seta gira em 200 e os itens esmaecem em 200;
  - o `Finalizar` (T13): o veredito esmaece em 150, a barra completa em 300 e as seções descem em 200;
  - a conferência (T11): cada glifo esmaece em 150, a cada 400 ms, e na 00 a linha do módulo junto com ele;
  - o tambor da T10: seis rodinhas de 300, de 40 em 40, e 500 no total;
  - a busca de novo da T05: a 01 volta entre 900 e 1500 ms, no ritmo de 1,2 s;
  - o semear da T10, no ritmo de 1 s + 1 s;
  - o diálogo *Encerrar sem homologar?*, pelo ENCERRAR e pela folha do módulo: abre e fecha em 150;
  - as folhas: sobem em 200, fecham em 150 (no X, tocando fora, arrastando e no voltar) e voltam ao lugar em 200 (`folhas.mjs` e `conferencia.mjs`).
- **O que falta, medido hoje:**
  - a troca entre telas e entre quadros troca tudo direto. Medido em quatro lugares: o 01 → 00 → 01 da T05, a câmera da T10, o nível do item da T13 e o detalhe da T12;
  - a lista da T05 não surge em cascata na volta da busca;
  - o foco do campo do painel (T10) não anima, e o traço de 2 sobe o rótulo e a frase 0,5 px (o rótulo de 324,59 a 324,09, a frase de 400,59 a 400,09);
  - a foto registrada da T10 e o registro do problema da T13 entram direto;
  - a régua da diferença da T10 não anima;
  - a barra do checklist não avança na volta do nível do item: ela monta de novo, já no valor novo;
  - a caixa *Não está conforme* salta 76 px (de 586,5 a 510,9) e o campo aparece direto; só o quadrado surge, em 150.
- **O que a lei proíbe e ainda acontece.** São os achados de 24/09 que continuam:
  - **o véu pisca em toda folha que vira diálogo.** No `Cancelar`, o véu da folha esmaece de 87 a 162 ms (na T04, na fila e na empresa). É novo no *Encerrar a sessão* das folhas do módulo e do ativo e no *Trocar de empresa* da T04/14: a folha some de uma vez, e um véu novo esmaece desde o 0;
  - **o roxo do pressionado solta por cima do primário que desabilitou no mesmo toque.** Medido hoje no `Conectar ao …` (T05), no `Semear` (T10), no `Refazer a leitura` (T08), no `Continuar a gravação` (T09), no `Usar este ativo` (T06) e no `Fotografar o problema` (T13);
  - o traço de 2 que move o texto: na T01 e, novo, no campo do painel da T10;
  - o preenchimento `both` no registro da T06 e da T14.
- **O vão da T11, medido.** O veredito (`t11-veredito`) e a legenda da prova ficam em opacity 0 até a quinta linha, e entram em 150 nela. É o que o diretor recusou (C12·35).
- **O mesmo vão existe na T16.** A prova (ou o bloqueio) e o `Voltar ao menu` esperam invisíveis até a última assertiva (`t16-por-vir`, opacity 0). O rodapé fica vazio nos 3,2 s do autoteste (C12·44).

### 26/09 · os achados de hoje

1. **Na T05, o quadro da busca é outro desenho.** A 00 tem o bloco ESCOLHIDO em cima e os outros por perto embaixo. A 01 é uma lista só, com os cinco. O rodapé também troca. A busca de novo passa, então, por duas trocas de quadro inteiras (C12·4) e pela cascata da C12·28 (C12·41).
2. **A folha que vira diálogo pisca em três caminhos novos**, além do `Cancelar` de 24/09. Os diálogos do menu não têm todos a mesma presença: o de sair e o de trocar aparecem direto, e o *Encerrar sem homologar?* esmaece (C12·43).
3. **Todo veredito que espera a prova deixa um vão**: a T11 e a T16. O retorno do diretor vale pros dois (C12·35 e C12·44).
4. **A barra do checklist monta de novo** na volta do nível do item, porque o nível do item troca o miolo inteiro. Só avança na frente de quem olha no `Finalizar` (C12·36).
5. **O campo do painel da T10 é outra peça** (`ValorAlvo`), com o foco desenhado pelo estado. Troca a borda de 1 pra 2 px, como o `Campo` de 24/09 (C12·22 e C12·45).
6. **Na T13, a caixa do não conforme muda de lugar entre a 07 e a 08.** As duas referências a desenham em lugares diferentes: presa ao pé do miolo na 07, embaixo do visor na 08 (C12·47).
7. **Duas linhas descrevem uma peça que saiu.** O placar da T13 saiu com a decisão 34. A miniatura com o *aguarda* da T10 saiu com a decisão 33, e a foto do painel e a foto registrada são o mesmo movimento. As linhas se juntam (C12·36 e C12·42).
8. **A documentação ficou atrás.** A C12·13 ainda lista a busca da T02, que tem porta desde 25/09 (a lista longa pelo endereço, `busca.mjs`). A C12·14 e o *Não entra* ainda dão a busca da T05 como sem ritmo, e ela tem 1,2 s. O *Não entra* ainda fala do zoom do palco, que saiu (o diretor, 26/09).

## O censo de 24/09 · o que existia no começo do ciclo

- **58 linhas** nas 16 tabelas de `animacao.md`.
- **3 regras que valem nas 16 telas:**
  - entre telas, só o conteúdo esmaece;
  - o pressionado solta em 100 ms;
  - só transform e opacity se movem.
- **14 movimentos sem linha:** o código já faz alguns deles, e uma decisão do C0 pede os outros (a G26 e a G27).
- **O código:**
  - 36 declarações de movimento em 26 arquivos do DS, e nenhuma nas telas;
  - 7 tokens de tempo e curva, dos quais só 4 estão no `movimento.md`;
  - 3 escalas e o `--toque-apagado`;
  - 13 ritmos em `src/estado/ritmos.js`;
  - o congelamento do print (`src/estado/quadro.js`);
  - a tela que remonta pela chave, sem troca (`src/App.jsx:17`).
- **A régua:** toca pelo nome e grava o que começou a animar. Confere o `anima`, o `quieto`, o `reduzir` e o ritmo pelo `entre`. Acusa com ⚠ o que anima fora de transform e opacity, ou em loop.
- **As decisões do C0 que valem aqui:**
  - G26 (a lei do movimento vence a linha da tela);
  - G27 (quando o processo corre);
  - G29 (o tambor);
  - G24 e G25 (o que muda de lugar e o que não tem referência);
  - G4 (os ritmos);
  - as decisões 07, 10, 12 e 24.

| Tela | Linhas | Feitas | Parciais | Faltam | Contradizem |
|---|---|---|---|---|---|
| T01 | 10 | 7 | 2 | 0 | 1 |
| T02 | 3 | 0 | 1 | 2 | 0 |
| T03 | 3 | 1 | 1 | 0 | 1 |
| T04 | 4 | 2 | 0 | 0 | 2 |
| T05 | 6 | 1 | 1 | 4 | 0 |
| T06 | 3 | 1 | 1 | 0 | 1 |
| T07 | 4 | 0 | 3 | 1 | 0 |
| T08 | 2 | 0 | 0 | 0 | 2 |
| T09 | 4 | 1 | 1 | 2 | 0 |
| T10 | 3 | 1 | 1 | 1 | 0 |
| T11 | 1 | 0 | 1 | 0 | 0 |
| T12 | 1 | 0 | 0 | 1 | 0 |
| T13 | 4 | 0 | 2 | 2 | 0 |
| T14 | 5 | 3 | 2 | 0 | 0 |
| T15 | 2 | 0 | 0 | 2 | 0 |
| T16 | 3 | 0 | 2 | 0 | 1 |
| **Total** | **58** | **17** | **18** | **15** | **8** |

- **As 3 regras de todas as telas:**
  - entre telas: **falta** nas 16;
  - o pressionado: **feito**, e zera no reduzir;
  - só transform e opacity: **parcial**. Nada anima fora da lei, mas a borda que passa de 1 para 2 px desloca o texto em 0,5 px.
- **Os 14 movimentos sem linha:** 3 feitos, 2 parciais e 9 faltando.
  - **Feitos:** o marcador da T05, o placar da T08 e o indicador de rolagem.
  - **Parciais:**
    - a troca entre a folha e o diálogo da T04;
    - na T06, o marcador, a busca e a rolagem.
  - **Faltando:**
    - os quadros do recuperar acesso (T01);
    - a troca de fase da T03;
    - o diálogo da T04;
    - os liga-desliga da T07;
    - o `Ler novamente` da T07;
    - a troca de quadro da T08;
    - a volta do detalhe da T12;
    - o antes do disparo da T14;
    - o que entra com a última assertiva da T16.

## O que a régua mediu em 24/09

- **Nada do que a lei proíbe:**
  - nada anima fora de transform e opacity;
  - nada anima em loop;
  - nenhuma tela anima ao abrir, seja pela URL, pela coluna ou pelo print;
  - nada conta de zero ao abrir, fora dos processos que a G27 declara.
- **Com o reduzir, tudo zera**, nas 16 telas, ligado antes ou depois de abrir. Os processos seguem no mesmo ritmo:
  - o cronômetro da T01;
  - a baixa da T03;
  - a pré-checagem da T05;
  - a releitura da T08;
  - a cadeia da T09;
  - o ciclo da T14;
  - o encerramento da T16.
- **O "pressionado da linha ainda solta em 100 ms com o reduzir" não se repetiu** em nenhum dos oito estudos. A medida está no `_teste` de outro agente, na T02, e a linha que solta ali é a Várzea, que acabou de perder a marca. É, com toda a chance, o resto do toque anterior: a transição começou antes de o reduzir ligar e guardou os 100 ms dela. O C12 fecha isso com um roteiro que espera 150 ms depois de ligar o reduzir.
- **A troca entre telas não existe.** Nenhuma das 16 telas esmaece: o toque grava vazio, e a tela nova aparece direto.
- **O que já anima certo:**
  - o olho, o foco, o código, a contagem, a folha, o diálogo e o checkbox da T01;
  - o marcador das listas;
  - as folhas da T04;
  - o registro da correção da T06;
  - o tambor da T10;
  - a foto da T10;
  - o evento da T14 (medido: o relógio vira o horário por opacity, em 150 ms);
  - o pressionado em todo tocável.

## Os achados de 24/09

### 1 · O que o código faz hoje e a lei proíbe

1. **Move o layout: o foco e o escolhido trocam a borda de baixo de 1 para 2 px**, numa caixa de altura fixa, e o texto sobe 0,5 px.
   - Medido: o campo do usuário vai de 52 para 51, e o texto da senha de 553,75 para 553,25.
   - Onde: `src/ds/entrada/TracoFoco.css:15`.
   - Pelo mesmo mecanismo, sem medir: a célula do código (`Codigo.css:10-11`), o canal escolhido da T01 (`t01.css:57`) e o cartão do código em falha (`src/ds/cartoes/caixas.css:13`).
2. **Lima fora do escolhido, pelo foco desencontrado (T01).** O desenho do foco segue o estado da tela, e o traço segue também o foco do navegador.
   - Tocar no olho com o foco no usuário deixa os dois campos acesos, com os dois rótulos e as duas bordas em lima.
   - Tocar no checkbox apaga o traço da senha, enquanto o desenho fica.
   - Desenhar o foco do navegador é o foco de teclado desenhado, que a lei proíbe.
   - Onde: `src/telas/T01/Login.jsx:185-190` e `src/ds/entrada/Campo.jsx:23`.
3. **Movimento que nenhuma linha pede: o véu pisca no `Cancelar` dos dois diálogos da T04.**
   - Medido: opacity de 87 ms, invertida.
   - A folha remonta fechada no mesmo nó do véu do diálogo, que estava aceso.
   - Onde: `src/telas/T04/index.jsx:174-176`, `:204` e `:237` · `src/telas/T01/presenca.js:15-25`.
4. **O roxo do pressionado solta por cima de um primário que acabou de se desabilitar.** O desabilitado não tem roxo, e o botão aceso é outro. Medido em:
   - `Reconectar` → `Baixando` (T03);
   - `Conectar ao …` (T05);
   - `Refazer a leitura` (T08);
   - o último `Tirar foto` → `Finalizar instalação` apagado (T13).
5. **Uma animação terminada fica viva no registro da T06 e da T14.**
   - Com o preenchimento `both`, ela continua na lista do navegador, com 0 ms no reduzir, e o `quieto` da régua reprova para sempre depois da troca.
   - Onde: `src/ds/linhas/LinhaTocavel.css:22` e `src/ds/primitivos/Link.css:15`.
6. **O estado muda o desenho ao vivo, sem animar.** São desvios já nomeados (G24, com o diretor). Nada disso anima, e o C12 não pode animar esses saltos:
   - a T09, de gravando para concluída (os elos vão de 86 para 72) e na recuperação;
   - a faixa da T05, que empurra o miolo 37 px;
   - a causa e o aviso da T05;
   - o `Ler novamente` da T07 (−14,5 px);
   - o rodapé da T08 (±38 px).
7. **Riscos, que não acontecem hoje:**
   - o `corre` da escala e o `de` do tambor disparam quando a peça monta: ligados fixos na T07, animariam a abertura pelo menu;
   - a escala se posiciona por largura e por posição à esquerda (`src/ds/instrumentos/Escala.css:28-31` e `:46-50`): o C12 não pode pôr transição nelas.
8. **A documentação está atrás do código:**
   - a T08 ainda lista as duas linhas que a G26 cancelou;
   - a T10 diz 600 ms, e a G29 fixou 500;
   - a coluna Curva diz "esmaece" e "acelera";
   - a T16 diz "aparecem juntas";
   - o `movimento.md` não tem o `--mov-solta` nem o pressionado do botão só de ícone.

### 2 · As peças do DS que carregam o movimento de várias telas

1. **A troca entre telas** (`src/App.jsx:17`, do app e não de uma peça) vale nas 16 telas e nos quadros que trocam o desenho inteiro (C12·4).
   - Uma camada no conteúdo (o miolo e o rodapé), com a barra, a tira e a faixa de fora.
   - Dispara no `ir` de um toque. Não dispara no pulo do palco, no estado, na volta ao fluxo, no `Recomeçar`, na primeira abertura, no print, nem no `ir` que só acerta o endereço (a T11 faz um desses ao montar, `src/telas/T11/index.jsx:88-93`).
2. **O check que nasce no poço:** a `LinhaChecagem`, o `Trilho`, a `LinhaContagem` e o `Glifo`.
   - Esmaece em 150 ms só quando troca, nunca ao abrir.
   - Serve à T03, à T05, à T09, à T11 (o `lendo`), à T14 e à T16. Hoje troca seco.
3. **O `Aviso`:** surge em 150 ms quando aparece depois de a tela abrir, e fica parado quando abre já no estado. Serve à T01, à T05 (a parada), à T09 (a recusa, a queda, a recuperação) e à T16 (o bloqueio).
4. **O `Primario`:**
   - a troca de texto esmaecendo, por propriedade (T02);
   - o acender por camadas (T06 e T13, e sem linha na T05);
   - sem o roxo no desabilitado.
5. **A `Escala` que segue um processo:** o preenchido e o marcador andam só por transform, e hoje andam por largura e posição. Serve à T03 (a baixa), à T14 (o prazo), à T15 (o envio), à T13 (o placar, em 300 ms) e à T07 (o marcador que corre).
6. **A `Faixa` e a `BarraDoSistema`:** a faixa desce na T05 e sobe na T16, e a barra troca de cor por uma camada.
7. **A lista que se reorganiza** (`Busca` + `Lista`): as linhas que saem esmaecem, e as que ficam se deslocam até o lugar novo. Serve à T02, à T06 e à fila da T15.
8. **A folha, o véu e a presença:** estão prontos.
   - A presença mora em `src/telas/T01/presenca.js`, e a T04 a importa: é peça, e o lugar dela é `src/ds/chrome/`.
   - **O diálogo:** a T01 liga a presença, e a T04 e a T13 não.
   - **A troca entre a folha e o diálogo no mesmo véu:** a da T04 tem de parar de piscar.
9. **O pressionado:** o `Tocavel`, o `Primario`, o `Link`, o `LinkConteudo`, as `Camadas`, o `SoIcone`, a `TiraDeContexto` e o `BotaoSecundario`. Está pronto, e zera no reduzir.
10. **O marcador de escolha, o `Quadrado`:** pronto, na T01, T02, T05, T06, T13 e no palco. O conserto da vencida (`src/ds/linhas/LinhaEscolha.jsx:27`) vale em toda escolha.
11. **O traço de foco e o `Campo`:** dois consertos que valem em todo campo, a borda que desloca e o foco único.
12. **A troca no lugar:** pronta, com o conserto do preenchimento `both`.
    - no `SoIcone`;
    - no `Campo`;
    - na `LinhaTocavel` e no `Link` registrados;
    - no `BlocoEvento`;
    - na `LinhaDeOpcao`;
    - no `Requisito`;
    - na `FotoProva`;
    - no `CartaoFoto`;
    - no `Mostrador`.
13. **O tambor e a `RodaDigito`:** prontos na T10. Na T07 falta o gatilho da chegada.
14. **O indicador de rolagem** (R-15): pronto, em toda tela que rola. Nenhuma linha o pede.
15. **As peças de uma tela só:**
    - o `Codigo`, a `LinhaDeOpcao` e o `Requisito` (T01);
    - a `LinhaModulo` escalonada (T05);
    - o `ParComparado` (T06);
    - a `Leitura` com a pele vermelha e os `Sinais` (T07);
    - a `ReguaDiferenca` (T10);
    - o `Placar` (T13).

### 3 · Os tokens

1. **Na documentação, não no código.** Estes existem no `tokens.css`:
   - `--mov-solta` (100 ms), `--mov-escalonar-lista` (80) e `--mov-escalonar-tambor` (40), que zeram no reduzir;
   - `--escala-surge`, `--escala-dialogo`, `--escala-toque` e `--toque-apagado`.

   A tabela do `movimento.md` só lista quatro tokens. A documentação segue o código.
2. **Falta um fator do movimento que segue um processo**, a proposta `--mov-fator`: 1, e 0 no reduzir. O passo da barra que enche no ritmo (250 ms na T03 e na T14) vem de `ritmos.js` e não zera. Sem o fator, o reduzir não salta o passo.
3. **Nenhuma curva nova:** "esmaece" e "acelera" viram `--mov-curva` (G26). Só com a (b) do C12·5 faltaria uma curva que acelera.
4. **Nenhum tempo novo pras linhas:** 100, 150, 200, 300, 80 e 40 já existem, com as escalas.
5. **O que falta é ritmo, não token (G4):** a leitura da T07 (a proposta é 600 ms), a busca e o firmware da T05 e o envio da T15. Os três últimos são números do diretor.

## As decisões deste ciclo

Cada decisão traz o padrão que adoto. As marcadas **já decidida** repetem uma decisão do C0: o C12 só aplica e corrige o texto.

### Como o ciclo roda

- **C12·1 · Primeiro as peças, depois as telas.**
  - (a) As peças do achado 2 primeiro, cada uma com o espécime na vitrine e o roteiro dela. Depois as telas ligam, com quatro agentes de quatro telas e um revisor com a régua.
  - (b) Uma tela por agente, como nos ciclos de tela.
  - **Padrão (a):** nove peças carregam o movimento de 3 a 16 telas, e, tela por tela, o mesmo movimento nasceria várias vezes.

### O que vale em todas as telas

- **C12·2 · Entre telas, só o conteúdo esmaece, mas a lei proíbe animar a entrada de uma tela.**
  - (a) Uma camada só: o conteúdo novo vai de 0 a 1 em 150 ms, e o velho sai de uma vez. Isso só vale na troca pedida por toque. A tela que abre pela URL, pelo palco, num estado ou no print abre parada. A "entrada" proibida é o que se move dentro da tela nova: blocos subindo, contagem, escalonado.
  - (b) A tela velha e a nova se cruzam, as duas montadas por 150 ms.
  - (c) Nenhuma troca anima.
  - **Padrão (a):** cumpre a decisão 24 e a proibição juntas, e a régua já separa os dois casos (o `quieto` depois de abrir, o `anima` depois de tocar). Isto também resolve a dúvida do C0 sobre a T12 ("1→0→1"): os 150 ms são o total.
  - **Nota de 26/09 · construída** (a peça `src/ds/chrome/Troca.jsx`, o gatilho em `src/App.jsx`, a prova em `scripts/caminhos/mov-troca.mjs`). Três escolhas, com o padrão:
    - **o toque:** o do técnico, e o voltar do Android (no computador, o Esc), que faz o mesmo que a saída do rodapé e esmaece igual. O processo que leva sozinho a outra tela não é toque: o destino dos 4 passos da T16 (G23, o login ou a sincronização) troca direto. O toque se reconhece pelo evento ainda em curso quando o React desenha, sem relógio;
    - **o conteúdo:** o miolo e o rodapé, e o que estiver solto no fluxo fora deles. O que vem por cima (o véu com a folha ou o diálogo, e a rolagem) fica de fora como o topo: o diálogo que nasce aberto com a tela nova (o aviso do acesso da T04/12, o de outro usuário da T01/18) aparece direto, e o conteúdo esmaece embaixo dele;
    - **a espera:** a tela cujo processo só pode começar depois da troca (C12·35) pede `useFimDaTroca()`, que se cumpre no fim do esmaecer, ou logo, se nada esmaece (o endereço, o reduzir).
- **C12·3 · A barra e a faixa não conseguem ficar paradas quando o topo muda.** O topo muda na ida e na volta do menu, na passagem da T03 à T04, entre a T04 e a T05, e na T15 sem sessão.
  - (a) A barra, a tira e a faixa ficam fora da camada que esmaece e trocam direto. Ficam paradas entre as telas com o mesmo topo, e o `movimento.md` ganha a exceção do menu.
  - (b) O celular inteiro esmaece quando o topo muda.
  - (c) A faixa desliza pro lugar novo, o que é proibido.
  - **Padrão (a):** o topo do menu é outro desenho, e não a mesma faixa se mexendo.
- **C12·4 · O desenho que troca inteiro dentro da mesma tela** (**já decidida: G26**, falta a lista). A G26 já nomeia a T03 (00→02), a T05 (01→00), a T10 (00→01) e a T14 (01→00). O C12 acrescenta:
  - os quadros do recuperar acesso da T01;
  - a lista que vira *Confirmar o veículo* na T06;
  - a troca de quadro da T08 (00→01→02);
  - a volta do detalhe da T12;
  - a passagem da T16 para *Sessão encerrada*.

  As opções:
  - (a) Quando o título ou o rodapé trocam inteiros, o conteúdo esmaece em 150 ms, como entre telas. O momento que só muda o que está escrito, ou uma peça no lugar, move só a peça.
  - (b) Só a troca de tela esmaece.
  - **Padrão (a):** pro técnico, o canal, o código e a confirmação são páginas, e a G26 já disse isso.
  - **Nota de 26/09:** a lista ganha três trocas das entregas:
    - a câmera do app da T10 (06), ao entrar e ao voltar;
    - o nível do item da T13: ao abrir, ao passar ao próximo item depois do `Tirar foto` e na volta às seções;
    - a busca de novo da T05, do 01 pra 00 e de volta (C12·41).

    Nas três, o título, o miolo e o rodapé trocam inteiros.
  - **Nota de 26/09 · a peça pronta, as telas ligam na fase seguinte:** cada tela da lista chama `useTrocaDeQuadro(chave)` (ou `<TrocaDeQuadro chave>`, que não põe caixa), com a chave do quadro que desenha — o quadro, nunca o endereço, que a tela acerta depois de abrir. Esmaece o mesmo conteúdo da troca entre telas, por toque ou por processo, quando a chave muda depois de a tela abrir; a primeira chave, e a que muda antes do primeiro quadro pintado, abrem paradas. Espécime tocável na vitrine: `mov-troca-quadro`.
  - **Nota de 27/09 · ligada nas telas (T01 a T04):** a T01 com a chave do quadro (a entrada, o canal, o código, a senha); a T03 com a fase (00 → 02, e a parada ao vivo, 00 → 01, com o Reconectar, 01 → 00). **Duas escolhas, com o padrão (a):** a T02 também liga, com a chave `empresas` ou `unidades` — o Ver as unidades e o Trocar de empresa trocam o título, o miolo e o rodapé inteiros, que é o critério da (a), e a lista de 26/09 não a tinha; e, na parada da T03, o aviso vem dentro da troca de quadro (o rodapé troca inteiro) e não passa o `surge`, pra não esmaecer duas vezes. Prova: `mov-t01`, `mov-t02` e `mov-t03`.
  - **Nota de 27/09 · ligada nas telas (T09 a T12):** a T10 com a chave do quadro — a câmera, ou a grandeza do passo: o `Fotografar o painel`, o `Tirar foto` e o `Voltar à calibração` (a lista de 26/09) e, **uma escolha, com o padrão (a):** o `Calibrar o horímetro`, que troca o título, o miolo e o rodapé inteiros (o critério da (a)), como o próximo item da T13. O semear não é troca de quadro (a *T10 00→01* da G26): quem conta a mudança é o tambor e a régua, que se movem no lugar (C12·33, C12·34). A T12 com a chave da lista ou do detalhe da instalação: o toque numa instalação, o `Voltar às instalações` e o voltar. Nas duas, o rodapé nasce com o quadro (como a T05 e a T06): o texto do primário não esmaece de novo por dentro, e o roxo do botão de antes não solta por cima do novo (C12·18). A T09 e a T11 não trocam de quadro: a recuperação da T09 move só as peças (o aviso, o primário), como a parada da T05. Prova: `mov-t10` e `mov-t12`.
  - **Nota de 27/09 · ligada nas telas (T13 a T16):** a T13 com a chave do quadro — as seções, ou o item aberto: abrir, o próximo depois do `Tirar foto` e do `Salvar com ressalva`, a volta e o voltar do Android; abrir e fechar uma seção não é troca; a T16 com a fase, pelo processo — o encerramento (o corte é um passo dele), a sessão encerrada (o autoteste e o fim), os 4 sem homologar, a encerrada sem homologar e a interrompida —, com a faixa subindo junto (C12·25); a T14 com o desenho do prazo. **Duas escolhas, com o padrão (a):** na T14, além da 01 → 00 da G26 (a fila que drena: a frase dela sai do prazo e a espera sai do rodapé), o prazo estourado (a frase da Seção F entra, e sai no `Disparar outro evento`) e o ciclo concluído (o rodapé troca inteiro) também são quadros; e, nas três, o miolo e o rodapé nascem com o quadro (a chave), pra nada esmaecer de novo por dentro da troca — o último passo da T14, o check das fotos na volta da T13 (C12·37), o texto do primário (C12·23), o disparo que acende com a fila drenada. A alternativa, a T14 estourada e concluída mover só a peça, pediria a frase do prazo esmaecendo sozinha (o `Prazo` não tem isso) e deixaria o rodapé inteiro trocando seco. Prova: `mov-t13`, `mov-t14`, `mov-t16`.
    - **Revisão de 27/09 (T13 a T16):** o prazo que estoura e o `Disparar outro evento` trocavam de quadro sem prova — o `mov-t14` só media a fila que drena e o ciclo que conclui, e o 02 é estado da coluna, parado. Eles têm porta ao vivo: a sessão do KHT-4B08 · M2C-0335 (o caso `evento-sem-resposta`, G28), pelo T05 → T06 → T07 → menu → checklist → E. Medido: o prazo acaba aos 30 s do disparo, e o conteúdo esmaece em 150 com o `Disparar outro evento` dentro, sem camada; no toque, o prazo volta cheio com o quadro, sem encher por dentro, e drena dali, um trecho linear por tique. Prova: `mov-t14`.
- **C12·5 · A coluna Curva diz "esmaece" e "acelera", mas o `movimento.md` só tem uma curva** (**já decidida: G26**).
  - (a) Tudo em `--mov-curva`, como o código já faz. "Esmaece" é o efeito, e a coluna passa a dizer "desacelera".
  - (b) Um token novo de curva, simétrica ou que acelera.
  - (c) Linear.
  - **Padrão (a):** a `--mov-curva` é a curva de tudo o que não é linear.
- **C12·6 · As linhas dizem como cada coisa aparece, e o código também anima a volta.** A volta aparece em quatro lugares:
  - o campo que perde o foco;
  - o requisito que deixa de cumprir;
  - a marca que sai da linha anterior;
  - o diálogo que fecha.

  As opções:
  - (a) A volta é o mesmo movimento ao contrário, no mesmo tempo, escrita uma vez no `movimento.md`. A folha continua fechando em 150.
  - (b) Só anima o que a linha pede, e a volta é direta.
  - **Padrão (a):** é a regra que o checkbox já escreveu ("desmarcar some igual"), e sem ela cada peça vira um caso à parte.
  - **Nota de 26/09 · construída nas peças (por cima):** as quatro voltas são o mesmo movimento ao contrário, no mesmo tempo, e estão na peça: o campo que perde o foco (a capa do `TracoFoco` volta em 150), o requisito, a marca (o `Quadrado`) e o diálogo (150). E a troca no mesmo véu volta igual: no `Cancelar`, o diálogo some em 150 enquanto a folha sobe de novo em 200 (`src/ds/chrome/PorCima.jsx`). A folha continua fechando em 150. Prova: `scripts/caminhos/mov-porcima.mjs`.
- **C12·7 · O traço que "se desenha"** (**já decidida: G26**). Aparece nos requisitos da T01 e no check da T03. Os requisitos pedem ainda "o poço ganha o check", e a Lei 4 põe esse check solto.
  - (a) O glifo surge por opacity, em 150 ms. Na T01 é o cruzado de hoje, e a linha passa a dizer "a marca ganha o check". Na T03 são duas camadas no poço.
  - (b) O check se revela da esquerda pra direita, sob uma capa que encolhe (só transform).
  - (c) O desenho de verdade do traço, que fere a lei.
  - **Padrão (a):** a G26 decidiu, e a (b) fica como alternativa, se o diretor quiser o "desenhado".
- **C12·8 · A cor que muda** (**já decidida: G26**). Aparece em cinco lugares:
  - a borda vermelha da T07;
  - o botão que acende na T06 e na T13;
  - a linha vermelha da T05;
  - o elo vermelho da T09;
  - o poço do cartão liberado da T04.

  As opções:
  - (a) Onde a linha pede o movimento, a cor nova entra numa camada por opacity: a pele vermelha da T07 e o primário aceso da T06 e da T13. Onde não pede, a cor troca direto: o vermelho do valor e do elo, e o roxo do primário da T02.
  - (b) Toda cor troca direto.
  - **Padrão (a):** só transform e opacity se movem, e a camada cumpre o pedido.
  - **Nota de 26/09 · construída na peça (as peças do check):** o `Primario` ganhou `acende` (o `Rodape` passa `primarioAcende`, e o `Dialogo` com ciência liga sozinho): o rosto apagado de antes fica por cima e esmaece em 150, e o aceso aparece por baixo — é a mesma coisa que o aceso entrar por uma camada, e o quadro do fim é o aceso de sempre, sem resto. Só quando acende depois de montar; o que se desabilita troca direto (C12·18). Quem liga é a tela: a T06 e a T13.
  - **Nota de 27/09 · ligada nas telas (T05 a T08), pela direção de movimento:** a T06 liga o `primarioAcende` no *Confirmo que o …* (T06·3). O mesmo gesto vale pro primário que espera o fim de um processo com o mesmo texto, como o *Voltar ao menu* da T16 (C12·44) e o semear da T10: o *Selecionar ativo* da T05, quando a pré-checagem aprova, e o primário da T07, quando a leitura termina (C12·31). O primário que só se liga por um toque numa lista (o *Usar este ativo* da T06/00) troca o roxo direto, como o da T02 (C12·23). Prova: `mov-t05`, `mov-t06`, `mov-t07`.
    - **Revisão de 27/09 (T05 a T08), pela nota das T01 a T04 logo abaixo:** a frase do *Usar este ativo* da T06/00 contradizia a regra do app inteiro — o primário que acende na frente de quem olha **com o mesmo texto** acende por uma camada, e é o *Ver as unidades* da T02, que também volta a valer por um toque numa lista. A T06/00 liga o `primarioAcende`: o ônibus que se marca, sem nenhum marcado, e o marcado que a busca devolve (a 09 → a lista) acendem por uma camada; a busca que o esconde apaga direto (C12·18). E o fim da pré-checagem da T05 é um fim de processo qualquer que seja o veredito: reprovada ou parada no caso, o primário da saída (*Procurar outro módulo*, *Acordar módulo*, *Reconectar*, e os do firmware, sem porta no fluxo) acende pela mesma camada, com o texto novo no lugar do de antes (a peça já sabe), como o *Ler novamente* da T07 que lê com falha. Prova: `mov-t05` (a reprova do M2C-0394 e a parada do M2C-0335) e `mov-t06`.
  - **Nota de 27/09 · a direção de movimento, nas telas T01 a T04:** o mesmo gesto, o mesmo movimento — o primário que acende na frente de quem olha **com o mesmo texto** acende por uma camada em toda tela, e não só onde a linha pede: o *Salvar e entrar* da T01 (o último requisito cumprido) e o *Ver as unidades* da T02 que volta a valer (da empresa sem unidades pra Viação), como a T05, a T06, a T13 e a T16. Quando o texto troca junto, vale a C12·23: o texto esmaece e o roxo troca direto. A alternativa, a letra da (a) (a cor direto onde a linha não pede), deixaria o mesmo botão acendendo de dois jeitos no app.
  - **Nota de 27/09 · ligada nas telas (T09 e T10), pela direção de movimento:** o mesmo gesto — o primário que acende na frente de quem olha acende por uma camada, com o texto novo no lugar do de antes quando ele troca (a peça). Na T09: no fim da cadeia (*Voltar ao menu*), na recuperação (*Continuar a gravação*) e, sem porta no palco, na recusa e na queda (*Tentar de novo*, *Reconectar e seguir*); ao retomar, ele se apaga direto (C12·18), e o texto novo esmaece no lugar (C12·23). Na T10: no fim do semear (*Calibrar o horímetro*, *Fazer o ciclo dinâmico*, *Semear de novo*); e o botão que diz o que falta (*Digite o que o painel mostra* → *Fotografe o painel*, *Gravando no módulo…* → *Relendo…*) liga o `primarioTrocaTexto`, como a T01, a T02 e a T13 (C12·23). Prova: `mov-t09` e `mov-t10`.
  - **Conserto de 27/09 · a regra do app inteiro, na peça (o achado 1 da consistência):** o primário que acende com outro texto acendia de dois jeitos — pela C12·23 na T01, na T02, na T05 (a busca) e na T13, e pela camada com o texto novo por baixo no fim da pré-checagem da T05, da cadeia da T09 e do semear da T10 (medido no `mov-t05` de antes: o *Conectar ao M2C-0417* esmaece o texto, o *Procurar outro módulo* e o *Acordar módulo* esmaecem a camada). Vale a nota das T01 a T04, e a das T05 a T08 e a das T09 e T10 ficam corrigidas por ela: **com o mesmo texto, camada; com outro texto, o texto esmaece e o roxo troca direto (C12·23)**, qualquer que seja o jeito de acender — o toque ou o fim de um processo. A regra mora no `Primario`: a camada só nasce com o mesmo texto, e o primário que a tela liga pra mostrar a troca (`acende` ou `trocaTexto`) esmaece o texto que troca; nenhuma tela liga nada novo. Com isso, o *Acordar módulo* que apaga o primário da T05 também esmaece o *Selecionar ativo* de volta, com o roxo direto (C12·18), como o *Continuar a gravação* da T09. Mudam as linhas do primário da T05, da T09 e da T10 (`animacao.md`, C12·23). Prova: `mov-t05`, `mov-t09` e `mov-t10` — onde o texto troca, o `anima` é o texto e o `naoAnima` é a camada; onde não troca (a aprovada da T05, o fim da leitura da T07), o contrário.
- **C12·9 · O que abre espaço** (**já decidida: G26**). São a causa da linha (T05, T07) e o aviso: a recusa, a queda e a recuperação da T09, e a parada da T05.
  - (a) O que é novo esmaece em 150 ms. O espaço abre direto, pela Lei 3, e nada desliza.
  - (b) As linhas de baixo acompanham por deslocamento.
  - (c) Reservar os lugares, que é a G24, com o diretor.
  - **Padrão (a):** a Lei 3 deixa abrir espaço, e animar a altura é mover o layout.
  - **Nota de 27/09 · ligada na T09 (as telas T09 a T12):** a T09 passa `surge` no aviso que nasce ao vivo — a recuperação, pelo `ENCERRAR`, pelo `Voltar ao menu` da cadeia parada e pelo voltar; e a recusa e a queda, que o fluxo não alcança (C12·13) —, e cada aviso é um aviso novo (a chave é a fase: da recusa pra recuperação, o novo esmaece). **Uma peça ganhou o gesto:** a `Prova` ganhou `surge`, o mesmo do `Aviso`, pra a prova da cadeia que conclui na frente de quem olha (T09/00 → 04), onde a referência não reserva o lugar dela: esmaece no lugar, inteira, em 150, e a altura dos elos troca direto (G24). O contador do cabeçalho (*4 de 6*) aparece direto: é número, e troca no lugar. Prova: `mov-t09`.
  - **Nota de 27/09 · a T16, a legenda do passo que corre (a direção de movimento):** a cada passo do encerramento, a legenda passa ao passo que corre, e as linhas de baixo mudam de lugar (medido: de 13 a 30 px a cada 600 ms). Pela (a), o que é novo esmaece em 150 — a legenda, na peça `Encerramento` (só a que nasce depois de a peça abrir) — e o espaço muda direto: as linhas de baixo não deslizam, como a linha que cresce na reprova da T05 (C12·29). A alternativa, a (b) desta decisão (as linhas de baixo acompanharem por deslocamento), fica com o diretor. A linha entrou na tabela da T16 (C12·20). Prova: `mov-t16`.
  - **Revisão de 27/09 (T13 a T16) · o veredito da T13:** no `Finalizar instalação`, o mesmo fato se movia de dois jeitos. A `SecoesDoChecklist` media o lugar de cada seção pelo `offsetTop`, que conta do pai posicionado, e não da lista: com uma seção aberta (o caminho do herói), o veredito que abre espaço em cima da lista fazia as seis deslizarem pra baixo em 200 — a (b) desta decisão, que é do diretor —; com todas fechadas, nada deslizava. Consertado na peça: o lugar conta da lista. O espaço do veredito abre direto, pela (a), e só as seções de baixo da que fecha sobem (T13·1, ao contrário). Os quadros parados não mudam. Prova: `mov-t13` (o `Finalizar` com a B aberta, que só move as de baixo dela, e com todas fechadas, que não move nenhuma).
- **C12·10 · O que fecha espaço ou sobe** (**já decidida: G26**). É a lista filtrada da T02 ("as que ficam sobem juntas") e a fila da T15 ("a lista fecha o espaço").
  - (a) O layout vai direto pro fim. As linhas que ficam vão do lugar antigo ao novo só por deslocamento, em 150 ms, e as que saem esmaecem por cima, fora do fluxo. O cartão corta o que passa da borda dele. Nenhuma altura anima.
  - (b) Troca direta: a linha some e o resto pula.
  - **Padrão (a):** o quadro final é o layout de verdade, e só transform e opacity se movem.
  - **Nota de 26/09 · construída na peça (as peças das listas):** `useReorganiza(chave)` (`src/ds/linhas/Reorganiza.js`), com o espécime tocável na vitrine (`mov-listas-unidades`, `mov-listas-onibus`, `mov-listas-fila`) e a prova em `scripts/caminhos/mov-listas.mjs`. A tela põe o `lugar` no miolo e passa a chave (o termo da busca, ou o que diz a fila); se movem os filhos diretos do miolo e as linhas de cada cartão, e cada um anda só o que o de fora dele não andou (o grupo sobe inteiro, e a linha, dentro dele, só o resto). Três escolhas, com o padrão:
    - **o que sai** é uma cópia parada, muda pro leitor e sem toque, no lugar em que estava: dentro do cartão, se só a linha sai (e o cartão, já no tamanho novo, a corta), ou no miolo, se o grupo inteiro sai;
    - **o que volta** (a busca que volta a achar) esmaece no lugar dele, em 150, como todo o resto que é novo (C12·9); a linha da T02 não fala dele;
    - **a chave `null`** diz que o quadro não é a lista: a busca que abre outro quadro (a placa de outro pacote, na T06) não anda por cima da troca de quadro.
    O ritmo da fila da T15 continua com o diretor (C12·14): quando vier, a linha *150ms + 200ms* vira os 150 juntos desta decisão. As telas ligam na fase seguinte.
  - **Nota de 27/09 · a T15, o `Ressincronizar e reenviar` (a direção de movimento):** o toque que devolve os itens com erro pra fila fecha o espaço do cartão que pede ação: é esta decisão, e a T15 liga o `useReorganiza` no miolo, com a chave do que a fila mostra — o cartão sai esmaecendo por cima, o rótulo e a lista sobem, a recebida desce no cartão e o item que volta pra fila (o KJC-7N23) esmaece no lugar. A nota das listas deixava a T15 pro ritmo do envio (C12·14), que continua sem número; o `Ressincronizar` é toque, não envio, e não pede número nenhum. A linha entrou na tabela da T15 (C12·20). A mesma peça move a caixa do não conforme da T13 (C12·47). Prova: `mov-t15`.
- **C12·11 · As linhas que nenhuma referência sustenta** (**já decidida: G26**). São o check entre os chassis da T06, os valores virando traço da T08, e o marcador e o tambor da T08.
  - (a) Não rodam, e as linhas se reescrevem no C12. Na T06, o par chega com o conteúdo, na troca 00→01. Na T08, "o mostrador acende: a pele por opacity em 150 ms, e o valor troca no lugar", e a linha dos traços sai.
  - (b) Desenhar o check e o tambor, o que pede referência e número novos.
  - **Padrão (a):** a documentação segue a referência.
- **C12·12 · O check que nasce na frente de quem olha.** É cada linha da T03, que termina três vezes, e cada passo da T05, da T09, da T14 e da T16.
  - (a) Todo check que nasce na frente de quem olha esmaece em 150 ms: é o movimento do glifo, um só. Aberto já feito, fica parado.
  - (b) Só o do fim.
  - **Padrão (a):** é uma peça, e as cinco tabelas pedem o mesmo gesto.
- **C12·13 · Os movimentos sem porta no palco.** Cinco movimentos só acontecem num estado da coluna, que é inerte, ou num par que o fluxo não alcança:
  - a busca da T02;
  - a recusa da T09;
  - a ciência da T13;
  - a correção da T14;
  - o envio da T15.

  As opções:
  - (a) Construir o movimento na peça e prová-lo na vitrine, num espécime tocável. Onde a mesma peça aparece ao vivo, medir lá também: o aviso na recuperação da T09. O palco não mostra o movimento.
  - (b) Deixar o estado tocável só nisso, o que fura a regra do estado.
  - (c) A régua ganha um passo que destrava o celular só pra medir.
  - (d) O movimento sai do C12, como desvio nomeado.
  - **Padrão (a):** mede o movimento sem mexer no mock nem na regra do estado.
  - **Nota de 26/09:** a busca da T02 saiu desta lista, porque ganhou porta em 25/09: a lista longa abre pelo endereço (o 03 e o 04) e corre ao vivo (`busca.mjs`). A busca da T06 também (o 09). As duas se medem no app. Ficam a recusa da T09, a ciência da T13, a correção da T14 e o envio da T15.
  - **Nota de 27/09 · a T13:** o diálogo da Seção F nasce ao vivo no `Finalizar instalação` quando a F falha — só com a sessão do caso `pronto-para-fechar`, ou com o ciclo que estourou na T14 —, e a T13 liga a presença (`usePresenca`): ele e o véu nascem e somem em 150, como todo diálogo do app; aberto pela coluna (o 10), parado. A ciência continua provada na vitrine (`mov-check-ciencia`).
    - **Revisão de 27/09 (T13 a T16), medida:** os dois caminhos da nota de cima não chegam ao diálogo. O M2C-0371 do `pronto-para-fechar` não está por perto na T05 (a lista tem o M2C-0417, o 0362, o 0394 e o 0335); e a sessão do KHT-4B08, a do ciclo que estoura, chega ao checklist com a D em *8 de 10* — o `Finalizar instalação` fica apagado. O diálogo da Seção F e a ciência continuam nesta lista, sem porta ao vivo: a presença é a mesma de todo diálogo do app (`usePresenca`), a ciência se prova na vitrine, e o 10 abre parado pela coluna (`mov-t13`).
- **C12·14 · Os processos sem ritmo declarado (G4):** a busca e a atualização do firmware da T05, e o envio da fila da T15.
  - (a) Ficam como hoje, com a falta nomeada no CHANGELOG. A busca acha na hora, o firmware fica nos 62%, e a barra da fila fica parada. O número vai ao diretor.
  - (b) O C12 propõe os números, e eles entram no `movimento.md` depois do *vai*.
  - **Padrão (a):** inventar número é proibido, e a G4 já propôs a barra da fila parada.
  - **Nota de 26/09:** a busca da T05 saiu desta lista. Ela ganhou o número do arquiteto na última entrega: 1,2 s (`RITMOS.buscaMs`), com o quadro da T05/00 na tela. O movimento dela é o da C12·41. Ficam o firmware e o envio da fila.
- **C12·15 · A barra que segue um processo.** É a baixa da T03, e vale também pro prazo da T14 e pro envio da T15. Na T03, "4 s no total" contra a barra dos ativos; o marcador, linear ou em 300 ms desacelerando; e "salta pro fim" no reduzir contra o mesmo ritmo.
  - (a) A barra é dos ativos. Enche linear só na janela deles (10 itens de 250 ms), um trecho por item. O marcador anda junto com a ponta, linear, no tempo do item. Com o reduzir, cada item salta pro valor dele, e a baixa continua levando 4 s. Pede o `--mov-fator`.
  - (b) A barra do total (16 itens em 4 s), o marcador em 300 ms desacelerando, e o reduzir saltando pro fim.
  - **Padrão (a):** a referência 00 desenha 60% (6 de 10 ativos, medido no PNG: 352 de 588 px), e o `movimento.md` manda o processo seguir no mesmo ritmo.
- **C12·16 · A contagem que parte do começo nos processos declarados** (**já decidida: G27**). A T03 baixa de 0 a 16 ao abrir. A T08 aberta no 01 pela URL relê do zero. A T16 corre desde o passo 1.
  - (a) É o processo declarado, não a contagem de enfeite, e fica. No print e nos estados, a tela nasce no quadro da referência.
  - (b) A tela abre no quadro da referência e segue dali.
  - **Padrão (a):** o fato acontece agora.
  - **Nota de 27/09 · a T09 (as telas T09 a T12), pela G27:** a cadeia só corre depois da troca entre telas que trouxe a tela (`useFimDaTroca`), como a leitura da T07 (C12·30) e a conferência da T11 (C12·35 b): pelo menu, o primeiro bloco relê a 1 s do fim do esmaecer (aos 1150 do toque); pelo endereço, a 1 s da montagem; ao retomar, logo. Prova: `mov-t09`.
- **C12·17 · O pressionado que o `movimento.md` não lista:** o botão só de ícone (o olho, o X, o avatar) apaga a 0,7 e solta em 100 ms.
  - (a) O `movimento.md` ganha a linha.
  - (b) O botão só de ícone perde o pressionado.
  - **Padrão (a):** a R-12 pede o pressionado em todo tocável.
  - **Conserto de 27/09 · o checkbox (o achado 6 da consistência):** o checkbox era o único tocável sem pressionado — o `span role=checkbox` fora do `Tocavel`, sem camada —, e o quadrado respondia só ao soltar (medido no `mov-t06` de antes: a linha do ônibus grava o `--elevado` em 100 e o *Confirmo que o …*, só o quadrado). O estudo de 24/09 já apontava (`Checkbox.css`, sem pressionado) e a C12·17, ao estreitar pro só-ícone, deixou ele de fora sem decidir. Construído pela G14 (a), sem ir ao arquiteto: o pressionado que a folha não desenha é a camada do `Tocavel` — o `--elevado` na área de 48 do checkbox, por baixo do poço e do texto, que entra no toque e solta em 100 (`--mov-solta`), como a linha tocável. Vale na T01 (*Lembrar meu usuário*), na T06 (*Confirmo que o …*) e na T13 (*Não está conforme*, *Estou ciente*). Parado, a camada fica em 0: os 45 quadros da T01, da T06 e da T13 são os mesmos, pixel a pixel, com e sem ela, e os espécimes do checkbox também. Prova: `mov-t01`, `mov-t06`, `mov-t13` e `mov-check`. O `movimento.md` ganha o checkbox na linha do pressionado (o fechamento).
- **C12·18 · O roxo do pressionado solta por cima do primário que desabilitou no mesmo toque.**
  - (a) O desabilitado não mostra o roxo: a camada sai direto, e só o afundar solta.
  - (b) Fica como está, porque a lei deixa.
  - **Padrão (a):** o desabilitado não tem roxo, e o roxo por cima de outro botão diz que ele foi tocado.
  - **Nota de 26/09 · construída na peça (as peças do check):** no `Primario`, o desabilitado solta o pressionado sem transição, e só o afundar solta, em 100 — vale em todo primário, sem a tela ligar nada. A régua ganhou o `naoAnima` (`caminho.mjs`) pra provar: `{ toca: 'X', naoAnima: [{ prop: 'opacity', em: 'ds-primario-desabilitado' }] }`.
  - **Nota de 26/09:** medido de novo, e em mais lugares: o `Semear` (T10), o `Continuar a gravação` (T09), o `Usar este ativo` (T06) e o `Fotografar o problema` (T13).
  - **Conserto de 27/09 · o fechamento (o achado 9 da consistência):** a linha tocável fazia o mesmo que o primário fazia antes desta decisão — o `Conferir e reenviar` da folha *Não recebi o código* (T01), que fica em espera no próprio toque, soltava o `--elevado` por cima, em 100 (medido no `recuperar-movimento.json`: `ds-tocavel-desabilitado`, opacity 100). Pela (a), o desabilitado não tem pressionado em nenhum tocável: `.ds-tocavel-desabilitado::after { transition: none }` (`Tocavel.css`), como o `Primario`. Parado, nada muda (a T01 refeita, 19 de 19 iguais); no `recuperar` refeito, o toque não grava mais nada no `ds-tocavel`. O `movimento.md` diz a regra (*pressionado · o desabilitado*).
- **C12·19 · Uma animação terminada que fica viva:** o preenchimento `both` do registro, na T06 e na T14.
  - (a) Tirar o `both`. O quadro não muda, porque não há atraso.
  - (b) A régua ignora a animação terminada.
  - **Padrão (a):** conserta na peça e deixa a régua honesta.
  - **Nota de 26/09 · construída na peça (por cima):** saiu o `both` do registro da `LinhaTocavel` e do `Link`; o quadro é o mesmo, e o `quieto` passa 300 ms depois do toque. Os dois toques não têm porta no palco sem o mundo do chassi divergente e do ciclo que falha: a prova é na vitrine (`mov-registro-linha` e `mov-registro-link`, no `mov-porcima.mjs`). O `both` que sobra no app é o da `RodaDigito`, que tem atraso (o tambor), e é da peça dos instrumentos.
- **C12·20 · Os movimentos que o código faz sem linha na tabela:** o marcador da T05 e da T06, a busca da T06 e o indicador de rolagem.
  - (a) O movimento é da peça e vale onde ela está. As tabelas ganham as linhas no mesmo ciclo.
  - (b) Cada tela só move o que a tabela dela lista.
  - **Padrão (a):** a peça é uma só, e a documentação segue o código.
  - **Nota de 26/09 · construída na peça (as peças das listas):** o conserto da vencida mora na `LinhaEscolha`: o poço da vencida que se escolhe guarda o quadrado desde o começo, invisível por cima do traço, e o lima surge no toque (opacidade e escala, 150) e some na volta, como em toda escolha. Parada, a linha é a mesma, pixel a pixel (medido na T02/00 e na 02, 0 pixel). A tela não liga nada: vale já na T02. O marcador da T05, da T06 e das empresas da T02/05 e 07 já estava certo, e o `mov-listas.mjs` prova os quatro no app. As linhas das tabelas da T05 e da T06 são da fase das telas.

### A entrada (T01 e T02)

- **C12·21 · O foco desenhado e o foco do navegador se desencontram.**
  - (a) Um foco só: o que a tela diz. O traço deixa de seguir o foco do navegador, e tocar no olho ou no checkbox não muda o campo aceso.
  - (b) Só o foco do navegador.
  - **Padrão (a):** desenhar o foco do navegador é o foco de teclado desenhado, que a lei proíbe, e é o que acende dois campos.
  - **Nota de 26/09 · construída nas peças (por cima):** o `:focus-within` saiu do `TracoFoco`, do `Campo` e do `CampoTexto`. O campo acende pelo que a tela diz (`focado`) ou pelo foco do **próprio campo** (o toque que abre o teclado nele: `src/ds/entrada/foco.js`), nunca pelo que está dentro do poço e não é o campo — o olho, o xis. É o padrão pras peças que a tela não controla (a `Busca` da T02 e da T06, o `CampoTexto` da T13): sem ele, elas não acenderiam no toque. Na T01, o olho e o checkbox não acendem nem apagam campo nenhum (medido: nenhuma capa anda no toque deles).
- **C12·22 · O traço de 2 px move o texto em 0,5 px.**
  - (a) A borda fica em 1, e o traço de 2 é desenhado por cima, pela capa que o traço de foco já tem. O mesmo vale na célula do código, no canal e no cartão em falha.
  - (b) Aceitar o meio pixel.
  - **Padrão (a):** o estado muda o conteúdo, nunca o desenho.
  - **Nota de 26/09:** o campo do painel da T10 faz o mesmo. É o `ValorAlvo`, da entrega de 25/09: no foco, o rótulo e a frase sobem 0,5 px (medido). Ele entra no conserto (C12·45).
  - **Nota de 26/09 · construída nas peças (por cima):** a borda fica em 1 e só troca a cor; 1 de lima (ou de vermelho) por dentro dela a completa, por uma sombra de dentro — o poço não muda de tamanho e nada sai do lugar. No `TracoFoco` (o `Campo`, a `Busca`, o `CampoTexto`, a senha nova da T01), na célula do `Codigo` (o foco e o errado), no canal escolhido e no cartão do código em falha da T01 (`t01.css`) e no `ValorAlvo` (C12·45). Medido no `mov-porcima.mjs` (o passo novo `mesmoLugar` do `caminho.mjs`): o foco, o olho, o checkbox, o traço que pula de célula, o código errado, o canal que troca e o campo do painel não tiram texto nenhum do lugar. **O custo, nomeado:** as referências desenham o traço de 2 dentro da mesma altura, e nelas o texto sobe 0,5 px no quadro aceso; aqui ele fica. Contra a base (HTML): T01/02 0 → 0,11 · T01/05 0,07 → 0,35 · T01/07 0 → 0,28 · T01/08 0,02 → 0,03 · T01/10 0 → 0,01 · T02/03 e 04 0,01 → 0,02 · T06/08 0,02 → 0,03 · T10/05 0 → 0,04; contra o PNG, a T01/05, 07, 08 e 10 melhoram. O espécime `f8-valor-alvo` (a folha desenha o de 2 em altura livre) fica 1 px mais baixo, 0 → 1,5%. Vai ao arquiteto: redesenhar o aceso com o traço por cima da borda.

- **C12·23 · O primário da T02: a linha diz "primeira escolha", mas o texto troca também nas escolhas seguintes (Várzea → Ibura).**
  - (a) Toda troca de texto do primário da T02 esmaece no lugar, por uma propriedade do `Primario`, e o roxo troca direto. Os outros primários não ganham isso: a T01 troca entre `Confirmar` e `Tentar de novo` sem nenhuma linha pedir.
  - (b) Só a primeira troca esmaece.
  - (c) O texto esmaece, e o roxo também acende por uma camada.
  - **Padrão (a):** o roxo que troca direto é a G26, e cada escolha nova é o mesmo fato que a primeira.
  - **Nota de 26/09 · construída na peça (as peças do check):** o `Primario` ganhou `trocaTexto` (o `Rodape` passa `primarioTrocaTexto`): o texto novo esmaece no lugar em 150, o de antes sai de uma vez, e o roxo troca direto. A direção de movimento (26/09) estende a propriedade ao botão que diz o que falta — a T01, a T02 e a T13 (*Fotografar o problema* → *Conte o que aconteceu* → *Salvar com ressalva*) —, e cada uma liga a dela.
  - **Nota de 27/09 · ligada na T05, pela direção de movimento:** o *Conectar ao …* da T05 é o mesmo gesto da T02 — marcar numa lista, e o primário diz o escolhido —, e liga o `primarioTrocaTexto` nos rodapés da busca (a 00, a 01 e o que marca outro por perto); a trava da 04 (*Tentar de novo*) troca direto. Prova: `mov-t05`.
  - **Nota de 27/09 · ligada na T01 e na T02:** na T02, nas unidades e nas empresas, a cada escolha, e na busca que esconde ou devolve a escolha. Na T01, **com o padrão da (a) da T02 (toda troca de texto)**: no rodapé da entrada (*Digite o usuário* → *Digite a senha* → *Entrar*) e no do código (*Digite o código* → *Confirmar*, e também *Tentar de novo* e *Enviar outro código*) — o texto do primário que troca dentro do mesmo quadro esmaece no lugar, sempre; entre quadros, é a troca de quadro que esmaece. A linha da T02 passa a dizer *cada escolha* (C12·23).
  - **Nota de 27/09 · ligada nas telas (T13 a T16):** a T13 no rodapé da câmera (`Tirar foto` → `Fotografar o problema` → `Conte o que aconteceu` → `Salvar com ressalva`) e no `Finalizar instalação` → `Encerrar a sessão`; a T14 no disparo (`Disparar evento de teste` → `Encerrar o ciclo`); a T16 no corte (`Encerrando · não desconecte` ↔ `Aguardando o módulo voltar`, os dois apagados, como os da T01). O rodapé nasce com o quadro nas três: dentro da troca, o texto não esmaece de novo. O C12·18 se prova no `Fotografar o problema` que vira o `Conte o que aconteceu` (o `naoAnima` do `mov-t13`).
    - **Revisão de 27/09 (T13 a T16), medida:** na T16, só a volta do corte tem porta. O único par que pede o corte é o KNB-5H39 · M2C-0371, e o M2C-0371 não está por perto na T05. O 01 pelo endereço já abre no corte, e o `mov-t16` mede o *Aguardando o módulo voltar* → *Encerrando · não desconecte*. A ida é o mesmo rodapé, com o mesmo `primarioTrocaTexto`, e fica sem medida ao vivo.
  - **Conserto de 27/09 · a T07 (o achado 5 da consistência) e a regra da peça (o achado 1, na C12·8):** o primário apagado da T07 trocava o texto seco na frente de quem olha — o *Configurar módulo* que vira o *Ler novamente* com o sinal que falha, e a volta no toque do *Ler novamente* (medido no `mov-t07` de antes: só a borda, a causa e o marcador animam). É o mesmo fato do corte da T16 e do *Gravando no módulo…* → *Relendo…* da T10: os dois rodapés da T07 ligam o `primarioTrocaTexto`, e o texto esmaece no lugar, com o roxo direto (C12·18 no toque). O link que troca junto (*Voltar ao menu* → *Configurar módulo*) não tem gesto de peça e continua direto, nomeado. A linha do primário da T07 ganha a troca (`animacao.md`, C12·23). Prova: `mov-t07`.

### A faixa, o menu e a conexão (T04, T05 e T16)

- **C12·24 · A faixa que nasce.** A T04 pede a descida no menu, "com o conteúdo junto", e a T05 pede na T05, "quando a última linha passa". A sessão nasce na T05, e o nascimento empurra o miolo 37 px.
  - (a) A linha sai da T04 e fica na T05. A faixa desce de cima em 200 ms quando a pré-checagem aprova. O miolo acompanha só por deslocamento, dos 37 px até zero, com o lugar já aberto. A barra troca de cor por uma camada, nos mesmos 200 ms.
  - (b) Só a faixa desce, e o miolo salta, como no desvio da Lei 3 de hoje.
  - (c) Reservar o lugar da faixa desde a busca, o que muda o desenho de 00 a 15.
  - **Padrão (a):** é a decisão 07, e o técnico vê a faixa empurrar o conteúdo em vez de um salto. Uma última linha que passa depois de uma reprova não abre a sessão.
  - **Nota de 27/09 · construída na peça (a faixa):** a `Faixa` ganhou `ausente` (`src/ds/chrome/Faixa.jsx`), e a T05 liga só isso: até a pré-checagem aprovar, a faixa fica montada no lugar dela, sem caixa; quando aprova na frente de quem olha, o layout vai direto pro fim e ela desce de -100% a 0 em `--mov-padrao`, na `--mov-curva`. O que ela empurrou vai de onde estava ao lugar novo só por deslocamento, no mesmo tempo: o miolo anda os 37 px medidos, e a tira das leituras, 42, porque a folga do pé do cartão cresce 5 na aprovada — cada parte pelo que mediu, nada escrito na peça. Pelo endereço, no print e com reduzir movimento, a faixa aparece parada. Prova: `scripts/caminhos/mov-faixa.mjs` e o espécime `mov-faixa-nasce`.
    - **Desvio da (a), pela direção de movimento:** a barra do sistema não troca de cor por uma camada. Ela é do Android (decisão 43, lei 22) e não se move: a cor troca direto, na hora em que a faixa começa a descer, e a faixa sai de baixo dela, na mesma cor. Pra isso, a barra fica por cima de tudo o que o app desenha (`--camada-sistema`, o mesmo do indicador de rolagem).
    - **A régua:** o `toca` do `caminho.mjs` espera o tocável que ainda anda até o lugar (o ENCERRAR da faixa que desce, coberto pela barra no caminho) chegar, até 1 s, antes de dizer que ele está coberto. O `abortada` e o `portas` tocavam o ENCERRAR logo que ele aparecia.
    - **O ENCERRAR que se apaga e volta (a lei 17)** já trocava de tinta direto, e a camada do pressionado sai de uma vez no desabilitado: medido segurando o dedo 150 ms na recuperação da T09, a tinta do pressionado vai direto pra apagada, sem nada soltando por cima. O `mov-faixa` prova na T09, no semear da T10 e na vitrine (`mov-faixa-encerrar`).
- **C12·25 · A faixa que encerra na T16:** "sobe e some", mas a referência desenha a faixa sem sessão no mesmo lugar.
  - (a) A faixa aberta sobe em 200 ms, por baixo da barra, e revela a faixa sem sessão, que já está no lugar. Nada do layout se move.
  - (b) O conteúdo da faixa troca no lugar, esmaecendo em 150 ms.
  - (c) Troca direta, como hoje.
  - **Padrão (a):** é a decisão 07 ("a faixa sobe no encerramento") sem desmentir a referência.
  - **Nota de 27/09 · construída na peça (a faixa):** a `Faixa` ganhou `revela`, e a T16 liga só isso, na faixa sem sessão. Quando a sessão fecha na frente de quem olha — os sete passos, ou os quatro sem homologar —, a aberta fica por cima da sem sessão, no mesmo lugar, sobe de 0 a -100% em `--mov-padrao`, na `--mov-curva` (desacelera, C12·5), por baixo da barra, e sai. Nada do miolo se move. Pelo endereço, no print e com reduzir movimento, a troca é direta. Prova: `scripts/caminhos/mov-faixa.mjs` e o espécime `mov-faixa-encerra`.
- **C12·26 · O cartão liberado da T04:** o módulo conecta na T05, com o menu fora da tela.
  - (a) A linha sai. No menu nada se move, os cartões abrem liberados, e a mudança chega com o esmaecer entre telas.
  - (b) O menu guarda o último quadro visto e esmaece os cartões que mudaram, logo depois de chegar.
  - **Padrão (a):** a (b) anima a entrada da tela.
- **C12·27 · A troca entre a folha e o diálogo da T04**, que não tem linha e hoje faz o véu piscar.
  - (a) No mesmo véu, parado: a folha desce em 150 ms enquanto o diálogo nasce em 150. No `Cancelar`, o diálogo esmaece em 150 enquanto a folha sobe em 200. A linha entra na tabela da T04.
  - (b) A folha sai e volta direto, e só o diálogo se move.
  - (c) Nada se move, como hoje.
  - **Padrão (a):** cada peça faz o movimento dela, e o véu, que é o mesmo, não pisca.
  - **Nota de 26/09:** a regra vale pra toda folha que vira diálogo, também as das entregas (C12·43). No `Cancelar`, o véu ainda pisca: medido hoje de 87 a 162 ms.
  - **Nota de 26/09 · construída na peça (por cima):** `src/ds/chrome/PorCima.jsx` — o véu e o que mora nele numa peça só (`usePorCima(qual)` + `<PorCima camada lugar>`, e o `usePresenca` de uma coisa só, que saiu da T01). O véu fica aceso e nada anima nele; o que sai continua desenhado como estava, mudo e sem toque, fora do fluxo e **por baixo** do que entra, até acabar de sair (150). A T04 liga: a conta, a unidade, o módulo, o ativo, o sair, o trocar e o Encerrar sem homologar? se revezam no mesmo véu. A linha entrou na tabela da T04 (*folha que vira diálogo*, marcada C12·27 e C12·43). Prova: `mov-porcima.mjs` (o `naoAnima` no véu em cada troca).
- **C12·28 · A lista de módulos surge "quando a busca acha", e no protótipo a busca acha na hora de abrir.**
  - (a) A lista surge, uma linha a cada 80 ms, só quando um toque refaz a busca (`Procurar de novo`, `Procurar outro módulo`). Ao abrir, ela já está lá.
  - (b) Surge também ao abrir, depois do esmaecer entre telas.
  - (c) Só surge quando o diretor der o ritmo da busca.
  - **Padrão (a):** cumpre a linha no único momento em que a busca acontece na frente de quem olha.
  - **Nota de 26/09:** a busca de novo ganhou um quadro e um ritmo: a T05/00 fica 1,2 s na tela. A cascata acontece quando a 01 volta, que é o *a busca acha*. A troca pra 00 no toque é uma troca de quadro (C12·41).
  - **Nota de 26/09 · construída na peça (as peças das listas):** a cascata mora na `Lista` (`surge`), e não na `LinhaModulo`: é o gesto da lista, e vale pra qualquer linha. Cada linha esmaece em 150, a seguinte 80 depois (0, 80, 160, 240 e 320 nas cinco da T05/01), e espera invisível só até a vez dela; acabou, nada fica vivo. Com reduzir, aparecem juntas. A T05 passa `surge` só na lista que volta da busca; ao abrir, e no toque que marca, parada. Espécime tocável: `mov-listas-cascata`.
- **C12·29 · "A linha que falha: o aviso surge".** Nas reprovas não há aviso: o aviso só existe nas paradas, a 14 e a 15.
  - (a) A linha se parte em duas.
    - **A reprova:** o glifo, a cor e a causa trocam no lugar, esmaecendo em 150 ms, e a linha cresce direto.
    - **A parada:** o aviso esmaece no topo, e a lista salta.
  - (b) Ler "o aviso" como a própria causa.
  - **Padrão (a):** a documentação segue as referências.

### A CAN (T07)

- **C12·30 · Quando a leitura corre** (**já decidida: G27**) **e em que ritmo.**
  - (a) Corre na chegada da T06, depois da troca de 150 ms, e no `Ler novamente`: 600 ms por sinal, na ordem da tela, 4,2 s no total, no mesmo ritmo com o reduzir. Pelo menu, depois da T08, na coluna e no print, a tela nasce lida e parada. O ritmo entra no `movimento.md` e em `ritmos.js`.
  - (b) Os sete sinais de uma vez.
  - (c) 400 ms, o ritmo da conferência.
  - **Padrão (a):** a releitura da T08 lê o mesmo barramento em 600 ms, e o marcador e o tambor não podem disparar ao abrir.
- **C12·31 · O quadro de começo dos sinais não tem referência (G25).**
  - (a) O quadro de fim com as partes que se movem na origem:
    - o valor em traço;
    - o marcador no começo da escala;
    - as rodinhas na casa 0;
    - o contador em 0;
    - o primário desabilitado, com o mesmo rótulo.

    O pedido vai ao arquiteto.
  - (b) O cartão inteiro esmaece quando o sinal chega.
  - (c) Só o marcador e o tambor se movem.
  - **Padrão (a):** junta só peças que existem.
  - **Nota de 27/09 · ligada na T07 (as telas T05 a T08), com três escolhas pelo padrão:**
    - **a chegada da T06** é o ativo que o *Usar este ativo* acabou de confirmar: a T06 zera a leitura da CAN do estado único no toque (`etapas.can`), e a T07 corre quando o ativo da sessão é o que a T06 confirmou e a CAN dele ainda não foi lida. O relógio liga no fim da troca entre telas (`useFimDaTroca`): o primeiro sinal chega aos 750 do toque (150 + 600), e, no *Ler novamente*, aos 600. Pelo menu, depois da T08, pela URL, pelo palco, na coluna e no print, a tela nasce lida. O ritmo entrou em `ritmos.js` (`leituraCanSinalMs`, 600) e falta no `movimento.md` (é do fechamento);
    - **o que o quadro de começo diz enquanto lê:** o cabeçalho e o rodapé dizem o que já chegou, e não o quadro de fim — o veredito espera a prova (C12·35, C12·44). A contagem troca no lugar a cada sinal que passa (*0 de 12* … *7 de 12*); o sinal que falha traz o *1 reprovado*, na cor dele, e troca o rodapé pro *Ler novamente* (apagado) com o *Configurar módulo* no link. O primário acende por uma camada quando o último chega (C12·8). O link e o ENCERRAR ficam como no quadro de fim;
    - **o valor em traço** é o `—` sem a unidade, como o mostrador apagado da T08 e o sem leitura da T07/02; as rodinhas ficam na casa 0 com o *km*. O sinal estático que o mapa não desenha (o óleo do ma-02) chega por último, só na contagem.
    O *Ler novamente* volta ao quadro de começo de uma vez (as peças nascem de novo, paradas) e lê de novo. O quadro de começo vai ao arquiteto (G25). Prova: `mov-t07`.

### Configurar, calibrar e conferir (T09, T10 e T11)

- **C12·32 · O trilho da T09 acende, e a T16 usa a mesma peça sem pedir isso.**
  - (a) O check fica na peça, porque as duas pedem. O trilho acendendo, de cima pra baixo em 300 ms, é opcional, e a cadeia o liga. O trilho do elo que passa a correr, da divisória pro branco, troca direto.
  - (b) Os dois na peça, e a T16 ganha um trilho que não pediu.
  - **Padrão (a):** cada tela move só o que pede.
  - **Nota de 26/09 · construída na peça (as peças do check):** o `Trilho` ganhou `acende`, e a `Cadeia` liga: o lima já fica embaixo, e o trilho de antes encolhe pro pé por scaleY, em 300 — o lima desce de cima pra baixo. O `Encerramento` não liga. O check do poço esmaece nos dois (C12·12).
- **C12·33 · O tambor da T10: a linha pede 600 ms, e a G29 fixou 500** (**já decidida: G29**).
  - (a) Fica em 500 ms (300 por rodinha e 40 entre elas, a unidade primeiro), e a linha se reescreve.
  - **Padrão (a):** uma peça, um tempo.
- **C12·34 · A régua da diferença "encolhe até zero", mas o quadro final não mostra zero, e contar é proibido.**
  - (a) Durante os 300 ms da releitura, o texto da diferença encolhe no centro e esmaece. O *confere*, com o poço aceso, o alvo cumprido e o segmento feito, entra no fim dos 300 ms. Hoje ele entra no começo, e os 300 ms são espera parada. Com o reduzir, o semear é movimento: tudo em 0.
  - (b) O texto e o *confere* trocam por opacity em 300 ms.
  - (c) O número conta até zero.
  - **Padrão (a):** é a sequência que a decisão T10·4 pede, e nenhum ritmo de semear está declarado.
  - **Nota das peças (26/09):** a (a) está na `ReguaDiferenca`, e dispara sozinha quando o veredito chega depois de a régua montar. A diferença encolhe (scale) e esmaece em 300, `--mov-curva`, ainda no lugar dela. O *entra no fim dos 300* é, pelo padrão, o veredito esmaecendo em 150 (`--mov-rapido`), como todo check que nasce. O não confere (T10/10) faz o mesmo. Os traços acompanham a largura do texto novo quando ele entra (o conteúdo muda, e o traço é o resto da linha). Quando o poço, o alvo e o segmento trocam é da tela (a fase seguinte). Prova: `mov-instrumentos.mjs`, na vitrine (`mov-semear`).
  - **Nota de 27/09 · ligada na T10 (as telas T09 a T12):** a tela passa o veredito à régua quando a releitura chega — o tambor rola até o relido e a diferença encolhe no mesmo tique —, e o resto do veredito assenta quando o confere (ou o não confere) entra na régua, no fim dos 300: o poço acende (*O MÓDULO CONTA AGORA*), o alvo diz que cumpriu, o segmento fica feito e o primário acende por uma camada, no mesmo quadro. Até lá, o processo não acabou: o *Relendo…*, o *Voltar ao menu* e o `ENCERRAR` ficam como estavam (a lei 17). O sinal é o fim do encolher da diferença na peça (o `animationend` do `ds-regua-sai`, o mesmo em que a peça põe o veredito), sem relógio; logo, quando a régua não anda — com reduzir movimento (o `--mov-lento` em 0: o `animationstart` de uma animação de 0 ms não chega sempre, medido), sem a diferença escrita antes, ou sem veredito escrito (o não confere a mais, só os traços). **Uma escolha, com o padrão:** o tambor e a diferença começam juntos, e não em sequência (a T10·4 do C0: o tambor, depois a régua) — os dois contam o mesmo fato, e a sequência levaria o veredito a 800 ms da releitura. A URL diz o 01 na chegada. Prova: `mov-t10`.
    - **Revisão de 27/09 (T09 a T12):** a escolha de cima desfazia uma decisão tomada — a T10·4 do C0 é **(a), em sequência** (*o tambor, depois a régua em 300ms*; o read-back vem depois da escrita, princípio 3), e o padrão (a) desta decisão se apoia nela (*é a sequência que a decisão T10·4 pede*). Juntos, o poço acendia *O MÓDULO CONTA AGORA* aos 300, com as duas rodinhas da esquerda ainda rolando até os 500: o veredito antes da evidência, o que o diretor recusou na T11 (C12·35). Voltou à sequência: o tambor rola até o relido (500); quando a última rodinha para, a régua recebe o veredito e a diferença encolhe em 300; no fim dos 300 (aos 800 da releitura), o confere entra em 150 e o resto assenta no mesmo quadro. O sinal continua sem relógio: o `animationend` da última `ds-roda-rola` (uma por dígito do relido, como o `Tambor` conta) e depois o do `ds-regua-sai`. Com reduzir, tudo logo, como antes. Prova: `mov-t10` (o tambor com a régua parada, a régua com o tambor parado, e o veredito aos ~800).
- **C12·35 · Na T11, o veredito aparece antes da evidência, e o primeiro glifo acende aos 400 ms.**
  - (a) Manter as duas coisas: só os glifos acendem, e o primeiro vem 400 ms depois de a tela montar, com a troca de 150 ms já acabada.
  - (b) O veredito espera a quinta linha, e o relógio só liga depois da troca (o primeiro glifo aos 550 ms).
  - **Padrão (a):** foi decidido no C11 e não inventa quadro.
  - **Decidido pelo diretor (25/09): (b).** O veredito espera a última linha.
  - **Retorno do diretor (26/09), visto no protótipo:** do jeito que ficou, a lista aparece normal, e o lugar do veredito fica reservado e vazio até a quinta linha — um vão cortado em cima, sem nada, enquanto os xis acendem nos itens. *Isso não pode acontecer.* O veredito continua esperando a prova, mas o lugar dele não pode ser um buraco. **Entra no C12**, depois das entregas do arquiteto. Os caminhos pra levar ao gate:
    - (a) a caixa do veredito já está no lugar desde o começo, com a moldura, o poço e a contagem acompanhando as linhas (*1 de 5* … *5 de 5*) em tinta neutra; a palavra do veredito (*NÃO BATE COM O CADASTRO* / *CONFERE COM O CADASTRO*) e a cor entram quando a quinta linha acende
    - (b) a caixa em estado de processo, como as outras telas que correm (a pré-checagem da T05), com um texto de processo — precisa do texto e do quadro do arquiteto, porque o `textos.md` não tem
    - (c) sem reserva: o veredito entra empurrando a lista pra baixo — a lei proíbe mover o layout
    - **Padrão a propor: (a)** — não inventa texto, não move nada e não deixa vão; a contagem só acompanha o processo, e só começa quando a primeira linha acende. Vale pra todo veredito que espera a prova
  - **Padrão adotado (26/09, o retorno do diretor): (a).** É o que se constrói:
    - **A caixa do veredito está no lugar desde que a tela abre**, com o desenho do quadro final. Na 00, é a moldura do aviso com o poço de 32. No 02, é a do veredito que confere, sem poço, porque é assim que o 02 desenha. Nada muda de lugar nem de altura entre o começo e o fim.
    - **Enquanto lê, a caixa fica neutra.** O traço de baixo fica no cinza do aviso neutro com traço (o SEM CONEXÃO da T01/14, uma variante que já existe). O poço fica vazio, e o lugar da palavra fica reservado, sem texto.
    - **A contagem acompanha as linhas** no lugar do número: *1 de 5* … *5 de 5*, em `--tinta`, com a unidade em `--tinta-secundaria`, como o número do aviso já é. Ela começa quando a primeira linha acende, e troca no lugar, sem contar de zero ao abrir (é o processo da G27).
    - **Quando a quinta linha acende, o veredito entra em 150** (`--mov-rapido`, `--mov-curva`):
      - a palavra (*NÃO BATE COM O CADASTRO* ou *CONFERE COM O CADASTRO*), por opacity, já na cor dela;
      - a cor do traço, por uma camada por cima do cinza (C12·8);
      - o xis no poço, na 00 (C12·12);
      - se o número do veredito for outro que 5, ele troca no lugar;
      - no 02, a legenda *igual à do cadastro* da prova, no mesmo tique. O bloco da prova já está inteiro no lugar, e só a legenda espera.
    - **Pro leitor de tela, o veredito só fala no fim**, como hoje. Com reduzir, as linhas e a contagem andam no mesmo ritmo, e a palavra e a cor entram direto. Nascida lida (no print, na coluna ou na folha aberta pelo endereço), a caixa já nasce com o veredito, parada.
    - **Continua o resto da (b) de 25/09.** O veredito espera a prova, e o relógio só liga depois da troca entre telas: pelo menu, o primeiro glifo acende aos 550 ms (150 + 400); pelo endereço, aos 400.
    - **O quadro de espera não tem referência (G25).** Ele junta só peças e cores que existem, e vai ao arquiteto pra confirmar. Vale pra todo veredito que espera a prova: a T16 é a C12·44.
    - **Nota de 26/09 · construída na peça (as peças do check):** o `Aviso` ganhou `aguarda` (quantas linhas acenderam) e `aguardaUnidade` (o *de 5* da tela), e a `Prova`, `aguarda: 'legenda'` (o 02). A contagem fica por cima do lugar do número, com o número do quadro final guardado embaixo, e nada muda de lugar nem de altura (medido: as caixas e as linhas com as mesmas medidas na espera, lendo e no fim). A cor do traço entra por uma camada: o cinza sai por cima da cor do veredito, e o quadro do fim é o de sempre. Com `aguarda` null, a caixa nasce com o veredito, parada. O gatilho é da T11, na fase das telas: `aguarda={lendo ? lidas : null}`, no lugar do `t11-espera`.
    - **Nota de 27/09 · ligada na T11 (as telas T09 a T12):** os três cabeçalhos passam `aguarda={lendo ? lidas : null}` e `aguardaUnidade` (*de 5*), e a prova do 02, `aguarda: 'legenda'`; saíram o `t11-espera`, o `aria-hidden` do embrulho, as duas regras do `t11.css` e o `acende` das linhas (a peça já sabe). O relógio liga no fim da troca (`useFimDaTroca`): pelo menu, o primeiro bloco aos 550 do toque; pelo endereço, aos 400. Medido: nada muda de lugar entre a espera e o fim (`marcaLugar` / `mesmoLugar`), e os cinco quadros parados iguais à base. **Visto, e não mexido:** o rodapé da 00 diz *Corrigir as 5 divergências* desde o começo, aceso — *o resto da tela já está no lugar*, diz o `tela.md` —, e o número do veredito está no botão antes da quinta linha; vai ao arquiteto junto com o quadro de espera. Prova: `mov-t11`.

### O checklist, o ciclo e a sessão (T13, T14 e T16)

**Nota de 26/09: a T13 está no ciclo.** O plano de construção de 24/09 (`app/prints/tmp/c12-construir.js`) deixava a T13 de fora, pendente, esperando o arquiteto. O arquiteto respondeu com a estrutura nova do checklist (decisão 34, construída em 25/09) e com a foto do problema (decisão 39, construída em 26/09). A C12·36 e a C12·37 valem com o padrão, e cada uma ganha a nota de hoje.

- **C12·36 · O placar da T13 não está na tela quando um item conclui.** O item conclui no nível do item, e o placar só existe no mapa.
  - (a) O placar enche na frente de quem olha, em 300 ms. Ao voltar ao mapa, ele vai do valor que tinha quando a seção abriu até o novo. No `Finalizar`, ele completa, e o *HOMOLOGADA* e a meta esmaecem em 150 ms no lugar. A linha se reescreve.
  - (b) Só no `Finalizar`: ao voltar, o placar nasce no valor novo.
  - **Padrão (a):** é o único instante em que o técnico vê o placar depois de concluir, e o movimento não parte do zero.
  - **Nota de 26/09:** o placar saiu com a estrutura nova (decisão 34). A barra do checklist ficou no lugar dele, embaixo do título, e a (a) vale pra ela:
    - na volta do nível do item às seções, a barra parte do valor que tinha quando o item abriu e avança em 300 (scaleX) até o novo, junto com a troca de quadro (C12·4); o número do título troca no lugar;
    - no `Finalizar`, a barra completa, e o veredito homologado esmaece em 150 no lugar. Isso já está construído e foi medido hoje.

    Hoje, na volta, a barra monta de novo já no valor novo. A linha do placar se junta à da barra do checklist, a linha nova da T13.
  - **Nota de 27/09 · ligada na T13:** a tela guarda quantos estavam feitos quando o item abriu e passa como `de` à barra na volta (o último `Tirar foto` ou `Salvar com ressalva`, o `Voltar ao checklist`, o voltar do Android); sem nada novo, a barra não anda; abrir uma seção ou finalizar solta o `de`. A barra avança em 300 enquanto o conteúdo esmaece em 150, na troca da volta. Prova: `mov-t13`.
- **C12·37 · A miniatura da T13 nunca troca na frente de quem olha.** O `Tirar foto` segue pro próximo item, e o visor não tem desenho de foto tirada.
  - (a) Ao voltar à Seção B aberta, o check das fotos tiradas desde que ela abriu surge por opacity em 150 ms, e o cartão já sabe fazer isso. O visor segue sem a foto (G25).
  - (b) O visor mostra a foto antes de seguir, o que pede desenho novo.
  - (c) Direto.
  - **Padrão (a):** usa o que existe, e o desenho novo vai ao arquiteto.
  - **Nota de 26/09:** com a decisão 39, a T13/15 põe o registro do problema no lugar do visor por um toque (`Fotografar o problema`), na frente de quem olha: é a C12·42. O `Tirar foto` de sempre continua como a (a) diz.
  - **Nota de 27/09 · ligada na T13:** o check das fotos tiradas entra com a troca de quadro da volta (C12·4) — os mesmos 150 — e não esmaece de novo por dentro: o miolo nasce com o quadro. É o gesto do check da T10 na volta da câmera (C12·42 (a)). Prova: `mov-t13` (o `naoAnima` no glifo).
- **C12·38 · As assertivas da T16 dizem "aparecem juntas" no reduzir** (**já decidida: G26**).
  - (a) Acendem em ordem, no mesmo ritmo, sem o esmaecer. A coluna muda, como já mudou a da T11.
  - (b) Juntas.
  - **Padrão (a):** o processo segue no mesmo ritmo.
- **C12·39 · O que entra com a última assertiva da T16:** a prova, o bloqueio e o `Voltar ao menu`. Hoje entram secos, e o lugar deles já existe.
  - (a) Esmaecem em 150 ms no lugar, e a linha entra na tabela da T16.
  - (b) Direto.
  - **Padrão (a):** o `t16.css` já deixou o lugar parado à espera do C12, e só o que é novo se move.
  - **Nota de 26/09:** revisada pela C12·44. O lugar que espera invisível é o vão que o diretor recusou na T11, e o retorno dele vale pra todo veredito que espera a prova.
- **C12·40 · O prazo da T14 drena em degraus de 250 ms, e a linha pede "contínuo, linear".**
  - (a) Cada degrau vira um trecho linear de 250 ms, pela mesma escala do C12·15. Com o reduzir, "o número troca e a barra salta", como a linha já diz.
  - (b) Degraus, como hoje.
  - **Padrão (a):** é a mesma peça e a mesma regra da barra da T03.

### As decisões de 26/09 · o que as entregas pediram

O diretor delegou a direção de movimento em 26/09. O padrão de cada decisão abaixo é o que se constrói. A régua é a mesma de todas: só as peças e os tempos que já existem, e o mesmo gesto em toda tela.

- **C12·41 · A busca de novo da T05.** A última entrega deu o ritmo e o quadro: a T05/00 fica 1,2 s na tela, e a 01 volta sem nada escolhido. A 00 e a 01 são desenhos diferentes: a 00 tem o bloco ESCOLHIDO e os outros por perto, e a 01 é uma lista só. O *Procurando…* da linha não tem texto nem referência.
  - (a) Duas trocas de quadro e uma cascata.
    - No toque, o conteúdo esmaece pra 00 em 150 (C12·4).
    - Aos 1,2 s, a 00 sai de uma vez, e a 01 entra: a frase e o rodapé esmaecem em 150, e as cinco linhas surgem em cascata, 150 cada, com 80 entre elas (`--mov-escalonar-lista`, C12·28).
    - Com reduzir, tudo é direto, no mesmo 1,2 s.
    - O mesmo vale pro `Procurar outro módulo` e pro Bluetooth que volta, que passam pelo mesmo quadro.
  - (b) A cascata também na 00, no toque.
  - (c) Nenhuma cascata: as duas trocas só esmaecem.
  - **Padrão (a):** a volta da 01 é o *a busca acha*, e é nesse momento que a linha pede a cascata. A 00 é o quadro da busca que o arquiteto aprovou, e não um resultado novo. O *Procurando…* continua com o arquiteto.
  - **Nota de 27/09 · ligada na T05 (as telas T05 a T08):** a chave da troca de quadro é o quadro que a T05 desenha — a lista (01), o quadro com o escolhido (00, 02, 04) e a pré-checagem —, e não o endereço. Pelo padrão da C12·4, o *Conectar ao …* e o *Tentar de novo* também esmaecem (o título e o rodapé trocam inteiros); a trava da 04, o escolhido que troca na 00, a parada e o *Acordar* movem só a peça. Do quadro da 00, o *Procurar de novo* não troca o desenho: só a volta da lista esmaece, com a cascata. Prova: `mov-t05`.
    - **Revisão de 27/09:** entre quadros, só a troca esmaece (a nota da T01 na C12·23). O rodapé da T05 é o mesmo em todos os quadros, e o texto do primário esmaecia uma segunda vez por dentro do rodapé que já esmaecia — no *Procurar de novo* da 01, na volta da lista e no *Procurar outro módulo*. O rodapé nasce agora com o quadro (a chave dele), e o `trocaTexto` fica só pro que troca dentro do quadro (marcar, e marcar outro por perto) — como a T02 já fazia (medido no `mov-t02`: o *Ver as unidades* e o *Trocar de empresa* só esmaecem o miolo e o rodapé). A T06 também: o rodapé nasce com o quadro, e a camada do *Usar este ativo* que acabou de acender não segue por dentro da troca. Do mesmo jeito, na T08, o último sinal chega junto com a troca 01 → 02: o mostrador dele acendia a pele por dentro do esmaecer, e agora entra com ela (a fase na chave dos mostradores). O *Tentar de novo* não tem porta no fluxo: o M2C-0301 do caso `conexao-falha` não está por perto (M.situacao.porPerto), e a 04 só abre pela coluna, parada; ele troca de quadro pela mesma chave do *Conectar ao …*, que o `mov-t05` prova. Prova: `mov-t05` e `mov-t08` (o `naoAnima` do texto e da pele).
- **C12·42 · A foto que vira registro.** A calibração com prova (decisão 33) e a foto do problema (decisão 39) mudaram o lugar da foto:
  - na T10, ela é tirada na câmera do app (06), e o registro já está no cartão quando o técnico volta;
  - na T13/15, o registro toma o lugar do visor, por um toque, na frente de quem olha;
  - a linha *foto do painel* da T10 (a miniatura no lugar do *aguarda*) descreve o desenho de antes de 25/09.

  As opções:
  - (a) A `FotoProva` ganha o *entra*: o registro que nasce de um toque esmaece em 150.
    - Na T10, o check lima esmaece no poço junto com a troca de quadro da volta da câmera (C12·4). São os mesmos 150, e parece um movimento só.
    - Na T13/15, o cartão inteiro esmaece no lugar do visor (C12·9), e o espaço muda direto.
    - Aberto pelo endereço, na coluna ou no print, o registro fica parado. As duas linhas da T10 viram uma.
  - (b) Só a troca de quadro na T10, e direto na T13.
  - (c) O check esmaece depois da troca: 150 e mais 150.
  - **Padrão (a):** uma peça e um gesto, nas duas telas. A (c) gasta o dobro do tempo pra dizer a mesma coisa.
  - **Nota de 27/09 · construída na peça e ligada na T10 (as telas T09 a T12):** a `FotoProva` ganhou `entra`: o registro que nasce de um toque esmaece no lugar, **inteiro**, em 150 (`ds-foto-entra`). **Uma escolha, com o padrão (a) — um gesto, as duas telas:** o cartão inteiro, e não só o check, porque na T13/15 o registro toma o lugar do visor e precisa entrar inteiro (C12·9); na T10, ele esmaece junto com a troca da volta da câmera, nos mesmos 150, e o check lima entra no poço com ele. A T10 passa `entra` só na foto tirada nesta tela; aberto pelo endereço, na coluna ou no print, parado. A T13/15 liga a mesma peça. Prova: `mov-t10`.
  - **Nota de 27/09 · ligada na T13 (as telas T13 a T16, a direção de movimento):** o registro esmaece no lugar do visor, inteiro, em 150, na `--mov-curva` — o mesmo gesto do `entra` da `FotoProva` da nota de cima —, pela lista que se reorganiza (C12·10), que move a caixa do não conforme no mesmo toque (C12·47) e já esmaece o que é novo no miolo (C12·9). A T13 não passa o `entra` também: seriam dois esmaeceres iguais no mesmo cartão. O espaço muda direto, como a (a) diz, mas a caixa e o campo, que sobem junto, deslizam (C12·47), e o visor que sai esmaece por cima, como tudo o que sai (C12·10). Desmarcar com a foto guardada faz o contrário. Prova: `mov-t13`.
    - **Revisão de 27/09 (T09 a T12):** na T10, o registro nasce sempre dentro da troca da volta da câmera — a foto só se tira na câmera, e fechar a câmera é troca de quadro (C12·4) —, e o `entra` fazia ele esmaecer **duas vezes**, por dentro do miolo que já esmaecia (medido: o `ds-foto-entra` e o `tela-miolo`, os dois em 150, no mesmo toque): o registro chegava depois do resto do quadro. É o que a regra do app inteiro proíbe desde a revisão da C12·41 (*entre quadros, só a troca esmaece*) e o que a T13 já não faz (*A T13 não passa o entra também*, a nota de cima; e a C12·37, *não esmaece de novo por dentro*). A T10 não passa mais o `entra`: o check lima entra no poço com a troca, nos mesmos 150 — *parece um movimento só*, como a (a) pede. Sem tela nenhuma que o use, o `entra` saiu da `FotoProva` (a peça volta ao que era, sem movimento próprio; o espécime é o mesmo). Prova: `mov-t10` (o `naoAnima` do `ds-foto-entra` no `Tirar foto`).
- **C12·43 · A folha que vira diálogo, nas entregas.** São três caminhos novos, além dos de 24/09 (C12·27):
  - o `Encerrar a sessão` da folha do módulo (T04/10), que fecha a folha e abre o *Encerrar sem homologar?*;
  - o mesmo, na folha do ativo (T04/11);
  - o `Trocar de empresa` da folha de trocar (T04/14), com o módulo conectado.

  Hoje, a folha some de uma vez e um véu novo esmaece desde o 0: o fundo pisca. As opções:
  - (a) O mesmo da C12·27. O véu fica, parado: a folha desce em 150 enquanto o diálogo nasce em 150.
    - No `Continuar a instalação`, a folha não volta, como o arquiteto confirmou: o diálogo e o véu esmaecem juntos em 150, e o técnico fica no menu.
    - Todo diálogo do app nasce e some pela mesma presença, a peça que sai da T01 pra `src/ds/chrome/` (achado 2.8).
  - (b) Cada caminho com o véu dele, como hoje.
  - **Padrão (a):** é o mesmo véu, e o fundo não pode piscar.
  - **Nota de 26/09 · construída na peça (por cima):** os três caminhos, pelo `PorCima` da T04, e o `Continuar a instalação` como o arquiteto confirmou (a folha não volta; o diálogo e o véu esmaecem juntos). **Uma escolha, com o padrão:** na folha do módulo e na do ativo o véu começa embaixo da faixa, e no Encerrar sem homologar? ele cobre a faixa (T04/10 → 13). O véu que já estava fica, e só o pedaço novo, em cima (a tira e a faixa, 104), esmaece em 150, junto com o diálogo; no fim, o véu é um só, igual ao 13. A alternativa, o pedaço entrar de uma vez, é um salto de escuro em cima da faixa. O diálogo do ENCERRAR das outras telas (`src/estado/encerrar.jsx`) e o aviso do acesso (T04/12) nascem e somem pela mesma presença.
- **C12·44 · O veredito que espera a prova, na T16.** A prova (*sobreviveu*) ou o bloqueio (*a homologação fica bloqueada*), e o `Voltar ao menu`, esperam invisíveis a última assertiva. É o vão que o diretor recusou na T11 (C12·35), e o retorno dele vale pra todo veredito que espera a prova.
  - (a) O padrão da C12·35:
    - a caixa da prova, ou a do bloqueio, já está no lugar desde a primeira assertiva, com a moldura do quadro final e o traço no cinza neutro;
    - a contagem acompanha as assertivas (*1 de 8* … *8 de 8*), com a unidade `de 8` que o cabeçalho da falha já tem. Na prova, ela fica no lugar da versão; no bloqueio, no lugar do número do aviso;
    - na oitava, entram em 150 o rótulo, a versão e a legenda da prova (ou o título e a frase do bloqueio), e a cor do traço, por uma camada. A contagem sai no mesmo esmaecer, sem mudar a quebra de nada;
    - o `Voltar ao menu` fica no lugar, apagado e desabilitado, com o mesmo texto, e acende por uma camada na oitava (C12·8), como a T10 faz no semear.
  - (b) Como hoje: a prova e o rodapé esperam invisíveis.
  - (c) Só a moldura vazia, sem contagem.
  - **Padrão (a):** não deixa vão, não move nada, e é o mesmo gesto da T11. O quadro de espera não tem referência (G25) e vai ao arquiteto junto com o da T11. Esta decisão revisa a C12·39.
  - **Nota de 26/09 · construída na peça (as peças do check):** a `Prova` ganhou `aguarda` com a contagem no lugar da versão, e o `Aviso`, a contagem à direita do bloqueio, que sai no mesmo esmaecer. A contagem da prova usa a tinta e o tamanho do número do aviso (o *número com unidade* que já existe); a referência não desenha esse quadro, e ele vai ao arquiteto junto. O gatilho é da T16, na fase das telas, no lugar do `Vez`.
  - **Nota de 27/09 · ligada na T16:** o `Vez` saiu (e as duas regras do `t16.css`): a `Prova` e o bloqueio passam `aguarda` desde a primeira assertiva (nas 0, o lugar vazio; de 1 em diante, *1 de 8* …), e o `Voltar ao menu` fica no lugar, apagado, com `primarioAcende` e `primarioDesabilitado={!pronta}`. O contador do cabeçalho da falha (*7 de 8*) troca no lugar, direto, na oitava: é o número do título (C12·36). Prova: `mov-t16` (a prova); o bloqueio só se alcança com a sessão do caso `autoteste-falhando`, e a prova dele é o espécime `mov-check-veredito-bloqueio`.
- **C12·45 · O campo do painel da T10.** A linha pede que o rótulo e o traço de baixo acendam em lima, em 150. O `ValorAlvo` desenha o foco pelo estado: troca a borda de 1 pra 2 px e o rótulo pra lima, direto, e o texto sobe 0,5 px.
  - (a) O mesmo traço de foco do `Campo` (o `TracoFoco`, scaleX em 150), desenhado por cima da borda de 1 (C12·22). O rótulo troca a cor direto, como no campo da T01. E um foco só, o que a tela diz (C12·21).
  - (b) O rótulo também acende por uma camada, em 150.
  - **Padrão (a):** é o mesmo campo em foco da T01, e o técnico vê o mesmo gesto nas duas telas.
  - **Nota de 26/09 · construída na peça (por cima):** o `ValorAlvo` usa o `TracoFoco` (a capa em scaleX, 150) por cima da borda de 1, e o rótulo troca a cor direto; o foco é o que a tela diz (`foco`). Pra capa cobrir a borda, o corte do número que não cabe passou de `overflow: hidden` a `overflow: clip` com 1 de margem (`overflow-clip-margin`). O gatilho é da T10 (já passa `foco`): nada a ligar. Medido no `mov-porcima.mjs` (o foco no campo: a capa anda, e nada sai do lugar).
- **C12·46 · Os itens da seção que abre, na T13.** A peça esmaece os itens em 200, junto com a descida das seções de baixo, e a linha não fala deles.
  - (a) Ficam em 200, junto com o movimento que acompanham, como o véu acompanha a folha. A linha ganha *os itens esmaecem junto* (C12·20).
  - (b) Em 150, como todo o resto que é novo.
  - **Padrão (a):** o cartão abre num gesto só, e cada parte usa o tempo da peça que se move.
  - **Revisão de 27/09 (T13 a T16) · a seção que fecha:** nenhuma linha nem roteiro falava dela. Tocar de novo é o mesmo ao contrário (C12·6): a seta volta e as de baixo sobem, em 200. Os itens saem com o cartão, que já tem o tamanho novo e corta o que passa da borda, como a C12·10 (a) manda pro que fecha espaço. A linha *seção abre* ganhou isso. A alternativa, os itens esmaecerem por uma cópia por cima, poria a cópia fora do fundo do cartão, que já encolheu, e fica com o diretor. Prova: `mov-t13`.
- **C12·47 · A caixa do não conforme, que sobe (T13/07 → 08).** A 07 desenha a caixa presa ao pé do miolo; a 08, embaixo do visor, com o campo *O que aconteceu* aberto. Marcar a caixa sobe o texto dela 76 px, direto.
  - (a) A caixa vai do lugar antigo ao novo só por deslocamento, em 150 (C12·10), e o campo esmaece em 150 embaixo dela (C12·9). O quadrado surge como em todo checkbox. Desmarcar faz o mesmo ao contrário (C12·6).
  - (b) A caixa salta, e só o campo esmaece.
  - **Padrão (a):** o que muda de lugar na mesma vista desliza, como as seções do checklist, e o técnico não perde a caixa debaixo do dedo.
  - **Nota de 27/09 · construída e ligada na T13:** a caixa desliza pela lista que se reorganiza (`useReorganiza`, com a chave do desenho do item: marcada, fotografada), e o campo é da peça: a `Justificativa` esmaece o campo que abre depois de montar e, ao desmarcar, deixa o de antes desenhado no lugar, por cima, fora do fluxo, mudo e sem toque, esmaecendo até sumir (C12·6); os dois vão junto com a caixa. O miolo nasce com o item (a chave do quadro), pra caixa não deslizar por cima da troca de quadro (C12·4). A linha entrou na tabela da T13. Prova: `mov-t13`.

## O que não faz sentido

- **As duas linhas da T08** pedem o que as referências não desenham: um tambor e um marcador numa grade de mostradores, e valores virando traço numa 00 que já está em traço. A G26 as cancelou, e a tabela ainda as lista (C12·11).
- **A faixa e o cartão liberado da T04** descrevem o que acontece na T05, com o menu fora da tela (C12·24 e C12·26).
- **O placar da T13** pede um instante em que ele não está na tela (C12·36).
- **As duas linhas da T15** descrevem um envio que não anda: a fila não tem ritmo, e o único quadro com o envio é um estado parado (C12·13 e C12·14).
- **"Sobe e some", na T16,** some com a faixa que a referência desenha no lugar, sem sessão (C12·25).
- **De 26/09:**
  - **o *Procurando…* da T05** pede um texto que nem a referência nem o `textos.md` têm (C12·41);
  - **o placar da T13** é uma peça que saiu com a decisão 34 (C12·36);
  - **a miniatura e o *aguarda* da T10** saíram com a decisão 33 (C12·42);
  - **o *antes disso ele não aparece*, no veredito da T11,** é o vão que o diretor recusou (C12·35);
  - **o *o último item passa*, no veredito da T13:** o homologado é o toque em `Finalizar` (T13·3), e o último item passar não homologa. Fica a nossa versão, e o par vai ao arquiteto;
  - **o *aparecem juntas*, na T11:** o `movimento.md` manda o processo seguir no mesmo ritmo (G26). Fica a nossa versão, e o par vai ao arquiteto.

## Entra (26/09)

- **As linhas:**
  - as 66 linhas das 16 tabelas, com as decisões aplicadas: as 38 que o `linhas.json` marca a construir, e as 24 feitas conferidas num roteiro;
  - as 3 regras de todas as telas;
  - os movimentos sem linha, os 14 de 24/09 e os das entregas (30 no `linhas.json`, com as regras).
- **O reduzir movimento nas 16 telas**, medido.
- **Os consertos das violações medidas:**
  - o traço de 2 desenhado por cima, também no campo do painel da T10 (C12·22 e C12·45);
  - o foco único (C12·21);
  - o véu que não pisca em nenhuma folha que vira diálogo (C12·27 e C12·43);
  - o roxo que não aparece no desabilitado, nos seis lugares medidos hoje (C12·18);
  - o registro sem resto, sem o `both` (C12·19).
- **As peças que carregam o movimento de várias telas**, cada uma com o espécime na vitrine e o roteiro dela:
  - as nove do achado 2 de 24/09;
  - a `FotoProva` com o *entra* (C12·42);
  - o veredito que espera, no `Aviso` e na `Prova`, com a contagem (C12·35 e C12·44);
  - a `BarraDoChecklist` na volta do nível do item (C12·36);
  - a `SecoesDoChecklist`, que já está pronta.

  Os movimentos sem porta no palco se provam na vitrine (C12·13).
- **A consistência entre as telas.** O mesmo movimento é a mesma peça, com o mesmo token, em toda tela:
  - o check que nasce: 150, `--mov-curva`;
  - o aviso que surge: 150;
  - o primário que acende, por uma camada: 150;
  - a folha: sobe em 200 e desce em 150;
  - o diálogo: 150, de 98 a 100%;
  - a troca de tela e de quadro: 150;
  - a cascata: 150, com 80 entre as linhas;
  - o marcador que corre e o tambor: 300;
  - o que muda de lugar na mesma vista: por deslocamento, no tempo da peça que o move.
- **Os tokens.** O tempo e a curva só saem dos tokens de hoje. O que faltar, só o `--mov-fator` da C12·15 e da C12·40, entra no bloco *C12 · o movimento fino* do `tokens.css`, com o papel e quem usa, e no bloco do reduzir se zera nele; depois, `npm run tokens`. Nenhuma curva nova, nenhum tempo novo.
- **A documentação:**
  - cada `animacao.md` muda só a linha que uma decisão manda, marcada *(C12·n)*;
  - o `CHANGELOG.md` recebe cada desvio nomeado;
  - o `movimento.md` é do fechamento, que o junta pelos relatórios.
- **Os roteiros:**
  - um roteiro de movimento por tela, em `scripts/caminhos/mov-tNN.mjs`;
  - os roteiros das peças: `mov-troca`, `mov-check`, `mov-porcima`, `mov-instrumentos`, `mov-listas` e `mov-faixa`;
  - o `todos` roda todos eles, com os 20 de hoje.

## Não entra (26/09)

- **Os ritmos que o diretor não deu:** o firmware da T05 e o envio da fila da T15. Ficam parados, com a falta nomeada (C12·14). A busca da T05 saiu daqui, porque tem 1,2 s.
- **Desenho novo:** vai ao arquiteto:
  - o quadro de começo da T07 (C12·31);
  - o visor com a foto tirada da T13 (C12·37);
  - o *Procurando…* da T05 (C12·41).

  Os quadros de espera da T11 e da T16 se constroem, porque o diretor escolheu a (a), e o desenho deles vai ao arquiteto pra confirmar (G25).
- **Reservar os lugares (G24):** fica com o diretor. Os saltos de layout que as referências desenham ficam como desvio nomeado, sem animar: a T09, o rodapé da T08 e a causa da T07. Onde uma decisão manda, o que muda de lugar desliza só por deslocamento (C12·10, C12·24 e C12·47).
- **O que o C12 não toca:** o mock, as referências, os `textos.md`, o `leis.md`, o `componentes.md`, o `movimento.md` (do fechamento) e o palco (`src/palco/`).
- **O que é de outro ciclo:** a auditoria de fidelidade (C13) e o README com o GIF do caminho do herói (C14). O zoom do palco não existe mais (o diretor, 26/09).

## Está pronto quando (26/09)

**Conferido no fechamento (27/09), item por item, com a régua inteira rodada uma de cada vez, depois de todos os consertos.** Os números estão no `CHANGELOG.md` (*2026-09-26 · C12, o movimento*).

- [x] **Cada uma das 66 linhas, e cada movimento sem linha, tem num roteiro `mov-*`:**
  - o toque que o começa, com o `anima` esperado (propriedade, tempo, curva e atraso);
  - o mesmo caminho com o reduzir, com o `quieto`;
  - quando é processo, o ritmo dentro do `entre`.
  - **Feito:** as 66 linhas do `linhas.json` têm roteiro (os 16 `mov-tNN`, e os seis das peças onde a peça carrega o movimento), com o reduzir e o `entre` dos processos. As quatro de fora ficam fora com nome, e o roteiro confere que nada se move nelas: o firmware da T05 e as duas da T15 (a barra do item que sobe e o item enviado), sem ritmo (C12·14), e o *Procurando…* da busca de novo da T05, sem texto (C12·41). O que não tem porta ao vivo se prova na vitrine (C12·13).
- [x] **Toda tela abre parada** pela URL, em cada momento, em cada estado da coluna e no print. **Feito:** cada `mov-tNN` abre os momentos e os estados pelo endereço e confere o `quieto`; a revisão das T01 a T04 pôs um gancho antes do primeiro script da página, e nada se move nas 94 aberturas e nas 45 ações do palco, fora a baixa declarada da T03/00 (G27).
- [x] **`node scripts/caminho.mjs todos` aprova, sem nenhum ⚠:** os 20 roteiros de hoje e os `mov-*`. **Feito:** **42 roteiros, 6.350 passos, todos aprovam, e nenhum ⚠** — os 20 de antes (2.625 passos) e os 22 de movimento (3.725): os 16 `mov-tNN` e os seis das peças (`mov-check`, `mov-faixa`, `mov-instrumentos`, `mov-listas`, `mov-porcima` e `mov-troca`), numa passada só, do começo ao fim, sem repetir nenhum.
- [x] **Os quadros parados não mudam.** **Feito, com o custo nomeado da C12·22.** `node scripts/tela.mjs todas app/prints/linha-de-base-palco-e-barra.json`: 145 referências, 40 em 0% do HTML, 0 com erro, nenhuma foto preta. **132 iguais à base nos quatro números** (HTML e PNG, fino e estrutural). As 13 que mudam são todas o quadro aceso com o traço de 2 por cima da borda (C12·22, C12·45), o custo que a decisão já nomeou e que vai ao arquiteto: 9 contra o HTML, de 0,01 a 0,28 ponto — 4 acima da tolerância da régua (T01/02 0 → 0,11 · T01/05 0,07 → 0,35 · T01/07 0 → 0,28 · T10/05 0 → 0,04), por isso a régua diz *4 pioraram* — e 4 só contra o PNG, em 0,01 ponto. Nenhuma outra referência mudou. A T01, refeita depois do conserto da linha tocável, deu os mesmos 19.
- [x] **As peças não mudam.** **Feito, com o mesmo custo.** `node scripts/especime.mjs todos` contra `app/prints/tmp/c12/especimes-antes.json`: os mesmos 127, nenhum novo e nenhum saiu, **126 iguais um por um**; o `f8-valor-alvo` vai de 0 a 1,5% (360 × 161 → 360 × 160), o campo do painel com o traço por cima (C12·45).
- [x] **A consistência entre as telas.** A mesma peça tem a mesma assinatura (propriedade, tempo e curva) em toda tela. **Feito:** a passada da consistência (27/09) leu os `movimento.json` dos `mov-*` e achou três diferenças confirmadas, consertadas na peça — o primário que acendia de dois jeitos (C12·8), o texto do primário da T07 que trocava seco (C12·23) e o checkbox sem pressionado (C12·17) —, e o fechamento consertou a quarta, a linha que se desabilita no toque soltando o pressionado (C12·18). Duas ficam pro próximo ciclo, sem confirmação: o primeiro passo de cinco processos que não espera a troca, e o que é empurrado por algo novo, que desliza em quatro lugares e salta em cinco (decisão do diretor).
- [x] **Os textos e o aceso não mudam.** **Feito.** `node scripts/textos.mjs` nas 16: as mesmas 31 referências com diferença, todas nomeadas (T01 5, T03 1, T04 13, T06 4, T07 1, T08 1, T12 2, T13 2, T15 2); T02, T05, T09, T10, T11, T14 e T16 conferem inteiras. `node scripts/aceso.mjs`: os mesmos 83 lugares, 78 medidos (5 com um processo andando), e **nenhum botão aceso que não faz nada**. E o palco (`node scripts/palco.mjs app/prints/linha-de-base-palco.json`): 38 de 38 na moldura, 21 peças, 0 com erro, 5 textos sem falha, nenhuma peça pior que a base.
- [x] **A documentação segue o código:** as `animacao.md` nas linhas que as decisões mandam (71 linhas: 38 reescritas, 30 novas e 3 que saíram com a nota do porquê, cada uma com *(C12·n)*), o `CHANGELOG.md` com cada desvio nomeado, o `movimento.md` com o vocabulário do app e o que os relatórios pediram (*(C12)*), o `componentes.md` com *o movimento das peças*, o `src/ds/MAPA.md` com as peças sem desenho, o `diferencas-para-o-arquiteto.md` com *O C12, o movimento*, e o censo dos tokens (295) no `CLAUDE.md` e no README do design system.
- [x] **`npm run checar` e `npm run build` aprovam.** **Feito:** o `checar`, 13 de 13, e o `build`. O commit fica com o fechamento — ele é do diretor (nenhum `git` nesta tarefa).

## O fecho de 24/09 · substituído pelo de 26/09, logo acima

### Entra

- **As linhas:**
  - as 58 linhas das 16 tabelas, com as decisões aplicadas;
  - as 3 regras de todas as telas;
  - os 14 movimentos sem linha, cada um com a linha escrita na tabela da tela.
- **O reduzir movimento nas 16 telas**, medido.
- **Os consertos das violações medidas:**
  - o traço de 2 desenhado por cima;
  - o foco único;
  - o véu que não pisca;
  - o roxo que não aparece no desabilitado;
  - o registro sem resto.
- **As peças do achado 2**, cada uma com o espécime na vitrine. Os cinco movimentos sem porta no palco se provam lá.
- **A documentação, que segue:**
  - as 16 `animacao.md` reescritas pelo que se decidiu;
  - no `movimento.md`: os tokens que faltam na tabela, o pressionado do botão só de ícone, a volta, a exceção do topo do menu e o ritmo da leitura da T07.
- **Os roteiros:** um roteiro de movimento por tela em `scripts/caminhos/`, que o `todos` roda.

### Não entra

- **Os ritmos que o diretor não deu:** a busca e o firmware da T05, e o envio da fila da T15. Ficam parados, com a falta nomeada.
- **Desenho novo:** o quadro de começo da T07 e o visor com a foto tirada da T13. Os dois vão ao arquiteto.
- **Reservar os lugares (G24):** fica com o diretor. Os saltos de layout ficam como desvio nomeado, sem animar.
- **O mock, as referências e os textos:** nada muda neles.
- **O que é de outro ciclo:** a auditoria de fidelidade (C13) e o zoom do palco (C13 ou C14).

### Está pronto quando

- **Cada linha das 16 tabelas tem, num roteiro:**
  - o toque que a começa, com o `anima` esperado (propriedade, tempo, curva e atraso);
  - o mesmo caminho com o reduzir e o `quieto`;
  - quando é processo, o ritmo dentro do `entre`.
- **Toda tela abre parada:** pela URL, em cada momento e em cada estado da coluna, e no print.
- **`node scripts/caminho.mjs todos` aprova**, sem nenhum ⚠.
- **Os prints das 16 telas não mudam:** o quadro parado de cada referência continua o mesmo do C11.
- **A documentação segue o código:** as `animacao.md`, o `movimento.md` e o `CHANGELOG.md`, com cada desvio nomeado.
- **`npm run checar` e `npm run build` aprovam**, e o commit do C12 está feito.
