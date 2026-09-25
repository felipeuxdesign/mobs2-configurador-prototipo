# Registro de mudanças

## 2026-09-25 · o mundo real, construído no protótipo

- **T01/14 · o login sem conexão:** o Entrar sem internet mostra *SEM CONEXÃO · O login precisa de internet.*, os campos ficam preenchidos, e o Entrar tenta de novo · **0%**
- **T05/16 e 17 · o Bluetooth:** *Ligar o Bluetooth* leva à busca; *Permitir* pede de novo e, com o *não perguntar de novo* do caso, vira *Abrir as configurações*, que volta com a permissão e começa a busca · as duas em **0%**
- **T10/11 · a câmera sem permissão:** o quadro diz o que falta, e o botão vira *Abrir as configurações*; a câmera do checklist segue a mesma regra, e a câmera do app virou uma peça só, a mesma na T10 e na T13 · **0%**
- **as três regras novas da lei de construir:** o teclado não esconde o campo nem o botão (a tela rola e o rodapé sobe junto, provado com a janela simulada); o app não gira, e o celular deitado fica em 360 × 800 no centro; e uma régua nova (`app/scripts/aceso.mjs`) procura botão aceso que não faz nada em 75 lugares
- **o contador do checklist no menu** agora desconta o que já foi resolvido (era o meu defeito, apontado ao arquiteto)
- **a régua inteira:** 11 roteiros e **1.322 passos** aprovando, com o teclado e o retrato · nenhuma das 126 referências piorou · a base do palco foi refeita, porque a coluna da T05 ganhou os dois estados do Bluetooth · 1 token novo (**275**) · `checar` e `build` aprovam
- **desvios nomeados:**
  - os quatro estados do celular só se veem pela coluna do palco: nada no caminho do técnico tira a rede ou nega uma permissão, e o que os botões deles fazem se prova no node (`testar-login-e-bluetooth.mjs` e `testar-camera.mjs`, no `checar`);
  - o *Abrir as configurações* volta sempre como se o técnico tivesse dado a permissão;
  - o aviso do login sem conexão tem o traço cinza que a referência desenha, e o `componentes.md` diz que o aviso não tem traço (variante nomeada);
  - o relatório do checklist ainda não diz *sem localização*: falta o quadro, o texto e o dado — a entrega nova do arquiteto traz a T13/14 pra isso
- **pro arquiteto:** o `para-o-arquiteto-T13-checklist.md` (respondido na entrega nova) e o `para-o-arquiteto-alinhamento.md`, com as decisões do diretor de 25/09 · **pro diretor:** as respostas de 25/09 estão em `06-prototipo/decisoes-do-diretor.md`, e entram na próxima construção

## 2026-09-25 · o mundo real, construído · os quatro estados do celular e as três regras novas

- **os quatro estados do celular**, cada um montado pelo seu caso do mock e aberto pela coluna do palco, parado e sem toque:
  - **T01/14 · o login sem conexão:** o aviso *SEM CONEXÃO · O login precisa de internet.* no lugar do erro, com o traço cinza embaixo; os campos ficam preenchidos, porque a senha não estava errada, e o `Entrar` fica aceso e tenta de novo — com a rede de volta, entra, ou dá o erro da senha (`app/src/telas/T01/regras.js`)
  - **T05/16 e 17 · o Bluetooth desligado e sem permissão:** o bloco da busca que não começa, com o Bluetooth cortado · `Ligar o Bluetooth` leva à busca · `Permitir`, negado de novo, vira `Abrir as configurações`, que volta com a permissão dada, e a busca começa (`app/src/telas/T05/celular.js`) · na coluna, os dois ficam no grupo *Achar*
  - **T10/11 · a câmera sem permissão:** a câmera riscada, *O app precisa da câmera pra fotografar o painel* e `Abrir as configurações`, que volta com a câmera aberta e o `Tirar foto` · a mesma saída na câmera do item do checklist (T13), onde o `Não conforme` continua valendo · as duas câmeras do app viraram uma peça só (`VisorCamera`), e o primário das duas sai de uma função só (`app/src/estado/camera.js`, `primarioDaCamera`)
  - **a localização negada** não tem tela: nada no protótipo lê a localização, e nada trava
  - **as peças:** dois ícones (o Bluetooth cortado e a câmera riscada), o aviso com o traço embaixo e um token, a largura da explicação da câmera (274 → **275**) · nenhum espécime da bancada mudou
  - **as provas:** o toque de cada primário se prova no node, nas funções que as telas tocam (`scripts/testar-login-e-bluetooth.mjs`, 20 toques, e `scripts/testar-camera.mjs`, 19 conferências, os dois no `npm run checar`), e o `voltar.mjs` confere os quatro parados, sem toque e sem voltar
