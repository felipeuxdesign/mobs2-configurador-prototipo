# O palco

A moldura de apresentação em volta do app. **Três peças e mais nada**, no fundo `--fundo-faixa` — a cor das superfícies do app. As referências estão em `palco/referencias/`.

## As peças

| Peça | Como é |
|---|---|
| **o quadrado** | 44 × 44, no canto de cima à esquerda, a 16px das bordas · abre o painel |
| **o celular** | no centro, **o app em tamanho real, 360 × 800** · a moldura é **a silhueta, sem marca**: **uma borda preta de 8px** em volta — 376 × 816 por fora · **canto de 36 por fora e 28 na tela, concêntricos** (28 + 8 = 36) · a borda **quase-preta `#050407`**, mais escura que a tela, com **um fio de luz de 1px por dentro** (`rgba(255,255,255,0.14)`) e um contorno escuro de 1px por fora — o acabamento de material, sem metal nem botão · **a sombra suave embaixo**, `0 12px 24px` a 45% — os 8% de fundo claro não aparecem no escuro · sem metal, sem câmera, sem botão · escala inteiro pra caber na janela, **nunca maior que o real** |
| **a coluna** | 230 de largura, 40 à direita do celular, **centralizada na altura dele** — a caixa tem a altura do celular e o conteúdo fica no meio · os estados da tela aberta, linhas de 32 |
| **o painel** | 280 de largura, desliza da esquerda por cima de tudo · fecha no X ou tocando fora · escolher uma tela não fecha o painel |

- **no protótipo** (decisão 43, revista no pacote 4) · a silhueta: os valores moram em `app/src/palco/palco-tokens.css` (a borda, os dois raios concêntricos, o fio de luz, o contorno e a sombra), e a moldura escala junto com a tela, nunca maior que o real (D3)

## O painel · em duas partes

- **O caminho** — as telas na ordem do fluxo: T01 a T05, a T07 e a T06, T09 e T10, depois T14, T13 e T16 · o diagnóstico vem antes do vínculo, como o quadro 04 desenha
- **As consultas** — T15, T11 e T12, que o técnico abre a qualquer hora pelo menu · a T07, o Diagnóstico do módulo, fica só no caminho
- no pé, **a data da última atualização** — *Atualizado em 04/10/2026*, a data do `CHANGELOG` (`app/src/palco/versao.js`)
  - no protótipo (o diretor, 04/10): o `Recomeçar do login` saiu do pé — tocar na T01 do painel faz o mesmo, zera o estado único e abre o login, porque a semente da T01 é vazia; e a etiqueta do canto do palco saiu junto, pra a data morar num lugar só. A cena 04 desenha o botão: o desvio fica nomeado até o quadro ser redesenhado

A tela aberta aparece marcada. As folhas não entram no painel: são momentos da T04.

## A coluna

- lista **os estados e as consultas paradas** da tela aberta · os momentos do fluxo só entram quando o índice declara acesso pela coluna
- **quem entra na coluna é o campo `coluna` do `indice.json`**: os estados entram por padrão, e `coluna: false` os retira; uma tela ou um momento entra com `coluna: true`. As três folhas de trocar da T04 (08, 09 e 14) ficam fora. A coluna da T04 mostra 4 dos 7
- **as consultas sem família ficam abaixo dos estados**, na ordem do índice: na T11, *Não bate com o cadastro* reutiliza a `00-tela`; na T09, *Manutenção · escolher o bloco*, *Manutenção · reenviando* e *Manutenção · concluída* reutilizam os momentos `08`, `09` e `10`. Todos abrem o próprio app parado e sem toque, como os estados · a `00` continua sendo referência de tela e os três quadros continuam sendo momentos: o acesso pela coluna não muda os tipos nem as contagens do design
- **a T11 escolhida no painel abre a conferência normal**, no par do herói (M2C-0417 + RKT-8H42), que chega a *Tudo confere*. A divergência do M2C-0438 + ONK-8Q90 fica na consulta *Não bate com o cadastro*, sem criar caminho alternativo no palco
- **a mesma regra vale no painel e no endereço simples da T02 e da T10**: as três empresas do técnico e o ônibus sem calibração são as entradas normais. Os quadros de uma empresa (T02/00–01) e do caminhão (T10/00, 01, 05–09) ficam abaixo dos estados, parados. A T11/03, a folha do exemplo divergente, também é consulta parada. A T13/29, *Alimentação · relendo*, entra recuada na família do item reprovado e não liga o relógio.
- **o índice nomeia os acessos**: `consulta: true` identifica os exemplos especiais; `colunaNoFim: true` coloca os avulsos depois dos estados. Links antigos desses momentos passam a abrir como estado parado, exceto com `print=1`, usado pelas réguas. O tipo normativo permanece tela ou momento.

