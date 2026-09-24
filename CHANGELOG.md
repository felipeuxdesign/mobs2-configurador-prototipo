# Registro de mudanças

## 2026-09-24 · C6 · conectar: a busca e o caminho feliz — T05

- **o caminho feliz da T05** em `app/src/telas/T05/`: a busca, a escolha, a conexão, a pré-checagem acendendo as onze linhas a 600 ms, a sessão abrindo com a faixa, e a atualização do firmware
- **a bancada:** o 00, o 01 e o 02 em 0% contra o HTML; o 05 em 0,1% (os checks do Lucide, G5, e a linha de baixo da faixa, G13); o 10 em 0,07% (G5) · os textos conferem nos cinco · prints lado a lado em `06-prototipo/prints/C6/`
- **pedido do diretor:** pelo menu, "Conectar módulo" abre a lista **sem nada escolhido** (o 01), e só então o técnico escolhe e conecta. A 00, com o módulo do herói escolhido, abre pelo endereço, como o quadro da referência. Depois de aprovada a pré-checagem, é o "Selecionar ativo" que leva à T06
- **o mock:** a lista "por perto" com o meio de cada módulo (AC-06: o herói sem fio primeiro, e mais quatro) e o quadro da atualização de firmware (AC-19, 62%), só aditivos · **o gate foi de 109 pra 122** (com o C8)
- **as peças** ganharam variantes nomeadas (G11): a linha de módulo com o fim da lista e como escolha; a linha de checagem no estado "agora", com a folga do fim da pré-checagem e o relógio apagado; o rodapé fechando no botão durante o processo · as 121 fotos da vitrine continuam iguais ao C2
- **os tokens:** os 8 que o C6 e o C8 pediram entraram no bloco *C6 · C8* do `tokens.css` (239 → 247)
- o `logica.md` e o `08-produto-real/o-que-o-prototipo-simula.md` passaram a dizer **cinco** módulos por perto (o do herói e mais quatro), como as referências e o mock
- **desvio nomeado (G4, G25):** a busca acha os módulos na hora, e a atualização do firmware fica parada nos 62% da referência. Nenhum dos dois tem ritmo declarado, e ele entra no C12
- **desvio nomeado (G20):** o quadro de um só módulo encontrado (02) abre só pelo endereço. Nenhum dado do mock faz a busca achar um só
- **desvio nomeado (G25):** a pré-checagem correndo não tem referência. O topo mostra o serial e a placa do ônibus cadastrado, como nas falhas, e as linhas que esperam mostram o círculo de "ainda não"
- **desvio nomeado (Lei 3):** quando a pré-checagem aprova, a faixa aparece e a lista desce 37 px. A descida animada é do C12
- **vão ao PM:** o topo da pré-checagem mostra a placa, e a faixa aprovada diz "sem ativo" (T05-N3) · "sem rede" com check junto de "Rede do módulo conectada" (T05-N1)

## 2026-09-24 · C5 · o menu e as folhas

- **a T04 inteira** em `app/src/telas/T04/`:
  - os 10 quadros: a tela, 5 momentos e 4 estados;
  - a grade dos dez cartões, cada um dizendo o que falta, pelo estado único;
  - a folha da conta com o prazo do acesso;
  - a folha de trocar de garagem;
  - os diálogos de sair e de trocar com a sessão aberta;
  - os contadores pelas regras T04·1 e T04·2, contados do mock
