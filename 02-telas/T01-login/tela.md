# T01 · Login

Entrar no app com usuário e senha, e recuperar o acesso sem ligar pra ninguém.

| | |
|---|---|
| **Elemento-assinatura** | a marca Mobs2 presa a 207px do topo — o formulário cresce embaixo dela sem movê-la |
| **Chrome** | sem faixa · barra do sistema na cor da página |
| **Semente no protótipo** | nenhuma sessão · usuário r.vieira preenchido |
| **Referência da tela** | `referencias/html/00-tela.html` · `referencias/png/00-tela.png` |
| **Momentos · estados** | 10 · 8 — ver `estados.md` |

## O que se toca

- depois dos 3 envios da hora, a linha do reenvio diz *Os 3 envios desta hora acabaram · libera às 15:12* · o código já enviado segue valendo
  - no protótipo (a última entrega, construída): o 3 é o teto da hora (`limites.tetoPorHora`) e o 15:12, a hora em que libera do caso `teto-de-envios` — o relógio do produto está congelado em 14:30, e o fluxo não tem outra hora de onde ler: a do caso vale também no fluxo (padrão, pro arquiteto). No fluxo, o teto chega pelo reenvio da 12 ou da 13 — o terceiro envio da hora: quando os 60 s do *este foi o último envio desta hora* zeram, a linha passa a dizer o teto. E pedir o código de novo no teto — `Voltar ao login` → `Esqueci a senha` → `Enviar o código` — não envia nada: volta o código que já foi, que segue valendo, com os dígitos do mock, como a 17 desenha, o prazo de onde estava, pro contato a que ele foi, e *Mandamos para* (`regras.js` · `depoisDoEnviar`). No canal, sem envio na hora, o lado do *resta N envio* fica vazio, como antes (G25). O mesmo teto na linha vale no código expirado e nas tentativas esgotadas, onde o `Enviar outro código` fica apagado (padrão, pro arquiteto: nenhuma referência desenha os dois no teto). A folha, no teto, segue com a contagem em 0:00 e as saídas em espera, sem texto pro teto (G25). A 17 abre pela coluna com os envios do caso, parada: o prazo em 10:00 (o relógio), contra o 9:41 da referência, a foto de um instante — 0,51% contra o HTML, só o número, como a 03
- no canal e-mail, a folha *Não recebi o código* inverte: conferir o e-mail, e trocar pro celular
  - no protótipo (a última entrega): a primeira linha é o `Conferir e reenviar` com o e-mail, e reenvia pro e-mail (*Mandamos outro para r•••••@atlsul.com.br*). A segunda — trocar pro celular — não tem texto no `textos.md` (nenhuma referência desenha a folha do e-mail), e fica fora até ele chegar: o cartão tem uma linha só no canal e-mail (pendência, pro arquiteto: o título da linha, que seria o par de *Mandar para o e-mail*)
- entrar com outro usuário abre o diálogo *Outra sessão neste aparelho* sobre as unidades: a sessão do anterior foi encerrada, e a fila dele continua subindo
  - no protótipo (a última entrega, construída): a sessão anterior é a do último `Entrar` que entrou neste aparelho desde o começo do palco (`situacao.jaEntrou` e o técnico do estado único) — o palco começa sem nenhuma, e o primeiro `Entrar` nunca abre o diálogo. O login deixa entrar com o m.souza pela regra de sempre — qualquer senha com 8 ou mais (`minimoEntrar`) —, sem credencial nova: o roteiro digita a mesma senha dos outros roteiros. Saindo da conta com o r.vieira e entrando com o m.souza, a T02 abre com o diálogo: *A sessão de r.vieira foi encerrada. A fila dele continua subindo: 3 itens.* — os itens da fila que esperam, a mesma conta do diálogo de sair do menu (T04/06), que é a do caso (3). O `Entendi` fecha, e o voltar do sistema também, como no aviso do acesso. Quem entrou passa a ser o técnico: o m.souza é *Marcos Souza*, o nome do caso, na folha Conta do menu; o mesmo usuário de novo não abre o diálogo; e o r.vieira, de volta, vê o diálogo com o m.souza. O mock só conhece os dois: outro identificador entra com o nome do herói, como o protótipo sempre fez (padrão, pro arquiteto — a alternativa é o login recusar o usuário que o mock não conhece, com a mesma mensagem da 01). No singular, *1 item* (a resposta do arquiteto de 26/09). O diálogo mora na T02 (`02-telas/T02-selecionar-contexto/tela.md`); a 18 abre pela coluna, com a T02 montada pelo caso `outro-usuario`, parada e sem toque — 0% contra o HTML. Provado no node (`testar-login.mjs`) e no roteiro `outro-usuario.mjs`