- **o teclado nunca esconde o que importa** (regra 10): uma peça só, no app (`app/src/estado/teclado.js`, `useTeclado`), e o `interactive-widget=resizes-content` no `index.html`, que é o *adjustResize* do Android. Com o teclado aberto, o app encolhe até o que sobra acima dele, o miolo traz o campo em foco com o rótulo, e o rodapé sobe junto, com o botão principal à vista · vale nos oito campos do app: o usuário, a senha, o código e a senha nova (T01), a busca da T02 e da T06, o painel da T10 e a justificativa da T13 · o painel e o código abrem o teclado numérico · onde o navegador não encolhe a página (o Safari do iPhone), a peça mede a janela que se vê (`visualViewport`) · no computador e no print, nada muda
- **sempre em retrato** (regra 11): no modo estreito com a janela mais larga que alta, o palco põe o celular de 360 × 800 no centro, com a moldura e em escala, como no palco largo, sem a coluna · o teclado aberto num celular baixo não conta como deitar (`app/src/palco/retrato.js`, `palco.md`)
- **nenhum botão aceso que não faz nada** (regra 12): a régua nova `app/scripts/aceso.mjs` toca cada tocável aceso de cada tela e momento do fluxo, e dos lugares que nascem de um toque (o menu sem o aviso do acesso, a busca que acha na T02, a recuperação da T09), e confere se algo mudou: nos 75 lugares, ficam três tocáveis acesos que não fazem nada, os três com o `tela.md` mandando, a nota na régua e a pergunta no `06-prototipo/decisoes-do-diretor.md` — o `ENCERRAR` da recuperação da T09 (G23), o `Sincronizar` das seis garagens sem pacote da lista longa (T02) e o `Procurar de novo` da lista sem nada escolhido (T05/01), que acha a mesma lista na hora · 4 quadros com um processo que acaba em outro lugar não se medem (a releitura, a cadeia, o autoteste), e o lugar de depois se mede · as saídas das permissões são das frentes da T05, da T10 e da T13
- **as réguas:** dois roteiros novos, `teclado.mjs` (a janela que encolhe, o teclado por cima da página, o numérico, o celular em escala que não encolhe com o teclado — 135 passos) e `retrato.mjs` (a janela deitada — 25 passos), e os passos `janela`, `foca`, `sobreposto`, `aVista` e `app` na régua do caminho · a conta do teclado e a do retrato no node (`scripts/testar-regras.mjs`, no `npm run checar`) · o `desligado` da régua do caminho conta o botão num fieldset desabilitado
- **nenhum quadro parado muda:** a peça do teclado não escuta no print, e o palco só muda na janela estreita deitada
- **os revisores acharam e corrigiram:**
  - o Bluetooth desligado e sem permissão não apareciam na coluna do palco, porque o `indice.json` da entrega veio sem o grupo deles: agora estão no *Achar*, e o `npm run checar` reprova um estado da T05 sem grupo (`scripts/testar-estado.mjs`);
  - as duas câmeras decidiam o primário cada uma na sua tela, e não pela função que o teste prova: agora a T10 e a T13 tocam o que `primarioDaCamera` diz, e o teste prova também o `Salvar com ressalva`, que ganha da câmera com o `Não conforme` marcado;
  - no checklist, com a câmera negada, o endereço dizia o momento da câmera aberta (07 e 08): agora ele sai do momento, como na T10, e volta ao 07 com a permissão dada;
  - a régua do botão aceso dava todo botão por vivo, porque o Chrome dá o foco ao botão tocado e a régua contava o foco como efeito (provado: com a conta de antes, o `ENCERRAR` da T09/03 e o `Sincronizar` sem pacote passavam) — agora o foco só conta quando o toque o leva a outro lugar, a escolha já marcada não conta, os seis quadros do cronômetro do código se medem sem os números, a conferência da T11 depois de acabar, e o menu, que o aviso do acesso cobria, se mede sem ele;
  - no Chrome de um tablet e no celular deitado, o teclado que encolhe a página reescalava o celular pra caber (deitado, de 0,38 pra 0,14): agora o celular fica na escala que tinha, e a peça do teclado encolhe o app até o que sobra (`alturaDoPalco`, em `app/src/palco/retrato.js`)
- **o fechamento, com as três frentes juntas:** **11 roteiros e 1.322 passos** aprovando, nenhuma frente desfez a outra · as 4 referências novas em **0%** contra o HTML (contra o PNG, de 0,44 a 1,04%, a rasterização do gerador do design, como as outras em 0%), e os textos delas conferem · nenhuma das 126 piorou contra a base do C11, e quatro da T10 melhoraram · os 123 espécimes com os números do C2, fora os 9 que a entrega de 25/09 já tinha mudado · o palco: a coluna da T05 lista 13 estados, e as três peças dela mudam com as duas linhas novas (4,58 → 4,64%, 4,12 → 4,32% e 2,94 → 5,61%), com a nota na régua; a base do palco não foi refeita · a régua do botão aceso: os mesmos três com nota, e nenhum sem nota; na rodada inteira, o encerramento sem homologar (T16/03) também ficou sem medir, porque acaba na 04, que se mede — medido sozinho, ele se mede depois do processo, e a conta depende do tempo da máquina · `checar` e `build` aprovam (o build avisa que o pacote passou de 500 kB, e é só aviso)
- **desvios nomeados:**
  - os quatro estados do celular só se veem pela coluna do palco: no caminho do técnico, nada no mock tira a internet, desliga o Bluetooth ou nega uma permissão, e o que os botões deles fazem se prova fora do palco;
  - o protótipo não abre as configurações do Android: `Abrir as configurações` volta sempre como se o técnico tivesse dado a permissão (a busca começa, ou a câmera abre);
  - na T05, quando o técnico nega o Bluetooth de novo, o botão vira `Abrir as configurações` no mesmo quadro — nenhuma referência da T05 desenha esse quadro, e o texto vem da câmera (T10/11);
  - o aviso do login sem conexão tem um traço cinza embaixo, como a referência desenha, e o design system diz que o aviso não tem traço;
  - a câmera sem permissão da T10 abre na instalação do herói, porque o caso é do celular e não diz qual ônibus;
  - a câmera do checklist sem permissão mostra só a câmera riscada, sem dizer o que falta, porque esse texto não existe — e, sem referência, ela só se vê na vitrine das peças;
  - no Bluetooth desligado e sem permissão, o quadro vazio desce até o rodapé, sem a legenda da busca vazia;
  - o relatório do checklist ainda não diz *sem localização*: falta o quadro, o texto e o dado da localização do celular;
  - o teclado do iPhone, que cobre a página, e o do Android foram provados com a janela simulada, e não num aparelho de verdade (fica pro C14);
  - no computador, encolher a janela com um campo do app em foco não muda o tamanho do celular até a próxima mudança da janela; o app encolhe até o que se vê, e o toque segue;
  - o celular deitado fica pequeno, uns 40% do tamanho, mas não gira e não encolhe mais quando o teclado abre;
  - três botões seguem acesos sem fazer nada, como o `tela.md` manda: o `ENCERRAR` da recuperação da T09, o `Sincronizar` das garagens sem pacote e o `Procurar de novo` da T05/01. O diretor respondeu que eles ficam desabilitados de verdade (b), e isso ainda não está construído
- **para o diretor:** a leitura da resposta *negada* do Bluetooth (`decisoes-do-diretor.md`) · **para o arquiteto:** o quadro da T05/17 com o botão virado, o texto da câmera do checklist sem permissão, a linha *sem localização* e o que o `Esqueci a senha` faz sem internet (`diferencas-para-o-arquiteto.md`)

## 2026-09-24 · o mundo real

- **quatro estados que vêm do celular**: o Bluetooth desligado e sem permissão, na T05; a câmera sem permissão, na T10; e o login sem conexão, na T01 · cada um com o seu caso no mock
- **três regras na lei de construir**: o teclado nunca esconde o que importa, o app fica sempre em retrato, e permissão negada tem saída
- a **localização negada** não trava nada: o relatório sai sem a geolocalização, e a linha diz isso
- agora são **126 referências** — 54 momentos e 56 estados — e **39 casos**

## 2026-09-25 · a entrega de 25/09, construída no protótipo