- **a bancada:** contra o HTML, os 10 quadros ficam entre 0,37% e 1,24%, e a diferença de cada um está explicada: os ícones do Lucide (G5), o cartão Últimas instalações (G9) e, nas folhas e diálogos, o menu atrás do véu (G25). A estrutural fica em 0% nas cinco folhas e diálogos · prints lado a lado em `06-prototipo/prints/C5/`
- **o `logica.md`** ganhou as regras dos três contadores do menu
- **desvio nomeado (G9):** o mock diz que o aparelho tem rede, então o cartão Últimas instalações sai liberado. As referências 00 a 04 o desenham travado ("sem conexão", "espera conexão"). **Vai ao diretor:** o menu do herói é sem rede, como o design desenha, ou com rede, como o mock diz?
- **desvio nomeado (G9):** no menu sem módulo (01) e com o módulo sem ônibus (02), o cartão da fila mostra os 2 itens que ainda não chegaram, como no 00. Essas referências não desenham o contador
- **desvio nomeado (G25):** atrás do véu das folhas e dos diálogos fica o próprio menu, escurecido. As referências desenham o véu sobre uma página só com a tira
- **desvio nomeado (G24):** na faixa com o módulo em falha (03), o traço vermelho sai por cima da faixa, sem roubar altura
- **desvio nomeado (Lei 3):** o 01 põe a faixa sem sessão 1px abaixo, com as duas linhas trocadas. Aqui ela fica no lugar em que a sessão vai aparecer
- **desvio nomeado (Lei 3):** a folha de trocar com envio em andamento (08) cresce, porque o aviso toma o lugar do subtítulo. **Vai ao diretor:** a proposta de reservar o lugar
- **provisório até o C11 (T04·4, T04·5, G23):** "Encerrar a sessão e trocar" leva direto à sincronização da garagem nova, e "Encerrar a sessão e sair" leva direto ao login. Nenhum dos dois passa ainda pelo encerramento sem homologar da T16. A fila continua, como o diálogo diz
- **vão ao diretor:**
  - os dois contadores contam coisas diferentes: 2 no menu e 3 no diálogo de sair (T04·1, junto do "3 nesta garagem" da T15);
  - "Sincronize no menu para liberar" e "Sincronize para renovar o acesso" apontam uma ação que o menu não tem (T04·6);
  - a HU-T04-4 promete um aviso persistente do checklist, e a referência desenha um contador

## 2026-09-24 · C4 · entrar — login, garagem e sincronização

- **a T01, a T02 e a T03 inteiras** em `app/src/telas/`: os 18 quadros e os toques de cada `tela.md`
  - **T01:** o Entrar, a recuperação em três passos, a folha "Não recebi o código", o aviso de senha alterada e os três estados
  - **T02:** a escolha da garagem e a busca
  - **T03:** a sincronização correndo em 4 s, item a item, a falha de rede com o Reconectar, e o pacote de 4 dias e o vencido
  - **a tela remonta a cada pulo do palco,** e o estado próprio dela não vaza de um pulo pro outro
- **a bancada:**
  - **T01:** 0% contra o HTML em 5 dos 10 quadros, e até 0,09% em mais 3; o 03 e as duas folhas estão explicados (T01·1 e G25);
  - **T02:** os 3 quadros em 0 a 0,01%;
  - **T03:** os 5 quadros em 0 a 0,18%;
  - o que sobra é o glifo do Lucide (G5) ou um desvio abaixo · prints lado a lado em `06-prototipo/prints/C4/`
- **a régua dos textos** (`node scripts/textos.mjs Tnn`):
  - **T02:** os 3 quadros conferem;
  - **T01:** 7 de 10 conferem;
  - **T03:** 4 de 5 conferem;
  - o que não confere é desvio nomeado abaixo;
  - ela passou a pular o que fica inerte atrás do véu e a avisar quando o quadro rola
- **o mock:** o código errado, o mínimo de 8 do Entrar, os seis requisitos da senha, com o trecho de 3 da regra da sequência, e os 6 s por item. Só aditivo, provado campo a campo, e **o gate foi de 90 pra 109 checagens**
- **as peças** ganharam variantes nomeadas (G11), anotadas no `MAPA.md` e no `componentes.md`:
  - o rodapé do login, o segmentado com folga 8, o código com o foco em outra célula e a linha de opção desabilitada;
  - a escala sem os lados, a nota com o corpo secundário, e o aviso sem poço e mudo por padrão (G15);
  - a linha de escolha escolhível e a busca com a dica em texto;
  - no C5, a grade com folga 10, o cartão travado, a folha com folga e subtítulo, a faixa com o traço sobreposto e a linha de garagem em espera;
  - a camada do toque do link e das peças de duas camadas repete o texto por CSS, e o documento fica com um texto só;
  - **as 121 fotos da vitrine continuam iguais ao C2**
