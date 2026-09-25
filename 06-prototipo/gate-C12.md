# Gate C12 · O movimento fino — as 16 telas

**Data:** 2026-09-24 · **Estado:** execução liberada pelo diretor (autonomia até o fim, 24/09), com o padrão (a) de cada decisão. O estudo das 16 telas foi medido com a régua do movimento (`scripts/caminho.mjs`); os roteiros de estudo foram apagados.

## O censo · o que existe no começo do ciclo

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

## O que a régua mediu hoje

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

## Os achados deste ciclo

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
- **C12·9 · O que abre espaço** (**já decidida: G26**). São a causa da linha (T05, T07) e o aviso: a recusa, a queda e a recuperação da T09, e a parada da T05.
  - (a) O que é novo esmaece em 150 ms. O espaço abre direto, pela Lei 3, e nada desliza.
  - (b) As linhas de baixo acompanham por deslocamento.
  - (c) Reservar os lugares, que é a G24, com o diretor.
  - **Padrão (a):** a Lei 3 deixa abrir espaço, e animar a altura é mover o layout.
- **C12·10 · O que fecha espaço ou sobe** (**já decidida: G26**). É a lista filtrada da T02 ("as que ficam sobem juntas") e a fila da T15 ("a lista fecha o espaço").
  - (a) O layout vai direto pro fim. As linhas que ficam vão do lugar antigo ao novo só por deslocamento, em 150 ms, e as que saem esmaecem por cima, fora do fluxo. O cartão corta o que passa da borda dele. Nenhuma altura anima.
  - (b) Troca direta: a linha some e o resto pula.
  - **Padrão (a):** o quadro final é o layout de verdade, e só transform e opacity se movem.
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
- **C12·14 · Os processos sem ritmo declarado (G4):** a busca e a atualização do firmware da T05, e o envio da fila da T15.
  - (a) Ficam como hoje, com a falta nomeada no CHANGELOG. A busca acha na hora, o firmware fica nos 62%, e a barra da fila fica parada. O número vai ao diretor.
  - (b) O C12 propõe os números, e eles entram no `movimento.md` depois do *vai*.
  - **Padrão (a):** inventar número é proibido, e a G4 já propôs a barra da fila parada.
- **C12·15 · A barra que segue um processo.** É a baixa da T03, e vale também pro prazo da T14 e pro envio da T15. Na T03, "4 s no total" contra a barra dos ativos; o marcador, linear ou em 300 ms desacelerando; e "salta pro fim" no reduzir contra o mesmo ritmo.
  - (a) A barra é dos ativos. Enche linear só na janela deles (10 itens de 250 ms), um trecho por item. O marcador anda junto com a ponta, linear, no tempo do item. Com o reduzir, cada item salta pro valor dele, e a baixa continua levando 4 s. Pede o `--mov-fator`.
  - (b) A barra do total (16 itens em 4 s), o marcador em 300 ms desacelerando, e o reduzir saltando pro fim.
  - **Padrão (a):** a referência 00 desenha 60% (6 de 10 ativos, medido no PNG: 352 de 588 px), e o `movimento.md` manda o processo seguir no mesmo ritmo.
- **C12·16 · A contagem que parte do começo nos processos declarados** (**já decidida: G27**). A T03 baixa de 0 a 16 ao abrir. A T08 aberta no 01 pela URL relê do zero. A T16 corre desde o passo 1.
  - (a) É o processo declarado, não a contagem de enfeite, e fica. No print e nos estados, a tela nasce no quadro da referência.
  - (b) A tela abre no quadro da referência e segue dali.
  - **Padrão (a):** o fato acontece agora.
- **C12·17 · O pressionado que o `movimento.md` não lista:** o botão só de ícone (o olho, o X, o avatar) apaga a 0,7 e solta em 100 ms.
  - (a) O `movimento.md` ganha a linha.
  - (b) O botão só de ícone perde o pressionado.
  - **Padrão (a):** a R-12 pede o pressionado em todo tocável.