- **T10 · a calibração só semeia com a prova** (decisão 33): o campo do painel com o teclado numérico, o botão que diz o que falta (*Digite o que o painel mostra* → *Fotografe o painel* → *Semear o hodômetro*), a câmera do app desenhada em código, o registro da foto no lugar do cartão, o semear com *Gravando no módulo…* e *Relendo…*, a releitura que não confere com *Semear de novo*, o horímetro no mesmo fluxo e *Concluir a calibração* → o menu · a foto de cada grandeza fica gravada, e o checklist continua herdando o Painel · **as 11 referências de 0 a 0,16%**
- **T01:** no erro, o *Entrar* fica apagado, dizendo *Digite a senha*, até a senha ter um caractere · **T02 e T06:** a busca sem resultado diz o que não achou e como buscar
- **T04 · o aviso do acesso:** o diálogo *Seu acesso vence em 2 dias* na primeira chegada ao menu, com os dias do mock; *Entendi* fecha, e o voltar faz o mesmo. No caminho feliz ele aparece uma vez; o *Recomeçar do login* e o pulo do palco mostram de novo
- **o painel do palco em duas partes**, o caminho e as consultas, com o *Recomeçar do login* no pé · **a régua do palco** nasceu (`app/scripts/palco.mjs`): os 5 quadros do palco, e o painel do 04 em 0,01%
- **T15:** o *Ressincronizar e reenviar* devolve os itens com erro pra fila, e o envio recomeça · **T16:** as legendas de cada passo do encerramento
- **as peças:** a foto *a tirar* e *tirada*, o painel vazio, a falha do valor em poço e da régua, o xis-mini, a busca focada e o diálogo com o ar de 24 · os espécimes das folhas 7 e 8 novas em 0%, e nenhum outro mudou
- **a régua inteira:** 9 roteiros e **1.137 passos** aprovando — o caminho do herói vai do login ao menu sem sessão passando pelo aviso e pela calibração com a prova · nenhuma das 122 referências piorou contra a base, e quatro da T10 melhoraram · `checar` e `build` aprovam
- **os revisores acharam e corrigiram:** a T10 perdia o número digitado ao voltar pela coluna; o aviso que esperava a folha entrava de uma vez, e o Esc fechava um aviso que ninguém tinha visto; no palco, o anel de foco vazava pro app, o X do painel não tinha pressionado, o *Voltar ao fluxo* encostava na linha no modo estreito, e o `&painel=1` não ia pro endereço
- **desvios nomeados:**
  - **G9:** a hora da foto e da releitura é 14:30, o relógio parado (as referências dizem 14:31 a 14:33); a T06/08 mostra os 10 do pacote, e a referência 5;
  - o aviso do acesso aparece uma vez por percurso, e não por dia, porque o relógio não anda;
  - o *Entrar* apagado vale só no erro; com a senha vazia fora dele, o toque dá o erro;
  - no meio do semear, o *Voltar ao menu* e o voltar param o semear, e a volta cai no passo com a foto (pergunta ao diretor)
- **para o diretor:** quatro perguntas novas em `06-prototipo/decisoes-do-diretor.md` (a busca que esconde a escolha, as garagens sem pacote da lista longa, o voltar no meio do semear, a legenda do corte no herói)

## 2026-09-24 · a calibração com prova, e os outros buracos

- **a calibração só semeia com a prova**: o campo do painel pra digitar, a câmera do próprio app, o botão dizendo o que falta, a releitura que não confere, e o horímetro até *Concluir a calibração* · decisão 33 e o caso `releitura-nao-confere`
- **o aviso do acesso vencendo**, no 5º dia, como diálogo sobre o menu · a HU-T01-11 pedia e não existia
- **a busca sem resultado**, na T02 e na T06 · e o `Entrar` apagado com a senha vazia
- **o painel do palco em duas partes**, como o palco.md mandava: o caminho e as consultas, com o *Recomeçar do login* no pé
- escritas na pasta: as **8 legendas do encerramento** e os **toques da fila de saída**
- agora são **122 referências** — 54 momentos e 52 estados —, **117 peças** e **35 casos**

## 2026-09-25 · C11 · fechamento: o caminho do herói e o voltar do Android

- **o caminho do herói, de ponta a ponta, só por toque:** do login às 14:30 ao menu sem sessão, passando pela garagem, a sincronização, o módulo, a pré-checagem, o ônibus, a CAN, a cadeia, a calibração, o ciclo, o checklist e o encerramento · 141 passos, em 44 s, sem nenhum pulo do palco
- **cinco caminhos alternativos:**
  - a sessão abortada antes de homologar;
  - os diálogos de sair e de trocar de garagem com a sessão;
  - o recuperar acesso pela entrega nova;
  - as portas naturais e a R-14 nas listas de escolha;
  - o voltar do Android nas 16 telas
  - **ao todo, 890 passos aprovando** · nenhum defeito de tela apareceu: o caminho já funcionava como foi construído
- **o voltar do Android numa peça só** (`src/estado/voltar.js`), no lugar das 7 cópias: faz o mesmo que o link de saída do rodapé; numa folha ou diálogo, fecha; nos processos que não podem parar, nada. Não escuta no print nem num estado da coluna · ligado nas 9 telas que não tinham · a tabela das 16 no `logica.md`
  - **uma leitura nomeada:** o link que fica no lugar ou avança o fluxo (o *Procurar de novo* da T05, o *Configurar módulo* da T07 reprovada) não é saída, e ali o voltar não faz nada;
  - **pro PM:** o voltar no login, na garagem e no menu, que não têm saída desenhada (`pendencias.md`)
- **a régua do caminho** (`app/scripts/caminho.mjs`) toca pelo nome, espera a URL, e grava e confere o movimento, pro C12. Corrigida no fechamento: ela esperava o documento novo antes de tocar, e às vezes tocava no velho
- **a documentação das peças do C10, do C11 e das entregas:** a seção do protótipo do `componentes.md` foi de 78 pra 91 linhas, com as variantes e as telas que usam, conferidas contra o código · as listas medidas da T14 e da T16
- **o que espera o diretor** ficou num arquivo só: `06-prototipo/decisoes-do-diretor.md`
- as 113 referências continuam com os números do C11, e `checar` e `build` aprovam

## 2026-09-24 · C11 · encerrar e consultar — T16, T15, T11 e T12

- **as quatro telas em `app/src/telas/`**, com os 19 quadros e os toques de cada `tela.md`, cada uma construída por um agente e revisada por outro:
  - **T16, a sessão:** o ENCERRAR de toda tela leva a ela. Com a sessão homologada, o encerramento corre os 7 passos a 600 ms, e as 8 assertivas acendem a 400 ms; a prova e o *Voltar ao menu* entram com a última. Antes de homologar, a sessão abortada tem 4 passos, sem confirmação, e os diálogos do menu passam por eles antes do destino (G23). A sessão interrompida retoma no bloco que parou, e o *Descartar* volta ao menu sem sessão
  - **T15, a fila de saída:** a fila da garagem ativa, com o que a sessão criou, e os 4 estados (sem erro, dois erros, vazia e a Seção F em re-checagem)
  - **T11, conferir a configuração:** a conferência lê ao abrir, as cinco linhas acendem a 400 ms, e *Regravar os cinco blocos* leva à T09. Pelo menu, com a sessão do herói, tudo confere
  - **T12, as últimas instalações:** agrupadas por idade, o detalhe da instalação e os estados vazio e sem rede