- **o detalhe que nasce de dentro de outro estado vem logo depois dele**, recuado: a T13/09, *item reprovado*, depois da T13/16, *Seção C com item reprovado* — quem olha vê a lista com o item vermelho, e embaixo o que acontece quando toca nele · no índice, o `depoisDe`
  - no protótipo (o pacote 11): `estadosDa`, em `app/src/palco/telas.js`, põe depois de cada linha o que diz `depoisDe` dela, estado ou momento — a T13 fica *Finalizar com a Seção F falhando*, *Homologado sem localização*, *Seção C com item reprovado* e *Item reprovado*
- **o momento que nasce de dentro de um estado também entra**, logo depois dele, **recuado embaixo dele**: no índice, `coluna` verdadeiro e `depoisDe` com o estado de onde ele nasce · abre parado, como os estados · hoje são dois: a T07/06, *atualizando o firmware*, depois da T07/04 · sem isso, eles só se alcançam tocando dentro de um estado, e o estado aberto pela coluna é parado
- **o recuo**: o que nasce de outro quadro fica **recuado embaixo dele**, com o poço alinhado ao nome do quadro de cima (34px pra dentro) · **sem linhas ligando** · o recuo é o que faz a família aparecer: o que encosta na margem é o estado, o que está pra dentro nasceu dele · a **cena 05** mostra a T13 inteira, e a cena 02 o firmware
- **a ordem dentro da família conta a história**: o detalhe, o *não resolvido*, o *relido* · no índice, cada um com `depoisDe` o anterior
- **na coluna, o nome é curto**: *Seção C · GPS*, *Seção E · correção pedida* · a família de baixo diz o resto, e o nome cabe numa linha
- **as famílias do app**: a T02 (a busca na lista longa, a empresa escolhida, a unidade escolhida), a T07 (o firmware) e a T13 (as quatro falhas da Seção C) · as consultas da T09 e da T11 não têm família nem recuo
  - no protótipo (o pacote 23): `estadosDa` (`app/src/palco/telas.js`) já punha cada um depois do seu `depoisDe`, em cadeia, e a coluna recua um nível tudo o que tem `depoisDe` (`coluna-linha-recuo`, `--palco-recuo-coluna`: 24 + 10) · **a coluna longa**: com mais de 18 linhas, as que cabem com 32 na altura do celular, as linhas têm 30, como a cena 05 desenha a T13 (20 linhas) — com 32, a última passava do pé do celular · **o endereço** aceita no `estado` o momento da família (`rotas.js`): o link copiado de um deles reabre o mesmo quadro, parado (antes, a T07/06 e a T14/06 reabriam a tela) · na T02, o momento aberto pela coluna monta o quadro do momento, com o termo da busca dele, parado · os nomes curtos são o `rotulo` do índice