- **C12·18 · O roxo do pressionado solta por cima do primário que desabilitou no mesmo toque.**
  - (a) O desabilitado não mostra o roxo: a camada sai direto, e só o afundar solta.
  - (b) Fica como está, porque a lei deixa.
  - **Padrão (a):** o desabilitado não tem roxo, e o roxo por cima de outro botão diz que ele foi tocado.
- **C12·19 · Uma animação terminada que fica viva:** o preenchimento `both` do registro, na T06 e na T14.
  - (a) Tirar o `both`. O quadro não muda, porque não há atraso.
  - (b) A régua ignora a animação terminada.
  - **Padrão (a):** conserta na peça e deixa a régua honesta.
- **C12·20 · Os movimentos que o código faz sem linha na tabela:** o marcador da T05 e da T06, a busca da T06 e o indicador de rolagem.
  - (a) O movimento é da peça e vale onde ela está. As tabelas ganham as linhas no mesmo ciclo.
  - (b) Cada tela só move o que a tabela dela lista.
  - **Padrão (a):** a peça é uma só, e a documentação segue o código.

### A entrada (T01 e T02)

- **C12·21 · O foco desenhado e o foco do navegador se desencontram.**
  - (a) Um foco só: o que a tela diz. O traço deixa de seguir o foco do navegador, e tocar no olho ou no checkbox não muda o campo aceso.
  - (b) Só o foco do navegador.
  - **Padrão (a):** desenhar o foco do navegador é o foco de teclado desenhado, que a lei proíbe, e é o que acende dois campos.
- **C12·22 · O traço de 2 px move o texto em 0,5 px.**
  - (a) A borda fica em 1, e o traço de 2 é desenhado por cima, pela capa que o traço de foco já tem. O mesmo vale na célula do código, no canal e no cartão em falha.
  - (b) Aceitar o meio pixel.
  - **Padrão (a):** o estado muda o conteúdo, nunca o desenho.

- **C12·23 · O primário da T02: a linha diz "primeira escolha", mas o texto troca também nas escolhas seguintes (Várzea → Ibura).**
  - (a) Toda troca de texto do primário da T02 esmaece no lugar, por uma propriedade do `Primario`, e o roxo troca direto. Os outros primários não ganham isso: a T01 troca entre `Confirmar` e `Tentar de novo` sem nenhuma linha pedir.
  - (b) Só a primeira troca esmaece.
  - (c) O texto esmaece, e o roxo também acende por uma camada.
  - **Padrão (a):** o roxo que troca direto é a G26, e cada escolha nova é o mesmo fato que a primeira.

### A faixa, o menu e a conexão (T04, T05 e T16)

- **C12·24 · A faixa que nasce.** A T04 pede a descida no menu, "com o conteúdo junto", e a T05 pede na T05, "quando a última linha passa". A sessão nasce na T05, e o nascimento empurra o miolo 37 px.
  - (a) A linha sai da T04 e fica na T05. A faixa desce de cima em 200 ms quando a pré-checagem aprova. O miolo acompanha só por deslocamento, dos 37 px até zero, com o lugar já aberto. A barra troca de cor por uma camada, nos mesmos 200 ms.
  - (b) Só a faixa desce, e o miolo salta, como no desvio da Lei 3 de hoje.
  - (c) Reservar o lugar da faixa desde a busca, o que muda o desenho de 00 a 15.
  - **Padrão (a):** é a decisão 07, e o técnico vê a faixa empurrar o conteúdo em vez de um salto. Uma última linha que passa depois de uma reprova não abre a sessão.
- **C12·25 · A faixa que encerra na T16:** "sobe e some", mas a referência desenha a faixa sem sessão no mesmo lugar.
  - (a) A faixa aberta sobe em 200 ms, por baixo da barra, e revela a faixa sem sessão, que já está no lugar. Nada do layout se move.
  - (b) O conteúdo da faixa troca no lugar, esmaecendo em 150 ms.
  - (c) Troca direta, como hoje.
  - **Padrão (a):** é a decisão 07 ("a faixa sobe no encerramento") sem desmentir a referência.