- **a bancada, contra o HTML:**
  - **T16:** de 0,02 a 0,06%;
  - **T11:** 0,02 a 0,14%;
  - **T12:** 0 a 0,07%;
  - **T15:** 0 a 0,09%, e 4,65% no estado sem erro, porque o recorte da fila que a referência desenha não sai do mock (o dado ganha no valor, G9);
  - o resto é o glifo do Lucide contra o desenhado à mão (G5) e a linha de baixo da faixa (G13) · os textos conferem, fora os do valor que o mock ganha
- **o mock:** os acréscimos do C11, só aditivos e com checagem no gate (o par que confere, as instalações vazias, a fila sem erro, com dois erros e vazia) · **41 casos no mock**
- **os tokens:** os 12 que o C10, o C11 e a T01 pediram entraram no `tokens.css`, cada um com o papel (262 → **274**)
- **as peças:** variantes nomeadas (G11) na linha de checagem, no aviso, na nota, no cabeçalho do conteúdo, no encerramento, na linha do histórico, no cartão que pede ação e num glifo de fora da folha 3 · os 122 espécimes da vitrine continuam com os números do C2, fora os das folhas que o design mudou
- **desvios nomeados:**
  - **G13:** a faixa da sessão fica com a linha de baixo, que as referências da T11 e da T12 não desenham;
  - **G9:** na T11 aberta pelo menu, o Ativo diz *tradução urbano v3*, o cadastro do RKT-8H42, e a referência diz *frota v2*. Na T15, a evidência do RSW-9L02 é *há 2 dias*, e não *ontem 10:05*;
  - **G24, a Lei 3:** a assertiva que falha, a sessão interrompida, o corte e o sem rede da T12 mudam o desenho do cartão, como as referências desenham. **Para o diretor:** reservar os lugares;
  - **Lei 1:** o cartão *Subindo agora* da T15 fecha com o traço lima enquanto o envio corre, como a referência. São duas exceções propostas ao diretor;
  - **T16·2:** os Pontos de cerca do herói ficam *não se aplica*, porque o texto da assertiva aplicada não existe
- **para o diretor e o arquiteto:**
  - os textos que faltam: os passos do encerramento enquanto correm, os vereditos da T12 sem referência, o *quando* do detalhe de outro dia;
  - o corte dos grupos por idade da T12 (17 é o menor que reproduz a referência);
  - a ressalva, que não aparece em lugar nenhum
- **pendente no fechamento:** o caminho do herói de ponta a ponta e o voltar do Android em todas as telas

## 2026-09-24 · C10 · o ciclo e o checklist — T14 e T13

- **a T14, o ciclo dinâmico:**
  - a fila do módulo drena em 3 s, e o *Disparar evento de teste* acende;
  - o prazo de 2:00 anda 4 s por segundo, e os passos 3 a 5 acendem a +9, +12 e +15 s do disparo;
  - o evento chega aos 24 s, e os campos conferem;
  - os três estados, e a correção solicitada (06), que vira o registro no mesmo lugar, como na T06
- **a T13, o checklist:**
  - as seis seções com o mapa e o acordeão (os 12 quadros);
  - cada item lê a etapa que o produziu no estado único;
  - o item reprovado leva à tela que corrige;
  - o *Finalizar* homologa, ou abre a ciência com a Seção F falhando;
  - o contador do menu conta B e E não resolvidos
- **a bancada, contra o HTML:**
  - **T14:** 0,04 a 0,05% nos quadros sem valor do mock. Na 01, 04 e 06, de 0,72 a 1,77%, pela faixa travada em 52 (G13). Na 05, 0,87%, porque o evento chega aos 24 s do mock, e não aos 48 da referência (G9);
  - **T13:** 0,04 a 0,66% em 9 dos 12 quadros. A D (2,75%), a E (2,07%) e a ciência (1,12%) sobem pela faixa (G13), pela versão gravada inteira num cartão de duas colunas (T13·1) e pelo valor do mock
- **desvios nomeados (G9, G22):**
  - pelo palco, o checklist mostra 19 de 31 e *Faltam 9 itens*, e não 21 e 10: a foto do painel já veio da calibração, e a Seção F só conta o que esta sessão enviou;
  - o firmware do herói é o 2.3.5 do cadastro;
  - os pontos de cerca mostram G07;
  - a barra do GPS vai de 0 a 12, como a T07;
  - o homologado diz 14:30, o relógio parado
- **a Seção E feita** mostra *confere* em cada passo, a palavra já aprovada pro chassi · nenhuma referência desenha a E feita (G25)
- **para o diretor:** reservar os lugares da T14, que se movem entre os quadros como as referências desenham (G24)

## 2026-09-24 · as entregas 4 e 5 do design, construídas e organizadas

- **T01 · o não recebi o código, pela 4ª entrega:**
  - a folha tem as duas saídas; *Conferir e reenviar* e *Mandar para o e-mail* voltam pro código, com o prazo cheio, as células vazias e o cursor na primeira (12 e 13);
  - a espera do reenvio é a contagem no lugar da seta, com as duas linhas desabilitadas de verdade até zerar; ao zerar, a seta entra e as linhas acendem em 150 ms (11);
  - o contato aparece mascarado nas seis telas do recuperar, derivado do mock (`dados/formato.js`), com reticências quando não cabe (decisão 31);
  - nenhum *Pedir ajuda ao gestor* sobrou (decisão 32);
  - **o revisor achou e corrigiu:** o leitor de tela lia duas vezes o texto da linha que espera
- **T02 · a lista longa, pela 5ª entrega:**
  - a busca só aparece com mais de 6 garagens, e filtra por nome ou cidade, sem acento e sem caixa. O herói, com 3, não tem busca;
  - o estado 02 é o caso novo `lista-longa-garagens`, com 9 garagens rolando por baixo do rodapé parado;
  - a frase da idade sai do dado: *pacote de hoje*, *de ontem*, *de 4 dias*, e a vencida diz só *pacote vencido há 8 dias* (D-41)