- **os tokens:** os 11 que as telas pediram entraram no bloco *C4 · C5* do `tokens.css` (228 → 239)
- **o ritmo do cronômetro** do código entrou no `ritmos.js` e no `movimento.md` · os `tela.md` da T01, T03 e T04 seguem o código
- **desvio nomeado (T01·1):** o prazo do código abre em 10:00 e o reenvio em 60 s, como o mock diz, e os dois descem um segundo por segundo. As referências 03, 04 e 05 mostram 9:41, 9:28 e 44 s, que não saem do mock e não batem entre si
- **desvio nomeado (G25):** a folha "Não recebi o código" e o aviso "Senha alterada" aparecem por cima da tela de onde nasceram, escurecida. As referências desenham o véu sobre uma página vazia
- **desvio nomeado (G24):** no código errado e nas tentativas esgotadas, as células sobem 9 px, como a referência desenha. **Vai ao diretor:** reservar o lugar da frase das tentativas
- **desvio nomeado (G9):** a falha de rede (T03/01) mostra o Pátio Caruaru parado no quarto item: 0 de 6 ativos, e o pacote de 04/03. O caso do mock é a primeira sincronização do pacote vencido de Caruaru, e a referência desenha a Várzea em 9 de 16
- **desvio nomeado (G24, Lei 3):** na T03, o aviso e a régua de idade tomam o lugar do poço, e a lista sobe (01, 02, 03 e 04), como as referências desenham
- **desvio nomeado (G21):** a T02/02 mostra as mesmas três garagens com a busca aberta. Nenhuma empresa do mock tem garagens demais pra uma tela
- **como a referência desenha (T03·2):** a T03/03 mostra o código do pacote (pac-uo-02), e não a versão. **Vai ao diretor:** a regra única da versão
- **vão ao diretor:**
  - o texto do limite de envios da hora atingido, que hoje deixa os botões desabilitados com o mesmo rótulo (G25);
  - o texto de "Entrar com a senha nova", que volta ao login sem entrar (T01·7);
  - o destino de "Pedir ajuda ao gestor", que só fecha a folha (T01·3);
  - o "faltam ~40 s" num download que termina em 4 s;
  - o "Com 7 ele bloqueia" da T03/03, contra a regra de mais de 7 dias (T03·3);
  - o vazio da busca da T02, que ainda não tem texto
- **HU sem referência:** a sincronização incremental por versão (HU-T03-1) e a versão gravada na evidência (HU-T03-3). O protótipo baixa o pacote inteiro e guarda a versão no estado

## 2026-09-24 · C2 · design system

- **as peças** em `app/src/ds/`:
  - os 10 primitivos: o poço, o glifo, o ícone, os marcadores, a superfície tocável, o primário, o só-ícone, o link e o checkbox;
  - as 6 famílias: chrome, linhas, cartões, instrumentos (com o tambor de roda de dígito, G29), entrada e checklist;
  - tudo sai de `src/ds/index.js`, e o mapa de cada linha do `componentes.md` pro componente que a constrói está em `src/ds/MAPA.md`