- **C12·26 · O cartão liberado da T04:** o módulo conecta na T05, com o menu fora da tela.
  - (a) A linha sai. No menu nada se move, os cartões abrem liberados, e a mudança chega com o esmaecer entre telas.
  - (b) O menu guarda o último quadro visto e esmaece os cartões que mudaram, logo depois de chegar.
  - **Padrão (a):** a (b) anima a entrada da tela.
- **C12·27 · A troca entre a folha e o diálogo da T04**, que não tem linha e hoje faz o véu piscar.
  - (a) No mesmo véu, parado: a folha desce em 150 ms enquanto o diálogo nasce em 150. No `Cancelar`, o diálogo esmaece em 150 enquanto a folha sobe em 200. A linha entra na tabela da T04.
  - (b) A folha sai e volta direto, e só o diálogo se move.
  - (c) Nada se move, como hoje.
  - **Padrão (a):** cada peça faz o movimento dela, e o véu, que é o mesmo, não pisca.
- **C12·28 · A lista de módulos surge "quando a busca acha", e no protótipo a busca acha na hora de abrir.**
  - (a) A lista surge, uma linha a cada 80 ms, só quando um toque refaz a busca (`Procurar de novo`, `Procurar outro módulo`). Ao abrir, ela já está lá.
  - (b) Surge também ao abrir, depois do esmaecer entre telas.
  - (c) Só surge quando o diretor der o ritmo da busca.
  - **Padrão (a):** cumpre a linha no único momento em que a busca acontece na frente de quem olha.
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

### Configurar, calibrar e conferir (T09, T10 e T11)

- **C12·32 · O trilho da T09 acende, e a T16 usa a mesma peça sem pedir isso.**
  - (a) O check fica na peça, porque as duas pedem. O trilho acendendo, de cima pra baixo em 300 ms, é opcional, e a cadeia o liga. O trilho do elo que passa a correr, da divisória pro branco, troca direto.
  - (b) Os dois na peça, e a T16 ganha um trilho que não pediu.
  - **Padrão (a):** cada tela move só o que pede.
- **C12·33 · O tambor da T10: a linha pede 600 ms, e a G29 fixou 500** (**já decidida: G29**).
  - (a) Fica em 500 ms (300 por rodinha e 40 entre elas, a unidade primeiro), e a linha se reescreve.
  - **Padrão (a):** uma peça, um tempo.
- **C12·34 · A régua da diferença "encolhe até zero", mas o quadro final não mostra zero, e contar é proibido.**
  - (a) Durante os 300 ms da releitura, o texto da diferença encolhe no centro e esmaece. O *confere*, com o poço aceso, o alvo cumprido e o segmento feito, entra no fim dos 300 ms. Hoje ele entra no começo, e os 300 ms são espera parada. Com o reduzir, o semear é movimento: tudo em 0.
  - (b) O texto e o *confere* trocam por opacity em 300 ms.
  - (c) O número conta até zero.
  - **Padrão (a):** é a sequência que a decisão T10·4 pede, e nenhum ritmo de semear está declarado.
- **C12·35 · Na T11, o veredito aparece antes da evidência, e o primeiro glifo acende aos 400 ms.**
  - (a) Manter as duas coisas: só os glifos acendem, e o primeiro vem 400 ms depois de a tela montar, com a troca de 150 ms já acabada.
  - (b) O veredito espera a quinta linha, e o relógio só liga depois da troca (o primeiro glifo aos 550 ms).
  - **Padrão (a):** foi decidido no C11 e não inventa quadro.
  - **Decidido pelo diretor (25/09): (b).** O veredito espera a última linha.

### O checklist, o ciclo e a sessão (T13, T14 e T16)

- **C12·36 · O placar da T13 não está na tela quando um item conclui.** O item conclui no nível do item, e o placar só existe no mapa.
  - (a) O placar enche na frente de quem olha, em 300 ms. Ao voltar ao mapa, ele vai do valor que tinha quando a seção abriu até o novo. No `Finalizar`, ele completa, e o *HOMOLOGADA* e a meta esmaecem em 150 ms no lugar. A linha se reescreve.
  - (b) Só no `Finalizar`: ao voltar, o placar nasce no valor novo.
  - **Padrão (a):** é o único instante em que o técnico vê o placar depois de concluir, e o movimento não parte do zero.