- **a bancada:** a T02 em 0, 0 e 0,01% · a T01 em 0% em sete dos 14 quadros
- **desvios nomeados na T01:**
  - **T01·1:** as referências 03, 04 e 05 desenham 9:41, 0:44 e 9:28, que não saem do mock; o app abre cheio, em 10:00 e 60 s (0,52%, 2,19% e 0,07%);
  - **T01·6:** o Confirmar fica desabilitado com as células vazias, e as referências 12 e 13 desenham ele aceso (5,9%, só no botão);
  - **G25:** a folha e o diálogo aparecem sobre a tela de onde nasceram (04, 09 e 11)
- **a documentação das quatro pastas** (`atualizacao`, `atualizacao2`, `atualizacao33` e `atualizacao98`) entrou sem perder o que o protótipo e o diretor mudaram:
  - em cada `tela.md`, a lista de peças é a do design, e a lista medida foi pra *No protótipo · as peças que o código usa*;
  - o `componentes.md` tem a tabela do design e, embaixo, o que o protótipo mediu;
  - as leis ganharam a exceção do olho e a área de toque, e ficaram com o R-14, o R-15 e as marcas do C1;
  - o changelog do arquiteto entrou uma vez só, sem o que ele repetia
- **os números:** 113 referências, 47 momentos, 50 estados, 274 tokens, 126 peças e 41 casos · a diferença entre o que o design diz e o que o protótipo mede está em `diferencas-para-o-arquiteto.md`
- **para o arquiteto:**
  - desenhar a 03, a 04 e a 05 da T01 no quadro da chegada;
  - a T01·6;
  - o teto da hora, que não tem texto nem desenho;
  - as duas linhas com o mesmo destino no canal e-mail;
  - as listas de peças do design com peças que a tela não desenha
- **a entrega tem uma ferramenta:** `app/scripts/entrega.mjs` classifica os arquivos de uma pasta nova do arquiteto e junta os `tela.md` pela regra dele

## 2026-09-24 · a lista longa da T02

- **a busca da T02 aparece com mais de 6 garagens** — antes a regra dizia só *garagens demais*
- o mock ganhou o caso **`lista-longa-garagens`**: a mesma empresa, num mundo com 9 garagens em 3 regiões · o gate continua aprovando, e são **34 casos**
- a tela da lista longa foi redesenhada **com a lista longa de verdade**, rolando por baixo do rodapé — antes ela mostrava as mesmas 3 garagens
- o texto das linhas: *pacote de 4 dias*, e não *pacote de há 4 dias* · e a vencida diz só a causa, *pacote vencido há 8 dias*, pela D-41 — causa ou ação, nunca as duas

## 2026-09-24 · as saídas do não recebi o código, e o contato mascarado

- **o não recebi o código** agora tem o que acontece em cada toque: *Conferir e reenviar* volta pro código com o prazo em 10:00; *Mandar para o e-mail* volta pro código dizendo o e-mail · 3 momentos novos na T01
- **o acionar gestor saiu**, por decisão do PM: a folha tem duas saídas · decisão 32 e a HU-T01-8 marcada
- a espera de 60 s do reenvio virou **número no lugar da seta**, com a linha desabilitada até zerar · no resto do recuperar, ela se chama *reenviar em*
- o celular e o e-mail aparecem **mascarados** nas seis telas do recuperar acesso · pendência pro PM · decisão 31
- agora são **113 referências** e **47 momentos**

## 2026-09-24 · a tela da senha visível, e a regra da área de toque

- **a senha visível virou tela**, na T01: o login com a senha por extenso e o olho riscado, pra comparar o print · agora são **110 referências** e **44 momentos**
- **a área de toque** entrou na lei *nada encosta*: nunca a menos de 8px de outra · quando o desenho não deixa espaço, ela cresce só pro lado livre, e o que se vê não muda · o link do rodapé cresce pra baixo, o avatar da conta pra cima

## 2026-09-24 · o olho da senha, e o que o erro faz com ela

- o campo de senha ganhou o **estado visível** na folha 6: a senha por extenso, o **olho riscado** e o nome *Ocultar a senha* · o movimento de trocar está na animação da T01
- **no erro do login, a senha é apagada e o cursor vai pra ela** — o usuário fica, pra ele só redigitar a senha
- o design system tem **116 peças**
- **as listas de peças de cada tela foram corrigidas**: o gerador reconhecia algumas peças por um bloco genérico, e o campo e o campo focado apareciam em telas sem campo · agora cada peça é reconhecida pelo primeiro bloco com fundo ou borda, e peças que faltavam entraram, como os cartões de valor da T07

## 2026-09-24 · a terceira entrega do design, construída no protótipo

- **o olho da senha é o do design, não o do Lucide** (a exceção da Lei 14): a amêndoa baixa e a pupila inteiras, e o riscado é o mesmo olho com um risco diagonal que tem uma borda da cor do poço, pra cortar o contorno onde passa · 1 token novo (`--olho-corte`, **262**)
- **a T01 tem o momento 10, a senha visível:** tocar no olho leva a ele, e o endereço segue · a T01/00 foi de 0,01% pra **0%**, porque o que sobrava era o olho do Lucide, e a T01/10 dá **0%**, com os textos conferindo · os espécimes *campo focado* e *botões só de ícone* foram a 0%
- **a área de toque a 8 de qualquer outra** (a lei *nada encosta*): medida em 19 quadros de T01 a T10
  - **o link do rodapé:** a área dele encostava a 2 do primário, em toda tela. Agora ela começa a 8 do primário e cresce só pra baixo, com 48
  - **o avatar da conta** ficava a 3,5 do ENCERRAR. Agora a área dele cresce pra cima e pro lado, com 48, e fica a 10,5
  - o que se vê não mudou: as 121 fotos da vitrine e todas as referências de T01 a T10 continuam com os mesmos números
  - **para o arquiteto:** as linhas de uma mesma lista (as garagens, os módulos, os ônibus) encostam umas nas outras, como o desenho manda. Li a regra como valendo entre peças diferentes, não entre as linhas de uma lista
- **o `indice.json`** ganhou a referência nova e os textos que o design mudou, e ficou com os rótulos da coluna do palco: **110 referências**, 16 telas, 44 momentos e 50 estados
- entraram sem conflito: a referência T01/10 (HTML e PNG), o `estados.md` e o `textos.md` da T01 e a folha 6 · **os outros 15 arquivos esperam o vai**, porque a cópia do design apagaria o que o protótipo e o diretor mudaram (R-14, R-15, as leis ajustadas no C1, os fatos medidos do `logica.md`) — a diferença, arquivo por arquivo, está em `diferencas-para-o-arquiteto.md`, na raiz

## 2026-09-24 · o olho da senha, construído, e a documentação das peças do C7, do C9 e da atualização

