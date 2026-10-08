# T01 · Login

Entrar no app com usuário e senha, e recuperar o acesso sem ligar pra ninguém.

| | |
|---|---|
| **Elemento-assinatura** | a marca Mobs2 presa a 207px do topo — o formulário cresce embaixo dela sem movê-la |
| **Chrome** | sem faixa · barra do sistema na cor da página |
| **Semente no protótipo** | nenhuma sessão · usuário r.vieira preenchido |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 14 · 8 — ver `estados.md` |

## O que se toca

- depois dos 3 envios da hora, a linha do reenvio diz *Os 3 envios desta hora acabaram · libera às 15:12* · o código já enviado segue valendo
  - no protótipo (a última entrega, construída): o 3 é o teto da hora (`limites.tetoPorHora`) e o 15:12, a hora em que libera do caso `teto-de-envios` — o relógio do produto está congelado em 14:30, e o fluxo não tem outra hora de onde ler: a do caso vale também no fluxo (padrão, pro arquiteto). No fluxo, o teto chega pelo reenvio da 12 ou da 13 — o terceiro envio da hora: quando os 60 s do *este foi o último envio desta hora* zeram, a linha passa a dizer o teto. E pedir o código de novo no teto — `Voltar ao login` → `Esqueci a senha` → `Enviar o código` — não envia nada: volta o código que já foi, que segue valendo, com os dígitos do mock, como a 17 desenha, o prazo de onde estava, pro dado a que ele foi, com a resposta de sempre (`regras.js` · `depoisDoEnviar`). No canal, sem envio na hora, o lado do *resta N envio* fica vazio, como antes (G25). O mesmo teto na linha vale no código expirado e nas tentativas esgotadas, onde o `Enviar outro código` fica apagado (padrão, pro arquiteto: nenhuma referência desenha os dois no teto). A folha, no teto, segue com a contagem em 0:00 e as saídas em espera, sem texto pro teto (G25). A 17 abre pela coluna com os envios do caso, parada: o prazo em 10:00 (o relógio), contra o 9:41 da referência, a foto de um instante — 0,51% contra o HTML, só o número, como a 03
- no canal e-mail, a folha *Não recebi o código* inverte: conferir o e-mail, e trocar pro celular
  - no protótipo · a rodada 3 do retorno do PM superou esta linha: a folha é a mesma nos dois canais — *Reenviar o código*, pro mesmo dado, e *Usar outro dado*, que volta pra primeira etapa —, e nenhum contato aparece nela
- entrar com outro usuário abre o diálogo *Outra sessão neste aparelho* sobre as unidades: a sessão do anterior foi encerrada, e a fila dele continua subindo
  - no protótipo (a última entrega, construída): a sessão anterior é a do último `Entrar` que entrou neste aparelho desde o começo do palco (`situacao.jaEntrou` e o técnico do estado único) — o palco começa sem nenhuma, e o primeiro `Entrar` nunca abre o diálogo. O login deixa entrar com o m.souza pela regra de sempre — qualquer senha com 8 ou mais (`minimoEntrar`) —, sem credencial nova: o roteiro digita a mesma senha dos outros roteiros. Saindo da conta com o r.vieira e entrando com o m.souza, a T02 abre com o diálogo: *A sessão de r.vieira foi encerrada. A fila dele continua subindo: 3 itens.* — os itens da fila que esperam, a mesma conta do diálogo de sair do menu (T04/06), que é a do caso (3). O `Entendi` fecha, e o voltar do sistema também, como no aviso do acesso. Quem entrou passa a ser o técnico: o m.souza é *Marcos Souza*, o nome do caso, na folha Conta do menu; o mesmo usuário de novo não abre o diálogo; e o r.vieira, de volta, vê o diálogo com o m.souza. O mock só conhece os dois: outro identificador entra com o nome do herói, como o protótipo sempre fez (padrão, pro arquiteto — a alternativa é o login recusar o usuário que o mock não conhece, com a mesma mensagem da 01). No singular, *1 item* (a resposta do arquiteto de 26/09). O diálogo mora na T02 (`02-telas/T02-selecionar-contexto/tela.md`); a 18 abre pela coluna, com a T02 montada pelo caso `outro-usuario`, parada e sem toque — 0% contra o HTML. Provado no node (`testar-login.mjs`) e no roteiro `outro-usuario.mjs`
  - no protótipo · a régua dos textos na 18 (a auditoria do C13, 27/09): o `textos.md` da 18 lista também a tela atrás do diálogo — as unidades da T02, de *VIAÇÃO ATLÂNTICO SUL* ao *Escolha uma unidade* —, e a régua dos textos não lê o que fica atrás do véu, porque está inerte (G25). Por isso ela acusa *falta* nesses catorze, e só neles: o diálogo confere, e o quadro inteiro, com o fundo, está a 0% do HTML. Desvio nomeado da régua, não do app; pro arquiteto: o `textos.md` de uma folha ou diálogo trazer só o que está por cima, como os das folhas da T04 e o do diálogo de sair (T04/06, 09), ou a régua passar a ler o fundo nesses três (a 18, e a T04/12 e 13)