- **a vitrine** (`?vitrine=1`) mostra os **121 espécimes** das oito folhas, com o texto e a legenda de cada uma, e os **35 átomos** da folha 3. Um verificador independente conferiu o censo, folha por folha (5 · 20 · 1 · 32 · 17 · 24 · 18 · 4), sem espécime faltando e sem registro sobrando
- **a bancada** (`node scripts/especime.mjs todos`) compara cada espécime com a folha, os dois no mesmo Chrome a 1×. **73 dão 0%.** 46 diferem só no glifo do Lucide contra o desenhado à mão (G5, até 0,44%, 0 pixel fora da caixa do svg) · o relatório está em `06-prototipo/prints/C2/`
- **a bancada mede o desenho, não o arredondamento:** a moldura que cai em coordenada fracionária na folha vai pro pixel inteiro antes da foto (antes dava 1–2% em 24 espécimes certos). Ela também fotografa em lote, uma vez por folha
- **o fotógrafo** (`npm run fotografo` e `npm run fotografo:1`): um Chrome só, aberto uma vez, com 4 abas em paralelo, uma instância por escala. Antes, era um Chrome por foto e em fila, porque várias instâncias travam nesta máquina. **Medido: o mesmo PNG pixel a pixel** que o Chrome de linha de comando, nas escalas 1 e 2 · os 121 espécimes em 25 s · as réguas usam ele quando está no ar e caem na linha de comando quando não (`scripts/cromo.mjs`)
- **os tokens:** os 96 que as peças pediam entraram no bloco *C2 · as peças* do `tokens.css`, cada um com o papel e quem usa, com os nomes repetidos unificados pela revisão. Com os 13 do começo do ciclo (os glifos por tamanho, o marcador de 11, as escalas do toque e do surgir, e as entrelinhas), são **119 → 228**. Nenhuma cor nova
- **o `componentes.md`**, pela G10: **115 → 125 linhas**. Entraram os 5 espécimes da folha 1 (o primário nos três estados, o link e a linha tocável), os botões só de ícone e os quatro grupos de átomos da folha 3, com o que não tem uso nas 105 marcado. A *falha*, o *ainda não* e o *espera* passaram pra folha 4, e o *contador no menu* ficou marcado como a mesma peça do *com pendência*. Os números da versão no `CLAUDE.md` e no README do design system acompanham
- **duplicatas resolvidas** pela revisão, sem mudar o desenho (as 121 fotos saíram iguais antes e depois): a linha da fila, o cartão de opções, a caixa de poço e a caixa apagada
- **desvio nomeado (G13, DS-D5):** a *faixa · sem ação* é construída com a casca da T16 (52, fundo da faixa, recheio 16, borda de baixo). A folha 2 desenha só o miolo, e a bancada mostra os 6,67% dessa diferença
- **desvio nomeado, para o arquiteto:** o espécime *a marca no login* da folha 6 não tem a logo, nem no HTML nem no PNG, mas a legenda dele diz "o logo e CONFIGURADOR entre dois traços". A peça segue a T01/00, que tem a logo, e a bancada mostra 11,82%. **Pedido:** redesenhar o espécime com a logo
- o placar da homologação posiciona pelo % inteiro, como a folha desenha (21 de 31 → 68%) · o só-ícone usa o token do toque apagado, que antes era um valor solto

## 2026-09-24 · o palco, pelo diretor

- **o painel não fecha ao escolher uma tela** — fecha só no X, tocando fora ou com Esc; o Recomeçar e o Voltar ao fluxo também deixam ele aberto. O `palco.md` passou a dizer isso
- **num estado, a moldura do celular fica igual à do fluxo** (`--borda`), sem clarear: o estado se lê na coluna. Desvio nomeado contra o quadro `02-num-estado`, que desenha a moldura em `--borda-neutra`; o `palco.md` passou a dizer isso

## 2026-09-24 · C3 · palco

- **o palco** em `app/src/palco`, separado do app: o quadrado, o celular nos dois jeitos, a coluna, o painel em duas partes, a etiqueta `C3 · 2026-09-24` e o Recomeçar do login
- **a URL** leva a tela, o estado, o momento e o painel (`?tela=T07&estado=01-estado-fora-da-faixa`), com `replaceState`
- **as sementes** (`estado/sementes.js`): pular de tela pelo painel ou pela URL monta o estado mínimo do `logica.md`. **O Voltar ao fluxo** devolve o instante de antes do primeiro estado aberto. Se o estado veio pela URL, ele monta a semente
- **as receitas** (`estado/receitas.js`) dos 50 estados, cada uma com o caso ou o dado do mock de que o estado nasce. 5 esperam um caso aditivo no ciclo da tela: T05/09, T12/02, T15/01, T15/02 e T15/03 · o `npm run checar` ganhou o teste delas
- **o `indice.json`** ganhou `rotulo`, `rotuloOrigem` e, na T05, `grupo` em cada estado. 16 rótulos vêm dos quadros e 34 são propostos. O resto do índice não mudou
- **desvio nomeado (G19):** os quadros desenham o celular a 90% e o quadrado a 24; o palco segue o `palco.md`: tamanho real a 1440 × 900, centrado, e o quadrado a 16
- **desvio nomeado (G19):** a coluna da T05 não lista "Um encontrado", que o quadro 03 põe lá, porque é momento
- **desvio nomeado:** no modo estreito, tocar no app parado pisca o quadrado, porque a coluna não existe e o Voltar ao fluxo fica no topo do painel. O `palco.md` não fala disso
- prints em `06-prototipo/prints/C3/`

## 2026-09-24 · C1 · fundação