- **o campo de senha tem os dois estados da folha 6 nova:**
  - escondida: os pontos, o olho e o nome "Mostrar a senha";
  - visível: o texto por extenso, com o espaçamento normal, o olho riscado (o eye-off do Lucide) e o nome "Ocultar a senha";
  - a troca esmaece no lugar, em 150 ms, no texto e no olho, sem remontar o campo, e ao abrir a tela nada anima;
  - o espécime novo, *senha visível*, dá **0%** contra a folha 6
- **no erro do login, a senha é apagada e o cursor vai pra ela** no toque do Entrar; o usuário fica. O apagar já vinha do C4, e o cursor entrou agora
- a T01 continua com os mesmos números nos 10 quadros, e os 121 espécimes com os mesmos números do C2
- entraram, da entrega nova do design, os 8 arquivos que só o design mudou (a animação e os estados da T01, e os `tela.md` da T11 à T16) e a folha 6 · os outros 15 esperam o vai do diretor, porque o protótipo também mudou eles
- **a documentação das peças do C7, do C9 e da primeira atualização:** as listas da T04, T05, T06, T09 e T10 e a coluna "Telas que usam", pelo medido no código e nas referências; as variantes do C7 e do C9 na coluna Regra; a "variante: travado" saiu, porque a propriedade saiu do DS; a decisão 29 nas linhas do marcador

## 2026-09-24 · a atualização do design, construída no protótipo

- **o marcador de escolha é um só** (decisão 29), o `Quadrado` dentro do `Poco`:
  - vazado de 11 no desmarcado, e lima de 11 no marcado, que surge no toque;
  - poço de 24 no checkbox e na coluna do palco, e de 30 na linha de lista;
  - o checkbox, a escolha numa lista (a T02, que foi do poço de 26 pro de 30 e do lima de 12 pro de 11), a garagem, o módulo, o ônibus, a justificativa e o diálogo com ciência usam o mesmo;
  - as folhas 2, 3 e 6 novas estão no lugar, e os 5 espécimes que mudaram com elas voltaram a 0%. Os 121 números são iguais ao C2
- **as telas prontas contra os PNGs novos:** a T01/00 e 01 em 0,01% (os glifos do Lucide), a T02 em 0, 0 e 0,01%, a T06/03 em 0,01% (a linha da faixa, G13) · as outras 60 referências de T01 a T10 não mudaram
- **T04 · as folhas do módulo conectado (10) e do ativo da sessão (11):** com a sessão aberta, tocar no cartão CONECTAR MÓDULO ou no ATIVO SELECIONADO abre a folha, que sobe em 200 ms.
  - A folha mostra o que a sessão prendeu, lido do mock, a nota TRAVADO NA SESSÃO (HU-T16-2) e o "Encerrar a sessão", que faz o mesmo que o ENCERRAR da faixa;
  - fecha pelo X, tocando fora e pelo Esc, que é o voltar do Android no computador;
  - a propriedade `travado` do cartão saiu do DS;
  - **0,71%** contra o HTML nas duas, só o menu atrás do véu (G25) e o caminhão do Lucide (G5)
- **T04 · as folhas da conta e da garagem** também sobem e descem, e fecham pelo véu e pelo Esc. Nos diálogos, o Esc faz o mesmo que o Cancelar
- **T04 · os cartões em espera são desabilitados de verdade**, com o nome e o motivo pro leitor de tela (a regra nova do `logica.md`)
- **T06 · a correção solicitada (07):** tocar em "Solicitar correção de cadastro" troca o botão, no mesmo lugar e do mesmo tamanho, pelo registro com o relógio e "Correção solicitada às 14:30". Ele deixa de ser tocável · **0,02%** contra o HTML
- **o revisor achou e corrigiu:** com uma folha da T04 aberta, a tira de contexto, que fica acesa por cima do véu, estava inerte, e o leitor de tela não a achava
- **no palco:** com o painel e uma folha abertos ao mesmo tempo, o Esc fecha só o painel, que está por cima
- **os tokens:** os 2 que as folhas novas da T04 pediram (259 → **261**)
- **desvio nomeado:** o h1 escondido "Menu" só existe nas referências dos diálogos (T04/06 e 09), e não nas das folhas. No app, atrás do diálogo, ele fica inerte. **Para o arquiteto:** unificar
- **pendente:** o voltar do Android está ligado nas folhas e nos diálogos da T04. Nas outras telas, ele entra com o caminho do herói inteiro, no C11 · a correção solicitada da T14 entra com a T14, no C10

## 2026-09-24 · C9 · configurar e calibrar — T09 e T10

- **a T09** (a cadeia) e **a T10** (a calibração) em `app/src/telas/`: os 10 quadros e os toques de cada `tela.md`
  - **T09:** a cadeia grava e relê bloco a bloco, a 1 s por bloco, com o trilho de 300 ms correndo junto (T09·1); o bloco recusado, a queda com "Reconectar e seguir", e a recuperação até a Conexão gravar
  - **T10:** o hodômetro do módulo e o do painel, a régua da diferença, a foto, o semear com o tambor e a régua virando "confere" (T10·4), e os três estados
- **a bancada:**
  - **T09:** 0,05 a 0,07% nos três estados (os glifos do Lucide, G5); o 00 e o 04 em 1,5%, pela faixa travada em 52 (G13);
  - **T10:** 0,02 a 0,16%;
  - os textos conferem, fora o "relido às 14:30" da T10/01 · prints lado a lado em `06-prototipo/prints/C9/`
- **o mock:** o hodômetro estático do a-22 (AC-08) e os acréscimos da cadeia, só aditivos · agora são **35 casos no mock**
- **os tokens:** os 6 que o C7 e o C9 pediram entraram no bloco *C7 · C9* do `tokens.css` (253 → 259)
- **desvio nomeado (G13):** a faixa fica sempre com 52 e a linha de baixo; na gravação e na cadeia concluída, a referência deixa ela encolher 1 px
- **desvio nomeado (G25, T09-A3):** a cadeia concluída não tem "Calibrar", porque nenhuma referência desenha esse botão. O caminho da T09 pra T10 passa pelo menu. **Vai ao diretor:** o salto direto pede texto e referência
- **desvio nomeado (G27):** no fluxo, a T09 abre com três blocos relidos e o Leitor gravando, e anda Leitor, Eventos e Conexão. Nada conta de zero ao abrir
- **desvio nomeado (G24, Lei 3):** os elos da cadeia mudam de altura entre os quadros (86 gravando, 70 na recusa, 68 na pausa, 72 na concluída) · na T10, os estados mudam o lugar dos blocos · tudo como as referências desenham. **Vai ao diretor:** reservar os lugares
- **desvio nomeado (G9):** a T10/01 diz "relido às 14:30", porque o relógio do protótipo fica em 14:30; a referência diz 14:31 · a rotação do caminhão coletor (T10/02) tem três segmentos, porque o modelo calibra três grandezas, e a referência desenha dois
- **desvio nomeado (G29):** o tambor troca o valor em 500 ms (300 por rodinha e 40 entre elas), e não nos 600 que a animação da T10 pedia. O movimento fino é do C12
- **desvio nomeado (G25):** o semear do horímetro e a rotação com o motor ligado não têm referência nem texto: o primário fica desabilitado com o mesmo rótulo
- **vão ao diretor:**
  - o "Voltar ao menu" da T09/04 é o primário, em lima, e é uma saída (R-02, T09-A14);
  - o "Depois:" da T10/03 mostra todas as grandezas que faltam, contra a regra de mostrar só a próxima (T10·2)