- os tempos das referências da recuperação — 9:41, 0:44, 9:28 — são fotos de um instante: o protótipo segue o relógio
  - no protótipo: o 03, o 04, o 05 e a 17 abrem com o prazo e o reenvio cheios (10:00, 60 s), e a diferença contra o HTML é só o número (a 03 e a 17 em 0,51%, a régua dos textos acusa o número nas quatro) — o arquiteto confirmou que vale o relógio
- o `Entrar` diz o que falta enquanto o técnico apaga e digita: *Digite o usuário* → *Digite a senha* → `Entrar` · o foco vai pro primeiro campo vazio
- o usuário lembrado tem o xis dentro do campo · tocar nele limpa o campo e esquece o usuário lembrado; a caixa fica como o técnico deixou

- sem internet, o `Entrar` mostra o aviso *SEM CONEXÃO · O login precisa de internet.* · os campos ficam preenchidos, porque a senha não estava errada · o `Entrar` fica aceso e tenta de novo: sem internet, o mesmo aviso; com a conexão de volta, a regra da senha — entra, ou o erro da 01 no lugar do aviso
- no erro, o `Entrar` fica apagado, dizendo *Digite a senha*, até a senha ter um caractere
- `Entrar` → T02 se a senha tiver 8 caracteres ou mais; com menos, o erro de usuário ou senha
- `Esqueci a senha` → recuperar: escolher o canal
- canal escolhido → digitar o código (482913 no mock) → nova senha → senha alterada → login
- `Não recebi o código` → a folha com as duas saídas: *Conferir e reenviar* e *Mandar para o e-mail*, que esperam os 60 s do reenvio, com a contagem no lugar da seta e a linha desabilitada até zerar
- *Conferir e reenviar* → volta pro código, com o prazo de novo em 10:00 · *Mandar para o e-mail* → volta pro código dizendo o e-mail
- o contato aparece **mascarado** em todas as telas do recuperar acesso: `(81) •••••-8675` e `r•••••@atlsul.com.br` · o destino fica numa linha só; se não couber, corta com reticências
- o olho do campo de senha mostra e esconde: escondida, o olho e o nome *Mostrar a senha*; visível, o olho riscado e o nome *Ocultar a senha*
- no erro, a senha é apagada e o cursor vai pra ela — o usuário fica, pra ele só redigitar a senha
- `Lembrar meu usuário` marca e desmarca · desmarcado por padrão
- o voltar do sistema (no computador, o Esc) faz o `Voltar ao login` em cada passo do recuperar — o canal, o código, a senha nova —, e na folha *Não recebi o código* a fecha, como o X. Na entrada, que não tem saída desenhada — também sem conexão, na 14, e na de quem abre o app, na 15 e na 16 —, e no diálogo *Senha alterada*, sem X nem Cancelar, ele não faz nada (`06-prototipo/logica.md` · O voltar do Android; a pergunta está em `08-produto-real/pendencias.md`)
  - no protótipo (lei 20, a última entrega): a folha *Não recebi o código* também fecha tocando no véu, fora dela, e arrastando pra baixo — o painel acompanha o dedo e, soltando depois de 56, fecha; antes, volta. O arraste que começa numa das duas linhas não reenvia (`06-prototipo/logica.md` · A folha que fecha)

**Como o protótipo constrói** (entrega de 24/09, decisões 31 e 32):