- com mais de seis estados **na coluna**, eles se agrupam pelo que o técnico estava fazendo — na T07: o módulo e a CAN; as consultas acrescentadas à T09 e à T11 seguem sem grupo
  - no protótipo (o pacote 1): o grupo é o `grupo` de cada estado no `02-telas/indice.json`, `modulo` ou `can`, que a coluna escreve *O módulo* e *A CAN* — o `scripts/testar-estado.mjs` (no `npm run checar`) confere que todo estado da T07 tem um. A coluna do protótipo lista os estados do `indice.json`: a da T01 tem 8 e a da T04 tem 4, e as duas ficam soltas, porque só a T07 tem grupo. O *T01 e T02 não mostram coluna* da cena 00 vai pro arquiteto
  - no protótipo (o pacote 3, D2): a coluna lê o campo `coluna` de cada estado no `indice.json` (`app/src/palco/telas.js` · `estadosDa`) — falso, fica fora; sem o campo, entra. Fora da coluna, a 08, a 09 e a 14 da T04 continuam abrindo pelo endereço, com o `Voltar ao fluxo` no topo e nenhuma linha marcada. A folha da cena 00 desenha 3 linhas da coluna da T04, e a coluna tem 4 (o Sem conexão é a quarta): a bancada do palco dá a diferença com o nome
- o marcador é **o mesmo do app**: poço de 24 com o quadrado vazado de 11, que vira lima de 11 no escolhido
- **o topo da coluna tem um lugar fixo, de 34px**: no fluxo, o texto *no fluxo · toque num estado pra ver*; num quadro parado, o **`Voltar ao fluxo`**. Com a mesma altura, a lista nunca se mexe quando um quadro abre · o `Voltar ao fluxo` devolve a sessão, o quadro e o avanço de antes da primeira consulta, mesmo depois de trocar entre várias opções da coluna; se o quadro veio pelo endereço, monta a semente da tela. Nenhum toque no app parado altera o fluxo guardado
  - no protótipo (a empresa antes da unidade, a otimização 400): na T02, o quadro das empresas ou das unidades vai pro estado único no `Ver as unidades` e no `Trocar de empresa` (`contexto.empresas`, `app/src/telas/T02/empresas.js` · `contextoDoQuadro`), e o `Voltar ao fluxo` devolve o quadro de antes, no mesmo mundo: as unidades da Viação depois do `Ver as unidades` — do `Entrar`, do `Trocar de empresa` do menu ou do `07` aberto pelo endereço —, e o `07` depois do `Trocar de empresa` (o roteiro `app/scripts/caminhos/empresa.mjs` prova). Até o fechamento de 27/09, o quadro morava só na tela, e o `Voltar ao fluxo` do quadro do `06` caía nas empresas (o `05` ou o `07`), ou, do `07` aberto pelo endereço, na `T02/00` de uma empresa só. A escolha tocada dentro do quadro ainda não vai: o `Voltar ao fluxo` do `07` e do `09` traz a escolha do endereço — a Viação, a Várzea —, e não a tocada (a pergunta ao diretor, de 24/09: gravar a escolha no toque)
- tela sem estados nem consultas paradas: a coluna não aparece

## O celular, nos dois jeitos

| | |
|---|---|
| **no fluxo** | o app interativo · a moldura do celular |
| **num estado ou numa consulta parada** | **o próprio app, montado pelo caso do mock, parado e sem toque** · **a mesma moldura** — o que avisa que está parado é o `Voltar ao fluxo`, que pisca uma vez quando se toca no app |

- **no protótipo** · a piscada é só do toque: cada toque no app parado pisca uma vez o `Voltar ao fluxo` (no estreito, o quadrado), e nada mais pisca — abrir um estado, trocar de estado pela coluna, voltar ao fluxo e passar a janela de larga a estreita, ou de volta, não piscam: a peça que nasce, nasce quieta: o contador da piscada volta a 0 quando um estado abre ou fecha e quando a janela passa de larga a estreita, ou de volta (`app/src/palco/Palco.jsx`; o roteiro `app/scripts/caminhos/pisca.mjs` prova, 62 passos, `node scripts/caminho.mjs pisca`) · até o conserto de 26/09, o contador da piscada nunca voltava a 0, e depois da primeira piscada todo estado aberto a partir do fluxo já nascia piscando — um aviso falso, agora que a moldura é uma só; e, até a segunda passada do conserto, um toque na larga, a janela estreita e de volta à larga, sem tocar no meio, ainda fazia o `Voltar ao fluxo` piscar sozinho

## As regras