- **o repositório git** na raiz, com o `.gitignore`; o primeiro commit guarda a pasta como o C0 a deixou
- **o projeto** em `06-prototipo/app`: Vite 8.3.0, React e React DOM 18.3.1, lucide-react 1.47.0; pngjs e pixelmatch pra comparar prints · a estrutura `src/ds`, `src/telas`, `src/estado`, `src/palco`, `src/dados`
- **os tokens**: o `tokens.css` é a norma; saíram os 3 duplicados (`--poco-24`, `--poco-32`, `--poco-44`); entrou um bloco de 24 tokens que as referências usavam sem nome (a barra do sistema, o campo, os traços, a marca no login, 15 espaçamentos de letra e 3 tempos que zeram no reduzir) — **95 → 119 tokens**; o `tokens.json` passou a ser gerado do CSS e voltou a ter 150, 200 e 300ms (guardava 0ms)
- **a fonte** vem dos woff2 de `05-recursos/fontes`, os mesmos das referências — desvio nomeado contra o `@fontsource/barlow` que a stack pedia; `06-prototipo/CLAUDE.md`, `publicar.md` e `05-recursos/README.md` passaram a dizer isso
- **o mock** entra na app por import, sem cópia, e congelado · o gate ganhou 22 checagens do que as telas leem (credenciais, calibração, checklist, ciclo, autoteste, os 12 casos que ninguém conferia) — **68 → 90** · os comentários do mock e do gate apontam os caminhos certos, e o dado não mudou (o hash de `JSON.stringify(M)` é o mesmo)
- **o estado único** nasce com a forma completa que as 16 telas pedem · `formato.js` sem `Intl` · `ritmos.js` espelhando o `movimento.md`
- **o celular** de 360 × 800 no centro do palco, e o modo `?print=1`, que mostra só a tela — o print sai em 720 × 1600, o tamanho dos PNG
- **o `npm run checar`**: gate do mock, `tokens.json` = `tokens.css`, zero relógio, acaso, locale, hex e px solto em `app/src`
- **as leis** reescritas pelas telas, por decisão do diretor (15 linhas marcadas com ◆, **para revisão do arquiteto**): a Lei 3 descreve o que os estados fazem; as Leis 1, 4, 5, 6, 7, 10, 11, 14, R-03 e o poço na linha ganharam as exceções nomeadas; entrou a lei do toque de 48; o "nada encosta" vale pra todo tocável
- **os números da versão**: 119 tokens e 115 peças no `CLAUDE.md` e no README do design system; 25 cores (o README dizia 23)
- **o `ciclos.md`** segue o plano revisado no C0
- prints em `06-prototipo/prints/C1/`

## 2026-09-24 · a marca, o login e o checkbox

- a logo passou de `#B8F23D` pro `--lima` `#AAEF00` · **lei 15** e **decisão 28** — em `logo-mobs2.svg` só o `fill` mudou; o manifesto de procedência embutido no arquivo não confere mais, porque o conteúdo mudou
- saiu do login e do erro a frase "O acesso vale por 7 dias sem sincronizar" — ninguém age sobre ela no login
- o checkbox do login ganhou 8px em cima e embaixo: o toque encostava no campo de senha, e o formulário estava a 26px do Entrar
- o design system ganhou o checkbox marcado na folha 6 · o movimento de marcar entrou na animação da T01 e da T13
- vieram do design e foram conferidos antes de entrar: os PNG `T01/00-tela` e `T01/01-estado-usuario-ou-senha-incorretos` (a logo no lugar, a 207px; o Entrar no lugar; o HTML editado desenha a mesma geometria) e a folha 6 em HTML e PNG — que, além do checkbox marcado, zerou o padding da moldura do espécime *linha de opção*
- nenhuma contagem de referência muda: continuam 105 · o `componentes.md` passa a ter 115 linhas (os números da versão foram atualizados no C1)

## 2026-09-23 · design fechado · versão 2

- **105 referências** de tela: 16 telas, 39 momentos e 50 estados, em 360 × 800, cada uma em HTML puro e PNG
- **design system** com 8 folhas, 114 peças e 95 tokens; cobre todo desenho que se repete nas telas
- toda medida é **por dentro** — a borda e o recheio cabem no número
- o **cruzamento das 107 histórias de usuário** com as telas: toda história que pede tela tem tela
- a **lógica do protótipo navegável** e do palco, prontas pra construir
- as referências abrem **sozinhas e sem internet**: a fonte e a logo moram em `05-recursos/`
- o protótipo ainda **não foi construído** — o próximo registro é do primeiro ciclo dele