- os tempos das referências da recuperação — 9:41, 0:44, 9:28 — são fotos de um instante: o protótipo segue o relógio
  - no protótipo: o 03, o 04, o 05 e a 17 abrem com o prazo e o reenvio cheios (10:00, 60 s), e a diferença contra o HTML é só o número (a 03 e a 17 em 0,51%, a régua dos textos acusa o número nas quatro) — o arquiteto confirmou que vale o relógio
- o `Entrar` diz o que falta enquanto o técnico apaga e digita: *Digite o usuário* → *Digite a senha* → `Entrar` · o foco vai pro primeiro campo vazio
- o usuário lembrado tem o xis dentro do campo · tocar nele limpa o campo e esquece o usuário lembrado; a caixa fica como o técnico deixou
- sem internet, o `Entrar` mostra o aviso *SEM CONEXÃO · O login precisa de internet.* · os campos ficam preenchidos, porque a senha não estava errada
  - no protótipo · a nossa versão desta linha, antes desta entrega: sem internet, o `Entrar` mostra o aviso *SEM CONEXÃO · O login precisa de internet.* · os campos ficam preenchidos, porque a senha não estava errada · o `Entrar` fica aceso e tenta de novo: sem internet, o mesmo aviso; com a conexão de volta, a regra da senha — entra, ou o erro da 01 no lugar do aviso
- no erro, o `Entrar` fica apagado, dizendo *Digite a senha*, até a senha ter um caractere
- `Entrar` → T02 se a senha tiver 8 caracteres ou mais; com menos, o erro de usuário ou senha
  - no protótipo (decisão do diretor, 27/09 · a espera do Entrar): com internet, o `Entrar` espera a resposta do servidor antes de levar à T02 ou ao erro da 01 — no protótipo, 1,2 s fixos (`ritmos.js` · `entrarEsperaMs`), sem relógio. Enquanto espera, o primário diz *Entrando…*, desabilitado de verdade e em tinta apagada, como o *Gravando no módulo…* da T10 (a lei 17), e a URL diz a 19 (o pacote 5); o `Esqueci a senha` também, desabilitado e em tinta apagada (a lei 17 e a decisão de 27/09; a 19 o desenha aceso — o desvio está no gate do pacote 5); os campos, a caixa e o olho ficam onde estão, sem responder, e nada muda de lugar. A senha errada (a 01) chega depois da espera, e a URL volta à entrada. Sem internet, o aparelho já sabe: o aviso da 14 vem na hora, sem espera. O roteiro `mov-t01` confere o texto que troca no lugar, o botão e o link desligados, o lugar de tudo e a chegada entre 0,8 e 1,7 s