- **nada reage a passar o mouse** — nem no palco. O quadrado e os itens do painel respondem no clique, com o pressionado
- dentro do celular, a seta normal do cursor; a mãozinha só nas peças do palco
- **janela estreita** — abaixo de 900px de largura, como no celular de quem recebe o link: o app em tela cheia, sem moldura e sem coluna, e o quadrado flutuando no canto. O painel continua abrindo por ele, e leva o `Voltar ao fluxo` no topo e a etiqueta no pé · num estado, tocar no app pisca o quadrado
- **no celular de verdade** (a janela estreita num aparelho de toque): o palco sai do caminho — **sem o quadrado** por cima do app, e o endereço não acompanha a navegação, então recarregar volta ao que foi aberto (o login, no link principal) e o link direto de uma tela ou estado continua abrindo certo. O painel ainda abre pelo `&painel=1`. No computador, com a janela estreita ou larga, o quadrado fica (diretor, 25/09: o celular é pra ver, o teste é no computador) · **a barra do Android desenhada também sai no celular de verdade**, com o app na tela inteira: o aparelho já mostra a barra dele, e duas barras denunciariam o site. A altura dela vira zero, e o véu, as folhas e o topo do login acompanham. No computador, no print e no celular deitado (que desenha o celular), ela fica
- **janela estreita deitada** — mais larga que alta, o celular de lado: o app não gira (a regra 11 do `CLAUDE.md`). O celular volta a ser o do palco — 360 × 800, com a moldura, no centro e em escala pra caber, nunca maior que o real —, sem a coluna, e o resto do estreito fica: o quadrado, o painel com o `Voltar ao fluxo` e a etiqueta. De pé de novo, a tela cheia volta. O teclado aberto num campo do app só encolhe a altura, e não conta como deitar, nem reescala o celular: ele fica na escala que tinha, e o app encolhe até o que sobra acima do teclado — vale também pro palco largo de um tablet (`app/src/palco/retrato.js`, `logica.md` · O retrato e O teclado)
- uma **etiqueta discreta com a data e o ciclo** no canto de baixo, pra quem comenta dizer qual versão viu
- o palco nunca mostra comparação com a referência — isso é trabalho do ciclo

## O link publicado

O link publicado abre direto no palco, sem senha (diretor, 26/09: a porta da senha saiu — ela não protegia de verdade, porque a senha ia no código que o navegador baixa, e só atrapalhava quem abre o link muitas vezes). O site continua pedindo pra não entrar em buscador (`noindex`, no `index.html`). Quem tiver o link, abre.

- **recarregar a página recomeça do login, no computador também** (diretor, 26/09): o endereço continua acompanhando a navegação — é ele que se copia pra mandar uma tela —, mas a página recarregada abre a T01, como o `Recomeçar do login`, e o painel fechado. Um link aberto de novo ainda abre a tela, o estado ou o painel dele. O print, a vitrine e as réguas abrem cada endereço de novo e nunca recarregam, então não mudam (`app/src/palco/rotas.js` · `recarregou`; o roteiro `app/scripts/caminhos/recarregar.mjs` prova)
  - no protótipo (a empresa antes da unidade, a otimização 400): três quadros do caminho do herói não têm endereço próprio, e o endereço copiado neles abre outra coisa — as empresas dele, nada escolhido (o `05`, a entrada depois do `Entrar`), e as unidades da Viação com o `Trocar de empresa` (o quadro do `06`) ficam em `?tela=T02`, sem momento, porque o `05` e o `06` são estados, e estado parado não anda; e a folha de trocar de unidade do herói, com o `Trocar de empresa` (o quadro do `T04/14`), fica em `?tela=T04&momento=07-momento-folha-trocar-de-garagem`, o endereço da `T04/07`. Abertos de novo, os dois endereços mostram o mundo de uma empresa só: as unidades sem o `Trocar de empresa` (a `T02/00`, a semente da T02) e a folha sem ele (a `T04/07`). O link do estado (`&estado=05-…`, `&estado=06-…`, o `T04/14`) mostra o quadro, parado (desvio nomeado, pro arquiteto: dar endereço a esses três quadros no fluxo, ou aceitar)