- **vão ao PM:**
  - o caso do bloco recusado cai num ônibus sem cercas (T09-A15);
  - as HU-T09-3 e HU-T09-7 não têm referência

## 2026-09-24 · C7 · conectar: os estados — T05

- **os 11 estados da T05**, continuados do agente que o limite de gasto interrompeu:
  - achar: nenhum encontrado;
  - conectar: conexão falhou;
  - conferir: as nove falhas da pré-checagem;
  - com as ações de cada aviso e as portas naturais (G28)
- **a bancada:** o 03 e o 04 em 0%, e os outros entre 0,05 e 0,1% (os glifos do Lucide, G5, e a linha de baixo da faixa, G13) · os 5 quadros do C6 continuam iguais · **os textos conferem nos 16 quadros** · prints lado a lado em `06-prototipo/prints/C7/`
- **o mock:** a duração da busca vazia (AC-18) e o caso do firmware fora com o módulo sem rede (AC-20), só aditivos · **o gate foi de 122 pra 141 checagens** (com o C9)
- **as peças** ganharam variantes nomeadas (G11): a linha de checagem com a nota, o parou neutro e a última de 45; o cabeçalho com a unidade sem contagem; a tira de leituras com destaque e complemento · o vazio da busca virou peça da tela, e o vazio declarado voltou ao desenho do C2 · **as 121 fotos da vitrine continuam iguais ao C2**
- **a R-14 vale na lista:** marcar um módulo tira a frase "Escolha um módulo para continuar", e o botão passa a "Conectar ao …"
- **desvio nomeado (G28):** a busca vazia (03), a conexão que falha (04) e os estados 06, 07, 08, 09, 12 e 14 abrem só pela coluna do palco. Nenhum desses módulos tem linha tocável na lista da busca
- **desvio nomeado (G25):** depois de "Gravar a conexão" (09), a saída troca direto pra "Atualizar firmware". O quadro da gravação não tem referência
- **desvio nomeado (Lei 3, G24):** na 14 e na 15, o aviso entra em cima da lista, a lista desce e a tira de leituras some, como as referências desenham
- **vão ao diretor:** os estados sem porta natural, que no palco ficam parados e escondem as saídas deles · se a 00 também tiver de marcar com o quadrado, e não trocar o ESCOLHIDO no lugar, ela precisa de um desenho novo
- **vão ao PM**, como o C0 já registra: T05-N1, T05-N2 e T05-N3

## 2026-09-24 · um marcador de escolha só, e a coluna do palco no meio

- **o marcador de escolha é um só**: vazado de 11 no desmarcado e lima de 11 no marcado · poço de 24 no checkbox e na coluna do palco, 30 na linha de lista · decisão 29
- os checkboxes e a coluna do palco ganharam o quadrado vazado · o lima da T02 foi de 12 pra 11 e o dos checkboxes de 10 pra 11 · a linha de garagem da T02 foi pro poço de 30
- a coluna do palco agora fica **centralizada na altura do celular**, e o topo dela tem **um lugar fixo pro Voltar ao fluxo** — no fluxo, ele diz *no fluxo · toque num estado pra ver* · decisão 30

## 2026-09-24 · os toques sem destino

- **4 momentos novos**, pra nenhum toque ficar sem resposta: a folha do módulo conectado e a do ativo da sessão, na T04 — os dois travados enquanto a sessão está aberta, pela HU-T16-2 —, e a correção solicitada na T06 e na T14
- escritas na lógica: **o voltar do Android**, **os cartões em espera** e **módulo e ativo travados**
- agora são **109 referências**: 16 telas, 43 momentos e 50 estados · o design system tem **115 peças**

## 2026-09-24 · a marca no lima do sistema

- a logo passou de `#B8F23D` pro `--lima` `#AAEF00`, o lima de produto da Mobs2 · lei 15 e decisão 28
- mudaram a logo em `05-recursos/marca/` e os dois PNGs do login em `02-telas/T01-login/`
- o *Lembrar meu usuário* desceu 8px: o toque dele encostava no campo de senha · agora fica a 8px do campo, e o quadradinho a 20px
- o formulário do login subiu 8px, campos e checkbox juntos: do checkbox até o *Entrar* eram 26px, abaixo dos 30 do resto do produto · agora são 34
- o design system ganhou o **checkbox marcado** na folha 6, ao lado do desmarcado · e o movimento de marcar entrou na animação da T01 e da T13
- saiu do login e do erro a frase *O acesso vale por 7 dias sem sincronizar* — ninguém age sobre ela no login

## 2026-09-24 · a atualização do design, organizada no protótipo

- os 74 arquivos de `atualizacao/` entraram no lugar de cada um: 51 copiados (10 novos, 41 que só o design mudou) e 4 que já eram iguais · as 6 folhas do design system (2, 3 e 6, em HTML e PNG) entram no fechamento do C7 e do C9, porque são a régua de comparação dos agentes que estão rodando
- **12 que o protótipo também tinha mudado foram juntados, não sobrescritos** (passo 2 do pedido do arquiteto), com o vai do diretor:
  - **o `tela.md` da T06:** a regra do diretor (R-14, tocar marca e o botão avança) fica, e a correção solicitada do design entra;
  - **o `palco.md`:** a coluna centralizada e o lugar fixo de 34 do design, com o painel que não fecha ao escolher (diretor) e a volta ao instante de antes;
  - **o `componentes.md`:** a regra nova do checkbox, sobre as 125 linhas do C2;
  - **o `ciclos.md`:** o plano revisado do C0, com as 109 referências;
  - **os `tela.md` da T01 e da T04:** as listas medidas e as regras do C4 e do C5, com as linhas novas do design;
  - o `indice.json`, as `leis.md` e o `logica.md` juntaram sem conflito;
  - o `05-recursos/README.md` ficou como estava, porque a cópia do design era a antiga;