- `Esqueci a senha` → recuperar: escolher o canal
- canal escolhido → digitar o código (482913 no mock) → nova senha → senha alterada → login
  - **no protótipo, por pedido do diretor em 08/10:** tocar em `Entrar com a senha nova` devolve o login com o usuário mantido e a senha de exemplo de `M.credenciais.senha` preenchida e escondida, para continuar a demonstração. Não salva nem usa a senha digitada na recuperação; o produto precisa autenticar com a senha alterada real. Isso não muda o login depois de sair da conta, que continua sem senha.
- `Não recebi o código` → a folha com as duas saídas: *Reenviar o código* e *Usar outro dado*, que esperam os 60 s do reenvio, com a contagem no lugar da seta e a linha desabilitada até zerar
- *Reenviar o código* → volta pro código, pro mesmo dado, com o prazo de novo em 10:00 · *Usar outro dado* → volta pra primeira etapa
- o contato **nunca** aparece em tela, nem mascarado · depois do envio, a tela diz sempre *Se houver conta com este dado, o código foi enviado.*
- o olho do campo de senha mostra e esconde: escondida, o olho e o nome *Mostrar a senha*; visível, o olho riscado e o nome *Ocultar a senha*
- no erro, a senha é apagada e o cursor vai pra ela — o usuário fica, pra ele só redigitar a senha
- `Lembrar meu usuário` marca e desmarca · desmarcado por padrão
- no protótipo · a nossa linha, que saiu do pacote desta entrega (o protótipo segue com ela): o voltar do sistema (no computador, o Esc) faz o `Voltar ao login` em cada passo do recuperar — o canal, o código, a senha nova —, e na folha *Não recebi o código* a fecha, como o X. Na entrada, que não tem saída desenhada — também sem conexão, na 14, e na de quem abre o app, na 15 e na 16 —, e no diálogo *Senha alterada*, sem X nem Cancelar, ele não faz nada (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-para-o-dev/o-que-o-produto-ainda-decide.md`)
  - no protótipo (lei 20, a última entrega): a folha *Não recebi o código* também fecha tocando no véu, fora dela, e arrastando pra baixo — o painel acompanha o dedo e, soltando depois de 56, fecha; antes, volta. O arraste que começa numa das duas linhas não reenvia (`06-prototipo/logica.md` · A folha que fecha)

**Como o protótipo constrói** (entrega de 24/09, decisões 31 e 32):

- o `Entrar` fica apagado e desabilitado de verdade **sem o usuário ou sem a senha**, no erro e fora dele (a lei 17, *desabilitado é tinta apagada*, diretor, 25/09), e diz o primeiro que falta, na ordem da tela: sem o usuário, *Digite o usuário*, com a senha ou sem ela; com o usuário e sem a senha, *Digite a senha* (a otimização do design trouxe o texto e os estados 15 e 16). Digitado o que faltava, ele volta aceso, e o aviso de erro fica onde está · só espaço no usuário conta como vazio (`regras.js` · `oQueFalta`)
- **o usuário lembrado** (HU-T01-3, a otimização do design): o celular guarda só o identificador, no estado único (`situacao.usuarioLembrado`), e o palco começa sem nenhum, na 00, com os dois campos preenchidos. O `Entrar` que entra com a caixa marcada guarda o usuário; desmarcada, nada — e, dali em diante (`situacao.jaEntrou`), o login só traz o que o celular lembra: a 00 é só o começo do palco. Saindo da conta, o login volta com ele: o xis, a caixa marcada, a senha vazia com o foco desenhado nela e *Digite a senha* — o quadro da 16; sem ninguém lembrado, o da 15: os dois campos vazios, a caixa desmarcada, o foco desenhado no usuário e *Digite o usuário* (`regras.js` · `entradaDoFluxo`). A senha não é lembrada ao sair da conta; o preenchimento depois de recuperar é apenas a conveniência de demonstração descrita acima. O xis limpa o campo, esquece o usuário e leva o cursor pro usuário; a caixa fica. As 15 e 16 abrem pela coluna, montadas pelos casos `primeiro-acesso` e `usuario-lembrado`, paradas e sem toque; o toque se prova no node (`testar-login-e-bluetooth.mjs`) e no roteiro `lembrar.mjs`. Ao abrir, o foco é só desenhado, como na 00: o cursor de verdade vai no toque (o xis, o erro)
- **o campo lembrado é a variante do campo** (`lembrado`, em `06-prototipo/app/src/ds/entrada/Campo.jsx`): o xis de 18, em `--tinta-secundaria`, com o traço 2 (`--traco-limpar`), no poço sem o recheio da direita — como a 16 e a folha 6 desenham. Medido nas duas: o xis fica com o centro a 323 da borda da tela e o olho da senha, a 309 (14 à direita), e o xis tem 18, o traço 2 e a `--tinta-secundaria`, onde o olho tem 20, 1,8 e a `--marca-limite`; o botão de 44 do xis sai 5 pra fora do poço, sem vizinho a menos de 8 — a legenda da entrega diz *no mesmo lugar, tamanho e distância do olho*, e o protótipo segue o desenho (pro arquiteto). E o texto do usuário muda de lugar entre as duas variantes: com o xis, começa a 38 da borda da tela (o recheio de 2 do input, como no campo da senha), e sem ele, a 36 — a 16 desenha um e a 00 e a 15, o outro; o protótipo segue as três (pro arquiteto)
- o terceiro código errado mata o código e libera o reenvio na hora, sem esperar os 60 s (T01·4) — a 07 diz *Reenvio liberado*
- a espera é uma só pras duas saídas da folha: qualquer envio novo espera os 60 s (`08-para-o-dev/o-que-o-produto-ainda-decide.md`). Quando ela zera com a folha aberta, a seta entra e as linhas acendem: é a 11
- o reenvio volta pro código com as células vazias e o cursor na primeira: pelo *Reenviar o código*, a 12; com o e-mail como canal, a 13 — as duas com a resposta de sempre. *Enviar outro código*, no vencido e nas tentativas esgotadas, é o mesmo reenvio, pro mesmo dado. Depois do *Usar outro dado*, o `Enviar o código` da primeira etapa é um reenvio: gasta um envio da hora, e chega com as células vazias (a rodada 3)
- no resto do recuperar, a espera se chama *Reenviar em 44 s*; depois do último envio da hora, *este foi o último envio desta hora*
- **a primeira etapa** (a rodada 3 do retorno do PM, construída): o que vem digitado ao abrir é o das referências, do mock (`recuperacao.digitado`, D-21) — o telefone incompleto da 02, com *Faltam 2 números.*; o completo da 20; o e-mail da 21. A máscara é a do país escolhido (`M.ddis`, com a sigla), e muda com ele: os dígitos entram nos `#`, e o que vem depois do último dígito digitado não aparece; trocando de país, o número que não cabe na máscara nova perde o que sobra. Fora do formato, o traço de baixo do campo fica vermelho, o motivo colado embaixo, e o `Enviar o código` desligado de verdade (a lei 17); no formato, o traço lima do foco desenhado. O e-mail confere a arroba e o domínio com ponto — fora do formato, o botão desligado, sem motivo escrito: o `textos.md` não tem texto pro e-mail (G25, pro arquiteto). O singular do motivo, *Falta 1 número.*, não tem referência (pro arquiteto). O seletor de país é a folha da 22: a busca filtra pelo nome, pelo código ou pela sigla; o escolhido vem primeiro, e os outros em ordem de nome, como a 22 desenha. Tocar num país fecha a folha. O momento segue o que está na tela: a 02 fora do formato, a 20 no formato, a 21 no e-mail, a 22 com o seletor (`regras.js` · `momentoDoCanal`)
- `Confirmar` fica desabilitado enquanto o código não tem os seis dígitos (T01·6) — também na 12 e na 13, que o desenham aceso
  - no protótipo (a última entrega): a 12 e a 13 agora o desenham apagado, com as células vazias, dizendo *Digite o código* — o primário diz o que falta, como o `Entrar`. Com o código incompleto, *Digite o código*, apagado e desabilitado de verdade (a lei 17); com os seis dígitos, `Confirmar`. A 12 e a 13 foram de 0,15% a 0% contra o HTML novo
- **o login sem conexão** (a entrega do mundo real): a rede é a do aparelho, a `situacao.rede` do estado único, que o mock abre conectada — no fluxo, o `Entrar` segue a regra da senha, como antes. A 14 abre pela coluna, montada pelo caso `sem-conexao-no-login` (`rede: false`), parada e sem toque: o toque do `Entrar` ali — o aviso, os campos que ficam, o tentar de novo e a entrada com a rede de volta — é `depoisDoEntrar`, em `06-prototipo/app/src/telas/T01/regras.js`, provado no node por `app/scripts/testar-login-e-bluetooth.mjs`. Nenhum gatilho do mock tira a rede no fluxo (pendência). O aviso é o neutro com o traço cinza embaixo, no lugar do erro da 01

## Peças do design system que esta tela usa

Medido nas referências: toda peça abaixo está desenhada nas folhas de `03-design-system/`. Construa com o componente — nunca redesenhe.

- barra do sistema sem sessão
- uma ação
- folha
- diálogo
- diálogo sem saída
- diálogo com ciência
- folha com opções
- barra do sistema sob o véu
- escolha numa lista
- falha
- linha do histórico
- linha de garagem
- linha de garagem · a atual
- a lista de garagens
- segmentado
- a marca no login
- campo
- campo focado
- senha visível
- usuário lembrado
- requisitos da senha
- código · seis células
- código errado
- link dentro do conteúdo
- checkbox
- checkbox marcado
- justificativa
- linha de opção
- lista com contagem
- linha da fila
- linha da re-checagem

## No protótipo · as peças que o código usa

Anotação de construção, medida no código e nas referências. A lista de cima é a do design; esta é a que o protótipo usa, e a diferença entre as duas vai pro arquiteto. **Respondida pelo arquiteto (26/09):** vale esta, a medida.

- primário · normal
- primário · pressionado
- primário · desabilitado
- link · normal e pressionado
- linha tocável · normal e pressionada
- barra do sistema sem sessão
- duas ações
- folha
- diálogo sem saída
- folha com opções
- barra do sistema sob o véu
- os glifos de estado
- os poços
- os marcadores
- falha
- aviso
- segmentado
- a marca no login
- campo
- campo focado
- senha visível
- usuário lembrado
- requisitos da senha
- código · seis células
- código errado
- link dentro do conteúdo
- botões só de ícone
- checkbox
- checkbox marcado
- linha de opção

Corrigida no C4 pelo medido (G10, T01-A10): saíram as 14 peças que nenhuma das dez desenha (diálogo, diálogo com ciência, as duas seções do checklist, linha do histórico, as três da unidade, as cinco da cadeia e do encerramento, e a lista com contagem). Entraram as que a tela usa e faltavam: as de toque da folha 1, a barra sem sessão, as duas ações, os glifos e os poços, a falha do 01, o segmentado, os botões só de ícone e o checkbox marcado. O primário desabilitado a `01` e a `16` desenham dizendo *Digite a senha*, e a `15`, *Digite o usuário* (a entrega de 25/09 e a otimização do design); no resto, aparece no toque, com o código incompleto, sem envio na hora ou com a senha nova fora dos requisitos. O que só a T01 desenha virou variante nomeada (G11): o rodapé do login, o segmentado com folga 8, o foco do código fora do próximo dígito e a linha de opção em espera (a 04: apagada, desabilitada, com a contagem no lugar da seta; a 11: acesa). A senha visível (a 10) entrou na entrega de 24/09. Com o marcador único (decisão 29), entrou o marcador da folha 3: o quadrado do checkbox do *Lembrar meu usuário*. Com o login sem conexão (a 14, a entrega do mundo real), entrou o aviso: o neutro, com o traço cinza embaixo — variante nomeada (G11) do `Aviso`, `traco`. Com o login de quem abre o app (a 15 e a 16, a otimização do design), entrou o usuário lembrado, a variante `lembrado` do campo, com o xis de limpar; e a marca ganhou a assinatura: o nome com a largura da logo (196) e os fios crescendo até as bordas dela, de 82 a 278, nas seis telas do login. O cartão do canal, o do código, a linha do código conferido e o campo da senha nova não têm linha no `componentes.md`: são peças desta tela, em `06-prototipo/app/src/telas/T01/`.

**A rodada 3 do retorno do PM (06/10):** o cartão do canal saiu — ele mostrava o contato mascarado. Entraram, como peças desta tela, em `06-prototipo/app/src/telas/T01/pecas.jsx`: a aba do canal (*TELEFONE*, *E-MAIL*, a caixa de poço de 52 com o traço lima na escolhida), o seletor de país (a sigla, o código e a seta, na caixa de poço de 56), o campo do dado (o poço de 56, o texto em 17/700, o traço vermelho fora do formato) e a linha do país, na folha (48, o nome, o código e o check lima do escolhido). A folha da 22 é a `Folha` com a `Busca` e o cartão de opções; a seta do *Usar outro dado* (a 04 e a 11) entrou no `Icone` como `voltar-etapa`, o desenho da referência. Nenhum token novo: as medidas caem nos que existem, pelo valor (o 52 do `--botao-secundario`, o 56 do `--alvo-primario`, o 48 do `--alvo-min`, o 17 do `--t-botao`) — pro arquiteto, se quiser nomear os papéis.

## Histórias de usuário

- **HU-T01-1** — Entro com usuário e senha; erro não distingue usuário inexistente de senha errada
- **HU-T01-2** — Com sessão válida e sem rede, o app abre direto na home
- **HU-T01-3** — Lembrar meu usuário desmarcado por padrão, guarda só o identificador, limpável no campo
- **HU-T01-4** — Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo
- **HU-T01-5** — Recupero senha escolhendo canal (e-mail/telefone), com validação local antes de gastar rede
- **HU-T01-6** — Máscara de telefone derivada do DDI, não fixa; trocar DDI reaplica e avisa
- **HU-T01-7** — Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora
- **HU-T01-8** — Não recebi o código com duas saídas: reenviar o código ou usar outro dado; ambas respeitam a espera de 60 s, sem acionar o gestor · decisões 32 e retorno do PM de 06/10, rodada 3
- **HU-T01-9** — Eu crio a senha nova; os 6 requisitos ficam visíveis desde o início e marcam sozinhos
- **HU-T01-10** — Modal diz "senha alterada", sem botão fechar; a troca encerra sessões em outros aparelhos
- **HU-T01-11** — A sessão de acesso não expira por inatividade; só por Sair ou pelos 7 dias, com aviso no 5º
- **HU-T01-12** — Sair tem tela própria: mostra sessão de configuração aberta, itens na fila e o que sobrevive

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.

## A recuperação de senha (retorno do PM, 06/10 · rodada 3)

- **nenhum contato mascarado, em tela nenhuma**: entregar parte do contato antes de qualquer digitação confirma que a conta existe
- **a primeira etapa** (a 02): o técnico escolhe *Telefone* ou *E-mail* e digita o dado · o telefone tem o seletor de país, com busca, o Brasil (+55) já escolhido, e a máscara muda com o país (a 22) · enquanto o formato estiver errado, o botão fica desligado e o motivo aparece colado no campo: *Faltam 2 números.* · o texto fixo: *O dado precisa ser o mesmo do cadastro.* · o telefone certo (a 20) e o e-mail (a 21)
- **a resposta ao envio é sempre a mesma**: *Se houver conta com este dado, o código foi enviado.*
- **a mesma mensagem pro código errado e pro vencido**: *Código inválido ou vencido* (a 05, a 06 e a 07) · o texto é leitura nossa
- **o *Não recebi o código***: *Reenviar o código* (pro mesmo dado) e *Usar outro dado* (volta pra primeira etapa) · leitura nossa
- **a nova senha** (a 08) mostra os seis requisitos desde o início, e eles marcam sozinhos · confirmado, como o PM pediu