- **C12·37 · A miniatura da T13 nunca troca na frente de quem olha.** O `Tirar foto` segue pro próximo item, e o visor não tem desenho de foto tirada.
  - (a) Ao voltar à Seção B aberta, o check das fotos tiradas desde que ela abriu surge por opacity em 150 ms, e o cartão já sabe fazer isso. O visor segue sem a foto (G25).
  - (b) O visor mostra a foto antes de seguir, o que pede desenho novo.
  - (c) Direto.
  - **Padrão (a):** usa o que existe, e o desenho novo vai ao arquiteto.
- **C12·38 · As assertivas da T16 dizem "aparecem juntas" no reduzir** (**já decidida: G26**).
  - (a) Acendem em ordem, no mesmo ritmo, sem o esmaecer. A coluna muda, como já mudou a da T11.
  - (b) Juntas.
  - **Padrão (a):** o processo segue no mesmo ritmo.
- **C12·39 · O que entra com a última assertiva da T16:** a prova, o bloqueio e o `Voltar ao menu`. Hoje entram secos, e o lugar deles já existe.
  - (a) Esmaecem em 150 ms no lugar, e a linha entra na tabela da T16.
  - (b) Direto.
  - **Padrão (a):** o `t16.css` já deixou o lugar parado à espera do C12, e só o que é novo se move.
- **C12·40 · O prazo da T14 drena em degraus de 250 ms, e a linha pede "contínuo, linear".**
  - (a) Cada degrau vira um trecho linear de 250 ms, pela mesma escala do C12·15. Com o reduzir, "o número troca e a barra salta", como a linha já diz.
  - (b) Degraus, como hoje.
  - **Padrão (a):** é a mesma peça e a mesma regra da barra da T03.

## O que não faz sentido

- **As duas linhas da T08** pedem o que as referências não desenham: um tambor e um marcador numa grade de mostradores, e valores virando traço numa 00 que já está em traço. A G26 as cancelou, e a tabela ainda as lista (C12·11).
- **A faixa e o cartão liberado da T04** descrevem o que acontece na T05, com o menu fora da tela (C12·24 e C12·26).
- **O placar da T13** pede um instante em que ele não está na tela (C12·36).
- **As duas linhas da T15** descrevem um envio que não anda: a fila não tem ritmo, e o único quadro com o envio é um estado parado (C12·13 e C12·14).
- **"Sobe e some", na T16,** some com a faixa que a referência desenha no lugar, sem sessão (C12·25).

## Entra

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

## Não entra

- **Os ritmos que o diretor não deu:** a busca e o firmware da T05, e o envio da fila da T15. Ficam parados, com a falta nomeada.
- **Desenho novo:** o quadro de começo da T07 e o visor com a foto tirada da T13. Os dois vão ao arquiteto.
- **Reservar os lugares (G24):** fica com o diretor. Os saltos de layout ficam como desvio nomeado, sem animar.
- **O mock, as referências e os textos:** nada muda neles.
- **O que é de outro ciclo:** a auditoria de fidelidade (C13) e o zoom do palco (C13 ou C14).

## Está pronto quando

- **Cada linha das 16 tabelas tem, num roteiro:**
  - o toque que a começa, com o `anima` esperado (propriedade, tempo, curva e atraso);
  - o mesmo caminho com o reduzir e o `quieto`;
  - quando é processo, o ritmo dentro do `entre`.
- **Toda tela abre parada:** pela URL, em cada momento e em cada estado da coluna, e no print.
- **`node scripts/caminho.mjs todos` aprova**, sem nenhum ⚠.
- **Os prints das 16 telas não mudam:** o quadro parado de cada referência continua o mesmo do C11.
- **A documentação segue o código:** as `animacao.md`, o `movimento.md` e o `CHANGELOG.md`, com cada desvio nomeado.
- **`npm run checar` e `npm run build` aprovam**, e o commit do C12 está feito.