- **os números da versão** vêm do design onde ele mudou o censo (109 referências, 43 momentos) e do medido onde o protótipo cresceu: **253 tokens** (G3) e **125 peças** (os 121 espécimes das folhas e os 4 grupos de átomos da folha 3, G10) · as cores continuam 25, como medido no C1. **Para o arquiteto:** o design diz 115 peças e 23 cores, e o protótipo mede 125 e 25
- o censo confere: **109 referências no `indice.json`** — 16 telas, 43 momentos e 50 estados

## 2026-09-24 · o toque e a rolagem, pelo diretor

- **R-14 · escolher numa lista marca; quem avança é o botão.** Tocar numa linha com o marcador de escolha só marca, e o primário acende e segue. Tocar em outra linha troca a marca. Vale no app inteiro, e entrou nas leis de produto
  - **na T05:** a lista (01) marca o módulo, e o "Conectar ao M2C-…" conecta; antes, o toque pulava direto pro quadro do escolhido (a 00). A 00 continua abrindo pelo endereço, como o quadro da referência
  - **na T06**, já era assim desde o C8, e **na T02**, desde o C4
  - **a R-11** (a porta natural) passou a dizer que o estado do caso aparece quando o técnico aperta o botão
- **o quadrado de escolha surge no toque,** como a `animacao.md` da T02 pede: a camada lima entra por opacidade e escala, de 80% a 100%, em 150 ms, e com "reduzir movimento" aparece direto. Parado, o desenho é o mesmo: as 121 fotos da vitrine continuam iguais ao C2
- **R-15 · o celular não mostra a barra de rolagem do navegador.** O que rola mostra o indicador do sistema:
  - fino, 3 px, por cima do conteúdo e sem ocupar lugar;
  - aparece enquanto rola e some 900 ms depois;
  - é um só pro app inteiro (`Rolagem`, nos primitivos) · 6 tokens novos no bloco *o sistema*, **247 → 253**
- **o painel e a coluna do palco** rolam com uma barra fina, nas cores do palco, sem trilho claro
- as telas T01 a T08 continuam com os mesmos números contra a referência · **pedidos ao arquiteto:** o quadro da lista com um item marcado, na T05 e na T06

## 2026-09-24 · C8 · o ônibus e a CAN — T06, T07 e T08

- **a T06** (selecionar ativo), **a T07** (dados da CAN) e **a T08** (refazer leitura) em `app/src/telas/`: 13 dos 14 quadros e os toques de cada `tela.md`
- **decisão do diretor, no meio do ciclo (T06·1 passa pra (b), o T06-N3):** na lista, tocar num ônibus o **marca** (o quadrado lima) e acende o "Usar este ativo", que leva à confirmação do veículo. Tocar em outro troca a marca. A linha de ônibus virou uma escolha pro leitor de tela (radio, aria-checked). A lista com um ônibus marcado não tem referência e se monta com as peças que existem (G25). **Pedido ao arquiteto:** desenhar esse quadro
- **a bancada:**
  - **T06:** 0,01% em 5 dos 7 quadros, só a linha de baixo da faixa (G13); o 00 e o 04 diferem pelo mock (G9, abaixo);
  - **T07:** o 00 e o 02 em 0%, e o 01 em 1,32%, pela faixa travada em 52 e pelo conteúdo que rola (G13, G24);
  - **T08:** 0,01% nos três, e mais o valor do mock no 02 (G9);
  - prints lado a lado em `06-prototipo/prints/C8/`
- **os textos:** conferem na T07 (00, 01, 02) e na T06 e T08, fora os desvios de valor abaixo
- **o mock:** a faixa esperada dos sinais e o rótulo curto (AC-07), só aditivo · um comentário do mock passou a dizer que o a-06 é escolhível na T06 (G1)
- **desvio nomeado (T07·1 a):** o estado domínio mudo (T07/03) **não se constrói**. A referência dele desenha o painel do ônibus urbano com a placa ONK-8Q90, que é de outro modelo, e o caso é do ma-02. A coluna do palco abre a tela só com o nome e o rótulo do estado. **Pedido ao arquiteto:** uma referência nova do 03 pro ma-02
- **desvio nomeado (G9):** a T06/00 mostra os 10 ônibus do pacote da Várzea, com "10 no pacote", e a lista rola (G16). A referência desenha 5
- **desvio nomeado (G9):** o ônibus de fora do pacote (T06/04) é o KUD-4Y21, do Pátio Caruaru, como diz o caso. A referência desenha o ONK-8Q90, da Ibura
- **desvio nomeado (G9):** na leitura refeita (T08/02), a rotação sai 1.180 rpm e o consumo 9,4 L/h, como o mock diz. A referência mostra 980 e 24,8
- **desvio nomeado (G13):** a faixa da sessão tem a linha de baixo de 1px em todas as telas com sessão. As referências da T06 e da T08 desenham a faixa sem ela, e o conteúdo da faixa fica meio pixel mais alto
- **desvio nomeado (G24, Lei 3):** nas travas da T06 (04, 05, 06) e no escolhido apagado (02), a placa desce, porque a trava junta o escolhido e o motivo · na T07/01, a linha da causa faz o cartão da bateria crescer 14 px · na T08, o rodapé desce 38 px enquanto a leitura corre. Tudo como as referências desenham. **Vai ao diretor:** a proposta de reservar os lugares
- **ainda sem ritmo (G4, C12):** a leitura da CAN aparece já feita, e o "Ler novamente" troca na hora. A leitura sinal a sinal espera o ritmo, que entra no C12
- **vão ao diretor:**
  - o texto do vazio da busca da T06;
  - os textos que a T07 pediria e não existem (o resumo com 1 sinal, o lido acima do máximo, o plural de reprovado);
  - a HU-T08-3, que diz "a leitura em branco", contra as referências, que devolvem a leitura nova;
  - a proposta de unir o placar da releitura ao aviso "com contagem"
- **vão ao PM:**
  - o destino de "Solicitar correção de cadastro";
  - "Usar leitor sem fio" contra reconectar sem fio (T06-N1);
  - "SEM ENERGIA" com "Ignição ligada" na mesma tela (T07-N1);
  - a T08 fecha em "12 de 12", e a T07 diz "7 de 12" pro mesmo ônibus
- **HU sem referência:** a ferramenta indisponível sem mapa de contadores (HU-T08-4) · os modelos ma-02 e ma-03 na T07, que montam só o que o mapa do ônibus urbano conhece

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