- o `Entrar` fica apagado e desabilitado de verdade **sem o usuário ou sem a senha**, no erro e fora dele (a lei 17, *desabilitado é tinta apagada*, diretor, 25/09), e diz o primeiro que falta, na ordem da tela: sem o usuário, *Digite o usuário*, com a senha ou sem ela; com o usuário e sem a senha, *Digite a senha* (a otimização do design trouxe o texto e os estados 15 e 16). Digitado o que faltava, ele volta aceso, e o aviso de erro fica onde está · só espaço no usuário conta como vazio (`regras.js` · `oQueFalta`)
- **o usuário lembrado** (HU-T01-3, a otimização do design): o celular guarda só o identificador, no estado único (`situacao.usuarioLembrado`), e o palco começa sem nenhum, na 00, com os dois campos preenchidos. O `Entrar` que entra com a caixa marcada guarda o usuário; desmarcada, nada — e, dali em diante (`situacao.jaEntrou`), o login só traz o que o celular lembra: a 00 é só o começo do palco. Saindo da conta, o login volta com ele: o xis, a caixa marcada, a senha vazia com o foco desenhado nela e *Digite a senha* — o quadro da 16; sem ninguém lembrado, o da 15: os dois campos vazios, a caixa desmarcada, o foco desenhado no usuário e *Digite o usuário* (`regras.js` · `entradaDoFluxo`). A senha nunca fica. O xis limpa o campo, esquece o usuário e leva o cursor pro usuário; a caixa fica. As 15 e 16 abrem pela coluna, montadas pelos casos `primeiro-acesso` e `usuario-lembrado`, paradas e sem toque; o toque se prova no node (`testar-login-e-bluetooth.mjs`) e no roteiro `lembrar.mjs`. Ao abrir, o foco é só desenhado, como na 00: o cursor de verdade vai no toque (o xis, o erro)
- **o campo lembrado é a variante do campo** (`lembrado`, em `06-prototipo/app/src/ds/entrada/Campo.jsx`): o xis de 18, em `--tinta-secundaria`, com o traço 2 (`--traco-limpar`), no poço sem o recheio da direita — como a 16 e a folha 6 desenham. Medido nas duas: o xis fica com o centro a 323 da borda da tela e o olho da senha, a 309 (14 à direita), e o xis tem 18, o traço 2 e a `--tinta-secundaria`, onde o olho tem 20, 1,8 e a `--marca-limite`; o botão de 44 do xis sai 5 pra fora do poço, sem vizinho a menos de 8 — a legenda da entrega diz *no mesmo lugar, tamanho e distância do olho*, e o protótipo segue o desenho (pro arquiteto). E o texto do usuário muda de lugar entre as duas variantes: com o xis, começa a 38 da borda da tela (o recheio de 2 do input, como no campo da senha), e sem ele, a 36 — a 16 desenha um e a 00 e a 15, o outro; o protótipo segue as três (pro arquiteto)
- o terceiro código errado mata o código e libera o reenvio na hora, sem esperar os 60 s (T01·4) — a 07 diz *Reenvio liberado*
- a espera é uma só pras duas saídas da folha: qualquer envio novo espera os 60 s (`08-produto-real/pendencias.md`). Quando ela zera com a folha aberta, a seta entra e as linhas acendem: é a 11
- o reenvio volta pro código com as células vazias e o cursor na primeira. Pro mesmo contato, *Mandamos outro para* (a 12); pro e-mail, *Mandamos para* o e-mail (a 13). *Enviar outro código*, no expirado e nas tentativas esgotadas, é o mesmo reenvio, pro mesmo contato
- no resto do recuperar, a espera se chama *Reenviar em 44 s*; depois do último envio da hora, *este foi o último envio desta hora*
- a máscara deriva do contato do mock (`M.credenciais.contato`), nunca digitada: o telefone guarda o primeiro e o último grupo da máscara do DDI, e o e-mail, a primeira letra, cinco pontos e o domínio (`06-prototipo/app/src/dados/formato.js`)
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

## Histórias de usuário

- **HU-T01-1** — Entro com usuário e senha; erro não distingue usuário inexistente de senha errada
- **HU-T01-2** — Com sessão válida e sem rede, o app abre direto na home
- **HU-T01-3** — Lembrar meu usuário desmarcado por padrão, guarda só o identificador, limpável no campo
- **HU-T01-4** — Outro usuário descarta a sessão anterior; a fila do anterior é preservada e continua subindo
- **HU-T01-5** — Recupero senha escolhendo canal (e-mail/telefone), com validação local antes de gastar rede
- **HU-T01-6** — Máscara de telefone derivada do DDI, não fixa; trocar DDI reaplica e avisa
- **HU-T01-7** — Digito código de 6 dígitos · 10 min · 3 tentativas · reenvio após 60 s · teto 3/hora
- **HU-T01-8** — Não recebi o código com 3 saídas: conferir e reenviar · trocar canal · acionar gestor · mudou em 2026-09-24: o PM retirou o acionar gestor — ficam duas saídas · decisão 32
- **HU-T01-9** — Eu crio a senha nova; os 6 requisitos ficam visíveis desde o início e marcam sozinhos
- **HU-T01-10** — Modal diz "senha alterada", sem botão fechar; a troca encerra sessões em outros aparelhos
- **HU-T01-11** — A sessão de acesso não expira por inatividade; só por Sair ou pelos 7 dias, com aviso no 5º
- **HU-T01-12** — Sair tem tela própria: mostra sessão de configuração aberta, itens na fila e o que sobrevive

## Textos

Os textos exatos de cada referência estão em `textos.md`. Copie de lá — nunca redigite.
